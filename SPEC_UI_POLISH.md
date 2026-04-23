# SPEC — Sprint 10: UI Polish & Accessibility

**Status:** Draft
**Repo:** `C:\Users\g_gus\Desktop\jona\kiddok`
**Stack:** Angular 19, Tailwind CSS, Lucide icons, i18n service

---

## 1. Empty States

Every list needs: icon (Lucide) + message (bilingual) + CTA button.

| Component | Icon | Message SQ | Message EN | CTA | Status |
|-----------|------|------------|-----------|-----|--------|
| `children list` (shell selector) | `users` / `party-popper` | "Ski fëmijë të regjistruar. Shto fëmijën e parë!" | "No children yet. Add your first child!" | `+ Shto Fëmijën` | ✅ exists (no CTA button though) |
| `temperature-diary` | `thermometer` | "Ski matje të regjistruar." | "No readings yet." | `+ Shto Temperaturën` | ❌ has empty text but NO CTA button |
| `growth-tracking` | `ruler` | "Ski matje të regjistruar." | "No measurements yet." | `+ Shto Matjen` | ❌ has empty text but NO CTA button |
| `vaccines` | `syringe` (existing SVG) | already i18n | already i18n | `+ Shto Vaksina` | ✅ |
| `diary` | `book-open` | "Nuk ka shënime për këtë ditë." | "No entries for this day." | `+ Shto Ditari` | ⚠️ check CTA |
| `medications` | `pill` (existing SVG) | already i18n | already i18n | `+ Shto Medikamentin` | ✅ |
| `appointments` | `calendar-check` (existing SVG) | already i18n | already i18n | `+ Shto Takimin` | ✅ |

### TODO — Empty State Fixes

#### 1a. `temperature-diary.component.ts` — Add CTA button to empty state

**File:** `src/app/components/temperature-diary.component.ts`
**Location:** ~line 215 (inside `@if (recentReadings().length === 0)`)

**BEFORE:**
```html
<div class="px-6 pb-8 text-center">
  <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
    <lucide-icon name="thermometer" class="text-inherit"></lucide-icon>
  </div>
  <p class="text-slate-400 font-medium mb-3">{{ i18n.t()['temperature.noReadings'] }}</p>
  <p class="text-primary-600 font-bold text-sm">{{ i18n.t()['temperature.addFirst'] }}</p>
</div>
```

**AFTER:**
```html
<div class="px-6 pb-8 text-center">
  <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
    <lucide-icon name="thermometer" class="text-inherit"></lucide-icon>
  </div>
  <p class="text-slate-400 font-medium mb-3">{{ i18n.t()['temperature.noReadings'] }}</p>
  <!-- Sprint 10: CTA button for empty state -->
  <button (click)="formTemp.set(null); document.querySelector<HTMLInputElement>('input[type=number]')?.focus()"
    class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-sm transition-all text-sm inline-flex items-center gap-2">
    <lucide-icon name="plus" class="text-inherit"></lucide-icon>
    {{ i18n.t()['temperature.addFirst'] || 'Shto Temperaturën' }}
  </button>
</div>
```

Also add translation key if missing:
```
'temperature.addFirst': { sq: 'Shto Temperaturën', en: 'Add Reading' }
```

#### 1b. `growth-tracking.component.ts` — Add CTA button to empty state

**File:** `src/app/components/growth-tracking.component.ts`
**Location:** ~line 214 (inside `@if (recentEntries().length === 0)`)

**AFTER:**
```html
<div class="px-6 pb-8 text-center">
  <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
    <lucide-icon name="ruler" class="text-inherit"></lucide-icon>
  </div>
  <p class="text-slate-400 font-medium mb-3">{{ i18n.t()['growth.noData'] }}</p>
  <!-- Sprint 10: CTA button for empty state -->
  <button (click)="document.querySelector<HTMLInputElement>('input[type=number]')?.focus()"
    class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-sm transition-all text-sm inline-flex items-center gap-2">
    <lucide-icon name="plus" class="text-inherit"></lucide-icon>
    {{ i18n.t()['growth.addFirst'] || 'Shto Matjen' }}
  </button>
</div>
```

