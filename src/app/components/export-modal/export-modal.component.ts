import { Component, Input, Output, EventEmitter, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { ExportService } from '../../services/export.service';
import { I18nService } from '../../core/i18n/i18n.service';

@Component({
  selector: 'app-export-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
         role="dialog"
         aria-modal="true"
         aria-labelledby="export-modal-title"
         (click)="onBackdropClick($event)">

      <!-- Card -->
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 animate-slide-up"
           (click)="$event.stopPropagation()">

        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <h2 id="export-modal-title" class="text-xl font-extrabold text-gray-800">
            {{ i18n.t()['export.title'] }}
          </h2>
          <button type="button"
                  (click)="close()"
                  class="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all border border-slate-200"
                  [attr.aria-label]="i18n.t()['common.close']">
            <lucide-icon name="x" class="text-inherit" aria-hidden="true"></lucide-icon>
          </button>
        </div>

        <!-- Date Range -->
        <div class="mb-5">
          <label class="block text-sm font-bold text-gray-600 mb-2">{{ i18n.t()['export.dateRange'] }}</label>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs text-gray-500 mb-1 block">{{ i18n.t()['export.from'] }}</label>
              <input type="date"
                     [(ngModel)]="dateFrom"
                     [max]="today"
                     class="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-sm text-gray-800" />
            </div>
            <div>
              <label class="text-xs text-gray-500 mb-1 block">{{ i18n.t()['export.to'] }}</label>
              <input type="date"
                     [(ngModel)]="dateTo"
                     [max]="today"
                     class="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-sm text-gray-800"
                     [class.border-red-400]="hasInvalidDateRange()" />
            </div>
          </div>
          @if (hasInvalidDateRange()) {
            <p class="mt-2 text-xs text-red-500 font-medium flex items-center gap-1">
              <lucide-icon name="alert-circle" class="text-inherit"></lucide-icon>
              {{ i18n.isSq() ? 'Data "nga" duhet të jetë para dates "deri".' : '"From" date must be before "to" date.' }}
            </p>
          }
        </div>

        <!-- Format Selector -->
        <div class="mb-5">
          <label class="block text-sm font-bold text-gray-600 mb-2">{{ i18n.t()['export.format'] }}</label>
          <div class="flex gap-4">
            <label class="flex items-center gap-2 cursor-pointer px-4 py-3 rounded-2xl border-2 transition-all"
                   [class.border-primary-400]="format === 'pdf'"
                   [class.bg-primary-50]="format === 'pdf'"
                   [class.border-slate-200]="format !== 'pdf'"
                   [class.bg-white]="format !== 'pdf'">
              <input type="radio" value="pdf" [(ngModel)]="format" class="sr-only" />
              <lucide-icon name="file-text" class="text-inherit" [class.text-primary-600]="format === 'pdf'" [class.text-slate-400]="format !== 'pdf'" aria-hidden="true"></lucide-icon>
              <span class="text-sm font-bold" [class.text-primary-700]="format === 'pdf'" [class.text-slate-600]="format !== 'pdf'">{{ i18n.t()['export.pdf'] }}</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer px-4 py-3 rounded-2xl border-2 transition-all"
                   [class.border-primary-400]="format === 'csv'"
                   [class.bg-primary-50]="format === 'csv'"
                   [class.border-slate-200]="format !== 'csv'"
                   [class.bg-white]="format !== 'csv'">
              <input type="radio" value="csv" [(ngModel)]="format" class="sr-only" />
              <lucide-icon name="table" class="text-inherit" [class.text-primary-600]="format === 'csv'" [class.text-slate-400]="format !== 'csv'" aria-hidden="true"></lucide-icon>
              <span class="text-sm font-bold" [class.text-primary-700]="format === 'csv'" [class.text-slate-600]="format !== 'csv'">{{ i18n.t()['export.csv'] }}</span>
            </label>
          </div>
        </div>

        <!-- Large Range Warning -->
        @if (showLargeRangeWarning()) {
          <div class="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 flex gap-2">
            <lucide-icon name="alert-triangle" class="text-inherit shrink-0" aria-hidden="true"></lucide-icon>
            {{ i18n.t()['export.largeRangeWarning'] }}
          </div>
        }

        <!-- Error Banner -->
        @if (error()) {
          <div class="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex gap-2">
            <lucide-icon name="alert-circle" class="text-inherit shrink-0" aria-hidden="true"></lucide-icon>
            {{ error() }}
          </div>
        }

        <!-- Export Button -->
        <button type="button"
                (click)="onExport()"
                [disabled]="loading() || hasInvalidDateRange()"
                class="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all shadow-md"
                [class.bg-primary-600]="!loading() && !hasInvalidDateRange()"
                [class.hover:bg-primary-500]="!loading() && !hasInvalidDateRange()"
                [class.text-white]="!loading() && !hasInvalidDateRange()"
                [class.opacity-60]="loading() || hasInvalidDateRange()"
                [class.cursor-not-allowed]="loading() || hasInvalidDateRange()"
                [class.bg-slate-200]="loading() || hasInvalidDateRange()"
                [class.text-slate-400]="loading() || hasInvalidDateRange()">
          @if (loading()) {
            <span class="animate-spin">
              <lucide-icon name="loader-2" class="text-inherit" aria-hidden="true"></lucide-icon>
            </span>
            <span>{{ i18n.t()['export.generating'] }}</span>
          } @else {
            <lucide-icon name="download" class="text-inherit" aria-hidden="true"></lucide-icon>
            <span>{{ i18n.t()['export.exportBtn'] }}</span>
          }
        </button>
      </div>
    </div>
  `,
  styles: [`
    .animate-slide-up {
      animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    button:not(:disabled):active {
      transform: scale(0.98);
    }
  `]
})
export class ExportModalComponent {
  @Input() childId: string = '';
  @Input() isOpen = false;

  @Output() closed = new EventEmitter<void>();

  private exportService = inject(ExportService);
  i18n = inject(I18nService);

  dateFrom = '';
  dateTo = '';
  format: 'pdf' | 'csv' = 'pdf';
  loading = signal(false);
  error = signal('');

  today = new Date().toISOString().split('T')[0];

  constructor() {
    // Default to last 30 days
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - 30);
    this.dateTo = to.toISOString().split('T')[0];
    this.dateFrom = from.toISOString().split('T')[0];
  }

  hasInvalidDateRange(): boolean {
    return !!(this.dateFrom && this.dateTo && this.dateFrom > this.dateTo);
  }

  showLargeRangeWarning = computed(() => {
    if (!this.dateFrom || !this.dateTo) return false;
    const from = new Date(this.dateFrom);
    const to = new Date(this.dateTo);
    const diffMs = to.getTime() - from.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return diffDays > 365;
  });

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('fixed')) {
      this.close();
    }
  }

  close() {
    this.closed.emit();
    this.error.set('');
  }

  async onExport() {
    if (this.loading()) return;

    this.error.set('');
    this.loading.set(true);

    try {
      if (this.format === 'pdf') {
        await this.exportService.exportPdf(this.childId, this.dateFrom, this.dateTo);
      } else {
        await this.exportService.exportCsv(this.childId, this.dateFrom, this.dateTo);
      }
      this.close();
    } catch (err: any) {
      this.error.set(err.message ?? this.i18n.t()['export.errorServer']);
    } finally {
      this.loading.set(false);
    }
  }
}
