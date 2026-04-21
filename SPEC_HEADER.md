# SPEC_HEADER.md — Sprint 5: HeaderComponent

**Version:** 1.0
**Date:** 2026-04-22
**Status:** Ready for Executor
**Parent:** [REDESIGN_PLAN.md](./REDESIGN_PLAN.md) Section 2.3 & 3.1

---

## 1. Overview

### Purpose
Extract the header section from `ShellComponent` into a standalone, reusable `HeaderComponent`.

### What Stays in ShellComponent
- Shell layout (flex container with sidebar + main area)
- View state management (`viewState`, `currentTab`)
- Navigation logic (`navigateTo`, `selectChild`)
- Add/Edit child modal logic

### What Moves to HeaderComponent
- Header template (top bar with left/right sections)
- Child switcher dropdown logic
- Locale toggle button (mobile)
- Parent welcome avatar block (desktop)

---

## 2. Component Interface

```typescript
// Input — passed from ShellComponent
@Input() currentTab: string;
@Input() viewState: 'selector' | 'app';

// Output — events emitted back to ShellComponent
@Output() childSwitchRequested = new EventEmitter<string>();
@Output() addChildRequested = new EventEmitter<void>();
@Output() switchProfileRequested = new EventEmitter<void>();
@Output() backRequested = new EventEmitter<void>();
@Output() localeToggleRequested = new EventEmitter<void>();
@Output() settingsOpenRequested = new EventEmitter<void>();
```

### Signals (internal)
```typescript
showDropdown = signal(false);   // dropdown open/closed state

// Computed from DataService
activeChild = computed(() => {
  const activeId = dataService.activeChildId();
  return dataService.children().find(c => c.id === activeId);
});

allChildren = computed(() => dataService.children());

// Derived
hasChildren = computed(() => this.allChildren().length > 0);
```

---

## 3. Template Design

### 3.1 Header Layout Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│  [back btn] [hamburger]         [lang btn]   [child pill]  [avatar] │
└─────────────────────────────────────────────────────────────────────┘
```

**Left side:**
- Back button (only visible when `viewState === 'app'`)
- Hamburger menu icon (mobile only)
- Page title (future: dynamic based on `currentTab`)

**Right side:**
- Locale toggle button (mobile only)
- Child switcher pill (avatar + name + age chip + chevron)
- Parent avatar button + welcome text (desktop only, `viewState === 'app'`)

### 3.2 Child Switcher Pill

```
┌────────────────────────────────────────────────────┐
│ [avatar]  Joni         3 vjeç         ▼          │
│ (40px)   Joni's name   age chip    chevron       │
└────────────────────────────────────────────────────┘
```

- Container: `bg-white px-4 py-2.5 rounded-2xl shadow-soft border border-gray-100 hover:border-primary-300 hover:shadow-md transition-all`
- Avatar: `w-10 h-10 rounded-full border-2 border-primary-100 object-cover` (40px)
- Name: `font-bold text-gray-800 text-sm hidden sm:block`
- Age chip: `bg-primary-50 text-primary-600 text-xs font-bold px-2 py-0.5 rounded-full`
- Chevron: `material-icons text-gray-400 text-sm transition-transform ui-not-collapsed:rotate-180` when open

### 3.3 Dropdown Panel

```
┌─────────────────────────────────┐
│ 👨‍👩‍👧 Profili i Fëmijës            │  ← section label
├─────────────────────────────────┤
│ [avatar] Joni           ✓    │  ← child card (active)
│            Lindur: 12/03/2023  │
├─────────────────────────────────┤
│ [avatar] Era            ○     │  ← child card (inactive)
│            Lindur: 05/08/2025  │
├─────────────────────────────────┤
│ [ ⟷ Ndërro Fëmijën         ]  │  ← switch button
├─────────────────────────────────┤
│ [ + Shto Pjestar të Ri     ]  │  ← add new button
└─────────────────────────────────┘
```

**Container styles:**
- `absolute right-0 top-16 lg:top-20 w-80 bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 py-3 animate-slide-up z-50 overflow-hidden`

**Dropdown section label:**
- `px-5 pb-3 pt-1 mb-2 border-b border-gray-50 flex items-center gap-2`
- Icon: `material-icons text-primary-500 text-sm` (family_restroom)
- Text: `text-xs font-bold text-gray-400 uppercase tracking-wider`

**Child card (in dropdown):**
- `flex items-center gap-4 px-5 py-3 hover:bg-primary-50 cursor-pointer transition-colors m-2 mt-0 rounded-2xl border border-transparent hover:border-primary-100 group`
- Avatar: `w-12 h-12 rounded-full border border-gray-200 shadow-sm`
- Name: `font-extrabold text-gray-800 group-hover:text-primary-700 transition-colors`
- Born date: `text-xs text-gray-500 font-medium`
- Active checkmark: `material-icons text-teal-500 ml-auto bg-teal-50 rounded-full p-1`

**Action buttons (bottom of dropdown):**
- "Switch Child": `flex items-center gap-3 px-4 py-3 rounded-2xl bg-primary-50 hover:bg-primary-100 text-primary-700 font-bold transition-colors border border-primary-200`
- "Add New Member": `w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold transition-colors border border-slate-200 hover:border-slate-300`

**Empty state:**
- `px-5 py-8 text-center`
- `text-gray-400 text-sm font-medium`
- Text: `header.noChildrenPlaceholder` key

### 3.4 Parent Avatar Block (desktop only)

- Container: `hidden lg:flex items-center gap-2 text-sm text-gray-500 font-medium`
- Icon: `material-icons text-teal-500 text-lg` (waving_hand)
- Text: `{{ i18n.t()['welcome.loggedIn'] }}, {{ dataService.getParentName() }}`
- Avatar: `w-12 h-12 rounded-full bg-gradient-to-tr from-primary-500 to-teal-400 p-[2px] shadow-soft cursor-pointer hover:shadow-lg transition-shadow`

---

## 4. Interaction Flows

### 4.1 Open Dropdown
- User clicks child pill → `showDropdown.set(true)`

### 4.2 Select Child
- User clicks child card → `childSwitchRequested.emit(child.id)` → Shell calls `selectChild(id)` → `showDropdown.set(false)`

### 4.3 Close Dropdown (click outside)
- Use `@if` with a click-outside directive or HostListener on `document:click`
- When dropdown is open and user clicks anywhere outside the dropdown AND outside the trigger pill → `showDropdown.set(false)`

### 4.4 Switch Profile (go to selector)
- User clicks "Switch Child" → `switchProfileRequested.emit()` → Shell sets `viewState.set('selector')`

### 4.5 Add New Member
- User clicks "Add New Member" → `addChildRequested.emit()` → Shell sets `isAddingChild.set(true)`

### 4.6 Back Navigation
- User clicks back button → `backRequested.emit()` → Shell calls `goToSelector()`

### 4.7 Locale Toggle
- User clicks language button (mobile) → `localeToggleRequested.emit()` → Shell calls `i18n.toggleLocale()`

---

## 5. i18n Keys

Add to `i18n.service.ts` translations object:

```typescript
// Header / Child Switcher
'header.switchChild': { sq: 'Ndërro Fëmijën', en: 'Switch Child' },
'header.addNewMember': { sq: 'Shto Pjestar të Ri', en: 'Add New Member' },
'header.noChildrenPlaceholder': { sq: 'Akzni s\'ka fëmijë', en: 'No children added yet' },
'header.profileLabel': { sq: 'Profili i Fëmijës', en: 'Child Profile' },
```

---

## 6. File Structure

```
src/app/
├── components/
│   ├── header.component.ts        ← NEW standalone component
│   ├── shell.component.ts         ← MODIFIED: remove header template, use <app-header>
```

### New File: `header.component.ts`
- Location: `src/app/components/header.component.ts`
- Style: Standalone Angular component, inline template/styles (consistent with project style)
- Imports: `CommonModule`, `FormsModule`, `DataService`, `I18nService`

---

## 7. ShellComponent Changes

### Template changes
Replace the header `<header>` block in `ShellComponent.template` with:
```html
<app-header
  [currentTab]="currentTab()"
  [viewState]="viewState()"
  (childSwitchRequested)="selectChild($event)"
  (addChildRequested)="isAddingChild.set(true)"
  (switchProfileRequested)="goToSelector()"
  (backRequested)="goToSelector()"
  (localeToggleRequested)="i18n.toggleLocale()"