Also add translation key:
```
'growth.addFirst': { sq: 'Shto Matjen', en: 'Add Measurement' }
```

#### 1c. `shell.component.ts` — Add CTA button to empty child selector

**File:** `src/app/components/shell.component.ts`
**Location:** ~line 73 (inside child selector empty state)

The welcome screen already has a "+ Shto Fëmijën" button — just ensure the i18n key `child.addNew` matches the CTA requirement.

---

## 2. Loading Skeletons

Replace any spinners with CSS `.skeleton` class (`bg-gray-200 animate-pulse rounded`).
All existing skeletons already use `animate-pulse` + `bg-gray-200`. Confirm all match content shape.

| Component | Skeleton Rows | Status |
|-----------|---------------|--------|
| `vaccines` | 3 rows (avatar + name + date) | ✅ |
| `medications` | 3 rows | ✅ |
| `appointments` | 3 rows | ✅ |
| `temperature-diary` | **MISSING** | ❌ add 3 rows (temp value + date + location) |
| `growth-tracking` | **MISSING** | ❌ add 3 rows (height + weight + date) |
| `diary` | **MISSING** | ❌ add 3 rows |
| `shell` (children list) | **MISSING** | ❌ add 2 rows (avatar + name) |

### TODO — Skeleton Implementation

#### 2a. `temperature-diary.component.ts` — Add loading skeleton

**AFTER the alert banner, BEFORE the main card (~line 19):**
```html
<!-- Loading Skeleton (Sprint 10) -->
@if (loading()) {
  <div class="px-4 space-y-4">
    <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 p-8 animate-pulse">
      <div class="flex flex-col items-center">
        <div class="w-32 h-16 bg-gray-200 rounded mb-4"></div>
        <div class="w-24 h-6 bg-gray-200 rounded mb-2"></div>
      </div>
    </div>
    <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 p-6">
      <div class="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div class="grid grid-cols-5 gap-2">
        @for (i of [1,2,3,4,5]; track i) {
          <div class="h-10 bg-gray-200 rounded-2xl"></div>
        }
      </div>
    </div>
  </div>
}
```

Add `loading = signal(false)` if not present. Wire it to data fetch in `ngOnInit`.

#### 2b. `growth-tracking.component.ts` — Add loading skeleton

**AFTER header (~line 20):**
```html
<!-- Loading Skeleton (Sprint 10) -->
@if (loading()) {
  <div class="grid grid-cols-2 gap-4 mb-6">
    @for (i of [1,2]; track i) {
      <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 p-6 animate-pulse">
        <div class="w-10 h-10 bg-gray-200 rounded-full mx-auto mb-3"></div>
        <div class="w-24 h-4 bg-gray-200 rounded mx-auto mb-2"></div>
        <div class="w-16 h-8 bg-gray-200 rounded mx-auto"></div>
      </div>
    }
  </div>
}
```

#### 2c. `diary.component.ts` — Add loading skeleton

Check for a `loading` signal and add 3 skeleton rows for the diary list.

#### 2d. `shell.component.ts` — Add loading skeleton for child list

When `dataService.children().length === 0` and data is loading, show:
```html
@if (childrenLoading()) {
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    @for (i of [1,2]; track i) {
      <div class="bg-white rounded-[2rem] p-8 shadow-md border border-slate-100 animate-pulse">
        <div class="flex items-center gap-5 mb-5">
          <div class="w-16 h-16 rounded-full bg-gray-200"></div>
          <div class="space-y-2">
            <div class="w-32 h-5 bg-gray-200 rounded"></div>
            <div class="w-20 h-4 bg-gray-100 rounded"></div>
          </div>
        </div>
        <div class="h-10 bg-gray-100 rounded-2xl"></div>
      </div>
    }
  </div>
}
```

---

## 3. i18n Audit — Hardcoded Albanian/English Strings

**Scope:** All `src/app/**/*.ts` inline templates (Angular uses inline templates, no separate HTML files)
**Pattern:** `i18n.isSq() ? 'hardcoded SQ' : 'hardcoded EN'` used directly in template

### 3a. `shell.component.ts` — Hardcoded inline i18n strings

