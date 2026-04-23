# SPEC.md — Sprint 9: Dashboard Summary Module

**Version:** 1.0
**Sprint:** 9
**Date:** 2026-04-23
**Status:** Draft — Ready for Executor

---

## 1. Overview

**Goal:** A compact, glanceable **Dashboard Summary Card** shown at the top of the home page (or as a dedicated dashboard tab) when a child is selected. The card surfaces the most critical health snapshots per child — temperature, growth, vaccines, appointments, and diary — in a single, scannable panel with quick-action buttons. No backend changes; all data comes from existing DataService signals.

**Design Goals:**
- **≤5 second read:** Parent opens app → instantly sees if anything needs attention
- **Warm, friendly UI:** Rounded card, soft shadows, colour-coded health signals
- **Action-oriented:** Quick-action buttons right in the card
- **Alert-first:** Fever and overdue items are visually prominent

---

## 2. Page Layout

```
┌──────────────────────────────────────────────────────────────┐
│  HomeComponent                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         DashboardSummaryCardComponent                  │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐               │ │
│  │  │  Temp    │ │  Growth  │ │  Vaccine │  [next due]    │ │
│  │  │  [38.1°C]│ │  ↑ 85cm   │ │  Polio   │  7 days       │ │
│  │  │  ⚠ fever │ │  12.3kg  │ │          │               │ │
│  │  └──────────┘ └──────────┘ └──────────┘               │ │
│  │  ┌─────────────────────┐  ┌──────────────────┐          │ │
│  │  │ Appointment         │  │ Diary            │          │ │
│  │  │ "Kontrolle" 3 days  │  │ 😰 Headache      │          │ │
│  │  │ Overdue (red)       │  │ excerpt text...  │          │ │
│  │  └─────────────────────┘  └──────────────────┘          │ │
│  │  [+ Temperature] [+ Diary] [+ Appointment]             │ │
│  └────────────────────────────────────────────────────────┘ │
│  [QuickActionsGrid]  [HealthAlertCard]  [RecentActivityFeed]│
└──────────────────────────────────────────────────────────────┘
```

### 2.1 DashboardSummaryCardComponent

**Purpose:** Single card at top of HomeComponent (above QuickActionsGrid) showing all health snapshots for the selected child.

**Visibility:** Rendered only when a child is selected (`activeChildId` is not null). If no child selected, the card is hidden.

**Sections (4 panels inside card):**
1. Temperature panel — last reading + fever alert
2. Growth panel — last weight/height + trend arrow
3. Vaccines panel — next due vaccine + countdown
4. Appointments + Diary panel — next appointment + last diary entry

**Quick-action buttons row:** 3 buttons at bottom of card.

---

## 3. Component Breakdown

### 3.1 DashboardSummaryCard Component

**File:** `src/app/components/home/dashboard-summary-card/`

```
dashboard-summary-card/
  dashboard-summary-card.component.ts
  dashboard-summary-card.component.html
  dashboard-summary-card.component.css
```

**Inputs:** None — reads all data from `DataService` signals.

**Sections (4 stat panels + quick actions):**

#### Panel A — Temperature
- Shows last temperature entry for the active child
- Value displayed: `{value}°C`
- Fever state (≥38.0°C): value text turns `#E11D48` (red-500), shows warning icon + "⚠️" label
- Non-fever state: value in primary colour
- If no entries: shows "—" with label `dashboard.noData`

#### Panel B — Growth
- Shows most recent growth entry for the active child
- Displays: `{heightCm} cm / {weightKg} kg`
- Growth trend arrow vs previous entry:
  - `↑` (green) — height or weight increased
  - `↓` (red) — height or weight decreased
  - `→` (gray) — no change
  - Calculated by comparing latest vs previous `measuredAt` entry
- If no entries: shows "—"

#### Panel C — Vaccines
- Shows next due vaccine (status `due` or `overdue`) sorted by `dueDate` ascending
- Display: vaccine name + days countdown
  - `"{name} — {n} ditë"` / `"{name} — {n} days"` (upcoming)
  - `"Due today!"` (0 days — SQ: "Sot!", EN: "Due today!")
  - `"{name} — {n} ditë i vonuar"` / `"{name} — {n} days overdue"` (overdue, in red)
