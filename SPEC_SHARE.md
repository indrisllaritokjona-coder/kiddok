# KidDok — Share with Family Module: Technical Specification

**Architect:** Architect/Planner
**Date:** 2026-04-23
**Status:** Draft → For Executor

---

## 1. Module Architecture

```
Child Profile Page
  └── "Share" button (share-icon trigger)
        └── Share Modal (share-modal component)
              ├── DataTypeSelector (checkboxes: vaccines, growth, medications, diary, appointments, lab results)
              ├── ExpirySelector (radio: 48h / 7 days / 30 days)
              ├── GenerateButton
              ├── ShareLinkDisplay (readonly input + copy button)
              └── ActiveLinksList (collapsible section)
                    └── LinkRow (per link: expiry countdown + revoke button)

ShareService (share.service.ts)
  ├── listLinks(childId)     → GET /share/child/:childId
  ├── createLink(payload)    → POST /share/:childId
  └── revokeLink(id)         → DELETE /share/:id

HttpClient via authInterceptor
  └── Bearer token attached automatically
```

---

## 2. Component Breakdown

### 2.1 Share Modal

**Trigger:** "Share" button on child profile header or settings card.

**Modal layout (top-to-bottom):**

| Section | Content |
|---------|---------|
| Header | Title: "share.modal.title" + close button |
| Data Types | 6 checkboxes: vaccines, growth, medications, diary, appointments, lab results |
| Expiry | 3 radio chips: 48h / 7 days / 30 days (default: 7 days) |
| Generate CTA | Primary button: "share.generate" |
| Link Output | Readonly input showing generated URL + "Copy" button |
| Active Links | Collapsible section "share.activeLinks" — lists existing links |

### 2.2 Data Type Checkboxes

| Key | SQ Label | EN Label |
|-----|----------|----------|
| `vaccines` | Vaksinat | Vaccines |
| `growth` | Rritja | Growth |
| `medications` | Medikamentet | Medications |
| `diary` | Ditari | Diary |
| `appointments` | Terminet | Appointments |
| `labResults` | Rezultatet e Laboratorit | Lab Results |

### 2.3 Expiry Options

| Value | SQ Label | EN Label | Duration |
|-------|----------|----------|----------|
| `48h` | 48 orë | 48 hours | `expiresAt = now + 48h` |
| `7d` | 7 ditë | 7 days | `expiresAt = now + 7d` |
| `30d` | 30 ditë | 30 days | `expiresAt = now + 30d` |

---

## 3. Service Layer (ShareService)

### 3.1 New File

`src/app/services/share.service.ts`

```typescript
@Injectable({ providedIn: 'root' })
export class ShareService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  listLinks(childId: string): Observable<ShareLink[]> {
    return this.http.get<ShareLink[]>(`${this.apiUrl}/share/child/${childId}`);
  }

  createLink(childId: string, payload: CreateShareLinkDto): Observable<ShareLink> {
    return this.http.post<ShareLink>(`${this.apiUrl}/share/${childId}`, payload);
  }

  revokeLink(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/share/${id}`);
  }
}
```

### 3.2 DTOs

```typescript
// CreateShareLinkDto
interface CreateShareLinkDto {
  dataTypes: ('vaccines' | 'growth' | 'medications' | 'diary' | 'appointments' | 'labResults')[];
  expiresAt: string; // ISO 8601
}

