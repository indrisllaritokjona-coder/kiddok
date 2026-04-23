# TEST RESULTS — Medication Tracker Module

**Tester:** kiddok-tester  
**Date:** 2026-04-23  
**Project:** KidDok — `C:\Users\g_gus\Desktop\jona\kiddok`  
**Files Reviewed:**
- `SPEC_MEDICATION_TRACKER.md`
- `src/app/components/medications/medications.component.ts`
- `backend/src/medications/medications.controller.ts`
- `backend/src/medications/medications.service.ts`
- `backend/src/medications/medication.dto.ts`
- `backend/prisma/schema.prisma`
- `src/app/core/i18n/i18n.service.ts`

---

## Criterion-by-Criterion Results

| # | Criterion | Status | Notes |
|---|-----------|--------|-------|
| 1 | **Prisma schema: `MedicationDoseLog` model present** | ✅ PASS | Model confirmed in `schema.prisma` with `id`, `medicationId`, `takenAt`, `notes`, `createdAt`, `updatedAt`. Cascade delete relation on `Medication`. |
| 2 | **Backend: `POST /medications/:childId/doses`** | ✅ PASS | `MedicationsController.logDose()` → `MedicationsService.logDose()`. Validates ownership, active check, future-date rejection, returns 201 with created log. |
| 3 | **Backend: `GET /medications/:childId/doses/:medicationId`** | ✅ PASS | `MedicationsController.getDoseLogs()` → returns `{ logs: [...] }` ordered desc by `takenAt`. |
| 4 | **Backend: `GET /medications/child/:childId` (enhanced)** | ✅ PASS | `findAllByChild()` includes `doseLogs`, computes `adherencePct` per med, returns `{ medications, activeCount, archivedCount }`. |
| 5 | **Adherence calculation correct** | ✅ PASS | Formula: `min(100, round(actualDoses / expectedDoses * 100))` where `expectedDoses = daysOnTreatment * dosesPerDay`. `as_needed` → `null`. Matches spec exactly. |
| 6 | **Active / Archived tab split** | ✅ PASS | `activeTab` signal toggling between `'active'/'archived'`. `activeMeds` / `archivedMeds` computed filters on `m.active`. Tab UI with pill-style switcher confirmed. |
| 7 | **Log Dose modal with datetime picker** | ✅ PASS | `showDoseLogModal` signal opens modal. `<input type="datetime-local">` pre-filled with `new Date().toISOString().slice(0, 16)`. `Save` button triggers `saveDoseLog()`. |
| 8 | **Dose history drawer with log list** | ✅ PASS | `showHistoryDrawer` + `historyMed` signal. Drawer template iterates `historyMed()!.doseLogs` with check icon, formatted datetime, and notes. |
| 9 | **Empty states for both tabs** | ✅ PASS | `!loading() && activeTab() === 'active' && activeMeds().length === 0` → pill SVG + message. Same pattern for archived empty state. |
| 10 | **Mark-dose-taken flow from modal** | ✅ PASS | `saveDoseLog()` POSTs to `/${childId}/doses`, updates local `medications` signal by prepending new log to the med's `doseLogs` array. |
| 11 | **i18n keys all present SQ+EN** | ✅ PASS | All 24 `medTracker.*` keys found in `i18n.service.ts` with both `sq` and `en` translations. |
| 12 | **ng build clean (0 errors)** | ✅ PASS | `ng build` exited 0. Output: `dist/kiddok`. Only non-blocking budget warnings (initial bundle 879 kB vs 500 kB limit). Zero TypeScript or compile errors. |

---

## Bugs & Gaps

### 1. Missing Success Toast on Dose Log Save — MEDIUM
**Spec says:** *"Toast: 'Doza u regjistrua!' / 'Dose logged!'"* (SPEC §8 data flow)  
**Actual:** `saveDoseLog()` updates state but never calls `ToastService.show()`. Only the error path (`doseLogError.set(...)`) is wired.

**Impact:** User logs a dose and gets no positive confirmation. They must infer success from the drawer updating.

**Fix:** Inject `ToastService` and call `this.toast.show(this.i18n.t()['medTracker.doseSaved'], 'success')` after successful POST in `saveDoseLog()`.

---

### 2. "Mark as Late" Not Implemented in Dose History Drawer — MEDIUM
**Spec says:** *"Each log entry shows: 'Mark as late' option to retroactively log a missed dose (adds `notes: 'vonuar'`)"* (SPEC §3.7)  
**Actual:** Dose history drawer shows logs but has no "Mark as late" / "Shëno si vonuar" button per entry. Key `medTracker.markLate` is present in i18n but never used in template.

**Impact:** No way to mark a late dose retroactively from the UI.

**Fix:** Add a "Mark as late" text button below each log entry in the drawer that POSTs a new dose log with `notes: 'vonuar'` and `takenAt` equal to the selected log's `takenAt`.

---

### 3. Archived Medication Cards: Log Dose Button Not Disabled — LOW
**Spec says:** *"Archived medication cards have disabled Log Dose button"* (SPEC §10 acceptance criteria)  
**Actual:** Archived medications list has no "Log Dose" button at all (only an Edit button). This is a different implementation choice — it avoids the disabled-button issue entirely. Functionally compliant (archived meds cannot have doses logged via the UI).

**Verdict:** Implicitly compliant since no Log Dose button exists on archived cards.

---

### 4. "Course Completed" Badge Not Rendered on Archived Cards — LOW
**Spec says:** *"'Arkivë' / 'Archived' label replaces active badge"* (SPEC §3.5) — but the spec also defines a `medTracker.completedCourse` key.  
**Actual:** Archived cards show `medTracker.archived` ("Arkivë") label. `medTracker.completedCourse` key is present in i18n but never used.

**Impact:** Minor. The label "Arkivë" serves the same purpose functionally. `completedCourse` key is unused dead code.

---

### 5. `overallAdherence` Banner Formula Inconsistent with Spec — LOW
**Spec says:** Banner shows *"overall adherence across all active scheduled meds"* and uses a formula (SPEC §3.3 example: `"2/3 medikamente në kohë — 78%"`).  
**Actual:** `overallAdherence` computed = average of per-med adherence percentages. The spec example implies a count of on-time meds (≥80%) over total, which is a different formula (a ratio, not an average).

**Impact:** Banner percentage may not match the spec's illustrated example. Formula choice is defensible but differs from spec's implied calculation.

---

### 6. No `medTracker.doseSaved` Key Consumed in Component — MINOR
The i18n key `medTracker.doseSaved` ("Doza u regjistrua!") exists but is never called in the component. It's only used in SPEC as a success toast message. Related to Bug #1.

---

## Summary

| Category | Count |
|----------|-------|
| Criteria PASSED | 12 / 12 |
| Bugs found | 6 (1 MEDIUM, 2 LOW, 2 MINOR, 1 implicitly compliant) |
| Critical issues | 0 |
| `ng build` | ✅ Clean (exit 0, no errors) |

**Recommended priority fixes:**
1. **[MEDIUM]** Add success toast after dose log save (`ToastService`)
2. **[MEDIUM]** Implement "Mark as late" in dose history drawer
3. **[LOW]** Align `overallAdherence` banner formula with spec's implied calculation
4. **[MINOR]** `medTracker.completedCourse` key is unused; remove or wire it

**Commit:** `test: medication tracker module validation results`

---

*Validated against SPEC_MEDICATION_TRACKER.md (2026-04-23)*
