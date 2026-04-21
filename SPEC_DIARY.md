# SPEC.md — Sprint 8: DiaryPage Refactor

**Version:** 1.0  
**Sprint:** 8  
**Date:** 2026-04-22  
**Status:** Ready for Executor  

---

## 1. Overview

**Goal:** Refactor `DiaryComponent` to focus purely on symptom and general activity logging. Temperature tracking has already moved to `TemperaturePageComponent` (Sprint 1). The diary must no longer contain any temperature-specific UI, data, or i18n keys.

**Scope:**
- Remove: Temperature entry type, temperature trend display, temperature-specific i18n keys
- Keep/Enhance: Symptom logging with severity, activity logging (meals, sleep, mood), notes, date/time
- Add: Quick-add emoji buttons, severity color dots, recent entries timeline view

---

## 2. Current State (Before Refactor)

The existing `DiaryComponent` (`src/app/components/diary.component.ts`) has:
- **Entry types:** `SYMPTOM`, `TEMP`, `MEDICATION`
- **Calendar view** with day cells showing entry dots
- **Symptom options:** fever, cough, vomit, diarrhea, headache, rash
- **Temperature entry:** numeric input + time (to be removed)
- **Medication entry:** name, dose, time, effectiveness (keep or move?)
- **Data source:** `dataService.illnesses()` (local signal)

**What needs to be removed:**
- `TEMP` entry type tab
- Temperature numeric input in modal
- `diary.temperature` and `diary.temperatureReading` and `diary.temperatureTime` i18n keys
- Any temperature-specific rendering in the entries list
- `medication` type from entryTypes (keep in separate future sprint — noted as out of scope)

**What needs to stay:**
- `SYMPTOM` entry type with existing symptom options
- Calendar navigation and day selection
- Entry list for selected date
- Notes field

---

## 3. New Data Model

```typescript
interface DiaryEntry {
  id: string;
  childId: string;
  type: 'symptom' | 'meal' | 'sleep' | 'mood' | 'activity';
  description: string;
  severity?: 'mild' | 'moderate' | 'severe';
  duration?: string;       // e.g. "2 hours"
  loggedAt: string;       // ISO timestamp
  notes?: string;
}
```

**Note:** `medication` is out of scope for this sprint. The medication entry type in the current component will be removed with a note that it will be revisited in a future sprint.

---

## 4. UI Design

### 4.1 Page Layout

**Structure:**
1. **Header row:** Page title ("Ditari" / "Diary") + child avatar + Add button
2. **Quick-add bar:** 4 emoji buttons (😰 🍽️ 😴 😊) — horizontal strip below header
3. **Symptom severity selector:** Visible when adding a symptom entry — colored dots (🟢 🟡 🔴)
4. **Main content (two columns on desktop, stacked on mobile):**
   - Left: Calendar (month view, entry dots)
   - Right: Entries list for selected date + Recent entries timeline
5. **Recent entries timeline:** Collapsible section showing last 5–7 entries across all types, sorted newest-first

### 4.2 Quick-Add Buttons

| Button | Emoji | Type | Action |
|--------|-------|------|--------|
| Not well | 😰 | symptom | Opens modal pre-set to symptom with "not feeling well" description |
| Ate | 🍽️ | meal | Opens modal pre-set to meal |
| Slept | 😴 | sleep | Opens modal pre-set to sleep |
| Happy | 😊 | mood | Opens modal pre-set to mood |

**Style:** Horizontal row of 4 circular buttons, 56px each, pastel backgrounds matching type color:
- 😰 — `bg-orange-50 border-orange-200`
- 🍽️ — `bg-teal-50 border-teal-200`
- 😴 — `bg-indigo-50 border-indigo-200`
- 😊 — `bg-yellow-50 border-yellow-200`

### 4.3 Severity Selector

When `type === 'symptom'`, show 3 colored dots as selectable buttons:
- 🟢 Mild — `bg-green-100 border-green-300 text-green-700`
- 🟡 Moderate — `bg-yellow-100 border-yellow-300 text-yellow-700`
- 🔴 Severe — `bg-red-100 border-red-300 text-red-700`

