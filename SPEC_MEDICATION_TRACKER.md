# SPEC.md — Sprint 2: Medication Tracker Module

**Architect:** Architect  
**Date:** 2026-04-23  
**Status:** Draft → For Executor  
**Module:** Medication Dose Tracking + Adherence  
**Context:** KidDok bilingual SQ/EN, Angular + NestJS + Prisma + Postgres

---

## 1. Overview

**Purpose:** Track medication doses for a child with quick-add dose logging, adherence tracking (% doses taken on schedule), and visual active vs archived medication list.

**Scope additions over existing medications component:**
- New `MedicationDoseLog` table: log each individual dose with timestamp + notes
- Adherence % display per medication (scheduled vs taken)
- "Log dose" quick-action on each active medication card
- Segregated view: Active medications vs Archived (completed courses)
- New backend endpoints for dose logging
- i18n keys for all new labels

---

## 2. Data Model

### 2.1 New Prisma Table: `MedicationDoseLog`

```prisma
model MedicationDoseLog {
  id            String      @id @default(uuid())
  medicationId  String
  medication    Medication  @relation(fields: [medicationId], references: [id], onDelete: Cascade)
  takenAt       DateTime    @default(now())  // exact time dose was taken
  notes         String?                     // optional, e.g. "with food", "refused"
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
}
```

### 2.2 Medication Model (existing, no changes needed)

```prisma
model Medication {
  id           String   @id @default(uuid())
  childId      String
  child        Child    @relation(fields: [childId], references: [id], onDelete: Cascade)
  name         String
  dosage       String
  frequency    String                  // 'once_daily' | 'twice_daily' | 'three_times_daily' | 'every_8_hours' | 'as_needed'
  startDate    DateTime
  endDate      DateTime?
  prescribedBy  String?
  notes        String?
  active       Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  doseLogs     MedicationDoseLog[]
}
```

### 2.3 Frontend Types

```typescript
interface MedicationDoseLog {
  id: string;
  medicationId: string;
  takenAt: string;        // ISO timestamp
  notes?: string;
  createdAt: string;
}

interface MedicationWithAdherence extends MedicationRecord {
  doseLogs: MedicationDoseLog[];
  adherencePct: number;   // 0–100
}
```

### 2.4 Adherence Calculation

For scheduled medications (not `as_needed`):

```
daysOnTreatment = min(today, endDate ?? today) - startDate + 1
expectedDoses  = daysOnTreatment * dosesPerDay(frequency)
actualDoses    = doseLogs.length
adherencePct   = min(100, round(actualDoses / expectedDoses * 100))
```

For `as_needed` medications, adherence is always shown as `null` (not applicable).

---

## 3. UI Design

### 3.1 Page Layout

```
┌─────────────────────────────────────────┐
│  Header: "Medikamentet" + child name   │
│  [Adherence summary banner]             │
├─────────────────────────────────────────┤
│  [Active] [Archived]  ← tab switcher   │
├─────────────────────────────────────────┤
│  Medication Card #1                    │
│  ┌────────────────────────────────────┐│
│  │ [Pill icon] Med Name   [Adherence%] ││
│  │ Dosage — frequency                 ││
│  │ Duration bar (start → end/ongoing)││
│  │ ─────────────────────────────────── ││
│  │ [🕐 Log Dose +] [View History]     ││
│  │ Recent dose: 2h ago                ││
│  └────────────────────────────────────┘│
│  Medication Card #2...                 │
└─────────────────────────────────────────┘
```

### 3.2 Tab Switcher

- **"Aktiv" / "Active"** — shows medications where `active === true`
- **"Arkivë" / "Archived"** — shows medications where `active === false`

### 3.3 Adherence Summary Banner

Shown below header when there are active scheduled medications:

```
┌─────────────────────────────────────────┐
│  📊 2/3 medikamente në kohë — 78%       │
│  adherence overall (SQ)                │
└─────────────────────────────────────────┘
```

- Background: `emerald-50` / `emerald-100` border
- Shows overall adherence across all active scheduled meds

### 3.4 Medication Card (Active)

