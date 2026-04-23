import {
  CommonModule,
  FormsModule,
  LucideAngularComponent,
  LucideAngularModule
} from "./chunk-IFHIJ3FQ.js";
import {
  DataService,
  I18nService
} from "./chunk-UDF3JGT5.js";
import {
  Component,
  ViewChild,
  __async,
  computed,
  effect,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵqueryRefresh,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-SFGRG2UU.js";

// src/app/components/analytics.component.ts
var _c0 = ["tempChartCanvas"];
var _c1 = ["growthChartCanvas"];
var _c2 = ["vaccinePieCanvas"];
function AnalyticsComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_1_0 = ctx_r0.activeChild()) == null ? null : tmp_1_0.name, " ");
  }
}
function AnalyticsComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 23);
    \u0275\u0275element(2, "lucide-icon", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 24);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t()["temperature.noReadings"]);
  }
}
function AnalyticsComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "canvas", 16, 0);
  }
}
function AnalyticsComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 23);
    \u0275\u0275element(2, "lucide-icon", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 24);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t()["growth.noData"]);
  }
}
function AnalyticsComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "canvas", 18, 1);
  }
}
function AnalyticsComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275element(1, "canvas", 27, 2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 28)(4, "div", 29)(5, "div", 30);
    \u0275\u0275element(6, "lucide-icon", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 32)(8, "p", 33);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 34);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "span", 35);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 36)(15, "div", 37);
    \u0275\u0275element(16, "lucide-icon", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 32)(18, "p", 39);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "p", 40);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "span", 41);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 42)(25, "div", 43);
    \u0275\u0275element(26, "lucide-icon", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 32)(28, "p", 45);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "p", 46);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "span", 47);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r0.t()["analytics.upToDate"]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r0.vaccineSummary().upToDate, " ", ctx_r0.ofTotalLabel(ctx_r0.vaccineSummary().total));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.vaccineSummary().upToDate);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.t()["analytics.overdue"]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r0.vaccineSummary().overdue, " ", ctx_r0.ofTotalLabel(ctx_r0.vaccineSummary().total));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.vaccineSummary().overdue);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.t()["analytics.upcoming"]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r0.vaccineSummary().upcoming, " ", ctx_r0.ofTotalLabel(ctx_r0.vaccineSummary().total));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.vaccineSummary().upcoming);
  }
}
function AnalyticsComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 23);
    \u0275\u0275element(2, "lucide-icon", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 24);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.t()["vaccines.emptyState"]);
  }
}
var AnalyticsComponent = class _AnalyticsComponent {
  constructor() {
    this.dataService = inject(DataService);
    this.i18n = inject(I18nService);
    this.tempChartInstance = null;
    this.growthChartInstance = null;
    this.vaccinePieInstance = null;
    this.chartEffect = null;
    this.chartInitialized = false;
    this.activeChild = computed(() => {
      const activeId = this.dataService.activeChildId();
      return this.dataService.children().find((c) => c.id === activeId);
    }, ...ngDevMode ? [{ debugName: "activeChild" }] : (
      /* istanbul ignore next */
      []
    ));
    this.t = computed(() => this.i18n.t(), ...ngDevMode ? [{ debugName: "t" }] : (
      /* istanbul ignore next */
      []
    ));
    this.tempChartEntries = computed(() => {
      const now = Date.now();
      const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1e3;
      return this.dataService.temperatureEntries().filter((e) => new Date(e.measuredAt).getTime() >= sevenDaysAgo).sort((a, b) => new Date(a.measuredAt).getTime() - new Date(b.measuredAt).getTime());
    }, ...ngDevMode ? [{ debugName: "tempChartEntries" }] : (
      /* istanbul ignore next */
      []
    ));
    this.growthChartEntries = computed(() => {
      return [...this.dataService.growthEntries()].reverse();
    }, ...ngDevMode ? [{ debugName: "growthChartEntries" }] : (
      /* istanbul ignore next */
      []
    ));
    this.vaccineSummary = computed(() => {
      const records = this.dataService.vaccineRecords();
      const total = records.length;
      const upToDate = records.filter((r) => r.status === "completed").length;
      const overdue = records.filter((r) => r.status === "overdue").length;
      const upcoming = records.filter((r) => r.status === "upcoming" || r.status === "due").length;
      return { total, upToDate, overdue, upcoming };
    }, ...ngDevMode ? [{ debugName: "vaccineSummary" }] : (
      /* istanbul ignore next */
      []
    ));
  }
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
      const _ = this.dataService.temperatureEntries();
      const __ = this.dataService.growthEntries();
      const ___ = this.dataService.vaccineRecords();
      if (this.chartInitialized) {
        this.renderAllCharts();
      }
    }, ...ngDevMode ? [{ debugName: "chartEffect" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  ngOnDestroy() {
    if (this.chartEffect) {
      this.chartEffect.destroy();
      this.chartEffect = null;
    }
    if (this.tempChartInstance) {
      this.tempChartInstance.destroy();
      this.tempChartInstance = null;
    }
    if (this.growthChartInstance) {
      this.growthChartInstance.destroy();
      this.growthChartInstance = null;
    }
    if (this.vaccinePieInstance) {
      this.vaccinePieInstance.destroy();
      this.vaccinePieInstance = null;
    }
  }
  ofTotalLabel(total) {
    const key = this.t()["analytics.ofTotal"];
    return key.replace("{n}", String(total));
  }
  renderAllCharts() {
    this.renderTempChart();
    this.renderGrowthChart();
    this.renderVaccinePie();
    this.chartInitialized = true;
  }
  // ── Temperature Chart ───────────────────────────────────────
  renderTempChart() {
    if (!this.tempChartCanvas)
      return;
    const canvas = this.tempChartCanvas.nativeElement;
    const ctx = canvas.getContext("2d");
    if (!ctx)
      return;
    if (this.tempChartInstance) {
      this.tempChartInstance.destroy();
      this.tempChartInstance = null;
    }
    if (typeof window.Chart === "undefined") {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js";
      script.onload = () => this.buildTempChart(ctx, this.tempChartEntries());
      document.head.appendChild(script);
    } else {
      this.buildTempChart(ctx, this.tempChartEntries());
    }
  }
  buildTempChart(ctx, entries) {
    const Chart = window.Chart;
    const labels = entries.map((e) => {
      const d = new Date(e.measuredAt);
      return d.toLocaleDateString(this.i18n.locale() === "sq" ? "sq-AL" : "en-US", { day: "numeric", month: "short" });
    });
    const data = entries.map((e) => e.temperature);
    this.tempChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "\xB0C",
          data,
          borderColor: "rgba(239, 68, 68, 0.85)",
          backgroundColor: "rgba(239, 68, 68, 0.08)",
          borderWidth: 2.5,
          pointBackgroundColor: data.map((v) => v >= 38.5 ? "rgba(239, 68, 68, 1)" : "rgba(239, 68, 68, 0.7)"),
          pointBorderColor: "rgba(239, 68, 68, 1)",
          pointRadius: 5,
          pointHoverRadius: 7,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(255,255,255,0.95)",
            titleColor: "#1c1917",
            bodyColor: "#78716c",
            borderColor: "#e7e5e4",
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: (ctx2) => ` ${ctx2.parsed.y}\xB0C`
            }
          }
        },
        scales: {
          y: {
            min: 35,
            max: 42,
            grid: { color: "rgba(0,0,0,0.05)" },
            ticks: {
              callback: (v) => v + "\xB0",
              color: "#a8a29e",
              font: { size: 11 }
            }
          },
          x: {
            grid: { display: false },
            ticks: { color: "#a8a29e", font: { size: 10 } }
          }
        }
      }
    });
  }
  // ── Growth Chart ───────────────────────────────────────────
  renderGrowthChart() {
    if (!this.growthChartCanvas)
      return;
    const canvas = this.growthChartCanvas.nativeElement;
    const ctx = canvas.getContext("2d");
    if (!ctx)
      return;
    if (this.growthChartInstance) {
      this.growthChartInstance.destroy();
      this.growthChartInstance = null;
    }
    if (typeof window.Chart === "undefined") {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js";
      script.onload = () => this.buildGrowthChart(ctx, this.growthChartEntries());
      document.head.appendChild(script);
    } else {
      this.buildGrowthChart(ctx, this.growthChartEntries());
    }
  }
  buildGrowthChart(ctx, entries) {
    const Chart = window.Chart;
    const locale = this.i18n.locale() === "sq" ? "sq-AL" : "en-US";
    const labels = entries.map((e) => {
      const d = new Date(e.measuredAt);
      return d.toLocaleDateString(locale, { day: "numeric", month: "short", year: "2-digit" });
    });
    const heightData = entries.map((e) => e.height);
    const weightData = entries.map((e) => e.weight);
    this.growthChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: this.t()["growth.heightLabel"] || "Height",
            data: heightData,
            borderColor: "rgba(99, 102, 241, 0.9)",
            backgroundColor: "rgba(99, 102, 241, 0.1)",
            borderWidth: 2.5,
            pointBackgroundColor: "rgba(99, 102, 241, 0.9)",
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: false,
            tension: 0.4,
            yAxisID: "y"
          },
          {
            label: this.t()["growth.weightLabel"] || "Weight",
            data: weightData,
            borderColor: "rgba(20, 184, 166, 0.9)",
            backgroundColor: "rgba(20, 184, 166, 0.1)",
            borderWidth: 2.5,
            pointBackgroundColor: "rgba(20, 184, 166, 0.9)",
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: false,
            tension: 0.4,
            yAxisID: "y1"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              color: "#78716c",
              font: { size: 12, weight: "600" },
              usePointStyle: true,
              pointStyle: "circle"
            }
          },
          tooltip: {
            backgroundColor: "rgba(255,255,255,0.95)",
            titleColor: "#1c1917",
            bodyColor: "#78716c",
            borderColor: "#e7e5e4",
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: (ctx2) => {
                const label = ctx2.dataset.label;
                const value = ctx2.parsed.y;
                if (value === null)
                  return null;
                return ctx2.datasetIndex === 0 ? ` ${label}: ${value} cm` : ` ${label}: ${value} kg`;
              }
            }
          }
        },
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "left",
            title: {
              display: true,
              text: "cm",
              color: "rgba(99, 102, 241, 0.8)",
              font: { size: 11, weight: "600" }
            },
            grid: { color: "rgba(0,0,0,0.05)" },
            ticks: { callback: (v) => v + " cm", color: "#a8a29e", font: { size: 11 } }
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: "kg",
              color: "rgba(20, 184, 166, 0.8)",
              font: { size: 11, weight: "600" }
            },
            grid: { drawOnChartArea: false },
            ticks: { callback: (v) => v + " kg", color: "#a8a29e", font: { size: 11 } }
          },
          x: {
            grid: { display: false },
            ticks: { color: "#a8a29e", font: { size: 10 } }
          }
        }
      }
    });
  }
  // ── Vaccine Pie Chart ──────────────────────────────────────
  renderVaccinePie() {
    if (!this.vaccinePieCanvas)
      return;
    const canvas = this.vaccinePieCanvas.nativeElement;
    const ctx = canvas.getContext("2d");
    if (!ctx)
      return;
    if (this.vaccinePieInstance) {
      this.vaccinePieInstance.destroy();
      this.vaccinePieInstance = null;
    }
    const summary = this.vaccineSummary();
    if (summary.total === 0)
      return;
    if (typeof window.Chart === "undefined") {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js";
      script.onload = () => this.buildVaccinePie(ctx, summary);
      document.head.appendChild(script);
    } else {
      this.buildVaccinePie(ctx, summary);
    }
  }
  buildVaccinePie(ctx, summary) {
    const Chart = window.Chart;
    this.vaccinePieInstance = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [
          this.t()["analytics.upToDate"] || "Up to date",
          this.t()["analytics.overdue"] || "Overdue",
          this.t()["analytics.upcoming"] || "Upcoming"
        ],
        datasets: [{
          data: [summary.upToDate, summary.overdue, summary.upcoming],
          backgroundColor: [
            "rgba(16, 185, 129, 0.85)",
            // emerald — up to date
            "rgba(239, 68, 68, 0.85)",
            // rose — overdue
            "rgba(245, 158, 11, 0.85)"
            // amber — upcoming
          ],
          borderColor: [
            "rgba(16, 185, 129, 1)",
            "rgba(239, 68, 68, 1)",
            "rgba(245, 158, 11, 1)"
          ],
          borderWidth: 2,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: "60%",
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(255,255,255,0.95)",
            titleColor: "#1c1917",
            bodyColor: "#78716c",
            borderColor: "#e7e5e4",
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: (ctx2) => ` ${ctx2.label}: ${ctx2.parsed}`
            }
          }
        }
      }
    });
  }
  // ── Export ─────────────────────────────────────────────────
  exportCsv() {
    return __async(this, null, function* () {
      const childId = this.dataService.activeChildId();
      if (!childId)
        return;
      try {
        yield this.dataService.exportChildCsv(childId);
      } catch (err) {
        console.error("[Analytics] CSV export failed:", err);
      }
    });
  }
  static {
    this.\u0275fac = function AnalyticsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AnalyticsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AnalyticsComponent, selectors: [["app-analytics"]], viewQuery: function AnalyticsComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5)(_c1, 5)(_c2, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tempChartCanvas = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.growthChartCanvas = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.vaccinePieCanvas = _t.first);
      }
    }, decls: 40, vars: 12, consts: [["tempChartCanvas", ""], ["growthChartCanvas", ""], ["vaccinePieCanvas", ""], [1, "max-w-2xl", "mx-auto", "px-2"], [1, "flex", "items-center", "justify-between", "mb-6"], [1, "text-3xl", "font-extrabold", "text-gray-800"], [1, "text-slate-400", "text-sm", "mt-1", "font-medium"], [1, "flex", "items-center", "gap-2", "bg-white", "border-2", "border-slate-200", "hover:border-primary-400", "hover:bg-primary-50", "text-slate-600", "hover:text-primary-600", "px-4", "py-2.5", "rounded-2xl", "font-bold", "text-sm", "shadow-sm", "transition-all", 3, "click"], ["name", "download", 1, "text-inherit"], [1, "bg-white", "rounded-[2rem]", "shadow-md", "border", "border-slate-100", "overflow-hidden", "mb-6"], [1, "p-6", "pb-2"], [1, "text-lg", "font-extrabold", "text-gray-800", "mb-1", "flex", "items-center", "gap-2"], ["name", "thermometer", 1, "text-inherit"], [1, "text-xs", "text-slate-400", "font-medium"], [1, "px-6", "pb-6"], [1, "flex", "flex-col", "items-center", "py-8", "text-center"], [1, "w-full", 2, "max-height", "220px"], ["name", "trending-up", 1, "text-inherit"], [1, "w-full", 2, "max-height", "260px"], [1, "bg-white", "rounded-[2rem]", "shadow-md", "border", "border-slate-100", "overflow-hidden", "mb-8"], ["name", "syringe", 1, "text-inherit"], [1, "flex", "flex-col", "lg:flex-row", "items-center", "gap-6"], [1, "flex", "flex-col", "items-center", "py-8", "w-full", "text-center"], [1, "w-14", "h-14", "bg-slate-100", "rounded-full", "flex", "items-center", "justify-center", "mb-3"], [1, "text-slate-400", "font-medium"], ["name", "ruler", 1, "text-inherit"], [1, "flex-shrink-0"], [1, "w-full", 2, "max-width", "200px", "max-height", "200px"], [1, "flex-1", "space-y-4"], [1, "flex", "items-center", "gap-3", "p-4", "bg-emerald-50", "rounded-2xl", "border", "border-emerald-100"], [1, "w-10", "h-10", "bg-emerald-100", "rounded-full", "flex", "items-center", "justify-center", "flex-shrink-0"], ["name", "check-circle", 1, "text-emerald-600"], [1, "flex-1"], [1, "font-bold", "text-emerald-700", "text-sm"], [1, "text-xs", "text-emerald-500", "font-medium"], [1, "text-2xl", "font-black", "text-emerald-600"], [1, "flex", "items-center", "gap-3", "p-4", "bg-rose-50", "rounded-2xl", "border", "border-rose-100"], [1, "w-10", "h-10", "bg-rose-100", "rounded-full", "flex", "items-center", "justify-center", "flex-shrink-0"], ["name", "alert-triangle", 1, "text-rose-600"], [1, "font-bold", "text-rose-700", "text-sm"], [1, "text-xs", "text-rose-500", "font-medium"], [1, "text-2xl", "font-black", "text-rose-600"], [1, "flex", "items-center", "gap-3", "p-4", "bg-amber-50", "rounded-2xl", "border", "border-amber-100"], [1, "w-10", "h-10", "bg-amber-100", "rounded-full", "flex", "items-center", "justify-center", "flex-shrink-0"], ["name", "clock", 1, "text-amber-600"], [1, "font-bold", "text-amber-700", "text-sm"], [1, "text-xs", "text-amber-500", "font-medium"], [1, "text-2xl", "font-black", "text-amber-600"]], template: function AnalyticsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 3)(1, "div", 4)(2, "div")(3, "h1", 5);
        \u0275\u0275text(4);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(5, AnalyticsComponent_Conditional_5_Template, 2, 1, "p", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "button", 7);
        \u0275\u0275listener("click", function AnalyticsComponent_Template_button_click_6_listener() {
          return ctx.exportCsv();
        });
        \u0275\u0275element(7, "lucide-icon", 8);
        \u0275\u0275text(8);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "div", 9)(10, "div", 10)(11, "h3", 11);
        \u0275\u0275element(12, "lucide-icon", 12);
        \u0275\u0275text(13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "p", 13);
        \u0275\u0275text(15);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(16, "div", 14);
        \u0275\u0275conditionalCreate(17, AnalyticsComponent_Conditional_17_Template, 5, 1, "div", 15)(18, AnalyticsComponent_Conditional_18_Template, 2, 0, "canvas", 16);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "div", 9)(20, "div", 10)(21, "h3", 11);
        \u0275\u0275element(22, "lucide-icon", 17);
        \u0275\u0275text(23);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "p", 13);
        \u0275\u0275text(25);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(26, "div", 14);
        \u0275\u0275conditionalCreate(27, AnalyticsComponent_Conditional_27_Template, 5, 1, "div", 15)(28, AnalyticsComponent_Conditional_28_Template, 2, 0, "canvas", 18);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(29, "div", 19)(30, "div", 10)(31, "h3", 11);
        \u0275\u0275element(32, "lucide-icon", 20);
        \u0275\u0275text(33);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "p", 13);
        \u0275\u0275text(35);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(36, "div", 14)(37, "div", 21);
        \u0275\u0275conditionalCreate(38, AnalyticsComponent_Conditional_38_Template, 34, 12)(39, AnalyticsComponent_Conditional_39_Template, 5, 1, "div", 22);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.t()["analytics.title"]);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.activeChild() ? 5 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", ctx.t()["analytics.exportCsv"], " ");
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1(" ", ctx.t()["analytics.temperatureTrend"], " ");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.t()["analytics.last7Days"]);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.tempChartEntries().length === 0 ? 17 : 18);
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate1(" ", ctx.t()["analytics.growthChart"], " ");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.t()["analytics.heightWeight"]);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.growthChartEntries().length === 0 ? 27 : 28);
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate1(" ", ctx.t()["analytics.vaccineCompliance"], " ");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.t()["analytics.upToDateVsOverdue"]);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.vaccineSummary().total > 0 ? 38 : 39);
      }
    }, dependencies: [CommonModule, FormsModule, LucideAngularModule, LucideAngularComponent], styles: ["\n.animate-slide-up[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_slideUp 0.35s ease-out;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(16px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=analytics.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnalyticsComponent, [{
    type: Component,
    args: [{ selector: "app-analytics", imports: [CommonModule, FormsModule, LucideAngularModule], template: `
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

      <!-- \u2500\u2500 Temperature Trends \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->
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

      <!-- \u2500\u2500 Growth Charts \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->
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

      <!-- \u2500\u2500 Vaccine Compliance \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->
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
                    <p class="text-xs text-emerald-500 font-medium">{{ vaccineSummary().upToDate }} {{ ofTotalLabel(vaccineSummary().total) }}</p>
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
                    <p class="text-xs text-rose-500 font-medium">{{ vaccineSummary().overdue }} {{ ofTotalLabel(vaccineSummary().total) }}</p>
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
                    <p class="text-xs text-amber-500 font-medium">{{ vaccineSummary().upcoming }} {{ ofTotalLabel(vaccineSummary().total) }}</p>
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
  `, styles: ["/* angular:styles/component:css;aa293527f2186e669cdd645fb889a2014bf4dbf7d80bd8edf3f1a4d97580ecdb;C:/Users/g_gus/Desktop/jona/kiddok/src/app/components/analytics.component.ts */\n.animate-slide-up {\n  animation: slideUp 0.35s ease-out;\n}\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(16px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=analytics.component.css.map */\n"] }]
  }], null, { tempChartCanvas: [{
    type: ViewChild,
    args: ["tempChartCanvas"]
  }], growthChartCanvas: [{
    type: ViewChild,
    args: ["growthChartCanvas"]
  }], vaccinePieCanvas: [{
    type: ViewChild,
    args: ["vaccinePieCanvas"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AnalyticsComponent, { className: "AnalyticsComponent", filePath: "src/app/components/analytics.component.ts", lineNumber: 153 });
})();
export {
  AnalyticsComponent
};
//# sourceMappingURL=chunk-XBM3SKLE.js.map
