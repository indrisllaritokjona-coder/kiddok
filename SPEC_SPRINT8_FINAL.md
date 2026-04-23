# SPEC — Sprint 8: UI Polish & Accessibility (FINAL)

**Status:** Final (verified against codebase)
**Repo:** `C:\Users\g_gus\Desktop\jona\kiddok`
**Stack:** Angular 19, Tailwind CSS, Lucide icons, i18n service
**Sprint:** 8 of N

---

## 1. Empty States

**Goal:** Every list/empty state must have: icon (Lucide) + message (i18n) + CTA button.

### Verified Current State

| Module | Empty State | CTA Button | i18n Message | Notes |
|--------|-------------|-----------|--------------|-------|
| `vaccines` | ✅ | ✅ button exists | ✅ | Line 91-94 has CTA |
| `medications` | ✅ | ✅ button exists | ✅ | |
| `appointments` | ✅ | ✅ button exists | ✅ | |
| `lab-results` | ✅ | ✅ button exists | ✅ | |
| `shell (children list)` | ✅ | ✅ button exists | ✅ | "+ Shto Fëmijën" |
| `diary` | ✅ text | ❌ NO CTA in empty area | ✅ | Line 146/198 has message only; header has + button |
| `temperature-diary` | ✅ text | ❌ NO CTA | ✅ key exists | `temperature.addFirst` rendered as `<p>` tag, not button |
| `growth-tracking` | ✅ text | ❌ NO CTA | ✅ key exists | `growth.addFirst` rendered as `<p>` tag, not button |

### TODO — Empty State Fixes

#### 1a. `temperature-diary.component.ts` — Convert `addFirst` text to CTA button

**File:** `src/app/components/temperature-diary.component.ts`
**Location:** ~line 203-204 (inside `@if (recentReadings().length === 0)`)

**CURRENT (lines ~203-204):**
```html
<p class="text-slate-400 font-medium mb-3">{{ i18n.t()['temperature.noReadings'] }}</p>
<p class="text-primary-600 font-bold text-sm">{{ i18n.t()['temperature.addFirst'] }}</p>
```

**AFTER:**
```html
<p class="text-slate-400 font-medium mb-3">{{ i18n.t()['temperature.noReadings'] }}</p>
<button (click)="formTemp.set(null)"
  class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-sm transition-all text-sm inline-flex items-center gap-2">
  <lucide-icon name="plus" class="text-inherit"></lucide-icon>
  {{ i18n.t()['temperature.addFirst'] }}
</button>
```

#### 1b. `growth-tracking.component.ts` — Convert `addFirst` text to CTA button

**File:** `src/app/components/growth-tracking.component.ts`
**Location:** ~line 213-214 (inside `@if (recentEntries().length === 0)`)

**CURRENT (lines ~213-214):**
```html
<p class="text-slate-400 font-medium mb-3">{{ i18n.t()['growth.noData'] }}</p>
<p class="text-primary-600 font-bold text-sm">{{ i18n.t()['growth.addFirst'] }}</p>
```

**AFTER:**
```html
<p class="text-slate-400 font-medium mb-3">{{ i18n.t()['growth.noData'] }}</p>
<button (click)="openAddForm()"
  class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-sm transition-all text-sm inline-flex items-center gap-2">
  <lucide-icon name="plus" class="text-inherit"></lucide-icon>
  {{ i18n.t()['growth.addFirst'] }}
</button>
```

> Note: `openAddForm()` method needs to be implemented — scroll to/add form section and focus first input.

#### 1c. `diary.component.ts` — Add CTA button to empty state

**File:** `src/app/components/diary.component.ts`
**Location:** ~line 146 (and line 198)

**CURRENT (line ~146):**
```html
<p class="text-slate-400 text-sm font-medium">{{ i18n.t()['diary.emptyState'] }}</p>
```

**AFTER:**
```html
<p class="text-slate-400 text-sm font-medium mb-4">{{ i18n.t()['diary.emptyState'] }}</p>
<button (click)="openAddEntry()"
  class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-sm transition-all text-sm inline-flex items-center gap-2">
  <lucide-icon name="plus" class="text-inherit"></lucide-icon>
  {{ i18n.t()['diary.addFirst'] || 'Shto Shënimin' }}
</button>
```

