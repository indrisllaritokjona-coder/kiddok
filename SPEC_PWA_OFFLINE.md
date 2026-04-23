# Sprint 8 — PWA Offline Mode: Technical Specification
**Architect:** kiddok-architect  
**Date:** 2026-04-23  
**Status:** Draft → For Executor

---

## 1. Module Overview

KidDok PWA Offline Mode enables the app to function fully without network connectivity and sync seamlessly on reconnect. It builds on existing infrastructure and fills in the remaining wiring and UI components.

### Scope
- All DataService reads fall back to IndexedDB when offline
- All DataService writes queue to SyncQueue when offline and update local signal state
- On reconnect: `OfflineService.processSyncQueue()` → `SyncService.triggerFullSync()` → `POST /sync`
- Offline banner ("Jeni offline" / "You are offline") at top of page with live pending count
- Sync status indicator in sidebar showing pending count + conflict state
- Conflict resolution modal: keep local / keep server / review each
- Service worker: network-first for API calls, cache-first for static assets
- Full i18n SQ + EN for all labels

### Existing Infrastructure
| Component | Location | Status |
|-----------|----------|--------|
| `OfflineService` | `src/app/services/offline.service.ts` | ✅ IndexedDB stores + sync queue + online/offline listeners |
| `SyncService` | `src/app/services/sync.service.ts` | ✅ `triggerFullSync()`, `syncPendingEntries()`, `submitResolution()` |
| `SyncQueueEntry` interface | `offline.service.ts` | ✅ `action`, `entity`, `endpoint`, `method`, `body`, `timestamp` |
| `ngsw-config.json` | `src/ngsw-config.json` | ✅ Static asset caching; needs API network-first update |
| Service worker | `src/app/app.config.ts` | ✅ `provideServiceWorker('ngsw-worker.js')` |
| `OfflineIndicatorComponent` | `src/app/components/offline-indicator.component.ts` | ✅ Banner-only; needs reactive count + i18n update |
| `SyncStatusComponent` | `src/app/components/sync-status.component.ts` | ✅ Conflict panel + sync pill; needs sidebar integration + i18n update |

---

## 2. Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Angular App                              │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────────┐  │
│  │ DataService │─▶│ OfflineService│  │  SyncStatusComponent│  │
│  │             │  │              │  │  (sidebar footer)    │  │
│  │  Reads:     │  │  getChildren │  └────────────────────┘  │
│  │  Writes:    │  │  fromOffline │                          │
│  │  queue→     │  │  getTempera- │  ┌──────────────────────┐ │
│  │  addToSync  │  │  turesFrom.. │  │OfflineIndicatorComp  │ │
│  │  Queue()    │  │  ...         │  │ (top banner)         │ │
│  └─────────────┘  └──────┬───────┘  └──────────────────────┘ │
│                          │                                    │
│                    IndexedDB (kiddok_offline)                │
│  ┌────────┐  ┌──────────┐  ┌───────┐  ┌────────┐  ┌──────┐ │
│  │children│  │temperatures│ │growth │  │vaccines│  │diary │ │
│  └────────┘  └──────────┘  └───────┘  └────────┘  └──────┘ │
│  ┌──────────────────────────────────────────────────────┐    │
│  │              sync_queue                              │    │
│  └──────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
          │ online event fires processSyncQueue()
          ▼
┌──────────────────────┐      ┌──────────────────────────────┐
│  SyncService         │      │  NestJS Backend              │
│  triggerFullSync() ─┼─────▶│  POST /sync                   │
│                      │      │  → returns SyncResult        │
│                      │      │  → 409 with conflicts        │
│  submitResolution()  │      │  POST /sync/resolve           │
└──────────────────────┘      └──────────────────────────────┘
          │
          ▼
