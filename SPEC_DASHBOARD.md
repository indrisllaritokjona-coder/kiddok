# Sprint 9 — Dashboard Summary Module

## 1. Overview

**Goal**: Replace or enhance the current home tab with a quick-glance dashboard card visible whenever a child is selected. All data comes from existing `DataService` signals. No backend changes.

**File**: `SPEC_DASHBOARD.md`
**Commit**: `git add SPEC_DASHBOARD.md && git commit -m "sprint9: architect plan for dashboard summary module"`

---

## 2. Architecture

### 2.1 Component Structure

```
src/app/components/
├── dashboard-summary/            ← new standalone component
│   ├── dashboard-summary.component.ts
│   ├── dashboard-summary.component.html
│   ├── dashboard-summary.component.scss
│   └── dashboard-child-card/     ← new sub-component
│       ├── dashboard-child-card.component.ts
│       ├── dashboard-child-card.component.html
│       └── dashboard-child-card.component.scss
```

**Entry point**: `app.component.ts` already renders `currentTab` via `app.routes.ts`. The dashboard component will be mounted in the home tab slot alongside the existing `welcome-hero`, `quick-actions-grid`, `health-alert-card`, `recent-activity-feed`.

Option A — replace home tab entirely with new dashboard
Option B — prepend dashboard card to existing home tab (recommended, lower risk)

Decision: **Option B** — prepend `<app-dashboard-summary>` to the home tab template, replacing the welcome hero when a child is selected. The `dashboard-summary` component handles its own header (child name + avatar + age), then lists per-child cards for the quick-glance view.

### 2.2 Data Flow (Read-only, all signals)

```
DataService (signals)
├── activeChildId
├── children[]
├── temperatureEntries[]   → filter by childId, sort desc → last entry → fever check
├── growthEntries[]        → filter by childId, sort desc → last 2 → trend arrow
├── diaryEntries[]         → filter by childId, sort desc → last entry
├── records[]              → filter by childId → next vaccine (dueDate ASC, !completed)
└── appointments (new)     → filter by childId → next appointment (date ASC, !completed)
                                                               ↑
                                             stored in localStorage as kiddok_appointments_<childId>
```

**No HTTP calls** — all reads are from in-memory signals updated by existing `loadChildDetails()`.

### 2.3 New Interfaces

```typescript
// src/app/models/dashboard.models.ts

export interface Appointment {
  id: string;
  childId: string;
  title: string;
  doctor?: string;
  location?: string;
  dateTime: string;        // ISO string
  notes?: string;
  completed: boolean;
}

export interface DashboardMetrics {
  lastTemperature: TemperatureEntry | null;
  lastGrowth: GrowthEntry | null;
  previousGrowth: GrowthEntry | null;   // for trend comparison
  nextVaccine: VaccineRecord | null;
  nextAppointment: Appointment | null;
  lastDiaryEntry: DiaryEntry | null;
}

export type GrowthTrend = 'up' | 'down' | 'stable';

export type FeverStatus = 'normal' | 'elevated' | 'fever' | 'high_fever';
```

---

## 3. Per-Child Dashboard Card

### 3.1 Layout

```
┌─────────────────────────────────────────────────┐
│  [Avatar]  Name, Age                            │
├─────────────────────────────────────────────────┤
│  🌡️ Temperature: 38.2°C ⚠️   (red + warning icon) │
│  📏 14.2 kg / 93 cm    ↑ (green trend arrow)    │
│  💉 Varicella — in 8 days                       │
│     OR: Varicella — Overdue! (red)              │
│  📅 ENT Follow-up — in 5 days                   │
│  📖 [icon] First 50 chars of last diary entry   │
├─────────────────────────────────────────────────┤
│  [+ Temperature] [+ Diary Entry] [+ Appointment]│
└─────────────────────────────────────────────────┘
```

### 3.2 Fever Alert Logic

| Condition | Display |
|-----------|---------|
| `< 37.5°C` | No alert, neutral text |
| `37.5–38.0°C` | Elevated — amber text "37.8°C" + ⚠️ |
| `> 38.0°C` | Fever — red bg card, red text, danger icon |

### 3.3 Growth Trend Arrow

Compare the **last two** `GrowthEntry` records (by `measuredAt` desc). Weight is primary; height as tiebreaker.

| Comparison | Arrow | Color |
|------------|-------|-------|
| Latest weight > previous weight | `↑` | green |
| Latest weight < previous weight | `↓` | orange |
| Same (±0.05 kg tolerance) | `→` | gray |
| Fewer than 2 entries | hidden | — |

### 3.4 Vaccine Countdown

Find the first non-completed `VaccineRecord` with the earliest `dueDate`.

- If `dueDate < today` → "Overdue!" in red + overdue days
- If `dueDate <= today + 30 days` → "Varicella — in N days"
- Else → no card row (hide)

### 3.5 Appointment Countdown

New localStorage-backed `Appointment` list. Find the first non-completed appointment with the earliest `dateTime`.

- If `dateTime < now` → "Overdue!" in red
- If `dateTime <= now + 30 days` → "ENT Follow-up — in N days"
- Else → no card row (hide)

### 3.6 Diary Entry Row

Icon map by type:
```
symptom → 🤒
meal    → 🍽️
sleep   → 😴
mood    → 😊
activity → 🏃
```

Truncate description to 50 characters + ellipsis if longer.

---

## 4. Quick-Action Buttons

Three buttons at the bottom of the card:

