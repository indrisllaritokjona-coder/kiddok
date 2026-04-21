# SPEC.md — Sprint 9: VaccinesPage Component

**Status:** Draft  
**Sprint:** 9  
**Created:** 2026-04-22  

---

## 1. Overview

**Component:** `VaccinesPageComponent` (refactor) + `VaccineScheduleComponent` (new)  
**Purpose:** Full-page vaccine management with schedule timeline, overdue alerts, and add record form.  
**Priority:** HIGH

---

## 2. Data Model

```typescript
interface VaccineAlert {
  id: string;
  childId: string;
  vaccineName: string;
  dueDate: string;           // yyyy-MM-dd
  status: 'upcoming' | 'due' | 'overdue' | 'completed';
  completedAt?: string;      // ISO timestamp
  doseNumber?: number;
  totalDoses?: number;
  reminderEnabled: boolean;
}

interface VaccineRecord {
  id: string;
  childId: string;
  vaccineName: string;
  manufacturer?: string;
  doseNumber: number;
  totalDoses: number;
  dueDate: string;
  completedAt?: string;
  administeredBy?: string;
  batchNumber?: string;
  site?: string;             // injection site
  notes?: string;
}
```

---

## 3. UI Design

### Page Layout (top → bottom)

```
┌─────────────────────────────────────┐
│  Header: "Vaksinat" title           │
│  + child selector                   │
├─────────────────────────────────────┤
│  [Alert Banner — if overdue]        │
│  Red/coral strip, pulsing dot,      │
│  "Keni {n} vaksina të vonuara"      │
│  + "Marroni tani" CTA               │
├─────────────────────────────────────┤
│  Coming Up Card                     │
│  Next 2 vaccines with dates         │
│  "Shëno si e bërë" quick action     │
├─────────────────────────────────────┤
│  Vaccination Timeline               │
│  Grouped: Overdue → Due →           │
│  Upcoming → Completed               │
│  Each node shows:                   │
│  - Status badge (color-coded)       │
│  - Vaccine name                     │
│  - Due date                         │
│  - Dose progress (2/4 doses)        │
│  - Expand for details               │
├─────────────────────────────────────┤
│  [Add Vaccine Record] button        │
│  Opens inline/modal form             │
└─────────────────────────────────────┘
```

### Alert Banner (Overdue)

- **Background:** Rose-50 (`#FFF1F2`) with Rose-600 (`#E11D48`) left border (4px)
- **Content:** Red pulsing dot + "Keni {n} vaksina të vonuara" + "Marroni tani" button
- **Pulsing dot:** 8px circle, Rose-500, keyframe animation 0%→100% opacity loop 1.5s
- **CTA button:** Rose-600 background, white text, rounded-xl

### Status Badges

| Status | Badge Style | Color |
|--------|-------------|-------|
| overdue | Rounded pill, rose-100 bg, rose-700 text + pulsing dot | `#E11D48` |
| due | Rounded pill, orange-100 bg, orange-700 text | `#F97316` |
| upcoming | Rounded pill, teal-100 bg, teal-700 text | `#14B8A6` |
| completed | Rounded pill, gray-100 bg, gray-500 text + checkmark | `#78716C` |

### Vaccine Card

```
┌──────────────────────────────────────┐
│ [Status Badge]         [Dose: 2/4]  │
│                                      │
│ Vaccine Name           Due: DD/MM   │
│  ─────────────────────────           │
│  Expand: batch, site, doctor, notes  │
└──────────────────────────────────────┘
```

- **Card style:** White bg, rounded-2xl, border stone-200, shadow-sm
- **Hover:** lift + shadow-md, 200ms ease
- **Click to expand:** shows additional record details

### Add Vaccine Record Form

**Trigger:** "Shto Vaksina" button at bottom of page  
**Style:** Slide-up modal, rounded-3xl, max-w-lg, centered overlay

**Fields:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Vaccine Name | text + autocomplete | ✓ | From standard schedule |
| Dose Number | number (1–10) | ✓ | Auto-suggested from history |
| Total Doses | number (1–10) | ✓ | Default to standard schedule |
| Date Given | date picker | ✓ | Defaults to today |
| Batch/Lot Number | text | | Optional |
| Injection Site | select (arm/thigh) | | Optional |
| Doctor/Clinic | text | | Optional |
| Notes | textarea | | Optional |

**Actions:** Cancel (ghost) + Save (indigo primary)

### Empty State

