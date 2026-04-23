# Sprint 3 — Appointment Manager Module

## Overview

Complete the `AppointmentsComponent` so it is production-ready: overdue highlighting, split upcoming/past sections with per-section empty states, and full bilingual i18n support. Backend already exists — this sprint focuses exclusively on the frontend UI/UX.

**Working directory:** `C:\Users\g_gus\Desktop\jona\kiddok`
**Files changed:** `src/app/components/appointments/appointments.component.ts`, `src/app/core/i18n/i18n.service.ts`
**Backend:** reuse existing endpoints — no new endpoints needed.

---

## 1. Appointment Model

```typescript
interface AppointmentRecord {
  id: string;
  childId: string;
  title: string;
  doctorName?: string;
  location?: string;
  dateTime: string;        // ISO 8601
  notes?: string;
  createdAt: string;       // ISO 8601
}
```

### Overdue Definition
An appointment is **overdue** when `dateTime` is in the past (before now) **and** `dateTime < today 00:00:00`.

An appointment is **past-but-not-overdue** when `today 00:00:00 <= dateTime < now` (today but already passed).

### Sections
| Section | Condition |
|---------|-----------|
| Overdue | `dateTime < today 00:00:00` |
| Today | `today 00:00:00 <= dateTime < now` |
| Upcoming | `dateTime >= now` |

---

## 2. UI Structure

```
AppointmentsComponent
├── Header
│   ├── Page title ("Terminet" / "Appointments")
│   └── Child name (active child)
│   └── [Add Appointment] FAB
├── Overdue Summary Banner
│   └── Red alert card with overdue count
├── Overdue Section
│   ├── Section header ("Vonuar" / "Overdue") — only shown if count > 0
│   └── Appointment cards (red left border + red badge)
│   └── Empty state (per-section, no divider needed)
├── Today Section
│   ├── Section header ("Sot" / "Today") — only shown if count > 0
│   └── Appointment cards (amber left border)
│   └── Empty state
├── Upcoming Section
│   ├── Section header ("të ardhshme" / "Upcoming") + count
│   └── Appointment cards (teal left border)
│   └── Empty state — "Shtoni terminin e parë" CTA
└── [Add/Edit Modal] — shared for add and edit
```

**Section header style:** small uppercase label, text-xs font-bold text-slate-400, tracking-wider, with count badge.

**Section order in UI:** Overdue → Today → Upcoming.

---

## 3. Appointment Card

### Overdue Card (red)
```
┌──────────────────────────────────────────────────────────┐
│ ▌ [calendar]  Appointment Title        [Vonuar] badge   │
│             clock icon · date time                      │
│             stethoscope · doctor name                   │
│             map-pin · location                         │
│ ────────────────────────────────────────────────────── │
│ [Redakto]  [Fshi]                                       │
└──────────────────────────────────────────────────────────┘
```
- Left border: 4px solid `red-400`
- Card bg: `bg-red-50/30`
- Badge: `bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-1 rounded-full`
- Icon bg: `bg-red-100`, icon color: `text-red-500`
- Card wrapper: `border border-red-200`

### Today Card (amber)
- Left border: 4px solid `amber-400`
- Card bg: `bg-amber-50/30`
- Icon bg: `bg-amber-100`, icon color: `text-amber-500`
- Badge: `bg-amber-100 text-amber-700`

### Upcoming Card (teal)
- Left border: 4px solid `teal-400`
- Card bg: `bg-teal-50/30`
- Icon bg: `bg-teal-100`, icon color: `text-teal-500`
- Badge: `bg-teal-100 text-teal-700`

### Past-but-today (passed)
- Left border: 4px solid `slate-300`
- Card bg: `bg-slate-50`
- Icon bg: `bg-slate-100`, icon color: `text-slate-400`
- No badge, no highlight

### Shared card elements
- Doctor + location rows: only shown if field is non-empty
- Notes: collapsible or shown below info rows, `text-xs bg-slate-50 rounded-xl p-3`
- Actions: `[Redakto]` and `[Fshi]` buttons (split 50/50, full-width row)

