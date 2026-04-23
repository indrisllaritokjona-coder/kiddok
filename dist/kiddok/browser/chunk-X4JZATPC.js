import {
  TooltipDirective
} from "./chunk-FLCUZMW2.js";
import {
  CommonModule,
  DefaultValueAccessor,
  FormsModule,
  LucideAngularComponent,
  LucideAngularModule,
  MaxValidator,
  MinValidator,
  NgClass,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-IFHIJ3FQ.js";
import {
  DataService,
  I18nService,
  NotificationService
} from "./chunk-J6KXBRJB.js";
import {
  Component,
  ViewChild,
  __async,
  computed,
  effect,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-SFGRG2UU.js";

// src/app/components/temperature-diary.component.ts
var _c0 = ["chartCanvas"];
var _forTrack0 = ($index, $item) => $item.value;
var _forTrack1 = ($index, $item) => $item.id;
function TemperatureDiaryComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_2_0 = ctx_r1.activeChild()) == null ? null : tmp_2_0.name, " ");
  }
}
function TemperatureDiaryComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 38);
    \u0275\u0275element(2, "lucide-icon", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 40)(4, "p", 41);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 42);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["temperature.alertHigh"]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", (tmp_3_0 = ctx_r1.latestEntry()) == null ? null : tmp_3_0.temperature, "\xB0C");
  }
}
function TemperatureDiaryComponent_Conditional_11_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 46);
  }
}
function TemperatureDiaryComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43)(1, "span", 44);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 45);
    \u0275\u0275text(4, "\xB0C");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, TemperatureDiaryComponent_Conditional_11_Conditional_5_Template, 1, 0, "span", 46);
    \u0275\u0275elementStart(6, "button", 47);
    \u0275\u0275element(7, "lucide-icon", 48);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "p", 49);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_6_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.tempColorClass(ctx_r1.latestEntry().temperature));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_3_0 = ctx_r1.latestEntry()) == null ? null : tmp_3_0.temperature, " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.latestEntry().temperature >= 38.5 ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("appTooltip", ctx_r1.getTempSeverityKey(ctx_r1.latestEntry().temperature));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", ctx_r1.formatTime(ctx_r1.latestEntry().measuredAt), " \u2022 ", ctx_r1.locationLabel((tmp_6_0 = ctx_r1.latestEntry()) == null ? null : tmp_6_0.location), " ");
  }
}
function TemperatureDiaryComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50)(1, "span", 51);
    \u0275\u0275text(2, "--.-");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 52);
    \u0275\u0275text(4, "\xB0C");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "p", 53);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["temperature.noReadings"]);
  }
}
function TemperatureDiaryComponent_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 54);
    \u0275\u0275listener("click", function TemperatureDiaryComponent_For_18_Template_button_click_0_listener() {
      const temp_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setQuickTemp(temp_r4));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const temp_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", ctx_r1.formTemp() === temp_r4 ? "bg-primary-600 text-white border-primary-600" : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", temp_r4, "\xB0 ");
  }
}
function TemperatureDiaryComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1, "35\xB0C \u2013 42\xB0C");
    \u0275\u0275elementEnd();
  }
}
function TemperatureDiaryComponent_For_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 55);
    \u0275\u0275listener("click", function TemperatureDiaryComponent_For_42_Template_button_click_0_listener() {
      const loc_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.formLocation.set(loc_r6.value));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const loc_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(\u0275\u0275interpolate1("px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all\n                                 ", ctx_r1.formLocation() === loc_r6.value ? "bg-primary-600 text-white border-primary-600" : "bg-slate-50 text-slate-600 border-slate-200 hover:border-primary-200 hover:text-primary-600"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", loc_r6.label(), " ");
  }
}
function TemperatureDiaryComponent_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saveError(), " ");
  }
}
function TemperatureDiaryComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 56);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["temperature.saving"], " ");
  }
}
function TemperatureDiaryComponent_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 57);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["temperature.saved"], " ");
  }
}
function TemperatureDiaryComponent_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 58);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["temperature.save"], " ");
  }
}
function TemperatureDiaryComponent_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36)(1, "div", 59);
    \u0275\u0275element(2, "lucide-icon", 60);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 61);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 62);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["temperature.noReadings"]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["temperature.addFirst"]);
  }
}
function TemperatureDiaryComponent_Conditional_66_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 63);
    \u0275\u0275element(1, "div", 64);
    \u0275\u0275elementStart(2, "span", 65);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 40)(5, "p", 66);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 67);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 68);
    \u0275\u0275listener("click", function TemperatureDiaryComponent_Conditional_66_For_2_Template_button_click_9_listener() {
      const entry_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteEntry(entry_r8.id));
    });
    \u0275\u0275element(10, "lucide-icon", 69);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.tempDotClass(entry_r8.temperature));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.tempTextClass(entry_r8.temperature));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", entry_r8.temperature, "\xB0 ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatTime(entry_r8.measuredAt));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r1.formatDate(entry_r8.measuredAt), " \u2022 ", ctx_r1.locationLabel(entry_r8.location));
  }
}
function TemperatureDiaryComponent_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275repeaterCreate(1, TemperatureDiaryComponent_Conditional_66_For_2_Template, 11, 6, "div", 63, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.recentReadings());
  }
}
var TemperatureDiaryComponent = class _TemperatureDiaryComponent {
  constructor() {
    this.dataService = inject(DataService);
    this.i18n = inject(I18nService);
    this.notif = inject(NotificationService);
    this.quickTemps = [37.5, 38, 38.5, 39, 39.5];
    this.locations = [
      { value: "forehead", label: () => this.i18n.t()["temperature.location.forehead"] },
      { value: "ear", label: () => this.i18n.t()["temperature.location.ear"] },
      { value: "oral", label: () => this.i18n.t()["temperature.location.oral"] },
      { value: "axillary", label: () => this.i18n.t()["temperature.location.axillary"] },
      { value: "rectal", label: () => this.i18n.t()["temperature.location.rectal"] }
    ];
    this.formTemp = signal(null, ...ngDevMode ? [{ debugName: "formTemp" }] : (
      /* istanbul ignore next */
      []
    ));
    this.formLocation = signal("forehead", ...ngDevMode ? [{ debugName: "formLocation" }] : (
      /* istanbul ignore next */
      []
    ));
    this.formNotes = "";
    this.formTime = this.defaultTime();
    this.saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : (
      /* istanbul ignore next */
      []
    ));
    this.saved = signal(false, ...ngDevMode ? [{ debugName: "saved" }] : (
      /* istanbul ignore next */
      []
    ));
    this.chartInitialized = false;
    this.chartInstance = null;
    this.chartEffect = null;
    this.activeChild = computed(() => {
      const activeId = this.dataService.activeChildId();
      return this.dataService.children().find((c) => c.id === activeId);
    }, ...ngDevMode ? [{ debugName: "activeChild" }] : (
      /* istanbul ignore next */
      []
    ));
    this.latestEntry = computed(() => {
      const entries = this.dataService.temperatureEntries();
      if (!entries.length)
        return null;
      return entries[0];
    }, ...ngDevMode ? [{ debugName: "latestEntry" }] : (
      /* istanbul ignore next */
      []
    ));
    this.recentReadings = computed(() => {
      return this.dataService.temperatureEntries().slice(0, 10);
    }, ...ngDevMode ? [{ debugName: "recentReadings" }] : (
      /* istanbul ignore next */
      []
    ));
    this.weekEntries = computed(() => {
      const now = /* @__PURE__ */ new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3);
      return this.dataService.temperatureEntries().filter((e) => new Date(e.measuredAt) >= weekAgo).sort((a, b) => new Date(a.measuredAt).getTime() - new Date(b.measuredAt).getTime());
    }, ...ngDevMode ? [{ debugName: "weekEntries" }] : (
      /* istanbul ignore next */
      []
    ));
    this.saveError = signal(null, ...ngDevMode ? [{ debugName: "saveError" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  ngOnInit() {
    const childId = this.dataService.activeChildId();
    if (childId) {
      this.dataService.loadTemperatureEntries(childId);
    }
  }
  ngAfterViewInit() {
    setTimeout(() => this.renderChart(), 100);
    this.chartEffect = effect(() => {
      const entries = this.dataService.temperatureEntries();
      if (entries && this.chartInitialized) {
        this.renderChart();
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
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
  }
  defaultTime() {
    const now = /* @__PURE__ */ new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  }
  setQuickTemp(temp) {
    this.formTemp.set(temp);
  }
  canSave() {
    const t = this.formTemp();
    return !!t && t >= 35 && t <= 42;
  }
  saveReading() {
    return __async(this, null, function* () {
      const childId = this.dataService.activeChildId();
      if (!childId || !this.canSave())
        return;
      this.saving.set(true);
      this.saved.set(false);
      this.saveError.set(null);
      const measuredAt = this.formTime ? new Date(this.formTime).toISOString() : (/* @__PURE__ */ new Date()).toISOString();
      const result = yield this.dataService.createTemperatureEntry({
        childId,
        temperature: this.formTemp(),
        measuredAt,
        location: this.formLocation(),
        notes: this.formNotes || void 0
      });
      this.saving.set(false);
      if (result) {
        this.saved.set(true);
        setTimeout(() => this.saved.set(false), 2500);
        const temp = this.formTemp();
        const child = this.activeChild();
        if (temp !== null && temp >= 38.5 && child) {
          this.notif.notifyFever(child.name, temp);
        }
        this.formTemp.set(null);
        this.formLocation.set("forehead");
        this.formNotes = "";
        this.formTime = this.defaultTime();
        setTimeout(() => this.renderChart(), 100);
      } else {
        const msg = this.i18n.t()["temperature.saveError"] || "Ruajtja d\xEBshtoi. Provo p\xEBrs\xEBri.";
        this.saveError.set(msg);
        setTimeout(() => this.saveError.set(null), 5e3);
      }
    });
  }
  deleteEntry(id) {
    return __async(this, null, function* () {
      yield this.dataService.deleteTemperatureEntry(id);
      setTimeout(() => this.renderChart(), 100);
    });
  }
  // ── Helpers ────────────────────────────────────────────────────
  formatTime(iso) {
    if (!iso)
      return "";
    const d = new Date(iso);
    return d.toLocaleTimeString(this.i18n.locale() === "sq" ? "sq-AL" : "en-US", { hour: "2-digit", minute: "2-digit" });
  }
  formatDate(iso) {
    if (!iso)
      return "";
    const d = new Date(iso);
    return d.toLocaleDateString(this.i18n.locale() === "sq" ? "sq-AL" : "en-US", { day: "numeric", month: "short" });
  }
  locationLabel(loc) {
    if (!loc)
      return "";
    const map = {
      forehead: this.i18n.t()["temperature.location.forehead"],
      ear: this.i18n.t()["temperature.location.ear"],
      oral: this.i18n.t()["temperature.location.oral"],
      axillary: this.i18n.t()["temperature.location.axillary"],
      rectal: this.i18n.t()["temperature.location.rectal"]
    };
    return map[loc] ?? loc;
  }
  tempColorClass(temp) {
    if (temp >= 38.5)
      return "text-rose-500";
    if (temp >= 37.5)
      return "text-orange-400";
    return "text-teal-500";
  }
  tempTextClass(temp) {
    if (temp >= 38.5)
      return "text-rose-500";
    if (temp >= 37.5)
      return "text-orange-400";
    return "text-teal-500";
  }
  tempDotClass(temp) {
    if (temp >= 38.5)
      return "bg-rose-500";
    if (temp >= 37.5)
      return "bg-orange-400";
    return "bg-teal-400";
  }
  /** Sprint 22: Returns the i18n tooltip key for a given temperature value */
  getTempSeverityKey(temp) {
    if (temp >= 38.5)
      return "tooltip.tempHigh";
    if (temp >= 37.5)
      return "tooltip.tempFever";
    return "tooltip.tempNormal";
  }
  // ── Chart ──────────────────────────────────────────────────────
  renderChart() {
    if (!this.chartCanvas)
      return;
    const canvas = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext("2d");
    if (!ctx)
      return;
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
    const entries = this.weekEntries();
    if (typeof window.Chart === "undefined") {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js";
      script.onload = () => this.buildChart(ctx, entries);
      document.head.appendChild(script);
    } else {
      this.buildChart(ctx, entries);
    }
  }
  buildChart(ctx, entries) {
    const Chart = window.Chart;
    const labels = entries.map((e) => this.formatDate(e.measuredAt));
    const data = entries.map((e) => e.temperature);
    const colors = entries.map((e) => e.temperature >= 38.5 ? "rgba(244, 63, 94, 1)" : e.temperature >= 37.5 ? "rgba(249, 115, 22, 1)" : "rgba(20, 184, 166, 1)");
    const bgColors = entries.map((e) => e.temperature >= 38.5 ? "rgba(244, 63, 94, 0.15)" : e.temperature >= 37.5 ? "rgba(249, 115, 22, 0.15)" : "rgba(20, 184, 166, 0.15)");
    this.chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "\xB0C",
          data,
          borderColor: "rgba(99, 102, 241, 0.8)",
          backgroundColor: "rgba(99, 102, 241, 0.1)",
          borderWidth: 2.5,
          pointBackgroundColor: colors,
          pointBorderColor: colors,
          pointRadius: 6,
          pointHoverRadius: 8,
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
            ticks: { color: "#a8a29e", font: { size: 11 } }
          }
        }
      },
      plugins: [{
        id: "feverLine",
        beforeDraw: (chart) => {
          const yPos = chart.scales.y.getPixelForValue(38);
          const ctx2 = chart.ctx;
          ctx2.save();
          ctx2.beginPath();
          ctx2.setLineDash([5, 5]);
          ctx2.strokeStyle = "rgba(244, 63, 94, 0.4)";
          ctx2.lineWidth = 1.5;
          ctx2.moveTo(chart.chartArea.left, yPos);
          ctx2.lineTo(chart.chartArea.right, yPos);
          ctx2.stroke();
          ctx2.restore();
          ctx2.save();
          ctx2.fillStyle = "rgba(244, 63, 94, 0.5)";
          ctx2.font = "10px Inter, sans-serif";
          ctx2.fillText("38\xB0C", chart.chartArea.right - 30, yPos - 4);
          ctx2.restore();
        }
      }]
    });
    this.chartInitialized = true;
  }
  static {
    this.\u0275fac = function TemperatureDiaryComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TemperatureDiaryComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TemperatureDiaryComponent, selectors: [["app-temperature-diary"]], viewQuery: function TemperatureDiaryComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.chartCanvas = _t.first);
      }
    }, decls: 67, vars: 23, consts: [["chartCanvas", ""], [1, "max-w-2xl", "mx-auto", "px-2"], [1, "flex", "items-center", "justify-between", "mb-6"], [1, "text-3xl", "font-extrabold", "text-gray-800"], [1, "text-slate-400", "text-sm", "mt-1", "font-medium"], [1, "mb-6", "p-5", "bg-rose-50", "border-2", "border-rose-200", "rounded-3xl", "flex", "items-center", "gap-4", "animate-slide-up", "shadow-sm"], [1, "bg-white", "rounded-[2rem]", "shadow-md", "border", "border-slate-100", "overflow-hidden", "mb-6"], [1, "p-8", "flex", "flex-col", "items-center"], [1, "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-4"], [1, "px-8", "pb-8"], [1, "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-3", "text-center"], [1, "grid", "grid-cols-5", "gap-2"], [1, "py-3", "rounded-2xl", "text-sm", "font-bold", "transition-all", "border-2", 3, "ngClass"], [1, "p-6"], [1, "text-lg", "font-extrabold", "text-gray-800", "mb-5", "flex", "items-center", "gap-2"], ["name", "plus-circle", 1, "text-inherit"], [1, "space-y-5"], [1, "block", "text-xs", "font-bold", "text-primary-700", "mb-2", "uppercase", "tracking-wider"], [1, "flex", "items-center", "gap-3"], ["type", "number", "step", "0.1", "placeholder", "38.5", "min", "35", "max", "42", 1, "flex-1", "px-5", "py-4", "rounded-2xl", "border-2", "border-slate-200", "bg-slate-50", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-2xl", "font-black", "text-gray-800", "placeholder-slate-300", 3, "ngModelChange", "ngModel"], [1, "text-2xl", "font-bold", "text-slate-400"], [1, "mt-1", "text-xs", "text-red-500", "font-medium"], ["type", "datetime-local", 1, "w-full", "px-5", "py-4", "rounded-2xl", "border-2", "border-slate-200", "bg-slate-50", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-gray-800", 3, "ngModelChange", "ngModel"], [1, "flex", "flex-wrap", "gap-2"], ["type", "button", 3, "class"], ["rows", "2", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border-2", "border-slate-200", "bg-slate-50", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-gray-800", "resize-none", "text-sm", 3, "ngModelChange", "ngModel", "placeholder"], [1, "p-3", "bg-red-50", "border", "border-red-200", "rounded-xl", "text-red-600", "text-sm", "font-semibold"], [1, "w-full", "py-4.5", "rounded-2xl", "font-bold", "text-base", "shadow-md", "transition-all", "flex", "items-center", "justify-center", "gap-2", "disabled:opacity-40", "disabled:cursor-not-allowed", 3, "click", "disabled", "ngClass"], [1, "text-lg", "font-extrabold", "text-gray-800", "mb-1", "flex", "items-center", "gap-2"], ["name", "trending-up", 1, "text-inherit"], [1, "px-6", "pb-6"], [1, "w-full", 2, "max-height", "220px"], [1, "bg-white", "rounded-[2rem]", "shadow-md", "border", "border-slate-100", "overflow-hidden", "mb-8"], [1, "p-6", "pb-4"], [1, "text-lg", "font-extrabold", "text-gray-800", "flex", "items-center", "gap-2"], ["name", "history", 1, "text-inherit"], [1, "px-6", "pb-8", "text-center"], [1, "px-6", "pb-6", "space-y-3"], [1, "w-14", "h-14", "bg-rose-100", "rounded-full", "flex", "items-center", "justify-center", "flex-shrink-0"], ["name", "alert-triangle", 1, "text-inherit"], [1, "flex-1"], [1, "font-black", "text-rose-700", "text-lg"], [1, "text-rose-500", "text-sm", "font-medium", "mt-0.5"], [1, "relative", "mb-4"], [1, "text-7xl", "font-black", 3, "ngClass"], [1, "text-3xl", "font-bold", "text-slate-300", "ml-1"], [1, "absolute", "-top-2", "-right-2", "w-5", "h-5", "bg-rose-500", "rounded-full", "animate-pulse"], ["tooltipPosition", "top", 1, "absolute", "top-1", "-right-2", "w-6", "h-6", "flex", "items-center", "justify-center", "rounded-full", "bg-slate-100", "hover:bg-primary-100", "text-slate-400", "hover:text-primary-600", "transition-all", "cursor-help", 3, "appTooltip"], ["name", "info", 1, "text-inherit", 2, "width", "12px", "height", "12px"], [1, "text-slate-400", "text-sm", "font-medium"], [1, "py-8"], [1, "text-6xl", "font-black", "text-slate-200"], [1, "text-2xl", "font-bold", "text-slate-300", "ml-1"], [1, "text-slate-400", "text-sm", "font-medium", "mt-2"], [1, "py-3", "rounded-2xl", "text-sm", "font-bold", "transition-all", "border-2", 3, "click", "ngClass"], ["type", "button", 3, "click"], ["name", "loader", 1, "text-inherit"], ["name", "check-circle", 1, "text-inherit"], ["name", "save", 1, "text-inherit"], [1, "w-16", "h-16", "bg-slate-100", "rounded-full", "flex", "items-center", "justify-center", "mx-auto", "mb-4"], ["name", "thermometer", 1, "text-inherit"], [1, "text-slate-400", "font-medium", "mb-3"], [1, "text-primary-600", "font-bold", "text-sm"], [1, "flex", "items-center", "gap-4", "p-4", "rounded-2xl", "border", "border-slate-100", "hover:border-primary-200", "hover:bg-primary-50/30", "transition-all", "group"], [1, "w-3", "h-3", "rounded-full", "flex-shrink-0", 3, "ngClass"], [1, "text-xl", "font-black", 3, "ngClass"], [1, "text-sm", "font-semibold", "text-gray-700"], [1, "text-xs", "text-slate-400", "font-medium"], [1, "opacity-0", "group-hover:opacity-100", "w-9", "h-9", "rounded-xl", "bg-red-50", "hover:bg-red-100", "flex", "items-center", "justify-center", "text-red-400", "hover:text-red-600", "transition-all", "border", "border-red-100", 3, "click"], ["name", "trash-2", 1, "text-inherit"]], template: function TemperatureDiaryComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div")(3, "h1", 3);
        \u0275\u0275text(4);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(5, TemperatureDiaryComponent_Conditional_5_Template, 2, 1, "p", 4);
        \u0275\u0275elementEnd()();
        \u0275\u0275conditionalCreate(6, TemperatureDiaryComponent_Conditional_6_Template, 8, 2, "div", 5);
        \u0275\u0275elementStart(7, "div", 6)(8, "div", 7)(9, "p", 8);
        \u0275\u0275text(10);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(11, TemperatureDiaryComponent_Conditional_11_Template, 10, 6)(12, TemperatureDiaryComponent_Conditional_12_Template, 7, 1);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "div", 9)(14, "p", 10);
        \u0275\u0275text(15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 11);
        \u0275\u0275repeaterCreate(17, TemperatureDiaryComponent_For_18_Template, 2, 2, "button", 12, \u0275\u0275repeaterTrackByIdentity);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(19, "div", 6)(20, "div", 13)(21, "h3", 14);
        \u0275\u0275element(22, "lucide-icon", 15);
        \u0275\u0275text(23);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "div", 16)(25, "div")(26, "label", 17);
        \u0275\u0275text(27);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "div", 18)(29, "input", 19);
        \u0275\u0275twoWayListener("ngModelChange", function TemperatureDiaryComponent_Template_input_ngModelChange_29_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.formTemp, $event) || (ctx.formTemp = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "span", 20);
        \u0275\u0275text(31, "\xB0C");
        \u0275\u0275elementEnd()();
        \u0275\u0275conditionalCreate(32, TemperatureDiaryComponent_Conditional_32_Template, 2, 0, "p", 21);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "div")(34, "label", 17);
        \u0275\u0275text(35);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "input", 22);
        \u0275\u0275twoWayListener("ngModelChange", function TemperatureDiaryComponent_Template_input_ngModelChange_36_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.formTime, $event) || (ctx.formTime = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(37, "div")(38, "label", 17);
        \u0275\u0275text(39);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "div", 23);
        \u0275\u0275repeaterCreate(41, TemperatureDiaryComponent_For_42_Template, 2, 4, "button", 24, _forTrack0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(43, "div")(44, "label", 17);
        \u0275\u0275text(45);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "textarea", 25);
        \u0275\u0275twoWayListener("ngModelChange", function TemperatureDiaryComponent_Template_textarea_ngModelChange_46_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.formNotes, $event) || (ctx.formNotes = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275conditionalCreate(47, TemperatureDiaryComponent_Conditional_47_Template, 2, 1, "div", 26);
        \u0275\u0275elementStart(48, "button", 27);
        \u0275\u0275listener("click", function TemperatureDiaryComponent_Template_button_click_48_listener() {
          return ctx.saveReading();
        });
        \u0275\u0275conditionalCreate(49, TemperatureDiaryComponent_Conditional_49_Template, 2, 1)(50, TemperatureDiaryComponent_Conditional_50_Template, 2, 1)(51, TemperatureDiaryComponent_Conditional_51_Template, 2, 1);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(52, "div", 6)(53, "div", 13)(54, "h3", 28);
        \u0275\u0275element(55, "lucide-icon", 29);
        \u0275\u0275text(56);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(57, "div", 30);
        \u0275\u0275element(58, "canvas", 31, 0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(60, "div", 32)(61, "div", 33)(62, "h3", 34);
        \u0275\u0275element(63, "lucide-icon", 35);
        \u0275\u0275text(64);
        \u0275\u0275elementEnd()();
        \u0275\u0275conditionalCreate(65, TemperatureDiaryComponent_Conditional_65_Template, 7, 2, "div", 36)(66, TemperatureDiaryComponent_Conditional_66_Template, 3, 0, "div", 37);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.i18n.t()["nav.temperatureDiary"]);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.activeChild() ? 5 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.latestEntry() && ctx.latestEntry().temperature > 38.5 ? 6 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.i18n.t()["temperature.current"]);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.latestEntry() ? 11 : 12);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.i18n.t()["temperature.quickAdd"]);
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.quickTemps);
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["temperature.newReading"], " ");
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.i18n.t()["temperature.value"]);
        \u0275\u0275advance(2);
        \u0275\u0275twoWayProperty("ngModel", ctx.formTemp);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.formTemp() !== null && (ctx.formTemp() < 35 || ctx.formTemp() > 42) ? 32 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.i18n.t()["temperature.time"]);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.formTime);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.i18n.t()["temperature.location"]);
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.locations);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.i18n.t()["temperature.notes"]);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.formNotes);
        \u0275\u0275property("placeholder", ctx.i18n.t()["temperature.notes"]);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.saveError() ? 47 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", !ctx.canSave() || ctx.saving())("ngClass", ctx.saving() ? "bg-slate-200 text-slate-400" : "bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white hover:shadow-lg");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.saving() ? 49 : ctx.saved() ? 50 : 51);
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["temperature.trend"], " ");
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["temperature.recent"], " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.recentReadings().length === 0 ? 65 : 66);
      }
    }, dependencies: [CommonModule, NgClass, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, MaxValidator, NgModel, LucideAngularModule, LucideAngularComponent, TooltipDirective], styles: ["\n.animate-slide-up[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_slideUp 0.35s ease-out;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(16px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=temperature-diary.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TemperatureDiaryComponent, [{
    type: Component,
    args: [{ selector: "app-temperature-diary", imports: [CommonModule, FormsModule, LucideAngularModule, TooltipDirective], template: `
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
            <lucide-icon name="alert-triangle" class="text-inherit"></lucide-icon>
          </div>
          <div class="flex-1">
            <p class="font-black text-rose-700 text-lg">{{ i18n.t()['temperature.alertHigh'] }}</p>
            <p class="text-rose-500 text-sm font-medium mt-0.5">{{ latestEntry()?.temperature }}\xB0C</p>
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
              <span class="text-3xl font-bold text-slate-300 ml-1">\xB0C</span>
              @if (latestEntry()!.temperature >= 38.5) {
                <span class="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 rounded-full animate-pulse"></span>
              }
              <!-- Sprint 22: Temperature severity tooltip -->
              <button [appTooltip]="getTempSeverityKey(latestEntry()!.temperature)"
                      tooltipPosition="top"
                      class="absolute top-1 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 hover:bg-primary-100 text-slate-400 hover:text-primary-600 transition-all cursor-help">
                <lucide-icon name="info" class="text-inherit" style="width:12px;height:12px"></lucide-icon>
              </button>
            </div>
            <p class="text-slate-400 text-sm font-medium">
              {{ formatTime(latestEntry()!.measuredAt) }} &bull; {{ locationLabel(latestEntry()?.location) }}
            </p>
          } @else {
            <div class="py-8">
              <span class="text-6xl font-black text-slate-200">--.-</span>
              <span class="text-2xl font-bold text-slate-300 ml-1">\xB0C</span>
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
                {{ temp }}\xB0
              </button>
            }
          </div>
        </div>
      </div>

      <!-- Add New Reading Form -->
      <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 overflow-hidden mb-6">
        <div class="p-6">
          <h3 class="text-lg font-extrabold text-gray-800 mb-5 flex items-center gap-2">
            <lucide-icon name="plus-circle" class="text-inherit"></lucide-icon>
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
                <span class="text-2xl font-bold text-slate-400">\xB0C</span>
              </div>
              @if (formTemp() !== null && (formTemp()! < 35 || formTemp()! > 42)) {
                <p class="mt-1 text-xs text-red-500 font-medium">35\xB0C \u2013 42\xB0C</p>
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
            @if (saveError()) {
              <div class="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold">
                {{ saveError() }}
              </div>
            }
            <button (click)="saveReading()"
                    [disabled]="!canSave() || saving()"
                    class="w-full py-4.5 rounded-2xl font-bold text-base shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                    [ngClass]="saving()
                      ? 'bg-slate-200 text-slate-400'
                      : 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white hover:shadow-lg'">
              @if (saving()) {
                <lucide-icon name="loader" class="text-inherit"></lucide-icon>
                {{ i18n.t()['temperature.saving'] }}
              } @else if (saved()) {
                <lucide-icon name="check-circle" class="text-inherit"></lucide-icon>
                {{ i18n.t()['temperature.saved'] }}
              } @else {
                <lucide-icon name="save" class="text-inherit"></lucide-icon>
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
            <lucide-icon name="trending-up" class="text-inherit"></lucide-icon>
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
            <lucide-icon name="history" class="text-inherit"></lucide-icon>
            {{ i18n.t()['temperature.recent'] }}
          </h3>
        </div>

        @if (recentReadings().length === 0) {
          <div class="px-6 pb-8 text-center">
            <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <lucide-icon name="thermometer" class="text-inherit"></lucide-icon>
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
                  {{ entry.temperature }}\xB0
                </span>
                <!-- Time & location -->
                <div class="flex-1">
                  <p class="text-sm font-semibold text-gray-700">{{ formatTime(entry.measuredAt) }}</p>
                  <p class="text-xs text-slate-400 font-medium">{{ formatDate(entry.measuredAt) }} &bull; {{ locationLabel(entry.location) }}</p>
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
  `, styles: ["/* angular:styles/component:css;aa293527f2186e669cdd645fb889a2014bf4dbf7d80bd8edf3f1a4d97580ecdb;C:/Users/g_gus/Desktop/jona/kiddok/src/app/components/temperature-diary.component.ts */\n.animate-slide-up {\n  animation: slideUp 0.35s ease-out;\n}\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(16px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=temperature-diary.component.css.map */\n"] }]
  }], null, { chartCanvas: [{
    type: ViewChild,
    args: ["chartCanvas"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TemperatureDiaryComponent, { className: "TemperatureDiaryComponent", filePath: "src/app/components/temperature-diary.component.ts", lineNumber: 247 });
})();
export {
  TemperatureDiaryComponent
};
//# sourceMappingURL=chunk-X4JZATPC.js.map