- If no upcoming/due vaccines: shows "—" with label `dashboard.vaccine.none`

#### Panel D — Appointments + Diary (side by side)
- **Appointment:** Next upcoming appointment (nearest future `dateTime`), shows:
  - Title + days countdown
  - `"Overdue"` in red if past
  - If none: shows `dashboard.appointment.none`
- **Diary:** Last diary entry for active child:
  - Icon based on `type` (symptom 😰, meal 🍽️, sleep 😴, mood 😊, activity 🎨)
  - Description excerpt (max 60 chars, truncated with "…")
  - Relative time: "2 orë më parë" / "2 hours ago"
  - If none: shows `dashboard.diary.none`

#### Quick-action Buttons Row
Three buttons at card bottom:
| Button | Icon | Route |
|--------|------|-------|
| + Temperature | `thermometer` | `/temperature` |
| + Diary Entry | `edit_note` | `/diary` |
| + Appointment | `calendar_plus` | `/appointments` |

**Card visual specs:**
- Background: `#FFFFFF`
- Border: `1px #E7E5E4`, `border-radius: 20px`
- Box-shadow: `0 4px 16px -4px rgba(0,0,0,0.10)`
- Padding: `24px`
- Gap between panels: `16px`
- Panel backgrounds: `#F9FAFB` (gray-50), `border-radius: 12px`, `padding: 14px`

---

## 4. Data Integration

### 4.1 Signals Used (all from DataService)

```typescript
// In DashboardSummaryCardComponent
private data = inject(DataService);
private i18n = inject(I18nService);

// Active child
activeChild = computed(() =>
  this.data.children().find(c => c.id === this.data.activeChildId()) ?? null
);

// Temperature — latest for active child
latestTemp = computed(() => {
  const childId = this.data.activeChildId();
  if (!childId) return null;
  const entries = this.data.temperatureEntries().filter(e => e.childId === childId);
  return entries.sort((a, b) => new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime())[0] ?? null;
});

// Growth — latest + previous for trend
growthEntries = computed(() => {
  const childId = this.data.activeChildId();
  if (!childId) return [];
  return this.data.growthEntries()
    .filter(e => e.childId === childId)
    .sort((a, b) => new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime());
});

latestGrowth = computed(() => this.growthEntries()[0] ?? null);
previousGrowth = computed(() => this.growthEntries()[1] ?? null);

// Vaccines — next due for active child
nextVaccine = computed(() => {
  const childId = this.data.activeChildId();
  if (!childId) return null;
  const records = this.data.vaccineRecords().filter(e => e.childId === childId);
  const upcoming = records
    .filter(r => r.status === 'due' || r.status === 'overdue')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  return upcoming[0] ?? null;
});

// Diary — latest for active child
latestDiary = computed(() => {
  const childId = this.data.activeChildId();
  if (!childId) return null;
  const entries = this.data.diaryEntries().filter(e => e.childId === childId);
  return entries.sort((a, b) => new Date(b.loggedAt).getTime() - new Date(a.loggedAt).getTime())[0] ?? null;
});
```

### 4.2 Appointments Data (local component signal)

Since `AppointmentRecord` is stored locally in `AppointmentsComponent` and not in `DataService`, the DashboardSummaryCard creates its **own local signal** for appointments and syncs from `localStorage` on init.

```typescript
// DashboardSummaryCardComponent — local appointments signal
appointments = signal<AppointmentRecord[]>([]);

constructor() {
  // Sync appointments from localStorage on init
  effect(() => {
    const childId = this.data.activeChildId();
    if (childId) {
      const stored = localStorage.getItem(`kiddok_appointments_${childId}`);
      this.appointments.set(stored ? JSON.parse(stored) : []);
    }
  });
}

nextAppointment = computed(() => {
  const now = new Date();
  return this.appointments()
    .filter(a => new Date(a.dateTime) >= now)
    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())[0] ?? null;
});
```