Add to i18n service if missing:
```
'diary.addFirst': { sq: 'Shto Shënimin', en: 'Add Entry' }
```

---

## 2. Loading Skeletons

**Goal:** Replace spinners + add skeletons to modules missing them. All skeletons use `animate-pulse` + `bg-gray-200`.

### Verified Current State

| Module | Skeleton | Notes |
|--------|----------|-------|
| `vaccines` | ✅ 3+ rows | Line 60-76 |
| `medications` | ✅ 3 rows | Line 104-119 |
| `appointments` | ✅ 3 rows | Line 68-83 |
| `lab-results` | ✅ 3 rows | Line 44-59 |
| `temperature-diary` | ❌ MISSING | Needs 3 rows (temp card + chart placeholder + list rows) |
| `growth-tracking` | ❌ MISSING | Needs 2 stat cards + 3 measurement rows |
| `diary` | ❌ MISSING | Needs calendar placeholder + 3 entry rows |
| `shell (children list)` | ❌ MISSING | Needs 2 child avatar+name rows |

### TODO — Skeleton Implementation

#### 2a. `temperature-diary.component.ts` — Add loading skeleton

**Location:** After alert banner, before main card (~line 19)

```html
<!-- Sprint 8: Loading Skeleton -->
@if (loading()) {
  <div class="px-4 space-y-4">
    <!-- Chart card skeleton -->
    <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 p-8 animate-pulse">
      <div class="flex flex-col items-center">
        <div class="w-32 h-16 bg-gray-200 rounded mb-4"></div>
        <div class="w-24 h-6 bg-gray-200 rounded mb-2"></div>
      </div>
    </div>
    <!-- Week grid skeleton -->
    <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 p-6 animate-pulse">
      <div class="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div class="grid grid-cols-5 gap-2">
        @for (i of [1,2,3,4,5]; track i) {
          <div class="h-10 bg-gray-200 rounded-2xl"></div>
        }
      </div>
    </div>
    <!-- List skeleton -->
    <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 p-6 animate-pulse">
      @for (i of [1,2,3]; track i) {
        <div class="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
          <div class="w-20 h-4 bg-gray-200 rounded"></div>
          <div class="w-16 h-4 bg-gray-200 rounded"></div>
        </div>
      }
    </div>
  </div>
}
```

Add `loading = signal(false)` if not present. Wire to data fetch in `ngOnInit`/`loadData()`.

#### 2b. `growth-tracking.component.ts` — Add loading skeleton

**Location:** After header, before stats cards (~line 20)

```html
<!-- Sprint 8: Loading Skeleton -->
@if (loading()) {
  <div class="space-y-4">
    <!-- Stats cards skeleton -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      @for (i of [1,2]; track i) {
        <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 p-6 animate-pulse">
          <div class="w-10 h-10 bg-gray-200 rounded-full mx-auto mb-3"></div>
          <div class="w-24 h-4 bg-gray-200 rounded mx-auto mb-2"></div>
          <div class="w-16 h-8 bg-gray-200 rounded mx-auto"></div>
        </div>
      }
    </div>
    <!-- Chart skeleton -->
    <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 p-6 animate-pulse">
      <div class="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div class="h-48 bg-gray-200 rounded-2xl"></div>
    </div>
    <!-- List skeleton -->
    <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 p-6 animate-pulse">
      @for (i of [1,2,3]; track i) {
        <div class="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
          <div class="w-24 h-4 bg-gray-200 rounded"></div>
          <div class="w-16 h-4 bg-gray-200 rounded"></div>
        </div>
      }
    </div>
  </div>
}
```

#### 2c. `diary.component.ts` — Add loading skeleton

**Location:** Before calendar grid

