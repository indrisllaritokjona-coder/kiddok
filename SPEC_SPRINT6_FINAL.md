# SPEC_SPRINT6_FINAL.md — Sprint 6: Backend Integration + Environment Config

## Status: ARCHITECT REVIEW COMPLETE

---

## Context

KidDok is a child health tracking Angular app with a NestJS/Postgres backend.
Backend modules for `parent`, `diary-entries`, and `illnesses` already exist in `backend/src/` and have proper Prisma models (confirmed by schema inspection).

The frontend `DataService` uses localStorage for diary and illness data, and calls `/parent` but without properly connecting to the backend's `ParentProfile` model.

**Sprint 6 goal**: Wire the Angular DataService to call the real backend endpoints for all three modules, add `environment.prod.ts` (already exists), and clean up the hardcoded localhost login call.

---

## Scope

### Part 1 — Wire DiaryEntries to Backend
**Current state**: `DataService.addDiaryEntry()` / `loadDiaryEntries()` use localStorage only.
**Backend**: `POST /diary-entries`, `GET /diary-entries/child/:childId`, `PATCH /diary-entries/:id`, `DELETE /diary-entries/:id` — already implemented in `DiaryController` + `DiaryService`.
**Prisma**: `DiaryEntry` model already exists.

**Tasks**:
- [ ] `DataService.loadDiaryEntries(childId)` — call `GET /diary-entries/child/${childId}` instead of localStorage
- [ ] `DataService.addDiaryEntry(entry)` — call `POST /diary-entries` and merge response into signal
- [ ] Add `updateDiaryEntry(id, data)` — call `PATCH /diary-entries/:id`
- [ ] Add `deleteDiaryEntry(id)` — call `DELETE /diary-entries/:id`
- [ ] Remove localStorage fallbacks for diary in `loadDiaryEntries` (keep offline as last-resort)
- [ ] Add proper `try/catch` with toast on all diary methods

---

### Part 2 — Wire Illnesses to Backend
**Current state**: `DataService.illnesses` signal is localStorage-only. `addIllness()` writes to localStorage.
**Backend**: `POST /illnesses`, `GET /illnesses/child/:childId`, `PATCH /illnesses/:id`, `DELETE /illnesses/:id` — already implemented in `IllnessesController` + `IllnessesService`.
**Prisma**: `IllnessEpisode` model already exists.

**Tasks**:
- [ ] Create `loadIllnesses(childId)` — call `GET /illnesses/child/${childId}`, set `this.illnesses` signal
- [ ] Update `addIllness(data)` — call `POST /illnesses` instead of localStorage, merge into signal
- [ ] Add `updateIllness(id, data)` — call `PATCH /illnesses/:id`
- [ ] Add `deleteIllness(id)` — call `DELETE /illnesses/:id`
- [ ] Remove localStorage reads from `loadChildDetails()` for illnesses — call `loadIllnesses` instead
- [ ] Add proper `try/catch` with toast

---

### Part 3 — Wire ParentProfile to Backend
**Current state**: `fetchParentProfile()` calls `GET /parent` but may fall back to empty local object.
**Backend**: `GET /parent` → returns `ParentProfile` from DB; `PATCH /parent` → updates it.
**Prisma**: `ParentProfile` model already exists, auto-created from User if not found.

**Tasks**:
- [ ] `fetchParentProfile()` — clean implementation, no silent empty fallback; return `ParentProfile` from API
- [ ] `updateParentProfile(data)` — already calls `PATCH /parent`, keep as-is but ensure error toast works
- [ ] Remove unnecessary localStorage fallback in `fetchParentProfile` — use API only, show toast on failure

---

### Part 4 — Fix Auth / Login URL
**Current state**: `login()` has hardcoded `'http://localhost:3000/auth/dev-login'` — bypasses `environment.apiUrl`.
**Task**:
- [ ] Replace hardcoded URL with `${this.API_URL}/auth/dev-login` (where `this.API_URL = environment.apiUrl`)

---

### Part 5 — Environment Config (already done — verify)
**Files already present**:
- `src/environments/environment.ts` — `apiUrl: 'http://localhost:3000'`, `production: false`
- `src/environments/environment.prod.ts` — `apiUrl: (window as any).__env?.API_URL || 'https://api.kiddok.al'`, `production: true`

**Task**:
- [ ] Verify `angular.json` has `fileReplacements` for production build swapping `environment.ts` → `environment.prod.ts`
- [ ] Confirm no other hardcoded `localhost:3000` URLs remain in DataService (login URL is the only one)

---

## Module Ownership

| Module | Who implements |
|--------|----------------|
| Part 1 (Diary wiring) | Executor |
| Part 2 (Illness wiring) | Executor |
| Part 3 (Parent wiring) | Executor |
| Part 4 (Fix login URL) | Executor |
| Part 5 (Env config verification) | Executor |

---

## File Changes

### `src/app/services/data.service.ts`
- `loadDiaryEntries(childId)` — replace localStorage read with `GET /diary-entries/child/${childId}`
- `addDiaryEntry(entry)` — replace localStorage write with `POST /diary-entries`
- Add `updateDiaryEntry(id, data)` — `PATCH /diary-entries/:id`
- Add `deleteDiaryEntry(id)` — `DELETE /diary-entries/:id`
- `loadIllnesses(childId)` — new method, calls `GET /illnesses/child/${childId}`
- `addIllness(data)` — replace localStorage write with `POST /illnesses`
- Add `updateIllness(id, data)` — `PATCH /illnesses/:id`
- Add `deleteIllness(id)` — `DELETE /illnesses/:id`
- `loadChildDetails()` — replace `illnesses` localStorage read with `loadIllnesses(childId)` call
- `fetchParentProfile()` — clean up, use API only
- `login()` — replace hardcoded URL with `this.API_URL`
- All new methods get `try/catch` + toast on failure

### `src/environments/environment.prod.ts` (verify)
- Already exists with `production: true` and `apiUrl` from `window.__env`

### `angular.json` (verify)
- Check `configurations.production.fileReplacements` includes environment swap

---

## DTO shapes (from backend)

### CreateDiaryEntryDto
```typescript
{
  childId: string;
  type: 'symptom' | 'meal' | 'sleep' | 'mood' | 'activity';
  description?: string;
  severity?: 'mild' | 'moderate' | 'severe';
  duration?: string;
  notes?: string;
}
```

### CreateIllnessDto
```typescript
{
  childId: string;
  title: string;
  symptoms?: string;
  medications?: string;
  notes?: string;
}
```

---

## Not in Scope (Sprint 7+)

- Adding new backend routes (all exist)
- Docker/backend containerization
- ToastService improvement beyond what's already there
- Loading state signals (E2 from SPEC_PRODUCTION.md)
- Production build verification

---

## Dependencies
- `environment.ts` and `environment.prod.ts` must not be deleted or broken
- `HttpClientModule` must be imported in the app (prerequisite — confirmed present)

---

## Verification Steps (for Tester)
1. Add a diary entry — confirm it's saved to backend, not just localStorage
2. Refresh page — confirm diary entry still visible (was re-fetched from API)
3. Add an illness — confirm it's saved to backend
4. Refresh page — confirm illness still visible (re-fetched from API)
5. Check network tab — no requests to `localhost:3000` except `/auth/dev-login` (which uses `environment.apiUrl` after fix)
6. Delete a diary entry — confirm it's removed from backend
7. Verify `environment.prod.ts` has `production: true`