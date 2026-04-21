import { Component, inject, signal, computed, OnInit, AfterViewInit, ViewChild, ElementRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, TemperatureEntry } from '../services/data.service';
import { I18nService } from '../core/i18n/i18n.service';

@Component({
    selector: 'app-temperature-diary',
    imports: [CommonModule, FormsModule],
    template: `
    <div class="max-w-2xl mx-auto px-2">

      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-3xl font-extrabold text-gray-800">{{ i18n.t()['nav.temperatureDiary'] }}</h1>
          @if (activeChild()) {
            <p class="text-slate-400 text-sm mt-1 font-medium">
              {{ activeChild()?.name }}
            </p>
          }
        </div>
      </div>

      <!-- High Temperature Alert Banner -->
      @if (latestEntry() && latestEntry()!.temperature > 38.5) {
        <div class="mb-6 p-5 bg-rose-50 border-2 border-rose-200 rounded-3xl flex items-center gap-4 animate-slide-up shadow-sm">
          <div class="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span class="material-icons text-rose-500 text-2xl">warning</span>
          </div>
          <div class="flex-1">
            <p class="font-black text-rose-700 text-lg">{{ i18n.t()['temperature.alertHigh'] }}</p>
            <p class="text-rose-500 text-sm font-medium mt-0.5">{{ latestEntry()?.temperature }}°C</p>
          </div>
        </div>
      }

      <!-- Main Temperature Display Card -->
      <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 overflow-hidden mb-6">
        <div class="p-8 flex flex-col items-center">
          <p class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">{{ i18n.t()['temperature.current'] }}</p>

          @if (latestEntry()) {
            <!-- Current temperature large display -->
            <div class="relative mb-4">
              <span class="text-7xl font-black"
                    [ngClass]="tempColorClass(latestEntry()!.temperature)">
                {{ latestEntry()?.temperature }}
              </span>
              <span class="text-3xl font-bold text-slate-300 ml-1">°C</span>
              @if (latestEntry()!.temperature >= 38.5) {
                <span class="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 rounded-full animate-pulse"></span>
              }
            </div>
            <p class="text-slate-400 text-sm font-medium">
              {{ formatTime(latestEntry()!.measuredAt) }} &bull; {{ locationLabel(latestEntry()?.location) }}
            </p>
          } @else {
            <div class="py-8">
              <span class="text-6xl font-black text-slate-200">--.-</span>
              <span class="text-2xl font-bold text-slate-300 ml-1">°C</span>
            </div>
            <p class="text-slate-400 text-sm font-medium mt-2">{{ i18n.t()['temperature.noReadings'] }}</p>
          }
        </div>

        <!-- Quick Add Buttons -->
        <div class="px-8 pb-8">
          <p class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-center">{{ i18n.t()['temperature.quickAdd'] }}</p>
          <div class="grid grid-cols-5 gap-2">
            @for (temp of quickTemps; track temp) {
              <button (click)="setQuickTemp(temp)"
                      class="py-3 rounded-2xl text-sm font-bold transition-all border-2"
                      [ngClass]="formTemp() === temp
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-600'">
                {{ temp }}°
              </button>
            }
          </div>
        </div>
      </div>

      <!-- Add New Reading Form -->
      <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 overflow-hidden mb-6">
        <div class="p-6">
          <h3 class="text-lg font-extrabold text-gray-800 mb-5 flex items-center gap-2">
            <span class="material-icons text-primary-500">add_circle</span>
            {{ i18n.t()['temperature.newReading'] }}
          </h3>

          <div class="space-y-5">
            <!-- Temperature Input -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['temperature.value'] }}</label>
              <div class="flex items-center gap-3">
                <input type="number" step="0.1" [(ngModel)]="formTemp"
                       class="flex-1 px-5 py-4 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-2xl font-black text-gray-800 placeholder-slate-300"
                       placeholder="38.5"
                       min="35" max="42">
                <span class="text-2xl font-bold text-slate-400">°C</span>
              </div>
              @if (formTemp() !== null && (formTemp()! < 35 || formTemp()! > 42)) {
                <p class="mt-1 text-xs text-red-500 font-medium">35°C – 42°C</p>
              }
            </div>

            <!-- Time -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['temperature.time'] }}</label>
              <input type="datetime-local" [(ngModel)]="formTime"
                     class="w-full px-5 py-4 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800">
            </div>

            <!-- Location Selector -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['temperature.location'] }}</label>
              <div class="flex flex-wrap gap-2">
                @for (loc of locations; track loc.value) {
                  <button type="button" (click)="formLocation.set(loc.value)"
                          class="px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all
                                 {{ formLocation() === loc.value
                                    ? 'bg-primary-600 text-white border-primary-600'
                                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-primary-200 hover:text-primary-600' }}">
                    {{ loc.label() }}
                  </button>
                }
              </div>
            </div>

            <!-- Notes -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['temperature.notes'] }}</label>
              <textarea [(ngModel)]="formNotes" rows="2"
                        class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 resize-none text-sm"
                        [placeholder]="i18n.t()['temperature.notes']"></textarea>
            </div>

            <!-- Save Button -->
            <button (click)="saveReading()"
                    [disabled]="!canSave() || saving()"
                    class="w-full py-4.5 rounded-2xl font-bold text-base shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                    [ngClass]="saving()
                      ? 'bg-slate-200 text-slate-400'
                      : 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white hover:shadow-lg'">
              @if (saving()) {
                <span class="material-icons animate-spin">progress_activity</span>
                {{ i18n.t()['temperature.saving'] }}
              } @else if (saved()) {
                <span class="material-icons text-teal-300">check_circle</span>
                {{ i18n.t()['temperature.saved'] }}
              } @else {
                <span class="material-icons">save</span>
                {{ i18n.t()['temperature.save'] }}
              }
            </button>
          </div>
        </div>
      </div>

      <!-- 7-Day Trend Chart -->
      <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 overflow-hidden mb-6">
        <div class="p-6">
          <h3 class="text-lg font-extrabold text-gray-800 mb-1 flex items-center gap-2">
            <span class="material-icons text-teal-500">show_chart</span>
            {{ i18n.t()['temperature.trend'] }}
          </h3>
        </div>
        <div class="px-6 pb-6">
          <canvas #chartCanvas class="w-full" style="max-height: 220px;"></canvas>
        </div>
      </div>

      <!-- Recent Readings -->
      <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 overflow-hidden mb-8">
        <div class="p-6 pb-4">
          <h3 class="text-lg font-extrabold text-gray-800 flex items-center gap-2">
            <span class="material-icons text-primary-500">history</span>
            {{ i18n.t()['temperature.recent'] }}
          </h3>
        </div>

        @if (recentReadings().length === 0) {
          <div class="px-6 pb-8 text-center">
            <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="material-icons text-4xl text-slate-300">thermostat</span>
            </div>
            <p class="text-slate-400 font-medium mb-3">{{ i18n.t()['temperature.noReadings'] }}</p>
            <p class="text-primary-600 font-bold text-sm">{{ i18n.t()['temperature.addFirst'] }}</p>
          </div>
        } @else {
          <div class="px-6 pb-6 space-y-3">
            @for (entry of recentReadings(); track entry.id) {
              <div class="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-primary-200 hover:bg-primary-50/30 transition-all group">
                <!-- Color indicator dot -->
                <div class="w-3 h-3 rounded-full flex-shrink-0"
                     [ngClass]="tempDotClass(entry.temperature)">
                </div>
                <!-- Temp value -->
                <span class="text-xl font-black"
                      [ngClass]="tempTextClass(entry.temperature)">
                  {{ entry.temperature }}°
                </span>
                <!-- Time & location -->
                <div class="flex-1">
                  <p class="text-sm font-semibold text-gray-700">{{ formatTime(entry.measuredAt) }}</p>
                  <p class="text-xs text-slate-400 font-medium">{{ formatDate(entry.measuredAt) }} &bull; {{ locationLabel(entry.location) }}</p>
                </div>
                <!-- Delete button -->
                <button (click)="deleteEntry(entry.id)"
                        class="opacity-0 group-hover:opacity-100 w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-400 hover:text-red-600 transition-all border border-red-100">
                  <span class="material-icons text-sm">delete_outline</span>
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
export class TemperatureDiaryComponent implements OnInit, AfterViewInit {
  dataService = inject(DataService);
  i18n = inject(I18nService);

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  quickTemps = [37.5, 38.0, 38.5, 39.0, 39.5];

  locations = [
    { value: 'forehead', label: () => this.i18n.t()['temperature.location.forehead'] },
    { value: 'ear', label: () => this.i18n.t()['temperature.location.ear'] },
    { value: 'oral', label: () => this.i18n.t()['temperature.location.oral'] },
    { value: 'axillary', label: () => this.i18n.t()['temperature.location.axillary'] },
    { value: 'rectal', label: () => this.i18n.t()['temperature.location.rectal'] },
  ];

  // Form state
  formTemp = signal<number | null>(null);
  formLocation = signal('forehead');
  formNotes = '';
  formTime = this.defaultTime();
  saving = signal(false);
  saved = signal(false);

  private chartInstance: any = null;
  private chartInitialized = false;

  activeChild = computed(() => {
    const activeId = this.dataService.activeChildId();
    return this.dataService.children().find(c => c.id === activeId);
  });

  latestEntry = computed(() => {
    const entries = this.dataService.temperatureEntries();
    if (!entries.length) return null;
    return entries[0];
  });

  recentReadings = computed(() => {
    return this.dataService.temperatureEntries().slice(0, 10);
  });

  weekEntries = computed(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return this.dataService.temperatureEntries()
      .filter(e => new Date(e.measuredAt) >= weekAgo)
      .sort((a, b) => new Date(a.measuredAt).getTime() - new Date(b.measuredAt).getTime());
  });

  ngOnInit() {
    const childId = this.dataService.activeChildId();
    if (childId) {
      this.dataService.loadTemperatureEntries(childId);
    }
  }

  ngAfterViewInit() {
    // Render chart after view init
    setTimeout(() => this.renderChart(), 100);

    // React to data changes
    effect(() => {
      const entries = this.dataService.temperatureEntries();
      if (entries && this.chartInitialized) {
        this.renderChart();
      }
    });
  }

  private defaultTime(): string {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  }

  setQuickTemp(temp: number) {
    this.formTemp.set(temp);
  }

  canSave(): boolean {
    const t = this.formTemp();
    return !!t && t >= 35 && t <= 42;
  }

  async saveReading() {
    const childId = this.dataService.activeChildId();
    if (!childId || !this.canSave()) return;

    this.saving.set(true);
    this.saved.set(false);

    const measuredAt = this.formTime ? new Date(this.formTime).toISOString() : new Date().toISOString();

    const result = await this.dataService.createTemperatureEntry({
      childId,
      temperature: this.formTemp()!,
      measuredAt,
      location: this.formLocation(),
      notes: this.formNotes || undefined,
    });

    this.saving.set(false);
    if (result) {
      this.saved.set(true);
      setTimeout(() => this.saved.set(false), 2500);
      // Reset form
      this.formTemp.set(null);
      this.formLocation.set('forehead');
      this.formNotes = '';
      this.formTime = this.defaultTime();
      // Re-render chart
      setTimeout(() => this.renderChart(), 100);
    }
  }

  async deleteEntry(id: string) {
    await this.dataService.deleteTemperatureEntry(id);
    setTimeout(() => this.renderChart(), 100);
  }

  // ── Helpers ────────────────────────────────────────────────────

  formatTime(iso: string): string {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleTimeString(this.i18n.locale() === 'sq' ? 'sq-AL' : 'en-US', { hour: '2-digit', minute: '2-digit' });
  }

  formatDate(iso: string): string {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString(this.i18n.locale() === 'sq' ? 'sq-AL' : 'en-US', { day: 'numeric', month: 'short' });
  }

  locationLabel(loc?: string): string {
    if (!loc) return '';
    const map: Record<string, string> = {
      forehead: this.i18n.t()['temperature.location.forehead'],
      ear: this.i18n.t()['temperature.location.ear'],
      oral: this.i18n.t()['temperature.location.oral'],
      axillary: this.i18n.t()['temperature.location.axillary'],
      rectal: this.i18n.t()['temperature.location.rectal'],
    };
    return map[loc] ?? loc;
  }

  tempColorClass(temp: number): string {
    if (temp >= 38.5) return 'text-rose-500';
    if (temp >= 37.5) return 'text-orange-400';
    return 'text-teal-500';
  }

  tempTextClass(temp: number): string {
    if (temp >= 38.5) return 'text-rose-500';
    if (temp >= 37.5) return 'text-orange-400';
    return 'text-teal-500';
  }

  tempDotClass(temp: number): string {
    if (temp >= 38.5) return 'bg-rose-500';
    if (temp >= 37.5) return 'bg-orange-400';
    return 'bg-teal-400';
  }

  // ── Chart ──────────────────────────────────────────────────────

  private renderChart() {
    if (!this.chartCanvas) return;
    const canvas = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Destroy previous chart
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }

    const entries = this.weekEntries();

    // Dynamically load Chart.js if not available
    if (typeof (window as any).Chart === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
      script.onload = () => this.buildChart(ctx, entries);
      document.head.appendChild(script);
    } else {
      this.buildChart(ctx, entries);
    }
  }

  private buildChart(ctx: CanvasRenderingContext2D, entries: TemperatureEntry[]) {
    const Chart = (window as any).Chart;

    const labels = entries.map(e => this.formatDate(e.measuredAt));
    const data = entries.map(e => e.temperature);

    // Color for each point
    const colors = entries.map(e =>
      e.temperature >= 38.5 ? 'rgba(244, 63, 94, 1)' :
      e.temperature >= 37.5 ? 'rgba(249, 115, 22, 1)' :
      'rgba(20, 184, 166, 1)'
    );
    const bgColors = entries.map(e =>
      e.temperature >= 38.5 ? 'rgba(244, 63, 94, 0.15)' :
      e.temperature >= 37.5 ? 'rgba(249, 115, 22, 0.15)' :
      'rgba(20, 184, 166, 0.15)'
    );

    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: '°C',
          data,
          borderColor: 'rgba(99, 102, 241, 0.8)',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          borderWidth: 2.5,
          pointBackgroundColor: colors,
          pointBorderColor: colors,
          pointRadius: 6,
          pointHoverRadius: 8,
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
            ticks: { color: '#a8a29e', font: { size: 11 } },
          },
        },
      },
      plugins: [{
        id: 'feverLine',
        beforeDraw: (chart: any) => {
          const yPos = chart.scales.y.getPixelForValue(38.0);
          const ctx2 = chart.ctx;
          ctx2.save();
          ctx2.beginPath();
          ctx2.setLineDash([5, 5]);
          ctx2.strokeStyle = 'rgba(244, 63, 94, 0.4)';
          ctx2.lineWidth = 1.5;
          ctx2.moveTo(chart.chartArea.left, yPos);
          ctx2.lineTo(chart.chartArea.right, yPos);
          ctx2.stroke();
          ctx2.restore();

          // Label
          ctx2.save();
          ctx2.fillStyle = 'rgba(244, 63, 94, 0.5)';
          ctx2.font = '10px Inter, sans-serif';
          ctx2.fillText('38°C', chart.chartArea.right - 30, yPos - 4);
          ctx2.restore();
        },
      }],
    });

    this.chartInitialized = true;
  }
}