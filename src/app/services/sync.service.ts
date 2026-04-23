import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

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

  private getHeaders() {
    const token = localStorage.getItem('kiddok_access_token');
    return {
      headers: { Authorization: `Bearer ${token}` }
    };
  }

  /**
   * Send a batch of offline entries to the server for conflict-detecting sync.
   * Returns the sync result with any conflicts that need manual resolution.
   */
  async syncPendingEntries(): Promise<SyncResult> {
    try {
      const result = await firstValueFrom(
        this.http.post<SyncResult>(`${environment.apiUrl}/sync`, {}, this.getHeaders())
      ) as SyncResult;
      return result;
    } catch (err) {
      console.error('[SyncService] syncPendingEntries failed:', err);
      return { success: false, syncedCount: 0, failedCount: 1, conflicts: [] };
    }
  }

  /**
   * Submit a manual conflict resolution after user reviews a medical data conflict.
   */
  async resolveConflict(
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
      console.error('[SyncService] resolveConflict failed:', err);
      return false;
    }
  }

  /**
   * Convenience: trigger sync for all pending offline entries.
   * Called by OfflineService when coming online, or by SyncStatusComponent manually.
   */
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
      return result;
    } catch (err) {
      console.error('[SyncService] triggerFullSync failed:', err);
      return { success: false, syncedCount: 0, failedCount: entries.length, conflicts: [] };
    }
  }
}