┌──────────────────────────────┐
│  Service Worker (ngsw)       │
│  network-first for API calls │
│  cache-first for assets      │
└──────────────────────────────┘
```

---

## 3. Component Breakdown

### 3.1 `OfflineIndicatorComponent` — Enhancement
**File:** `src/app/components/offline-indicator.component.ts`

**Current:** Static pending count loaded once on `ngOnInit`.
**Target:** Reactively update pending count as writes are queued.

Changes required:
- Inject `SyncService` (not just `OfflineService`)
- Replace one-shot `loadPendingCount()` call with a signal subscription:
  ```typescript
  effect(() => {
    const pending = this.offlineService.hasPendingSync();
    if (pending) this.loadPendingCount();
  });
  ```
- Use i18n keys (see Section 7) for all label text instead of hardcoded strings
- Show both offline banner and pending count in one line (already done, fix i18n only)

### 3.2 `SyncStatusComponent` — Sidebar Integration
**File:** `src/app/components/sync-status.component.ts`

**Current:** Full conflict panel + sync pill already implemented.
**Target:** Wire into sidebar + apply i18n keys.

Changes required:
- Inject `I18nService` (already done) — verify all labels use `i18n.t()` keys
- Add live `pendingCount` from `OfflineService.getSyncQueueCount()` signal
- Show pending count badge next to sync icon when items are queued:
  ```html
  @if (pendingCount() > 0) {
    <span class="px-1.5 py-0.5 rounded-full bg-primary-100 text-primary-700 text-xs font-bold">
      {{ pendingCount() }}
    </span>
  }
  ```
- Use i18n keys for all label text (see Section 7)

### 3.3 `SidebarComponent` — Add Sync Status
**File:** `src/app/components/sidebar.component.ts`

Add `<app-sync-status />` to sidebar footer section above the logout button:
```html
<div class="sidebar__footer">
  <app-sync-status />
  <!-- logout button -->
</div>
```

---

## 4. DataService Offline Wiring

### 4.1 Read Path — IndexedDB Fallback

Every DataService read method follows this pattern:

```
try {
  result = await API call
  cache result to IndexedDB via OfflineService
} catch {
  if (!navigator.onLine) {
    load from IndexedDB via OfflineService
  } else {
    show error toast
  }
}
```

Affected methods and their current state:

| Method | Current State | Action Needed |
|--------|--------------|---------------|
| `loadChildrenFromApi()` | Falls back to `loadCachedChildren()` | Verify IndexedDB caching on success |
| `loadTemperatureEntries(childId)` | Calls `getTemperaturesFromOffline()` in catch | ✅ OK |
| `loadGrowthEntries(childId)` | Calls `getGrowthFromOffline()` in catch | ✅ OK |
| `loadVaccineRecords(childId)` | Calls `getVaccinesFromOffline()` in catch | ✅ OK |
| `loadDiaryEntries(childId)` | No fallback | **Add**: `OfflineService.getDiaryFromOffline(childId)` |
| `fetchParentProfile()` | No offline fallback | **Add**: `OfflineService.getParentFromOffline()` |

**`getDiaryFromOffline` helper (add to DataService):**
```typescript
private async getOfflineDiary(childId: string): Promise<DiaryEntry[]> {
  const { OfflineService } = await import('./offline.service');
  // Use injector if available, otherwise lazy import
  return await this.offline.getDiaryFromOffline(childId);
}
```

**`getParentFromOffline` helper (add to DataService):**
```typescript
private async getOfflineParent(): Promise<ParentProfile | null> {
  const db = await this.offline.getDb();
  // Use STORE_PARENT
}
```

### 4.2 Write Path — Queue When Offline

Every DataService write method must:
1. Check `!navigator.onLine`
2. Call `offlineService.addToSyncQueue(...)` with the entry
3. **Update local signal state** (so UI reflects the change immediately)
4. Return early (skip the API call)

```typescript
if (!navigator.onLine) {
  await this.offlineService.addToSyncQueue({
    action: 'create' | 'update' | 'delete',
    entity: entityType,
    endpoint: `/${entity}`,
    method: method,
    body: data,
  });
  // Update local signal so UI stays current
  this.entitySignal.update(current => [...current, localEntry]);
  return;
}
```

Affected methods and their current state:

| Method | Current State | Action Needed |
|--------|--------------|---------------|
| `createTemperatureEntry()` | Queues offline, updates signal | ✅ OK — verify |
| `deleteTemperatureEntry()` | API delete only | **Add** queue + local update |
| `updateTemperatureEntry()` | API update only | **Add** queue + local update |
| `createGrowthEntry()` | Queues offline, updates signal | ✅ OK — verify |
| `deleteGrowthEntry()` | API delete only | **Add** queue + local update |
| `updateGrowthEntry()` | API update only | **Add** queue + local update |
| `createChild()` | API create only | **Add** queue + local update |
| `updateChildApi()` | API update only | **Add** queue + local update |
| `deleteChildApi()` | API delete only | **Add** queue + local update |
| `addDiaryEntry()` | API create only | **Add** queue + local update |
| `updateDiaryEntry()` | API update only | **Add** queue + local update |
| `deleteDiaryEntry()` | API delete only | **Add** queue + local update |
| `updateParentProfile()` | API update only | **Add** queue + local update |
| `createVaccineRecord()` | API create only | **Add** queue + local update |
| `updateVaccineRecord()` | API update only | **Add** queue + local update |
| `deleteVaccineRecord()` | API delete only | **Add** queue + local update |

**Important:** All offline write methods must also update the local signal immediately so the UI never shows stale data.

---

## 5. Service Worker Configuration

### 5.1 `ngsw-config.json` — API Network-First

**Current:** `freshness` strategy (5s timeout) for API routes.  
**Target:** `freshness` strategy (10s timeout) for all data endpoints, explicit sync routes.

Angular Service Worker `freshness` strategy = **network-first with fallback to cache**. This is the correct behavior: try network first, fall back to cache when offline.

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
      "name": "auth-freshness",
      "urls": ["/auth/**"],
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

---

## 6. API Contract

### POST /sync
**Already implemented on NestJS backend.**

**Request:**
```typescript
interface SyncPayload {
  entries: SyncEntry[];
}

