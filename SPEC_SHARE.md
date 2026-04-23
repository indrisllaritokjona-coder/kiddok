# KidDok — Share with Family Module: Technical Specification

**Architect:** Architect/Planner
**Date:** 2026-04-23
**Status:** Draft → For Executor
**Sprint:** 6

---

## 1. Module Architecture

### Data Flow
```
Child Profile Page
  └── "Share" button (icon trigger in header/actions)
        └── ShareModalComponent (dialog/overlay)
              ├── DataTypeSelectorComponent (checkboxes: vaccines, growth, medications, diary, appointments, lab results)
              ├── ExpirySelectorComponent (radio chips: 48h / 7d / 30d)
              ├── GenerateSection (primary CTA → POST /share/:childId)
              ├── LinkOutputComponent (readonly input + copy-to-clipboard)
              └── ActiveLinksListComponent (collapsible list of existing links + revoke)

ShareService (share.service.ts — NEW)
  ├── listLinks(childId)     → GET /share/child/:childId   (Bearer JWT)
  ├── createLink(childId, dto) → POST /share/:childId      (Bearer JWT)
  ├── revokeLink(id)          → DELETE /share/:id           (Bearer JWT)
  └── getSharedData(token)    → GET /share/:token          (public, no auth)

GET /share/:token (public) → SharedDataViewComponent (read-only, no auth required)
```

### Backend Endpoints (already exist — no new backend code)
| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| `POST` | `/share/:childId` | JWT | Create share link |
| `GET` | `/share/child/:childId` | JWT | List active links |
| `DELETE` | `/share/:id` | JWT | Revoke a link |
| `GET` | `/share/:token` | **None** | Fetch shared data by token (public) |

### ShareLink Schema (Prisma)
```prisma
model ShareLink {
  id        String   @id @default(uuid())
  token     String   @unique @default(uuid())   // UUID v4 in link URL
  childId   String
  child     Child    @relation(...)
  createdBy String
  creator   User     @relation(...)
  expiresAt DateTime
  createdAt DateTime @default(now())
}
```

---

## 2. Component Breakdown

### 2.1 ShareModalComponent
**Location:** `src/app/features/share/share-modal.component.ts`
**Type:** Standalone Angular component (no routing — opens as dialog/overlay)

**Inputs:**
- `childId: string` (required — passed from parent)

**Internal State:**
```typescript
interface ShareModalState {
  selectedDataTypes: DataType[];     // e.g. ['vaccines', 'growth']
  expiryOption: '48h' | '7d' | '30d'; // default: '7d'
  generatedLink: string | null;      // set after POST success
  activeLinks: ActiveLink[];         // fetched on init via GET /share/child/:childId
  isGenerating: boolean;
  isLoadingLinks: boolean;
}

interface ActiveLink {
  id: string;
  token: string;
  expiresAt: string;   // ISO date string
  createdAt: string;
}
```

**Template Sections:**
1. Modal header — `share.modal.title` + X close button
2. Data type checkboxes (6 items)
3. Expiry selector (3 radio chips)
4. Generate button (disabled if no data types selected)
5. Link output row (readonly input + copy button — shown after generation)
6. Active links list (collapsible, shows after links load)

### 2.2 DataType Checkboxes
| Value | i18n Key SQ | i18n Key EN |
|-------|-------------|-------------|
| `vaccines` | `share.dataTypes.vaccines` = "Vaksinat" | "Vaccines" |
| `growth` | `share.dataTypes.growth` = "Rritja" | "Growth" |
| `medications` | `share.dataTypes.medications` = "Medikamentet" | "Medications" |
| `diary` | `share.dataTypes.diary` = "Ditari" | "Diary" |
| `appointments` | `share.dataTypes.appointments` = "Terminet" | "Appointments" |
| `labResults` | `share.dataTypes.labResults` = "Rezultatet e Laboratorit" | "Lab Results" |

