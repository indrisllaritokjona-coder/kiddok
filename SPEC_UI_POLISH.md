# Sprint 10 — UI Polish & Accessibility

**Architect:** kiddok-architect  
**Date:** 2026-04-23  
**Status:** SPEC_COMMITTED

---

## 1. Overview

Sprint 10 addresses cross-cutting UI quality issues: empty states, loading skeletons, i18n gaps, accessibility, toast consistency, and responsive layout. These are not new features — they polish existing components to production grade.

---

## 2. Empty States — Required Fixes

Every list component must show an empty state with: icon + message + CTA button when data is absent.

### 2.1 Child Selector (shell.component.ts — selector view)

**Location:** `src/app/components/shell.component.ts`, selector view when `dataService.children().length === 0`

**Current state:** Has a placeholder with "Welcome to KidDok" but no skeleton loading. When first loading (before children exist), no spinner/skeleton is shown.

**Fix:** Add a loading skeleton that shows before children are fetched from storage/API. Three placeholder cards matching the real child card shape.

**Implementation:**
```html
<!-- After selector view heading, before the child list grid -->
@if (loadingChildren()) {
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    @for (i of [1,2,3]; track i) {
      <div class="bg-white rounded-[2rem] p-8 shadow-md border border-slate-100">
        <div class="flex items-center gap-5 mb-5">
          <div class="skeleton w-16 h-16 rounded-full"></div>
          <div class="space-y-2 flex-1">
            <div class="skeleton h-5 w-32 rounded"></div>
            <div class="skeleton h-3 w-20 rounded"></div>
          </div>
        </div>
      </div>
    }
  </div>
}
```

**i18n keys needed (add to i18n.service.ts):**
- `children.loading`: "Po ngarkohen profilet..." / "Loading profiles..."
- `children.empty.title`: "Akzni nuk keni fëmijë të regjistruar" / "No children registered yet"
- `children.empty.subtitle`: "Shtoni profilin e parë për të nisur" / "Add your first profile to get started"

**New signal:** `loadingChildren = signal(false)` in shell.component.ts. Set to `true` on init, `false` after children load.

---

### 2.2 Temperature Diary (temperature-diary.component.ts)

**Location:** Recent Readings section, `@if (recentReadings().length === 0)` block.

**Current state:** Has an empty div but no Lucide icon, no i18n message, no CTA button.

**Fix — replace current block with:**
```html
@if (recentReadings().length === 0) {
  <div class="px-6 pb-8 text-center">
    <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <lucide-icon name="thermometer" class="text-slate-400 text-2xl"></lucide-icon>
    </div>
    <p class="text-slate-500 font-semibold mb-2">{{ i18n.t()['temperature.emptyState'] }}</p>
    <p class="text-primary-600 font-bold text-sm">{{ i18n.t()['temperature.emptyHint'] }}</p>
  </div>
}
```

**i18n keys needed:**
- `temperature.emptyState`: "Ski deri nuk ka të dhëna temperature." / "No temperature records yet."
- `temperature.emptyHint`: "+ Shto Temperaturën" → "temperature.addFirst" already exists but ensure CTA label. Use same key: `temperature.addFirst`.

---

### 2.3 Growth Tracking (growth-tracking.component.ts)

**Location:** Recent Measurements section, `@if (recentEntries().length === 0)` block.

**Current state:** Has a basic empty div, no icon.

**Fix — replace with:**
```html
@if (recentEntries().length === 0) {
  <div class="px-6 pb-8 text-center">
    <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <lucide-icon name="trending-up" class="text-slate-400 text-2xl"></lucide-icon>
    </div>
    <p class="text-slate-500 font-semibold mb-2">{{ i18n.t()['growth.emptyState'] }}</p>
    <p class="text-primary-600 font-bold text-sm">{{ i18n.t()['growth.addFirst'] }}</p>
  </div>
}
```

**i18n keys needed:**
- `growth.emptyState`: "Ski deri nuk ka të dhëna rritjeje." / "No growth data yet."

---

### 2.4 Vaccines (vaccines.component.ts)

**Location:** `@if (!loading() && childVaccines().length === 0)` block.

**Current state:** Has empty state with SVG illustration, correct i18n via `t()['vaccines.emptyState']` but uses hardcoded "Akzni s'ka vaksina" in SVG fallback and `t()['vaccines.emptyStateHint']` with garbled text "Shtoni vaksinat e para pr t ndjekurdo doz".

**Fix:**
- Add Lucide icon to empty state (replacing inline SVG with `<lucide-icon name="syringe">`)
- Fix garbled i18n strings for `vaccines.emptyState` and `vaccines.emptyStateHint`

---

### 2.5 Diary (diary.component.ts)

**Location:** Recent Activity section, `@if (recentEntries().length === 0)` block, and entries panel when `filteredEntriesForDate().length === 0`.

