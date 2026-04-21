# Code Review — VaccinesPage Sprint 9

## Security

**XSS Risk — LOW (Angular interpolation safe, but input not validated)**
- All `{{ v.vaccineName }}`, `{{ v.notes }}`, `{{ v.administeredBy }}`, `{{ v.batchNumber }}` use Angular template interpolation, which encodes HTML automatically. Safe in Angular templates.
- **Concern**: The form's `[(ngModel)]="formVaccineName"` uses `<input list="vaccine-suggestions">`. The datalist provides suggestions from `STANDARD_VACCINES` but **does not restrict input** — users can type arbitrary text. That free-form value gets stored as `vaccineName` and later displayed via interpolation. Angular interpolation is safe, but the data layer has no canonicalization.
- **Impact**: Low for Angular-only rendering. Non-issue if the backend also does not trust `vaccineName` as HTML.
- **Recommendation**: Add a `formVaccineName` validator to normalize or reject non-standard entries, or at minimum `.trim()` and reject empty strings (already does trim check in `saveVaccine`). Acceptable as-is for current threat model.
- No sensitive data (passwords, tokens) in `console.error` output — only structured error messages.
- Auth token stored in `localStorage` (consistent with other components), not logged.

**Verdict**: Acceptable. Angular's DOM context prevents XSS. The datalist is advisory, not restrictive, which is understood.

---

## Performance

**Signal Usage — EFFICIENT**
- 5 signals: `loading`, `vaccines`, `showAddModal`, `expandedId`, `saving`. Each is independent.
- 6 computed signals derived from `vaccines()` signal: `childVaccines`, `overdueVaccines`, `dueVaccines`, `upcomingVaccines`, `completedVaccines`, `overdueCount`. All derived via `.filter()` — O(n) per signal update, acceptable for typical vaccine counts (< 50 records).
- `showAddModal` and `expandedId` are standalone signals — no cascading computed dependencies.
- **No effect() hooks** — no risk of stale closure or memory leaks from unregistered effects.
- `loadSampleData` is only called on fetch failure — not on normal path.

**Grouping Logic — EFFICIENT**
- Template uses `@for (v of overdueVaccines(); track v.id)` — computed signals, not inline filters.
- Computed signals run only when `vaccines` signal changes (via `set()`). No per-render recalculation.
- `childVaccines` re-filters when `activeChildId` changes (signal from DataService). Clean reactive chain.

**No Heavy Computations**
- No `Math.min/max` in template, no deep object copying in computed.
- `mapToRecord` and `dateStr` are utility methods called only from async handlers, not from template expressions.
- Date formatting uses `getDate/Month/FullYear` — no `Intl.DateTimeFormat` or heavy libraries.

**Memory Leaks — CLEAN**
- No `setInterval`, no `addEventListener` with manual cleanup needed.
- No subscription pattern (no RxJS Subject subscriptions).
- No `ngOnDestroy` needed since no persistent subscriptions exist.

---

## Clean Code

**Duplicate Patterns — MINOR**
- `getStatusBadgeClass` is an alias for `getBadgeClass`: `return this.getBadgeClass(status);`. This is a code smell — one method should be removed. (Does not block merge.)
- Status helper methods (`getStatusIcon`, `getStatusBgClass`, `getStatusTextClass`, `getBadgeClass`, `getStatusBadgeClass`, `getStatusLabel`) are 6 separate switch-based methods. Pattern is duplicated across `GrowthComponent`, `TemperatureComponent` — a shared `StatusHelperService` would reduce duplication. (Non-blocking observation.)

**Unused Code**
- `effect` imported but never used:
  ```
  import { Component, inject, signal, computed, effect, OnInit } from '@angular/core';
  ```
  Triggers ng build warning. Should be removed.
- `Router` injected (`private router = inject(Router)`) but never used. Dead import.

**TypeScript Strictness**
- No `strict: true` confirmed in tsconfig? Reviewer cannot confirm — would need `tsconfig.json` scan. The component uses basic types (string, number, boolean, `signal<T>`). No `any` casts beyond the `mapToRecord` function which uses `v: any` for API response mapping — acceptable.
- `VaccineRecord.status` is a union type enforced in `mapToRecord` — properly typed.

**Code Quality**
- Form fields as plain class properties (not signals) — intentional and consistent with other KidDok components (no need for signal reactivity on form fields since modal open/close is controlled by `showAddModal` signal).
- `saving` signal is defined but its UI usage is unclear — `saveVaccine()` sets it but template never shows a loading spinner or disables the button during save. Could be dead code (set but not read). Minor observation.

---

## Verdict

**CONDITIONAL APPROVE**

The component is well-structured, reactive, and safe from XSS in Angular's template context. Performance is clean with no memory leaks or heavy computations.

### Must Fix (before merge)
1. **Remove unused imports**: `effect` and `Router` are imported but never used. One-line removal.

### Should Fix (tech debt, non-blocking)
2. `getStatusBadgeClass` is a direct alias for `getBadgeClass` — remove the alias method.
3. `saving` signal is set but never read in the template — either wire up button disabled state or remove it.

### Observations (no action needed)
- Datalist autocomplete is advisory-only (users can type custom vaccine names). Acceptable for current model.
- Status helper methods duplicated across components — candidate for shared service in future sprint.

### Commit
```
git add REVIEW_RESULTS_VACCINES.md && git commit -m "sprint9-reviewer: VaccinesPage security + perf audit"
```