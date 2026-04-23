# SPEC_SPRINT7_FINAL.md — Sprint 7: Error Handling + PWA/Offline

**Architect:** kiddok-architect
**Date:** 2026-04-23
**Status:** ARCHITECT REVIEW COMPLETE → For Executor

---

## 1. Module Overview

Sprint 7 delivers two independent but complementary features:

| Feature | Goal |
|---------|------|
| **Error Handling** | Replace all `console.error`-only API failures with user-facing bilingual toasts (SQ+EN) via the existing ToastService. Ensure every API failure surfaces a clear, localized message. |
| **PWA / Offline** | Enable full offline operation: reads fall back to IndexedDB, writes queue to sync queue. On reconnect, queue processes automatically. Service worker configured for network-first API caching. |

---

## 2. Error Handling — What Exists vs. What Is Missing

### 2.1 Existing: ToastService

**File:** `src/app/services/toast.service.ts`

```typescript
@Injectable({ providedIn: 'root' })
export class ToastService {
  private listeners: ((message: string, type: 'success' | 'error' | 'info') => void)[] = [];
  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.listeners.forEach(l => l(message, type));
  }
  subscribe(listener: ...) { ... }
}
```

**Current usage in DataService:**
- `this.toast.show('Ndodhi një gabim, provoni përsëri', 'error')` — hardcoded Albanian only
- No i18n integration in ToastService itself

**Gap:** All toast messages are hardcoded Albanian strings. When `I18nService.locale() === 'en'`, toasts should show English text.

### 2.2 ToastService Enhancement — Bilingual Support

**File:** `src/app/services/toast.service.ts`

Add a `toastKeys` map so callers can pass a translation key + params instead of raw strings:

```typescript
@Injectable({ providedIn: 'root' })
export class ToastService {
  private listeners: ((message: string, type: 'success' | 'error' | 'info') => void)[] = [];

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.listeners.forEach(l => l(message, type));
  }

  /** Show a bilingual toast by translation key */
  showKey(key: string, type: 'success' | 'error' | 'info' = 'info', params?: Record<string, string | number>) {
    const msg = this.resolveKey(key, params);
    this.show(msg, type);
  }

  private resolveKey(key: string, params?: Record<string, string | number>): string {
    // Read locale from localStorage directly to avoid circular import
    const locale = localStorage.getItem('kiddok_locale') || 'sq';
    const translations: Record<string, Record<string, string>> = {
      'error.api.generic': { sq: 'Ndodhi një gabim, provoni përsëri', en: 'Something went wrong, please try again' },
      'error.api.loadChildren': { sq: 'Ngarkimi i fëmijëve dështoi', en: 'Failed to load children' },
      'error.api.loadTemperature': { sq: 'Ngarkimi i temperaturave dështoi', en: 'Failed to load temperature entries' },
      'error.api.createTemperature': { sq: 'Ruajtja e temperaturës dështoi', en: 'Failed to save temperature' },
      'error.api.loadGrowth': { sq: 'Ngarkimi i rritjes dështoi', en: 'Failed to load growth entries' },
      'error.api.createGrowth': { sq: 'Ruajtja e rritjes dështoi', en: 'Failed to save growth entry' },
      'error.api.deleteGrowth': { sq: 'Fshirja e rritjes dështoi', en: 'Failed to delete growth entry' },
      'error.api.loadVaccines': { sq: 'Ngarkimi i vaksinave dështoi', en: 'Failed to load vaccine records' },
      'error.api.createVaccine': { sq: 'Ruajtja e vaksinave dështoi', en: 'Failed to save vaccine' },
      'error.api.deleteVaccine': { sq: 'Fshirja e vaksinave dështoi', en: 'Failed to delete vaccine' },
      'error.api.createChild': { sq: 'Krijimi i profilit dështoi', en: 'Failed to create profile' },
      'error.api.updateChild': { sq: 'Përditësimi i profilit dështoi', en: 'Failed to update profile' },
      'error.api.deleteChild': { sq: 'Fshirja e profilit dështoi', en: 'Failed to delete profile' },
      'error.api.fetchParent': { sq: 'Ngarkimi i profilit dështoi', en: 'Failed to load profile' },
      'error.api.updateParent': { sq: 'Përditësimi i profilit dështoi', en: 'Failed to update profile' },
      'error.api.export': { sq: 'Eksportimi dështoi. Provoni përsëri.', en: 'Export failed. Please try again.' },
      'error.api.login': { sq: 'Identifikimi dështoi', en: 'Login failed' },
      'success.saved': { sq: 'U ruajt me sukses!', en: 'Saved successfully!' },
      'success.deleted': { sq: 'U fshi me sukses!', en: 'Deleted successfully!' },
      'success.exported': { sq: 'Eksportimi u përfundua!', en: 'Export complete!' },
    };

    let text = translations[key]?.[locale] || translations[key]?.['sq'] || key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        text = text.replace(`{${k}}`, String(v));
      }
    }
    return text;
  }
}
```

