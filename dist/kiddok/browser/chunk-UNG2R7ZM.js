import {
  TooltipDirective
} from "./chunk-MTRHY5T4.js";
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
  NgSelectOption,
  NgStyle,
  NgTemplateOutlet,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-IFHIJ3FQ.js";
import {
  DataService,
  I18nService
} from "./chunk-IK3YYCP3.js";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  __async,
  __spreadProps,
  __spreadValues,
  computed,
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
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtextInterpolate4,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-SFGRG2UU.js";

// src/app/components/vaccines/vaccine-schedule.constant.ts
var VACCINE_SCHEDULE = [
  // Birth
  { code: "BCG", nameSq: "Vaksina e Tuberkulozit", nameEn: "BCG", doses: 1, defaultIntervalDays: 0, earliestDay: 0, recommendedDay: 0 },
  { code: "HepB-1", nameSq: "Hepatiti B (Doza 1)", nameEn: "Hepatitis B (Dose 1)", doses: 1, defaultIntervalDays: 0, earliestDay: 0, recommendedDay: 0 },
  // 2 months
  { code: "DTaP-1", nameSq: "DTaP (Doza 1)", nameEn: "DTaP (Dose 1)", doses: 5, defaultIntervalDays: 30, earliestDay: 60, recommendedDay: 60 },
  { code: "Hib-1", nameSq: "Hib (Doza 1)", nameEn: "Hib (Dose 1)", doses: 4, defaultIntervalDays: 30, earliestDay: 60, recommendedDay: 60 },
  { code: "IPV-1", nameSq: "Polio IPV (Doza 1)", nameEn: "IPV (Dose 1)", doses: 4, defaultIntervalDays: 30, earliestDay: 60, recommendedDay: 60 },
  { code: "HepB-2", nameSq: "Hepatiti B (Doza 2)", nameEn: "Hepatitis B (Dose 2)", doses: 1, defaultIntervalDays: 30, earliestDay: 60, recommendedDay: 60 },
  { code: "PCV-1", nameSq: "PCV (Doza 1)", nameEn: "PCV (Dose 1)", doses: 3, defaultIntervalDays: 30, earliestDay: 60, recommendedDay: 60 },
  { code: "Rotavirus-1", nameSq: "Rotavirus (Doza 1)", nameEn: "Rotavirus (Dose 1)", doses: 2, defaultIntervalDays: 30, earliestDay: 60, recommendedDay: 60 },
  // 3 months
  { code: "DTaP-2", nameSq: "DTaP (Doza 2)", nameEn: "DTaP (Dose 2)", doses: 5, defaultIntervalDays: 30, earliestDay: 90, recommendedDay: 90 },
  { code: "Hib-2", nameSq: "Hib (Doza 2)", nameEn: "Hib (Dose 2)", doses: 4, defaultIntervalDays: 30, earliestDay: 90, recommendedDay: 90 },
  { code: "IPV-2", nameSq: "Polio IPV (Doza 2)", nameEn: "IPV (Dose 2)", doses: 4, defaultIntervalDays: 30, earliestDay: 90, recommendedDay: 90 },
  // 4 months
  { code: "DTaP-3", nameSq: "DTaP (Doza 3)", nameEn: "DTaP (Dose 3)", doses: 5, defaultIntervalDays: 30, earliestDay: 120, recommendedDay: 120 },
  { code: "Hib-3", nameSq: "Hib (Doza 3)", nameEn: "Hib (Dose 3)", doses: 4, defaultIntervalDays: 30, earliestDay: 120, recommendedDay: 120 },
  { code: "IPV-3", nameSq: "Polio IPV (Doza 3)", nameEn: "IPV (Dose 3)", doses: 4, defaultIntervalDays: 30, earliestDay: 120, recommendedDay: 120 },
  { code: "PCV-2", nameSq: "PCV (Doza 2)", nameEn: "PCV (Dose 2)", doses: 3, defaultIntervalDays: 30, earliestDay: 120, recommendedDay: 120 },
  { code: "Rotavirus-2", nameSq: "Rotavirus (Doza 2)", nameEn: "Rotavirus (Dose 2)", doses: 2, defaultIntervalDays: 30, earliestDay: 120, recommendedDay: 120 },
  // 12 months
  { code: "HepB-3", nameSq: "Hepatiti B (Doza 3)", nameEn: "Hepatitis B (Dose 3)", doses: 1, defaultIntervalDays: 180, earliestDay: 360, recommendedDay: 360 },
  { code: "PCV-3", nameSq: "PCV (Doza 3)", nameEn: "PCV (Dose 3)", doses: 3, defaultIntervalDays: 180, earliestDay: 360, recommendedDay: 360 },
  { code: "MMR-1", nameSq: "MMR (Doza 1)", nameEn: "MMR (Dose 1)", doses: 2, defaultIntervalDays: 0, earliestDay: 365, recommendedDay: 365 },
  // 18 months
  { code: "DTaP-4", nameSq: "DTaP (Doza 4)", nameEn: "DTaP (Dose 4)", doses: 5, defaultIntervalDays: 180, earliestDay: 540, recommendedDay: 540 },
  { code: "Hib-4", nameSq: "Hib (Doza 4)", nameEn: "Hib (Dose 4)", doses: 4, defaultIntervalDays: 180, earliestDay: 540, recommendedDay: 540 },
  { code: "IPV-4", nameSq: "Polio IPV (Doza 4)", nameEn: "IPV (Dose 4)", doses: 4, defaultIntervalDays: 180, earliestDay: 540, recommendedDay: 540 },
  // 5 years
  { code: "DTaP-5", nameSq: "DTaP (Doza 5)", nameEn: "DTaP (Dose 5)", doses: 5, defaultIntervalDays: 730, earliestDay: 1825, recommendedDay: 1825 },
  { code: "MMR-2", nameSq: "MMR (Doza 2)", nameEn: "MMR (Dose 2)", doses: 2, defaultIntervalDays: 0, earliestDay: 1460, recommendedDay: 1460 },
  // 11 years
  { code: "Tdap", nameSq: "Tdap", nameEn: "Tdap", doses: 1, defaultIntervalDays: 0, earliestDay: 4015, recommendedDay: 4015 },
  // 12 years
  { code: "HPV", nameSq: "HPV", nameEn: "HPV", doses: 2, defaultIntervalDays: 180, earliestDay: 4380, recommendedDay: 4380 }
];