```html
<!-- Sprint 8: Loading Skeleton -->
@if (loading()) {
  <div class="space-y-4">
    <!-- Calendar skeleton -->
    <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 p-6 animate-pulse">
      <div class="flex justify-between items-center mb-4">
        <div class="w-32 h-6 bg-gray-200 rounded"></div>
        <div class="flex gap-2">
          <div class="w-10 h-10 bg-gray-200 rounded-xl"></div>
          <div class="w-10 h-10 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
      <div class="grid grid-cols-7 gap-2">
        @for (i of [1,2,3,4,5,6,7]; track i) {
          <div class="h-10 bg-gray-200 rounded-lg"></div>
        }
        @for (i of [1,2,3,4,5,6,7,8,9,10,11,12,13,14]; track i) {
          <div class="h-10 bg-gray-100 rounded-lg"></div>
        }
      </div>
    </div>
    <!-- Entries skeleton -->
    <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 p-6 animate-pulse">
      @for (i of [1,2,3]; track i) {
        <div class="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
          <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div class="flex-1">
            <div class="w-32 h-4 bg-gray-200 rounded mb-2"></div>
            <div class="w-48 h-3 bg-gray-100 rounded"></div>
          </div>
        </div>
      }
    </div>
  </div>
}
```

Add `loading = signal(false)` if not present. Wire to `loadData()`.

#### 2d. `shell.component.ts` — Add loading skeleton for children list

**Location:** Inside child selector area, before the existing `@if (dataService.children().length === 0)`

```html
<!-- Sprint 8: Children Loading Skeleton -->
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

Add `childrenLoading = signal(false)` to shell component.

---

## 3. i18n Audit — Hardcoded Albanian/English Strings

**Scope:** All `src/app/**/*.ts` inline templates
**Pattern to find:** `i18n.isSq() ? 'hardcoded SQ' : 'hardcoded EN'`

### Verified Hardcoded Strings

#### 3a. `shell.component.ts` — CONFIRMED hardcoded strings

| Line | Hardcoded String | i18n Key Action |
|------|-----------------|-----------------|
| 49 | `Ndryshimet u ruajtën!` / `Changes saved!` | ADD `child.saveSuccess`; replace |
| 197 | `Mashkull` / `Male` | REUSE `childForm.gender.male` |
| 198 | `Femer` / `Female` | REUSE `childForm.gender.female` |
| 412 | `Mashkull` / `Male` | REUSE `childForm.gender.male` |
| 413 | `Femer` / `Female` | REUSE `childForm.gender.female` |
| 484 | `Ndryshimet u ruajtën!` / `Changes saved!` | REUSE `child.saveSuccess` |
| 492 | `Duke ruajtur...` / `Saving...` | ADD `child.saving`; replace |
| 512 | `Fshi profilin e fëmijës?` / `Delete child profile?` | ADD `child.deleteConfirmTitle`; replace |
| 516 | Long delete body text | ADD `child.deleteConfirmBody`; replace |
| 520 | `Anulo` / `Cancel` | REUSE `child.cancel` |
| 525 | `Fshi` / `Delete` | ADD `child.delete`; replace |

**Fix pattern:**
```typescript
// BEFORE
{{ i18n.isSq() ? 'Ndryshimet u ruajtën!' : 'Changes saved!' }}

// AFTER
{{ i18n.t()['child.saveSuccess'] }}
```

#### 3b. `header.component.ts` — CONFIRMED hardcoded strings

| Line | Hardcoded String | i18n Key Action |
|------|-----------------|-----------------|
| 34 | `aria-label="Open menu"` | ADD `nav.menu`; replace with i18n |
| 239 | `Aktiv` / `Active` | ADD `child.activeBadge`; replace |

#### 3c. `sidebar.component.ts` — Footer buttons missing aria-label

| Line | Element | Fix |
|------|---------|-----|
| 63 | Settings button | Add `aria-label="{{ t()['sidebar.footer.settings'] }}"` |
| 67 | Logout button | Add `aria-label="{{ t()['sidebar.footer.logout'] }}"` |

**BEFORE (line 67):**
```html
<button type="button" class="sidebar__footer-item sidebar__footer-item--logout" (click)="logout()">
  <lucide-icon name="LogOut" class="sidebar__nav-icon" aria-hidden="true"></lucide-icon>
  <span>{{ t()['sidebar.footer.logout'] }}</span>