---

## 4. Add/Edit Modal

Same modal for both add and edit (title switches based on `editingAppt`).

### Fields (in order)
| Field | Type | Required | Placeholder SQ | Placeholder EN |
|-------|------|----------|----------------|----------------|
| Title | text | yes | `P.sh. Kontrollë e përgjithshme` | `e.g. Annual checkup` |
| Date & Time | datetime-local | yes | — | — |
| Doctor | text | no | `P.sh. Dr. Elena Hoxha` | `e.g. Dr. John Smith` |
| Location | text | no | `P.sh. Qendra Shëndetësore Nr. 3` | `e.g. Health Center No. 3` |
| Notes | textarea | no | `Shëno detajet shtesë...` | `Enter additional details...` |

### Validation
- Title required, trim non-empty
- DateTime required
- Save button disabled if title or dateTime empty
- Error display: `p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold`

### Footer buttons
- Cancel (secondary, full-width)
- Ruaj / Save (primary, full-width)
- Loading state: spinner + `Duke ruajtur...` / `Saving...`

---

## 5. Delete Confirmation Modal

```
┌─────────────────────────────────────────┐
│  [trash icon]                           │
│  Fshij Terminin?                        │
│  "appointment title here"              │
│  [Anulo]  [Fshi / Delete]               │
└─────────────────────────────────────────┘
```
- Overlay: `bg-black/40 backdrop-blur-sm`
- Icon: red circle with trash icon
- Overlay click closes modal

---

## 6. Loading Skeleton

3 skeleton cards while `loading()` is true:
- `bg-white rounded-2xl p-5 border border-gray-100 animate-pulse`
- Each card: 12×12 rounded-xl grey block + two text lines

---

## 7. i18n Keys (all required in `i18n.service.ts`)

| Key | SQ | EN |
|-----|----|----|
| `appointments.title` | Terminet | Appointments |
| `appointments.add` | Shto Termin | Add Appointment |
| `appointments.addFirst` | Shto terminin e parë | Add first appointment |
| `appointments.empty` | Nuk ka termine | No appointments |
| `appointments.emptyHint` | Shtoni terminin e parë për ta ndjekur | Add your first appointment to track visits |
| `appointments.section.overdue` | Vonuar | Overdue |
| `appointments.section.today` | Sot | Today |
| `appointments.section.upcoming` | të ardhshme | Upcoming |
| `appointments.section.past` | Të kaluara | Past |
| `appointments.overdueCount` | {n} termin i vonuar | {n} appointment overdue |
| `appointments.overdueCountPlural` | {n} termine të vonuara | {n} appointments overdue |
| `appointments.upcomingCount` | {n} termn i ardhshëm | {n} upcoming appointment |
| `appointments.upcomingCountPlural` | {n} termine të ardhshme | {n} upcoming appointments |
| `appointments.upcomingLabel` | termine të ardhshme | upcoming appointments |
| `appointments.upcomingDesc` | Në 30 ditët e ardhshme | In the next 30 days |
| `appointments.upcoming` | Së shpejti | Upcoming |
| `appointments.edit` | Redakto | Edit |
| `appointments.delete` | Fshi | Delete |
| `appointments.cancel` | Anulo | Cancel |
| `appointments.save` | Ruaj | Save |
| `appointments.saving` | Duke ruajtur... | Saving... |
| `appointments.saveError` | Ruajtja dështoi. Provo përsëri. | Save failed. Please try again. |
| `appointments.editAppt` | Redakto Terminin | Edit Appointment |
| `appointments.addAppt` | Shto Termin | Add Appointment |
| `appointments.deleteConfirmTitle` | Fshij Terminin? | Delete Appointment? |
| `appointments.titleLabel` | Titulli | Title |
| `appointments.titlePlaceholder` | P.sh. Kontrollë e përgjithshme | e.g. Annual checkup |
| `appointments.dateTime` | Data dhe Ora | Date & Time |
| `appointments.doctor` | Doktori | Doctor |
| `appointments.doctorPlaceholder` | P.sh. Dr. Elena Hoxha | e.g. Dr. John Smith |
| `appointments.location` | Vendi | Location |
| `appointments.locationPlaceholder` | P.sh. Qendra Shëndetësore Nr. 3 | e.g. Health Center No. 3 |
| `appointments.notes` | Shënime | Notes |
| `appointments.notesPlaceholder` | Shëno detajet shtesë... | Enter additional details... |
| `appointments.optional` | opsionale | optional |
| `appointments.required` | e detyrueshme | required |
| `appointments.overdue` | Vonuar | Overdue |
| `appointments.today` | Sot | Today |

