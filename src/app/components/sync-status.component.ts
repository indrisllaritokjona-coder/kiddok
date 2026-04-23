import {
  Component,
  inject,
  signal,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { OfflineService } from '../../services/offline.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { SyncService } from '../../services/sync.service';

export type SyncState = 'idle' | 'syncing' | 'synced' | 'error' | 'conflict';

@Component({
  selector: 'app-sync-status',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Sync status pill — shown in header or toolbar -->
    <div class="flex items-center gap-2" role="status" [attr.aria-label]="statusLabel()">
      <!-- Animated sync icon when syncing -->
      @if (state() === 'syncing') {
        <lucide-icon name="loader-2" [size]="14" class="animate-spin text-primary-500" aria-hidden="true"></lucide-icon>
      }
      <!-- Status icon -->
      @switch (state()) {
        @case ('synced') {
          <lucide-icon name="check-circle" [size]="14" class="text-teal-500 shrink-0" aria-hidden="true"></lucide-icon>
        }
        @case ('error') {
          <lucide-icon name="alert-circle" [size]="14" class="text-red-500 shrink-0" aria-hidden="true"></lucide-icon>
        }
        @case ('conflict') {
          <lucide-icon name="alert-triangle" [size]="14" class="text-amber-500 shrink-0" aria-hidden="true"></lucide-icon>
        }
      }

      <!-- Label -->
      <span class="text-xs font-semibold" [class]="stateClass()">
        {{ statusLabel() }}
      </span>

      <!-- Last synced timestamp -->
      @if (lastSyncedAt() && state() === 'synced') {
        <span class="text-xs text-gray-400 hidden sm:inline">&bull; {{ lastSyncedLabel() }}</span>
      }

      <!-- Conflict count badge -->
      @if (conflictCount() > 0) {
        <button
          type="button"
          (click)="showConflictPanel.set(true)"
          class="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold hover:bg-amber-100 transition-colors"
          [attr.aria-label]="conflictLabel()">
          <lucide-icon name="alert-triangle" [size]="10" aria-hidden="true"></lucide-icon>
          {{ conflictCount() }}
        </button>
      }

      <!-- Retry button on error -->
      @if (state() === 'error') {
        <button
          type="button"
          (click)="retrySync()"
          class="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold hover:bg-red-100 transition-colors"
          aria-label="{{ retryLabel() }}">
          <lucide-icon name="refresh-cw" [size]="10" aria-hidden="true"></lucide-icon>
          {{ retryLabel() }}
        </button>
      }
    </div>

    <!-- Conflict Resolution Panel (modal/drawer) -->
    @if (showConflictPanel()) {
      <div class="fixed inset-0 z-50 flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="conflict-panel-title">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" (click)="showConflictPanel.set(false)" aria-hidden="true"></div>

        <!-- Panel -->
        <div class="relative z-10 w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-[0_-20px_60px_-12px_rgba(0,0,0,0.15)] border-t sm:border border-gray-100 overflow-hidden animate-slide-up">
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-amber-50">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <lucide-icon name="alert-triangle" [size]="20" class="text-amber-600" aria-hidden="true"></lucide-icon>
              </div>
              <div>
                <h2 id="conflict-panel-title" class="font-extrabold text-gray-800 text-lg">{{ conflictPanelTitle() }}</h2>
                <p class="text-sm text-gray-500 font-medium">{{ conflictPanelSubtitle() }}</p>
              </div>
            </div>
            <button
              type="button"
              (click)="showConflictPanel.set(false)"
              class="w-9 h-9 rounded-xl bg-white hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all shadow-sm border border-gray-200"
              [attr.aria-label]="i18n.t()['child.cancel']">
              <lucide-icon name="x" [size]="16" aria-hidden="true"></lucide-icon>
            </button>
          </div>

          <!-- Conflict List -->
          <div class="px-6 py-5 space-y-4 max-h-80 overflow-y-auto">
            @for (conflict of pendingConflicts(); track conflict.entityId) {
              <div class="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                    <lucide-icon name="git-merge" [size]="14" class="text-amber-600" aria-hidden="true"></lucide-icon>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-bold text-gray-800 text-sm">{{ conflict.entityLabel() }}</p>
                    <p class="text-xs text-gray-500 mt-0.5">{{ conflict.timeDiffLabel() }}</p>
                    <p class="text-xs text-gray-400 mt-1 font-mono">{{ conflict.entityId }}</p>
                  </div>
                  @if (conflict.type === 'medical_data_manual_review') {
                    <span class="shrink-0 px-2 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-bold">
                      {{ medicalReviewLabel() }}
                    </span>
                  }
                </div>

                <!-- Compare local vs server -->
                <div class="mt-3 grid grid-cols-2 gap-2">
                  <div class="bg-white rounded-xl p-3 border border-gray-100">
                    <p class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{{ thisLocalLabel() }}</p>
                    <div class="space-y-1">
                      @for (field of conflict.changedFields(); track field.key) {
                        <div class="text-xs">
                          <span class="text-gray-400 font-medium">{{ field.label }}:</span>
                          <span class="text-gray-700 font-semibold ml-1">{{ field.local }}</span>
                        </div>
                      }
                    </div>
                  </div>
                  <div class="bg-white rounded-xl p-3 border border-gray-100">
                    <p class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{{ thisServerLabel() }}</p>
                    <div class="space-y-1">
                      @for (field of conflict.changedFields(); track field.key) {
                        <div class="text-xs">
                          <span class="text-gray-400 font-medium">{{ field.label }}:</span>
                          <span class="text-gray-700 font-semibold ml-1">{{ field.server }}</span>
                        </div>
                      }
                    </div>
                  </div>
                </div>

                <!-- Resolution actions -->
                @if (conflict.type === 'medical_data_manual_review') {
                  <div class="mt-4 flex gap-2">
                    <button
                      type="button"
                      (click)="resolveConflict(conflict, 'local_wins')"
                      class="flex-1 py-2.5 rounded-xl bg-primary-50 border border-primary-200 text-primary-700 font-bold text-xs hover:bg-primary-100 transition-colors">
                      {{ useLocalLabel() }}
                    </button>
                    <button
                      type="button"
                      (click)="resolveConflict(conflict, 'server_wins')"
                      class="flex-1 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-100 transition-colors">
                      {{ useServerLabel() }}
                    </button>
                  </div>
                }
              </div>
            }
          </div>

          <!-- Footer -->
          <div class="px-6 py-4 border-t border-gray-100 bg-gray-50">
            <p class="text-xs text-gray-400 text-center font-medium">{{ conflictFooterNote() }}</p>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .animate-slide-up {
      animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class SyncStatusComponent implements OnInit, OnDestroy {
  offlineService = inject(OfflineService);
  syncService = inject(SyncService);
  i18n = inject(I18nService);

  // Sync state
  state = signal<SyncState>('idle');
  lastSyncedAt = signal<Date | null>(null);
  conflictCount = signal(0);
  pendingConflicts = signal<PendingConflict[]>([]);
  showConflictPanel = signal(false);

  private retryTimeout: any = null;
  private retryAttempts = 0;
  private readonly MAX_RETRY_ATTEMPTS = 3;

  // i18n labels
  statusLabel = signal('');
  stateClass = signal('');
  lastSyncedLabel = signal('');
  conflictLabel = signal('');
  retryLabel = signal('');
  conflictPanelTitle = signal('');
  conflictPanelSubtitle = signal('');
  medicalReviewLabel = signal('');
  thisLocalLabel = signal('');
  thisServerLabel = signal('');
  useLocalLabel = signal('');
  useServerLabel = signal('');
  conflictFooterNote = signal('');

  ngOnInit(): void {
    this.updateLabels();
    this.loadLastSyncedTime();
    this.setupAutoSync();
  }

  ngOnDestroy(): void {
    if (this.retryTimeout) clearTimeout(this.retryTimeout);
  }

  private updateLabels(): void {
    const isSq = this.i18n.isSq();
    const t = this.i18n.t();

    this.conflictPanelTitle.set(t['sync.conflictPanelTitle'] || (isSq ? 'Konflikt i Pixelimit' : 'Data Conflict'));
    this.conflictPanelSubtitle.set(t['sync.conflictPanelSubtitle'] || (isSq ? 'Të dhëna që kërkojnë rishikim manual' : 'Data requiring manual review'));
    this.medicalReviewLabel.set(t['sync.medicalReview'] || (isSq ? 'Rishikim Mjekësor' : 'Medical Review'));
    this.thisLocalLabel.set(t['sync.thisLocal'] || (isSq ? 'Lokalisht' : 'Local'));
    this.thisServerLabel.set(t['sync.server'] || (isSq ? 'Serveri' : 'Server'));
    this.useLocalLabel.set(t['sync.useLocal'] || (isSq ? 'Përdor Lokalen' : 'Use Local'));
    this.useServerLabel.set(t['sync.useServer'] || (isSq ? 'Përdor Serverin' : 'Use Server'));
    this.conflictFooterNote.set(t['sync.conflictFooterNote'] || (isSq ? 'Konfliktet zgjidhen automatikisht për të dhëna jo-mjekësore.' : 'Non-medical data conflicts are resolved automatically.'));
  }

  private loadLastSyncedTime(): void {
    try {
      const stored = localStorage.getItem('kiddok_last_synced');
      if (stored) this.lastSyncedAt.set(new Date(parseInt(stored, 10)));
    } catch {}
  }

  private saveLastSyncedTime(): void {
    const now = Date.now();
    try { localStorage.setItem('kiddok_last_synced', String(now)); } catch {}
    this.lastSyncedAt.set(new Date(now));
  }

  private setupAutoSync(): void {
    // Auto-sync when coming online
    window.addEventListener('online', () => {
      this.updateStatusFromState('syncing');
      setTimeout(() => this.triggerSync(), 500);
    });
  }

  private updateStatusFromState(state: SyncState): void {
    this.state.set(state);
    const isSq = this.i18n.isSq();
    switch (state) {
      case 'syncing':
        this.statusLabel.set(isSq ? 'Duke sinkronizuar...' : 'Syncing...');
        this.stateClass.set('text-primary-500');
        break;
      case 'synced':
        this.statusLabel.set(isSq ? 'Sinkronizuar' : 'Synced');
        this.stateClass.set('text-teal-600');
        this.saveLastSyncedTime();
        break;
      case 'error':
        this.statusLabel.set(isSq ? 'Gabim' : 'Error');
        this.stateClass.set('text-red-500');
        this.scheduleRetry();
        break;
      case 'conflict':
        this.statusLabel.set(isSq ? 'Konflikt' : 'Conflict');
        this.stateClass.set('text-amber-600');
        break;
      default:
        this.statusLabel.set('');
        this.stateClass.set('text-gray-400');
    }
  }

  async triggerSync(): Promise<void> {
    this.updateStatusFromState('syncing');
    const result = await this.syncService.syncPendingEntries();

    if (result.conflicts.length > 0) {
      this.pendingConflicts.set(result.conflicts.map(c => new PendingConflict(c)));
      this.conflictCount.set(result.conflicts.length);
      this.updateStatusFromState('conflict');
    } else if (result.failedCount > 0) {
      this.updateStatusFromState('error');
    } else {
      this.updateStatusFromState('synced');
      this.conflictCount.set(0);
      this.pendingConflicts.set([]);
    }

    this.updateLastSyncedLabel();
  }

  async retrySync(): Promise<void> {
    if (this.retryAttempts >= this.MAX_RETRY_ATTEMPTS) {
      this.retryAttempts = 0;
      const isSq = this.i18n.isSq();
      // Could show a toast here
      return;
    }
    this.retryAttempts++;
    await this.triggerSync();
  }

  private scheduleRetry(): void {
    if (this.retryTimeout) clearTimeout(this.retryTimeout);
    // Exponential backoff: 2s, 4s, 8s
    const delay = Math.pow(2, this.retryAttempts) * 1000;
    this.retryTimeout = setTimeout(() => {
      if (this.state() === 'error') {
        this.retrySync();
      }
    }, delay);
  }

  async resolveConflict(conflict: PendingConflict, resolution: 'local_wins' | 'server_wins'): Promise<void> {
    await this.syncService.resolveConflict(
      conflict.entityType,
      conflict.entityId,
      resolution
    );

    // Remove from pending conflicts
    const remaining = this.pendingConflicts().filter(c => c.entityId !== conflict.entityId);
    this.pendingConflicts.set(remaining);
    this.conflictCount.set(remaining.length);

    if (remaining.length === 0) {
      this.showConflictPanel.set(false);
      this.updateStatusFromState('synced');
    }
  }

  private updateLastSyncedLabel(): void {
    const ts = this.lastSyncedAt();
    if (!ts) return;
    const isSq = this.i18n.isSq();
    const now = Date.now();
    const diff = now - ts.getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (mins < 1) {
      this.lastSyncedLabel.set(isSq ? 'tani' : 'just now');
    } else if (mins < 60) {
      this.lastSyncedLabel.set(isSq ? `${mins} min më parë` : `${mins}m ago`);
    } else if (hours < 24) {
      this.lastSyncedLabel.set(isSq ? `${hours} orë më parë` : `${hours}h ago`);
    } else {
      this.lastSyncedLabel.set(ts.toLocaleDateString(isSq ? 'sq-AL' : 'en-US'));
    }
  }
}

/**
 * Helper class to represent a pending conflict for the UI.
 */
export class PendingConflict {
  readonly entityType: string;
  readonly entityId: string;
  readonly type: string;
  readonly localData: any;
  readonly serverData: any;
  readonly localTimestamp: number;
  readonly serverTimestamp: number;

  constructor(conflict: any) {
    this.entityType = conflict.entityType;
    this.entityId = conflict.entityId;
    this.type = conflict.conflictType;
    this.localData = conflict.localData;
    this.serverData = conflict.serverData;
    this.localTimestamp = conflict.localTimestamp;
    this.serverTimestamp = conflict.serverTimestamp;
  }

  entityLabel(): string {
    const labels: Record<string, string> = {
      temperature: 'Temperature Entry',
      growth: 'Growth Measurement',
      vaccine: 'Vaccine Record',
      diary: 'Diary Entry',
    };
    return labels[this.entityType] ?? this.entityType;
  }

  timeDiffLabel(): string {
    const diff = this.serverTimestamp - this.localTimestamp;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Updated seconds ago on server';
    if (mins < 60) return `Server updated ${mins}m after your local edit`;
    const hours = Math.floor(mins / 60);
    return `Server updated ${hours}h after your local edit`;
  }

  changedFields(): { key: string; label: string; local: string; server: string }[] {
    const fields: Record<string, string> = {
      temperature: 'Temperature',
      height: 'Height',
      weight: 'Weight',
      name: 'Name',
      notes: 'Notes',
      completed: 'Completed',
    };
    const result: { key: string; label: string; local: string; server: string }[] = [];
    const localData = this.localData;
    const serverData = this.serverData;

    for (const key of Object.keys(fields)) {
      if (localData[key] !== undefined && serverData[key] !== undefined && localData[key] !== serverData[key]) {
        result.push({
          key,
          label: fields[key],
          local: String(localData[key] ?? '--'),
          server: String(serverData[key] ?? '--'),
        });
      }
    }
    return result;
  }
}