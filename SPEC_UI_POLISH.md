# KidDok — Sprint 10: UI Polish & Accessibility
**Architect:** The Architect
**Date:** 2026-04-23
**Status:** Draft → For Executor
**Working Dir:** `C:\Users\g_gus\Desktop\jona\kiddok`

---

## 1. Module Overview

Audit and fix cross-cutting UI/UX issues across all Angular components:
- Empty states for all list views
- Loading skeleton patterns
- i18n hardcoded string audit
- WCAG 2.1 AA accessibility
- Toast/snackbar consistency
- Mobile responsiveness

---

## 2. Component Inventory

| Component | File | Empty State | Skeleton | Hardcoded i18n | Missing aria-label | Responsive |
|-----------|------|------------|----------|----------------|-------------------|------------|
| `shell` | `src/app/components/shell.component.ts` | ✅ welcome | ❌ no skeleton on load | ❌ delete btn | ❌ date picker btn, locale btn | ❌ no mobile sidebar toggle |
| `temperature-diary` | `src/app/components/temperature-diary.component.ts` | ⚠️ missing CTA | ❌ none | ❌ delete btn icon | ❌ | ✅ |
| `growth-tracking` | `src/app/components/growth-tracking.component.ts` | ⚠️ missing CTA | ❌ none | ❌ | ❌ | ✅ |
| `vaccines` | `src/app/components/vaccines.component.ts` | ✅ | ✅ | ❌ | ⚠️ some | ✅ |
| `medications` | `src/app/components/medications/medications.component.ts` | ✅ | ✅ | ❌ | ⚠️ some | ✅ |
| `appointments` | `src/app/components/appointments/appointments.component.ts` | ✅ | ✅ | ❌ | ⚠️ some | ✅ |
| `diary` | `src/app/components/diary.component.ts` | ✅ | ❌ none | ❌ day names, 'Hëngri' | ⚠️ | ✅ |
| `home` | `src/app/components/home.component.ts` | N/A | ❌ | ❌ | ❌ | ✅ |
| `sidebar` | `src/app/components/sidebar.component.ts` | N/A | N/A | ❌ | ❌ locale btn | ❌ mobile collapse |

---

## 3. Execution Roadmap

### Step 1 — Global CSS: `.skeleton` Class
**File:** `src/styles.css`

Add skeleton pulse utility:
```css
@layer components {
  .skeleton {
    @apply animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%];
    animation: skeleton-pulse 1.5s ease-in-out infinite;
  }
  @keyframes skeleton-pulse {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
}
```

**Reasoning:** Single source of truth for skeleton animation. Tailwind's `animate-pulse` is too fast (1s) and single-color. The gradient shimmer reads better for content-shaped skeletons.

---

### Step 2 — Shell: Children List Skeleton + Mobile Sidebar
**File:** `src/app/components/shell.component.ts`

#### 2a. Add `loadingChildren` signal to ShellComponent
```typescript
loadingChildren = signal(true); // set false after dataService.loadChildren()
```
Add to `ngOnInit`:
```typescript
// After children load:
this.loadingChildren.set(false);
```

#### 2b. Add skeleton card template in selector view
Replace the blank `@if (dataService.children().length === 0 && !isAddingChild())` with:
```html
@if (loadingChildren()) {
  <!-- Skeleton cards -->
  @for (i of [1,2,3]; track i) {
    <div class="skeleton bg-white rounded-[2rem] p-8 shadow-md border border-slate-100 h-48"></div>
  }
} @else if (dataService.children().length === 0 && !isAddingChild()) {
  <!-- Welcome empty state (existing) -->
}
```

#### 2c. Add `sidebarOpen = signal(false)` + mobile toggle button
In the `<app-header>` template, add a hamburger button (visible ≤768px):
```html
<button
  type="button"
  class="lg:hidden w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
  (click)="sidebarOpen.set(!sidebarOpen())"
  aria-label="Open navigation menu"
  aria-expanded="{{ sidebarOpen() }}">
  <lucide-icon name="menu" aria-hidden="true"></lucide-icon>
</button>
```

