# Test Results — SidebarComponent Sprint 4

## Critical Issues (block merge)

### 1. **data.service.ts — Stray `return` statement (SYNTAX ERROR)**
The `getChildAge()` method ends with `return { years, months };` but immediately after, at the class level, there is a dangling `return this.parentProfile().name;` statement. This makes the entire file fail to compile — **no Angular component in the app will build**.

**Location:** `src/app/services/data.service.ts`, line ~380 — right after `getChildAge()` closing brace

```typescript
// getChildAge ends:
  return { years, months };
}
return this.parentProfile().name;   // <— SYNTAX ERROR: outside any function
```

**Fix:** Remove the stray `return` line, or convert it to `getParentName()` method.

---

### 2. **sidebar.component.ts — Wrong import paths**
Sidebar is at `src/app/components/sidebar.component.ts` but uses:
- `../../services/data.service` → should be `../services/data.service`
- `../../core/i18n/i18n.service` → should be `../core/i18n/i18n.service`

All other components (e.g. `pin-lock.component.ts`, `shell.component.ts`) use `../services/data.service`. Sidebar uses `../` (two levels) but is only one directory deep.

**Fix:** Change to `../services/data.service` and `../core/i18n/i18n.service`.

---

### 3. **shell.component.ts — `getParentName()` does not exist on DataService**
Shell template calls `dataService.getParentName()` (lines 97, 101) but this method was never implemented in `DataService`. Only `parentProfile()` signal exists.

**Fix:** Add `getParentName(): string { return this.parentProfile().name; }` to `DataService`, or remove the usage from shell template.

---

### 4. **sidebar.component.ts — Template type errors (cascade from bad imports)**
Because `../../services/data.service` cannot be resolved, the Angular compiler treats `DataService` and `I18nService` as `unknown` types. This cascades into ~15 TS2571 "Object is of type 'unknown'" errors in the template (lines 21, 22, 274, 275, 286, 288, 296, 310).

Once import paths are fixed, these resolve automatically.

---

## Validation Checklist

| Check | Status | Notes |
|-------|--------|-------|
| Width: 280px, solid white bg (no glassmorphism) | ✅ PASS | CSS: `width: 280px; background: #ffffff` |
| Left 4px gradient border (indigo→teal) | ✅ PASS | `border-left: 4px solid; border-image: linear-gradient(...)` |
| Brand row: KidDok logo + locale toggle | ✅ PASS | Logo + locale-toggle button present |
| Active child mini-card: DiceBear + name + age badge | ✅ PASS | Avatar via DiceBear Notionists, name + badge shown |
| 5 nav items with Material Symbols icons | ✅ PASS | `home`, `thermostat`, `trending_up`, `edit_document`, `vaccines` |
| Active state: 4px left indigo bar + indigo-100 pill | ✅ PASS | `box-shadow: inset 4px 0 0 #6366F1` + `bg-indigo-100` |
| Footer: Settings + Logout | ✅ PASS | Both items present |
| All nav labels use i18n.t() with sidebar.* keys | ✅ PASS | `t()[item.labelKey]` using keys like `sidebar.nav.home` |
| Age format: "{n} vjeç" (SQ) / "{n} years" (EN) | ✅ PASS | Uses `sidebar.ageFormat` and `sidebar.ageFormatMonths` |
| No hardcoded SQ/EN strings in sidebar | ✅ PASS | All strings via i18n |
| Clicking nav item calls navigateTo(tabId) → currentTab | ⚠️ PARTIAL | `navigateTo()` dispatches `kiddok:navigate` event (correct pattern), but shell's handler calls both `this.currentTab.set()` and `this.dataService.currentTab.set()` — only the latter is needed for sidebar to react |
| Active item highlighted based on currentTab() | ⚠️ PARTIAL | Sidebar reads `dataService.currentTab` correctly, but shell has its own `currentTab` signal that is NOT synchronized back to `dataService.currentTab` in all cases |
| Sidebar uses kiddok:navigate event pattern | ✅ PASS | `window.dispatchEvent(new CustomEvent('kiddok:navigate', ...))` |
| Reads selectedChild() signal for mini-card | ⚠️ PARTIAL | Sidebar uses `activeChild = computed(() => {...})` derived from `activeChildId()` + `children()` signal — not directly `selectedChild()` (which doesn't exist as a separate signal in DataService). This is functionally correct but differs from spec which says "Reads selectedChild() signal" |
| Shows no-child placeholder when selectedChild() is null | ✅ PASS | `[class.sidebar__child-card--empty]="!activeChild()"` + placeholder shown |
| getChildAge() correctly computes age from DOB | ✅ PASS | Method correctly computes years + months accounting for day diff |
| Backend smoke test | ⏭️ SKIP | Backend not verified as running during test |

---

## Build Result

**FAIL** — 20+ TypeScript errors, all blocking:

1. `TS1005` `TS2304` `TS18050` `TS1128` — `getChildAge` stray return (syntax error in data.service.ts)
2. `TS2307` — sidebar `../../services/data.service` not found (import path wrong)
3. `TS2307` — sidebar `../../core/i18n/i18n.service` not found (import path wrong)
4. `TS2339` — `getParentName` does not exist on DataService (shell.component.ts)
5. `TS2571` — multiple "Object is of type 'unknown'" in sidebar template (cascaded from broken imports)
6. `TS7006` — implicit `any` on `c` parameter in find callback (cascaded)

**Fix order:**
1. Fix stray `return` in data.service.ts
2. Fix import paths in sidebar.component.ts (`../../` → `../`)
3. Add `getParentName()` to DataService (or remove from shell template)

---

## Verdict

**REQUEST CHANGES**

The sidebar component itself is well-implemented and spec-compliant. However, the build is completely broken by three pre-existing bugs in data.service.ts and shell.component.ts, plus one incorrect import path in sidebar. These must be fixed before merge.