**Current state:** Both empty states use `<lucide-icon name="inbox">` with text `i18n.t()['diary.emptyState']`.

**Fix — add CTA button to the recent activity empty state:**
```html
@if (recentEntries().length === 0) {
  <div class="text-center py-10">
    <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <lucide-icon name="book-open" class="text-slate-400 text-2xl"></lucide-icon>
    </div>
    <p class="text-slate-500 font-semibold mb-2">{{ i18n.t()['diary.emptyState'] }}</p>
    <button (click)="openAddEntry()"
            class="mt-3 bg-primary-600 hover:bg-primary-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all">
      {{ i18n.t()['diary.addEntry'] }}
    </button>
  </div>
}
```

---

### 2.6 Medications (medications.component.ts)

**Location:** `@if (!loading() && medications().length === 0)` block.

**Current state:** Has empty state with SVG illustration. Needs Lucide icon + CTA.

**Fix:** Replace SVG illustration with Lucide icon:
```html
<div class="flex flex-col items-center justify-center mt-20 px-4">
  <div class="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
    <lucide-icon name="pill" class="text-indigo-400 text-4xl"></lucide-icon>
  </div>
  <h3 class="text-xl font-extrabold text-gray-700 mb-2">
    {{ i18n.t()['medications.empty'] || 'Nuk ka medikamente' }}
  </h3>
  <p class="text-slate-400 text-center mb-6 text-sm">
    {{ i18n.t()['medications.emptyHint'] || 'Shtoni medikamentet e para për të ndjekur trajtimin' }}
  </p>
  <button (click)="openAddModal()"
    class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-sm transition-all text-sm">
    <lucide-icon name="plus" class="text-inherit inline w-4 h-4 mr-1"></lucide-icon>
    {{ i18n.t()['medications.addFirst'] || 'Shto medikamentin e parë' }}
  </button>
</div>
```

**i18n keys needed:**
- `medications.empty`: "Nuk ka medikamente" / "No medications"
- `medications.emptyHint`: "Shtani medikamentet e para për të ndjekur trajtimin." / "Add medications to track treatment progress."

---

### 2.7 Appointments (appointments.component.ts)

**Location:** `@if (!loading() && appointments().length === 0)` block.

**Current state:** Has empty state with SVG illustration. Replace with Lucide icon + CTA.

**Fix:**
```html
<div class="flex flex-col items-center justify-center mt-20 px-4">
  <div class="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
    <lucide-icon name="calendar-x" class="text-teal-400 text-4xl"></lucide-icon>
  </div>
  <h3 class="text-xl font-extrabold text-gray-700 mb-2">
    {{ i18n.t()['appointments.empty'] || 'Nuk ka termine' }}
  </h3>
  <p class="text-slate-400 text-center mb-6 text-sm">
    {{ i18n.t()['appointments.emptyHint'] || 'Shtoni terminin e parë për ta ndjekur.' }}
  </p>
  <button (click)="openAddModal()"
    class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-sm transition-all text-sm">
    <lucide-icon name="plus" class="text-inherit inline w-4 h-4 mr-1"></lucide-icon>
    {{ i18n.t()['appointments.addFirst'] || 'Shto terminin e parë' }}
  </button>
</div>
```

---

## 3. Loading Skeletons — Required Fixes

Replace spinners with CSS `.skeleton` class (pulse animation, `bg-gray-200`). Add `.skeleton` definition to `styles.css` if missing.

**styles.css — add after existing animations:**
```css
/* Loading Skeleton */
.skeleton {
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: skeleton-pulse 1.5s ease-in-out infinite;
  border-radius: 0.375rem;
}
@keyframes skeleton-pulse {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
.dark .skeleton {
  background: linear-gradient(90deg, #334155 25%, #475569 50%, #334155 75%);
  background-size: 200% 100%;
}
```

### 3.1 Children List Skeletons — shell.component.ts

**Current:** No skeleton loading state for children.

**Fix:** Add `loadingChildren` signal and skeleton UI above (described in 2.1).

---

### 3.2 Temperature List Skeletons — temperature-diary.component.ts

**Current:** No skeleton loading state. Component loads data via `loadTemperatureEntries` on init.

**Fix — add before the Recent Readings list:**
```html
@if (loading()) {
  <div class="px-6 pb-6 space-y-3">
    @for (i of [1,2,3]; track i) {
      <div class="flex items-center gap-4 p-4 rounded-2xl border border-slate-100">
        <div class="skeleton w-3 h-3 rounded-full"></div>
        <div class="skeleton h-6 w-16 rounded"></div>
        <div class="flex-1 space-y-1">
          <div class="skeleton h-4 w-24 rounded"></div>
          <div class="skeleton h-3 w-32 rounded"></div>
        </div>
        <div class="skeleton w-9 h-9 rounded-xl"></div>
      </div>
    }
  </div>
} @else if (recentReadings().length === 0) {
  <!-- empty state -->
}
```

