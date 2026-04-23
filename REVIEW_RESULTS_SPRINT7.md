# REVIEW_RESULTS_SPRINT7.md

**Reviewer:** kiddok-reviewer
**Sprint:** 7
**Date:** 2026-04-23
**Commit range:** 7352e4e → HEAD
**Files reviewed:** `src/app/services/`, `src/app/components/`, `src/ngsw-config.json`

---

## Summary

Sprint 7 is a significant offline-first architecture overhaul. The work adds full offline sync queue support across diary, temperature, growth, vaccines, and child profiles. Most changes are solid. **1 logic bug found** in sync queue deletion; otherwise clean.

---

## Security Audit

### ✅ ToastService — No XSS Risk

- `show()` renders `{{ toast.message }}` via Angular template — Angular auto-escapes HTML
- `showKey()` uses a hardcoded `translations` map only — no user content interpolation
- Translation keys are controlled constants, not derived from API responses
- **Verdict: Safe**

### ✅ DataService — Error Handling Now Proper

All API methods now follow the pattern:
1. `try` block calls API
2. `catch` block logs to console AND calls `toast.showKey('error.api.<specific>')` AND queues to offline sync
3. **Error toast always fires — no silent swallowing**

Examples:
- `createChild` → `toast.showKey('error.api.createChild')` on failure
- `updateChildApi` → `toast.showKey('error.api.updateChild')`
- `deleteChildApi` → `toast.showKey('error.api.deleteChild')`
- `createTemperatureEntry` → `toast.showKey('offline.queued')` after offline queue
- `deleteGrowthEntry` → `toast.showKey('error.api.deleteGrowth')`

**Verdict: Improved from silent-throw to explicit feedback**

### ⚠️ OfflineService — Sync Queue Deletion Logic Bug

**File:** `src/app/services/offline.service.ts`, `processSyncQueue()` method

**Bug:** The deletion condition is wrong. It prevents **both** successful entries AND failed entries from being deleted when `result.failedCount > 0`:

```typescript
// WRONG — this line prevents deletion even when failedCount > 0
if (entry.id !== undefined && !conflictEntityIds.has(bodyId) && result.failedCount === 0) {
  deleteStore.delete(entry.id);
}
```

**Impact:**
- If any entries fail (`failedCount > 0`), the `failedCount === 0` guard prevents deletion of *successful* entries too — so successful syncs aren't cleaned up from the queue
- Failed entries: ✅ correctly stay in queue (they're never deleted when `failedCount > 0`)
- Successful entries: ❌ incorrectly stay in queue when `failedCount > 0`

**Fix needed:** Remove the `&& result.failedCount === 0` guard. Only skip deletion for entries whose `body.id` is in the `conflictEntityIds` set:

```typescript
// CORRECT
if (entry.id !== undefined && !conflictEntityIds.has(bodyId)) {
  deleteStore.delete(entry.id);
}
```

**Verdict: Bug found — needs fix before production**

### ✅ Sync Queue — Failures/Conflicts Stay in Queue

- `triggerFullSync()` returns `failedCount` for network errors
- The `processSyncQueue` catch block: `hasPendingSync.set(true)` — keeps queue alive
- Conflicts: flagged via `SyncConflict` and persisted to `localStorage` via `SyncService.conflicts`
- The new `resolveConflict()` → `submitResolution()` flow at `/sync/resolve` is wired
- **Verdict: Correct**

---

## Performance Audit

### ✅ ToastComponent — Memory Leak Fixed

- `ngOnDestroy()` iterates `this.timeouts` Map, calls `clearTimeout()` for each, then `.clear()` the Map
- Auto-dismiss timer IDs are stored in a Map keyed by toast ID — no leaked references
- **Verdict: Clean**

### ✅ OfflineService — No Redundant Listeners

- `setupOnlineListeners()` adds `online` and `offline` event listeners once (constructor)
- No duplicate registration on subsequent calls
- Uses `ngZone.run()` to bridge from native event to Angular change detection
- **Verdict: Clean**

### ✅ ngsw-config.json — Proper Cache Strategy

Changes:
- Added `/diary/**` to DataGroups — diary entries now cached with freshness strategy
- Added `/sync` and `/sync/resolve` — sync endpoints cached
- Increased `timeout` from `5s` to `10s` — reasonable for sync batch operations
- **Verdict: Appropriate**

### ✅ Diary/Growth/Temperature Loading Skeletons

- Loading skeleton uses `setTimeout(() => this.loading.set(false), 500)` pattern
- No setInterval, no dangling timers
- Skeleton shows 500ms minimum while async data loads
- **Verdict: Acceptable**

---

## Additional Findings (Non-Blocking)

### ⚠️ SyncQueueEntry entity type is incomplete

`SyncQueueEntry.entity` is typed as `'temperature' | 'growth' | 'vaccine' | 'diary'` but DataService methods like `createChild`, `updateChildApi`, `deleteChildApi`, and `updateParentProfile` pass `entity: 'diary'` as a placeholder:

```typescript
// DataService — createChild
entity: 'diary', // ❌ wrong entity type for children
endpoint: '/children',
method: 'POST',
```

And for parent profile update:
```typescript
// DataService — updateParentProfile
entity: 'diary', // ❌ wrong entity type for parent
endpoint: '/parent',
```

**Impact:** The sync service maps `entityType` to the `/sync` endpoint format. Wrong entity type means the server won't process these entries correctly.

**Fix needed:** Either add `'child'` and `'parent'` to `SyncQueueEntry.entity`, or create separate sync queue types.

### ⚠️ Router navigate change (`/child-selector/:tab` → `/:tab`)

- `shell.component.ts` changed navigate from `/child-selector/tabId` to `//tabId`
- `pin-lock.component.ts` changed redirect after login from `/child-selector` to `/`
- This is a routing restructure — verify server-side route definitions match new URL scheme

### ⚠️ OfflineService.addToSyncQueue — no deduplication

If user saves the same entry offline twice before sync runs (e.g., rapid taps), two identical queue entries will be created. Not critical, but could cause server-side conflicts or duplicate data.

---

## Verdict

| Area | Status |
|------|--------|
| ToastService XSS | ✅ Pass |
| DataService error handling | ✅ Pass |
| OfflineService sync deletion bug | ⚠️ **1 bug** |
| Sync queue failure retention | ✅ Pass |
| Toast memory leak | ✅ Pass |
| OfflineService duplicate listeners | ✅ Pass |
| ngsw-config.json | ✅ Pass |

**Action required:** Fix the sync queue deletion condition in `processSyncQueue()` before production.

**Recommended fix (1 line):**
```typescript
// offline.service.ts — processSyncQueue — line ~418
// Change:
if (entry.id !== undefined && !conflictEntityIds.has(bodyId) && result.failedCount === 0) {
// To:
if (entry.id !== undefined && !conflictEntityIds.has(bodyId)) {
```
