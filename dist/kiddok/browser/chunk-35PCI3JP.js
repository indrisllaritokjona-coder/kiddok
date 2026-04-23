import {
  HttpClient,
  Injectable,
  __async,
  environment,
  firstValueFrom,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-SFGRG2UU.js";

// src/app/services/sync.service.ts
var SyncService = class _SyncService {
  constructor() {
    this.http = inject(HttpClient);
    this.offline = null;
    this.conflicts = signal(this.loadConflictsFromStorage(), ...ngDevMode ? [{ debugName: "conflicts" }] : (
      /* istanbul ignore next */
      []
    ));
    this.CONFLICTS_KEY = "kiddok_sync_conflicts";
  }
  setOfflineService(service) {
    this.offline = service;
  }
  getHeaders() {
    const token = localStorage.getItem("kiddok_access_token");
    return {
      headers: { Authorization: `Bearer ${token}` }
    };
  }
  getSyncQueueEntries() {
    return __async(this, null, function* () {
      if (!this.offline) {
        const { OfflineService } = yield import("./chunk-32ONGC76.js");
        const injector = window.__angularInjector__;
        if (injector) {
          this.offline = injector.get(OfflineService);
        }
      }
      if (!this.offline) {
        return [];
      }
      return this.offline.getSyncQueueEntries();
    });
  }
  syncPendingEntries() {
    return __async(this, null, function* () {
      const queueEntries = yield this.getSyncQueueEntries();
      const entries = queueEntries.map((entry) => ({
        entityType: entry.entity,
        action: entry.action,
        data: entry.body,
        localTimestamp: entry.timestamp
      }));
      return this.triggerFullSync(entries);
    });
  }
  triggerFullSync(entries) {
    return __async(this, null, function* () {
      if (entries.length === 0) {
        return { success: true, syncedCount: 0, failedCount: 0, conflicts: [] };
      }
      try {
        const result = yield firstValueFrom(this.http.post(`${environment.apiUrl}/sync`, { entries }, this.getHeaders()));
        if (result.conflicts?.length > 0) {
          for (const c of result.conflicts) {
            this.addConflict(c);
          }
        }
        return result;
      } catch (err) {
        console.error("[SyncService] triggerFullSync failed:", err);
        return { success: false, syncedCount: 0, failedCount: entries.length, conflicts: [] };
      }
    });
  }
  submitResolution(entityType, entityId, resolution, mergedData) {
    return __async(this, null, function* () {
      try {
        const body = {
          entityType,
          entityId,
          resolution,
          mergedData
        };
        const result = yield firstValueFrom(this.http.post(`${environment.apiUrl}/sync/resolve`, body, this.getHeaders()));
        return result.success;
      } catch (err) {
        console.error("[SyncService] submitResolution failed:", err);
        return false;
      }
    });
  }
  loadConflictsFromStorage() {
    try {
      const raw = localStorage.getItem(this.CONFLICTS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }
  saveConflictsToStorage(conflicts) {
    localStorage.setItem(this.CONFLICTS_KEY, JSON.stringify(conflicts));
  }
  addConflict(conflict) {
    const current = this.conflicts();
    const updated = [...current.filter((c) => c.entityId !== conflict.entityId), conflict];
    this.conflicts.set(updated);
    this.saveConflictsToStorage(updated);
  }
  /** Remove a conflict from local storage (after user resolves it) */
  dismissConflict(entityId) {
    const updated = this.conflicts().filter((c) => c.entityId !== entityId);
    this.conflicts.set(updated);
    this.saveConflictsToStorage(updated);
  }
  static {
    this.\u0275fac = function SyncService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SyncService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SyncService, factory: _SyncService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SyncService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();
export {
  SyncService
};
//# sourceMappingURL=chunk-35PCI3JP.js.map