- SVG illustration (syringe/vaccine theme, warm indigo tones)
- "Nuk ka vaksina të regjistruara" / "No vaccines recorded"
- Subtext: "Shtoni vaksinat e para për të ndjekur çdo dozë"
- CTA: "Shto Vaksina"

---

## 4. Backend API

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/vaccines/child/:childId` | List all vaccine records for child |
| POST | `/api/vaccines` | Create new vaccine record |
| PATCH | `/api/vaccines/:id` | Update vaccine (status, date, notes) |
| DELETE | `/api/vaccines/:id` | Delete vaccine record |

### GET /api/vaccines/child/:childId

**Response 200:**
```json
{
  "vaccines": [
    {
      "id": "cuid",
      "childId": "cuid",
      "vaccineName": "DTaP-1",
      "manufacturer": "Infanrix",
      "doseNumber": 1,
      "totalDoses": 5,
      "dueDate": "2026-05-01",
      "completedAt": "2026-04-20T10:00:00Z",
      "administeredBy": "Dr. Gashi",
      "batchNumber": "AB1234",
      "site": "thigh",
      "notes": "",
      "reminderEnabled": true,
      "status": "completed"
    }
  ],
  "overdueCount": 1,
  "upcomingCount": 3
}
```

### POST /api/vaccines

**Request:**
```json
{
  "childId": "cuid",
  "vaccineName": "DTaP-2",
  "doseNumber": 2,
  "totalDoses": 5,
  "completedAt": "2026-04-22",
  "administeredBy": "Dr. Gashi",
  "batchNumber": "AB1235",
  "site": "thigh",
  "notes": ""
}
```

**Response 201:** Created vaccine record

### PATCH /api/vaccines/:id

**Request:**
```json
{
  "completedAt": "2026-04-22",
  "status": "completed"
}
```

---

## 5. Component Structure

```
VaccinesPageComponent/
├── VaccinesPageComponent (page shell, routing)
├── VaccineAlertBannerComponent (if overdue)
├── VaccineScheduleComponent (timeline + grouping)
│   ├── VaccineCardComponent (expandable card)
│   └── StatusBadgeComponent (color-coded badge)
├── VaccineComingUpCardComponent
└── VaccineAddFormComponent (modal form)
```

### File Locations

```
frontend/src/app/pages/vaccines/
├── vaccines-page.component.ts
├── vaccines-page.component.html
├── vaccines-page.component.scss
├── vaccine-schedule/
│   ├── vaccine-schedule.component.ts
│   ├── vaccine-schedule.component.html
│   └── vaccine-schedule.component.scss
├── vaccine-alert-banner/
│   ├── vaccine-alert-banner.component.ts
│   └── vaccine-alert-banner.component.html
├── vaccine-card/
│   ├── vaccine-card.component.ts
│   ├── vaccine-card.component.html
│   └── vaccine-card.component.scss
└── vaccine-add-form/
    ├── vaccine-add-form.component.ts
    ├── vaccine-add-form.component.html
    └── vaccine-add-form.component.scss
