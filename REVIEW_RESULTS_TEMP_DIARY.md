# Code Review — Temperature Diary Module

## Security

| Issue | Severity | File | Line | Description |
|-------|----------|------|------|-------------|
| None | — | — | — | XSS: Angular interpolation auto-escapes notes field. No `innerHTML` usage detected. ✅ |
| None | — | — | — | SQL Injection: All queries use Prisma parameterized API. No raw SQL. ✅ |
| None | — | — | — | IDOR: All three endpoints (`create`, `findByChild`, `delete`) verify `child.userId === userId` via `prisma.child.findFirst`. ✅ |
| None | — | — | — | Auth token: Bearer token sent via HTTP header only, never logged to console. ✅ |

## Performance

| Issue | Severity | File | Line | Description |
|-------|----------|------|------|-------------|
| Chart effect not destroyed on component destroy | LOW | `temperature-diary.component.ts` | `ngAfterViewInit` effect | The `effect()` that re-renders the chart on data changes is never cleaned up when the component is destroyed. Angular standalone components with `OnInit`/`AfterViewInit` do not automatically dispose reactive effects. The effect closure captures `this`, preventing GC of the component. Fix: implement `OnDestroy` and call `effect(() => {...}).destroy()` or store the effect and destroy it. |
| `formTime` and `formNotes` are plain properties | INFO | `temperature-diary.component.ts` | `formTime = this.defaultTime()` | Not a runtime bug, but inconsistent with the component's signal-based architecture. `[(ngModel)]` writes directly to the property, bypassing Angular's signal reactivity. Low impact — Angular change detection still picks up the reference, but potential edge-case with strict mode. |

## Clean Code

| Issue | Severity | File | Line | Description |
|-------|----------|------|------|-------------|
| `tempTextClass` and `tempColorClass` are identical | LOW | `temperature-diary.component.ts` | 237–244 | Both methods contain identical conditional logic (`temp >= 38.5 → rose`, `>= 37.5 → orange`, else → teal`). `tempTextClass` is used on the large display card and `tempColorClass` on the chart. The duplication is confusing and violates DRY. Extract to a single `tempColor(temp): string` helper. |
| `chartInitialized` tracked separately from `chartInstance` | INFO | `temperature-diary.component.ts` | 192 | `chartInitialized` is set to `true` inside `buildChart()`. A `chartInstance` already exists to track chart state. The dual tracking adds unnecessary state. Simplifiable. |
| `tempDotClass` logic also duplicated | INFO | `temperature-diary.component.ts` | 246–251 | Same conditional pattern as `tempTextClass`/`tempColorClass`. Three near-identical temperature→color mappings exist across three separate methods. |
| `result` silently swallowed on failed save | LOW | `temperature-diary.component.ts` | `saveReading()` | `createTemperatureEntry` returns `null` on error. The component does `if (result)` without any user-facing feedback (no toast, no error message, no signal). The user clicks Save, sees the spinner briefly, and nothing happens. Silent failure UX. |
| Dev-login fallback stores fabricated token | INFO | `data.service.ts` | `login()` | On API failure, fallback sets `localStorage.setItem(this.AUTH_KEY, 'dev-token-' + Date.now())`. This allows unauthenticated state to appear authenticated. Not exploitable in this module's context (temperature entries still require a real JWT via `@UseGuards(AuthGuard('jwt'))`), but it's a pattern that bypasses auth semantics — worth noting for future auth work. |

## Backend Validation

| Issue | Severity | File | Line | Description |
|-------|----------|------|------|-------------|
| No class-validator DTOs on temperature endpoints | LOW | `temperature-entries.controller.ts` | `@Body() data: any` | All three endpoints use `data: any` with runtime validation in the service. No `@Body() dto` with `class-validator` decorators. This means TypeScript types don't enforce contract at the controller layer. Runtime checks in the service are correct but the validation is implicit. Consider creating `CreateTemperatureEntryDto` with `@IsNumber()`, `@IsDateString()`, `@IsEnum()` decorators for self-documenting contracts. |
| No pagination limit on `findByChild` | INFO | `temperature-entries.service.ts` | 42–49 | Returns all entries from last 30 days, ordered desc. No `take:` clause. In normal usage 30 days of temperature readings (~2–10 entries/day) is fine. However, there's no hard cap — a power user could create hundreds of entries and exhaust memory/bandwidth. Consider adding `take: 100` or making it configurable. |
| `notes` field not sanitized before storage | INFO | `backend/prisma/schema.prisma` | TemperatureEntry.notes | `notes` is stored as a raw string. If the notes field ever grows beyond temperature logs (e.g., user pastes a large block of text), there's no length limit enforced at the Prisma/schema level. The `notes` column has no `@db.Text` annotation but Prisma infers it as `String` which has a 256-byte Postgres limit — this may silently truncate large notes. Add `@db.Text` annotation if long notes are expected. |
| `measuredAt` guard is correct but returns 400 | INFO | `temperature-entries.service.ts` | 19–21 | Future date guard correctly throws `BadRequestException`. Test results note this produces a 400 rather than a clean UX — this is expected behavior and not an issue. Frontend could show inline validation but backend contract is correct. |

## Verdict

**CONDITIONAL APPROVE**

The Temperature Diary module is fundamentally sound. Security is solid — no XSS vectors, parameterized Prisma queries, and IDOR guards on every endpoint. Backend validation is comprehensive and ownership checks are correctly applied. TypeScript builds pass cleanly.

The two items preventing an **APPROVE** are:

1. **Chart effect memory leak** (LOW): The `effect()` in `ngAfterViewInit` captures `this` and is never disposed on destroy. This will prevent garbage collection of the component instance on navigation.
2. **Silent save failure** (LOW): When `createTemperatureEntry` fails, the user sees the spinner briefly then nothing — no error state, no retry, no message.

Neither is a security risk or blocker for staging, but both should be addressed before production. Recommend fixing the chart cleanup pattern and adding a save error signal before merging.

---

*Reviewer: openclaw subagent | Session: kiddok-reviewer | Date: 2026-04-21*