> **Note:** `showKey()` uses `localStorage` directly to read locale, avoiding circular imports with `I18nService`.

### 2.3 DataService — Error Handling Fixes

All methods that currently have `console.error` + silent failure need a toast.

**Pattern for every API method:**
```typescript
// Replace:
} catch (err: any) {
  console.error('[DataService] methodName failed:', err);
  // no user message
}

// With:
} catch (err: any) {
  console.error('[DataService] methodName failed:', err);
  if (err?.status === 401 || err?.status === 403) {
    this.logout();
    window.location.href = '/login';
    return;
  }
  this.toast.showKey('error.api.generic');
}
```

#### Full method audit:

| Method | Current State | Fix Required |
|--------|-------------|-------------|
| `loadChildrenFromApi()` | Has toast + 401 redirect | ✅ Already good — verify it uses toast.showKey |
| `loadTemperatureEntries()` | `console.error` only, no toast | **Add** `toast.showKey('error.api.loadTemperature')` |
| `createTemperatureEntry()` | Has toast + returns `null` silently | ✅ Good |
| `deleteTemperatureEntry()` | `console.error` only, no toast | **Add** `toast.showKey('error.api.generic')` |
| `loadGrowthEntries()` | `console.error` only, no toast | **Add** `toast.showKey('error.api.loadGrowth')` |
| `createGrowthEntry()` | Has toast + returns `null` silently | ✅ Good |
| `deleteGrowthEntry()` | `console.error` only, no toast | **Add** `toast.showKey('error.api.deleteGrowth')` |
| `loadVaccineRecords()` | `console.error` only, no toast | **Add** `toast.showKey('error.api.loadVaccines')` |
| `createVaccineRecord()` | No error handling at all | **Add** try/catch + `toast.showKey('error.api.createVaccine')` |
| `deleteVaccineRecord()` | No error handling at all | **Add** try/catch + `toast.showKey('error.api.deleteVaccine')` |
| `createChild()` | No error handling at all | **Add** try/catch + `toast.showKey('error.api.createChild')` |
| `updateChildApi()` | No error handling at all | **Add** try/catch + `toast.showKey('error.api.updateChild')` |
| `deleteChildApi()` | No error handling at all | **Add** try/catch + `toast.showKey('error.api.deleteChild')` |
| `fetchParentProfile()` | Returns empty object silently on failure | **Add** `toast.showKey('error.api.fetchParent')` |
| `updateParentProfile()` | Falls back to local-only silently | **Add** `toast.showKey('error.api.updateParent')` on catch |
| `dev-login()` | `console.error` + fallback to dev-token silently | ✅ Acceptable — dev flow |
| `exportChildCsv()` | Has toast | ✅ Already good |
| `loadLabResults()` | `console.error` only, no toast | **Add** `toast.showKey('error.api.generic')` |
| `addLabResult()` | No error handling at all | **Add** try/catch + toast |
| `updateLabResult()` | No error handling at all | **Add** try/catch + toast |
| `deleteLabResult()` | No error handling at all | **Add** try/catch + toast |