| Line | Original String | Proposed Key |
|------|---------------|--------------|
| 58 | `Ndryshimet u ruajtën!` / `Changes saved!` | `child.saveSuccess` |
| 149 | `Emri mund të përmbajë vetëm shkronja.` / `Name can only contain letters.` | `validation.nameLettersOnly` |
| 206 | `Mashkull` / `Male` | `child.gender.male` |
| 207 | `Femer` / `Female` | `child.gender.female` |
| 364 | `Emri mund të përmbajë vetëm shkronja.` / `Name can only contain letters.` | `validation.nameLettersOnly` (reuse) |
| 415 | `Grupi i gjakut u verifikua.` / `Blood type verified.` | `child.bloodType.verified` |
| 429 | `Mashkull` / `Male` | `child.gender.male` (reuse) |
| 430 | `Femer` / `Female` | `child.gender.female` (reuse) |
| 501 | `Ndryshimet u ruajtën!` / `Changes saved!` | `child.saveSuccess` (reuse) |
| 509 | `Duke ruajtur...` / `Saving...` | `child.saving` |
| 529 | `Fshi profilin e fëmijës?` / `Delete child profile?` | `child.deleteConfirmTitle` |
| 533 | `Ky veprim nuk mund të kthehet. Të gjitha të dhënat do të fshihen përgjithmonë.` / `This action cannot be undone. All data will be permanently deleted.` | `child.deleteConfirmBody` |
| 537 | `Anulo` / `Cancel` | `child.cancel` (already exists) |
| 542 | `Fshi` / `Delete` | `child.delete` |

**Fix pattern:**
```typescript
// BEFORE
<span>{{ i18n.isSq() ? 'Ndryshimet u ruajtën!' : 'Changes saved!' }}</span>

// AFTER
<span>{{ i18n.t()['child.saveSuccess'] }}</span>
```

### 3b. `header.component.ts` — Hardcoded inline i18n

| Line | Original String | Proposed Key |
|------|---------------|--------------|
| 228 | `Aktiv` / `Active` | `child.activeBadge` |

**Fix:**
```typescript
// BEFORE
{{ i18n.isSq() ? 'Aktiv' : 'Active' }}

// AFTER
{{ i18n.t()['child.activeBadge'] }}
```

### 3c. `offline-indicator.component.ts` — Hardcoded strings

| Line | Original String | Proposed Key |
|------|---------------|--------------|
| 62 | `Duke pritur sinkronizim` / `Pending sync` | `sync.pending` |

### 3d. `sync-status.component.ts` — Hardcoded strings

| Line | Original String | Proposed Key |
|------|---------------|--------------|
| 271 | `Duke sinkronizuar...` / `Syncing...` | `sync.syncing` |

### 3e. `offline.service.ts` — Hardcoded i18n strings

| Line | Original String | Proposed Key |
|------|---------------|--------------|
| 130 | `Jeni online! Duke sinkronizuar të dhënat...` | `offline.onlineSyncing` |
| 141 | `Jeni offline. Të dhënat do të ruhen lokallisht.` | `offline.offline` |

### 3f. `data.service.ts` — Hardcoded error toast messages

All error toasts use raw Albanian strings. Replace with i18n key:
```
// BEFORE
this.toast.show('Ndodhi një gabim, provoni përsëri', 'error');

// AFTER — define error key first
this.toast.show(i18n.t()['error.generic'], 'error');
```

Define in `i18n.service.ts`:
```typescript
'error.generic': { sq: 'Ndodhi një gabim, provoni përsëri.', en: 'An error occurred, please try again.' },
'error.exportFailed': { sq: 'Eksportimi dështoi. Provoni përsëri.', en: 'Export failed. Please try again.' },
```

---

## 4. Accessibility

### 4a. Icon-only buttons missing `aria-label`

| File | Line | Button | Fix |
|------|------|--------|-----|
| `sidebar.component.ts` | 63 | settings footer | Add `aria-label="{{ t()['sidebar.footer.settings'] }}"` |
| `sidebar.component.ts` | 67 | logout footer | Add `aria-label="{{ t()['sidebar.footer.logout'] }}"` |
| `header.component.ts` | 34 | hamburger menu | Add `aria-label="{{ i18n.t()['nav.menu'] }}"` |
| `shell.component.ts` | (locale toggle in sidebar) | locale toggle | Already has `aria-label` ✅ |
| `bottom-nav.component.ts` | various | nav items | Already uses `[attr.aria-label]="label(tab.labelKey)"` ✅ |