Add `loading = signal(false)` and set to `true` in `loadTemperatureEntries`.

---

### 3.3 Growth List Skeletons — growth-tracking.component.ts

**Current:** No skeleton loading state.

**Fix — add before the Recent Measurements list:**
```html
@if (loading()) {
  <div class="px-6 pb-6 space-y-3">
    @for (i of [1,2,3]; track i) {
      <div class="flex items-center gap-4 p-4 rounded-2xl border border-slate-100">
        <div class="skeleton w-3 h-3 rounded-full"></div>
        <div class="skeleton h-5 w-20 rounded"></div>
        <div class="skeleton w-3 h-3 rounded-full"></div>
        <div class="skeleton h-5 w-16 rounded"></div>
        <div class="flex-1">
          <div class="skeleton h-4 w-32 rounded"></div>
        </div>
        <div class="skeleton w-9 h-9 rounded-xl"></div>
      </div>
    }
  </div>
} @else if (recentEntries().length === 0) {
  <!-- empty state -->
}
```

Add `loading = signal(false)` signal to component, set in `loadGrowthEntries`.

---

### 3.4 Vaccine List Skeletons — vaccines.component.ts

**Current:** Has skeleton via `@if (loading())` with `animate-pulse` divs, but uses generic `bg-gray-200` blocks not `.skeleton` class.

**Fix — update the loading skeleton block to use `.skeleton` class:**
```html
@if (loading()) {
  <div class="px-4 mt-6 space-y-4">
    @for (i of [1,2,3]; track i) {
      <div class="bg-white rounded-2xl p-5 border border-gray-100">
        <div class="flex gap-4">
          <div class="skeleton w-12 h-12 rounded-xl"></div>
          <div class="flex-1 space-y-2">
            <div class="skeleton h-4 w-1/2 rounded"></div>
            <div class="skeleton h-3 w-1/3 rounded"></div>
          </div>
        </div>
      </div>
    }
  </div>
}
```

---

### 3.5 Diary Skeletons — diary.component.ts

**Current:** No skeleton loading state.

**Fix — add skeleton to the entries panel when loading:**
Add `loading = signal(false)` to DiaryComponent and show skeleton placeholders in the entries panel:
```html
@if (loading()) {
  <div class="p-4 space-y-3">
    @for (i of [1,2,3]; track i) {
      <div class="rounded-2xl border border-slate-100 p-4 bg-slate-50/60">
        <div class="flex items-start justify-between mb-2">
          <div class="skeleton h-4 w-24 rounded"></div>
        </div>
        <div class="skeleton h-3 w-48 rounded mb-1"></div>
        <div class="skeleton h-3 w-36 rounded"></div>
      </div>
    }
  </div>
}
```

---

### 3.6 Medications Skeletons — medications.component.ts

**Current:** Has skeleton via `animate-pulse` with `bg-gray-200` divs.

**Fix — update to use `.skeleton` class:**
```html
@if (loading()) {
  <div class="px-4 mt-4 space-y-3">
    @for (i of [1,2,3]; track i) {
      <div class="bg-white rounded-2xl p-5 border border-gray-100">
        <div class="flex gap-4">
          <div class="skeleton w-12 h-12 rounded-xl"></div>
          <div class="flex-1 space-y-2">
            <div class="skeleton h-4 w-1/2 rounded"></div>
            <div class="skeleton h-3 w-1/3 rounded"></div>
          </div>
        </div>
      </div>
    }
  </div>
}
```

---

### 3.7 Appointments Skeletons — appointments.component.ts

**Current:** Has skeleton via `animate-pulse`.

**Fix — update to use `.skeleton` class:**
```html
@if (loading()) {
  <div class="px-4 mt-4 space-y-3">
    @for (i of [1,2,3]; track i) {
      <div class="bg-white rounded-2xl p-5 border border-gray-100">
        <div class="flex gap-4">
          <div class="skeleton w-12 h-12 rounded-xl"></div>
          <div class="flex-1 space-y-2">
            <div class="skeleton h-4 w-1/2 rounded"></div>
            <div class="skeleton h-3 w-1/3 rounded"></div>
          </div>
        </div>
      </div>
    }
  </div>
}
```

---

## 4. i18n Audit — Hardcoded Strings

Grep all `.ts` component files (inline template strings) and `.html` files for hardcoded strings not wrapped in `i18n.t()` or `{{ t()['...'] }}`.

### 4.1 shell.component.ts — Hardcoded strings found:

| Line | Hardcoded String | Replacement i18n Key |
|------|-----------------|----------------------|
| ~"Skipped to main content" | "Skip to main content" | `shell.skipToMain` |
| ~"Ndryshimet u ruajtën!" | "Ndryshimet u ruajtën!" | Use existing `i18n.t()['child.saveSuccess']` but currently inline |
| ~"No temperature records yet" | "No temperature records yet" | `temperature.emptyState` |