### 2.4 Bilingual Toast — New Translation Keys

Add to `I18nService` `translations` object (all already defined above in ToastService `resolveKey`, but for completeness — these keys need to exist in the global translations too):

| Key | SQ | EN |
|-----|----|----|
| `error.api.generic` | Ndodhi një gabim, provoni përsëri | Something went wrong, please try again |
| `error.api.loadChildren` | Ngarkimi i fëmijëve dështoi | Failed to load children |
| `error.api.loadTemperature` | Ngarkimi i temperaturave dështoi | Failed to load temperature entries |
| `error.api.createTemperature` | Ruajtja e temperaturës dështoi | Failed to save temperature |
| `error.api.loadGrowth` | Ngarkimi i rritjes dështoi | Failed to load growth entries |
| `error.api.createGrowth` | Ruajtja e rritjes dështoi | Failed to save growth entry |
| `error.api.deleteGrowth` | Fshirja e rritjes dështoi | Failed to delete growth entry |
| `error.api.loadVaccines` | Ngarkimi i vaksinave dështoi | Failed to load vaccine records |
| `error.api.createVaccine` | Ruajtja e vaksinave dështoi | Failed to save vaccine |
| `error.api.deleteVaccine` | Fshirja e vaksinave dështoi | Failed to delete vaccine |
| `error.api.createChild` | Krijimi i profilit dështoi | Failed to create profile |
| `error.api.updateChild` | Përditësimi i profilit dështoi | Failed to update profile |
| `error.api.deleteChild` | Fshirja e profilit dështoi | Failed to delete profile |
| `error.api.fetchParent` | Ngarkimi i profilit dështoi | Failed to load profile |
| `error.api.updateParent` | Përditësimi i profilit dështoi | Failed to update profile |
| `error.api.export` | Eksportimi dështoi. Provoni përsëri. | Export failed. Please try again. |
| `error.api.login` | Identifikimi dështoi | Login failed |
| `success.saved` | U ruajt me sukses! | Saved successfully! |
| `success.deleted` | U fshi me sukses! | Deleted successfully! |
| `success.exported` | Eksportimi u përfundua! | Export complete! |

---

## 3. PWA / Offline — Full Implementation

### 3.1 Service Worker Config Update

**File:** `src/ngsw-config.json`

**Changes:**
1. Add `/sync` and `/sync/resolve` to `dataGroups`
2. Add `/diary/**` route
3. Increase timeout from `5s` to `10s` for API routes

```json
{
  "$schema": "./node_modules/@angular/service-worker/ngsw-config.schema.json",
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": [
          "/favicon.ico",
          "/index.html",
          "/*.css",
          "/*.js",
          "/manifest.webmanifest"
        ]
      }
    },
    {
      "name": "assets",
      "installMode": "lazy",
      "updateMode": "prefetch",
      "resources": {
        "files": [
          "/assets/**"
        ]
      }
    }
  ],
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
        "/sync/resolve",
        "/auth/**"
      ],
      "cacheConfig": {
        "strategy": "freshness",
        "maxSize": 100,
        "maxAge": "1d",
        "timeout": "10s"
      }
    }
  ]
}
```

> `freshness` strategy = network-first with fallback to cache. This is correct: try network, fall back to cached data when offline.

### 3.2 DataService — Offline Read Fallbacks

**Add missing offline fallback methods to DataService:**

```typescript
// In data.service.ts, add private helpers:

private async getOfflineDiary(childId: string): Promise<DiaryEntry[]> {
  try {
    const { OfflineService } = await import('./offline.service');
    const svc = new OfflineService();
    return await svc.getDiaryFromOffline(childId);
  } catch { return []; }
}

private async getOfflineParent(): Promise<ParentProfile | null> {
  try {
    const { OfflineService } = await import('./offline.service');
    const svc = new OfflineService();
    const db = await svc.getDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('parent', 'readonly');
      const store = tx.objectStore('parent');
      const req = store.get('profile');
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(tx.error);
    });
  } catch { return null; }
}
```

