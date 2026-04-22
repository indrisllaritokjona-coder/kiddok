# SPEC — Sprint 14: VaccineScheduleComponent + VaccineAlertCardComponent

## Overview

Sprint 14 extracts two sub-components from the existing `VaccinesComponent`:
- **VaccineScheduleComponent** — a dedicated visual timeline of the Albania standard vaccination schedule
- **VaccineAlertCardComponent** — individual compact alert cards for the VaccinesPage alert banner (and HomePage health alerts)

Both live under `src/app/components/vaccines/`.

---

## File Structure

```
src/app/components/vaccines/
├── vaccines.component.ts         ← already exists (Sprint 9)
├── vaccine-schedule.component.ts ← NEW
├── vaccine-alert-card.component.ts← NEW
└── vaccine-schedule.constant.ts  ← NEW: Albania standard schedule data
```

---

## 1. `vaccine-schedule.constant.ts`

Exports the standard Albania vaccination schedule as a typed constant array.

```typescript
export interface ScheduleEntry {
  code: string;          // e.g. 'BCG', 'DTaP-1'
  nameSq: string;         // Albanian name
  nameEn: string;         // English name
  doses: number;          // total dose count
  defaultIntervalDays: number; // days from previous dose (0 for first)
  earliestDay: number;    // minimum age in days
  recommendedDay: number; // recommended age in days
}

export const VACCINE_SCHEDULE: ScheduleEntry[] = [
  // Birth
  { code: 'BCG',      nameSq: 'Vaksina e Tuberkulozit',    nameEn: 'BCG',           doses: 1, defaultIntervalDays: 0,  earliestDay: 0,    recommendedDay: 0    },
  { code: 'HepB-1',   nameSq: 'Hepatiti B (Doza 1)',      nameEn: 'Hepatitis B (Dose 1)', doses: 1, defaultIntervalDays: 0,  earliestDay: 0,    recommendedDay: 0    },
  // 2 months
  { code: 'DTaP-1',   nameSq: 'DTaP (Doza 1)',            nameEn: 'DTaP (Dose 1)',      doses: 5, defaultIntervalDays: 30, earliestDay: 60,   recommendedDay: 60   },
  { code: 'Hib-1',    nameSq: 'Hib (Doza 1)',             nameEn: 'Hib (Dose 1)',        doses: 4, defaultIntervalDays: 30, earliestDay: 60,   recommendedDay: 60   },
  { code: 'IPV-1',    nameSq: 'Polio IPV (Doza 1)',       nameEn: 'IPV (Dose 1)',        doses: 4, defaultIntervalDays: 30, earliestDay: 60,   recommendedDay: 60   },
  { code: 'HepB-2',   nameSq: 'Hepatiti B (Doza 2)',     nameEn: 'Hepatitis B (Dose 2)', doses: 1, defaultIntervalDays: 30, earliestDay: 60,   recommendedDay: 60   },
  { code: 'PCV-1',    nameSq: 'PCV (Doza 1)',             nameEn: 'PCV (Dose 1)',        doses: 3, defaultIntervalDays: 30, earliestDay: 60,   recommendedDay: 60   },
  { code: 'Rotavirus-1', nameSq: 'Rotavirus (Doza 1)',   nameEn: 'Rotavirus (Dose 1)',   doses: 2, defaultIntervalDays: 30, earliestDay: 60,   recommendedDay: 60   },
  // 3 months
  { code: 'DTaP-2',   nameSq: 'DTaP (Doza 2)',            nameEn: 'DTaP (Dose 2)',      doses: 5, defaultIntervalDays: 30, earliestDay: 90,   recommendedDay: 90   },
  { code: 'Hib-2',    nameSq: 'Hib (Doza 2)',             nameEn: 'Hib (Dose 2)',        doses: 4, defaultIntervalDays: 30, earliestDay: 90,   recommendedDay: 90   },
  { code: 'IPV-2',    nameSq: 'Polio IPV (Doza 2)',       nameEn: 'IPV (Dose 2)',        doses: 4, defaultIntervalDays: 30, earliestDay: 90,   recommendedDay: 90   },
  // 4 months
  { code: 'DTaP-3',   nameSq: 'DTaP (Doza 3)',            nameEn: 'DTaP (Dose 3)',      doses: 5, defaultIntervalDays: 30, earliestDay: 120,  recommendedDay: 120  },
  { code: 'Hib-3',    nameSq: 'Hib (Doza 3)',             nameEn: 'Hib (Dose 3)',        doses: 4, defaultIntervalDays: 30, earliestDay: 120,  recommendedDay: 120  },
  { code: 'IPV-3',    nameSq: 'Polio IPV (Doza 3)',       nameEn: 'IPV (Dose 3)',        doses: 4, defaultIntervalDays: 30, earliestDay: 120,  recommendedDay: 120  },
  { code: 'PCV-2',    nameSq: 'PCV (Doza 2)',             nameEn: 'PCV (Dose 2)',        doses: 3, defaultIntervalDays: 30, earliestDay: 120,  recommendedDay: 120  },
  { code: 'Rotavirus-2', nameSq: 'Rotavirus (Doza 2)',   nameEn: 'Rotavirus (Dose 2)',   doses: 2, defaultIntervalDays: 30, earliestDay: 120,  recommendedDay: 120  },
  // 12 months
  { code: 'HepB-3',   nameSq: 'Hepatiti B (Doza 3)',     nameEn: 'Hepatitis B (Dose 3)', doses: 1, defaultIntervalDays: 180, earliestDay: 360,  recommendedDay: 360  },
  { code: 'PCV-3',    nameSq: 'PCV (Doza 3)',             nameEn: 'PCV (Dose 3)',        doses: 3, defaultIntervalDays: 180, earliestDay: 360,  recommendedDay: 360  },
  { code: 'MMR-1',    nameSq: 'MMR (Doza 1)',             nameEn: 'MMR (Dose 1)',        doses: 2, defaultIntervalDays: 0,  earliestDay: 365,  recommendedDay: 365  },
  // 18 months
  { code: 'DTaP-4',   nameSq: 'DTaP (Doza 4)',            nameEn: 'DTaP (Dose 4)',      doses: 5, defaultIntervalDays: 180, earliestDay: 540,  recommendedDay: 540  },
  { code: 'Hib-4',    nameSq: 'Hib (Doza 4)',             nameEn: 'Hib (Dose 4)',        doses: 4, defaultIntervalDays: 180, earliestDay: 540,  recommendedDay: 540  },
  { code: 'IPV-4',    nameSq: 'Polio IPV (Doza 4)',       nameEn: 'IPV (Dose 4)',        doses: 4, defaultIntervalDays: 180, earliestDay: 540,  recommendedDay: 540  },
  // 5 years
  { code: 'DTaP-5',   nameSq: 'DTaP (Doza 5)',            nameEn: 'DTaP (Dose 5)',      doses: 5, defaultIntervalDays: 730, earliestDay: 1825, recommendedDay: 1825 },
  { code: 'MMR-2',    nameSq: 'MMR (Doza 2)',             nameEn: 'MMR (Dose 2)',        doses: 2, defaultIntervalDays: 0,  earliestDay: 1460, recommendedDay: 1460 },
  // 11 years
  { code: 'Tdap',     nameSq: 'Tdap',                    nameEn: 'Tdap',               doses: 1, defaultIntervalDays: 0,  earliestDay: 4015, recommendedDay: 4015 },
  // 12 years
  { code: 'HPV',      nameSq: 'HPV',                     nameEn: 'HPV',                doses: 2, defaultIntervalDays: 180, earliestDay: 4380, recommendedDay: 4380 },
];
```