> **Note:** `AppointmentsComponent` must save appointments to `localStorage` key `kiddok_appointments_{childId}` on every add/edit/delete. Executor will add this in the AppointmentsComponent as a follow-on consistency fix (tracked as a NOTE in this spec, not a scope item).

### 4.3 Growth Trend Calculation

```typescript
growthTrend = computed(() => {
  const latest = this.latestGrowth();
  const previous = this.previousGrowth();
  if (!latest || !previous) return 'stable'; // 'up' | 'down' | 'stable'

  // Compare by whichever is available
  if (latest.height && previous.height) {
    if (latest.height > previous.height) return 'up';
    if (latest.height < previous.height) return 'down';
  }
  if (latest.weight && previous.weight) {
    if (latest.weight > previous.weight) return 'up';
    if (latest.weight < previous.weight) return 'down';
  }
  return 'stable';
});
```

---

## 5. i18n Implementation

### 5.1 New Keys

All keys go under the `dashboard.*` namespace.

```typescript
// Dashboard card
'dashboard.title':            { sq: 'Përmbledhje', en: 'Summary' }
'dashboard.noChild':           { sq: 'Zgjidhni një fëmijë për të parë përmbledhjen', en: 'Select a child to see the summary' }

// Temperature panel
'dashboard.temp.label':        { sq: 'Temperatura e fundit', en: 'Last temperature' }
'dashboard.temp.fever':         { sq: 'ethjes i lartë!', en: 'fever!' }
'dashboard.temp.noData':        { sq: '—', en: '—' }

// Growth panel
'dashboard.growth.label':      { sq: 'Rritja', en: 'Growth' }
'dashboard.growth.trendUp':     { sq: '↑', en: '↑' }
'dashboard.growth.trendDown':   { sq: '↓', en: '↓' }
'dashboard.growth.trendStable': { sq: '→', en: '→' }
'dashboard.growth.noData':      { sq: '—', en: '—' }
'dashboard.growth.kg':          { sq: 'kg', en: 'kg' }
'dashboard.growth.cm':         { sq: 'cm', en: 'cm' }

// Vaccine panel
'dashboard.vaccine.label':     { sq: 'Vaksina tjetër', en: 'Next vaccine' }
'dashboard.vaccine.days':       { sq: '{n} ditë', en: '{n} days' }
'dashboard.vaccine.daysOverdue':{ sq: '{n} ditë e vonuar', en: '{n} days overdue' }
'dashboard.vaccine.dueToday':    { sq: 'Sot!', en: 'Due today!' }
'dashboard.vaccine.none':       { sq: 'Të gjitha të përfunduara', en: 'All up to date' }

// Appointment panel
'dashboard.appointment.label':  { sq: 'Termini tjetër', en: 'Next appointment' }
'dashboard.appointment.days':   { sq: '{n} ditë', en: '{n} days' }
'dashboard.appointment.overdue':{ sq: 'I vonuar', en: 'Overdue' }
'dashboard.appointment.none':   { sq: 'Nuk ka termin', en: 'No appointments' }

// Diary panel
'dashboard.diary.label':       { sq: 'Ditar i fundit', en: 'Last diary entry' }
'dashboard.diary.none':         { sq: 'Nuk ka shënim', en: 'No entries' }
'dashboard.diary.hoursAgo':     { sq: '{n} orë më parë', en: '{n} hours ago' }
'dashboard.diary.minutesAgo':   { sq: '{n} minuta më parë', en: '{n} minutes ago' }
'dashboard.diary.today':        { sq: 'Sot', en: 'Today' }
'dashboard.diary.yesterday':     { sq: 'Dje', en: 'Yesterday' }

// Quick actions
'dashboard.qa.temperature':     { sq: '+ Temperatura', en: '+ Temperature' }
'dashboard.qa.diary':           { sq: '+ Ditari', en: '+ Diary Entry' }
'dashboard.qa.appointment':      { sq: '+ Termin', en: '+ Appointment' }

// Relative time helpers
'time.hoursAgo':    { sq: '{n} orë më parë', en: '{n} hours ago' }
'time.minutesAgo':  { sq: '{n} minuta më parë', en: '{n} minutes ago' }
'time.today':      { sq: 'Sot', en: 'Today' }
'time.yesterday':  { sq: 'Dje', en: 'Yesterday' }
```