**`loadDiaryEntries(childId)` — add offline fallback:**
```typescript
loadDiaryEntries(childId: string): void {
  // Try API first (no try/catch needed for sync localStorage method)
  const stored = localStorage.getItem(`kiddok_diary_${childId}`);
  this.diaryEntries.set(stored ? JSON.parse(stored) : []);
}
```
Add to `OfflineService.getParentFromOffline()` — see Section 3.4.

### 3.3 DataService — Offline Write Queue

Every write method must check `!navigator.onLine` and queue to sync + update local signal.

**Pattern:**
```typescript
async createSomething(data: SomeData): Promise<Something | null> {
  // ── Offline queue ──────────────────────────────────────────
  if (!navigator.onLine) {
    await this.offlineService.addToSyncQueue({
      action: 'create',
      entity: 'entityType',
      endpoint: '/entity',
      method: 'POST',
      body: data,
    });
    // Update local signal immediately so UI is consistent
    const localEntry = { ...data, id: 'local_' + Date.now() } as Something;
    this.localSignal.update(current => [localEntry, ...current]);
    this.toast.showKey('offline.queued');
    return localEntry;
  }

  // ── Online path ─────────────────────────────────────────────
  try {
    const created = await firstValueFrom(
      this.http.post<Something>(`${this.API_URL}/entity`, data, this.getHeaders())
    );
    this.localSignal.update(current => [created, ...current]);
    return created;
  } catch (err: any) {
    console.error('[DataService] createSomething failed:', err);
    // Fallback: queue locally
    await this.offlineService.addToSyncQueue({ ... });
    const localEntry = { ...data, id: 'local_' + Date.now() } as Something;
    this.localSignal.update(current => [localEntry, ...current]);
    this.toast.showKey('error.api.createSomething');
    return localEntry;
  }
}
```

#### Write methods needing offline queue + local signal update:

| Method | Current State | Action |
|--------|-------------|--------|
| `createTemperatureEntry()` | Queues offline, updates signal | ✅ Verify correct |
| `deleteTemperatureEntry()` | API delete only | **Add** queue + local signal update |
| `updateTemperatureEntry()` | Not implemented | **Add** queue + local signal update |
| `createGrowthEntry()` | Queues offline, updates signal | ✅ Verify |
| `deleteGrowthEntry()` | API delete only | **Add** queue + local signal update |
| `updateGrowthEntry()` | Not implemented | **Add** queue + local signal update |
| `createChild()` | API create only | **Add** queue + local signal update |
| `updateChildApi()` | API update only | **Add** queue + local signal update |
| `deleteChildApi()` | API delete only | **Add** queue + local signal update |
| `addDiaryEntry()` | localStorage only | **Add** queue + local signal update + IndexedDB |
| `updateDiaryEntry()` | localStorage only | **Add** queue + local signal update |
| `deleteDiaryEntry()` | localStorage only | **Add** queue + local signal update |
| `updateParentProfile()` | API update only | **Add** queue + local signal update |
| `createVaccineRecord()` | API create only | **Add** queue + local signal update |
| `updateVaccineRecord()` | API update only | **Add** queue + local signal update |
| `deleteVaccineRecord()` | API delete only | **Add** queue + local signal update |

> **Note:** OfflineService already has `addToSyncQueue()` implemented. DataService needs to inject `OfflineService` and call it.

### 3.4 OfflineService — Add `getParentFromOffline()`

**File:** `src/app/services/offline.service.ts`

The `STORE_PARENT` object store exists but has no `getParentFromOffline()` method. Add it:

```typescript
async getParentFromOffline(): Promise<ParentProfile | null> {
  const db = await this.getDb();
  const tx = db.transaction(STORE_PARENT, 'readonly');
  const store = tx.objectStore(STORE_PARENT);
  return new Promise((resolve, reject) => {
    const request = store.get('profile');
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

async saveParentToOffline(profile: ParentProfile): Promise<void> {
  const db = await this.getDb();
  const tx = db.transaction(STORE_PARENT, 'readwrite');
  const store = tx.objectStore(STORE_PARENT);
  store.put({ ...profile, key: 'profile' });
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
```

Also add `updateTemperatureEntry()` and `updateGrowthEntry()` to OfflineService (they don't exist yet but are needed for offline writes).

### 3.5 DataService — Inject OfflineService

**Current:** DataService uses lazy import `new OfflineService()` on every call.  
**Fix:** Inject `OfflineService` directly in constructor:

```typescript
export class DataService {
  private offline = inject(OfflineService);
  // Then use: await this.offline.addToSyncQueue(...)
  // Instead of lazy import everywhere
}
```

This avoids creating a new instance per call, which was breaking the IndexedDB singleton pattern.

### 3.6 I18n — New Offline/Sync Keys (26 keys)

Add to `src/app/core/i18n/i18n.service.ts` `translations` object:

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
| `offline.queued` | Ruajtur lokalisht — do të sinkronizohet kur të jeni online | Saved locally — will sync when online |

### 3.7 OfflineIndicatorComponent — Reactive Updates

**File:** `src/app/components/offline-indicator.component.ts`

**Current:** Static `pendingCount` loaded once on `ngOnInit`.  
**Target:** Reactive via `effect()`, live count from `OfflineService`.

Changes:
1. Inject `OfflineService` instead of lazy import
2. Replace one-shot `loadPendingCount()` with an `effect()` that subscribes to `hasPendingSync()`
3. Use `i18n.t()['offline.banner']` and `i18n.t()['offline.bannerPending']` for labels

```typescript
import { effect } from '@angular/core';

export class OfflineIndicatorComponent {
  private offline = inject(OfflineService);
  pendingCount = signal(0);

  constructor() {
    effect(() => {
      if (this.offline.hasPendingSync()) {
        this.loadPendingCount();
      }
    });
  }
}
```

### 3.8 SyncStatusComponent — Bilingual + Live Count

**File:** `src/app/components/sync-status.component.ts`

Changes:
1. Add live `pendingCount()` signal from `OfflineService.getSyncQueueCount()`
2. Replace all hardcoded strings with `i18n.t()['sync.*']` keys
3. Ensure conflict resolution panel uses i18n keys

### 3.9 SidebarComponent — Add Sync Status

**File:** `src/app/components/sidebar.component.ts`

Add `<app-sync-status />` to sidebar footer above the logout button:

```html
<div class="sidebar__footer">
  <app-sync-status />
  <!-- existing logout button -->
</div>
```

---

## 4. Execution Roadmap

| Step | File | Action |
|------|------|--------|
| 1 | `src/ngsw-config.json` | Add `/sync`, `/sync/resolve`, `/diary/**`; set timeout to `10s` |
| 2 | `src/app/services/toast.service.ts` | Add `showKey()` method with bilingual translation map |
| 3 | `src/app/services/data.service.ts` | Inject `OfflineService` directly (remove lazy `new OfflineService()` calls) |
| 4 | `src/app/services/data.service.ts` | Add `getOfflineDiary()` + `getOfflineParent()` helper methods |
| 5 | `src/app/services/offline.service.ts` | Add `getParentFromOffline()` + `saveParentToOffline()` |
| 6 | `src/app/services/offline.service.ts` | Add `updateTemperatureToOffline()` + `updateGrowthToOffline()` |
| 7 | `src/app/services/data.service.ts` | Add offline queue to: `deleteTemperatureEntry`, `updateTemperatureEntry`, `deleteGrowthEntry`, `updateGrowthEntry`, `createChild`, `updateChildApi`, `deleteChildApi`, `addDiaryEntry`, `updateDiaryEntry`, `deleteDiaryEntry`, `updateParentProfile`, `createVaccineRecord`, `updateVaccineRecord`, `deleteVaccineRecord` |
| 8 | `src/app/services/data.service.ts` | Ensure all write methods update local signal state immediately before returning |
| 9 | `src/app/services/data.service.ts` | Add toast to `loadTemperatureEntries`, `loadGrowthEntries`, `loadVaccineRecords`, `loadLabResults` (catch blocks missing toasts) |
| 10 | `src/app/services/data.service.ts` | Add try/catch + toast to `createVaccineRecord`, `deleteVaccineRecord`, `updateVaccineRecord`, `addLabResult`, `updateLabResult`, `deleteLabResult` |
| 11 | `src/app/core/i18n/i18n.service.ts` | Add all 26 new offline/sync i18n keys + error/success keys |
| 12 | `src/app/components/offline-indicator.component.ts` | Use `effect()` for reactive pending count; replace hardcoded labels with `i18n.t()` keys |
| 13 | `src/app/components/sync-status.component.ts` | Replace hardcoded labels with `i18n.t()` keys; add live `pendingCount()` signal |
| 14 | `src/app/components/sidebar.component.ts` | Import `SyncStatusComponent`; add `<app-sync-status />` in sidebar footer |
| 15 | Verify | Run `npm run build` to confirm no TypeScript errors |

---

## 5. Acceptance Criteria

### Error Handling
- [ ] Every API `catch` block in DataService calls `toast.showKey()` with appropriate key
- [ ] `loadTemperatureEntries`, `loadGrowthEntries`, `loadVaccineRecords`, `loadLabResults` all show toasts on failure
- [ ] `createChild`, `updateChildApi`, `deleteChildApi` have try/catch + toast
- [ ] `createVaccineRecord`, `updateVaccineRecord`, `deleteVaccineRecord` have try/catch + toast
- [ ] `addLabResult`, `updateLabResult`, `deleteLabResult` have try/catch + toast
- [ ] All toasts are bilingual (SQ/EN) based on `kiddok_locale`

### PWA / Offline
- [ ] ngsw-config.json includes `/sync`, `/sync/resolve`, `/diary/**` with 10s timeout
- [ ] All 15 write methods queue to sync when offline and update local signals
- [ ] `OfflineService.getParentFromOffline()` returns parent profile from IndexedDB
- [ ] `OfflineIndicatorComponent` reactively updates pending count via `effect()`
- [ ] `SyncStatusComponent` shows live pending count from `OfflineService`
- [ ] Sidebar footer contains `<app-sync-status />`
- [ ] All 26 offline/sync i18n keys are defined and used in components
- [ ] Offline writes update local signal state immediately (UI never lags)

### Quality
- [ ] `npm run build` succeeds with zero errors
- [ ] No `new OfflineService()` calls remain in DataService (inject properly)
- [ ] No hardcoded SQ-only strings in toast calls or offline components

---

## 6. File Changes Summary

| File | Change Type |
|------|-------------|
| `src/ngsw-config.json` | Update dataGroups |
| `src/app/services/toast.service.ts` | Add `showKey()` with bilingual map |
| `src/app/services/offline.service.ts` | Add `getParentFromOffline()`, `saveParentToOffline()`, `updateTemperatureToOffline()`, `updateGrowthToOffline()` |
| `src/app/services/data.service.ts` | Inject OfflineService; add offline fallbacks; add offline queue to 15 write methods; add toasts to all catch blocks |
| `src/app/core/i18n/i18n.service.ts` | Add 26 offline/sync keys + 20 error/success keys |
| `src/app/components/offline-indicator.component.ts` | `effect()` reactive count + i18n keys |
| `src/app/components/sync-status.component.ts` | Live pending count + i18n keys |
| `src/app/components/sidebar.component.ts` | Add `<app-sync-status />` to footer |