</button>
```

**AFTER:**
```html
<button type="button" class="sidebar__footer-item sidebar__footer-item--logout"
        (click)="logout()"
        [attr.aria-label]="t()['sidebar.footer.logout']">
  <lucide-icon name="LogOut" class="sidebar__nav-icon" aria-hidden="true"></lucide-icon>
  <span>{{ t()['sidebar.footer.logout'] }}</span>
</button>
```

#### 3d. `offline-indicator.component.ts` — Hardcoded strings

| Line | Hardcoded String | i18n Key Action |
|------|-----------------|-----------------|
| 62 | `Duke pritur sinkronizim` / `Pending sync` | ADD `sync.pending`; replace |

#### 3e. `offline.service.ts` — Hardcoded error toast messages

| Line | Hardcoded String | i18n Key Action |
|------|-----------------|-----------------|
| 130 | `Jeni online! Duke sinkronizuar të dhënat...` | ADD `offline.onlineSyncing`; replace |
| 141 | `Jeni offline. Të dhënat do të ruhen lokallisht.` | ADD `offline.offline`; replace |

#### 3f. `data.service.ts` — Hardcoded error toast messages

All raw Albanian strings in error toasts → ADD `error.generic` + `error.exportFailed` to i18n service and replace.

---

### New i18n Keys to Add

Add to `src/app/core/i18n/i18n.service.ts`:

```typescript
// Child profile
'child.saveSuccess':      { sq: 'Ndryshimet u ruajtën!', en: 'Changes saved!' },
'child.saving':           { sq: 'Duke ruajtur...', en: 'Saving...' },
'child.deleteConfirmTitle': { sq: 'Fshi profilin e fëmijës?', en: 'Delete child profile?' },
'child.deleteConfirmBody': { sq: 'Ky veprim nuk mund të kthehet. Të gjitha të dhënat do të fshihen përgjithmonë.', en: 'This action cannot be undone. All data will be permanently deleted.' },
'child.delete':           { sq: 'Fshi', en: 'Delete' },
'child.activeBadge':      { sq: 'Aktiv', en: 'Active' },

// Validation
'validation.nameLettersOnly': { sq: 'Emri mund të përmbajë vetëm shkronja.', en: 'Name can only contain letters.' },

// Nav
'nav.menu':               { sq: 'Meny', en: 'Menu' },

// Sync
'sync.pending':           { sq: 'Duke pritur sinkronizim', en: 'Pending sync' },

// Offline
'offline.onlineSyncing':   { sq: 'Jeni online! Duke sinkronizuar të dhënat...', en: 'You\'re online! Syncing data...' },
'offline.offline':         { sq: 'Jeni offline. Të dhënat do të ruhen lokallisht.', en: 'You\'re offline. Data will be saved locally.' },

// Errors
'error.generic':           { sq: 'Ndodhi një gabim, provoni përsëri.', en: 'An error occurred, please try again.' },
'error.exportFailed':      { sq: 'Eksportimi dështoi. Provoni përsëri.', en: 'Export failed. Please try again.' },

// Diary
'diary.addFirst':          { sq: 'Shto Shënimin', en: 'Add Entry' },
```

---

## 4. Accessibility

### 4a. Icon-only buttons missing `aria-label`

| File | Line | Element | Fix |
|------|------|---------|-----|
| `sidebar.component.ts` | 63 | Settings button | Add `[attr.aria-label]="t()['sidebar.footer.settings']"` |
| `sidebar.component.ts` | 67 | Logout button | Add `[attr.aria-label]="t()['sidebar.footer.logout']"` |
| `header.component.ts` | 34 | Hamburger menu | Replace `aria-label="Open menu"` with `[attr.aria-label]="i18n.t()['nav.menu']"` |

### 4b. Modal form inputs — ensure `<label>` exists in medication/appointment modals

**Files to audit:**
- `medications.component.ts` — modal form inputs
- `appointments.component.ts` — modal form inputs

**Pattern check:**
```html
<!-- BEFORE: placeholder-only input -->
<input type="text" [(ngModel)]="formName" placeholder="Name" class="...">