**Notes on shell.component.ts i18n:**
- The live region announcement uses inline string: `'Ndryshimet u ruajtën!'` — should use `i18n.t()['child.saveSuccess']` or `i18n.t()['settings.saved']`
- `aria-label` on locale toggle button: `'Switch to ' + (i18n.locale() === 'sq' ? 'English' : 'Albanian')` — needs i18n key:
  - `header.switchLocale.sq`: "Kalo në shqip"
  - `header.switchLocale.en`: "Switch to Albanian"

### 4.2 vaccines.component.ts — Hardcoded strings:

| Context | Hardcoded | Replacement |
|---------|-----------|-------------|
| SVG alt text | "Akzni s'ka vaksina" | `t()['vaccines.emptyState']` |
| Hint text in SVG | "Shtoni vaksinat e para për të ndjekur çdo dozë" | `t()['vaccines.emptyStateHint']` (currently garbled) |
| `site.thigh` label | "Kofshë" | `t()['vaccines.site.thigh']` (already exists but inline fallback) |
| `site.arm` label | "Krah" | `t()['vaccines.site.arm']` (already exists) |
| Status labels | hardcoded `Vonuar`, `Për shkak`, `Së shpejti`, `Përfunduar` | use `getStatusLabel()` which already uses i18n |

**Fix:** Remove SVG illustration, use Lucide icon with i18n text (see Empty States section).

### 4.3 medications.component.ts — Hardcoded strings:

| Line | Hardcoded | Replacement |
|------|-----------|-------------|
| `activeLabel` text | `'medikamente active'` | `i18n.t()['medications.activeLabel']` |
| `activeDesc` text | `'Në përdorim aktualisht'` | `i18n.t()['medications.activeDesc']` |
| `optional` span | `'opsionale'` | `i18n.t()['medications.optional']` |

### 4.4 appointments.component.ts — Hardcoded strings:

| Line | Hardcoded | Replacement |
|------|-----------|-------------|
| `upcomingLabel` | `'termine të ardhshme'` | `i18n.t()['appointments.upcomingLabel']` |
| `upcomingDesc` | `'Në 30 ditët e ardhshme'` | `i18n.t()['appointments.upcomingDesc']` |
| `optional` span | `'opsionale'` | `i18n.t()['appointments.optional']` |

### 4.5 i18n strings needing fixes in i18n.service.ts:

The following keys have garbled/mojibake text — fix the actual string values:
- `vaccines.emptyState`: fix from garbled to proper Albanian
- `vaccines.emptyStateHint`: fix garbled text
- `diary.emptyState`: ensure correct
- All keys with `Ã«`, `Ã`, `â€"` encoding issues need correction

---

## 5. Accessibility Fixes

### 5.1 Icon-only buttons — aria-label required

All `<button>` elements with only an icon (no visible text) must have `aria-label="..."`.

**Files to audit:**

**shell.component.ts:**
| Element | Current | Fix |
|---------|---------|-----|
| Child edit button (pencil) | `aria-label="child.editProfile"` | OK — already has `aria-label` |
| Modal close button (x) | No aria-label | Add `aria-label="{{ i18n.t()['child.cancel'] }}"` |
| Locale toggle | `aria-label="'Switch to ' + ..."` | OK |
| Gender select chevron (inside select wrapper) | N/A — uses native `<select>` | OK |
| Save button (check icon only) | Has text label "Save Changes" | OK |
| Delete profile button | No aria-label | Add `aria-label="{{ i18n.t()['sidebar.deleteProfile'] }}"` |

**sidebar.component.ts:**
| Element | Current | Fix |
|---------|---------|-----|
| `locale-toggle` button | `aria-label="'Switch to ' + ..."` | OK — uses dynamic expression |
| All nav item buttons | No aria-label | Add to each: `aria-label="{{ t()[item.labelKey] }}"` |
| Settings footer button | No aria-label | Add `aria-label="{{ t()['sidebar.footer.settings'] }}"` |
| Logout footer button | No aria-label | Add `aria-label="{{ t()['sidebar.footer.logout'] }}"` |

**header.component.ts:**
| Element | Current | Fix |
|---------|---------|-----|
| Back button | `aria-label="i18n.t()['nav.back']"` | OK |
| Mobile menu button | `aria-label="Open menu"` (hardcoded) | Change to `aria-label="{{ i18n.t()['header.openMenu'] }}"` |
| Parent settings avatar button | `aria-label="{{ i18n.t()['nav.settings'] }}"` | OK |

