import {
  CommonModule,
  DefaultValueAccessor,
  FormsModule,
  LucideAngularComponent,
  LucideAngularModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  ɵNgSelectMultipleOption
} from "./chunk-IFHIJ3FQ.js";
import {
  DataService,
  I18nService,
  NotificationService
} from "./chunk-J6KXBRJB.js";
import {
  Component,
  EventEmitter,
  Injectable,
  Output,
  __async,
  effect,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-SFGRG2UU.js";

// src/app/services/theme.service.ts
var ThemeService = class _ThemeService {
  constructor() {
    this.STORAGE_KEY = "kiddok_theme";
    this.darkMode = signal(false, ...ngDevMode ? [{ debugName: "darkMode" }] : (
      /* istanbul ignore next */
      []
    ));
    this.accentColor = signal("purple", ...ngDevMode ? [{ debugName: "accentColor" }] : (
      /* istanbul ignore next */
      []
    ));
    this.fontSize = signal("medium", ...ngDevMode ? [{ debugName: "fontSize" }] : (
      /* istanbul ignore next */
      []
    ));
    this.load();
    effect(() => this.applyTheme());
  }
  load() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        const cfg = JSON.parse(raw);
        this.darkMode.set(cfg.darkMode ?? false);
        this.accentColor.set(cfg.accentColor ?? "purple");
        this.fontSize.set(cfg.fontSize ?? "medium");
      }
    } catch (e) {
    }
  }
  persist() {
    try {
      const cfg = {
        darkMode: this.darkMode(),
        accentColor: this.accentColor(),
        fontSize: this.fontSize()
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cfg));
    } catch (e) {
    }
  }
  applyTheme() {
    const root = document.documentElement;
    if (this.darkMode()) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    root.setAttribute("data-accent", this.accentColor());
    root.setAttribute("data-font-size", this.fontSize());
  }
  toggleDarkMode() {
    this.darkMode.update((v) => !v);
    this.persist();
  }
  setDarkMode(value) {
    this.darkMode.set(value);
    this.persist();
  }
  setAccentColor(color) {
    this.accentColor.set(color);
    this.persist();
  }
  setFontSize(size) {
    this.fontSize.set(size);
    this.persist();
  }
  static {
    this.\u0275fac = function ThemeService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ThemeService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ThemeService, factory: _ThemeService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThemeService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// src/app/components/settings/settings-page.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.value;
function SettingsPageComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275element(1, "lucide-icon", 59);
    \u0275\u0275elementStart(2, "p", 60);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["settings.saved"]);
  }
}
function SettingsPageComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 13);
  }
}
function SettingsPageComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 14);
  }
}
function SettingsPageComponent_For_47_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 63);
  }
  if (rf & 2) {
    const color_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275styleProp("color", color_r3.checkColor);
  }
}
function SettingsPageComponent_For_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 61);
    \u0275\u0275listener("click", function SettingsPageComponent_For_47_Template_button_click_0_listener() {
      const color_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.themeSvc.setAccentColor(color_r3.id));
    });
    \u0275\u0275conditionalCreate(1, SettingsPageComponent_For_47_Conditional_1_Template, 1, 2, "lucide-icon", 62);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const color_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r0.themeSvc.accentColor() === color_r3.id ? "border-2 scale-110" : "border-transparent hover:scale-105");
    \u0275\u0275styleProp("background-color", color_r3.bg)("border-color", ctx_r0.themeSvc.accentColor() === color_r3.id ? color_r3.border : "transparent")("border-color", ctx_r0.themeSvc.accentColor() === color_r3.id ? color_r3.border : "transparent");
    \u0275\u0275property("title", ctx_r0.i18n.t()["settings.theme.color." + color_r3.id]);
    \u0275\u0275attribute("aria-label", ctx_r0.i18n.t()["settings.theme.color." + color_r3.id]);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.themeSvc.accentColor() === color_r3.id ? 1 : -1);
  }
}
function SettingsPageComponent_For_55_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 64);
    \u0275\u0275listener("click", function SettingsPageComponent_For_55_Template_button_click_0_listener() {
      const size_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.themeSvc.setFontSize(size_r5.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const size_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r0.themeSvc.fontSize() === size_r5.id ? "px-5 py-2.5 rounded-full bg-purple-500 text-white font-bold text-sm shadow-sm transition-all" : "px-5 py-2.5 rounded-full text-slate-500 dark:text-slate-300 font-medium text-sm hover:text-slate-700 dark:hover:text-slate-100 transition-all");
    \u0275\u0275attribute("aria-label", ctx_r0.i18n.t()["settings.theme.size." + size_r5.id]);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["settings.theme.size." + size_r5.id], " ");
  }
}
function SettingsPageComponent_Conditional_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 35);
  }
}
function SettingsPageComponent_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 35);
  }
}
function SettingsPageComponent_Conditional_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.locale() === "sq" ? "Shfletuesi juaj nuk mb\xEBshtet njoftimet." : "Your browser does not support notifications.", " ");
  }
}
function SettingsPageComponent_Conditional_75_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 66);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["settings.notifications.browserDenied"], " ");
  }
}
function SettingsPageComponent_Conditional_75_Conditional_9_For_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 72);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const h_r8 = ctx.$implicit;
    \u0275\u0275property("value", h_r8.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(h_r8.label);
  }
}
function SettingsPageComponent_Conditional_75_Conditional_9_For_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 72);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const h_r9 = ctx.$implicit;
    \u0275\u0275property("value", h_r9.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(h_r9.label);
  }
}
function SettingsPageComponent_Conditional_75_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div")(2, "p", 19);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 20);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 65);
    \u0275\u0275listener("click", function SettingsPageComponent_Conditional_75_Conditional_9_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.notifSvc.updatePrefs({ feverAlerts: !ctx_r0.notifSvc.feverAlerts() }));
    });
    \u0275\u0275element(7, "span", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 18)(9, "div")(10, "p", 19);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 20);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "button", 65);
    \u0275\u0275listener("click", function SettingsPageComponent_Conditional_75_Conditional_9_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.notifSvc.updatePrefs({ vaccineAlerts: !ctx_r0.notifSvc.vaccineAlerts() }));
    });
    \u0275\u0275element(15, "span", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 67)(17, "p", 24);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "p", 68);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 26)(22, "div", 69)(23, "label", 70);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "select", 71);
    \u0275\u0275listener("change", function SettingsPageComponent_Conditional_75_Conditional_9_Template_select_change_25_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.notifSvc.updatePrefs({ dndStart: +$event.target.value }));
    });
    \u0275\u0275repeaterCreate(26, SettingsPageComponent_Conditional_75_Conditional_9_For_27_Template, 2, 2, "option", 72, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "span", 73);
    \u0275\u0275text(29, "\u2014");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 69)(31, "label", 70);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "select", 71);
    \u0275\u0275listener("change", function SettingsPageComponent_Conditional_75_Conditional_9_Template_select_change_33_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.notifSvc.updatePrefs({ dndEnd: +$event.target.value }));
    });
    \u0275\u0275repeaterCreate(34, SettingsPageComponent_Conditional_75_Conditional_9_For_35_Template, 2, 2, "option", 72, _forTrack1);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["settings.notifications.feverAlerts"]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["settings.notifications.feverAlertsDesc"]);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.notifSvc.feverAlerts() ? "bg-rose-500" : "bg-slate-200 dark:bg-slate-600");
    \u0275\u0275attribute("aria-checked", ctx_r0.notifSvc.feverAlerts());
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.notifSvc.feverAlerts() ? "translate-x-6" : "translate-x-1");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["settings.notifications.vaccineAlerts"]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["settings.notifications.vaccineAlertsDesc"]);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.notifSvc.vaccineAlerts() ? "bg-teal-500" : "bg-slate-200 dark:bg-slate-600");
    \u0275\u0275attribute("aria-checked", ctx_r0.notifSvc.vaccineAlerts());
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.notifSvc.vaccineAlerts() ? "translate-x-6" : "translate-x-1");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["settings.notifications.dnd"]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["settings.notifications.dndDesc"]);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["settings.notifications.dndFrom"]);
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r0.notifSvc.dndStart());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.hours);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["settings.notifications.dndTo"]);
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r0.notifSvc.dndEnd());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.hours);
  }
}
function SettingsPageComponent_Conditional_75_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div")(2, "p", 19);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 20);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 65);
    \u0275\u0275listener("click", function SettingsPageComponent_Conditional_75_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggleNotifications());
    });
    \u0275\u0275element(7, "span", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, SettingsPageComponent_Conditional_75_Conditional_8_Template, 2, 1, "div", 66);
    \u0275\u0275conditionalCreate(9, SettingsPageComponent_Conditional_75_Conditional_9_Template, 36, 20);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["settings.notifications.enable"]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["settings.notifications.enableDesc"]);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.notifSvc.enabled() ? "bg-indigo-500" : "bg-slate-200 dark:bg-slate-600");
    \u0275\u0275attribute("aria-checked", ctx_r0.notifSvc.enabled());
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.notifSvc.enabled() ? "translate-x-6" : "translate-x-1");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.notifSvc.permissionLevel === "denied" && !ctx_r0.notifSvc.enabled() ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.notifSvc.enabled() ? 9 : -1);
  }
}
function SettingsPageComponent_Conditional_82_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["settings.noChildren"], " ");
  }
}
function SettingsPageComponent_Conditional_83_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 79)(1, "span", 78);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 80);
    \u0275\u0275listener("click", function SettingsPageComponent_Conditional_83_For_2_Conditional_7_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r10);
      const child_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.confirmDeleteChild(child_r11.id));
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 81);
    \u0275\u0275listener("click", function SettingsPageComponent_Conditional_83_For_2_Conditional_7_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.cancelDelete());
    });
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["settings.children.confirmDelete"]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["settings.confirm"], " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["settings.cancel"], " ");
  }
}
function SettingsPageComponent_Conditional_83_For_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 69)(1, "button", 82);
    \u0275\u0275listener("click", function SettingsPageComponent_Conditional_83_For_2_Conditional_8_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r12);
      const child_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openEditChild.emit(child_r11));
    });
    \u0275\u0275element(2, "lucide-icon", 83);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 84);
    \u0275\u0275listener("click", function SettingsPageComponent_Conditional_83_For_2_Conditional_8_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r12);
      const child_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.requestDelete(child_r11.id));
    });
    \u0275\u0275element(5, "lucide-icon", 85);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["settings.children.edit"], " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["settings.children.delete"], " ");
  }
}
function SettingsPageComponent_Conditional_83_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 74);
    \u0275\u0275element(1, "img", 75);
    \u0275\u0275elementStart(2, "div", 76)(3, "p", 77);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 78);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, SettingsPageComponent_Conditional_83_For_2_Conditional_7_Template, 7, 3, "div", 79)(8, SettingsPageComponent_Conditional_83_For_2_Conditional_8_Template, 7, 2, "div", 69);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const child_r11 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("src", child_r11.avatarUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(child_r11.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatDate(child_r11.dateOfBirth));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.deleteConfirmId() === child_r11.id ? 7 : 8);
  }
}
function SettingsPageComponent_Conditional_83_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275repeaterCreate(1, SettingsPageComponent_Conditional_83_For_2_Template, 9, 4, "div", 74, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.dataService.children());
  }
}
function SettingsPageComponent_Conditional_91_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 48)(1, "p", 86);
    \u0275\u0275element(2, "lucide-icon", 87);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 88)(5, "button", 89);
    \u0275\u0275listener("click", function SettingsPageComponent_Conditional_91_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.confirmClearAllData());
    });
    \u0275\u0275element(6, "lucide-icon", 90);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 91);
    \u0275\u0275listener("click", function SettingsPageComponent_Conditional_91_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cancelClearAllData());
    });
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["settings.data.clearConfirm"], " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["settings.confirm"], " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["settings.cancel"], " ");
  }
}
function SettingsPageComponent_Conditional_96_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 92);
    \u0275\u0275listener("click", function SettingsPageComponent_Conditional_96_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.requestClearAllData());
    });
    \u0275\u0275element(1, "lucide-icon", 85);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["settings.data.clear"], " ");
  }
}
var SettingsPageComponent = class _SettingsPageComponent {
  constructor() {
    this.dataService = inject(DataService);
    this.i18n = inject(I18nService);
    this.notifSvc = inject(NotificationService);
    this.themeSvc = inject(ThemeService);
    this.openEditChild = new EventEmitter();
    this.openAddChild = new EventEmitter();
    this.parentForm = signal({ name: "", surname: "", phone: "" }, ...ngDevMode ? [{ debugName: "parentForm" }] : (
      /* istanbul ignore next */
      []
    ));
    this.saveSuccess = signal(false, ...ngDevMode ? [{ debugName: "saveSuccess" }] : (
      /* istanbul ignore next */
      []
    ));
    this.isSaving = signal(false, ...ngDevMode ? [{ debugName: "isSaving" }] : (
      /* istanbul ignore next */
      []
    ));
    this.showClearConfirm = signal(false, ...ngDevMode ? [{ debugName: "showClearConfirm" }] : (
      /* istanbul ignore next */
      []
    ));
    this.deleteConfirmId = signal(null, ...ngDevMode ? [{ debugName: "deleteConfirmId" }] : (
      /* istanbul ignore next */
      []
    ));
    this.hours = Array.from({ length: 24 }, (_, i) => ({
      value: i,
      label: `${i.toString().padStart(2, "0")}:00`
    }));
    this.accentColors = [
      { id: "purple", bg: "#8b5cf6", border: "#7c3aed", checkColor: "#ffffff" },
      { id: "blue", bg: "#3b82f6", border: "#2563eb", checkColor: "#ffffff" },
      { id: "green", bg: "#22c55e", border: "#16a34a", checkColor: "#ffffff" },
      { id: "orange", bg: "#f97316", border: "#ea580c", checkColor: "#ffffff" }
    ];
    this.fontSizes = [
      { id: "small" },
      { id: "medium" },
      { id: "large" }
    ];
  }
  ngOnInit() {
    this.loadParentProfile();
  }
  loadParentProfile() {
    const profile = this.dataService.parentProfile();
    this.parentForm.set({ name: profile.name, surname: profile.surname, phone: profile.phone });
  }
  saveParentProfile() {
    return __async(this, null, function* () {
      this.isSaving.set(true);
      try {
        yield this.dataService.updateParentProfile(this.parentForm());
        this.saveSuccess.set(true);
        setTimeout(() => this.saveSuccess.set(false), 3e3);
      } finally {
        this.isSaving.set(false);
      }
    });
  }
  setLocale(locale) {
    this.i18n.setLocale(locale);
  }
  toggleNotifications() {
    return __async(this, null, function* () {
      yield this.notifSvc.toggleEnabled();
    });
  }
  activeClass(locale) {
    const isActive = this.i18n.locale() === locale;
    return isActive ? "flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-indigo-500 text-white font-bold text-sm shadow-sm transition-all" : "flex items-center gap-1.5 px-5 py-2.5 rounded-full text-stone-500 dark:text-slate-300 font-medium text-sm hover:text-stone-700 dark:hover:text-slate-100 transition-all";
  }
  formatDate(dob) {
    if (!dob)
      return "";
    try {
      const date = new Date(dob);
      const d = date.getDate().toString().padStart(2, "0");
      const m = (date.getMonth() + 1).toString().padStart(2, "0");
      const y = date.getFullYear();
      return `${d}/${m}/${y}`;
    } catch (e) {
      return dob;
    }
  }
  requestDelete(childId) {
    this.deleteConfirmId.set(childId);
  }
  cancelDelete() {
    this.deleteConfirmId.set(null);
  }
  confirmDeleteChild(childId) {
    return __async(this, null, function* () {
      this.deleteConfirmId.set(null);
      yield this.dataService.deleteChild(childId);
    });
  }
  requestClearAllData() {
    this.showClearConfirm.set(true);
  }
  cancelClearAllData() {
    this.showClearConfirm.set(false);
  }
  confirmClearAllData() {
    return __async(this, null, function* () {
      yield this.dataService.clearAllData();
      window.location.reload();
    });
  }
  exportData() {
    const data = this.dataService.exportAllData();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    a.href = url;
    a.download = `kiddok-export-${date}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  static {
    this.\u0275fac = function SettingsPageComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SettingsPageComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SettingsPageComponent, selectors: [["app-settings-page"]], outputs: { openEditChild: "openEditChild", openAddChild: "openAddChild" }, decls: 106, vars: 43, consts: [[1, "max-w-2xl", "mx-auto", "px-4", "py-6", "space-y-6"], [1, "bg-white", "dark:bg-slate-800", "rounded-2xl", "shadow-sm", "border", "border-slate-100", "dark:border-slate-700", "overflow-hidden"], [1, "h-1", "bg-gradient-to-r", "from-indigo-500", "to-indigo-400"], [1, "p-6"], [1, "text-lg", "font-extrabold", "text-gray-800", "dark:text-slate-100", "mb-6", "flex", "items-center", "gap-3"], ["name", "user", 1, "text-inherit"], [1, "mb-5", "p-4", "bg-teal-50", "dark:bg-teal-900/30", "border", "border-teal-100", "dark:border-teal-800", "rounded-2xl", "flex", "items-center", "gap-3", "animate-fade-in"], [1, "space-y-4"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4"], [1, "block", "text-xs", "font-bold", "text-indigo-700", "dark:text-indigo-300", "mb-2", "ml-1", "uppercase", "tracking-wider"], ["type", "text", 1, "w-full", "px-4", "py-3.5", "rounded-xl", "border-2", "border-slate-200", "dark:border-slate-600", "bg-slate-50", "dark:bg-slate-700", "focus:bg-white", "dark:focus:bg-slate-600", "focus:ring-4", "focus:ring-indigo-500/10", "focus:border-indigo-500", "outline-none", "transition-all", "text-gray-800", "dark:text-slate-100", "text-sm", 3, "ngModelChange", "ngModel"], ["type", "tel", 1, "w-full", "px-4", "py-3.5", "rounded-xl", "border-2", "border-slate-200", "dark:border-slate-600", "bg-slate-50", "dark:bg-slate-700", "focus:bg-white", "dark:focus:bg-slate-600", "focus:ring-4", "focus:ring-indigo-500/10", "focus:border-indigo-500", "outline-none", "transition-all", "text-gray-800", "dark:text-slate-100", "text-sm", 3, "ngModelChange", "ngModel"], [1, "w-full", "bg-gradient-to-r", "from-indigo-600", "to-indigo-500", "hover:from-indigo-500", "hover:to-indigo-400", "disabled:opacity-50", "disabled:cursor-not-allowed", "text-white", "py-4", "rounded-xl", "font-bold", "shadow-md", "hover:shadow-lg", "hover:-translate-y-0.5", "transition-all", "flex", "items-center", "justify-center", "gap-2", "text-base", 3, "click", "disabled"], ["name", "loader", 1, "text-inherit", "animate-spin"], ["name", "save", 1, "text-inherit"], [1, "h-1", "bg-gradient-to-r", "from-purple-500", "to-purple-400"], [1, "text-lg", "font-extrabold", "text-gray-800", "dark:text-slate-100", "mb-5", "flex", "items-center", "gap-3"], ["name", "palette", 1, "text-inherit"], [1, "flex", "items-center", "justify-between", "py-3", "border-b", "border-slate-100", "dark:border-slate-700"], [1, "font-bold", "text-gray-800", "dark:text-slate-100", "text-sm"], [1, "text-xs", "text-gray-500", "dark:text-slate-400", "mt-0.5"], ["role", "switch", 1, "relative", "inline-flex", "h-7", "w-12", "items-center", "rounded-full", "transition-colors", "focus:outline-none", "focus:ring-2", "focus:ring-purple-500", "focus:ring-offset-2", 3, "click"], [1, "inline-block", "h-5", "w-5", "transform", "rounded-full", "bg-white", "shadow", "transition-transform"], [1, "py-4", "border-b", "border-slate-100", "dark:border-slate-700"], [1, "font-bold", "text-gray-800", "dark:text-slate-100", "text-sm", "mb-3"], [1, "text-xs", "text-gray-500", "dark:text-slate-400", "mb-4"], [1, "flex", "items-center", "gap-3"], [1, "w-10", "h-10", "rounded-full", "border-2", "transition-all", "shadow-sm", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", 3, "title", "background-color", "border-color", "class"], [1, "pt-4"], [1, "flex", "items-center", "gap-0", "rounded-full", "bg-slate-100", "dark:bg-slate-700", "p-1.5"], [3, "class"], [1, "bg-white", "dark:bg-slate-800", "rounded-2xl", "shadow-sm", "border", "border-slate-100", "dark:border-slate-700", "p-6"], ["name", "globe", 1, "text-inherit"], [1, "flex", "items-center", "justify-center"], ["aria-label", "Switch to Albanian", 3, "click"], ["name", "check", 1, "text-inherit"], ["aria-label", "Switch to English", 3, "click"], [1, "h-1", "bg-gradient-to-r", "from-amber-500", "to-amber-400"], ["name", "bell", 1, "text-inherit"], [1, "text-sm", "text-amber-600", "dark:text-amber-400", "bg-amber-50", "dark:bg-amber-900/30", "rounded-xl", "p-4"], [1, "h-1", "bg-gradient-to-r", "from-teal-500", "to-teal-400"], ["name", "baby", 1, "text-inherit"], [1, "text-gray-500", "dark:text-slate-400", "text-sm", "text-center", "py-6"], [1, "space-y-3", "mb-6"], [1, "w-full", "border-2", "border-dashed", "border-slate-300", "dark:border-slate-600", "text-slate-500", "dark:text-slate-400", "hover:border-indigo-400", "dark:hover:border-indigo-500", "hover:text-indigo-600", "dark:hover:text-indigo-300", "hover:bg-indigo-50", "dark:hover:bg-indigo-900/20", "py-4", "rounded-xl", "font-bold", "transition-all", "flex", "items-center", "justify-center", "gap-2", "text-sm", 3, "click"], ["name", "plus", 1, "text-inherit"], [1, "bg-white", "dark:bg-slate-800", "rounded-2xl", "shadow-sm", "border", "border-slate-200", "dark:border-slate-700", "p-6"], ["name", "database", 1, "text-inherit"], [1, "mb-5", "p-5", "bg-rose-50", "dark:bg-rose-900/30", "border-2", "border-rose-200", "dark:border-rose-800", "rounded-2xl", "animate-fade-in"], [1, "space-y-3"], [1, "w-full", "border-2", "border-slate-200", "dark:border-slate-600", "text-slate-600", "dark:text-slate-300", "hover:bg-teal-50", "dark:hover:bg-teal-900/30", "hover:border-teal-300", "dark:hover:border-teal-600", "hover:text-teal-700", "dark:hover:text-teal-300", "py-4", "rounded-xl", "font-bold", "transition-all", "flex", "items-center", "justify-center", "gap-3", "text-base", 3, "click"], ["name", "download", 1, "text-inherit"], [1, "w-full", "border-2", "border-rose-200", "dark:border-rose-800", "text-rose-500", "dark:text-rose-400", "hover:bg-rose-50", "dark:hover:bg-rose-900/30", "hover:border-rose-300", "dark:hover:border-rose-700", "py-4", "rounded-xl", "font-bold", "transition-all", "flex", "items-center", "justify-center", "gap-2", "text-sm"], [1, "bg-white", "dark:bg-slate-800", "rounded-2xl", "shadow-sm", "border", "border-slate-200", "dark:border-slate-700", "p-8", "text-center"], [1, "flex", "items-center", "justify-center", "gap-3", "mb-3"], ["name", "heart", 1, "text-indigo-500", "dark:text-purple-400", 2, "font-size", "32px"], [1, "text-[28px]", "font-extrabold", "text-gray-800", "dark:text-slate-100", "tracking-tight"], [1, "text-gray-500", "dark:text-slate-400", "font-medium", "text-base", "mb-1"], [1, "text-gray-500", "dark:text-slate-400", "text-sm"], ["name", "check-circle", 1, "text-inherit"], [1, "text-teal-700", "dark:text-teal-300", "text-sm", "font-medium"], [1, "w-10", "h-10", "rounded-full", "border-2", "transition-all", "shadow-sm", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", 3, "click", "title"], ["name", "check", 1, "text-white", "text-xs", "mx-auto", 3, "color"], ["name", "check", 1, "text-white", "text-xs", "mx-auto"], [3, "click"], ["role", "switch", 1, "relative", "inline-flex", "h-7", "w-12", "items-center", "rounded-full", "transition-colors", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500", "focus:ring-offset-2", 3, "click"], [1, "mt-3", "p-3", "bg-amber-50", "dark:bg-amber-900/30", "border", "border-amber-200", "dark:border-amber-800", "rounded-xl", "text-xs", "text-amber-700", "dark:text-amber-400"], [1, "pt-3"], [1, "text-xs", "text-gray-500", "dark:text-slate-400", "mb-3"], [1, "flex", "items-center", "gap-2"], [1, "text-xs", "font-semibold", "text-gray-600", "dark:text-slate-400"], [1, "px-3", "py-2", "rounded-xl", "border-2", "border-slate-200", "dark:border-slate-600", "bg-slate-50", "dark:bg-slate-700", "text-sm", "font-medium", "text-gray-700", "dark:text-slate-100", "focus:border-indigo-400", "focus:outline-none", 3, "change", "value"], [3, "value"], [1, "text-gray-400", "dark:text-slate-500", "font-medium"], [1, "flex", "items-center", "gap-4", "p-4", "bg-slate-50", "dark:bg-slate-700", "rounded-xl", "border", "border-slate-100", "dark:border-slate-600", "group"], [1, "w-12", "h-12", "rounded-full", "border-2", "border-slate-200", "dark:border-slate-600", "flex-shrink-0", 3, "src"], [1, "flex-1", "min-w-0"], [1, "font-bold", "text-gray-800", "dark:text-slate-100", "truncate"], [1, "text-xs", "text-gray-500", "dark:text-slate-400"], [1, "flex", "items-center", "gap-2", "animate-fade-in"], [1, "px-3", "py-1.5", "bg-rose-500", "text-white", "text-xs", "font-bold", "rounded-lg", "hover:bg-rose-600", "transition-colors", 3, "click"], [1, "px-3", "py-1.5", "bg-slate-200", "dark:bg-slate-600", "text-gray-600", "dark:text-slate-300", "text-xs", "font-bold", "rounded-lg", "hover:bg-slate-300", "dark:hover:bg-slate-500", "transition-colors", 3, "click"], [1, "px-3", "py-2", "bg-white", "dark:bg-slate-600", "border", "border-slate-200", "dark:border-slate-500", "text-slate-600", "dark:text-slate-300", "text-xs", "font-bold", "rounded-xl", "hover:bg-indigo-50", "dark:hover:bg-indigo-900/30", "hover:border-indigo-300", "dark:hover:border-indigo-600", "hover:text-indigo-600", "dark:hover:text-indigo-300", "transition-all", "flex", "items-center", "gap-1.5", 3, "click"], ["name", "pencil", 1, "text-inherit"], [1, "px-3", "py-2", "bg-white", "dark:bg-slate-600", "border", "border-slate-200", "dark:border-slate-500", "text-slate-400", "dark:text-slate-500", "text-xs", "font-bold", "rounded-xl", "hover:bg-rose-50", "dark:hover:bg-rose-900/30", "hover:border-rose-300", "dark:hover:border-rose-700", "hover:text-rose-500", "dark:hover:text-rose-400", "transition-all", "flex", "items-center", "gap-1.5", 3, "click"], ["name", "trash-2", 1, "text-inherit"], [1, "text-sm", "text-gray-700", "dark:text-rose-200", "mb-4", "font-medium", "flex", "items-center", "gap-2"], ["name", "alert-triangle", 1, "text-inherit"], [1, "flex", "gap-3"], [1, "flex-1", "py-3", "rounded-xl", "bg-gradient-to-r", "from-rose-500", "to-rose-400", "text-white", "font-bold", "hover:from-rose-400", "hover:to-rose-300", "transition-all", "text-sm", "shadow-sm", "flex", "items-center", "justify-center", "gap-2", 3, "click"], ["name", "trash", 1, "text-inherit"], [1, "flex-1", "py-3", "rounded-xl", "border-2", "border-slate-200", "dark:border-slate-600", "text-gray-600", "dark:text-slate-300", "font-bold", "hover:bg-slate-100", "dark:hover:bg-slate-700", "transition-all", "text-sm", 3, "click"], [1, "w-full", "border-2", "border-rose-200", "dark:border-rose-800", "text-rose-500", "dark:text-rose-400", "hover:bg-rose-50", "dark:hover:bg-rose-900/30", "hover:border-rose-300", "dark:hover:border-rose-700", "py-4", "rounded-xl", "font-bold", "transition-all", "flex", "items-center", "justify-center", "gap-2", "text-sm", 3, "click"]], template: function SettingsPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275element(2, "div", 2);
        \u0275\u0275elementStart(3, "div", 3)(4, "h3", 4);
        \u0275\u0275element(5, "lucide-icon", 5);
        \u0275\u0275text(6);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(7, SettingsPageComponent_Conditional_7_Template, 4, 1, "div", 6);
        \u0275\u0275elementStart(8, "div", 7)(9, "div", 8)(10, "div")(11, "label", 9);
        \u0275\u0275text(12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "input", 10);
        \u0275\u0275twoWayListener("ngModelChange", function SettingsPageComponent_Template_input_ngModelChange_13_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.parentForm().name, $event) || (ctx.parentForm().name = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "div")(15, "label", 9);
        \u0275\u0275text(16);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "input", 10);
        \u0275\u0275twoWayListener("ngModelChange", function SettingsPageComponent_Template_input_ngModelChange_17_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.parentForm().surname, $event) || (ctx.parentForm().surname = $event);
          return $event;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(18, "div")(19, "label", 9);
        \u0275\u0275text(20);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "input", 11);
        \u0275\u0275twoWayListener("ngModelChange", function SettingsPageComponent_Template_input_ngModelChange_21_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.parentForm().phone, $event) || (ctx.parentForm().phone = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "button", 12);
        \u0275\u0275listener("click", function SettingsPageComponent_Template_button_click_22_listener() {
          return ctx.saveParentProfile();
        });
        \u0275\u0275conditionalCreate(23, SettingsPageComponent_Conditional_23_Template, 1, 0, "lucide-icon", 13)(24, SettingsPageComponent_Conditional_24_Template, 1, 0, "lucide-icon", 14);
        \u0275\u0275text(25);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(26, "div", 1);
        \u0275\u0275element(27, "div", 15);
        \u0275\u0275elementStart(28, "div", 3)(29, "h3", 16);
        \u0275\u0275element(30, "lucide-icon", 17);
        \u0275\u0275text(31);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "div", 18)(33, "div")(34, "p", 19);
        \u0275\u0275text(35);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "p", 20);
        \u0275\u0275text(37);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(38, "button", 21);
        \u0275\u0275listener("click", function SettingsPageComponent_Template_button_click_38_listener() {
          return ctx.themeSvc.toggleDarkMode();
        });
        \u0275\u0275element(39, "span", 22);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(40, "div", 23)(41, "p", 24);
        \u0275\u0275text(42);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "p", 25);
        \u0275\u0275text(44);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "div", 26);
        \u0275\u0275repeaterCreate(46, SettingsPageComponent_For_47_Template, 2, 11, "button", 27, _forTrack0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(48, "div", 28)(49, "p", 24);
        \u0275\u0275text(50);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(51, "p", 25);
        \u0275\u0275text(52);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(53, "div", 29);
        \u0275\u0275repeaterCreate(54, SettingsPageComponent_For_55_Template, 2, 4, "button", 30, _forTrack0);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(56, "div", 31)(57, "h3", 16);
        \u0275\u0275element(58, "lucide-icon", 32);
        \u0275\u0275text(59);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(60, "div", 33)(61, "div", 29)(62, "button", 34);
        \u0275\u0275listener("click", function SettingsPageComponent_Template_button_click_62_listener() {
          return ctx.setLocale("sq");
        });
        \u0275\u0275conditionalCreate(63, SettingsPageComponent_Conditional_63_Template, 1, 0, "lucide-icon", 35);
        \u0275\u0275text(64);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(65, "button", 36);
        \u0275\u0275listener("click", function SettingsPageComponent_Template_button_click_65_listener() {
          return ctx.setLocale("en");
        });
        \u0275\u0275conditionalCreate(66, SettingsPageComponent_Conditional_66_Template, 1, 0, "lucide-icon", 35);
        \u0275\u0275text(67);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(68, "div", 1);
        \u0275\u0275element(69, "div", 37);
        \u0275\u0275elementStart(70, "div", 3)(71, "h3", 16);
        \u0275\u0275element(72, "lucide-icon", 38);
        \u0275\u0275text(73);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(74, SettingsPageComponent_Conditional_74_Template, 2, 1, "p", 39)(75, SettingsPageComponent_Conditional_75_Template, 10, 9);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(76, "div", 1);
        \u0275\u0275element(77, "div", 40);
        \u0275\u0275elementStart(78, "div", 3)(79, "h3", 16);
        \u0275\u0275element(80, "lucide-icon", 41);
        \u0275\u0275text(81);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(82, SettingsPageComponent_Conditional_82_Template, 2, 1, "p", 42)(83, SettingsPageComponent_Conditional_83_Template, 3, 0, "div", 43);
        \u0275\u0275elementStart(84, "button", 44);
        \u0275\u0275listener("click", function SettingsPageComponent_Template_button_click_84_listener() {
          return ctx.openAddChild.emit();
        });
        \u0275\u0275element(85, "lucide-icon", 45);
        \u0275\u0275text(86);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(87, "div", 46)(88, "h3", 16);
        \u0275\u0275element(89, "lucide-icon", 47);
        \u0275\u0275text(90);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(91, SettingsPageComponent_Conditional_91_Template, 10, 3, "div", 48);
        \u0275\u0275elementStart(92, "div", 49)(93, "button", 50);
        \u0275\u0275listener("click", function SettingsPageComponent_Template_button_click_93_listener() {
          return ctx.exportData();
        });
        \u0275\u0275element(94, "lucide-icon", 51);
        \u0275\u0275text(95);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(96, SettingsPageComponent_Conditional_96_Template, 3, 1, "button", 52);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(97, "div", 53)(98, "div", 54);
        \u0275\u0275element(99, "lucide-icon", 55);
        \u0275\u0275elementStart(100, "span", 56);
        \u0275\u0275text(101, "KidDok");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(102, "p", 57);
        \u0275\u0275text(103);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(104, "p", 58);
        \u0275\u0275text(105);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["settings.parentProfile"], " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.saveSuccess() ? 7 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["settings.name"], " ");
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.parentForm().name);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["settings.surname"], " ");
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.parentForm().surname);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["settings.phone"], " ");
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.parentForm().phone);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.isSaving());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.isSaving() ? 23 : 24);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["settings.saveChanges"], " ");
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["settings.theme.title"], " ");
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.i18n.t()["settings.theme.darkMode"]);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.i18n.t()["settings.theme.darkModeDesc"]);
        \u0275\u0275advance();
        \u0275\u0275classMap(ctx.themeSvc.darkMode() ? "bg-purple-500" : "bg-slate-200 dark:bg-slate-600");
        \u0275\u0275attribute("aria-checked", ctx.themeSvc.darkMode());
        \u0275\u0275advance();
        \u0275\u0275classMap(ctx.themeSvc.darkMode() ? "translate-x-6" : "translate-x-1");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.i18n.t()["settings.theme.accentColor"]);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.i18n.t()["settings.theme.accentColorDesc"]);
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.accentColors);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.i18n.t()["settings.theme.fontSize"]);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.i18n.t()["settings.theme.fontSizeDesc"]);
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.fontSizes);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["settings.language"], " ");
        \u0275\u0275advance(3);
        \u0275\u0275classMap(ctx.activeClass("sq"));
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.i18n.locale() === "sq" ? 63 : -1);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["settings.language.sq"], " ");
        \u0275\u0275advance();
        \u0275\u0275classMap(ctx.activeClass("en"));
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.i18n.locale() === "en" ? 66 : -1);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["settings.language.en"], " ");
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["settings.notifications.title"], " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.notifSvc.isSupported ? 74 : 75);
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["settings.children"], " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.dataService.children().length === 0 ? 82 : 83);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["settings.children.add"], " ");
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["settings.data.title"], " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.showClearConfirm() ? 91 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["settings.data.export"], " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.showClearConfirm() ? 96 : -1);
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate(ctx.i18n.t()["settings.about.tagline"]);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.i18n.t()["settings.about.version"]);
      }
    }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NgControlStatus, NgModel, LucideAngularModule, LucideAngularComponent], styles: ["\n.animate-fade-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.25s ease-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=settings-page.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SettingsPageComponent, [{
    type: Component,
    args: [{ selector: "app-settings-page", standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], template: `
    <div class="max-w-2xl mx-auto px-4 py-6 space-y-6">

      <!-- Section 1: Parent Profile -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <!-- Indigo accent bar -->
        <div class="h-1 bg-gradient-to-r from-indigo-500 to-indigo-400"></div>
        <div class="p-6">
          <h3 class="text-lg font-extrabold text-gray-800 dark:text-slate-100 mb-6 flex items-center gap-3">
            <lucide-icon name="user" class="text-inherit"></lucide-icon>
            {{ i18n.t()['settings.parentProfile'] }}
          </h3>

          @if (saveSuccess()) {
            <div class="mb-5 p-4 bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800 rounded-2xl flex items-center gap-3 animate-fade-in">
              <lucide-icon name="check-circle" class="text-inherit"></lucide-icon>
              <p class="text-teal-700 dark:text-teal-300 text-sm font-medium">{{ i18n.t()['settings.saved'] }}</p>
            </div>
          }

          <div class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-2 ml-1 uppercase tracking-wider">
                  {{ i18n.t()['settings.name'] }}
                </label>
                <input type="text" [(ngModel)]="parentForm().name"
                       class="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-600 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-gray-800 dark:text-slate-100 text-sm">
              </div>
              <div>
                <label class="block text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-2 ml-1 uppercase tracking-wider">
                  {{ i18n.t()['settings.surname'] }}
                </label>
                <input type="text" [(ngModel)]="parentForm().surname"
                       class="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-600 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-gray-800 dark:text-slate-100 text-sm">
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-2 ml-1 uppercase tracking-wider">
                {{ i18n.t()['settings.phone'] }}
              </label>
              <input type="tel" [(ngModel)]="parentForm().phone"
                     class="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-600 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-gray-800 dark:text-slate-100 text-sm">
            </div>
            <button (click)="saveParentProfile()"
                    [disabled]="isSaving()"
                    class="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-base">
              @if (isSaving()) {
                <lucide-icon name="loader" class="text-inherit animate-spin"></lucide-icon>
              } @else {
                <lucide-icon name="save" class="text-inherit"></lucide-icon>
              }
              {{ i18n.t()['settings.saveChanges'] }}
            </button>
          </div>
        </div>
      </div>

      <!-- Section 2: Appearance / Theme -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <!-- Purple accent bar -->
        <div class="h-1 bg-gradient-to-r from-purple-500 to-purple-400"></div>
        <div class="p-6">
          <h3 class="text-lg font-extrabold text-gray-800 dark:text-slate-100 mb-5 flex items-center gap-3">
            <lucide-icon name="palette" class="text-inherit"></lucide-icon>
            {{ i18n.t()['settings.theme.title'] }}
          </h3>

          <!-- Dark Mode Toggle -->
          <div class="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700">
            <div>
              <p class="font-bold text-gray-800 dark:text-slate-100 text-sm">{{ i18n.t()['settings.theme.darkMode'] }}</p>
              <p class="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{{ i18n.t()['settings.theme.darkModeDesc'] }}</p>
            </div>
            <button
              (click)="themeSvc.toggleDarkMode()"
              role="switch"
              [attr.aria-checked]="themeSvc.darkMode()"
              class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              [class]="themeSvc.darkMode() ? 'bg-purple-500' : 'bg-slate-200 dark:bg-slate-600'"
            >
              <span class="inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform"
                    [class]="themeSvc.darkMode() ? 'translate-x-6' : 'translate-x-1'"></span>
            </button>
          </div>

          <!-- Accent Color Picker -->
          <div class="py-4 border-b border-slate-100 dark:border-slate-700">
            <p class="font-bold text-gray-800 dark:text-slate-100 text-sm mb-3">{{ i18n.t()['settings.theme.accentColor'] }}</p>
            <p class="text-xs text-gray-500 dark:text-slate-400 mb-4">{{ i18n.t()['settings.theme.accentColorDesc'] }}</p>
            <div class="flex items-center gap-3">
              @for (color of accentColors; track color.id) {
                <button
                  (click)="themeSvc.setAccentColor(color.id)"
                  [attr.aria-label]="i18n.t()['settings.theme.color.' + color.id]"
                  [title]="i18n.t()['settings.theme.color.' + color.id]"
                  class="w-10 h-10 rounded-full border-2 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                  [style.background-color]="color.bg"
                  [style.border-color]="themeSvc.accentColor() === color.id ? color.border : 'transparent'"
                  [class]="themeSvc.accentColor() === color.id ? 'border-2 scale-110' : 'border-transparent hover:scale-105'"
                  [style.border-color]="themeSvc.accentColor() === color.id ? color.border : 'transparent'"
                >
                  @if (themeSvc.accentColor() === color.id) {
                    <lucide-icon name="check" class="text-white text-xs mx-auto" [style.color]="color.checkColor"></lucide-icon>
                  }
                </button>
              }
            </div>
          </div>

          <!-- Font Size -->
          <div class="pt-4">
            <p class="font-bold text-gray-800 dark:text-slate-100 text-sm mb-3">{{ i18n.t()['settings.theme.fontSize'] }}</p>
            <p class="text-xs text-gray-500 dark:text-slate-400 mb-4">{{ i18n.t()['settings.theme.fontSizeDesc'] }}</p>
            <div class="flex items-center gap-0 rounded-full bg-slate-100 dark:bg-slate-700 p-1.5">
              @for (size of fontSizes; track size.id) {
                <button
                  (click)="themeSvc.setFontSize(size.id)"
                  [attr.aria-label]="i18n.t()['settings.theme.size.' + size.id]"
                  [class]="themeSvc.fontSize() === size.id
                    ? 'px-5 py-2.5 rounded-full bg-purple-500 text-white font-bold text-sm shadow-sm transition-all'
                    : 'px-5 py-2.5 rounded-full text-slate-500 dark:text-slate-300 font-medium text-sm hover:text-slate-700 dark:hover:text-slate-100 transition-all'"
                >
                  {{ i18n.t()['settings.theme.size.' + size.id] }}
                </button>
              }
            </div>
          </div>
        </div>
      </div>

      <!-- Section 3: Language Toggle -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
        <h3 class="text-lg font-extrabold text-gray-800 dark:text-slate-100 mb-5 flex items-center gap-3">
          <lucide-icon name="globe" class="text-inherit"></lucide-icon>
          {{ i18n.t()['settings.language'] }}
        </h3>
        <div class="flex items-center justify-center">
          <div class="flex items-center gap-0 rounded-full bg-slate-100 dark:bg-slate-700 p-1.5">
            <button aria-label="Switch to Albanian" (click)="setLocale('sq')"
                    [class]="activeClass('sq')">
              @if (i18n.locale() === 'sq') {
                <lucide-icon name="check" class="text-inherit"></lucide-icon>
              }
              {{ i18n.t()['settings.language.sq'] }}
            </button>
            <button aria-label="Switch to English" (click)="setLocale('en')"
                    [class]="activeClass('en')">
              @if (i18n.locale() === 'en') {
                <lucide-icon name="check" class="text-inherit"></lucide-icon>
              }
              {{ i18n.t()['settings.language.en'] }}
            </button>
          </div>
        </div>
      </div>

      <!-- Section 4: Notifications -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <!-- Amber accent bar -->
        <div class="h-1 bg-gradient-to-r from-amber-500 to-amber-400"></div>
        <div class="p-6">
          <h3 class="text-lg font-extrabold text-gray-800 dark:text-slate-100 mb-5 flex items-center gap-3">
            <lucide-icon name="bell" class="text-inherit"></lucide-icon>
            {{ i18n.t()['settings.notifications.title'] }}
          </h3>

          @if (!notifSvc.isSupported) {
            <p class="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4">
              {{ i18n.locale() === 'sq' ? 'Shfletuesi juaj nuk mb\xEBshtet njoftimet.' : 'Your browser does not support notifications.' }}
            </p>
          } @else {

            <!-- Master toggle -->
            <div class="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700">
              <div>
                <p class="font-bold text-gray-800 dark:text-slate-100 text-sm">{{ i18n.t()['settings.notifications.enable'] }}</p>
                <p class="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{{ i18n.t()['settings.notifications.enableDesc'] }}</p>
              </div>
              <button
                (click)="toggleNotifications()"
                role="switch"
                [attr.aria-checked]="notifSvc.enabled()"
                class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                [class]="notifSvc.enabled() ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-600'"
              >
                <span class="inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform"
                      [class]="notifSvc.enabled() ? 'translate-x-6' : 'translate-x-1'"></span>
              </button>
            </div>

            @if (notifSvc.permissionLevel === 'denied' && !notifSvc.enabled()) {
              <div class="mt-3 p-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-700 dark:text-amber-400">
                {{ i18n.t()['settings.notifications.browserDenied'] }}
              </div>
            }

            @if (notifSvc.enabled()) {
              <!-- Fever Alerts toggle -->
              <div class="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700">
                <div>
                  <p class="font-bold text-gray-800 dark:text-slate-100 text-sm">{{ i18n.t()['settings.notifications.feverAlerts'] }}</p>
                  <p class="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{{ i18n.t()['settings.notifications.feverAlertsDesc'] }}</p>
                </div>
                <button
                  (click)="notifSvc.updatePrefs({ feverAlerts: !notifSvc.feverAlerts() })"
                  role="switch"
                  [attr.aria-checked]="notifSvc.feverAlerts()"
                  class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  [class]="notifSvc.feverAlerts() ? 'bg-rose-500' : 'bg-slate-200 dark:bg-slate-600'"
                >
                  <span class="inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform"
                        [class]="notifSvc.feverAlerts() ? 'translate-x-6' : 'translate-x-1'"></span>
                </button>
              </div>

              <!-- Vaccine Alerts toggle -->
              <div class="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700">
                <div>
                  <p class="font-bold text-gray-800 dark:text-slate-100 text-sm">{{ i18n.t()['settings.notifications.vaccineAlerts'] }}</p>
                  <p class="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{{ i18n.t()['settings.notifications.vaccineAlertsDesc'] }}</p>
                </div>
                <button
                  (click)="notifSvc.updatePrefs({ vaccineAlerts: !notifSvc.vaccineAlerts() })"
                  role="switch"
                  [attr.aria-checked]="notifSvc.vaccineAlerts()"
                  class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  [class]="notifSvc.vaccineAlerts() ? 'bg-teal-500' : 'bg-slate-200 dark:bg-slate-600'"
                >
                  <span class="inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform"
                        [class]="notifSvc.vaccineAlerts() ? 'translate-x-6' : 'translate-x-1'"></span>
                </button>
              </div>

              <!-- Do Not Disturb -->
              <div class="pt-3">
                <p class="font-bold text-gray-800 dark:text-slate-100 text-sm mb-3">{{ i18n.t()['settings.notifications.dnd'] }}</p>
                <p class="text-xs text-gray-500 dark:text-slate-400 mb-3">{{ i18n.t()['settings.notifications.dndDesc'] }}</p>
                <div class="flex items-center gap-3">
                  <div class="flex items-center gap-2">
                    <label class="text-xs font-semibold text-gray-600 dark:text-slate-400">{{ i18n.t()['settings.notifications.dndFrom'] }}</label>
                    <select
                      [value]="notifSvc.dndStart()"
                      (change)="notifSvc.updatePrefs({ dndStart: +$any($event.target).value })"
                      class="px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm font-medium text-gray-700 dark:text-slate-100 focus:border-indigo-400 focus:outline-none"
                    >
                      @for (h of hours; track h.value) {
                        <option [value]="h.value">{{ h.label }}</option>
                      }
                    </select>
                  </div>
                  <span class="text-gray-400 dark:text-slate-500 font-medium">\u2014</span>
                  <div class="flex items-center gap-2">
                    <label class="text-xs font-semibold text-gray-600 dark:text-slate-400">{{ i18n.t()['settings.notifications.dndTo'] }}</label>
                    <select
                      [value]="notifSvc.dndEnd()"
                      (change)="notifSvc.updatePrefs({ dndEnd: +$any($event.target).value })"
                      class="px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm font-medium text-gray-700 dark:text-slate-100 focus:border-indigo-400 focus:outline-none"
                    >
                      @for (h of hours; track h.value) {
                        <option [value]="h.value">{{ h.label }}</option>
                      }
                    </select>
                  </div>
                </div>
              </div>
            }
          }
        </div>
      </div>

      <!-- Section 5: Children Management -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <!-- Teal accent bar -->
        <div class="h-1 bg-gradient-to-r from-teal-500 to-teal-400"></div>
        <div class="p-6">
          <h3 class="text-lg font-extrabold text-gray-800 dark:text-slate-100 mb-5 flex items-center gap-3">
            <lucide-icon name="baby" class="text-inherit"></lucide-icon>
            {{ i18n.t()['settings.children'] }}
          </h3>

          @if (dataService.children().length === 0) {
            <p class="text-gray-500 dark:text-slate-400 text-sm text-center py-6">
              {{ i18n.t()['settings.noChildren'] }}
            </p>
          } @else {
            <div class="space-y-3 mb-6">
              @for (child of dataService.children(); track child.id) {
                <div class="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-100 dark:border-slate-600 group">
                  <!-- Avatar -->
                  <img [src]="child.avatarUrl" class="w-12 h-12 rounded-full border-2 border-slate-200 dark:border-slate-600 flex-shrink-0" />
                  <!-- Info -->
                  <div class="flex-1 min-w-0">
                    <p class="font-bold text-gray-800 dark:text-slate-100 truncate">{{ child.name }}</p>
                    <p class="text-xs text-gray-500 dark:text-slate-400">{{ formatDate(child.dateOfBirth) }}</p>
                  </div>
                  <!-- Actions -->
                  @if (deleteConfirmId() === child.id) {
                    <!-- Inline confirm -->
                    <div class="flex items-center gap-2 animate-fade-in">
                      <span class="text-xs text-gray-500 dark:text-slate-400">{{ i18n.t()['settings.children.confirmDelete'] }}</span>
                      <button (click)="confirmDeleteChild(child.id)"
                              class="px-3 py-1.5 bg-rose-500 text-white text-xs font-bold rounded-lg hover:bg-rose-600 transition-colors">
                        {{ i18n.t()['settings.confirm'] }}
                      </button>
                      <button (click)="cancelDelete()"
                              class="px-3 py-1.5 bg-slate-200 dark:bg-slate-600 text-gray-600 dark:text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors">
                        {{ i18n.t()['settings.cancel'] }}
                      </button>
                    </div>
                  } @else {
                    <div class="flex items-center gap-2">
                      <button (click)="openEditChild.emit(child)"
                              class="px-3 py-2 bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all flex items-center gap-1.5">
                        <lucide-icon name="pencil" class="text-inherit"></lucide-icon>
                        {{ i18n.t()['settings.children.edit'] }}
                      </button>
                      <button (click)="requestDelete(child.id)"
                              class="px-3 py-2 bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 text-slate-400 dark:text-slate-500 text-xs font-bold rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:border-rose-300 dark:hover:border-rose-700 hover:text-rose-500 dark:hover:text-rose-400 transition-all flex items-center gap-1.5">
                        <lucide-icon name="trash-2" class="text-inherit"></lucide-icon>
                        {{ i18n.t()['settings.children.delete'] }}
                      </button>
                    </div>
                  }
                </div>
              }
            </div>
          }

          <button (click)="openAddChild.emit()"
                  class="w-full border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm">
            <lucide-icon name="plus" class="text-inherit"></lucide-icon>
            {{ i18n.t()['settings.children.add'] }}
          </button>
        </div>
      </div>

      <!-- Section 6: Data Management -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <h3 class="text-lg font-extrabold text-gray-800 dark:text-slate-100 mb-5 flex items-center gap-3">
          <lucide-icon name="database" class="text-inherit"></lucide-icon>
          {{ i18n.t()['settings.data.title'] }}
        </h3>

        @if (showClearConfirm()) {
          <div class="mb-5 p-5 bg-rose-50 dark:bg-rose-900/30 border-2 border-rose-200 dark:border-rose-800 rounded-2xl animate-fade-in">
            <p class="text-sm text-gray-700 dark:text-rose-200 mb-4 font-medium flex items-center gap-2">
              <lucide-icon name="alert-triangle" class="text-inherit"></lucide-icon>
              {{ i18n.t()['settings.data.clearConfirm'] }}
            </p>
            <div class="flex gap-3">
              <button (click)="confirmClearAllData()"
                      class="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-rose-400 text-white font-bold hover:from-rose-400 hover:to-rose-300 transition-all text-sm shadow-sm flex items-center justify-center gap-2">
                <lucide-icon name="trash" class="text-inherit"></lucide-icon>
                {{ i18n.t()['settings.confirm'] }}
              </button>
              <button (click)="cancelClearAllData()"
                      class="flex-1 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 text-gray-600 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all text-sm">
                {{ i18n.t()['settings.cancel'] }}
              </button>
            </div>
          </div>
        }

        <div class="space-y-3">
          <button (click)="exportData()"
                  class="w-full border-2 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:border-teal-300 dark:hover:border-teal-600 hover:text-teal-700 dark:hover:text-teal-300 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 text-base">
            <lucide-icon name="download" class="text-inherit"></lucide-icon>
            {{ i18n.t()['settings.data.export'] }}
          </button>
          @if (!showClearConfirm()) {
            <button (click)="requestClearAllData()"
                    class="w-full border-2 border-rose-200 dark:border-rose-800 text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:border-rose-300 dark:hover:border-rose-700 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm">
              <lucide-icon name="trash-2" class="text-inherit"></lucide-icon>
              {{ i18n.t()['settings.data.clear'] }}
            </button>
          }
        </div>
      </div>

      <!-- Section 7: About -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 text-center">
        <div class="flex items-center justify-center gap-3 mb-3">
          <lucide-icon name="heart" class="text-indigo-500 dark:text-purple-400" style="font-size: 32px;"></lucide-icon>
          <span class="text-[28px] font-extrabold text-gray-800 dark:text-slate-100 tracking-tight">KidDok</span>
        </div>
        <p class="text-gray-500 dark:text-slate-400 font-medium text-base mb-1">{{ i18n.t()['settings.about.tagline'] }}</p>
        <p class="text-gray-500 dark:text-slate-400 text-sm">{{ i18n.t()['settings.about.version'] }}</p>
      </div>

    </div>
  `, styles: ["/* angular:styles/component:css;8f6a1dc74b2cbc43b8890a8c2ed75780d07c073aa4c1e620542f24a1d031493d;C:/Users/g_gus/Desktop/jona/kiddok/src/app/components/settings/settings-page.component.ts */\n.animate-fade-in {\n  animation: fadeIn 0.25s ease-out;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=settings-page.component.css.map */\n"] }]
  }], null, { openEditChild: [{
    type: Output
  }], openAddChild: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SettingsPageComponent, { className: "SettingsPageComponent", filePath: "src/app/components/settings/settings-page.component.ts", lineNumber: 416 });
})();
export {
  SettingsPageComponent
};
//# sourceMappingURL=chunk-FQVC4E4X.js.map
