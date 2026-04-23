import { Component, inject, signal, computed, OnInit, AfterViewInit, ViewChild, ElementRef, effect, OnDestroy } from '@angular/core'
import { LucideAngularModule } from 'lucide-angular';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, GrowthEntry } from '../services/data.service';
import { I18nService } from '../core/i18n/i18n.service';
import { TooltipDirective } from '../directives/tooltip.directive';

@Component({
    selector: 'app-growth-tracking',
    imports: [CommonModule, FormsModule, LucideAngularModule, TooltipDirective],
    template: `
    <div class="max-w-2xl mx-auto px-2">

      <!-- Sprint 8: Loading Skeleton -->
      @if (loading()) {
        <div class="space-y-4">
          <!-- Stats cards skeleton -->
          <div class="grid grid-cols-2 gap-4 mb-6">
            @for (i of [1,2]; track i) {
              <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 p-6 animate-pulse">
                <div class="w-10 h-10 bg-gray-200 rounded-full mx-auto mb-3"></div>
                <div class="w-24 h-4 bg-gray-200 rounded mx-auto mb-2"></div>
                <div class="w-16 h-8 bg-gray-200 rounded mx-auto"></div>
              </div>
            }
          </div>
          <!-- Chart skeleton -->
          <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 p-6 animate-pulse">
            <div class="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div class="h-48 bg-gray-200 rounded-2xl"></div>
          </div>
          <!-- List skeleton -->
          <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 p-6 animate-pulse">
            @for (i of [1,2,3]; track i) {
              <div class="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div class="w-24 h-4 bg-gray-200 rounded"></div>
                <div class="w-16 h-4 bg-gray-200 rounded"></div>
              </div>
            }
          </div>
        </div>
      }

      <!-- Header with percentile info tooltip (Sprint 22) -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-3xl font-extrabold text-gray-800">{{ i18n.t()['growth.title'] }}</h1>
          @if (activeChild()) {
            <p class="text-slate-400 text-sm mt-1 font-medium">
              {{ activeChild()?.name }}
            </p>
          }
        </div>
        <!-- Percentile info tooltip -->
        <button [appTooltip]="'tooltip.percentile'"
                tooltipPosition="bottom"
                class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-primary-100 flex items-center justify-center text-slate-400 hover:text-primary-600 transition-all cursor-help flex-shrink-0">
          <lucide-icon name="info" class="text-inherit"></lucide-icon>
        </button>
      </div>

      <!-- Latest Stats Cards -->
      @if (latestEntry()) {
        <div class="grid grid-cols-2 gap-4 mb-6">
          <!-- Height Card -->
          <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 overflow-hidden">
            <div class="p-6 flex flex-col items-center">
              <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
                <lucide-icon name="ruler" class="text-inherit"></lucide-icon>
              </div>
              <p class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{{ i18n.t()['growth.heightLabel'] }}</p>
              @if (latestEntry()!.height !== null) {
                <span class="text-4xl font-black text-indigo-600">{{ latestEntry()!.height }}</span>
                <span class="text-lg font-bold text-slate-400 ml-1">{{ i18n.t()['growth.cm'] }}</span>
              } @else {
                <span class="text-3xl font-black text-slate-200">{{ i18n.t()['growth.noHeight'] }}</span>
              }
              @if (previousEntry() && previousEntry()!.height !== null && latestEntry()!.height !== null) {
                <p class="text-xs font-medium mt-2" [ngClass]="heightDiff() >= 0 ? 'text-teal-500' : 'text-rose-500'">
                  {{ heightDiff() >= 0 ? '↑' : '↓' }} {{ TMath.abs(heightDiff()) }} {{ i18n.t()['growth.cm'] }}
                </p>
              }
            </div>
          </div>

          <!-- Weight Card -->
          <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 overflow-hidden">
            <div class="p-6 flex flex-col items-center">
              <div class="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-3">
                <lucide-icon name="dumbbell" class="text-inherit"></lucide-icon>
              </div>
              <p class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{{ i18n.t()['growth.weightLabel'] }}</p>
              @if (latestEntry()!.weight !== null) {
                <span class="text-4xl font-black text-teal-600">{{ latestEntry()!.weight }}</span>
                <span class="text-lg font-bold text-slate-400 ml-1">{{ i18n.t()['growth.kg'] }}</span>
              } @else {
                <span class="text-3xl font-black text-slate-200">{{ i18n.t()['growth.noWeight'] }}</span>
              }
              @if (previousEntry() && previousEntry()!.weight !== null && latestEntry()!.weight !== null) {
                <p class="text-xs font-medium mt-2" [ngClass]="weightDiff() >= 0 ? 'text-teal-500' : 'text-rose-500'">
                  {{ weightDiff() >= 0 ? '↑' : '↓' }} {{ TMath.abs(weightDiff()) }} {{ i18n.t()['growth.kg'] }}
                </p>
              }
            </div>
          </div>
        </div>
      } @else {
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 overflow-hidden">
            <div class="p-6 flex flex-col items-center">
              <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
                <lucide-icon name="ruler" class="text-inherit"></lucide-icon>
              </div>
              <p class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{{ i18n.t()['growth.heightLabel'] }}</p>
              <span class="text-3xl font-black text-slate-200">{{ i18n.t()['growth.noHeight'] }}</span>
            </div>
          </div>
          <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 overflow-hidden">
            <div class="p-6 flex flex-col items-center">
              <div class="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-3">
                <lucide-icon name="dumbbell" class="text-inherit"></lucide-icon>
              </div>
              <p class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{{ i18n.t()['growth.weightLabel'] }}</p>
              <span class="text-3xl font-black text-slate-200">{{ i18n.t()['growth.noWeight'] }}</span>
            </div>
          </div>
        </div>
      }

      <!-- Add Measurement Form -->
      <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 overflow-hidden mb-6">
        <div class="p-6">
          <h3 class="text-lg font-extrabold text-gray-800 mb-5 flex items-center gap-2">
            <lucide-icon name="plus-circle" class="text-inherit"></lucide-icon>
            {{ i18n.t()['growth.addMeasurement'] }}
          </h3>

          <div class="space-y-5">
            <!-- Date -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['growth.measuredAt'] }}</label>
              <input type="date" [(ngModel)]="formDate"
                     class="w-full px-5 py-4 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800">
            </div>

            <!-- Height & Weight side by side -->
            <div class="grid grid-cols-2 gap-4">
              <!-- Height -->
              <div>
                <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['growth.height'] }}</label>
                <div class="flex items-center gap-2">
                  <input type="number" step="0.1" [(ngModel)]="formHeight"
                         class="w-full px-4 py-4 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-xl font-black text-gray-800 placeholder-slate-300"
                         placeholder="85.5"
                         min="30" max="200">
                  <span class="text-lg font-bold text-slate-400">{{ i18n.t()['growth.cm'] }}</span>
                </div>
                @if (formHeight !== null && (formHeight < 30 || formHeight > 200)) {
                  <p class="mt-1 text-xs text-red-500 font-medium">30–200 cm</p>
                }
              </div>

              <!-- Weight -->
              <div>
                <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['growth.weight'] }}</label>
                <div class="flex items-center gap-2">
                  <input type="number" step="0.1" [(ngModel)]="formWeight"
                         class="w-full px-4 py-4 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-xl font-black text-gray-800 placeholder-slate-300"
                         placeholder="12.3"
                         min="1" max="150">
                  <span class="text-lg font-bold text-slate-400">{{ i18n.t()['growth.kg'] }}</span>
                </div>
                @if (formWeight !== null && (formWeight < 1 || formWeight > 150)) {
                  <p class="mt-1 text-xs text-red-500 font-medium">1–150 kg</p>
                }
              </div>
            </div>

            <!-- Notes -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['growth.notes'] }}</label>
              <textarea [(ngModel)]="formNotes" rows="2"
                        class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 resize-none text-sm"
                        [placeholder]="i18n.t()['growth.notes']"></textarea>
            </div>

            <!-- Save Button -->
            @if (saveError()) {
              <div class="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold">
                {{ saveError() }}
              </div>
            }
            <button (click)="saveEntry()"
                    [disabled]="!canSave() || saving()"
                    class="w-full py-4 rounded-2xl font-bold text-base shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                    [ngClass]="saving()
                      ? 'bg-slate-200 text-slate-400'
                      : 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white hover:shadow-lg'">
              @if (saving()) {
                <lucide-icon name="loader" class="text-inherit"></lucide-icon>
                {{ i18n.t()['growth.saving'] }}
              } @else if (saved()) {
                <lucide-icon name="check-circle" class="text-inherit"></lucide-icon>
                {{ i18n.t()['growth.saved'] }}
              } @else {
                <lucide-icon name="save" class="text-inherit"></lucide-icon>
                {{ i18n.t()['growth.save'] }}
              }
            </button>
          </div>
        </div>
      </div>

      <!-- Growth Chart -->
      <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 overflow-hidden mb-6">
        <div class="p-6 pb-2">
          <h3 class="text-lg font-extrabold text-gray-800 mb-1 flex items-center gap-2">
            <lucide-icon name="trending-up" class="text-inherit"></lucide-icon>
            {{ i18n.t()['growth.chart'] }}
          </h3>
        </div>
        <div class="px-6 pb-6">
          <canvas #chartCanvas class="w-full" style="max-height: 280px;"></canvas>
        </div>
      </div>

      <!-- Recent Measurements -->
      <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 overflow-hidden mb-8">
        <div class="p-6 pb-4">
          <h3 class="text-lg font-extrabold text-gray-800 flex items-center gap-2">
            <lucide-icon name="history" class="text-inherit"></lucide-icon>
            {{ i18n.t()['growth.recent'] }}
          </h3>
        </div>

        @if (recentEntries().length === 0) {
          <div class="px-6 pb-8 text-center">
            <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <lucide-icon name="trending-up" class="text-inherit"></lucide-icon>
            </div>
            <p class="text-slate-400 font-medium mb-3">{{ i18n.t()['growth.noData'] }}</p>
            <button (click)="openAddForm()"
              class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-sm transition-all text-sm inline-flex items-center gap-2">
              <lucide-icon name="plus" class="text-inherit"></lucide-icon>
              {{ i18n.t()['growth.addFirst'] }}
            </button>
          </div>
        } @else {
          <div class="px-6 pb-6 space-y-3">
            @for (entry of recentEntries(); track entry.id) {
              <div class="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-primary-200 hover:bg-primary-50/30 transition-all group">
                <!-- Height indicator -->
                <div class="w-3 h-3 rounded-full flex-shrink-0 bg-indigo-400"></div>
                <span class="text-lg font-black text-indigo-600 w-20">{{ entry.height !== null ? entry.height + ' cm' : '--' }}</span>
                <!-- Weight indicator -->
                <div class="w-3 h-3 rounded-full flex-shrink-0 bg-teal-400"></div>
                <span class="text-lg font-black text-teal-600 w-16">{{ entry.weight !== null ? entry.weight + ' kg' : '--' }}</span>
                <!-- Date -->
                <div class="flex-1">
                  <p class="text-sm font-semibold text-gray-700">{{ formatDate(entry.measuredAt) }}</p>
                  @if (entry.notes) {
                    <p class="text-xs text-slate-400 font-medium">{{ entry.notes }}</p>
                  }
                </div>
                <!-- Delete button -->
                <button (click)="deleteEntry(entry.id)"
                        class="opacity-0 group-hover:opacity-100 w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-400 hover:text-red-600 transition-all border border-red-100">
                  <lucide-icon name="trash-2" class="text-inherit"></lucide-icon>
                </button>
              </div>
            }
          </div>
        }
      </div>

    </div>
  `,
    styles: [`
    .animate-slide-up {
      animation: slideUp 0.35s ease-out;
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class GrowthTrackingComponent implements OnInit, AfterViewInit, OnDestroy {
  dataService = inject(DataService);
  i18n = inject(I18nService);

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  // Sprint 8: Loading state
  loading = signal(false);

  // Form state
  formDate = this.defaultDate();
  formHeight: number | null = null;
  formWeight: number | null = null;
  formNotes = '';
  saving = signal(false);
  saved = signal(false);
  saveError = signal<string | null>(null);

  private chartInstance: any = null;
  private chartEffect: any = null;
  private chartInitialized = false;
  private resizeTimeout: any = null;

  // Math helper exposed to template
  TMath = { abs: Math.abs };

  activeChild = computed(() => {
    const activeId = this.dataService.activeChildId();
    return this.dataService.children().find(c => c.id === activeId);
  });

  latestEntry = computed(() => {
    const entries = this.dataService.growthEntries();
    if (!entries.length) return null;
    return entries[0];
  });

  previousEntry = computed(() => {
    const entries = this.dataService.growthEntries();
    if (entries.length < 2) return null;
    return entries[1];
  });

  recentEntries = computed(() => {
    return this.dataService.growthEntries().slice(0, 10);
  });

  chartEntries = computed(() => {
    return [...this.dataService.growthEntries()].reverse();
  });

  heightDiff = computed(() => {
    const latest = this.latestEntry();
    const prev = this.previousEntry();
    if (!latest || !prev || latest.height === null || prev.height === null) return 0;
    return parseFloat((latest.height - prev.height).toFixed(1));
  });

  weightDiff = computed(() => {
    const latest = this.latestEntry();
    const prev = this.previousEntry();
    if (!latest || !prev || latest.weight === null || prev.weight === null) return 0;
    return parseFloat((latest.weight - prev.weight).toFixed(1));
  });

  async ngOnInit() {
    const childId = this.dataService.activeChildId();
    if (childId) {
      this.loading.set(true);
      try {
        await this.dataService.loadGrowthEntries(childId);
      } finally {
        this.loading.set(false);
      }
    }
  }

  ngAfterViewInit() {
    setTimeout(() => this.renderChart(), 200);
    this.chartEffect = effect(() => {
      const entries = this.dataService.growthEntries();
      if (entries && this.chartInitialized) {
        this.renderChart();
      }
    });
  }

  ngOnDestroy() {
    if (this.chartEffect) {
      this.chartEffect.destroy();
      this.chartEffect = null;
    }
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = null;
    }
  }

  private defaultDate(): string {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }

  /** Sprint 8: Open add form and scroll to it */
  openAddForm(): void {
    // Scroll to the add measurement form section
    const formEl = document.querySelector('.bg-white.rounded-\\[2rem\\].shadow-md.border.border-slate-100.overflow-hidden.mb-6');
    if (formEl) {
      (formEl as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  canSave(): boolean {
    const hasHeight = this.formHeight !== null && this.formHeight >= 30 && this.formHeight <= 200;
    const hasWeight = this.formWeight !== null && this.formWeight >= 1 && this.formWeight <= 150;
    const hasDate = !!this.formDate;
    return hasDate && (hasHeight || hasWeight);
  }

  async saveEntry() {
    const childId = this.dataService.activeChildId();
    if (!childId || !this.canSave()) return;

    this.saving.set(true);
    this.saved.set(false);
    this.saveError.set(null);

    const measuredAt = new Date(this.formDate).toISOString();

    const result = await this.dataService.createGrowthEntry({
      childId,
      height: this.formHeight,
      weight: this.formWeight,
      measuredAt,
      notes: this.formNotes || undefined,
    });

    this.saving.set(false);
    if (result) {
      this.saved.set(true);
      setTimeout(() => this.saved.set(false), 2500);
      this.formHeight = null;
      this.formWeight = null;
      this.formNotes = '';
      this.formDate = this.defaultDate();
      setTimeout(() => this.renderChart(), 100);
    } else {
      const msg = this.i18n.t()['growth.saveError'] || 'Ruajtja dështoi. Provo përsëri.';
      this.saveError.set(msg);
      setTimeout(() => this.saveError.set(null), 5000);
    }
  }

  async deleteEntry(id: string) {
    await this.dataService.deleteGrowthEntry(id);
    setTimeout(() => this.renderChart(), 100);
  }

  formatDate(iso: string): string {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString(this.i18n.locale() === 'sq' ? 'sq-AL' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  // ── Chart ──────────────────────────────────────────────────────

  private renderChart() {
    if (!this.chartCanvas) return;
    const canvas = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Guard against flicker: if chart is already built for current data, skip
    if (this.chartInstance && this.chartInitialized) {
      // Only re-render if data actually changed (checked via entries comparison)
      this.chartInstance.destroy();
      this.chartInstance = null;
    }

    const entries = this.chartEntries();

    if (typeof (window as any).Chart === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
      script.onload = () => this.buildChart(ctx, entries);
      document.head.appendChild(script);
    } else {
      this.buildChart(ctx, entries);
    }
  }

  private buildChart(ctx: CanvasRenderingContext2D, entries: GrowthEntry[]) {
    const Chart = (window as any).Chart;
    const locale = this.i18n.locale() === 'sq' ? 'sq-AL' : 'en-US';

    const labels = entries.map(e => this.formatDate(e.measuredAt));
    const heightData = entries.map(e => e.height);
    const weightData = entries.map(e => e.weight);

    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: this.i18n.t()['growth.heightLabel'],
            data: heightData,
            borderColor: 'rgba(99, 102, 241, 0.9)',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            borderWidth: 2.5,
            pointBackgroundColor: 'rgba(99, 102, 241, 0.9)',
            pointBorderColor: 'rgba(99, 102, 241, 0.9)',
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: false,
            tension: 0.4,
            yAxisID: 'y',
          },
          {
            label: this.i18n.t()['growth.weightLabel'],
            data: weightData,
            borderColor: 'rgba(20, 184, 166, 0.9)',
            backgroundColor: 'rgba(20, 184, 166, 0.1)',
            borderWidth: 2.5,
            pointBackgroundColor: 'rgba(20, 184, 166, 0.9)',
            pointBorderColor: 'rgba(20, 184, 166, 0.9)',
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: false,
            tension: 0.4,
            yAxisID: 'y1',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#78716c',
              font: { size: 12, weight: '600' },
              usePointStyle: true,
              pointStyle: 'circle',
            },
          },
          tooltip: {
            backgroundColor: 'rgba(255,255,255,0.95)',
            titleColor: '#1c1917',
            bodyColor: '#78716c',
            borderColor: '#e7e5e4',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: (ctx: any) => {
                const label = ctx.dataset.label;
                const value = ctx.parsed.y;
                if (value === null) return null;
                if (ctx.datasetIndex === 0) return ` ${label}: ${value} cm`;
                return ` ${label}: ${value} kg`;
              },
            },
          },
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: this.i18n.t()['growth.cm'],
              color: 'rgba(99, 102, 241, 0.8)',
              font: { size: 11, weight: '600' },
            },
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: {
              callback: (v: any) => v + ' cm',
              color: '#a8a29e',
              font: { size: 11 },
            },
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: this.i18n.t()['growth.kg'],
              color: 'rgba(20, 184, 166, 0.8)',
              font: { size: 11, weight: '600' },
            },
            grid: { drawOnChartArea: false },
            ticks: {
              callback: (v: any) => v + ' kg',
              color: '#a8a29e',
              font: { size: 11 },
            },
          },
          x: {
            grid: { display: false },
            ticks: { color: '#a8a29e', font: { size: 10 } },
          },
        },
      },
    });

    this.chartInitialized = true;
  }
}
