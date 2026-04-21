# SPEC.md — SettingsPage Component (Sprint 10)

## 1. Overview

**Component:** `SettingsPageComponent`  
**Type:** Minor Refactor (REDESIGN_PLAN.md §3.1)  
**Route:** `/settings` (existing route)  
**Standalone:** Yes  
**i18n:** Albanian (SQ) + English (EN)

**Goal:** Refactor the existing settings page to use signal-based state, restore parent profile editing, language toggle, children management, data export/clear, and the about section — all with proper i18n and consistent design language.

---

## 2. File Structure

```
src/app/components/settings/
  settings-page.component.ts    ← Standalone component (TS + template inline)
```

Reuses:
- `I18nService` — locale + translations
- `DataService` — `parentProfile` signal, children list, API calls

---

## 3. Visual Design

### 3.1 Layout

- **Container:** `max-w-2xl mx-auto px-4 py-6 space-y-6`
- **Cards:** White rounded-2xl surface, 24px padding, subtle shadow
- **Colors:** Follow REDESIGN_PLAN.md palette
  - Primary: `indigo-500 (#6366F1)`
  - Danger: `rose-500 (#E11D48)`
  - Success flash: `teal-500`
- **Typography:** Inter, following §1.3 of REDESIGN_PLAN
- **Border radius:** `rounded-2xl` (cards), `rounded-xl` (inputs/buttons)

### 3.2 Section Cards

Each settings section is a white card with:
- Left 4px accent bar (indigo gradient for profile; teal for data management; gray for about)
- Section title in card heading style
- Content below

---

## 4. Features & Interactions

### 4.1 Parent Profile Section

**UI:**
- Card with indigo accent bar
- Title: `settings.parentProfile` (e.g., "Profili i Prindit")
- Fields (stacked, `space-y-4`):
  1. **Name** — `<input>`, placeholder: `settings.name`
  2. **Surname** — `<input>`, placeholder: `settings.surname`
  3. **Phone** — `<input type="tel">`, placeholder: `settings.phone`
- Save button: full-width, `bg-indigo-500 text-white`, hover `bg-indigo-600`
- Disabled until at least one field has changed

**Behavior:**
- On load: populate fields from `DataService.parentProfile()`
- On Save: `PATCH /api/parent` with `{ name, surname, phone }`
- Success: show inline success message (`settings.saved`) with teal flash, auto-dismiss after 3s
- Error: show error toast

**Signals:**
```typescript
parentForm = signal({ name: '', surname: '', phone: '' });
saveSuccess = signal(false);
isSaving = signal(false);
```

### 4.2 Language Toggle Section

**UI:**
- Toggle container: centered, large pill-style toggle
- Two options side-by-side:
  - "Shqip" — left side
  - "English" — right side
- Active language: filled background (`bg-indigo-500`), white text
- Inactive: transparent with text-`stone-500`
- Checkmark icon (`✓`) next to active language

**Behavior:**
- On click: call `i18nService.toggleLocale()`
- No API call needed — locale persisted in localStorage by I18nService
- Instant UI update (signal-driven)

**Template:**
```html
<div class="flex items-center justify-center gap-0 rounded-full bg-stone-100 p-1">
  <button (click)="i18nService.setLocale('sq')" [class]="activeClass('sq')">
    ✓ Shqip
  </button>
  <button (click)="i18nService.setLocale('en')" [class]="activeClass('en')">
    ✓ English
  </button>
</div>
```

### 4.3 Children Management Section

**UI:**
- Card with teal accent bar
- Title: `settings.children`
- List: `ngFor` over `DataService.children()`
  - Each row: avatar (DiceBear) + name + actions
  - Edit button: pencil icon → calls `openEditChild.emit(child)`
  - Delete button: trash icon → opens confirmation
- Add Child button: full-width outline button

**Behavior:**
- Edit: emits event `openEditChild` with child profile — parent opens `AddEditChildModalComponent`
- Delete: shows inline confirm (no modal), calls `DataService.deleteChild(id)`
- Add Child: emits `openAddChild` event

### 4.4 Data Management Section

**UI:**
- Card with stone border
- Title: `settings.data.title`
- Actions (stacked `space-y-3`):
  1. **Export Data** — outline button with download icon
  2. **Clear All Data** — danger button (rose-500 text, rose-50 bg), requires confirm

**Export Data:**
- Collects all data: children list, all temperature/growth/vaccine/diary entries per child
- Creates JSON blob
- Triggers browser download: `kiddok-export-YYYY-MM-DD.json`

