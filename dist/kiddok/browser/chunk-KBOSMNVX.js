import {
  CommonModule,
  DefaultValueAccessor,
  FormsModule,
  LucideAngularComponent,
  LucideAngularModule,
  NgClass,
  NgControlStatus,
  NgModel
} from "./chunk-IFHIJ3FQ.js";
import {
  DataService,
  I18nService
} from "./chunk-UDF3JGT5.js";
import {
  Component,
  __async,
  __spreadProps,
  __spreadValues,
  computed,
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
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate5,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-SFGRG2UU.js";

// src/app/components/medications/medications.component.ts
var _c0 = () => [1, 2, 3];
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.value;
function MedicationsComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((tmp_1_0 = ctx_r0.activeChild()) == null ? null : tmp_1_0.name);
  }
}
function MedicationsComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 15)(2, "div", 16);
    \u0275\u0275element(3, "lucide-icon", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 18)(5, "p", 19);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate5(" ", ctx_r0.onTimeCount(), "/", ctx_r0.activeScheduledMeds().length, " ", ctx_r0.i18n.t()["medTracker.adherenceLabel"] || "medikamente n\xEB koh\xEB", " \u2014 ", ctx_r0.overallAdherence(), "% ", ctx_r0.i18n.t()["medTracker.adherence"] || "p\xEBrputhshm\xEBria", " ");
  }
}
function MedicationsComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("(", ctx_r0.activeMeds().length, ")");
  }
}
function MedicationsComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("(", ctx_r0.archivedMeds().length, ")");
  }
}
function MedicationsComponent_Conditional_19_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "div", 21);
    \u0275\u0275element(2, "div", 22);
    \u0275\u0275elementStart(3, "div", 23);
    \u0275\u0275element(4, "div", 24)(5, "div", 25);
    \u0275\u0275elementEnd()()();
  }
}
function MedicationsComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275repeaterCreate(1, MedicationsComponent_Conditional_19_For_2_Template, 6, 0, "div", 20, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function MedicationsComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 26);
    \u0275\u0275element(2, "circle", 27)(3, "path", 28)(4, "circle", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "h3", 30);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 31);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 32);
    \u0275\u0275listener("click", function MedicationsComponent_Conditional_20_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.openAddModal());
    });
    \u0275\u0275element(10, "lucide-icon", 33);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["medTracker.noActiveMeds"] || "Nuk ka medikamente aktive");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["medications.emptyHint"] || "Shtoni medikamentet e para p\xEBr t\xEB ndjekur trajtimin");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["medications.addFirst"] || "Shto medikamentin e par\xEB", " ");
  }
}
function MedicationsComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 34);
    \u0275\u0275element(2, "circle", 35)(3, "path", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "h3", 37);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["medTracker.noArchivedMeds"] || "Nuk ka medikamente t\xEB arkivuar");
  }
}
function MedicationsComponent_Conditional_22_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const med_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", ctx_r0.adherenceBadgeClass(med_r4.adherencePct));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", med_r4.adherencePct, "% ");
  }
}
function MedicationsComponent_Conditional_22_For_2_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["medTracker.asNeeded"] || "Sipas nevoj\xEBs", " ");
  }
}
function MedicationsComponent_Conditional_22_For_2_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const med_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" \u2192 ", ctx_r0.formatDate(med_r4.endDate), " ");
  }
}
function MedicationsComponent_Conditional_22_For_2_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate1(" \u2192 ", ctx_r0.i18n.t()["medications.ongoing"] || "N\xEB vazhdim", " ");
  }
}
function MedicationsComponent_Conditional_22_For_2_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275element(1, "lucide-icon", 64);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const med_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(med_r4.prescribedBy);
  }
}
function MedicationsComponent_Conditional_22_For_2_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275element(1, "lucide-icon", 59);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const med_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r0.i18n.t()["medTracker.recentDose"] || "Doza e fundit:", " ", ctx_r0.relativeTime(med_r4.doseLogs[0].takenAt));
  }
}
function MedicationsComponent_Conditional_22_For_2_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const med_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(med_r4.notes);
  }
}
function MedicationsComponent_Conditional_22_For_2_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54);
    \u0275\u0275element(1, "div", 65);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const med_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275styleProp("width", med_r4.adherencePct, "%");
    \u0275\u0275property("ngClass", ctx_r0.adherenceBarClass(med_r4.adherencePct));
  }
}
function MedicationsComponent_Conditional_22_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 39)(2, "div", 40)(3, "div", 41);
    \u0275\u0275element(4, "lucide-icon", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 43)(6, "div", 44)(7, "h3", 45);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, MedicationsComponent_Conditional_22_For_2_Conditional_9_Template, 2, 2, "span", 46)(10, MedicationsComponent_Conditional_22_For_2_Conditional_10_Template, 2, 1, "span", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 48);
    \u0275\u0275element(12, "lucide-icon", 49);
    \u0275\u0275elementStart(13, "span");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 50);
    \u0275\u0275element(16, "lucide-icon", 51);
    \u0275\u0275elementStart(17, "span");
    \u0275\u0275text(18);
    \u0275\u0275conditionalCreate(19, MedicationsComponent_Conditional_22_For_2_Conditional_19_Template, 1, 1)(20, MedicationsComponent_Conditional_22_For_2_Conditional_20_Template, 1, 1);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(21, MedicationsComponent_Conditional_22_For_2_Conditional_21_Template, 4, 1, "div", 50);
    \u0275\u0275conditionalCreate(22, MedicationsComponent_Conditional_22_For_2_Conditional_22_Template, 4, 2, "div", 52);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(23, MedicationsComponent_Conditional_22_For_2_Conditional_23_Template, 2, 1, "div", 53);
    \u0275\u0275conditionalCreate(24, MedicationsComponent_Conditional_22_For_2_Conditional_24_Template, 2, 3, "div", 54);
    \u0275\u0275elementStart(25, "div", 55)(26, "button", 56);
    \u0275\u0275listener("click", function MedicationsComponent_Conditional_22_For_2_Template_button_click_26_listener() {
      const med_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openDoseLogModal(med_r4));
    });
    \u0275\u0275element(27, "lucide-icon", 57);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "button", 58);
    \u0275\u0275listener("click", function MedicationsComponent_Conditional_22_For_2_Template_button_click_29_listener() {
      const med_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openHistoryDrawer(med_r4));
    });
    \u0275\u0275element(30, "lucide-icon", 59);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "button", 60);
    \u0275\u0275listener("click", function MedicationsComponent_Conditional_22_For_2_Template_button_click_32_listener() {
      const med_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openEditModal(med_r4));
    });
    \u0275\u0275element(33, "lucide-icon", 61);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "button", 62);
    \u0275\u0275listener("click", function MedicationsComponent_Conditional_22_For_2_Template_button_click_34_listener() {
      const med_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.confirmDelete(med_r4));
    });
    \u0275\u0275element(35, "lucide-icon", 63);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const med_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(med_r4.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(med_r4.adherencePct !== null ? 9 : 10);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", med_r4.dosage, " \u2014 ", ctx_r0.frequencyLabel(med_r4.frequency));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r0.formatDate(med_r4.startDate), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(med_r4.endDate ? 19 : 20);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(med_r4.prescribedBy ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(med_r4.doseLogs && med_r4.doseLogs.length > 0 ? 22 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(med_r4.notes ? 23 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(med_r4.adherencePct !== null ? 24 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["medTracker.logDose"] || "Regjistro Doz\xEBn", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["medTracker.viewHistory"] || "Shiko Historikun", " ");
  }
}
function MedicationsComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275repeaterCreate(1, MedicationsComponent_Conditional_22_For_2_Template, 36, 12, "div", 38, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.activeMeds());
  }
}
function MedicationsComponent_Conditional_23_For_2_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const med_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" \u2192 ", ctx_r0.formatDate(med_r6.endDate), " ");
  }
}
function MedicationsComponent_Conditional_23_For_2_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate1(" \u2192 ", ctx_r0.i18n.t()["medications.ongoing"] || "N\xEB vazhdim", " ");
  }
}
function MedicationsComponent_Conditional_23_For_2_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69)(1, "span", 70);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const med_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r0.adherenceBadgeClass(med_r6.adherencePct));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", med_r6.adherencePct, "% ", ctx_r0.i18n.t()["medTracker.adherence"] || "p\xEBrputhshm\xEBria", " ");
  }
}
function MedicationsComponent_Conditional_23_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 66)(1, "div", 39)(2, "div", 40)(3, "div", 67);
    \u0275\u0275element(4, "lucide-icon", 68);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 43)(6, "div", 44)(7, "h3", 45);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 47);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 48);
    \u0275\u0275element(12, "lucide-icon", 49);
    \u0275\u0275elementStart(13, "span");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 50);
    \u0275\u0275element(16, "lucide-icon", 51);
    \u0275\u0275elementStart(17, "span");
    \u0275\u0275text(18);
    \u0275\u0275conditionalCreate(19, MedicationsComponent_Conditional_23_For_2_Conditional_19_Template, 1, 1)(20, MedicationsComponent_Conditional_23_For_2_Conditional_20_Template, 1, 1);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(21, MedicationsComponent_Conditional_23_For_2_Conditional_21_Template, 3, 3, "div", 69);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 55)(23, "button", 58);
    \u0275\u0275listener("click", function MedicationsComponent_Conditional_23_For_2_Template_button_click_23_listener() {
      const med_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openEditModal(med_r6));
    });
    \u0275\u0275element(24, "lucide-icon", 61);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const med_r6 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(med_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["medTracker.archived"] || "Arkiv\xEB", " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", med_r6.dosage, " \u2014 ", ctx_r0.frequencyLabel(med_r6.frequency));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r0.formatDate(med_r6.startDate), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(med_r6.endDate ? 19 : 20);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(med_r6.adherencePct !== null ? 21 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["medications.edit"] || "Redakto", " ");
  }
}
function MedicationsComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275repeaterCreate(1, MedicationsComponent_Conditional_23_For_2_Template, 26, 8, "div", 66, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.archivedMeds());
  }
}
function MedicationsComponent_Conditional_24_For_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 95);
    \u0275\u0275listener("click", function MedicationsComponent_Conditional_24_For_21_Template_button_click_0_listener() {
      const freq_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.formFrequency.set(freq_r9.value));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const freq_r9 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", ctx_r0.formFrequency() === freq_r9.value ? "bg-indigo-500 text-white border-indigo-500" : "bg-slate-50 text-slate-600 border-slate-200 hover:border-indigo-200");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.isSq() ? freq_r9.labelSq : freq_r9.labelEn, " ");
  }
}
function MedicationsComponent_Conditional_24_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 91);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.saveError());
  }
}
function MedicationsComponent_Conditional_24_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 96);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["medications.saving"] || "Duke ruajtur...", " ");
  }
}
function MedicationsComponent_Conditional_24_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 97);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["medications.save"] || "Ruaj", " ");
  }
}
function MedicationsComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 71);
    \u0275\u0275listener("click", function MedicationsComponent_Conditional_24_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeModal());
    });
    \u0275\u0275elementStart(1, "div", 72);
    \u0275\u0275listener("click", function MedicationsComponent_Conditional_24_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 73)(3, "h2", 74);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 75);
    \u0275\u0275listener("click", function MedicationsComponent_Conditional_24_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeModal());
    });
    \u0275\u0275element(6, "lucide-icon", 76);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 77)(8, "div")(9, "label", 78);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 79);
    \u0275\u0275twoWayListener("ngModelChange", function MedicationsComponent_Conditional_24_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.formName, $event) || (ctx_r0.formName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div")(13, "label", 78);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 80);
    \u0275\u0275twoWayListener("ngModelChange", function MedicationsComponent_Conditional_24_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.formDosage, $event) || (ctx_r0.formDosage = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div")(17, "label", 78);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 81);
    \u0275\u0275repeaterCreate(20, MedicationsComponent_Conditional_24_For_21_Template, 2, 2, "button", 82, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div")(23, "label", 78);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "input", 83);
    \u0275\u0275twoWayListener("ngModelChange", function MedicationsComponent_Conditional_24_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.formStartDate, $event) || (ctx_r0.formStartDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div")(27, "label", 78);
    \u0275\u0275text(28);
    \u0275\u0275elementStart(29, "span", 84);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "input", 83);
    \u0275\u0275twoWayListener("ngModelChange", function MedicationsComponent_Conditional_24_Template_input_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.formEndDate, $event) || (ctx_r0.formEndDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div")(33, "label", 78);
    \u0275\u0275text(34);
    \u0275\u0275elementStart(35, "span", 84);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "input", 79);
    \u0275\u0275twoWayListener("ngModelChange", function MedicationsComponent_Conditional_24_Template_input_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.formPrescribedBy, $event) || (ctx_r0.formPrescribedBy = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div", 85)(39, "div")(40, "p", 86);
    \u0275\u0275text(41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "p", 87);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "button", 88);
    \u0275\u0275listener("click", function MedicationsComponent_Conditional_24_Template_button_click_44_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.formActive.set(!ctx_r0.formActive()));
    });
    \u0275\u0275element(45, "span", 89);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div")(47, "label", 78);
    \u0275\u0275text(48);
    \u0275\u0275elementStart(49, "span", 84);
    \u0275\u0275text(50);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "textarea", 90);
    \u0275\u0275twoWayListener("ngModelChange", function MedicationsComponent_Conditional_24_Template_textarea_ngModelChange_51_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.formNotes, $event) || (ctx_r0.formNotes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(52, MedicationsComponent_Conditional_24_Conditional_52_Template, 2, 1, "div", 91);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "div", 92)(54, "button", 93);
    \u0275\u0275listener("click", function MedicationsComponent_Conditional_24_Template_button_click_54_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeModal());
    });
    \u0275\u0275text(55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "button", 94);
    \u0275\u0275listener("click", function MedicationsComponent_Conditional_24_Template_button_click_56_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.saveMedication());
    });
    \u0275\u0275conditionalCreate(57, MedicationsComponent_Conditional_24_Conditional_57_Template, 2, 1)(58, MedicationsComponent_Conditional_24_Conditional_58_Template, 2, 1);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.editingMed() ? ctx_r0.i18n.t()["medications.editMed"] || "Redakto Medikamentin" : ctx_r0.i18n.t()["medications.addMed"] || "Shto Medikament", " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t()["medications.name"] || "Emri i medikamentit", " *");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.formName);
    \u0275\u0275property("placeholder", ctx_r0.i18n.t()["medications.namePlaceholder"] || "P.sh. Amoxicillin");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t()["medications.dosage"] || "Doza", " *");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.formDosage);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t()["medications.frequency"] || "Frekuenca", " *");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.quickFrequencies);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t()["medications.startDate"] || "Data e fillimit", " *");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.formStartDate);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t()["medications.endDate"] || "Data e p\xEBrfundimit", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", ctx_r0.i18n.t()["medications.optional"] || "opsionale", ")");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.formEndDate);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t()["medications.prescribedBy"] || "P\xEBrshkruar nga", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", ctx_r0.i18n.t()["medications.optional"] || "opsionale", ")");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.formPrescribedBy);
    \u0275\u0275property("placeholder", ctx_r0.i18n.t()["medications.prescribedByPlaceholder"] || "P.sh. Dr. Elena Hoxha");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["medications.active"] || "Aktiv");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["medications.activeHint"] || "Medikamenti n\xEB p\xEBrdorim aktualisht");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r0.formActive() ? "bg-indigo-500" : "bg-slate-300");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r0.formActive() ? "translate-x-5" : "translate-x-0");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t()["medications.notes"] || "Sh\xEBnime", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", ctx_r0.i18n.t()["medications.optional"] || "opsionale", ")");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.formNotes);
    \u0275\u0275property("placeholder", ctx_r0.i18n.t()["medications.notesPlaceholder"] || "Sh\xEBno detajet shtes\xEB...");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.saveError() ? 52 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["medications.cancel"] || "Anulo", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.saving() || !ctx_r0.canSave());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.saving() ? 57 : 58);
  }
}
function MedicationsComponent_Conditional_25_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 99)(1, "span", 102);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 103);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_2_0 = ctx_r0.doseLogMed()) == null ? null : tmp_2_0.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_3_0 = ctx_r0.doseLogMed()) == null ? null : tmp_3_0.dosage);
  }
}
function MedicationsComponent_Conditional_25_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 91);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.doseLogError());
  }
}
function MedicationsComponent_Conditional_25_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 96);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["medications.saving"] || "Duke ruajtur...", " ");
  }
}
function MedicationsComponent_Conditional_25_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 97);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["medTracker.save"] || "Ruaj", " ");
  }
}
function MedicationsComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 71);
    \u0275\u0275listener("click", function MedicationsComponent_Conditional_25_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeDoseLogModal());
    });
    \u0275\u0275elementStart(1, "div", 98);
    \u0275\u0275listener("click", function MedicationsComponent_Conditional_25_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 73)(3, "h2", 74);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 75);
    \u0275\u0275listener("click", function MedicationsComponent_Conditional_25_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeDoseLogModal());
    });
    \u0275\u0275element(6, "lucide-icon", 76);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 77);
    \u0275\u0275conditionalCreate(8, MedicationsComponent_Conditional_25_Conditional_8_Template, 5, 2, "div", 99);
    \u0275\u0275elementStart(9, "div")(10, "label", 78);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 100);
    \u0275\u0275twoWayListener("ngModelChange", function MedicationsComponent_Conditional_25_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.doseLogTakenAt, $event) || (ctx_r0.doseLogTakenAt = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div")(14, "label", 78);
    \u0275\u0275text(15);
    \u0275\u0275elementStart(16, "span", 84);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "textarea", 90);
    \u0275\u0275twoWayListener("ngModelChange", function MedicationsComponent_Conditional_25_Template_textarea_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.doseLogNotes, $event) || (ctx_r0.doseLogNotes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(19, MedicationsComponent_Conditional_25_Conditional_19_Template, 2, 1, "div", 91);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 92)(21, "button", 93);
    \u0275\u0275listener("click", function MedicationsComponent_Conditional_25_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeDoseLogModal());
    });
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 101);
    \u0275\u0275listener("click", function MedicationsComponent_Conditional_25_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.saveDoseLog());
    });
    \u0275\u0275conditionalCreate(24, MedicationsComponent_Conditional_25_Conditional_24_Template, 2, 1)(25, MedicationsComponent_Conditional_25_Conditional_25_Template, 2, 1);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["medTracker.logDose"] || "Regjistro Doz\xEBn");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r0.doseLogMed() ? 8 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t()["medTracker.doseTakenAt"] || "Data dhe Ora", " *");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.doseLogTakenAt);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t()["medTracker.doseNotes"] || "Sh\xEBnime", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", ctx_r0.i18n.t()["medications.optional"] || "opsionale", ")");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.doseLogNotes);
    \u0275\u0275property("placeholder", ctx_r0.i18n.t()["medTracker.doseNotesPlaceholder"] || "Opsionale, p.sh. me ushqim");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.doseLogError() ? 19 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["medTracker.cancel"] || "Anulo", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.doseLogSaving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.doseLogSaving() ? 24 : 25);
  }
}
function MedicationsComponent_Conditional_26_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 108);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 110);
    \u0275\u0275element(2, "circle", 111)(3, "path", 112);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "p", 113);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["medTracker.noDoses"] || "Ende nuk ka doza t\xEB regjistruara");
  }
}
function MedicationsComponent_Conditional_26_Conditional_9_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 119);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const log_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(log_r12.notes);
  }
}
function MedicationsComponent_Conditional_26_Conditional_9_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 114)(1, "div", 115)(2, "div", 116);
    \u0275\u0275element(3, "lucide-icon", 117);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 18)(5, "p", 118);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, MedicationsComponent_Conditional_26_Conditional_9_For_2_Conditional_7_Template, 2, 1, "p", 119);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const log_r12 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.formatDateTime(log_r12.takenAt));
    \u0275\u0275advance();
    \u0275\u0275conditional(log_r12.notes ? 7 : -1);
  }
}
function MedicationsComponent_Conditional_26_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 109);
    \u0275\u0275repeaterCreate(1, MedicationsComponent_Conditional_26_Conditional_9_For_2_Template, 8, 2, "div", 114, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.historyMed().doseLogs);
  }
}
function MedicationsComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 104);
    \u0275\u0275listener("click", function MedicationsComponent_Conditional_26_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeHistoryDrawer());
    });
    \u0275\u0275elementStart(1, "div", 105);
    \u0275\u0275listener("click", function MedicationsComponent_Conditional_26_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 106)(3, "h2", 74);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 75);
    \u0275\u0275listener("click", function MedicationsComponent_Conditional_26_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeHistoryDrawer());
    });
    \u0275\u0275element(6, "lucide-icon", 76);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 107);
    \u0275\u0275conditionalCreate(8, MedicationsComponent_Conditional_26_Conditional_8_Template, 6, 1, "div", 108)(9, MedicationsComponent_Conditional_26_Conditional_9_Template, 3, 0, "div", 109);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["medTracker.doseHistory"] || "Historia e Dozave");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(!((tmp_2_0 = ctx_r0.historyMed()) == null ? null : tmp_2_0.doseLogs) || ctx_r0.historyMed().doseLogs.length === 0 ? 8 : 9);
  }
}
function MedicationsComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 71);
    \u0275\u0275listener("click", function MedicationsComponent_Conditional_27_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showDeleteModal.set(false));
    });
    \u0275\u0275elementStart(1, "div", 120);
    \u0275\u0275listener("click", function MedicationsComponent_Conditional_27_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 121);
    \u0275\u0275element(3, "lucide-icon", 122);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3", 123);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 124);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 125)(9, "button", 126);
    \u0275\u0275listener("click", function MedicationsComponent_Conditional_27_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showDeleteModal.set(false));
    });
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 127);
    \u0275\u0275listener("click", function MedicationsComponent_Conditional_27_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.deleteMedication());
    });
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["medications.deleteConfirmTitle"] || "Fshij Medikamentin?");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_2_0 = ctx_r0.deletingMed()) == null ? null : tmp_2_0.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["medications.cancel"] || "Anulo", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["medications.delete"] || "Fshi", " ");
  }
}
var QUICK_FREQUENCIES = [
  { value: "once_daily", labelSq: "1x dit\xEBn", labelEn: "Once daily" },
  { value: "twice_daily", labelSq: "2x dit\xEBn", labelEn: "Twice daily" },
  { value: "three_times_daily", labelSq: "3x dit\xEBn", labelEn: "Three times daily" },
  { value: "every_8_hours", labelSq: "\xC7do 8 or\xEB", labelEn: "Every 8 hours" },
  { value: "as_needed", labelSq: "Sipas nevoj\xEBs", labelEn: "As needed" }
];
var MedicationsComponent = class _MedicationsComponent {
  constructor() {
    this.i18n = inject(I18nService);
    this.data = inject(DataService);
    this.quickFrequencies = QUICK_FREQUENCIES;
    this.loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : (
      /* istanbul ignore next */
      []
    ));
    this.saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : (
      /* istanbul ignore next */
      []
    ));
    this.showModal = signal(false, ...ngDevMode ? [{ debugName: "showModal" }] : (
      /* istanbul ignore next */
      []
    ));
    this.showDeleteModal = signal(false, ...ngDevMode ? [{ debugName: "showDeleteModal" }] : (
      /* istanbul ignore next */
      []
    ));
    this.showDoseLogModal = signal(false, ...ngDevMode ? [{ debugName: "showDoseLogModal" }] : (
      /* istanbul ignore next */
      []
    ));
    this.showHistoryDrawer = signal(false, ...ngDevMode ? [{ debugName: "showHistoryDrawer" }] : (
      /* istanbul ignore next */
      []
    ));
    this.editingMed = signal(null, ...ngDevMode ? [{ debugName: "editingMed" }] : (
      /* istanbul ignore next */
      []
    ));
    this.deletingMed = signal(null, ...ngDevMode ? [{ debugName: "deletingMed" }] : (
      /* istanbul ignore next */
      []
    ));
    this.doseLogMed = signal(null, ...ngDevMode ? [{ debugName: "doseLogMed" }] : (
      /* istanbul ignore next */
      []
    ));
    this.historyMed = signal(null, ...ngDevMode ? [{ debugName: "historyMed" }] : (
      /* istanbul ignore next */
      []
    ));
    this.saveError = signal(null, ...ngDevMode ? [{ debugName: "saveError" }] : (
      /* istanbul ignore next */
      []
    ));
    this.doseLogError = signal(null, ...ngDevMode ? [{ debugName: "doseLogError" }] : (
      /* istanbul ignore next */
      []
    ));
    this.doseLogSaving = signal(false, ...ngDevMode ? [{ debugName: "doseLogSaving" }] : (
      /* istanbul ignore next */
      []
    ));
    this.activeTab = signal("active", ...ngDevMode ? [{ debugName: "activeTab" }] : (
      /* istanbul ignore next */
      []
    ));
    this.formName = signal("", ...ngDevMode ? [{ debugName: "formName" }] : (
      /* istanbul ignore next */
      []
    ));
    this.formDosage = signal("", ...ngDevMode ? [{ debugName: "formDosage" }] : (
      /* istanbul ignore next */
      []
    ));
    this.formFrequency = signal("once_daily", ...ngDevMode ? [{ debugName: "formFrequency" }] : (
      /* istanbul ignore next */
      []
    ));
    this.formStartDate = signal("", ...ngDevMode ? [{ debugName: "formStartDate" }] : (
      /* istanbul ignore next */
      []
    ));
    this.formEndDate = signal("", ...ngDevMode ? [{ debugName: "formEndDate" }] : (
      /* istanbul ignore next */
      []
    ));
    this.formPrescribedBy = signal("", ...ngDevMode ? [{ debugName: "formPrescribedBy" }] : (
      /* istanbul ignore next */
      []
    ));
    this.formNotes = signal("", ...ngDevMode ? [{ debugName: "formNotes" }] : (
      /* istanbul ignore next */
      []
    ));
    this.formActive = signal(true, ...ngDevMode ? [{ debugName: "formActive" }] : (
      /* istanbul ignore next */
      []
    ));
    this.doseLogTakenAt = signal("", ...ngDevMode ? [{ debugName: "doseLogTakenAt" }] : (
      /* istanbul ignore next */
      []
    ));
    this.doseLogNotes = signal("", ...ngDevMode ? [{ debugName: "doseLogNotes" }] : (
      /* istanbul ignore next */
      []
    ));
    this.activeChild = computed(() => {
      const id = this.data.activeChildId();
      return this.data.children().find((c) => c.id === id) ?? null;
    }, ...ngDevMode ? [{ debugName: "activeChild" }] : (
      /* istanbul ignore next */
      []
    ));
    this.medications = signal([], ...ngDevMode ? [{ debugName: "medications" }] : (
      /* istanbul ignore next */
      []
    ));
    this.activeMeds = computed(() => this.medications().filter((m) => m.active), ...ngDevMode ? [{ debugName: "activeMeds" }] : (
      /* istanbul ignore next */
      []
    ));
    this.archivedMeds = computed(() => this.medications().filter((m) => !m.active), ...ngDevMode ? [{ debugName: "archivedMeds" }] : (
      /* istanbul ignore next */
      []
    ));
    this.activeScheduledMeds = computed(() => this.activeMeds().filter((m) => m.frequency !== "as_needed"), ...ngDevMode ? [{ debugName: "activeScheduledMeds" }] : (
      /* istanbul ignore next */
      []
    ));
    this.onTimeCount = computed(() => {
      const scheduled = this.activeScheduledMeds();
      return scheduled.filter((m) => (m.adherencePct ?? 0) >= 80).length;
    }, ...ngDevMode ? [{ debugName: "onTimeCount" }] : (
      /* istanbul ignore next */
      []
    ));
    this.overallAdherence = computed(() => {
      const scheduled = this.activeScheduledMeds();
      if (scheduled.length === 0)
        return null;
      const total = scheduled.reduce((sum, m) => sum + (m.adherencePct ?? 0), 0);
      return Math.round(total / scheduled.length);
    }, ...ngDevMode ? [{ debugName: "overallAdherence" }] : (
      /* istanbul ignore next */
      []
    ));
    this.canSave = computed(() => !!(this.formName().trim() && this.formDosage().trim() && this.formFrequency() && this.formStartDate()), ...ngDevMode ? [{ debugName: "canSave" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  ngOnInit() {
    this.loadMedications();
  }
  ngOnDestroy() {
  }
  loadMedications() {
    return __async(this, null, function* () {
      const childId = this.data.activeChildId();
      if (!childId)
        return;
      this.loading.set(true);
      try {
        const token = localStorage.getItem(this.data.AUTH_KEY);
        const response = yield fetch(`${this.data.API_URL}/medications/child/${childId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
          const data = yield response.json();
          const meds = (data.medications || []).map((m) => __spreadProps(__spreadValues({}, m), {
            startDate: m.startDate,
            endDate: m.endDate,
            adherencePct: m.adherencePct ?? null,
            doseLogs: m.doseLogs || []
          }));
          this.medications.set(meds);
        }
      } catch (e) {
      } finally {
        this.loading.set(false);
      }
    });
  }
  openAddModal() {
    this.editingMed.set(null);
    this.formName.set("");
    this.formDosage.set("");
    this.formFrequency.set("once_daily");
    this.formStartDate.set((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
    this.formEndDate.set("");
    this.formPrescribedBy.set("");
    this.formNotes.set("");
    this.formActive.set(true);
    this.saveError.set(null);
    this.showModal.set(true);
  }
  openEditModal(med) {
    this.editingMed.set(med);
    this.formName.set(med.name);
    this.formDosage.set(med.dosage);
    this.formFrequency.set(med.frequency);
    this.formStartDate.set(med.startDate ? med.startDate.split("T")[0] : "");
    this.formEndDate.set(med.endDate ? med.endDate.split("T")[0] : "");
    this.formPrescribedBy.set(med.prescribedBy || "");
    this.formNotes.set(med.notes || "");
    this.formActive.set(med.active);
    this.saveError.set(null);
    this.showModal.set(true);
  }
  closeModal() {
    this.showModal.set(false);
    this.editingMed.set(null);
  }
  openDoseLogModal(med) {
    this.doseLogMed.set(med);
    const now = /* @__PURE__ */ new Date();
    now.setSeconds(0, 0);
    this.doseLogTakenAt.set(now.toISOString().slice(0, 16));
    this.doseLogNotes.set("");
    this.doseLogError.set(null);
    this.showDoseLogModal.set(true);
  }
  closeDoseLogModal() {
    this.showDoseLogModal.set(false);
    this.doseLogMed.set(null);
  }
  openHistoryDrawer(med) {
    this.historyMed.set(med);
    this.showHistoryDrawer.set(true);
  }
  closeHistoryDrawer() {
    this.showHistoryDrawer.set(false);
    this.historyMed.set(null);
  }
  saveDoseLog() {
    return __async(this, null, function* () {
      const med = this.doseLogMed();
      if (!med || !this.doseLogTakenAt())
        return;
      const childId = this.data.activeChildId();
      if (!childId)
        return;
      this.doseLogSaving.set(true);
      this.doseLogError.set(null);
      try {
        const token = localStorage.getItem(this.data.AUTH_KEY);
        const response = yield fetch(`${this.data.API_URL}/medications/${childId}/doses`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            medicationId: med.id,
            takenAt: new Date(this.doseLogTakenAt()).toISOString(),
            notes: this.doseLogNotes().trim() || void 0
          })
        });
        if (!response.ok) {
          const err = yield response.json().catch(() => ({}));
          throw new Error(err.message || "Save failed");
        }
        const newLog = yield response.json();
        const meds = this.medications().map((m) => {
          if (m.id !== med.id)
            return m;
          const doseLogs = [newLog, ...m.doseLogs || []];
          return __spreadProps(__spreadValues({}, m), { doseLogs });
        });
        this.medications.set(meds);
        this.closeDoseLogModal();
      } catch (err) {
        this.doseLogError.set(err.message || this.i18n.t()["medications.saveError"] || "Ruajtja d\xEBshtoi.");
      } finally {
        this.doseLogSaving.set(false);
      }
    });
  }
  saveMedication() {
    return __async(this, null, function* () {
      if (!this.canSave())
        return;
      const childId = this.data.activeChildId();
      if (!childId)
        return;
      this.saving.set(true);
      this.saveError.set(null);
      const payload = {
        name: this.formName().trim(),
        dosage: this.formDosage().trim(),
        frequency: this.formFrequency(),
        startDate: new Date(this.formStartDate()).toISOString(),
        endDate: this.formEndDate() ? new Date(this.formEndDate()).toISOString() : void 0,
        prescribedBy: this.formPrescribedBy().trim() || void 0,
        notes: this.formNotes().trim() || void 0,
        active: this.formActive()
      };
      try {
        const token = localStorage.getItem(this.data.AUTH_KEY);
        const editing = this.editingMed();
        const url = editing ? `${this.data.API_URL}/medications/${editing.id}` : `${this.data.API_URL}/medications/${childId}`;
        const method = editing ? "PATCH" : "POST";
        const response = yield fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
        if (!response.ok) {
          const err = yield response.json().catch(() => ({}));
          throw new Error(err.message || "Save failed");
        }
        const saved = yield response.json();
        const meds = [...this.medications()];
        if (editing) {
          const idx = meds.findIndex((m) => m.id === saved.id);
          if (idx >= 0)
            meds[idx] = __spreadValues(__spreadValues({}, meds[idx]), saved);
        } else {
          meds.unshift(__spreadProps(__spreadValues({}, saved), { doseLogs: [], adherencePct: null }));
        }
        this.medications.set(meds);
        this.closeModal();
      } catch (err) {
        this.saveError.set(err.message || this.i18n.t()["medications.saveError"] || "Ruajtja d\xEBshtoi.");
      } finally {
        this.saving.set(false);
      }
    });
  }
  confirmDelete(med) {
    this.deletingMed.set(med);
    this.showDeleteModal.set(true);
  }
  deleteMedication() {
    return __async(this, null, function* () {
      const med = this.deletingMed();
      if (!med)
        return;
      try {
        const token = localStorage.getItem(this.data.AUTH_KEY);
        const response = yield fetch(`${this.data.API_URL}/medications/${med.id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
          this.medications.set(this.medications().filter((m) => m.id !== med.id));
        }
      } catch (e) {
      } finally {
        this.showDeleteModal.set(false);
        this.deletingMed.set(null);
      }
    });
  }
  frequencyLabel(freq) {
    const f = QUICK_FREQUENCIES.find((f2) => f2.value === freq);
    return f ? this.i18n.isSq() ? f.labelSq : f.labelEn : freq;
  }
  formatDate(dateStr) {
    if (!dateStr)
      return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString(this.i18n.isSq() ? "sq-AL" : "en-GB", { day: "2-digit", month: "short", year: "numeric" });
  }
  formatDateTime(dateStr) {
    if (!dateStr)
      return "";
    const d = new Date(dateStr);
    return d.toLocaleString(this.i18n.isSq() ? "sq-AL" : "en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  relativeTime(dateStr) {
    if (!dateStr)
      return "";
    const now = /* @__PURE__ */ new Date();
    const then = new Date(dateStr);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / 6e4);
    if (diffMins < 1)
      return this.i18n.isSq() ? "tani" : "just now";
    if (diffMins < 60) {
      return (this.i18n.isSq() ? `${diffMins} minuta m\xEB par\xEB` : `${diffMins} min ago`).replace("{n}", String(diffMins));
    }
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) {
      return (this.i18n.isSq() ? `${diffHours} or\xEB m\xEB par\xEB` : `${diffHours} hours ago`).replace("{n}", String(diffHours));
    }
    const diffDays = Math.floor(diffHours / 24);
    return (this.i18n.isSq() ? `${diffDays} dit\xEB m\xEB par\xEB` : `${diffDays} days ago`).replace("{n}", String(diffDays));
  }
  adherenceBadgeClass(pct) {
    if (pct === null)
      return "bg-gray-100 text-gray-500";
    if (pct >= 80)
      return "bg-emerald-100 text-emerald-700";
    if (pct >= 50)
      return "bg-amber-100 text-amber-700";
    return "bg-rose-100 text-rose-700";
  }
  adherenceBarClass(pct) {
    if (pct === null)
      return "bg-gray-200";
    if (pct >= 80)
      return "bg-emerald-400";
    if (pct >= 50)
      return "bg-amber-400";
    return "bg-rose-400";
  }
  static {
    this.\u0275fac = function MedicationsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MedicationsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MedicationsComponent, selectors: [["app-medications"]], decls: 28, vars: 19, consts: [[1, "min-h-screen", "bg-gray-50", "pb-24"], [1, "bg-white", "border-b", "border-gray-100", "px-4", "pt-6", "pb-4"], [1, "flex", "items-center", "justify-between"], [1, "text-3xl", "font-extrabold", "text-gray-800"], [1, "text-slate-400", "text-sm", "mt-1", "font-medium"], [1, "bg-indigo-500", "hover:bg-indigo-600", "text-white", "px-5", "py-2.5", "rounded-2xl", "font-bold", "shadow-sm", "transition-all", "flex", "items-center", "gap-2", "text-sm", 3, "click"], ["name", "plus", 1, "text-inherit"], [1, "px-4", "mt-4"], [1, "flex", "bg-white", "rounded-2xl", "p-1", "border", "border-gray-100"], [1, "flex-1", "py-2.5", "rounded-xl", "text-sm", "font-bold", "transition-all", 3, "click", "ngClass"], [1, "ml-1", "text-xs", "opacity-75"], [1, "px-4", "mt-4", "space-y-3"], [1, "flex", "flex-col", "items-center", "justify-center", "mt-20", "px-4"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4", "bg-black/40", "backdrop-blur-sm"], [1, "fixed", "inset-0", "z-50", "flex", "flex-col", "justify-end", "bg-black/40", "backdrop-blur-sm"], [1, "bg-emerald-50", "border", "border-emerald-200", "rounded-2xl", "p-4", "flex", "items-center", "gap-3"], [1, "w-10", "h-10", "bg-emerald-100", "rounded-full", "flex", "items-center", "justify-center", "flex-shrink-0"], ["name", "bar-chart-2", 1, "text-emerald-600", "w-5", "h-5"], [1, "flex-1"], [1, "font-bold", "text-emerald-700", "text-sm"], [1, "bg-white", "rounded-2xl", "p-5", "border", "border-gray-100", "animate-pulse"], [1, "flex", "gap-4"], [1, "w-12", "h-12", "rounded-xl", "bg-gray-200"], [1, "flex-1", "space-y-2"], [1, "h-4", "bg-gray-200", "rounded", "w-1/2"], [1, "h-3", "bg-gray-100", "rounded", "w-1/3"], ["width", "160", "height", "160", "viewBox", "0 0 160 160", "fill", "none", 1, "mb-6"], ["cx", "80", "cy", "80", "r", "60", "fill", "#EEF2FF"], ["d", "M65 75h30M65 85h20", "stroke", "#6366F1", "stroke-width", "4", "stroke-linecap", "round"], ["cx", "80", "cy", "80", "r", "40", "stroke", "#C7D2FE", "stroke-width", "3", "fill", "none"], [1, "text-xl", "font-extrabold", "text-gray-700", "mb-2"], [1, "text-slate-400", "text-center", "mb-6", "text-sm"], [1, "bg-indigo-500", "hover:bg-indigo-600", "text-white", "px-6", "py-3", "rounded-2xl", "font-bold", "shadow-sm", "transition-all", "text-sm", 3, "click"], ["name", "plus", 1, "text-inherit", "inline", "w-4", "h-4", "mr-1"], ["width", "120", "height", "120", "viewBox", "0 0 120 120", "fill", "none", 1, "mb-4", "opacity-40"], ["cx", "60", "cy", "60", "r", "50", "stroke", "#9CA3AF", "stroke-width", "3", "fill", "none"], ["d", "M50 60h20M60 50v20", "stroke", "#9CA3AF", "stroke-width", "3", "stroke-linecap", "round"], [1, "text-lg", "font-extrabold", "text-gray-600", "mb-1"], [1, "bg-white", "rounded-2xl", "border", "border-gray-100", "shadow-sm", "overflow-hidden"], [1, "p-5"], [1, "flex", "items-start", "gap-4"], [1, "w-12", "h-12", "rounded-xl", "flex", "items-center", "justify-center", "flex-shrink-0", "bg-green-100"], ["name", "pill", 1, "text-green-600", "w-5", "h-5"], [1, "flex-1", "min-w-0"], [1, "flex", "items-start", "justify-between", "gap-2"], [1, "font-bold", "text-gray-800", "text-base", "truncate"], [1, "text-xs", "font-semibold", "px-2.5", "py-1", "rounded-full", "flex-shrink-0", 3, "ngClass"], [1, "text-xs", "font-semibold", "px-2.5", "py-1", "rounded-full", "flex-shrink-0", "bg-gray-100", "text-gray-500"], [1, "flex", "items-center", "gap-2", "mt-1.5", "text-sm", "text-slate-500"], ["name", "syringe", 1, "w-3.5", "h-3.5", "text-slate-400", "flex-shrink-0"], [1, "flex", "items-center", "gap-2", "mt-1", "text-xs", "text-slate-400"], ["name", "calendar", 1, "w-3.5", "h-3.5", "flex-shrink-0"], [1, "flex", "items-center", "gap-2", "mt-2", "text-xs", "text-indigo-600", "font-medium"], [1, "mt-3", "text-xs", "text-slate-500", "bg-slate-50", "rounded-xl", "p-3"], [1, "mt-3", "h-1", "rounded-full", "bg-gray-100", "overflow-hidden"], [1, "flex", "items-center", "gap-2", "mt-4"], [1, "flex-1", "py-2", "rounded-xl", "text-xs", "font-semibold", "bg-indigo-500", "hover:bg-indigo-600", "text-white", "transition-all", "flex", "items-center", "justify-center", "gap-1.5", 3, "click"], ["name", "plus-circle", 1, "w-3.5", "h-3.5"], [1, "flex-1", "py-2", "rounded-xl", "text-xs", "font-semibold", "bg-slate-50", "hover:bg-slate-100", "text-slate-600", "transition-all", "flex", "items-center", "justify-center", "gap-1.5", 3, "click"], ["name", "clock", 1, "w-3.5", "h-3.5"], [1, "py-2", "px-3", "rounded-xl", "text-xs", "font-semibold", "bg-slate-50", "hover:bg-slate-100", "text-slate-600", "transition-all", "flex", "items-center", "justify-center", 3, "click"], ["name", "pencil", 1, "w-3.5", "h-3.5"], [1, "py-2", "px-3", "rounded-xl", "text-xs", "font-semibold", "bg-red-50", "hover:bg-red-100", "text-red-600", "transition-all", "flex", "items-center", "justify-center", 3, "click"], ["name", "trash-2", 1, "w-3.5", "h-3.5"], ["name", "user", 1, "w-3.5", "h-3.5", "flex-shrink-0"], [1, "h-full", "rounded-full", "transition-all", "duration-500", 3, "ngClass"], [1, "bg-white", "rounded-2xl", "border", "border-gray-100", "shadow-sm", "overflow-hidden", "opacity-80"], [1, "w-12", "h-12", "rounded-xl", "flex", "items-center", "justify-center", "flex-shrink-0", "bg-gray-100"], ["name", "pill-off", 1, "text-gray-400", "w-5", "h-5"], [1, "mt-2"], [1, "text-xs", "font-semibold", "px-2.5", "py-1", "rounded-full", 3, "ngClass"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4", "bg-black/40", "backdrop-blur-sm", 3, "click"], [1, "bg-white", "rounded-3xl", "shadow-2xl", "w-full", "max-w-md", "max-h-[90vh]", "overflow-y-auto", 3, "click"], [1, "px-6", "pt-6", "pb-4", "border-b", "border-gray-100", "flex", "items-center", "justify-between"], [1, "text-xl", "font-extrabold", "text-gray-800"], [1, "p-2", "rounded-xl", "hover:bg-gray-100", "transition-colors", 3, "click"], ["name", "x", 1, "w-5", "h-5", "text-slate-400"], [1, "p-6", "space-y-5"], [1, "block", "text-xs", "font-bold", "text-primary-700", "mb-2", "uppercase", "tracking-wider"], ["type", "text", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border-2", "border-slate-200", "bg-slate-50", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-gray-800", "text-sm", "font-medium", 3, "ngModelChange", "ngModel", "placeholder"], ["type", "text", "placeholder", "P.sh. 250mg ose 5ml", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border-2", "border-slate-200", "bg-slate-50", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-gray-800", "text-sm", "font-medium", 3, "ngModelChange", "ngModel"], [1, "grid", "grid-cols-2", "gap-2"], ["type", "button", 1, "py-2.5", "rounded-xl", "text-xs", "font-semibold", "border-2", "transition-all", "text-center", 3, "ngClass"], ["type", "date", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border-2", "border-slate-200", "bg-slate-50", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-gray-800", "text-sm", 3, "ngModelChange", "ngModel"], [1, "text-slate-400", "normal-case", "font-normal", "text-xs", "ml-1"], [1, "flex", "items-center", "justify-between", "p-4", "bg-slate-50", "rounded-2xl"], [1, "font-semibold", "text-gray-800", "text-sm"], [1, "text-xs", "text-slate-500"], ["type", "button", 1, "relative", "w-12", "h-7", "rounded-full", "transition-colors", 3, "click", "ngClass"], [1, "absolute", "top-1", "left-1", "w-5", "h-5", "bg-white", "rounded-full", "shadow", "transition-transform", 3, "ngClass"], ["rows", "2", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border-2", "border-slate-200", "bg-slate-50", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-gray-800", "text-sm", "resize-none", 3, "ngModelChange", "ngModel", "placeholder"], [1, "p-3", "bg-red-50", "border", "border-red-200", "rounded-xl", "text-red-600", "text-sm", "font-semibold"], [1, "px-6", "pb-6", "flex", "gap-3"], [1, "flex-1", "py-3.5", "rounded-2xl", "font-bold", "text-slate-600", "bg-slate-100", "hover:bg-slate-200", "transition-all", "text-sm", 3, "click"], [1, "flex-1", "py-3.5", "rounded-2xl", "font-bold", "text-white", "bg-indigo-500", "hover:bg-indigo-600", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-all", "text-sm", "flex", "items-center", "justify-center", "gap-2", 3, "click", "disabled"], ["type", "button", 1, "py-2.5", "rounded-xl", "text-xs", "font-semibold", "border-2", "transition-all", "text-center", 3, "click", "ngClass"], ["name", "loader-2", 1, "w-4", "h-4", "animate-spin"], ["name", "check", 1, "w-4", "h-4"], [1, "bg-white", "rounded-3xl", "shadow-2xl", "w-full", "max-w-md", 3, "click"], [1, "bg-indigo-50", "rounded-xl", "p-3", "text-sm"], ["type", "datetime-local", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border-2", "border-slate-200", "bg-slate-50", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-gray-800", "text-sm", 3, "ngModelChange", "ngModel"], [1, "flex-1", "py-3.5", "rounded-2xl", "font-bold", "text-white", "bg-indigo-500", "hover:bg-indigo-600", "disabled:opacity-50", "transition-all", "text-sm", "flex", "items-center", "justify-center", "gap-2", 3, "click", "disabled"], [1, "font-bold", "text-indigo-700"], [1, "text-indigo-500", "ml-2"], [1, "fixed", "inset-0", "z-50", "flex", "flex-col", "justify-end", "bg-black/40", "backdrop-blur-sm", 3, "click"], [1, "bg-white", "rounded-t-3xl", "shadow-2xl", "max-h-[70vh]", "overflow-y-auto", 3, "click"], [1, "px-6", "pt-6", "pb-4", "border-b", "border-gray-100", "flex", "items-center", "justify-between", "sticky", "top-0", "bg-white", "z-10"], [1, "p-6"], [1, "text-center", "py-8"], [1, "space-y-3"], ["width", "80", "height", "80", "viewBox", "0 0 80 80", "fill", "none", 1, "mx-auto", "mb-4", "opacity-40"], ["cx", "40", "cy", "40", "r", "30", "stroke", "#9CA3AF", "stroke-width", "3", "fill", "none"], ["d", "M30 40h20M40 30v20", "stroke", "#9CA3AF", "stroke-width", "3", "stroke-linecap", "round"], [1, "text-slate-400", "text-sm"], [1, "border-b", "border-gray-50", "pb-3", "mb-3", "last:border-0", "last:pb-0", "last:mb-0"], [1, "flex", "items-center", "gap-3"], [1, "w-8", "h-8", "rounded-full", "bg-emerald-100", "flex", "items-center", "justify-center", "flex-shrink-0"], ["name", "check", 1, "text-emerald-600", "w-4", "h-4"], [1, "text-sm", "font-semibold", "text-gray-800"], [1, "text-xs", "text-slate-500", "mt-0.5"], [1, "bg-white", "rounded-3xl", "shadow-2xl", "w-full", "max-w-sm", "p-6", 3, "click"], [1, "w-14", "h-14", "bg-red-100", "rounded-2xl", "flex", "items-center", "justify-center", "mx-auto", "mb-4"], ["name", "trash-2", 1, "text-red-500", "w-6", "h-6"], [1, "text-lg", "font-extrabold", "text-gray-800", "text-center", "mb-2"], [1, "text-slate-500", "text-sm", "text-center", "mb-6"], [1, "flex", "gap-3"], [1, "flex-1", "py-3", "rounded-2xl", "font-bold", "text-slate-600", "bg-slate-100", "hover:bg-slate-200", "transition-all", "text-sm", 3, "click"], [1, "flex-1", "py-3", "rounded-2xl", "font-bold", "text-white", "bg-red-500", "hover:bg-red-600", "transition-all", "text-sm", 3, "click"]], template: function MedicationsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div")(4, "h1", 3);
        \u0275\u0275text(5);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(6, MedicationsComponent_Conditional_6_Template, 2, 1, "p", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "button", 5);
        \u0275\u0275listener("click", function MedicationsComponent_Template_button_click_7_listener() {
          return ctx.openAddModal();
        });
        \u0275\u0275element(8, "lucide-icon", 6);
        \u0275\u0275text(9);
        \u0275\u0275elementEnd()()();
        \u0275\u0275conditionalCreate(10, MedicationsComponent_Conditional_10_Template, 7, 5, "div", 7);
        \u0275\u0275elementStart(11, "div", 7)(12, "div", 8)(13, "button", 9);
        \u0275\u0275listener("click", function MedicationsComponent_Template_button_click_13_listener() {
          return ctx.activeTab.set("active");
        });
        \u0275\u0275text(14);
        \u0275\u0275conditionalCreate(15, MedicationsComponent_Conditional_15_Template, 2, 1, "span", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "button", 9);
        \u0275\u0275listener("click", function MedicationsComponent_Template_button_click_16_listener() {
          return ctx.activeTab.set("archived");
        });
        \u0275\u0275text(17);
        \u0275\u0275conditionalCreate(18, MedicationsComponent_Conditional_18_Template, 2, 1, "span", 10);
        \u0275\u0275elementEnd()()();
        \u0275\u0275conditionalCreate(19, MedicationsComponent_Conditional_19_Template, 3, 1, "div", 11);
        \u0275\u0275conditionalCreate(20, MedicationsComponent_Conditional_20_Template, 12, 3, "div", 12);
        \u0275\u0275conditionalCreate(21, MedicationsComponent_Conditional_21_Template, 6, 1, "div", 12);
        \u0275\u0275conditionalCreate(22, MedicationsComponent_Conditional_22_Template, 3, 0, "div", 11);
        \u0275\u0275conditionalCreate(23, MedicationsComponent_Conditional_23_Template, 3, 0, "div", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(24, MedicationsComponent_Conditional_24_Template, 59, 28, "div", 13);
        \u0275\u0275conditionalCreate(25, MedicationsComponent_Conditional_25_Template, 26, 12, "div", 13);
        \u0275\u0275conditionalCreate(26, MedicationsComponent_Conditional_26_Template, 10, 2, "div", 14);
        \u0275\u0275conditionalCreate(27, MedicationsComponent_Conditional_27_Template, 13, 4, "div", 13);
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.i18n.t()["medTracker.title"] || "Medikamentet");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.activeChild() ? 6 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["medications.add"] || "Shto Medikament", " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.activeScheduledMeds().length > 0 && ctx.overallAdherence() !== null ? 10 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngClass", ctx.activeTab() === "active" ? "bg-indigo-500 text-white shadow-sm" : "text-slate-500 hover:text-slate-700");
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["medTracker.activeTab"] || "Aktiv", " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.activeMeds().length > 0 ? 15 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("ngClass", ctx.activeTab() === "archived" ? "bg-indigo-500 text-white shadow-sm" : "text-slate-500 hover:text-slate-700");
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["medTracker.archivedTab"] || "Arkiv\xEB", " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.archivedMeds().length > 0 ? 18 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.loading() ? 19 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.loading() && ctx.activeTab() === "active" && ctx.activeMeds().length === 0 ? 20 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.loading() && ctx.activeTab() === "archived" && ctx.archivedMeds().length === 0 ? 21 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.loading() && ctx.activeTab() === "active" && ctx.activeMeds().length > 0 ? 22 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.loading() && ctx.activeTab() === "archived" && ctx.archivedMeds().length > 0 ? 23 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.showModal() ? 24 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.showDoseLogModal() ? 25 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.showHistoryDrawer() ? 26 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.showDeleteModal() ? 27 : -1);
      }
    }, dependencies: [CommonModule, NgClass, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, LucideAngularModule, LucideAngularComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MedicationsComponent, [{
    type: Component,
    args: [{ selector: "app-medications", imports: [CommonModule, FormsModule, LucideAngularModule], template: `
    <div class="min-h-screen bg-gray-50 pb-24">

      <!-- Header -->
      <div class="bg-white border-b border-gray-100 px-4 pt-6 pb-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-extrabold text-gray-800">{{ i18n.t()['medTracker.title'] || 'Medikamentet' }}</h1>
            @if (activeChild()) {
              <p class="text-slate-400 text-sm mt-1 font-medium">{{ activeChild()?.name }}</p>
            }
          </div>
          <button (click)="openAddModal()"
            class="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-2xl font-bold shadow-sm transition-all flex items-center gap-2 text-sm">
            <lucide-icon name="plus" class="text-inherit"></lucide-icon>
            {{ i18n.t()['medications.add'] || 'Shto Medikament' }}
          </button>
        </div>
      </div>

      <!-- Adherence Summary Banner -->
      @if (activeScheduledMeds().length > 0 && overallAdherence() !== null) {
        <div class="px-4 mt-4">
          <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
            <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
              <lucide-icon name="bar-chart-2" class="text-emerald-600 w-5 h-5"></lucide-icon>
            </div>
            <div class="flex-1">
              <p class="font-bold text-emerald-700 text-sm">
                {{ onTimeCount() }}/{{ activeScheduledMeds().length }} {{ i18n.t()['medTracker.adherenceLabel'] || 'medikamente n\xEB koh\xEB' }} \u2014 {{ overallAdherence() }}% {{ i18n.t()['medTracker.adherence'] || 'p\xEBrputhshm\xEBria' }}
              </p>
            </div>
          </div>
        </div>
      }

      <!-- Tab Switcher -->
      <div class="px-4 mt-4">
        <div class="flex bg-white rounded-2xl p-1 border border-gray-100">
          <button (click)="activeTab.set('active')"
            class="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all"
            [ngClass]="activeTab() === 'active' ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'">
            {{ i18n.t()['medTracker.activeTab'] || 'Aktiv' }}
            @if (activeMeds().length > 0) {
              <span class="ml-1 text-xs opacity-75">({{ activeMeds().length }})</span>
            }
          </button>
          <button (click)="activeTab.set('archived')"
            class="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all"
            [ngClass]="activeTab() === 'archived' ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'">
            {{ i18n.t()['medTracker.archivedTab'] || 'Arkiv\xEB' }}
            @if (archivedMeds().length > 0) {
              <span class="ml-1 text-xs opacity-75">({{ archivedMeds().length }})</span>
            }
          </button>
        </div>
      </div>

      <!-- Loading Skeleton -->
      @if (loading()) {
        <div class="px-4 mt-4 space-y-3">
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

      <!-- Empty State: No active meds -->
      @if (!loading() && activeTab() === 'active' && activeMeds().length === 0) {
        <div class="flex flex-col items-center justify-center mt-20 px-4">
          <svg width="160" height="160" viewBox="0 0 160 160" fill="none" class="mb-6">
            <circle cx="80" cy="80" r="60" fill="#EEF2FF"/>
            <path d="M65 75h30M65 85h20" stroke="#6366F1" stroke-width="4" stroke-linecap="round"/>
            <circle cx="80" cy="80" r="40" stroke="#C7D2FE" stroke-width="3" fill="none"/>
          </svg>
          <h3 class="text-xl font-extrabold text-gray-700 mb-2">{{ i18n.t()['medTracker.noActiveMeds'] || 'Nuk ka medikamente aktive' }}</h3>
          <p class="text-slate-400 text-center mb-6 text-sm">{{ i18n.t()['medications.emptyHint'] || 'Shtoni medikamentet e para p\xEBr t\xEB ndjekur trajtimin' }}</p>
          <button (click)="openAddModal()"
            class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-sm transition-all text-sm">
            <lucide-icon name="plus" class="text-inherit inline w-4 h-4 mr-1"></lucide-icon>
            {{ i18n.t()['medications.addFirst'] || 'Shto medikamentin e par\xEB' }}
          </button>
        </div>
      }

      <!-- Empty State: No archived meds -->
      @if (!loading() && activeTab() === 'archived' && archivedMeds().length === 0) {
        <div class="flex flex-col items-center justify-center mt-20 px-4">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" class="mb-4 opacity-40">
            <circle cx="60" cy="60" r="50" stroke="#9CA3AF" stroke-width="3" fill="none"/>
            <path d="M50 60h20M60 50v20" stroke="#9CA3AF" stroke-width="3" stroke-linecap="round"/>
          </svg>
          <h3 class="text-lg font-extrabold text-gray-600 mb-1">{{ i18n.t()['medTracker.noArchivedMeds'] || 'Nuk ka medikamente t\xEB arkivuar' }}</h3>
        </div>
      }

      <!-- Active Medications List -->
      @if (!loading() && activeTab() === 'active' && activeMeds().length > 0) {
        <div class="px-4 mt-4 space-y-3">
          @for (med of activeMeds(); track med.id) {
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div class="p-5">
                <div class="flex items-start gap-4">
                  <!-- Icon -->
                  <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-green-100">
                    <lucide-icon name="pill" class="text-green-600 w-5 h-5"></lucide-icon>
                  </div>

                  <!-- Info -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2">
                      <h3 class="font-bold text-gray-800 text-base truncate">{{ med.name }}</h3>
                      <!-- Adherence Badge -->
                      @if (med.adherencePct !== null) {
                        <span class="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                              [ngClass]="adherenceBadgeClass(med.adherencePct)">
                          {{ med.adherencePct }}%
                        </span>
                      } @else {
                        <span class="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 bg-gray-100 text-gray-500">
                          {{ i18n.t()['medTracker.asNeeded'] || 'Sipas nevoj\xEBs' }}
                        </span>
                      }
                    </div>

                    <!-- Dosage & Frequency -->
                    <div class="flex items-center gap-2 mt-1.5 text-sm text-slate-500">
                      <lucide-icon name="syringe" class="w-3.5 h-3.5 text-slate-400 flex-shrink-0"></lucide-icon>
                      <span>{{ med.dosage }} \u2014 {{ frequencyLabel(med.frequency) }}</span>
                    </div>

                    <!-- Duration -->
                    <div class="flex items-center gap-2 mt-1 text-xs text-slate-400">
                      <lucide-icon name="calendar" class="w-3.5 h-3.5 flex-shrink-0"></lucide-icon>
                      <span>{{ formatDate(med.startDate) }}
                        @if (med.endDate) {
                          \u2192 {{ formatDate(med.endDate) }}
                        } @else {
                          \u2192 {{ i18n.t()['medications.ongoing'] || 'N\xEB vazhdim' }}
                        }
                      </span>
                    </div>

                    <!-- Prescribed by -->
                    @if (med.prescribedBy) {
                      <div class="flex items-center gap-2 mt-1 text-xs text-slate-400">
                        <lucide-icon name="user" class="w-3.5 h-3.5 flex-shrink-0"></lucide-icon>
                        <span>{{ med.prescribedBy }}</span>
                      </div>
                    }

                    <!-- Last dose -->
                    @if (med.doseLogs && med.doseLogs.length > 0) {
                      <div class="flex items-center gap-2 mt-2 text-xs text-indigo-600 font-medium">
                        <lucide-icon name="clock" class="w-3.5 h-3.5"></lucide-icon>
                        <span>{{ i18n.t()['medTracker.recentDose'] || 'Doza e fundit:' }} {{ relativeTime(med.doseLogs[0].takenAt) }}</span>
                      </div>
                    }
                  </div>
                </div>

                <!-- Notes -->
                @if (med.notes) {
                  <div class="mt-3 text-xs text-slate-500 bg-slate-50 rounded-xl p-3">{{ med.notes }}</div>
                }

                <!-- Adherence Bar (for scheduled meds) -->
                @if (med.adherencePct !== null) {
                  <div class="mt-3 h-1 rounded-full bg-gray-100 overflow-hidden">
                    <div class="h-full rounded-full transition-all duration-500" [ngClass]="adherenceBarClass(med.adherencePct)"
                         [style.width.%]="med.adherencePct"></div>
                  </div>
                }

                <!-- Actions -->
                <div class="flex items-center gap-2 mt-4">
                  <button (click)="openDoseLogModal(med)"
                    class="flex-1 py-2 rounded-xl text-xs font-semibold bg-indigo-500 hover:bg-indigo-600 text-white transition-all flex items-center justify-center gap-1.5">
                    <lucide-icon name="plus-circle" class="w-3.5 h-3.5"></lucide-icon>
                    {{ i18n.t()['medTracker.logDose'] || 'Regjistro Doz\xEBn' }}
                  </button>
                  <button (click)="openHistoryDrawer(med)"
                    class="flex-1 py-2 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-600 transition-all flex items-center justify-center gap-1.5">
                    <lucide-icon name="clock" class="w-3.5 h-3.5"></lucide-icon>
                    {{ i18n.t()['medTracker.viewHistory'] || 'Shiko Historikun' }}
                  </button>
                  <button (click)="openEditModal(med)"
                    class="py-2 px-3 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-600 transition-all flex items-center justify-center">
                    <lucide-icon name="pencil" class="w-3.5 h-3.5"></lucide-icon>
                  </button>
                  <button (click)="confirmDelete(med)"
                    class="py-2 px-3 rounded-xl text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 transition-all flex items-center justify-center">
                    <lucide-icon name="trash-2" class="w-3.5 h-3.5"></lucide-icon>
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      }

      <!-- Archived Medications List -->
      @if (!loading() && activeTab() === 'archived' && archivedMeds().length > 0) {
        <div class="px-4 mt-4 space-y-3">
          @for (med of archivedMeds(); track med.id) {
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden opacity-80">
              <div class="p-5">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-100">
                    <lucide-icon name="pill-off" class="text-gray-400 w-5 h-5"></lucide-icon>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2">
                      <h3 class="font-bold text-gray-800 text-base truncate">{{ med.name }}</h3>
                      <span class="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 bg-gray-100 text-gray-500">
                        {{ i18n.t()['medTracker.archived'] || 'Arkiv\xEB' }}
                      </span>
                    </div>
                    <div class="flex items-center gap-2 mt-1.5 text-sm text-slate-500">
                      <lucide-icon name="syringe" class="w-3.5 h-3.5 text-slate-400 flex-shrink-0"></lucide-icon>
                      <span>{{ med.dosage }} \u2014 {{ frequencyLabel(med.frequency) }}</span>
                    </div>
                    <div class="flex items-center gap-2 mt-1 text-xs text-slate-400">
                      <lucide-icon name="calendar" class="w-3.5 h-3.5 flex-shrink-0"></lucide-icon>
                      <span>{{ formatDate(med.startDate) }}
                        @if (med.endDate) {
                          \u2192 {{ formatDate(med.endDate) }}
                        } @else {
                          \u2192 {{ i18n.t()['medications.ongoing'] || 'N\xEB vazhdim' }}
                        }
                      </span>
                    </div>
                    @if (med.adherencePct !== null) {
                      <div class="mt-2">
                        <span class="text-xs font-semibold px-2.5 py-1 rounded-full"
                              [ngClass]="adherenceBadgeClass(med.adherencePct)">
                          {{ med.adherencePct }}% {{ i18n.t()['medTracker.adherence'] || 'p\xEBrputhshm\xEBria' }}
                        </span>
                      </div>
                    }
                  </div>
                </div>
                <!-- Edit only action -->
                <div class="flex items-center gap-2 mt-4">
                  <button (click)="openEditModal(med)"
                    class="flex-1 py-2 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-600 transition-all flex items-center justify-center gap-1.5">
                    <lucide-icon name="pencil" class="w-3.5 h-3.5"></lucide-icon>
                    {{ i18n.t()['medications.edit'] || 'Redakto' }}
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>

    <!-- Add/Edit Medication Modal -->
    @if (showModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" (click)="closeModal()">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto" (click)="$event.stopPropagation()">
          <div class="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
            <h2 class="text-xl font-extrabold text-gray-800">
              {{ editingMed() ? (i18n.t()['medications.editMed'] || 'Redakto Medikamentin')
                               : (i18n.t()['medications.addMed'] || 'Shto Medikament') }}
            </h2>
            <button (click)="closeModal()" class="p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <lucide-icon name="x" class="w-5 h-5 text-slate-400"></lucide-icon>
            </button>
          </div>
          <div class="p-6 space-y-5">
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['medications.name'] || 'Emri i medikamentit' }} *</label>
              <input type="text" [(ngModel)]="formName"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm font-medium"
                [placeholder]="i18n.t()['medications.namePlaceholder'] || 'P.sh. Amoxicillin'">
            </div>
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['medications.dosage'] || 'Doza' }} *</label>
              <input type="text" [(ngModel)]="formDosage"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm font-medium"
                placeholder="P.sh. 250mg ose 5ml">
            </div>
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['medications.frequency'] || 'Frekuenca' }} *</label>
              <div class="grid grid-cols-2 gap-2">
                @for (freq of quickFrequencies; track freq.value) {
                  <button type="button" (click)="formFrequency.set(freq.value)"
                    class="py-2.5 rounded-xl text-xs font-semibold border-2 transition-all text-center"
                    [ngClass]="formFrequency() === freq.value ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-indigo-200'">
                    {{ i18n.isSq() ? freq.labelSq : freq.labelEn }}
                  </button>
                }
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['medications.startDate'] || 'Data e fillimit' }} *</label>
              <input type="date" [(ngModel)]="formStartDate"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm">
            </div>
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['medications.endDate'] || 'Data e p\xEBrfundimit' }} <span class="text-slate-400 normal-case font-normal text-xs ml-1">({{ i18n.t()['medications.optional'] || 'opsionale' }})</span></label>
              <input type="date" [(ngModel)]="formEndDate"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm">
            </div>
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['medications.prescribedBy'] || 'P\xEBrshkruar nga' }} <span class="text-slate-400 normal-case font-normal text-xs ml-1">({{ i18n.t()['medications.optional'] || 'opsionale' }})</span></label>
              <input type="text" [(ngModel)]="formPrescribedBy"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm font-medium"
                [placeholder]="i18n.t()['medications.prescribedByPlaceholder'] || 'P.sh. Dr. Elena Hoxha'">
            </div>
            <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div>
                <p class="font-semibold text-gray-800 text-sm">{{ i18n.t()['medications.active'] || 'Aktiv' }}</p>
                <p class="text-xs text-slate-500">{{ i18n.t()['medications.activeHint'] || 'Medikamenti n\xEB p\xEBrdorim aktualisht' }}</p>
              </div>
              <button type="button" (click)="formActive.set(!formActive())"
                class="relative w-12 h-7 rounded-full transition-colors"
                [ngClass]="formActive() ? 'bg-indigo-500' : 'bg-slate-300'">
                <span class="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform"
                      [ngClass]="formActive() ? 'translate-x-5' : 'translate-x-0'"></span>
              </button>
            </div>
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['medications.notes'] || 'Sh\xEBnime' }} <span class="text-slate-400 normal-case font-normal text-xs ml-1">({{ i18n.t()['medications.optional'] || 'opsionale' }})</span></label>
              <textarea [(ngModel)]="formNotes" rows="2"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm resize-none"
                [placeholder]="i18n.t()['medications.notesPlaceholder'] || 'Sh\xEBno detajet shtes\xEB...'"></textarea>
            </div>
            @if (saveError()) {
              <div class="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold">{{ saveError() }}</div>
            }
          </div>
          <div class="px-6 pb-6 flex gap-3">
            <button (click)="closeModal()"
              class="flex-1 py-3.5 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all text-sm">
              {{ i18n.t()['medications.cancel'] || 'Anulo' }}
            </button>
            <button (click)="saveMedication()"
              [disabled]="saving() || !canSave()"
              class="flex-1 py-3.5 rounded-2xl font-bold text-white bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm flex items-center justify-center gap-2">
              @if (saving()) {
                <lucide-icon name="loader-2" class="w-4 h-4 animate-spin"></lucide-icon>
                {{ i18n.t()['medications.saving'] || 'Duke ruajtur...' }}
              } @else {
                <lucide-icon name="check" class="w-4 h-4"></lucide-icon>
                {{ i18n.t()['medications.save'] || 'Ruaj' }}
              }
            </button>
          </div>
        </div>
      </div>
    }

    <!-- Log Dose Modal -->
    @if (showDoseLogModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" (click)="closeDoseLogModal()">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md" (click)="$event.stopPropagation()">
          <div class="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
            <h2 class="text-xl font-extrabold text-gray-800">{{ i18n.t()['medTracker.logDose'] || 'Regjistro Doz\xEBn' }}</h2>
            <button (click)="closeDoseLogModal()" class="p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <lucide-icon name="x" class="w-5 h-5 text-slate-400"></lucide-icon>
            </button>
          </div>
          <div class="p-6 space-y-5">
            @if (doseLogMed()) {
              <div class="bg-indigo-50 rounded-xl p-3 text-sm">
                <span class="font-bold text-indigo-700">{{ doseLogMed()?.name }}</span>
                <span class="text-indigo-500 ml-2">{{ doseLogMed()?.dosage }}</span>
              </div>
            }
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['medTracker.doseTakenAt'] || 'Data dhe Ora' }} *</label>
              <input type="datetime-local" [(ngModel)]="doseLogTakenAt"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm">
            </div>
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['medTracker.doseNotes'] || 'Sh\xEBnime' }} <span class="text-slate-400 normal-case font-normal text-xs ml-1">({{ i18n.t()['medications.optional'] || 'opsionale' }})</span></label>
              <textarea [(ngModel)]="doseLogNotes" rows="2"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm resize-none"
                [placeholder]="i18n.t()['medTracker.doseNotesPlaceholder'] || 'Opsionale, p.sh. me ushqim'"></textarea>
            </div>
            @if (doseLogError()) {
              <div class="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold">{{ doseLogError() }}</div>
            }
          </div>
          <div class="px-6 pb-6 flex gap-3">
            <button (click)="closeDoseLogModal()"
              class="flex-1 py-3.5 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all text-sm">
              {{ i18n.t()['medTracker.cancel'] || 'Anulo' }}
            </button>
            <button (click)="saveDoseLog()"
              [disabled]="doseLogSaving()"
              class="flex-1 py-3.5 rounded-2xl font-bold text-white bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 transition-all text-sm flex items-center justify-center gap-2">
              @if (doseLogSaving()) {
                <lucide-icon name="loader-2" class="w-4 h-4 animate-spin"></lucide-icon>
                {{ i18n.t()['medications.saving'] || 'Duke ruajtur...' }}
              } @else {
                <lucide-icon name="check" class="w-4 h-4"></lucide-icon>
                {{ i18n.t()['medTracker.save'] || 'Ruaj' }}
              }
            </button>
          </div>
        </div>
      </div>
    }

    <!-- Dose History Drawer -->
    @if (showHistoryDrawer()) {
      <div class="fixed inset-0 z-50 flex flex-col justify-end bg-black/40 backdrop-blur-sm" (click)="closeHistoryDrawer()">
        <div class="bg-white rounded-t-3xl shadow-2xl max-h-[70vh] overflow-y-auto" (click)="$event.stopPropagation()">
          <div class="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
            <h2 class="text-xl font-extrabold text-gray-800">{{ i18n.t()['medTracker.doseHistory'] || 'Historia e Dozave' }}</h2>
            <button (click)="closeHistoryDrawer()" class="p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <lucide-icon name="x" class="w-5 h-5 text-slate-400"></lucide-icon>
            </button>
          </div>
          <div class="p-6">
            @if (!historyMed()?.doseLogs || historyMed()!.doseLogs.length === 0) {
              <div class="text-center py-8">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" class="mx-auto mb-4 opacity-40">
                  <circle cx="40" cy="40" r="30" stroke="#9CA3AF" stroke-width="3" fill="none"/>
                  <path d="M30 40h20M40 30v20" stroke="#9CA3AF" stroke-width="3" stroke-linecap="round"/>
                </svg>
                <p class="text-slate-400 text-sm">{{ i18n.t()['medTracker.noDoses'] || 'Ende nuk ka doza t\xEB regjistruara' }}</p>
              </div>
            } @else {
              <div class="space-y-3">
                @for (log of historyMed()!.doseLogs; track log.id) {
                  <div class="border-b border-gray-50 pb-3 mb-3 last:border-0 last:pb-0 last:mb-0">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <lucide-icon name="check" class="text-emerald-600 w-4 h-4"></lucide-icon>
                      </div>
                      <div class="flex-1">
                        <p class="text-sm font-semibold text-gray-800">{{ formatDateTime(log.takenAt) }}</p>
                        @if (log.notes) {
                          <p class="text-xs text-slate-500 mt-0.5">{{ log.notes }}</p>
                        }
                      </div>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </div>
    }

    <!-- Delete Confirmation Modal -->
    @if (showDeleteModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" (click)="showDeleteModal.set(false)">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6" (click)="$event.stopPropagation()">
          <div class="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <lucide-icon name="trash-2" class="text-red-500 w-6 h-6"></lucide-icon>
          </div>
          <h3 class="text-lg font-extrabold text-gray-800 text-center mb-2">{{ i18n.t()['medications.deleteConfirmTitle'] || 'Fshij Medikamentin?' }}</h3>
          <p class="text-slate-500 text-sm text-center mb-6">{{ deletingMed()?.name }}</p>
          <div class="flex gap-3">
            <button (click)="showDeleteModal.set(false)"
              class="flex-1 py-3 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all text-sm">
              {{ i18n.t()['medications.cancel'] || 'Anulo' }}
            </button>
            <button (click)="deleteMedication()"
              class="flex-1 py-3 rounded-2xl font-bold text-white bg-red-500 hover:bg-red-600 transition-all text-sm">
              {{ i18n.t()['medications.delete'] || 'Fshi' }}
            </button>
          </div>
        </div>
      </div>
    }
  ` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MedicationsComponent, { className: "MedicationsComponent", filePath: "src/app/components/medications/medications.component.ts", lineNumber: 528 });
})();
export {
  MedicationsComponent
};
//# sourceMappingURL=chunk-KBOSMNVX.js.map
