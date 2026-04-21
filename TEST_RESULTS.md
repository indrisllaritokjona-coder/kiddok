# Test Results — Child Profile Edit Module

## Issues Found

- [CRITICAL] **`birthWeight` and `deliveryDoctor` not updated from form in Edit Modal** — `shell.component.ts:saveEditChild()`. The method reads `child.birthWeight` and `child.deliveryDoctor` directly from the original child object instead of form fields. If a user edits these fields in the Edit Modal, changes are silently discarded on save. Form fields for these exist in the Add form but NOT in the Edit Modal — the Edit Modal is missing these two fields entirely.

- [CRITICAL] **`child.saveProfile` i18n key is used but not defined** — `shell.component.ts` template uses `{{ i18n.t()['child.saveProfile'] }}` for the Add Child save button, but `i18n.service.ts` only defines `child.save`. The button text will render as the literal key string "child.saveProfile" in the UI. Fix: add `'child.saveProfile'` to translations or change template to use `child.save`.

- [HIGH] **`documentIssueDate` sent as string in update, but as Date in create** — `data.service.ts:updateChildApi()` sends `documentIssueDate: data.documentIssueDate ? new Date(data.documentIssueDate) : null` for create, but `payload.documentIssueDate = data.documentIssueDate ? new Date(data.documentIssueDate) : null` is only applied in `createChild`. In `updateChildApi`, `documentIssueDate` is sent as the raw string value from the form. If the backend Prisma schema expects a Date, this will cause type inconsistency.

- [HIGH] **Edit Modal is missing `birthWeight`, `deliveryDoctor`, `documentIssueDate`, `medicalDocument` form fields** — The Add Child form has inputs for all these fields, but the Edit Child Modal template only has: name, dateOfBirth, bloodType, criticalAllergies, medicalNotes, medicalDocument (file), documentIssueDate. Fields `birthWeight` and `deliveryDoctor` are entirely absent from the edit modal template, meaning they cannot be updated.

- [MEDIUM] **`gender` field defined in interface and used in API payloads but no form input exists** — `ChildProfile` interface has `gender?: string`. `createChild` and `updateChildApi` both send `gender: data.gender ?? null`. But neither the Add form nor the Edit Modal has a gender input field. Value is always null from frontend.

- [MEDIUM] **`allergies` field in `ChildProfile` interface is orphaned** — Interface defines both `allergies?: string` and `criticalAllergies?: string`. The forms only bind to `criticalAllergies`. `createChild` sends `allergies: data.allergies ?? null` (always null). `loadChildrenFromApi` maps `c.allergies` to `child.allergies`. This field appears unused and misleading.

- [MEDIUM] **Date formatting logic does not differ by locale** — `shell.component.ts:onDateInput()` inserts slashes at positions 2 and 5 for both locales. Albanian (DD/MM/YYYY) and English (MM/DD/YYYY) produce the same output format; only the placeholder text differs. The `toIso()` method also uses the same parsing logic for both locales. Albanian users will see DD/MM/YYYY placeholder but the actual date parsed will be MM/DD.

- [MEDIUM] **Edit Modal save button has no disabled state for invalid name** — The Add Child submit button has `[disabled]="addNameInvalid() && newChildName.length > 0"`. The Edit Modal save button has no disabled binding at all. A user can click Save even when the name field shows an error state.

- [LOW] **`onBloodTypeChange()` method is defined but never called** — `shell.component.ts` defines `onBloodTypeChange()` which sets `editBloodType` to itself (a no-op). This appears to be dead code.

- [LOW] **TypeScript errors are pre-existing** (not introduced by this module): `implicit any` on `req` parameters across backend controllers, `PORT` index signature access in `main.ts`, and `TS2801` in `pin-lock.component.ts`.

---

## Validation Checks

| Feature | Status | Notes |
|---------|--------|-------|
| Name validation (regex `^[a-zA-Z\s]+$`) | PASS | Applied in `hasNameError()`, red error shown on blur/input, add button disabled when invalid |
| Blood type badge | PASS | Green `verified` badge shown when `editBloodType()` or `newChildBloodType` is set |
| Date formatting | FAIL | `onDateInput()` produces identical slash-insertion for both SQ and EN locales — only placeholder text differs |
| Document upload (5MB + PDF/image) | PASS | Size check `> 5 * 1024 * 1024` and type regex `pdf\|image//` applied in both forms |
| i18n key completeness | FAIL | `child.saveProfile` used in template but only `child.save` is defined |

---

## API Contract