#### 2d. Add mobile sidebar overlay
After `<app-sidebar>` in the template:
```html
<!-- Mobile Sidebar Overlay -->
@if (sidebarOpen()) {
  <div
    class="lg:hidden fixed inset-0 z-40 bg-black/40"
    (click)="sidebarOpen.set(false)"
    aria-hidden="true">
  </div>
  <app-sidebar class="lg:hidden fixed left-0 top-0 z-50" />
}
```

#### 2e. Add `sidebarOpen` signal, `@HostListener` for Escape key
```typescript
@HostListener('document:keydown.escape')
onEscape() { this.sidebarOpen.set(false); }
```

#### 2f. Add CTA button to temperature-diary empty state (shell has no temp — this is per child view)
The shell doesn't directly show temperature. The actual temperature is shown in `temperature-diary.component.ts`.

---

### Step 3 — Temperature Diary: Skeleton + aria-label Fix
**File:** `src/app/components/temperature-diary.component.ts`

#### 3a. Add `loading = signal(true)` + skeleton for recent readings
In `ngOnInit`, after `loadReadings()` resolves, set `this.loading.set(false)`.

Add skeleton template in recent readings section:
```html
@if (loading()) {
  <div class="px-6 pb-6 space-y-3">
    @for (i of [1,2,3]; track i) {
      <div class="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 skeleton h-16"></div>
    }
  </div>
} @else if (recentReadings().length === 0) {
  <!-- existing empty state -->
  <div class="px-6 pb-8 text-center">
    <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <lucide-icon name="thermometer" class="text-inherit"></lucide-icon>
    </div>
    <p class="text-slate-400 font-medium mb-3">{{ i18n.t()['temperature.noReadings'] }}</p>
    <button (click)="scrollToForm()"
            class="bg-primary-600 hover:bg-primary-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all">
      {{ i18n.t()['temperature.addFirst'] }}
    </button>
  </div>
} @else {
  <!-- existing readings list -->
}
```

#### 3b. Fix delete button aria-label
```html
<!-- BEFORE (line ~225) -->
<button (click)="deleteEntry(entry.id)"
        class="opacity-0 group-hover:opacity-100 w-9 h-9 ...">
  <lucide-icon name="trash-2" class="text-inherit"></lucide-icon>
</button>

<!-- AFTER -->
<button (click)="deleteEntry(entry.id)"
        class="opacity-0 group-hover:opacity-100 w-9 h-9 ..."
        [attr.aria-label]="i18n.t()['temperature.delete']">
  <lucide-icon name="trash-2" class="text-inherit" aria-hidden="true"></lucide-icon>
</button>
```

#### 3c. Add `scrollToForm()` method
```typescript
scrollToForm() {
  document.querySelector('.bg-white.rounded-\\[2rem\\].overflow-hidden:last-child')
    ?.scrollIntoView({ behavior: 'smooth' });
}
```

---

### Step 4 — Growth Tracking: Skeleton + aria-label Fix
**File:** `src/app/components/growth-tracking.component.ts`

#### 4a. Add `loading = signal(true)` + skeleton for recent measurements
In `ngOnInit`, after `loadEntries()` resolves, set `this.loading.set(false)`.

Add skeleton in recent measurements section:
```html
@if (loading()) {
  <div class="px-6 pb-6 space-y-3">
    @for (i of [1,2,3]; track i) {
      <div class="skeleton h-16 rounded-2xl"></div>
    }
  </div>
} @else if (recentEntries().length === 0) {
  <!-- existing empty state, add CTA button -->
  <div class="px-6 pb-8 text-center">
    <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <lucide-icon name="trending-up" class="text-inherit"></lucide-icon>
    </div>
    <p class="text-slate-400 font-medium mb-3">{{ i18n.t()['growth.noData'] }}</p>
    <button (click)="scrollToForm()"
            class="bg-primary-600 hover:bg-primary-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all">
      {{ i18n.t()['growth.addFirst'] }}
    </button>
  </div>
} @else {
  <!-- existing list -->
}
```

