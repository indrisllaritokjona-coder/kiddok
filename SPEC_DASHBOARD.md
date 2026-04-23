# SPEC — Sprint 9: Dashboard Summary Module

## 1. Overview & Goal

A **quick-glance dashboard card** shown in the Home area whenever a child is selected. It surfaces the most meaningful health snapshots for the active child — last temperature, last measurement, next vaccine, next appointment, and the last diary entry — with a growth trend arrow and quick-action buttons. Fully i18n (SQ + EN). No backend changes.

**File**: `SPEC_DASHBOARD.md`

---

## 2. Architecture

### 2.1 Component Tree

```
HomeComponent (src/app/components/home/home.component.ts)
  └── ChildDashboardComponent      ← new, replaces/showns alongside WelcomeHeroComponent
       ├── DashboardSummaryCardComponent   ← new, per-child summary
       └── DashboardQuickActionsComponent ← new, quick-add buttons

DataService (existing, src/app/services/data.service.ts)
  └── signals: children, activeChildId, temperatureEntries,
              growthEntries, vaccineRecords, diaryEntries, records
```

### 2.2 New Files to Create

| File | Purpose |
|------|---------|
| `src/app/components/home/child-dashboard.component.ts` | Container — reads active child from DataService |
| `src/app/components/home/dashboard-summary-card.component.ts` | The actual card with all health data |
| `src/app/components/home/dashboard-quick-actions.component.ts` | Quick-add buttons row |
| `src/app/components/home/sprint9/dashboard-i18n.ts` | i18n labels SQ+EN |

### 2.3 Data Flow

```
DataService (signals)
   │
   ├── activeChildId()  → ChildDashboardComponent
   ├── children()       → derives child profile
   ├── temperatureEntries() → last temp (fever alert logic)
   ├── growthEntries()  → last weight+height + growth trend
   ├── vaccineRecords() → next due vaccine + days countdown
   ├── records()        → next appointment (medical record) + days countdown
   └── diaryEntries()   → last entry (icon + first 50 chars)
```

All reads are synchronous from signals. No new HTTP calls. No new service methods.

---

## 3. Component Breakdown

### 3.1 `ChildDashboardComponent`

**Selector**: `app-child-dashboard`
**Type**: Standalone, imports `CommonModule`, `LucideAngularModule`

**Responsibility**: Wrapper that guards on `activeChildId`. Shows nothing when no child is selected.

```typescript
// Logic
activeChild = computed(() => {
  const id = this.dataService.activeChildId();
  return this.dataService.children().find(c => c.id === id) ?? null;
});

// Template
@if (activeChild()) {
  <app-dashboard-summary-card [child]="activeChild()" />
  <app-dashboard-quick-actions />
}
```

### 3.2 `DashboardSummaryCardComponent`

**Selector**: `app-dashboard-summary-card`
**Inputs**: `child: ChildProfile`

Renders a styled card with **6 data rows**:

#### Row 1 — Temperature
- Read: `dataService.temperatureEntries().filter(e => e.childId === child.id)[0]`
- Display: `"Temperature: 38.2°C"` — plain
- Fever alert: if `temp > 38.0` → red text + Lucide `alert-triangle` icon + `⚠️` suffix
- Missing: `"Temperature: —"` (dash)
- i18n: `dashboard.temperature`, `dashboard.feverAlert`

#### Row 2 — Weight + Height
- Read: `dataService.growthEntries().filter(e => e.childId === child.id)[0]`
- Display: `"14.2 kg / 93 cm"` (both required; one missing → show only the one available, or "—" for missing)
- i18n: `dashboard.weight`, `dashboard.height`

#### Row 3 — Growth Trend Arrow
- Logic: take two most recent `growthEntries` for the child, sort by `measuredAt` desc → `[latest, previous]`
- Compare `latest.weight` vs `previous.weight`:
  - `> previous + 0.1` → `↑` green (`text-green-500`)
  - `< previous - 0.1` → `↓` orange (`text-orange-500`)
  - else → `→` gray (`text-gray-400`)
- Same for height if weight unavailable
- Show only if **at least 2 entries exist**
- i18n: `dashboard.growthTrend`

#### Row 4 — Next Vaccine Due
- Read: `dataService.vaccineRecords().filter(r => r.childId === child.id && r.status !== 'completed').sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate))[0]`
- Days countdown: `Math.ceil((new Date(dueDate) - now) / MS_PER_DAY)`
- Display:
  - `"Varicella — in 8 days"` (normal)
  - `"Varicella — in 0 days"` (today → `dashboard.dueToday`)
  - `"Varicella — Overdue!"` in red (days < 0) — `dashboard.overdue`
- i18n: `dashboard.nextVaccine`, `dashboard.inDays`, `dashboard.dueToday`, `dashboard.overdue`

#### Row 5 — Next Appointment
- Read: `dataService.records().filter(r => r.childId === child.id && !r.completed).sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate))[0]`
- Days countdown: same formula
- Display: `"ENT Follow-up — in 5 days"` / `"ENT Follow-up — Overdue!"`
- i18n: `dashboard.nextAppointment`, `dashboard.inDays`, `dashboard.overdue`

#### Row 6 — Last Diary Entry
- Read: `dataService.getDiaryEntriesByChild(child.id)[0]`
- Icon mapping:

| type | Lucide icon |
|------|------------|
| symptom | `thermometer` |
| meal | `utensils` |
| sleep | `moon` |
| mood | `smile` |
| activity | `zap` |

- Display: first 50 chars of `description` + `…` if longer
- Missing: `"dashboard.noDiaryEntry"` placeholder
- i18n: `dashboard.lastDiaryEntry`, diary type keys

