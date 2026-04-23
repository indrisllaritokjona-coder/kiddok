import {
  Component,
  inject,
  signal,
  effect,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { OfflineService } from '../services/offline.service';
import { I18nService } from '../core/i18n/i18n.service';

@Component({
  selector: 'app-offline-indicator',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (!offlineService.isOnline()) {
      <div role="status" aria-live="polite"
           class="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-50 border-b border-amber-200 shadow-sm animate-slide-down">
        <lucide-icon name="wifi-off" class="text-amber-500 shrink-0" [size]="16" aria-hidden="true"></lucide-icon>
        <span class="text-sm font-bold text-amber-700">
          {{ offlineService.hasPendingSync() ? t()['offline.bannerPending'] : t()['offline.banner'] }}
        </span>
        @if (offlineService.hasPendingSync()) {
          <span class="text-xs text-amber-600 font-medium">({{ pendingCount() }})</span>
        }
      </div>
    }
  `,
  styles: [`
    .animate-slide-down {
      animation: slideDown 0.3s ease-out;
    }
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-100%); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class OfflineIndicatorComponent {
  offlineService = inject(OfflineService);
  i18n = inject(I18nService);

  readonly t = this.i18n.t;
  pendingCount = signal(0);

  constructor() {
    // Reactive: re-check pending count whenever hasPendingSync changes
    effect(() => {
      if (this.offlineService.hasPendingSync()) {
        this.loadPendingCount();
      }
    });
  }

  private async loadPendingCount(): Promise<void> {
    const count = await this.offlineService.getSyncQueueCount();
    this.pendingCount.set(count);
  }
}