### 2.3 Expiry Radio Chips
| Option | SQ Label | EN Label | Calculation |
|--------|----------|----------|-------------|
| `48h` | "48 orë" | "48 hours" | `expiresAt = now + 48h` |
| `7d` | "7 ditë" | "7 days" | `expiresAt = now + 7d` |
| `30d` | "30 ditë" | "30 days" | `expiresAt = now + 30d` |

### 2.4 Link Output Row
- Readonly `<input>` showing the full URL: `{frontendUrl}/shared/{token}`
- Copy button → calls `navigator.clipboard.writeText()` + shows "copied" feedback for 2s

### 2.5 ActiveLinksListComponent
- Fetches on modal open via `GET /share/child/:childId`
- Each row shows: expiry countdown ("skadon pas 5 ditë" / "expires in 5 days") + revoke button
- Expired links: show "Expiruar" / "Expired" badge (do not show revoke — already invalid)
- Empty state: "share.activeLinks.empty" message

### 2.6 SharedDataViewComponent
**Location:** `src/app/features/shared-data-view/shared-data-view.component.ts`
**Route:** `GET /shared/:token` → Angular route `/shared/:token`
**Auth:** None (public)
**Purpose:** Renders read-only data for a valid, non-expired share token

**Behavior:**
1. On init, call `GET /share/:token` (no auth header needed)
2. If token invalid → show `share.view.expired` empty state
3. If token expired → show `share.view.expired` message
4. If valid → render sections based on the returned `dataTypes` from the share link
   - Note: The current backend `getSharedChild` returns temperature, growth, vaccines — it does NOT filter by dataTypes. For Sprint 6, show what the backend returns. Future sprints can add dataType filtering to the backend.
5. Shows child name header + expiry notice

---

## 3. API Contract

### POST /share/:childId
- **Auth:** Bearer JWT (via authInterceptor)
- **Request Body:**
```json
{
  "expiresAt": "2026-04-30T00:00:00.000Z"
}
```
> Note: Backend `CreateShareLinkDto` only has `expiresAt` — dataTypes selection is stored in frontend UI state only (passed to the share URL as query params or encoded in the link). For Sprint 6, dataTypes selection is cosmetic/UI-only; all child data is shared. Future sprint can extend DTO.

- **Response (201):**
```json
{
  "id": "uuid",
  "token": "uuid-v4",
  "childId": "uuid",
  "expiresAt": "2026-04-30T00:00:00.000Z",
  "createdAt": "2026-04-23T00:00:00.000Z"
}
```

### GET /share/child/:childId
- **Auth:** Bearer JWT
- **Response (200):**
```json
[
  { "id": "uuid", "token": "uuid", "expiresAt": "...", "createdAt": "..." },
  { "id": "uuid", "token": "uuid", "expiresAt": "...", "createdAt": "..." }
]
```

### DELETE /share/:id
- **Auth:** Bearer JWT
- **Response:** 204 No Content

### GET /share/:token (public — no auth)
- **Response (200):**
```json
{
  "id": "uuid",
  "token": "uuid",
  "expiresAt": "...",
  "createdAt": "...",
  "child": {
    "name": "Leona Bompa",
    "temperatureEntries": [...],
    "growthEntries": [...],
    "vaccines": [...]
  }
}
```

---

## 4. Share Link URL Format

```
{frontendUrl}/shared/{token}
```

**frontendUrl** comes from `environment.ts` → `environment.frontendUrl` (e.g. `http://localhost:4200`).

**Token:** UUID v4 generated by backend (`randomUUID()` from Node `crypto` module).

---

## 5. Frontend Files to Create

### New Files
| File | Purpose |
|------|---------|
| `src/app/services/share.service.ts` | HTTP client for all share endpoints |
| `src/app/features/share/share-modal.component.ts` | Main modal component |
| `src/app/features/share/share-modal.component.html` | Modal template |
| `src/app/features/share/share-modal.component.scss` | Modal styles |
| `src/app/features/shared-data-view/shared-data-view.component.ts` | Public shared-data page |
| `src/app/features/shared-data-view/shared-data-view.component.html` | Shared data template |
| `src/app/features/shared-data-view/shared-data-view.component.scss` | Styles |