interface SyncEntry {
  entityType: 'temperature' | 'growth' | 'vaccine' | 'diary';
  action: 'create' | 'update' | 'delete';
  data: any;
  localTimestamp: number;
}
```

**Success Response (200):**
```typescript
interface SyncResult {
  success: boolean;
  syncedCount: number;
  failedCount: number;
  conflicts: SyncConflict[];
}
```

**Conflict Response (409):**
Same `SyncResult` body with `conflicts[]` populated:
```typescript
interface SyncConflict {
  entityType: string;
  entityId: string;
  localTimestamp: number;
  serverTimestamp: number;
  localData: any;
  serverData: any;
  conflictType: 'last_write_wins' | 'medical_data_manual_review';
}
```

### POST /sync/resolve
**Already implemented on NestJS backend.**

**Request:**
```typescript
interface ConflictResolution {
  entityType: 'temperature' | 'growth' | 'vaccine' | 'diary';
  entityId: string;
  resolution: 'local_wins' | 'server_wins';
  mergedData?: any; // only when resolution === 'merge'
}
```

**Response:**
```typescript
interface { success: boolean }
```

---

## 7. i18n Keys

Add to `I18nService` translations object in `src/app/core/i18n/i18n.service.ts`:

| Key | SQ | EN |
|-----|----|----|
| `offline.banner` | Jeni offline | You are offline |
| `offline.bannerPending` | Duke pritur sinkronizim | Pending sync |
| `offline.syncing` | Duke sinkronizuar... | Syncing... |
| `offline.synced` | Sinkronizuar | Synced |
| `offline.syncError` | Gabim sinkronizimi | Sync error |
| `offline.conflict` | Konflikt | Conflict |
| `offline.retry` | Provo përsëri | Retry |
| `offline.pendingCount` | {n} në pritje | {n} pending |
| `sync.status.idle` | Heshtur | Idle |
| `sync.status.syncing` | Duke sinkronizuar | Syncing |
| `sync.status.synced` | Sinkronizuar | Synced |
| `sync.status.error` | Gabim | Error |
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
| `sync.online` | Jeni online! Duke sinkronizuar... | You are online! Syncing... |
| `sync.offline` | Jeni offline. Të dhënat do të ruhen lokalisht. | You are offline. Data will be saved locally. |

---

## 8. Data Flow

### Offline Write Flow
```
User action (e.g., add temperature)
    ↓
DataService.createTemperatureEntry()
    ↓
if (!navigator.onLine) {
  OfflineService.addToSyncQueue(entry)  → IndexedDB sync_queue store
  dataService.temperatureEntries.update(...)  → local signal (UI updates)
  return
}
    ↓
else → normal API call
```

### Reconnect Sync Flow
```
window.addEventListener('online')
    ↓
OfflineService.setupOnlineListeners() → ngZone.run() → processSyncQueue()
    ↓
OfflineService.processSyncQueue() → reads all from sync_queue
    ↓
SyncService.triggerFullSync(syncEntries) → POST /sync
    ↓
┌─ 200 OK:
│    Clear processed entries from sync_queue
│    hasPendingSync.set(false)
│    Toast: "X items synced!"
│
└─ 409 Conflict:
     For each conflict where type === 'medical_data_manual_review':
       SyncService.conflicts signal updates → SyncStatusComponent shows panel
     Re-queue non-conflicting failed entries
```

### Offline Read Flow
```
DataService.loadTemperatureEntries(childId)
    ↓
