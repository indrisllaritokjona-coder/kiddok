# SPEC — Sprint 4: Lab Results Module

**Status:** Ready for Executor  
**Architect:** kiddok-architect  
**Sprint:** 4  
**Date:** 2026-04-23

---

## 1. Overview

Lab Results is a module for tracking and viewing children's laboratory test results. It includes a list view per child, a result entry form with file attachment support, and a document viewer for PDFs and images. Results are stored with optional file attachments (e.g., scanned lab reports) as base64-encoded data.

---

## 2. Prisma Schema Changes

> ⚠️ **Schema delta required.** The existing `LabResult` model lacks `type` and `attachments` fields. Add these fields before backend work begins.

```prisma
model LabResult {
  id             String   @id @default(uuid())
  childId        String
  child          Child    @relation(fields: [childId], references: [id], onDelete: Cascade)
  testName       String   // e.g. "Gjak i plotë" / "Complete Blood Count"
  result         String   // e.g. "14.2"
  unit           String?  // e.g. "g/dL"
  referenceRange String?  // e.g. "12.0 - 16.0"
  date           DateTime
  doctor         String?
  notes          String?
  type           String?  // NEW: e.g. "hemogram", "urinalysis", "biochemistry"
  attachments    String[] // NEW: base64-encoded file data array
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}
```

Run `npx prisma migrate dev --name add_lab_result_attachments` after updating the schema.

---

## 3. Backend API Contract

### GET `/lab-results/child/:childId`
- **Auth:** Bearer JWT
- **Response:** `LabResult[]` ordered by `date` descending
```json
[
  {
    "id": "uuid",
    "childId": "uuid",
    "testName": "Gjak i plotë",
    "result": "14.2",
    "unit": "g/dL",
    "referenceRange": "12.0 - 16.0",
    "date": "2026-03-15T00:00:00.000Z",
    "doctor": "Dr. Arben Basha",
    "notes": "Të gjitha vlerat normale.",
    "type": "hemogram",
    "attachments": [],
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

### GET `/lab-results/:id`
- **Auth:** Bearer JWT
- **Response:** Single `LabResult` with full attachment data (base64 strings)
- **Error 404:** If not found or not owned by user

### POST `/lab-results/:childId`
- **Auth:** Bearer JWT
- **Body:**
```json
{
  "testName": "Gjak i plotë",
  "result": "14.2",
  "unit": "g/dL",
  "referenceRange": "12.0 - 16.0",
  "date": "2026-03-15",
  "doctor": "Dr. Arben Basha",
  "notes": "Të gjitha vlerat normale.",
  "type": "hemogram",
  "attachments": ["base64string1...", "base64string2..."]
}
```
- **File constraints:** Each attachment max **10MB**, allowed types: `application/pdf`, `image/png`, `image/jpeg`, `image/webp`
- **Response:** Created `LabResult`

### PATCH `/lab-results/:id`
- **Auth:** Bearer JWT
- **Body:** Partial update (any LabResult field)
- **Response:** Updated `LabResult`

### DELETE `/lab-results/:id`
- **Auth:** Bearer JWT
- **Response:** `204 No Content`

---

## 4. Frontend — Service Layer (DataService)

Add these methods to `DataService`:

```typescript
// Load lab results for a child
async loadLabResults(childId: string): Promise<LabResultRecord[]>

// Add new lab result (with optional attachments)
async addLabResult(childId: string, data: CreateLabResultDto): Promise<LabResultRecord>

// Update existing lab result
async updateLabResult(id: string, data: UpdateLabResultDto): Promise<LabResultRecord>

// Delete lab result
async deleteLabResult(id: string): Promise<void>