<!-- AFTER: add visible label -->
<label class="block text-sm font-medium text-gray-700 mb-1">{{ i18n.t()['medications.name'] }}</label>
<input type="text" [(ngModel)]="formName" class="...">
```

### 4c. Modal focus trap — verify all modals

**Files:** `shell.component.ts`, `medications.component.ts`, `appointments.component.ts`

**Requirements for each modal:**
1. `role="dialog"` + `aria-modal="true"` on backdrop div ✅ (shell has this)
2. `[attr.aria-labelledby]` pointing to modal title
3. On open: focus first focusable element (input/button) inside modal
4. On close: return focus to trigger button
5. `Escape` key closes modal
6. Tab cycles within modal only (no focus escape)

**Shell add modal — verify focus trap:**
- Current: has `role="dialog" aria-modal="true" [attr.aria-labelledby]="'edit-child-title'"` ✅
- Missing: programmatic focus on open, Escape key handler, return focus on close

**Shell edit modal:** Similar requirements.

**Medications/Appointments modals:** Audit for `role="dialog"`, `aria-modal`, focus trap.

---

## 5. Toast Notifications

**Current state:** `ToastService` is minimal — no auto-dismiss, no duration. Toast rendered inline in shell edit form only (not a fixed overlay).

### TODO — Toast Service + Component

#### 5a. Upgrade `toast.service.ts`

```typescript
// Add duration parameter and auto-dismiss notification
show(message: string, type: 'success' | 'error' | 'info' = 'info', duration?: number) {
  const d = duration ?? (type === 'success' ? 3000 : type === 'error' ? 5000 : 3000);
  this.listeners.forEach(l => l(message, type, d));
}
```

Update listener signature: `(message: string, type: string, duration: number) => void`

#### 5b. Create `toast.component.ts`

```html
<!-- Fixed position toast container in app.component.ts -->
<div class="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
  @for (toast of activeToasts(); track toast.id) {
    <div class="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg max-w-sm
                animate-slide-up"
         [class]="toastClass(toast.type)"
         role="alert"
         [attr.aria-live]="'polite'">
      <span class="flex-1 text-sm font-medium">{{ toast.message }}</span>
      <button (click)="dismiss(toast.id)" [attr.aria-label]="'Dismiss'" class="opacity-70 hover:opacity-100">
        <lucide-icon name="x" class="w-4 h-4"></lucide-icon>
      </button>
    </div>
  }
</div>
```

- Success: `bg-teal-500 text-white`
- Error: `bg-red-500 text-white`
- Info: `bg-slate-700 text-white`
- Auto-dismiss via `setTimeout` / `delay(duration)` in signal-based queue
- `animate-slide-up`: custom CSS animation for entry

#### 5c. Add `<app-toast>` to `app.component.ts`

Place the toast container in the root app component template.

---

## 6. Responsive — Mobile Sidebar

**Current state:** Hamburger button exists in `header.component.ts` line 34 but is **not wired to any action**. Sidebar is `hidden lg:block` — desktop only.

### TODO — Mobile Sidebar Implementation

#### 6a. `shell.component.ts` — Add sidebar state and handler

```typescript
sidebarOpen = signal(false);

toggleSidebar() {
  this.sidebarOpen.update(v => !v);
}

closeSidebar() {
  this.sidebarOpen.set(false);
}
```

#### 6b. `shell.component.ts` — Add mobile overlay template

```html
<!-- Sprint 8: Mobile Sidebar Overlay -->
@if (sidebarOpen()) {
  <div class="fixed inset-0 z-40 flex">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/40 backdrop-blur-sm"
         (click)="closeSidebar()"
         aria-hidden="true"></div>
    <!-- Sidebar panel (slides in from left) -->
    <app-sidebar class="relative z-50 transform transition-transform duration-300 translate-x-0"
                 style="width: 280px; height: 100vh;" />
  </div>
}
```

#### 6c. `header.component.ts` — Wire hamburger to EventEmitter

```typescript
// header.component.ts
@Output() hamburgerClicked = new EventEmitter<void>();
```

```html
<!-- header.template.html (line 34) -->
<button type="button"
        class="lg:hidden p-2 rounded-xl bg-white shadow-soft border border-gray-100"
        [attr.aria-label]="i18n.t()['nav.menu']"
        (click)="hamburgerClicked.emit()">
  <lucide-icon name="menu" class="text-inherit" aria-hidden="true"></lucide-icon>
