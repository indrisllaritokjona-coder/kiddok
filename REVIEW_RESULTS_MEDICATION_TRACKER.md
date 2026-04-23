# REVIEW_RESULTS_MEDICATION_TRACKER.md
**Module:** Medication Tracker  
**Reviewer:** kiddok-reviewer  
**Date:** 2026-04-23  
**Commit Target:** review: medication tracker module security + perf audit

---

## 1. Security Audit

### ✅ XSS — SAFE
- All template rendering uses Angular interpolation `{{ value }}` — Angular auto-escapes by default.
- No `innerHTML`, `dangerouslySetInnerHTML`, or `v-html` usage found.
- Dose log notes rendered as `{{ log.notes }}` — safe.

### ⚠️ Auth — INCONSISTENT PATTERN (Minor)
- All API calls correctly use `Authorization: Bearer ${token}`.
- **Issue:** The medications component uses raw `fetch()` with manual `Authorization` header construction via `localStorage.getItem(this.data.AUTH_KEY)`, while other components (e.g., `DataService` methods) use `HttpClient` with `this.getHeaders()`. This is not a security flaw — both are equally secure — but it creates an inconsistent pattern that is harder to maintain.
- All API calls are auth-guarded. The NestJS controller uses `@UseGuards(AuthGuard('jwt'))` on all endpoints.

### ⚠️ Input Validation — MISSING (Major)
- **`CreateDoseLogDto.notes`**: `@IsString() @IsOptional()` — no max length constraint. No sanitization before storing.
  - An attacker could store arbitrarily large strings in `notes` (DoS via DB storage bloat).
- **`CreateDoseLogDto.medicationId`**: `@IsString() @IsNotEmpty()` — missing `IsUUID` or format validation.
- **`CreateDoseLogDto.takenAt`**: `@IsDateString()` — missing format validation.
- **`CreateMedicationDto.name`**: `@IsNotEmpty()` — missing max length (potential for very long strings stored/displayed).
- **`CreateMedicationDto.dosage`**: missing max length.
- Backend `logDose()` does validate `takenAt` cannot be in future — correct.

### ✅ SQL Injection — SAFE
- All Prisma queries use the ORM's parameterized query system. No raw SQL concatenation.
- Prisma schema correctly defines CASCADE delete on `MedicationDoseLog`.

### ⚠️ Notes Sanitization — MISSING (Major)
- Dose log `notes` field has no sanitization on the backend before storing in Postgres.
- While Angular's template layer prevents XSS on render, storing raw user input without sanitization is a defense-in-depth failure. If the data is ever used in a different context (e.g., exported to CSV, sent in an email notification, rendered in a PDF), XSS could occur.

---

## 2. Performance Audit

### ✅ Memory Leaks — CLEAN
- No `Subscription` objects stored in the component. All async operations (`fetch`, `loadMedications`, `saveDoseLog`, `saveMedication`, `deleteMedication`) are fire-and-forget with no stored references.
- Dose history drawer uses signal-based state — no RxJS subscriptions.

### ✅ ngOnDestroy — PRESENT (empty, acceptable)
- `ngOnDestroy(): void {}` is defined but empty. Since no subscriptions are stored, no cleanup is needed. This is acceptable.

### ✅ Dose Log List Re-renders — CLEAN
- `@for (log of historyMed()!.doseLogs; track log.id)` — tracks by `id`, minimizing DOM operations on updates.
- Dose log modal updates local state optimistically: `const meds = this.medications().map(...)` creates a new array only for the affected medication card. Angular's signal-based change detection is surgical — only affected card re-renders.
- No `OnPush` violation detected. The component uses default change detection, but signals ensure precise updates.

---

## 3. Issues Requiring Fixes

| Priority | Issue | Location | Fix |
|----------|-------|----------|-----|
| **Major** | `notes` field not sanitized | `medication.dto.ts` — `CreateDoseLogDto.notes` | Add sanitization helper and strip HTML/script tags before storing |
| **Major** | `medicationId` no format validation | `medication.dto.ts` — `CreateDoseLogDto.medicationId` | Add `IsUUID()` or validate as CUID format |
| **Major** | `name` and `dosage` no max length | `medication.dto.ts` — `CreateMedicationDto` | Add `@MaxLength()` decorators |
| **Minor** | Inconsistent API call pattern | `medications.component.ts` | Use `DataService` HttpClient with `getHeaders()` for consistency |

---

## 4. Backend Validation Summary

| Endpoint | Validation Present |
|----------|-------------------|
| `POST /medications/:childId/doses` | ✅ Bearer auth, medication ownership, active check, future date check |
| `GET /medications/:childId/doses/:medicationId` | ✅ Bearer auth, child ownership, medication ownership |
| `GET /medications/child/:childId` | ✅ Bearer auth, child ownership |
| `POST /medications/:childId` | ✅ Bearer auth, child ownership, ValidationPipe |
| `PATCH /medications/:id` | ✅ Bearer auth, ownership |
| `DELETE /medications/:id` | ✅ Bearer auth, ownership |

---

## 5. Verdict

| Category | Status |
|----------|--------|
| XSS | ✅ Pass |
| Auth | ✅ Pass (minor pattern inconsistency) |
| Input Validation | ⚠️ Needs fixes (major) |
| SQL Injection | ✅ Pass |
| Memory Leaks | ✅ Pass |
| Re-renders | ✅ Pass |
| ngOnDestroy | ✅ Pass (empty, acceptable) |

**Overall: 2 major issues require fixes before production.**

---

## 6. Fixes Applied (Inline)

1. **Sanitize `notes` field in CreateDoseLogDto** — strip HTML/script tags.
2. **Add `@IsUUID()` to `medicationId`** in CreateDoseLogDto.
3. **Add `@MaxLength()` to `name` and `dosage`** in CreateMedicationDto.
4. **Fix inconsistent API pattern** — migrate raw `fetch` to `DataService` HttpClient methods.

---

*Report generated by kiddok-reviewer — 2026-04-23*