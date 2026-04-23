import {
  CommonModule,
  DatePipe,
  DefaultValueAccessor,
  FormsModule,
  LucideAngularComponent,
  LucideAngularModule,
  NgClass,
  NgControlStatus,
  NgModel,
  RadioControlValueAccessor
} from "./chunk-IFHIJ3FQ.js";
import {
  DataService,
  I18nService
} from "./chunk-IK3YYCP3.js";
import {
  Component,
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
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-SFGRG2UU.js";

// src/app/components/records.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function RecordsComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 11)(2, "h3", 12);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 13);
    \u0275\u0275listener("click", function RecordsComponent_Conditional_11_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.isAdding.set(false));
    });
    \u0275\u0275element(5, "lucide-icon", 14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 15)(7, "div")(8, "label", 16);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 17);
    \u0275\u0275twoWayListener("ngModelChange", function RecordsComponent_Conditional_11_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.fTitle, $event) || (ctx_r1.fTitle = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div")(12, "label", 16);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 18)(15, "label", 19)(16, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function RecordsComponent_Conditional_11_Template_input_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.fCompleted, $event) || (ctx_r1.fCompleted = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "lucide-icon", 21);
    \u0275\u0275elementStart(18, "span", 22);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "label", 19)(21, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function RecordsComponent_Conditional_11_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.fCompleted, $event) || (ctx_r1.fCompleted = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(22, "lucide-icon", 23);
    \u0275\u0275elementStart(23, "span", 22);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(25, "div")(26, "label", 16);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "input", 24);
    \u0275\u0275twoWayListener("ngModelChange", function RecordsComponent_Conditional_11_Template_input_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.fDate, $event) || (ctx_r1.fDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "button", 25);
    \u0275\u0275listener("click", function RecordsComponent_Conditional_11_Template_button_click_29_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submit());
    });
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.t()["records.formTitle"]);
    \u0275\u0275advance(2);
    \u0275\u0275property("size", 16);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.t()["records.nameLabel"]);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.fTitle);
    \u0275\u0275property("placeholder", ctx_r1.t()["records.namePlaceholder"]);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.t()["records.statusLabel"]);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.fCompleted ? "border-primary-500 bg-primary-50" : "border-gray-200 bg-slate-50");
    \u0275\u0275advance();
    \u0275\u0275property("value", true);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.fCompleted);
    \u0275\u0275advance();
    \u0275\u0275property("size", 16);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.t()["records.completed"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", !ctx_r1.fCompleted ? "border-orange-500 bg-orange-50" : "border-gray-200 bg-slate-50");
    \u0275\u0275advance();
    \u0275\u0275property("value", false);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.fCompleted);
    \u0275\u0275advance();
    \u0275\u0275property("size", 16);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.t()["records.pending"]);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.t()["records.dateLabel"]);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.fDate);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t()["records.updateButton"], " ");
  }
}
function RecordsComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275element(1, "lucide-icon", 26);
    \u0275\u0275elementStart(2, "p", 27);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 28);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("size", 48);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.t()["records.emptyTitle"]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.t()["records.emptyHint"]);
  }
}
function RecordsComponent_Conditional_14_For_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.t()["records.status.done"]);
  }
}
function RecordsComponent_Conditional_14_For_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.t()["records.status.planned"], " ");
  }
}
function RecordsComponent_Conditional_14_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "div", 18)(2, "div", 30);
    \u0275\u0275element(3, "lucide-icon", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 32)(5, "h3", 33);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 34);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 35);
    \u0275\u0275conditionalCreate(11, RecordsComponent_Conditional_14_For_2_Conditional_11_Template, 2, 1, "span", 36)(12, RecordsComponent_Conditional_14_For_2_Conditional_12_Template, 2, 1, "span", 37);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r3 = ctx.$implicit;
    \u0275\u0275property("ngClass", entry_r3.completed ? "border-gray-100" : "border-orange-100 bg-orange-50/10");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", entry_r3.completed ? "bg-teal-50 text-teal-500 border-teal-100" : "bg-orange-50 text-orange-500 border-orange-100");
    \u0275\u0275advance();
    \u0275\u0275property("name", entry_r3.completed ? "check-circle" : "clock");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(entry_r3.title);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", entry_r3.completed ? "text-teal-600" : "text-orange-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(9, 7, entry_r3.dueDate, "longDate"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(entry_r3.completed ? 11 : 12);
  }
}
function RecordsComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275repeaterCreate(1, RecordsComponent_Conditional_14_For_2_Template, 13, 10, "div", 29, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", ctx_r1.isAdding() ? "grid-cols-1 2xl:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.records());
  }
}
var RecordsComponent = class _RecordsComponent {
  constructor() {
    this.dataService = inject(DataService);
    this.i18n = inject(I18nService);
    this.t = this.i18n.t;
    this.isAdding = signal(false, ...ngDevMode ? [{ debugName: "isAdding" }] : (
      /* istanbul ignore next */
      []
    ));
    this.fTitle = "";
    this.fCompleted = true;
    this.fDate = (/* @__PURE__ */ new Date()).toISOString().substring(0, 10);
  }
  records() {
    return this.dataService.records();
  }
  submit() {
    if (this.fTitle) {
      this.dataService.addVaccine({
        title: this.fTitle,
        completed: this.fCompleted,
        dueDate: new Date(this.fDate).toISOString()
      });
      this.isAdding.set(false);
      this.fTitle = "";
      this.fCompleted = true;
    }
  }
  static {
    this.\u0275fac = function RecordsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RecordsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RecordsComponent, selectors: [["app-records"]], decls: 15, vars: 7, consts: [[1, "px-2"], [1, "flex", "items-center", "justify-between", "mb-8", "flex-col", "sm:flex-row", "gap-4"], [1, "text-3xl", "font-extrabold", "text-gray-800", "mb-1"], [1, "text-gray-500", "font-medium"], [1, "bg-slate-900", "hover:bg-primary-600", "text-white", "px-6", "py-3.5", "rounded-2xl", "font-bold", "shadow-soft", "transition-all", "transform", "hover:-translate-y-0.5", "flex", "items-center", "gap-2", 3, "click"], ["name", "calendar-plus", 1, "text-inherit", 3, "size"], [1, "grid", "grid-cols-1", "xl:grid-cols-3", "gap-8", "items-start", "relative"], [1, "bg-white", "p-8", "rounded-3xl", "shadow-soft", "xl:col-span-1", "animate-slide-up", "border", "border-gray-100", "sticky", "top-4"], [1, "space-y-4", 3, "ngClass"], [1, "text-center", "py-20", "bg-white", "border", "border-dashed", "border-gray-200", "rounded-3xl"], [1, "grid", "gap-6", "items-start", 3, "ngClass"], [1, "flex", "items-center", "justify-between", "mb-6", "border-b", "border-gray-100", "pb-4"], [1, "font-bold", "text-xl", "text-gray-800"], [1, "text-gray-500", "hover:text-gray-600", "bg-gray-100", "p-1.5", "rounded-xl", 3, "click"], ["name", "x", 1, "text-inherit", 3, "size"], [1, "space-y-5"], [1, "block", "text-xs", "font-bold", "text-gray-700", "uppercase", "tracking-widest", "mb-2", "ml-1"], ["type", "text", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border", "border-gray-200", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "font-semibold", 3, "ngModelChange", "ngModel", "placeholder"], [1, "flex", "gap-4"], [1, "flex-1", "cursor-pointer", "flex", "items-center", "p-3", "rounded-2xl", "border", 3, "ngClass"], ["type", "radio", 1, "hidden", 3, "ngModelChange", "value", "ngModel"], ["name", "check-circle", 1, "text-inherit", "mr-2", 3, "size"], [1, "font-bold", "text-sm", "text-gray-700"], ["name", "clock", 1, "text-inherit", "mr-2", 3, "size"], ["type", "date", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border", "border-gray-200", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-gray-600", "font-medium", 3, "ngModelChange", "ngModel"], [1, "w-full", "bg-gradient-to-r", "from-teal-500", "to-teal-400", "text-white", "font-bold", "py-4", "rounded-2xl", "mt-4", "shadow-md", "hover:shadow-lg", "transition-all", "hover:-translate-y-0.5", 3, "click"], ["name", "folder-open", 1, "text-inherit", "mx-auto", "mb-4", 2, "color", "#9ca3af", 3, "size"], [1, "text-xl", "font-bold", "text-gray-700", "mb-2"], [1, "text-gray-500"], [1, "bg-white", "rounded-3xl", "p-6", "shadow-sm", "border", "hover:border-teal-200", "hover:shadow-md", "transition-all", "group", "relative", 3, "ngClass"], [1, "w-14", "h-14", "rounded-2xl", "flex-shrink-0", "flex", "items-center", "justify-center", "border", 3, "ngClass"], [1, "text-3xl", 3, "name"], [1, "flex-1", "mt-1"], [1, "text-lg", "font-extrabold", "text-gray-800", "leading-tight", "mb-1"], [1, "text-sm", "font-semibold", 3, "ngClass"], [1, "absolute", "right-4", "top-4"], [1, "bg-teal-50", "text-teal-600", "px-3", "py-1", "rounded-full", "text-xs", "font-bold", "border", "border-teal-200/50"], [1, "bg-orange-50", "text-orange-600", "px-3", "py-1", "rounded-full", "text-xs", "font-bold", "flex", "items-center", "gap-1", "border", "border-orange-200/50"]], template: function RecordsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
        \u0275\u0275text(4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 3);
        \u0275\u0275text(6);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "button", 4);
        \u0275\u0275listener("click", function RecordsComponent_Template_button_click_7_listener() {
          return ctx.isAdding.set(true);
        });
        \u0275\u0275element(8, "lucide-icon", 5);
        \u0275\u0275text(9);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "div", 6);
        \u0275\u0275conditionalCreate(11, RecordsComponent_Conditional_11_Template, 31, 19, "div", 7);
        \u0275\u0275elementStart(12, "div", 8);
        \u0275\u0275conditionalCreate(13, RecordsComponent_Conditional_13_Template, 6, 3, "div", 9)(14, RecordsComponent_Conditional_14_Template, 3, 1, "div", 10);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.t()["records.title"]);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.t()["records.subtitle"]);
        \u0275\u0275advance(2);
        \u0275\u0275property("size", 18);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.t()["records.addRecord"], " ");
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.isAdding() ? 11 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("ngClass", ctx.isAdding() ? "xl:col-span-2" : "xl:col-span-3");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.records().length === 0 ? 13 : 14);
      }
    }, dependencies: [CommonModule, NgClass, FormsModule, DefaultValueAccessor, RadioControlValueAccessor, NgControlStatus, NgModel, LucideAngularModule, LucideAngularComponent, DatePipe], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RecordsComponent, [{
    type: Component,
    args: [{
      selector: "app-records",
      standalone: true,
      imports: [CommonModule, FormsModule, LucideAngularModule],
      template: `
    <div class="px-2">
      <div class="flex items-center justify-between mb-8 flex-col sm:flex-row gap-4">
        <div>
          <h1 class="text-3xl font-extrabold text-gray-800 mb-1">{{ t()['records.title'] }}</h1>
          <p class="text-gray-500 font-medium">{{ t()['records.subtitle'] }}</p>
        </div>
        <button (click)="isAdding.set(true)" class="bg-slate-900 hover:bg-primary-600 text-white px-6 py-3.5 rounded-2xl font-bold shadow-soft transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
          <lucide-icon name="calendar-plus" class="text-inherit" [size]="18"></lucide-icon>
          {{ t()['records.addRecord'] }}
        </button>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start relative">

        <!-- Add Panel -->
        @if (isAdding()) {
          <div class="bg-white p-8 rounded-3xl shadow-soft xl:col-span-1 animate-slide-up border border-gray-100 sticky top-4">
            <div class="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
               <h3 class="font-bold text-xl text-gray-800">{{ t()['records.formTitle'] }}</h3>
               <button (click)="isAdding.set(false)" class="text-gray-500 hover:text-gray-600 bg-gray-100 p-1.5 rounded-xl">
                 <lucide-icon name="x" class="text-inherit" [size]="16"></lucide-icon>
               </button>
            </div>

            <div class="space-y-5">
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">{{ t()['records.nameLabel'] }}</label>
                <input [(ngModel)]="fTitle" type="text" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all font-semibold" [placeholder]="t()['records.namePlaceholder']">
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">{{ t()['records.statusLabel'] }}</label>
                <div class="flex gap-4">
                  <label class="flex-1 cursor-pointer flex items-center p-3 rounded-2xl border" [ngClass]="fCompleted ? 'border-primary-500 bg-primary-50' : 'border-gray-200 bg-slate-50'">
                    <input type="radio" [value]="true" [(ngModel)]="fCompleted" class="hidden">
                    <lucide-icon name="check-circle" class="text-inherit mr-2" [size]="16"></lucide-icon>
                    <span class="font-bold text-sm text-gray-700">{{ t()['records.completed'] }}</span>
                  </label>
                  <label class="flex-1 cursor-pointer flex items-center p-3 rounded-2xl border" [ngClass]="!fCompleted ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-slate-50'">
                    <input type="radio" [value]="false" [(ngModel)]="fCompleted" class="hidden">
                    <lucide-icon name="clock" class="text-inherit mr-2" [size]="16"></lucide-icon>
                    <span class="font-bold text-sm text-gray-700">{{ t()['records.pending'] }}</span>
                  </label>
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">{{ t()['records.dateLabel'] }}</label>
                <input [(ngModel)]="fDate" type="date" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-600 font-medium">
              </div>

              <button (click)="submit()" class="w-full bg-gradient-to-r from-teal-500 to-teal-400 text-white font-bold py-4 rounded-2xl mt-4 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                {{ t()['records.updateButton'] }}
              </button>
            </div>
          </div>
        }

        <!-- List Array -->
        <div class="space-y-4" [ngClass]="isAdding() ? 'xl:col-span-2' : 'xl:col-span-3'">
          @if (records().length === 0) {
             <div class="text-center py-20 bg-white border border-dashed border-gray-200 rounded-3xl">
                <lucide-icon name="folder-open" class="text-inherit mx-auto mb-4" [size]="48" style="color: #9ca3af;"></lucide-icon>
                <p class="text-xl font-bold text-gray-700 mb-2">{{ t()['records.emptyTitle'] }}</p>
                <p class="text-gray-500">{{ t()['records.emptyHint'] }}</p>
             </div>
          } @else {
             <div class="grid gap-6 items-start" [ngClass]="isAdding() ? 'grid-cols-1 2xl:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'">
              @for (entry of records(); track entry.id) {
                <div class="bg-white rounded-3xl p-6 shadow-sm border hover:border-teal-200 hover:shadow-md transition-all group relative" [ngClass]="entry.completed ? 'border-gray-100' : 'border-orange-100 bg-orange-50/10'">
                  <div class="flex gap-4">
                     <div class="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center border" [ngClass]="entry.completed ? 'bg-teal-50 text-teal-500 border-teal-100' : 'bg-orange-50 text-orange-500 border-orange-100'">
                       <lucide-icon [name]="entry.completed ? 'check-circle' : 'clock'" class="text-3xl"></lucide-icon>
                     </div>

                     <div class="flex-1 mt-1">
                       <h3 class="text-lg font-extrabold text-gray-800 leading-tight mb-1">{{ entry.title }}</h3>
                       <p class="text-sm font-semibold" [ngClass]="entry.completed ? 'text-teal-600' : 'text-orange-600'">
                         {{ entry.dueDate | date:'longDate' }}
                       </p>
                     </div>
                  </div>

                  <div class="absolute right-4 top-4">
                     @if(entry.completed) {
                       <span class="bg-teal-50 text-teal-600 px-3 py-1 rounded-full text-xs font-bold border border-teal-200/50">{{ t()['records.status.done'] }}</span>
                     } @else {
                       <span class="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-orange-200/50">
                         {{ t()['records.status.planned'] }}
                       </span>
                     }
                  </div>
                </div>
              }
             </div>
          }
        </div>

      </div>
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RecordsComponent, { className: "RecordsComponent", filePath: "src/app/components/records.component.ts", lineNumber: 115 });
})();
export {
  RecordsComponent
};
//# sourceMappingURL=chunk-HVDFK3KW.js.map
