import { Component, inject, signal, computed, OnInit, AfterViewInit, ViewChild, ElementRef, effect, OnDestroy } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { I18nService } from '../core/i18n/i18n.service';

@Component({
    selector: 'app-analytics',
    imports: [CommonModule, FormsModule, LucideAngularModule],
    template: `
    <div class="max-w-2xl mx-auto px-2">

      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-3xl font-extrabold text-gray-800">{{ t()['analytics.title'] }}</h1>
          @if (activeChild()) {
            <p class="text-slate-400 text-sm mt-1 font-medium">
              {{ activeChild()?.name }}
            </p>
          }
        </div>
        <!-- Export Button -->
        <button (click)="exportCsv()"
                class="flex items-center gap-2 bg-white border-2 border-slate-200 hover:border-primary-400 hover:bg-primary-50 text-slate-600 hover:text-primary-600 px-4 py-2.5 rounded-2xl font-bold text-sm shadow-sm transition-all">
          <lucide-icon name="download" class="text-inherit"></lucide-icon>
          {{ t()['analytics.exportCsv'] }}
        </button>
      </div>

      <!-- ── Temperature Trends ───────────────────────────── -->
      <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 overflow-hidden mb-6">
        <div class="p-6 pb-2">
          <h3 class="text-lg font-extrabold text-gray-800 mb-1 flex items-center gap-2">
            <lucide-icon name="thermometer" class="text-inherit"></lucide-icon>
            {{ t()['analytics.temperatureTrend'] }}
          </h3>
          <p class="text-xs text-slate-400 font-medium">{{ t()['analytics.last7Days'] }}</p>
        </div>
        <div class="px-6 pb-6">
          @if (tempChartEntries().length === 0) {
            <div class="flex flex-col items-center py-8 text-center">
              <div class="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                <lucide-icon name="thermometer" class="text-inherit"></lucide-icon>
              </div>
              <p class="text-slate-400 font-medium">{{ t()['temperature.noReadings'] }}</p>
            </div>
          } @else {
            <canvas #tempChartCanvas class="w-full" style="max-height: 220px;"></canvas>
          }
        </div>
      </div>

      <!-- ── Growth Charts ──────────────────────────────── -->
      <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 overflow-hidden mb-6">
        <div class="p-6 pb-2">
          <h3 class="text-lg font-extrabold text-gray-800 mb-1 flex items-center gap-2">
            <lucide-icon name="trending-up" class="text-inherit"></lucide-icon>
            {{ t()['analytics.growthChart'] }}
          </h3>
          <p class="text-xs text-slate-400 font-medium">{{ t()['analytics.heightWeight'] }}</p>
        </div>
        <div class="px-6 pb-6">
          @if (growthChartEntries().length === 0) {
            <div class="flex flex-col items-center py-8 text-center">
              <div class="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                <lucide-icon name="ruler" class="text-inherit"></lucide-icon>
              </div>
              <p class="text-slate-400 font-medium">{{ t()['growth.noData'] }}</p>
            </div>
          } @else {
            <canvas #growthChartCanvas class="w-full" style="max-height: 260px;"></canvas>
          }
        </div>
      </div>

      <!-- ── Vaccine Compliance ─────────────────────────── -->
      <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 overflow-hidden mb-8">
        <div class="p-6 pb-2">
          <h3 class="text-lg font-extrabold text-gray-800 mb-1 flex items-center gap-2">
            <lucide-icon name="syringe" class="text-inherit"></lucide-icon>
            {{ t()['analytics.vaccineCompliance'] }}
          </h3>
          <p class="text-xs text-slate-400 font-medium">{{ t()['analytics.upToDateVsOverdue'] }}</p>
        </div>
        <div class="px-6 pb-6">
          <div class="flex flex-col lg:flex-row items-center gap-6">
            <!-- Pie Chart -->
            @if (vaccineSummary().total > 0) {
              <div class="flex-shrink-0">
                <canvas #vaccinePieCanvas class="w-full" style="max-width: 200px; max-height: 200px;"></canvas>
              </div>
              <div class="flex-1 space-y-4">
                <!-- Up to date -->
                <div class="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <lucide-icon name="check-circle" class="text-emerald-600"></lucide-icon>
                  </div>
                  <div class="flex-1">
                    <p class="font-bold text-emerald-700 text-sm">{{ t()['analytics.upToDate'] }}</p>
                    <p class="text-xs text-emerald-500 font-medium">{{ vaccineSummary().upToDate }} {{ t()['analytics.ofTotal'](vaccineSummary().total) }}</p>
                  </div>
                  <span class="text-2xl font-black text-emerald-600">{{ vaccineSummary().upToDate }}</span>
                </div>
                <!-- Overdue -->
                <div class="flex items-center gap-3 p-4 bg-rose-50 rounded-2xl border border-rose-100">
                  <div class="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <lucide-icon name="alert-triangle" class="text-rose-600"></lucide-icon>
                  </div>
                  <div class="flex-1">
                    <p class="font-bold text-rose-700 text-sm">{{ t()['analytics.overdue'] }}</p>
                    <p class="text-xs text-rose-500 font-medium">{{ vaccineSummary().overdue }} {{ t()['analytics.ofTotal'](vaccineSummary().total) }}</p>
                  </div>
                  <span class="text-2xl font-black text-rose-600">{{ vaccineSummary().overdue }}</span>
                </div>
                <!-- Upcoming -->
                <div class="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                  <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <lucide-icon name="clock" class="text-amber-600"></lucide-icon>
                  </div>
                  <div class="flex-1">
                    <p class="font-bold text-amber-700 text-sm">{{ t()['analytics.upcoming'] }}</p>
                    <p class="text-xs text-amber-500 font-medium">{{ vaccineSummary().upcoming }} {{ t()['analytics.ofTotal'](vaccineSummary().total) }}</p>
                  </div>
                  <span class="text-2xl font-black text-amber-600">{{ vaccineSummary().upcoming }}</span>
                </div>
              </div>
            } @else {
              <div class="flex flex-col items-center py-8 w-full text-center">
                <div class="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                  <lucide-icon name="syringe" class="text-inherit"></lucide-icon>
                </div>
                <p class="text-slate-400 font-medium">{{ t()['vaccines.emptyState'] }}</p>
              </div>
            }
          </div>
        </div>
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
export class AnalyticsComponent implements OnInit, AfterViewInit, OnDestroy {
  dataService = inject(DataService);
  i18n = inject(I18nService);

  @ViewChild('tempChartCanvas') tempChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('growthChartCanvas') growthChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('vaccinePieCanvas') vaccinePieCanvas!: ElementRef<HTMLCanvasElement>;

  private tempChartInstance: any = null;
  private growthChartInstance: any = null;
  private vaccinePieInstance: any = null;
  private chartEffect: any = null;
  private chartInitialized = false;

  activeChild = computed(() => {
    const activeId = this.dataService.activeChildId();
    return this.dataService.children().find(c => c.id === activeId);
  });

  t = computed(() => this.i18n.t());

  /** Last 7 days of temperature entries */
  tempChartEntries = computed(() => {
    const now = Date.now();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
    return this.dataService.temperatureEntries()
      .filter(e => new Date(e.measuredAt).getTime() >= sevenDaysAgo)
      .sort((a, b) => new Date(a.measuredAt).getTime() - new Date(b.measuredAt).getTime());
  });

  /** All growth entries for chart (reversed chronological) */
  growthChartEntries = computed(() => {
    return [...this.dataService.growthEntries()].reverse();
  });

  /** Vaccine compliance summary */
  vaccineSummary = computed(() => {
    const records = this.dataService.vaccineRecords();
    const total = records.length;
    const upToDate = records.filter(r => r.status === 'completed').length;
    const overdue = records.filter(r => r.status === 'overdue').length;
    const upcoming = records.filter(r => r.status === 'upcoming' || r.status === 'due').length;
    return { total, upToDate, overdue, upcoming };
  });

  ngOnInit() {
    const childId = this.dataService.activeChildId();
    if (childId) {
      this.dataService.loadTemperatureEntries(childId);
      this.dataService.loadGrowthEntries(childId);
      this.dataService.loadVaccineRecords(childId);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.renderAllCharts();
    }, 300);

    this.chartEffect = effect(() => {
      // React to data changes
      const _ = this.dataService.temperatureEntries();
      const __ = this.dataService.growthEntries();
      const ___ = this.dataService.vaccineRecords();
      if (this.chartInitialized) {
        this.renderAllCharts();
      }
    });
  }

  ngOnDestroy() {
    if (this.chartEffect) { this.chartEffect.destroy(); this.chartEffect = null; }
    if (this.tempChartInstance) { this.tempChartInstance.destroy(); this.tempChartInstance = null; }
    if (this.growthChartInstance) { this.growthChartInstance.destroy(); this.growthChartInstance = null; }
    if (this.vaccinePieInstance) { this.vaccinePieInstance.destroy(); this.vaccinePieInstance = null; }
  }

  private renderAllCharts() {
    this.renderTempChart();
    this.renderGrowthChart();
    this.renderVaccinePie();
    this.chartInitialized = true;
  }

  // ── Temperature Chart ───────────────────────────────────────

  private renderTempChart() {
    if (!this.tempChartCanvas) return;
    const canvas = this.tempChartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (this.tempChartInstance) {
      this.tempChartInstance.destroy();
      this.tempChartInstance = null;
    }

    if (typeof (window as any).Chart === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
      script.onload = () => this.buildTempChart(ctx, this.tempChartEntries());
      document.head.appendChild(script);
    } else {
      this.buildTempChart(ctx, this.tempChartEntries());
    }
  }

  private buildTempChart(ctx: CanvasRenderingContext2D, entries: any[]) {
    const Chart = (window as any).Chart;
    const labels = entries.map(e => {
      const d = new Date(e.measuredAt);
      return d.toLocaleDateString(this.i18n.locale() === 'sq' ? 'sq-AL' : 'en-US', { day: 'numeric', month: 'short' });
    });
    const data = entries.map(e => e.temperature);

    this.tempChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: '°C',
          data,
          borderColor: 'rgba(239, 68, 68, 0.85)',
          backgroundColor: 'rgba(239, 68, 68, 0.08)',
          borderWidth: 2.5,
          pointBackgroundColor: data.map(v => v >= 38.5 ? 'rgba(239, 68, 68, 1)' : 'rgba(239, 68, 68, 0.7)'),
          pointBorderColor: 'rgba(239, 68, 68, 1)',
          pointRadius: 5,
          pointHoverRadius: 7,
          fill: true,
          tension: 0.4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(255,255,255,0.95)',
            titleColor: '#1c1917',
            bodyColor: '#78716c',
            borderColor: '#e7e5e4',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: (ctx: any) => ` ${ctx.parsed.y}°C`,
            },
          },
        },
        scales: {
          y: {
            min: 35,
            max: 42,
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: {
              callback: (v: any) => v + '°',
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
  }

  // ── Growth Chart ───────────────────────────────────────────

  private renderGrowthChart() {
    if (!this.growthChartCanvas) return;
    const canvas = this.growthChartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (this.growthChartInstance) {
      this.growthChartInstance.destroy();
      this.growthChartInstance = null;
    }

    if (typeof (window as any).Chart === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
      script.onload = () => this.buildGrowthChart(ctx, this.growthChartEntries());
      document.head.appendChild(script);
    } else {
      this.buildGrowthChart(ctx, this.growthChartEntries());
    }
  }

  private buildGrowthChart(ctx: CanvasRenderingContext2D, entries: any[]) {
    const Chart = (window as any).Chart;
    const locale = this.i18n.locale() === 'sq' ? 'sq-AL' : 'en-US';

    const labels = entries.map(e => {
      const d = new Date(e.measuredAt);
      return d.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: '2-digit' });
    });
    const heightData = entries.map(e => e.height);
    const weightData = entries.map(e => e.weight);

    this.growthChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: this.t()['growth.heightLabel'] || 'Height',
            data: heightData,
            borderColor: 'rgba(99, 102, 241, 0.9)',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            borderWidth: 2.5,
            pointBackgroundColor: 'rgba(99, 102, 241, 0.9)',
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: false,
            tension: 0.4,
            yAxisID: 'y',
          },
          {
            label: this.t()['growth.weightLabel'] || 'Weight',
            data: weightData,
            borderColor: 'rgba(20, 184, 166, 0.9)',
            backgroundColor: 'rgba(20, 184, 166, 0.1)',
            borderWidth: 2.5,
            pointBackgroundColor: 'rgba(20, 184, 166, 0.9)',
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
        interaction: { mode: 'index', intersect: false },
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
                return ctx.datasetIndex === 0 ? ` ${label}: ${value} cm` : ` ${label}: ${value} kg`;
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
              text: 'cm',
              color: 'rgba(99, 102, 241, 0.8)',
              font: { size: 11, weight: '600' },
            },
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: { callback: (v: any) => v + ' cm', color: '#a8a29e', font: { size: 11 } },
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'kg',
              color: 'rgba(20, 184, 166, 0.8)',
              font: { size: 11, weight: '600' },
            },
            grid: { drawOnChartArea: false },
            ticks: { callback: (v: any) => v + ' kg', color: '#a8a29e', font: { size: 11 } },
          },
          x: {
            grid: { display: false },
            ticks: { color: '#a8a29e', font: { size: 10 } },
          },
        },
      },
    });
  }

  // ── Vaccine Pie Chart ──────────────────────────────────────

  private renderVaccinePie() {
    if (!this.vaccinePieCanvas) return;
    const canvas = this.vaccinePieCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (this.vaccinePieInstance) {
      this.vaccinePieInstance.destroy();
      this.vaccinePieInstance = null;
    }

    const summary = this.vaccineSummary();
    if (summary.total === 0) return;

    if (typeof (window as any).Chart === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
      script.onload = () => this.buildVaccinePie(ctx, summary);
      document.head.appendChild(script);
    } else {
      this.buildVaccinePie(ctx, summary);
    }
  }

  private buildVaccinePie(ctx: CanvasRenderingContext2D, summary: any) {
    const Chart = (window as any).Chart;

    this.vaccinePieInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [
          this.t()['analytics.upToDate'] || 'Up to date',
          this.t()['analytics.overdue'] || 'Overdue',
          this.t()['analytics.upcoming'] || 'Upcoming',
        ],
        datasets: [{
          data: [summary.upToDate, summary.overdue, summary.upcoming],
          backgroundColor: [
            'rgba(16, 185, 129, 0.85)',   // emerald — up to date
            'rgba(239, 68, 68, 0.85)',    // rose — overdue
            'rgba(245, 158, 11, 0.85)',   // amber — upcoming
          ],
          borderColor: [
            'rgba(16, 185, 129, 1)',
            'rgba(239, 68, 68, 1)',
            'rgba(245, 158, 11, 1)',
          ],
          borderWidth: 2,
          hoverOffset: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: '60%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(255,255,255,0.95)',
            titleColor: '#1c1917',
            bodyColor: '#78716c',
            borderColor: '#e7e5e4',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: (ctx: any) => ` ${ctx.label}: ${ctx.parsed}`,
            },
          },
        },
      },
    });
  }

  // ── Export ─────────────────────────────────────────────────

  async exportCsv() {
    const childId = this.dataService.activeChildId();
    if (!childId) return;
    try {
      await this.dataService.exportChildCsv(childId);
    } catch (err) {
      console.error('[Analytics] CSV export failed:', err);
    }
  }
}