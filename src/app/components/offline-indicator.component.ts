import {
  Component,
  inject,
  signal,
  OnInit,
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
          {{ offlineService.hasPendingSync() ? offlineText.pendingSync : offlineText.offline }}
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
export class OfflineIndicatorComponent implements OnInit {
  offlineService = inject(OfflineService);
  i18n = inject(I18nService);

  pendingCount = signal(0);

  offlineText = {
    offline: '',
    pendingSync: '',
  };

  ngOnInit(): void {
    this.updateLabels();
    this.loadPendingCount();
  }

  private updateLabels(): void {
    const isSq = this.i18n.isSq();
    this.offlineText = {
      offline: isSq ? 'Jeni offline' : 'You are offline',
      pendingSync: isSq ? 'Duke pritur sinkronizim' : 'Pending sync',
    };
  }

  private async loadPendingCount(): Promise<void> {
    const count = await this.offlineService.getSyncQueueCount();
    this.pendingCount.set(count);
  }
}