**temperature-diary.component.ts:**
| Element | Current | Fix |
|---------|---------|-----|
| Info tooltip button (info icon) | No aria-label | Add `aria-label="{{ i18n.t()['temperature.infoTooltip'] }}"` |
| Delete reading button | No aria-label | Add `aria-label="{{ i18n.t()['temperature.delete'] }}"` |

**growth-tracking.component.ts:**
| Element | Current | Fix |
|---------|---------|-----|
| Percentile info button | No aria-label | Add `aria-label="{{ i18n.t()['growth.percentileInfo'] }}"` |
| Delete measurement button | No aria-label | Add `aria-label="{{ i18n.t()['growth.delete'] }}"` |

**medications.component.ts:**
| Element | Current | Fix |
|---------|---------|-----|
| Add button (header) | No aria-label | Add `aria-label="{{ i18n.t()['medications.add'] }}"` |
| Edit button | No aria-label | Add `aria-label="{{ i18n.t()['medications.edit'] }}"` |
| Delete button | No aria-label | Add `aria-label="{{ i18n.t()['medications.delete'] }}"` |
| Modal close button (x) | No aria-label | Add `aria-label="{{ i18n.t()['medications.cancel'] }}"` |

**appointments.component.ts:**
| Element | Current | Fix |
|---------|---------|-----|
| Add button (header) | No aria-label | Add `aria-label="{{ i18n.t()['appointments.add'] }}"` |
| Edit button | No aria-label | Add `aria-label="{{ i18n.t()['appointments.edit'] }}"` |
| Delete button | No aria-label | Add `aria-label="{{ i18n.t()['appointments.delete'] }}"` |
| Modal close button (x) | No aria-label | Add `aria-label="{{ i18n.t()['appointments.cancel'] }}"` |

**diary.component.ts:**
| Element | Current | Fix |
|---------|---------|-----|
| Month prev button | No aria-label | Add `aria-label="{{ i18n.t()['diary.prevMonth'] }}"` |
| Month next button | No aria-label | Add `aria-label="{{ i18n.t()['diary.nextMonth'] }}"` |
| Quick-add buttons | No aria-label | Add `aria-label="{{ i18n.t()[qa.labelKey] }}"` to each |
| Filter pills | No aria-label | Add `aria-label="{{ f.label() }}"` |
| Delete entry button | No aria-label | Add `aria-label="{{ i18n.t()['diary.delete'] }}"` |
| Modal close button (x) | No aria-label | Add `aria-label="{{ i18n.t()['diary.cancel'] }}"` |

**vaccines.component.ts:**
| Element | Current | Fix |
|---------|---------|-----|
| Add vaccine button | No aria-label | Add `aria-label="{{ t()['vaccines.addRecord'] }}"` |
| Delete button in expanded card | No aria-label | Add `aria-label="{{ t()['vaccines.delete'] }}"` |
| Modal close button (x) | No aria-label | Add `aria-label="{{ t()['vaccines.cancel'] }}"` |

---

### 5.2 All inputs must have `<label>` or `aria-label`

**shell.component.ts — Add/Edit Child Form:**
All inputs already have `<label>` elements. Check:
- `newChildName` input: has label ✓
- `newChildDob` input: has label ✓
- `newChildBirthWeight` input: has label ✓
- `newChildBloodType` select: has label ✓
- `newChildGender` select: has label ✓
- `newChildAllergies` textarea: has label ✓
- `newChildMedicalNotes` textarea: has label ✓
- `newChildDocument` input: has `aria-label` ✓
- `newChildDocumentDate` input: has label ✓
- `newChildDeliveryDoctor` input: has label ✓

**shell.component.ts — Edit Child Modal:**
- `editName`: has label ✓
- `editDob`: has label ✓
- `editBloodType`: has label ✓
- `editGender`: has label ✓
- `editBirthWeight`: has label ✓
- `editDeliveryDoctor`: has label ✓
- `editChildAllergies`: has label ✓
- `editChildMedicalNotes`: has label ✓
- `editChildDocument`: has aria-label ✓
- `editChildDocumentDate`: has label ✓

**temperature-diary.component.ts:**
- `formTemp` (number input): has `<label>` ✓
- `formTime` (datetime-local): has `<label>` ✓
- Location buttons are `<button>` not `<input>` — OK
- `formNotes` textarea: has `<label>` ✓

**growth-tracking.component.ts:**
- `formDate` (date input): has `<label>` ✓
- `formHeight`: has `<label>` ✓
- `formWeight`: has `<label>` ✓
- `formNotes`: has `<label>` ✓

**medications.component.ts — Modal:**
- `formName`: has `<label>` ✓
- `formDosage`: has `<label>` ✓
- Frequency quick buttons (buttons, not inputs) — OK
- `formStartDate`: has `<label>` ✓
- `formEndDate`: has `<label>` ✓
- `formPrescribedBy`: has `<label>` ✓
- `formNotes`: has `<label>` ✓

