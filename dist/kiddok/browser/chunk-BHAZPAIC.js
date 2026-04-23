import {
  CommonModule,
  DefaultValueAccessor,
  FormsModule,
  LucideAngularComponent,
  LucideAngularModule,
  NgControlStatus,
  NgModel,
  NgTemplateOutlet
} from "./chunk-IFHIJ3FQ.js";
import {
  DataService,
  I18nService
} from "./chunk-RD3QEML6.js";
import {
  Component,
  Pipe,
  __async,
  __spreadValues,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefinePipe,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-SFGRG2UU.js";

// src/app/components/appointments/appointments.component.ts
var _c0 = () => [1, 2, 3];
var _c1 = (a0) => ({ appt: a0, section: "overdue" });
var _c2 = (a0, a1) => ({ appt: a0, section: a1 });
var _c3 = (a0) => ({ appt: a0, section: "past-today" });
var _forTrack0 = ($index, $item) => $item.id;
function AppointmentsComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((tmp_2_0 = ctx_r0.activeChild()) == null ? null : tmp_2_0.name);
  }
}
function AppointmentsComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 12)(2, "div", 13);
    \u0275\u0275element(3, "lucide-icon", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 15)(5, "p", 16);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "replace");
    \u0275\u0275pipe(8, "replace");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.overdueCount() === 1 ? \u0275\u0275pipeBind3(7, 1, ctx_r0.i18n.t()["appointments.overdueCount"], "{n}", ctx_r0.overdueCount()) : \u0275\u0275pipeBind3(8, 5, ctx_r0.i18n.t()["appointments.overdueCountPlural"], "{n}", ctx_r0.overdueCount()), " ");
  }
}
function AppointmentsComponent_Conditional_11_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 18);
    \u0275\u0275element(2, "div", 19);
    \u0275\u0275elementStart(3, "div", 20);
    \u0275\u0275element(4, "div", 21)(5, "div", 22);
    \u0275\u0275elementEnd()()();
  }
}
function AppointmentsComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275repeaterCreate(1, AppointmentsComponent_Conditional_11_For_2_Template, 6, 0, "div", 17, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function AppointmentsComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 23);
    \u0275\u0275element(2, "circle", 24)(3, "rect", 25)(4, "line", 26)(5, "line", 27)(6, "line", 28)(7, "path", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "h3", 30);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 31);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 32);
    \u0275\u0275listener("click", function AppointmentsComponent_Conditional_12_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.openAddModal());
    });
    \u0275\u0275element(13, "lucide-icon", 33);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["appointments.empty"]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["appointments.emptyHint"]);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["appointments.addFirst"], " ");
  }
}
function AppointmentsComponent_Conditional_13_Conditional_0_For_8_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function AppointmentsComponent_Conditional_13_Conditional_0_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, AppointmentsComponent_Conditional_13_Conditional_0_For_8_ng_container_0_Template, 1, 0, "ng-container", 40);
  }
  if (rf & 2) {
    const appt_r3 = ctx.$implicit;
    \u0275\u0275nextContext(3);
    const apptCard_r4 = \u0275\u0275reference(15);
    \u0275\u0275property("ngTemplateOutlet", apptCard_r4)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c1, appt_r3));
  }
}
function AppointmentsComponent_Conditional_13_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 36)(2, "span", 37);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 38);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 39);
    \u0275\u0275repeaterCreate(7, AppointmentsComponent_Conditional_13_Conditional_0_For_8_Template, 1, 4, "ng-container", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["appointments.section.overdue"], " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.overdueCount());
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.overdueAppts());
  }
}
function AppointmentsComponent_Conditional_13_Conditional_1_For_8_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function AppointmentsComponent_Conditional_13_Conditional_1_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, AppointmentsComponent_Conditional_13_Conditional_1_For_8_ng_container_0_Template, 1, 0, "ng-container", 40);
  }
  if (rf & 2) {
    const appt_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    const apptCard_r4 = \u0275\u0275reference(15);
    \u0275\u0275property("ngTemplateOutlet", apptCard_r4)("ngTemplateOutletContext", \u0275\u0275pureFunction2(2, _c2, appt_r5, ctx_r0.getSection(appt_r5)));
  }
}
function AppointmentsComponent_Conditional_13_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 36)(2, "span", 37);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 41);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 39);
    \u0275\u0275repeaterCreate(7, AppointmentsComponent_Conditional_13_Conditional_1_For_8_Template, 1, 5, "ng-container", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["appointments.section.today"], " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.todayCount());
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.todayApptsFuture());
  }
}
function AppointmentsComponent_Conditional_13_Conditional_2_For_8_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function AppointmentsComponent_Conditional_13_Conditional_2_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, AppointmentsComponent_Conditional_13_Conditional_2_For_8_ng_container_0_Template, 1, 0, "ng-container", 40);
  }
  if (rf & 2) {
    const appt_r6 = ctx.$implicit;
    \u0275\u0275nextContext(3);
    const apptCard_r4 = \u0275\u0275reference(15);
    \u0275\u0275property("ngTemplateOutlet", apptCard_r4)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c3, appt_r6));
  }
}
function AppointmentsComponent_Conditional_13_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 36)(2, "span", 37);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 42);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 39);
    \u0275\u0275repeaterCreate(7, AppointmentsComponent_Conditional_13_Conditional_2_For_8_Template, 1, 4, "ng-container", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["appointments.section.past"], " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.pastTodayAppts().length);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.pastTodayAppts());
  }
}
function AppointmentsComponent_Conditional_13_Conditional_3_For_8_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function AppointmentsComponent_Conditional_13_Conditional_3_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, AppointmentsComponent_Conditional_13_Conditional_3_For_8_ng_container_0_Template, 1, 0, "ng-container", 40);
  }
  if (rf & 2) {
    const appt_r7 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    const apptCard_r4 = \u0275\u0275reference(15);
    \u0275\u0275property("ngTemplateOutlet", apptCard_r4)("ngTemplateOutletContext", \u0275\u0275pureFunction2(2, _c2, appt_r7, ctx_r0.getSection(appt_r7)));
  }
}
function AppointmentsComponent_Conditional_13_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "div", 36)(2, "span", 37);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 43);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 39);
    \u0275\u0275repeaterCreate(7, AppointmentsComponent_Conditional_13_Conditional_3_For_8_Template, 1, 5, "ng-container", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["appointments.section.upcoming"], " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.upcomingCount());
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.upcomingAppts());
  }
}
function AppointmentsComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, AppointmentsComponent_Conditional_13_Conditional_0_Template, 9, 2, "div", 8);
    \u0275\u0275conditionalCreate(1, AppointmentsComponent_Conditional_13_Conditional_1_Template, 9, 2, "div", 34);
    \u0275\u0275conditionalCreate(2, AppointmentsComponent_Conditional_13_Conditional_2_Template, 9, 2, "div", 34);
    \u0275\u0275conditionalCreate(3, AppointmentsComponent_Conditional_13_Conditional_3_Template, 9, 2, "div", 35);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.overdueCount() > 0 ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.todayCount() > 0 ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.pastTodayAppts().length > 0 ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.upcomingCount() > 0 ? 3 : -1);
  }
}
function AppointmentsComponent_ng_template_14_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["appointments.overdue"], " ");
  }
}
function AppointmentsComponent_ng_template_14_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["appointments.today"], " ");
  }
}
function AppointmentsComponent_ng_template_14_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["appointments.upcoming"], " ");
  }
}
function AppointmentsComponent_ng_template_14_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57);
    \u0275\u0275element(1, "lucide-icon", 64);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const appt_r9 = \u0275\u0275nextContext().appt;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(appt_r9.doctorName);
  }
}
function AppointmentsComponent_ng_template_14_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57);
    \u0275\u0275element(1, "lucide-icon", 65);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const appt_r9 = \u0275\u0275nextContext().appt;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(appt_r9.location);
  }
}
function AppointmentsComponent_ng_template_14_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const appt_r9 = \u0275\u0275nextContext().appt;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", appt_r9.notes, " ");
  }
}
function AppointmentsComponent_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 44)(1, "div", 45)(2, "div", 46)(3, "div", 47);
    \u0275\u0275element(4, "lucide-icon", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 49)(6, "div", 50)(7, "h3", 51);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, AppointmentsComponent_ng_template_14_Conditional_9_Template, 2, 1, "span", 52)(10, AppointmentsComponent_ng_template_14_Conditional_10_Template, 2, 1, "span", 53)(11, AppointmentsComponent_ng_template_14_Conditional_11_Template, 2, 1, "span", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 55);
    \u0275\u0275element(13, "lucide-icon", 56);
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(16, AppointmentsComponent_ng_template_14_Conditional_16_Template, 4, 1, "div", 57);
    \u0275\u0275conditionalCreate(17, AppointmentsComponent_ng_template_14_Conditional_17_Template, 4, 1, "div", 57);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(18, AppointmentsComponent_ng_template_14_Conditional_18_Template, 2, 1, "div", 58);
    \u0275\u0275elementStart(19, "div", 59)(20, "button", 60);
    \u0275\u0275listener("click", function AppointmentsComponent_ng_template_14_Template_button_click_20_listener() {
      const appt_r9 = \u0275\u0275restoreView(_r8).appt;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.openEditModal(appt_r9));
    });
    \u0275\u0275element(21, "lucide-icon", 61);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 62);
    \u0275\u0275listener("click", function AppointmentsComponent_ng_template_14_Template_button_click_23_listener() {
      const appt_r9 = \u0275\u0275restoreView(_r8).appt;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.confirmDelete(appt_r9));
    });
    \u0275\u0275element(24, "lucide-icon", 63);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const appt_r9 = ctx.appt;
    const section_r10 = ctx.section;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("border-l-4", true)("border-red-400", section_r10 === "overdue")("border-amber-400", section_r10 === "today")("border-teal-400", section_r10 === "upcoming")("bg-red-50/30", section_r10 === "overdue")("bg-amber-50/30", section_r10 === "today")("bg-teal-50/30", section_r10 === "upcoming")("border-slate-300", section_r10 === "past-today")("bg-slate-50", section_r10 === "past-today")("border", section_r10 === "today" || section_r10 === "overdue" || section_r10 === "past-today")("border-red-200", section_r10 === "overdue")("border-amber-200", section_r10 === "today")("border-teal-200", section_r10 === "upcoming");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("bg-red-100", section_r10 === "overdue")("bg-amber-100", section_r10 === "today")("bg-teal-100", section_r10 === "upcoming")("bg-slate-100", section_r10 === "past-today");
    \u0275\u0275advance();
    \u0275\u0275classProp("text-red-500", section_r10 === "overdue")("text-amber-500", section_r10 === "today")("text-teal-500", section_r10 === "upcoming")("text-slate-400", section_r10 === "past-today");
    \u0275\u0275advance(3);
    \u0275\u0275property("title", appt_r9.title);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(appt_r9.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(section_r10 === "overdue" ? 9 : section_r10 === "today" ? 10 : section_r10 === "upcoming" ? 11 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.formatDateTime(appt_r9.dateTime));
    \u0275\u0275advance();
    \u0275\u0275conditional(appt_r9.doctorName ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(appt_r9.location ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(appt_r9.notes ? 18 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["appointments.edit"], " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["appointments.delete"], " ");
  }
}
function AppointmentsComponent_Conditional_16_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 80);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.saveError(), " ");
  }
}
function AppointmentsComponent_Conditional_16_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 84);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["appointments.saving"], " ");
  }
}
function AppointmentsComponent_Conditional_16_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 85);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["appointments.save"], " ");
  }
}
function AppointmentsComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 66);
    \u0275\u0275listener("click", function AppointmentsComponent_Conditional_16_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeModal());
    });
    \u0275\u0275elementStart(1, "div", 67);
    \u0275\u0275listener("click", function AppointmentsComponent_Conditional_16_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 68)(3, "h2", 69);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 70);
    \u0275\u0275listener("click", function AppointmentsComponent_Conditional_16_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeModal());
    });
    \u0275\u0275element(6, "lucide-icon", 71);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 72)(8, "div")(9, "label", 73);
    \u0275\u0275text(10);
    \u0275\u0275elementStart(11, "span", 74);
    \u0275\u0275text(12, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "input", 75);
    \u0275\u0275twoWayListener("ngModelChange", function AppointmentsComponent_Conditional_16_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.formTitle, $event) || (ctx_r0.formTitle = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("blur", function AppointmentsComponent_Conditional_16_Template_input_blur_13_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showValidation.set(true));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div")(15, "label", 73);
    \u0275\u0275text(16);
    \u0275\u0275elementStart(17, "span", 74);
    \u0275\u0275text(18, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "input", 76);
    \u0275\u0275twoWayListener("ngModelChange", function AppointmentsComponent_Conditional_16_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.formDateTime, $event) || (ctx_r0.formDateTime = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div")(21, "label", 73);
    \u0275\u0275text(22);
    \u0275\u0275elementStart(23, "span", 77);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "input", 78);
    \u0275\u0275twoWayListener("ngModelChange", function AppointmentsComponent_Conditional_16_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.formDoctorName, $event) || (ctx_r0.formDoctorName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div")(27, "label", 73);
    \u0275\u0275text(28);
    \u0275\u0275elementStart(29, "span", 77);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "input", 78);
    \u0275\u0275twoWayListener("ngModelChange", function AppointmentsComponent_Conditional_16_Template_input_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.formLocation, $event) || (ctx_r0.formLocation = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div")(33, "label", 73);
    \u0275\u0275text(34);
    \u0275\u0275elementStart(35, "span", 77);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "textarea", 79);
    \u0275\u0275twoWayListener("ngModelChange", function AppointmentsComponent_Conditional_16_Template_textarea_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.formNotes, $event) || (ctx_r0.formNotes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(38, AppointmentsComponent_Conditional_16_Conditional_38_Template, 2, 1, "div", 80);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 81)(40, "button", 82);
    \u0275\u0275listener("click", function AppointmentsComponent_Conditional_16_Template_button_click_40_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeModal());
    });
    \u0275\u0275text(41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "button", 83);
    \u0275\u0275listener("click", function AppointmentsComponent_Conditional_16_Template_button_click_42_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.saveAppointment());
    });
    \u0275\u0275conditionalCreate(43, AppointmentsComponent_Conditional_16_Conditional_43_Template, 2, 1)(44, AppointmentsComponent_Conditional_16_Conditional_44_Template, 2, 1);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.editingAppt() ? ctx_r0.i18n.t()["appointments.editAppt"] : ctx_r0.i18n.t()["appointments.addAppt"], " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["appointments.titleLabel"], " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("border-red-300", ctx_r0.formTitle().trim() === "" && ctx_r0.showValidation())("border-slate-200", !(ctx_r0.formTitle().trim() === "" && ctx_r0.showValidation()))("bg-white", !(ctx_r0.formTitle().trim() === "" && ctx_r0.showValidation()))("bg-red-50", ctx_r0.formTitle().trim() === "" && ctx_r0.showValidation());
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.formTitle);
    \u0275\u0275property("placeholder", ctx_r0.i18n.t()["appointments.titlePlaceholder"]);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["appointments.dateTime"], " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("border-red-300", ctx_r0.formDateTime() === "" && ctx_r0.showValidation())("border-slate-200", !(ctx_r0.formDateTime() === "" && ctx_r0.showValidation()))("bg-white", !(ctx_r0.formDateTime() === "" && ctx_r0.showValidation()))("bg-red-50", ctx_r0.formDateTime() === "" && ctx_r0.showValidation());
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.formDateTime);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["appointments.doctor"], " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", ctx_r0.i18n.t()["appointments.optional"], ")");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.formDoctorName);
    \u0275\u0275property("placeholder", ctx_r0.i18n.t()["appointments.doctorPlaceholder"]);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["appointments.location"], " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", ctx_r0.i18n.t()["appointments.optional"], ")");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.formLocation);
    \u0275\u0275property("placeholder", ctx_r0.i18n.t()["appointments.locationPlaceholder"]);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["appointments.notes"], " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", ctx_r0.i18n.t()["appointments.optional"], ")");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.formNotes);
    \u0275\u0275property("placeholder", ctx_r0.i18n.t()["appointments.notesPlaceholder"]);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.saveError() ? 38 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["appointments.cancel"], " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.saving() || !ctx_r0.canSave());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.saving() ? 43 : 44);
  }
}
function AppointmentsComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 66);
    \u0275\u0275listener("click", function AppointmentsComponent_Conditional_17_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showDeleteModal.set(false));
    });
    \u0275\u0275elementStart(1, "div", 86);
    \u0275\u0275listener("click", function AppointmentsComponent_Conditional_17_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 87);
    \u0275\u0275element(3, "lucide-icon", 88);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3", 89);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 90);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 91)(9, "button", 92);
    \u0275\u0275listener("click", function AppointmentsComponent_Conditional_17_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showDeleteModal.set(false));
    });
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 93);
    \u0275\u0275listener("click", function AppointmentsComponent_Conditional_17_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.deleteAppointment());
    });
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["appointments.deleteConfirmTitle"], " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1('"', (tmp_3_0 = ctx_r0.deletingAppt()) == null ? null : tmp_3_0.title, '"');
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["appointments.cancel"], " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["appointments.delete"], " ");
  }
}
var ReplacePipe = class _ReplacePipe {
  transform(value, search, replacement) {
    return value.replace(new RegExp(search, "g"), String(replacement));
  }
  static {
    this.\u0275fac = function ReplacePipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ReplacePipe)();
    };
  }
  static {
    this.\u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "replace", type: _ReplacePipe, pure: true });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReplacePipe, [{
    type: Pipe,
    args: [{ name: "replace", standalone: true }]
  }], null, null);
})();
var AppointmentsComponent = class _AppointmentsComponent {
  constructor() {
    this.i18n = inject(I18nService);
    this.data = inject(DataService);
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
    this.showValidation = signal(false, ...ngDevMode ? [{ debugName: "showValidation" }] : (
      /* istanbul ignore next */
      []
    ));
    this.editingAppt = signal(null, ...ngDevMode ? [{ debugName: "editingAppt" }] : (
      /* istanbul ignore next */
      []
    ));
    this.deletingAppt = signal(null, ...ngDevMode ? [{ debugName: "deletingAppt" }] : (
      /* istanbul ignore next */
      []
    ));
    this.saveError = signal(null, ...ngDevMode ? [{ debugName: "saveError" }] : (
      /* istanbul ignore next */
      []
    ));
    this.formTitle = signal("", ...ngDevMode ? [{ debugName: "formTitle" }] : (
      /* istanbul ignore next */
      []
    ));
    this.formDateTime = signal("", ...ngDevMode ? [{ debugName: "formDateTime" }] : (
      /* istanbul ignore next */
      []
    ));
    this.formDoctorName = signal("", ...ngDevMode ? [{ debugName: "formDoctorName" }] : (
      /* istanbul ignore next */
      []
    ));
    this.formLocation = signal("", ...ngDevMode ? [{ debugName: "formLocation" }] : (
      /* istanbul ignore next */
      []
    ));
    this.formNotes = signal("", ...ngDevMode ? [{ debugName: "formNotes" }] : (
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
    this.appointments = signal([], ...ngDevMode ? [{ debugName: "appointments" }] : (
      /* istanbul ignore next */
      []
    ));
    this.overdueCount = computed(() => this.appointments().filter((a) => this.isOverdue(a)).length, ...ngDevMode ? [{ debugName: "overdueCount" }] : (
      /* istanbul ignore next */
      []
    ));
    this.todayCount = computed(() => this.appointments().filter((a) => this.isToday(a)).length, ...ngDevMode ? [{ debugName: "todayCount" }] : (
      /* istanbul ignore next */
      []
    ));
    this.upcomingCount = computed(() => {
      const now = /* @__PURE__ */ new Date();
      return this.appointments().filter((a) => !this.isOverdue(a) && !this.isToday(a) && new Date(a.dateTime) >= now).length;
    }, ...ngDevMode ? [{ debugName: "upcomingCount" }] : (
      /* istanbul ignore next */
      []
    ));
    this.overdueAppts = computed(() => this.appointments().filter((a) => this.isOverdue(a)).sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()), ...ngDevMode ? [{ debugName: "overdueAppts" }] : (
      /* istanbul ignore next */
      []
    ));
    this.pastTodayAppts = computed(() => this.appointments().filter((a) => this.isPastToday(a)).sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()), ...ngDevMode ? [{ debugName: "pastTodayAppts" }] : (
      /* istanbul ignore next */
      []
    ));
    this.todayApptsFuture = computed(() => this.appointments().filter((a) => this.isToday(a) && !this.isPastToday(a)).sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()), ...ngDevMode ? [{ debugName: "todayApptsFuture" }] : (
      /* istanbul ignore next */
      []
    ));
    this.upcomingAppts = computed(() => this.appointments().filter((a) => !this.isOverdue(a) && !this.isToday(a)).sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()), ...ngDevMode ? [{ debugName: "upcomingAppts" }] : (
      /* istanbul ignore next */
      []
    ));
    this.canSave = computed(() => !!(this.formTitle().trim() && this.formDateTime()), ...ngDevMode ? [{ debugName: "canSave" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  // Section helpers
  isOverdue(appt) {
    const now = /* @__PURE__ */ new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const apptDate = new Date(appt.dateTime);
    return apptDate < today;
  }
  isToday(appt) {
    const now = /* @__PURE__ */ new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const apptDate = new Date(appt.dateTime);
    return apptDate >= todayStart && apptDate < now;
  }
  isPastToday(appt) {
    return this.isToday(appt) && new Date(appt.dateTime) < /* @__PURE__ */ new Date();
  }
  getSection(appt) {
    if (this.isOverdue(appt))
      return "overdue";
    if (this.isPastToday(appt))
      return "past-today";
    if (this.isToday(appt))
      return "today";
    return "upcoming";
  }
  ngOnInit() {
    this.loadAppointments();
  }
  ngOnDestroy() {
  }
  loadAppointments() {
    return __async(this, null, function* () {
      const childId = this.data.activeChildId();
      if (!childId)
        return;
      this.loading.set(true);
      try {
        const token = localStorage.getItem(this.data.AUTH_KEY);
        const response = yield fetch(`${this.data.API_URL}/appointments/child/${childId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
          const data = yield response.json();
          this.appointments.set(Array.isArray(data) ? data : []);
        }
      } catch (e) {
      } finally {
        this.loading.set(false);
      }
    });
  }
  openAddModal() {
    this.editingAppt.set(null);
    this.formTitle.set("");
    this.formDateTime.set("");
    this.formDoctorName.set("");
    this.formLocation.set("");
    this.formNotes.set("");
    this.saveError.set(null);
    this.showValidation.set(false);
    this.showModal.set(true);
  }
  openEditModal(appt) {
    this.editingAppt.set(appt);
    this.formTitle.set(appt.title);
    const dt = new Date(appt.dateTime);
    const pad = (n) => n.toString().padStart(2, "0");
    this.formDateTime.set(`${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}T${pad(dt.getHours())}:${pad(dt.getMinutes())}`);
    this.formDoctorName.set(appt.doctorName || "");
    this.formLocation.set(appt.location || "");
    this.formNotes.set(appt.notes || "");
    this.saveError.set(null);
    this.showValidation.set(false);
    this.showModal.set(true);
  }
  closeModal() {
    this.showModal.set(false);
    this.editingAppt.set(null);
    this.showValidation.set(false);
  }
  saveAppointment() {
    return __async(this, null, function* () {
      this.showValidation.set(true);
      if (!this.canSave())
        return;
      const childId = this.data.activeChildId();
      if (!childId)
        return;
      this.saving.set(true);
      this.saveError.set(null);
      const payload = {
        title: this.formTitle().trim(),
        dateTime: new Date(this.formDateTime()).toISOString(),
        doctorName: this.formDoctorName().trim() || void 0,
        location: this.formLocation().trim() || void 0,
        notes: this.formNotes().trim() || void 0
      };
      try {
        const token = localStorage.getItem(this.data.AUTH_KEY);
        const editing = this.editingAppt();
        const url = editing ? `${this.data.API_URL}/appointments/${editing.id}` : `${this.data.API_URL}/appointments/${childId}`;
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
        const list = [...this.appointments()];
        if (editing) {
          const idx = list.findIndex((a) => a.id === saved.id);
          if (idx >= 0)
            list[idx] = __spreadValues(__spreadValues({}, list[idx]), saved);
        } else {
          list.unshift(saved);
        }
        list.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
        this.appointments.set(list);
        this.closeModal();
      } catch (err) {
        this.saveError.set(err.message || this.i18n.t()["appointments.saveError"]);
      } finally {
        this.saving.set(false);
      }
    });
  }
  confirmDelete(appt) {
    this.deletingAppt.set(appt);
    this.showDeleteModal.set(true);
  }
  deleteAppointment() {
    return __async(this, null, function* () {
      const appt = this.deletingAppt();
      if (!appt)
        return;
      try {
        const token = localStorage.getItem(this.data.AUTH_KEY);
        const response = yield fetch(`${this.data.API_URL}/appointments/${appt.id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
          this.appointments.set(this.appointments().filter((a) => a.id !== appt.id));
        }
      } catch (e) {
      } finally {
        this.showDeleteModal.set(false);
        this.deletingAppt.set(null);
      }
    });
  }
  formatDateTime(dateTimeStr) {
    if (!dateTimeStr)
      return "";
    const d = new Date(dateTimeStr);
    const locale = this.i18n.isSq() ? "sq-AL" : "en-GB";
    const dateStr = d.toLocaleDateString(locale, { day: "2-digit", month: "short", year: "numeric" });
    const timeStr = d.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
    return `${dateStr} ${timeStr}`;
  }
  static {
    this.\u0275fac = function AppointmentsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AppointmentsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppointmentsComponent, selectors: [["app-appointments"]], decls: 18, vars: 9, consts: [["apptCard", ""], [1, "min-h-screen", "bg-gray-50", "pb-24"], [1, "bg-white", "border-b", "border-gray-100", "px-4", "pt-6", "pb-4"], [1, "flex", "items-center", "justify-between"], [1, "text-3xl", "font-extrabold", "text-gray-800"], [1, "text-slate-400", "text-sm", "mt-1", "font-medium"], [1, "bg-indigo-500", "hover:bg-indigo-600", "text-white", "px-5", "py-2.5", "rounded-2xl", "font-bold", "shadow-sm", "transition-all", "flex", "items-center", "gap-2", "text-sm", 3, "click"], ["name", "plus", 1, "text-inherit"], [1, "px-4", "mt-4"], [1, "px-4", "mt-4", "space-y-3"], [1, "flex", "flex-col", "items-center", "justify-center", "mt-20", "px-4"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4", "bg-black/40", "backdrop-blur-sm"], [1, "bg-red-50", "border", "border-red-200", "rounded-2xl", "p-4", "flex", "items-center", "gap-3"], [1, "w-10", "h-10", "bg-red-100", "rounded-full", "flex", "items-center", "justify-center", "flex-shrink-0"], ["name", "alert-circle", 1, "text-red-500", "w-5", "h-5"], [1, "flex-1"], [1, "font-bold", "text-red-700", "text-sm"], [1, "bg-white", "rounded-2xl", "p-5", "border", "border-gray-100", "animate-pulse"], [1, "flex", "gap-4"], [1, "w-12", "h-12", "rounded-xl", "bg-gray-200"], [1, "flex-1", "space-y-2"], [1, "h-4", "bg-gray-200", "rounded", "w-1/2"], [1, "h-3", "bg-gray-100", "rounded", "w-1/3"], ["width", "160", "height", "160", "viewBox", "0 0 160 160", "fill", "none", 1, "mb-6"], ["cx", "80", "cy", "80", "r", "60", "fill", "#F0FDF4"], ["x", "60", "y", "50", "width", "40", "height", "36", "rx", "4", "stroke", "#10B981", "stroke-width", "3", "fill", "none"], ["x1", "60", "y1", "62", "x2", "100", "y2", "62", "stroke", "#10B981", "stroke-width", "3"], ["x1", "60", "y1", "74", "x2", "100", "y2", "74", "stroke", "#10B981", "stroke-width", "3"], ["x1", "60", "y1", "86", "x2", "80", "y2", "86", "stroke", "#10B981", "stroke-width", "3"], ["d", "M80 95 L80 105 M75 100 L85 100", "stroke", "#10B981", "stroke-width", "3", "stroke-linecap", "round"], [1, "text-xl", "font-extrabold", "text-gray-700", "mb-2"], [1, "text-slate-400", "text-center", "mb-6", "text-sm"], [1, "bg-indigo-500", "hover:bg-indigo-600", "text-white", "px-6", "py-3", "rounded-2xl", "font-bold", "shadow-sm", "transition-all", "text-sm", 3, "click"], ["name", "plus", 1, "text-inherit", "inline", "w-4", "h-4", "mr-1"], [1, "px-4", "mt-6"], [1, "px-4", "mt-6", "mb-6"], [1, "flex", "items-center", "gap-2", "mb-3"], [1, "text-xs", "font-bold", "text-slate-400", "uppercase", "tracking-wider"], [1, "bg-red-100", "text-red-700", "text-xs", "font-semibold", "px-2", "py-0.5", "rounded-full"], [1, "space-y-3"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "bg-amber-100", "text-amber-700", "text-xs", "font-semibold", "px-2", "py-0.5", "rounded-full"], [1, "bg-slate-100", "text-slate-500", "text-xs", "font-semibold", "px-2", "py-0.5", "rounded-full"], [1, "bg-teal-100", "text-teal-700", "text-xs", "font-semibold", "px-2", "py-0.5", "rounded-full"], [1, "bg-white", "rounded-2xl", "shadow-sm", "overflow-hidden"], [1, "p-5"], [1, "flex", "items-start", "gap-4"], [1, "w-12", "h-12", "rounded-xl", "flex", "items-center", "justify-center", "flex-shrink-0"], ["name", "calendar", 1, "w-5", "h-5"], [1, "flex-1", "min-w-0"], [1, "flex", "items-start", "justify-between", "gap-2"], [1, "font-bold", "text-gray-800", "text-base", "truncate", 3, "title"], [1, "text-xs", "font-semibold", "px-2.5", "py-1", "rounded-full", "bg-red-100", "text-red-700", "flex-shrink-0"], [1, "text-xs", "font-semibold", "px-2.5", "py-1", "rounded-full", "bg-amber-100", "text-amber-700", "flex-shrink-0"], [1, "text-xs", "font-semibold", "px-2.5", "py-1", "rounded-full", "bg-teal-100", "text-teal-700", "flex-shrink-0"], [1, "flex", "items-center", "gap-2", "mt-1.5", "text-sm", "text-slate-500"], ["name", "clock", 1, "w-3.5", "h-3.5", "text-slate-400", "flex-shrink-0"], [1, "flex", "items-center", "gap-2", "mt-1", "text-xs", "text-slate-400"], [1, "mt-3", "text-xs", "text-slate-500", "bg-slate-50", "rounded-xl", "p-3"], [1, "flex", "items-center", "gap-2", "mt-4"], [1, "flex-1", "py-2", "rounded-xl", "text-xs", "font-semibold", "bg-slate-50", "hover:bg-slate-100", "text-slate-600", "transition-all", "flex", "items-center", "justify-center", "gap-1.5", 3, "click"], ["name", "pencil", 1, "w-3.5", "h-3.5"], [1, "flex-1", "py-2", "rounded-xl", "text-xs", "font-semibold", "bg-red-50", "hover:bg-red-100", "text-red-600", "transition-all", "flex", "items-center", "justify-center", "gap-1.5", 3, "click"], ["name", "trash-2", 1, "w-3.5", "h-3.5"], ["name", "stethoscope", 1, "w-3.5", "h-3.5", "flex-shrink-0"], ["name", "map-pin", 1, "w-3.5", "h-3.5", "flex-shrink-0"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4", "bg-black/40", "backdrop-blur-sm", 3, "click"], [1, "bg-white", "rounded-3xl", "shadow-2xl", "w-full", "max-w-md", "max-h-[90vh]", "overflow-y-auto", 3, "click"], [1, "px-6", "pt-6", "pb-4", "border-b", "border-gray-100", "flex", "items-center", "justify-between"], [1, "text-xl", "font-extrabold", "text-gray-800"], [1, "p-2", "rounded-xl", "hover:bg-gray-100", "transition-colors", 3, "click"], ["name", "x", 1, "w-5", "h-5", "text-slate-400"], [1, "p-6", "space-y-5"], [1, "block", "text-xs", "font-bold", "text-indigo-700", "mb-2", "uppercase", "tracking-wider"], [1, "text-red-400", "normal-case", "font-normal", "text-xs", "ml-1"], ["type", "text", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border-2", "transition-all", "text-gray-800", "text-sm", "font-medium", 3, "ngModelChange", "blur", "ngModel", "placeholder"], ["type", "datetime-local", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border-2", "transition-all", "text-gray-800", "text-sm", 3, "ngModelChange", "ngModel"], [1, "text-slate-400", "normal-case", "font-normal", "text-xs", "ml-1"], ["type", "text", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border-2", "border-slate-200", "bg-slate-50", "focus:bg-white", "focus:ring-4", "focus:ring-indigo-500/10", "focus:border-indigo-500", "outline-none", "transition-all", "text-gray-800", "text-sm", "font-medium", 3, "ngModelChange", "ngModel", "placeholder"], ["rows", "2", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border-2", "border-slate-200", "bg-slate-50", "focus:bg-white", "focus:ring-4", "focus:ring-indigo-500/10", "focus:border-indigo-500", "outline-none", "transition-all", "text-gray-800", "text-sm", "resize-none", 3, "ngModelChange", "ngModel", "placeholder"], [1, "p-3", "bg-red-50", "border", "border-red-200", "rounded-xl", "text-red-600", "text-sm", "font-semibold"], [1, "px-6", "pb-6", "flex", "gap-3"], [1, "flex-1", "py-3.5", "rounded-2xl", "font-bold", "text-slate-600", "bg-slate-100", "hover:bg-slate-200", "transition-all", "text-sm", 3, "click"], [1, "flex-1", "py-3.5", "rounded-2xl", "font-bold", "text-white", "bg-indigo-500", "hover:bg-indigo-600", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-all", "text-sm", "flex", "items-center", "justify-center", "gap-2", 3, "click", "disabled"], ["name", "loader-2", 1, "w-4", "h-4", "animate-spin"], ["name", "check", 1, "w-4", "h-4"], [1, "bg-white", "rounded-3xl", "shadow-2xl", "w-full", "max-w-sm", "p-6", 3, "click"], [1, "w-14", "h-14", "bg-red-100", "rounded-2xl", "flex", "items-center", "justify-center", "mx-auto", "mb-4"], ["name", "trash-2", 1, "text-red-500", "w-6", "h-6"], [1, "text-lg", "font-extrabold", "text-gray-800", "text-center", "mb-2"], [1, "text-slate-500", "text-sm", "text-center", "mb-6", "font-medium"], [1, "flex", "gap-3"], [1, "flex-1", "py-3", "rounded-2xl", "font-bold", "text-slate-600", "bg-slate-100", "hover:bg-slate-200", "transition-all", "text-sm", 3, "click"], [1, "flex-1", "py-3", "rounded-2xl", "font-bold", "text-white", "bg-red-500", "hover:bg-red-600", "transition-all", "text-sm", 3, "click"]], template: function AppointmentsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div")(4, "h1", 4);
        \u0275\u0275text(5);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(6, AppointmentsComponent_Conditional_6_Template, 2, 1, "p", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "button", 6);
        \u0275\u0275listener("click", function AppointmentsComponent_Template_button_click_7_listener() {
          return ctx.openAddModal();
        });
        \u0275\u0275element(8, "lucide-icon", 7);
        \u0275\u0275text(9);
        \u0275\u0275elementEnd()()();
        \u0275\u0275conditionalCreate(10, AppointmentsComponent_Conditional_10_Template, 9, 9, "div", 8);
        \u0275\u0275conditionalCreate(11, AppointmentsComponent_Conditional_11_Template, 3, 1, "div", 9);
        \u0275\u0275conditionalCreate(12, AppointmentsComponent_Conditional_12_Template, 15, 3, "div", 10);
        \u0275\u0275conditionalCreate(13, AppointmentsComponent_Conditional_13_Template, 4, 4);
        \u0275\u0275elementEnd();
        \u0275\u0275template(14, AppointmentsComponent_ng_template_14_Template, 26, 51, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
        \u0275\u0275conditionalCreate(16, AppointmentsComponent_Conditional_16_Template, 45, 38, "div", 11);
        \u0275\u0275conditionalCreate(17, AppointmentsComponent_Conditional_17_Template, 13, 4, "div", 11);
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.i18n.t()["appointments.title"]);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.activeChild() ? 6 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["appointments.add"], " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.overdueCount() > 0 ? 10 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.loading() ? 11 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.loading() && ctx.appointments().length === 0 ? 12 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.loading() && ctx.appointments().length > 0 ? 13 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.showModal() ? 16 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.showDeleteModal() ? 17 : -1);
      }
    }, dependencies: [CommonModule, NgTemplateOutlet, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, LucideAngularModule, LucideAngularComponent, ReplacePipe], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppointmentsComponent, [{
    type: Component,
    args: [{ selector: "app-appointments", imports: [CommonModule, FormsModule, LucideAngularModule, ReplacePipe], template: `
    <div class="min-h-screen bg-gray-50 pb-24">

      <!-- Header -->
      <div class="bg-white border-b border-gray-100 px-4 pt-6 pb-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-extrabold text-gray-800">{{ i18n.t()['appointments.title'] }}</h1>
            @if (activeChild()) {
              <p class="text-slate-400 text-sm mt-1 font-medium">{{ activeChild()?.name }}</p>
            }
          </div>
          <button (click)="openAddModal()"
            class="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-2xl font-bold shadow-sm transition-all flex items-center gap-2 text-sm">
            <lucide-icon name="plus" class="text-inherit"></lucide-icon>
            {{ i18n.t()['appointments.add'] }}
          </button>
        </div>
      </div>

      <!-- Overdue Banner -->
      @if (overdueCount() > 0) {
        <div class="px-4 mt-4">
          <div class="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
            <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <lucide-icon name="alert-circle" class="text-red-500 w-5 h-5"></lucide-icon>
            </div>
            <div class="flex-1">
              <p class="font-bold text-red-700 text-sm">
                {{ overdueCount() === 1
                  ? (i18n.t()['appointments.overdueCount'] | replace:'{n}':overdueCount()!)
                  : (i18n.t()['appointments.overdueCountPlural'] | replace:'{n}':overdueCount()!) }}
              </p>
            </div>
          </div>
        </div>
      }

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

      <!-- Empty State (no appointments at all) -->
      @if (!loading() && appointments().length === 0) {
        <div class="flex flex-col items-center justify-center mt-20 px-4">
          <svg width="160" height="160" viewBox="0 0 160 160" fill="none" class="mb-6">
            <circle cx="80" cy="80" r="60" fill="#F0FDF4"/>
            <rect x="60" y="50" width="40" height="36" rx="4" stroke="#10B981" stroke-width="3" fill="none"/>
            <line x1="60" y1="62" x2="100" y2="62" stroke="#10B981" stroke-width="3"/>
            <line x1="60" y1="74" x2="100" y2="74" stroke="#10B981" stroke-width="3"/>
            <line x1="60" y1="86" x2="80" y2="86" stroke="#10B981" stroke-width="3"/>
            <path d="M80 95 L80 105 M75 100 L85 100" stroke="#10B981" stroke-width="3" stroke-linecap="round"/>
          </svg>
          <h3 class="text-xl font-extrabold text-gray-700 mb-2">{{ i18n.t()['appointments.empty'] }}</h3>
          <p class="text-slate-400 text-center mb-6 text-sm">{{ i18n.t()['appointments.emptyHint'] }}</p>
          <button (click)="openAddModal()"
            class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-sm transition-all text-sm">
            <lucide-icon name="plus" class="text-inherit inline w-4 h-4 mr-1"></lucide-icon>
            {{ i18n.t()['appointments.addFirst'] }}
          </button>
        </div>
      }

      <!-- Appointment Sections -->
      @if (!loading() && appointments().length > 0) {

        <!-- OVERDUE Section -->
        @if (overdueCount() > 0) {
          <div class="px-4 mt-4">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {{ i18n.t()['appointments.section.overdue'] }}
              </span>
              <span class="bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full">{{ overdueCount() }}</span>
            </div>
            <div class="space-y-3">
              @for (appt of overdueAppts(); track appt.id) {
                <ng-container *ngTemplateOutlet="apptCard; context: { appt: appt, section: 'overdue' }"></ng-container>
              }
            </div>
          </div>
        }

        <!-- TODAY Section -->
        @if (todayCount() > 0) {
          <div class="px-4 mt-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {{ i18n.t()['appointments.section.today'] }}
              </span>
              <span class="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full">{{ todayCount() }}</span>
            </div>
            <div class="space-y-3">
              @for (appt of todayApptsFuture(); track appt.id) {
                <ng-container *ngTemplateOutlet="apptCard; context: { appt: appt, section: getSection(appt) }"></ng-container>
              }
            </div>
          </div>
        }

        <!-- PAST Section -->
        @if (pastTodayAppts().length > 0) {
          <div class="px-4 mt-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {{ i18n.t()['appointments.section.past'] }}
              </span>
              <span class="bg-slate-100 text-slate-500 text-xs font-semibold px-2 py-0.5 rounded-full">{{ pastTodayAppts().length }}</span>
            </div>
            <div class="space-y-3">
              @for (appt of pastTodayAppts(); track appt.id) {
                <ng-container *ngTemplateOutlet="apptCard; context: { appt: appt, section: 'past-today' }"></ng-container>
              }
            </div>
          </div>
        }

        <!-- UPCOMING Section -->
        @if (upcomingCount() > 0) {
          <div class="px-4 mt-6 mb-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {{ i18n.t()['appointments.section.upcoming'] }}
              </span>
              <span class="bg-teal-100 text-teal-700 text-xs font-semibold px-2 py-0.5 rounded-full">{{ upcomingCount() }}</span>
            </div>
            <div class="space-y-3">
              @for (appt of upcomingAppts(); track appt.id) {
                <ng-container *ngTemplateOutlet="apptCard; context: { appt: appt, section: getSection(appt) }"></ng-container>
              }
            </div>
          </div>
        }

      }
    </div>

    <!-- Appointment Card Template -->
    <ng-template #apptCard let-appt="appt" let-section="section">
      <div class="bg-white rounded-2xl shadow-sm overflow-hidden"
           [class.border-l-4]="true"
           [class.border-red-400]="section === 'overdue'"
           [class.border-amber-400]="section === 'today'"
           [class.border-teal-400]="section === 'upcoming'"
           [class.bg-red-50/30]="section === 'overdue'"
           [class.bg-amber-50/30]="section === 'today'"
           [class.bg-teal-50/30]="section === 'upcoming'"
           [class.border-slate-300]="section === 'past-today'"
           [class.bg-slate-50]="section === 'past-today'"
           [class.border]="section === 'today' || section === 'overdue' || section === 'past-today'"
           [class.border-red-200]="section === 'overdue'"
           [class.border-amber-200]="section === 'today'"
           [class.border-teal-200]="section === 'upcoming'">

        <div class="p-5">
          <div class="flex items-start gap-4">
            <!-- Icon -->
            <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                 [class.bg-red-100]="section === 'overdue'"
                 [class.bg-amber-100]="section === 'today'"
                 [class.bg-teal-100]="section === 'upcoming'"
                 [class.bg-slate-100]="section === 'past-today'">
              <lucide-icon name="calendar"
                [class.text-red-500]="section === 'overdue'"
                [class.text-amber-500]="section === 'today'"
                [class.text-teal-500]="section === 'upcoming'"
                [class.text-slate-400]="section === 'past-today'"
                class="w-5 h-5"></lucide-icon>
            </div>

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2">
                <h3 class="font-bold text-gray-800 text-base truncate" [title]="appt.title">{{ appt.title }}</h3>
                @if (section === 'overdue') {
                  <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-100 text-red-700 flex-shrink-0">
                    {{ i18n.t()['appointments.overdue'] }}
                  </span>
                } @else if (section === 'today') {
                  <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 flex-shrink-0">
                    {{ i18n.t()['appointments.today'] }}
                  </span>
                } @else if (section === 'upcoming') {
                  <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-100 text-teal-700 flex-shrink-0">
                    {{ i18n.t()['appointments.upcoming'] }}
                  </span>
                }
              </div>

              <!-- Date & Time -->
              <div class="flex items-center gap-2 mt-1.5 text-sm text-slate-500">
                <lucide-icon name="clock" class="w-3.5 h-3.5 text-slate-400 flex-shrink-0"></lucide-icon>
                <span>{{ formatDateTime(appt.dateTime) }}</span>
              </div>

              <!-- Doctor -->
              @if (appt.doctorName) {
                <div class="flex items-center gap-2 mt-1 text-xs text-slate-400">
                  <lucide-icon name="stethoscope" class="w-3.5 h-3.5 flex-shrink-0"></lucide-icon>
                  <span>{{ appt.doctorName }}</span>
                </div>
              }

              <!-- Location -->
              @if (appt.location) {
                <div class="flex items-center gap-2 mt-1 text-xs text-slate-400">
                  <lucide-icon name="map-pin" class="w-3.5 h-3.5 flex-shrink-0"></lucide-icon>
                  <span>{{ appt.location }}</span>
                </div>
              }
            </div>
          </div>

          <!-- Notes -->
          @if (appt.notes) {
            <div class="mt-3 text-xs text-slate-500 bg-slate-50 rounded-xl p-3">
              {{ appt.notes }}
            </div>
          }

          <!-- Actions -->
          <div class="flex items-center gap-2 mt-4">
            <button (click)="openEditModal(appt)"
              class="flex-1 py-2 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-600 transition-all flex items-center justify-center gap-1.5">
              <lucide-icon name="pencil" class="w-3.5 h-3.5"></lucide-icon>
              {{ i18n.t()['appointments.edit'] }}
            </button>
            <button (click)="confirmDelete(appt)"
              class="flex-1 py-2 rounded-xl text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 transition-all flex items-center justify-center gap-1.5">
              <lucide-icon name="trash-2" class="w-3.5 h-3.5"></lucide-icon>
              {{ i18n.t()['appointments.delete'] }}
            </button>
          </div>
        </div>
      </div>
    </ng-template>

    <!-- Add/Edit Modal -->
    @if (showModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
           (click)="closeModal()">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
             (click)="$event.stopPropagation()">

          <!-- Modal Header -->
          <div class="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
            <h2 class="text-xl font-extrabold text-gray-800">
              {{ editingAppt() ? i18n.t()['appointments.editAppt'] : i18n.t()['appointments.addAppt'] }}
            </h2>
            <button (click)="closeModal()" class="p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <lucide-icon name="x" class="w-5 h-5 text-slate-400"></lucide-icon>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6 space-y-5">
            <!-- Title -->
            <div>
              <label class="block text-xs font-bold text-indigo-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['appointments.titleLabel'] }}
                <span class="text-red-400 normal-case font-normal text-xs ml-1">*</span>
              </label>
              <input type="text" [(ngModel)]="formTitle"
                class="w-full px-4 py-3 rounded-2xl border-2 transition-all text-gray-800 text-sm font-medium"
                [class.border-red-300]="formTitle().trim() === '' && showValidation()"
                [class.border-slate-200]="!(formTitle().trim() === '' && showValidation())"
                [class.bg-white]="!(formTitle().trim() === '' && showValidation())"
                [class.bg-red-50]="formTitle().trim() === '' && showValidation()"
                [placeholder]="i18n.t()['appointments.titlePlaceholder']"
                (blur)="showValidation.set(true)">
            </div>

            <!-- Date & Time -->
            <div>
              <label class="block text-xs font-bold text-indigo-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['appointments.dateTime'] }}
                <span class="text-red-400 normal-case font-normal text-xs ml-1">*</span>
              </label>
              <input type="datetime-local" [(ngModel)]="formDateTime"
                class="w-full px-4 py-3 rounded-2xl border-2 transition-all text-gray-800 text-sm"
                [class.border-red-300]="formDateTime() === '' && showValidation()"
                [class.border-slate-200]="!(formDateTime() === '' && showValidation())"
                [class.bg-white]="!(formDateTime() === '' && showValidation())"
                [class.bg-red-50]="formDateTime() === '' && showValidation()">
            </div>

            <!-- Doctor -->
            <div>
              <label class="block text-xs font-bold text-indigo-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['appointments.doctor'] }}
                <span class="text-slate-400 normal-case font-normal text-xs ml-1">({{ i18n.t()['appointments.optional'] }})</span>
              </label>
              <input type="text" [(ngModel)]="formDoctorName"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-gray-800 text-sm font-medium"
                [placeholder]="i18n.t()['appointments.doctorPlaceholder']">
            </div>

            <!-- Location -->
            <div>
              <label class="block text-xs font-bold text-indigo-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['appointments.location'] }}
                <span class="text-slate-400 normal-case font-normal text-xs ml-1">({{ i18n.t()['appointments.optional'] }})</span>
              </label>
              <input type="text" [(ngModel)]="formLocation"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-gray-800 text-sm font-medium"
                [placeholder]="i18n.t()['appointments.locationPlaceholder']">
            </div>

            <!-- Notes -->
            <div>
              <label class="block text-xs font-bold text-indigo-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['appointments.notes'] }}
                <span class="text-slate-400 normal-case font-normal text-xs ml-1">({{ i18n.t()['appointments.optional'] }})</span>
              </label>
              <textarea [(ngModel)]="formNotes" rows="2"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-gray-800 text-sm resize-none"
                [placeholder]="i18n.t()['appointments.notesPlaceholder']"></textarea>
            </div>

            <!-- Error -->
            @if (saveError()) {
              <div class="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold">
                {{ saveError() }}
              </div>
            }
          </div>

          <!-- Modal Footer -->
          <div class="px-6 pb-6 flex gap-3">
            <button (click)="closeModal()"
              class="flex-1 py-3.5 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all text-sm">
              {{ i18n.t()['appointments.cancel'] }}
            </button>
            <button (click)="saveAppointment()"
              [disabled]="saving() || !canSave()"
              class="flex-1 py-3.5 rounded-2xl font-bold text-white bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm flex items-center justify-center gap-2">
              @if (saving()) {
                <lucide-icon name="loader-2" class="w-4 h-4 animate-spin"></lucide-icon>
                {{ i18n.t()['appointments.saving'] }}
              } @else {
                <lucide-icon name="check" class="w-4 h-4"></lucide-icon>
                {{ i18n.t()['appointments.save'] }}
              }
            </button>
          </div>
        </div>
      </div>
    }

    <!-- Delete Confirmation Modal -->
    @if (showDeleteModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
           (click)="showDeleteModal.set(false)">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6"
             (click)="$event.stopPropagation()">
          <div class="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <lucide-icon name="trash-2" class="text-red-500 w-6 h-6"></lucide-icon>
          </div>
          <h3 class="text-lg font-extrabold text-gray-800 text-center mb-2">
            {{ i18n.t()['appointments.deleteConfirmTitle'] }}
          </h3>
          <p class="text-slate-500 text-sm text-center mb-6 font-medium">"{{ deletingAppt()?.title }}"</p>
          <div class="flex gap-3">
            <button (click)="showDeleteModal.set(false)"
              class="flex-1 py-3 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all text-sm">
              {{ i18n.t()['appointments.cancel'] }}
            </button>
            <button (click)="deleteAppointment()"
              class="flex-1 py-3 rounded-2xl font-bold text-white bg-red-500 hover:bg-red-600 transition-all text-sm">
              {{ i18n.t()['appointments.delete'] }}
            </button>
          </div>
        </div>
      </div>
    }
  ` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppointmentsComponent, { className: "AppointmentsComponent", filePath: "src/app/components/appointments/appointments.component.ts", lineNumber: 420 });
})();
export {
  AppointmentsComponent,
  ReplacePipe
};
//# sourceMappingURL=chunk-BHAZPAIC.js.map
