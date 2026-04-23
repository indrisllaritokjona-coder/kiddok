# REVIEW_RESULTS_SPRINT6.md

**Reviewer:** kiddok-reviewer
**Sprint:** 6
**Date:** 2026-04-23

---

## Security Audit ✅ PASSED (with fixes applied)

### 1. JWT Auth — ✅ All endpoints protected
- `DiaryController`: all routes behind `@UseGuards(AuthGuard('jwt'))`
- `IllnessesController`: all routes behind `@UseGuards(AuthGuard('jwt'))`
- `SyncService`: `getEntityChildId` checks ownership before any mutation

### 2. Input Validation — ✅ Fixed
- **Issue found**: `PATCH /diary/:id` and `PATCH /illnesses/:id` used `dto: any` with no class-validator decorators
- **Fix applied**:
  - Created `backend/src/diary/dto/update-diary-entry.dto.ts` with `@IsOptional()` decorators for all fields
  - Created `backend/src/illnesses/dto/update-illness.dto.ts` with `@IsOptional()` decorators for all fields
  - Updated `DiaryController.update()` and `IllnessesController.update()` to use typed DTOs
  - Updated `DiaryService.update()` and `IllnessesService.update()` signatures accordingly
- Global `ValidationPipe` (whitelist + transform + forbidNonWhitelisted) is active in `main.ts`

### 3. IDOR Check — ✅ Verified
- `DiaryService.create()`: `child.findFirst({ where: { id: dto.childId, userId } })` → `ForbiddenException` if not found
- `IllnessesService.create()`: same pattern
- `getByChild` endpoints: same ownership check on childId
- `update`/`delete` endpoints: fetch entity with `include: { child: true }`, then verify `child.userId === userId`

### 4. XSS / Notes Sanitization — ⚠️ Risk noted (UI-level, not backend)
- Backend stores raw text; no server-side sanitization (standard practice)
- Angular's DomSanitizer handles output encoding by default for property binding
- **Recommendation**: if diary/illness notes are ever rendered with `[innerHTML]`, add DOMPurify sanitization on the frontend. No `[innerHTML]` usage found in the diff, but components were not fully reviewed.
- **Risk level**: Low (Angular escapes by default for interpolation)

### 5. Login URL — ✅ Fixed (was already fixed in this sprint)
- `data.service.ts`: `dev-login` now uses `${this.API_URL}/auth/dev-login` instead of `http://localhost:3000`
- No other hardcoded localhost URLs found in the diff

### 6. dev-login Rate Limiting — ✅ Verified
- `@UseGuards(ThrottlerGuard)` + `@Throttle({ short: { limit: 5, ttl: 60000 } })` applied to both `login` and `dev-login` endpoints
- PIN hardcoded as `1234` in service (dev-only, acceptable)

---

## Performance Audit ✅ PASSED (one fix applied)

### 1. Memory Leak in Offline Fallback — ✅ Fixed
- **Issue found**: `processSyncQueue()` in `OfflineService` was deleting **all** entries from the IndexedDB sync queue whenever `result.success || result.conflicts.length > 0`, including conflict entries (medical data needing manual review)
- **Impact**: Data loss — conflict entries would be silently removed from the queue without being resolved, and failed entries would also be deleted
- **Fix applied** in `offline.service.ts`:
  - Conflict entity IDs are collected into a `Set`
  - Only truly successful entries are deleted from the queue
  - Conflict entries and failed entries are kept for retry/manual review
  - `hasPendingSync` correctly remains `true` when conflicts or failures exist

### 2. Redundant API Calls — ✅ Verified
- `OfflineService` is now injected as a singleton (`providedIn: 'root'`) instead of being dynamically imported (`new OfflineService()`) on every call — eliminates redundant instantiation
- `cacheTemperaturesToOffline`, `getOfflineTemperatures`, `cacheGrowthToOffline`, `getOfflineVaccines`, `cacheToOffline`, `loadFromOffline` — all no longer create ephemeral instances

### 3. Offline Sync Queue — ✅ No unbounded growth
- Queue uses IndexedDB with `autoIncrement` ID — no in-memory array
- `processSyncQueue` now correctly handles partial failures (failed entries stay, conflicts stay)

---

## Summary of Fixes Applied

| # | File | Issue | Fix |
|---|------|--------|-----|
| 1 | `backend/src/diary/dto/update-diary-entry.dto.ts` | Missing update DTO with validation | Created with `@IsOptional()` decorators |
| 2 | `backend/src/illnesses/dto/update-illness.dto.ts` | Missing update DTO with validation | Created with `@IsOptional()` decorators |
| 3 | `backend/src/diary/diary.controller.ts` | `dto: any` on PATCH | Changed to `UpdateDiaryEntryDto` |
| 4 | `backend/src/illnesses/illnesses.controller.ts` | `dto: any` on PATCH | Changed to `UpdateIllnessDto` |
| 5 | `backend/src/diary/diary.service.ts` | `data: any` on update | Changed to `UpdateDiaryEntryDto` |
| 6 | `backend/src/illnesses/illnesses.service.ts` | `data: any` on update | Changed to `UpdateIllnessDto` |
| 7 | `src/app/services/offline.service.ts` | Sync queue deleted all entries including conflicts | Fixed selective deletion — only successful entries removed |

---

## Pending Notes (Non-Blocking)

1. **XSS on notes**: If `[innerHTML]` is used for diary/illness notes in Angular templates, DOMPurify should be added. Current implementation uses Angular interpolation (safe by default).
2. **Global helmet CSP**: `main.ts` uses `helmet()` but no explicit CSP policy is configured. Acceptable for development, review before production.