**Sidebar logout button — BEFORE:**
```html
<button type="button" class="sidebar__footer-item sidebar__footer-item--logout" (click)="logout()">
  <lucide-icon name="log-out" class="sidebar__nav-icon" aria-hidden="true"></lucide-icon>
```

**AFTER:**
```html
<button type="button" class="sidebar__footer-item sidebar__footer-item--logout" (click)="logout()"
        aria-label="{{ t()['sidebar.footer.logout'] }}">
  <lucide-icon name="log-out" class="sidebar__nav-icon" aria-hidden="true"></lucide-icon>
```

### 4b. Form inputs — ensure `<label>` or `aria-label` exists

Audit all `<input>`, `<select>`, `<textarea>` elements:

| File | Field | Issue |
|------|-------|-------|
| `shell.component.ts` | full name input | Has `<label>` ✅ |
| `shell.component.ts` | DOB input | Has `<label>` ✅ |
| `shell.component.ts` | birth weight input | Has `<label>` ✅ |
| `shell.component.ts` | blood type select | Has `<label>` ✅ |
| `shell.component.ts` | gender select | Has `<label>` ✅ |
| `shell.component.ts` | edit name input | Has `<label>` ✅ |
| `shell.component.ts` | edit weight input | Has `<label>` ✅ |
| `shell.component.ts` | edit height input | Has `<label>` ✅ |
| `growth-tracking.component.ts` | date input | Has `<label>` ✅ |
| `growth-tracking.component.ts` | height input | Has `<label>` ✅ |
| `growth-tracking.component.ts` | weight input | Has `<label>` ✅ |
| `temperature-diary.component.ts` | temp input | Has `<label>` ✅ |
| `temperature-diary.component.ts` | time input | Has `<label>` ✅ |
| `medications.component.ts` | all form inputs in modal | Review — some may lack labels in modal |
| `appointments.component.ts` | all form inputs in modal | Review — some may lack labels in modal |

**Modal inputs to verify (medications, appointments):**
```html
<!-- BEFORE: may have placeholder only -->
<input type="text" [(ngModel)]="formName" placeholder="Name" class="...">

<!-- AFTER: add label -->
<label class="block ...">{{ i18n.t()['medications.name'] }}</label>
<input type="text" [(ngModel)]="formName" ...>
```

### 4c. Modal focus trap

**Files to fix:** `shell.component.ts` (add/edit child modal), `medications.component.ts` (add/edit modal), `appointments.component.ts` (add/edit modal), `sync-status.component.ts` (conflict modal)

**Implementation approach (manual, no external library):**

```typescript
// In component class
private focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

openModal() {
  this.modalOpen.set(true);
  setTimeout(() => {
    const modal = document.querySelector('[role="dialog"]') as HTMLElement;
    if (modal) {
      const first = modal.querySelector(this.focusableSelectors) as HTMLElement;
      first?.focus();
    }
  }, 0);
}

closeModal() {
  // Return focus to trigger
  const trigger = this.lastFocusedTrigger as HTMLElement;
  trigger?.focus();
  this.modalOpen.set(false);
}
```

**Shell modal — BEFORE:**
```html
<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
     (click)="closeModal()">
  <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md..."
       (click)="$event.stopPropagation()">
```

**AFTER:**
```html
<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
     role="dialog"
     aria-modal="true"
     [attr.aria-label]="i18n.t()['child.addNew']"
     (click)="closeModal()">
  <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md..."
       (click)="$event.stopPropagation()"
       #modalContent>
```

Also handle `Escape` key to close:
```typescript
@HostListener('document:keydown.escape')
onEscape() { if (this.modalOpen()) this.closeModal(); }
```

---

## 5. Toast Notifications

**Current state:** Toast is rendered as inline `div` inside edit form (shell), NOT as a fixed overlay. No auto-dismiss timer.

### TODO — Toast Service Upgrade