| Button | Action | Icon |
|--------|--------|------|
| `+ Temperature` | Navigate to temperature tab with add-form open | thermometer |
| `+ Diary Entry` | Navigate to diary tab with add-form open | book-open |
| `+ Appointment` | Inline or navigate to appointments tab | calendar-plus |

Clicking navigates via `window.dispatchEvent(new CustomEvent('kiddok:navigate', { detail: route }))`.

---

## 5. New Appointment Service

```typescript
// src/app/services/appointments.service.ts

@Injectable({ providedIn: 'root' })
export class AppointmentsService {
  appointments = signal<Appointment[]>([]);

  loadAppointments(childId: string): void { /* from localStorage */ }
  addAppointment(data: Omit<Appointment, 'id'>): Appointment { /* persist + signal */ }
  deleteAppointment(id: string): void { /* remove + signal */ }
}
```

Storage key: `kiddok_appointments_<childId>` (same pattern as `records` and `illnesses`).

---

## 6. i18n Translations

Add to `i18n.service.ts` translations object:

```typescript
// Dashboard
'dashboard.title': { sq: 'Përmbledhje', en: 'Summary' },
'dashboard.temperature': { sq: 'Temperatura', en: 'Temperature' },
'dashboard.temperature.fever': { sq: 'Ka ethe!', en: 'Fever!' },
'dashboard.temperature.high': { sq: 'Temperatura e lartë', en: 'High temperature' },
'dashboard.weight': { sq: 'Pesha', en: 'Weight' },
'dashboard.height': { sq: 'Gjatësia', en: 'Height' },
'dashboard.vaccine.next': { sq: 'Vaksina tjetër', en: 'Next vaccine' },
'dashboard.vaccine.overdue': { sq: 'e vonuar', en: 'overdue' },
'dashboard.vaccine.inDays': { sq: 'në {n} ditë', en: 'in {n} days' },
'dashboard.appointment.next': { sq: 'Termini tjetër', en: 'Next appointment' },
'dashboard.appointment.overdue': { sq: 'i vonuar', en: 'overdue' },
'dashboard.appointment.inDays': { sq: 'në {n} ditë', en: 'in {n} days' },
'dashboard.diary.lastEntry': { sq: 'Hyrja e fundit', en: 'Last entry' },
'dashboard.diary.none': { sq: 'Pa shënime', en: 'No entries yet' },
'dashboard.growth.trendUp': { sq: 'Rritje', en: 'Growing' },
'dashboard.growth.trendDown': { sq: 'Duke rënë', en: 'Declining' },
'dashboard.growth.trendStable': { sq: 'I qëndrueshëm', en: 'Stable' },
'dashboard.actions.addTemp': { sq: '+ Temperatura', en: '+ Temperature' },
'dashboard.actions.addDiary': { sq: '+ Shënim Ditari', en: '+ Diary Entry' },
'dashboard.actions.addAppointment': { sq: '+ Termin', en: '+ Appointment' },
'dashboard.noChild': { sq: 'Zgjidhni një fëmijë për të parë përmbledhjen', en: 'Select a child to view summary' },
```

---

## 7. Edge Cases

| Scenario | Behavior |
|----------|----------|
| No child selected | Show placeholder message |
| No temperature entries | Show "—" for temperature row |
| Only 1 growth entry | Hide trend arrow |
| No diary entries | Show empty state with icon |
| No upcoming vaccines | Hide vaccine row |
| No upcoming appointments | Hide appointment row |
| Temperature ≥ 38°C | Fever alert styling (red card, warning icon) |
| Vaccine overdue | "Overdue!" in red, show days overdue |
| Appointment overdue | "Overdue!" in red |
| All rows empty | Show minimal card with "No data yet" |
| Offline mode | All data from localStorage signals — no changes needed |

---

## 8. Execution Roadmap

### Phase 1 — Scaffold & Models
- [ ] Create `src/app/models/dashboard.models.ts`
- [ ] Create `src/app/services/appointments.service.ts` (localStorage, signal-based)
- [ ] Add dashboard i18n keys to `i18n.service.ts`
- [ ] Add `appointments` to `DataService` via `switchChild()` loading

### Phase 2 — Dashboard Summary Component
- [ ] Create `dashboard-summary.component.ts` (standalone, signal-based)
- [ ] Create `dashboard-summary.component.html`
- [ ] Create `dashboard-summary.component.scss`
- [ ] Add to home tab template as first section

### Phase 3 — Child Card Component
- [ ] Create `dashboard-child-card.component.ts`
- [ ] Create `dashboard-child-card.component.html`
- [ ] Create `dashboard-child-card.component.scss`
- [ ] Plug into dashboard-summary

### Phase 4 — Quick Actions & Navigation
- [ ] Implement `+ Temperature` → navigate to temperature with add-form
- [ ] Implement `+ Diary Entry` → navigate to diary with add-form
- [ ] Implement `+ Appointment` → inline add-appointment modal OR navigate

### Phase 5 — Polish & i18n
- [ ] Verify SQ/EN translations render correctly
- [ ] Responsive layout (mobile-first)
- [ ] Verify zero fever alert regressions

---

## 9. Dependencies

| Item | Source |
|------|--------|
| `DataService` signals | existing |
| `I18nService` | existing |
| `LucideAngularModule` | existing (icons) |
| `Appointment` interface | new |
| `AppointmentsService` | new |
| Dashboard i18n keys | new |

---

## 10. Not in Scope

- Backend/API changes
- Offline service modifications
- Analytics charts
- Medication tracking
- Lab results integration
- Push notifications