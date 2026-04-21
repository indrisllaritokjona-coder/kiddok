# Test Results — HeaderComponent Sprint 5

## Critical Issues (block merge)

### 1. [CRITICAL] `data.service.ts` — Stray `return` Statement Breaks Class Structure
**File:** `src/app/services/data.service.ts`
**Line:** ~498

The `getChildAge()` method body contains a proper return, but after its closing `}` brace, there is a **dangling** `return this.parentProfile().name;` at the class level (not inside any method). This causes TypeScript to think the class body has ended prematurely, making all subsequent members (`saveToStorage`, `loadFromStorage`) appear as orphaned code outside the class.

```
getChildAge(child: ChildProfile): { years: number; months: number } {
  ...           ← last statement inside method
}               ← method closes
return this.parentProfile().name;  ← OUTSIDE the class — SYNTAX ERROR
                ← class is considered "closed" here by TS
private saveToStorage(...)   ← orphaned — can't be parsed
```

**Fix required:** Move `return this.parentProfile().name;` inside a proper `getParentName()` method inside the class.

---

### 2. [CRITICAL] `header.component.ts` — `getParentName()` Does Not Exist
**File:** `src/app/components/header.component.ts` lines 138, 142

The template calls `dataService.getParentName()` but `DataService` has no such method. The dangling `return this.parentProfile().name;` at the class level was likely intended to be a `getParentName()` method, but it's currently placed outside the class body, making the method non-existent.

**Fix required:** Add `getParentName(): string { return this.parentProfile().name; }` as a proper class method in `DataService`.

---

### 3. [CRITICAL] `sidebar.component.ts` — Cannot Resolve Imports
**File:** `src/app/components/sidebar.component.ts` lines 3, 4

Imports use relative paths `../../services/data.service` and `../../core/i18n/i18n.service` which do not resolve. This causes 10+ TypeScript errors cascading from the unknown module types.

**Fix required:** Verify correct relative path from `sidebar.component.ts` location to `data.service.ts` and `i18n.service.ts`.

---

## Validation Checklist

| Check | Status | Notes |
|-------|--------|-------|
| Full-width header bar, white bg, bottom border | ✅ PASS | Header component has `bg-white` + `border-b border-gray-200/50` |
| Left: back button (when viewState='app') + page title | ✅ PASS | `*ngIf viewState === 'app'` + dynamic page title |
| Right: child switcher pill (avatar + name + age chip + chevron) | ✅ PASS | All 4 elements present in template |
| Dropdown: white rounded-3xl, child cards with checkmark on active | ✅ PASS | `rounded-3xl`, checkmark via `child.id === activeChildId()` |
| Click on pill → dropdown opens | ✅ PASS | `toggleDropdown()` → `showDropdown.set(true)` |
| Click child card → selectChild(childId) + dropdown closes | ✅ PASS | `onChildSelected(child)` emits + closes |
| Click outside → dropdown closes | ✅ PASS | `@HostListener('document:click')` on `app-header` |
| "Add New Member" button → emits addChildRequested | ✅ PASS | `onAddNewMember()` → `addChildRequested.emit()` |
| "Switch Child" button → just closes dropdown | ⚠️ PARTIAL | Emits `switchProfileRequested` (correct per spec), but spec says "just closes dropdown" — actual emits event per spec Section 4.4. Behavior is per spec. |
| Empty state when no children | ✅ PASS | `@if (!hasChildren())` with `header.noChildrenPlaceholder` |
| All strings use i18n.t() with header.* keys | ✅ PASS | All user-facing strings use i18n.t()['header.*'] |
| No hardcoded SQ/EN strings | ✅ PASS | All strings via i18n |
| Reads children() signal for dropdown list | ✅ PASS | `allChildren = computed(() => this.dataService.children())` |
| Reads selectedChild() for active indicator | ✅ PASS | `activeChildId = computed(() => this.dataService.activeChildId())` |
| Calls selectChild(childId) on switch | ⚠️ INDIRECT | Emits `childSwitchRequested` → Shell calls `selectChild`. Per spec, this is correct. |
| Uses getChildAge() for age chip | ✅ PASS | `this.dataService.getChildAge(child)` in `activeChildAge` computed |

## Build Result

**FAIL** — 26 errors

Errors breakdown:
- 2 errors: `header.component.ts` — `getParentName()` doesn't exist on `DataService`
- 10 errors: `data.service.ts` — structural parse failure (stray `return` at class level)
- 14 errors: `sidebar.component.ts` — 2 unresolvable imports + cascading type errors

## Verdict

**REQUEST CHANGES**

The build is broken. Three critical issues need to be fixed before this component can be merged:

1. **Fix `data.service.ts` class structure** — move dangling `return` into a `getParentName()` method
2. **Add `getParentName()` method** to `DataService` class
3. **Fix `sidebar.component.ts` import paths**

Once these are resolved and the build passes, a re-test is required.

---

## Notes for Executor

- The `getParentName()` issue is directly caused by the structural error in `data.service.ts` — the dangling `return` statement orphaned the helpers and likely prevented a correctly-formed `getParentName` method from being parsed.
- The sidebar import issue is pre-existing and not part of the HeaderComponent sprint, but it blocks the build and needs to be addressed.
- The header component template and logic are otherwise correct and well-aligned with `SPEC_HEADER.md`.