/>
```

Add to `imports` array: `HeaderComponent`

### Script changes
- Remove header-specific signals: `showChildList` (moved to HeaderComponent)
- Remove header-specific computed: `activeChild()` (moved to HeaderComponent)
- Remove `selectChild` method (kept in Shell, called via output event)
- Keep all other ShellComponent logic intact

---

## 8. CSS / Animations

### Animations (reuse existing)
```css
.animate-slide-up {
  animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Transitions
- Dropdown open/close: 350ms cubic-bezier(0.16, 1, 0.3, 1)
- Chevron rotation: 200ms ease
- Pill hover: 200ms ease (border + shadow)

---

## 9. Edge Cases

| Case | Behavior |
|------|----------|
| No children exist | Show empty state in dropdown: `header.noChildrenPlaceholder` |
| Only 1 child | Dropdown shows 1 card with active checkmark, "Switch Child" button still works |
| Child has no avatarUrl | Fall back to DiceBear: `https://api.dicebear.com/7.x/notionists/svg?seed={child.name}` |
| Empty name | Not possible (createChild enforces non-empty name) |
| Rapid open/close | Debounce not needed; signal-based state handles correctly |

---

## 10. Acceptance Criteria

- [ ] `HeaderComponent` is a standalone standalone Angular component
- [ ] Child switcher pill shows active child's avatar (40px DiceBear), name, age chip, chevron
- [ ] Clicking the pill opens the dropdown
- [ ] Dropdown lists all children with avatar, name, born date, checkmark if active
- [ ] Clicking a child card emits `childSwitchRequested` with child ID and closes dropdown
- [ ] Clicking outside the dropdown (on document) closes it
- [ ] "Switch Child" button emits `switchProfileRequested`
- [ ] "Add New Member" button emits `addChildRequested`
- [ ] Empty state shown when no children exist
- [ ] All strings use `i18n.t()` with new `header.*` keys (SQ + EN)
- [ ] ShellComponent no longer contains header template; uses `<app-header>` tag
- [ ] All animations match REDESIGN_PLAN motion principles (350ms cubic-bezier, etc.)
- [ ] No TypeScript errors, no missing imports

---

## 11. Notes

- Age chip displays `{n} vjeç` (SQ) or `{n} years` (EN) — use `getChildAge()` from DataService
- Age calculation: if child < 1 year, display `{n} muaj` / `{n} months`
- Back button only visible when `viewState === 'app'` (same as current behavior)
- The dropdown uses `animate-slide-up` (not `animate-fade-in`) per REDESIGN_PLAN motion spec
- Click-outside detection via `HostListener('document:click', [...])` checking `!dropdownRef.nativeElement.contains(event.target) && !triggerRef.nativeElement.contains(event.target)`