**Total new i18n keys:** ~28

---

## 6. Design Specifications

### 6.1 Colors (matching existing palette)

| Element | Color |
|---------|-------|
| Card background | `#FFFFFF` |
| Card border | `#E7E5E4` |
| Panel background | `#F9FAFB` |
| Fever text | `#E11D48` (red-500) |
| Overdue text | `#E11D48` |
| Trend up | `#10B981` (emerald-500) |
| Trend down | `#F97316` (orange-500) |
| Trend stable | `#9CA3AF` (gray-400) |
| Primary accent | `#6366F1` (indigo-500) |
| Section label | `#78716C` (stone-500) |

### 6.2 Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Card title | Inter | 18px | 700 |
| Panel value | Inter | 22px | 800 |
| Panel label | Inter | 12px | 500 |
| Section label | Inter | 11px | 600 |
| Button text | Inter | 13px | 600 |

### 6.3 Spacing

- Card padding: `24px`
- Panel gap: `16px`
- Panel border-radius: `12px`
- Card border-radius: `20px`
- Quick-action button gap: `12px`

### 6.4 Animations

- Card entrance: `fadeIn 300ms ease-out`
- Panel hover: subtle `translateY(-2px)` + shadow, `200ms ease`
- Button hover: `scale(1.02)`, `150ms ease`

---

## 7. File Structure

```
src/app/
└── components/
    └── home/
        └── dashboard-summary-card/
            dashboard-summary-card.component.ts   (standalone, signals, computed)
            dashboard-summary-card.component.html
            dashboard-summary-card.component.css

src/app/components/home.component.ts   (add import + embed in template)
```

### 7.1 HomeComponent Changes

In `home.component.ts`:
```typescript
// Add import
import { DashboardSummaryCardComponent } from './home/dashboard-summary-card/';

// Add to imports array
imports: [..., DashboardSummaryCardComponent]

// Add to template (above welcome-hero):
<app-dashboard-summary-card />
```

---

## 8. Acceptance Criteria

- [ ] DashboardSummaryCard renders only when a child is selected
- [ ] Shows last temperature with red + warning icon when ≥38.0°C
- [ ] Shows last weight + height with correct unit labels
- [ ] Growth trend arrow shows ↑/↓/→ based on previous measurement comparison
- [ ] Next due vaccine shows name + days countdown; "Due today!" for 0 days; red overdue label
- [ ] Next appointment shows title + days countdown; "Overdue" in red if past
- [ ] Last diary entry shows type icon + description excerpt (max 60 chars) + relative time
- [ ] Quick-action buttons navigate to correct routes
- [ ] All strings are bilingual (SQ + EN) via I18nService
- [ ] Card entrance animation plays on mount
- [ ] Panels have hover lift effect
- [ ] Responsive: 2-column grid on mobile, 4-column on desktop
- [ ] No new API calls — all from existing signals

---

## 9. Notes for Executor

1. **Appointments localStorage sync:** The AppointmentsComponent currently saves to localStorage but verify this on review. If it does not, add `localStorage.setItem('kiddok_appointments_${childId}', JSON.stringify(appointments))` after every add/edit/delete operation. This is a consistency fix, not part of the dashboard scope.
2. **Diary type icons:** Map `type` to emoji: symptom→😰, meal→🍽️, sleep→😴, mood→😊, activity→🎨
3. **Relative time format:** Use `Intl.RelativeTimeFormat` or manual calculation for hours/minutes/days.
4. **Diary excerpt:** Truncate at 60 chars with "…".
5. **No new route needed** — DashboardSummaryCard is embedded in HomeComponent.
6. **Appointments**: If localStorage is empty on first load, appointments shows empty state (not an error).
