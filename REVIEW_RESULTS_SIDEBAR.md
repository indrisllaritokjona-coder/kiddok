# Code Review — SidebarComponent Sprint 4

## Security

**Status: PASS**

- No XSS vectors detected. All user data (child names, ages, labels) is bound via Angular templates, which auto-escape interpolated content. `encodeURIComponent(child.id)` is used in avatar URLs — correct.
- No sensitive data leaking to console. Auth tokens are stored under `kiddok_access_token` key (not exposed in console logs), API calls use Bearer auth via `getHeaders()`.
- Navigation via `CustomEvent('kiddok:navigate')` is safe — no direct `router.navigate` manipulation with unsanitized input.
- File upload validation in shell (PDF/image type + 5MB size cap) is properly enforced in both add-child and edit-child flows.

---

## Performance

**Status: PASS**

- `activeChild` is a `computed()` signal — only recomputes when `activeChildId()` or `children()` changes. No unnecessary subscriptions.
- `navItems` is a plain static array — no signal overhead.
- `ageLabel()` is lightweight string formatting with no DOM reads. Template `@for` uses `track item.id` — Angular change detection optimized.
- No heavy computations on tab switch. Navigation dispatches a lightweight custom event.
- Sidebar template is self-contained; `OnDestroy` is not needed since there are no subscriptions or intervals to clean up.

---

## Clean Code

**Status: MINOR ISSUES**

- **`onBloodTypeChange()` in shell.component.ts is dead code** (line ~`onBloodTypeChange()` method body is empty). Angular template handles reactivity via `editBloodType.set($event)`. Should be removed.
- The `getChildAge()` → `ageLabel()` chain in sidebar duplicates age-computation logic. The `ageLabel` method calls `dataService.getChildAge()` which is correct — no action needed, this is intentional delegation.
- Import structure is consistent with other components once the path bug is fixed.
- TypeScript: `ChildProfile` is properly imported and typed. No implicit `any` in sidebar component. (Shell has some untyped `data: any` in `addIllness`/`addVaccine` but that's pre-existing.)

---

## Critical Bugs Found

| Bug | File | Fix |
|-----|------|-----|
| **Dangling `return` statement** — `getChildAge()` is followed by a stray `return this.parentProfile().name;` at class level, making the file fail to compile | `src/app/services/data.service.ts` | Remove the stray `return` line. This looks like an incomplete method definition — the intent was likely `getParentName(): string { return this.parentProfile().name; }` |
| **Wrong import paths in SidebarComponent** — uses `../../services/data.service` and `../../core/i18n/i18n.service` but file is at `src/app/components/` (one level deep, not two) | `src/app/components/sidebar.component.ts` | Change `../../services/data.service` → `../services/data.service` and `../../core/i18n/i18n.service` → `../core/i18n/i18n.service` |
| **`getParentName()` called but never implemented** — shell template uses `dataService.getParentName()` but the method does not exist on `DataService` | `src/app/components/shell.component.ts` | Add `getParentName(): string { return this.parentProfile().name; }` to `DataService`, or remove the usage from shell template |

---

## Verdict

**REQUEST CHANGES**

The SidebarComponent implementation is clean, spec-compliant, and well-structured. However, three pre-existing bugs in the codebase prevent the build from succeeding:

1. **Critical (build-breaker):** Stray `return` in `data.service.ts` — no Angular app will build until this is removed.
2. **Critical (build-breaker):** Wrong import paths in `sidebar.component.ts` — `../../` instead of `../` causes TS2307 "module not found" errors, cascading ~15 TS2571 "unknown type" errors.
3. **Critical (build-breaker):** `dataService.getParentName()` called in shell template but the method does not exist on `DataService`.

**Fix order:** (1) Remove stray `return` in data.service.ts → (2) Fix import paths in sidebar.component.ts → (3) Add `getParentName()` to `DataService` (or remove usage from shell).

Once these are resolved, the sidebar is production-ready.