- **Top row:** Pill icon + name + adherence %
  - `adherencePct >= 80` → green badge `emerald-100 / emerald-700`
  - `50 ≤ pct < 80` → orange badge `amber-100 / amber-700`
  - `pct < 50` → red badge `rose-100 / rose-700`
  - `null` (as-needed) → gray badge `gray-100 / gray-500`
- **Middle:** dosage, frequency, date range
- **Dose log section:**
  - "Log Dose" primary button (indigo)
  - "View History" text link
  - Most recent dose timestamp + notes preview (if any)
- **Adherence bar:** thin colored progress bar (4px tall) below card

### 3.5 Medication Card (Archived)

- Same layout as active card but:
  - All buttons disabled (grayed out)
  - Shows final adherence % badge
  - "Arkivë" / "Archived" label replaces active badge

### 3.6 Log Dose Modal (Quick Add)

Triggered by tapping "Log Dose" on a card.

```
┌──────────────────────────────────────┐
│  "Regjistro Dozën" / "Log Dose"       │
│  [Medication name + dosage shown]    │
│                                      │
│  Data/Ora: [datetime picker]         │
│  ← defaults to now                   │
│                                      │
│  Shënime: [optional textarea]        │
│                                      │
│  [Anulo]          [Ruaj ✓]           │
└──────────────────────────────────────┘
```

### 3.7 Dose History Drawer

Triggered by "View History" text link. Slides up from bottom.

```
┌──────────────────────────────────────┐
│  "Historia e Dozave" / "Dose History"│
│  ─────────────────────────────────── │
│  ● 22 Apr 2026 — 08:00  ✓            │
│  "Me ushqim"                         │
│  ─────────────────────────────────── │
│  ● 21 Apr 2026 — 08:05  ✓            │
│  ─────────────────────────────────── │
│  ● 20 Apr 2026 — 08:00  ✓            │
│  [Shëno si vonuar / Mark as late]   │
└──────────────────────────────────────┘
```

Each log entry shows:
- Date + time
- Optional notes
- Green checkmark (taken on time)
- "Mark as late" option to retroactively log a missed dose (adds `notes: "vonuar"`)

### 3.8 Empty States

- **No active meds:** pill icon SVG + "Nuk ka medikamente aktive" / "No active medications"
- **No archived meds:** "Nuk ka medikamente të arkivuar" / "No archived medications"
- **No dose history:** "Ende nuk ka doza të regjistruara" / "No doses logged yet"

---

## 4. Backend API

### 4.1 New Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/medications/:childId/doses` | Log a dose for a medication |
| GET | `/medications/:childId/doses/:medicationId` | Get all dose logs for one medication |
| GET | `/medications/:childId` | List all medications + dose logs + adherence (combined) |

### 4.2 POST `/medications/:childId/doses`

**Request:**
```json
{
  "medicationId": "cuid",
  "takenAt": "2026-04-23T08:00:00Z",
  "notes": "Me ushqim"
}
```

**Response 201:**
```json
{
  "id": "cuid",
  "medicationId": "cuid",
  "takenAt": "2026-04-23T08:00:00Z",
  "notes": "Me ushqim",
  "createdAt": "2026-04-23T08:01:00Z"
}
```

**Validation:**
- `medicationId` must belong to the `childId`
- User must own the child
- `takenAt` cannot be in the future

### 4.3 GET `/medications/:childId/doses/:medicationId`

**Response 200:**
```json
{
  "logs": [
    {
      "id": "cuid",
      "medicationId": "cuid",
      "takenAt": "2026-04-23T08:00:00Z",
      "notes": "Me ushqim",
      "createdAt": "2026-04-23T08:01:00Z"
    }
  ]
}
```

### 4.4 GET `/medications/:childId` (enhanced)

**Response 200:**
```json
{
  "medications": [
    {
      "id": "cuid",
      "childId": "cuid",
      "name": "Amoxicillin",
      "dosage": "250mg",
      "frequency": "three_times_daily",
      "startDate": "2026-04-21T00:00:00Z",
      "endDate": "2026-04-28T00:00:00Z",
      "prescribedBy": "Dr. Hoxha",
      "notes": null,
      "active": true,
      "createdAt": "...",
      "updatedAt": "...",
      "doseLogs": [...],
      "adherencePct": 78
    },
    {
      "name": "Nurofen",
      "dosage": "5ml",
      "frequency": "as_needed",
      "active": true,
      "doseLogs": [...],
      "adherencePct": null
    }
  ],
  "activeCount": 1,
  "archivedCount": 0
}
```

