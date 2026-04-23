import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { OfflineService } from './offline.service';

export interface SyncEntry {
  entityType: 'temperature' | 'growth' | 'vaccine' | 'diary';
  action: 'create' | 'update' | 'delete';
  data: any;
  localTimestamp: number;
}

export interface SyncResult {
  success: boolean;
  syncedCount: number;
  failedCount: number;
  conflicts: SyncConflict[];
}

export interface SyncConflict {
  entityType: string;
  entityId: string;
  localTimestamp: number;
  serverTimestamp: number;
  localData: any;
  serverData: any;
  conflictType: 'last_write_wins' | 'medical_data_manual_review';
}

export interface ConflictResolution {
  entityType: 'temperature' | 'growth' | 'vaccine' | 'diary';
  entityId: string;
  resolution: 'local_wins' | 'server_wins' | 'merge';
  mergedData?: any;
}

@Injectable({ providedIn: 'root' })
export class SyncService {
  private http = inject(HttpClient);
  private offline = inject(OfflineService);

  conflicts = signal<SyncConflict[]>(this.loadConflictsFromStorage());

  private getHeaders() {
    const token = localStorage.getItem('kiddok_access_token');
    return {
      headers: { Authorization: `Bearer ${token}` }
    };
  }

  async syncPendingEntries(): Promise<SyncResult> {
    const queueEntries = await this.offline.getSyncQueueEntries();
    const entries: SyncEntry[] = queueEntries.map(entry => ({
      entityType: entry.entity as any,
      action: entry.action as any,
      data: entry.body,
      localTimestamp: entry.timestamp,
    }));
    return this.triggerFullSync(entries);
  }

  async triggerFullSync(entries: SyncEntry[]): Promise<SyncResult> {
    if (entries.length === 0) {
      return { success: true, syncedCount: 0, failedCount: 0, conflicts: [] };
    }
    try {
      const result = await firstValueFrom(
        this.http.post<SyncResult>(
          `${environment.apiUrl}/sync`,
          { entries },
          this.getHeaders()
        )
      ) as SyncResult;
      if (result.conflicts?.length > 0) {
        for (const c of result.conflicts) {
          this.addConflict(c);
        }
      }
      return result;
    } catch (err) {
      console.error('[SyncService] triggerFullSync failed:', err);
      return { success: false, syncedCount: 0, failedCount: entries.length, conflicts: [] };
    }
  }

  async submitResolution(
    entityType: string,
    entityId: string,
    resolution: 'local_wins' | 'server_wins',
    mergedData?: any
  ): Promise<boolean> {
    try {
      const body: ConflictResolution = {
        entityType: entityType as any,
        entityId,
        resolution,
        mergedData,
      };
      const result = await firstValueFrom(
        this.http.post<{ success: boolean }>(`${environment.apiUrl}/sync/resolve`, body, this.getHeaders())
      );
      return result.success;
    } catch (err) {
      console.error('[SyncService] submitResolution failed:', err);
      return false;
    }
  }

  // ─── Persistent conflict storage ──────────────────────────────
  private readonly CONFLICTS_KEY = 'kiddok_sync_conflicts';

  private loadConflictsFromStorage(): SyncConflict[] {
    try {
      const raw = localStorage.getItem(this.CONFLICTS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }

  private saveConflictsToStorage(conflicts: SyncConflict[]): void {
    localStorage.setItem(this.CONFLICTS_KEY, JSON.stringify(conflicts));
  }

  addConflict(conflict: SyncConflict): void {
    const current = this.conflicts();
    const updated = [...current.filter(c => c.entityId !== conflict.entityId), conflict];
    this.conflicts.set(updated);
    this.saveConflictsToStorage(updated);
  }

  /** Remove a conflict from local storage (after user resolves it) */
  dismissConflict(entityId: string): void {
    const updated = this.conflicts().filter(c => c.entityId !== entityId);
    this.conflicts.set(updated);
    this.saveConflictsToStorage(updated);
  }
}
