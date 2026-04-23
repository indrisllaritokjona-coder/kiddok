import {
  Component, inject, signal, computed, effect,
  ViewChild, ElementRef, OnDestroy, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { DataService, GrowthEntry, ChildProfile } from '../../services/data.service';
import { I18nService } from '../../core/i18n/i18n.service';

declare global {
  interface Window {
    Chart: any;
  }
}

type DateRange = '1m' | '3m' | '6m' | '1y' | 'all';

@Component({
  selector: 'app-growth-chart',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 overflow-hidden">

      <!-- Card Header -->
      <div class="px-6 py-5 flex items-center justify-between border-b border-slate-100">
        <h3 class="text-lg font-extrabold text-gray-800 flex items-center gap-2">
          <lucide-icon name="trending-up" class="text-inherit"></lucide-icon>
          {{ i18n.t()['growthChart.title'] }}
        </h3>
        <div class="flex items-center gap-2">
          <!-- Child selector -->
          @if (children().length > 0) {
            <select
              [(ngModel)]="selectedChildId"
              (ngModelChange)="onChildChange($event)"
              class="text-sm font-semibold px-3 py-2 rounded-xl border-2 border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 text-gray-700 cursor-pointer">
              @for (child of children(); track child.id) {
                <option [value]="child.id">{{ child.name }}</option>
              }
            </select>
          }
          <!-- Refresh -->
          <button
            (click)="refresh()"
            class="w-9 h-9 rounded-xl bg-slate-50 hover:bg-primary-50 border border-slate-200 hover:border-primary-300 flex items-center justify-center text-slate-400 hover:text-primary-600 transition-all shadow-sm"
            [attr.aria-label]="i18n.t()['sidebar.refresh'] || 'Refresh'">
            <lucide-icon name="rotate-cw" [size]="15" class="text-inherit"></lucide-icon>
          </button>
        </div>
      </div>

      <!-- Date Range + Unit Filter Bar -->
      <div class="px-6 py-3 flex flex-wrap items-center gap-3 border-b border-slate-100 bg-slate-50/50">
        <div class="flex items-center gap-2">
          <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">{{ i18n.t()['growthChart.dateFrom'] }}</label>
          <input type="date" [(ngModel)]="dateFrom"
                 (ngModelChange)="onDateRangeChange()"
                 class="text-sm px-3 py-2 rounded-xl border-2 border-slate-200 bg-white outline-none focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 text-gray-700">
        </div>
        <span class="text-slate-300 font-bold">→</span>
        <div class="flex items-center gap-2">
          <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">{{ i18n.t()['growthChart.dateTo'] }}</label>
          <input type="date" [(ngModel)]="dateTo"
                 (ngModelChange)="onDateRangeChange()"
                 class="text-sm px-3 py-2 rounded-xl border-2 border-slate-200 bg-white outline-none focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 text-gray-700">
        </div>

        <!-- Quick range chips -->
        <div class="flex items-center gap-1 ml-auto">
          @for (range of dateRanges; track range.value) {
            <button
              (click)="selectRange(range.value)"
              class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
              [ngClass]="activeRange() === range.value
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-white text-slate-500 border border-slate-200 hover:border-primary-300 hover:text-primary-600'">
              {{ range.label }}
            </button>
          }
        </div>
      </div>

      <!-- Chart Area -->
      <div class="px-6 py-5" style="height: 300px; position: relative;">
        @if (state() === 'no-child') {
          <div class="h-full flex flex-col items-center justify-center text-center">
            <div class="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-3">
              <lucide-icon name="user-x" class="text-inherit"></lucide-icon>
            </div>
            <p class="text-slate-500 font-semibold text-sm">{{ i18n.t()['growthChart.noChild'] }}</p>
          </div>
        } @else if (state() === 'no-data' || state() === 'empty') {
          <div class="h-full flex flex-col items-center justify-center text-center">
            <div class="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-3">
              <lucide-icon name="bar-chart-2" class="text-inherit"></lucide-icon>
            </div>
            <p class="text-slate-500 font-semibold text-sm">{{ i18n.t()['growthChart.noData'] }}</p>
          </div>
        } @else if (state() === 'single') {
          <div class="h-full flex flex-col items-center justify-center text-center">
            <div class="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-3">
              <lucide-icon name="alert-circle" class="text-inherit"></lucide-icon>
            </div>
            <p class="text-slate-500 font-semibold text-sm">{{ i18n.t()['growthChart.singleEntry'] }}</p>
          </div>
        } @else {
          <canvas #chartCanvas class="w-full h-full" style="display: block;"></canvas>
        }
      </div>

      <!-- Legend -->
      @if (state() === 'ok') {
        <div class="px-6 pb-5 flex flex-wrap items-center gap-4">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-indigo-500 flex-shrink-0"></div>
            <span class="text-xs font-semibold text-slate-600">{{ heightLabel() }}</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-teal-500 flex-shrink-0"></div>
            <span class="text-xs font-semibold text-slate-600">{{ weightLabel() }}</span>
          </div>
          <div class="ml-auto flex items-center gap-3">
            <button
              (click)="toggleUnit()"
              class="px-3 py-1.5 rounded-xl text-xs font-bold border-2 border-slate-200 text-slate-500 hover:border-primary-300 hover:text-primary-600 transition-all bg-white">
              {{ useMetric() ? 'kg/cm' : 'lb/in' }}
            </button>
            @if (hasActiveFilters()) {
              <button
                (click)="clearFilters()"
                class="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500 border border-slate-200 hover:border-red-200 transition-all">
                {{ i18n.t()['growthChart.clearFilter'] }}
              </button>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class GrowthChartComponent implements OnDestroy {
  dataService = inject(DataService);
  i18n = inject(I18nService);

  @ViewChild('chartCanvas') chartCanvasRef!: ElementRef<HTMLCanvasElement>;

  // ── Local state ────────────────────────────────────────────────
  selectedChildId = signal<string>('');
  dateFrom = signal<string>('');
  dateTo = signal<string>('');
  activeRange = signal<DateRange>('all');
  useMetric = signal(true);
  private chartInstance: any = null;
  private chartEffect: any = null;
  private chartInitialized = false;

  dateRanges: { value: DateRange; label: string }[] = [
    { value: '1m', label: '1M' },
    { value: '3m', label: '3M' },
    { value: '6m', label: '6M' },
    { value: '1y', label: '1Y' },
    { value: 'all', label: 'All' },
  ];

  // ── Derived state ──────────────────────────────────────────────
  children = this.dataService.children;

  filteredEntries = computed(() => {
    const entries = this.dataService.growthEntries();
    const from = this.dateFrom();
    const to = this.dateTo();
    return [...entries]
      .filter(e => {
        const d = new Date(e.measuredAt);
        return (!from || d >= new Date(from)) && (!to || d <= new Date(to));
      })
      .sort((a, b) => new Date(a.measuredAt).getTime() - new Date(b.measuredAt).getTime());
  });

  state = computed<'ok' | 'no-child' | 'no-data' | 'empty' | 'single'>(() => {
    if (!this.selectedChildId()) return 'no-child';
    const entries = this.filteredEntries();
    if (entries.length === 0) return 'no-data';
    if (entries.length === 1) return 'single';
    return 'ok';
  });

  heightLabel = computed(() =>
    this.useMetric()
      ? this.i18n.t()['growthChart.heightLabel']
      : this.i18n.t()['growthChart.heightLabelImperial']
  );

  weightLabel = computed(() =>
    this.useMetric()
      ? this.i18n.t()['growthChart.weightLabel']
      : this.i18n.t()['growthChart.weightLabelImperial']
  );

  hasActiveFilters = computed(() =>
    !!this.dateFrom() || !!this.dateTo() || this.activeRange() !== 'all'
  );

  // ── Lifecycle ─────────────────────────────────────────────────
  constructor() {
    // Sync selectedChildId with active child
    effect(() => {
      const activeId = this.dataService.activeChildId();
      const children = this.dataService.children();
      if (activeId) {
        this.selectedChildId.set(activeId);
      } else if (children.length > 0) {
        this.selectedChildId.set(children[0].id);
      }
    });

    // React to growth entries changes
    this.chartEffect = effect(() => {
      // Read the signal to track it
      const _entries = this.dataService.growthEntries();
      const _childId = this.selectedChildId();
      if (this.chartInitialized) {
        this.renderChart();
      }
    });
  }

  ngOnDestroy() {
    this.chartEffect?.destroy();
    this.chartEffect = null;
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
  }

  // ── Actions ──────────────────────────────────────────────────
  onChildChange(childId: string) {
    this.selectedChildId.set(childId);
    this.dataService.switchChild(childId);
    this.dataService.loadGrowthEntries(childId);
  }

  refresh() {
    const cid = this.selectedChildId();
    if (cid) {
      this.dataService.loadGrowthEntries(cid);
      setTimeout(() => this.renderChart(), 200);
    }
  }

  onDateRangeChange() {
    this.activeRange.set(this.dateFrom() || this.dateTo() ? 'all' : 'all');
    this.renderChart();
  }

  selectRange(range: DateRange) {
    this.activeRange.set(range);
    const now = new Date();
    let from = '';
    if (range === '1m') {
      from = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).toISOString().split('T')[0];
    } else if (range === '3m') {
      from = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()).toISOString().split('T')[0];
    } else if (range === '6m') {
      from = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate()).toISOString().split('T')[0];
    } else if (range === '1y') {
      from = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()).toISOString().split('T')[0];
    } else {
      from = '';
    }
    this.dateFrom.set(from);
    this.dateTo.set('');
    this.renderChart();
  }

  clearFilters() {
    this.dateFrom.set('');
    this.dateTo.set('');
    this.activeRange.set('all');
    this.renderChart();
  }

  toggleUnit() {
    this.useMetric.set(!this.useMetric());
    this.renderChart();
  }

  // ── Chart ────────────────────────────────────────────────────
  private renderChart() {
    if (this.state() !== 'ok') return;

    // Destroy existing chart before rebuilding
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
      this.chartInitialized = false;
    }

    if (!this.chartCanvasRef) return;
    const canvas = this.chartCanvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (typeof (window as any).Chart === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
      script.onload = () => this.buildChart(ctx);
      document.head.appendChild(script);
    } else {
      this.buildChart(ctx);
    }
  }

  private buildChart(ctx: CanvasRenderingContext2D) {
    const Chart = (window as any).Chart;
    const entries = this.filteredEntries();
    const metric = this.useMetric();

    const labels = entries.map(e => this.formatDate(e.measuredAt));

    // Convert values if imperial
    const heightData = entries.map(e => {
      if (e.height === null) return null;
      return metric ? e.height : parseFloat((e.height * 0.393701).toFixed(1));
    });
    const weightData = entries.map(e => {
      if (e.weight === null) return null;
      return metric ? e.weight : parseFloat((e.weight * 2.20462).toFixed(2));
    });

    const heightUnit = metric ? 'cm' : 'in';
    const weightUnit = metric ? 'kg' : 'lb';

    const heightLabel = this.i18n.t()['growthChart.heightLabel'];
    const weightLabel = this.i18n.t()['growthChart.weightLabel'];

    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: heightLabel,
            data: heightData,
            borderColor: 'rgba(99, 102, 241, 0.9)',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            borderWidth: 2.5,
            pointBackgroundColor: 'rgba(99, 102, 241, 0.9)',
            pointBorderColor: '#fff',
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: true,
            tension: 0.4,
            yAxisID: 'y',
          },
          {
            label: weightLabel,
            data: weightData,
            borderColor: 'rgba(20, 184, 166, 0.9)',
            backgroundColor: 'rgba(20, 184, 166, 0.1)',
            borderWidth: 2.5,
            pointBackgroundColor: 'rgba(20, 184, 166, 0.9)',
            pointBorderColor: '#fff',
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: true,
            tension: 0.4,
            yAxisID: 'y1',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            display: false, // We use custom legend below canvas
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
                const v = ctx.parsed.y;
                if (v === null) return null;
                const unit = ctx.datasetIndex === 0 ? heightUnit : weightUnit;
                return ` ${ctx.dataset.label}: ${v} ${unit}`;
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
              text: heightLabel + ` (${heightUnit})`,
              color: 'rgba(99, 102, 241, 0.8)',
              font: { size: 11, weight: '600' },
            },
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: {
              callback: (v: any) => v + ` ${heightUnit}`,
              color: '#a8a29e',
              font: { size: 10 },
            },
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: weightLabel + ` (${weightUnit})`,
              color: 'rgba(20, 184, 166, 0.8)',
              font: { size: 11, weight: '600' },
            },
            grid: { drawOnChartArea: false },
            ticks: {
              callback: (v: any) => v + ` ${weightUnit}`,
              color: '#a8a29e',
              font: { size: 10 },
            },
          },
          x: {
            grid: { display: false },
            ticks: { color: '#a8a29e', font: { size: 9 }, maxTicksLimit: 8 },
          },
        },
      },
    });

    this.chartInitialized = true;
  }

  private formatDate(iso: string): string {
    const locale = this.i18n.locale() === 'sq' ? 'sq-AL' : 'en-US';
    return new Date(iso).toLocaleDateString(locale, { day: 'numeric', month: 'short' });
  }
}
