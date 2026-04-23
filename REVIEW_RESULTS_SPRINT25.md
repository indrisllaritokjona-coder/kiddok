# REVIEW_RESULTS_SPRINT25.md — Conflict Resolution + Sync Audit
**Sprint 25:** Data Sync Improvements + Conflict Resolution
**Reviewer:** kiddok-reviewer
**Date:** 2026-04-23
**Status:** ⚠️ Core Logic Sound — 4 Issues Found

---

## Review Summary

The backend sync implementation is well-structured with correct conflict resolution semantics. The frontend components are complete and i18n-aware. However, **4 issues need attention before production** — 2 are data-integrity risks, 2 are UX correctness risks.

---

## ✅ What Works

### Backend SyncService
- **Last-write-wins** correctly applied for `temperature`, `growth`, `diary` — local data wins when `serverTs > localTimestamp`
- **`medical_data_manual_review`** correctly flags vaccine conflicts and returns `synced: false` — no silent overwrites
- **`resolveConflict()`** for manual resolution with `local_wins`, `server_wins`, `merge` support
- **Ownership verification** via `child.findFirst({ where: { id, userId } })` on every entry
- **`hasConflictingData()`** prevents flagging conflicts when only timestamp differs but actual data is the same
- **DTO contracts** match between backend and frontend (`SyncConflictDto`, `SyncResultDto`, `ConflictResolutionDto`)
- **`@updatedAt`** on `TemperatureEntry` (line 20) and `GrowthEntry` (line 51) — Prisma auto-manages

### Frontend SyncStatusComponent
- **State machine** (`idle → syncing → synced/error/conflict`) with correct transition logic
- **Conflict panel** with local vs server comparison, resolution actions for medical review
- **OnPush change detection** + `signal`-based state
- **i18n** for all Albanian/English labels
- **`OnDestroy`** cleanup for retry timeout ✓ (previous sprint issue was OnDestroy missing)
- **`PendingConflict` class** with `entityLabel()`, `timeDiffLabel()`, `changedFields()` — clean separation
- **Retry with exponential backoff** (2s → 4s → 8s), capped at 3 attempts
- **Lucide icons** for all states (loader-2, check-circle, alert-circle, alert-triangle)

### OfflineService Integration
- `triggerFullSync(syncEntries)` called at line 329-331 — batch sync, not per-entry HTTP

---

## ⚠️ Issues Found

### Issue 1 — [CRITICAL] `syncPendingEntries()` sends empty body — never syncs pending offline entries

**File:** `src/app/services/sync.service.ts` lines 28-39

```typescript
async syncPendingEntries(): Promise<SyncResult> {
  const result = await firstValueFrom(
    this.http.post<SyncResult>(`${environment.apiUrl}/sync`, {}, this.getHeaders())
  ) as SyncResult;
  return result;
}
```

**Problem:** `syncPendingEntries()` sends an **empty body** `{}`. The backend `POST /sync` expects `{ entries: [...] }`. With an empty body, `body.entries ?? []` becomes `[]` — the sync does nothing.

`SyncStatusComponent.triggerSync()` calls `this.syncService.syncPendingEntries()` (line 254), which means **manual sync from the UI never actually syncs anything**. The component shows "Synced" but nothing happened.

**Fix:** `triggerFullSync()` should be the canonical sync method. Either:
1. Have `triggerFullSync()` read from IndexedDB/AsyncStorage and call the endpoint, or
2. Have `syncPendingEntries()` fetch the queue from OfflineService before posting

```typescript
// Option A (preferred): syncPendingEntries fetches queue then calls triggerFullSync
async syncPendingEntries(): Promise<SyncResult> {
  const entries = await this.offlineService.getQueuedEntries(); // needs implementation
  return this.triggerFullSync(entries);
}
```

---

### Issue 2 — [HIGH] Conflicts not persisted — lost on page refresh

**File:** `src/app/components/sync-status.component.ts`

**Problem:** `pendingConflicts` is an in-memory signal. If the user sees a conflict, gets interrupted, and refreshes the page — all pending conflicts disappear. The sync result had conflicts but the frontend never saved them anywhere.