#### 4b. Fix delete button aria-label
```html
<!-- AFTER -->
<button (click)="deleteEntry(entry.id)"
        class="opacity-0 group-hover:opacity-100 w-9 h-9 ..."
        [attr.aria-label]="i18n.t()['growth.delete']">
  <lucide-icon name="trash-2" class="text-inherit" aria-hidden="true"></lucide-icon>
</button>
```

#### 4c. Add `scrollToForm()` method

---

### Step 5 — Diary: Hardcoded i18n Fix
**File:** `src/app/components/diary.component.ts`

#### 5a. Fix hardcoded day-of-week arrays (lines ~406-407)
Replace hardcoded arrays with i18n lookup:
```typescript
// BEFORE
: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
: ['Di', 'Hën', 'Mar', 'Mër', 'Enj', 'Pre', 'Sht']

// AFTER
weekDays = computed(() => {
  if (this.i18n.isSq()) {
    return ['Die', 'Hën', 'Mar', 'Mër', 'Enj', 'Pre', 'Sht'].map((d, i) =>
      new Date(2024, 0, i + 1).toLocaleDateString('sq-AL', { weekday: 'short' })
    );
  }
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
});
```

Or simpler: derive from locale directly:
```typescript
weekDays = computed(() => {
  const base = new Date(2024, 0, 7); // a Sunday
  return Array.from({ length: 7 }, (_, i) =>
    new Date(base.getTime() + i * 86400000)
      .toLocaleDateString(this.i18n.locale() === 'sq' ? 'sq-AL' : 'en-US', { weekday: 'short' })
  );
});
```

#### 5b. Fix hardcoded 'Hëngri' string (line ~353)
```typescript
// BEFORE
{ type: 'meal', emoji: '🍽️', labelKey: 'diary.quickAdd.ate', description: 'Hëngri', ... }

// AFTER
{ type: 'meal', emoji: '🍽️', labelKey: 'diary.quickAdd.ate', description: '', ... }
// The label comes from i18n.t()[labelKey]
```

#### 5c. Fix arrow diff display (growth tracking uses ↑ ↓ characters — these are fine as symbols, but must be wrapped for i18n if text)

---

### Step 6 — Shell: aria-label Fixes
**File:** `src/app/components/shell.component.ts`

#### 6a. Fix icon-only date-picker buttons (lines ~159, ~378)
```html
<!-- BEFORE -->
<button type="button" onclick="this.previousElementSibling.showPicker?.()"
        class="absolute right-3 top-1/2 -translate-y-1/2 ...">
  <lucide-icon name="calendar" class="text-inherit"></lucide-icon>
</button>

<!-- AFTER -->
<button type="button" onclick="this.previousElementSibling.showPicker?.()"
        class="absolute right-3 top-1/2 -translate-y-1/2 ..."
        aria-label="Open calendar">
  <lucide-icon name="calendar" class="text-inherit" aria-hidden="true"></lucide-icon>
</button>
```

#### 6b. Fix locale toggle button (sidebar)
Already has dynamic aria-label but needs `aria-hidden` on icon:
```html
<!-- In sidebar: -->
<button type="button" class="locale-toggle" (click)="i18n.toggleLocale()"
        [attr.aria-label]="'Switch to ' + (i18n.locale() === 'sq' ? 'English' : 'Albanian')">
  {{ i18n.locale() === 'sq' ? 'EN' : 'SQ' }}
</button>
```
Icon should have `aria-hidden="true"` if text label is present.

---

### Step 7 — Vaccines / Medications / Appointments: aria-label Audit
**Files:**
- `src/app/components/vaccines.component.ts`
- `src/app/components/medications/medications.component.ts`
- `src/app/components/appointments/appointments.component.ts`

#### 7a. Find all icon-only buttons without aria-label
```bash
# Search pattern: <button[^>]*>[\s]*<lucide-icon
# Then check if [attr.aria-label] is present
```