**Card styling**: white rounded-2xl, border, shadow-soft, grid layout (2 cols on lg). Section headers use Lucide icons.

### 3.3 `DashboardQuickActionsComponent`

**Selector**: `app-dashboard-quick-actions`

Renders 3 pill-style action buttons below the summary card:

| Action | Icon | Route | i18n key |
|--------|------|-------|----------|
| + Temperature | `thermometer` | `/temperature` | `dashboard.addTemperature` |
| + Diary Entry | `book-open` | `/diary` | `dashboard.addDiaryEntry` |
| + Appointment | `calendar-plus` | `/records` | `dashboard.addAppointment` |

- Buttons: small, secondary style, icon + label
- Use `Router.navigate()` on click

### 3.4 Home Component Integration

In `home.component.ts`, import and add to template (replacing existing welcome hero for the child profile section):

```typescript
import { ChildDashboardComponent } from './home/child-dashboard.component';
// Keep WelcomeHeroComponent but wrap intelligently
```

**Placement**: After `WelcomeHeroComponent` in `home.component.ts` template, inside the same `<div class="px-2 max-w-6xl mx-auto">`.

Alternative: `WelcomeHeroComponent` already shows the child name/age. The new `ChildDashboardComponent` sits directly below it, creating a natural "profile + health snapshot" flow at the top of the home page.

---

## 4. i18n (SQ + EN)

All keys go into `I18nService` via `t()` calls. Labels must be bilingual.

### Required i18n Keys

```typescript
// SQ labels
dashboard: {
  temperature: 'Temperatura',
  feverAlert: 'Ethë',
  weight: 'Pesha',
  height: 'Gjatësia',
  growthTrend: 'Trend i rritjes',
  nextVaccine: 'Vaksina e radhës',
  nextAppointment: 'Termini i radhës',
  inDays: 'pas {{days}} ditësh',
  dueToday: 'Sot',
  overdue: 'Vonuar!',
  lastDiaryEntry: 'Ditar i fundit',
  noDiaryEntry: 'Nuk ka shënim',
  addTemperature: 'Shto Temperaturë',
  addDiaryEntry: 'Shto Shënim',
  addAppointment: 'Shto Termin',
  diaryTypes: {
    symptom: 'Simptomë',
    meal: 'Ndarkë',
    sleep: 'Gjumë',
    mood: 'Qëndrim',
    activity: 'Aktivitet'
  }
}

// EN labels (same structure with English values)
dashboard: {
  temperature: 'Temperature',
  feverAlert: 'Fever',
  weight: 'Weight',
  height: 'Height',
  growthTrend: 'Growth Trend',
  nextVaccine: 'Next Vaccine',
  nextAppointment: 'Next Appointment',
  inDays: 'in {{days}} days',
  dueToday: 'Today',
  overdue: 'Overdue!',
  lastDiaryEntry: 'Last Diary Entry',
  noDiaryEntry: 'No entry',
  addTemperature: 'Add Temperature',
  addDiaryEntry: 'Add Entry',
  addAppointment: 'Add Appointment',
  diaryTypes: {
    symptom: 'Symptom',
    meal: 'Meal',
    sleep: 'Sleep',
    mood: 'Mood',
    activity: 'Activity'
  }
}
```

**Where to add these**: The existing `I18nService` manages the translation dictionary — add the `dashboard` namespace to its internal translation map (same pattern as `home.*`, `records.*`, etc.).

---

## 5. Edge Cases

| Scenario | Behavior |
|----------|----------|
| No child selected | `ChildDashboardComponent` renders nothing (guards with `@if (activeChild())`) |
| No temperature entries | Shows `"Temperature: —"` |
| Fever temp (≥38.0°C) | Red color + warning icon + ⚠️ |
| No weight OR height | Show only the available one, e.g. `"14.2 kg"` or `"— / 93 cm"` |
| Fewer than 2 growth entries | Growth trend arrow hidden |
| No vaccine records | Shows `"nextVaccine"` as `"—"` |
| Vaccine overdue (days < 0) | Red + "Overdue!" text |
| No appointments | Shows `"nextAppointment"` as `"—"` |
| Appointment overdue | Red + "Overdue!" text |
| No diary entries | Shows `noDiaryEntry` placeholder |
| Diary description > 50 chars | Truncates with `…` |
| Offline mode | All data from localStorage (already handled by DataService) |

---

## 6. Execution Roadmap

### Step 1 — i18n dictionary
Add `dashboard.*` keys to `I18nService` translation map (both SQ + EN).

### Step 2 — DashboardQuickActionsComponent
Create `dashboard-quick-actions.component.ts` in `src/app/components/home/`. 3 buttons, Router navigation.

### Step 3 — DashboardSummaryCardComponent
Create `dashboard-summary-card.component.ts`. All 6 rows, computed signals, fever alert logic, growth trend arrow, i18n throughout.

### Step 4 — ChildDashboardComponent
Create `child-dashboard.component.ts`. Guards on active child, composes the card + quick actions.

### Step 5 — Integrate into HomeComponent
Add `ChildDashboardComponent` to `home.component.ts` imports and template, placed below `WelcomeHeroComponent`.

### Step 6 — Verify no breaking changes
Run `ng serve` and confirm the home page loads without errors. Check that existing children data renders correctly.

---

## 7. Dependencies (no new npm packages)

- `Angular Router` (already in project) — for quick-action navigation
- `LucideAngularModule` (already imported in all components) — icons
- `DataService` (already injected everywhere) — all signal reads
- `I18nService` (already in project) — i18n

---

## 8. Non-Goals (out of scope for Sprint 9)

- Backend changes
- New API endpoints
- New data types or DTOs
- Offline-specific logic (handled by existing services)
- Multi-child grid view (future sprint)
- Animations beyond existing fade-in patterns
