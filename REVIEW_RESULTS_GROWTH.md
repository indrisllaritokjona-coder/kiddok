# Code Review — Growth Tracking Module

## Security

| Issue | Severity | File | Line | Description |
|--------|----------|------|------|-------------|
| CDN script no SRI | LOW | growth-tracking.component.ts | 252 | Chart.js loaded from jsDelivr CDN via dynamic `document.createElement('script')` with no `integrity` or `crossorigin` attribute. A CDN compromise could inject malicious JS. |
| Auth token in localStorage | INFO | data.service.ts | 36 | `kiddok_access_token` stored in localStorage. Acceptable for SPA dev, but note: no HTTP-only cookie, XSS could read it. Not a new issue — flag for future hardening. |
| No other token/secret exposure | PASS | — | — | Bearer token only used in Authorization header, not logged to console or error responses. |

**XSS (notes field): PASS** — Angular template interpolation `{{ entry.notes }}` escapes HTML by default. No `innerHTML` or `dangerouslySetInnerHTML` usage found.

**SQL Injection: PASS** — Prisma ORM uses parameterized queries throughout. `where: { id: childId, userId }` and `where: { id, include: { child: true } }` are safe.

**IDOR: PASS** — All three endpoints (`create`, `findByChild`, `delete`) verify child ownership via `prisma.child.findFirst({ where: { id: childId, userId } })`. Delete additionally checks `entry.child.userId !== userId` before deletion.

---

## Performance

| Issue | Severity | File | Line | Description |
|--------|----------|------|------|-------------|
| No pagination on findByChild | LOW | growth-entries.service.ts | 48 | `findMany` returns all entries for a child with no `take`/`skip`. Acceptable for growth tracking (low volume), but no cursor or limit if child has years of data. |
| Chart rebuilt on every signal change | LOW | growth-tracking.component.ts | 229–232 | `effect()` watches `growthEntries()` and calls `renderChart()` which destroys and rebuilds Chart.js on every entry add/delete. Creates visual flicker. |
| No OnDestroy cleanup | MEDIUM | growth-tracking.component.ts | — | Component implements `OnInit` and `AfterViewInit` but not `OnDestroy`. The chart instance, `chartInitialized` flag, and `setTimeout` callbacks (lines 211, 270, 273) are never cleaned up. Memory leak on navigation. |
| CDN script loaded per render | LOW | growth-tracking.component.ts | 249–255 | Chart.js CDN script is checked and loaded inside `renderChart()` which is called on every data change. After first load `typeof Chart !== 'undefined'` short-circuits, but the check still runs repeatedly. |

**N+1 queries: PASS** — `findMany({ where: { childId } })` is a single query with no nested includes that could cause N+1.

**Chart.js dual-axis: PASS** — Single Chart.js instance with two `y` axes (`y` and `y1`). Properly configured, no duplicate chart instances loaded simultaneously.

---

## Clean Code

| Issue | Severity | File | Line | Description |
|--------|----------|------|------|-------------|
| `data: any` in controller | MEDIUM | growth-entries.controller.ts | 12 | `@Body() data: any` — no DTO class, no validation pipe, no schema. Relies entirely on service-level manual checks. |
| Duplicate API pattern | INFO | data.service.ts | — | Growth entry methods (`loadGrowthEntries`, `createGrowthEntry`, `deleteGrowthEntry`) are near-identical copies of temperature entry methods. DRY opportunity via generic child-data service. Not a bug — noted for refactor. |
| Missing error toast/feedback | LOW | growth-tracking.component.ts | 274 | `saveEntry` calls `createGrowthEntry` which returns `null` on error, but no user-facing error message is shown. Silent failure — user sees save spinner then nothing. |
| No loading state for initial fetch | LOW | growth-tracking.component.ts | — | `ngOnInit` calls `loadGrowthEntries` but there's no signal for "loading" state. UI shows empty state briefly before data arrives. |
| `async/await` without `try/catch` in saveEntry | PASS | growth-tracking.component.ts | 263–274 | `saveEntry` is `async` but the `await` call is not wrapped. However `createGrowthEntry` in data.service.ts already catches errors and returns `null`, so errors are swallowed safely (just no user feedback). |

