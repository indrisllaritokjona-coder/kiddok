# TEST_RESULTS_SPRINT1.md — Child Profile Edit Module Validation

**Sprint:** 1  
**Date:** 2026-04-22  
**Tester:** kiddok-tester  
**Commit:** `10acb86`

---

## Issue-by-Issue Validation

### Issue 1: birthWeight + deliveryDoctor missing from Edit Modal
**Expected:** Edit modal template has `birthWeight` and `deliveryDoctor` fields, populated on open, included in save payload  
**Actual:**
- `editBirthWeight: number | null = null` declared as signal-backed field
- `editDeliveryDoctor = ''` declared as field
- Template has both input fields with `[(ngModel)]="editBirthWeight"` and `[(ngModel)]="editDeliveryDoctor"`
- `openEditModal()` populates both from `child.birthWeight` and `child.deliveryDoctor`
- `saveEditChild()` sends `birthWeight: this.editBirthWeight ?? undefined` and `deliveryDoctor: this.editDeliveryDoctor || undefined` in the API payload

**Result:** ✅ PASS

---

### Issue 2: child.saveProfile i18n key missing
**Expected:** `child.saveProfile` key defined in i18n.service.ts  
**Actual:**
```typescript
'child.saveProfile': { sq: 'Ruaj Profilin', en: 'Save Profile' },
```
Also used in Add Child form template: `{{ i18n.t()['child.saveProfile'] }}`

**Result:** ✅ PASS

---

### Issue 3: documentIssueDate missing from Edit Modal
**Expected:** `documentIssueDate` field present in edit modal template, shown conditionally when document is attached  
**Actual:**
Template section:
```html
@if (editChildDocument()) {
  <div>
    <label class="...">{{ i18n.t()['child.documentIssueDate'] }}</label>
    <input type="date" [(ngModel)]="editChildDocumentDate" ...>
  </div>
}
```
- Field `editChildDocumentDate = ''` declared
- `openEditModal()` populates: `this.editChildDocumentDate = child.documentIssueDate || ''`
- `saveEditChild()` sends: `documentIssueDate: this.documentDirty() ? (this.editChildDocumentDate || undefined) : undefined`

**Result:** ✅ PASS

---

### Issue 4: No server-side file size limit
**Expected:** Service layer rejects base64 documents > 5MB  
**Actual:**
```typescript
const MAX_DOCUMENT_SIZE = 5 * 1024 * 1024;
if (data.medicalDocument) {
  const base64Size = data.medicalDocument.length * 0.75;
  if (base64Size > MAX_DOCUMENT_SIZE) {
    throw new BadRequestException('Dokumenti tejkalon limitin prej 5MB. / Document exceeds 5MB limit.');
  }
}
```
Applied in both `create()` and `update()` methods.

**Result:** ✅ PASS

---

### Issue 5: No backend DTO validation
**Expected:** `@UsePipes(ValidationPipe)` on PATCH endpoint  
**Actual:**
```typescript
@Post()
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
create(...)

@Patch(':id')
async update(...)  // ← NO @UsePipes decorator here
```

- `@UsePipes` is on POST only
- PATCH (`update`) has no ValidationPipe
- `UpdateChildDto` extends `PartialType(CreateChildDto)` so it has the same decorators, but they are not enforced without the pipe
- `children.service.ts` `update()` uses `data: any` — no runtime validation

**Result:** ❌ FAIL — ValidationPipe missing on PATCH handler

---

### Issue 6: IDOR check only in service layer, not controller
**Expected:** Explicit ownership check at controller level before service call  
**Actual:**
```typescript
@Get(':id')
async findOne(...) {
  const child = await this.childrenService.findOneById(id);  // no userId filter
  if (!child) throw new NotFoundException(...);
  if (child.userId !== req.user.userId) throw new ForbiddenException(...);
  return child;
}

@Patch(':id')
async update(...) {
  const child = await this.childrenService.findOneById(id);
  if (!child) throw new NotFoundException(...);
  if (child.userId !== req.user.userId) throw new ForbiddenException(...);
  return this.childrenService.update(id, req.user.userId, updateChildDto);
}
```
Controller explicitly checks `child.userId !== req.user.userId` before any service call. `findOneById()` (no userId param) separates the IDOR check from the service layer's `findOne(id, userId)`.

**Result:** ✅ PASS