| Field | Frontend (Add) | Frontend (Edit) | Backend | Match? |
|-------|---------------|-----------------|---------|--------|
| name | ✓ string | ✓ string | string | YES |
| dateOfBirth | ✓ string (ISO) | ✓ string (ISO) | Date | YES |
| gender | null (no field) | null (no field) | string? | YES (but frontend always null) |
| bloodType | ✓ string\|null | ✓ string\|null | string? | YES |
| birthWeight | ✓ number\|null | ✗ not sent (uses original) | number? | PARTIAL |
| deliveryDoctor | ✓ string\|null | ✗ not in form (not sent) | string? | PARTIAL |
| criticalAllergies | ✓ string\|null | ✓ string\|null | string? | YES |
| allergies | null (no field) | null (no field) | string? | YES (but frontend always null) |
| medicalNotes | ✓ string\|null | ✓ string\|null | string? | YES |
| medicalDocument | ✓ base64\|null | ✓ base64\|null | string? | YES |
| documentIssueDate | Date (create) / string (edit) | string | Date? | INCONSISTENT |
| avatarUrl | generated | not sent | string? | YES (generated server-side) |

---

## Type Check

```
backend/src/auth/auth.controller.ts(37,14): error TS7006: Parameter 'req' implicitly has an 'any' type.
backend/src/children/children.controller.ts(11,10): error TS7006: Parameter 'req' implicitly has an 'any' type.
backend/src/children/children.controller.ts(16,11): error TS7006: Parameter 'req' implicitly has an 'any' type.
backend/src/children/children.controller.ts(21,11): error TS7006: Parameter 'req' implicitly has an 'any' type.
backend/src/children/children.controller.ts(26,10): error TS7006: Parameter 'req' implicitly has an 'any' type.
backend/src/children/children.controller.ts(31,10): error TS7006: Parameter 'req' implicitly has an 'any' type.
backend/src/health-records/health-records.controller.ts(...): error TS7006: Parameter 'req' implicitly has an 'any' type.
backend/src/vaccines/vaccines.controller.ts(...): error TS7006: Parameter 'req' implicitly has an 'any' type.
backend/src/main.ts(14,32): error TS4111: Property 'PORT' comes from an index signature, so it must be accessed with ['PORT'].
src/app/components/pin-lock.component.ts(481,11): error TS2801: This condition will always return true since this 'Promise<boolean>' is always defined.
```
**Note:** These errors are pre-existing and not introduced by the Child Profile Edit module. 0 errors specifically in shell.component.ts, data.service.ts, or i18n.service.ts.

---

## Build Check

```
X [ERROR] TS2801: This condition will always return true since this 'Promise<boolean>' is always defined. [plugin angular-compiler]
src/app/components/pin-lock.component.ts(481,11)
```
**Note:** Pre-existing build failure in `pin-lock.component.ts`, unrelated to the Child Profile Edit module. The build fails before reaching this module's code.

---

## Recommendations

1. **[CRITICAL] Add missing form fields to Edit Modal** — Add `birthWeight`, `deliveryDoctor`, and `documentIssueDate` inputs to the Edit Modal template (currently only `birthWeight` and `deliveryDoctor` are absent; `documentIssueDate` conditionally shows but has no `[(ngModel)]` binding).

2. **[CRITICAL] Fix `child.saveProfile` i18n key** — Either add `'child.saveProfile': { sq: '...', en: '...' }` to `translations` in `i18n.service.ts`, or change the template to use the existing `child.save` key.

3. **[HIGH] Fix `documentIssueDate` type in `updateChildApi`** — Apply `new Date(data.documentIssueDate)` conversion consistently with `createChild`:
   ```typescript
   if (data.documentIssueDate !== undefined) {
     payload.documentIssueDate = data.documentIssueDate ? new Date(data.documentIssueDate) : null;
   }
   ```

4. **[HIGH] Fix date formatting by locale** — `onDateInput()` and `toIso()` need to produce DD/MM/YYYY for Albanian and MM/DD/YYYY for English. Currently both produce the same output.

5. **[MEDIUM] Add disabled state to Edit Modal save button** — Add `[disabled]="editNameInvalid()"` to the save button in the Edit Modal template.

6. **[MEDIUM] Clean up orphaned `allergies` field** — Either add a form field for `allergies` or remove it from `ChildProfile` interface and stop sending it in payloads.

7. **[LOW] Remove dead `onBloodTypeChange()` method** — or wire it to the select's `(change)` event if reactive update is needed.

8. **[LOW] Add `gender` input to forms** — If gender is needed, add a field to both Add and Edit forms. Otherwise remove from API payloads.