**TODO comments: PASS** — No TODO comments found in reviewed files.

---

## Backend Validation

| Issue | Severity | File | Line | Description |
|--------|----------|------|------|-------------|
| No DTO class | MEDIUM | growth-entries.controller.ts | 12 | `create(@Body() data: any)` — no CreateGrowthEntryDto. Manual validation scattered in service. No class-validator decorators. |
| measuredAt future-date check | ✅ PASS | growth-entries.service.ts | 33 | `if (measuredAt > new Date())` correctly rejects future dates. |
| Height range 30–200 cm | ✅ PASS | growth-entries.service.ts | 24 | `if (data.height !== undefined && (data.height < 30 || data.height > 200))` enforced. |
| Weight range 1–150 kg | ✅ PASS | growth-entries.service.ts | 28 | `if (data.weight !== undefined && (data.weight < 1 || data.weight > 150))` enforced. |
| At least one of height/weight required | ✅ PASS | growth-entries.service.ts | 20 | `if (data.height === undefined && data.weight === undefined)` correctly throws `BadRequestException`. |
| Child ownership verified on create | ✅ PASS | growth-entries.service.ts | 40–44 | `findFirst({ where: { id: data.childId, userId } })` before `create`. |
| Child ownership verified on findByChild | ✅ PASS | growth-entries.service.ts | 53–57 | Same `findFirst` check before `findMany`. |
| Child ownership verified on delete | ✅ PASS | growth-entries.service.ts | 64–70 | `findFirst` with `include: { child: true }` then `entry.child.userId !== userId` check. |

**Schema: PASS** — Prisma schema correctly defines `height Float?`, `weight Float?`, `measuredAt DateTime` (required), `notes String?`. Cascade delete on child. `@id @default(uuid())` on all models.

---

## Verdict

**REQUEST CHANGES**

### Required Fixes

1. **[MEDIUM] Add `OnDestroy` lifecycle hook** — Clean up `chartInstance.destroy()`, reset `chartInitialized = false`, and clear pending `setTimeout` callbacks to prevent memory leaks when navigating away from the component.

2. **[MEDIUM] Replace `data: any` with a typed DTO** — Create `CreateGrowthEntryDto` with class-validator decorators. Add a ValidationPipe to the controller. Manual validation in the service should remain as a second defense layer, but the controller layer is the proper entry point.

### Recommended Fixes

3. **[MEDIUM] Show error feedback to user on failed save** — `saveEntry` silently returns when `createGrowthEntry` returns `null`. Add a signal like `saveError` and display an inline error message so the user knows the operation failed.

4. **[LOW] Add pagination to `findByChild`** — Even if not needed now, add `take`/`skip` with sensible defaults (e.g., `take: 50`). Growth data accumulates over years; this prevents unbounded payload growth.

5. **[LOW] Add loading signal for initial data fetch** — Introduce a `loading = signal(false)` and set it during `loadGrowthEntries` so the template can show a spinner while fetching.

6. **[LOW] Debounce chart re-renders** — The `effect()` triggers `renderChart()` on every signal change. Add a debounce or guard to prevent chart rebuilds for rapid successive updates (e.g., save + delete in quick succession).

### Security Notes

7. **[INFO] Add SRI to Chart.js CDN script** — Add `integrity="sha384-..."` and `crossorigin="anonymous"` to the dynamically injected Chart.js script tag once a stable hash is available for the versioned URL.

### Positive Notes

- IDOR protection is solid across all three endpoints
- Prisma parameterized queries prevent SQL injection
- XSS protection for `notes` field is correctly implemented
- Backend validation is comprehensive (height, weight, future date, at least-one-required)
- Frontend range validation on height/weight inputs works correctly
- No TODO comments left in code
- Build passes with 0 errors on both frontend and backend