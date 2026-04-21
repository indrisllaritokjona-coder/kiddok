# KidDok — Child Profile Edit Module: Technical Specification
**Architect:** The Architect  
**Date:** 2026-04-21  
**Status:** Draft → For Executor

---

## 1. Module Architecture

```
ShellComponent (shell.component.ts)
  └── Edit Child Modal (inline in shell, signalkezur)
        ├── Form Fields (Template-driven or Reactive)
        ├── NameValidatorDirective (alphabetic only)
        ├── BloodTypeBadgeComponent (green check overlay)
        └── DocumentUploadComponent (file → base64)

DataService (data.service.ts)
  ├── loadChildren()       → GET /children
  ├── saveChild(child)     → PATCH /children/:id
  └── createChild(child)   → POST /children

HttpClient via authInterceptor
  └── Bearer token attached automatically
```

---

## 2. Component Breakdown

### 2.1 Edit Modal Fields

| Field | Type | Validation | Error State |
|-------|------|------------|-------------|
| `name` | text input | `^[a-zA-Z\s]+$` max 50 chars | red border + error text |
| `dateOfBirth` | text (DD/MM/YYYY) | valid date, not future | red border + error |
| `gender` | select | optional | — |
| `bloodType` | select | A+/A-/B+/B-/AB+/AB-/O+/O- | green badge on select |
| `birthWeight` | number | 0.1–20.0 kg | red border if out of range |
| `deliveryDoctor` | text | optional, max 100 chars | — |
| `criticalAllergies` | textarea | optional, max 500 chars | — |
| `medicalNotes` | textarea | optional, max 1000 chars | — |
| `medicalDocument` | file input | PDF/image ≤5MB | red error if too large |
| `documentIssueDate` | date input | optional | — |

---

## 3. Service Layer Changes (DataService)

### 3.1 New Methods

```typescript
// Load all children from backend
async loadChildren(): Promise<void>

// Save existing child (PATCH)
async updateChild(child: ChildProfile): Promise<ChildProfile>

// Create new child (POST)
async createChild(child: Partial<ChildProfile>): Promise<ChildProfile>

// Upload medical document → returns base64 string
async uploadDocument(file: File): Promise<string>
```

### 3.2 Storage Strategy
- **Primary:** PostgreSQL via REST API
- **Fallback:** localStorage still used for offline-cached children list
- **Auth token:** stored in `kiddok_access_token` (from dev-login flow)

---

## 4. API Contract

### GET /children
- **Auth:** Bearer JWT
- **Response:** `Child[]`
```json
[
  {
    "id": "uuid",
    "name": "Ian Guska",
    "dateOfBirth": "2022-03-15T00:00:00.000Z",
    "gender": "M",
    "bloodType": "O+",
    "birthWeight": 3.4,
    "deliveryDoctor": "Dr. Smith",
    "criticalAllergies": null,
    "medicalDocument": null,
    "documentIssueDate": null,
    "medicalNotes": null,
    "userId": "uuid",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

### PATCH /children/:id
- **Auth:** Bearer JWT
- **Body:** Partial Child (omit id, userId, createdAt)
- **Response:** Updated `Child`

### POST /children
- **Auth:** Bearer JWT
- **Body:** Same as PATCH but `id` generated server-side
- **Response:** Created `Child`

---

## 5. Execution Roadmap

| Step | File | Action |
|------|------|--------|
| 1 | `src/app/services/data.service.ts` | Add `loadChildren()`, `updateChild()`, `createChild()` methods using `HttpClient` |
| 2 | `src/environments/environment.ts` | Confirm `apiUrl: 'http://localhost:3000'` |
| 3 | `src/app/core/interceptors/auth.interceptor.ts` | Ensure Bearer token from `kiddok_access_token` is attached to all non-auth requests |
| 4 | `src/app/components/shell.component.ts` | Add/edit modal with all form fields |
| 5 | `src/app/components/shell.component.ts` | Implement `saveEditChild()` calling `DataService.updateChild()` |
| 6 | `src/app/components/shell.component.ts` | Implement `submitNewChild()` calling `DataService.createChild()` |
| 7 | `src/app/components/shell.component.ts` | On init, call `DataService.loadChildren()` to hydrate from DB |
| 8 | `src/app/components/shell.component.ts` | Add name validation directive or regex check with red error display |
| 9 | `src/app/components/shell.component.ts` | Add blood type visual badge (green checkmark) on valid selection |
| 10 | `src/app/components/shell.component.ts` | Add medical document file input with base64 conversion |

---

## 6. Name Validation Rules

- **Regex:** `/^[a-zA-Z\s]+$/` (letters and spaces only)
- **Max length:** 50 characters
- **Trigger:** on `input` event + on `blur`
- **Error message:** "Emri mund të përmbajë vetëm shkronja." (SQ) / "Name can only contain letters." (EN)
- **Visual:** `border-red-500` + red error text below input

---

## 7. Edge Cases

| Scenario | Handling |
|----------|----------|
| Name contains numbers (`Ian2`) | Red border, block submit |
| Name contains symbols (`Ian!`) | Red border, block submit |
| Date in future | Red border, block submit |
| Document > 5MB | Show error, block upload |
| Document not PDF/image | Show error "Only PDF or image files allowed" |
| Empty required fields on submit | Highlight all empty required fields |
| Network error on save | Show toast error "Ruajtja dështoi. Provo përsëri." |
| No token (not logged in) | Redirect to /login |
| Backend returns 404 for child | Show error, refresh child list |