For each delete/edit button in the list views, ensure:
```html
<button (click)="deleteXxx(id)"
        [attr.aria-label]="i18n.t()['xxx.delete']">
  <lucide-icon name="trash-2" aria-hidden="true"></lucide-icon>
</button>
```

Add translation keys if missing:
```typescript
// In i18n.service.ts translations object:
'vaccines.delete': { sq: 'Fshi', en: 'Delete' },
'medications.delete': { sq: 'Fshi', en: 'Delete' },
'appointments.delete': { sq: 'Fshi', en: 'Delete' },
```

#### 7b. Vaccines: Mark complete button
```html
<!-- In vaccine list item -->
<button (click)="markComplete(vaccine.id)"
        [attr.aria-label]="i18n.t()['vaccines.markComplete']">
  <lucide-icon name="check" aria-hidden="true"></lucide-icon>
</button>
```

---

### Step 8 — Modal Focus Trap
**File:** `src/app/components/shell.component.ts`

#### 8a. Add Edit Child Modal focus trap
```typescript
// In openEditModal():
private previouslyFocused: HTMLElement | null = null;

openEditModal(child: ChildProfile) {
  this.previouslyFocused = document.activeElement as HTMLElement;
  this.editingChild.set(child);
  setTimeout(() => {
    const modal = document.querySelector('[role="dialog"]') as HTMLElement;
    const firstFocusable = modal?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();
  });
}

// In closeEditModal():
closeEditModal() {
  this.editingChild.set(null);
  this.previouslyFocused?.focus();
}
```

#### 8b. Add role="dialog" + aria-modal to edit modal
```html
@if (editingChild()) {
  <div role="dialog" aria-modal="true" aria-labelledby="edit-modal-title"
       class="fixed inset-0 z-50 flex items-center justify-center ...">
```

#### 8c. Add `@HostListener('document:keydown.escape')` to close modals
```typescript
@HostListener('document:keydown.escape')
onEscape() {
  if (this.editingChild()) this.closeEditModal();
  if (this.showDeleteConfirm()) this.showDeleteConfirm.set(false);
}
```

---

### Step 9 — Toast / Snackbar Consistency
**File:** `src/styles.css`

#### 9a. Add toast container styles
```css
.toast-container {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  pointer-events: none;
}
.toast {
  pointer-events: auto;
  padding: 0.875rem 1.25rem;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 0.875rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  animation: toast-slide-in 0.3s ease-out;
  max-width: 360px;
}
.toast--success {
  background: #ECFDF5;
  border: 1px solid #A7F3D0;
  color: #065F46;
}
.toast--error {
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #991B1B;
}
@keyframes toast-slide-in {
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
}
```

#### 9b. Add `showToast(message: string, type: 'success' | 'error')` method to ShellComponent
```typescript
showToast(message: string, type: 'success' | 'error') {
  const duration = type === 'success' ? 3000 : 5000;
  // Push to toast signal array
  this.toasts.update(t => [...t, { id: Date.now(), message, type }]);
  setTimeout(() => {
    this.toasts.update(t => t.filter(x => x.id !== /* id */));
  }, duration);
}
```

#### 9c. Add toast template in shell template
```html
<div class="toast-container" aria-live="polite">
  @for (toast of toasts(); track toast.id) {
    <div class="toast" [ngClass]="'toast--' + toast.type" role="alert">
      {{ toast.message }}
    </div>
  }
</div>
```

#### 9d. Replace inline success/error toasts with `showToast()`
Lines ~497-505 and ~802: replace inline toasts with `this.showToast(...)`.

---

### Step 10 — Tap Target Minimum (44px)
**Files:** All component templates

All icon-only buttons must be at least 44×44px. Audit checklist:
- [ ] Sidebar nav items: already ≥44px ✅
- [ ] Bottom nav items: already ≥44px ✅
- [ ] All `<button>` elements: verify `min-height: 44px; min-width: 44px`
- [ ] Quick-add temperature buttons (grid, `py-3`): increase to `py-4` (min 44px)
- [ ] Delete buttons (`w-9 h-9` = 36px): increase to `w-11 h-11` (44px)
- [ ] Calendar day buttons (already `aspect-square`): ensure minimum 44px