---

## 5. Component Breakdown

```
MedicationTrackerPageComponent/
├── MedicationTrackerPageComponent    (page shell, tab state, routing)
├── MedicationListComponent           (renders active or archived cards)
│   └── MedicationCardComponent      (card per medication + adherence bar)
│       └── DoseLogModalComponent     (quick-add dose form)
│       └── DoseHistoryDrawerComponent (bottom drawer)
├── MedicationAdherenceBannerComponent (summary banner)
└── EmptyStateComponent              (no medications)
```

### File Locations

```
frontend/src/app/pages/medications/
├── medication-tracker-page.component.ts
├── medication-tracker-page.component.html
├── medication-tracker-page.component.scss
├── medication-adherence-banner/
│   ├── medication-adherence-banner.component.ts
│   └── medication-adherence-banner.component.html
├── dose-log-modal/
│   ├── dose-log-modal.component.ts
│   └── dose-log-modal.component.html
└── dose-history-drawer/
    ├── dose-history-drawer.component.ts
    └── dose-history-drawer.component.html

backend/src/medications/
├── medications.controller.ts          ← add dose endpoints
├── medications.service.ts            ← add dose log methods
├── medication.dto.ts                 ← add DoseLogDto, DoseLogQueryDto
└── prisma/schema.prisma              ← add MedicationDoseLog model
```

---

## 6. i18n Keys

| Key | SQ | EN |
|-----|----|----|
| `medTracker.title` | Medikamentet | Medications |
| `medTracker.activeTab` | Aktiv | Active |
| `medTracker.archivedTab` | Arkivë | Archived |
| `medTracker.logDose` | Regjistro Dozën | Log Dose |
| `medTracker.viewHistory` | Shiko Historikun | View History |
| `medTracker.adherence` | Përputhshmëria | Adherence |
| `medTracker.adherenceOverall` | {pct}% përputhshmëri gjithsej | {pct}% overall adherence |
| `medTracker.adherenceLabel` | {n} medikamente në kohë | {n} medications on time |
| `medTracker.doseHistory` | Historia e Dozave | Dose History |
| `medTracker.doseTakenAt` | Data dhe Ora | Date & Time |
| `medTracker.doseNotes` | Shënime | Notes |
| `medTracker.doseNotesPlaceholder` | Opsionale, p.sh. "me ushqim" | Optional, e.g. "with food" |
| `medTracker.recentDose` | Doza e fundit: {time} | Last dose: {time} |
| `medTracker.noDoses` | Ende nuk ka doza të regjistruara | No doses logged yet |
| `medTracker.markLate` | Shëno si vonuar | Mark as late |
| `medTracker.completedCourse` | Kurs i përfunduar | Course completed |
| `medTracker.noActiveMeds` | Nuk ka medikamente aktive | No active medications |
| `medTracker.noArchivedMeds` | Nuk ka medikamente të arkivuar | No archived medications |
| `medTracker.doseSaved` | Doza u regjistrua! | Dose logged! |
| `medTracker.doseSaveError` | Ruajtja dështoi. Provo përsëri. | Save failed. Please try again. |
| `medTracker.cancel` | Anulo | Cancel |
| `medTracker.save` | Ruaj | Save |
| `medTracker.asNeeded` | Sipas nevojës | As needed |
| `medTracker.archived` | Arkivë | Archived |
| `medTracker.lastDoseAgo` | Doza e fundit: {n} {unit} më parë | Last dose: {n} {unit} ago |
| `medTracker.minutesAgo` | minuta | minutes |
| `medTracker.hoursAgo` | orë | hours |
| `medTracker.daysAgo` | ditë | days |

---

## 7. Edge Cases