---

## 8. Computed Signals

```typescript
// Now = new Date() at signal read time, no caching needed
isOverdue(appt: AppointmentRecord): boolean {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const apptDate = new Date(appt.dateTime);
  return apptDate < today;
}

isToday(appt: AppointmentRecord): boolean {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const apptDate = new Date(appt.dateTime);
  return apptDate >= todayStart && apptDate < now;
}

overdueCount = computed(() => this.appointments().filter(a => this.isOverdue(a)).length);
todayCount = computed(() => this.appointments().filter(a => this.isToday(a)).length);
upcomingCount = computed(() => this.appointments().filter(a => !this.isOverdue(a) && !this.isToday(a)).length);
upcomingIn30 = computed(() => /* only used in header banner */ ...);

overdueAppts = computed(() => this.appointments().filter(a => this.isOverdue(a)));
todayAppts = computed(() => this.appointments().filter(a => this.isToday(a)));
upcomingAppts = computed(() => this.appointments().filter(a => !this.isOverdue(a) && !this.isToday(a)).sort(...));
```

---

## 9. API Calls (reuse existing)

| Action | Method | URL |
|--------|--------|-----|
| List | GET | `/appointments/child/:childId` |
| Create | POST | `/appointments/:childId` |
| Update | PATCH | `/appointments/:id` |
| Delete | DELETE | `/appointments/:id` |

All calls require `Authorization: Bearer <token>` header.

---

## 10. Edge Cases

1. **Overdue appointments**: Show red banner at top with count, cards have red left border and badge
2. **Past appointments (today but already passed)**: Amber border, no badge, treated as "Today" section
3. **Empty state (no appointments at all)**: Full-page centered illustration + "Shtoni terminin e parë" CTA
4. **Empty section**: Don't show section header when count is 0 — just omit the whole section
5. **Single appointment**: Still show in correct section, all interactions work
6. **Modal close on backdrop click**: Closes modal, no save
7. **Delete confirmation cancel**: Closes modal, no action
8. **Save failure**: Show error inline in modal, keep form data, keep modal open
9. **Offline**: Let fetch fail silently, no toast required (existing pattern)
10. **Long title**: `truncate` with CSS, full title in tooltip via `title` attribute

---

## 11. Acceptance Criteria

- [ ] Overdue appointments (past date, before today) display with red card border + red badge
- [ ] Today appointments (today but already passed) display with amber card border
- [ ] Upcoming appointments display with teal card border
- [ ] Overdue section header shown only when overdue count > 0
- [ ] Today section header shown only when today count > 0
- [ ] Overdue count banner appears at top of page
- [ ] Empty state shows illustration + "Shtoni terminin e parë" CTA (no sections shown)
- [ ] Add modal opens blank, title is "Shto Termin" / "Add Appointment"
- [ ] Edit modal pre-fills all fields, title is "Redakto Terminin" / "Edit Appointment"
- [ ] Delete confirmation modal shows appointment title
- [ ] Loading skeleton shows 3 cards while fetching
- [ ] All i18n keys exist for both SQ and EN
- [ ] `isOverdue`, `isToday`, `upcomingAppts` computed signals work correctly
- [ ] Cards sorted ascending by `dateTime` within each section
- [ ] No TypeScript errors, no console errors on load
