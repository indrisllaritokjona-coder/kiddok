import {
  DataService,
  ToastService
} from "./chunk-J6KXBRJB.js";
import {
  HttpClient,
  Injectable,
  NgZone,
  __async,
  __spreadProps,
  __spreadValues,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-SFGRG2UU.js";

// src/app/services/offline.service.ts
var DB_NAME = "kiddok_offline";
var DB_VERSION = 1;
var STORE_CHILDREN = "children";
var STORE_TEMPERATURES = "temperatures";
var STORE_GROWTH = "growth";
var STORE_VACCINES = "vaccines";
var STORE_DIARY = "diary";
var STORE_PARENT = "parent";
var STORE_SYNC_QUEUE = "sync_queue";
var OfflineService = class _OfflineService {
  getSyncServiceAsync() {
    return __async(this, null, function* () {
      if (this._syncService)
        return this._syncService;
      const injector = window.__angularInjector__;
      if (injector) {
        const { SyncService } = yield import("./chunk-N74Y4VSB.js");
        this._syncService = injector.get(SyncService);
      }
      if (!this._syncService) {
        throw new Error("SyncService not available \u2014 ensure __angularInjector__ is set");
      }
      return this._syncService;
    });
  }
  constructor() {
    this.http = inject(HttpClient);
    this.dataService = inject(DataService);
    this.toast = inject(ToastService);
    this.ngZone = inject(NgZone);
    this._syncService = null;
    this.isOnline = signal(navigator.onLine, ...ngDevMode ? [{ debugName: "isOnline" }] : (
      /* istanbul ignore next */
      []
    ));
    this.hasPendingSync = signal(false, ...ngDevMode ? [{ debugName: "hasPendingSync" }] : (
      /* istanbul ignore next */
      []
    ));
    this.db = null;
    this.initDb();
    this.setupOnlineListeners();
  }
  // ─── IndexedDB Setup ──────────────────────────────────────────
  initDb() {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          this.db = request.result;
          resolve();
        };
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(STORE_CHILDREN)) {
            db.createObjectStore(STORE_CHILDREN, { keyPath: "id" });
          }
          if (!db.objectStoreNames.contains(STORE_TEMPERATURES)) {
            const tempStore = db.createObjectStore(STORE_TEMPERATURES, { keyPath: "id" });
            tempStore.createIndex("childId", "childId", { unique: false });
          }
          if (!db.objectStoreNames.contains(STORE_GROWTH)) {
            const growthStore = db.createObjectStore(STORE_GROWTH, { keyPath: "id" });
            growthStore.createIndex("childId", "childId", { unique: false });
          }
          if (!db.objectStoreNames.contains(STORE_VACCINES)) {
            const vaccineStore = db.createObjectStore(STORE_VACCINES, { keyPath: "id" });
            vaccineStore.createIndex("childId", "childId", { unique: false });
          }
          if (!db.objectStoreNames.contains(STORE_DIARY)) {
            const diaryStore = db.createObjectStore(STORE_DIARY, { keyPath: "id" });
            diaryStore.createIndex("childId", "childId", { unique: false });
          }
          if (!db.objectStoreNames.contains(STORE_PARENT)) {
            db.createObjectStore(STORE_PARENT, { keyPath: "key" });
          }
          if (!db.objectStoreNames.contains(STORE_SYNC_QUEUE)) {
            const syncStore = db.createObjectStore(STORE_SYNC_QUEUE, { keyPath: "id", autoIncrement: true });
            syncStore.createIndex("timestamp", "timestamp", { unique: false });
          }
        };
      });
    });
  }
  getDb() {
    return __async(this, null, function* () {
      if (this.db)
        return this.db;
      yield this.initDb();
      return this.db;
    });
  }
  // ─── Online/Offline Detection ─────────────────────────────────
  setupOnlineListeners() {
    window.addEventListener("online", () => {
      this.ngZone.run(() => {
        this.isOnline.set(true);
        this.toast.show(this.isSq() ? "Jeni online! Duke sinkronizuar t\xEB dh\xEBnat..." : "You are online! Syncing data...", "success");
        this.processSyncQueue();
      });
    });
    window.addEventListener("offline", () => {
      this.ngZone.run(() => {
        this.isOnline.set(false);
        this.toast.show(this.isSq() ? "Jeni offline. T\xEB dh\xEBnat do t\xEB ruhen lokalisht." : "You are offline. Data will be saved locally.", "info");
      });
    });
  }
  isSq() {
    try {
      const locale = localStorage.getItem("kiddok_locale") || "sq";
      return locale === "sq";
    } catch (e) {
      return true;
    }
  }
  // ─── Children ─────────────────────────────────────────────────
  saveChildrenToOffline(children) {
    return __async(this, null, function* () {
      const db = yield this.getDb();
      const tx = db.transaction(STORE_CHILDREN, "readwrite");
      const store = tx.objectStore(STORE_CHILDREN);
      store.clear();
      for (const child of children) {
        store.put(child);
      }
      return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    });
  }
  getChildrenFromOffline() {
    return __async(this, null, function* () {
      const db = yield this.getDb();
      const tx = db.transaction(STORE_CHILDREN, "readonly");
      const store = tx.objectStore(STORE_CHILDREN);
      return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }
  // ─── Temperature Entries ──────────────────────────────────────
  saveTemperaturesToOffline(entries) {
    return __async(this, null, function* () {
      const db = yield this.getDb();
      const tx = db.transaction(STORE_TEMPERATURES, "readwrite");
      const store = tx.objectStore(STORE_TEMPERATURES);
      store.clear();
      for (const entry of entries) {
        store.put(entry);
      }
      return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    });
  }
  getTemperaturesFromOffline(childId) {
    return __async(this, null, function* () {
      const db = yield this.getDb();
      const tx = db.transaction(STORE_TEMPERATURES, "readonly");
      const store = tx.objectStore(STORE_TEMPERATURES);
      const index = store.index("childId");
      return new Promise((resolve, reject) => {
        const request = index.getAll(childId);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }
  // ─── Growth Entries ───────────────────────────────────────────
  saveGrowthToOffline(entries) {
    return __async(this, null, function* () {
      const db = yield this.getDb();
      const tx = db.transaction(STORE_GROWTH, "readwrite");
      const store = tx.objectStore(STORE_GROWTH);
      store.clear();
      for (const entry of entries) {
        store.put(entry);
      }
      return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    });
  }
  getGrowthFromOffline(childId) {
    return __async(this, null, function* () {
      const db = yield this.getDb();
      const tx = db.transaction(STORE_GROWTH, "readonly");
      const store = tx.objectStore(STORE_GROWTH);
      const index = store.index("childId");
      return new Promise((resolve, reject) => {
        const request = index.getAll(childId);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }
  // ─── Vaccine Records ──────────────────────────────────────────
  saveVaccinesToOffline(records) {
    return __async(this, null, function* () {
      const db = yield this.getDb();
      const tx = db.transaction(STORE_VACCINES, "readwrite");
      const store = tx.objectStore(STORE_VACCINES);
      store.clear();
      for (const record of records) {
        store.put(record);
      }
      return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    });
  }
  getVaccinesFromOffline(childId) {
    return __async(this, null, function* () {
      const db = yield this.getDb();
      const tx = db.transaction(STORE_VACCINES, "readonly");
      const store = tx.objectStore(STORE_VACCINES);
      const index = store.index("childId");
      return new Promise((resolve, reject) => {
        const request = index.getAll(childId);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }
  // ─── Diary Entries ───────────────────────────────────────────
  saveDiaryToOffline(entries) {
    return __async(this, null, function* () {
      const db = yield this.getDb();
      const tx = db.transaction(STORE_DIARY, "readwrite");
      const store = tx.objectStore(STORE_DIARY);
      store.clear();
      for (const entry of entries) {
        store.put(entry);
      }
      return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    });
  }
  getDiaryFromOffline(childId) {
    return __async(this, null, function* () {
      const db = yield this.getDb();
      const tx = db.transaction(STORE_DIARY, "readonly");
      const store = tx.objectStore(STORE_DIARY);
      const index = store.index("childId");
      return new Promise((resolve, reject) => {
        const request = index.getAll(childId);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }
  // ─── Sync Queue ───────────────────────────────────────────────
  getSyncQueueEntries() {
    return __async(this, null, function* () {
      const db = yield this.getDb();
      const tx = db.transaction(STORE_SYNC_QUEUE, "readonly");
      const store = tx.objectStore(STORE_SYNC_QUEUE);
      return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }
  addToSyncQueue(entry) {
    return __async(this, null, function* () {
      const db = yield this.getDb();
      const tx = db.transaction(STORE_SYNC_QUEUE, "readwrite");
      const store = tx.objectStore(STORE_SYNC_QUEUE);
      const queueEntry = __spreadProps(__spreadValues({}, entry), { timestamp: Date.now() });
      store.add(queueEntry);
      return new Promise((resolve, reject) => {
        tx.oncomplete = () => {
          this.hasPendingSync.set(true);
          resolve();
        };
        tx.onerror = () => reject(tx.error);
      });
    });
  }
  processSyncQueue() {
    return __async(this, null, function* () {
      if (!navigator.onLine)
        return;
      const db = yield this.getDb();
      const tx = db.transaction(STORE_SYNC_QUEUE, "readonly");
      const store = tx.objectStore(STORE_SYNC_QUEUE);
      const entries = yield new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
      if (entries.length === 0) {
        this.hasPendingSync.set(false);
        return;
      }
      const syncEntries = entries.sort((a, b) => a.timestamp - b.timestamp).map((entry) => ({
        entityType: entry.entity,
        action: entry.action,
        data: entry.body,
        localTimestamp: entry.timestamp
      }));
      try {
        const result = yield (yield this.getSyncServiceAsync()).triggerFullSync(syncEntries);
        if (result.success || result.conflicts.length > 0) {
          const deleteTx = db.transaction(STORE_SYNC_QUEUE, "readwrite");
          const deleteStore = deleteTx.objectStore(STORE_SYNC_QUEUE);
          for (const entry of entries) {
            if (entry.id !== void 0)
              deleteStore.delete(entry.id);
          }
          if (result.conflicts.length > 0) {
            const conflictIds = new Set(result.conflicts.map((c) => c.entityId));
            this.toast.show(this.isSq() ? `${result.conflicts.length} konflikt u.detektua \u2014 rishikoni manualisht` : `${result.conflicts.length} conflict(s) detected \u2014 review manually`, "info");
          }
          const remaining = result.failedCount;
          this.hasPendingSync.set(remaining > 0);
          const successCount = result.syncedCount;
          if (successCount > 0) {
            this.toast.show(this.isSq() ? `${successCount} t\xEB dh\xEBna u sinkronizuan!` : `${successCount} items synced!`, "success");
          }
        } else {
          this.hasPendingSync.set(true);
          this.toast.show(this.isSq() ? "Sinkronizimi d\xEBshtoi. Do t\xEB provohet p\xEBrs\xEBri." : "Sync failed. Will retry automatically.", "error");
        }
      } catch (e) {
        this.hasPendingSync.set(true);
      }
    });
  }
  getSyncQueueCount() {
    return __async(this, null, function* () {
      const db = yield this.getDb();
      const tx = db.transaction(STORE_SYNC_QUEUE, "readonly");
      const store = tx.objectStore(STORE_SYNC_QUEUE);
      return new Promise((resolve, reject) => {
        const request = store.count();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }
  // ─── Cache All Child Data ─────────────────────────────────────
  cacheAllData() {
    return __async(this, null, function* () {
      try {
        yield this.saveChildrenToOffline(this.dataService.children());
        const activeChildId = this.dataService.activeChildId();
        if (activeChildId) {
          yield this.saveTemperaturesToOffline(this.dataService.temperatureEntries());
          yield this.saveGrowthToOffline(this.dataService.growthEntries());
          yield this.saveVaccinesToOffline(this.dataService.vaccineRecords());
          yield this.saveDiaryToOffline(this.dataService.diaryEntries());
        }
      } catch (err) {
        console.error("[OfflineService] cacheAllData failed:", err);
      }
    });
  }
  // ─── Load from Offline (fallback when API fails) ───────────────
  loadCachedChildData(childId) {
    return __async(this, null, function* () {
      const [temps, growth, vaccines, diary] = yield Promise.all([
        this.getTemperaturesFromOffline(childId),
        this.getGrowthFromOffline(childId),
        this.getVaccinesFromOffline(childId),
        this.getDiaryFromOffline(childId)
      ]);
      if (temps.length > 0)
        this.dataService.temperatureEntries.set(temps);
      if (growth.length > 0)
        this.dataService.growthEntries.set(growth);
      if (vaccines.length > 0)
        this.dataService.vaccineRecords.set(vaccines);
      if (diary.length > 0)
        this.dataService.diaryEntries.set(diary);
    });
  }
  loadCachedChildren() {
    return __async(this, null, function* () {
      return this.getChildrenFromOffline();
    });
  }
  static {
    this.\u0275fac = function OfflineService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _OfflineService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _OfflineService, factory: _OfflineService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OfflineService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();

export {
  OfflineService
};
//# sourceMappingURL=chunk-SQH2D3Y5.js.map
