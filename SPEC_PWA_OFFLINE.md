# Sprint 8 — PWA Offline Mode: Technical Specification
**Architect:** The Architect
**Date:** 2026-04-23
**Status:** Draft → For Executor

---

## 1. Module Overview

KidDok PWA Offline Mode enables the application to function fully when there is no network connectivity, syncing seamlessly when connectivity is restored. The system builds on existing infrastructure (`OfflineService`, `SyncService`, `SyncQueue`, `ngsw-config.json`, service worker registration) and adds the missing wiring and UI components.

### Scope
- All DataService read methods fall back to IndexedDB when offline
- All DataService write methods queue to SyncQueue when offline
- On reconnect, sync queue is processed via `POST /sync`
- Offline banner shown at top of screen when `navigator.onLine === false`
- Sync status indicator in sidebar showing pending sync count
- Conflict resolution modal when server data changed while offline
- Service worker network-first caching for API responses
- Full i18n (SQ + EN) for all new labels

### Existing Infrastructure
| Component | Location | Status |
|-----------|----------|--------|
| `OfflineService` | `src/app/services/offline.service.ts` | IndexedDB + sync queue, online/offline listeners |
| `SyncService` | `src/app/services/sync.service.ts` | `triggerFullSync()`, conflict detection |
| `ngsw-config.json` | `src/ngsw-config.json` | Service worker config |
| Service worker registration | `src/app/app.config.ts` | `provideServiceWorker('ngsw-worker.js')` |
| `OfflineIndicatorComponent` | `src/app/components/offline-indicator.component.ts` | Offline banner (banner-only, no count refresh) |
| `SyncStatusComponent` | `src/app/components/sync-status.component.ts` | Sync pill + conflict panel |

---

## 2. File Inventory

### New Files
| File | Description |
|------|-------------|
| `src/app/components/offline-indicator.component.ts` (enhance) | Upgrade to reactive `hasPendingSync()` signal with live count |
| `src/app/components/sync-status.component.ts` (enhance) | Add pending count badge, sidebar integration |
| `src/app/core/i18n/i18n.service.ts` (extend) | Add offline/sync i18n keys |

### Modified Files
| File | Change |
|------|--------|
| `src/ngsw-config.json` | Add `networkFirst` data group for API routes, add sync endpoint |
| `src/app/services/offline.service.ts` | Add `isOnline` and `hasPendingSync` as `signal<>` (already done), ensure `addToSyncQueue()` is called by DataService writes when offline |
| `src/app/services/data.service.ts` | All read methods fall back to IndexedDB when offline; all write methods queue to SyncQueue when offline |
| `src/app/components/sidebar.component.ts` | Add `<app-sync-status>` component to sidebar footer |
| `src/app/core/i18n/i18n.service.ts` | Add offline/sync i18n keys |

---

## 3. Component Breakdown

### 3.1 Offline Banner (`OfflineIndicatorComponent`)
**Current state:** Shows banner when offline, static pending sync count on init.
**Target state:** Reactive — updates pending count dynamically when `hasPendingSync()` changes.

Changes:
- Inject `SyncService` and subscribe to `hasPendingSync()` signal
- Show pending count as live badge: `@if (offlineService.hasPendingSync()) { <span>({{ pendingCount() }})</span> }`
- On `online` event, trigger `SyncService.syncPendingEntries()` to process queue
- Add i18n key `offline.bannerPending` = "Duke pritur sinkronizim ({n})"

### 3.2 Sync Status Indicator (Sidebar Footer)
**Target:** Add `<app-sync-status>` to sidebar footer section.

Location in `sidebar.component.ts` template:
```html
<!-- Before logout button in sidebar__footer -->
<app-sync-status />
```

The `SyncStatusComponent` already has the conflict resolution panel. Integration step wires it into the sidebar.

### 3.3 Conflict Resolution Modal (`SyncStatusComponent`)
**Current state:** Already implemented with conflict list + keep-local / keep-server buttons.
**Target state:** Fully functional and wired to `SyncService`.

The `resolveConflict()` method in `SyncStatusComponent` already calls `SyncService.submitResolution()`. The panel is triggered when `state() === 'conflict'`. No changes needed — already implemented.

---

## 4. DataService Offline Wiring

### 4.1 Read Path (Online-First, IndexedDB Fallback)

Every DataService read method must follow this pattern:

```
try {
  result = await API call
  cache result to IndexedDB
} catch {
  if offline:
    load from IndexedDB
  else:
    show error toast
}
```