In `src/styles.css`, add:
```css
button, [role="button"] {
  min-height: 44px;
  min-width: 44px;
}
```

---

## 4. Per-Component Checklist

### shell.component.ts
- [ ] `loadingChildren` signal + skeleton cards on child selector
- [ ] Mobile sidebar toggle button + overlay
- [ ] `sidebarOpen` signal + Escape key handler
- [ ] `aria-label` on date-picker icon buttons (×2)
- [ ] Modal focus trap: store focus, focus first element, restore
- [ ] `role="dialog"` + `aria-modal` on edit child modal
- [ ] Escape key closes modal
- [ ] Toast container + `showToast()` method
- [ ] Replace inline toasts with `showToast()`
- [ ] Ensure all icon-only buttons have `aria-hidden="true"` on lucide-icon

### temperature-diary.component.ts
- [ ] `loading` signal + skeleton for recent readings
- [ ] CTA button in empty state (add first reading)
- [ ] `aria-label` on delete button
- [ ] Quick-add buttons: increase height to min 44px
- [ ] `scrollToForm()` method for CTA

### growth-tracking.component.ts
- [ ] `loading` signal + skeleton for recent measurements
- [ ] CTA button in empty state (add first measurement)
- [ ] `aria-label` on delete button
- [ ] `scrollToForm()` method for CTA

### vaccines.component.ts
- [ ] `aria-label` on all icon-only buttons (edit, delete, mark-complete)
- [ ] Add `'vaccines.delete'` and `'vaccines.markComplete'` to i18n if missing

### medications.component.ts
- [ ] `aria-label` on all icon-only buttons
- [ ] Add `'medications.delete'` to i18n if missing

### appointments.component.ts
- [ ] `aria-label` on all icon-only buttons
- [ ] Add `'appointments.delete'` to i18n if missing

### diary.component.ts
- [ ] Replace hardcoded day-of-week arrays with locale-aware generation
- [ ] Fix hardcoded `'Hëngri'` string (remove, use i18n)
- [ ] Add `aria-label` to icon-only buttons in entry cards

### sidebar.component.ts
- [ ] Add `aria-label` to locale toggle button
- [ ] Mobile: add `aria-expanded` binding to locale toggle

---

## 5. i18n Translation Keys to Add

Add to `i18n.service.ts` `translations` object:
```typescript
// Accessibility / Common
'common.delete': { sq: 'Fshi', en: 'Delete' },
'common.edit': { sq: 'Redakto', en: 'Edit' },
'common.cancel': { sq: 'Anulo', en: 'Cancel' },
'common.save': { sq: 'Ruaj', en: 'Save' },
'common.close': { sq: 'Mbyll', en: 'Close' },
'common.openCalendar': { sq: 'Hap kalendarin', en: 'Open calendar' },
'common.openMenu': { sq: 'Hap menynë', en: 'Open menu' },
'common.closeMenu': { sq: 'Mbyll menynë', en: 'Close menu' },
```

---

## 6. Acceptance Criteria

| # | Criterion | Test |
|---|-----------|------|
| 1 | Children selector shows skeleton loaders while loading | Fresh app load with no children |
| 2 | Temperature recent readings shows skeleton while loading | Navigate to temperature tab |
| 3 | Growth recent measurements shows skeleton while loading | Navigate to growth tab |
| 4 | Every list empty state has CTA button that scrolls to form | All modules with empty list |
| 5 | All hardcoded strings replaced with i18n | Grep `[^i18n\.t\(`]\b[A-Z][a-z]+[^]` for common words |
| 6 | All icon-only buttons have aria-label | Accessibility audit |
| 7 | Modal focus: opens → first focusable element; closes → focus returns | Tab/Shift+Tab through modal |
| 8 | Toast: success auto-dismisses at 3s, error at 5s | Trigger save success + save error |
| 9 | Sidebar: hamburger visible ≤768px, opens overlay + sidebar | Resize browser |
| 10 | All tap targets ≥44×44px | Browser DevTools |