### Modified Files
| File | Change |
|------|--------|
| `src/app/app.routes.ts` | Add route `path: 'shared/:token'` → `SharedDataViewComponent` |
| `src/environments/environment.ts` | Add `frontendUrl: string` field |
| `src/app/core/i18n/i18n.service.ts` | Add all share i18n keys (SQ + EN) |
| `src/app/features/child/` | Add "Share" button to child profile header or actions area |

---

## 6. i18n Keys

```typescript
// Share Modal
'share.modal.title'                    // SQ: "Ndaje me Familjen" / EN: "Share with Family"
'share.dataTypes'                      // SQ: "Të dhënat për t'u ndarë" / EN: "Data to share"
'share.dataTypes.vaccines'             // SQ: "Vaksinat" / EN: "Vaccines"
'share.dataTypes.growth'               // SQ: "Rritja" / EN: "Growth"
'share.dataTypes.medications'          // SQ: "Medikamentet" / EN: "Medications"
'share.dataTypes.diary'                // SQ: "Ditari" / EN: "Diary"
'share.dataTypes.appointments'         // SQ: "Terminet" / EN: "Appointments"
'share.dataTypes.labResults'           // SQ: "Rezultatet e Laboratorit" / EN: "Lab Results"
'share.expiry'                         // SQ: "Skadimi i linkut" / EN: "Link expiry"
'share.expiry.48h'                     // SQ: "48 orë" / EN: "48 hours"
'share.expiry.7d'                      // SQ: "7 ditë" / EN: "7 days"
'share.expiry.30d'                      // SQ: "30 ditë" / EN: "30 days"
'share.generate'                        // SQ: "Gjenero Link" / EN: "Generate Link"
'share.generating'                      // SQ: "Duke gjeneruar..." / EN: "Generating..."
'share.linkLabel'                       // SQ: "Linku i ndarë" / EN: "Share link"
'share.copy'                            // SQ: "Kopjo" / EN: "Copy"
'share.copied'                          // SQ: "U kopjua!" / EN: "Copied!"
'share.activeLinks'                     // SQ: "Linket aktive" / EN: "Active Links"
'share.activeLinks.empty'              // SQ: "Nuk ka linke aktive" / EN: "No active links"
'share.revoke'                          // SQ: "Çaktivizo" / EN: "Revoke"
'share.revokeConfirm'                   // SQ: "Dëshironi ta çaktivizoni këtë link?" / EN: "Revoke this link?"
'share.expiresInDays'                   // SQ: "skadon pas {n} ditëve" / EN: "expires in {n} days"
'share.expiresInHours'                  // SQ: "skadon pas {n} orëve" / EN: "expires in {n} hours"
'share.expired'                         // SQ: "Skaduar" / EN: "Expired"
'share.cancel'                          // SQ: "Anulo" / EN: "Cancel"
'share.error'                           // SQ: "Gabim gjatë gjenerimit" / EN: "Error generating link"
'share.noChildSelected'                // SQ: "Zgjidhni profilin e fëmijës" / EN: "Select a child profile"
'share.button'                          // SQ: "Ndaje" / EN: "Share"
'share.confirmRevoke'                  // SQ: "Konfirmo" / EN: "Confirm"

// Shared Data View (public page)
'share.view.title'                      // SQ: "Të dhëna të ndara" / EN: "Shared Data"
'share.view.child'                      // SQ: "Profili i fëmijës" / EN: "Child profile"
'share.view.expires'                    // SQ: "Ky link skadon më" / EN: "This link expires on"
'share.view.expired'                   // SQ: "Ky link ka skaduar" / EN: "This link has expired"
'share.view.noData'                     // SQ: "Nuk ka të dhëna të disponueshme" / EN: "No data available"
'share.view.temperature'                // SQ: "Temperatura" / EN: "Temperature"
'share.view.growth'                    // SQ: "Rritja" / EN: "Growth"
'share.view.vaccines'                  // SQ: "Vaksinat" / EN: "Vaccines"
'share.view.accessDenied'              // SQ: "Ky link nuk është i vlefshëm" / EN: "This link is not valid"
```

