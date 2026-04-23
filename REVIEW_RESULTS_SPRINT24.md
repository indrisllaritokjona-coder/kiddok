# REVIEW_RESULTS_SPRINT24.md — Offline Support + Service Worker Caching

**Sprint:** 24 — Offline Support + Service Worker Caching
**Date:** 2026-04-23
**Reviewer:** kiddok-reviewer
**Repo:** `C:\Users\g_gus\Desktop\jona\kiddok`

---

## Summary

Sprint 24 delivers solid offline infrastructure: IndexedDB via OfflineService, Service Worker caching via ngsw-config.json, and a visual OfflineIndicatorComponent in the Shell. The build is clean (only budget warnings, no errors), and test coverage was 8/8 PASS. However, two bugs will cause runtime failures and should be addressed before merge.

---

## Critical Issues

### 1. `WifiOff` Icon Not Registered → Offline Indicator Will Not Show
**Severity:** High | **File:** `src/app/app.config.ts`

`WifiOff` is imported on line 48 but is NOT passed to `LucideAngularModule.pick()`. Only the icons listed in the `pick()` call are registered with the icon registry. The `OfflineIndicatorComponent` uses `lucide-icon name="wifi-off"`, which will silently fail to render — the banner will be blank (no icon) when offline.

**Fix:** Add `WifiOff` to the `pick()` call:
```typescript
LucideAngularModule.pick({
  // ... existing icons ...,
  WifiOff
})
```

---

### 2. `new OfflineService()` Instances Bypass DI — Data Written to One DB, Read from Another
**Severity:** High | **File:** `src/app/services/data.service.ts`

In `DataService`, all offline caching methods use dynamic import + `new OfflineService()`:

```typescript
private async cacheTemperaturesToOffline(entries: TemperatureEntry[]): Promise<void> {
  const { OfflineService } = await import('./offline.service');
  const svc = new OfflineService(); // ← bypasses DI
  await svc.saveTemperaturesToOffline(entries);
}
```

`OfflineService` uses `inject(HttpClient)`, `inject(DataService)`, etc. — it relies on Angular DI. `new OfflineService()` creates a fresh instance outside Angular's DI hierarchy. This means:
- The injected `http` client is not properly configured
- The `db` is a separate IndexedDB connection (different from the singleton instance used by the app at runtime)
- **Data saved via `new OfflineService()` may not exist when read via the real injected instance**

The same pattern appears in `cacheToOffline()` (line 820), `loadFromOffline()` (line 834), `cacheTemperaturesToOffline()`, `getOfflineTemperatures()`, `cacheGrowthToOffline()`, `getOfflineGrowth()`, `cacheVaccinesToOffline()`, `getOfflineVaccines()` — at least 10 call sites.

**Fix:** Inject `OfflineService` directly in `DataService`:
```typescript
private offlineService = inject(OfflineService);
```
Then call `this.offlineService.saveTemperaturesToOffline(entries)` directly, removing all `new OfflineService()` calls. This is safe because `OfflineService` is `providedIn: 'root'` — it's already a singleton.

**Note:** The same bug pattern also appears in `loadChildDetails()`:
```typescript
const notifSvc = new NotificationService();
```
This should also use DI: `inject(NotificationService)`.

---

## Medium Issues

### 3. No `OnDestroy` Hook in `OfflineService` — Event Listener Leak
**Severity:** Medium | **File:** `src/app/services/offline.service.ts`

`setupOnlineListeners()` adds `window.addEventListener('online')` and `'offline'` but no `ngOnDestroy()` removes them. When the app runs for a long session (or the service is repeatedly instantiated via the bug above), listeners accumulate.

**Fix:**
```typescript
import { OnDestroy } from '@angular/core';
export class OfflineService implements OnDestroy {
  // ...
  ngOnDestroy(): void {
    window.removeEventListener('online', this.onlineHandler);
    window.removeEventListener('offline', this.offlineHandler);
  }
}
```
Store references as bound methods.

---

### 4. `processSyncQueue` Has Race Condition — Sync Queue State May Be Stale
**Severity:** Low-Medium | **File:** `src/app/services/offline.service.ts`

In the sync loop, each entry is:
1. Deleted from DB
2. Re-added via `add()` (to preserve the entry for retry on failure)
3. HTTP request sent

If the process crashes between step 1 and step 2, the entry is permanently lost. Also, the remaining count is checked after the loop — but if an exception is thrown mid-loop, it's not caught, and `hasPendingSync` may be stale.

**Current workaround is intentional per test notes** — acceptable for v1 given the sync queue is a fallback. Document the caveat.

---

### 5. Build Budget Warning: Initial Bundle 346 kB Over Limit
**Severity:** Low | **File:** `angular.json`

The initial chunk is 846.23 kB (503.73 kB gzipped), over the 500 kB budget. This is non-blocking (only warnings), but if unchecked it will eventually block CI. Consider code-splitting or lazy-loading routes that aren't needed at startup.

---

## Items Passed

| Check | Detail |
|-------|--------|
| `ngsw-config.json` schema valid | All 3 groups, freshness strategy, correct timeout/maxAge/maxSize |
| IndexedDB stores | 7 stores confirmed with correct indexes (childId on temps/growth/vaccines/diary, timestamp on sync_queue) |
| `OfflineIndicatorComponent` OnPush | ✅ `ChangeDetectionStrategy.OnPush` |
| NgZone wrapper for online/offline events | ✅ Correct — without NgZone, Angular would not react to events |
| Sync queue ordering | ✅ Entries sorted by timestamp before replay |
| `ShellComponent` import + template | ✅ Import present, `<app-offline-indicator />` inside `<main>` |
| Service worker registration in `angular.json` | ✅ `"serviceWorker": "src/ngsw-config.json"` under `configurations.production` |
| Build succeeds | ✅ 9.983s, no errors |

---

## Recommendation

**Do not merge as-is.** Issues #1 and #2 are runtime bugs that will cause the offline banner to be broken and data to be silently lost. Fix them before the reviewer's approval.

**Fix priority:**
1. Add `WifiOff` to `LucideAngularModule.pick()` in `app.config.ts` (5 min fix)
2. Inject `OfflineService` into `DataService` and remove all `new OfflineService()` calls (15 min fix)
3. Add `OnDestroy` to `OfflineService` (5 min fix)

After fixes, rebuild and re-run tests. No new review required if tester confirms 8/8 still passing.