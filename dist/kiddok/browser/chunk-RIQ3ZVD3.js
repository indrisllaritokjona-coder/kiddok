import {
  TooltipDirective
} from "./chunk-XJIOHEWP.js";
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
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-SFGRG2UU.js";

// src/app/components/growth-tracking.component.ts
var _c0 = ["chartCanvas"];
var _c1 = () => [1, 2];
var _c2 = () => [1, 2, 3];
var _forTrack0 = ($index, $item) => $item.id;
function GrowthTrackingComponent_Conditional_1_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275element(1, "div", 40)(2, "div", 41)(3, "div", 42);
    \u0275\u0275elementEnd();
  }
}
function GrowthTrackingComponent_Conditional_1_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39);
    \u0275\u0275element(1, "div", 43)(2, "div", 44);
    \u0275\u0275elementEnd();
  }
}
function GrowthTrackingComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 8);
    \u0275\u0275repeaterCreate(2, GrowthTrackingComponent_Conditional_1_For_3_Template, 4, 0, "div", 36, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 36);
    \u0275\u0275element(5, "div", 37)(6, "div", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 36);
    \u0275\u0275repeaterCreate(8, GrowthTrackingComponent_Conditional_1_For_9_Template, 3, 0, "div", 39, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c1));
    \u0275\u0275advance(6);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(1, _c2));
  }
}
function GrowthTrackingComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
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
function GrowthTrackingComponent_Conditional_9_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 55);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.latestEntry().height);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["growth.cm"]);
  }
}
function GrowthTrackingComponent_Conditional_9_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["growth.noHeight"]);
  }
}
function GrowthTrackingComponent_Conditional_9_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", ctx_r1.heightDiff() >= 0 ? "text-teal-500" : "text-rose-500");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" ", ctx_r1.heightDiff() >= 0 ? "\u2191" : "\u2193", " ", ctx_r1.TMath.abs(ctx_r1.heightDiff()), " ", ctx_r1.i18n.t()["growth.cm"], " ");
  }
}
function GrowthTrackingComponent_Conditional_9_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 56);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 55);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.latestEntry().weight);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["growth.kg"]);
  }
}
function GrowthTrackingComponent_Conditional_9_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["growth.noWeight"]);
  }
}
function GrowthTrackingComponent_Conditional_9_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", ctx_r1.weightDiff() >= 0 ? "text-teal-500" : "text-rose-500");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" ", ctx_r1.weightDiff() >= 0 ? "\u2191" : "\u2193", " ", ctx_r1.TMath.abs(ctx_r1.weightDiff()), " ", ctx_r1.i18n.t()["growth.kg"], " ");
  }
}
function GrowthTrackingComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 45)(2, "div", 46)(3, "div", 47);
    \u0275\u0275element(4, "lucide-icon", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 49);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, GrowthTrackingComponent_Conditional_9_Conditional_7_Template, 4, 2)(8, GrowthTrackingComponent_Conditional_9_Conditional_8_Template, 2, 1, "span", 50);
    \u0275\u0275conditionalCreate(9, GrowthTrackingComponent_Conditional_9_Conditional_9_Template, 2, 4, "p", 51);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 45)(11, "div", 46)(12, "div", 52);
    \u0275\u0275element(13, "lucide-icon", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p", 49);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, GrowthTrackingComponent_Conditional_9_Conditional_16_Template, 4, 2)(17, GrowthTrackingComponent_Conditional_9_Conditional_17_Template, 2, 1, "span", 50);
    \u0275\u0275conditionalCreate(18, GrowthTrackingComponent_Conditional_9_Conditional_18_Template, 2, 4, "p", 51);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["growth.heightLabel"]);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.latestEntry().height !== null ? 7 : 8);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.previousEntry() && ctx_r1.previousEntry().height !== null && ctx_r1.latestEntry().height !== null ? 9 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["growth.weightLabel"]);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.latestEntry().weight !== null ? 16 : 17);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.previousEntry() && ctx_r1.previousEntry().weight !== null && ctx_r1.latestEntry().weight !== null ? 18 : -1);
  }
}
function GrowthTrackingComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 45)(2, "div", 46)(3, "div", 47);
    \u0275\u0275element(4, "lucide-icon", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 49);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 50);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 45)(10, "div", 46)(11, "div", 52);
    \u0275\u0275element(12, "lucide-icon", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 49);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 50);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["growth.heightLabel"]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["growth.noHeight"]);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["growth.weightLabel"]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["growth.noWeight"]);
  }
}
function GrowthTrackingComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1, "30\u2013200 cm");
    \u0275\u0275elementEnd();
  }
}
function GrowthTrackingComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1, "1\u2013150 kg");
    \u0275\u0275elementEnd();
  }
}
function GrowthTrackingComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saveError(), " ");
  }
}
function GrowthTrackingComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 57);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["growth.saving"], " ");
  }
}
function GrowthTrackingComponent_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 58);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["growth.saved"], " ");
  }
}
function GrowthTrackingComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 59);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["growth.save"], " ");
  }
}
function GrowthTrackingComponent_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 60);
    \u0275\u0275element(2, "lucide-icon", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 61);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 62);
    \u0275\u0275listener("click", function GrowthTrackingComponent_Conditional_60_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openAddForm());
    });
    \u0275\u0275element(6, "lucide-icon", 63);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["growth.noData"]);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["growth.addFirst"], " ");
  }
}
function GrowthTrackingComponent_Conditional_61_For_2_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 71);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(entry_r5.notes);
  }
}
function GrowthTrackingComponent_Conditional_61_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 64);
    \u0275\u0275element(1, "div", 65);
    \u0275\u0275elementStart(2, "span", 66);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "div", 67);
    \u0275\u0275elementStart(5, "span", 68);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 69)(8, "p", 70);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, GrowthTrackingComponent_Conditional_61_For_2_Conditional_10_Template, 2, 1, "p", 71);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 72);
    \u0275\u0275listener("click", function GrowthTrackingComponent_Conditional_61_For_2_Template_button_click_11_listener() {
      const entry_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteEntry(entry_r5.id));
    });
    \u0275\u0275element(12, "lucide-icon", 73);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(entry_r5.height !== null ? entry_r5.height + " cm" : "--");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(entry_r5.weight !== null ? entry_r5.weight + " kg" : "--");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(entry_r5.measuredAt));
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r5.notes ? 10 : -1);
  }
}
function GrowthTrackingComponent_Conditional_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35);
    \u0275\u0275repeaterCreate(1, GrowthTrackingComponent_Conditional_61_For_2_Template, 13, 4, "div", 64, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.recentEntries());
  }
}
var GrowthTrackingComponent = class _GrowthTrackingComponent {
  constructor() {
    this.dataService = inject(DataService);
    this.i18n = inject(I18nService);
    this.loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : (
      /* istanbul ignore next */
      []
    ));
    this.formDate = this.defaultDate();
    this.formHeight = null;
    this.formWeight = null;
    this.formNotes = "";
    this.saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : (
      /* istanbul ignore next */
      []
    ));
    this.saved = signal(false, ...ngDevMode ? [{ debugName: "saved" }] : (
      /* istanbul ignore next */
      []
    ));
    this.saveError = signal(null, ...ngDevMode ? [{ debugName: "saveError" }] : (
      /* istanbul ignore next */
      []
    ));
    this.chartInstance = null;
    this.chartEffect = null;
    this.chartInitialized = false;
    this.resizeTimeout = null;
    this.TMath = { abs: Math.abs };
    this.activeChild = computed(() => {
      const activeId = this.dataService.activeChildId();
      return this.dataService.children().find((c) => c.id === activeId);
    }, ...ngDevMode ? [{ debugName: "activeChild" }] : (
      /* istanbul ignore next */
      []
    ));
    this.latestEntry = computed(() => {
      const entries = this.dataService.growthEntries();
      if (!entries.length)
        return null;
      return entries[0];
    }, ...ngDevMode ? [{ debugName: "latestEntry" }] : (
      /* istanbul ignore next */
      []
    ));
    this.previousEntry = computed(() => {
      const entries = this.dataService.growthEntries();
      if (entries.length < 2)
        return null;
      return entries[1];
    }, ...ngDevMode ? [{ debugName: "previousEntry" }] : (
      /* istanbul ignore next */
      []
    ));
    this.recentEntries = computed(() => {
      return this.dataService.growthEntries().slice(0, 10);
    }, ...ngDevMode ? [{ debugName: "recentEntries" }] : (
      /* istanbul ignore next */
      []
    ));
    this.chartEntries = computed(() => {
      return [...this.dataService.growthEntries()].reverse();
    }, ...ngDevMode ? [{ debugName: "chartEntries" }] : (
      /* istanbul ignore next */
      []
    ));
    this.heightDiff = computed(() => {
      const latest = this.latestEntry();
      const prev = this.previousEntry();
      if (!latest || !prev || latest.height === null || prev.height === null)
        return 0;
      return parseFloat((latest.height - prev.height).toFixed(1));
    }, ...ngDevMode ? [{ debugName: "heightDiff" }] : (
      /* istanbul ignore next */
      []
    ));
    this.weightDiff = computed(() => {
      const latest = this.latestEntry();
      const prev = this.previousEntry();
      if (!latest || !prev || latest.weight === null || prev.weight === null)
        return 0;
      return parseFloat((latest.weight - prev.weight).toFixed(1));
    }, ...ngDevMode ? [{ debugName: "weightDiff" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  ngOnInit() {
    return __async(this, null, function* () {
      const childId = this.dataService.activeChildId();
      if (childId) {
        this.loading.set(true);
        try {
          yield this.dataService.loadGrowthEntries(childId);
        } finally {
          this.loading.set(false);
        }
      }
    });
  }
  ngAfterViewInit() {
    setTimeout(() => this.renderChart(), 200);
    this.chartEffect = effect(() => {
      const entries = this.dataService.growthEntries();
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
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = null;
    }
  }
  defaultDate() {
    const now = /* @__PURE__ */ new Date();
    return now.toISOString().split("T")[0];
  }
  /** Sprint 8: Open add form and scroll to it */
  openAddForm() {
    const formEl = document.querySelector(".bg-white.rounded-\\[2rem\\].shadow-md.border.border-slate-100.overflow-hidden.mb-6");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  canSave() {
    const hasHeight = this.formHeight !== null && this.formHeight >= 30 && this.formHeight <= 200;
    const hasWeight = this.formWeight !== null && this.formWeight >= 1 && this.formWeight <= 150;
    const hasDate = !!this.formDate;
    return hasDate && (hasHeight || hasWeight);
  }
  saveEntry() {
    return __async(this, null, function* () {
      const childId = this.dataService.activeChildId();
      if (!childId || !this.canSave())
        return;
      this.saving.set(true);
      this.saved.set(false);
      this.saveError.set(null);
      const measuredAt = new Date(this.formDate).toISOString();
      const result = yield this.dataService.createGrowthEntry({
        childId,
        height: this.formHeight,
        weight: this.formWeight,
        measuredAt,
        notes: this.formNotes || void 0
      });
      this.saving.set(false);
      if (result) {
        this.saved.set(true);
        setTimeout(() => this.saved.set(false), 2500);
        this.formHeight = null;
        this.formWeight = null;
        this.formNotes = "";
        this.formDate = this.defaultDate();
        setTimeout(() => this.renderChart(), 100);
      } else {
        const msg = this.i18n.t()["growth.saveError"] || "Ruajtja d\xEBshtoi. Provo p\xEBrs\xEBri.";
        this.saveError.set(msg);
        setTimeout(() => this.saveError.set(null), 5e3);
      }
    });
  }
  deleteEntry(id) {
    return __async(this, null, function* () {
      yield this.dataService.deleteGrowthEntry(id);
      setTimeout(() => this.renderChart(), 100);
    });
  }
  formatDate(iso) {
    if (!iso)
      return "";
    const d = new Date(iso);
    return d.toLocaleDateString(this.i18n.locale() === "sq" ? "sq-AL" : "en-US", { day: "numeric", month: "short", year: "numeric" });
  }
  // ── Chart ──────────────────────────────────────────────────────
  renderChart() {
    if (!this.chartCanvas)
      return;
    const canvas = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext("2d");
    if (!ctx)
      return;
    if (this.chartInstance && this.chartInitialized) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
    const entries = this.chartEntries();
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
    const locale = this.i18n.locale() === "sq" ? "sq-AL" : "en-US";
    const labels = entries.map((e) => this.formatDate(e.measuredAt));
    const heightData = entries.map((e) => e.height);
    const weightData = entries.map((e) => e.weight);
    this.chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: this.i18n.t()["growth.heightLabel"],
            data: heightData,
            borderColor: "rgba(99, 102, 241, 0.9)",
            backgroundColor: "rgba(99, 102, 241, 0.1)",
            borderWidth: 2.5,
            pointBackgroundColor: "rgba(99, 102, 241, 0.9)",
            pointBorderColor: "rgba(99, 102, 241, 0.9)",
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: false,
            tension: 0.4,
            yAxisID: "y"
          },
          {
            label: this.i18n.t()["growth.weightLabel"],
            data: weightData,
            borderColor: "rgba(20, 184, 166, 0.9)",
            backgroundColor: "rgba(20, 184, 166, 0.1)",
            borderWidth: 2.5,
            pointBackgroundColor: "rgba(20, 184, 166, 0.9)",
            pointBorderColor: "rgba(20, 184, 166, 0.9)",
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
        interaction: {
          mode: "index",
          intersect: false
        },
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
                if (ctx2.datasetIndex === 0)
                  return ` ${label}: ${value} cm`;
                return ` ${label}: ${value} kg`;
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
              text: this.i18n.t()["growth.cm"],
              color: "rgba(99, 102, 241, 0.8)",
              font: { size: 11, weight: "600" }
            },
            grid: { color: "rgba(0,0,0,0.05)" },
            ticks: {
              callback: (v) => v + " cm",
              color: "#a8a29e",
              font: { size: 11 }
            }
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: this.i18n.t()["growth.kg"],
              color: "rgba(20, 184, 166, 0.8)",
              font: { size: 11, weight: "600" }
            },
            grid: { drawOnChartArea: false },
            ticks: {
              callback: (v) => v + " kg",
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
    this.chartInitialized = true;
  }
  static {
    this.\u0275fac = function GrowthTrackingComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _GrowthTrackingComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GrowthTrackingComponent, selectors: [["app-growth-tracking"]], viewQuery: function GrowthTrackingComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.chartCanvas = _t.first);
      }
    }, decls: 62, vars: 26, consts: [["chartCanvas", ""], [1, "max-w-2xl", "mx-auto", "px-2"], [1, "space-y-4"], [1, "flex", "items-center", "justify-between", "mb-6"], [1, "text-3xl", "font-extrabold", "text-gray-800"], [1, "text-slate-400", "text-sm", "mt-1", "font-medium"], ["tooltipPosition", "bottom", 1, "w-8", "h-8", "rounded-xl", "bg-slate-100", "hover:bg-primary-100", "flex", "items-center", "justify-center", "text-slate-400", "hover:text-primary-600", "transition-all", "cursor-help", "flex-shrink-0", 3, "appTooltip"], ["name", "info", 1, "text-inherit"], [1, "grid", "grid-cols-2", "gap-4", "mb-6"], [1, "bg-white", "rounded-[2rem]", "shadow-md", "border", "border-slate-100", "overflow-hidden", "mb-6"], [1, "p-6"], [1, "text-lg", "font-extrabold", "text-gray-800", "mb-5", "flex", "items-center", "gap-2"], ["name", "plus-circle", 1, "text-inherit"], [1, "space-y-5"], [1, "block", "text-xs", "font-bold", "text-primary-700", "mb-2", "uppercase", "tracking-wider"], ["type", "date", 1, "w-full", "px-5", "py-4", "rounded-2xl", "border-2", "border-slate-200", "bg-slate-50", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-gray-800", 3, "ngModelChange", "ngModel"], [1, "grid", "grid-cols-2", "gap-4"], [1, "flex", "items-center", "gap-2"], ["type", "number", "step", "0.1", "placeholder", "85.5", "min", "30", "max", "200", 1, "w-full", "px-4", "py-4", "rounded-2xl", "border-2", "border-slate-200", "bg-slate-50", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-xl", "font-black", "text-gray-800", "placeholder-slate-300", 3, "ngModelChange", "ngModel"], [1, "text-lg", "font-bold", "text-slate-400"], [1, "mt-1", "text-xs", "text-red-500", "font-medium"], ["type", "number", "step", "0.1", "placeholder", "12.3", "min", "1", "max", "150", 1, "w-full", "px-4", "py-4", "rounded-2xl", "border-2", "border-slate-200", "bg-slate-50", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-xl", "font-black", "text-gray-800", "placeholder-slate-300", 3, "ngModelChange", "ngModel"], ["rows", "2", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border-2", "border-slate-200", "bg-slate-50", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-gray-800", "resize-none", "text-sm", 3, "ngModelChange", "ngModel", "placeholder"], [1, "p-3", "bg-red-50", "border", "border-red-200", "rounded-xl", "text-red-600", "text-sm", "font-semibold"], [1, "w-full", "py-4", "rounded-2xl", "font-bold", "text-base", "shadow-md", "transition-all", "flex", "items-center", "justify-center", "gap-2", "disabled:opacity-40", "disabled:cursor-not-allowed", 3, "click", "disabled", "ngClass"], [1, "p-6", "pb-2"], [1, "text-lg", "font-extrabold", "text-gray-800", "mb-1", "flex", "items-center", "gap-2"], ["name", "trending-up", 1, "text-inherit"], [1, "px-6", "pb-6"], [1, "w-full", 2, "max-height", "280px"], [1, "bg-white", "rounded-[2rem]", "shadow-md", "border", "border-slate-100", "overflow-hidden", "mb-8"], [1, "p-6", "pb-4"], [1, "text-lg", "font-extrabold", "text-gray-800", "flex", "items-center", "gap-2"], ["name", "history", 1, "text-inherit"], [1, "px-6", "pb-8", "text-center"], [1, "px-6", "pb-6", "space-y-3"], [1, "bg-white", "rounded-[2rem]", "shadow-md", "border", "border-slate-100", "p-6", "animate-pulse"], [1, "h-4", "bg-gray-200", "rounded", "w-1/4", "mb-4"], [1, "h-48", "bg-gray-200", "rounded-2xl"], [1, "flex", "items-center", "justify-between", "py-3", "border-b", "border-gray-100", "last:border-0"], [1, "w-10", "h-10", "bg-gray-200", "rounded-full", "mx-auto", "mb-3"], [1, "w-24", "h-4", "bg-gray-200", "rounded", "mx-auto", "mb-2"], [1, "w-16", "h-8", "bg-gray-200", "rounded", "mx-auto"], [1, "w-24", "h-4", "bg-gray-200", "rounded"], [1, "w-16", "h-4", "bg-gray-200", "rounded"], [1, "bg-white", "rounded-[2rem]", "shadow-md", "border", "border-slate-100", "overflow-hidden"], [1, "p-6", "flex", "flex-col", "items-center"], [1, "w-10", "h-10", "bg-indigo-100", "rounded-full", "flex", "items-center", "justify-center", "mb-3"], ["name", "ruler", 1, "text-inherit"], [1, "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-2"], [1, "text-3xl", "font-black", "text-slate-200"], [1, "text-xs", "font-medium", "mt-2", 3, "ngClass"], [1, "w-10", "h-10", "bg-teal-100", "rounded-full", "flex", "items-center", "justify-center", "mb-3"], ["name", "dumbbell", 1, "text-inherit"], [1, "text-4xl", "font-black", "text-indigo-600"], [1, "text-lg", "font-bold", "text-slate-400", "ml-1"], [1, "text-4xl", "font-black", "text-teal-600"], ["name", "loader", 1, "text-inherit"], ["name", "check-circle", 1, "text-inherit"], ["name", "save", 1, "text-inherit"], [1, "w-16", "h-16", "bg-slate-100", "rounded-full", "flex", "items-center", "justify-center", "mx-auto", "mb-4"], [1, "text-slate-400", "font-medium", "mb-3"], [1, "bg-indigo-500", "hover:bg-indigo-600", "text-white", "px-6", "py-3", "rounded-2xl", "font-bold", "shadow-sm", "transition-all", "text-sm", "inline-flex", "items-center", "gap-2", 3, "click"], ["name", "plus", 1, "text-inherit"], [1, "flex", "items-center", "gap-4", "p-4", "rounded-2xl", "border", "border-slate-100", "hover:border-primary-200", "hover:bg-primary-50/30", "transition-all", "group"], [1, "w-3", "h-3", "rounded-full", "flex-shrink-0", "bg-indigo-400"], [1, "text-lg", "font-black", "text-indigo-600", "w-20"], [1, "w-3", "h-3", "rounded-full", "flex-shrink-0", "bg-teal-400"], [1, "text-lg", "font-black", "text-teal-600", "w-16"], [1, "flex-1"], [1, "text-sm", "font-semibold", "text-gray-700"], [1, "text-xs", "text-slate-400", "font-medium"], [1, "opacity-0", "group-hover:opacity-100", "w-9", "h-9", "rounded-xl", "bg-red-50", "hover:bg-red-100", "flex", "items-center", "justify-center", "text-red-400", "hover:text-red-600", "transition-all", "border", "border-red-100", 3, "click"], ["name", "trash-2", 1, "text-inherit"]], template: function GrowthTrackingComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1);
        \u0275\u0275conditionalCreate(1, GrowthTrackingComponent_Conditional_1_Template, 10, 2, "div", 2);
        \u0275\u0275elementStart(2, "div", 3)(3, "div")(4, "h1", 4);
        \u0275\u0275text(5);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(6, GrowthTrackingComponent_Conditional_6_Template, 2, 1, "p", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "button", 6);
        \u0275\u0275element(8, "lucide-icon", 7);
        \u0275\u0275elementEnd()();
        \u0275\u0275conditionalCreate(9, GrowthTrackingComponent_Conditional_9_Template, 19, 6, "div", 8)(10, GrowthTrackingComponent_Conditional_10_Template, 17, 4, "div", 8);
        \u0275\u0275elementStart(11, "div", 9)(12, "div", 10)(13, "h3", 11);
        \u0275\u0275element(14, "lucide-icon", 12);
        \u0275\u0275text(15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 13)(17, "div")(18, "label", 14);
        \u0275\u0275text(19);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "input", 15);
        \u0275\u0275twoWayListener("ngModelChange", function GrowthTrackingComponent_Template_input_ngModelChange_20_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.formDate, $event) || (ctx.formDate = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(21, "div", 16)(22, "div")(23, "label", 14);
        \u0275\u0275text(24);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "div", 17)(26, "input", 18);
        \u0275\u0275twoWayListener("ngModelChange", function GrowthTrackingComponent_Template_input_ngModelChange_26_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.formHeight, $event) || (ctx.formHeight = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "span", 19);
        \u0275\u0275text(28);
        \u0275\u0275elementEnd()();
        \u0275\u0275conditionalCreate(29, GrowthTrackingComponent_Conditional_29_Template, 2, 0, "p", 20);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "div")(31, "label", 14);
        \u0275\u0275text(32);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "div", 17)(34, "input", 21);
        \u0275\u0275twoWayListener("ngModelChange", function GrowthTrackingComponent_Template_input_ngModelChange_34_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.formWeight, $event) || (ctx.formWeight = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "span", 19);
        \u0275\u0275text(36);
        \u0275\u0275elementEnd()();
        \u0275\u0275conditionalCreate(37, GrowthTrackingComponent_Conditional_37_Template, 2, 0, "p", 20);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(38, "div")(39, "label", 14);
        \u0275\u0275text(40);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "textarea", 22);
        \u0275\u0275twoWayListener("ngModelChange", function GrowthTrackingComponent_Template_textarea_ngModelChange_41_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.formNotes, $event) || (ctx.formNotes = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275conditionalCreate(42, GrowthTrackingComponent_Conditional_42_Template, 2, 1, "div", 23);
        \u0275\u0275elementStart(43, "button", 24);
        \u0275\u0275listener("click", function GrowthTrackingComponent_Template_button_click_43_listener() {
          return ctx.saveEntry();
        });
        \u0275\u0275conditionalCreate(44, GrowthTrackingComponent_Conditional_44_Template, 2, 1)(45, GrowthTrackingComponent_Conditional_45_Template, 2, 1)(46, GrowthTrackingComponent_Conditional_46_Template, 2, 1);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(47, "div", 9)(48, "div", 25)(49, "h3", 26);
        \u0275\u0275element(50, "lucide-icon", 27);
        \u0275\u0275text(51);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(52, "div", 28);
        \u0275\u0275element(53, "canvas", 29, 0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(55, "div", 30)(56, "div", 31)(57, "h3", 32);
        \u0275\u0275element(58, "lucide-icon", 33);
        \u0275\u0275text(59);
        \u0275\u0275elementEnd()();
        \u0275\u0275conditionalCreate(60, GrowthTrackingComponent_Conditional_60_Template, 8, 2, "div", 34)(61, GrowthTrackingComponent_Conditional_61_Template, 3, 0, "div", 35);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.loading() ? 1 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.i18n.t()["growth.title"]);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.activeChild() ? 6 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("appTooltip", "tooltip.percentile");
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.latestEntry() ? 9 : 10);
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["growth.addMeasurement"], " ");
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.i18n.t()["growth.measuredAt"]);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.formDate);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.i18n.t()["growth.height"]);
        \u0275\u0275advance(2);
        \u0275\u0275twoWayProperty("ngModel", ctx.formHeight);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.i18n.t()["growth.cm"]);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.formHeight !== null && (ctx.formHeight < 30 || ctx.formHeight > 200) ? 29 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.i18n.t()["growth.weight"]);
        \u0275\u0275advance(2);
        \u0275\u0275twoWayProperty("ngModel", ctx.formWeight);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.i18n.t()["growth.kg"]);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.formWeight !== null && (ctx.formWeight < 1 || ctx.formWeight > 150) ? 37 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.i18n.t()["growth.notes"]);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.formNotes);
        \u0275\u0275property("placeholder", ctx.i18n.t()["growth.notes"]);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.saveError() ? 42 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", !ctx.canSave() || ctx.saving())("ngClass", ctx.saving() ? "bg-slate-200 text-slate-400" : "bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white hover:shadow-lg");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.saving() ? 44 : ctx.saved() ? 45 : 46);
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["growth.chart"], " ");
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["growth.recent"], " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.recentEntries().length === 0 ? 60 : 61);
      }
    }, dependencies: [CommonModule, NgClass, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, MaxValidator, NgModel, LucideAngularModule, LucideAngularComponent, TooltipDirective], styles: ["\n.animate-slide-up[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_slideUp 0.35s ease-out;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(16px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=growth-tracking.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GrowthTrackingComponent, [{
    type: Component,
    args: [{ selector: "app-growth-tracking", imports: [CommonModule, FormsModule, LucideAngularModule, TooltipDirective], template: `
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
                  {{ heightDiff() >= 0 ? '\u2191' : '\u2193' }} {{ TMath.abs(heightDiff()) }} {{ i18n.t()['growth.cm'] }}
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
                  {{ weightDiff() >= 0 ? '\u2191' : '\u2193' }} {{ TMath.abs(weightDiff()) }} {{ i18n.t()['growth.kg'] }}
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
                  <p class="mt-1 text-xs text-red-500 font-medium">30\u2013200 cm</p>
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
                  <p class="mt-1 text-xs text-red-500 font-medium">1\u2013150 kg</p>
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
  `, styles: ["/* angular:styles/component:css;aa293527f2186e669cdd645fb889a2014bf4dbf7d80bd8edf3f1a4d97580ecdb;C:/Users/g_gus/Desktop/jona/kiddok/src/app/components/growth-tracking.component.ts */\n.animate-slide-up {\n  animation: slideUp 0.35s ease-out;\n}\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(16px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=growth-tracking.component.css.map */\n"] }]
  }], null, { chartCanvas: [{
    type: ViewChild,
    args: ["chartCanvas"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GrowthTrackingComponent, { className: "GrowthTrackingComponent", filePath: "src/app/components/growth-tracking.component.ts", lineNumber: 290 });
})();
export {
  GrowthTrackingComponent
};
//# sourceMappingURL=chunk-RIQ3ZVD3.js.map