</button>
```

#### 6d. `shell.component.ts` — Connect header hamburger to sidebar toggle

```html
<!-- shell.template.html -->
<app-header ... (hamburgerClicked)="toggleSidebar()" />
```

#### 6e. Desktop sidebar — keep separate from mobile

```html
<app-sidebar class="hidden lg:block" />
```

---

## Summary Checklist

### Empty States
- [ ] `temperature-diary`: convert `addFirst` `<p>` to CTA `<button>`
- [ ] `growth-tracking`: convert `addFirst` `<p>` to CTA `<button>`
- [ ] `diary`: add CTA button to empty state section

### Loading Skeletons
- [ ] `temperature-diary`: add 3-row skeleton (chart card + week grid + list)
- [ ] `growth-tracking`: add 3-part skeleton (stats + chart + list)
- [ ] `diary`: add skeleton (calendar + entries)
- [ ] `shell`: add 2-row children list skeleton

### i18n Audit
- [ ] `shell.component.ts`: 11 hardcoded strings → i18n keys
- [ ] `header.component.ts`: 2 hardcoded strings → i18n keys (`nav.menu`, `child.activeBadge`)
- [ ] `sidebar.component.ts`: settings + logout buttons → add `aria-label`
- [ ] `offline-indicator.component.ts`: 1 hardcoded string → i18n key
- [ ] `offline.service.ts`: 2 hardcoded strings → i18n keys
- [ ] `data.service.ts`: error toasts → i18n keys
- [ ] Add 17 new i18n keys to `i18n.service.ts`

### Accessibility
- [ ] `sidebar.component.ts`: aria-label on settings + logout buttons
- [ ] `header.component.ts`: i18n hamburger aria-label
- [ ] `medications.component.ts`: audit modal form labels
- [ ] `appointments.component.ts`: audit modal form labels
- [ ] All modals: focus trap — focus first element on open, Escape to close, return focus on close

### Toast
- [ ] Upgrade `toast.service.ts` with duration + auto-dismiss
- [ ] Create `toast.component.ts` with fixed-position stacked toasts
- [ ] Add `<app-toast>` to `app.component.ts`

### Responsive
- [ ] `shell.component.ts`: add `sidebarOpen` signal + overlay
- [ ] `header.component.ts`: wire hamburger to `hamburgerClicked` EventEmitter
- [ ] `shell.component.ts`: connect header `(hamburgerClicked)` to `toggleSidebar()`
- [ ] Mobile sidebar slides in from left with backdrop

---

## New i18n Keys Summary

| Key | sq | en |
|-----|----|----|
| `child.saveSuccess` | Ndryshimet u ruajtën! | Changes saved! |
| `child.saving` | Duke ruajtur... | Saving... |
| `child.deleteConfirmTitle` | Fshi profilin e fëmijës? | Delete child profile? |
| `child.deleteConfirmBody` | Ky veprim nuk mund të kthehet... | This action cannot be undone... |
| `child.delete` | Fshi | Delete |
| `child.activeBadge` | Aktiv | Active |
| `validation.nameLettersOnly` | Emri mund të përmbajë vetëm shkronja. | Name can only contain letters. |
| `nav.menu` | Meny | Menu |
| `sync.pending` | Duke pritur sinkronizim | Pending sync |
| `offline.onlineSyncing` | Jeni online! Duke sinkronizuar... | You're online! Syncing data... |
| `offline.offline` | Jeni offline. Të dhënat do të ruhen lokallisht. | You're offline. Data will be saved locally. |
| `error.generic` | Ndodhi një gabim, provoni përsëri. | An error occurred, please try again. |
| `error.exportFailed` | Eksportimi dështoi. Provoni përsëri. | Export failed. Please try again. |
| `diary.addFirst` | Shto Shënimin | Add Entry |
| `childForm.gender.male` | Mashkull | Male |
| `childForm.gender.female` | Fëmër | Female |
| `sidebar.footer.settings` | Konfigurime | Settings |
| `sidebar.footer.logout` | Dil nga Sistemi | Sign Out |
