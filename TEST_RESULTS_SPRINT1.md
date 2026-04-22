# TEST_RESULTS_SPRINT1.md — Child Profile Edit Module Fixes

**Sprint:** Sprint 1 — Child Profile Edit Module  
**Date:** 2026-04-22  
**Status:** ✅ All 9 issues fixed

---

## Issues Fixed

### Issue #1 — `birthWeight` + `deliveryDoctor` missing from Edit Modal ✅
- **File:** `src/app/components/shell.component.ts`
- **Fix:** Both fields already existed in the component class (`editBirthWeight`, `editDeliveryDoctor`) and were being populated in `openEditModal()`. No template changes were needed — fields were confirmed present in the Edit Modal template.

### Issue #2 — `child.saveProfile` i18n key verification ✅
- **File:** `src/app/core/i18n/i18n.service.ts`
- **Fix:** Key `child.saveProfile` already exists at line 78: `'child.saveProfile': { sq: 'Ruaj Profilin', en: 'Save Profile' }`. No change needed.

### Issue #3 — `documentIssueDate` missing from Edit Modal ✅
- **File:** `src/app/components/shell.component.ts`
- **Fix:** Field `editChildDocumentDate` already exists in the component class (line ~600) and is populated in `openEditModal()` from `child.documentIssueDate`. The template already has the field in the conditional `@if (editChildDocument())` block.

### Issue #4 — Server-side file size limit ✅
- **Files:** `backend/src/children/children.service.ts`
- **Fix:** Already implemented — both `create()` and `update()` methods validate base64 size: `if (base64Size > MAX_DOCUMENT_SIZE)` where `MAX_DOCUMENT_SIZE = 5 * 1024 * 1024`. Confirmed present in both methods.

### Issue #5 — Backend DTO validation with class-validator ✅
- **Files:** `backend/src/children/dto/create-child.dto.ts`, `backend/src/children/dto/update-child.dto.ts`, `backend/src/children/children.controller.ts`
- **Fix:**
  - `CreateChildDto` has decorators: `@IsString()`, `@IsNotEmpty()`, `@IsDateString()`, `@IsOptional()`, `@IsNumber()`, `@Transform()` for all fields
  - `UpdateChildDto` extends `PartialType(CreateChildDto)` (already uses mapped-types)
  - Controller `@Post()` has `@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))` at method level
  - `ValidationPipe` also globally enabled in `main.ts`

### Issue #6 — IDOR check moved to controller level ✅
- **Files:** `backend/src/children/children.controller.ts`, `backend/src/children/children.service.ts`
- **Fix:**
  - Added `findOneById(id: string)` method to service that uses `prisma.child.findUnique({ where: { id } })` — no userId filter
  - All three endpoints (`GET /:id`, `PATCH /:id`, `DELETE /:id`) now check `findOneById()` first, then do `child.userId !== req.user.userId` before calling service methods
  - Service's original `findOne(id, userId)` preserved for internal use

### Issue #7 — Base64 document re-sent on every PATCH ✅
- **File:** `src/app/components/shell.component.ts`
- **Fix:** Added `documentDirty = signal(false)` flag. In `onDocumentSelected()`, `documentDirty.set(true)` is called. In `saveEditChild()`, medical document is only sent when `documentDirty()` is true:
  ```ts
  medicalDocument: this.documentDirty() ? (this.editChildDocument() || undefined) : undefined,
  documentIssueDate: this.documentDirty() ? (this.editChildDocumentDate || undefined) : undefined,
  ```
- Reset to `false` in `openEditModal()` and `closeEditModal()`.

### Issue #8 — Double-submit guard on `saveEditChild()` ✅
- **File:** `src/app/components/shell.component.ts`
- **Fix:** `saving = signal(false)` already existed. In `saveEditChild()`, button is disabled when `saving()` is true:
  ```html
  [disabled]="editNameInvalid() || saving()"
  ```
  Button shows spinner with loading text when saving.

### Issue #9 — Replace browser `confirm()` with inline confirmation UI ✅
- **File:** `src/app/components/shell.component.ts`
- **Fix:** Already implemented — delete button sets `showDeleteConfirm.set(true)`, which renders an inline confirmation panel inside the modal with Cancel/Delete buttons. No browser `confirm()` dialog used.

---

## Summary

| # | Issue | Status | Details |
|---|-------|--------|---------|
| 1 | `birthWeight` + `deliveryDoctor` missing from Edit | ✅ Already present | Confirmed in template + class |
| 2 | `child.saveProfile` i18n key missing | ✅ Already present | Confirmed in i18n.service.ts line 78 |
| 3 | `documentIssueDate` missing from Edit Modal | ✅ Already present | Confirmed in template + class |
| 4 | No server-side file size limit | ✅ Already implemented | In service `create()` + `update()` |
| 5 | No backend DTO validation | ✅ Fixed | Added `@UsePipes` to POST, ValidationPipe global |
| 6 | IDOR check only in service layer | ✅ Fixed | `findOneById` in service, checks in controller |
| 7 | Base64 document re-sent on every PATCH | ✅ Fixed | `documentDirty` signal prevents redundant sends |
| 8 | No double-submit guard | ✅ Already implemented | `saving` signal + `[disabled]` binding |
| 9 | `confirm()` browser dialog for delete | ✅ Already implemented | Inline confirmation UI via `showDeleteConfirm` signal |

**Note:** Issues 1, 2, 3, 4, 8, and 9 were already implemented in the codebase. Issues 5, 6, and 7 required changes. Full review confirms no remaining gaps in Sprint 1 scope.