**appointments.component.ts — Modal:**
- `formTitle`: has `<label>` ✓
- `formDateTime`: has `<label>` ✓
- `formDoctorName`: has `<label>` ✓
- `formLocation`: has `<label>` ✓
- `formNotes`: has `<label>` ✓

**diary.component.ts — Modal:**
- `newDescription` textarea: has `<label>` ✓
- Symptom buttons (buttons, not inputs) — OK
- Severity buttons (buttons) — OK
- `newDuration` input: has `<label>` ✓
- `newNotes` textarea: has `<label>` ✓

**vaccines.component.ts — Modal:**
- `formVaccineName`: has `<label>` ✓
- `formDoseNumber`: has `<label>` ✓
- `formTotalDoses`: has `<label>` ✓
- `formDueDate`: has `<label>` ✓
- `formBatchNumber`: has `<label>` ✓
- `formSite` select: has `<label>` ✓
- `formDoctor`: has `<label>` ✓
- `formNotes`: has `<label>` ✓

**header.component.ts:**
- Mobile menu button `<button>` with icon only: needs `aria-label`

---

### 5.3 Modal Focus Trap

**Requirement:** When a modal opens, focus must move to the first interactive element. When it closes, focus must return to the trigger button.

**Implementation approach:** Use Angular's `AfterViewInit` and `ViewChild` to auto-focus the first focusable element. For each modal, add a `#modalContent` template reference and implement focus trap.

**Affected modals:**
1. **Add/Edit Child Modal** (shell.component.ts — `editingChild()` overlay)
   - Trigger: edit pencil button on child card
   - Focus on open: the first `<input>` (editName)
   - Return on close: the trigger button (pencil icon button)
   - Add `cdkTrapFocus` from `@angular/cdk/a11y` or implement manually

2. **Diary Add Entry Modal** (diary.component.ts — `showModal()`)
   - Focus on open: `newDescription` textarea
   - Return on close: the "Add Entry" or quick-add button that triggered it

3. **Medications Add/Edit Modal** (medications.component.ts — `showModal()`)
   - Focus on open: `formName` input
   - Return on close: the "Add Medication" button

4. **Appointments Add/Edit Modal** (appointments.component.ts — `showModal()`)
   - Focus on open: `formTitle` input
   - Return on close: the "Add Appointment" button

5. **Vaccines Add Modal** (vaccines.component.ts — `showAddModal()`)
   - Focus on open: `formVaccineName` input
   - Return on close: the "Add Vaccine" button

6. **Delete Confirmation Modals** (medications, appointments)
   - Focus on open: the cancel/dismiss button in the modal
   - Return on close: the trigger delete button

**Implementation pattern (per modal):**
```typescript
// In component
private previouslyFocused: HTMLElement | null = null;

openModal(trigger: HTMLElement) {
  this.previouslyFocused = trigger;
  this.showModal.set(true);
  setTimeout(() => {
    const firstFocusable = this.modalContent?.querySelector<HTMLElement>(
      'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();
  });
}

closeModal() {
  this.showModal.set(false);
  setTimeout(() => this.previouslyFocused?.focus());
}
```

---

### 5.4 Keyboard Navigation

**Requirement:** Tab/Enter/Space work throughout the entire app.

**Audit results:**
- All interactive buttons respond to Enter/Space by default in browsers
- Calendar grid buttons need `role="button"` (already have implicit button) — OK
- Filter pills use `<button>` — OK
- Quick-add bar uses `<button>` — OK
- Ensure no `pointer-events: none` on interactive elements

**Known keyboard issues:**
1. **Calendar grid day buttons** — use `<button>` already but may need explicit `type="button"` to prevent form submission if inside a form. Add `type="button"` to all day grid buttons.

2. **Quick Switcher modal (header)** — Escape key already handled via `@HostListener('keydown')` for `Escape` → `closeQuickSwitcher()`. Tab navigation works within modal.

3. **Dropdown panel (header)** — closes on outside click. Add `Escape` key handler to close dropdown.

---

## 6. Toast Consistency — Required Fixes

**Current:** ToastService is a simple pub/sub with no positioning or auto-dismiss config.

**Requirements:**
- Position: bottom-right corner
- Success toasts: auto-dismiss after **3 seconds**
- Error toasts: auto-dismiss after **5 seconds**
- Info toasts: auto-dismiss after **4 seconds** (default)

**Implementation — update toast.service.ts:**
```typescript
import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  visible: boolean;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts = signal<Toast[]>([]);

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const id = Math.random().toString(36).slice(2);
    const dismissMs = type === 'success' ? 3000 : type === 'error' ? 5000 : 4000;

    this.toasts.update(list => [...list, { id, message, type, visible: true }]);

    setTimeout(() => this.dismiss(id), dismissMs);
  }

  dismiss(id: string) {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }

  clear() {
    this.toasts.set([]);
  }
}
```

