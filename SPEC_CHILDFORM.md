# SPEC — Sprint 7: Add/Edit Child Modal

**Status:** Ready for Executor  
**Architect:** kiddok-architect  
**Sprint:** 7  
**Date:** 2026-04-22

---

## 1. Overview

A multi-step form modal for adding or editing a child profile in KidDok. The modal is triggered by the floating `+` button (mobile) or "Add New Member" in the child switcher dropdown. It uses a stepped wizard approach to break data entry into digestible stages, reducing cognitive load for the user.

---

## 2. Visual & Interaction Specification

### 2.1 Modal Container

| Property | Value |
|----------|-------|
| Position | Centered overlay |
| Max width | `max-w-lg` (512px) |
| Border radius | `rounded-3xl` (32px) |
| Background | `#FFFFFF` (Pure White) |
| Box shadow | `0 32px 80px -12px rgba(0,0,0,0.25)` |
| Backdrop | `bg-black/30` with `backdrop-blur-sm` |
| Top accent bar | 4px gradient bar (Primary #6366F1 → Teal #14B8A6) |
| Animation | Slide up 350ms `cubic-bezier(0.16, 1, 0.3, 1)` |
| Padding | 24px |

### 2.2 Progress Indicator

- 3 horizontal dots at the top of the modal
- **Pending:** `w-3 h-3 rounded-full bg-stone-200`
- **Active:** `w-3 h-3 rounded-full bg-primary-500` (filled indigo)
- **Completed:** `w-3 h-3 rounded-full bg-teal-500` with checkmark icon

### 2.3 Step Labels

| Step | Label Key | Content |
|------|-----------|---------|
| 1 | `childForm.step1.basics` | Basics |
| 2 | `childForm.step2.medical` | Medical |
| 3 | `childForm.step3.documents` | Documents |

### 2.4 Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Modal title | Inter | 20px | 700 |
| Step label | Inter | 12px | 600 |
| Field label | Inter | 12px | 600 |
| Input text | Inter | 16px | 400 |
| Button text | Inter | 16px | 600 |
| Error message | Inter | 12px | 400 |

### 2.5 Buttons

| Button | Style |
|--------|-------|
| Close (×) | Top-right, `w-9 h-9`, gray-100 bg, hover gray-200 |
| Back | Ghost button, `text-stone-600 hover:text-stone-900` |
| Next / Save | Full-width gradient (`bg-primary-500` → `bg-primary-600`), white text, rounded-2xl, disabled: `opacity-50 cursor-not-allowed` |
| Cancel | Ghost, bottom-left, `text-stone-500` |

---

## 3. Step-by-Step Specification

### Step 1 — Basics (Required Fields)

**Layout:** Vertical stack, 24px gap

#### Field: `name`
- Label: `childForm.name.label` ("Emri" / "Name")
- Placeholder: `childForm.name.placeholder` ("Fëmija's name" / "Child's name")
- Type: text input
- Validation:
  - Required (error: `childForm.name.error`)
  - Alphabetic + spaces only — regex: `/^[a-zA-Z\s]+$/`
  - Validated on blur
- Error: Inline below input, rose color (`#E11D48`)

#### Field: `dateOfBirth`
- Label: `childForm.dob.label` ("Data e lindjes" / "Date of Birth")
- Type: date input
- Format: DD/MM/YYYY (SQ locale) or MM/DD/YYYY (EN locale) — use i18n locale
- Validation:
  - Required (error: `childForm.dob.error`)
  - Cannot be in the future
  - Cannot be more than 18 years ago
- UI: Native date picker, styled with Tailwind

#### Field: `gender`
- Label: "Gjinia" / "Gender"
- Type: Segmented control (3 equal-width buttons in a pill container)
- Options:
  - `male` → `childForm.gender.male` ("Mashkull" / "Male")
  - `female` → `childForm.gender.female` ("Femër" / "Female")
  - `other` → `childForm.gender.other` ("Tjetër" / "Other")
- Default: none selected
- Selected state: `bg-primary-500 text-white`
- Unselected state: `bg-stone-100 text-stone-700`

### Step 2 — Medical (Optional, Collapsible)

- Collapsed by default (shows "Optional — tap to expand")
- Expanded: shows 3 fields
- Toggle: clicking the section header expands/collapses with smooth height animation (200ms ease)

#### Field: `bloodType`
- Label: `childForm.bloodType` ("Grupi i gjakut" / "Blood Type")
- Type: dropdown select
- Options: `A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`, `O+`, `O-`
- Default: empty (no selection)

#### Field: `birthWeight`
- Label: `childForm.birthWeight` ("Pesha e lindjes (kg)" / "Birth Weight (kg)")
- Type: number input
- Placeholder: "e.g. 3.2"
- Step: 0.1, min: 0.5, max: 8
- Unit displayed: "kg" suffix inside input

#### Field: `allergies`
- Label: `childForm.allergies` ("Alergji" / "Allergies")
- Type: textarea
- Placeholder: "List any allergies..." / "Shënoni alergjitë..."
- Rows: 3
- Max length: 500 characters

### Step 3 — Documents (Optional)

- Section title: `childForm.step3.documents`
- Subtitle hint: `childForm.uploadHint` ("PDF ose imazhe, maks 5MB" / "PDF or images, max 5MB")

#### File Upload
- Drop zone: dashed border (`border-2 border-dashed border-stone-300`), rounded-2xl, centered content
- Icon: upload cloud icon (Material Symbols)
- Text: `childForm.uploadDocument` ("Ngarko Dokument Mjekësor" / "Upload Medical Document")
- Accepted types: `application/pdf, image/png, image/jpeg, image/webp`
- Max size: 5MB per file
- Multiple: allowed (max 3 files)
- On file select:
  - Preview: file name + file size + remove (×) button
  - Files stored as base64 strings in component state
  - Remove button: `text-rose-500 hover:text-rose-700`
- On error: inline error message below drop zone

---

## 4. Navigation & Flow

```
Step 1 ──[Next]──→ Step 2 ──[Next]──→ Step 3 ──[Save]──→ Success
         ↑                  │
         └────────[Back]───┘
         [Cancel] at any step → dismiss modal
```

- **Back button:** Visible on steps 2 and 3
- **Next button:** Visible on steps 1 and 2, disabled until current step validates
- **Save button:** Visible only on step 3, disabled until required fields (step 1) valid
- **Cancel link:** Always visible, bottom-left

### Edit Mode
- Pre-populate all fields from the child profile being edited
- Title: `childForm.titleEdit` ("Redakto Profilin" / "Edit Profile")
- On save: call `updateChild(id, data)` instead of `addChild`

### Add Mode
- Title: `childForm.titleAdd` ("Shto Pjestar" / "Add Member")
- On save: call `addChild(data)`

---

## 5. Data Model

### ChildProfile Interface (extends existing)

```typescript
interface ChildProfile {
  id?: string;
  name: string;
  dateOfBirth: string;       // yyyy-MM-dd
  gender: 'male' | 'female' | 'other';
  bloodType?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  birthWeight?: number;      // kg
  allergies?: string;
  documents?: ChildDocument[];
  avatarSeed?: string;       // for DiceBear avatar generation
  createdAt?: string;
  updatedAt?: string;
}

interface ChildDocument {
  id: string;
  name: string;
  size: number;             // bytes
  type: string;              // MIME type
  data: string;              // base64 encoded
  uploadedAt: string;
}
```

---

## 6. Component API

### AddEditChildModalComponent

```typescript
// Inputs
@Input() mode: 'add' | 'edit' = 'add';
@Input() child?: ChildProfile;  // required in edit mode

// Outputs
@Output() saved: EventEmitter<ChildProfile>;   // emit on successful save
@Output() cancelled: EventEmitter<void>;        // emit on cancel/backdrop click

// Internal state
currentStep: 1 | 2 | 3 = 1;
isMedicalExpanded: boolean = false;
formData: Partial<ChildProfile> = {};
uploadedFiles: { name: string; size: number; type: string; data: string }[] = [];
validationErrors: Record<string, string> = {};
isSaving: boolean = false;
saveError: string | null = null;
```

### Methods
- `nextStep()` — validate current step, advance
- `prevStep()` — go back
- `toggleMedical()` — expand/collapse medical section
- `validateStep1()` — validate name (alphabetic), DOB (not future, not >18y), gender (required)
- `validateStep2()` — validate optional fields (birthWeight range)
- `validateStep3()` — validate file sizes
- `onFileSelected(event)` — read file, base64 encode, add to uploadedFiles
- `removeFile(index)` — remove file from uploadedFiles
- `save()` — call DataService.addChild or updateChild, handle success/error

---

## 7. i18n Keys

| Key | SQ | EN |
|-----|----|----|
| `childForm.titleAdd` | Shto Pjestar | Add Member |
| `childForm.titleEdit` | Redakto Profilin | Edit Profile |
| `childForm.step1.basics` | Bazat | Basics |
| `childForm.step2.medical` | Mjekësore | Medical |
| `childForm.step3.documents` | Dokumente | Documents |
| `childForm.name.label` | Emri | Name |
| `childForm.name.placeholder` | Emri i fëmijës | Child's name |
| `childForm.name.error` | Emri duhet të përmbajë vetëm shkronja | Name must contain only letters |
| `childForm.dob.label` | Data e lindjes | Date of Birth |
| `childForm.dob.error` | Data e lindjes është e detyrueshme | Date of birth is required |
| `childForm.dob.futureError` | Data e lindjes nuk mund të jetë në të ardhmen | Date of birth cannot be in the future |
| `childForm.gender.male` | Mashkull | Male |
| `childForm.gender.female` | Femër | Female |
| `childForm.gender.other` | Tjetër | Other |
| `childForm.bloodType` | Grupi i gjakut | Blood Type |
| `childForm.birthWeight` | Pesha e lindjes (kg) | Birth Weight (kg) |
| `childForm.allergies` | Alergji | Allergies |
| `childForm.allergies.placeholder` | Shëno alergjitë... | List any allergies... |
| `childForm.next` | Vazhdo | Next |
| `childForm.back` | Mbrapa | Back |
| `childForm.save` | Ruaj | Save |
| `childForm.cancel` | Anulo | Cancel |
| `childForm.uploadDocument` | Ngarko Dokument Mjekësor | Upload Medical Document |
| `childForm.uploadHint` | PDF ose imazhe, maks 5MB | PDF or images, max 5MB |
| `childForm.success` | Profili u ruajt me sukses! | Profile saved successfully! |
| `childForm.error` | Diçka shkoi keq. Provo përsëri. | Something went wrong. Please try again. |
| `childForm.fileTooBig` | Skedari tejkalon 5MB | File exceeds 5MB |
| `childForm.fileTypeError` | Lloji i skedarit nuk mbështetet | File type not supported |
| `childForm.optional` | Opsionale | Optional |

---

## 8. Technical Notes

### File Upload (Base64)
- Use `FileReader` API to read files as base64
- Store in component state (not yet persisted until Save is clicked)
- Max 3 files, each max 5MB
- Clean up base64 data on cancel

### Validation Timing
- Step 1 required fields validated on Next click (not on blur for DOB, on blur for name)
- Step 2 and 3 validated only on Save click
- Real-time error clearing: once error shown, clear when user starts typing

### Animations
- Step transitions: cross-fade (opacity 0→1, 200ms)
- Medical collapse: `max-height` transition, 200ms ease
- File add/remove: fade in/out, 150ms
- Modal entry: slide up 350ms `cubic-bezier(0.16, 1, 0.3, 1)`

### Accessibility
- Focus trap inside modal
- `aria-modal="true"`, `role="dialog"`
- Step dots: `aria-label="Step X of 3"`
- Escape key: closes modal (with confirmation if data entered)
- Form fields: proper `<label>` associations

---

## 9. File Structure

```
src/app/features/child/
├── add-edit-child-modal/
│   ├── add-edit-child-modal.component.ts    # Standalone component
│   ├── add-edit-child-modal.component.html  # Template
│   ├── add-edit-child-modal.component.scss  # Component styles
│   └── add-edit-child-modal.component.spec.ts  # Unit tests
```

---

## 10. Dependencies & Integration

- **DataService**: `addChild(data)` → `POST /children`, `updateChild(id, data)` → `PATCH /children/:id`
- **I18nService**: Already in use — add new keys to existing translation files
- **Tailwind CSS**: Already configured — use existing utility classes
- **Existing modal pattern**: Follow same pattern as existing modals in the codebase

---

## 11. Out of Scope (Future Sprints)

- Editing/deleting individual uploaded documents after save
- Document preview (PDF viewer or image lightbox)
- Multiple child profiles in a single batch operation