// Get single lab result (for view/edit)
async getLabResult(id: string): Promise<LabResultRecord>
```

---

## 5. Frontend — Lab Results Component

### 5.1 New Interface

```typescript
interface LabResultRecord {
  id: string;
  childId: string;
  testName: string;
  result: string;
  unit?: string;
  referenceRange?: string;
  date: string;
  doctor?: string;
  notes?: string;
  type?: string;
  attachments: string[]; // base64 strings
  createdAt: string;
}
```

### 5.2 List View

| Element | Spec |
|---------|------|
| Header | Title `labResults.title`, active child name subtitle |
| Add button | Top-right, opens add modal |
| List card | Test name (bold), result + unit, date, ref range badge, doctor |
| Attachments badge | Shows count if `attachments.length > 0` |
| Actions | "View" (opens view modal), "Delete" (confirms) |
| Empty state | Illustration + "No results yet" message |
| Loading skeleton | 3 placeholder cards while loading |

### 5.3 Add/Edit Modal

| Field | Type | Notes |
|-------|------|-------|
| `testName` | text input | Required |
| `type` | dropdown select | Optional — categories: hemogram, urinalysis, biochemistry, immunology, other |
| `result` | text input | Required |
| `unit` | text input | Optional |
| `referenceRange` | text input | Optional, placeholder: "12.0 - 16.0" |
| `date` | date input | Required, default today |
| `doctor` | text input | Optional |
| `notes` | textarea | Optional, max 500 chars |
| `attachments` | file drop zone | Optional, see §5.4 |

### 5.4 File Upload (Attachments)

**Pattern:** Same as medical document upload in child profile (file → base64).

- **Drop zone:** Dashed border, rounded-2xl, upload icon + label
- **Accepted:** `application/pdf, image/png, image/jpeg, image/webp`
- **Max size per file:** 10MB
- **Max files:** 5 per result
- **On select:** Preview card per file (name, size, remove button)
- **Storage:** Base64 strings in `attachments` field
- **Error states:**
  - File > 10MB → `labResults.fileTooBig` error
  - Wrong type → `labResults.fileTypeError` error
  - Max files reached → `labResults.maxFilesReached` error

### 5.5 View Modal

| Section | Content |
|---------|---------|
| Header | Test name + close button |
| Body | Result + unit, date, ref range, doctor, type, notes |
| Attachments | List of attachment cards — each with file name + type icon |
| Attachment actions | **"View"** — opens attachment viewer; **"Download"** — triggers download |
| Footer | Close button |

### 5.6 Attachment Viewer

Opens a modal (or fullscreen overlay) showing the attached file:

- **PDF:** Render via `<iframe src="data:application/pdf;base64,...">` or embed in browser
- **Image:** `<img src="data:image/...;base64,...">` with zoom capability
- **Fallback:** If type unsupported, show download button instead

### 5.7 Delete Confirmation

Same pattern as existing delete confirm modal (small centered card, red confirm button).

---

## 6. i18n Keys

| Key | SQ | EN |
|-----|----|----|
| `labResults.title` | Rezultatet e Laboratorit | Lab Results |
| `labResults.add` | Shto Rezultat | Add Result |
| `labResults.addFirst` | Shto rezultatin e parë | Add first result |
| `labResults.empty` | Nuk ka rezultate laboratorike | No lab results yet |
| `labResults.emptyHint` | Shtoni rezultatet e testimit për të ndjekur shëndetin | Add test results to track health |
| `labResults.testName` | Emri i Testit | Test Name |
| `labResults.testNamePlaceholder` | P.sh. Gjak i plotë | e.g. Complete Blood Count |
| `labResults.result` | Rezultati | Result |
| `labResults.unit` | Njësia | Unit |
| `labResults.referenceRange` | Vlera Referente | Reference Range |
| `labResults.date` | Data | Date |
| `labResults.doctor` | Doktori | Doctor |
| `labResults.doctorPlaceholder` | P.sh. Dr. Arben Basha | e.g. Dr. Smith |
| `labResults.notes` | Shënime | Notes |
| `labResults.notesPlaceholder` | Shëno detajet shtesë... | Add additional details... |
| `labResults.type` | Lloji i Testit | Test Type |
| `labResults.attachments` | Dokumente | Attachments |
| `labResults.view` | Shiko Detajet | View Details |
| `labResults.delete` | Fshi | Delete |
| `labResults.deleteConfirmTitle` | Fshij Rezultatin? | Delete Result? |
| `labResults.cancel` | Anulo | Cancel |
| `labResults.save` | Ruaj | Save |
| `labResults.saving` | Duke ruajtur... | Saving... |
| `labResults.close` | Mbyll | Close |
| `labResults.optional` | opsionale | optional |
| `labResults.saveError` | Ruajtja dështoi. Provo përsëri. | Save failed. Try again. |
| `labResults.fileTooBig` | Skedari tejkalon 10MB | File exceeds 10MB |
| `labResults.fileTypeError` | Lloji i skedarit nuk mbështetet. Vetëm PDF dhe imazhe. | File type not supported. PDF and images only. |
| `labResults.maxFilesReached` | Maksimumi 5 fajlla për rezultat | Maximum 5 files per result |
| `labResults.viewAttachment` | Shiko Dokumentin | View Document |
| `labResults.download` | Shkarko | Download |
| `labResults.refRange` | Ref | Ref |

### Test Type Options
| Value | SQ | EN |
|-------|----|----|
| `hemogram` | Hemogram | Hemogram |
| `urinalysis` | Analizë Urine | Urinalysis |
| `biochemistry` | Biokim i gjakut | Blood Biochemistry |
| `immunology` | Imunologji | Immunology |
| `other` | Tjetër | Other |

---

## 7. File Structure

```
src/app/
├── components/lab-results/
│   ├── lab-results.component.ts      # Extended: add/edit/view modals + file upload
│   ├── lab-results.component.html    # Extended: add form, attachment viewer
│   └── lab-results.component.scss    # Extended: attachment viewer styles