**Toast UI Component — create `src/app/components/toast-container.component.ts`:**
```html
<div class="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none"
     aria-live="polite" aria-atomic="false" role="status">
  @for (toast of toastService.toasts(); track toast.id) {
    <div class="pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl max-w-sm animate-slide-up
                {{ toast.type === 'success' ? 'bg-teal-50 border-2 border-teal-200 text-teal-700' : 
                   toast.type === 'error' ? 'bg-red-50 border-2 border-red-200 text-red-700' : 
                   'bg-white border-2 border-gray-100 text-gray-700' }}">
      <lucide-icon [name]="toast.type === 'success' ? 'check-circle' : toast.type === 'error' ? 'alert-circle' : 'info'"
                   class="text-inherit flex-shrink-0 w-5 h-5"></lucide-icon>
      <span class="text-sm font-semibold">{{ toast.message }}</span>
      <button (click)="toastService.dismiss(toast.id)"
              class="ml-2 w-6 h-6 rounded-full hover:bg-black/10 flex items-center justify-center transition-colors"
              aria-label="Dismiss">
        <lucide-icon name="x" class="text-inherit w-4 h-4"></lucide-icon>
      </button>
    </div>
  }
</div>
```

**styles for toast animation (styles.css):**
```css
.toast-enter { animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes slideUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**Placement:** Add `<app-toast-container />` to `app.component.ts` or `shell.component.ts` template (inside the root div, after all content).

---

## 7. Responsive Layout — Required Fixes

### 7.1 Sidebar collapses to hamburger on mobile (≤768px)

**Current:** Sidebar uses `hidden lg:block` in shell — visible only on desktop. Mobile uses `app-bottom-nav`.

**Fix — sidebar is desktop only, but needs hamburger menu on tablet (768px–1024px):**

Add a hamburger toggle to `header.component.ts` that opens a mobile/tablet sidebar drawer:
1. Add hamburger button to header (visible on `< lg` screens)
2. On click, show sidebar as an overlay drawer (slide from left)
3. Backdrop closes the drawer
4. Focus trap within drawer when open
5. Close on Escape

**Implementation in header.component.ts:**
```html
<!-- Add to header, after mobile menu button -->
<button type="button" (click)="toggleMobileMenu()"
        class="lg:hidden p-2 rounded-xl bg-white shadow-soft border border-gray-100"
        [attr.aria-label]="i18n.t()['header.openMenu']"
        [attr.aria-expanded]="mobileMenuOpen()">
  <lucide-icon name="menu" class="text-inherit" aria-hidden="true"></lucide-icon>
</button>
```

```typescript
mobileMenuOpen = signal(false);

toggleMobileMenu() {
  this.mobileMenuOpen.update(v => !v);
}