---

## 7. Edge Cases

| Scenario | Handling |
|----------|----------|
| No child selected | Share button disabled or shows `share.noChildSelected` toast |
| No data types selected | Generate button disabled |
| Backend returns error on create | Toast error `share.error`, link not shown |
| Copy to clipboard fails | Fallback: select the input text programmatically; show manual-copy hint |
| Active link expired | Show "Expired" badge, revoke button hidden |
| Token not found on shared view | Show `share.view.accessDenied` empty state |
| Token expired on shared view | Show `share.view.expired` message |
| Revoke fails | Toast error + refresh active links list |
| No active links | Show empty state `share.activeLinks.empty` |
| Network error on list | Show error state in active links section |
| User not logged in | Share button works — all actions require JWT, so auth guard redirects to login |
| Rapid generate clicks | Debounce/spinner prevent duplicate POSTs |

---

## 8. Execution Roadmap

### Phase 1 — Service & Infrastructure
| Step | File | Action |
|------|------|--------|
| 1 | `src/app/services/share.service.ts` | Create `ShareService` with `listLinks`, `createLink`, `revokeLink`, `getSharedData` methods |
| 2 | `src/environments/environment.ts` | Add `frontendUrl: 'http://localhost:4200'` |

### Phase 2 — i18n
| Step | File | Action |
|------|------|--------|
| 3 | `src/app/core/i18n/i18n.service.ts` | Add all `share.*` translation keys for SQ + EN |

### Phase 3 — Share Modal
| Step | File | Action |
|------|------|--------|
| 4 | `src/app/features/share/share-modal.component.ts` | Modal component with reactive form for data types + expiry |
| 5 | `src/app/features/share/share-modal.component.html` | Template with sections: header, checkboxes, expiry chips, generate, output, active links |
| 6 | `src/app/features/share/share-modal.component.scss` | Styles matching app design system |

### Phase 4 — Shared Data View (public page)
| Step | File | Action |
|------|------|--------|
| 7 | `src/app/features/shared-data-view/shared-data-view.component.ts` | Reads token from route, calls `getSharedData(token)` |
| 8 | `src/app/features/shared-data-view/shared-data-view.component.html` | Renders child name, expiry notice, data sections |
| 9 | `src/app/features/shared-data-view/shared-data-view.component.scss` | Clean public-facing styles |

### Phase 5 — Routing & Integration
| Step | File | Action |
|------|------|--------|
| 10 | `src/app/app.routes.ts` | Add `path: 'shared/:token', component: SharedDataViewComponent` |
| 11 | `src/app/features/child/child-profile.component.ts` | Add share button to header/actions area; opens `ShareModalComponent` with `childId` |

---

## 9. Design Notes

- **Modal approach:** Use Angular Material `MatDialog` or custom overlay — depends on existing pattern in codebase. Check `src/app/components/` for dialog usage.
- **Copy button:** Use `navigator.clipboard.writeText()` with fallback to `document.execCommand('copy')` for older browsers.
- **Expiry countdown:** Display relative time ("2 ditë", "5 orë") using Angular `Date` pipe or custom `timeAgo` pipe.
- **Active links section:** Collapsible with chevron toggle; loads links on modal open (not on section expand) to keep UX snappy.
- **Button styling:** Primary action = filled button, Copy = outlined/small, Revoke = danger/outlined.
- **Responsive:** Modal should be full-screen on mobile, centered card on tablet/desktop (max-width: 480px).