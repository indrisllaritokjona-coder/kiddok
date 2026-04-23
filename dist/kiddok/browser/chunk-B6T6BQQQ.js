import {
  Router
} from "./chunk-DNHP3SJZ.js";
import "./chunk-NQDOAGAV.js";
import {
  CommonModule,
  DefaultValueAccessor,
  FormsModule,
  LucideAngularComponent,
  LucideAngularModule,
  NgClass,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-IFHIJ3FQ.js";
import {
  DataService,
  I18nService
} from "./chunk-J6KXBRJB.js";
import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  computed,
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
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
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
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-SFGRG2UU.js";

// src/app/components/home/welcome-hero.component.ts
function WelcomeHeroComponent_Conditional_0_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275element(1, "lucide-icon", 18);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "--\xB0C");
    \u0275\u0275elementEnd()();
  }
}
function WelcomeHeroComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 2);
    \u0275\u0275element(2, "div", 3)(3, "div", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 5);
    \u0275\u0275element(5, "img", 6);
    \u0275\u0275elementStart(6, "div", 7)(7, "p", 8);
    \u0275\u0275element(8, "lucide-icon", 9);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "h1", 10);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 11)(13, "span", 12);
    \u0275\u0275element(14, "lucide-icon", 13);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "div", 14)(17, "span", 15);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 16);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(21, WelcomeHeroComponent_Conditional_0_Conditional_21_Template, 4, 0, "div", 17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("src", ctx_r0.avatarUrl(), \u0275\u0275sanitizeUrl)("alt", ctx_r0.child().name);
    \u0275\u0275advance();
    \u0275\u0275styleProp("animation", "fadeInUp 350ms ease-out both");
    \u0275\u0275advance(2);
    \u0275\u0275property("name", ctx_r0.timeIcon().replace("wb_sunny", "sun").replace("wb_twilight", "sunset").replace("nightlight_round", "moon").replace("bedtime", "bed"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.timeGreeting(), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.greeting(), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.ageText(), " ");
    \u0275\u0275advance();
    \u0275\u0275styleProp("animation", "fadeInUp 350ms ease-out both");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.dayName());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.dateDisplay());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.weather() ? 21 : -1);
  }
}
function WelcomeHeroComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 19)(2, "div", 20);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 21);
    \u0275\u0275element(4, "circle", 22)(5, "circle", 23)(6, "path", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "h2", 25);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 26);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 27);
    \u0275\u0275listener("click", function WelcomeHeroComponent_Conditional_1_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.addFirstChild());
    });
    \u0275\u0275element(12, "lucide-icon", 28);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.noChildGreeting());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["home.welcome.subtitle"]);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["home.addFirstChild"], " ");
  }
}
var WelcomeHeroComponent = class _WelcomeHeroComponent {
  constructor() {
    this.dataService = inject(DataService);
    this.i18n = inject(I18nService);
    this.weather = signal(null, ...ngDevMode ? [{ debugName: "weather" }] : (
      /* istanbul ignore next */
      []
    ));
    this.child = computed(() => {
      const activeId = this.dataService.activeChildId();
      return this.dataService.children().find((c) => c.id === activeId) ?? null;
    }, ...ngDevMode ? [{ debugName: "child" }] : (
      /* istanbul ignore next */
      []
    ));
    this.avatarUrl = computed(() => {
      const c = this.child();
      if (!c)
        return "";
      return c.avatarUrl ?? `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(c.name)}`;
    }, ...ngDevMode ? [{ debugName: "avatarUrl" }] : (
      /* istanbul ignore next */
      []
    ));
    this.timeGreeting = computed(() => {
      const h = (/* @__PURE__ */ new Date()).getHours();
      if (h >= 7 && h < 12)
        return this.i18n.t()["home.greeting.morning"];
      if (h >= 12 && h < 18)
        return this.i18n.t()["home.greeting.afternoon"];
      if (h >= 18 && h < 22)
        return this.i18n.t()["home.greeting.evening"];
      return this.i18n.t()["home.greeting.night"];
    }, ...ngDevMode ? [{ debugName: "timeGreeting" }] : (
      /* istanbul ignore next */
      []
    ));
    this.timeIcon = computed(() => {
      const h = (/* @__PURE__ */ new Date()).getHours();
      if (h >= 7 && h < 12)
        return "wb_sunny";
      if (h >= 12 && h < 18)
        return "wb_twilight";
      if (h >= 18 && h < 22)
        return "nightlight_round";
      return "bedtime";
    }, ...ngDevMode ? [{ debugName: "timeIcon" }] : (
      /* istanbul ignore next */
      []
    ));
    this.greeting = computed(() => {
      const c = this.child();
      if (!c)
        return "";
      const t = this.i18n.t();
      return t["home.welcome.greeting"].replace("{name}", c.name);
    }, ...ngDevMode ? [{ debugName: "greeting" }] : (
      /* istanbul ignore next */
      []
    ));
    this.noChildGreeting = computed(() => {
      return this.i18n.t()["home.welcome.greetingNoChild"];
    }, ...ngDevMode ? [{ debugName: "noChildGreeting" }] : (
      /* istanbul ignore next */
      []
    ));
    this.ageText = computed(() => {
      const c = this.child();
      if (!c)
        return "";
      const age = this.calcAge(c.dateOfBirth);
      const t = this.i18n.t();
      if (age.years > 0) {
        return t["home.welcome.ageYears"].replace("{n}", String(age.years));
      }
      return t["home.welcome.ageMonths"].replace("{n}", String(age.months));
    }, ...ngDevMode ? [{ debugName: "ageText" }] : (
      /* istanbul ignore next */
      []
    ));
    this.dayName = computed(() => {
      const days = this.i18n.isSq() ? ["E diel", "E h\xEBn\xEB", "E mart\xEB", "E m\xEBrkur\xEB", "E enjte", "E premte", "E shtun\xEB"] : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return days[(/* @__PURE__ */ new Date()).getDay()];
    }, ...ngDevMode ? [{ debugName: "dayName" }] : (
      /* istanbul ignore next */
      []
    ));
    this.dateDisplay = computed(() => {
      const d = /* @__PURE__ */ new Date();
      if (this.i18n.isSq()) {
        return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
      }
      return d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
    }, ...ngDevMode ? [{ debugName: "dateDisplay" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  addFirstChild() {
    window.dispatchEvent(new CustomEvent("kiddok:navigate", { detail: "settings" }));
  }
  calcAge(dob) {
    const birth = new Date(dob);
    const now = /* @__PURE__ */ new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }
    return { years, months };
  }
  static {
    this.\u0275fac = function WelcomeHeroComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _WelcomeHeroComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _WelcomeHeroComponent, selectors: [["app-welcome-hero"]], decls: 2, vars: 1, consts: [[1, "relative", "w-full", "rounded-3xl", "overflow-hidden", "shadow-soft", "mb-6", "bg-gradient-to-br", "from-primary-500", "via-primary-600", "to-teal-500", "text-white", 2, "background-size", "200% 200%", "animation", "gradientShift 8s ease infinite"], [1, "w-full", "rounded-3xl", "overflow-hidden", "shadow-soft", "mb-6", "bg-gradient-to-br", "from-primary-50", "to-primary-100", "border", "border-primary-200"], [1, "absolute", "inset-0", "opacity-10"], [1, "absolute", "top-0", "right-0", "w-64", "h-64", "bg-white", "rounded-full", "blur-3xl", "-translate-y-1/2", "translate-x-1/3", "animate-pulse"], [1, "absolute", "bottom-0", "left-0", "w-48", "h-48", "bg-teal-300", "rounded-full", "blur-3xl", "translate-y-1/2", "-translate-x-1/4", "animate-pulse", 2, "animation-delay", "2s"], [1, "relative", "z-10", "px-8", "py-8", "flex", "items-center", "gap-6"], [1, "w-16", "h-16", "rounded-full", "border-4", "border-white/30", "object-cover", "shadow-lg", "flex-shrink-0", "hover:scale-105", "transition-transform", "duration-200", "cursor-pointer", 3, "src", "alt"], [1, "flex-1", "min-w-0"], [1, "text-primary-100", "text-sm", "font-medium", "mb-1", "flex", "items-center", "gap-1.5"], [1, "text-xs", 3, "name"], [1, "text-2xl", "lg:text-3xl", "font-extrabold", "text-white", "tracking-tight"], [1, "flex", "items-center", "gap-2", "mt-2"], [1, "inline-flex", "items-center", "gap-1.5", "bg-white/20", "backdrop-blur-sm", "px-3", "py-1.5", "rounded-full", "text-sm", "font-bold", "text-white", "border", "border-white/20"], ["name", "cake", 1, "text-xs"], [1, "hidden", "sm:flex", "flex-col", "items-end", "text-white/80"], [1, "text-xs", "font-medium", "opacity-70"], [1, "text-lg", "font-bold", "text-white"], [1, "hidden", "md:flex", "items-center", "gap-1.5", "bg-white/15", "backdrop-blur-sm", "px-3", "py-1.5", "rounded-full", "text-sm", "text-white/90"], ["name", "cloud", 1, "text-sm"], [1, "px-8", "py-10", "flex", "flex-col", "items-center", "justify-center", "text-center"], [1, "w-20", "h-20", "rounded-full", "bg-gradient-to-br", "from-primary-100", "to-primary-200", "flex", "items-center", "justify-center", "mb-5", "shadow-md"], ["width", "48", "height", "48", "viewBox", "0 0 48 48", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["cx", "24", "cy", "20", "r", "10", "fill", "#6366F1", "opacity", "0.6"], ["cx", "24", "cy", "20", "r", "6", "fill", "#6366F1", "opacity", "0.8"], ["d", "M14 38c0-6 4-10 10-10s10 4 10 10", "stroke", "#6366F1", "stroke-width", "2.5", "stroke-linecap", "round", "fill", "none", "opacity", "0.5"], [1, "text-xl", "font-extrabold", "text-primary-700", "mb-2"], [1, "text-sm", "text-primary-500", "font-medium", "mb-4"], [1, "inline-flex", "items-center", "gap-2", "bg-primary-500", "hover:bg-primary-600", "text-white", "font-semibold", "px-5", "py-2.5", "rounded-xl", "shadow-md", "hover:shadow-lg", "transition-all", "duration-200", "active:scale-95", 3, "click"], ["name", "plus", 1, "text-lg"]], template: function WelcomeHeroComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, WelcomeHeroComponent_Conditional_0_Template, 22, 13, "div", 0)(1, WelcomeHeroComponent_Conditional_1_Template, 14, 3, "div", 1);
      }
      if (rf & 2) {
        \u0275\u0275conditional(ctx.child() ? 0 : 1);
      }
    }, dependencies: [CommonModule, LucideAngularModule, LucideAngularComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=welcome-hero.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WelcomeHeroComponent, [{
    type: Component,
    args: [{ selector: "app-welcome-hero", standalone: true, imports: [CommonModule, LucideAngularModule], template: `
    @if (child()) {
      <div class="relative w-full rounded-3xl overflow-hidden shadow-soft mb-6 bg-gradient-to-br from-primary-500 via-primary-600 to-teal-500 text-white"
           style="background-size: 200% 200%; animation: gradientShift 8s ease infinite;">
        <!-- Background pattern -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-teal-300 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 animate-pulse" style="animation-delay: 2s;"></div>
        </div>

        <div class="relative z-10 px-8 py-8 flex items-center gap-6">
          <!-- Avatar -->
          <img
            [src]="avatarUrl()"
            [alt]="child()!.name"
            class="w-16 h-16 rounded-full border-4 border-white/30 object-cover shadow-lg flex-shrink-0 hover:scale-105 transition-transform duration-200 cursor-pointer"
          />

          <!-- Text content -->
          <div class="flex-1 min-w-0" [style.animation]="'fadeInUp 350ms ease-out both'">
            <p class="text-primary-100 text-sm font-medium mb-1 flex items-center gap-1.5">
              <lucide-icon [name]="timeIcon().replace('wb_sunny','sun').replace('wb_twilight','sunset').replace('nightlight_round','moon').replace('bedtime','bed')" class="text-xs"></lucide-icon>
              {{ timeGreeting() }}
            </p>
            <h1 class="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              {{ greeting() }}
            </h1>
            <div class="flex items-center gap-2 mt-2">
              <span class="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold text-white border border-white/20">
                <lucide-icon name="cake" class="text-xs"></lucide-icon>
                {{ ageText() }}
              </span>
            </div>
          </div>

          <!-- Date display -->
          <div class="hidden sm:flex flex-col items-end text-white/80" [style.animation]="'fadeInUp 350ms ease-out both'">
            <span class="text-xs font-medium opacity-70">{{ dayName() }}</span>
            <span class="text-lg font-bold text-white">{{ dateDisplay() }}</span>
          </div>

          <!-- Weather placeholder -->
          @if (weather()) {
            <div class="hidden md:flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm text-white/90">
              <lucide-icon name="cloud" class="text-sm"></lucide-icon>
              <span>--\xB0C</span>
            </div>
          }
        </div>
      </div>
    } @else {
      <!-- No child selected state -->
      <div class="w-full rounded-3xl overflow-hidden shadow-soft mb-6 bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200">
        <div class="px-8 py-10 flex flex-col items-center justify-center text-center">
          <!-- Warm illustration -->
          <div class="w-20 h-20 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center mb-5 shadow-md">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="20" r="10" fill="#6366F1" opacity="0.6"/>
              <circle cx="24" cy="20" r="6" fill="#6366F1" opacity="0.8"/>
              <path d="M14 38c0-6 4-10 10-10s10 4 10 10" stroke="#6366F1" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.5"/>
            </svg>
          </div>
          <h2 class="text-xl font-extrabold text-primary-700 mb-2">{{ noChildGreeting() }}</h2>
          <p class="text-sm text-primary-500 font-medium mb-4">{{ i18n.t()['home.welcome.subtitle'] }}</p>
          <button
            (click)="addFirstChild()"
            class="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
          >
            <lucide-icon name="plus" class="text-lg"></lucide-icon>
            {{ i18n.t()['home.addFirstChild'] }}
          </button>
        </div>
      </div>
    }
  `, styles: ["/* angular:styles/component:css;239657c732bfd36205d0b60d0c3c630c7c77adaaccb59693b759836aabe365d3;C:/Users/g_gus/Desktop/jona/kiddok/src/app/components/home/welcome-hero.component.ts */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=welcome-hero.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WelcomeHeroComponent, { className: "WelcomeHeroComponent", filePath: "src/app/components/home/welcome-hero.component.ts", lineNumber: 90 });
})();

// src/app/components/home/quick-actions-grid.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function QuickActionsGridComponent_For_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const action_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classMap(action_r2.id === "vaccines" ? "bg-red-500" : "bg-orange-500");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", action_r2.badge > 99 ? "99+" : action_r2.badge, " ");
  }
}
function QuickActionsGridComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 5);
    \u0275\u0275listener("click", function QuickActionsGridComponent_For_6_Template_button_click_0_listener() {
      const action_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.navigate(action_r2.route));
    })("keydown.enter", function QuickActionsGridComponent_For_6_Template_button_keydown_enter_0_listener() {
      const action_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.navigate(action_r2.route));
    })("keydown.space", function QuickActionsGridComponent_For_6_Template_button_keydown_space_0_listener() {
      const action_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.navigate(action_r2.route));
    });
    \u0275\u0275conditionalCreate(1, QuickActionsGridComponent_For_6_Conditional_1_Template, 2, 3, "span", 6);
    \u0275\u0275elementStart(2, "div", 7);
    \u0275\u0275element(3, "lucide-icon", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 9);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 10);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const action_r2 = ctx.$implicit;
    const \u0275$index_10_r4 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("animation", "fadeInUp 500ms ease " + \u0275$index_10_r4 * 60 + "ms both");
    \u0275\u0275advance();
    \u0275\u0275conditional(action_r2.badge > 0 ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275classMap(action_r2.colorClass);
    \u0275\u0275advance();
    \u0275\u0275property("name", action_r2.icon.replace("thermostat", "thermometer").replace("trending_up", "trending-up").replace("edit_document", "file-text").replace("vaccines", "syringe"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.i18n.t()[action_r2.labelKey]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.i18n.t()[action_r2.descKey]);
  }
}
var QuickActionsGridComponent = class _QuickActionsGridComponent {
  constructor() {
    this.dataService = inject(DataService);
    this.i18n = inject(I18nService);
    this.router = inject(Router);
    this.actions = computed(() => {
      const t = this.i18n.t();
      const activeId = this.dataService.activeChildId();
      const temps = this.dataService.temperatureEntries().filter((e) => e.childId === activeId);
      const records = this.dataService.records();
      const recentTemps = temps.slice(0, 10);
      const feverCount = recentTemps.filter((t2) => t2.temperature >= 38).length;
      const overdueCount = records.filter((r) => !r.completed && this.isOverdue(r.dueDate)).length;
      return [
        {
          id: "temperature",
          icon: "thermostat",
          labelKey: "home.quickActions.temperature",
          descKey: "home.quickActions.temperatureDesc",
          color: "#F97316",
          colorClass: "bg-orange-50 text-orange-500",
          badge: feverCount,
          route: "temperature"
        },
        {
          id: "growth",
          icon: "trending_up",
          labelKey: "home.quickActions.growth",
          descKey: "home.quickActions.growthDesc",
          color: "#14B8A6",
          colorClass: "bg-teal-50 text-teal-500",
          badge: 0,
          route: "growth"
        },
        {
          id: "diary",
          icon: "edit_document",
          labelKey: "home.quickActions.diary",
          descKey: "home.quickActions.diaryDesc",
          color: "#6366F1",
          colorClass: "bg-primary-50 text-primary-500",
          badge: 0,
          route: "diary"
        },
        {
          id: "vaccines",
          icon: "vaccines",
          labelKey: "home.quickActions.vaccines",
          descKey: "home.quickActions.vaccinesDesc",
          color: "#8B5CF6",
          colorClass: "bg-purple-50 text-purple-500",
          badge: overdueCount,
          route: "records"
        },
        {
          id: "analytics",
          icon: "bar_chart_2",
          labelKey: "home.quickActions.analytics",
          descKey: "home.quickActions.analyticsDesc",
          color: "#0EA5E9",
          colorClass: "bg-sky-50 text-sky-500",
          badge: 0,
          route: "analytics"
        }
      ];
    }, ...ngDevMode ? [{ debugName: "actions" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  navigate(route) {
    window.dispatchEvent(new CustomEvent("kiddok:navigate", { detail: route }));
  }
  isOverdue(dueDate) {
    if (!dueDate)
      return false;
    return new Date(dueDate) < /* @__PURE__ */ new Date();
  }
  static {
    this.\u0275fac = function QuickActionsGridComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _QuickActionsGridComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _QuickActionsGridComponent, selectors: [["app-quick-actions-grid"]], decls: 7, vars: 1, consts: [[1, "mb-6"], [1, "text-lg", "font-bold", "text-gray-700", "mb-4", "px-1", "flex", "items-center", "gap-2"], ["name", "zap", 1, "text-inherit"], [1, "grid", "grid-cols-2", "lg:grid-cols-4", "gap-4"], ["tabindex", "0", "role", "button", "type", "button", 1, "relative", "group", "bg-white", "rounded-2xl", "p-5", "border", "border-gray-100", "shadow-sm", "hover:shadow-xl", "hover:-translate-y-1", "transition-all", "duration-200", "text-left", "cursor-pointer", "focus:outline-none", "focus:ring-2", "focus:ring-primary-400", "active:scale-95", "active:transition-transform", 3, "animation"], ["tabindex", "0", "role", "button", "type", "button", 1, "relative", "group", "bg-white", "rounded-2xl", "p-5", "border", "border-gray-100", "shadow-sm", "hover:shadow-xl", "hover:-translate-y-1", "transition-all", "duration-200", "text-left", "cursor-pointer", "focus:outline-none", "focus:ring-2", "focus:ring-primary-400", "active:scale-95", "active:transition-transform", 3, "click", "keydown.enter", "keydown.space"], [1, "absolute", "top-3", "right-3", "w-5", "h-5", "rounded-full", "flex", "items-center", "justify-center", "text-[10px]", "font-bold", "text-white", "z-10", "badge-pulse", 3, "class"], [1, "w-12", "h-12", "rounded-2xl", "flex", "items-center", "justify-center", "mb-4", "transition-transform", "duration-200", "group-hover:scale-110"], [1, "text-2xl", 3, "name"], [1, "font-semibold", "text-gray-800", "text-base", "mb-1"], [1, "text-xs", "text-gray-500", "font-medium"], [1, "absolute", "top-3", "right-3", "w-5", "h-5", "rounded-full", "flex", "items-center", "justify-center", "text-[10px]", "font-bold", "text-white", "z-10", "badge-pulse"]], template: function QuickActionsGridComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h2", 1);
        \u0275\u0275element(2, "lucide-icon", 2);
        \u0275\u0275text(3);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 3);
        \u0275\u0275repeaterCreate(5, QuickActionsGridComponent_For_6_Template, 8, 8, "button", 4, _forTrack0);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["home.quickActions.title"], " ");
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.actions());
      }
    }, dependencies: [CommonModule, LucideAngularModule, LucideAngularComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\nbutton[_ngcontent-%COMP%] {\n  transition: transform 200ms ease, box-shadow 200ms ease;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n}\nbutton[_ngcontent-%COMP%]:active {\n  transform: scale(0.95);\n}\n/*# sourceMappingURL=quick-actions-grid.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuickActionsGridComponent, [{
    type: Component,
    args: [{ selector: "app-quick-actions-grid", standalone: true, imports: [CommonModule, LucideAngularModule], template: `
    <div class="mb-6">
      <h2 class="text-lg font-bold text-gray-700 mb-4 px-1 flex items-center gap-2">
        <lucide-icon name="zap" class="text-inherit"></lucide-icon>
        {{ i18n.t()['home.quickActions.title'] }}
      </h2>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        @for (action of actions(); track action.id; let i = $index) {
          <button
            (click)="navigate(action.route)"
            (keydown.enter)="navigate(action.route)"
            (keydown.space)="navigate(action.route)"
            tabindex="0"
            role="button"
            type="button"
            class="relative group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400 active:scale-95 active:transition-transform"
            [style.animation]="'fadeInUp 500ms ease ' + (i * 60) + 'ms both'"
          >
            <!-- Badge -->
            @if (action.badge > 0) {
              <span class="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white z-10 badge-pulse"
                    [class]="action.id === 'vaccines' ? 'bg-red-500' : 'bg-orange-500'">
                {{ action.badge > 99 ? '99+' : action.badge }}
              </span>
            }

            <!-- Icon circle -->
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110"
                 [class]="action.colorClass">
              <lucide-icon [name]="action.icon.replace('thermostat','thermometer').replace('trending_up','trending-up').replace('edit_document','file-text').replace('vaccines','syringe')" class="text-2xl"></lucide-icon>
            </div>

            <!-- Label -->
            <p class="font-semibold text-gray-800 text-base mb-1">{{ i18n.t()[action.labelKey] }}</p>
            <p class="text-xs text-gray-500 font-medium">{{ i18n.t()[action.descKey] }}</p>
          </button>
        }
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;ffe880c17c89bc6a80a66933bf8953ed18956244dd18fa4abbc056f4106d3288;C:/Users/g_gus/Desktop/jona/kiddok/src/app/components/home/quick-actions-grid.component.ts */\n:host {\n  display: block;\n}\nbutton {\n  transition: transform 200ms ease, box-shadow 200ms ease;\n}\nbutton:hover {\n  transform: translateY(-4px);\n}\nbutton:active {\n  transform: scale(0.95);\n}\n/*# sourceMappingURL=quick-actions-grid.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(QuickActionsGridComponent, { className: "QuickActionsGridComponent", filePath: "src/app/components/home/quick-actions-grid.component.ts", lineNumber: 71 });
})();

// src/app/components/home/health-alert-card.component.ts
var _forTrack02 = ($index, $item) => $item.id;
function HealthAlertCardComponent_Conditional_4_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "button", 6);
    \u0275\u0275listener("click", function HealthAlertCardComponent_Conditional_4_For_1_Template_button_click_1_listener($event) {
      const alert_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.dismissAlert(alert_r2.id, $event));
    });
    \u0275\u0275element(2, "lucide-icon", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 8);
    \u0275\u0275element(4, "lucide-icon", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 10)(6, "p", 11);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 12);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "button", 13);
    \u0275\u0275listener("click", function HealthAlertCardComponent_Conditional_4_For_1_Template_button_click_10_listener() {
      const alert_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.navigate(alert_r2.route));
    });
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const alert_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(alert_r2.bgClass);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r2.i18n.t()["home.alerts.dismiss"]);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(alert_r2.iconBgClass);
    \u0275\u0275advance();
    \u0275\u0275classMap(alert_r2.iconClass);
    \u0275\u0275property("name", alert_r2.icon.replace("thermostat", "thermometer").replace("vaccines", "syringe"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(alert_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(alert_r2.desc);
    \u0275\u0275advance();
    \u0275\u0275classMap(alert_r2.btnClass);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.i18n.t()["home.alerts.takeAction"], " ");
  }
}
function HealthAlertCardComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, HealthAlertCardComponent_Conditional_4_For_1_Template, 12, 13, "div", 4, _forTrack02);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r2.alerts());
  }
}
function HealthAlertCardComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 14);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 15);
    \u0275\u0275element(3, "path", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "div")(5, "p", 17);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 18);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.i18n.t()["home.alerts.allClear"]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.i18n.t()["home.alerts.allClearDesc"], " ");
  }
}
var HealthAlertCardComponent = class _HealthAlertCardComponent {
  constructor() {
    this.dataService = inject(DataService);
    this.i18n = inject(I18nService);
    this.DISMISSED_KEY = "kiddok_dismissed_alerts";
    this.dismissedAlerts = signal(this.loadDismissed(), ...ngDevMode ? [{ debugName: "dismissedAlerts" }] : (
      /* istanbul ignore next */
      []
    ));
    this.alerts = computed(() => {
      const t = this.i18n.t();
      const result = [];
      const activeId = this.dataService.activeChildId();
      const dismissed = this.dismissedAlerts();
      const temps = this.dataService.temperatureEntries().filter((e) => e.childId === activeId).sort((a, b) => new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime());
      if (temps.length > 0 && temps[0].temperature >= 38) {
        const latest = temps[0];
        const measuredDate = new Date(latest.measuredAt);
        const timeAgo = this.timeAgo(measuredDate);
        const id = "fever_" + latest.id;
        if (!dismissed.has(id)) {
          result.push({
            type: "fever",
            priority: 0,
            icon: "thermostat",
            iconBgClass: "bg-rose-100",
            iconClass: "text-rose-500",
            bgClass: "bg-rose-50 border border-rose-200",
            btnClass: "bg-rose-500 hover:bg-rose-600 text-white",
            title: t["home.alerts.fever"],
            desc: t["home.alerts.feverDesc"].replace("{value}", String(latest.temperature)).replace("{time}", timeAgo),
            route: "temperature",
            id
          });
        }
      }
      const overdueVaccines = this.dataService.records().filter((r) => !r.completed && new Date(r.dueDate) < /* @__PURE__ */ new Date());
      for (const v of overdueVaccines.slice(0, 3)) {
        const days = Math.floor((Date.now() - new Date(v.dueDate).getTime()) / 864e5);
        const id = "vaccine_" + v.id;
        if (!dismissed.has(id)) {
          result.push({
            type: "vaccine",
            priority: 1,
            icon: "vaccines",
            iconBgClass: "bg-orange-100",
            iconClass: "text-orange-500",
            bgClass: "bg-orange-50 border border-orange-200",
            btnClass: "bg-orange-500 hover:bg-orange-600 text-white",
            title: t["home.alerts.overdueVaccine"],
            desc: t["home.alerts.overdueVaccineDesc"].replace("{name}", v.title).replace("{days}", String(days)),
            route: "records",
            id
          });
        }
      }
      result.sort((a, b) => a.priority - b.priority);
      return result;
    }, ...ngDevMode ? [{ debugName: "alerts" }] : (
      /* istanbul ignore next */
      []
    ));
    this.hasAnyAlert = computed(() => this.alerts().length > 0, ...ngDevMode ? [{ debugName: "hasAnyAlert" }] : (
      /* istanbul ignore next */
      []
    ));
    effect(() => {
      this.dataService.temperatureEntries();
      this.dataService.records();
      this.dataService.growthEntries();
      this.dismissedAlerts.set(/* @__PURE__ */ new Set());
    });
  }
  loadDismissed() {
    try {
      const raw = localStorage.getItem(this.DISMISSED_KEY);
      if (raw) {
        const arr = JSON.parse(raw);
        return new Set(arr);
      }
    } catch (e) {
    }
    return /* @__PURE__ */ new Set();
  }
  saveDismissed(set) {
    try {
      localStorage.setItem(this.DISMISSED_KEY, JSON.stringify([...set]));
    } catch (e) {
    }
  }
  dismissAlert(alertId, event) {
    event.stopPropagation();
    event.preventDefault();
    const updated = new Set(this.dismissedAlerts());
    updated.add(alertId);
    this.dismissedAlerts.set(updated);
    this.saveDismissed(updated);
  }
  navigate(route) {
    window.dispatchEvent(new CustomEvent("kiddok:navigate", { detail: route }));
  }
  timeAgo(date) {
    const diffMs = Date.now() - date.getTime();
    const diffMins = Math.floor(diffMs / 6e4);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffMins < 60)
      return `${diffMins} min`;
    if (diffHours < 24)
      return `${diffHours} h`;
    return `${diffDays} d`;
  }
  static {
    this.\u0275fac = function HealthAlertCardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HealthAlertCardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HealthAlertCardComponent, selectors: [["app-health-alert-card"]], decls: 6, vars: 2, consts: [[1, "mb-6", "space-y-3"], [1, "text-lg", "font-bold", "text-gray-700", "mb-3", "px-1", "flex", "items-center", "gap-2"], ["name", "alert-triangle", 1, "text-inherit"], [1, "mb-6", "p-5", "rounded-2xl", "bg-teal-50", "border", "border-teal-100", "flex", "items-center", "gap-4"], [1, "relative", "flex", "items-center", "gap-4", "p-4", "rounded-2xl", "border", "transition-all", "duration-200", "animate-slide-up", 3, "class"], [1, "relative", "flex", "items-center", "gap-4", "p-4", "rounded-2xl", "border", "transition-all", "duration-200", "animate-slide-up"], [1, "absolute", "top-2", "right-2", "w-7", "h-7", "rounded-full", "flex", "items-center", "justify-center", "text-gray-400", "hover:text-gray-600", "hover:bg-gray-100", "transition-colors", 3, "click", "title"], ["name", "x", 1, "text-inherit"], [1, "w-10", "h-10", "rounded-xl", "flex", "items-center", "justify-center", "flex-shrink-0"], [1, "text-lg", 3, "name"], [1, "flex-1", "min-w-0", "pr-6"], [1, "font-bold", "text-gray-800", "text-sm"], [1, "text-xs", "text-gray-500", "font-medium", "mt-0.5"], [1, "flex-shrink-0", "px-4", "py-2", "rounded-xl", "font-bold", "text-sm", "transition-all", "hover:scale-105", "active:scale-95", 3, "click"], [1, "w-12", "h-12", "rounded-full", "bg-teal-100", "flex", "items-center", "justify-center", "flex-shrink-0", "animate-scale-in"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2.5", 1, "w-7", "h-7", "text-teal-500"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M5 13l4 4L19 7"], [1, "font-bold", "text-teal-700", "text-sm"], [1, "text-xs", "text-teal-500", "font-medium", "mt-0.5"]], template: function HealthAlertCardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h2", 1);
        \u0275\u0275element(2, "lucide-icon", 2);
        \u0275\u0275text(3);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(4, HealthAlertCardComponent_Conditional_4_Template, 2, 0)(5, HealthAlertCardComponent_Conditional_5_Template, 9, 2, "div", 3);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["home.alerts.title"], " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.hasAnyAlert() ? 4 : 5);
      }
    }, dependencies: [CommonModule, LucideAngularModule, LucideAngularComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(8px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes _ngcontent-%COMP%_scaleIn {\n  from {\n    transform: scale(0);\n    opacity: 0;\n  }\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n.animate-slide-up[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n}\n.animate-scale-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n/*# sourceMappingURL=health-alert-card.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HealthAlertCardComponent, [{
    type: Component,
    args: [{ selector: "app-health-alert-card", standalone: true, imports: [CommonModule, LucideAngularModule], template: `
    <div class="mb-6 space-y-3">
      <h2 class="text-lg font-bold text-gray-700 mb-3 px-1 flex items-center gap-2">
        <lucide-icon name="alert-triangle" class="text-inherit"></lucide-icon>
        {{ i18n.t()['home.alerts.title'] }}
      </h2>

      @if (hasAnyAlert()) {
        @for (alert of alerts(); track alert.id) {
          <div 
            class="relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 animate-slide-up"
            [class]="alert.bgClass"
          >
            <!-- Dismiss button -->
            <button
              (click)="dismissAlert(alert.id, $event)"
              class="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              [title]="i18n.t()['home.alerts.dismiss']"
            >
              <lucide-icon name="x" class="text-inherit"></lucide-icon>
            </button>

            <!-- Icon -->
            <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                 [class]="alert.iconBgClass">
              <lucide-icon [name]="alert.icon.replace('thermostat','thermometer').replace('vaccines','syringe')" class="text-lg" [class]="alert.iconClass"></lucide-icon>
            </div>

            <!-- Text -->
            <div class="flex-1 min-w-0 pr-6">
              <p class="font-bold text-gray-800 text-sm">{{ alert.title }}</p>
              <p class="text-xs text-gray-500 font-medium mt-0.5">{{ alert.desc }}</p>
            </div>

            <!-- Action button -->
            <button
              (click)="navigate(alert.route)"
              class="flex-shrink-0 px-4 py-2 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
              [class]="alert.btnClass"
            >
              {{ i18n.t()['home.alerts.takeAction'] }}
            </button>
          </div>
        }
      } @else {
        <!-- All clear state with animated checkmark -->
        <div class="mb-6 p-5 rounded-2xl bg-teal-50 border border-teal-100 flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 animate-scale-in">
            <svg class="w-7 h-7 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p class="font-bold text-teal-700 text-sm">{{ i18n.t()['home.alerts.allClear'] }}</p>
            <p class="text-xs text-teal-500 font-medium mt-0.5">
              {{ i18n.t()['home.alerts.allClearDesc'] }}
            </p>
          </div>
        </div>
      }
    </div>
  `, styles: ["/* angular:styles/component:css;aaadd18f90f7e4007939cfae6b588f76cf285ad64bb44fd1884bd048ccbca6ef;C:/Users/g_gus/Desktop/jona/kiddok/src/app/components/home/health-alert-card.component.ts */\n:host {\n  display: block;\n}\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(8px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes scaleIn {\n  from {\n    transform: scale(0);\n    opacity: 0;\n  }\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n.animate-slide-up {\n  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n}\n.animate-scale-in {\n  animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n/*# sourceMappingURL=health-alert-card.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HealthAlertCardComponent, { className: "HealthAlertCardComponent", filePath: "src/app/components/home/health-alert-card.component.ts", lineNumber: 102 });
})();

// src/app/components/home/recent-activity-feed.component.ts
var _forTrack03 = ($index, $item) => $item.id;
function RecentActivityFeedComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275element(1, "lucide-icon", 5);
    \u0275\u0275elementEnd();
  }
}
function RecentActivityFeedComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 6);
    \u0275\u0275element(2, "circle", 7)(3, "circle", 8)(4, "path", 9)(5, "circle", 10)(6, "circle", 11)(7, "path", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "p", 13);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 14);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["home.recentActivity.empty"]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["home.recentActivity.emptyDesc"]);
  }
}
function RecentActivityFeedComponent_Conditional_6_For_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r4.notes, " ");
  }
}
function RecentActivityFeedComponent_Conditional_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275listener("click", function RecentActivityFeedComponent_Conditional_6_For_2_Template_div_click_0_listener() {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggleExpand(item_r4.id));
    });
    \u0275\u0275elementStart(1, "div", 19)(2, "div", 20);
    \u0275\u0275element(3, "lucide-icon", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 22)(5, "p", 23);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 24);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 25)(10, "span", 26);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "lucide-icon", 27);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(13, RecentActivityFeedComponent_Conditional_6_For_2_Conditional_13_Template, 2, 1, "div", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(item_r4.borderColor);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(item_r4.color);
    \u0275\u0275advance();
    \u0275\u0275property("name", item_r4.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r4.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.value);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r4.timeLabel);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("text-gray-300 text-base group-hover:text-primary-400 transition-colors ", ctx_r0.isExpanded(item_r4.id) ? "rotate-180" : ""));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isExpanded(item_r4.id) && item_r4.notes ? 13 : -1);
  }
}
function RecentActivityFeedComponent_Conditional_6_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", function RecentActivityFeedComponent_Conditional_6_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.loadMore());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["home.activity.showMore"], " ");
  }
}
function RecentActivityFeedComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275listener("touchstart", function RecentActivityFeedComponent_Conditional_6_Template_div_touchstart_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onTouchStart($event));
    })("touchend", function RecentActivityFeedComponent_Conditional_6_Template_div_touchend_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onTouchEnd($event));
    });
    \u0275\u0275repeaterCreate(1, RecentActivityFeedComponent_Conditional_6_For_2_Template, 14, 12, "div", 16, _forTrack03);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, RecentActivityFeedComponent_Conditional_6_Conditional_3_Template, 2, 1, "button", 17);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.displayedItems());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.hasMore() ? 3 : -1);
  }
}
var RecentActivityFeedComponent = class _RecentActivityFeedComponent {
  constructor() {
    this.dataService = inject(DataService);
    this.i18n = inject(I18nService);
    this.displayedCount = signal(5, ...ngDevMode ? [{ debugName: "displayedCount" }] : (
      /* istanbul ignore next */
      []
    ));
    this.expandedEntries = signal(/* @__PURE__ */ new Set(), ...ngDevMode ? [{ debugName: "expandedEntries" }] : (
      /* istanbul ignore next */
      []
    ));
    this.isRefreshing = signal(false, ...ngDevMode ? [{ debugName: "isRefreshing" }] : (
      /* istanbul ignore next */
      []
    ));
    this.touchStartY = 0;
    this.isRefreshingInProgress = false;
    this.allItems = computed(() => {
      const t = this.i18n.t();
      const activeId = this.dataService.activeChildId();
      const now = /* @__PURE__ */ new Date();
      const temps = this.dataService.temperatureEntries().filter((e) => e.childId === activeId).sort((a, b) => new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime()).slice(0, 50);
      const growths = this.dataService.growthEntries().filter((e) => e.childId === activeId).sort((a, b) => new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime()).slice(0, 50);
      const tempItems = temps.map((e) => ({
        id: e.id,
        type: "temperature",
        icon: "thermostat",
        color: e.temperature >= 38 ? "bg-orange-50 text-orange-500" : "bg-teal-50 text-teal-500",
        borderColor: e.temperature >= 38 ? "border-l-orange-400" : "border-l-teal-400",
        title: t["home.recentActivity.tempRecorded"],
        value: `${e.temperature}\xB0C${e.location ? " \xB7 " + e.location : ""}`,
        timeLabel: this.formatTime(new Date(e.measuredAt), t),
        date: new Date(e.measuredAt),
        groupLabel: this.getGroupLabel(new Date(e.measuredAt), now, t),
        notes: e.notes ?? void 0
      }));
      const growthItems = growths.map((e) => ({
        id: e.id,
        type: "growth",
        icon: "trending-up",
        color: "bg-teal-50 text-teal-500",
        borderColor: "border-l-teal-400",
        title: t["home.recentActivity.growthUpdated"],
        value: [
          e.height ? `${e.height} cm` : null,
          e.weight ? `${e.weight} kg` : null
        ].filter(Boolean).join(" \xB7 ") || "--",
        timeLabel: this.formatTime(new Date(e.measuredAt), t),
        date: new Date(e.measuredAt),
        groupLabel: this.getGroupLabel(new Date(e.measuredAt), now, t),
        notes: e.notes ?? void 0
      }));
      return [...tempItems, ...growthItems].sort((a, b) => b.date.getTime() - a.date.getTime());
    }, ...ngDevMode ? [{ debugName: "allItems" }] : (
      /* istanbul ignore next */
      []
    ));
    this.displayedItems = computed(() => this.allItems().slice(0, this.displayedCount()), ...ngDevMode ? [{ debugName: "displayedItems" }] : (
      /* istanbul ignore next */
      []
    ));
    this.hasMore = computed(() => this.allItems().length > this.displayedCount(), ...ngDevMode ? [{ debugName: "hasMore" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  loadMore() {
    this.displayedCount.update((n) => n + 5);
  }
  toggleExpand(id) {
    const updated = new Set(this.expandedEntries());
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    this.expandedEntries.set(updated);
  }
  isExpanded(id) {
    return this.expandedEntries().has(id);
  }
  // Pull-to-refresh
  onTouchStart(event) {
    this.touchStartY = event.touches[0].clientY;
  }
  onTouchEnd(event) {
    const deltaY = event.changedTouches[0].clientY - this.touchStartY;
    if (deltaY > 80 && !this.isRefreshingInProgress) {
      this.refresh();
    }
  }
  refresh() {
    if (this.isRefreshingInProgress)
      return;
    this.isRefreshingInProgress = true;
    this.isRefreshing.set(true);
    const activeId = this.dataService.activeChildId();
    if (activeId) {
      this.dataService.loadTemperatureEntries(activeId);
      this.dataService.loadGrowthEntries(activeId);
    }
    setTimeout(() => {
      this.isRefreshing.set(false);
      this.isRefreshingInProgress = false;
    }, 1500);
  }
  formatTime(date, t) {
    const diffMs = Date.now() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1e3);
    const diffMins = Math.floor(diffMs / 6e4);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffSecs < 60) {
      return t["home.activity.justNow"] ?? "tani";
    }
    if (diffMins < 60) {
      const unit = this.i18n.isSq() ? "or\xEB" : "hour";
      const n = diffMins;
      const ago = t["home.activity.ago"] ?? "ago";
      return `${diffMins} ${unit} ${ago}`;
    }
    if (diffHours < 24) {
      const unit = this.i18n.isSq() ? "or\xEB" : "hour";
      const ago = t["home.activity.ago"] ?? "ago";
      return `${diffHours} ${unit} ${ago}`;
    }
    const locale = this.i18n.isSq() ? "sq" : "en-US";
    return date.toLocaleDateString(locale, { day: "2-digit", month: "2-digit", year: "numeric" });
  }
  getGroupLabel(date, now, t) {
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const itemDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diffDays = Math.floor((today.getTime() - itemDay.getTime()) / 864e5);
    if (diffDays === 0)
      return t["home.recentActivity.today"];
    if (diffDays === 1)
      return t["home.recentActivity.yesterday"];
    if (diffDays < 7)
      return t["home.recentActivity.thisWeek"];
    return t["home.recentActivity.earlier"];
  }
  static {
    this.\u0275fac = function RecentActivityFeedComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RecentActivityFeedComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RecentActivityFeedComponent, selectors: [["app-recent-activity-feed"]], decls: 7, vars: 3, consts: [[1, "mb-6"], [1, "text-lg", "font-bold", "text-gray-700", "mb-4", "px-1", "flex", "items-center", "gap-2"], ["name", "history", 1, "text-inherit"], [1, "flex", "justify-center", "py-3"], [1, "bg-white", "rounded-2xl", "border", "border-gray-100", "shadow-sm", "p-10", "text-center"], ["name", "refresh-cw", 1, "text-inherit"], ["viewBox", "0 0 120 120", "fill", "none", "xmlns", "http://www.w3.org/2000/svg", 1, "w-24", "h-24", "mx-auto", "mb-4", "text-primary-200"], ["cx", "60", "cy", "60", "r", "50", "fill", "currentColor", "opacity", "0.15"], ["cx", "60", "cy", "45", "r", "18", "fill", "currentColor", "opacity", "0.3"], ["d", "M32 85 C32 65, 45 55, 60 55 C75 55, 88 65, 88 85 Z", "fill", "currentColor", "opacity", "0.2"], ["cx", "52", "cy", "42", "r", "3", "fill", "currentColor", "opacity", "0.5"], ["cx", "68", "cy", "42", "r", "3", "fill", "currentColor", "opacity", "0.5"], ["d", "M54 52 Q60 57 66 52", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "fill", "none", "opacity", "0.4"], [1, "font-semibold", "text-gray-600", "text-base", "mb-1"], [1, "text-sm", "text-gray-500", "font-medium"], [1, "bg-white", "rounded-2xl", "border", "border-gray-100", "shadow-sm", "divide-y", "divide-gray-50", "overflow-hidden", 3, "touchstart", "touchend"], [1, "border-l-4", "flex", "flex-col", "gap-0", "p-0", "hover:bg-gray-50", "transition-colors", "cursor-pointer", "group", 3, "class"], [1, "mt-3", "w-full", "py-3", "rounded-xl", "text-sm", "font-bold", "text-primary-500", "bg-white", "border", "border-primary-100", "hover:bg-primary-50", "transition-colors"], [1, "border-l-4", "flex", "flex-col", "gap-0", "p-0", "hover:bg-gray-50", "transition-colors", "cursor-pointer", "group", 3, "click"], [1, "flex", "items-center", "gap-4", "p-4"], [1, "w-10", "h-10", "rounded-xl", "flex", "items-center", "justify-center", "flex-shrink-0"], [1, "text-lg", 3, "name"], [1, "flex-1", "min-w-0"], [1, "font-semibold", "text-gray-800", "text-sm", "truncate"], [1, "text-xs", "text-gray-500", "font-medium", "mt-0.5"], [1, "flex", "items-center", "gap-2", "flex-shrink-0"], [1, "text-xs", "text-gray-500", "font-medium"], ["name", "chevron-down"], [1, "px-4", "pb-4", "pt-1", "text-xs", "text-gray-600", "border-t", "border-gray-100"], [1, "mt-3", "w-full", "py-3", "rounded-xl", "text-sm", "font-bold", "text-primary-500", "bg-white", "border", "border-primary-100", "hover:bg-primary-50", "transition-colors", 3, "click"]], template: function RecentActivityFeedComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h2", 1);
        \u0275\u0275element(2, "lucide-icon", 2);
        \u0275\u0275text(3);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(4, RecentActivityFeedComponent_Conditional_4_Template, 2, 0, "div", 3);
        \u0275\u0275conditionalCreate(5, RecentActivityFeedComponent_Conditional_5_Template, 12, 2, "div", 4)(6, RecentActivityFeedComponent_Conditional_6_Template, 4, 1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["home.recentActivity.title"], " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.isRefreshing() ? 4 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.allItems().length === 0 && !ctx.isRefreshing() ? 5 : 6);
      }
    }, dependencies: [CommonModule, LucideAngularModule, LucideAngularComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.rotate-90[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n}\n/*# sourceMappingURL=recent-activity-feed.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RecentActivityFeedComponent, [{
    type: Component,
    args: [{ selector: "app-recent-activity-feed", standalone: true, imports: [CommonModule, LucideAngularModule], template: `
    <div class="mb-6">
      <h2 class="text-lg font-bold text-gray-700 mb-4 px-1 flex items-center gap-2">
        <lucide-icon name="history" class="text-inherit"></lucide-icon>
        {{ i18n.t()['home.recentActivity.title'] }}
      </h2>

      @if (isRefreshing()) {
        <div class="flex justify-center py-3">
          <lucide-icon name="refresh-cw" class="text-inherit"></lucide-icon>
        </div>
      }

      @if (allItems().length === 0 && !isRefreshing()) {
        <!-- Empty state -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
          <svg class="w-24 h-24 mx-auto mb-4 text-primary-200" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="50" fill="currentColor" opacity="0.15"/>
            <circle cx="60" cy="45" r="18" fill="currentColor" opacity="0.3"/>
            <path d="M32 85 C32 65, 45 55, 60 55 C75 55, 88 65, 88 85 Z" fill="currentColor" opacity="0.2"/>
            <circle cx="52" cy="42" r="3" fill="currentColor" opacity="0.5"/>
            <circle cx="68" cy="42" r="3" fill="currentColor" opacity="0.5"/>
            <path d="M54 52 Q60 57 66 52" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.4"/>
          </svg>
          <p class="font-semibold text-gray-600 text-base mb-1">{{ i18n.t()['home.recentActivity.empty'] }}</p>
          <p class="text-sm text-gray-500 font-medium">{{ i18n.t()['home.recentActivity.emptyDesc'] }}</p>
        </div>
      } @else {
        <div 
          class="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50 overflow-hidden"
          (touchstart)="onTouchStart($event)"
          (touchend)="onTouchEnd($event)"
        >
          @for (item of displayedItems(); track item.id; let i = $index) {
            <div 
              class="border-l-4 flex flex-col gap-0 p-0 hover:bg-gray-50 transition-colors cursor-pointer group"
              [class]="item.borderColor"
              (click)="toggleExpand(item.id)"
            >
              <div class="flex items-center gap-4 p-4">
                <!-- Icon -->
                <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                     [class]="item.color">
                  <lucide-icon [name]="item.icon" class="text-lg"></lucide-icon>
                </div>

                <!-- Content -->
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-gray-800 text-sm truncate">{{ item.title }}</p>
                  <p class="text-xs text-gray-500 font-medium mt-0.5">{{ item.value }}</p>
                </div>

                <!-- Time + chevron -->
                <div class="flex items-center gap-2 flex-shrink-0">
                  <span class="text-xs text-gray-500 font-medium">{{ item.timeLabel }}</span>
                  <lucide-icon name="chevron-down" class="text-gray-300 text-base group-hover:text-primary-400 transition-colors {{ isExpanded(item.id) ? 'rotate-180' : '' }}"></lucide-icon>
                </div>
              </div>

              <!-- Expanded notes -->
              @if (isExpanded(item.id) && item.notes) {
                <div class="px-4 pb-4 pt-1 text-xs text-gray-600 border-t border-gray-100">
                  {{ item.notes }}
                </div>
              }
            </div>
          }
        </div>

        @if (hasMore()) {
          <button 
            (click)="loadMore()"
            class="mt-3 w-full py-3 rounded-xl text-sm font-bold text-primary-500 bg-white border border-primary-100 hover:bg-primary-50 transition-colors"
          >
            {{ i18n.t()['home.activity.showMore'] }}
          </button>
        }
      }
    </div>
  `, styles: ["/* angular:styles/component:css;4385ef1dc8cc12ed1686615b213fad8c83346fce382019d6497d1e32ac7c1cc9;C:/Users/g_gus/Desktop/jona/kiddok/src/app/components/home/recent-activity-feed.component.ts */\n:host {\n  display: block;\n}\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.rotate-90 {\n  transform: rotate(180deg);\n}\n/*# sourceMappingURL=recent-activity-feed.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RecentActivityFeedComponent, { className: "RecentActivityFeedComponent", filePath: "src/app/components/home/recent-activity-feed.component.ts", lineNumber: 115 });
})();

// src/app/components/growth-chart/growth-chart.component.ts
var _c0 = ["chartCanvas"];
var _forTrack04 = ($index, $item) => $item.value;
var _forTrack1 = ($index, $item) => $item.id;
function GrowthChartComponent_Conditional_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const child_r3 = ctx.$implicit;
    \u0275\u0275property("value", child_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(child_r3.name);
  }
}
function GrowthChartComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "select", 19);
    \u0275\u0275twoWayListener("ngModelChange", function GrowthChartComponent_Conditional_6_Template_select_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedChildId, $event) || (ctx_r1.selectedChildId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function GrowthChartComponent_Conditional_6_Template_select_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onChildChange($event));
    });
    \u0275\u0275repeaterCreate(1, GrowthChartComponent_Conditional_6_For_2_Template, 2, 2, "option", 20, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedChildId);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.children());
  }
}
function GrowthChartComponent_For_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function GrowthChartComponent_For_22_Template_button_click_0_listener() {
      const range_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectRange(range_r5.value));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const range_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", ctx_r1.activeRange() === range_r5.value ? "bg-primary-600 text-white shadow-sm" : "bg-white text-slate-500 border border-slate-200 hover:border-primary-300 hover:text-primary-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", range_r5.label, " ");
  }
}
function GrowthChartComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 22);
    \u0275\u0275element(2, "lucide-icon", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 24);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["growthChart.noChild"]);
  }
}
function GrowthChartComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 22);
    \u0275\u0275element(2, "lucide-icon", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 24);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["growthChart.noData"]);
  }
}
function GrowthChartComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 22);
    \u0275\u0275element(2, "lucide-icon", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 24);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["growthChart.singleEntry"]);
  }
}
function GrowthChartComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "canvas", 17, 0);
  }
}
function GrowthChartComponent_Conditional_28_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 33);
    \u0275\u0275listener("click", function GrowthChartComponent_Conditional_28_Conditional_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.clearFilters());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["growthChart.clearFilter"], " ");
  }
}
function GrowthChartComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 5);
    \u0275\u0275element(2, "div", 27);
    \u0275\u0275elementStart(3, "span", 28);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 5);
    \u0275\u0275element(6, "div", 29);
    \u0275\u0275elementStart(7, "span", 28);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 30)(10, "button", 31);
    \u0275\u0275listener("click", function GrowthChartComponent_Conditional_28_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleUnit());
    });
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(12, GrowthChartComponent_Conditional_28_Conditional_12_Template, 2, 1, "button", 32);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.heightLabel());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.weightLabel());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.useMetric() ? "kg/cm" : "lb/in", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.hasActiveFilters() ? 12 : -1);
  }
}
var GrowthChartComponent = class _GrowthChartComponent {
  // ── Lifecycle ─────────────────────────────────────────────────
  constructor() {
    this.dataService = inject(DataService);
    this.i18n = inject(I18nService);
    this.selectedChildId = signal("", ...ngDevMode ? [{ debugName: "selectedChildId" }] : (
      /* istanbul ignore next */
      []
    ));
    this.dateFrom = signal("", ...ngDevMode ? [{ debugName: "dateFrom" }] : (
      /* istanbul ignore next */
      []
    ));
    this.dateTo = signal("", ...ngDevMode ? [{ debugName: "dateTo" }] : (
      /* istanbul ignore next */
      []
    ));
    this.activeRange = signal("all", ...ngDevMode ? [{ debugName: "activeRange" }] : (
      /* istanbul ignore next */
      []
    ));
    this.useMetric = signal(true, ...ngDevMode ? [{ debugName: "useMetric" }] : (
      /* istanbul ignore next */
      []
    ));
    this.chartInstance = null;
    this.chartEffect = null;
    this.chartInitialized = false;
    this.dateRanges = [
      { value: "1m", label: "1M" },
      { value: "3m", label: "3M" },
      { value: "6m", label: "6M" },
      { value: "1y", label: "1Y" },
      { value: "all", label: "All" }
    ];
    this.children = this.dataService.children;
    this.filteredEntries = computed(() => {
      const entries = this.dataService.growthEntries();
      const from = this.dateFrom();
      const to = this.dateTo();
      return [...entries].filter((e) => {
        const d = new Date(e.measuredAt);
        return (!from || d >= new Date(from)) && (!to || d <= new Date(to));
      }).sort((a, b) => new Date(a.measuredAt).getTime() - new Date(b.measuredAt).getTime());
    }, ...ngDevMode ? [{ debugName: "filteredEntries" }] : (
      /* istanbul ignore next */
      []
    ));
    this.state = computed(() => {
      if (!this.selectedChildId())
        return "no-child";
      const entries = this.filteredEntries();
      if (entries.length === 0)
        return "no-data";
      if (entries.length === 1)
        return "single";
      return "ok";
    }, ...ngDevMode ? [{ debugName: "state" }] : (
      /* istanbul ignore next */
      []
    ));
    this.heightLabel = computed(() => this.useMetric() ? this.i18n.t()["growthChart.heightLabel"] : this.i18n.t()["growthChart.heightLabelImperial"], ...ngDevMode ? [{ debugName: "heightLabel" }] : (
      /* istanbul ignore next */
      []
    ));
    this.weightLabel = computed(() => this.useMetric() ? this.i18n.t()["growthChart.weightLabel"] : this.i18n.t()["growthChart.weightLabelImperial"], ...ngDevMode ? [{ debugName: "weightLabel" }] : (
      /* istanbul ignore next */
      []
    ));
    this.hasActiveFilters = computed(() => !!this.dateFrom() || !!this.dateTo() || this.activeRange() !== "all", ...ngDevMode ? [{ debugName: "hasActiveFilters" }] : (
      /* istanbul ignore next */
      []
    ));
    effect(() => {
      const activeId = this.dataService.activeChildId();
      const children = this.dataService.children();
      if (activeId) {
        this.selectedChildId.set(activeId);
      } else if (children.length > 0) {
        this.selectedChildId.set(children[0].id);
      }
    });
    this.chartEffect = effect(() => {
      const _entries = this.dataService.growthEntries();
      const _childId = this.selectedChildId();
      if (this.chartInitialized) {
        this.renderChart();
      }
    }, ...ngDevMode ? [{ debugName: "chartEffect" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  ngOnDestroy() {
    this.chartEffect?.destroy();
    this.chartEffect = null;
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
  }
  // ── Actions ──────────────────────────────────────────────────
  onChildChange(childId) {
    this.selectedChildId.set(childId);
    this.dataService.switchChild(childId);
    this.dataService.loadGrowthEntries(childId);
  }
  refresh() {
    const cid = this.selectedChildId();
    if (cid) {
      this.dataService.loadGrowthEntries(cid);
      setTimeout(() => this.renderChart(), 200);
    }
  }
  onDateRangeChange() {
    this.activeRange.set(this.dateFrom() || this.dateTo() ? "all" : "all");
    this.renderChart();
  }
  selectRange(range) {
    this.activeRange.set(range);
    const now = /* @__PURE__ */ new Date();
    let from = "";
    if (range === "1m") {
      from = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).toISOString().split("T")[0];
    } else if (range === "3m") {
      from = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()).toISOString().split("T")[0];
    } else if (range === "6m") {
      from = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate()).toISOString().split("T")[0];
    } else if (range === "1y") {
      from = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()).toISOString().split("T")[0];
    } else {
      from = "";
    }
    this.dateFrom.set(from);
    this.dateTo.set("");
    this.renderChart();
  }
  clearFilters() {
    this.dateFrom.set("");
    this.dateTo.set("");
    this.activeRange.set("all");
    this.renderChart();
  }
  toggleUnit() {
    this.useMetric.set(!this.useMetric());
    this.renderChart();
  }
  // ── Chart ────────────────────────────────────────────────────
  renderChart() {
    if (this.state() !== "ok")
      return;
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
      this.chartInitialized = false;
    }
    if (!this.chartCanvasRef)
      return;
    const canvas = this.chartCanvasRef.nativeElement;
    const ctx = canvas.getContext("2d");
    if (!ctx)
      return;
    if (typeof window.Chart === "undefined") {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js";
      script.onload = () => this.buildChart(ctx);
      document.head.appendChild(script);
    } else {
      this.buildChart(ctx);
    }
  }
  buildChart(ctx) {
    const Chart = window.Chart;
    const entries = this.filteredEntries();
    const metric = this.useMetric();
    const labels = entries.map((e) => this.formatDate(e.measuredAt));
    const heightData = entries.map((e) => {
      if (e.height === null)
        return null;
      return metric ? e.height : parseFloat((e.height * 0.393701).toFixed(1));
    });
    const weightData = entries.map((e) => {
      if (e.weight === null)
        return null;
      return metric ? e.weight : parseFloat((e.weight * 2.20462).toFixed(2));
    });
    const heightUnit = metric ? "cm" : "in";
    const weightUnit = metric ? "kg" : "lb";
    const heightLabel = this.i18n.t()["growthChart.heightLabel"];
    const weightLabel = this.i18n.t()["growthChart.weightLabel"];
    this.chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: heightLabel,
            data: heightData,
            borderColor: "rgba(99, 102, 241, 0.9)",
            backgroundColor: "rgba(99, 102, 241, 0.1)",
            borderWidth: 2.5,
            pointBackgroundColor: "rgba(99, 102, 241, 0.9)",
            pointBorderColor: "#fff",
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: true,
            tension: 0.4,
            yAxisID: "y"
          },
          {
            label: weightLabel,
            data: weightData,
            borderColor: "rgba(20, 184, 166, 0.9)",
            backgroundColor: "rgba(20, 184, 166, 0.1)",
            borderWidth: 2.5,
            pointBackgroundColor: "rgba(20, 184, 166, 0.9)",
            pointBorderColor: "#fff",
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: true,
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
            display: false
            // We use custom legend below canvas
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
                const v = ctx2.parsed.y;
                if (v === null)
                  return null;
                const unit = ctx2.datasetIndex === 0 ? heightUnit : weightUnit;
                return ` ${ctx2.dataset.label}: ${v} ${unit}`;
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
              text: heightLabel + ` (${heightUnit})`,
              color: "rgba(99, 102, 241, 0.8)",
              font: { size: 11, weight: "600" }
            },
            grid: { color: "rgba(0,0,0,0.05)" },
            ticks: {
              callback: (v) => v + ` ${heightUnit}`,
              color: "#a8a29e",
              font: { size: 10 }
            }
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: weightLabel + ` (${weightUnit})`,
              color: "rgba(20, 184, 166, 0.8)",
              font: { size: 11, weight: "600" }
            },
            grid: { drawOnChartArea: false },
            ticks: {
              callback: (v) => v + ` ${weightUnit}`,
              color: "#a8a29e",
              font: { size: 10 }
            }
          },
          x: {
            grid: { display: false },
            ticks: { color: "#a8a29e", font: { size: 9 }, maxTicksLimit: 8 }
          }
        }
      }
    });
    this.chartInitialized = true;
  }
  formatDate(iso) {
    const locale = this.i18n.locale() === "sq" ? "sq-AL" : "en-US";
    return new Date(iso).toLocaleDateString(locale, { day: "numeric", month: "short" });
  }
  static {
    this.\u0275fac = function GrowthChartComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _GrowthChartComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GrowthChartComponent, selectors: [["app-growth-chart"]], viewQuery: function GrowthChartComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.chartCanvasRef = _t.first);
      }
    }, decls: 29, vars: 10, consts: [["chartCanvas", ""], [1, "bg-white", "rounded-[2rem]", "shadow-md", "border", "border-slate-100", "overflow-hidden"], [1, "px-6", "py-5", "flex", "items-center", "justify-between", "border-b", "border-slate-100"], [1, "text-lg", "font-extrabold", "text-gray-800", "flex", "items-center", "gap-2"], ["name", "trending-up", 1, "text-inherit"], [1, "flex", "items-center", "gap-2"], [1, "text-sm", "font-semibold", "px-3", "py-2", "rounded-xl", "border-2", "border-slate-200", "bg-slate-50", "outline-none", "focus:ring-2", "focus:ring-primary-500/10", "focus:border-primary-500", "text-gray-700", "cursor-pointer", 3, "ngModel"], [1, "w-9", "h-9", "rounded-xl", "bg-slate-50", "hover:bg-primary-50", "border", "border-slate-200", "hover:border-primary-300", "flex", "items-center", "justify-center", "text-slate-400", "hover:text-primary-600", "transition-all", "shadow-sm", 3, "click"], ["name", "rotate-cw", 1, "text-inherit", 3, "size"], [1, "px-6", "py-3", "flex", "flex-wrap", "items-center", "gap-3", "border-b", "border-slate-100", "bg-slate-50/50"], [1, "text-xs", "font-bold", "text-slate-500", "uppercase", "tracking-wider"], ["type", "date", 1, "text-sm", "px-3", "py-2", "rounded-xl", "border-2", "border-slate-200", "bg-white", "outline-none", "focus:ring-2", "focus:ring-primary-500/10", "focus:border-primary-500", "text-gray-700", 3, "ngModelChange", "ngModel"], [1, "text-slate-300", "font-bold"], [1, "flex", "items-center", "gap-1", "ml-auto"], [1, "px-3", "py-1.5", "rounded-lg", "text-xs", "font-bold", "transition-all", 3, "ngClass"], [1, "px-6", "py-5", 2, "height", "300px", "position", "relative"], [1, "h-full", "flex", "flex-col", "items-center", "justify-center", "text-center"], [1, "w-full", "h-full", 2, "display", "block"], [1, "px-6", "pb-5", "flex", "flex-wrap", "items-center", "gap-4"], [1, "text-sm", "font-semibold", "px-3", "py-2", "rounded-xl", "border-2", "border-slate-200", "bg-slate-50", "outline-none", "focus:ring-2", "focus:ring-primary-500/10", "focus:border-primary-500", "text-gray-700", "cursor-pointer", 3, "ngModelChange", "ngModel"], [3, "value"], [1, "px-3", "py-1.5", "rounded-lg", "text-xs", "font-bold", "transition-all", 3, "click", "ngClass"], [1, "w-14", "h-14", "bg-slate-100", "rounded-full", "flex", "items-center", "justify-center", "mb-3"], ["name", "user-x", 1, "text-inherit"], [1, "text-slate-500", "font-semibold", "text-sm"], ["name", "bar-chart-2", 1, "text-inherit"], ["name", "alert-circle", 1, "text-inherit"], [1, "w-3", "h-3", "rounded-full", "bg-indigo-500", "flex-shrink-0"], [1, "text-xs", "font-semibold", "text-slate-600"], [1, "w-3", "h-3", "rounded-full", "bg-teal-500", "flex-shrink-0"], [1, "ml-auto", "flex", "items-center", "gap-3"], [1, "px-3", "py-1.5", "rounded-xl", "text-xs", "font-bold", "border-2", "border-slate-200", "text-slate-500", "hover:border-primary-300", "hover:text-primary-600", "transition-all", "bg-white", 3, "click"], [1, "px-3", "py-1.5", "rounded-xl", "text-xs", "font-bold", "bg-slate-100", "text-slate-400", "hover:bg-red-50", "hover:text-red-500", "border", "border-slate-200", "hover:border-red-200", "transition-all"], [1, "px-3", "py-1.5", "rounded-xl", "text-xs", "font-bold", "bg-slate-100", "text-slate-400", "hover:bg-red-50", "hover:text-red-500", "border", "border-slate-200", "hover:border-red-200", "transition-all", 3, "click"]], template: function GrowthChartComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h3", 3);
        \u0275\u0275element(3, "lucide-icon", 4);
        \u0275\u0275text(4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 5);
        \u0275\u0275conditionalCreate(6, GrowthChartComponent_Conditional_6_Template, 3, 1, "select", 6);
        \u0275\u0275elementStart(7, "button", 7);
        \u0275\u0275listener("click", function GrowthChartComponent_Template_button_click_7_listener() {
          return ctx.refresh();
        });
        \u0275\u0275element(8, "lucide-icon", 8);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(9, "div", 9)(10, "div", 5)(11, "label", 10);
        \u0275\u0275text(12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "input", 11);
        \u0275\u0275twoWayListener("ngModelChange", function GrowthChartComponent_Template_input_ngModelChange_13_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.dateFrom, $event) || (ctx.dateFrom = $event);
          return $event;
        });
        \u0275\u0275listener("ngModelChange", function GrowthChartComponent_Template_input_ngModelChange_13_listener() {
          return ctx.onDateRangeChange();
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "span", 12);
        \u0275\u0275text(15, "\u2192");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 5)(17, "label", 10);
        \u0275\u0275text(18);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "input", 11);
        \u0275\u0275twoWayListener("ngModelChange", function GrowthChartComponent_Template_input_ngModelChange_19_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.dateTo, $event) || (ctx.dateTo = $event);
          return $event;
        });
        \u0275\u0275listener("ngModelChange", function GrowthChartComponent_Template_input_ngModelChange_19_listener() {
          return ctx.onDateRangeChange();
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(20, "div", 13);
        \u0275\u0275repeaterCreate(21, GrowthChartComponent_For_22_Template, 2, 2, "button", 14, _forTrack04);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(23, "div", 15);
        \u0275\u0275conditionalCreate(24, GrowthChartComponent_Conditional_24_Template, 5, 1, "div", 16)(25, GrowthChartComponent_Conditional_25_Template, 5, 1, "div", 16)(26, GrowthChartComponent_Conditional_26_Template, 5, 1, "div", 16)(27, GrowthChartComponent_Conditional_27_Template, 2, 0, "canvas", 17);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(28, GrowthChartComponent_Conditional_28_Template, 13, 4, "div", 18);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["growthChart.title"], " ");
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.children().length > 0 ? 6 : -1);
        \u0275\u0275advance();
        \u0275\u0275attribute("aria-label", ctx.i18n.t()["sidebar.refresh"] || "Refresh");
        \u0275\u0275advance();
        \u0275\u0275property("size", 15);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.i18n.t()["growthChart.dateFrom"]);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.dateFrom);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.i18n.t()["growthChart.dateTo"]);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.dateTo);
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.dateRanges);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.state() === "no-child" ? 24 : ctx.state() === "no-data" || ctx.state() === "empty" ? 25 : ctx.state() === "single" ? 26 : 27);
        \u0275\u0275advance(4);
        \u0275\u0275conditional(ctx.state() === "ok" ? 28 : -1);
      }
    }, dependencies: [CommonModule, NgClass, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, LucideAngularModule, LucideAngularComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=growth-chart.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GrowthChartComponent, [{
    type: Component,
    args: [{ selector: "app-growth-chart", standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="bg-white rounded-[2rem] shadow-md border border-slate-100 overflow-hidden">

      <!-- Card Header -->
      <div class="px-6 py-5 flex items-center justify-between border-b border-slate-100">
        <h3 class="text-lg font-extrabold text-gray-800 flex items-center gap-2">
          <lucide-icon name="trending-up" class="text-inherit"></lucide-icon>
          {{ i18n.t()['growthChart.title'] }}
        </h3>
        <div class="flex items-center gap-2">
          <!-- Child selector -->
          @if (children().length > 0) {
            <select
              [(ngModel)]="selectedChildId"
              (ngModelChange)="onChildChange($event)"
              class="text-sm font-semibold px-3 py-2 rounded-xl border-2 border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 text-gray-700 cursor-pointer">
              @for (child of children(); track child.id) {
                <option [value]="child.id">{{ child.name }}</option>
              }
            </select>
          }
          <!-- Refresh -->
          <button
            (click)="refresh()"
            class="w-9 h-9 rounded-xl bg-slate-50 hover:bg-primary-50 border border-slate-200 hover:border-primary-300 flex items-center justify-center text-slate-400 hover:text-primary-600 transition-all shadow-sm"
            [attr.aria-label]="i18n.t()['sidebar.refresh'] || 'Refresh'">
            <lucide-icon name="rotate-cw" [size]="15" class="text-inherit"></lucide-icon>
          </button>
        </div>
      </div>

      <!-- Date Range + Unit Filter Bar -->
      <div class="px-6 py-3 flex flex-wrap items-center gap-3 border-b border-slate-100 bg-slate-50/50">
        <div class="flex items-center gap-2">
          <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">{{ i18n.t()['growthChart.dateFrom'] }}</label>
          <input type="date" [(ngModel)]="dateFrom"
                 (ngModelChange)="onDateRangeChange()"
                 class="text-sm px-3 py-2 rounded-xl border-2 border-slate-200 bg-white outline-none focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 text-gray-700">
        </div>
        <span class="text-slate-300 font-bold">\u2192</span>
        <div class="flex items-center gap-2">
          <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">{{ i18n.t()['growthChart.dateTo'] }}</label>
          <input type="date" [(ngModel)]="dateTo"
                 (ngModelChange)="onDateRangeChange()"
                 class="text-sm px-3 py-2 rounded-xl border-2 border-slate-200 bg-white outline-none focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 text-gray-700">
        </div>

        <!-- Quick range chips -->
        <div class="flex items-center gap-1 ml-auto">
          @for (range of dateRanges; track range.value) {
            <button
              (click)="selectRange(range.value)"
              class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
              [ngClass]="activeRange() === range.value
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-white text-slate-500 border border-slate-200 hover:border-primary-300 hover:text-primary-600'">
              {{ range.label }}
            </button>
          }
        </div>
      </div>

      <!-- Chart Area -->
      <div class="px-6 py-5" style="height: 300px; position: relative;">
        @if (state() === 'no-child') {
          <div class="h-full flex flex-col items-center justify-center text-center">
            <div class="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-3">
              <lucide-icon name="user-x" class="text-inherit"></lucide-icon>
            </div>
            <p class="text-slate-500 font-semibold text-sm">{{ i18n.t()['growthChart.noChild'] }}</p>
          </div>
        } @else if (state() === 'no-data' || state() === 'empty') {
          <div class="h-full flex flex-col items-center justify-center text-center">
            <div class="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-3">
              <lucide-icon name="bar-chart-2" class="text-inherit"></lucide-icon>
            </div>
            <p class="text-slate-500 font-semibold text-sm">{{ i18n.t()['growthChart.noData'] }}</p>
          </div>
        } @else if (state() === 'single') {
          <div class="h-full flex flex-col items-center justify-center text-center">
            <div class="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-3">
              <lucide-icon name="alert-circle" class="text-inherit"></lucide-icon>
            </div>
            <p class="text-slate-500 font-semibold text-sm">{{ i18n.t()['growthChart.singleEntry'] }}</p>
          </div>
        } @else {
          <canvas #chartCanvas class="w-full h-full" style="display: block;"></canvas>
        }
      </div>

      <!-- Legend -->
      @if (state() === 'ok') {
        <div class="px-6 pb-5 flex flex-wrap items-center gap-4">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-indigo-500 flex-shrink-0"></div>
            <span class="text-xs font-semibold text-slate-600">{{ heightLabel() }}</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-teal-500 flex-shrink-0"></div>
            <span class="text-xs font-semibold text-slate-600">{{ weightLabel() }}</span>
          </div>
          <div class="ml-auto flex items-center gap-3">
            <button
              (click)="toggleUnit()"
              class="px-3 py-1.5 rounded-xl text-xs font-bold border-2 border-slate-200 text-slate-500 hover:border-primary-300 hover:text-primary-600 transition-all bg-white">
              {{ useMetric() ? 'kg/cm' : 'lb/in' }}
            </button>
            @if (hasActiveFilters()) {
              <button
                (click)="clearFilters()"
                class="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500 border border-slate-200 hover:border-red-200 transition-all">
                {{ i18n.t()['growthChart.clearFilter'] }}
              </button>
            }
          </div>
        </div>
      }
    </div>
  `, styles: ["/* angular:styles/component:css;239657c732bfd36205d0b60d0c3c630c7c77adaaccb59693b759836aabe365d3;C:/Users/g_gus/Desktop/jona/kiddok/src/app/components/growth-chart/growth-chart.component.ts */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=growth-chart.component.css.map */\n"] }]
  }], () => [], { chartCanvasRef: [{
    type: ViewChild,
    args: ["chartCanvas"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GrowthChartComponent, { className: "GrowthChartComponent", filePath: "src/app/components/growth-chart/growth-chart.component.ts", lineNumber: 147 });
})();

// src/app/components/home.component.ts
var HomeComponent = class _HomeComponent {
  static {
    this.\u0275fac = function HomeComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HomeComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["app-home"]], decls: 6, vars: 0, consts: [[1, "px-2", "max-w-6xl", "mx-auto"]], template: function HomeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "app-welcome-hero")(2, "app-quick-actions-grid")(3, "app-health-alert-card")(4, "app-growth-chart")(5, "app-recent-activity-feed");
        \u0275\u0275elementEnd();
      }
    }, dependencies: [CommonModule, LucideAngularModule, WelcomeHeroComponent, QuickActionsGridComponent, HealthAlertCardComponent, RecentActivityFeedComponent, GrowthChartComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=home.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HomeComponent, [{
    type: Component,
    args: [{ selector: "app-home", imports: [CommonModule, LucideAngularModule, WelcomeHeroComponent, QuickActionsGridComponent, HealthAlertCardComponent, RecentActivityFeedComponent, GrowthChartComponent], template: `
    <div class="px-2 max-w-6xl mx-auto">
      <app-welcome-hero />
      <app-quick-actions-grid />
      <app-health-alert-card />
      <app-growth-chart />
      <app-recent-activity-feed />
    </div>
  `, styles: ["/* angular:styles/component:css;4edade868300c889bf3186ff41a82f8dc02abd53db4197e6f0acdbebcee4f2ee;C:/Users/g_gus/Desktop/jona/kiddok/src/app/components/home.component.ts */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=home.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "src/app/components/home.component.ts", lineNumber: 27 });
})();
export {
  HomeComponent
};
//# sourceMappingURL=chunk-B6T6BQQQ.js.map
