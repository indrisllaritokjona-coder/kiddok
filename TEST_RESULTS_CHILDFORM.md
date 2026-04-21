# Test Results — Add/Edit Child Modal Sprint 7

## Critical Issues (block merge)

### 🔴 BUILD FAILURE — Must Fix Before Merge

1. **`cancel` EventEmitter is named `cancelled`** (TS2339)
   - `cancelled: EventEmitter<void>` is declared as `cancelled` but the template references `cancel.emit()`
   - Occurs in template at lines 55 and 287
   - Fix: rename `@Output() cancelled` → `@Output() cancel` OR change all template references to `cancelled.emit()`
   - **This blocks the build entirely** — `npm run build` fails with 2 errors

### 🟡 Design Compliance Observations

2. **Gender label uses inline conditional instead of i18n**
   - Template uses: `{{ i18n.locale() === 'sq' ? 'Gjinia' : 'Gender' }}` (line ~120)
   - Spec requires `childForm.gender.*` i18n keys, but these keys don't exist for the label itself
   - Not a build error, but inconsistent with i18n architecture
   - Noted for awareness; acceptable as-is

---

## Validation Checklist

### 1. Design Compliance

| Check | Status | Notes |
|-------|--------|-------|
| 3-step wizard: Basics → Medical → Documents | ✅ PASS | Steps 1/2/3 rendered via `@if (currentStep() === N)` |
| Step indicator: 3 dots with pending/active/completed states | ✅ PASS | `getStepDotClass()` returns correct Tailwind classes |
| Step 1: name (alphabetic), DOB, gender segmented control | ✅ PASS | Name uses `/^[a-zA-Z\s]+$/` regex; DOB date input; gender segmented with 3 buttons |
| Step 2: collapsible medical section, bloodType, birthWeight, allergies | ✅ PASS | `toggleMedical()` with `isMedicalExpanded` signal; all 3 fields present |
| Step 3: file upload zone (drag/drop, 5MB max, base64) | ✅ PASS | `processFiles()` checks size (5MB) and type; FileReader base64 |
| Modal: backdrop blur, rounded-3xl, gradient accent bar, slide-up animation | ✅ PASS | `backdrop-blur-sm`, `rounded-3xl`, 4px gradient bar, `.animate-slide-up` CSS |

### 2. Validation

| Check | Status | Notes |
|-------|--------|-------|
| Name: alphabetic + spaces only (rejects numbers) | ✅ PASS | `validateNameOnBlur()` and `validateStep1()` both use `/^[a-zA-Z\s]+$/` |
| DOB: cannot be future date | ✅ PASS | `validateStep1()` checks `dob > today` |
| Save button disabled until Step 1 valid | ✅ PASS | Save button only renders on step 3; Step 1 `nextStep()` blocks on invalid |
| Step navigation: Back + Next buttons work | ✅ PASS | `nextStep()` validates then increments step; `prevStep()` decrements |

### 3. i18n

| Check | Status | Notes |
|-------|--------|-------|
| All user-facing strings use childForm.* i18n keys | ⚠️ PARTIAL | Gender label uses inline `i18n.locale() === 'sq' ? 'Gjinia' : 'Gender'` — not a dedicated i18n key |
| No hardcoded SQ/EN strings | ⚠️ PARTIAL | Gender label is the only hardcoded string found |

### 4. Data Flow

| Check | Status | Notes |
|-------|--------|-------|
| `mode='add'` → `createChild()` POST | ✅ PASS | `save()` calls `dataService.createChild(payload)` when `mode !== 'edit'` |
| `mode='edit'` → `updateChildApi()` PATCH with `child.id` | ✅ PASS | `save()` calls `dataService.updateChildApi(this.child.id, payload)` |
| On success: saved output emitted, modal closes | ✅ PASS | `this.saved.emit(savedChild)` then shell calls `closeModal()` |
| On error: inline error banner shown | ✅ PASS | `catch` sets `saveError` signal; template shows `@if (saveError())` banner |

### 5. Build Test

| Check | Status | Notes |
|-------|--------|-------|
| `npm run build` passes with 0 errors | ❌ FAIL | 2× TS2339: `Property 'cancel' does not exist` — `cancelled` vs `cancel` mismatch |

---

## Build Result

**FAIL** — 2 errors

```
TS2339: Property 'cancel' does not exist on type 'AddEditChildModalComponent'.
  src/app/features/child/add-edit-child-modal/add-edit-child-modal.component.ts:55:29
TS2339: Property 'cancel' does not exist on type 'AddEditChildModalComponent'.
  src/app/features/child/add-edit-child-modal/add-edit-child-modal.component.ts:287:45
```

---

## Verdict

**REQUEST CHANGES**

The build must pass before merge. The single fix required is the `cancel`/`cancelled` naming mismatch. Rename the output from `cancelled` to `cancel`, or vice-versa consistently.

**Recommended fix** (rename output to match template usage):
```typescript
// Change declaration from:
@Output() cancelled = new EventEmitter<void>();
// To:
@Output() cancel = new EventEmitter<void>();
```
Then update `onBackdropClick()` to call `this.cancel.emit()`.