| Scenario | Handling |
|----------|----------|
| `as_needed` medication | Adherence shows `—` (N/A), no adherence bar |
| Medication end date passed but `active=true` | Treat as completed → show banner suggesting archive |
| Future `takenAt` timestamp | Reject with 400 "Data nuk mund të jetë në të ardhmen" |
| Duplicate dose log (same minute) | Allow (child might refuse + re-take) |
| Dose logged for archived medication | Reject with 400 "Medikamenti është i arkivuar" |
| No dose logs at all | Show "Ende nuk ka doza" with Log Dose CTA |
| `endDate` is null (ongoing) | Adherence calculation uses today as end |
| Network error on dose log | Toast error + retry button in modal |
| Very long medication name | Truncate with ellipsis in card title |
| All medications archived | Show empty state for active tab + archived tab hint |

---

## 8. Data Flow

```
User taps "Log Dose"
    ↓
DoseLogModal opens with default takenAt = now
    ↓
User confirms → POST /medications/:childId/doses
    ↓
Backend validates + writes MedicationDoseLog row
    ↓
Returns created log entry
    ↓
Frontend updates medication card:
  - doseLogs signal updated
  - adherencePct recalculated
  - "Last dose: X min ago" refreshed
    ↓
Toast: "Doza u regjistrua!" / "Dose logged!"
```

**For GET /medications/:childId:**
```
Frontend calls GET /medications/:childId on load
    ↓
Backend fetches all medications for child + all doseLogs
    ↓
Calculates adherencePct per medication (service layer)
    ↓
Returns medications[] + activeCount + archivedCount
    ↓
Frontend hydrates signals → renders list
```

---

## 9. Execution Roadmap

| Step | File | Action |
|------|------|--------|
| 1 | `backend/prisma/schema.prisma` | Add `MedicationDoseLog` model + `doseLogs` relation on `Medication` |
| 2 | `backend/prisma/schema.prisma` | Run `npx prisma migrate dev` or `npx prisma db push` |
| 3 | `backend/src/medications/medication.dto.ts` | Add `CreateDoseLogDto` (medicationId, takenAt, notes) + `DoseLogQueryDto` |
| 4 | `backend/src/medications/medications.service.ts` | Add `logDose()`, `getDoseLogs()`, `getMedicationsWithAdherence()` methods |
| 5 | `backend/src/medications/medications.controller.ts` | Add `POST /:childId/doses`, `GET /:childId/doses/:medicationId`, enhance `GET /:childId` |
| 6 | `backend/src/medications/medications.module.ts` | Ensure Prisma service imported (already there) |
| 7 | `frontend/src/app/pages/medications/` | Create directory structure for new components |
| 8 | `frontend/src/app/pages/medications/medication-tracker-page.component.ts` | Page shell: tab switcher, signals, load medications |
| 9 | `frontend/src/app/pages/medications/dose-log-modal/` | DoseLogModalComponent: datetime picker + notes |
| 10 | `frontend/src/app/pages/medications/dose-history-drawer/` | DoseHistoryDrawerComponent: bottom drawer with log list |
| 11 | `frontend/src/app/pages/medications/medication-card/` | MedicationCardComponent: card with adherence bar + Log Dose button |
| 12 | `frontend/src/app/pages/medications/medication-adherence-banner/` | Banner showing overall adherence |
| 13 | `frontend/src/app/pages/medications/medication-tracker-page.component.html` | Compose all sub-components |
| 14 | `frontend/src/app/core/i18n/i18n.service.ts` | Add all new i18n keys from §6 |
| 15 | `frontend/src/app/app.routes.ts` | Add route `/children/:childId/medications` |

---

## 10. Acceptance Criteria

- [ ] New `MedicationDoseLog` table created via Prisma migration
- [ ] `POST /medications/:childId/doses` creates dose log entry, returns 201
- [ ] `GET /medications/:childId` returns medications with doseLogs array and adherencePct
- [ ] Adherence % calculated correctly for scheduled meds, null for as-needed
- [ ] Active / Archived tab switcher works
- [ ] "Log Dose" modal opens with current timestamp pre-filled
- [ ] Dose history drawer shows all logs for a medication, most recent first
- [ ] "Mark as late" retroactively logs with notes indicating late
- [ ] Adherence summary banner shows overall % across active scheduled meds
- [ ] Empty states shown correctly for no active / no archived meds
- [ ] All new i18n keys work in SQ and EN
- [ ] Refusing/failed dose logging shows error toast with retry
- [ ] Archived medication cards have disabled Log Dose button
- [ ] Adherence bar color reflects status (green/amber/red)