---

### Issue 7: Base64 document re-sent on every PATCH save
**Expected:** `documentDirty` signal tracks whether user selected a new file; only send `medicalDocument` when `documentDirty()` is true  
**Actual:**
```typescript
documentDirty = signal(false);
originalDocument = signal<string | null>(null);

openEditModal(child: ChildProfile) {
  ...
  this.originalDocument.set(child.medicalDocument || null);
  this.documentDirty.set(false);
}

onDocumentSelected(event: Event) {
  ...
  this.documentDirty.set(true);  // ← user selected new file
  ...
}

saveEditChild() {
  this.dataService.updateChildApi(child.id, {
    ...
    medicalDocument: this.documentDirty() ? (this.editChildDocument() || undefined) : undefined,
    documentIssueDate: this.documentDirty() ? (this.editChildDocumentDate || undefined) : undefined,
  })
}
```
When no new file is selected, `documentDirty()` is false and `medicalDocument` is omitted from the payload entirely.

**Result:** ✅ PASS

---

### Issue 8: No double-submit guard on saveEditChild()
**Expected:** `saving = signal(false)` guard prevents concurrent saves  
**Actual:**
```typescript
saving = signal(false);

saveEditChild() {
  ...
  this.saving.set(true);
  this.dataService.updateChildApi(child.id, {...}).then(...).catch(...).finally(() => {
    this.saving.set(false);
  });
}
```
Template button:
```html
<button (click)="saveEditChild()" [disabled]="editNameInvalid() || saving()">
```
Button is disabled while `saving()` is true.

**Result:** ✅ PASS

---

### Issue 9: confirm() browser dialog for delete
**Expected:** Custom inline confirmation panel replacing `window.confirm()`  
**Actual:**
```typescript
showDeleteConfirm = signal(false);
```
Template shows inline panel triggered by delete button:
```html
<button (click)="showDeleteConfirm.set(true)" ...>Delete Profile</button>

@if (showDeleteConfirm()) {
  <div class="mt-4 p-5 bg-red-50 border-2 border-red-200 rounded-2xl animate-fade-in">
    <!-- Warning UI with Cancel + Confirm buttons -->
    <button (click)="showDeleteConfirm.set(false)" ...>Cancel</button>
    <button (click)="confirmDeleteChild()" ...>Delete</button>
  </div>
}
```
No `window.confirm()` call anywhere in delete flow.

**Result:** ✅ PASS

---

## Summary

| # | Issue | Status | Notes |
|---|-------|--------|-------|
| 1 | birthWeight + deliveryDoctor missing | ✅ PASS | Both fields present in template, open, save |
| 2 | child.saveProfile i18n key missing | ✅ PASS | Key defined in i18n.service.ts |
| 3 | documentIssueDate missing | ✅ PASS | Present in template with conditional render |
| 4 | No server-side file size limit | ✅ PASS | 5MB limit enforced in create() and update() |
| 5 | Backend DTO validation | ❌ FAIL | ValidationPipe on POST only; PATCH has no pipe |
| 6 | IDOR check in controller | ✅ PASS | Explicit userId check before service call |
| 7 | Base64 re-sent on PATCH | ✅ PASS | documentDirty signal gating works correctly |
| 8 | Double-submit guard | ✅ PASS | saving signal + disabled binding on button |
| 9 | confirm() dialog | ✅ PASS | Replaced with inline showDeleteConfirm panel |

**Result: 8/9 passed, 1/9 failed**

---

## Failed Issue Detail

### Issue 5: Backend DTO Validation — ValidationPipe missing on PATCH

**Problem:** `@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))` is only applied to the `create()` method. The `update()` PATCH handler has no pipe.

```typescript
@Post()
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))  // ← has pipe
create(@Body() createChildDto: CreateChildDto) { ... }

@Patch(':id')
async update(...)  // ← NO pipe
```

**Impact:**
- `CreateChildDto` has proper class-validator decorators that run on POST
- `UpdateChildDto` inherits the same decorators via `PartialType(CreateChildDto)`
- Without `ValidationPipe` on PATCH, the decorators are not enforced at runtime
- Malformed or malicious PATCH payloads bypass validation

**Fix required:** Add `@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))` above the `@Patch(':id')` decorator.

---

## New Bugs Found

None. No additional bugs discovered during validation.