Selected state: filled circle with ring.

### 4.4 Entry Type Tabs (in Add Modal)

| Type | Icon | Color |
|------|------|-------|
| symptom | `sick` | orange |
| meal | `restaurant` | teal |
| sleep | `bedtime` | indigo |
| mood | `mood` | yellow |

**Removed:** TEMP and MEDICATION types (temperature → TemperaturePage; medication → future sprint)

### 4.5 Recent Entries Timeline

Below the calendar+entries two-column layout:
- Headline: " Aktiviteti i Funta" / "Recent Activity"
- Shows last 7 entries across all types
- Each entry: time + icon + description + severity badge (if symptom)
- "Shiko më shumë" / "See more" link to full history (future)

---

## 5. i18n Keys

All existing `diary.*` keys that reference temperature must be removed. New keys:

```typescript
// Section: diary
'diary.title': { sq: 'Ditari', en: 'Diary' }
'diary.subtitle': { sq: 'Regjistoni simptoma dhe aktivitete', en: 'Log symptoms and activities' }
'diary.addEntry': { sq: 'Shto Regjistrim', en: 'Add Entry' }
'diary.save': { sq: 'Ruaj', en: 'Save' }
'diary.cancel': { sq: 'Anulo', en: 'Cancel' }
'diary.delete': { sq: 'Fshij', en: 'Delete' }
'diary.noEntries': { sq: 'Nuk ka regjistrime për këtë ditë', en: 'No entries for this day' }
'diary.today': { sq: 'Sot', en: 'Today' }

// Entry types
'diary.type.symptom': { sq: 'Simptomë', en: 'Symptom' }
'diary.type.meal': { sq: 'Vakt', en: 'Meal' }
'diary.type.sleep': { sq: 'Gjumë', en: 'Sleep' }
'diary.type.mood': { sq: 'Gjendje', en: 'Mood' }
'diary.type.activity': { sq: 'Aktivitet', en: 'Activity' }

// Symptom types
'diary.symptomTypes.fever': { sq: 'Ethet', en: 'Fever' }
'diary.symptomTypes.cough': { sq: 'Kollë', en: 'Cough' }
'diary.symptomTypes.vomit': { sq: 'Të vjella', en: 'Vomit' }
'diary.symptomTypes.diarrhea': { sq: 'Diarre', en: 'Diarrhea' }
'diary.symptomTypes.headache': { sq: 'Dhimbje koke', en: 'Headache' }
'diary.symptomTypes.rash': { sq: 'ÇFARË', en: 'Rash' }
'diary.symptomTypes.soreThroat': { sq: 'Dhimbje fyti', en: 'Sore throat' }
'diary.symptomTypes.tired': { sq: 'I lodhur', en: 'Tired' }
'diary.symptomTypes.stomachache': { sq: 'Dhimbje barku', en: 'Stomach ache' }

// Severity
'diary.severity.mild': { sq: 'I lehtë', en: 'Mild' }
'diary.severity.moderate': { sq: 'Mesatar', en: 'Moderate' }
'diary.severity.severe': { sq: 'I rëndë', en: 'Severe' }
'diary.duration': { sq: 'Kohëzgjatja', en: 'Duration' }
'diary.durationPlaceholder': { sq: 'P.sh. 2 orë', en: 'e.g. 2 hours' }

// Quick add
'diary.quickAdd.notWell': { sq: 'Nuk ndihem mirë', en: 'Not well' }
'diary.quickAdd.ate': { sq: 'Hëngri', en: 'Ate' }
'diary.quickAdd.slept': { sq: 'Fjeti', en: 'Slept' }
'diary.quickAdd.happy': { sq: 'I gëzuar', en: 'Happy' }

// Description
'diary.description': { sq: 'Përshkrimi', en: 'Description' }
'diary.descriptionPlaceholder': { sq: 'Shëno detajet...', en: 'Enter details...' }
'diary.notes': { sq: 'Shënime', en: 'Notes' }

// Recent activity
'diary.recentActivity': { sq: 'Aktiviteti i Funta', en: 'Recent Activity' }
'diary.emptyState': { sq: 'Nuk ka regjistrime ende. Shtoni regjistrimin e parë!', en: 'No entries yet. Add your first entry!' }
```