**File:** `src/app/services/toast.service.ts`

```typescript
// CURRENT (minimal)
show(message: string, type: 'success' | 'error' | 'info') {
  this.listeners.forEach(l => l(message, type));
}

// PROPOSED — add auto-dismiss
show(message: string, type: 'success' | 'error' | 'info' = 'info') {
  const duration = type === 'success' ? 3000 : type === 'error' ? 5000 : 3000;
  this.listeners.forEach(l => l(message, type, duration));
}
```

**New dedicated toast component** (`src/app/components/toast.component.ts`):
- Fixed position: `fixed bottom-4 right-4 z-[200]`
- Stacks multiple toasts vertically
- Success: teal/green styling, 3s auto-dismiss
- Error: red styling, 5s auto-dismiss
- Includes close button
- Uses `role="alert"` for screen readers

**Placement:** Add `<app-toast>` in `app.component.ts` root.

---

## 6. Responsive — Sidebar Mobile Collapse

**Current state:** `app-sidebar` uses `hidden lg:block` (always hidden on mobile). Hamburger button exists in `header.component.ts` line 34 but is **not wired to any action**.

### TODO — Mobile sidebar with hamburger menu

**1. `shell.component.ts` — Add mobile sidebar state and hamburger handler:**

```typescript
sidebarOpen = signal(false);

toggleSidebar() {
  this.sidebarOpen.update(v => !v);
}
```

**2. Add mobile sidebar overlay in shell template:**

```html
<!-- Mobile Sidebar Overlay (Sprint 10) -->
@if (sidebarOpen()) {
  <div class="fixed inset-0 z-40 flex">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/40 backdrop-blur-sm"
         (click)="sidebarOpen.set(false)"
         aria-hidden="true"></div>
    <!-- Sidebar panel -->
    <app-sidebar class="relative z-50 transform transition-transform duration-300"
                 [class.translate-x-0]="sidebarOpen()"
                 [class.-translate-x-full]="!sidebarOpen()" />
  </div>
}
```

**3. Wire header hamburger button to `toggleSidebar()`:**
```typescript
// header.component.ts
@Output() hamburgerClicked = new EventEmitter<void>();

// header.template.html
<button type="button" class="lg:hidden ..." (click)="hamburgerClicked.emit()">
```

```html
<!-- shell.component.html -->
<app-header ... (hamburgerClicked)="toggleSidebar()" />
```

**4. CSS — sidebar on mobile (full-height, slide-in from left):**
```css
/* In sidebar.component.ts styles */
@media (max-width: 1023px) {
  :host {
    @apply fixed top-0 left-0 h-full w-72;
  }
}
```

**5. Hide desktop sidebar on mobile:**
```html
<!-- shell.component.html -->
<app-sidebar class="hidden lg:block" />  <!-- stays desktop-only -->
```

---

## Summary Checklist

### Must Fix (Sprint 10)
- [ ] `temperature-diary`: add CTA button to empty state
- [ ] `growth-tracking`: add CTA button to empty state
- [ ] `temperature-diary`: add loading skeleton (3 rows)
- [ ] `growth-tracking`: add loading skeleton (3 rows)
- [ ] `diary`: add loading skeleton if missing
- [ ] `shell`: add loading skeleton for children list (2 rows)
- [ ] All `shell.component.ts` hardcoded strings → i18n keys (13+ strings)
- [ ] `header.component.ts` line 228: `Aktiv` → i18n key
- [ ] Sidebar logout button: add `aria-label`
- [ ] Header hamburger: wire to `toggleSidebar()`
- [ ] Mobile sidebar overlay with backdrop
- [ ] Modal focus trap in shell, medications, appointments
- [ ] Toast: create dedicated fixed-position component with auto-dismiss

### i18n Translation Keys to Add
```
child.saveSuccess
child.gender.male
child.gender.female
child.bloodType.verified
child.saving
child.deleteConfirmTitle
child.deleteConfirmBody
validation.nameLettersOnly
child.activeBadge
sync.pending
sync.syncing
offline.onlineSyncing
offline.offline
error.generic
error.exportFailed
temperature.addFirst
growth.addFirst
nav.menu
```