**Clear All Data:**
- Shows inline confirmation dialog (not a modal — inline inside the card)
- Confirm text: "settings.data.clearConfirm" (e.g., "Are you sure? This cannot be undone.")
- Confirm + Cancel buttons
- On confirm: calls `DataService.clearAllData()` then reload

### 4.5 About Section

**UI:**
- Card with stone border (muted)
- Centered content
- App logo: large "KidDok" text with logo mark
- Tagline: `settings.about.tagline` → "Mirësevini në KidDok v1.0"
- Version: `settings.about.version` → "Version 1.0.0"
- Small footer text: copyright line

---

## 5. i18n Keys

| Key | SQ | EN |
|-----|----|----|
| `settings.title` | Konfigurime | Settings |
| `settings.parentProfile` | Profili i Prindit | Parent Profile |
| `settings.name` | Emri | First Name |
| `settings.surname` | Mbiemri | Surname |
| `settings.phone` | Numri i Telefonit | Phone Number |
| `settings.saveChanges` | Ruaj Ndryshimet | Save Changes |
| `settings.saved` | Të dhënat u ruajtën! | Changes saved! |
| `settings.language` | Gjuha | Language |
| `settings.language.sq` | Shqip | Albanian |
| `settings.language.en` | English | English |
| `settings.children` | Fëmijët | Children |
| `settings.children.edit` | Redakto | Edit |
| `settings.children.delete` | Fshi | Delete |
| `settings.children.add` | Shto Fëmijë | Add Child |
| `settings.children.confirmDelete` | Dëshironi ta fshini këtë profil? | Delete this profile? |
| `settings.data.title` | Menaxhimi i të Dhënave | Data Management |
| `settings.data.export` | Shkarko Të Dhënat | Export Data |
| `settings.data.clear` | Fshi Të Dhënat | Clear All Data |
| `settings.data.clearConfirm` | Jeni i sigurt? Ky veprim nuk mund të zhbëhet. | Are you sure? This cannot be undone. |
| `settings.about.tagline` | Mirësevini në KidDok v1.0 | Welcome to KidDok v1.0 |
| `settings.about.version` | Versioni 1.0.0 | Version 1.0.0 |

---

## 6. Component Interface

```typescript
@Component({ selector: 'app-settings', standalone: true, ... })
export class SettingsPageComponent {
  i18n = inject(I18nService);
  dataService = inject(DataService);

  parentForm = signal({ name: '', surname: '', phone: '' });
  saveSuccess = signal(false);
  isSaving = signal(false);
  showClearConfirm = signal(false);
  showDeleteConfirmId = signal<string | null>(null);

  // Computed
  hasChanges = computed(() => {
    const profile = this.dataService.parentProfile();
    const form = this.parentForm();
    return form.name !== profile?.name ||
           form.surname !== profile?.surname ||
           form.phone !== profile?.phone;
  });

  activeLocale = computed(() => this.i18n.locale());

  // Methods
  loadParentProfile(): void;
  saveParentProfile(): Promise<void>;
  exportData(): void;
  clearAllData(): Promise<void>;
  deleteChild(id: string): Promise<void>;
  openEditChild(child: ChildProfile): void;
  openAddChild(): void;
}
```

---

## 7. DataService Additions Required

The following must be added to `DataService` for this component to work:

```typescript
// Signal
parentProfile = signal<ParentProfile | null>(null);

// API
async fetchParentProfile(): Promise<ParentProfile>
async updateParentProfile(data: Partial<ParentProfile>): Promise<ParentProfile>
async deleteChild(childId: string): Promise<void>
async clearAllData(): Promise<void>
async exportAllData(): Promise<object>
```

---

## 8. Dependencies & Imports

- `@angular/core` — `Component`, `inject`, `signal`, `computed`
- `src/app/core/i18n/i18n.service.ts`
- `src/app/services/data.service.ts`
- `src/app/features/child/add-edit-child-modal/add-edit-child-modal.component.ts` (for add/edit modal)

---

## 9. Acceptance Criteria

- [ ] Parent profile fields populate from `DataService.parentProfile` on load
- [ ] Save button calls `PATCH /api/parent` and shows success message
- [ ] Language toggle switches locale instantly with visual checkmark
- [ ] Children list renders with edit/delete per child
- [ ] Delete shows inline confirmation before calling API
- [ ] Export downloads valid JSON file
- [ ] Clear All Data shows inline confirmation, then wipes via API
- [ ] All strings are bilingual (SQ + EN)
- [ ] No hardcoded text — all via `i18nService.t()`
- [ ] Success/error states handled with visible feedback