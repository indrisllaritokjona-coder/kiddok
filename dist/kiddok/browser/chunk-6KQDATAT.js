import {
  CommonModule,
  DefaultValueAccessor,
  FormsModule,
  LucideAngularComponent,
  LucideAngularModule,
  NgControlStatus,
  NgModel
} from "./chunk-IFHIJ3FQ.js";
import {
  DataService,
  I18nService
} from "./chunk-RD3QEML6.js";
import {
  Component,
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
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate1,
  ɵɵinterpolate2,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
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
  ɵɵtwoWayProperty
} from "./chunk-SFGRG2UU.js";

// src/app/components/diary.component.ts
var _c0 = () => [1, 2, 3, 4, 5, 6, 7];
var _c1 = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
var _c2 = () => [1, 2, 3];
var _forTrack0 = ($index, $item) => $item.type;
var _forTrack1 = ($index, $item) => $item.value;
var _forTrack2 = ($index, $item) => $item.date.toISOString();
var _forTrack3 = ($index, $item) => $item.id;
var _forTrack4 = ($index, $item) => $item.key;
function DiaryComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function DiaryComponent_For_12_Template_button_click_0_listener() {
      const qa_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.quickAdd(qa_r2));
    });
    \u0275\u0275elementStart(1, "span", 41);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 42);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const qa_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMap(\u0275\u0275interpolate2("flex flex-col items-center gap-1.5 w-16 h-20 rounded-2xl border-2 transition-all hover:shadow-md hover:-translate-y-0.5 ", qa_r2.bgClass, " ", qa_r2.borderClass));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(qa_r2.emoji);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.i18n.t()[qa_r2.labelKey]);
  }
}
function DiaryComponent_Conditional_13_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 49);
  }
}
function DiaryComponent_Conditional_13_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 50);
  }
}
function DiaryComponent_Conditional_13_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275element(1, "div", 52);
    \u0275\u0275elementStart(2, "div", 53);
    \u0275\u0275element(3, "div", 54)(4, "div", 55);
    \u0275\u0275elementEnd()();
  }
}
function DiaryComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 43)(2, "div", 44);
    \u0275\u0275element(3, "div", 45);
    \u0275\u0275elementStart(4, "div", 46);
    \u0275\u0275element(5, "div", 47)(6, "div", 47);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 48);
    \u0275\u0275repeaterCreate(8, DiaryComponent_Conditional_13_For_9_Template, 1, 0, "div", 49, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275repeaterCreate(10, DiaryComponent_Conditional_13_For_11_Template, 1, 0, "div", 50, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 43);
    \u0275\u0275repeaterCreate(13, DiaryComponent_Conditional_13_For_14_Template, 5, 0, "div", 51, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(8);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(1, _c1));
    \u0275\u0275advance(3);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(2, _c2));
  }
}
function DiaryComponent_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function DiaryComponent_For_16_Template_button_click_0_listener() {
      const f_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.activeFilter.set(f_r5.value));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMap(\u0275\u0275interpolate1("px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border-2 transition-all\n                         ", ctx_r2.activeFilter() === f_r5.value ? "bg-primary-600 text-white border-primary-600" : "bg-white text-slate-500 border-slate-200 hover:border-primary-300"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", f_r5.label(), " ");
  }
}
function DiaryComponent_For_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const dow_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(dow_r6);
  }
}
function DiaryComponent_For_31_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 56);
  }
}
function DiaryComponent_For_31_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 57);
  }
}
function DiaryComponent_For_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function DiaryComponent_For_31_Template_button_click_0_listener() {
      const day_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectDay(day_r8));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, DiaryComponent_For_31_Conditional_3_Template, 1, 0, "span", 56);
    \u0275\u0275conditionalCreate(4, DiaryComponent_For_31_Conditional_4_Template, 1, 0, "span", 57);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const day_r8 = ctx.$implicit;
    \u0275\u0275classMap(\u0275\u0275interpolate1("relative aspect-square flex flex-col items-center justify-center rounded-2xl transition-all text-sm font-semibold group\n                             ", day_r8.isCurrentMonth ? day_r8.isSelected ? "bg-primary-600 text-white shadow-md" : "text-gray-700 hover:bg-primary-50" : "text-slate-300"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(day_r8.day);
    \u0275\u0275advance();
    \u0275\u0275conditional(day_r8.isToday && !day_r8.isSelected ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(day_r8.hasEntries && !day_r8.isSelected ? 4 : -1);
  }
}
function DiaryComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275element(1, "lucide-icon", 58);
    \u0275\u0275elementStart(2, "p", 59);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 60);
    \u0275\u0275listener("click", function DiaryComponent_Conditional_46_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openAddEntry());
    });
    \u0275\u0275element(5, "lucide-icon", 5);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.i18n.t()["diary.emptyState"]);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.i18n.t()["diary.addFirst"], " ");
  }
}
function DiaryComponent_For_48_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span");
  }
  if (rf & 2) {
    const entry_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMap(\u0275\u0275interpolate1("w-3 h-3 rounded-full ", ctx_r2.severityColor(entry_r11.severity)));
  }
}
function DiaryComponent_For_48_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 67);
    \u0275\u0275element(1, "lucide-icon", 69);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", entry_r11.duration, " ");
  }
}
function DiaryComponent_For_48_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 68);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(entry_r11.notes);
  }
}
function DiaryComponent_For_48_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30)(1, "div", 61)(2, "div", 62);
    \u0275\u0275element(3, "lucide-icon", 63);
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, DiaryComponent_For_48_Conditional_6_Template, 1, 3, "span", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 64);
    \u0275\u0275listener("click", function DiaryComponent_For_48_Template_button_click_7_listener() {
      const entry_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteEntry(entry_r11));
    });
    \u0275\u0275element(8, "lucide-icon", 65);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "p", 66);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, DiaryComponent_For_48_Conditional_11_Template, 3, 1, "p", 67);
    \u0275\u0275conditionalCreate(12, DiaryComponent_For_48_Conditional_12_Template, 2, 1, "p", 68);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r11 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275classMap(\u0275\u0275interpolate1("text-base ", ctx_r2.typeIconClass(entry_r11.type)));
    \u0275\u0275property("name", ctx_r2.typeIcon(entry_r11.type));
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("text-xs font-bold uppercase tracking-wider ", ctx_r2.typeColorClass(entry_r11.type)));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.typeLabel(entry_r11.type), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r11.severity ? 6 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(entry_r11.description);
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r11.type === "symptom" && entry_r11.duration ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r11.notes ? 12 : -1);
  }
}
function DiaryComponent_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275element(1, "lucide-icon", 58);
    \u0275\u0275elementStart(2, "p", 59);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 60);
    \u0275\u0275listener("click", function DiaryComponent_Conditional_58_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openAddEntry());
    });
    \u0275\u0275element(5, "lucide-icon", 5);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.i18n.t()["diary.emptyState"]);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.i18n.t()["diary.addFirst"], " ");
  }
}
function DiaryComponent_For_61_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span");
  }
  if (rf & 2) {
    const entry_r13 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMap(\u0275\u0275interpolate1("w-2.5 h-2.5 rounded-full ", ctx_r2.severityColor(entry_r13.severity)));
  }
}
function DiaryComponent_For_61_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 74);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(entry_r13.duration);
  }
}
function DiaryComponent_For_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 70)(2, "span", 71);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, DiaryComponent_For_61_Conditional_4_Template, 1, 3, "span", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 72)(6, "div", 73)(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 74);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "p", 75);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(13, DiaryComponent_For_61_Conditional_13_Template, 2, 1, "p", 74);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r13 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.typeEmoji(entry_r13.type));
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r13.severity ? 4 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275classMap(\u0275\u0275interpolate1("text-xs font-bold uppercase tracking-wider ", ctx_r2.typeColorClass(entry_r13.type)));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.typeLabel(entry_r13.type));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatEntryTime(entry_r13.loggedAt));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r13.description);
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r13.duration ? 13 : -1);
  }
}
function DiaryComponent_Conditional_62_For_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function DiaryComponent_Conditional_62_For_12_Template_button_click_0_listener() {
      const type_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.newEntryType.set(type_r16.value));
    });
    \u0275\u0275element(1, "lucide-icon", 89);
    \u0275\u0275elementStart(2, "div");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const type_r16 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border-2 flex flex-col items-center gap-1\n                             ", ctx_r2.newEntryType() === type_r16.value ? "bg-primary-600 text-white border-primary-600" : "bg-slate-50 text-slate-500 border-transparent hover:bg-slate-100"));
    \u0275\u0275advance();
    \u0275\u0275property("name", type_r16.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(type_r16.label());
  }
}
function DiaryComponent_Conditional_62_Conditional_18_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function DiaryComponent_Conditional_62_Conditional_18_For_5_Template_button_click_0_listener() {
      const symptom_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.toggleSymptom(symptom_r19.key));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const symptom_r19 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classMap(\u0275\u0275interpolate1("px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all\n                                   ", ctx_r2.newSymptoms().includes(symptom_r19.key) ? "bg-orange-500 text-white border-orange-500" : "bg-white text-slate-500 border-slate-200 hover:border-orange-300"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", symptom_r19.label(), " ");
  }
}
function DiaryComponent_Conditional_62_Conditional_18_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function DiaryComponent_Conditional_62_Conditional_18_For_11_Template_button_click_0_listener() {
      const sev_r21 = \u0275\u0275restoreView(_r20).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.newSeverity.set(sev_r21.value));
    });
    \u0275\u0275element(1, "span");
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const sev_r21 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classMap(\u0275\u0275interpolate1("flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border-2 transition-all ", ctx_r2.newSeverity() === sev_r21.value ? sev_r21.activeClass : "bg-slate-50 border-slate-200 hover:" + sev_r21.hoverClass));
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("w-5 h-5 rounded-full ", sev_r21.dotClass));
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("text-xs font-bold ", ctx_r2.newSeverity() === sev_r21.value ? sev_r21.textClass : "text-slate-500"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(sev_r21.label());
  }
}
function DiaryComponent_Conditional_62_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "label", 90);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 91);
    \u0275\u0275repeaterCreate(4, DiaryComponent_Conditional_62_Conditional_18_For_5_Template, 2, 4, "button", 7, _forTrack4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "label", 90);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 92);
    \u0275\u0275repeaterCreate(10, DiaryComponent_Conditional_62_Conditional_18_For_11_Template, 4, 10, "button", 7, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div")(13, "label", 84);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 93);
    \u0275\u0275twoWayListener("ngModelChange", function DiaryComponent_Conditional_62_Conditional_18_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.newDuration, $event) || (ctx_r2.newDuration = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.i18n.t()["diary.symptoms"]);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.symptomOptions());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.i18n.t()["diary.severity.label"]);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.severities());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.i18n.t()["diary.duration"]);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newDuration);
    \u0275\u0275property("placeholder", ctx_r2.i18n.t()["diary.durationPlaceholder"]);
  }
}
function DiaryComponent_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 76);
    \u0275\u0275listener("click", function DiaryComponent_Conditional_62_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeModal());
    });
    \u0275\u0275elementStart(1, "div", 77);
    \u0275\u0275listener("click", function DiaryComponent_Conditional_62_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 78)(3, "div")(4, "h3", 79);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 33);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 80);
    \u0275\u0275listener("click", function DiaryComponent_Conditional_62_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeModal());
    });
    \u0275\u0275element(9, "lucide-icon", 81);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 82);
    \u0275\u0275repeaterCreate(11, DiaryComponent_Conditional_62_For_12_Template, 4, 5, "button", 7, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 83)(14, "div")(15, "label", 84);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "textarea", 85);
    \u0275\u0275twoWayListener("ngModelChange", function DiaryComponent_Conditional_62_Template_textarea_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newDescription, $event) || (ctx_r2.newDescription = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(18, DiaryComponent_Conditional_62_Conditional_18_Template, 16, 5);
    \u0275\u0275elementStart(19, "div")(20, "label", 84);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "textarea", 85);
    \u0275\u0275twoWayListener("ngModelChange", function DiaryComponent_Conditional_62_Template_textarea_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newNotes, $event) || (ctx_r2.newNotes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 86)(24, "button", 87);
    \u0275\u0275listener("click", function DiaryComponent_Conditional_62_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeModal());
    });
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 88);
    \u0275\u0275listener("click", function DiaryComponent_Conditional_62_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.saveEntry());
    });
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.i18n.t()["diary.addEntry"]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.selectedDateLabel());
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r2.entryTypes());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.i18n.t()["diary.description"]);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newDescription);
    \u0275\u0275property("placeholder", ctx_r2.i18n.t()["diary.descriptionPlaceholder"]);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.newEntryType() === "symptom" ? 18 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.i18n.t()["diary.notes"]);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newNotes);
    \u0275\u0275property("placeholder", ctx_r2.i18n.t()["diary.notesPlaceholder"]);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.i18n.t()["diary.cancel"], " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r2.canSave());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.i18n.t()["diary.save"], " ");
  }
}
var DiaryComponent = class _DiaryComponent {
  constructor() {
    this.dataService = inject(DataService);
    this.i18n = inject(I18nService);
    this.loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : (
      /* istanbul ignore next */
      []
    ));
    this.viewDate = signal(/* @__PURE__ */ new Date(), ...ngDevMode ? [{ debugName: "viewDate" }] : (
      /* istanbul ignore next */
      []
    ));
    this.selectedDate = signal(this.todayStr(), ...ngDevMode ? [{ debugName: "selectedDate" }] : (
      /* istanbul ignore next */
      []
    ));
    this.showModal = signal(false, ...ngDevMode ? [{ debugName: "showModal" }] : (
      /* istanbul ignore next */
      []
    ));
    this.newEntryType = signal("symptom", ...ngDevMode ? [{ debugName: "newEntryType" }] : (
      /* istanbul ignore next */
      []
    ));
    this.activeFilter = signal("all", ...ngDevMode ? [{ debugName: "activeFilter" }] : (
      /* istanbul ignore next */
      []
    ));
    this.newDescription = "";
    this.newSymptoms = signal([], ...ngDevMode ? [{ debugName: "newSymptoms" }] : (
      /* istanbul ignore next */
      []
    ));
    this.newSeverity = signal("mild", ...ngDevMode ? [{ debugName: "newSeverity" }] : (
      /* istanbul ignore next */
      []
    ));
    this.newDuration = "";
    this.newNotes = "";
    this.quickAddButtons = computed(() => [
      { type: "symptom", emoji: "\u{1F630}", labelKey: "diary.quickAdd.notWell", description: "Nuk ndihem mir\xEB", bgClass: "bg-orange-50", borderClass: "border-orange-200" },
      { type: "meal", emoji: "\u{1F37D}\uFE0F", labelKey: "diary.quickAdd.ate", description: "H\xEBngri", bgClass: "bg-teal-50", borderClass: "border-teal-200" },
      { type: "sleep", emoji: "\u{1F634}", labelKey: "diary.quickAdd.slept", description: "Fjeti", bgClass: "bg-indigo-50", borderClass: "border-indigo-200" },
      { type: "mood", emoji: "\u{1F60A}", labelKey: "diary.quickAdd.happy", description: "I g\xEBzuar", bgClass: "bg-yellow-50", borderClass: "border-yellow-200" }
    ], ...ngDevMode ? [{ debugName: "quickAddButtons" }] : (
      /* istanbul ignore next */
      []
    ));
    this.filterPills = computed(() => {
      const t = this.i18n.t();
      return [
        { value: "all", label: () => t["diary.filter.all"] },
        { value: "symptom", label: () => t["diary.filter.symptom"] },
        { value: "meal", label: () => t["diary.filter.meal"] },
        { value: "sleep", label: () => t["diary.filter.sleep"] },
        { value: "mood", label: () => t["diary.filter.mood"] }
      ];
    }, ...ngDevMode ? [{ debugName: "filterPills" }] : (
      /* istanbul ignore next */
      []
    ));
    this.entryTypes = computed(() => {
      const t = this.i18n.t();
      return [
        { value: "symptom", icon: "thermometer", label: () => t["diary.type.symptom"] },
        { value: "meal", icon: "utensils", label: () => t["diary.type.meal"] },
        { value: "sleep", icon: "moon", label: () => t["diary.type.sleep"] },
        { value: "mood", icon: "smile", label: () => t["diary.type.mood"] }
      ];
    }, ...ngDevMode ? [{ debugName: "entryTypes" }] : (
      /* istanbul ignore next */
      []
    ));
    this.severities = computed(() => {
      const t = this.i18n.t();
      return [
        { value: "mild", label: () => t["diary.severity.mild"], dotClass: "bg-green-400", activeClass: "border-green-300 bg-green-50", hoverClass: "border-green-200", textClass: "text-green-700" },
        { value: "moderate", label: () => t["diary.severity.moderate"], dotClass: "bg-yellow-400", activeClass: "border-yellow-300 bg-yellow-50", hoverClass: "border-yellow-200", textClass: "text-yellow-700" },
        { value: "severe", label: () => t["diary.severity.severe"], dotClass: "bg-red-500", activeClass: "border-red-300 bg-red-50", hoverClass: "border-red-200", textClass: "text-red-700" }
      ];
    }, ...ngDevMode ? [{ debugName: "severities" }] : (
      /* istanbul ignore next */
      []
    ));
    this.symptomOptions = computed(() => {
      const t = this.i18n.t();
      return [
        { key: "fever", label: () => t["diary.symptomTypes.fever"] },
        { key: "cough", label: () => t["diary.symptomTypes.cough"] },
        { key: "vomit", label: () => t["diary.symptomTypes.vomit"] },
        { key: "diarrhea", label: () => t["diary.symptomTypes.diarrhea"] },
        { key: "headache", label: () => t["diary.symptomTypes.headache"] },
        { key: "rash", label: () => t["diary.symptomTypes.rash"] },
        { key: "soreThroat", label: () => t["diary.symptomTypes.soreThroat"] },
        { key: "tired", label: () => t["diary.symptomTypes.tired"] },
        { key: "stomachache", label: () => t["diary.symptomTypes.stomachache"] }
      ];
    }, ...ngDevMode ? [{ debugName: "symptomOptions" }] : (
      /* istanbul ignore next */
      []
    ));
    this.weekDays = computed(() => {
      return this.i18n.locale() === "sq" ? ["Di", "H\xEBn", "Mar", "M\xEBr", "Enj", "Pre", "Sht"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    }, ...ngDevMode ? [{ debugName: "weekDays" }] : (
      /* istanbul ignore next */
      []
    ));
    this.monthLabel = computed(() => {
      const d = this.viewDate();
      return d.toLocaleDateString(this.i18n.locale() === "sq" ? "sq-AL" : "en-US", { month: "long", year: "numeric" });
    }, ...ngDevMode ? [{ debugName: "monthLabel" }] : (
      /* istanbul ignore next */
      []
    ));
    this.calendarDays = computed(() => {
      const view = this.viewDate();
      const year = view.getFullYear();
      const month = view.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const startDow = firstDay.getDay();
      const todayStr = this.todayStr();
      const selected = this.selectedDate();
      const entries = this.allEntries();
      const days = [];
      for (let i = 0; i < startDow; i++) {
        const d = new Date(year, month, -startDow + i + 1);
        days.push({ date: d, day: d.getDate(), isCurrentMonth: false, isToday: false, isSelected: false, hasEntries: false, entryCount: 0 });
      }
      for (let d = 1; d <= lastDay.getDate(); d++) {
        const date = new Date(year, month, d);
        const dateStr = this.formatDate(date);
        const dayEntries = entries.filter((e) => e.date === dateStr);
        days.push({
          date,
          day: d,
          isCurrentMonth: true,
          isToday: dateStr === todayStr,
          isSelected: dateStr === selected,
          hasEntries: dayEntries.length > 0,
          entryCount: dayEntries.length
        });
      }
      const remaining = 42 - days.length;
      for (let i = 1; i <= remaining; i++) {
        const d = new Date(year, month + 1, i);
        days.push({ date: d, day: d.getDate(), isCurrentMonth: false, isToday: false, isSelected: false, hasEntries: false, entryCount: 0 });
      }
      return days;
    }, ...ngDevMode ? [{ debugName: "calendarDays" }] : (
      /* istanbul ignore next */
      []
    ));
    this.allEntries = computed(() => {
      const childId = this.dataService.activeChildId();
      if (!childId)
        return [];
      const diaryEntries = this.dataService.getDiaryEntriesByChild(childId);
      return diaryEntries.map((e) => ({
        id: e.id,
        date: e.loggedAt ? this.formatDate(new Date(e.loggedAt)) : this.todayStr(),
        type: e.type,
        description: e.description,
        severity: e.severity,
        duration: e.duration,
        notes: e.notes,
        loggedAt: e.loggedAt
      }));
    }, ...ngDevMode ? [{ debugName: "allEntries" }] : (
      /* istanbul ignore next */
      []
    ));
    this.entriesForSelectedDate = computed(() => {
      return this.allEntries().filter((e) => e.date === this.selectedDate());
    }, ...ngDevMode ? [{ debugName: "entriesForSelectedDate" }] : (
      /* istanbul ignore next */
      []
    ));
    this.filteredEntriesForDate = computed(() => {
      const filter = this.activeFilter();
      const entries = this.entriesForSelectedDate();
      if (filter === "all")
        return entries;
      return entries.filter((e) => e.type === filter);
    }, ...ngDevMode ? [{ debugName: "filteredEntriesForDate" }] : (
      /* istanbul ignore next */
      []
    ));
    this.recentEntries = computed(() => {
      const childId = this.dataService.activeChildId();
      if (!childId)
        return [];
      const filter = this.activeFilter();
      let entries = this.dataService.getDiaryEntriesByChild(childId).sort((a, b) => new Date(b.loggedAt).getTime() - new Date(a.loggedAt).getTime()).slice(0, 7);
      if (filter !== "all") {
        entries = entries.filter((e) => e.type === filter);
      }
      return entries;
    }, ...ngDevMode ? [{ debugName: "recentEntries" }] : (
      /* istanbul ignore next */
      []
    ));
    this.selectedDateLabel = computed(() => {
      const d = /* @__PURE__ */ new Date(this.selectedDate() + "T00:00:00");
      return d.toLocaleDateString(this.i18n.locale() === "sq" ? "sq-AL" : "en-US", { weekday: "long", day: "numeric", month: "long" });
    }, ...ngDevMode ? [{ debugName: "selectedDateLabel" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  ngOnInit() {
    this.loading.set(true);
    setTimeout(() => this.loading.set(false), 500);
  }
  // ── Actions ──────────────────────────────────────────────────────
  prevMonth() {
    const d = this.viewDate();
    this.viewDate.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }
  nextMonth() {
    const d = this.viewDate();
    this.viewDate.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }
  selectDay(day) {
    this.selectedDate.set(this.formatDate(day.date));
  }
  openAddEntry() {
    this.showModal.set(true);
    this.newEntryType.set("symptom");
    this.newDescription = "";
    this.newSymptoms.set([]);
    this.newSeverity.set("mild");
    this.newDuration = "";
    this.newNotes = "";
  }
  quickAdd(qa) {
    this.showModal.set(true);
    this.newEntryType.set(qa.type);
    this.newDescription = qa.description;
    this.newSymptoms.set([]);
    this.newSeverity.set("mild");
    this.newDuration = "";
    this.newNotes = "";
  }
  closeModal() {
    this.showModal.set(false);
  }
  toggleSymptom(symptom) {
    const current = this.newSymptoms();
    if (current.includes(symptom)) {
      this.newSymptoms.set(current.filter((s) => s !== symptom));
    } else {
      this.newSymptoms.set([...current, symptom]);
    }
  }
  canSave() {
    if (this.newEntryType() === "symptom")
      return this.newSymptoms().length > 0;
    return !!this.newDescription.trim();
  }
  saveEntry() {
    const childId = this.dataService.activeChildId();
    if (!childId)
      return;
    const description = this.newEntryType() === "symptom" ? this.newSymptoms().map((s) => this.i18n.t()["diary.symptomTypes." + s] || s).join(", ") : this.newDescription;
    const entry = {
      childId,
      type: this.newEntryType(),
      description: description.trim(),
      severity: this.newEntryType() === "symptom" ? this.newSeverity() : void 0,
      duration: this.newDuration.trim() || void 0,
      loggedAt: (/* @__PURE__ */ new Date(this.selectedDate() + "T12:00:00")).toISOString(),
      notes: this.newNotes.trim() || void 0
    };
    this.dataService.addDiaryEntry(entry);
    this.closeModal();
  }
  deleteEntry(entry) {
    if (!entry.id)
      return;
    const current = this.dataService.diaryEntries();
    const updated = current.filter((e) => e.id !== entry.id);
    this.dataService.diaryEntries.set(updated);
    const childId = this.dataService.activeChildId();
    if (childId) {
      try {
        localStorage.setItem(`kiddok_diary_${childId}`, JSON.stringify(updated));
      } catch (e) {
      }
    }
  }
  // ── Utilities ───────────────────────────────────────────────────
  typeIcon(type) {
    const map = {
      symptom: "thermometer",
      meal: "utensils",
      sleep: "moon",
      mood: "smile",
      activity: "footprints"
    };
    return map[type] ?? "circle";
  }
  typeIconClass(type) {
    const map = {
      symptom: "text-orange-500",
      meal: "text-teal-500",
      sleep: "text-indigo-500",
      mood: "text-yellow-500",
      activity: "text-blue-500"
    };
    return map[type] ?? "text-slate-400";
  }
  typeColorClass(type) {
    const map = {
      symptom: "text-orange-500",
      meal: "text-teal-500",
      sleep: "text-indigo-500",
      mood: "text-yellow-600",
      activity: "text-blue-500"
    };
    return map[type] ?? "text-slate-400";
  }
  typeLabel(type) {
    const t = this.i18n.t();
    return t["diary.type." + type] ?? type;
  }
  typeEmoji(type) {
    const map = {
      symptom: "\u{1F630}",
      meal: "\u{1F37D}\uFE0F",
      sleep: "\u{1F634}",
      mood: "\u{1F60A}",
      activity: "\u{1F3C3}"
    };
    return map[type] ?? "\u{1F4DD}";
  }
  severityColor(severity) {
    switch (severity) {
      case "mild":
        return "bg-green-400 ring-2 ring-green-200";
      case "moderate":
        return "bg-yellow-400 ring-2 ring-yellow-200";
      case "severe":
        return "bg-red-500 ring-2 ring-red-200";
      default:
        return "bg-slate-300";
    }
  }
  formatEntryTime(iso) {
    if (!iso)
      return "";
    const d = new Date(iso);
    return d.toLocaleTimeString(this.i18n.locale() === "sq" ? "sq-AL" : "en-US", { hour: "2-digit", minute: "2-digit" });
  }
  todayStr() {
    return this.formatDate(/* @__PURE__ */ new Date());
  }
  formatDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  static {
    this.\u0275fac = function DiaryComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DiaryComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DiaryComponent, selectors: [["app-diary"]], decls: 63, vars: 15, consts: [[1, "px-2", "max-w-7xl", "mx-auto"], [1, "flex", "items-center", "justify-between", "mb-6", "flex-col", "sm:flex-row", "gap-4"], [1, "text-3xl", "font-extrabold", "text-gray-800"], [1, "text-slate-400", "text-sm", "mt-1", "font-medium"], [1, "bg-gradient-to-r", "from-primary-600", "to-primary-500", "hover:from-primary-500", "hover:to-primary-400", "text-white", "px-6", "py-3", "rounded-2xl", "font-bold", "shadow-md", "hover:shadow-lg", "transition-all", "flex", "items-center", "gap-2", "text-sm", 3, "click"], ["name", "plus", 1, "text-inherit"], [1, "flex", "items-center", "justify-center", "gap-3", "mb-6", "flex-wrap"], [3, "class"], [1, "space-y-4"], [1, "flex", "items-center", "gap-2", "mb-6", "flex-wrap"], [1, "grid", "grid-cols-1", "lg:grid-cols-3", "gap-6"], [1, "lg:col-span-2", "bg-white", "rounded-[2rem]", "shadow-soft", "border", "border-slate-100", "overflow-hidden"], [1, "flex", "items-center", "justify-between", "p-5", "border-b", "border-slate-100"], [1, "w-10", "h-10", "rounded-xl", "bg-slate-100", "hover:bg-slate-200", "flex", "items-center", "justify-center", "transition-colors", 3, "click"], ["name", "chevron-left", 1, "text-inherit"], [1, "text-lg", "font-extrabold", "text-gray-800", "tracking-wide"], ["name", "chevron-right", 1, "text-inherit"], [1, "grid", "grid-cols-7", "border-b", "border-slate-100"], [1, "py-3", "text-center", "text-xs", "font-bold", "text-slate-400", "uppercase", "tracking-wider"], [1, "grid", "grid-cols-7", "p-3", "gap-1"], [1, "flex", "items-center", "gap-6", "px-5", "py-4", "border-t", "border-slate-100", "bg-slate-50/50"], [1, "flex", "items-center", "gap-2", "text-xs", "text-slate-400", "font-medium"], [1, "w-2", "h-2", "rounded-full", "bg-teal-400", "inline-block"], [1, "w-2", "h-2", "rounded-full", "bg-primary-500", "inline-block"], [1, "bg-white", "rounded-[2rem]", "shadow-soft", "border", "border-slate-100", "overflow-hidden"], [1, "p-5", "border-b", "border-slate-100"], [1, "font-extrabold", "text-gray-800", "text-lg"], [1, "text-slate-400", "text-xs", "mt-1", "font-medium"], [1, "p-4", "space-y-3", "max-h-[500px]", "overflow-y-auto"], [1, "text-center", "py-10"], [1, "rounded-2xl", "border", "border-slate-100", "p-4", "bg-slate-50/60", "hover:bg-slate-100/80", "transition-colors", "group"], [1, "mt-8", "bg-white", "rounded-[2rem]", "shadow-soft", "border", "border-slate-100", "overflow-hidden"], [1, "p-5", "border-b", "border-slate-100", "flex", "items-center", "justify-between"], [1, "text-slate-400", "text-xs", "mt-0.5", "font-medium"], ["name", "history", 1, "text-inherit"], [1, "p-5"], [1, "text-center", "py-8"], [1, "space-y-3"], [1, "flex", "items-start", "gap-3", "p-3", "rounded-xl", "hover:bg-slate-50", "transition-colors"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4", "bg-black/30", "backdrop-blur-sm"], [3, "click"], [1, "text-2xl"], [1, "text-xs", "font-semibold", "text-slate-600", "leading-tight", "text-center", "px-1"], [1, "bg-white", "rounded-[2rem]", "shadow-md", "border", "border-slate-100", "p-6", "animate-pulse"], [1, "flex", "justify-between", "items-center", "mb-4"], [1, "w-32", "h-6", "bg-gray-200", "rounded"], [1, "flex", "gap-2"], [1, "w-10", "h-10", "bg-gray-200", "rounded-xl"], [1, "grid", "grid-cols-7", "gap-2"], [1, "h-10", "bg-gray-200", "rounded-lg"], [1, "h-10", "bg-gray-100", "rounded-lg"], [1, "flex", "items-start", "gap-3", "py-3", "border-b", "border-gray-100", "last:border-0"], [1, "w-8", "h-8", "bg-gray-200", "rounded-full"], [1, "flex-1"], [1, "w-32", "h-4", "bg-gray-200", "rounded", "mb-2"], [1, "w-48", "h-3", "bg-gray-100", "rounded"], [1, "absolute", "bottom-1.5", "w-1.5", "h-1.5", "rounded-full", "bg-teal-400"], [1, "absolute", "bottom-1.5", "w-1.5", "h-1.5", "rounded-full", "bg-primary-500"], ["name", "inbox", 1, "text-inherit"], [1, "text-slate-400", "text-sm", "font-medium", "mb-4"], [1, "bg-indigo-500", "hover:bg-indigo-600", "text-white", "px-6", "py-3", "rounded-2xl", "font-bold", "shadow-sm", "transition-all", "text-sm", "inline-flex", "items-center", "gap-2", 3, "click"], [1, "flex", "items-start", "justify-between", "mb-2"], [1, "flex", "items-center", "gap-2"], [3, "name"], [1, "opacity-0", "group-hover:opacity-100", "text-red-400", "hover:text-red-600", "transition-all", 3, "click"], ["name", "trash-2", 1, "text-inherit"], [1, "text-sm", "font-semibold", "text-gray-800", "mb-1"], [1, "text-xs", "text-slate-500", "font-medium", "mb-1"], [1, "text-xs", "text-slate-500", "italic", "mt-2", "border-t", "border-slate-200", "pt-2"], ["name", "clock", 1, "text-inherit"], [1, "flex", "flex-col", "items-center", "gap-1", "min-w-[40px]"], [1, "text-xl"], [1, "flex-1", "min-w-0"], [1, "flex", "items-center", "gap-2", "flex-wrap"], [1, "text-xs", "text-slate-400", "font-medium"], [1, "text-sm", "text-gray-800", "font-medium", "truncate"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4", "bg-black/30", "backdrop-blur-sm", 3, "click"], [1, "bg-white", "rounded-[2rem]", "shadow-2xl", "w-full", "max-w-lg", "max-h-[90vh]", "overflow-y-auto", "animate-slide-up", 3, "click"], [1, "flex", "items-center", "justify-between", "p-6", "border-b", "border-slate-100"], [1, "text-xl", "font-extrabold", "text-gray-800"], [1, "w-9", "h-9", "rounded-xl", "bg-slate-100", "hover:bg-slate-200", "flex", "items-center", "justify-center", "transition-colors", 3, "click"], ["name", "x", 1, "text-inherit"], [1, "flex", "p-4", "gap-2", "border-b", "border-slate-100"], [1, "p-6", "space-y-5"], [1, "block", "text-xs", "font-bold", "text-primary-700", "mb-2", "uppercase", "tracking-wider"], ["rows", "2", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border-2", "border-slate-200", "bg-slate-50", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-gray-800", "text-sm", "resize-none", 3, "ngModelChange", "ngModel", "placeholder"], [1, "flex", "gap-3", "pt-2"], [1, "flex-1", "py-3.5", "rounded-2xl", "bg-slate-100", "text-slate-600", "font-bold", "text-sm", "hover:bg-slate-200", "transition-colors", 3, "click"], [1, "flex-1", "py-3.5", "rounded-2xl", "bg-gradient-to-r", "from-primary-600", "to-primary-500", "text-white", "font-bold", "text-sm", "shadow-md", "hover:shadow-lg", "disabled:opacity-40", "disabled:cursor-not-allowed", "transition-all", 3, "click", "disabled"], [1, "text-sm", 3, "name"], [1, "block", "text-xs", "font-bold", "text-primary-700", "mb-3", "uppercase", "tracking-wider"], [1, "flex", "flex-wrap", "gap-2"], [1, "flex", "gap-3"], ["type", "text", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border-2", "border-slate-200", "bg-slate-50", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-gray-800", "text-sm", 3, "ngModelChange", "ngModel", "placeholder"]], template: function DiaryComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
        \u0275\u0275text(4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 3);
        \u0275\u0275text(6);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "button", 4);
        \u0275\u0275listener("click", function DiaryComponent_Template_button_click_7_listener() {
          return ctx.openAddEntry();
        });
        \u0275\u0275element(8, "lucide-icon", 5);
        \u0275\u0275text(9);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "div", 6);
        \u0275\u0275repeaterCreate(11, DiaryComponent_For_12_Template, 5, 6, "button", 7, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(13, DiaryComponent_Conditional_13_Template, 15, 3, "div", 8);
        \u0275\u0275elementStart(14, "div", 9);
        \u0275\u0275repeaterCreate(15, DiaryComponent_For_16_Template, 2, 4, "button", 7, _forTrack1);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "div", 10)(18, "div", 11)(19, "div", 12)(20, "button", 13);
        \u0275\u0275listener("click", function DiaryComponent_Template_button_click_20_listener() {
          return ctx.prevMonth();
        });
        \u0275\u0275element(21, "lucide-icon", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "h2", 15);
        \u0275\u0275text(23);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "button", 13);
        \u0275\u0275listener("click", function DiaryComponent_Template_button_click_24_listener() {
          return ctx.nextMonth();
        });
        \u0275\u0275element(25, "lucide-icon", 16);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(26, "div", 17);
        \u0275\u0275repeaterCreate(27, DiaryComponent_For_28_Template, 2, 1, "div", 18, \u0275\u0275repeaterTrackByIdentity);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "div", 19);
        \u0275\u0275repeaterCreate(30, DiaryComponent_For_31_Template, 5, 6, "button", 7, _forTrack2);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "div", 20)(33, "div", 21);
        \u0275\u0275element(34, "span", 22);
        \u0275\u0275text(35);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "div", 21);
        \u0275\u0275element(37, "span", 23);
        \u0275\u0275text(38);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(39, "div", 24)(40, "div", 25)(41, "h3", 26);
        \u0275\u0275text(42);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "p", 27);
        \u0275\u0275text(44);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(45, "div", 28);
        \u0275\u0275conditionalCreate(46, DiaryComponent_Conditional_46_Template, 7, 2, "div", 29);
        \u0275\u0275repeaterCreate(47, DiaryComponent_For_48_Template, 13, 12, "div", 30, _forTrack3);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(49, "div", 31)(50, "div", 32)(51, "div")(52, "h3", 26);
        \u0275\u0275text(53);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "p", 33);
        \u0275\u0275text(55);
        \u0275\u0275elementEnd()();
        \u0275\u0275element(56, "lucide-icon", 34);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(57, "div", 35);
        \u0275\u0275conditionalCreate(58, DiaryComponent_Conditional_58_Template, 7, 2, "div", 36);
        \u0275\u0275elementStart(59, "div", 37);
        \u0275\u0275repeaterCreate(60, DiaryComponent_For_61_Template, 14, 9, "div", 38, _forTrack3);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275conditionalCreate(62, DiaryComponent_Conditional_62_Template, 28, 12, "div", 39);
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.i18n.t()["diary.title"]);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.i18n.t()["diary.subtitle"]);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["diary.addEntry"], " ");
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.quickAddButtons());
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.loading() ? 13 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.filterPills());
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.monthLabel());
        \u0275\u0275advance(4);
        \u0275\u0275repeater(ctx.weekDays());
        \u0275\u0275advance(3);
        \u0275\u0275repeater(ctx.calendarDays());
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["diary.today"], " ");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["diary.hasEntries"], " ");
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.selectedDateLabel());
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate2(" ", ctx.filteredEntriesForDate().length, " ", ctx.i18n.t()["diary.entryCount"], " ");
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.filteredEntriesForDate().length === 0 ? 46 : -1);
        \u0275\u0275advance();
        \u0275\u0275repeater(ctx.filteredEntriesForDate());
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate(ctx.i18n.t()["diary.recentActivity"]);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.i18n.t()["diary.recentEntries"]);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.recentEntries().length === 0 ? 58 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.recentEntries());
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.showModal() ? 62 : -1);
      }
    }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, LucideAngularModule, LucideAngularComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DiaryComponent, [{
    type: Component,
    args: [{
      selector: "app-diary",
      imports: [CommonModule, FormsModule, LucideAngularModule],
      template: `
    <div class="px-2 max-w-7xl mx-auto">

      <!-- Header -->
      <div class="flex items-center justify-between mb-6 flex-col sm:flex-row gap-4">
        <div>
          <h1 class="text-3xl font-extrabold text-gray-800">{{ i18n.t()['diary.title'] }}</h1>
          <p class="text-slate-400 text-sm mt-1 font-medium">{{ i18n.t()['diary.subtitle'] }}</p>
        </div>
        <button (click)="openAddEntry()"
                class="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white px-6 py-3 rounded-2xl font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-sm">
          <lucide-icon name="plus" class="text-inherit"></lucide-icon>
          {{ i18n.t()['diary.addEntry'] }}
        </button>
      </div>

      <!-- Quick-Add Bar -->
      <div class="flex items-center justify-center gap-3 mb-6 flex-wrap">
        @for (qa of quickAddButtons(); track qa.type) {
          <button (click)="quickAdd(qa)"
                  class="flex flex-col items-center gap-1.5 w-16 h-20 rounded-2xl border-2 transition-all hover:shadow-md hover:-translate-y-0.5 {{ qa.bgClass }} {{ qa.borderClass }}">
            <span class="text-2xl">{{ qa.emoji }}</span>
            <span class="text-xs font-semibold text-slate-600 leading-tight text-center px-1">{{ i18n.t()[qa.labelKey] }}</span>
          </button>
        }
      </div>

      <!-- Sprint 8: Loading Skeleton -->
      @if (loading()) {
        <div class="space-y-4">
          <!-- Calendar skeleton -->
          <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 p-6 animate-pulse">
            <div class="flex justify-between items-center mb-4">
              <div class="w-32 h-6 bg-gray-200 rounded"></div>
              <div class="flex gap-2">
                <div class="w-10 h-10 bg-gray-200 rounded-xl"></div>
                <div class="w-10 h-10 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
            <div class="grid grid-cols-7 gap-2">
              @for (i of [1,2,3,4,5,6,7]; track i) {
                <div class="h-10 bg-gray-200 rounded-lg"></div>
              }
              @for (i of [1,2,3,4,5,6,7,8,9,10,11,12,13,14]; track i) {
                <div class="h-10 bg-gray-100 rounded-lg"></div>
              }
            </div>
          </div>
          <!-- Entries skeleton -->
          <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 p-6 animate-pulse">
            @for (i of [1,2,3]; track i) {
              <div class="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
                <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div class="flex-1">
                  <div class="w-32 h-4 bg-gray-200 rounded mb-2"></div>
                  <div class="w-48 h-3 bg-gray-100 rounded"></div>
                </div>
              </div>
            }
          </div>
        </div>
      }

      <!-- Filter Pills -->
      <div class="flex items-center gap-2 mb-6 flex-wrap">
        @for (f of filterPills(); track f.value) {
          <button (click)="activeFilter.set(f.value)"
                  class="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border-2 transition-all
                         {{ activeFilter() === f.value ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-slate-500 border-slate-200 hover:border-primary-300' }}">
            {{ f.label() }}
          </button>
        }
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- ===== CALENDAR ===== -->
        <div class="lg:col-span-2 bg-white rounded-[2rem] shadow-soft border border-slate-100 overflow-hidden">
          <!-- Month navigation -->
          <div class="flex items-center justify-between p-5 border-b border-slate-100">
            <button (click)="prevMonth()" class="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
              <lucide-icon name="chevron-left" class="text-inherit"></lucide-icon>
            </button>
            <h2 class="text-lg font-extrabold text-gray-800 tracking-wide">{{ monthLabel() }}</h2>
            <button (click)="nextMonth()" class="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
              <lucide-icon name="chevron-right" class="text-inherit"></lucide-icon>
            </button>
          </div>

          <!-- Day-of-week headers -->
          <div class="grid grid-cols-7 border-b border-slate-100">
            @for (dow of weekDays(); track dow) {
              <div class="py-3 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">{{ dow }}</div>
            }
          </div>

          <!-- Calendar grid -->
          <div class="grid grid-cols-7 p-3 gap-1">
            @for (day of calendarDays(); track day.date.toISOString()) {
              <button (click)="selectDay(day)"
                      class="relative aspect-square flex flex-col items-center justify-center rounded-2xl transition-all text-sm font-semibold group
                             {{ day.isCurrentMonth ? (day.isSelected ? 'bg-primary-600 text-white shadow-md' : 'text-gray-700 hover:bg-primary-50') : 'text-slate-300' }}">
                <span>{{ day.day }}</span>
                @if (day.isToday && !day.isSelected) {
                  <span class="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                }
                @if (day.hasEntries && !day.isSelected) {
                  <span class="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                }
              </button>
            }
          </div>

          <!-- Legend -->
          <div class="flex items-center gap-6 px-5 py-4 border-t border-slate-100 bg-slate-50/50">
            <div class="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <span class="w-2 h-2 rounded-full bg-teal-400 inline-block"></span> {{ i18n.t()['diary.today'] }}
            </div>
            <div class="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <span class="w-2 h-2 rounded-full bg-primary-500 inline-block"></span> {{ i18n.t()['diary.hasEntries'] }}
            </div>
          </div>
        </div>

        <!-- ===== ENTRIES FOR SELECTED DATE ===== -->
        <div class="bg-white rounded-[2rem] shadow-soft border border-slate-100 overflow-hidden">
          <div class="p-5 border-b border-slate-100">
            <h3 class="font-extrabold text-gray-800 text-lg">{{ selectedDateLabel() }}</h3>
            <p class="text-slate-400 text-xs mt-1 font-medium">
              {{ filteredEntriesForDate().length }} {{ i18n.t()['diary.entryCount'] }}
            </p>
          </div>

          <div class="p-4 space-y-3 max-h-[500px] overflow-y-auto">
            @if (filteredEntriesForDate().length === 0) {
              <div class="text-center py-10">
                <lucide-icon name="inbox" class="text-inherit"></lucide-icon>
                <p class="text-slate-400 text-sm font-medium mb-4">{{ i18n.t()['diary.emptyState'] }}</p>
                <button (click)="openAddEntry()"
                  class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-sm transition-all text-sm inline-flex items-center gap-2">
                  <lucide-icon name="plus" class="text-inherit"></lucide-icon>
                  {{ i18n.t()['diary.addFirst'] }}
                </button>
              </div>
            }
            @for (entry of filteredEntriesForDate(); track entry.id) {
              <div class="rounded-2xl border border-slate-100 p-4 bg-slate-50/60 hover:bg-slate-100/80 transition-colors group">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex items-center gap-2">
                    <lucide-icon [name]="typeIcon(entry.type)" class="text-base {{ typeIconClass(entry.type) }}"></lucide-icon>
                    <span class="text-xs font-bold uppercase tracking-wider {{ typeColorClass(entry.type) }}">
                      {{ typeLabel(entry.type) }}
                    </span>
                    @if (entry.severity) {
                      <span class="w-3 h-3 rounded-full {{ severityColor(entry.severity) }}"></span>
                    }
                  </div>
                  <button (click)="deleteEntry(entry)" class="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all">
                    <lucide-icon name="trash-2" class="text-inherit"></lucide-icon>
                  </button>
                </div>

                <p class="text-sm font-semibold text-gray-800 mb-1">{{ entry.description }}</p>

                @if (entry.type === 'symptom' && entry.duration) {
                  <p class="text-xs text-slate-500 font-medium mb-1">
                    <lucide-icon name="clock" class="text-inherit"></lucide-icon>
                    {{ entry.duration }}
                  </p>
                }

                @if (entry.notes) {
                  <p class="text-xs text-slate-500 italic mt-2 border-t border-slate-200 pt-2">{{ entry.notes }}</p>
                }
              </div>
            }
          </div>
        </div>

      </div>

      <!-- Recent Activity Timeline -->
      <div class="mt-8 bg-white rounded-[2rem] shadow-soft border border-slate-100 overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 class="font-extrabold text-gray-800 text-lg">{{ i18n.t()['diary.recentActivity'] }}</h3>
            <p class="text-slate-400 text-xs mt-0.5 font-medium">{{ i18n.t()['diary.recentEntries'] }}</p>
          </div>
          <lucide-icon name="history" class="text-inherit"></lucide-icon>
        </div>
        <div class="p-5">
          @if (recentEntries().length === 0) {
            <div class="text-center py-8">
              <lucide-icon name="inbox" class="text-inherit"></lucide-icon>
              <p class="text-slate-400 text-sm font-medium mb-4">{{ i18n.t()['diary.emptyState'] }}</p>
              <button (click)="openAddEntry()"
                class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-sm transition-all text-sm inline-flex items-center gap-2">
                <lucide-icon name="plus" class="text-inherit"></lucide-icon>
                {{ i18n.t()['diary.addFirst'] }}
              </button>
            </div>
          }
          <div class="space-y-3">
            @for (entry of recentEntries(); track entry.id) {
              <div class="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div class="flex flex-col items-center gap-1 min-w-[40px]">
                  <span class="text-xl">{{ typeEmoji(entry.type) }}</span>
                  @if (entry.severity) {
                    <span class="w-2.5 h-2.5 rounded-full {{ severityColor(entry.severity) }}"></span>
                  }
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-xs font-bold uppercase tracking-wider {{ typeColorClass(entry.type) }}">{{ typeLabel(entry.type) }}</span>
                    <span class="text-xs text-slate-400 font-medium">{{ formatEntryTime(entry.loggedAt) }}</span>
                  </div>
                  <p class="text-sm text-gray-800 font-medium truncate">{{ entry.description }}</p>
                  @if (entry.duration) {
                    <p class="text-xs text-slate-400 font-medium">{{ entry.duration }}</p>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      </div>

    </div>

    <!-- ===== ADD ENTRY MODAL ===== -->
    @if (showModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm" (click)="closeModal()">
        <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up" (click)="$event.stopPropagation()">

          <!-- Modal header -->
          <div class="flex items-center justify-between p-6 border-b border-slate-100">
            <div>
              <h3 class="text-xl font-extrabold text-gray-800">{{ i18n.t()['diary.addEntry'] }}</h3>
              <p class="text-slate-400 text-xs mt-0.5 font-medium">{{ selectedDateLabel() }}</p>
            </div>
            <button (click)="closeModal()" class="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
              <lucide-icon name="x" class="text-inherit"></lucide-icon>
            </button>
          </div>

          <!-- Entry type tabs -->
          <div class="flex p-4 gap-2 border-b border-slate-100">
            @for (type of entryTypes(); track type.value) {
              <button (click)="newEntryType.set(type.value)"
                      class="flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border-2 flex flex-col items-center gap-1
                             {{ newEntryType() === type.value ? 'bg-primary-600 text-white border-primary-600' : 'bg-slate-50 text-slate-500 border-transparent hover:bg-slate-100' }}">
                <lucide-icon [name]="type.icon" class="text-sm"></lucide-icon>
                <div>{{ type.label() }}</div>
              </button>
            }
          </div>

          <div class="p-6 space-y-5">

            <!-- Description (all types) -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['diary.description'] }}</label>
              <textarea [(ngModel)]="newDescription" rows="2"
                        class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm resize-none"
                        [placeholder]="i18n.t()['diary.descriptionPlaceholder']"></textarea>
            </div>

            <!-- SYMPTOM entry extra fields -->
            @if (newEntryType() === 'symptom') {
              <div>
                <label class="block text-xs font-bold text-primary-700 mb-3 uppercase tracking-wider">{{ i18n.t()['diary.symptoms'] }}</label>
                <div class="flex flex-wrap gap-2">
                  @for (symptom of symptomOptions(); track symptom.key) {
                    <button (click)="toggleSymptom(symptom.key)"
                            class="px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all
                                   {{ newSymptoms().includes(symptom.key) ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-slate-500 border-slate-200 hover:border-orange-300' }}">
                      {{ symptom.label() }}
                    </button>
                  }
                </div>
              </div>

              <!-- Severity selector -->
              <div>
                <label class="block text-xs font-bold text-primary-700 mb-3 uppercase tracking-wider">{{ i18n.t()['diary.severity.label'] }}</label>
                <div class="flex gap-3">
                  @for (sev of severities(); track sev.value) {
                    <button (click)="newSeverity.set(sev.value)"
                            class="flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border-2 transition-all {{ newSeverity() === sev.value ? sev.activeClass : 'bg-slate-50 border-slate-200 hover:' + sev.hoverClass }}">
                      <span class="w-5 h-5 rounded-full {{ sev.dotClass }}"></span>
                      <span class="text-xs font-bold {{ newSeverity() === sev.value ? sev.textClass : 'text-slate-500' }}">{{ sev.label() }}</span>
                    </button>
                  }
                </div>
              </div>

              <!-- Duration -->
              <div>
                <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['diary.duration'] }}</label>
                <input type="text" [(ngModel)]="newDuration"
                       class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm"
                       [placeholder]="i18n.t()['diary.durationPlaceholder']">
              </div>
            }

            <!-- Notes (all types) -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['diary.notes'] }}</label>
              <textarea [(ngModel)]="newNotes" rows="2"
                        class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm resize-none"
                        [placeholder]="i18n.t()['diary.notesPlaceholder']"></textarea>
            </div>

            <!-- Actions -->
            <div class="flex gap-3 pt-2">
              <button (click)="closeModal()"
                      class="flex-1 py-3.5 rounded-2xl bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-colors">
                {{ i18n.t()['diary.cancel'] }}
              </button>
              <button (click)="saveEntry()"
                      [disabled]="!canSave()"
                      class="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold text-sm shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                {{ i18n.t()['diary.save'] }}
              </button>
            </div>

          </div>
        </div>
      </div>
    }
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DiaryComponent, { className: "DiaryComponent", filePath: "src/app/components/diary.component.ts", lineNumber: 377 });
})();
export {
  DiaryComponent
};
//# sourceMappingURL=chunk-6KQDATAT.js.map