**Remove these keys (temperature-specific):**
- `diary.temperature` — REMOVE
- `diary.temperatureReading` — REMOVE
- `diary.temperatureTime` — REMOVE
- `diary.medication` — REMOVE (future sprint)
- `diary.medicationName` — REMOVE
- `diary.medicationDose` — REMOVE
- `diary.medicationTime` — REMOVE
- `diary.effectiveness` — REMOVE
- `diary.effectivenessOptions.*` — REMOVE

---

## 6. Component Changes

### 6.1 DiaryComponent (Refactor)

**File:** `src/app/components/diary.component.ts`

**Changes:**
1. Remove `TEMP` and `MEDICATION` from `entryTypes` computed
2. Remove temperature-related form fields: `newTemperature`, `newTempTime`
3. Remove medication-related form fields: `newMedName`, `newMedDose`, `newMedTime`, `newMedEffect`
4. Add severity selector signals: `newSeverity = signal<'mild' | 'moderate' | 'severe'>`
5. Add quick-add signals: `quickAddType = signal<DiaryEntry['type'] | null>(null)`
6. Update `saveEntry()` to use new `DiaryEntry` model
7. Update `allEntries` computed to use new `type` field
8. Add `recentEntries` computed signal for timeline
9. Remove temperature-specific rendering from entry cards
10. Add severity dot rendering in entry cards

**Severity Dot Logic:**
```typescript
severityColor(severity?: string): string {
  switch (severity) {
    case 'mild': return 'bg-green-400';
    case 'moderate': return 'bg-yellow-400';
    case 'severe': return 'bg-red-500';
    default: return 'bg-slate-300';
  }
}
```

### 6.2 i18nService Updates

**File:** `src/app/core/i18n/i18n.service.ts`

- Remove temperature and medication keys
- Add new keys listed in Section 5

---

## 7. Backend API Contract

```
GET    /children/:childId/diary?from=&to=&limit=50
POST   /children/:childId/diary
PATCH  /children/:childId/diary/:id
DELETE /children/:childId/diary/:id

Request (POST):
{
  "type": "symptom",
  "description": "Kollë e fortë",
  "severity": "moderate",
  "duration": "2 ditë",
  "loggedAt": "2026-04-22T10:30:00.000Z",
  "notes": "Gjate nates"
}
```

**Note:** Backend `diary` endpoints already exist via the `records` or `illness` routes. The executor should verify existing endpoints support the new `DiaryEntry` model. If `type` field doesn't exist yet, it should be added to the Prisma schema.

---

## 8. File Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `src/app/components/diary.component.ts` | EDIT | Refactor: remove temp/medication, add quick-add, severity, timeline |
| `src/app/core/i18n/i18n.service.ts` | EDIT | Remove temp/med keys, add new diary keys |
| `src/app/services/data.service.ts` | CHECK | Verify `addIllness`/`getIllnesses` support new model or update |
| `backend/prisma/schema.prisma` | CHECK | Verify `ChildHealthRecord` or equivalent supports `type` field |

---

## 9. Out of Scope

- Medication tracking (future sprint)
- Push notifications
- Export/print diary
- Media attachments (photos of rash etc.)
- Sharing diary with doctor

---

## 10. Success Criteria

- [ ] Temperature entry type completely removed from DiaryComponent
- [ ] Quick-add emoji buttons (😰 🍽️ 😴 😊) functional
- [ ] Severity selector (colored dots) visible when adding symptom
- [ ] Recent entries timeline shows last 7 entries
- [ ] All strings bilingual (SQ + EN)
- [ ] No hardcoded SQ or EN text in component
- [ ] Existing symptom logging still works after refactor
- [ ] Calendar still navigable and shows entry dots