try { await api } catch {
  if (!navigator.onLine) {
    OfflineService.getTemperaturesFromOffline(childId)  → IndexedDB
    dataService.temperatureEntries.set(cached)
  }
}
```

---

## 9. Edge Cases

| Scenario | Handling |
|----------|----------|
| Write while offline, then write same record again before sync | Both writes queued with different timestamps; server resolves order by `localTimestamp` |
| Conflict on medical data (temperature, growth, vaccine, diary) | Show conflict resolution panel with side-by-side diff; user picks local or server |
| Conflict on non-medical data (child profile) | Auto-resolve: most recent `updatedAt` wins (server returns `conflictType: 'last_write_wins'`) |
| Sync fails repeatedly (network never recovers) | Exponential backoff retry (2s, 4s, 8s); after 3 attempts show error state; manual "Retry" button available |
| App opened first time while offline + no IndexedDB cache | Show empty state with message "Jeni offline — lidhu me internet për të parë të dhëna" |
| Service worker not supported | App works normally via HTTP (no caching), same as before |
| IndexedDB quota exceeded | Show error toast; log to console; continue with in-memory data + queue |
| User clears browser data while offline | IndexedDB cleared; must re-sync from server on reconnect |
| `online` event fires while sync already in progress | Check `isSyncing` flag; ignore duplicate online events |
| App backgrounded, then foregrounded with connectivity restored | `navigator.onLine` reflects current state; sync triggers naturally |
| `addToSyncQueue` fails (IndexedDB error) | Catch and log; show error toast; do NOT lose the data — store in memory as fallback |

---

## 10. Execution Roadmap

| Step | File | Action |
|------|------|--------|
| 1 | `src/ngsw-config.json` | Update data groups: add explicit `/sync` and `/sync/resolve` URLs; set timeout to `10s` for API group |
| 2 | `src/app/services/offline.service.ts` | Add `getParentFromOffline()` method + `STORE_PARENT` access |
| 3 | `src/app/services/data.service.ts` | Add `getOfflineDiary(childId)` helper; add offline fallback in `loadDiaryEntries()` |
| 4 | `src/app/services/data.service.ts` | Add `fetchParentProfile()` offline fallback using `OfflineService.getParentFromOffline()` |
| 5 | `src/app/services/data.service.ts` | Add offline queue logic to write methods: `deleteTemperatureEntry`, `updateTemperatureEntry`, `deleteGrowthEntry`, `updateGrowthEntry`, `createChild`, `updateChildApi`, `deleteChildApi`, `addDiaryEntry`, `updateDiaryEntry`, `deleteDiaryEntry`, `updateParentProfile`, `createVaccineRecord`, `updateVaccineRecord`, `deleteVaccineRecord` |
| 6 | `src/app/services/data.service.ts` | Ensure all offline write methods update local signal state immediately before returning |
| 7 | `src/app/core/i18n/i18n.service.ts` | Add all 26 new i18n keys (Section 7) |
| 8 | `src/app/components/offline-indicator.component.ts` | Use `effect()` to reactively update pending count; replace hardcoded labels with `i18n.t()` keys |
| 9 | `src/app/components/sync-status.component.ts` | Replace hardcoded labels with `i18n.t()` keys; add live `pendingCount()` signal from OfflineService |
| 10 | `src/app/components/sidebar.component.ts` | Import `SyncStatusComponent`; add `<app-sync-status />` in sidebar footer above logout button |

---

## 11. Acceptance Criteria

- [ ] Offline banner appears within 1s of losing connectivity ("Jeni offline" / "You are offline")
- [ ] Pending sync count on banner updates live as writes are queued
- [ ] All DataService reads work offline using IndexedDB cache (verified with Chrome DevTools offline mode)
- [ ] All DataService writes queue to SyncQueue when offline and update local signal state immediately
- [ ] On reconnect, sync queue processes automatically within 500ms
- [ ] Conflict resolution modal appears when server returns 409 with conflicts
- [ ] User can choose "keep local" or "keep server" for each conflicting medical record
- [ ] Sidebar footer shows `<app-sync-status>` with live pending count
- [ ] All UI labels are bilingual (SQ + EN) with no hardcoded strings in offline/sync components
- [ ] Service worker caches API GET responses and serves from cache when offline (verified with `ngsw::` in DevTools)
- [ ] No `console.error` during offline operation
- [ ] App functions correctly when service worker is unsupported (graceful degradation)