**Fix:** Persist conflicts to `localStorage` (or IndexedDB via OfflineService):
```typescript
// On conflict detection:
localStorage.setItem('kiddok_pending_conflicts', JSON.stringify(result.conflicts));
this.pendingConflicts.set(result.conflicts.map(c => new PendingConflict(c)));

// On init:
const stored = localStorage.getItem('kiddok_pending_conflicts');
if (stored) this.pendingConflicts.set(JSON.parse(stored).map(c => new PendingConflict(c)));
```

---

### Issue 3 — [MEDIUM] Partial update can corrupt data — field is `undefined` not skipped

**File:** `backend/src/sync/sync.service.ts` — e.g., `syncTemperatureEntry()` lines 98-107

```typescript
await this.prisma.temperatureEntry.update({
  where: { id: data.id },
  data: {
    temperature: data.temperature ?? undefined,
    measuredAt: data.measuredAt ? new Date(data.measuredAt) : undefined,
    location: data.location !== undefined ? data.location : undefined,
    notes: data.notes !== undefined ? data.notes : undefined,
  },
});
```

**Problem:** Prisma's `undefined` means "don't update this field" in nested create, but in `update()` at the top level, passing `undefined` should leave the field unchanged. However, if `data.temperature` is `null` (not undefined), `null ?? undefined` = `null` — this would explicitly set the field to `null`, overwriting the server value.

If an offline entry was created before a field existed (e.g., `notes` added in a later app version), and the old entry sends `{ notes: null }`, it would wipe the server's notes.

**Fix:** Use explicit `$set` pattern or a helper that only includes defined values:
```typescript
const updateData: any = {};
const fields = ['temperature', 'measuredAt', 'location', 'notes'] as const;
for (const field of fields) {
  if (data[field] !== undefined) {
    updateData[field] = field === 'measuredAt' && data[field] 
      ? new Date(data[field]) 
      : data[field];
  }
}
await this.prisma.temperatureEntry.update({ where: { id: data.id }, data: updateData });
```

---

### Issue 4 — [MEDIUM] `GET /sync/conflicts` returns a non-useful message

**File:** `backend/src/sync/sync.controller.ts` lines 26-30

```typescript
@Get('conflicts')
async getConflicts(@Request() req: any) {
  return { message: 'No pending conflicts endpoint — conflicts returned in sync response' };
}
```

**Problem:** This endpoint was described as "for polling when client has pending unresolved conflicts" but returns a static string. If the frontend ever tries to poll for pending conflicts (e.g., after a page reload to re-fetch unresolved medical conflicts), this endpoint gives no useful data.

**Fix:** Implement a proper conflicts query:
```typescript
@Get('conflicts')
async getConflicts(@Request() req: any) {
  // Could store pending conflicts in a temp table or return based on last sync result
  return { conflicts: [] }; // or implement persistent conflict store
}
```

---

## 🟡 Minor Observations (Non-Blocking)

1. **`changedFields()` in PendingConflict only shows fields present in `fields` map** — if a new field is added to a schema, it won't appear in the conflict UI until the `fields` map is updated. Low risk but worth noting.

2. **`timeDiffLabel()` calculates `serverTimestamp - localTimestamp`** — this is always positive during conflicts (server > local by definition), but if called incorrectly it could show negative times. Safe in current flow but fragile.

3. **`retrySync()` resets `retryAttempts` to 0 when max is reached** — it stops retrying but the error state persists. Correct behavior, but no user-facing "max retries reached" message.

4. **No rate limiting on `/sync` endpoint** — an attacker with valid JWT could hammer this endpoint. Low risk for personal/family app, but worth noting.

---

## Verdict

| Area | Status |
|------|--------|
| Conflict resolution logic (backend) | ✅ Sound |
| SyncService DTOs | ✅ Correct |
| Schema `@updatedAt` on TemperatureEntry + GrowthEntry | ✅ Present |
| SyncStatusComponent UI | ✅ Complete |
| SyncStatusComponent state machine | ✅ Correct |
| OfflineService batch sync integration | ✅ Present |
| **Issue 1: syncPendingEntries empty body** | ❌ Critical |
| **Issue 2: conflict persistence** | ❌ High |
| **Issue 3: partial update corruption** | ⚠️ Medium |
| **Issue 4: GET /sync/conflicts stub** | ⚠️ Medium |

**Recommendation:** Fix Issue 1 and 2 before production. Issues 3 and 4 are lower priority but should be addressed in a follow-up sprint.

---

*Reviewed by: kiddok-reviewer*
*Commit: `review: sprint 25 conflict resolution + sync audit`*