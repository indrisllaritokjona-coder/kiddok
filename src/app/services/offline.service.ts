import { Injectable, signal, inject, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { DataService, ChildProfile, TemperatureEntry, GrowthEntry, VaccineRecord, DiaryEntry } from './data.service';
import { ToastService } from './toast.service';

const DB_NAME = 'kiddok_offline';
const DB_VERSION = 1;
const STORE_CHILDREN = 'children';
const STORE_TEMPERATURES = 'temperatures';
const STORE_GROWTH = 'growth';
const STORE_VACCINES = 'vaccines';
const STORE_DIARY = 'diary';
const STORE_PARENT = 'parent';
const STORE_SYNC_QUEUE = 'sync_queue';

export interface SyncQueueEntry {
  id?: number;
  action: 'create' | 'update' | 'delete';
  entity: 'temperature' | 'growth' | 'vaccine' | 'diary';
  endpoint: string;
  method: 'POST' | 'PATCH' | 'DELETE';
  body: any;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class OfflineService {
  private http = inject(HttpClient);
  private dataService = inject(DataService);
  private toast = inject(ToastService);
  private ngZone = inject(NgZone);

  isOnline = signal(navigator.onLine);
  hasPendingSync = signal(false);
  private db: IDBDatabase | null = null;

  constructor() {
    this.initDb();
    this.setupOnlineListeners();
  }

  // ─── IndexedDB Setup ──────────────────────────────────────────

  private async initDb(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Children store
        if (!db.objectStoreNames.contains(STORE_CHILDREN)) {
          db.createObjectStore(STORE_CHILDREN, { keyPath: 'id' });
        }

        // Temperature entries store (indexed by childId)
        if (!db.objectStoreNames.contains(STORE_TEMPERATURES)) {
          const tempStore = db.createObjectStore(STORE_TEMPERATURES, { keyPath: 'id' });
          tempStore.createIndex('childId', 'childId', { unique: false });
        }

        // Growth entries store (indexed by childId)
        if (!db.objectStoreNames.contains(STORE_GROWTH)) {
          const growthStore = db.createObjectStore(STORE_GROWTH, { keyPath: 'id' });
          growthStore.createIndex('childId', 'childId', { unique: false });
        }

        // Vaccine records store (indexed by childId)
        if (!db.objectStoreNames.contains(STORE_VACCINES)) {
          const vaccineStore = db.createObjectStore(STORE_VACCINES, { keyPath: 'id' });
          vaccineStore.createIndex('childId', 'childId', { unique: false });
        }

        // Diary entries store (indexed by childId)
        if (!db.objectStoreNames.contains(STORE_DIARY)) {
          const diaryStore = db.createObjectStore(STORE_DIARY, { keyPath: 'id' });
          diaryStore.createIndex('childId', 'childId', { unique: false });
        }

        // Parent profile store
        if (!db.objectStoreNames.contains(STORE_PARENT)) {
          db.createObjectStore(STORE_PARENT, { keyPath: 'key' });
        }

        // Sync queue store
        if (!db.objectStoreNames.contains(STORE_SYNC_QUEUE)) {
          const syncStore = db.createObjectStore(STORE_SYNC_QUEUE, { keyPath: 'id', autoIncrement: true });
          syncStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });
  }

  private async getDb(): Promise<IDBDatabase> {
    if (this.db) return this.db;
    await this.initDb();
    return this.db!;
  }

  // ─── Online/Offline Detection ─────────────────────────────────

  private setupOnlineListeners(): void {
    window.addEventListener('online', () => {
      this.ngZone.run(() => {
        this.isOnline.set(true);
        this.toast.show(
          this.isSq() ? 'Jeni online! Duke sinkronizuar të dhënat...' : 'You are online! Syncing data...',
          'success'
        );
        this.processSyncQueue();
      });
    });

    window.addEventListener('offline', () => {
      this.ngZone.run(() => {
        this.isOnline.set(false);
        this.toast.show(
          this.isSq() ? 'Jeni offline. Të dhënat do të ruhen lokalisht.' : 'You are offline. Data will be saved locally.',
          'info'
        );
      });
    });
  }

  private isSq(): boolean {
    // Simple locale check - avoid circular import
    try {
      const locale = localStorage.getItem('kiddok_locale') || 'sq';
      return locale === 'sq';
    } catch {
      return true;
    }
  }

  // ─── Children ─────────────────────────────────────────────────

  async saveChildrenToOffline(children: ChildProfile[]): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction(STORE_CHILDREN, 'readwrite');
    const store = tx.objectStore(STORE_CHILDREN);
    // Clear and rewrite
    store.clear();
    for (const child of children) {
      store.put(child);
    }
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async getChildrenFromOffline(): Promise<ChildProfile[]> {
    const db = await this.getDb();
    const tx = db.transaction(STORE_CHILDREN, 'readonly');
    const store = tx.objectStore(STORE_CHILDREN);
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result as ChildProfile[]);
      request.onerror = () => reject(request.error);
    });
  }

  // ─── Temperature Entries ──────────────────────────────────────

  async saveTemperaturesToOffline(entries: TemperatureEntry[]): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction(STORE_TEMPERATURES, 'readwrite');
    const store = tx.objectStore(STORE_TEMPERATURES);
    store.clear();
    for (const entry of entries) {
      store.put(entry);
    }
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async getTemperaturesFromOffline(childId: string): Promise<TemperatureEntry[]> {
    const db = await this.getDb();
    const tx = db.transaction(STORE_TEMPERATURES, 'readonly');
    const store = tx.objectStore(STORE_TEMPERATURES);
    const index = store.index('childId');
    return new Promise((resolve, reject) => {
      const request = index.getAll(childId);
      request.onsuccess = () => resolve(request.result as TemperatureEntry[]);
      request.onerror = () => reject(request.error);
    });
  }

  // ─── Growth Entries ───────────────────────────────────────────

  async saveGrowthToOffline(entries: GrowthEntry[]): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction(STORE_GROWTH, 'readwrite');
    const store = tx.objectStore(STORE_GROWTH);
    store.clear();
    for (const entry of entries) {
      store.put(entry);
    }
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async getGrowthFromOffline(childId: string): Promise<GrowthEntry[]> {
    const db = await this.getDb();
    const tx = db.transaction(STORE_GROWTH, 'readonly');
    const store = tx.objectStore(STORE_GROWTH);
    const index = store.index('childId');
    return new Promise((resolve, reject) => {
      const request = index.getAll(childId);
      request.onsuccess = () => resolve(request.result as GrowthEntry[]);
      request.onerror = () => reject(request.error);
    });
  }

  // ─── Vaccine Records ──────────────────────────────────────────

  async saveVaccinesToOffline(records: VaccineRecord[]): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction(STORE_VACCINES, 'readwrite');
    const store = tx.objectStore(STORE_VACCINES);
    store.clear();
    for (const record of records) {
      store.put(record);
    }
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async getVaccinesFromOffline(childId: string): Promise<VaccineRecord[]> {
    const db = await this.getDb();
    const tx = db.transaction(STORE_VACCINES, 'readonly');
    const store = tx.objectStore(STORE_VACCINES);
    const index = store.index('childId');
    return new Promise((resolve, reject) => {
      const request = index.getAll(childId);
      request.onsuccess = () => resolve(request.result as VaccineRecord[]);
      request.onerror = () => reject(request.error);
    });
  }

  // ─── Diary Entries ───────────────────────────────────────────

  async saveDiaryToOffline(entries: DiaryEntry[]): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction(STORE_DIARY, 'readwrite');
    const store = tx.objectStore(STORE_DIARY);
    store.clear();
    for (const entry of entries) {
      store.put(entry);
    }
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async getDiaryFromOffline(childId: string): Promise<DiaryEntry[]> {
    const db = await this.getDb();
    const tx = db.transaction(STORE_DIARY, 'readonly');
    const store = tx.objectStore(STORE_DIARY);
    const index = store.index('childId');
    return new Promise((resolve, reject) => {
      const request = index.getAll(childId);
      request.onsuccess = () => resolve(request.result as DiaryEntry[]);
      request.onerror = () => reject(request.error);
    });
  }

  // ─── Sync Queue ───────────────────────────────────────────────

  async addToSyncQueue(entry: Omit<SyncQueueEntry, 'id' | 'timestamp'>): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction(STORE_SYNC_QUEUE, 'readwrite');
    const store = tx.objectStore(STORE_SYNC_QUEUE);
    const queueEntry: SyncQueueEntry = { ...entry, timestamp: Date.now() };
    store.add(queueEntry);
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => {
        this.hasPendingSync.set(true);
        resolve();
      };
      tx.onerror = () => reject(tx.error);
    });
  }

  async processSyncQueue(): Promise<void> {
    if (!navigator.onLine) return;

    const db = await this.getDb();
    const tx = db.transaction(STORE_SYNC_QUEUE, 'readonly');
    const store = tx.objectStore(STORE_SYNC_QUEUE);
    const entries = await new Promise<SyncQueueEntry[]>((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    if (entries.length === 0) {
      this.hasPendingSync.set(false);
      return;
    }

    // Sort by timestamp
    entries.sort((a, b) => a.timestamp - b.timestamp);

    let successCount = 0;
    for (const entry of entries) {
      try {
        const deleteTx = db.transaction(STORE_SYNC_QUEUE, 'readwrite');
        const deleteStore = deleteTx.objectStore(STORE_SYNC_QUEUE);
        deleteStore.delete(entry.id!);

        await new Promise<void>((resolveDelete, rejectDelete) => {
          const delReq = deleteStore.add(entry);
          delReq.onsuccess = () => resolveDelete();
          delReq.onerror = () => rejectDelete(delReq.error);
        });

        await firstValueFrom(
          this.http.request(entry.method, entry.endpoint, { body: entry.body })
        );
        successCount++;
      } catch {
        // Keep in queue on failure — will retry next sync
      }
    }

    // Check remaining
    const remainingTx = db.transaction(STORE_SYNC_QUEUE, 'readonly');
    const remainingStore = remainingTx.objectStore(STORE_SYNC_QUEUE);
    const remaining = await new Promise<SyncQueueEntry[]>((resolve, reject) => {
      const req = remainingStore.getAll();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });

    this.hasPendingSync.set(remaining.length > 0);

    if (successCount > 0) {
      this.toast.show(
        this.isSq()
          ? `${successCount} të dhëna u sinkronizuan!`
          : `${successCount} items synced!`,
        'success'
      );
    }
  }

  async getSyncQueueCount(): Promise<number> {
    const db = await this.getDb();
    const tx = db.transaction(STORE_SYNC_QUEUE, 'readonly');
    const store = tx.objectStore(STORE_SYNC_QUEUE);
    return new Promise((resolve, reject) => {
      const request = store.count();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // ─── Cache All Child Data ─────────────────────────────────────

  async cacheAllData(): Promise<void> {
    try {
      await this.saveChildrenToOffline(this.dataService.children());

      const activeChildId = this.dataService.activeChildId();
      if (activeChildId) {
        await this.saveTemperaturesToOffline(this.dataService.temperatureEntries());
        await this.saveGrowthToOffline(this.dataService.growthEntries());
        await this.saveVaccinesToOffline(this.dataService.vaccineRecords());
        await this.saveDiaryToOffline(this.dataService.diaryEntries());
      }
    } catch (err) {
      console.error('[OfflineService] cacheAllData failed:', err);
    }
  }

  // ─── Load from Offline (fallback when API fails) ───────────────

  async loadCachedChildData(childId: string): Promise<void> {
    const [temps, growth, vaccines, diary] = await Promise.all([
      this.getTemperaturesFromOffline(childId),
      this.getGrowthFromOffline(childId),
      this.getVaccinesFromOffline(childId),
      this.getDiaryFromOffline(childId),
    ]);

    if (temps.length > 0) this.dataService.temperatureEntries.set(temps);
    if (growth.length > 0) this.dataService.growthEntries.set(growth);
    if (vaccines.length > 0) this.dataService.vaccineRecords.set(vaccines);
    if (diary.length > 0) this.dataService.diaryEntries.set(diary);
  }

  async loadCachedChildren(): Promise<ChildProfile[]> {
    return this.getChildrenFromOffline();
  }
}