```

---

## 6. i18n Keys

| Key | SQ | EN |
|-----|----|----|
| `vaccines.title` | Vaksinat | Vaccines |
| `vaccines.addRecord` | Shto Vaksina | Add Vaccine |
| `vaccines.vaccineName` | Emri i Vaksines | Vaccine Name |
| `vaccines.doseNumber` | Doza nr. | Dose No. |
| `vaccines.totalDoses` | Nga gjithsej | of total |
| `vaccines.dateGiven` | Data e vendosjes | Date Given |
| `vaccines.batchNumber` | Numri i batch-it | Batch Number |
| `vaccines.injectionSite` | Vendi i injeksionit | Injection Site |
| `vaccines.doctor` | Mjeku/Dhoma | Doctor/Clinic |
| `vaccines.notes` | Shënime | Notes |
| `vaccines.status.overdue` | Vonuar | Overdue |
| `vaccines.status.due` | Për shkak | Due |
| `vaccines.status.upcoming` | Së shpejti | Upcoming |
| `vaccines.status.completed` | Përfunduar | Completed |
| `vaccines.alert.overdue` | Keni {n} vaksina të vonuara | You have {n} overdue vaccines |
| `vaccines.alert.due` | Keni {n} vaksina për shkak | You have {n} vaccines due |
| `vaccines.dosesProgress` | {done}/{total} doza | {done}/{total} doses |
| `vaccines.emptyState` | Nuk ka vaksina të regjistruara | No vaccines recorded |
| `vaccines.emptyStateHint` | Shtoni vaksinat e para për të ndjekur çdo dozë | Add your first vaccines to track every dose |
| `vaccines.markComplete` | Shëno si e bërë | Mark as done |
| `vaccines.cta.seeAll` | Shiko të gjitha | See All |
| `vaccines.comingUp` | Vaksina e ardhshme | Coming Up |
| `vaccines.expandDetails` | Shiko detajet | See Details |
| `vaccines.site.arm` | Krah | Arm |
| `vaccines.site.thigh` | Kofshë | Thigh |
| `vaccines.cancel` | Anulo | Cancel |
| `vaccines.save` | Ruaj | Save |

---

## 7. States & Interactions

### Page States

| State | Trigger | Display |
|-------|---------|---------|
| Loading | Initial load | Skeleton cards (3) with pulse animation |
| Empty | No vaccines | Empty state SVG + CTA |
| With Data | Vaccines exist | Timeline grouped by status |
| With Overdue | Any overdue | Alert banner at top |
| With Due | Any due | "Due" section highlighted |

### Interactions

1. **Tap vaccine card** → expand to show details (batch, site, doctor)
2. **Tap "Mark as done"** → quick PATCH status=completed + success toast
3. **Tap "Add Vaccine"** → slide-up modal form
4. **Tap "Marroni tani"** → scroll to overdue section
5. **Swipe card left** → delete with confirmation
6. **Pull to refresh** → refetch vaccines

### Error Handling

- API failure → show inline error toast + retry button
- Form validation → inline field errors below each input
- Network offline → banner "Jeni offline, provoni përsëri"

---

## 8. Technical Approach

### Frontend (Angular 19+)

- **Signals:** `vaccines = signal<VaccineAlert[]>([])` + `loading = signal(false)`
- **Effects:** On `childId` change → fetch vaccines
- **Services:** `VaccineService` with `getByChild()`, `create()`, `update()`
- **Routing:** `/children/:childId/vaccines`
- **Forms:** Reactive forms with autocomplete for vaccine names
- **Charts:** Not required for vaccines (timeline-based)

### Backend (NestJS + Prisma)

- **Prisma model:** `VaccineRecord` with relations to `Child`
- **DTOs:** CreateVaccineDto, UpdateVaccineDto, VaccineResponseDto
- **Controller:** `VaccinesController` with CRUD endpoints
- **Service:** `VaccinesService` with business logic

### Backend Prisma Schema

```prisma
model VaccineRecord {
  id            String    @id @default(cuid())
  childId       String
  child         Child     @relation(fields: [childId], references: [id], onDelete: Cascade)
  vaccineName   String
  manufacturer  String?
  doseNumber    Int
  totalDoses    Int
  dueDate       DateTime
  completedAt   DateTime?
  administeredBy String?
  batchNumber   String?
  site          String?
  notes         String?
  reminderEnabled Boolean @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

---

## 9. Acceptance Criteria

- [ ] Alert banner appears when overdue vaccines exist
- [ ] Alert banner pulsing dot animates continuously
- [ ] Tapping "Marroni tani" scrolls to overdue section
- [ ] Vaccine cards show correct status badge colors
- [ ] Dose progress shown as "2/4 doses" format
- [ ] Card expansion shows batch, site, doctor, notes
- [ ] "Mark as done" updates status to completed
- [ ] Add form validates required fields
- [ ] Form autocomplete suggests from standard schedule
- [ ] Empty state shows when no vaccines
- [ ] All i18n keys work in SQ and EN
- [ ] Backend stores and retrieves vaccine data correctly
- [ ] Date format respects locale (DD/MM vs MM/DD)
- [ ] Page loads in <500ms on average connection

---

## 10. Standard Vaccine Schedule (Albania — embedded reference)

Used for autocomplete suggestions:

| Age | Vaccines |
|-----|----------|
| Birth | BCG, HepB-1 |
| 2 months | DTaP-1, Hib-1, IPV-1, HepB-2, PCV-1, Rotavirus-1 |
| 4 months | DTaP-2, Hib-2, IPV-2, PCV-2, Rotavirus-2 |
| 6 months | DTaP-3, Hib-3, IPV-3, HepB-3, PCV-3 |
| 12 months | MMR-1, Varicella-1 |
| 18 months | DTaP-4, Hib-4 |
| 5–6 years | DTaP-5, IPV-4, MMR-2 |
| 11 years | Tdap, HPV |

---

*Sprint 9 — Architect: vaccine schedule spec complete*