---

## 2. `vaccine-schedule.component.ts`

### Purpose
A visual timeline showing the standard Albania vaccination schedule mapped to the selected child's actual vaccine records.

### Inputs
- `childId: string` — active child ID (from DataService)
- `vaccineRecords: Signal<VaccineRecord[]>` — the child's existing vaccine records from VaccinesComponent

### Visual Design
- **Container:** White card with rounded-2xl, border-gray-100, shadow-sm. Scrollable vertically with max-height constraint (e.g. 480px with overflow-y-auto).
- **Header:** "Planifikimi i Vaksinave" / "Vaccine Schedule" — text-lg font-bold with a timeline icon.
- **Timeline line:** A vertical line (2px, gray-200) running down the left side. Date markers are dots on this line.
- **Date markers:** Each vaccine entry has a dot on the timeline. Color:
  - `completed` — green (#22C55E) solid dot
  - `upcoming` — teal (#14B8A6) hollow dot
  - `overdue` — red (#F97316) pulsing dot (CSS animation)
- **Entry layout:** `[dot] [icon+name+dose] [date] [badge]`
- **Section headers** (grouped by period): Overdue / Due / Upcoming / Completed — as sticky sub-headers within the scrollable area.

### Layout (pseudo-grid)
```
[legend: ● Completed  ○ Upcoming  ● Overdue]
[Timeline vertical line]
  [dot] [vaccine icon] [name + dose progress] [date] [status badge]
  [dot] ...
```

### Interactions
1. **Tap entry** → expand inline to show details panel (manufacturer, batch number, injection site, doctor, notes, completion date). Collapse on second tap.
2. **Long-press entry** → open `markCompleteModal` with date picker (defaults to today). Confirms with POST/PATCH to API.
3. **Scroll** → timeline scrolls independently. Section headers stick within scroll viewport.

### Component State
- `expandedId: Signal<string | null>`
- `showMarkCompleteModal: Signal<boolean>`
- `pendingCompletionRecord: Signal<VaccineRecord | null>`
- `completionDate: Signal<string>` (ISO date string)

### Data Mapping
```typescript
// For each schedule entry, find matching record by vaccineName + doseNumber
function getStatusForEntry(entry: ScheduleEntry, doseNumber: number, records: VaccineRecord[]): 'completed' | 'due' | 'upcoming' | 'overdue' | 'not_started'
```
- If `record.completedAt` exists → `completed`
- Else compute `diffDays = (today - record.dueDate) / 86400000`
  - `< -7` → `upcoming`
  - `-7..0` → `due`
  - `> 0` → `overdue`
- If no record exists → `not_started` (rendered as dashed dot, grayed out)

### Dependencies
- `DataService` — for `activeChildId()` signal
- `I18nService` — for `t()` translation function
- `CommonModule`, `FormsModule`

### i18n Keys Used
- `vaccines.schedule.title`
- `vaccines.schedule.completed`
- `vaccines.schedule.upcoming`
- `vaccines.schedule.overdue`
- `vaccines.schedule.notStarted`
- `vaccines.schedule.dueSoon` (within 7 days)
- `vaccines.schedule.expandDetails`
- `vaccines.schedule.markComplete`
- `vaccines.schedule.completionDate`
- `vaccines.batchNumber`, `vaccines.injectionSite`, `vaccines.doctor`, `vaccines.notes`, `vaccines.dateGiven` — reuse from VaccinesComponent

---

## 3. `vaccine-alert-card.component.ts`

### Purpose
Individual alert card for overdue/due vaccine notifications. Appears in:
1. **VaccinesPage** — alert banner above the timeline
2. **HomePage** — via `HealthAlertCardComponent` (future integration)

### Inputs
```typescript
interface VaccineAlert {
  id: string;
  vaccineName: string;
  doseLabel: string;       // e.g. "DTaP-2 / 5"
  dueDate: string;        // ISO date string
  status: 'overdue' | 'due' | 'upcoming';
  daysOverdue?: number;   // positive integer if overdue
}
```

### @Input() binding
```typescript
@Input({ required: true }) alert!: VaccineAlert;
@Output() action = output<void>();          // CTA clicked
@Output() dismiss = output<void>();         // swipe-to-dismiss triggered
```

### Visual Design

**Card layout** (compact, single row on mobile):
```
[status dot] [syringe icon] [vaccine name + dose] [due date] [CTA button]
```

**Status-driven colors:**
| Status    | Dot        | Icon bg    | Icon color | Card border | CTA button |
|-----------|------------|------------|------------|-------------|------------|
| overdue   | pulsing red| rose-100   | rose-500   | rose-200    | rose-500   |
| due       | orange dot | orange-100 | orange-500 | orange-200  | orange-500 |
| upcoming  | teal dot   | teal-100   | teal-500   | teal-200    | teal-500   |

**Overdue pulse animation:**
```css
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(1.3); }
}
.overdue-dot { animation: pulse-dot 1.5s ease-in-out infinite; }
```

**Swipe-to-dismiss (mobile):**
- Uses `@angular/gestures` or native touch event handlers
- Threshold: 80px horizontal swipe → triggers `dismiss` output
- Visual: card slides left with opacity fade
- On desktop: show a small × dismiss button in top-right corner

### CTA Button behavior
- `overdue` → "Shëno të përfunduar" / "Mark complete" — emits `action`
- `due` → "Shëno të përfunduar" / "Mark complete" — emits `action`
- `upcoming` → "Shiko detajet" / "View details" — emits `action`

### Component State
- `swipeOffset = signal(0)` — tracks horizontal drag offset
- `isDismissing = signal(false)` — animating out

### Dependencies
- `CommonModule`
- `I18nService`

### i18n Keys
- `vaccines.alertCard.markComplete` ("Shëno të përfunduar" / "Mark complete")
- `vaccines.alertCard.viewDetails` ("Shiko detajet" / "View details")
- `vaccines.alertCard.overdue` ("e vonuar {n} ditë" / "overdue by {n} days")
- `vaccines.alertCard.dueSoon` ("për shkak sot" / "due today")
- `vaccines.alertCard.upcoming` ("në pritje" / "upcoming")

---

## 4. VaccinesComponent Integration

After Sprint 14, `VaccinesComponent` imports and uses both new components:

```typescript
import { VaccineScheduleComponent } from './vaccine-schedule.component';
import { VaccineAlertCardComponent } from './vaccine-alert-card.component';
```

### Alert Banner (replaces inline alert div)
```html
<!-- Alert Cards -->
@if (overdueAlerts().length > 0) {
  <div class="mx-4 mt-6 space-y-2">
    @for (alert of overdueAlerts(); track alert.id) {
      <app-vaccine-alert-card
        [alert]="alert"
        (action)="handleAlertAction(alert)"
        (dismiss)="dismissAlert(alert.id)"
      />
    }
  </div>
}
```

### Schedule Timeline (replaces inline timeline sections)
```html
<!-- Schedule Timeline -->
<app-vaccine-schedule
  [childId]="dataService.activeChildId()"
  [vaccineRecords]="childVaccines"
  (markComplete)="openMarkCompleteModal($event)"
/>
```

### Signals to add to VaccinesComponent
```typescript
overdueAlerts = computed(() =>
  this.overdueVaccines().map(v => ({
    id: v.id,
    vaccineName: v.vaccineName,
    doseLabel: `${v.doseNumber}/${v.totalDoses}`,
    dueDate: v.dueDate,
    status: 'overdue' as const,
    daysOverdue: Math.floor((Date.now() - new Date(v.dueDate).getTime()) / 86400000)
  }))
);

handleAlertAction(alert: VaccineAlert) {
  const record = this.vaccines().find(v => v.id === alert.id);
  if (record) this.markComplete(record, new Event('click'));
}

dismissAlert(alertId: string) {
  // Persist dismissal in localStorage
}
```

---

## 5. i18n — New Keys to Add

Add to the i18n JSON files (SQ + EN):

```json
{
  "vaccines.schedule.title": {
    "sq": "Planifikimi i Vaksinave",
    "en": "Vaccine Schedule"
  },
  "vaccines.schedule.completed": {
    "sq": "Përfunduar",
    "en": "Completed"
  },
  "vaccines.schedule.upcoming": {
    "sq": "Në pritje",
    "en": "Upcoming"
  },
  "vaccines.schedule.overdue": {
    "sq": "I vonuar",
    "en": "Overdue"
  },
  "vaccines.schedule.notStarted": {
    "sq": "I pamartur",
    "en": "Not started"
  },
  "vaccines.schedule.dueSoon": {
    "sq": "Së shpejti",
    "en": "Due soon"
  },
  "vaccines.schedule.expandDetails": {
    "sq": "Shiko detajet",
    "en": "View details"
  },
  "vaccines.schedule.markComplete": {
    "sq": "Shëno të përfunduar",
    "en": "Mark complete"
  },
  "vaccines.schedule.completionDate": {
    "sq": "Data e përfundimit",
    "en": "Completion date"
  },
  "vaccines.alertCard.markComplete": {
    "sq": "Shëno të përfunduar",
    "en": "Mark complete"
  },
  "vaccines.alertCard.viewDetails": {
    "sq": "Shiko detajet",
    "en": "View details"
  },
  "vaccines.alertCard.overdue": {
    "sq": "e vonuar {n} ditë",
    "en": "overdue by {n} days"
  },
  "vaccines.alertCard.dueSoon": {
    "sq": "për shkak sot",
    "en": "due today"
  },
  "vaccines.alertCard.upcoming": {
    "sq": "në pritje",
    "en": "upcoming"
  },
  "vaccines.alertCard.dismiss": {
    "sq": "Hiqe",
    "en": "Dismiss"
  }
}
```

---

## 6. Implementation Notes

### Mark Complete Flow (Long-press on schedule entry)
1. User long-presses vaccine entry
2. `showMarkCompleteModal.set(true)`, `pendingCompletionRecord.set(record)`
3. Date picker modal appears (defaults to today)
4. User confirms → `PATCH /vaccines/:id` with `{ status: 'completed', completedAt: date }`
5. On success: update local signal, close modal
6. On failure: show inline error toast

### Swipe-to-dismiss Implementation
- Use `rxjs` gesture handling or native `@HostListener('touchstart')` / `@HostListener('touchmove')` on the host element
- CSS transition on `transform: translateX()` for the slide animation
- Emit `dismiss` event when threshold exceeded (>80px) and touch ends

### Accessibility
- All interactive elements must have `role`, `aria-label`
- Overdue pulsing dot: `aria-label="overdue"` and `aria-live="polite"` on the section
- Swipe-to-dismiss must have a visible dismiss button for keyboard/非-touch users

---

## 7. Acceptance Criteria

1. ✅ `VaccineScheduleComponent` renders Albania standard schedule timeline for the active child
2. ✅ Timeline dots colored correctly: green (completed), teal (upcoming), red+pulse (overdue), dashed (not started)
3. ✅ Tap vaccine entry expands inline details panel (manufacturer, batch, site, doctor, notes, date)
4. ✅ Long-press triggers mark-complete date picker modal
5. ✅ `VaccineAlertCardComponent` renders with correct status-driven colors
6. ✅ Overdue cards show pulsing red dot animation
7. ✅ Swipe-to-dismiss works on mobile (threshold: 80px)
8. ✅ Desktop: dismiss button visible in card corner
9. ✅ CTA button emits `action` event with correct label based on status
10. ✅ VaccinesPage alert banner replaced with `app-vaccine-alert-card` instances
11. ✅ VaccinesPage timeline section replaced with `app-vaccine-schedule`
12. ✅ All new i18n keys are present in both SQ and EN translation files
13. ✅ New components properly import and use `CommonModule`, `FormsModule`, `I18nService`
14. ✅ No breaking changes to existing VaccinesComponent behavior

---

## 8. Out of Scope (Future Sprints)

- Backend changes for vaccine records CRUD (already covered in Sprint 9)
- Push notifications for overdue vaccines
- Vaccine reminder notifications
- Editing/deleting existing vaccine records (read-only for now)
- PDF export of vaccine schedule