Affected methods:
- `loadChildrenFromApi()` — already falls back to `loadFromOffline()`
- `loadTemperatureEntries(childId)` — already has `getOfflineTemperatures()`
- `loadGrowthEntries(childId)` — already has `getOfflineGrowth()`
- `loadVaccineRecords(childId)` — already has `getOfflineVaccines()`
- `loadDiaryEntries(childId)` — no IndexedDB fallback (add it)
- `fetchParentProfile()` — no offline fallback (add it)

**New helper:**
```typescript
private async getOfflineDiary(childId: string): Promise<DiaryEntry[]> {
  try {
    const { OfflineService } = await import('./offline.service');
    const svc = new OfflineService();
    return await svc.getDiaryFromOffline(childId);
  } catch { return []; }
}
```

### 4.2 Write Path (Queue When Offline)

Every DataService write method must queue to SyncQueue when offline:

```typescript
if (!navigator.onLine) {
  await offlineService.addToSyncQueue({
    action: 'create' | 'update' | 'delete',
    entity: 'temperature' | 'growth' | 'vaccine' | 'diary',
    endpoint: `/${entity}`,
    method: 'POST' | 'PATCH' | 'DELETE',
    body: data,
  });
  // Also update local signal state
  return;
}
```

Affected methods:
- `createTemperatureEntry()` — add queue logic + local state update
- `deleteTemperatureEntry()` — add queue logic
- `createGrowthEntry()` — add queue logic + local state update
- `deleteGrowthEntry()` — add queue logic
- `createChild()` — add queue logic + local state update
- `updateChildApi()` — add queue logic + local state update
- `deleteChildApi()` — add queue logic + local state update
- `addDiaryEntry()` — add queue logic + local state update
- `updateParentProfile()` — add queue logic

---

## 5. Service Worker Configuration

### 5.1 ngsw-config.json — Network-First for API

**Current:** `freshness` strategy (cache-first with 5s network timeout).

**Target:** Network-first for API routes (always hit network, fall back to cache on failure):

```json
{
  "dataGroups": [
    {
      "name": "api-network-first",
      "urls": [
        "/children/**",
        "/temperature-entries/**",
        "/growth-entries/**",
        "/vaccines/**",
        "/diary/**",
        "/parent/**",
        "/sync",
        "/sync/resolve"
      ],
      "cacheConfig": {
        "strategy": "freshness",
        "maxSize": 100,
        "maxAge": "1d",
        "timeout": "10s"
      }
    },
    {
      "name": "api-freshness",
      "urls": [
        "/auth/**"
      ],
      "cacheConfig": {
        "strategy": "freshness",
        "maxSize": 10,
        "maxAge": "1h",
        "timeout": "5s"
      }
    }
  ]
}
```

Note: Angular Service Worker `freshness` strategy = network-first with fallback to cache. This is exactly what we need: try network first, fall back to cache on failure (offline).

---

## 6. API Contract

### POST /sync
**Already exists.** Accepts `SyncEntry[]`:
```typescript
interface SyncEntry {
  entityType: 'temperature' | 'growth' | 'vaccine' | 'diary';
  action: 'create' | 'update' | 'delete';
  data: any;
  localTimestamp: number;
}
```

**Response:**
```typescript
interface SyncResult {
  success: boolean;
  syncedCount: number;
  failedCount: number;
  conflicts: SyncConflict[];
}
```

### POST /sync/resolve
**Already exists.** Accepts `ConflictResolution`:
```typescript
interface ConflictResolution {
  entityType: 'temperature' | 'growth' | 'vaccine' | 'diary';
  entityId: string;
  resolution: 'local_wins' | 'server_wins';
  mergedData?: any;
}
```

---

## 7. i18n Keys (New)

Add to `i18n.service.ts` translations object:

| Key | SQ | EN |
|-----|----|----|
| `offline.banner` | Jeni offline | You are offline |
| `offline.bannerPending` | Duke pritur sinkronizim ({n}) | Pending sync ({n}) |
| `offline.syncing` | Duke sinkronizuar... | Syncing... |
| `offline.synced` | Sinkronizuar | Synced |
| `offline.syncError` | Gabim sinkronizimi | Sync error |
| `offline.conflict` | Konflikt | Conflict |
| `offline.retry` | Provo përsëri | Retry |
| `offline.pendingCount` | {n} në pritje | {n} pending |
| `sync.status.idle` | Sinkronizim i heshtur | Idle |
| `sync.status.syncing` | Duke sinkronizuar | Syncing |
| `sync.status.synced` | Sinkronizuar | Synced |
| `sync.status.error` | Gabim sinkronizimi | Sync error |
| `sync.status.conflict` | Konflikt | Conflict |
| `sync.conflict.resolveLocal` | Përdor Lokalen | Use Local |
| `sync.conflict.resolveServer` | Përdor Serverin | Use Server |
| `sync.conflict.medicalReview` | Rishikim Mjekësor | Medical Review |
| `sync.conflict.footer` | Konfliktet zgjidhen automatikisht për të dhëna jo-mjekësore. | Non-medical data conflicts are resolved automatically. |
| `sync.conflict.panelTitle` | Konflikt i të Dhënave | Data Conflict |
| `sync.conflict.panelSubtitle` | Të dhëna që kërkojnë rishikim manual | Data requiring manual review |
| `sync.conflict.local` | Lokalisht | Local |
| `sync.conflict.server` | Serveri | Server |
| `sync.lastSynced.justNow` | tani | just now |
| `sync.lastSynced.minsAgo` | {n} min më parë | {n}m ago |
| `sync.lastSynced.hoursAgo` | {n} orë më parë | {n}h ago |
| `sync.queue.count` | {n} në radhë | {n} in queue |

---

## 8. Execution Roadmap

| Step | File | Action |
|------|------|--------|
| 1 | `src/ngsw-config.json` | Change strategy to `freshness` (network-first) with 10s timeout for API routes |
| 2 | `src/app/services/data.service.ts` | Add `getOfflineDiary()` helper + fallback in `loadDiaryEntries()` |
| 3 | `src/app/services/data.service.ts` | Add `fetchParentProfile()` offline fallback using IndexedDB |
| 4 | `src/app/services/data.service.ts` | Add offline queue logic to all write methods: `createTemperatureEntry`, `deleteTemperatureEntry`, `createGrowthEntry`, `deleteGrowthEntry`, `createChild`, `updateChildApi`, `deleteChildApi`, `addDiaryEntry`, `updateParentProfile` |
| 5 | `src/app/services/data.service.ts` | Ensure all write methods also update local signal state when queued offline |
| 6 | `src/app/components/offline-indicator.component.ts` | Inject `SyncService`, subscribe to `hasPendingSync()` for live count; show live pending count badge |
| 7 | `src/app/components/sidebar.component.ts` | Import and add `<app-sync-status />` in sidebar footer above logout |
| 8 | `src/app/core/i18n/i18n.service.ts` | Add all 25 new i18n keys (Section 7) |
| 9 | `src/app/components/offline-indicator.component.ts` | Use new i18n keys for all labels |
| 10 | `src/app/components/sync-status.component.ts` | Use new i18n keys for all labels |

---

## 9. Edge Cases

| Scenario | Handling |
|----------|----------|
| Write while offline, then write same record again before sync | Both writes go to queue with different timestamps; server resolves order by timestamp |
| Conflict on medical data (temperature, growth, vaccine, diary) | Show conflict resolution panel; user chooses local vs server |
| Conflict on non-medical data (child profile) | Auto-resolve: most recent `updatedAt` wins |
| Sync fails repeatedly (network never recovers) | After 3 retries, show error state; user can manually tap "Retry" |
| App opened for first time while offline | Load children from IndexedDB if available; show offline banner |
| Service worker not supported | App works normally via HTTP only (no caching) |
| IndexedDB quota exceeded | Show error toast; log to console; continue with in-memory data |
| User clears browser data while offline | IndexedDB cleared; data must be re-synced from server on reconnect |

---

## 10. Acceptance Criteria

- [ ] Offline banner appears within 1s of losing connectivity
- [ ] Pending sync count on banner updates live as writes are queued
- [ ] All DataService reads work offline using IndexedDB cache
- [ ] All DataService writes queue to SyncQueue when offline and update local state
- [ ] On reconnect, sync queue processes automatically and shows syncing indicator
- [ ] Conflict resolution modal appears when server data changed while offline
- [ ] User can choose "keep local" or "keep server" for each conflicting record
- [ ] Sidebar shows sync status (idle/syncing/synced/error/conflict)
- [ ] All new UI labels are bilingual (SQ + EN)
- [ ] Service worker caches API responses and serves from cache when offline
- [ ] No console errors during offline operation