// In template, render sidebar overlay when mobileMenuOpen():
@if (mobileMenuOpen()) {
  <!-- Overlay backdrop -->
  <div class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
       (click)="mobileMenuOpen.set(false)" aria-hidden="true"></div>
  <!-- Sidebar drawer -->
  <div class="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl lg:hidden animate-slide-up">
    <app-sidebar />
  </div>
}
```

**Add i18n key:** `header.openMenu`: "Hap menynë" / "Open menu"

---

### 7.2 All tap targets ≥44px

**Audit and fix — identify all touch targets below 44px:**

**shell.component.ts:**
- Edit child modal close button: `w-9 h-9` = 36px — **FIX:** change to `w-11 h-11` (44px)
- Delete confirmation button: `w-9 h-9` — **FIX:** change to `w-11 h-11`
- Quick temp buttons `py-3` = ~44px — OK

**sidebar.component.ts:**
- Nav items `py-10px` — should be fine but review if any are smaller
- Footer items — OK

**header.component.ts:**
- Quick Switcher button: `px-3 py-2` — this is a toolbar button, not a primary tap target. OK.
- Child dropdown toggle: `py-2` — OK
- Parent avatar: `w-10 h-10` = 40px — **FIX:** change to `w-11 h-11`
- Settings avatar: `w-10 h-10` → `w-11 h-11` — **FIX:** apply to both

**temperature-diary.component.ts:**
- Quick temp buttons: `py-3 rounded-2xl` — OK
- Location selector buttons: `px-4 py-2.5` — OK
- Delete reading button (on hover): `w-9 h-9` = 36px — **FIX:** change to `w-11 h-11`

**growth-tracking.component.ts:**
- Info tooltip button: `w-8 h-8` = 32px — **FIX:** change to `w-11 h-11`
- Delete measurement button: `w-9 h-9` = 36px — **FIX:** change to `w-11 h-11`

**diary.component.ts:**
- Quick-add buttons: `w-16 h-20` — OK
- Day grid buttons: `aspect-square` with day number — OK
- Delete entry button: `opacity-0` until hover, `w-9 h-9` — **FIX:** change to `w-11 h-11`
- Modal close button: `p-2` (w-9 h-9 equivalent) — **FIX:** change to `w-11 h-11`

**medications.component.ts:**
- Edit button: `py-2` — OK (text + icon)
- Delete button: `py-2` — OK
- Modal close button: `p-2` → `w-11 h-11` — **FIX**

**appointments.component.ts:**
- Edit button: `py-2` — OK
- Delete button: `py-2` — OK
- Modal close button: `p-2` → `w-11 h-11` — **FIX**

**vaccines.component.ts:**
- Add button (header): `px-5 py-2.5` — OK
- Delete button in expanded card: `w-9 h-9` → `w-11 h-11` — **FIX**
- Modal close button: `p-2` → `w-11 h-11` — **FIX**

**bottom-nav.component.ts:** (check if exists)
- All nav items should be ≥44px — verify icon buttons have padding

---

## 8. Implementation Summary

| # | Component | File | Fix |
|---|-----------|------|-----|
| 2.1 | Child Selector | shell.component.ts | Add `loadingChildren` signal + skeleton UI |
| 2.2 | Temperature | temperature-diary.component.ts | Add empty state icon + message + CTA |
| 2.3 | Growth | growth-tracking.component.ts | Add empty state icon + message + CTA |
| 2.4 | Vaccines | vaccines.component.ts | Replace SVG with Lucide + fix i18n |
| 2.5 | Diary | diary.component.ts | Add CTA button to recent activity empty state |
| 2.6 | Medications | medications.component.ts | Add Lucide icon + CTA to empty state |
| 2.7 | Appointments | appointments.component.ts | Add Lucide icon + CTA to empty state |
| 3.1–3.7 | Loading skeletons | All list components | Add `.skeleton` CSS class, replace spinners |
| 4 | i18n audit | i18n.service.ts + components | Fix garbled strings, add missing keys |
| 5.1 | aria-label on icon buttons | All components | Add missing aria-label attributes |
| 5.2 | Input labels | All components | Audit — all inputs have labels ✓ |
| 5.3 | Modal focus trap | 6 modals | Implement focus management |
| 5.4 | Keyboard navigation | header, calendar | Tab/Enter/Escape handlers |
| 6 | Toast service + container | toast.service.ts, new component | Position bottom-right, 3s/5s auto-dismiss |
| 7.1 | Mobile hamburger | header.component.ts | Overlay sidebar drawer on tablet |
| 7.2 | Tap targets ≥44px | All components | Fix under-sized buttons |

---

## 9. i18n Keys to Add

```typescript
// Shell / Children
'children.loading': { sq: 'Po ngarkohen profilet...', en: 'Loading profiles...' }
'children.empty.title': { sq: 'Akzni nuk keni fëmijë të regjistruar', en: 'No children registered yet' }
'children.empty.subtitle': { sq: 'Shtoni profilin e parë për të nisur', en: 'Add your first profile to get started' }

// Temperature
'temperature.emptyState': { sq: 'Ski deri nuk ka të dhëna temperature.', en: 'No temperature records yet.' }

// Growth
'growth.emptyState': { sq: 'Ski deri nuk ka të dhëna rritjeje.', en: 'No growth data yet.' }

// Header
'header.openMenu': { sq: 'Hap menynë', en: 'Open menu' }
'header.closeMenu': { sq: 'Mbyll menynë', en: 'Close menu' }

// Diary
'diary.prevMonth': { sq: 'Muaji i kaluar', en: 'Previous month' }
'diary.nextMonth': { sq: 'Muaji i ardhshëm', en: 'Next month' }

// Temperature info
'temperature.infoTooltip': { sq: 'Informacion', en: 'Info' }
'temperature.delete': { sq: 'Fshi leximin', en: 'Delete reading' }

// Growth info
'growth.percentileInfo': { sq: 'Informacion për përqindjen', en: 'Percentile info' }

// Vaccines
'vaccines.delete': { sq: 'Fshi', en: 'Delete' }

// Medications
'medications.delete': { sq: 'Fshi', en: 'Delete' }

// Appointments
'appointments.delete': { sq: 'Fshi', en: 'Delete' }
```

---

## 10. Testing Checklist

- [ ] Empty states visible with correct icons and CTA buttons
- [ ] Loading skeletons appear during data fetch, disappear when loaded
- [ ] No hardcoded English/Albanian strings in UI (only in i18n keys)
- [ ] Every icon-only button has aria-label
- [ ] Tab/Enter/Space work in all interactive flows
- [ ] Modals focus first element on open, return focus on close
- [ ] Toast appears bottom-right, success dismisses 3s, error 5s
- [ ] Sidebar hamburger opens overlay on tablet/mobile
- [ ] All buttons ≥44px touch target size