// ShareLink (response shape)
interface ShareLink {
  id: string;
  token: string;
  childId: string;
  createdBy: string;
  dataTypes: string[];
  expiresAt: string;
  createdAt: string;
}
```

---

## 4. API Contract

### POST /share/:childId
- **Auth:** Bearer JWT
- **Body:**
```json
{
  "dataTypes": ["vaccines", "growth"],
  "expiresAt": "2026-04-30T00:00:00.000Z"
}
```
- **Response:** `ShareLink` (201)

### GET /share/child/:childId
- **Auth:** Bearer JWT
- **Response:** `ShareLink[]` (active links for child)

### DELETE /share/:id
- **Auth:** Bearer JWT
- **Response:** 204 No Content

---

## 5. Share Link URL Format

```
{frontendUrl}/shared/{token}
```
- Token: random UUID v4 generated server-side
- Frontend route: `/shared/:token` renders a read-only SharedDataViewComponent

---

## 6. Execution Roadmap

| Step | File | Action |
|------|------|--------|
| 1 | `src/app/services/share.service.ts` | Create ShareService with listLinks, createLink, revokeLink |
| 2 | `src/environments/environment.ts` | Confirm `apiUrl: 'http://localhost:3000'` and add `frontendUrl` |
| 3 | `src/app/core/i18n/i18n.service.ts` | Add all share-related translation keys (SQ + EN) |
| 4 | `src/app/features/share/` | Create `share-modal` feature folder |
| 5 | `src/app/features/share/share-modal.component.ts` | Modal component with data type checkboxes, expiry radios, generate, copy, active links list |
| 6 | `src/app/features/share/share-modal.component.html` | Template with all sections |
| 7 | `src/app/features/share/share-modal.component.scss` | Styles matching app design system |
| 8 | `src/app/features/shared-data-view/shared-data-view.component.ts` | Read-only view for `/shared/:token` route |
| 9 | `src/app/features/shared-data-view/shared-data-view.component.html` | Renders data based on dataTypes in token |
| 10 | `src/app/app.routes.ts` | Add route `/shared/:token` → SharedDataViewComponent |
| 11 | Shell or child profile page | Wire "Share" button that opens ShareModal |
| 12 | `src/app/app.component.ts` | (Optional) add share-button to nav if applicable |

---

## 7. i18n Keys Required

```typescript
// Share Modal
'share.modal.title'              // SQ: "Ndaje me Familjen" / EN: "Share with Family"
'share.dataTypes'                // SQ: "Të dhënat për t'u ndarë" / EN: "Data to share"
'share.dataTypes.vaccines'       // SQ: "Vaksinat" / EN: "Vaccines"
'share.dataTypes.growth'         // SQ: "Rritja" / EN: "Growth"
'share.dataTypes.medications'    // SQ: "Medikamentet" / EN: "Medications"
'share.dataTypes.diary'          // SQ: "Ditari" / EN: "Diary"
'share.dataTypes.appointments'   // SQ: "Terminet" / EN: "Appointments"
'share.dataTypes.labResults'      // SQ: "Rezultatet e Laboratorit" / EN: "Lab Results"
'share.expiry'                   // SQ: "Skadimi i linkut" / EN: "Link expiry"
'share.expiry.48h'               // SQ: "48 orë" / EN: "48 hours"
'share.expiry.7d'                 // SQ: "7 ditë" / EN: "7 days"
'share.expiry.30d'                // SQ: "30 ditë" / EN: "30 days"
'share.generate'                  // SQ: "Gjenero Link" / EN: "Generate Link"
'share.generating'                // SQ: "Duke gjeneruar..." / EN: "Generating..."
'share.linkLabel'                 // SQ: "Linku i ndarë" / EN: "Share link"
'share.copy'                      // SQ: "Kopjo" / EN: "Copy"
'share.copied'                    // SQ: "U kopjua!" / EN: "Copied!"
'share.activeLinks'               // SQ: "Linket aktive" / EN: "Active Links"
'share.activeLinks.empty'        // SQ: "Nuk ka linke aktive" / EN: "No active links"
'share.revoke'                    // SQ: "Çaktivizo" / EN: "Revoke"
'share.revokeConfirm'             // SQ: "Dëshironi ta çaktivizoni këtë link?" / EN: "Revoke this link?"
'share.expiresIn'                 // SQ: "skadon pas {n}" / EN: "expires in {n}"
'share.expiresIn.hours'           // SQ: "{n} orë" / EN: "{n} hours"
'share.expiresIn.days'            // SQ: "{n} ditë" / EN: "{n} days"
'share.cancel'                    // SQ: "Anulo" / EN: "Cancel"
'share.error'                     // SQ: "Gabim gjatë gjenerimit" / EN: "Error generating link"
'share.noChildSelected'           // SQ: "Zgjidhni profilin e fëmijës" / EN: "Select a child profile"
'share.button'                    // SQ: "Ndaje" / EN: "Share"
// Shared Data View (public page)
'share.view.title'                // SQ: "Të dhëna të ndara" / EN: "Shared Data"
'share.view.child'                 // SQ: "Profili i fëmijës" / EN: "Child profile"
'share.view.expires'              // SQ: "Ky link skadon më" / EN: "This link expires on"
'share.view.expired'              // SQ: "Ky link ka skaduar" / EN: "This link has expired"
'share.view.noData'               // SQ: "Nuk ka të dhëna të disponueshme" / EN: "No data available"
```

---

## 8. Edge Cases

| Scenario | Handling |
|----------|----------|
| No child selected | Disable share button, show toast "share.noChildSelected" |
| No data types selected | Disable generate button |
| Backend returns error on create | Show toast error "share.error" |
| Copy to clipboard fails | Fallback: select the input text, show manual-copy hint |
| Active link expired | Show "Expired" badge in active links list |
| Token not found on shared view | Show 404-style empty state "share.view.expired" |
| Revoke fails | Show toast error, refresh links list |
| No active links | Show empty state "share.activeLinks.empty" |
| Network error on list | Show error state in active links section |
| User not logged in | Share button still visible — no auth required for modal open |