// src/app/components/vaccines/vaccine-schedule.component.ts
var _c0 = (a0) => ({ entry: a0 });
var _c1 = () => ({ "animation": "pulse-dot 1.5s ease-in-out infinite" });
var _c2 = () => ({});
var _forTrack0 = ($index, $item) => $item.scheduleEntry.code + $item.doseIndex;
function VaccineScheduleComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275element(1, "lucide-icon", 16);
    \u0275\u0275elementStart(2, "p", 17);
    \u0275\u0275text(3, "{{ t()['vaccines.emptyState'] || 'Akzni s'ka vaksina' }}");
    \u0275\u0275elementEnd()();
  }
}
function VaccineScheduleComponent_Conditional_22_For_6_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function VaccineScheduleComponent_Conditional_22_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, VaccineScheduleComponent_Conditional_22_For_6_ng_container_0_Template, 1, 0, "ng-container", 21);
  }
  if (rf & 2) {
    const entry_r1 = ctx.$implicit;
    \u0275\u0275nextContext(2);
    const timelineRow_r2 = \u0275\u0275reference(28);
    \u0275\u0275property("ngTemplateOutlet", timelineRow_r2)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c0, entry_r1));
  }
}
function VaccineScheduleComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "h3", 18);
    \u0275\u0275element(2, "span", 19);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 20);
    \u0275\u0275repeaterCreate(5, VaccineScheduleComponent_Conditional_22_For_6_Template, 1, 4, "ng-container", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", ctx_r2.t()["vaccines.schedule.overdue"], " (", ctx_r2.overdueEntries().length, ") ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.overdueEntries());
  }
}
function VaccineScheduleComponent_Conditional_23_For_5_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function VaccineScheduleComponent_Conditional_23_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, VaccineScheduleComponent_Conditional_23_For_5_ng_container_0_Template, 1, 0, "ng-container", 21);
  }
  if (rf & 2) {
    const entry_r4 = ctx.$implicit;
    \u0275\u0275nextContext(2);
    const timelineRow_r2 = \u0275\u0275reference(28);
    \u0275\u0275property("ngTemplateOutlet", timelineRow_r2)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c0, entry_r4));
  }
}
function VaccineScheduleComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "h3", 22);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 20);
    \u0275\u0275repeaterCreate(4, VaccineScheduleComponent_Conditional_23_For_5_Template, 1, 4, "ng-container", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r2.t()["vaccines.schedule.dueSoon"] || "Due soon", " (", ctx_r2.dueEntries().length, ") ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.dueEntries());
  }
}
function VaccineScheduleComponent_Conditional_24_For_5_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function VaccineScheduleComponent_Conditional_24_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, VaccineScheduleComponent_Conditional_24_For_5_ng_container_0_Template, 1, 0, "ng-container", 21);
  }
  if (rf & 2) {
    const entry_r5 = ctx.$implicit;
    \u0275\u0275nextContext(2);
    const timelineRow_r2 = \u0275\u0275reference(28);
    \u0275\u0275property("ngTemplateOutlet", timelineRow_r2)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c0, entry_r5));
  }
}
function VaccineScheduleComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "h3", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 20);
    \u0275\u0275repeaterCreate(4, VaccineScheduleComponent_Conditional_24_For_5_Template, 1, 4, "ng-container", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r2.t()["vaccines.schedule.upcoming"], " (", ctx_r2.upcomingEntries().length, ") ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.upcomingEntries());
  }
}
function VaccineScheduleComponent_Conditional_25_For_5_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function VaccineScheduleComponent_Conditional_25_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, VaccineScheduleComponent_Conditional_25_For_5_ng_container_0_Template, 1, 0, "ng-container", 21);
  }
  if (rf & 2) {
    const entry_r6 = ctx.$implicit;
    \u0275\u0275nextContext(2);
    const timelineRow_r2 = \u0275\u0275reference(28);
    \u0275\u0275property("ngTemplateOutlet", timelineRow_r2)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c0, entry_r6));
  }
}
function VaccineScheduleComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "h3", 24);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 20);
    \u0275\u0275repeaterCreate(4, VaccineScheduleComponent_Conditional_25_For_5_Template, 1, 4, "ng-container", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r2.t()["vaccines.schedule.completed"], " (", ctx_r2.completedEntries().length, ") ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.completedEntries());
  }
}
function VaccineScheduleComponent_Conditional_26_For_5_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function VaccineScheduleComponent_Conditional_26_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, VaccineScheduleComponent_Conditional_26_For_5_ng_container_0_Template, 1, 0, "ng-container", 21);
  }
  if (rf & 2) {
    const entry_r7 = ctx.$implicit;
    \u0275\u0275nextContext(2);
    const timelineRow_r2 = \u0275\u0275reference(28);
    \u0275\u0275property("ngTemplateOutlet", timelineRow_r2)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c0, entry_r7));
  }
}
function VaccineScheduleComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "h3", 25);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 26);
    \u0275\u0275repeaterCreate(4, VaccineScheduleComponent_Conditional_26_For_5_Template, 1, 4, "ng-container", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r2.t()["vaccines.schedule.notStarted"], " (", ctx_r2.notStartedEntries().length, ") ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.notStartedEntries());
  }
}
function VaccineScheduleComponent_ng_template_27_Conditional_18_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "span", 45);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 46);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r9 = \u0275\u0275nextContext(3).entry;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.t()["vaccines.manufacturer"] || "Prodhuesi", ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r9.record.manufacturer);
  }
}
function VaccineScheduleComponent_ng_template_27_Conditional_18_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "span", 45);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 46);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r9 = \u0275\u0275nextContext(3).entry;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.t()["vaccines.batchNumber"] || "Batch", ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r9.record.batchNumber);
  }
}
function VaccineScheduleComponent_ng_template_27_Conditional_18_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "span", 45);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 46);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r9 = \u0275\u0275nextContext(3).entry;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.t()["vaccines.injectionSite"] || "Vendi", ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", entry_r9.record.site === "thigh" ? ctx_r2.t()["vaccines.site.thigh"] || "Kofsh\xEB" : ctx_r2.t()["vaccines.site.arm"] || "Krah", " ");
  }
}
function VaccineScheduleComponent_ng_template_27_Conditional_18_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "span", 45);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 46);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r9 = \u0275\u0275nextContext(3).entry;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.t()["vaccines.doctor"] || "Mjeku", ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r9.record.administeredBy);
  }
}
function VaccineScheduleComponent_ng_template_27_Conditional_18_Conditional_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "span", 45);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 46);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r9 = \u0275\u0275nextContext(3).entry;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.t()["vaccines.dateGiven"] || "Data", ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatDate(entry_r9.record.completedAt));
  }
}
function VaccineScheduleComponent_ng_template_27_Conditional_18_Conditional_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r9 = \u0275\u0275nextContext(3).entry;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", entry_r9.record.notes, " ");
  }
}
function VaccineScheduleComponent_ng_template_27_Conditional_18_Conditional_1_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 47);
    \u0275\u0275listener("click", function VaccineScheduleComponent_ng_template_27_Conditional_18_Conditional_1_Conditional_6_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r10);
      const entry_r9 = \u0275\u0275nextContext(3).entry;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openMarkComplete(entry_r9, $event));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.t()["vaccines.schedule.markComplete"] || "Sh\xEBno t\xEB p\xEBrfunduar", " ");
  }
}
function VaccineScheduleComponent_ng_template_27_Conditional_18_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, VaccineScheduleComponent_ng_template_27_Conditional_18_Conditional_1_Conditional_0_Template, 5, 2, "div", 42);
    \u0275\u0275conditionalCreate(1, VaccineScheduleComponent_ng_template_27_Conditional_18_Conditional_1_Conditional_1_Template, 5, 2, "div", 42);
    \u0275\u0275conditionalCreate(2, VaccineScheduleComponent_ng_template_27_Conditional_18_Conditional_1_Conditional_2_Template, 5, 2, "div", 42);
    \u0275\u0275conditionalCreate(3, VaccineScheduleComponent_ng_template_27_Conditional_18_Conditional_1_Conditional_3_Template, 5, 2, "div", 42);
    \u0275\u0275conditionalCreate(4, VaccineScheduleComponent_ng_template_27_Conditional_18_Conditional_1_Conditional_4_Template, 5, 2, "div", 42);
    \u0275\u0275conditionalCreate(5, VaccineScheduleComponent_ng_template_27_Conditional_18_Conditional_1_Conditional_5_Template, 2, 1, "div", 43);
    \u0275\u0275conditionalCreate(6, VaccineScheduleComponent_ng_template_27_Conditional_18_Conditional_1_Conditional_6_Template, 2, 1, "button", 44);
  }
  if (rf & 2) {
    const entry_r9 = \u0275\u0275nextContext(2).entry;
    \u0275\u0275conditional(entry_r9.record.manufacturer ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r9.record.batchNumber ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r9.record.site ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r9.record.administeredBy ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r9.record.completedAt ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r9.record.notes ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r9.status !== "completed" ? 6 : -1);
  }
}
function VaccineScheduleComponent_ng_template_27_Conditional_18_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 41);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.t()["vaccines.schedule.notStarted"] || "E pamartur");
  }
}
function VaccineScheduleComponent_ng_template_27_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275conditionalCreate(1, VaccineScheduleComponent_ng_template_27_Conditional_18_Conditional_1_Template, 7, 7)(2, VaccineScheduleComponent_ng_template_27_Conditional_18_Conditional_2_Template, 2, 1, "p", 41);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r9 = \u0275\u0275nextContext().entry;
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r9.record ? 1 : 2);
  }
}
function VaccineScheduleComponent_ng_template_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275listener("click", function VaccineScheduleComponent_ng_template_27_Template_div_click_0_listener() {
      const entry_r9 = \u0275\u0275restoreView(_r8).entry;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleExpand(entry_r9));
    })("longpress", function VaccineScheduleComponent_ng_template_27_Template_div_longpress_0_listener($event) {
      const entry_r9 = \u0275\u0275restoreView(_r8).entry;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onLongPress(entry_r9, $event));
    });
    \u0275\u0275elementStart(1, "div", 28);
    \u0275\u0275element(2, "div", 29)(3, "div", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 31)(5, "div", 32)(6, "div", 33)(7, "p", 34);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 35);
    \u0275\u0275text(10);
    \u0275\u0275elementStart(11, "span", 36);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 37)(14, "span", 38);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 39);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(18, VaccineScheduleComponent_ng_template_27_Conditional_18_Template, 3, 1, "div", 40);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r9 = ctx.entry;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r2.getDotClass(entry_r9.status))("ngStyle", entry_r9.status === "overdue" ? \u0275\u0275pureFunction0(13, _c1) : \u0275\u0275pureFunction0(14, _c2));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r2.isSq() ? entry_r9.scheduleEntry.nameSq : entry_r9.scheduleEntry.nameEn, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" ", ctx_r2.t()["vaccines.doseNumber"] || "Doza", " ", entry_r9.doseIndex, "/", entry_r9.scheduleEntry.doses, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.getStatusTextClass(entry_r9.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getStatusLabel(entry_r9.status), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.formatDate(ctx_r2.getDueDate(entry_r9)));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.getBadgeClass(entry_r9.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", entry_r9.doseIndex, "/", entry_r9.scheduleEntry.doses, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.expandedEntry() && ctx_r2.expandedEntry().scheduleEntry.code === entry_r9.scheduleEntry.code && ctx_r2.expandedEntry().doseIndex === entry_r9.doseIndex ? 18 : -1);
  }
}
function VaccineScheduleComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275listener("click", function VaccineScheduleComponent_Conditional_29_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeModalOnBackdrop($event));
    });
    \u0275\u0275element(1, "div", 49);
    \u0275\u0275elementStart(2, "div", 50)(3, "div", 51)(4, "h2", 52);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 53);
    \u0275\u0275listener("click", function VaccineScheduleComponent_Conditional_29_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showMarkCompleteModal.set(false));
    });
    \u0275\u0275element(7, "lucide-icon", 54);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 55)(9, "p", 56);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div")(12, "label", 57);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "input", 58);
    \u0275\u0275twoWayListener("ngModelChange", function VaccineScheduleComponent_Conditional_29_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.completionDate, $event) || (ctx_r2.completionDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 59)(16, "button", 60);
    \u0275\u0275listener("click", function VaccineScheduleComponent_Conditional_29_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showMarkCompleteModal.set(false));
    });
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 61);
    \u0275\u0275listener("click", function VaccineScheduleComponent_Conditional_29_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmMarkComplete());
    });
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.t()["vaccines.schedule.markComplete"]);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate4(" ", ctx_r2.pendingEntry() ? ctx_r2.isSq() ? ctx_r2.pendingEntry().scheduleEntry.nameSq : ctx_r2.pendingEntry().scheduleEntry.nameEn : "", " \u2014 ", ctx_r2.t()["vaccines.doseNumber"] || "Doza", " ", (tmp_3_0 = ctx_r2.pendingEntry()) == null ? null : tmp_3_0.doseIndex, "/", (tmp_3_0 = ctx_r2.pendingEntry()) == null ? null : tmp_3_0.scheduleEntry == null ? null : tmp_3_0.scheduleEntry.doses, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.t()["vaccines.schedule.completionDate"] || "Data e p\xEBrfundimit", " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.completionDate);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.t()["vaccines.cancel"] || "Anulo", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.t()["vaccines.save"] || "Ruaj", " ");
  }
}
var VaccineScheduleComponent = class _VaccineScheduleComponent {
  constructor() {
    this.vaccineRecords = [];
    this.markCompleteRequested = new EventEmitter();
    this.dataService = inject(DataService);
    this.i18n = inject(I18nService);
    this.t = computed(() => this.i18n.t(), ...ngDevMode ? [{ debugName: "t" }] : (
      /* istanbul ignore next */
      []
    ));
    this.isSq = computed(() => this.i18n.isSq(), ...ngDevMode ? [{ debugName: "isSq" }] : (
      /* istanbul ignore next */
      []
    ));
    this.expandedEntry = signal(null, ...ngDevMode ? [{ debugName: "expandedEntry" }] : (
      /* istanbul ignore next */
      []
    ));
    this.showMarkCompleteModal = signal(false, ...ngDevMode ? [{ debugName: "showMarkCompleteModal" }] : (
      /* istanbul ignore next */
      []
    ));
    this.pendingEntry = signal(null, ...ngDevMode ? [{ debugName: "pendingEntry" }] : (
      /* istanbul ignore next */
      []
    ));
    this.completionDate = "";
    this.timelineEntries = computed(() => {
      const records = this.vaccineRecords ?? [];
      const entries = [];
      const now = /* @__PURE__ */ new Date();
      for (const scheduleEntry of VACCINE_SCHEDULE) {
        for (let dose = 1; dose <= scheduleEntry.doses; dose++) {
          const key = `${scheduleEntry.code}-${dose}`;
          const record = records.find((r) => {
            const recordDose = this.parseDoseNumber(r.vaccineName);
            return this.normalizeCode(r.vaccineName) === scheduleEntry.code && recordDose === dose;
          });
          let status = "not_started";
          let diffDays = 0;
          if (record) {
            if (record.completedAt || record.status === "completed") {
              status = "completed";
              diffDays = 0;
            } else {
              const due = new Date(record.dueDate);
              diffDays = Math.floor((due.getTime() - now.getTime()) / 864e5);
              if (diffDays < 0)
                status = "overdue";
              else if (diffDays <= 7)
                status = "due";
              else
                status = "upcoming";
            }
          }
          entries.push({
            scheduleEntry,
            doseIndex: dose,
            record,
            status,
            diffDays
          });
        }
      }
      return entries;
    }, ...ngDevMode ? [{ debugName: "timelineEntries" }] : (
      /* istanbul ignore next */
      []
    ));
    this.overdueEntries = computed(() => this.timelineEntries().filter((e) => e.status === "overdue"), ...ngDevMode ? [{ debugName: "overdueEntries" }] : (
      /* istanbul ignore next */
      []
    ));
    this.dueEntries = computed(() => this.timelineEntries().filter((e) => e.status === "due"), ...ngDevMode ? [{ debugName: "dueEntries" }] : (
      /* istanbul ignore next */
      []
    ));
    this.upcomingEntries = computed(() => this.timelineEntries().filter((e) => e.status === "upcoming"), ...ngDevMode ? [{ debugName: "upcomingEntries" }] : (
      /* istanbul ignore next */
      []
    ));
    this.completedEntries = computed(() => this.timelineEntries().filter((e) => e.status === "completed"), ...ngDevMode ? [{ debugName: "completedEntries" }] : (
      /* istanbul ignore next */
      []
    ));
    this.notStartedEntries = computed(() => this.timelineEntries().filter((e) => e.status === "not_started"), ...ngDevMode ? [{ debugName: "notStartedEntries" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  ngOnInit() {
    this.completionDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  }
  normalizeCode(name) {
    return name.replace(/\s*\(Dose\s*\d+\)/i, "").trim();
  }
  parseDoseNumber(name) {
    const match = name.match(/-\d+$|-(\d+)$/);
    if (match)
      return parseInt(match[1], 10);
    return 1;
  }
  toggleExpand(entry) {
    const key = entry.scheduleEntry.code + entry.doseIndex;
    const current = this.expandedEntry();
    if (current && current.scheduleEntry.code === entry.scheduleEntry.code && current.doseIndex === entry.doseIndex) {
      this.expandedEntry.set(null);
    } else {
      this.expandedEntry.set(entry);
    }
  }
  onLongPress(entry, event) {
    if (entry.status === "completed")
      return;
    event.preventDefault();
    this.pendingEntry.set(entry);
    this.completionDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    this.showMarkCompleteModal.set(true);
  }
  getDueDate(entry) {
    if (entry.record?.dueDate)
      return entry.record.dueDate;
    const child = this.dataService.children().find((c) => c.id === this.childId);
    if (!child)
      return "";
    const birth = new Date(child.dateOfBirth);
    const due = new Date(birth.getTime() + entry.scheduleEntry.recommendedDay * 864e5);
    return due.toISOString().split("T")[0];
  }
  confirmMarkComplete() {
    const entry = this.pendingEntry();
    if (!entry || !this.completionDate)
      return;
    this.markCompleteRequested.emit({ entry, date: this.completionDate });
    this.showMarkCompleteModal.set(false);
    this.expandedEntry.set(null);
  }
  openMarkComplete(entry, event) {
    event.stopPropagation();
    this.pendingEntry.set(entry);
    this.completionDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    this.showMarkCompleteModal.set(true);
  }
  getDotClass(status) {
    switch (status) {
      case "completed":
        return "w-3 h-3 rounded-full bg-green-500";
      case "overdue":
        return "w-3 h-3 rounded-full bg-orange-500";
      case "due":
        return "w-3 h-3 rounded-full border-2 border-orange-400 bg-transparent";
      case "upcoming":
        return "w-3 h-3 rounded-full border-2 border-teal-500 bg-transparent";
      case "not_started":
        return "w-3 h-3 rounded-full border-2 border-dashed border-gray-400 bg-transparent";
    }
  }
  getBadgeClass(status) {
    switch (status) {
      case "completed":
        return "bg-gray-100 text-gray-500";
      case "overdue":
        return "bg-orange-100 text-orange-700";
      case "due":
        return "bg-orange-50 text-orange-600";
      case "upcoming":
        return "bg-teal-50 text-teal-700";
      case "not_started":
        return "bg-gray-50 text-gray-400";
    }
  }
  getStatusTextClass(status) {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "overdue":
        return "text-orange-600";
      case "due":
        return "text-orange-500";
      case "upcoming":
        return "text-teal-600";
      case "not_started":
        return "text-gray-400";
    }
  }
  getStatusLabel(status) {
    const labels = {
      completed: this.t()["vaccines.schedule.completed"] || "P\xEBrfunduar",
      overdue: this.t()["vaccines.schedule.overdue"] || "I vonuar",
      due: this.t()["vaccines.schedule.dueSoon"] || "S\xEB shpejti",
      upcoming: this.t()["vaccines.schedule.upcoming"] || "N\xEB pritje",
      not_started: this.t()["vaccines.schedule.notStarted"] || "I pamartur"
    };
    return labels[status];
  }
  formatDate(dateStr) {
    if (!dateStr)
      return "--";
    const d = new Date(dateStr);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}/${d.getFullYear()}`;
  }
  closeModalOnBackdrop(event) {
    if (event.target.classList.contains("fixed")) {
      this.showMarkCompleteModal.set(false);
    }
  }
  static {
    this.\u0275fac = function VaccineScheduleComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VaccineScheduleComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VaccineScheduleComponent, selectors: [["app-vaccine-schedule"]], inputs: { childId: "childId", vaccineRecords: "vaccineRecords" }, outputs: { markCompleteRequested: "markCompleteRequested" }, decls: 30, vars: 12, consts: [["timelineRow", ""], [1, "bg-white", "rounded-2xl", "border", "border-gray-100", "shadow-sm", "overflow-hidden"], [1, "px-5", "pt-5", "pb-4", "border-b", "border-gray-100", "flex", "items-center", "gap-3"], [1, "w-10", "h-10", "rounded-xl", "bg-indigo-100", "flex", "items-center", "justify-center", "flex-shrink-0"], ["name", "syringe", 1, "text-inherit"], [1, "text-lg", "font-extrabold", "text-gray-800"], [1, "px-5", "py-3", "flex", "items-center", "gap-4", "text-xs", "text-gray-500", "border-b", "border-gray-50"], [1, "flex", "items-center", "gap-1.5"], [1, "w-2.5", "h-2.5", "rounded-full", "bg-green-500", "inline-block"], [1, "w-2.5", "h-2.5", "rounded-full", "border-2", "border-teal-500", "inline-block"], [1, "w-2.5", "h-2.5", "rounded-full", "bg-orange-500", "inline-block", "pulse-overdue"], [1, "w-2.5", "h-2.5", "rounded-full", "border", "border-dashed", "border-gray-400", "inline-block"], [1, "max-h-[480px]", "overflow-y-auto"], [1, "flex", "flex-col", "items-center", "justify-center", "py-12", "text-gray-400"], [1, "px-5", "py-3"], [1, "fixed", "inset-0", "z-50", "flex", "items-end", "justify-center", "sm:items-center"], ["name", "calendar-x", 1, "text-inherit"], [1, "text-sm"], [1, "text-xs", "font-bold", "text-orange-600", "uppercase", "tracking-widest", "mb-3", "flex", "items-center", "gap-2"], [1, "w-2", "h-2", "rounded-full", "bg-orange-500", "pulse-overdue", "inline-block"], [1, "space-y-2"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "text-xs", "font-bold", "text-orange-500", "uppercase", "tracking-widest", "mb-3"], [1, "text-xs", "font-bold", "text-teal-600", "uppercase", "tracking-widest", "mb-3"], [1, "text-xs", "font-bold", "text-gray-500", "uppercase", "tracking-widest", "mb-3"], [1, "text-xs", "font-bold", "text-gray-400", "uppercase", "tracking-widest", "mb-3"], [1, "space-y-2", "opacity-60"], [1, "flex", "items-start", "gap-3", "cursor-pointer", "group", 3, "click", "longpress"], [1, "flex", "flex-col", "items-center", "flex-shrink-0", "pt-1"], [3, "ngClass", "ngStyle"], [1, "w-0.5", "h-6", "bg-gray-200", "mt-1"], [1, "flex-1", "bg-gray-50", "hover:bg-gray-100", "rounded-xl", "p-3", "transition-all", "border", "border-transparent", "group-hover:border-gray-200"], [1, "flex", "items-start", "justify-between", "gap-2", "mb-1"], [1, "flex-1", "min-w-0"], [1, "font-bold", "text-gray-800", "text-sm", "leading-tight", "truncate"], [1, "text-xs", "text-gray-500"], [1, "ml-1", "text-xs", 3, "ngClass"], [1, "flex", "flex-col", "items-end", "gap-1", "flex-shrink-0"], [1, "text-xs", "font-semibold", "text-gray-600"], [1, "text-xs", "font-bold", "px-2", "py-0.5", "rounded-full", 3, "ngClass"], [1, "mt-3", "pt-3", "border-t", "border-gray-200", "space-y-1.5"], [1, "text-xs", "text-gray-400", "italic"], [1, "flex", "justify-between", "text-xs"], [1, "text-xs", "text-gray-600", "bg-white", "rounded-lg", "p-2", "mt-1"], [1, "w-full", "mt-2", "bg-teal-500", "hover:bg-teal-600", "text-white", "text-xs", "font-bold", "py-2", "rounded-xl", "transition-all"], [1, "text-gray-500", "font-medium"], [1, "text-gray-700", "font-semibold"], [1, "w-full", "mt-2", "bg-teal-500", "hover:bg-teal-600", "text-white", "text-xs", "font-bold", "py-2", "rounded-xl", "transition-all", 3, "click"], [1, "fixed", "inset-0", "z-50", "flex", "items-end", "justify-center", "sm:items-center", 3, "click"], [1, "absolute", "inset-0", "bg-black/40", "backdrop-blur-sm"], [1, "relative", "bg-white", "rounded-3xl", "w-full", "max-w-lg", "mx-4", "mb-0", "sm:mb-0", "animate-slide-up"], [1, "px-6", "pt-6", "pb-4", "border-b", "border-gray-100", "flex", "items-center", "justify-between", "rounded-t-3xl"], [1, "text-xl", "font-extrabold", "text-gray-800"], [1, "text-gray-500", "bg-gray-100", "p-2", "rounded-xl", 3, "click"], ["name", "x", 1, "text-inherit"], [1, "px-6", "py-5", "space-y-4"], [1, "text-sm", "text-gray-600"], [1, "block", "text-xs", "font-bold", "text-gray-700", "uppercase", "tracking-widest", "mb-2", "ml-1"], ["type", "date", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border", "border-gray-200", "focus:ring-4", "focus:ring-indigo-500/10", "focus:border-indigo-500", "outline-none", "transition-all", "font-semibold", "text-gray-700", 3, "ngModelChange", "ngModel"], [1, "px-6", "pb-6", "pt-2", "flex", "gap-3"], [1, "flex-1", "bg-gray-100", "hover:bg-gray-200", "text-gray-600", "font-bold", "py-3.5", "rounded-2xl", "transition-all", 3, "click"], [1, "flex-1", "bg-indigo-500", "hover:bg-indigo-600", "text-white", "font-bold", "py-3.5", "rounded-2xl", "transition-all", "shadow-sm", 3, "click"]], template: function VaccineScheduleComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3);
        \u0275\u0275element(3, "lucide-icon", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div")(5, "h2", 5);
        \u0275\u0275text(6);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(7, "div", 6)(8, "span", 7);
        \u0275\u0275element(9, "span", 8);
        \u0275\u0275text(10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "span", 7);
        \u0275\u0275element(12, "span", 9);
        \u0275\u0275text(13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "span", 7);
        \u0275\u0275element(15, "span", 10);
        \u0275\u0275text(16);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "span", 7);
        \u0275\u0275element(18, "span", 11);
        \u0275\u0275text(19);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(20, "div", 12);
        \u0275\u0275conditionalCreate(21, VaccineScheduleComponent_Conditional_21_Template, 4, 0, "div", 13);
        \u0275\u0275conditionalCreate(22, VaccineScheduleComponent_Conditional_22_Template, 7, 2, "div", 14);
        \u0275\u0275conditionalCreate(23, VaccineScheduleComponent_Conditional_23_Template, 6, 2, "div", 14);
        \u0275\u0275conditionalCreate(24, VaccineScheduleComponent_Conditional_24_Template, 6, 2, "div", 14);
        \u0275\u0275conditionalCreate(25, VaccineScheduleComponent_Conditional_25_Template, 6, 2, "div", 14);
        \u0275\u0275conditionalCreate(26, VaccineScheduleComponent_Conditional_26_Template, 6, 2, "div", 14);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(27, VaccineScheduleComponent_ng_template_27_Template, 19, 15, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
        \u0275\u0275conditionalCreate(29, VaccineScheduleComponent_Conditional_29_Template, 20, 9, "div", 15);
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate(ctx.t()["vaccines.schedule.title"]);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1(" ", ctx.t()["vaccines.schedule.completed"], " ");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", ctx.t()["vaccines.schedule.upcoming"], " ");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", ctx.t()["vaccines.schedule.overdue"], " ");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", ctx.t()["vaccines.schedule.notStarted"], " ");
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.timelineEntries().length === 0 ? 21 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.overdueEntries().length > 0 ? 22 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.dueEntries().length > 0 ? 23 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.upcomingEntries().length > 0 ? 24 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.completedEntries().length > 0 ? 25 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.notStartedEntries().length > 0 ? 26 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.showMarkCompleteModal() ? 29 : -1);
      }
    }, dependencies: [CommonModule, NgClass, NgTemplateOutlet, NgStyle, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, LucideAngularModule, LucideAngularComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n@keyframes _ngcontent-%COMP%_pulse-dot {\n  0%, 100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  50% {\n    opacity: 0.5;\n    transform: scale(1.4);\n  }\n}\n.pulse-overdue[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_pulse-dot 1.5s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_slide-up {\n  from {\n    transform: translateY(100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n.animate-slide-up[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_slide-up 0.3s ease-out;\n}\n/*# sourceMappingURL=vaccine-schedule.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VaccineScheduleComponent, [{
    type: Component,
    args: [{ selector: "app-vaccine-schedule", imports: [CommonModule, FormsModule, LucideAngularModule], template: `
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

      <!-- Header -->
      <div class="px-5 pt-5 pb-4 border-b border-gray-100 flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
          <lucide-icon name="syringe" class="text-inherit"></lucide-icon>
        </div>
        <div>
          <h2 class="text-lg font-extrabold text-gray-800">{{ t()['vaccines.schedule.title'] }}</h2>
        </div>
      </div>

      <!-- Legend -->
      <div class="px-5 py-3 flex items-center gap-4 text-xs text-gray-500 border-b border-gray-50">
        <span class="flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span>
          {{ t()['vaccines.schedule.completed'] }}
        </span>
        <span class="flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full border-2 border-teal-500 inline-block"></span>
          {{ t()['vaccines.schedule.upcoming'] }}
        </span>
        <span class="flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block pulse-overdue"></span>
          {{ t()['vaccines.schedule.overdue'] }}
        </span>
        <span class="flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full border border-dashed border-gray-400 inline-block"></span>
          {{ t()['vaccines.schedule.notStarted'] }}
        </span>
      </div>

      <!-- Timeline Scroll Area -->
      <div class="max-h-[480px] overflow-y-auto">
        @if (timelineEntries().length === 0) {
          <div class="flex flex-col items-center justify-center py-12 text-gray-400">
            <lucide-icon name="calendar-x" class="text-inherit"></lucide-icon>
            <p class="text-sm">{{ t()['vaccines.emptyState'] || 'Akzni s'ka vaksina' }}</p>
          </div>
        }

        <!-- Overdue Section -->
        @if (overdueEntries().length > 0) {
          <div class="px-5 py-3">
            <h3 class="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-orange-500 pulse-overdue inline-block"></span>
              {{ t()['vaccines.schedule.overdue'] }} ({{ overdueEntries().length }})
            </h3>
            <div class="space-y-2">
              @for (entry of overdueEntries(); track entry.scheduleEntry.code + entry.doseIndex) {
                <ng-container *ngTemplateOutlet="timelineRow; context: { entry: entry }"></ng-container>
              }
            </div>
          </div>
        }

        <!-- Due Soon Section -->
        @if (dueEntries().length > 0) {
          <div class="px-5 py-3">
            <h3 class="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">
              {{ t()['vaccines.schedule.dueSoon'] || 'Due soon' }} ({{ dueEntries().length }})
            </h3>
            <div class="space-y-2">
              @for (entry of dueEntries(); track entry.scheduleEntry.code + entry.doseIndex) {
                <ng-container *ngTemplateOutlet="timelineRow; context: { entry: entry }"></ng-container>
              }
            </div>
          </div>
        }

        <!-- Upcoming Section -->
        @if (upcomingEntries().length > 0) {
          <div class="px-5 py-3">
            <h3 class="text-xs font-bold text-teal-600 uppercase tracking-widest mb-3">
              {{ t()['vaccines.schedule.upcoming'] }} ({{ upcomingEntries().length }})
            </h3>
            <div class="space-y-2">
              @for (entry of upcomingEntries(); track entry.scheduleEntry.code + entry.doseIndex) {
                <ng-container *ngTemplateOutlet="timelineRow; context: { entry: entry }"></ng-container>
              }
            </div>
          </div>
        }

        <!-- Completed Section -->
        @if (completedEntries().length > 0) {
          <div class="px-5 py-3">
            <h3 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
              {{ t()['vaccines.schedule.completed'] }} ({{ completedEntries().length }})
            </h3>
            <div class="space-y-2">
              @for (entry of completedEntries(); track entry.scheduleEntry.code + entry.doseIndex) {
                <ng-container *ngTemplateOutlet="timelineRow; context: { entry: entry }"></ng-container>
              }
            </div>
          </div>
        }

        <!-- Not Started Section -->
        @if (notStartedEntries().length > 0) {
          <div class="px-5 py-3">
            <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              {{ t()['vaccines.schedule.notStarted'] }} ({{ notStartedEntries().length }})
            </h3>
            <div class="space-y-2 opacity-60">
              @for (entry of notStartedEntries(); track entry.scheduleEntry.code + entry.doseIndex) {
                <ng-container *ngTemplateOutlet="timelineRow; context: { entry: entry }"></ng-container>
              }
            </div>
          </div>
        }
      </div>
    </div>

    <!-- Timeline Row Template -->
    <ng-template #timelineRow let-entry="entry">
      <div class="flex items-start gap-3 cursor-pointer group"
        (click)="toggleExpand(entry)"
        (longpress)="onLongPress(entry, $any($event))">

        <!-- Timeline Dot -->
        <div class="flex flex-col items-center flex-shrink-0 pt-1">
          <div [ngClass]="getDotClass(entry.status)"
            [ngStyle]="entry.status === 'overdue' ? {'animation': 'pulse-dot 1.5s ease-in-out infinite'} : {}">
          </div>
          <div class="w-0.5 h-6 bg-gray-200 mt-1"></div>
        </div>

        <!-- Content Card -->
        <div class="flex-1 bg-gray-50 hover:bg-gray-100 rounded-xl p-3 transition-all border border-transparent group-hover:border-gray-200">
          <div class="flex items-start justify-between gap-2 mb-1">
            <div class="flex-1 min-w-0">
              <p class="font-bold text-gray-800 text-sm leading-tight truncate">
                {{ isSq() ? entry.scheduleEntry.nameSq : entry.scheduleEntry.nameEn }}
              </p>
              <p class="text-xs text-gray-500">
                {{ t()['vaccines.doseNumber'] || 'Doza' }} {{ entry.doseIndex }}/{{ entry.scheduleEntry.doses }}
                <span class="ml-1 text-xs" [ngClass]="getStatusTextClass(entry.status)">
                  {{ getStatusLabel(entry.status) }}
                </span>
              </p>
            </div>
            <div class="flex flex-col items-end gap-1 flex-shrink-0">
              <span class="text-xs font-semibold text-gray-600">{{ formatDate(getDueDate(entry)) }}</span>
              <span [ngClass]="getBadgeClass(entry.status)"
                class="text-xs font-bold px-2 py-0.5 rounded-full">
                {{ entry.doseIndex }}/{{ entry.scheduleEntry.doses }}
              </span>
            </div>
          </div>

          <!-- Expanded Details -->
          @if (expandedEntry() && expandedEntry()!.scheduleEntry.code === entry.scheduleEntry.code && expandedEntry()!.doseIndex === entry.doseIndex) {
            <div class="mt-3 pt-3 border-t border-gray-200 space-y-1.5">
              @if (entry.record) {
                @if (entry.record.manufacturer) {
                  <div class="flex justify-between text-xs">
                    <span class="text-gray-500 font-medium">{{ t()['vaccines.manufacturer'] || 'Prodhuesi' }}:</span>
                    <span class="text-gray-700 font-semibold">{{ entry.record.manufacturer }}</span>
                  </div>
                }
                @if (entry.record.batchNumber) {
                  <div class="flex justify-between text-xs">
                    <span class="text-gray-500 font-medium">{{ t()['vaccines.batchNumber'] || 'Batch' }}:</span>
                    <span class="text-gray-700 font-semibold">{{ entry.record.batchNumber }}</span>
                  </div>
                }
                @if (entry.record.site) {
                  <div class="flex justify-between text-xs">
                    <span class="text-gray-500 font-medium">{{ t()['vaccines.injectionSite'] || 'Vendi' }}:</span>
                    <span class="text-gray-700 font-semibold">
                      {{ entry.record.site === 'thigh' ? (t()['vaccines.site.thigh'] || 'Kofsh\xEB') : (t()['vaccines.site.arm'] || 'Krah') }}
                    </span>
                  </div>
                }
                @if (entry.record.administeredBy) {
                  <div class="flex justify-between text-xs">
                    <span class="text-gray-500 font-medium">{{ t()['vaccines.doctor'] || 'Mjeku' }}:</span>
                    <span class="text-gray-700 font-semibold">{{ entry.record.administeredBy }}</span>
                  </div>
                }
                @if (entry.record.completedAt) {
                  <div class="flex justify-between text-xs">
                    <span class="text-gray-500 font-medium">{{ t()['vaccines.dateGiven'] || 'Data' }}:</span>
                    <span class="text-gray-700 font-semibold">{{ formatDate(entry.record.completedAt) }}</span>
                  </div>
                }
                @if (entry.record.notes) {
                  <div class="text-xs text-gray-600 bg-white rounded-lg p-2 mt-1">
                    {{ entry.record.notes }}
                  </div>
                }
                @if (entry.status !== 'completed') {
                  <button (click)="openMarkComplete(entry, $event)"
                    class="w-full mt-2 bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold py-2 rounded-xl transition-all">
                    {{ t()['vaccines.schedule.markComplete'] || 'Sh\xEBno t\xEB p\xEBrfunduar' }}
                  </button>
                }
              } @else {
                <p class="text-xs text-gray-400 italic">{{ t()['vaccines.schedule.notStarted'] || 'E pamartur' }}</p>
              }
            </div>
          }
        </div>
      </div>
    </ng-template>

    <!-- Mark Complete Modal -->
    @if (showMarkCompleteModal()) {
      <div class="fixed inset-0 z-50 flex items-end justify-center sm:items-center" (click)="closeModalOnBackdrop($event)">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <div class="relative bg-white rounded-3xl w-full max-w-lg mx-4 mb-0 sm:mb-0 animate-slide-up">
          <div class="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between rounded-t-3xl">
            <h2 class="text-xl font-extrabold text-gray-800">{{ t()['vaccines.schedule.markComplete'] }}</h2>
            <button (click)="showMarkCompleteModal.set(false)" class="text-gray-500 bg-gray-100 p-2 rounded-xl">
              <lucide-icon name="x" class="text-inherit"></lucide-icon>
            </button>
          </div>
          <div class="px-6 py-5 space-y-4">
            <p class="text-sm text-gray-600">
              {{ pendingEntry() ? (isSq() ? pendingEntry()!.scheduleEntry.nameSq : pendingEntry()!.scheduleEntry.nameEn) : '' }}
              \u2014 {{ t()['vaccines.doseNumber'] || 'Doza' }} {{ pendingEntry()?.doseIndex }}/{{ pendingEntry()?.scheduleEntry?.doses }}
            </p>
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                {{ t()['vaccines.schedule.completionDate'] || 'Data e p\xEBrfundimit' }}
              </label>
              <input type="date" [(ngModel)]="completionDate"
                class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-gray-700">
            </div>
          </div>
          <div class="px-6 pb-6 pt-2 flex gap-3">
            <button (click)="showMarkCompleteModal.set(false)"
              class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3.5 rounded-2xl transition-all">
              {{ t()['vaccines.cancel'] || 'Anulo' }}
            </button>
            <button (click)="confirmMarkComplete()"
              class="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-2xl transition-all shadow-sm">
              {{ t()['vaccines.save'] || 'Ruaj' }}
            </button>
          </div>
        </div>
      </div>
    }
  `, styles: ["/* angular:styles/component:css;22efed3dda6fc0feafcaf2e4b53206279ae4b5d8c20f712009c58b69a80a1ec6;C:/Users/g_gus/Desktop/jona/kiddok/src/app/components/vaccines/vaccine-schedule.component.ts */\n:host {\n  display: block;\n}\n@keyframes pulse-dot {\n  0%, 100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  50% {\n    opacity: 0.5;\n    transform: scale(1.4);\n  }\n}\n.pulse-overdue {\n  animation: pulse-dot 1.5s ease-in-out infinite;\n}\n@keyframes slide-up {\n  from {\n    transform: translateY(100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n.animate-slide-up {\n  animation: slide-up 0.3s ease-out;\n}\n/*# sourceMappingURL=vaccine-schedule.component.css.map */\n"] }]
  }], null, { childId: [{
    type: Input,
    args: [{ required: true }]
  }], vaccineRecords: [{
    type: Input
  }], markCompleteRequested: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VaccineScheduleComponent, { className: "VaccineScheduleComponent", filePath: "src/app/components/vaccines/vaccine-schedule.component.ts", lineNumber: 310 });
})();

// src/app/components/vaccines/vaccine-alert-card.component.ts
var _c02 = () => ({ "animation": "pulse-dot 1.5s ease-in-out infinite" });
var _c12 = () => ({});
function VaccineAlertCardComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "button", 18);
    \u0275\u0275listener("click", function VaccineAlertCardComponent_Conditional_1_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.emitDismiss());
    });
    \u0275\u0275element(2, "lucide-icon", 17);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t()["vaccines.alertCard.dismiss"], " ");
  }
}
var VaccineAlertCardComponent = class _VaccineAlertCardComponent {
  constructor() {
    this.action = new EventEmitter();
    this.dismiss = new EventEmitter();
    this.i18n = inject(I18nService);
    this.t = computed(() => this.i18n.t(), ...ngDevMode ? [{ debugName: "t" }] : (
      /* istanbul ignore next */
      []
    ));
    this.isSq = computed(() => this.i18n.isSq(), ...ngDevMode ? [{ debugName: "isSq" }] : (
      /* istanbul ignore next */
      []
    ));
    this.swipeOffset = signal(0, ...ngDevMode ? [{ debugName: "swipeOffset" }] : (
      /* istanbul ignore next */
      []
    ));
    this.touchStartX = 0;
    this.SWIPE_THRESHOLD = 80;
    this.cardClasses = computed(() => {
      switch (this.alert.status) {
        case "overdue":
          return "bg-rose-50 border-rose-200";
        case "due":
          return "bg-orange-50 border-orange-200";
        case "upcoming":
          return "bg-teal-50 border-teal-200";
      }
    }, ...ngDevMode ? [{ debugName: "cardClasses" }] : (
      /* istanbul ignore next */
      []
    ));
    this.dotClass = computed(() => {
      switch (this.alert.status) {
        case "overdue":
          return "w-3 h-3 rounded-full bg-orange-500";
        case "due":
          return "w-3 h-3 rounded-full bg-orange-400";
        case "upcoming":
          return "w-3 h-3 rounded-full border-2 border-teal-500 bg-transparent";
      }
    }, ...ngDevMode ? [{ debugName: "dotClass" }] : (
      /* istanbul ignore next */
      []
    ));
    this.iconBgClass = computed(() => {
      switch (this.alert.status) {
        case "overdue":
          return "bg-rose-100";
        case "due":
          return "bg-orange-100";
        case "upcoming":
          return "bg-teal-100";
      }
    }, ...ngDevMode ? [{ debugName: "iconBgClass" }] : (
      /* istanbul ignore next */
      []
    ));
    this.iconColorClass = computed(() => {
      switch (this.alert.status) {
        case "overdue":
          return "text-rose-500";
        case "due":
          return "text-orange-500";
        case "upcoming":
          return "text-teal-500";
      }
    }, ...ngDevMode ? [{ debugName: "iconColorClass" }] : (
      /* istanbul ignore next */
      []
    ));
    this.statusTextClass = computed(() => {
      switch (this.alert.status) {
        case "overdue":
          return "text-rose-600";
        case "due":
          return "text-orange-600";
        case "upcoming":
          return "text-teal-600";
      }
    }, ...ngDevMode ? [{ debugName: "statusTextClass" }] : (
      /* istanbul ignore next */
      []
    ));
    this.ctaClass = computed(() => {
      switch (this.alert.status) {
        case "overdue":
          return "bg-orange-500 hover:bg-orange-600 text-white";
        case "due":
          return "bg-orange-500 hover:bg-orange-600 text-white";
        case "upcoming":
          return "bg-teal-500 hover:bg-teal-600 text-white";
      }
    }, ...ngDevMode ? [{ debugName: "ctaClass" }] : (
      /* istanbul ignore next */
      []
    ));
    this.ctaLabel = computed(() => {
      switch (this.alert.status) {
        case "overdue":
          return this.t()["vaccines.alertCard.markComplete"] || "Mark complete";
        case "due":
          return this.t()["vaccines.alertCard.markComplete"] || "Mark complete";
        case "upcoming":
          return this.t()["vaccines.alertCard.viewDetails"] || "View details";
      }
    }, ...ngDevMode ? [{ debugName: "ctaLabel" }] : (
      /* istanbul ignore next */
      []
    ));
    this.statusLabel = computed(() => {
      if (this.alert.status === "overdue" && this.alert.daysOverdue) {
        if (this.isSq()) {
          return `e vonuar ${this.alert.daysOverdue} dit\xEB`;
        }
        return `overdue by ${this.alert.daysOverdue} days`;
      }
      if (this.alert.status === "due") {
        return this.t()["vaccines.alertCard.dueSoon"] || "due today";
      }
      return this.t()["vaccines.alertCard.upcoming"] || "upcoming";
    }, ...ngDevMode ? [{ debugName: "statusLabel" }] : (
      /* istanbul ignore next */
      []
    ));
    this.vaccineTooltipKey = computed(() => {
      switch (this.alert.status) {
        case "overdue":
          return "tooltip.vaccineOverdue";
        case "due":
          return "tooltip.vaccineOverdue";
        case "upcoming":
          return "tooltip.vaccineUpcoming";
      }
    }, ...ngDevMode ? [{ debugName: "vaccineTooltipKey" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  // Touch handlers for swipe-to-dismiss
  onTouchStart(event) {
    this.touchStartX = event.touches[0].clientX;
  }
  onTouchMove(event) {
    const deltaX = event.touches[0].clientX - this.touchStartX;
    if (deltaX > 0) {
      this.swipeOffset.set(Math.min(deltaX, 120));
    }
  }
  onTouchEnd(_event) {
    if (this.swipeOffset() >= this.SWIPE_THRESHOLD) {
      this.emitDismiss();
    }
    this.swipeOffset.set(0);
  }
  emitAction() {
    this.action.emit();
  }
  emitDismiss() {
    this.dismiss.emit();
  }
  static {
    this.\u0275fac = function VaccineAlertCardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VaccineAlertCardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VaccineAlertCardComponent, selectors: [["app-vaccine-alert-card"]], inputs: { alert: "alert" }, outputs: { action: "action", dismiss: "dismiss" }, decls: 22, vars: 17, consts: [[1, "relative", "overflow-hidden", "rounded-2xl", "border", "transition-all", "duration-200", 3, "touchstart", "touchmove", "touchend", "ngClass"], [1, "absolute", "inset-0", "bg-rose-500", "flex", "items-center", "justify-end", "pr-4"], [1, "relative", "flex", "items-center", "gap-3", "p-4"], [1, "flex-shrink-0"], [3, "ngClass", "ngStyle"], [1, "w-10", "h-10", "rounded-xl", "flex", "items-center", "justify-center", "flex-shrink-0", "relative", 3, "ngClass"], ["name", "syringe", 3, "ngClass"], ["tooltipPosition", "top", 1, "absolute", "-top-1", "-right-1", "w-4", "h-4", "rounded-full", "bg-white", "border", "border-slate-200", "flex", "items-center", "justify-center", "text-slate-400", "hover:text-primary-600", "cursor-help", 3, "appTooltip"], ["name", "info", 1, "text-inherit", 2, "width", "8px", "height", "8px"], [1, "flex-1", "min-w-0"], [1, "font-bold", "text-gray-800", "text-sm", "truncate"], [1, "flex", "items-center", "gap-2", "mt-0.5"], [1, "text-xs", "text-gray-500"], [1, "w-1", "h-1", "rounded-full", "bg-gray-300"], [1, "text-xs", "font-semibold", 3, "ngClass"], [1, "flex-shrink-0", "text-xs", "font-bold", "px-3", "py-1.5", "rounded-xl", "transition-all", "hover:opacity-90", 3, "click", "ngClass"], [1, "hidden", "sm:flex", "flex-shrink-0", "w-6", "h-6", "items-center", "justify-center", "rounded-full", "text-gray-400", "hover:text-gray-600", "hover:bg-gray-100", "transition-all", 3, "click"], ["name", "x", 1, "text-inherit"], [1, "text-white", "font-bold", "text-sm", "flex", "items-center", "gap-1", 3, "click"]], template: function VaccineAlertCardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("touchstart", function VaccineAlertCardComponent_Template_div_touchstart_0_listener($event) {
          return ctx.onTouchStart($event);
        })("touchmove", function VaccineAlertCardComponent_Template_div_touchmove_0_listener($event) {
          return ctx.onTouchMove($event);
        })("touchend", function VaccineAlertCardComponent_Template_div_touchend_0_listener($event) {
          return ctx.onTouchEnd($event);
        });
        \u0275\u0275conditionalCreate(1, VaccineAlertCardComponent_Conditional_1_Template, 4, 1, "div", 1);
        \u0275\u0275elementStart(2, "div", 2)(3, "div", 3);
        \u0275\u0275element(4, "div", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 5);
        \u0275\u0275element(6, "lucide-icon", 6);
        \u0275\u0275elementStart(7, "button", 7);
        \u0275\u0275element(8, "lucide-icon", 8);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "div", 9)(10, "p", 10);
        \u0275\u0275text(11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "div", 11)(13, "span", 12);
        \u0275\u0275text(14);
        \u0275\u0275elementEnd();
        \u0275\u0275element(15, "span", 13);
        \u0275\u0275elementStart(16, "span", 14);
        \u0275\u0275text(17);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(18, "button", 15);
        \u0275\u0275listener("click", function VaccineAlertCardComponent_Template_button_click_18_listener() {
          return ctx.emitAction();
        });
        \u0275\u0275text(19);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "button", 16);
        \u0275\u0275listener("click", function VaccineAlertCardComponent_Template_button_click_20_listener() {
          return ctx.emitDismiss();
        });
        \u0275\u0275element(21, "lucide-icon", 17);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275styleProp("transform", ctx.swipeOffset() > 0 ? "translateX(" + ctx.swipeOffset() + "px)" : "translateX(0)");
        \u0275\u0275property("ngClass", ctx.cardClasses());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.swipeOffset() > 0 ? 1 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngClass", ctx.dotClass())("ngStyle", ctx.alert.status === "overdue" ? \u0275\u0275pureFunction0(15, _c02) : \u0275\u0275pureFunction0(16, _c12));
        \u0275\u0275advance();
        \u0275\u0275property("ngClass", ctx.iconBgClass());
        \u0275\u0275advance();
        \u0275\u0275property("ngClass", ctx.iconColorClass());
        \u0275\u0275advance();
        \u0275\u0275property("appTooltip", ctx.vaccineTooltipKey());
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.alert.vaccineName);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.alert.doseLabel);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngClass", ctx.statusTextClass());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.statusLabel(), " ");
        \u0275\u0275advance();
        \u0275\u0275property("ngClass", ctx.ctaClass());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.ctaLabel(), " ");
      }
    }, dependencies: [CommonModule, NgClass, NgStyle, LucideAngularModule, LucideAngularComponent, TooltipDirective], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n@keyframes _ngcontent-%COMP%_pulse-dot {\n  0%, 100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  50% {\n    opacity: 0.5;\n    transform: scale(1.4);\n  }\n}\n/*# sourceMappingURL=vaccine-alert-card.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VaccineAlertCardComponent, [{
    type: Component,
    args: [{ selector: "app-vaccine-alert-card", imports: [CommonModule, LucideAngularModule, TooltipDirective], template: `
    <div class="relative overflow-hidden rounded-2xl border transition-all duration-200"
      [ngClass]="cardClasses()"
      [style.transform]="swipeOffset() > 0 ? 'translateX(' + swipeOffset() + 'px)' : 'translateX(0)'"
      (touchstart)="onTouchStart($event)"
      (touchmove)="onTouchMove($event)"
      (touchend)="onTouchEnd($event)">

      <!-- Swipe reveal background -->
      @if (swipeOffset() > 0) {
        <div class="absolute inset-0 bg-rose-500 flex items-center justify-end pr-4">
          <button (click)="emitDismiss()" class="text-white font-bold text-sm flex items-center gap-1">
            <lucide-icon name="x" class="text-inherit"></lucide-icon>
            {{ t()['vaccines.alertCard.dismiss'] }}
          </button>
        </div>
      }

      <!-- Card Content -->
      <div class="relative flex items-center gap-3 p-4">
        <!-- Status Dot -->
        <div class="flex-shrink-0">
          <div [ngClass]="dotClass()"
            [ngStyle]="alert.status === 'overdue' ? {'animation': 'pulse-dot 1.5s ease-in-out infinite'} : {}">
          </div>
        </div>

        <!-- Icon with vaccine status tooltip (Sprint 22) -->
        <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 relative"
          [ngClass]="iconBgClass()">
          <lucide-icon name="syringe" [ngClass]="iconColorClass()"></lucide-icon>
          <button [appTooltip]="vaccineTooltipKey()"
                  tooltipPosition="top"
                  class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary-600 cursor-help">
            <lucide-icon name="info" class="text-inherit" style="width:8px;height:8px"></lucide-icon>
          </button>
        </div>

        <!-- Text -->
        <div class="flex-1 min-w-0">
          <p class="font-bold text-gray-800 text-sm truncate">{{ alert.vaccineName }}</p>
          <div class="flex items-center gap-2 mt-0.5">
            <span class="text-xs text-gray-500">{{ alert.doseLabel }}</span>
            <span class="w-1 h-1 rounded-full bg-gray-300"></span>
            <span class="text-xs font-semibold" [ngClass]="statusTextClass()">
              {{ statusLabel() }}
            </span>
          </div>
        </div>

        <!-- CTA Button -->
        <button
          (click)="emitAction()"
          class="flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl transition-all hover:opacity-90"
          [ngClass]="ctaClass()">
          {{ ctaLabel() }}
        </button>

        <!-- Desktop Dismiss -->
        <button
          (click)="emitDismiss()"
          class="hidden sm:flex flex-shrink-0 w-6 h-6 items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all">
          <lucide-icon name="x" class="text-inherit"></lucide-icon>
        </button>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;624a3b2b0761329dce4b2c1df2a300b46b83d39a02fc937ffa859c598d788fb9;C:/Users/g_gus/Desktop/jona/kiddok/src/app/components/vaccines/vaccine-alert-card.component.ts */\n:host {\n  display: block;\n}\n@keyframes pulse-dot {\n  0%, 100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  50% {\n    opacity: 0.5;\n    transform: scale(1.4);\n  }\n}\n/*# sourceMappingURL=vaccine-alert-card.component.css.map */\n"] }]
  }], null, { alert: [{
    type: Input,
    args: [{ required: true }]
  }], action: [{
    type: Output
  }], dismiss: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VaccineAlertCardComponent, { className: "VaccineAlertCardComponent", filePath: "src/app/components/vaccines/vaccine-alert-card.component.ts", lineNumber: 96 });
})();

// src/app/components/vaccines.component.ts
var _c03 = () => [1, 2, 3];
var _forTrack02 = ($index, $item) => $item.id;
function VaccinesComponent_Conditional_9_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 13);
    \u0275\u0275element(2, "div", 14);
    \u0275\u0275elementStart(3, "div", 15);
    \u0275\u0275element(4, "div", 16)(5, "div", 17);
    \u0275\u0275elementEnd()()();
  }
}
function VaccinesComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275repeaterCreate(1, VaccinesComponent_Conditional_9_For_2_Template, 6, 0, "div", 12, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c03));
  }
}
function VaccinesComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 18);
    \u0275\u0275element(2, "circle", 19)(3, "rect", 20)(4, "rect", 21)(5, "rect", 22)(6, "rect", 23)(7, "rect", 24)(8, "rect", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "h2", 26);
    \u0275\u0275text(10, "{{ t()['vaccines.emptyState'] || 'Akzni s'ka vaksina' }}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 27);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 28);
    \u0275\u0275listener("click", function VaccinesComponent_Conditional_10_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showAddModal.set(true));
    });
    \u0275\u0275element(14, "lucide-icon", 6);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r1.t()["vaccines.emptyStateHint"] || "Shtoni vaksinat e para p\uFFFDr t\uFFFD ndjekur \uFFFDdo doz\uFFFD");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t()["vaccines.addRecord"] || "Shto Vaksina", " ");
  }
}
function VaccinesComponent_Conditional_11_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-vaccine-alert-card", 30);
    \u0275\u0275listener("action", function VaccinesComponent_Conditional_11_For_2_Template_app_vaccine_alert_card_action_0_listener() {
      const alert_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.handleAlertAction(alert_r4));
    })("dismiss", function VaccinesComponent_Conditional_11_For_2_Template_app_vaccine_alert_card_dismiss_0_listener() {
      const alert_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.dismissAlert(alert_r4.id));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const alert_r4 = ctx.$implicit;
    \u0275\u0275property("alert", alert_r4);
  }
}
function VaccinesComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275repeaterCreate(1, VaccinesComponent_Conditional_11_For_2_Template, 1, 1, "app-vaccine-alert-card", 29, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.overdueAlerts());
  }
}
function VaccinesComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "app-vaccine-schedule", 31);
    \u0275\u0275listener("markCompleteRequested", function VaccinesComponent_Conditional_12_Template_app_vaccine_schedule_markCompleteRequested_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onScheduleMarkComplete($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("childId", ctx_r1.dataService.activeChildId() ?? "")("vaccineRecords", ctx_r1.childVaccines());
  }
}
function VaccinesComponent_ng_template_13_Conditional_16_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "span", 47);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 48);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const v_r7 = \u0275\u0275nextContext(2).v;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.t()["vaccines.batchNumber"] || "Batch", ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(v_r7.batchNumber);
  }
}
function VaccinesComponent_ng_template_13_Conditional_16_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "span", 47);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 48);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const v_r7 = \u0275\u0275nextContext(2).v;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.t()["vaccines.injectionSite"] || "Vendi", ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(v_r7.site === "thigh" ? ctx_r1.t()["vaccines.site.thigh"] || "Kofsh\uFFFD" : ctx_r1.t()["vaccines.site.arm"] || "Krah");
  }
}
function VaccinesComponent_ng_template_13_Conditional_16_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "span", 47);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 48);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const v_r7 = \u0275\u0275nextContext(2).v;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.t()["vaccines.doctor"] || "Mjeku", ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(v_r7.administeredBy);
  }
}
function VaccinesComponent_ng_template_13_Conditional_16_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "span", 47);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 48);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const v_r7 = \u0275\u0275nextContext(2).v;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.t()["vaccines.dateGiven"] || "Data", ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(v_r7.completedAt));
  }
}
function VaccinesComponent_ng_template_13_Conditional_16_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const v_r7 = \u0275\u0275nextContext(2).v;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", v_r7.notes, " ");
  }
}
function VaccinesComponent_ng_template_13_Conditional_16_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 49);
    \u0275\u0275listener("click", function VaccinesComponent_ng_template_13_Conditional_16_Conditional_6_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r8);
      const v_r7 = \u0275\u0275nextContext(2).v;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.markComplete(v_r7, $event));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.t()["vaccines.markComplete"] || "Sh\uFFFDno si e b\uFFFDr\uFFFD", " ");
  }
}
function VaccinesComponent_ng_template_13_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275conditionalCreate(1, VaccinesComponent_ng_template_13_Conditional_16_Conditional_1_Template, 5, 2, "div", 44);
    \u0275\u0275conditionalCreate(2, VaccinesComponent_ng_template_13_Conditional_16_Conditional_2_Template, 5, 2, "div", 44);
    \u0275\u0275conditionalCreate(3, VaccinesComponent_ng_template_13_Conditional_16_Conditional_3_Template, 5, 2, "div", 44);
    \u0275\u0275conditionalCreate(4, VaccinesComponent_ng_template_13_Conditional_16_Conditional_4_Template, 5, 2, "div", 44);
    \u0275\u0275conditionalCreate(5, VaccinesComponent_ng_template_13_Conditional_16_Conditional_5_Template, 2, 1, "div", 45);
    \u0275\u0275conditionalCreate(6, VaccinesComponent_ng_template_13_Conditional_16_Conditional_6_Template, 2, 1, "button", 46);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const v_r7 = \u0275\u0275nextContext().v;
    \u0275\u0275advance();
    \u0275\u0275conditional(v_r7.batchNumber ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(v_r7.site ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(v_r7.administeredBy ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(v_r7.completedAt ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(v_r7.notes ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(v_r7.status !== "completed" ? 6 : -1);
  }
}
function VaccinesComponent_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275listener("click", function VaccinesComponent_ng_template_13_Template_div_click_0_listener() {
      const v_r7 = \u0275\u0275restoreView(_r6).v;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleExpand(v_r7.id));
    });
    \u0275\u0275elementStart(1, "div", 33)(2, "div", 34);
    \u0275\u0275element(3, "lucide-icon", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 36)(5, "div", 37)(6, "p", 38);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 39);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 40)(11, "span");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 41);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(15, "lucide-icon", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, VaccinesComponent_ng_template_13_Conditional_16_Template, 7, 6, "div", 43);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const v_r7 = ctx.v;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.getStatusBgClass(v_r7.status));
    \u0275\u0275advance();
    \u0275\u0275property("name", ctx_r1.getStatusIcon(v_r7.status))("ngClass", ctx_r1.getStatusTextClass(v_r7.status));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(v_r7.vaccineName);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getBadgeClass(v_r7.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", v_r7.doseNumber, "/", v_r7.totalDoses, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(v_r7.dueDate));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getStatusBadgeClass(v_r7.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getStatusLabel(v_r7.status), " ");
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("text-gray-500 text-lg flex-shrink-0 transition-transform ", ctx_r1.expandedId() === v_r7.id ? "rotate-180" : ""));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.expandedId() === v_r7.id ? 16 : -1);
  }
}
function VaccinesComponent_Conditional_15_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 61);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const name_r10 = ctx.$implicit;
    \u0275\u0275property("value", name_r10);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(name_r10);
  }
}
function VaccinesComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275listener("click", function VaccinesComponent_Conditional_15_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModalOnBackdrop($event));
    });
    \u0275\u0275element(1, "div", 51);
    \u0275\u0275elementStart(2, "div", 52)(3, "div", 53)(4, "h2", 54);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 55);
    \u0275\u0275listener("click", function VaccinesComponent_Conditional_15_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showAddModal.set(false));
    });
    \u0275\u0275element(7, "lucide-icon", 56);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 57)(9, "div")(10, "label", 58);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 59);
    \u0275\u0275twoWayListener("ngModelChange", function VaccinesComponent_Conditional_15_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formVaccineName, $event) || (ctx_r1.formVaccineName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "datalist", 60);
    \u0275\u0275repeaterCreate(14, VaccinesComponent_Conditional_15_For_15_Template, 2, 2, "option", 61, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 13)(17, "div", 62)(18, "label", 58);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 63);
    \u0275\u0275twoWayListener("ngModelChange", function VaccinesComponent_Conditional_15_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formDoseNumber, $event) || (ctx_r1.formDoseNumber = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 62)(22, "label", 58);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "input", 63);
    \u0275\u0275twoWayListener("ngModelChange", function VaccinesComponent_Conditional_15_Template_input_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formTotalDoses, $event) || (ctx_r1.formTotalDoses = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div")(26, "label", 58);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "input", 64);
    \u0275\u0275twoWayListener("ngModelChange", function VaccinesComponent_Conditional_15_Template_input_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formDueDate, $event) || (ctx_r1.formDueDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div")(30, "label", 58);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "input", 65);
    \u0275\u0275twoWayListener("ngModelChange", function VaccinesComponent_Conditional_15_Template_input_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formBatchNumber, $event) || (ctx_r1.formBatchNumber = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div")(34, "label", 58);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "select", 66);
    \u0275\u0275twoWayListener("ngModelChange", function VaccinesComponent_Conditional_15_Template_select_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formSite, $event) || (ctx_r1.formSite = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(37, "option", 67);
    \u0275\u0275text(38, "--");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "option", 68);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "option", 69);
    \u0275\u0275text(42);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(43, "div")(44, "label", 58);
    \u0275\u0275text(45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "input", 70);
    \u0275\u0275twoWayListener("ngModelChange", function VaccinesComponent_Conditional_15_Template_input_ngModelChange_46_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formDoctor, $event) || (ctx_r1.formDoctor = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "div")(48, "label", 58);
    \u0275\u0275text(49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "textarea", 71);
    \u0275\u0275twoWayListener("ngModelChange", function VaccinesComponent_Conditional_15_Template_textarea_ngModelChange_50_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formNotes, $event) || (ctx_r1.formNotes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(51, "div", 72)(52, "button", 73);
    \u0275\u0275listener("click", function VaccinesComponent_Conditional_15_Template_button_click_52_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showAddModal.set(false));
    });
    \u0275\u0275text(53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "button", 74);
    \u0275\u0275listener("click", function VaccinesComponent_Conditional_15_Template_button_click_54_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveVaccine());
    });
    \u0275\u0275text(55);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.t()["vaccines.addRecord"] || "Shto Vaksina");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t()["vaccines.vaccineName"] || "Emri i Vaksines", " * ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formVaccineName);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.standardVaccines);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t()["vaccines.doseNumber"] || "Doza nr.", " * ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formDoseNumber);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t()["vaccines.totalDoses"] || "Nga gjithsej", " * ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formTotalDoses);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t()["vaccines.dateGiven"] || "Data e vendosjes", " * ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formDueDate);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t()["vaccines.batchNumber"] || "Numri i batch-it", " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formBatchNumber);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t()["vaccines.injectionSite"] || "Vendi i injeksionit", " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formSite);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.t()["vaccines.site.arm"] || "Krah");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.t()["vaccines.site.thigh"] || "Kofsh\uFFFD");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t()["vaccines.doctor"] || "Mjeku/Dhoma", " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formDoctor);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t()["vaccines.notes"] || "Sh\uFFFDnime", " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formNotes);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t()["vaccines.cancel"] || "Anulo", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t()["vaccines.save"] || "Ruaj", " ");
  }
}
var STANDARD_VACCINES = [
  "BCG",
  "HepB-1",
  "DTaP-1",
  "DTaP-2",
  "DTaP-3",
  "DTaP-4",
  "DTaP-5",
  "Hib-1",
  "Hib-2",
  "Hib-3",
  "Hib-4",
  "IPV-1",
  "IPV-2",
  "IPV-3",
  "IPV-4",
  "HepB-2",
  "HepB-3",
  "PCV-1",
  "PCV-2",
  "PCV-3",
  "Rotavirus-1",
  "Rotavirus-2",
  "MMR-1",
  "MMR-2",
  "Varicella-1",
  "HPV",
  "Tdap"
];
var VaccinesComponent = class _VaccinesComponent {
  constructor() {
    this.dataService = inject(DataService);
    this.i18n = inject(I18nService);
    this.standardVaccines = STANDARD_VACCINES;
    this.loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
      /* istanbul ignore next */
      []
    ));
    this.vaccines = signal([], ...ngDevMode ? [{ debugName: "vaccines" }] : (
      /* istanbul ignore next */
      []
    ));
    this.showAddModal = signal(false, ...ngDevMode ? [{ debugName: "showAddModal" }] : (
      /* istanbul ignore next */
      []
    ));
    this.expandedId = signal(null, ...ngDevMode ? [{ debugName: "expandedId" }] : (
      /* istanbul ignore next */
      []
    ));
    this.saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : (
      /* istanbul ignore next */
      []
    ));
    this.formVaccineName = "";
    this.formDoseNumber = 1;
    this.formTotalDoses = 1;
    this.formDueDate = "";
    this.formBatchNumber = "";
    this.formSite = "";
    this.formDoctor = "";
    this.formNotes = "";
    this.dismissedAlertIds = signal(/* @__PURE__ */ new Set(), ...ngDevMode ? [{ debugName: "dismissedAlertIds" }] : (
      /* istanbul ignore next */
      []
    ));
    this.t = computed(() => this.i18n.t(), ...ngDevMode ? [{ debugName: "t" }] : (
      /* istanbul ignore next */
      []
    ));
    this.childVaccines = computed(() => {
      const childId = this.dataService.activeChildId();
      if (!childId)
        return [];
      return this.vaccines().filter((v) => v.childId === childId);
    }, ...ngDevMode ? [{ debugName: "childVaccines" }] : (
      /* istanbul ignore next */
      []
    ));
    this.overdueVaccines = computed(() => this.childVaccines().filter((v) => v.status === "overdue"), ...ngDevMode ? [{ debugName: "overdueVaccines" }] : (
      /* istanbul ignore next */
      []
    ));
    this.dueVaccines = computed(() => this.childVaccines().filter((v) => v.status === "due"), ...ngDevMode ? [{ debugName: "dueVaccines" }] : (
      /* istanbul ignore next */
      []
    ));
    this.upcomingVaccines = computed(() => this.childVaccines().filter((v) => v.status === "upcoming"), ...ngDevMode ? [{ debugName: "upcomingVaccines" }] : (
      /* istanbul ignore next */
      []
    ));
    this.completedVaccines = computed(() => this.childVaccines().filter((v) => v.status === "completed"), ...ngDevMode ? [{ debugName: "completedVaccines" }] : (
      /* istanbul ignore next */
      []
    ));
    this.overdueCount = computed(() => this.overdueVaccines().length, ...ngDevMode ? [{ debugName: "overdueCount" }] : (
      /* istanbul ignore next */
      []
    ));
    this.overdueAlerts = computed(() => {
      return this.overdueVaccines().map((v) => ({
        id: v.id,
        vaccineName: v.vaccineName,
        doseLabel: `${v.doseNumber}/${v.totalDoses}`,
        dueDate: v.dueDate,
        status: "overdue",
        daysOverdue: Math.floor((Date.now() - new Date(v.dueDate).getTime()) / 864e5)
      })).filter((a) => !this.dismissedAlertIds().has(a.id));
    }, ...ngDevMode ? [{ debugName: "overdueAlerts" }] : (
      /* istanbul ignore next */
      []
    ));
    this.getStatusBadgeClass = this.getBadgeClass.bind(this);
  }
  ngOnInit() {
    this.loadVaccines();
  }
  loadVaccines() {
    return __async(this, null, function* () {
      this.loading.set(true);
      const childId = this.dataService.activeChildId();
      if (!childId) {
        this.loading.set(false);
        return;
      }
      try {
        const res = yield fetch(`${this.dataService.API_URL}/vaccines/child/${childId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(this.dataService.AUTH_KEY)}`
          }
        });
        if (res.ok) {
          const data = yield res.json();
          const records = (data.vaccines || []).map((v) => this.mapToRecord(v));
          this.vaccines.set(records);
        } else {
          this.loadSampleData(childId);
        }
      } catch (e) {
        const cid = this.dataService.activeChildId();
        if (cid)
          this.loadSampleData(cid);
      }
      this.loading.set(false);
    });
  }
  loadSampleData(childId) {
    const now = /* @__PURE__ */ new Date();
    const sample = [
      {
        id: "v1",
        childId,
        vaccineName: "DTaP-1",
        doseNumber: 1,
        totalDoses: 5,
        dueDate: this.dateStr(new Date(now.getTime() - 10 * 864e5)),
        completedAt: this.dateStr(new Date(now.getTime() - 10 * 864e5)),
        administeredBy: "Dr. Gashi",
        batchNumber: "AB1234",
        site: "thigh",
        status: "completed"
      },
      {
        id: "v2",
        childId,
        vaccineName: "MMR-1",
        doseNumber: 1,
        totalDoses: 2,
        dueDate: this.dateStr(new Date(now.getTime() + 7 * 864e5)),
        status: "upcoming"
      },
      {
        id: "v3",
        childId,
        vaccineName: "DTaP-2",
        doseNumber: 2,
        totalDoses: 5,
        dueDate: this.dateStr(new Date(now.getTime() - 5 * 864e5)),
        status: "overdue"
      },
      {
        id: "v4",
        childId,
        vaccineName: "Hib-1",
        doseNumber: 1,
        totalDoses: 4,
        dueDate: this.dateStr(new Date(now.getTime() + 30 * 864e5)),
        status: "upcoming"
      }
    ];
    this.vaccines.set(sample);
  }
  mapToRecord(v) {
    const now = /* @__PURE__ */ new Date();
    const due = new Date(v.dueDate);
    let status = "upcoming";
    if (v.completedAt || v.status === "completed") {
      status = "completed";
    } else {
      const diffDays = Math.floor((due.getTime() - now.getTime()) / 864e5);
      if (diffDays < 0)
        status = "overdue";
      else if (diffDays <= 7)
        status = "due";
      else
        status = "upcoming";
    }
    return {
      id: v.id,
      childId: v.childId,
      vaccineName: v.vaccineName,
      manufacturer: v.manufacturer,
      doseNumber: v.doseNumber,
      totalDoses: v.totalDoses,
      dueDate: v.dueDate,
      completedAt: v.completedAt,
      administeredBy: v.administeredBy,
      batchNumber: v.batchNumber,
      site: v.site,
      notes: v.notes,
      status
    };
  }
  dateStr(d) {
    return d.toISOString().split("T")[0];
  }
  toggleExpand(id) {
    this.expandedId.set(this.expandedId() === id ? null : id);
  }
  formatDate(dateStr) {
    if (!dateStr)
      return "";
    const d = new Date(dateStr);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}/${d.getFullYear()}`;
  }
  getStatusIcon(status) {
    switch (status) {
      case "overdue":
        return "alert-triangle";
      case "due":
        return "clock";
      case "upcoming":
        return "calendar";
      case "completed":
        return "check-circle-2";
      default:
        return "syringe";
    }
  }
  getStatusBgClass(status) {
    switch (status) {
      case "overdue":
        return "bg-rose-100";
      case "due":
        return "bg-orange-100";
      case "upcoming":
        return "bg-teal-100";
      case "completed":
        return "bg-gray-100";
      default:
        return "bg-gray-100";
    }
  }
  getStatusTextClass(status) {
    switch (status) {
      case "overdue":
        return "text-rose-500";
      case "due":
        return "text-orange-500";
      case "upcoming":
        return "text-teal-500";
      case "completed":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  }
  getBadgeClass(status) {
    switch (status) {
      case "overdue":
        return "bg-rose-100 text-rose-700";
      case "due":
        return "bg-orange-100 text-orange-700";
      case "upcoming":
        return "bg-teal-100 text-teal-700";
      case "completed":
        return "bg-gray-100 text-gray-500";
      default:
        return "bg-gray-100 text-gray-500";
    }
  }
  getStatusLabel(status) {
    const labels = {
      overdue: this.t()["vaccines.status.overdue"] || "Vonuar",
      due: this.t()["vaccines.status.due"] || "P\uFFFDr shkak",
      upcoming: this.t()["vaccines.status.upcoming"] || "S\uFFFD shpejti",
      completed: this.t()["vaccines.status.completed"] || "P\uFFFDrfunduar"
    };
    return labels[status] || status;
  }
  closeModalOnBackdrop(event) {
    if (event.target.classList.contains("fixed")) {
      this.showAddModal.set(false);
    }
  }
  saveVaccine() {
    return __async(this, null, function* () {
      if (!this.formVaccineName.trim())
        return;
      if (!this.formDueDate)
        return;
      const childId = this.dataService.activeChildId();
      if (!childId)
        return;
      this.saving.set(true);
      try {
        const payload = {
          childId,
          vaccineName: this.formVaccineName.trim(),
          doseNumber: this.formDoseNumber || 1,
          totalDoses: this.formTotalDoses || 1,
          dueDate: this.formDueDate,
          batchNumber: this.formBatchNumber || void 0,
          site: this.formSite || void 0,
          administeredBy: this.formDoctor || void 0,
          notes: this.formNotes || void 0
        };
        const res = yield fetch(`${this.dataService.API_URL}/vaccines`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(this.dataService.AUTH_KEY)}`
          },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          this.showAddModal.set(false);
          this.resetForm();
          yield this.loadVaccines();
        }
      } catch (err) {
        console.error("[Vaccines] save failed:", err);
      }
      this.saving.set(false);
    });
  }
  markComplete(vaccine, event) {
    return __async(this, null, function* () {
      event.stopPropagation();
      try {
        const res = yield fetch(`${this.dataService.API_URL}/vaccines/${vaccine.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(this.dataService.AUTH_KEY)}`
          },
          body: JSON.stringify({ status: "completed", completedAt: (/* @__PURE__ */ new Date()).toISOString() })
        });
        if (res.ok) {
          const updated = this.vaccines().map((v) => v.id === vaccine.id ? __spreadProps(__spreadValues({}, v), { status: "completed", completedAt: (/* @__PURE__ */ new Date()).toISOString() }) : v);
          this.vaccines.set(updated);
          this.expandedId.set(null);
        }
      } catch (err) {
        console.error("[Vaccines] mark complete failed:", err);
      }
    });
  }
  resetForm() {
    this.formVaccineName = "";
    this.formDoseNumber = 1;
    this.formTotalDoses = 1;
    this.formDueDate = "";
    this.formBatchNumber = "";
    this.formSite = "";
    this.formDoctor = "";
    this.formNotes = "";
  }
  handleAlertAction(alert) {
    const record = this.vaccines().find((v) => v.id === alert.id);
    if (record)
      this.markComplete(record, new MouseEvent("click"));
  }
  dismissAlert(alertId) {
    this.dismissedAlertIds.update((set) => {
      const newSet = new Set(set);
      newSet.add(alertId);
      return newSet;
    });
  }
  onScheduleMarkComplete(event) {
    const record = this.vaccines().find((v) => v.vaccineName.includes(event.entry.scheduleEntry.code) && v.doseNumber === event.entry.doseIndex);
    if (record) {
      this.markComplete(record, new MouseEvent("click"));
    }
  }
  static {
    this.\u0275fac = function VaccinesComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VaccinesComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VaccinesComponent, selectors: [["app-vaccines"]], decls: 16, vars: 7, consts: [["vaccineCard", ""], [1, "min-h-screen", "bg-gray-50", "pb-24"], [1, "bg-white", "border-b", "border-gray-100", "px-4", "pt-6", "pb-4"], [1, "flex", "items-center", "justify-between"], [1, "text-3xl", "font-extrabold", "text-gray-800"], [1, "bg-indigo-500", "hover:bg-indigo-600", "text-white", "px-5", "py-2.5", "rounded-2xl", "font-bold", "shadow-sm", "transition-all", "flex", "items-center", "gap-2", "text-sm", 3, "click"], ["name", "plus", 1, "text-inherit"], [1, "px-4", "mt-6", "space-y-4"], [1, "flex", "flex-col", "items-center", "justify-center", "mt-20", "px-4"], [1, "mx-4", "mt-6", "space-y-2"], [1, "mx-4", "mt-6"], [1, "fixed", "inset-0", "z-50", "flex", "items-end", "justify-center", "sm:items-center"], [1, "bg-white", "rounded-2xl", "p-5", "border", "border-gray-100", "animate-pulse"], [1, "flex", "gap-4"], [1, "w-12", "h-12", "rounded-xl", "bg-gray-200"], [1, "flex-1", "space-y-2"], [1, "h-4", "bg-gray-200", "rounded", "w-1/2"], [1, "h-3", "bg-gray-100", "rounded", "w-1/3"], ["width", "160", "height", "160", "viewBox", "0 0 160 160", "fill", "none", 1, "mb-6"], ["cx", "80", "cy", "80", "r", "60", "fill", "#EEF2FF"], ["x", "60", "y", "40", "width", "40", "height", "80", "rx", "8", "fill", "#6366F1", "opacity", "0.3"], ["x", "70", "y", "30", "width", "20", "height", "20", "rx", "4", "fill", "#6366F1"], ["x", "72", "y", "70", "width", "16", "height", "40", "rx", "4", "fill", "#6366F1"], ["x", "68", "y", "110", "width", "24", "height", "6", "rx", "3", "fill", "#14B8A6"], ["x", "50", "y", "78", "width", "30", "height", "3", "rx", "1.5", "fill", "#6366F1", "opacity", "0.5"], ["x", "80", "y", "78", "width", "30", "height", "3", "rx", "1.5", "fill", "#6366F1", "opacity", "0.5"], [1, "text-xl", "font-bold", "text-gray-700", "mb-2"], [1, "text-gray-500", "text-center", "mb-6", "max-w-xs"], [1, "bg-indigo-500", "hover:bg-indigo-600", "text-white", "px-6", "py-3", "rounded-2xl", "font-bold", "shadow-sm", "transition-all", "flex", "items-center", "gap-2", 3, "click"], [3, "alert"], [3, "action", "dismiss", "alert"], [3, "markCompleteRequested", "childId", "vaccineRecords"], [1, "bg-white", "rounded-2xl", "border", "border-gray-100", "shadow-sm", "hover:shadow-md", "transition-all", "cursor-pointer", 3, "click"], [1, "p-4", "flex", "items-start", "gap-4"], [1, "w-12", "h-12", "rounded-xl", "flex", "items-center", "justify-center", "flex-shrink-0", 3, "ngClass"], [1, "text-xl", 3, "name", "ngClass"], [1, "flex-1", "min-w-0"], [1, "flex", "items-start", "justify-between", "gap-2", "mb-1"], [1, "font-bold", "text-gray-800", "text-sm", "leading-tight"], [1, "text-xs", "font-bold", "px-2.5", "py-1", "rounded-full", "flex-shrink-0", 3, "ngClass"], [1, "flex", "items-center", "gap-3", "text-xs", "text-gray-500"], [1, "px-1.5", "py-0.5", "rounded-full", "text-xs", "font-bold", 3, "ngClass"], ["name", "chevron-down"], [1, "px-4", "pb-4", "border-t", "border-gray-100", "pt-3", "space-y-2"], [1, "flex", "justify-between", "text-xs"], [1, "text-xs", "text-gray-600", "bg-gray-50", "rounded-xl", "p-2.5", "mt-1"], [1, "w-full", "mt-2", "bg-teal-500", "hover:bg-teal-600", "text-white", "text-xs", "font-bold", "py-2.5", "rounded-xl", "transition-all"], [1, "text-gray-500", "font-medium"], [1, "text-gray-700", "font-semibold"], [1, "w-full", "mt-2", "bg-teal-500", "hover:bg-teal-600", "text-white", "text-xs", "font-bold", "py-2.5", "rounded-xl", "transition-all", 3, "click"], [1, "fixed", "inset-0", "z-50", "flex", "items-end", "justify-center", "sm:items-center", 3, "click"], [1, "absolute", "inset-0", "bg-black/40", "backdrop-blur-sm"], [1, "relative", "bg-white", "rounded-3xl", "w-full", "max-w-lg", "mx-4", "mb-0", "sm:mb-0", "max-h-[90vh]", "overflow-y-auto", "animate-slide-up"], [1, "sticky", "top-0", "bg-white", "px-6", "pt-6", "pb-4", "border-b", "border-gray-100", "flex", "items-center", "justify-between", "rounded-t-3xl"], [1, "text-xl", "font-extrabold", "text-gray-800"], [1, "text-gray-500", "hover:text-gray-600", "bg-gray-100", "p-2", "rounded-xl", "transition-all", 3, "click"], ["name", "x", 1, "text-inherit"], [1, "px-6", "py-5", "space-y-5"], [1, "block", "text-xs", "font-bold", "text-gray-700", "uppercase", "tracking-widest", "mb-2", "ml-1"], ["type", "text", "list", "vaccine-suggestions", "placeholder", "P.sh. DTaP-2, MMR-1...", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border", "border-gray-200", "focus:ring-4", "focus:ring-indigo-500/10", "focus:border-indigo-500", "outline-none", "transition-all", "font-semibold", "text-gray-700", 3, "ngModelChange", "ngModel"], ["id", "vaccine-suggestions"], [3, "value"], [1, "flex-1"], ["type", "number", "min", "1", "max", "10", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border", "border-gray-200", "focus:ring-4", "focus:ring-indigo-500/10", "focus:border-indigo-500", "outline-none", "transition-all", "font-semibold", "text-gray-700", 3, "ngModelChange", "ngModel"], ["type", "date", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border", "border-gray-200", "focus:ring-4", "focus:ring-indigo-500/10", "focus:border-indigo-500", "outline-none", "transition-all", "text-gray-600", "font-semibold", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "P.sh. AB1234", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border", "border-gray-200", "focus:ring-4", "focus:ring-indigo-500/10", "focus:border-indigo-500", "outline-none", "transition-all", "font-semibold", "text-gray-700", 3, "ngModelChange", "ngModel"], [1, "w-full", "px-4", "py-3", "rounded-2xl", "border", "border-gray-200", "focus:ring-4", "focus:ring-indigo-500/10", "focus:border-indigo-500", "outline-none", "transition-all", "font-semibold", "text-gray-700", "bg-white", 3, "ngModelChange", "ngModel"], ["value", ""], ["value", "arm"], ["value", "thigh"], ["type", "text", "placeholder", "P.sh. Dr. Gashi", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border", "border-gray-200", "focus:ring-4", "focus:ring-indigo-500/10", "focus:border-indigo-500", "outline-none", "transition-all", "font-semibold", "text-gray-700", 3, "ngModelChange", "ngModel"], ["rows", "3", "placeholder", "Sh\uFFFDnime shtes\uFFFD...", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border", "border-gray-200", "focus:ring-4", "focus:ring-indigo-500/10", "focus:border-indigo-500", "outline-none", "transition-all", "font-semibold", "text-gray-700", "resize-none", 3, "ngModelChange", "ngModel"], [1, "px-6", "pb-6", "pt-2", "flex", "gap-3"], [1, "flex-1", "bg-gray-100", "hover:bg-gray-200", "text-gray-600", "font-bold", "py-3.5", "rounded-2xl", "transition-all", 3, "click"], [1, "flex-1", "bg-indigo-500", "hover:bg-indigo-600", "text-white", "font-bold", "py-3.5", "rounded-2xl", "transition-all", "shadow-sm", 3, "click"]], template: function VaccinesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div")(4, "h1", 4);
        \u0275\u0275text(5);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "button", 5);
        \u0275\u0275listener("click", function VaccinesComponent_Template_button_click_6_listener() {
          return ctx.showAddModal.set(true);
        });
        \u0275\u0275element(7, "lucide-icon", 6);
        \u0275\u0275text(8);
        \u0275\u0275elementEnd()()();
        \u0275\u0275conditionalCreate(9, VaccinesComponent_Conditional_9_Template, 3, 1, "div", 7);
        \u0275\u0275conditionalCreate(10, VaccinesComponent_Conditional_10_Template, 16, 2, "div", 8);
        \u0275\u0275conditionalCreate(11, VaccinesComponent_Conditional_11_Template, 3, 0, "div", 9);
        \u0275\u0275conditionalCreate(12, VaccinesComponent_Conditional_12_Template, 2, 2, "div", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275template(13, VaccinesComponent_ng_template_13_Template, 17, 14, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
        \u0275\u0275conditionalCreate(15, VaccinesComponent_Conditional_15_Template, 56, 21, "div", 11);
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.t()["vaccines.title"] || "Vaksinat");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", ctx.t()["vaccines.addRecord"] || "Shto Vaksina", " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.loading() ? 9 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.loading() && ctx.childVaccines().length === 0 ? 10 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.overdueAlerts().length > 0 && !ctx.loading() ? 11 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.loading() ? 12 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.showAddModal() ? 15 : -1);
      }
    }, dependencies: [CommonModule, NgClass, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, MaxValidator, NgModel, VaccineScheduleComponent, VaccineAlertCardComponent, LucideAngularModule, LucideAngularComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=vaccines.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VaccinesComponent, [{
    type: Component,
    args: [{ selector: "app-vaccines", imports: [CommonModule, FormsModule, VaccineScheduleComponent, VaccineAlertCardComponent, LucideAngularModule], template: `
    <div class="min-h-screen bg-gray-50 pb-24">

      <!-- Header -->
      <div class="bg-white border-b border-gray-100 px-4 pt-6 pb-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-extrabold text-gray-800">{{ t()['vaccines.title'] || 'Vaksinat' }}</h1>
          </div>
          <button (click)="showAddModal.set(true)"
            class="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-2xl font-bold shadow-sm transition-all flex items-center gap-2 text-sm">
            <lucide-icon name="plus" class="text-inherit"></lucide-icon>
            {{ t()['vaccines.addRecord'] || 'Shto Vaksina' }}
          </button>
        </div>
      </div>

      <!-- Loading Skeleton -->
      @if (loading()) {
        <div class="px-4 mt-6 space-y-4">
          @for (i of [1,2,3]; track i) {
            <div class="bg-white rounded-2xl p-5 border border-gray-100 animate-pulse">
              <div class="flex gap-4">
                <div class="w-12 h-12 rounded-xl bg-gray-200"></div>
                <div class="flex-1 space-y-2">
                  <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div class="h-3 bg-gray-100 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          }
        </div>
      }

      <!-- Empty State -->
      @if (!loading() && childVaccines().length === 0) {
        <div class="flex flex-col items-center justify-center mt-20 px-4">
          <!-- Inline SVG illustration -->
          <svg width="160" height="160" viewBox="0 0 160 160" fill="none" class="mb-6">
            <circle cx="80" cy="80" r="60" fill="#EEF2FF"/>
            <rect x="60" y="40" width="40" height="80" rx="8" fill="#6366F1" opacity="0.3"/>
            <rect x="70" y="30" width="20" height="20" rx="4" fill="#6366F1"/>
            <rect x="72" y="70" width="16" height="40" rx="4" fill="#6366F1"/>
            <rect x="68" y="110" width="24" height="6" rx="3" fill="#14B8A6"/>
            <rect x="50" y="78" width="30" height="3" rx="1.5" fill="#6366F1" opacity="0.5"/>
            <rect x="80" y="78" width="30" height="3" rx="1.5" fill="#6366F1" opacity="0.5"/>
          </svg>
          <h2 class="text-xl font-bold text-gray-700 mb-2">{{ t()['vaccines.emptyState'] || 'Akzni s'ka vaksina' }}</h2>
          <p class="text-gray-500 text-center mb-6 max-w-xs">{{ t()['vaccines.emptyStateHint'] || 'Shtoni vaksinat e para p\uFFFDr t\uFFFD ndjekur \uFFFDdo doz\uFFFD' }}</p>
          <button (click)="showAddModal.set(true)"
            class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-sm transition-all flex items-center gap-2">
            <lucide-icon name="plus" class="text-inherit"></lucide-icon>
            {{ t()['vaccines.addRecord'] || 'Shto Vaksina' }}
          </button>
        </div>
      }

      <!-- Alert Cards -->
      @if (overdueAlerts().length > 0 && !loading()) {
        <div class="mx-4 mt-6 space-y-2">
          @for (alert of overdueAlerts(); track alert.id) {
            <app-vaccine-alert-card
              [alert]="alert"
              (action)="handleAlertAction(alert)"
              (dismiss)="dismissAlert(alert.id)"
            />
          }
        </div>
      }

      <!-- Vaccine Schedule Timeline -->
      @if (!loading()) {
        <div class="mx-4 mt-6">
          <app-vaccine-schedule
            [childId]="dataService.activeChildId() ?? ''"
            [vaccineRecords]="childVaccines()"
            (markCompleteRequested)="onScheduleMarkComplete($event)"
          />
        </div>
      }

    </div>

    <!-- Vaccine Card Template -->
    <ng-template #vaccineCard let-v="v">
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer"
        (click)="toggleExpand(v.id)">
        <div class="p-4 flex items-start gap-4">
          <!-- Icon -->
          <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            [ngClass]="getStatusBgClass(v.status)">
            <lucide-icon [name]="getStatusIcon(v.status)" class="text-xl" [ngClass]="getStatusTextClass(v.status)"></lucide-icon>
          </div>

          <!-- Main Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2 mb-1">
              <p class="font-bold text-gray-800 text-sm leading-tight">{{ v.vaccineName }}</p>
              <span class="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                [ngClass]="getBadgeClass(v.status)">
                {{ v.doseNumber }}/{{ v.totalDoses }}
              </span>
            </div>
            <div class="flex items-center gap-3 text-xs text-gray-500">
              <span>{{ formatDate(v.dueDate) }}</span>
              <span class="px-1.5 py-0.5 rounded-full text-xs font-bold"
                [ngClass]="getStatusBadgeClass(v.status)">
                {{ getStatusLabel(v.status) }}
              </span>
            </div>
          </div>

          <!-- Expand Icon -->
          <lucide-icon name="chevron-down" class="text-gray-500 text-lg flex-shrink-0 transition-transform {{ expandedId() === v.id ? 'rotate-180' : '' }}"></lucide-icon>
        </div>

        <!-- Expanded Details -->
        @if (expandedId() === v.id) {
          <div class="px-4 pb-4 border-t border-gray-100 pt-3 space-y-2">
            @if (v.batchNumber) {
              <div class="flex justify-between text-xs">
                <span class="text-gray-500 font-medium">{{ t()['vaccines.batchNumber'] || 'Batch' }}:</span>
                <span class="text-gray-700 font-semibold">{{ v.batchNumber }}</span>
              </div>
            }
            @if (v.site) {
              <div class="flex justify-between text-xs">
                <span class="text-gray-500 font-medium">{{ t()['vaccines.injectionSite'] || 'Vendi' }}:</span>
                <span class="text-gray-700 font-semibold">{{ v.site === 'thigh' ? (t()['vaccines.site.thigh'] || 'Kofsh\uFFFD') : (t()['vaccines.site.arm'] || 'Krah') }}</span>
              </div>
            }
            @if (v.administeredBy) {
              <div class="flex justify-between text-xs">
                <span class="text-gray-500 font-medium">{{ t()['vaccines.doctor'] || 'Mjeku' }}:</span>
                <span class="text-gray-700 font-semibold">{{ v.administeredBy }}</span>
              </div>
            }
            @if (v.completedAt) {
              <div class="flex justify-between text-xs">
                <span class="text-gray-500 font-medium">{{ t()['vaccines.dateGiven'] || 'Data' }}:</span>
                <span class="text-gray-700 font-semibold">{{ formatDate(v.completedAt) }}</span>
              </div>
            }
            @if (v.notes) {
              <div class="text-xs text-gray-600 bg-gray-50 rounded-xl p-2.5 mt-1">
                {{ v.notes }}
              </div>
            }
            @if (v.status !== 'completed') {
              <button (click)="markComplete(v, $event)"
                class="w-full mt-2 bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold py-2.5 rounded-xl transition-all">
                {{ t()['vaccines.markComplete'] || 'Sh\uFFFDno si e b\uFFFDr\uFFFD' }}
              </button>
            }
          </div>
        }
      </div>
    </ng-template>

    <!-- Add Vaccine Modal -->
    @if (showAddModal()) {
      <div class="fixed inset-0 z-50 flex items-end justify-center sm:items-center" (click)="closeModalOnBackdrop($event)">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

        <!-- Modal Panel -->
        <div class="relative bg-white rounded-3xl w-full max-w-lg mx-4 mb-0 sm:mb-0 max-h-[90vh] overflow-y-auto animate-slide-up">

          <!-- Header -->
          <div class="sticky top-0 bg-white px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between rounded-t-3xl">
            <h2 class="text-xl font-extrabold text-gray-800">{{ t()['vaccines.addRecord'] || 'Shto Vaksina' }}</h2>
            <button (click)="showAddModal.set(false)" class="text-gray-500 hover:text-gray-600 bg-gray-100 p-2 rounded-xl transition-all">
              <lucide-icon name="x" class="text-inherit"></lucide-icon>
            </button>
          </div>

          <!-- Form -->
          <div class="px-6 py-5 space-y-5">
            <!-- Vaccine Name -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                {{ t()['vaccines.vaccineName'] || 'Emri i Vaksines' }} *
              </label>
              <input [(ngModel)]="formVaccineName" type="text"
                list="vaccine-suggestions"
                class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-gray-700"
                placeholder="P.sh. DTaP-2, MMR-1...">
              <datalist id="vaccine-suggestions">
                @for (name of standardVaccines; track name) {
                  <option [value]="name">{{ name }}</option>
                }
              </datalist>
            </div>

            <!-- Dose Number & Total -->
            <div class="flex gap-4">
              <div class="flex-1">
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                  {{ t()['vaccines.doseNumber'] || 'Doza nr.' }} *
                </label>
                <input [(ngModel)]="formDoseNumber" type="number" min="1" max="10"
                  class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-gray-700">
              </div>
              <div class="flex-1">
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                  {{ t()['vaccines.totalDoses'] || 'Nga gjithsej' }} *
                </label>
                <input [(ngModel)]="formTotalDoses" type="number" min="1" max="10"
                  class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-gray-700">
              </div>
            </div>

            <!-- Due Date -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                {{ t()['vaccines.dateGiven'] || 'Data e vendosjes' }} *
              </label>
              <input [(ngModel)]="formDueDate" type="date"
                class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-gray-600 font-semibold">
            </div>

            <!-- Batch Number -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                {{ t()['vaccines.batchNumber'] || 'Numri i batch-it' }}
              </label>
              <input [(ngModel)]="formBatchNumber" type="text"
                class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-gray-700"
                placeholder="P.sh. AB1234">
            </div>

            <!-- Injection Site -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                {{ t()['vaccines.injectionSite'] || 'Vendi i injeksionit' }}
              </label>
              <select [(ngModel)]="formSite"
                class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-gray-700 bg-white">
                <option value="">--</option>
                <option value="arm">{{ t()['vaccines.site.arm'] || 'Krah' }}</option>
                <option value="thigh">{{ t()['vaccines.site.thigh'] || 'Kofsh\uFFFD' }}</option>
              </select>
            </div>

            <!-- Doctor -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                {{ t()['vaccines.doctor'] || 'Mjeku/Dhoma' }}
              </label>
              <input [(ngModel)]="formDoctor" type="text"
                class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-gray-700"
                placeholder="P.sh. Dr. Gashi">
            </div>

            <!-- Notes -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                {{ t()['vaccines.notes'] || 'Sh\uFFFDnime' }}
              </label>
              <textarea [(ngModel)]="formNotes" rows="3"
                class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-gray-700 resize-none"
                placeholder="Sh\uFFFDnime shtes\uFFFD..."></textarea>
            </div>
          </div>

          <!-- Actions -->
          <div class="px-6 pb-6 pt-2 flex gap-3">
            <button (click)="showAddModal.set(false)"
              class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3.5 rounded-2xl transition-all">
              {{ t()['vaccines.cancel'] || 'Anulo' }}
            </button>
            <button (click)="saveVaccine()"
              class="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-2xl transition-all shadow-sm">
              {{ t()['vaccines.save'] || 'Ruaj' }}
            </button>
          </div>
        </div>
      </div>
    }
  `, styles: ["/* angular:styles/component:css;239657c732bfd36205d0b60d0c3c630c7c77adaaccb59693b759836aabe365d3;C:/Users/g_gus/Desktop/jona/kiddok/src/app/components/vaccines.component.ts */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=vaccines.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VaccinesComponent, { className: "VaccinesComponent", filePath: "src/app/components/vaccines.component.ts", lineNumber: 326 });
})();
export {
  VaccinesComponent
};
//# sourceMappingURL=chunk-UNG2R7ZM.js.map