src/app/services/data.service.ts       # Add loadLabResults, addLabResult, updateLabResult, deleteLabResult, getLabResult
```

---

## 8. Execution Roadmap

| Step | File | Action |
|------|------|--------|
| 1 | `backend/prisma/schema.prisma` | Add `type` and `attachments` fields to `LabResult` model |
| 2 | Run | `npx prisma migrate dev --name add_lab_result_attachments` |
| 3 | `backend/src/lab-results/lab-result.dto.ts` | Add `type` and `attachments` fields to DTOs |
| 4 | `backend/src/lab-results/lab-results.service.ts` | Handle new fields in create/update |
| 5 | `backend/src/lab-results/lab-results.controller.ts` | Ensure routes handle new fields |
| 6 | `src/app/services/data.service.ts` | Add lab result CRUD methods with `HttpClient` |
| 7 | `src/app/components/lab-results/` | Extend component: add form modal, type field, attachment drop zone |
| 8 | `src/app/components/lab-results/` | Add attachment viewer modal (PDF/image) |
| 9 | `src/app/components/lab-results/` | Add file validation (size, type) with i18n error messages |
| 10 | `src/app/components/lab-results/` | Add attachments badge to list cards |

---

## 9. Edge Cases

| Scenario | Handling |
|----------|----------|
| No lab results for child | Show empty state illustration |
| File > 10MB | Block upload, show `labResults.fileTooBig` error |
| Unsupported file type | Block upload, show `labResults.fileTypeError` error |
| Max 5 attachments reached | Block further selection, show `labResults.maxFilesReached` |
| Attachment viewer: PDF | Render in `<iframe>` or `object` tag |
| Attachment viewer: image | Display `<img>` with lightbox zoom |
| Attachment type unknown | Hide view button, show download only |
| Network error on save | Show `labResults.saveError`, keep modal open |
| Backend returns 404 | Refresh list, show error |
| Not logged in | Redirect to /login |
| Empty result list on delete | Show empty state after last item deleted |

---

## 10. Out of Scope (Future Sprints)

- Batch upload of multiple lab result files
- Email/sMS notification of results
- Historical trend chart for recurring tests (e.g., hemoglobin over time)
- PDF generation of result report
- Printing individual result
