import {
  SyncService
} from "./chunk-DFCCO5YQ.js";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
  provideRouter
} from "./chunk-DNHP3SJZ.js";
import {
  bootstrapApplication
} from "./chunk-NQDOAGAV.js";
import {
  Activity,
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  Baby,
  BadgeCheck,
  Bell,
  BookOpen,
  Cake,
  Calendar,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  CalendarX,
  ChartBar,
  ChartNoAxesColumn,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  CircleCheckBig,
  CirclePlus,
  CircleQuestionMark,
  ClipboardList,
  Clock,
  Cloud,
  CommonModule,
  Database,
  DefaultValueAccessor,
  Download,
  Droplet,
  Dumbbell,
  Eye,
  EyeOff,
  FileCheck,
  FilePlus,
  FileText,
  FlaskConical,
  FolderOpen,
  FormsModule,
  Globe,
  Hand,
  Heart,
  HeartPulse,
  History,
  Hourglass,
  House,
  Inbox,
  Info,
  Key,
  LayoutList,
  Loader,
  Lock,
  LogIn,
  LogOut,
  LucideAngularComponent,
  LucideAngularModule,
  MaxLengthValidator,
  MaxValidator,
  Menu,
  MinValidator,
  NgClass,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  Palette,
  PartyPopper,
  Pencil,
  Pill,
  Plus,
  RadioControlValueAccessor,
  RefreshCw,
  Ruler,
  Save,
  Scale,
  SelectControlValueAccessor,
  Settings,
  Shield,
  Stethoscope,
  Syringe,
  Target,
  Thermometer,
  ThermometerSun,
  Trash,
  Trash2,
  TrendingUp,
  TriangleAlert,
  User,
  UserPlus,
  Users,
  Waves,
  WifiOff,
  X,
  Zap,
  registerLocaleData,
  ɵNgSelectMultipleOption
} from "./chunk-IFHIJ3FQ.js";
import {
  DataService,
  I18nService,
  NotificationService,
  OfflineService,
  ToastService
} from "./chunk-UDF3JGT5.js";
import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  HttpClient,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  LOCALE_ID,
  NEVER,
  NgModule,
  NgZone,
  Observable,
  Output,
  RuntimeError,
  Subject,
  __async,
  __spreadProps,
  __spreadValues,
  computed,
  effect,
  environment,
  filter,
  formatRuntimeError,
  importProvidersFrom,
  inject,
  isDevMode,
  makeEnvironmentProviders,
  map,
  provideAppInitializer,
  provideHttpClient,
  provideZoneChangeDetection,
  setClassMetadata,
  signal,
  switchMap,
  take,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵariaProperty,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵinterpolate,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-SFGRG2UU.js";

// node_modules/@angular/service-worker/fesm2022/service-worker.mjs
/**
 * @license Angular v21.2.9
 * (c) 2010-2026 Google LLC. https://angular.dev/
 * License: MIT
 */
var ERR_SW_NOT_SUPPORTED = "Service workers are disabled or not supported by this browser";
var NgswCommChannel = class {
  serviceWorker;
  worker;
  registration;
  events;
  constructor(serviceWorker, injector) {
    this.serviceWorker = serviceWorker;
    if (!serviceWorker) {
      this.worker = this.events = this.registration = new Observable((subscriber) => subscriber.error(new RuntimeError(5601, (typeof ngDevMode === "undefined" || ngDevMode) && ERR_SW_NOT_SUPPORTED)));
    } else {
      let currentWorker = null;
      const workerSubject = new Subject();
      this.worker = new Observable((subscriber) => {
        if (currentWorker !== null) {
          subscriber.next(currentWorker);
        }
        return workerSubject.subscribe((v) => subscriber.next(v));
      });
      const updateController = () => {
        const {
          controller
        } = serviceWorker;
        if (controller === null) {
          return;
        }
        currentWorker = controller;
        workerSubject.next(currentWorker);
      };
      serviceWorker.addEventListener("controllerchange", updateController);
      updateController();
      this.registration = this.worker.pipe(switchMap(() => serviceWorker.getRegistration().then((registration) => {
        if (!registration) {
          throw new RuntimeError(5601, (typeof ngDevMode === "undefined" || ngDevMode) && ERR_SW_NOT_SUPPORTED);
        }
        return registration;
      })));
      const _events = new Subject();
      this.events = _events.asObservable();
      const messageListener = (event) => {
        const {
          data
        } = event;
        if (data?.type) {
          _events.next(data);
        }
      };
      serviceWorker.addEventListener("message", messageListener);
      const appRef = injector?.get(ApplicationRef, null, {
        optional: true
      });
      appRef?.onDestroy(() => {
        serviceWorker.removeEventListener("controllerchange", updateController);
        serviceWorker.removeEventListener("message", messageListener);
      });
    }
  }
  postMessage(action, payload) {
    return new Promise((resolve) => {
      this.worker.pipe(take(1)).subscribe((sw) => {
        sw.postMessage(__spreadValues({
          action
        }, payload));
        resolve();
      });
    });
  }
  postMessageWithOperation(type, payload, operationNonce) {
    const waitForOperationCompleted = this.waitForOperationCompleted(operationNonce);
    const postMessage = this.postMessage(type, payload);
    return Promise.all([postMessage, waitForOperationCompleted]).then(([, result]) => result);
  }
  generateNonce() {
    return Math.round(Math.random() * 1e7);
  }
  eventsOfType(type) {
    let filterFn;
    if (typeof type === "string") {
      filterFn = (event) => event.type === type;
    } else {
      filterFn = (event) => type.includes(event.type);
    }
    return this.events.pipe(filter(filterFn));
  }
  nextEventOfType(type) {
    return this.eventsOfType(type).pipe(take(1));
  }
  waitForOperationCompleted(nonce) {
    return new Promise((resolve, reject) => {
      this.eventsOfType("OPERATION_COMPLETED").pipe(filter((event) => event.nonce === nonce), take(1), map((event) => {
        if (event.result !== void 0) {
          return event.result;
        }
        throw new Error(event.error);
      })).subscribe({
        next: resolve,
        error: reject
      });
    });
  }
  get isEnabled() {
    return !!this.serviceWorker;
  }
};
var SwPush = class _SwPush {
  sw;
  messages;
  notificationClicks;
  notificationCloses;
  pushSubscriptionChanges;
  subscription;
  get isEnabled() {
    return this.sw.isEnabled;
  }
  pushManager = null;
  subscriptionChanges = new Subject();
  constructor(sw) {
    this.sw = sw;
    if (!sw.isEnabled) {
      this.messages = NEVER;
      this.notificationClicks = NEVER;
      this.notificationCloses = NEVER;
      this.pushSubscriptionChanges = NEVER;
      this.subscription = NEVER;
      return;
    }
    this.messages = this.sw.eventsOfType("PUSH").pipe(map((message) => message.data));
    this.notificationClicks = this.sw.eventsOfType("NOTIFICATION_CLICK").pipe(map((message) => message.data));
    this.notificationCloses = this.sw.eventsOfType("NOTIFICATION_CLOSE").pipe(map((message) => message.data));
    this.pushSubscriptionChanges = this.sw.eventsOfType("PUSH_SUBSCRIPTION_CHANGE").pipe(map((message) => message.data));
    this.pushManager = this.sw.registration.pipe(map((registration) => registration.pushManager));
    const workerDrivenSubscriptions = this.pushManager.pipe(switchMap((pm) => pm.getSubscription()));
    this.subscription = new Observable((subscriber) => {
      const workerDrivenSubscription = workerDrivenSubscriptions.subscribe(subscriber);
      const subscriptionChanges = this.subscriptionChanges.subscribe(subscriber);
      return () => {
        workerDrivenSubscription.unsubscribe();
        subscriptionChanges.unsubscribe();
      };
    });
  }
  requestSubscription(options) {
    if (!this.sw.isEnabled || this.pushManager === null) {
      return Promise.reject(new Error(ERR_SW_NOT_SUPPORTED));
    }
    const pushOptions = {
      userVisibleOnly: true
    };
    let key = this.decodeBase64(options.serverPublicKey.replace(/_/g, "/").replace(/-/g, "+"));
    let applicationServerKey = new Uint8Array(new ArrayBuffer(key.length));
    for (let i = 0; i < key.length; i++) {
      applicationServerKey[i] = key.charCodeAt(i);
    }
    pushOptions.applicationServerKey = applicationServerKey;
    return new Promise((resolve, reject) => {
      this.pushManager.pipe(switchMap((pm) => pm.subscribe(pushOptions)), take(1)).subscribe({
        next: (sub) => {
          this.subscriptionChanges.next(sub);
          resolve(sub);
        },
        error: reject
      });
    });
  }
  unsubscribe() {
    if (!this.sw.isEnabled) {
      return Promise.reject(new Error(ERR_SW_NOT_SUPPORTED));
    }
    const doUnsubscribe = (sub) => {
      if (sub === null) {
        throw new RuntimeError(5602, (typeof ngDevMode === "undefined" || ngDevMode) && "Not subscribed to push notifications.");
      }
      return sub.unsubscribe().then((success) => {
        if (!success) {
          throw new RuntimeError(5603, (typeof ngDevMode === "undefined" || ngDevMode) && "Unsubscribe failed!");
        }
        this.subscriptionChanges.next(null);
      });
    };
    return new Promise((resolve, reject) => {
      this.subscription.pipe(take(1), switchMap(doUnsubscribe)).subscribe({
        next: resolve,
        error: reject
      });
    });
  }
  decodeBase64(input) {
    return atob(input);
  }
  static \u0275fac = function SwPush_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SwPush)(\u0275\u0275inject(NgswCommChannel));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _SwPush,
    factory: _SwPush.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SwPush, [{
    type: Injectable
  }], () => [{
    type: NgswCommChannel
  }], null);
})();
var SwUpdate = class _SwUpdate {
  sw;
  versionUpdates;
  unrecoverable;
  get isEnabled() {
    return this.sw.isEnabled;
  }
  ongoingCheckForUpdate = null;
  constructor(sw) {
    this.sw = sw;
    if (!sw.isEnabled) {
      this.versionUpdates = NEVER;
      this.unrecoverable = NEVER;
      return;
    }
    this.versionUpdates = this.sw.eventsOfType(["VERSION_DETECTED", "VERSION_INSTALLATION_FAILED", "VERSION_READY", "NO_NEW_VERSION_DETECTED"]);
    this.unrecoverable = this.sw.eventsOfType("UNRECOVERABLE_STATE");
  }
  checkForUpdate() {
    if (!this.sw.isEnabled) {
      return Promise.reject(new Error(ERR_SW_NOT_SUPPORTED));
    }
    if (this.ongoingCheckForUpdate) {
      return this.ongoingCheckForUpdate;
    }
    const nonce = this.sw.generateNonce();
    this.ongoingCheckForUpdate = this.sw.postMessageWithOperation("CHECK_FOR_UPDATES", {
      nonce
    }, nonce).finally(() => {
      this.ongoingCheckForUpdate = null;
    });
    return this.ongoingCheckForUpdate;
  }
  activateUpdate() {
    if (!this.sw.isEnabled) {
      return Promise.reject(new RuntimeError(5601, (typeof ngDevMode === "undefined" || ngDevMode) && ERR_SW_NOT_SUPPORTED));
    }
    const nonce = this.sw.generateNonce();
    return this.sw.postMessageWithOperation("ACTIVATE_UPDATE", {
      nonce
    }, nonce);
  }
  static \u0275fac = function SwUpdate_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SwUpdate)(\u0275\u0275inject(NgswCommChannel));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _SwUpdate,
    factory: _SwUpdate.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SwUpdate, [{
    type: Injectable
  }], () => [{
    type: NgswCommChannel
  }], null);
})();
var SCRIPT = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "NGSW_REGISTER_SCRIPT" : "");
function ngswAppInitializer() {
  if (false) {
    return;
  }
  const options = inject(SwRegistrationOptions);
  if (!("serviceWorker" in navigator && options.enabled !== false)) {
    return;
  }
  const script = inject(SCRIPT);
  const ngZone = inject(NgZone);
  const appRef = inject(ApplicationRef);
  ngZone.runOutsideAngular(() => {
    const sw = navigator.serviceWorker;
    const onControllerChange = () => sw.controller?.postMessage({
      action: "INITIALIZE"
    });
    sw.addEventListener("controllerchange", onControllerChange);
    appRef.onDestroy(() => {
      sw.removeEventListener("controllerchange", onControllerChange);
    });
  });
  ngZone.runOutsideAngular(() => {
    let readyToRegister;
    const {
      registrationStrategy
    } = options;
    if (typeof registrationStrategy === "function") {
      readyToRegister = new Promise((resolve) => registrationStrategy().subscribe(() => resolve()));
    } else {
      const [strategy, ...args] = (registrationStrategy || "registerWhenStable:30000").split(":");
      switch (strategy) {
        case "registerImmediately":
          readyToRegister = Promise.resolve();
          break;
        case "registerWithDelay":
          readyToRegister = delayWithTimeout(+args[0] || 0);
          break;
        case "registerWhenStable":
          readyToRegister = Promise.race([appRef.whenStable(), delayWithTimeout(+args[0])]);
          break;
        default:
          throw new RuntimeError(5600, (typeof ngDevMode === "undefined" || ngDevMode) && `Unknown ServiceWorker registration strategy: ${options.registrationStrategy}`);
      }
    }
    readyToRegister.then(() => {
      if (appRef.destroyed) {
        return;
      }
      navigator.serviceWorker.register(script, {
        scope: options.scope,
        updateViaCache: options.updateViaCache,
        type: options.type
      }).catch((err) => console.error(formatRuntimeError(5604, (typeof ngDevMode === "undefined" || ngDevMode) && "Service worker registration failed with: " + err)));
    });
  });
}
function delayWithTimeout(timeout) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}
function ngswCommChannelFactory() {
  const opts = inject(SwRegistrationOptions);
  const injector = inject(Injector);
  const isBrowser = true;
  return new NgswCommChannel(isBrowser && opts.enabled !== false ? navigator.serviceWorker : void 0, injector);
}
var SwRegistrationOptions = class {
  enabled;
  updateViaCache;
  type;
  scope;
  registrationStrategy;
};
function provideServiceWorker(script, options = {}) {
  return makeEnvironmentProviders([SwPush, SwUpdate, {
    provide: SCRIPT,
    useValue: script
  }, {
    provide: SwRegistrationOptions,
    useValue: options
  }, {
    provide: NgswCommChannel,
    useFactory: ngswCommChannelFactory
  }, provideAppInitializer(ngswAppInitializer)]);
}
var ServiceWorkerModule = class _ServiceWorkerModule {
  static register(script, options = {}) {
    return {
      ngModule: _ServiceWorkerModule,
      providers: [provideServiceWorker(script, options)]
    };
  }
  static \u0275fac = function ServiceWorkerModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ServiceWorkerModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _ServiceWorkerModule
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    providers: [SwPush, SwUpdate]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ServiceWorkerModule, [{
    type: NgModule,
    args: [{
      providers: [SwPush, SwUpdate]
    }]
  }], null, null);
})();

// node_modules/@angular/common/locales/it.js
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var u = void 0;
function plural(val) {
  const n = val, i = Math.floor(Math.abs(val)), v = val.toString().replace(/^[^.]*\.?/, "").length, e = parseInt(val.toString().replace(/^[^e]*(e([-+]?\d+))?/, "$2")) || 0;
  if (i === 1 && v === 0)
    return 1;
  if (e === 0 && (!(i === 0) && (i % 1e6 === 0 && v === 0)) || !(e >= 0 && e <= 5))
    return 4;
  return 5;
}
var it_default = ["it", [["m.", "p."], ["AM", "PM"]], u, [["D", "L", "M", "M", "G", "V", "S"], ["dom", "lun", "mar", "mer", "gio", "ven", "sab"], ["domenica", "luned\xEC", "marted\xEC", "mercoled\xEC", "gioved\xEC", "venerd\xEC", "sabato"], ["dom", "lun", "mar", "mer", "gio", "ven", "sab"]], u, [["G", "F", "M", "A", "M", "G", "L", "A", "S", "O", "N", "D"], ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"], ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"]], u, [["aC", "dC"], ["a.C.", "d.C."], ["avanti Cristo", "dopo Cristo"]], 1, [6, 0], ["dd/MM/yy", "d MMM y", "d MMMM y", "EEEE d MMMM y"], ["HH:mm", "HH:mm:ss", "HH:mm:ss z", "HH:mm:ss zzzz"], ["{1}, {0}", u, "{1} {0}", u], [",", ".", ";", "%", "+", "-", "E", "\xD7", "\u2030", "\u221E", "NaN", ":"], ["#,##0.###", "#,##0%", "#,##0.00\xA0\xA4", "#E0"], "EUR", "\u20AC", "euro", { "BRL": [u, "R$"], "BYN": [u, "Br"], "EGP": [u, "\xA3E"], "HKD": [u, "$"], "INR": [u, "\u20B9"], "JPY": [u, "\xA5"], "KRW": [u, "\u20A9"], "MXN": [u, "$"], "NOK": [u, "NKr"], "THB": ["\u0E3F"], "TWD": [u, "NT$"], "USD": [u, "$"], "VND": [u, "\u20AB"] }, "ltr", plural];

// src/app/components/sync-status.component.ts
var _forTrack0 = ($index, $item) => $item.entityId;
var _forTrack1 = ($index, $item) => $item.key;
function SyncStatusComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 1);
  }
  if (rf & 2) {
    \u0275\u0275property("size", 14);
  }
}
function SyncStatusComponent_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 2);
  }
  if (rf & 2) {
    \u0275\u0275property("size", 14);
  }
}
function SyncStatusComponent_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 3);
  }
  if (rf & 2) {
    \u0275\u0275property("size", 14);
  }
}
function SyncStatusComponent_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 4);
  }
  if (rf & 2) {
    \u0275\u0275property("size", 14);
  }
}
function SyncStatusComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("(", ctx_r0.t()["sync.queue.count"].replace("{n}", "" + ctx_r0.pendingCount()), ")");
  }
}
function SyncStatusComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u2022 ", ctx_r0.lastSyncedLabel());
  }
}
function SyncStatusComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 11);
    \u0275\u0275listener("click", function SyncStatusComponent_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showConflictPanel.set(true));
    });
    \u0275\u0275element(1, "lucide-icon", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-label", ctx_r0.conflictLabel());
    \u0275\u0275advance();
    \u0275\u0275property("size", 10);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.conflictCount(), " ");
  }
}
function SyncStatusComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 13);
    \u0275\u0275listener("click", function SyncStatusComponent_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.retrySync());
    });
    \u0275\u0275element(1, "lucide-icon", 14);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275ariaProperty("aria-label", \u0275\u0275interpolate(ctx_r0.retryLabel()));
    \u0275\u0275advance();
    \u0275\u0275property("size", 10);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.retryLabel(), " ");
  }
}
function SyncStatusComponent_Conditional_11_For_16_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.medicalReviewLabel(), " ");
  }
}
function SyncStatusComponent_Conditional_11_For_16_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41)(1, "span", 43);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 44);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const field_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", field_r5.label, ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(field_r5.local);
  }
}
function SyncStatusComponent_Conditional_11_For_16_For_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41)(1, "span", 43);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 44);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const field_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", field_r6.label, ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(field_r6.server);
  }
}
function SyncStatusComponent_Conditional_11_For_16_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 42)(1, "button", 45);
    \u0275\u0275listener("click", function SyncStatusComponent_Conditional_11_For_16_Conditional_25_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r7);
      const conflict_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.resolveConflict(conflict_r8, "local_wins"));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 46);
    \u0275\u0275listener("click", function SyncStatusComponent_Conditional_11_For_16_Conditional_25_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r7);
      const conflict_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.resolveConflict(conflict_r8, "server_wins"));
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.useLocalLabel(), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.useServerLabel(), " ");
  }
}
function SyncStatusComponent_Conditional_11_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "div", 29)(2, "div", 30);
    \u0275\u0275element(3, "lucide-icon", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 32)(5, "p", 33);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 34);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 35);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(11, SyncStatusComponent_Conditional_11_For_16_Conditional_11_Template, 2, 1, "span", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 37)(13, "div", 38)(14, "p", 39);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 40);
    \u0275\u0275repeaterCreate(17, SyncStatusComponent_Conditional_11_For_16_For_18_Template, 5, 2, "div", 41, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 38)(20, "p", 39);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 40);
    \u0275\u0275repeaterCreate(23, SyncStatusComponent_Conditional_11_For_16_For_24_Template, 5, 2, "div", 41, _forTrack1);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(25, SyncStatusComponent_Conditional_11_For_16_Conditional_25_Template, 5, 2, "div", 42);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const conflict_r8 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("size", 14);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(conflict_r8.entityLabel());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(conflict_r8.timeDiffLabel());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(conflict_r8.entityId);
    \u0275\u0275advance();
    \u0275\u0275conditional(conflict_r8.type === "medical_data_manual_review" ? 11 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.thisLocalLabel());
    \u0275\u0275advance(2);
    \u0275\u0275repeater(conflict_r8.changedFields());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.thisServerLabel());
    \u0275\u0275advance(2);
    \u0275\u0275repeater(conflict_r8.changedFields());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(conflict_r8.type === "medical_data_manual_review" ? 25 : -1);
  }
}
function SyncStatusComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 15);
    \u0275\u0275listener("click", function SyncStatusComponent_Conditional_11_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showConflictPanel.set(false));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 16)(3, "div", 17)(4, "div", 18)(5, "div", 19);
    \u0275\u0275element(6, "lucide-icon", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div")(8, "h2", 21);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 22);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 23);
    \u0275\u0275listener("click", function SyncStatusComponent_Conditional_11_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showConflictPanel.set(false));
    });
    \u0275\u0275element(13, "lucide-icon", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 25);
    \u0275\u0275repeaterCreate(15, SyncStatusComponent_Conditional_11_For_16_Template, 26, 8, "div", 26, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 27)(18, "p", 28);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("size", 20);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.conflictPanelTitle());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.conflictPanelSubtitle());
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r0.i18n.t()["child.cancel"]);
    \u0275\u0275advance();
    \u0275\u0275property("size", 16);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.pendingConflicts());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.conflictFooterNote());
  }
}
var SyncStatusComponent = class _SyncStatusComponent {
  constructor() {
    this.offlineService = inject(OfflineService);
    this.syncService = inject(SyncService);
    this.i18n = inject(I18nService);
    this.t = this.i18n.t;
    this.state = signal("idle", ...ngDevMode ? [{ debugName: "state" }] : (
      /* istanbul ignore next */
      []
    ));
    this.lastSyncedAt = signal(null, ...ngDevMode ? [{ debugName: "lastSyncedAt" }] : (
      /* istanbul ignore next */
      []
    ));
    this.conflictCount = signal(0, ...ngDevMode ? [{ debugName: "conflictCount" }] : (
      /* istanbul ignore next */
      []
    ));
    this.pendingConflicts = signal([], ...ngDevMode ? [{ debugName: "pendingConflicts" }] : (
      /* istanbul ignore next */
      []
    ));
    this.showConflictPanel = signal(false, ...ngDevMode ? [{ debugName: "showConflictPanel" }] : (
      /* istanbul ignore next */
      []
    ));
    this.pendingCount = signal(0, ...ngDevMode ? [{ debugName: "pendingCount" }] : (
      /* istanbul ignore next */
      []
    ));
    this.retryTimeout = null;
    this.retryAttempts = 0;
    this.MAX_RETRY_ATTEMPTS = 3;
    this.statusLabel = signal("", ...ngDevMode ? [{ debugName: "statusLabel" }] : (
      /* istanbul ignore next */
      []
    ));
    this.stateClass = signal("", ...ngDevMode ? [{ debugName: "stateClass" }] : (
      /* istanbul ignore next */
      []
    ));
    this.lastSyncedLabel = signal("", ...ngDevMode ? [{ debugName: "lastSyncedLabel" }] : (
      /* istanbul ignore next */
      []
    ));
    this.conflictLabel = signal("", ...ngDevMode ? [{ debugName: "conflictLabel" }] : (
      /* istanbul ignore next */
      []
    ));
    this.retryLabel = signal("", ...ngDevMode ? [{ debugName: "retryLabel" }] : (
      /* istanbul ignore next */
      []
    ));
    this.conflictPanelTitle = signal("", ...ngDevMode ? [{ debugName: "conflictPanelTitle" }] : (
      /* istanbul ignore next */
      []
    ));
    this.conflictPanelSubtitle = signal("", ...ngDevMode ? [{ debugName: "conflictPanelSubtitle" }] : (
      /* istanbul ignore next */
      []
    ));
    this.medicalReviewLabel = signal("", ...ngDevMode ? [{ debugName: "medicalReviewLabel" }] : (
      /* istanbul ignore next */
      []
    ));
    this.thisLocalLabel = signal("", ...ngDevMode ? [{ debugName: "thisLocalLabel" }] : (
      /* istanbul ignore next */
      []
    ));
    this.thisServerLabel = signal("", ...ngDevMode ? [{ debugName: "thisServerLabel" }] : (
      /* istanbul ignore next */
      []
    ));
    this.useLocalLabel = signal("", ...ngDevMode ? [{ debugName: "useLocalLabel" }] : (
      /* istanbul ignore next */
      []
    ));
    this.useServerLabel = signal("", ...ngDevMode ? [{ debugName: "useServerLabel" }] : (
      /* istanbul ignore next */
      []
    ));
    this.conflictFooterNote = signal("", ...ngDevMode ? [{ debugName: "conflictFooterNote" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  ngOnInit() {
    this.updateLabels();
    this.loadLastSyncedTime();
    this.setupAutoSync();
    this.loadPendingCount();
  }
  ngOnDestroy() {
    if (this.retryTimeout)
      clearTimeout(this.retryTimeout);
  }
  updateLabels() {
    const t = this.i18n.t();
    this.conflictPanelTitle.set(t["sync.conflictPanelTitle"]);
    this.conflictPanelSubtitle.set(t["sync.conflictPanelSubtitle"]);
    this.medicalReviewLabel.set(t["sync.medicalReview"]);
    this.thisLocalLabel.set(t["sync.conflict.local"]);
    this.thisServerLabel.set(t["sync.conflict.server"]);
    this.useLocalLabel.set(t["sync.conflict.resolveLocal"]);
    this.useServerLabel.set(t["sync.conflict.resolveServer"]);
    this.conflictFooterNote.set(t["sync.conflict.footer"]);
    this.retryLabel.set(t["offline.retry"]);
    this.conflictLabel.set(t["offline.conflict"]);
  }
  loadLastSyncedTime() {
    try {
      const stored = localStorage.getItem("kiddok_last_synced");
      if (stored)
        this.lastSyncedAt.set(new Date(parseInt(stored, 10)));
    } catch (e) {
    }
  }
  saveLastSyncedTime() {
    const now = Date.now();
    try {
      localStorage.setItem("kiddok_last_synced", String(now));
    } catch (e) {
    }
    this.lastSyncedAt.set(new Date(now));
  }
  setupAutoSync() {
    window.addEventListener("online", () => {
      this.updateStatusFromState("syncing");
      setTimeout(() => this.triggerSync(), 500);
    });
  }
  updateStatusFromState(state) {
    this.state.set(state);
    const t = this.i18n.t();
    switch (state) {
      case "syncing":
        this.statusLabel.set(t["sync.status.syncing"]);
        this.stateClass.set("text-primary-500");
        break;
      case "synced":
        this.statusLabel.set(t["sync.status.synced"]);
        this.stateClass.set("text-teal-600");
        this.saveLastSyncedTime();
        break;
      case "error":
        this.statusLabel.set(t["sync.status.error"]);
        this.stateClass.set("text-red-500");
        this.scheduleRetry();
        break;
      case "conflict":
        this.statusLabel.set(t["sync.status.conflict"]);
        this.stateClass.set("text-amber-600");
        break;
      default:
        this.statusLabel.set(t["sync.status.idle"]);
        this.stateClass.set("text-gray-400");
    }
  }
  loadPendingCount() {
    return __async(this, null, function* () {
      const count = yield this.offlineService.getSyncQueueCount();
      this.pendingCount.set(count);
    });
  }
  triggerSync() {
    return __async(this, null, function* () {
      this.updateStatusFromState("syncing");
      const result = yield this.syncService.syncPendingEntries();
      if (result.conflicts.length > 0) {
        this.pendingConflicts.set(result.conflicts.map((c) => new PendingConflict(c)));
        this.conflictCount.set(result.conflicts.length);
        this.updateStatusFromState("conflict");
      } else if (result.failedCount > 0) {
        this.updateStatusFromState("error");
      } else {
        this.updateStatusFromState("synced");
        this.conflictCount.set(0);
        this.pendingConflicts.set([]);
      }
      this.updateLastSyncedLabel();
    });
  }
  retrySync() {
    return __async(this, null, function* () {
      if (this.retryAttempts >= this.MAX_RETRY_ATTEMPTS) {
        this.retryAttempts = 0;
        const isSq = this.i18n.isSq();
        return;
      }
      this.retryAttempts++;
      yield this.triggerSync();
    });
  }
  scheduleRetry() {
    if (this.retryTimeout)
      clearTimeout(this.retryTimeout);
    const delay = Math.pow(2, this.retryAttempts) * 1e3;
    this.retryTimeout = setTimeout(() => {
      if (this.state() === "error") {
        this.retrySync();
      }
    }, delay);
  }
  resolveConflict(conflict, resolution) {
    return __async(this, null, function* () {
      yield this.syncService.submitResolution(conflict.entityType, conflict.entityId, resolution);
      const remaining = this.pendingConflicts().filter((c) => c.entityId !== conflict.entityId);
      this.pendingConflicts.set(remaining);
      this.conflictCount.set(remaining.length);
      if (remaining.length === 0) {
        this.showConflictPanel.set(false);
        this.updateStatusFromState("synced");
      }
    });
  }
  updateLastSyncedLabel() {
    const ts = this.lastSyncedAt();
    if (!ts)
      return;
    const isSq = this.i18n.isSq();
    const now = Date.now();
    const diff = now - ts.getTime();
    const mins = Math.floor(diff / 6e4);
    const hours = Math.floor(diff / 36e5);
    if (mins < 1) {
      this.lastSyncedLabel.set(isSq ? "tani" : "just now");
    } else if (mins < 60) {
      this.lastSyncedLabel.set(isSq ? `${mins} min m\xC3\xAB par\xC3\xAB` : `${mins}m ago`);
    } else if (hours < 24) {
      this.lastSyncedLabel.set(isSq ? `${hours} or\xC3\xAB m\xC3\xAB par\xC3\xAB` : `${hours}h ago`);
    } else {
      this.lastSyncedLabel.set(ts.toLocaleDateString(isSq ? "sq-AL" : "en-US"));
    }
  }
  static {
    this.\u0275fac = function SyncStatusComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SyncStatusComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SyncStatusComponent, selectors: [["app-sync-status"]], decls: 12, vars: 11, consts: [["role", "status", 1, "flex", "items-center", "gap-2"], ["name", "loader-2", "aria-hidden", "true", 1, "animate-spin", "text-primary-500", 3, "size"], ["name", "check-circle", "aria-hidden", "true", 1, "text-teal-500", "shrink-0", 3, "size"], ["name", "alert-circle", "aria-hidden", "true", 1, "text-red-500", "shrink-0", 3, "size"], ["name", "alert-triangle", "aria-hidden", "true", 1, "text-amber-500", "shrink-0", 3, "size"], [1, "text-xs", "font-semibold"], [1, "text-xs", "text-gray-400"], [1, "text-xs", "text-gray-400", "hidden", "sm:inline"], ["type", "button", 1, "flex", "items-center", "gap-1", "px-2", "py-0.5", "rounded-full", "bg-amber-50", "border", "border-amber-200", "text-amber-700", "text-xs", "font-bold", "hover:bg-amber-100", "transition-colors"], ["type", "button", 1, "flex", "items-center", "gap-1", "px-2", "py-0.5", "rounded-full", "bg-red-50", "border", "border-red-200", "text-red-600", "text-xs", "font-bold", "hover:bg-red-100", "transition-colors", 3, "aria-label"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "conflict-panel-title", 1, "fixed", "inset-0", "z-50", "flex", "items-end", "sm:items-center", "justify-center"], ["type", "button", 1, "flex", "items-center", "gap-1", "px-2", "py-0.5", "rounded-full", "bg-amber-50", "border", "border-amber-200", "text-amber-700", "text-xs", "font-bold", "hover:bg-amber-100", "transition-colors", 3, "click"], ["name", "alert-triangle", "aria-hidden", "true", 3, "size"], ["type", "button", 1, "flex", "items-center", "gap-1", "px-2", "py-0.5", "rounded-full", "bg-red-50", "border", "border-red-200", "text-red-600", "text-xs", "font-bold", "hover:bg-red-100", "transition-colors", 3, "click", "aria-label"], ["name", "refresh-cw", "aria-hidden", "true", 3, "size"], ["aria-hidden", "true", 1, "absolute", "inset-0", "bg-black/30", "backdrop-blur-sm", 3, "click"], [1, "relative", "z-10", "w-full", "sm:max-w-md", "bg-white", "rounded-t-3xl", "sm:rounded-2xl", "shadow-[0_-20px_60px_-12px_rgba(0,0,0,0.15)]", "border-t", "sm:border", "border-gray-100", "overflow-hidden", "animate-slide-up"], [1, "flex", "items-center", "justify-between", "px-6", "py-5", "border-b", "border-gray-100", "bg-amber-50"], [1, "flex", "items-center", "gap-3"], [1, "w-10", "h-10", "rounded-full", "bg-amber-100", "flex", "items-center", "justify-center"], ["name", "alert-triangle", "aria-hidden", "true", 1, "text-amber-600", 3, "size"], ["id", "conflict-panel-title", 1, "font-extrabold", "text-gray-800", "text-lg"], [1, "text-sm", "text-gray-500", "font-medium"], ["type", "button", 1, "w-9", "h-9", "rounded-xl", "bg-white", "hover:bg-gray-100", "flex", "items-center", "justify-center", "text-gray-400", "hover:text-gray-600", "transition-all", "shadow-sm", "border", "border-gray-200", 3, "click"], ["name", "x", "aria-hidden", "true", 3, "size"], [1, "px-6", "py-5", "space-y-4", "max-h-80", "overflow-y-auto"], [1, "bg-amber-50", "border", "border-amber-200", "rounded-2xl", "p-4"], [1, "px-6", "py-4", "border-t", "border-gray-100", "bg-gray-50"], [1, "text-xs", "text-gray-400", "text-center", "font-medium"], [1, "flex", "items-start", "gap-3"], [1, "w-8", "h-8", "rounded-full", "bg-amber-100", "flex", "items-center", "justify-center", "shrink-0", "mt-0.5"], ["name", "git-merge", "aria-hidden", "true", 1, "text-amber-600", 3, "size"], [1, "flex-1", "min-w-0"], [1, "font-bold", "text-gray-800", "text-sm"], [1, "text-xs", "text-gray-500", "mt-0.5"], [1, "text-xs", "text-gray-400", "mt-1", "font-mono"], [1, "shrink-0", "px-2", "py-1", "rounded-full", "bg-orange-100", "border", "border-orange-200", "text-orange-700", "text-xs", "font-bold"], [1, "mt-3", "grid", "grid-cols-2", "gap-2"], [1, "bg-white", "rounded-xl", "p-3", "border", "border-gray-100"], [1, "text-xs", "font-bold", "text-gray-500", "uppercase", "tracking-wide", "mb-2"], [1, "space-y-1"], [1, "text-xs"], [1, "mt-4", "flex", "gap-2"], [1, "text-gray-400", "font-medium"], [1, "text-gray-700", "font-semibold", "ml-1"], ["type", "button", 1, "flex-1", "py-2.5", "rounded-xl", "bg-primary-50", "border", "border-primary-200", "text-primary-700", "font-bold", "text-xs", "hover:bg-primary-100", "transition-colors", 3, "click"], ["type", "button", 1, "flex-1", "py-2.5", "rounded-xl", "bg-slate-50", "border", "border-slate-200", "text-slate-600", "font-bold", "text-xs", "hover:bg-slate-100", "transition-colors", 3, "click"]], template: function SyncStatusComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275conditionalCreate(1, SyncStatusComponent_Conditional_1_Template, 1, 1, "lucide-icon", 1);
        \u0275\u0275conditionalCreate(2, SyncStatusComponent_Case_2_Template, 1, 1, "lucide-icon", 2)(3, SyncStatusComponent_Case_3_Template, 1, 1, "lucide-icon", 3)(4, SyncStatusComponent_Case_4_Template, 1, 1, "lucide-icon", 4);
        \u0275\u0275elementStart(5, "span", 5);
        \u0275\u0275text(6);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(7, SyncStatusComponent_Conditional_7_Template, 2, 1, "span", 6);
        \u0275\u0275conditionalCreate(8, SyncStatusComponent_Conditional_8_Template, 2, 1, "span", 7);
        \u0275\u0275conditionalCreate(9, SyncStatusComponent_Conditional_9_Template, 3, 3, "button", 8);
        \u0275\u0275conditionalCreate(10, SyncStatusComponent_Conditional_10_Template, 3, 4, "button", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(11, SyncStatusComponent_Conditional_11_Template, 20, 6, "div", 10);
      }
      if (rf & 2) {
        let tmp_2_0;
        \u0275\u0275attribute("aria-label", ctx.statusLabel());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.state() === "syncing" ? 1 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional((tmp_2_0 = ctx.state()) === "synced" ? 2 : tmp_2_0 === "error" ? 3 : tmp_2_0 === "conflict" ? 4 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275classMap(ctx.stateClass());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.statusLabel(), " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.pendingCount() > 0 ? 7 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.lastSyncedAt() && ctx.state() === "synced" ? 8 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.conflictCount() > 0 ? 9 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.state() === "error" ? 10 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.showConflictPanel() ? 11 : -1);
      }
    }, dependencies: [CommonModule, LucideAngularModule, LucideAngularComponent], styles: ["\n.animate-slide-up[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(24px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=sync-status.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SyncStatusComponent, [{
    type: Component,
    args: [{ selector: "app-sync-status", standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <!-- Sync status pill \xE2\u20AC\u201D shown in header or toolbar -->
    <div class="flex items-center gap-2" role="status" [attr.aria-label]="statusLabel()">
      <!-- Animated sync icon when syncing -->
      @if (state() === 'syncing') {
        <lucide-icon name="loader-2" [size]="14" class="animate-spin text-primary-500" aria-hidden="true"></lucide-icon>
      }
      <!-- Status icon -->
      @switch (state()) {
        @case ('synced') {
          <lucide-icon name="check-circle" [size]="14" class="text-teal-500 shrink-0" aria-hidden="true"></lucide-icon>
        }
        @case ('error') {
          <lucide-icon name="alert-circle" [size]="14" class="text-red-500 shrink-0" aria-hidden="true"></lucide-icon>
        }
        @case ('conflict') {
          <lucide-icon name="alert-triangle" [size]="14" class="text-amber-500 shrink-0" aria-hidden="true"></lucide-icon>
        }
      }

      <!-- Label -->
      <span class="text-xs font-semibold" [class]="stateClass()">
        {{ statusLabel() }}
      </span>

      <!-- Pending count badge -->
      @if (pendingCount() > 0) {
        <span class="text-xs text-gray-400">({{ t()['sync.queue.count'].replace('{n}', '' + pendingCount()) }})</span>
      }

      <!-- Last synced timestamp -->
      @if (lastSyncedAt() && state() === 'synced') {
        <span class="text-xs text-gray-400 hidden sm:inline">&bull; {{ lastSyncedLabel() }}</span>
      }

      <!-- Conflict count badge -->
      @if (conflictCount() > 0) {
        <button
          type="button"
          (click)="showConflictPanel.set(true)"
          class="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold hover:bg-amber-100 transition-colors"
          [attr.aria-label]="conflictLabel()">
          <lucide-icon name="alert-triangle" [size]="10" aria-hidden="true"></lucide-icon>
          {{ conflictCount() }}
        </button>
      }

      <!-- Retry button on error -->
      @if (state() === 'error') {
        <button
          type="button"
          (click)="retrySync()"
          class="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold hover:bg-red-100 transition-colors"
          aria-label="{{ retryLabel() }}">
          <lucide-icon name="refresh-cw" [size]="10" aria-hidden="true"></lucide-icon>
          {{ retryLabel() }}
        </button>
      }
    </div>

    <!-- Conflict Resolution Panel (modal/drawer) -->
    @if (showConflictPanel()) {
      <div class="fixed inset-0 z-50 flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="conflict-panel-title">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" (click)="showConflictPanel.set(false)" aria-hidden="true"></div>

        <!-- Panel -->
        <div class="relative z-10 w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-[0_-20px_60px_-12px_rgba(0,0,0,0.15)] border-t sm:border border-gray-100 overflow-hidden animate-slide-up">
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-amber-50">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <lucide-icon name="alert-triangle" [size]="20" class="text-amber-600" aria-hidden="true"></lucide-icon>
              </div>
              <div>
                <h2 id="conflict-panel-title" class="font-extrabold text-gray-800 text-lg">{{ conflictPanelTitle() }}</h2>
                <p class="text-sm text-gray-500 font-medium">{{ conflictPanelSubtitle() }}</p>
              </div>
            </div>
            <button
              type="button"
              (click)="showConflictPanel.set(false)"
              class="w-9 h-9 rounded-xl bg-white hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all shadow-sm border border-gray-200"
              [attr.aria-label]="i18n.t()['child.cancel']">
              <lucide-icon name="x" [size]="16" aria-hidden="true"></lucide-icon>
            </button>
          </div>

          <!-- Conflict List -->
          <div class="px-6 py-5 space-y-4 max-h-80 overflow-y-auto">
            @for (conflict of pendingConflicts(); track conflict.entityId) {
              <div class="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                    <lucide-icon name="git-merge" [size]="14" class="text-amber-600" aria-hidden="true"></lucide-icon>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-bold text-gray-800 text-sm">{{ conflict.entityLabel() }}</p>
                    <p class="text-xs text-gray-500 mt-0.5">{{ conflict.timeDiffLabel() }}</p>
                    <p class="text-xs text-gray-400 mt-1 font-mono">{{ conflict.entityId }}</p>
                  </div>
                  @if (conflict.type === 'medical_data_manual_review') {
                    <span class="shrink-0 px-2 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-bold">
                      {{ medicalReviewLabel() }}
                    </span>
                  }
                </div>

                <!-- Compare local vs server -->
                <div class="mt-3 grid grid-cols-2 gap-2">
                  <div class="bg-white rounded-xl p-3 border border-gray-100">
                    <p class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{{ thisLocalLabel() }}</p>
                    <div class="space-y-1">
                      @for (field of conflict.changedFields(); track field.key) {
                        <div class="text-xs">
                          <span class="text-gray-400 font-medium">{{ field.label }}:</span>
                          <span class="text-gray-700 font-semibold ml-1">{{ field.local }}</span>
                        </div>
                      }
                    </div>
                  </div>
                  <div class="bg-white rounded-xl p-3 border border-gray-100">
                    <p class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{{ thisServerLabel() }}</p>
                    <div class="space-y-1">
                      @for (field of conflict.changedFields(); track field.key) {
                        <div class="text-xs">
                          <span class="text-gray-400 font-medium">{{ field.label }}:</span>
                          <span class="text-gray-700 font-semibold ml-1">{{ field.server }}</span>
                        </div>
                      }
                    </div>
                  </div>
                </div>

                <!-- Resolution actions -->
                @if (conflict.type === 'medical_data_manual_review') {
                  <div class="mt-4 flex gap-2">
                    <button
                      type="button"
                      (click)="resolveConflict(conflict, 'local_wins')"
                      class="flex-1 py-2.5 rounded-xl bg-primary-50 border border-primary-200 text-primary-700 font-bold text-xs hover:bg-primary-100 transition-colors">
                      {{ useLocalLabel() }}
                    </button>
                    <button
                      type="button"
                      (click)="resolveConflict(conflict, 'server_wins')"
                      class="flex-1 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-100 transition-colors">
                      {{ useServerLabel() }}
                    </button>
                  </div>
                }
              </div>
            }
          </div>

          <!-- Footer -->
          <div class="px-6 py-4 border-t border-gray-100 bg-gray-50">
            <p class="text-xs text-gray-400 text-center font-medium">{{ conflictFooterNote() }}</p>
          </div>
        </div>
      </div>
    }
  `, styles: ["/* angular:styles/component:css;b725cede7c70f89fba2ae49c92e2661499739ddfe04878dca5f42619334d656c;C:/Users/g_gus/Desktop/jona/kiddok/src/app/components/sync-status.component.ts */\n.animate-slide-up {\n  animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(24px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=sync-status.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SyncStatusComponent, { className: "SyncStatusComponent", filePath: "src/app/components/sync-status.component.ts", lineNumber: 195 });
})();
var PendingConflict = class {
  constructor(conflict) {
    this.entityType = conflict.entityType;
    this.entityId = conflict.entityId;
    this.type = conflict.conflictType;
    this.localData = conflict.localData;
    this.serverData = conflict.serverData;
    this.localTimestamp = conflict.localTimestamp;
    this.serverTimestamp = conflict.serverTimestamp;
  }
  entityLabel() {
    const labels = {
      temperature: "Temperature Entry",
      growth: "Growth Measurement",
      vaccine: "Vaccine Record",
      diary: "Diary Entry"
    };
    return labels[this.entityType] ?? this.entityType;
  }
  timeDiffLabel() {
    const diff = this.serverTimestamp - this.localTimestamp;
    const mins = Math.floor(diff / 6e4);
    if (mins < 1)
      return "Updated seconds ago on server";
    if (mins < 60)
      return `Server updated ${mins}m after your local edit`;
    const hours = Math.floor(mins / 60);
    return `Server updated ${hours}h after your local edit`;
  }
  changedFields() {
    const fields = {
      temperature: "Temperature",
      height: "Height",
      weight: "Weight",
      name: "Name",
      notes: "Notes",
      completed: "Completed"
    };
    const result = [];
    const localData = this.localData;
    const serverData = this.serverData;
    for (const key of Object.keys(fields)) {
      if (localData[key] !== void 0 && serverData[key] !== void 0 && localData[key] !== serverData[key]) {
        result.push({
          key,
          label: fields[key],
          local: String(localData[key] ?? "--"),
          server: String(serverData[key] ?? "--")
        });
      }
    }
    return result;
  }
};

// src/app/components/sidebar.component.ts
var _forTrack02 = ($index, $item) => $item.id;
function SidebarComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 13);
    \u0275\u0275elementStart(1, "div", 14)(2, "span", 15);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 16);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const child_r1 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r1.avatarUrl(child_r1.id), \u0275\u0275sanitizeUrl)("alt", child_r1.name + " avatar");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(child_r1.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.ageLabel(child_r1));
  }
}
function SidebarComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "lucide-icon", 17);
    \u0275\u0275elementStart(2, "span", 18);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.t()["sidebar.noChildSelected"]);
  }
}
function SidebarComponent_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function SidebarComponent_For_11_Template_button_click_0_listener() {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.navigateTo(item_r4.id));
    });
    \u0275\u0275element(1, "lucide-icon", 20);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("sidebar__nav-item--active", ctx_r1.currentTab() === item_r4.id);
    \u0275\u0275attribute("aria-current", ctx_r1.currentTab() === item_r4.id ? "page" : null);
    \u0275\u0275advance();
    \u0275\u0275property("name", item_r4.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.t()[item_r4.labelKey]);
  }
}
var SidebarComponent = class _SidebarComponent {
  constructor() {
    this.dataService = inject(DataService);
    this.i18n = inject(I18nService);
    this.router = inject(Router);
    this.t = this.i18n.t;
    this.currentTab = this.dataService.currentTab;
    this.navItems = [
      { id: "home", icon: "Home", labelKey: "sidebar.nav.home" },
      { id: "temperature", icon: "Thermometer", labelKey: "sidebar.nav.temperature" },
      { id: "growth", icon: "TrendingUp", labelKey: "sidebar.nav.growth" },
      { id: "diary", icon: "BookOpen", labelKey: "sidebar.nav.diary" },
      { id: "vaccines", icon: "Syringe", labelKey: "sidebar.nav.vaccines" },
      { id: "medications", icon: "Pill", labelKey: "sidebar.nav.medications" },
      { id: "appointments", icon: "CalendarCheck", labelKey: "sidebar.nav.appointments" },
      { id: "lab-results", icon: "FlaskConical", labelKey: "sidebar.nav.labResults" },
      { id: "analytics", icon: "BarChart2", labelKey: "sidebar.nav.analytics" }
    ];
    this.activeChild = computed(() => {
      const activeId = this.dataService.activeChildId();
      if (!activeId)
        return null;
      return this.dataService.children().find((c) => c.id === activeId) ?? null;
    }, ...ngDevMode ? [{ debugName: "activeChild" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  avatarUrl(childId) {
    return `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(childId)}`;
  }
  ageLabel(child) {
    const age = this.dataService.getChildAge(child);
    if (age.years >= 1) {
      return this.t()["sidebar.ageFormat"].replace("{n}", String(age.years));
    }
    return this.t()["sidebar.ageFormatMonths"].replace("{n}", String(age.months));
  }
  navigateTo(tabId) {
    window.dispatchEvent(new CustomEvent("kiddok:navigate", { detail: tabId }));
  }
  logout() {
    this.dataService.logout();
    this.router.navigate(["/login"]);
  }
  static {
    this.\u0275fac = function SidebarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SidebarComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SidebarComponent, selectors: [["app-sidebar"]], decls: 22, vars: 9, consts: [["aria-label", "Sidebar navigation", 1, "sidebar"], [1, "sidebar__brand"], [1, "sidebar__logo"], ["type", "button", 1, "locale-toggle", 3, "click"], [1, "sidebar__child-card"], [1, "sidebar__child-placeholder"], ["aria-label", "Main navigation", 1, "sidebar__nav"], ["type", "button", 1, "sidebar__nav-item", 3, "sidebar__nav-item--active"], [1, "sidebar__footer"], ["type", "button", 1, "sidebar__footer-item", 3, "click"], ["name", "settings", "aria-hidden", "true", 1, "sidebar__nav-icon"], ["type", "button", 1, "sidebar__footer-item", "sidebar__footer-item--logout", 3, "click"], ["name", "LogOut", "aria-hidden", "true", 1, "sidebar__nav-icon"], [1, "sidebar__avatar", 3, "src", "alt"], [1, "sidebar__child-info"], [1, "sidebar__child-name"], [1, "sidebar__age-badge"], ["name", "user", "aria-hidden", "true", 1, "sidebar__placeholder-icon"], [1, "sidebar__placeholder-text"], ["type", "button", 1, "sidebar__nav-item", 3, "click"], ["aria-hidden", "true", 1, "sidebar__nav-icon", 3, "name"]], template: function SidebarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "aside", 0)(1, "div", 1)(2, "span", 2);
        \u0275\u0275text(3, "KidDok");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 3);
        \u0275\u0275listener("click", function SidebarComponent_Template_button_click_4_listener() {
          return ctx.i18n.toggleLocale();
        });
        \u0275\u0275text(5);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "div", 4);
        \u0275\u0275conditionalCreate(7, SidebarComponent_Conditional_7_Template, 6, 4)(8, SidebarComponent_Conditional_8_Template, 4, 1, "div", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "nav", 6);
        \u0275\u0275repeaterCreate(10, SidebarComponent_For_11_Template, 4, 5, "button", 7, _forTrack02);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "div", 8);
        \u0275\u0275element(13, "app-sync-status");
        \u0275\u0275elementStart(14, "button", 9);
        \u0275\u0275listener("click", function SidebarComponent_Template_button_click_14_listener() {
          return ctx.navigateTo("settings");
        });
        \u0275\u0275element(15, "lucide-icon", 10);
        \u0275\u0275elementStart(16, "span");
        \u0275\u0275text(17);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "button", 11);
        \u0275\u0275listener("click", function SidebarComponent_Template_button_click_18_listener() {
          return ctx.logout();
        });
        \u0275\u0275element(19, "lucide-icon", 12);
        \u0275\u0275elementStart(20, "span");
        \u0275\u0275text(21);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        let tmp_3_0;
        \u0275\u0275advance(4);
        \u0275\u0275attribute("aria-label", "Switch to " + (ctx.i18n.locale() === "sq" ? "English" : "Albanian"));
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.i18n.locale() === "sq" ? "EN" : "SQ", " ");
        \u0275\u0275advance();
        \u0275\u0275classProp("sidebar__child-card--empty", !ctx.activeChild());
        \u0275\u0275advance();
        \u0275\u0275conditional((tmp_3_0 = ctx.activeChild()) ? 7 : 8, tmp_3_0);
        \u0275\u0275advance(3);
        \u0275\u0275repeater(ctx.navItems);
        \u0275\u0275advance(4);
        \u0275\u0275attribute("aria-label", ctx.t()["sidebar.footer.settings"]);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.t()["sidebar.footer.settings"]);
        \u0275\u0275advance();
        \u0275\u0275attribute("aria-label", ctx.t()["sidebar.footer.logout"]);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.t()["sidebar.footer.logout"]);
      }
    }, dependencies: [CommonModule, LucideAngularModule, LucideAngularComponent, SyncStatusComponent], styles: ['\n.sidebar[_ngcontent-%COMP%] {\n  width: 280px;\n  height: 100dvh;\n  background: #ffffff;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  border-left: 4px solid;\n  border-image:\n    linear-gradient(\n      to bottom,\n      #6366F1,\n      #14B8A6) 1;\n  flex-shrink: 0;\n}\n.dark[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%] {\n  background: #1e293b;\n  border-image:\n    linear-gradient(\n      to bottom,\n      #7c3aed,\n      #0d9488) 1;\n}\n.sidebar__brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px 20px 16px;\n}\n.sidebar__logo[_ngcontent-%COMP%] {\n  font-family: "Inter", sans-serif;\n  font-size: 28px;\n  font-weight: 800;\n  color: #6366F1;\n  letter-spacing: -0.5px;\n}\n.dark[_ngcontent-%COMP%]   .sidebar__logo[_ngcontent-%COMP%] {\n  color: #a78bfa;\n}\n.locale-toggle[_ngcontent-%COMP%] {\n  font-family: "Inter", sans-serif;\n  font-size: 11px;\n  font-weight: 700;\n  padding: 4px 10px;\n  border-radius: 9999px;\n  background: #f5f5f4;\n  color: #78716C;\n  border: none;\n  cursor: pointer;\n  transition: background 0.2s ease, color 0.2s ease;\n}\n.dark[_ngcontent-%COMP%]   .locale-toggle[_ngcontent-%COMP%] {\n  background: #334155;\n  color: #94a3b8;\n}\n.locale-toggle[_ngcontent-%COMP%]:hover {\n  background: #e7e5e4;\n  color: #44403c;\n}\n.dark[_ngcontent-%COMP%]   .locale-toggle[_ngcontent-%COMP%]:hover {\n  background: #475569;\n  color: #e2e8f0;\n}\n.sidebar__child-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 0 16px 8px;\n  padding: 12px 16px;\n  border-radius: 16px;\n  background: #ffffff;\n  border: 2px solid #c7d2fe;\n}\n.dark[_ngcontent-%COMP%]   .sidebar__child-card[_ngcontent-%COMP%] {\n  background: #1e293b;\n  border-color: #4338ca;\n}\n.sidebar__child-card--empty[_ngcontent-%COMP%] {\n  border: 2px dashed #e7e5e4;\n  background: #fafaf9;\n}\n.dark[_ngcontent-%COMP%]   .sidebar__child-card--empty[_ngcontent-%COMP%] {\n  border-color: #334155;\n  background: #0f172a;\n}\n.sidebar__avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 9999px;\n  border: 2px solid #c7d2fe;\n  flex-shrink: 0;\n}\n.dark[_ngcontent-%COMP%]   .sidebar__avatar[_ngcontent-%COMP%] {\n  border-color: #4338ca;\n}\n.sidebar__child-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  min-width: 0;\n}\n.sidebar__child-name[_ngcontent-%COMP%] {\n  font-family: "Inter", sans-serif;\n  font-size: 15px;\n  font-weight: 700;\n  color: #1c1917;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.dark[_ngcontent-%COMP%]   .sidebar__child-name[_ngcontent-%COMP%] {\n  color: #f1f5f9;\n}\n.sidebar__age-badge[_ngcontent-%COMP%] {\n  font-family: "Inter", sans-serif;\n  font-size: 11px;\n  font-weight: 700;\n  padding: 2px 8px;\n  border-radius: 9999px;\n  background: #eef2ff;\n  color: #4338ca;\n  width: fit-content;\n}\n.dark[_ngcontent-%COMP%]   .sidebar__age-badge[_ngcontent-%COMP%] {\n  background: #312e81;\n  color: #c4b5fd;\n}\n.sidebar__child-placeholder[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 2px 0;\n}\n.sidebar__placeholder-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #a8a29e;\n}\n.dark[_ngcontent-%COMP%]   .sidebar__placeholder-icon[_ngcontent-%COMP%] {\n  color: #64748b;\n}\n.sidebar__placeholder-text[_ngcontent-%COMP%] {\n  font-family: "Inter", sans-serif;\n  font-size: 13px;\n  font-weight: 500;\n  color: #a8a29e;\n}\n.dark[_ngcontent-%COMP%]   .sidebar__placeholder-text[_ngcontent-%COMP%] {\n  color: #64748b;\n}\n.sidebar__nav[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  padding: 8px 12px 16px;\n  overflow-y: auto;\n}\n.sidebar__nav-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 16px;\n  border-radius: 12px;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  transition: background 0.2s ease;\n  width: 100%;\n  text-align: left;\n  font-family: "Inter", sans-serif;\n  font-size: 15px;\n  font-weight: 600;\n  color: #78716c;\n}\n.sidebar__nav-item[_ngcontent-%COMP%]:hover {\n  background: #f5f5f4;\n}\n.dark[_ngcontent-%COMP%]   .sidebar__nav-item[_ngcontent-%COMP%]:hover {\n  background: #1e293b;\n}\n.sidebar__nav-item--active[_ngcontent-%COMP%] {\n  background: #eef2ff;\n  color: #6366F1;\n  box-shadow: inset 4px 0 0 #6366F1;\n}\n.dark[_ngcontent-%COMP%]   .sidebar__nav-item--active[_ngcontent-%COMP%] {\n  background: #312e81;\n  color: #a78bfa;\n  box-shadow: inset 4px 0 0 #a78bfa;\n}\n.sidebar__nav-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.sidebar__footer[_ngcontent-%COMP%] {\n  padding: 12px 12px 24px;\n  border-top: 1px solid #f5f5f4;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.dark[_ngcontent-%COMP%]   .sidebar__footer[_ngcontent-%COMP%] {\n  border-top-color: #334155;\n}\n.sidebar__footer-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 8px 16px;\n  border-radius: 12px;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  transition: background 0.2s ease, color 0.2s ease;\n  width: 100%;\n  text-align: left;\n  font-family: "Inter", sans-serif;\n  font-size: 13px;\n  font-weight: 500;\n  color: #78716c;\n}\n.sidebar__footer-item[_ngcontent-%COMP%]:hover {\n  background: #f5f5f4;\n  color: #44403c;\n}\n.dark[_ngcontent-%COMP%]   .sidebar__footer-item[_ngcontent-%COMP%]:hover {\n  background: #1e293b;\n  color: #e2e8f0;\n}\n.sidebar__footer-item--logout[_ngcontent-%COMP%] {\n  color: #f43f5e;\n}\n.sidebar__footer-item--logout[_ngcontent-%COMP%]:hover {\n  background: #fff1f2;\n  color: #e11d48;\n}\n.dark[_ngcontent-%COMP%]   .sidebar__footer-item--logout[_ngcontent-%COMP%] {\n  color: #fb7185;\n}\n.dark[_ngcontent-%COMP%]   .sidebar__footer-item--logout[_ngcontent-%COMP%]:hover {\n  background: #4c0519;\n  color: #fb7185;\n}\n/*# sourceMappingURL=sidebar.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarComponent, [{
    type: Component,
    args: [{ selector: "app-sidebar", standalone: true, imports: [CommonModule, LucideAngularModule, SyncStatusComponent], template: `
    <aside class="sidebar" aria-label="Sidebar navigation">
      <!-- Brand row -->
      <div class="sidebar__brand">
        <span class="sidebar__logo">KidDok</span>
        <button type="button" class="locale-toggle" (click)="i18n.toggleLocale()" [attr.aria-label]="'Switch to ' + (i18n.locale() === 'sq' ? 'English' : 'Albanian')">
          {{ i18n.locale() === 'sq' ? 'EN' : 'SQ' }}
        </button>
      </div>

      <!-- Active child mini-card -->
      <div class="sidebar__child-card" [class.sidebar__child-card--empty]="!activeChild()">
        @if (activeChild(); as child) {
          <img [src]="avatarUrl(child.id)" class="sidebar__avatar" [alt]="child.name + ' avatar'" />
          <div class="sidebar__child-info">
            <span class="sidebar__child-name">{{ child.name }}</span>
            <span class="sidebar__age-badge">{{ ageLabel(child) }}</span>
          </div>
        } @else {
          <div class="sidebar__child-placeholder">
            <lucide-icon name="user" class="sidebar__placeholder-icon" aria-hidden="true"></lucide-icon>
            <span class="sidebar__placeholder-text">{{ t()['sidebar.noChildSelected'] }}</span>
          </div>
        }
      </div>

      <!-- Navigation list -->
      <nav class="sidebar__nav" aria-label="Main navigation">
        @for (item of navItems; track item.id) {
          <button
            type="button"
            class="sidebar__nav-item"
            [class.sidebar__nav-item--active]="currentTab() === item.id"
            (click)="navigateTo(item.id)"
            [attr.aria-current]="currentTab() === item.id ? 'page' : null"
          >
            <lucide-icon [name]="item.icon" class="sidebar__nav-icon" aria-hidden="true"></lucide-icon>
            <span>{{ t()[item.labelKey] }}</span>
          </button>
        }
      </nav>

      <!-- Footer -->
      <div class="sidebar__footer">
        <app-sync-status />
        <button type="button" class="sidebar__footer-item" (click)="navigateTo('settings')" [attr.aria-label]="t()['sidebar.footer.settings']">
          <lucide-icon name="settings" class="sidebar__nav-icon" aria-hidden="true"></lucide-icon>
          <span>{{ t()['sidebar.footer.settings'] }}</span>
        </button>
        <button type="button" class="sidebar__footer-item sidebar__footer-item--logout" (click)="logout()" [attr.aria-label]="t()['sidebar.footer.logout']">
          <lucide-icon name="LogOut" class="sidebar__nav-icon" aria-hidden="true"></lucide-icon>
          <span>{{ t()['sidebar.footer.logout'] }}</span>
        </button>
      </div>
    </aside>
  `, styles: ['/* angular:styles/component:css;139f2f52d2f3b78d71e54ddc458e140a2b1010f6e3f06966d508fcf7da1193ae;C:/Users/g_gus/Desktop/jona/kiddok/src/app/components/sidebar.component.ts */\n.sidebar {\n  width: 280px;\n  height: 100dvh;\n  background: #ffffff;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  border-left: 4px solid;\n  border-image:\n    linear-gradient(\n      to bottom,\n      #6366F1,\n      #14B8A6) 1;\n  flex-shrink: 0;\n}\n.dark .sidebar {\n  background: #1e293b;\n  border-image:\n    linear-gradient(\n      to bottom,\n      #7c3aed,\n      #0d9488) 1;\n}\n.sidebar__brand {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px 20px 16px;\n}\n.sidebar__logo {\n  font-family: "Inter", sans-serif;\n  font-size: 28px;\n  font-weight: 800;\n  color: #6366F1;\n  letter-spacing: -0.5px;\n}\n.dark .sidebar__logo {\n  color: #a78bfa;\n}\n.locale-toggle {\n  font-family: "Inter", sans-serif;\n  font-size: 11px;\n  font-weight: 700;\n  padding: 4px 10px;\n  border-radius: 9999px;\n  background: #f5f5f4;\n  color: #78716C;\n  border: none;\n  cursor: pointer;\n  transition: background 0.2s ease, color 0.2s ease;\n}\n.dark .locale-toggle {\n  background: #334155;\n  color: #94a3b8;\n}\n.locale-toggle:hover {\n  background: #e7e5e4;\n  color: #44403c;\n}\n.dark .locale-toggle:hover {\n  background: #475569;\n  color: #e2e8f0;\n}\n.sidebar__child-card {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 0 16px 8px;\n  padding: 12px 16px;\n  border-radius: 16px;\n  background: #ffffff;\n  border: 2px solid #c7d2fe;\n}\n.dark .sidebar__child-card {\n  background: #1e293b;\n  border-color: #4338ca;\n}\n.sidebar__child-card--empty {\n  border: 2px dashed #e7e5e4;\n  background: #fafaf9;\n}\n.dark .sidebar__child-card--empty {\n  border-color: #334155;\n  background: #0f172a;\n}\n.sidebar__avatar {\n  width: 36px;\n  height: 36px;\n  border-radius: 9999px;\n  border: 2px solid #c7d2fe;\n  flex-shrink: 0;\n}\n.dark .sidebar__avatar {\n  border-color: #4338ca;\n}\n.sidebar__child-info {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  min-width: 0;\n}\n.sidebar__child-name {\n  font-family: "Inter", sans-serif;\n  font-size: 15px;\n  font-weight: 700;\n  color: #1c1917;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.dark .sidebar__child-name {\n  color: #f1f5f9;\n}\n.sidebar__age-badge {\n  font-family: "Inter", sans-serif;\n  font-size: 11px;\n  font-weight: 700;\n  padding: 2px 8px;\n  border-radius: 9999px;\n  background: #eef2ff;\n  color: #4338ca;\n  width: fit-content;\n}\n.dark .sidebar__age-badge {\n  background: #312e81;\n  color: #c4b5fd;\n}\n.sidebar__child-placeholder {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 2px 0;\n}\n.sidebar__placeholder-icon {\n  font-size: 20px;\n  color: #a8a29e;\n}\n.dark .sidebar__placeholder-icon {\n  color: #64748b;\n}\n.sidebar__placeholder-text {\n  font-family: "Inter", sans-serif;\n  font-size: 13px;\n  font-weight: 500;\n  color: #a8a29e;\n}\n.dark .sidebar__placeholder-text {\n  color: #64748b;\n}\n.sidebar__nav {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  padding: 8px 12px 16px;\n  overflow-y: auto;\n}\n.sidebar__nav-item {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 16px;\n  border-radius: 12px;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  transition: background 0.2s ease;\n  width: 100%;\n  text-align: left;\n  font-family: "Inter", sans-serif;\n  font-size: 15px;\n  font-weight: 600;\n  color: #78716c;\n}\n.sidebar__nav-item:hover {\n  background: #f5f5f4;\n}\n.dark .sidebar__nav-item:hover {\n  background: #1e293b;\n}\n.sidebar__nav-item--active {\n  background: #eef2ff;\n  color: #6366F1;\n  box-shadow: inset 4px 0 0 #6366F1;\n}\n.dark .sidebar__nav-item--active {\n  background: #312e81;\n  color: #a78bfa;\n  box-shadow: inset 4px 0 0 #a78bfa;\n}\n.sidebar__nav-icon {\n  flex-shrink: 0;\n}\n.sidebar__footer {\n  padding: 12px 12px 24px;\n  border-top: 1px solid #f5f5f4;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.dark .sidebar__footer {\n  border-top-color: #334155;\n}\n.sidebar__footer-item {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 8px 16px;\n  border-radius: 12px;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  transition: background 0.2s ease, color 0.2s ease;\n  width: 100%;\n  text-align: left;\n  font-family: "Inter", sans-serif;\n  font-size: 13px;\n  font-weight: 500;\n  color: #78716c;\n}\n.sidebar__footer-item:hover {\n  background: #f5f5f4;\n  color: #44403c;\n}\n.dark .sidebar__footer-item:hover {\n  background: #1e293b;\n  color: #e2e8f0;\n}\n.sidebar__footer-item--logout {\n  color: #f43f5e;\n}\n.sidebar__footer-item--logout:hover {\n  background: #fff1f2;\n  color: #e11d48;\n}\n.dark .sidebar__footer-item--logout {\n  color: #fb7185;\n}\n.dark .sidebar__footer-item--logout:hover {\n  background: #4c0519;\n  color: #fb7185;\n}\n/*# sourceMappingURL=sidebar.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SidebarComponent, { className: "SidebarComponent", filePath: "src/app/components/sidebar.component.ts", lineNumber: 353 });
})();

// src/app/components/header.component.ts
var _forTrack03 = ($index, $item) => $item.id;
function HeaderComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 20);
    \u0275\u0275listener("click", function HeaderComponent_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.backRequested.emit());
    });
    \u0275\u0275element(1, "lucide-icon", 21);
    \u0275\u0275elementStart(2, "span", 22);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-label", ctx_r1.i18n.t()["nav.back"]);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["nav.back"]);
  }
}
function HeaderComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 23);
    \u0275\u0275listener("click", function HeaderComponent_Conditional_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.exportRequested.emit());
    });
    \u0275\u0275element(1, "lucide-icon", 24);
    \u0275\u0275elementStart(2, "span", 25);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-label", ctx_r1.i18n.t()["export.trigger"]);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["export.trigger"]);
  }
}
function HeaderComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275listener("click", function HeaderComponent_Conditional_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openQuickSwitcher());
    });
    \u0275\u0275element(1, "lucide-icon", 27);
    \u0275\u0275elementStart(2, "span", 28);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 29);
    \u0275\u0275text(5, "Alt+C");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-label", ctx_r1.i18n.t()["header.quickSwitch"]);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["header.quickSwitch"]);
  }
}
function HeaderComponent_Conditional_15_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.activeChildAge(), " ");
  }
}
function HeaderComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 30);
    \u0275\u0275elementStart(1, "span", 31);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, HeaderComponent_Conditional_15_Conditional_3_Template, 2, 1, "span", 32);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r1.activeChild().avatarUrl, \u0275\u0275sanitizeUrl)("alt", ctx_r1.activeChild().name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.activeChild().name);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.activeChildAge() ? 3 : -1);
  }
}
function HeaderComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275element(1, "lucide-icon", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 35);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["child.addNewBtn"]);
  }
}
function HeaderComponent_Conditional_18_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39)(1, "p", 45);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["header.noChildrenPlaceholder"], " ");
  }
}
function HeaderComponent_Conditional_18_For_7_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 51);
  }
}
function HeaderComponent_Conditional_18_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275listener("click", function HeaderComponent_Conditional_18_For_7_Template_div_click_0_listener() {
      const child_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onChildSelected(child_r7));
    });
    \u0275\u0275element(1, "img", 47);
    \u0275\u0275elementStart(2, "div", 48)(3, "span", 49);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 50);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, HeaderComponent_Conditional_18_For_7_Conditional_7_Template, 1, 0, "lucide-icon", 51);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const child_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("bg-indigo-50", child_r7.id === ctx_r1.activeChildId());
    \u0275\u0275attribute("aria-selected", child_r7.id === ctx_r1.activeChildId());
    \u0275\u0275advance();
    \u0275\u0275property("src", child_r7.avatarUrl, \u0275\u0275sanitizeUrl)("alt", child_r7.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(child_r7.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r1.i18n.t()["child.born"], ": ", ctx_r1.toDisplay(child_r7.dateOfBirth, ctx_r1.i18n.locale()), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(child_r7.id === ctx_r1.activeChildId() ? 7 : -1);
  }
}
function HeaderComponent_Conditional_18_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41)(1, "button", 52);
    \u0275\u0275listener("click", function HeaderComponent_Conditional_18_Conditional_8_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onSwitchChild());
    });
    \u0275\u0275element(2, "lucide-icon", 53);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["header.switchChild"], " ");
  }
}
function HeaderComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 36);
    \u0275\u0275element(2, "lucide-icon", 37);
    \u0275\u0275elementStart(3, "span", 38);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(5, HeaderComponent_Conditional_18_Conditional_5_Template, 3, 1, "div", 39);
    \u0275\u0275repeaterCreate(6, HeaderComponent_Conditional_18_For_7_Template, 8, 9, "div", 40, _forTrack03);
    \u0275\u0275conditionalCreate(8, HeaderComponent_Conditional_18_Conditional_8_Template, 4, 1, "div", 41);
    \u0275\u0275elementStart(9, "div", 42)(10, "button", 43);
    \u0275\u0275listener("click", function HeaderComponent_Conditional_18_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAddNewMember());
    });
    \u0275\u0275element(11, "lucide-icon", 44);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["header.profileLabel"], " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.hasChildren() ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.allChildren());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.hasChildren() ? 8 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["header.addNewMember"], " ");
  }
}
function HeaderComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275element(1, "lucide-icon", 54);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 55);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r1.i18n.t()["welcome.loggedIn"], ", ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.dataService.getParentName());
  }
}
function HeaderComponent_Conditional_23_For_13_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 72);
    \u0275\u0275element(1, "lucide-icon", 75);
    \u0275\u0275elementEnd();
  }
}
function HeaderComponent_Conditional_23_For_13_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 74);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["child.activeBadge"], " ");
  }
}
function HeaderComponent_Conditional_23_For_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 69);
    \u0275\u0275listener("click", function HeaderComponent_Conditional_23_For_13_Template_button_click_0_listener() {
      const child_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onQuickSwitch(child_r11));
    });
    \u0275\u0275elementStart(1, "div", 70);
    \u0275\u0275element(2, "img", 71);
    \u0275\u0275conditionalCreate(3, HeaderComponent_Conditional_23_For_13_Conditional_3_Template, 2, 0, "span", 72);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 48)(5, "span", 73);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 50);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(9, HeaderComponent_Conditional_23_For_13_Conditional_9_Template, 2, 1, "span", 74);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const child_r11 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("border-primary-300", child_r11.id === ctx_r1.activeChildId())("bg-primary-50", child_r11.id === ctx_r1.activeChildId())("border-slate-100", child_r11.id !== ctx_r1.activeChildId())("hover:bg-slate-50", child_r11.id !== ctx_r1.activeChildId());
    \u0275\u0275advance(2);
    \u0275\u0275classProp("border-2", true)("border-primary-400", child_r11.id === ctx_r1.activeChildId())("border-slate-200", child_r11.id !== ctx_r1.activeChildId());
    \u0275\u0275property("src", child_r11.avatarUrl, \u0275\u0275sanitizeUrl)("alt", child_r11.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(child_r11.id === ctx_r1.activeChildId() ? 3 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(child_r11.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getChildAgeStr(child_r11));
    \u0275\u0275advance();
    \u0275\u0275conditional(child_r11.id === ctx_r1.activeChildId() ? 9 : -1);
  }
}
function HeaderComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 56);
    \u0275\u0275listener("click", function HeaderComponent_Conditional_23_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeQuickSwitcher());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 57);
    \u0275\u0275element(3, "div", 58);
    \u0275\u0275elementStart(4, "div", 59)(5, "div", 1);
    \u0275\u0275element(6, "lucide-icon", 60);
    \u0275\u0275elementStart(7, "h2", 61);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 62);
    \u0275\u0275listener("click", function HeaderComponent_Conditional_23_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeQuickSwitcher());
    });
    \u0275\u0275element(10, "lucide-icon", 63);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 64);
    \u0275\u0275repeaterCreate(12, HeaderComponent_Conditional_23_For_13_Template, 10, 20, "button", 65, _forTrack03);
    \u0275\u0275elementStart(14, "button", 66);
    \u0275\u0275listener("click", function HeaderComponent_Conditional_23_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAddNewMember());
    });
    \u0275\u0275element(15, "lucide-icon", 44);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 67)(18, "span", 68);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275ariaProperty("aria-label", \u0275\u0275interpolate(ctx_r1.i18n.t()["header.quickSwitch"]));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["header.quickSwitch"]);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.allChildren());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["header.addNewMember"], " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["header.altShortcut"]);
  }
}
var HeaderComponent = class _HeaderComponent {
  constructor() {
    this.currentTab = "home";
    this.viewState = "selector";
    this.switching = false;
    this.childSwitchRequested = new EventEmitter();
    this.addChildRequested = new EventEmitter();
    this.switchProfileRequested = new EventEmitter();
    this.backRequested = new EventEmitter();
    this.localeToggleRequested = new EventEmitter();
    this.exportRequested = new EventEmitter();
    this.menuToggleRequested = new EventEmitter();
    this.dataService = inject(DataService);
    this.i18n = inject(I18nService);
    this.showDropdown = signal(false, ...ngDevMode ? [{ debugName: "showDropdown" }] : (
      /* istanbul ignore next */
      []
    ));
    this.quickSwitcherOpen = signal(false, ...ngDevMode ? [{ debugName: "quickSwitcherOpen" }] : (
      /* istanbul ignore next */
      []
    ));
    this.allChildren = computed(() => this.dataService.children(), ...ngDevMode ? [{ debugName: "allChildren" }] : (
      /* istanbul ignore next */
      []
    ));
    this.activeChild = computed(() => {
      const activeId = this.dataService.activeChildId();
      return this.dataService.children().find((c) => c.id === activeId) ?? null;
    }, ...ngDevMode ? [{ debugName: "activeChild" }] : (
      /* istanbul ignore next */
      []
    ));
    this.activeChildId = computed(() => this.dataService.activeChildId(), ...ngDevMode ? [{ debugName: "activeChildId" }] : (
      /* istanbul ignore next */
      []
    ));
    this.hasChildren = computed(() => this.allChildren().length > 0, ...ngDevMode ? [{ debugName: "hasChildren" }] : (
      /* istanbul ignore next */
      []
    ));
    this.activeChildAge = computed(() => {
      const child = this.activeChild();
      if (!child)
        return null;
      return this.getChildAgeStr(child);
    }, ...ngDevMode ? [{ debugName: "activeChildAge" }] : (
      /* istanbul ignore next */
      []
    ));
    this.pageTitle = computed(() => {
      const t = this.i18n.t();
      const tabTitles = {
        home: t["nav.home"],
        diary: t["nav.diary"],
        temperature: t["nav.temperatureDiary"],
        growth: t["nav.growthTracking"],
        records: t["nav.records"],
        settings: t["nav.settings"]
      };
      return tabTitles[this.currentTab] ?? t["nav.home"];
    }, ...ngDevMode ? [{ debugName: "pageTitle" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  // ── Keyboard shortcut: Alt+C ─────────────────────────────────────
  onKeyDown(event) {
    if (event.altKey && event.key.toLowerCase() === "c") {
      event.preventDefault();
      if (this.viewState === "app" && this.hasChildren()) {
        this.openQuickSwitcher();
      }
    }
    if (event.key === "Escape" && this.quickSwitcherOpen()) {
      this.closeQuickSwitcher();
    }
  }
  // ── Quick Switcher ─────────────────────────────────────────────
  openQuickSwitcher() {
    this.quickSwitcherOpen.set(true);
    this.showDropdown.set(false);
  }
  closeQuickSwitcher() {
    this.quickSwitcherOpen.set(false);
  }
  onQuickSwitch(child) {
    this.childSwitchRequested.emit(child.id);
    this.closeQuickSwitcher();
  }
  // ── Dropdown ────────────────────────────────────────────────────
  toggleDropdown() {
    this.showDropdown.update((v) => !v);
    if (this.showDropdown()) {
      this.quickSwitcherOpen.set(false);
    }
  }
  onChildSelected(child) {
    this.childSwitchRequested.emit(child.id);
    this.showDropdown.set(false);
  }
  onSwitchChild() {
    this.switchProfileRequested.emit();
    this.showDropdown.set(false);
  }
  onAddNewMember() {
    this.addChildRequested.emit();
    this.showDropdown.set(false);
    this.quickSwitcherOpen.set(false);
  }
  // ── Click outside ──────────────────────────────────────────────
  onDocumentClick(event) {
    const target = event.target;
    if (!target.closest("app-header")) {
      this.showDropdown.set(false);
    }
  }
  // ── Helpers ────────────────────────────────────────────────────
  toDisplay(yyyymmdd, locale) {
    if (!yyyymmdd || yyyymmdd.includes("/"))
      return yyyymmdd;
    const [y, m, d] = yyyymmdd.split("-");
    if (locale === "sq")
      return d + "/" + m + "/" + y;
    return m + "/" + d + "/" + y;
  }
  getChildAgeStr(child) {
    const age = this.dataService.getChildAge(child);
    const isSq = this.i18n.isSq();
    if (age.years > 0) {
      return isSq ? `${age.years} vje\xE7` : `${age.years} years`;
    }
    return isSq ? `${age.months} muaj` : `${age.months} months`;
  }
  ngOnDestroy() {
  }
  static {
    this.\u0275fac = function HeaderComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HeaderComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HeaderComponent, selectors: [["app-header"]], hostBindings: function HeaderComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("keydown", function HeaderComponent_keydown_HostBindingHandler($event) {
          return ctx.onKeyDown($event);
        })("click", function HeaderComponent_click_HostBindingHandler($event) {
          return ctx.onDocumentClick($event);
        }, \u0275\u0275resolveDocument);
      }
    }, inputs: { currentTab: "currentTab", viewState: "viewState", switching: "switching" }, outputs: { childSwitchRequested: "childSwitchRequested", addChildRequested: "addChildRequested", switchProfileRequested: "switchProfileRequested", backRequested: "backRequested", localeToggleRequested: "localeToggleRequested", exportRequested: "exportRequested", menuToggleRequested: "menuToggleRequested" }, decls: 24, vars: 22, consts: [[1, "px-6", "py-5", "lg:px-10", "lg:py-7", "flex", "items-center", "justify-between", "lg:justify-end", "border-b", "border-gray-200/50", "bg-white/60", "backdrop-blur-xl", "z-30", "shadow-sm"], [1, "flex", "items-center", "gap-3"], ["type", "button", 1, "flex", "items-center", "gap-2", "px-3", "py-2", "rounded-xl", "bg-white", "shadow-soft", "border", "border-gray-100", "hover:border-primary-300", "hover:shadow-md", "transition-all", "text-gray-600", "hover:text-primary-600"], ["type", "button", 1, "lg:hidden", "p-2", "rounded-xl", "bg-white", "shadow-soft", "border", "border-gray-100", 3, "click"], ["name", "menu", "aria-hidden", "true", 1, "text-inherit"], [1, "text-base", "lg:text-lg", "font-extrabold", "text-gray-800", "hidden", "sm:block", "ml-2"], [1, "flex", "items-center", "gap-4", "lg:gap-8"], ["type", "button", 1, "lg:hidden", "flex", "items-center", "gap-2", "px-3", "py-1.5", "bg-slate-100", "hover:bg-slate-200", "rounded-full", "text-xs", "font-bold", "text-gray-600", "transition-all", 3, "click"], ["name", "globe", "aria-hidden", "true", 1, "text-inherit"], ["type", "button", 1, "hidden", "lg:flex", "items-center", "gap-2", "px-3", "py-2", "rounded-xl", "bg-white", "shadow-soft", "border", "border-gray-100", "hover:border-primary-300", "hover:shadow-md", "transition-all", "text-gray-600", "hover:text-primary-600"], ["type", "button", 1, "hidden", "lg:flex", "items-center", "gap-2", "px-3", "py-2", "rounded-xl", "bg-primary-50", "hover:bg-primary-100", "border", "border-primary-200", "text-primary-700", "font-bold", "text-sm", "transition-all", "shadow-sm"], [1, "relative"], ["type", "button", "aria-haspopup", "listbox", 1, "flex", "items-center", "gap-3", "bg-white", "px-4", "py-2", "lg:py-2.5", "rounded-2xl", "shadow-soft", "border", "border-gray-100", "hover:border-primary-300", "hover:shadow-md", "transition-all", 3, "click"], ["name", "chevron-down", "aria-hidden", "true", 1, "text-gray-500", "text-sm", "transition-transform", "duration-200"], ["role", "listbox", "aria-label", "Child selector", 1, "absolute", "right-0", "top-full", "mt-2", "w-80", "bg-white", "rounded-3xl", "shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]", "border", "border-gray-100", "py-3", "animate-slide-up", "z-50", "overflow-hidden", "max-h-[80vh]", "overflow-y-auto"], [1, "hidden", "lg:flex", "items-center", "gap-2", "text-sm", "text-gray-500", "font-medium"], ["role", "button", "tabindex", "0", 1, "w-10", "h-10", "lg:w-12", "lg:h-12", "rounded-full", "bg-gradient-to-tr", "from-primary-500", "to-teal-400", "p-[2px]", "shadow-soft", "cursor-pointer", "hover:shadow-lg", "transition-shadow", 3, "aria-label"], [1, "w-full", "h-full", "bg-white", "rounded-full", "flex", "items-center", "justify-center", "border-2", "border-white"], ["name", "settings", "aria-hidden", "true", 1, "text-inherit"], ["role", "dialog", "aria-modal", "true", 1, "fixed", "inset-0", "z-[100]", "flex", "items-center", "justify-center", 3, "aria-label"], ["type", "button", 1, "flex", "items-center", "gap-2", "px-3", "py-2", "rounded-xl", "bg-white", "shadow-soft", "border", "border-gray-100", "hover:border-primary-300", "hover:shadow-md", "transition-all", "text-gray-600", "hover:text-primary-600", 3, "click"], ["name", "arrow-left", "aria-hidden", "true", 1, "text-inherit"], [1, "text-sm", "font-bold", "hidden", "sm:block"], ["type", "button", 1, "hidden", "lg:flex", "items-center", "gap-2", "px-3", "py-2", "rounded-xl", "bg-white", "shadow-soft", "border", "border-gray-100", "hover:border-primary-300", "hover:shadow-md", "transition-all", "text-gray-600", "hover:text-primary-600", 3, "click"], ["name", "download", "aria-hidden", "true", 1, "text-inherit"], [1, "text-sm", "font-bold", "hidden", "xl:block"], ["type", "button", 1, "hidden", "lg:flex", "items-center", "gap-2", "px-3", "py-2", "rounded-xl", "bg-primary-50", "hover:bg-primary-100", "border", "border-primary-200", "text-primary-700", "font-bold", "text-sm", "transition-all", "shadow-sm", 3, "click"], ["name", "repeat", "aria-hidden", "true", 1, "text-inherit"], [1, "hidden", "xl:inline"], [1, "text-xs", "font-mono", "bg-primary-100", "px-1.5", "py-0.5", "rounded", "border", "border-primary-200"], [1, "w-8", "h-8", "lg:w-10", "lg:h-10", "rounded-full", "border-2", "border-primary-100", "object-cover", 3, "src", "alt"], [1, "font-bold", "text-gray-800", "hidden", "sm:block", "text-sm", "lg:text-base"], [1, "bg-primary-50", "text-primary-600", "text-xs", "font-bold", "px-2", "py-0.5", "rounded-full"], [1, "w-8", "h-8", "lg:w-10", "lg:h-10", "rounded-full", "bg-slate-100", "flex", "items-center", "justify-center", "border-2", "border-dashed", "border-slate-300"], ["name", "user", "aria-hidden", "true", 1, "text-inherit"], [1, "font-bold", "text-gray-500", "hidden", "sm:block"], [1, "px-5", "pb-3", "pt-1", "mb-2", "border-b", "border-gray-50", "flex", "items-center", "gap-2"], ["name", "users", "aria-hidden", "true", 1, "text-inherit"], [1, "text-xs", "font-bold", "text-gray-500", "uppercase", "tracking-wider"], [1, "px-5", "py-8", "text-center"], ["role", "option", 1, "flex", "items-center", "gap-4", "px-5", "py-3", "hover:bg-primary-50", "cursor-pointer", "transition-colors", "mx-2", "mt-0", "rounded-2xl", "border", "border-transparent", "hover:border-primary-100", "group", 3, "bg-indigo-50"], [1, "px-4", "pt-2", "pb-1", "mt-2", "border-t", "border-gray-100"], [1, "px-4", "pt-2", "mt-1"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-center", "gap-2", "py-3.5", "rounded-2xl", "bg-slate-50", "hover:bg-slate-100", "text-slate-700", "font-bold", "transition-colors", "border", "border-slate-200", "hover:border-slate-300", 3, "click"], ["name", "circle-plus", "aria-hidden", "true", 1, "text-inherit"], [1, "text-gray-500", "text-sm", "font-medium"], ["role", "option", 1, "flex", "items-center", "gap-4", "px-5", "py-3", "hover:bg-primary-50", "cursor-pointer", "transition-colors", "mx-2", "mt-0", "rounded-2xl", "border", "border-transparent", "hover:border-primary-100", "group", 3, "click"], [1, "w-12", "h-12", "rounded-full", "border", "border-gray-200", "shadow-sm", 3, "src", "alt"], [1, "flex", "flex-col", "flex-1", "min-w-0"], [1, "font-extrabold", "text-gray-800", "group-hover:text-primary-700", "transition-colors", "truncate"], [1, "text-xs", "text-gray-500", "font-medium"], ["name", "check", "aria-hidden", "true", 1, "text-teal-500"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-3", "px-4", "py-3", "rounded-2xl", "bg-primary-50", "hover:bg-primary-100", "text-primary-700", "font-bold", "transition-colors", "border", "border-primary-200", 3, "click"], ["name", "arrow-left-right", "aria-hidden", "true", 1, "text-inherit"], ["name", "hand", "aria-hidden", "true", 1, "text-inherit"], [1, "font-bold", "text-gray-700"], ["aria-hidden", "true", 1, "absolute", "inset-0", "bg-black/30", "backdrop-blur-sm", 3, "click"], [1, "relative", "z-10", "w-full", "max-w-sm", "mx-4", "bg-white", "rounded-[2rem]", "shadow-[0_32px_80px_-12px_rgba(0,0,0,0.25)]", "border", "border-slate-100", "overflow-hidden", "animate-slide-up"], [1, "h-1.5", "bg-gradient-to-r", "from-primary-600", "via-primary-500", "to-teal-400"], [1, "flex", "items-center", "justify-between", "px-6", "py-5", "border-b", "border-gray-100"], ["name", "repeat", "aria-hidden", "true", 1, "text-primary-500"], [1, "text-lg", "font-black", "text-gray-800"], ["type", "button", 1, "w-8", "h-8", "rounded-xl", "bg-slate-50", "hover:bg-slate-100", "flex", "items-center", "justify-center", "text-slate-400", "hover:text-slate-600", "transition-all", "border", "border-slate-200", 3, "click"], ["name", "x", "aria-hidden", "true", 1, "text-inherit"], [1, "p-4", "space-y-2", "max-h-[60vh]", "overflow-y-auto"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-4", "px-4", "py-3.5", "rounded-2xl", "transition-all", "border-2", "text-left", 3, "border-primary-300", "bg-primary-50", "border-slate-100", "hover:bg-slate-50"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-center", "gap-2", "py-3.5", "mt-2", "rounded-2xl", "bg-slate-50", "hover:bg-slate-100", "text-slate-700", "font-bold", "border-2", "border-dashed", "border-slate-200", "hover:border-slate-300", "transition-all", 3, "click"], [1, "px-6", "py-3", "bg-slate-50", "border-t", "border-gray-100", "text-center"], [1, "text-xs", "text-gray-400", "font-medium"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-4", "px-4", "py-3.5", "rounded-2xl", "transition-all", "border-2", "text-left", 3, "click"], [1, "relative", "shrink-0"], [1, "w-14", "h-14", "rounded-full", "object-cover", "shadow-sm", 3, "src", "alt"], [1, "absolute", "-bottom-1", "-right-1", "w-5", "h-5", "bg-teal-500", "rounded-full", "flex", "items-center", "justify-center", "border-2", "border-white", "shadow-sm"], [1, "font-extrabold", "text-gray-800", "truncate"], [1, "text-xs", "font-bold", "text-primary-600", "bg-primary-100", "px-2", "py-1", "rounded-full", "shrink-0"], ["name", "check", "aria-hidden", "true", 1, "text-white", "text-[10px]"]], template: function HeaderComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "header", 0)(1, "div", 1);
        \u0275\u0275conditionalCreate(2, HeaderComponent_Conditional_2_Template, 4, 2, "button", 2);
        \u0275\u0275elementStart(3, "button", 3);
        \u0275\u0275listener("click", function HeaderComponent_Template_button_click_3_listener() {
          return ctx.menuToggleRequested.emit();
        });
        \u0275\u0275element(4, "lucide-icon", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h1", 5);
        \u0275\u0275text(6);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 6)(8, "button", 7);
        \u0275\u0275listener("click", function HeaderComponent_Template_button_click_8_listener() {
          return ctx.localeToggleRequested.emit();
        });
        \u0275\u0275element(9, "lucide-icon", 8);
        \u0275\u0275text(10);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(11, HeaderComponent_Conditional_11_Template, 4, 2, "button", 9);
        \u0275\u0275conditionalCreate(12, HeaderComponent_Conditional_12_Template, 6, 2, "button", 10);
        \u0275\u0275elementStart(13, "div", 11)(14, "button", 12);
        \u0275\u0275listener("click", function HeaderComponent_Template_button_click_14_listener() {
          return ctx.toggleDropdown();
        });
        \u0275\u0275conditionalCreate(15, HeaderComponent_Conditional_15_Template, 4, 4)(16, HeaderComponent_Conditional_16_Template, 4, 1);
        \u0275\u0275element(17, "lucide-icon", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(18, HeaderComponent_Conditional_18_Template, 13, 4, "div", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(19, HeaderComponent_Conditional_19_Template, 6, 2, "div", 15);
        \u0275\u0275elementStart(20, "div", 16)(21, "div", 17);
        \u0275\u0275element(22, "lucide-icon", 18);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275conditionalCreate(23, HeaderComponent_Conditional_23_Template, 20, 5, "div", 19);
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.viewState === "app" ? 2 : -1);
        \u0275\u0275advance();
        \u0275\u0275attribute("aria-label", ctx.i18n.t()["nav.menu"]);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", ctx.pageTitle(), " ");
        \u0275\u0275advance(2);
        \u0275\u0275attribute("aria-label", ctx.i18n.locale() === "sq" ? "Switch to English" : "Kalo n\xEB shqip");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.locale() === "sq" ? ctx.i18n.t()["header.sq"] : ctx.i18n.t()["header.en"], " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.viewState === "app" && ctx.activeChild() ? 11 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.viewState === "app" && ctx.hasChildren() ? 12 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275classProp("border-primary-300", ctx.showDropdown())("shadow-md", ctx.showDropdown())("opacity-70", ctx.switching);
        \u0275\u0275attribute("aria-expanded", ctx.showDropdown());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.activeChild() ? 15 : 16);
        \u0275\u0275advance(2);
        \u0275\u0275classProp("rotate-180", ctx.showDropdown());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.showDropdown() ? 18 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.viewState === "app" && ctx.dataService.getParentName() ? 19 : -1);
        \u0275\u0275advance();
        \u0275\u0275ariaProperty("aria-label", \u0275\u0275interpolate(ctx.i18n.t()["nav.settings"]));
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.quickSwitcherOpen() ? 23 : -1);
      }
    }, dependencies: [CommonModule, LucideAngularModule, LucideAngularComponent], styles: ["\n.animate-slide-up[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(16px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\nbutton[_ngcontent-%COMP%]:not(:disabled):active {\n  transform: scale(0.98);\n}\n/*# sourceMappingURL=header.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HeaderComponent, [{
    type: Component,
    args: [{ selector: "app-header", standalone: true, imports: [CommonModule, LucideAngularModule], template: `
    <header class="px-6 py-5 lg:px-10 lg:py-7 flex items-center justify-between lg:justify-end border-b border-gray-200/50 bg-white/60 backdrop-blur-xl z-30 shadow-sm">

      <!-- LEFT: Back button + Page title -->
      <div class="flex items-center gap-3">
        @if (viewState === 'app') {
          <button type="button" (click)="backRequested.emit()"
                  class="flex items-center gap-2 px-3 py-2 rounded-xl bg-white shadow-soft border border-gray-100 hover:border-primary-300 hover:shadow-md transition-all text-gray-600 hover:text-primary-600"
                  [attr.aria-label]="i18n.t()['nav.back']">
            <lucide-icon name="arrow-left" class="text-inherit" aria-hidden="true"></lucide-icon>
            <span class="text-sm font-bold hidden sm:block">{{ i18n.t()['nav.back'] }}</span>
          </button>
        }
        <button type="button" class="lg:hidden p-2 rounded-xl bg-white shadow-soft border border-gray-100" [attr.aria-label]="i18n.t()['nav.menu']" (click)="menuToggleRequested.emit()">
          <lucide-icon name="menu" class="text-inherit" aria-hidden="true"></lucide-icon>
        </button>
        <!-- Page title -->
        <h1 class="text-base lg:text-lg font-extrabold text-gray-800 hidden sm:block ml-2">
          {{ pageTitle() }}
        </h1>
      </div>

      <!-- RIGHT: Language toggle + Quick switch + Child switcher + Parent avatar -->
      <div class="flex items-center gap-4 lg:gap-8">

        <!-- Language toggle (mobile only) -->
        <button type="button" (click)="localeToggleRequested.emit()"
                class="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-xs font-bold text-gray-600 transition-all"
                [attr.aria-label]="i18n.locale() === 'sq' ? 'Switch to English' : 'Kalo n\xEB shqip'">
          <lucide-icon name="globe" class="text-inherit" aria-hidden="true"></lucide-icon>
          {{ i18n.locale() === 'sq' ? i18n.t()['header.sq'] : i18n.t()['header.en'] }}
        </button>

        <!-- Export button (app view only, when a child is active) -->
        @if (viewState === 'app' && activeChild()) {
          <button type="button"
                  (click)="exportRequested.emit()"
                  class="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-white shadow-soft border border-gray-100 hover:border-primary-300 hover:shadow-md transition-all text-gray-600 hover:text-primary-600"
                  [attr.aria-label]="i18n.t()['export.trigger']">
            <lucide-icon name="download" class="text-inherit" aria-hidden="true"></lucide-icon>
            <span class="text-sm font-bold hidden xl:block">{{ i18n.t()['export.trigger'] }}</span>
          </button>
        }

        <!-- Quick Switcher button (desktop only, app view) -->
        @if (viewState === 'app' && hasChildren()) {
          <button type="button" (click)="openQuickSwitcher()"
                  class="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-primary-50 hover:bg-primary-100 border border-primary-200 text-primary-700 font-bold text-sm transition-all shadow-sm"
                  [attr.aria-label]="i18n.t()['header.quickSwitch']">
            <lucide-icon name="repeat" class="text-inherit" aria-hidden="true"></lucide-icon>
            <span class="hidden xl:inline">{{ i18n.t()['header.quickSwitch'] }}</span>
            <span class="text-xs font-mono bg-primary-100 px-1.5 py-0.5 rounded border border-primary-200">Alt+C</span>
          </button>
        }

        <!-- Child Switcher Pill -->
        <div class="relative">
          <button type="button" (click)="toggleDropdown()"
                  class="flex items-center gap-3 bg-white px-4 py-2 lg:py-2.5 rounded-2xl shadow-soft border border-gray-100 hover:border-primary-300 hover:shadow-md transition-all"
                  [class.border-primary-300]="showDropdown()"
                  [class.shadow-md]="showDropdown()"
                  [class.opacity-70]="switching"
                  [attr.aria-expanded]="showDropdown()"
                  aria-haspopup="listbox">
            @if (activeChild()) {
              <img [src]="activeChild()!.avatarUrl"
                   [alt]="activeChild()!.name"
                   class="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-primary-100 object-cover" />
              <span class="font-bold text-gray-800 hidden sm:block text-sm lg:text-base">{{ activeChild()!.name }}</span>
              @if (activeChildAge()) {
                <span class="bg-primary-50 text-primary-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {{ activeChildAge() }}
                </span>
              }
            } @else {
              <div class="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300">
                <lucide-icon name="user" class="text-inherit" aria-hidden="true"></lucide-icon>
              </div>
              <span class="font-bold text-gray-500 hidden sm:block">{{ i18n.t()['child.addNewBtn'] }}</span>
            }
            <lucide-icon name="chevron-down" class="text-gray-500 text-sm transition-transform duration-200" [class.rotate-180]="showDropdown()" aria-hidden="true"></lucide-icon>
          </button>

          <!-- Dropdown Panel -->
          @if (showDropdown()) {
            <div role="listbox" aria-label="Child selector" class="absolute right-0 top-full mt-2 w-80 bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 py-3 animate-slide-up z-50 overflow-hidden max-h-[80vh] overflow-y-auto">

              <!-- Section label -->
              <div class="px-5 pb-3 pt-1 mb-2 border-b border-gray-50 flex items-center gap-2">
                <lucide-icon name="users" class="text-inherit" aria-hidden="true"></lucide-icon>
                <span class="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {{ i18n.t()['header.profileLabel'] }}
                </span>
              </div>

              <!-- Empty state -->
              @if (!hasChildren()) {
                <div class="px-5 py-8 text-center">
                  <p class="text-gray-500 text-sm font-medium">
                    {{ i18n.t()['header.noChildrenPlaceholder'] }}
                  </p>
                </div>
              }

              <!-- Child list -->
              @for (child of allChildren(); track child.id) {
                <div role="option" (click)="onChildSelected(child)"
                     class="flex items-center gap-4 px-5 py-3 hover:bg-primary-50 cursor-pointer transition-colors mx-2 mt-0 rounded-2xl border border-transparent hover:border-primary-100 group"
                     [class.bg-indigo-50]="child.id === activeChildId()"
                     [attr.aria-selected]="child.id === activeChildId()">
                  <img [src]="child.avatarUrl"
                       [alt]="child.name"
                       class="w-12 h-12 rounded-full border border-gray-200 shadow-sm" />
                  <div class="flex flex-col flex-1 min-w-0">
                    <span class="font-extrabold text-gray-800 group-hover:text-primary-700 transition-colors truncate">{{ child.name }}</span>
                    <span class="text-xs text-gray-500 font-medium">
                      {{ i18n.t()['child.born'] }}: {{ toDisplay(child.dateOfBirth, i18n.locale()) }}
                    </span>
                  </div>
                  @if (child.id === activeChildId()) {
                    <lucide-icon name="check" class="text-teal-500" aria-hidden="true"></lucide-icon>
                  }
                </div>
              }

              <!-- Action buttons -->
              @if (hasChildren()) {
                <div class="px-4 pt-2 pb-1 mt-2 border-t border-gray-100">
                  <button type="button" (click)="onSwitchChild()"
                          class="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-primary-50 hover:bg-primary-100 text-primary-700 font-bold transition-colors border border-primary-200">
                    <lucide-icon name="arrow-left-right" class="text-inherit" aria-hidden="true"></lucide-icon>
                    {{ i18n.t()['header.switchChild'] }}
                  </button>
                </div>
              }
              <div class="px-4 pt-2 mt-1">
                <button type="button" (click)="onAddNewMember()"
                        class="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold transition-colors border border-slate-200 hover:border-slate-300">
                  <lucide-icon name="circle-plus" class="text-inherit" aria-hidden="true"></lucide-icon>
                  {{ i18n.t()['header.addNewMember'] }}
                </button>
              </div>
            </div>
          }
        </div>

        <!-- Parent welcome block (desktop only, app view) -->
        @if (viewState === 'app' && dataService.getParentName()) {
          <div class="hidden lg:flex items-center gap-2 text-sm text-gray-500 font-medium">
            <lucide-icon name="hand" class="text-inherit" aria-hidden="true"></lucide-icon>
            <span>{{ i18n.t()['welcome.loggedIn'] }}, </span>
            <span class="font-bold text-gray-700">{{ dataService.getParentName() }}</span>
          </div>
        }

        <!-- Parent avatar -->
        <div role="button" tabindex="0" class="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-tr from-primary-500 to-teal-400 p-[2px] shadow-soft cursor-pointer hover:shadow-lg transition-shadow"
             aria-label="{{ i18n.t()['nav.settings'] }}">
          <div class="w-full h-full bg-white rounded-full flex items-center justify-center border-2 border-white">
            <lucide-icon name="settings" class="text-inherit" aria-hidden="true"></lucide-icon>
          </div>
        </div>
      </div>
    </header>

    <!-- Quick Switcher Modal (Alt+C) -->
    @if (quickSwitcherOpen()) {
      <div class="fixed inset-0 z-[100] flex items-center justify-center" role="dialog" aria-modal="true" aria-label="{{ i18n.t()['header.quickSwitch'] }}">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" (click)="closeQuickSwitcher()" aria-hidden="true"></div>

        <!-- Switcher Card -->
        <div class="relative z-10 w-full max-w-sm mx-4 bg-white rounded-[2rem] shadow-[0_32px_80px_-12px_rgba(0,0,0,0.25)] border border-slate-100 overflow-hidden animate-slide-up">
          <!-- Top accent -->
          <div class="h-1.5 bg-gradient-to-r from-primary-600 via-primary-500 to-teal-400"></div>

          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div class="flex items-center gap-3">
              <lucide-icon name="repeat" class="text-primary-500" aria-hidden="true"></lucide-icon>
              <h2 class="text-lg font-black text-gray-800">{{ i18n.t()['header.quickSwitch'] }}</h2>
            </div>
            <button type="button" (click)="closeQuickSwitcher()"
                    class="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all border border-slate-200">
              <lucide-icon name="x" class="text-inherit" aria-hidden="true"></lucide-icon>
            </button>
          </div>

          <!-- Child Grid -->
          <div class="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
            @for (child of allChildren(); track child.id) {
              <button type="button" (click)="onQuickSwitch(child)"
                      class="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all border-2 text-left"
                      [class.border-primary-300]="child.id === activeChildId()"
                      [class.bg-primary-50]="child.id === activeChildId()"
                      [class.border-slate-100]="child.id !== activeChildId()"
                      [class.hover:bg-slate-50]="child.id !== activeChildId()">
                <!-- Avatar -->
                <div class="relative shrink-0">
                  <img [src]="child.avatarUrl" [alt]="child.name"
                       class="w-14 h-14 rounded-full object-cover shadow-sm"
                       [class.border-2]="true"
                       [class.border-primary-400]="child.id === activeChildId()"
                       [class.border-slate-200]="child.id !== activeChildId()" />
                  @if (child.id === activeChildId()) {
                    <span class="absolute -bottom-1 -right-1 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                      <lucide-icon name="check" class="text-white text-[10px]" aria-hidden="true"></lucide-icon>
                    </span>
                  }
                </div>
                <!-- Name + Age -->
                <div class="flex flex-col flex-1 min-w-0">
                  <span class="font-extrabold text-gray-800 truncate">{{ child.name }}</span>
                  <span class="text-xs text-gray-500 font-medium">{{ getChildAgeStr(child) }}</span>
                </div>
                <!-- Active badge -->
                @if (child.id === activeChildId()) {
                  <span class="text-xs font-bold text-primary-600 bg-primary-100 px-2 py-1 rounded-full shrink-0">
                    {{ i18n.t()['child.activeBadge'] }}
                  </span>
                }
              </button>
            }

            <!-- Add New Member -->
            <button type="button" (click)="onAddNewMember()"
                    class="w-full flex items-center justify-center gap-2 py-3.5 mt-2 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold border-2 border-dashed border-slate-200 hover:border-slate-300 transition-all">
              <lucide-icon name="circle-plus" class="text-inherit" aria-hidden="true"></lucide-icon>
              {{ i18n.t()['header.addNewMember'] }}
            </button>
          </div>

          <!-- Footer hint -->
          <div class="px-6 py-3 bg-slate-50 border-t border-gray-100 text-center">
            <span class="text-xs text-gray-400 font-medium">{{ i18n.t()['header.altShortcut'] }}</span>
          </div>
        </div>
      </div>
    }
  `, styles: ["/* angular:styles/component:css;f17f6b29812216938f335d4014057ac497a5fba16c509487d48752bb2fb91a7e;C:/Users/g_gus/Desktop/jona/kiddok/src/app/components/header.component.ts */\n.animate-slide-up {\n  animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(16px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\nbutton:not(:disabled):active {\n  transform: scale(0.98);\n}\n/*# sourceMappingURL=header.component.css.map */\n"] }]
  }], null, { currentTab: [{
    type: Input
  }], viewState: [{
    type: Input
  }], switching: [{
    type: Input
  }], childSwitchRequested: [{
    type: Output
  }], addChildRequested: [{
    type: Output
  }], switchProfileRequested: [{
    type: Output
  }], backRequested: [{
    type: Output
  }], localeToggleRequested: [{
    type: Output
  }], exportRequested: [{
    type: Output
  }], menuToggleRequested: [{
    type: Output
  }], onKeyDown: [{
    type: HostListener,
    args: ["keydown", ["$event"]]
  }], onDocumentClick: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HeaderComponent, { className: "HeaderComponent", filePath: "src/app/components/header.component.ts", lineNumber: 274 });
})();

// src/app/components/bottom-nav.component.ts
var _forTrack04 = ($index, $item) => $item.id;
function BottomNavComponent_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 3);
    \u0275\u0275listener("click", function BottomNavComponent_For_3_Template_button_click_0_listener() {
      const tab_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.navigate(tab_r2.id));
    });
    \u0275\u0275element(1, "lucide-icon", 4);
    \u0275\u0275elementStart(2, "span", 5);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tab_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("text-indigo-600", ctx_r2.currentTab() === tab_r2.id)("dark:text-purple-400", ctx_r2.currentTab() === tab_r2.id)("text-stone-500", ctx_r2.currentTab() !== tab_r2.id)("dark:text-slate-400", ctx_r2.currentTab() !== tab_r2.id);
    \u0275\u0275attribute("aria-label", ctx_r2.label(tab_r2.labelKey))("aria-current", ctx_r2.currentTab() === tab_r2.id ? "page" : null);
    \u0275\u0275advance();
    \u0275\u0275property("name", tab_r2.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.label(tab_r2.labelKey));
  }
}
var BottomNavComponent = class _BottomNavComponent {
  constructor() {
    this.dataService = inject(DataService);
    this.i18n = inject(I18nService);
    this.currentTab = this.dataService.currentTab;
    this.tabs = [
      { id: "home", icon: "Home", labelKey: "bottomNav.home" },
      { id: "temperature", icon: "Thermometer", labelKey: "bottomNav.temperature" },
      { id: "growth", icon: "TrendingUp", labelKey: "bottomNav.growth" },
      { id: "diary", icon: "BookOpen", labelKey: "bottomNav.diary" },
      { id: "vaccines", icon: "Syringe", labelKey: "bottomNav.vaccines" }
    ];
  }
  label(key) {
    return this.i18n.t()[key] ?? key;
  }
  navigate(tabId) {
    window.dispatchEvent(new CustomEvent("kiddok:navigate", { detail: tabId }));
  }
  static {
    this.\u0275fac = function BottomNavComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BottomNavComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BottomNavComponent, selectors: [["app-bottom-nav"]], decls: 4, vars: 0, consts: [["aria-label", "Main navigation", 1, "lg:hidden", "fixed", "bottom-0", "w-full", "bg-white", "dark:bg-slate-800", "border-t", "border-stone-200", "dark:border-slate-700", "z-50", "h-16", 2, "padding-bottom", "env(safe-area-inset-bottom)"], [1, "flex", "flex-row", "h-full"], ["type", "button", 1, "flex", "flex-col", "items-center", "justify-center", "gap-1", "flex-1", "h-full", "py-2", "px-1", "transition-colors", "duration-200", "appearance-none", "bg-transparent", "border-none", "cursor-pointer", 3, "text-indigo-600", "dark:text-purple-400", "text-stone-500", "dark:text-slate-400"], ["type", "button", 1, "flex", "flex-col", "items-center", "justify-center", "gap-1", "flex-1", "h-full", "py-2", "px-1", "transition-colors", "duration-200", "appearance-none", "bg-transparent", "border-none", "cursor-pointer", 3, "click"], ["aria-hidden", "true", 1, "text-2xl", 3, "name"], [1, "text-xs", "font-semibold", "leading-none"]], template: function BottomNavComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "nav", 0)(1, "div", 1);
        \u0275\u0275repeaterCreate(2, BottomNavComponent_For_3_Template, 4, 12, "button", 2, _forTrack04);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.tabs);
      }
    }, dependencies: [CommonModule, LucideAngularModule, LucideAngularComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=bottom-nav.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BottomNavComponent, [{
    type: Component,
    args: [{ selector: "app-bottom-nav", standalone: true, imports: [CommonModule, LucideAngularModule], template: `
    <nav class="lg:hidden fixed bottom-0 w-full bg-white dark:bg-slate-800 border-t border-stone-200 dark:border-slate-700 z-50 h-16"
         style="padding-bottom: env(safe-area-inset-bottom);"
         aria-label="Main navigation">
      <div class="flex flex-row h-full">
        @for (tab of tabs; track tab.id) {
          <button
            type="button"
            class="flex flex-col items-center justify-center gap-1 flex-1 h-full py-2 px-1 transition-colors duration-200 appearance-none bg-transparent border-none cursor-pointer"
            [class.text-indigo-600]="currentTab() === tab.id"
            [class.dark:text-purple-400]="currentTab() === tab.id"
            [class.text-stone-500]="currentTab() !== tab.id"
            [class.dark:text-slate-400]="currentTab() !== tab.id"
            (click)="navigate(tab.id)"
            [attr.aria-label]="label(tab.labelKey)"
            [attr.aria-current]="currentTab() === tab.id ? 'page' : null">
            <lucide-icon [name]="tab.icon" class="text-2xl" aria-hidden="true"></lucide-icon>
            <span class="text-xs font-semibold leading-none">{{ label(tab.labelKey) }}</span>
          </button>
        }
      </div>
    </nav>
  `, styles: ["/* angular:styles/component:css;219558ef63f119a92210704329b58a3cdceaa4fb296db559e672f74512827dc7;C:/Users/g_gus/Desktop/jona/kiddok/src/app/components/bottom-nav.component.ts */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=bottom-nav.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BottomNavComponent, { className: "BottomNavComponent", filePath: "src/app/components/bottom-nav.component.ts", lineNumber: 47 });
})();

// src/app/features/child/add-edit-child-modal/add-edit-child-modal.component.ts
var _c0 = () => [1, 2, 3];
var _forTrack05 = ($index, $item) => $item.value;
var _forTrack12 = ($index, $item) => $item.name;
function AddEditChildModalComponent_For_12_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 22);
  }
}
function AddEditChildModalComponent_For_12_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(step_r1);
  }
}
function AddEditChildModalComponent_For_12_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 26);
  }
  if (rf & 2) {
    const step_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r1.currentStep() > step_r1 ? "bg-teal-400" : "bg-stone-200");
  }
}
function AddEditChildModalComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "div", 21);
    \u0275\u0275conditionalCreate(2, AddEditChildModalComponent_For_12_Conditional_2_Template, 1, 0, "lucide-icon", 22)(3, AddEditChildModalComponent_For_12_Conditional_3_Template, 2, 1, "span", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 24);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(6, AddEditChildModalComponent_For_12_Conditional_6_Template, 1, 2, "div", 25);
  }
  if (rf & 2) {
    const step_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getStepDotClass(step_r1));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.currentStep() > step_r1 ? 2 : 3);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.currentStep() === step_r1 ? "text-indigo-600" : "text-stone-400");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getStepLabel(step_r1), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(step_r1 < 3 ? 6 : -1);
  }
}
function AddEditChildModalComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275element(1, "lucide-icon", 27);
    \u0275\u0275elementStart(2, "p", 28);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.saveError());
  }
}
function AddEditChildModalComponent_Conditional_14_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 31);
    \u0275\u0275element(1, "lucide-icon", 27);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.errors()["name"], " ");
  }
}
function AddEditChildModalComponent_Conditional_14_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 31);
    \u0275\u0275element(1, "lucide-icon", 27);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.errors()["dateOfBirth"], " ");
  }
}
function AddEditChildModalComponent_Conditional_14_For_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 37);
    \u0275\u0275listener("click", function AddEditChildModalComponent_Conditional_14_For_17_Template_button_click_0_listener() {
      const opt_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.formData.gender = opt_r5.value;
      return \u0275\u0275resetView(ctx_r1.clearError("gender"));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.formData.gender === opt_r5.value ? "bg-indigo-500 text-white" : "bg-white text-stone-700 hover:bg-stone-50");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", opt_r5.label, " ");
  }
}
function AddEditChildModalComponent_Conditional_14_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 31);
    \u0275\u0275element(1, "lucide-icon", 27);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.errors()["gender"], " ");
  }
}
function AddEditChildModalComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "div")(2, "label", 29);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 30);
    \u0275\u0275twoWayListener("ngModelChange", function AddEditChildModalComponent_Conditional_14_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.name, $event) || (ctx_r1.formData.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("blur", function AddEditChildModalComponent_Conditional_14_Template_input_blur_4_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.validateNameOnBlur());
    })("input", function AddEditChildModalComponent_Conditional_14_Template_input_input_4_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearError("name"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, AddEditChildModalComponent_Conditional_14_Conditional_5_Template, 3, 1, "p", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "label", 29);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 32)(10, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", function AddEditChildModalComponent_Conditional_14_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.dateOfBirth, $event) || (ctx_r1.formData.dateOfBirth = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function AddEditChildModalComponent_Conditional_14_Template_input_change_10_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearError("dateOfBirth"));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(11, AddEditChildModalComponent_Conditional_14_Conditional_11_Template, 3, 1, "p", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div")(13, "label", 34);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 35);
    \u0275\u0275repeaterCreate(16, AddEditChildModalComponent_Conditional_14_For_17_Template, 2, 3, "button", 36, _forTrack05);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(18, AddEditChildModalComponent_Conditional_14_Conditional_18_Template, 3, 1, "p", 31);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["childForm.name.label"], " ");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.errors()["name"] ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "");
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formData.name);
    \u0275\u0275property("placeholder", ctx_r1.i18n.t()["childForm.name.placeholder"]);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.errors()["name"] ? 5 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["childForm.dob.label"], " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.errors()["dateOfBirth"] ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "");
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formData.dateOfBirth);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.errors()["dateOfBirth"] ? 11 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["childForm.gender.label"], " ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.genderOptions);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.errors()["gender"] ? 18 : -1);
  }
}
function AddEditChildModalComponent_Conditional_15_Conditional_10_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const bt_r8 = ctx.$implicit;
    \u0275\u0275property("value", bt_r8);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(bt_r8);
  }
}
function AddEditChildModalComponent_Conditional_15_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 44)(1, "div")(2, "label", 29);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 32)(5, "select", 45);
    \u0275\u0275twoWayListener("ngModelChange", function AddEditChildModalComponent_Conditional_15_Conditional_10_Template_select_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.bloodType, $event) || (ctx_r1.formData.bloodType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(6, "option", 46);
    \u0275\u0275text(7, "--");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, AddEditChildModalComponent_Conditional_15_Conditional_10_For_9_Template, 2, 2, "option", 47, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "lucide-icon", 48);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div")(12, "label", 29);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 32)(15, "input", 49);
    \u0275\u0275twoWayListener("ngModelChange", function AddEditChildModalComponent_Conditional_15_Conditional_10_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.birthWeight, $event) || (ctx_r1.formData.birthWeight = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 50);
    \u0275\u0275text(17, "kg");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div")(19, "label", 29);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "textarea", 51);
    \u0275\u0275twoWayListener("ngModelChange", function AddEditChildModalComponent_Conditional_15_Conditional_10_Template_textarea_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.allergies, $event) || (ctx_r1.formData.allergies = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["childForm.bloodType"], " ");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formData.bloodType);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.bloodTypes);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["childForm.birthWeight"], " ");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formData.birthWeight);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["childForm.allergies"], " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formData.allergies);
    \u0275\u0275property("placeholder", ctx_r1.i18n.t()["childForm.allergies.placeholder"]);
  }
}
function AddEditChildModalComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "button", 38);
    \u0275\u0275listener("click", function AddEditChildModalComponent_Conditional_15_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleMedical());
    });
    \u0275\u0275elementStart(2, "div", 14);
    \u0275\u0275element(3, "lucide-icon", 39);
    \u0275\u0275elementStart(4, "span", 40);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 41)(7, "span", 42);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "lucide-icon", 43);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(10, AddEditChildModalComponent_Conditional_15_Conditional_10_Template, 22, 7, "div", 44);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["childForm.step2.medical"]);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["childForm.optional"]);
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-180", ctx_r1.isMedicalExpanded());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isMedicalExpanded() ? 10 : -1);
  }
}
function AddEditChildModalComponent_Conditional_16_Conditional_14_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 62);
    \u0275\u0275element(1, "lucide-icon", 63);
    \u0275\u0275elementStart(2, "div", 64)(3, "p", 65);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 66);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 67);
    \u0275\u0275listener("click", function AddEditChildModalComponent_Conditional_16_Conditional_14_For_2_Template_button_click_7_listener() {
      const \u0275$index_181_r12 = \u0275\u0275restoreView(_r11).$index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.removeFile(\u0275$index_181_r12));
    });
    \u0275\u0275element(8, "lucide-icon", 9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const file_r13 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(file_r13.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatFileSize(file_r13.size));
  }
}
function AddEditChildModalComponent_Conditional_16_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275repeaterCreate(1, AddEditChildModalComponent_Conditional_16_Conditional_14_For_2_Template, 9, 2, "div", 62, _forTrack12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.uploadedFiles());
  }
}
function AddEditChildModalComponent_Conditional_16_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61);
    \u0275\u0275element(1, "lucide-icon", 27);
    \u0275\u0275elementStart(2, "p", 68);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.fileError());
  }
}
function AddEditChildModalComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 52)(2, "h3", 53);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 54);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 55);
    \u0275\u0275listener("click", function AddEditChildModalComponent_Conditional_16_Template_div_click_6_listener() {
      \u0275\u0275restoreView(_r9);
      const fileInput_r10 = \u0275\u0275reference(13);
      return \u0275\u0275resetView(fileInput_r10.click());
    })("dragover", function AddEditChildModalComponent_Conditional_16_Template_div_dragover_6_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDragOver($event));
    })("drop", function AddEditChildModalComponent_Conditional_16_Template_div_drop_6_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFileDrop($event));
    });
    \u0275\u0275element(7, "lucide-icon", 56);
    \u0275\u0275elementStart(8, "p", 57);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 58);
    \u0275\u0275text(11, "PDF, PNG, JPG \u2014 max 5MB");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "input", 59, 0);
    \u0275\u0275listener("change", function AddEditChildModalComponent_Conditional_16_Template_input_change_12_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFileSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, AddEditChildModalComponent_Conditional_16_Conditional_14_Template, 3, 0, "div", 60);
    \u0275\u0275conditionalCreate(15, AddEditChildModalComponent_Conditional_16_Conditional_15_Template, 4, 1, "div", 61);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["childForm.step3.documents"]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["childForm.uploadHint"]);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["childForm.uploadDocument"]);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.uploadedFiles().length > 0 ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.fileError() ? 15 : -1);
  }
}
function AddEditChildModalComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 69);
    \u0275\u0275listener("click", function AddEditChildModalComponent_Conditional_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.prevStep());
    });
    \u0275\u0275element(1, "lucide-icon", 70);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["childForm.back"], " ");
  }
}
function AddEditChildModalComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 71);
    \u0275\u0275listener("click", function AddEditChildModalComponent_Conditional_20_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelled.emit());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["childForm.cancel"], " ");
  }
}
function AddEditChildModalComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 72);
    \u0275\u0275listener("click", function AddEditChildModalComponent_Conditional_22_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nextStep());
    });
    \u0275\u0275text(1);
    \u0275\u0275element(2, "lucide-icon", 73);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["childForm.next"], " ");
  }
}
function AddEditChildModalComponent_Conditional_23_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 75);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.locale() === "sq" ? "Duke ruajtur..." : "Saving...", " ");
  }
}
function AddEditChildModalComponent_Conditional_23_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 76);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["childForm.save"], " ");
  }
}
function AddEditChildModalComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 74);
    \u0275\u0275listener("click", function AddEditChildModalComponent_Conditional_23_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275conditionalCreate(1, AddEditChildModalComponent_Conditional_23_Conditional_1_Template, 2, 1)(2, AddEditChildModalComponent_Conditional_23_Conditional_2_Template, 2, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.isSaving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isSaving() ? 1 : 2);
  }
}
var AddEditChildModalComponent = class _AddEditChildModalComponent {
  constructor() {
    this.mode = "add";
    this.saved = new EventEmitter();
    this.cancelled = new EventEmitter();
    this.i18n = inject(I18nService);
    this.dataService = inject(DataService);
    this.currentStep = signal(1, ...ngDevMode ? [{ debugName: "currentStep" }] : (
      /* istanbul ignore next */
      []
    ));
    this.isMedicalExpanded = signal(false, ...ngDevMode ? [{ debugName: "isMedicalExpanded" }] : (
      /* istanbul ignore next */
      []
    ));
    this.isSaving = signal(false, ...ngDevMode ? [{ debugName: "isSaving" }] : (
      /* istanbul ignore next */
      []
    ));
    this.saveError = signal(null, ...ngDevMode ? [{ debugName: "saveError" }] : (
      /* istanbul ignore next */
      []
    ));
    this.fileError = signal(null, ...ngDevMode ? [{ debugName: "fileError" }] : (
      /* istanbul ignore next */
      []
    ));
    this.errors = signal({}, ...ngDevMode ? [{ debugName: "errors" }] : (
      /* istanbul ignore next */
      []
    ));
    this.uploadedFiles = signal([], ...ngDevMode ? [{ debugName: "uploadedFiles" }] : (
      /* istanbul ignore next */
      []
    ));
    this.formData = {
      name: "",
      dateOfBirth: "",
      gender: ""
    };
    this.genderOptions = [];
    this.bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  }
  ngOnInit() {
    this.buildGenderOptions();
  }
  onEscapeKey() {
    this.cancelled.emit();
  }
  ngOnDestroy() {
  }
  ngOnChanges(changes) {
    if (changes["child"] && this.child) {
      this.formData = {
        name: this.child.name || "",
        dateOfBirth: this.child.dateOfBirth || "",
        gender: this.child.gender || "",
        bloodType: this.child.bloodType,
        birthWeight: this.child.birthWeight,
        allergies: this.child.allergies || this.child.criticalAllergies || ""
      };
    }
  }
  buildGenderOptions() {
    const t = this.i18n.t();
    this.genderOptions = [
      { value: "male", label: t["childForm.gender.male"] },
      { value: "female", label: t["childForm.gender.female"] },
      { value: "other", label: t["childForm.gender.other"] }
    ];
  }
  getStepDotClass(step) {
    if (this.currentStep() > step)
      return "bg-teal-500";
    if (this.currentStep() === step)
      return "bg-indigo-500 text-white";
    return "bg-stone-200 text-stone-500";
  }
  getStepLabel(step) {
    const t = this.i18n.t();
    const labels = {
      1: t["childForm.step1.basics"],
      2: t["childForm.step2.medical"],
      3: t["childForm.step3.documents"]
    };
    return labels[step] || "";
  }
  clearError(field) {
    this.errors.update((e) => __spreadProps(__spreadValues({}, e), { [field]: "" }));
  }
  validateNameOnBlur() {
    const name = this.formData.name?.trim() ?? "";
    if (!name) {
      this.errors.update((e) => __spreadProps(__spreadValues({}, e), { name: this.i18n.t()["childForm.name.error"] }));
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      this.errors.update((e) => __spreadProps(__spreadValues({}, e), { name: this.i18n.t()["childForm.name.error"] }));
    }
  }
  validateStep1() {
    const errors = {};
    const t = this.i18n.t();
    const name = this.formData.name?.trim() ?? "";
    if (!name) {
      errors["name"] = t["childForm.name.error"];
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      errors["name"] = t["childForm.name.error"];
    }
    if (!this.formData.dateOfBirth) {
      errors["dateOfBirth"] = t["childForm.dob.error"];
    } else {
      const dob = new Date(this.formData.dateOfBirth);
      const today = /* @__PURE__ */ new Date();
      if (dob > today) {
        errors["dateOfBirth"] = t["childForm.dob.futureError"];
      }
    }
    if (!this.formData.gender) {
      errors["gender"] = this.i18n.locale() === "sq" ? "Gjinia \xEBsht\xEB e detyrueshme" : "Gender is required";
    }
    this.errors.set(errors);
    return Object.keys(errors).length === 0;
  }
  nextStep() {
    if (this.currentStep() === 1 && !this.validateStep1())
      return;
    if (this.currentStep() < 3) {
      this.currentStep.set(this.currentStep() + 1);
    }
  }
  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.set(this.currentStep() - 1);
    }
  }
  toggleMedical() {
    this.isMedicalExpanded.update((v) => !v);
  }
  onFileSelected(event) {
    const input = event.target;
    const files = Array.from(input.files ?? []);
    this.processFiles(files);
    input.value = "";
  }
  onDragOver(event) {
    event.preventDefault();
  }
  onFileDrop(event) {
    event.preventDefault();
    const files = Array.from(event.dataTransfer?.files ?? []);
    this.processFiles(files);
  }
  processFiles(files) {
    this.fileError.set(null);
    const current = this.uploadedFiles();
    const remaining = 3 - current.length;
    if (remaining <= 0) {
      this.fileError.set(this.i18n.locale() === "sq" ? "Maksimumi 3 skedar\xEB" : "Maximum 3 files allowed");
      return;
    }
    const toProcess = files.slice(0, remaining);
    for (const file of toProcess) {
      if (file.size > 5 * 1024 * 1024) {
        this.fileError.set(this.i18n.t()["childForm.fileTooBig"]);
        continue;
      }
      if (!file.type.match(/pdf|image\/(png|jpeg|webp)/)) {
        this.fileError.set(this.i18n.t()["childForm.fileTypeError"]);
        continue;
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedFiles.update((list) => [
          ...list,
          { name: file.name, size: file.size, type: file.type, data: reader.result }
        ]);
      };
      reader.readAsDataURL(file);
    }
    const stillTooMany = files.length > remaining && current.length < 3;
    if (stillTooMany) {
      this.fileError.set(this.i18n.locale() === "sq" ? "Maksimumi 3 skedar\xEB" : "Maximum 3 files allowed");
    }
  }
  removeFile(index) {
    this.uploadedFiles.update((list) => list.filter((_, i) => i !== index));
  }
  formatFileSize(bytes) {
    if (bytes < 1024)
      return bytes + " B";
    if (bytes < 1024 * 1024)
      return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }
  save() {
    return __async(this, null, function* () {
      this.isSaving.set(true);
      this.saveError.set(null);
      try {
        let savedChild;
        const payload = {
          name: this.formData.name.trim(),
          dateOfBirth: this.formData.dateOfBirth,
          gender: this.formData.gender || null,
          bloodType: this.formData.bloodType || null,
          birthWeight: this.formData.birthWeight || null,
          allergies: this.formData.allergies || null,
          criticalAllergies: this.formData.allergies || null,
          medicalNotes: null
        };
        if (this.uploadedFiles().length > 0) {
          payload.documents = this.uploadedFiles().map((f) => ({
            id: "doc_" + Date.now() + "_" + Math.random().toString(36).slice(2),
            name: f.name,
            size: f.size,
            type: f.type,
            data: f.data,
            uploadedAt: (/* @__PURE__ */ new Date()).toISOString()
          }));
        }
        if (this.mode === "edit" && this.child?.id) {
          savedChild = yield this.dataService.updateChildApi(this.child.id, payload);
        } else {
          savedChild = yield this.dataService.createChild(payload);
        }
        this.saved.emit(savedChild);
      } catch (err) {
        this.saveError.set(this.i18n.t()["childForm.error"]);
      } finally {
        this.isSaving.set(false);
      }
    });
  }
  onBackdropClick() {
    this.cancelled.emit();
  }
  static {
    this.\u0275fac = function AddEditChildModalComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AddEditChildModalComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AddEditChildModalComponent, selectors: [["app-add-edit-child-modal"]], hostBindings: function AddEditChildModalComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("keydown.escape", function AddEditChildModalComponent_keydown_escape_HostBindingHandler() {
          return ctx.onEscapeKey();
        }, \u0275\u0275resolveDocument);
      }
    }, inputs: { mode: "mode", child: "child" }, outputs: { saved: "saved", cancelled: "cancelled" }, features: [\u0275\u0275NgOnChangesFeature], decls: 24, vars: 9, consts: [["fileInput", ""], ["role", "dialog", "aria-modal", "true", 1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4"], [1, "absolute", "inset-0", "bg-black/30", "backdrop-blur-sm", 3, "click"], [1, "relative", "z-10", "w-full", "max-w-lg", "bg-white", "rounded-3xl", "shadow-2xl", "overflow-hidden", "animate-slide-up", 2, "max-height", "90vh", "display", "flex", "flex-direction", "column"], [1, "h-1", "bg-gradient-to-r", "from-indigo-500", "to-teal-400", "flex-shrink-0"], [1, "p-8", "overflow-y-auto", "flex-1"], [1, "flex", "items-center", "justify-between", "mb-8"], [1, "text-xl", "font-bold", "text-gray-800"], [1, "w-9", "h-9", "rounded-xl", "bg-stone-100", "hover:bg-stone-200", "flex", "items-center", "justify-center", "text-stone-500", "hover:text-stone-700", "transition-all", "shadow-sm", "border", "border-stone-200", 3, "click"], ["name", "x", 1, "text-inherit"], [1, "flex", "items-center", "justify-center", "mb-10"], [1, "mb-6", "p-4", "bg-red-50", "border", "border-red-200", "rounded-2xl", "flex", "items-center", "gap-3", "animate-fade-in"], [1, "space-y-6", "animate-fade-in"], [1, "p-6", "border-t", "border-stone-100", "flex-shrink-0"], [1, "flex", "items-center", "gap-3"], ["type", "button", 1, "px-5", "py-3", "text-stone-600", "hover:text-stone-900", "font-semibold", "transition-colors", "flex", "items-center", "gap-1"], ["type", "button", 1, "px-5", "py-3", "text-stone-500", "hover:text-stone-700", "font-medium", "transition-colors", "text-sm"], [1, "flex-1"], ["type", "button", 1, "px-8", "py-3", "bg-gradient-to-r", "from-indigo-500", "to-indigo-600", "hover:from-indigo-600", "hover:to-indigo-500", "text-white", "font-semibold", "rounded-2xl", "transition-all", "shadow-md", "hover:shadow-lg", "hover:-translate-y-0.5", "flex", "items-center", "gap-2"], ["type", "button", 1, "px-8", "py-3", "bg-gradient-to-r", "from-indigo-500", "to-indigo-600", "hover:from-indigo-600", "hover:to-indigo-500", "text-white", "font-semibold", "rounded-2xl", "transition-all", "shadow-md", "hover:shadow-lg", "hover:-translate-y-0.5", "flex", "items-center", "gap-2", "disabled:opacity-50", "disabled:cursor-not-allowed", "disabled:transform-none", 3, "disabled"], [1, "flex", "flex-col", "items-center"], [1, "w-3", "h-3", "rounded-full", "flex", "items-center", "justify-center", "transition-all"], ["name", "check", 1, "text-inherit"], [1, "text-xs", "font-bold"], [1, "text-xs", "font-semibold", "mt-2"], [1, "w-16", "h-0.5", "mx-2", "mb-5", "rounded-full", 3, "class"], [1, "w-16", "h-0.5", "mx-2", "mb-5", "rounded-full"], ["name", "alert-circle", 1, "text-inherit"], [1, "text-red-700", "text-sm", "font-medium"], [1, "block", "text-xs", "font-bold", "text-indigo-700", "mb-2", "ml-1", "uppercase", "tracking-wider"], ["type", "text", 1, "w-full", "border", "border-stone-200", "rounded-xl", "px-4", "py-3", "text-base", "text-gray-800", "placeholder-stone-300", "focus:border-indigo-500", "focus:ring-2", "focus:ring-indigo-100", "transition-all", "outline-none", 3, "ngModelChange", "blur", "input", "ngModel", "placeholder"], [1, "mt-2", "text-xs", "text-red-500", "font-medium", "flex", "items-center", "gap-1"], [1, "relative"], ["type", "date", 1, "w-full", "border", "border-stone-200", "rounded-xl", "px-4", "py-3", "text-base", "text-gray-800", "focus:border-indigo-500", "focus:ring-2", "focus:ring-indigo-100", "transition-all", "outline-none", "appearance-none", 3, "ngModelChange", "change", "ngModel"], [1, "block", "text-xs", "font-bold", "text-indigo-700", "mb-3", "ml-1", "uppercase", "tracking-wider"], [1, "flex", "rounded-2xl", "overflow-hidden", "border-2", "border-stone-200", "gap-px", "bg-stone-200"], ["type", "button", 1, "flex-1", "py-3", "text-sm", "font-semibold", "transition-all", 3, "class"], ["type", "button", 1, "flex-1", "py-3", "text-sm", "font-semibold", "transition-all", 3, "click"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-between", "p-4", "bg-indigo-50", "rounded-2xl", "border", "border-indigo-100", "hover:bg-indigo-100", "transition-all", 3, "click"], ["name", "stethoscope", 1, "text-indigo-500"], [1, "font-semibold", "text-indigo-700"], [1, "flex", "items-center", "gap-2"], [1, "text-xs", "text-indigo-400", "font-medium"], ["name", "chevron-down", 1, "text-indigo-400", "transition-transform"], [1, "space-y-5", "animate-fade-in"], [1, "w-full", "border", "border-stone-200", "rounded-xl", "px-4", "py-3", "text-base", "text-gray-800", "focus:border-indigo-500", "focus:ring-2", "focus:ring-indigo-100", "transition-all", "outline-none", "appearance-none", "bg-white", "pr-10", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value"], ["name", "chevron-down", 1, "absolute", "right-3", "top-1/2", "-translate-y-1/2", "text-stone-400", "text-lg", "pointer-events-none"], ["type", "number", "step", "0.1", "min", "0.5", "max", "8", "placeholder", "e.g. 3.2", 1, "w-full", "border", "border-stone-200", "rounded-xl", "px-4", "py-3", "pr-10", "text-base", "text-gray-800", "placeholder-stone-300", "focus:border-indigo-500", "focus:ring-2", "focus:ring-indigo-100", "transition-all", "outline-none", 3, "ngModelChange", "ngModel"], [1, "absolute", "right-3", "top-1/2", "-translate-y-1/2", "text-stone-400", "text-sm", "font-medium", "pointer-events-none"], ["rows", "3", "maxlength", "500", 1, "w-full", "border", "border-stone-200", "rounded-xl", "px-4", "py-3", "text-base", "text-gray-800", "placeholder-stone-300", "focus:border-indigo-500", "focus:ring-2", "focus:ring-indigo-100", "transition-all", "outline-none", "resize-none", 3, "ngModelChange", "ngModel", "placeholder"], [1, "text-center"], [1, "text-lg", "font-bold", "text-gray-800", "mb-1"], [1, "text-sm", "text-stone-400"], [1, "border-2", "border-dashed", "border-stone-300", "rounded-2xl", "p-8", "text-center", "cursor-pointer", "hover:border-indigo-400", "hover:bg-indigo-50/30", "transition-all", 3, "click", "dragover", "drop"], ["name", "upload-cloud", 1, "text-4xl", "text-stone-300", "mb-3"], [1, "font-semibold", "text-stone-500", "text-sm"], [1, "text-xs", "text-stone-400", "mt-1"], ["type", "file", "accept", ".pdf,image/png,image/jpeg,image/webp", "multiple", "", 1, "hidden", 3, "change"], [1, "space-y-2"], [1, "flex", "items-center", "gap-2", "p-3", "bg-red-50", "border", "border-red-200", "rounded-xl", "animate-fade-in"], [1, "flex", "items-center", "gap-3", "p-3", "bg-stone-50", "rounded-xl", "border", "border-stone-200", "animate-fade-in"], ["name", "file-text", 1, "text-stone-400", "text-lg"], [1, "flex-1", "min-w-0"], [1, "text-sm", "font-medium", "text-gray-700", "truncate"], [1, "text-xs", "text-stone-400"], ["type", "button", 1, "text-red-400", "hover:text-red-600", "transition-colors", 3, "click"], [1, "text-red-600", "text-xs", "font-medium"], ["type", "button", 1, "px-5", "py-3", "text-stone-600", "hover:text-stone-900", "font-semibold", "transition-colors", "flex", "items-center", "gap-1", 3, "click"], ["name", "arrow-left", 1, "text-inherit"], ["type", "button", 1, "px-5", "py-3", "text-stone-500", "hover:text-stone-700", "font-medium", "transition-colors", "text-sm", 3, "click"], ["type", "button", 1, "px-8", "py-3", "bg-gradient-to-r", "from-indigo-500", "to-indigo-600", "hover:from-indigo-600", "hover:to-indigo-500", "text-white", "font-semibold", "rounded-2xl", "transition-all", "shadow-md", "hover:shadow-lg", "hover:-translate-y-0.5", "flex", "items-center", "gap-2", 3, "click"], ["name", "arrow-right", 1, "text-lg"], ["type", "button", 1, "px-8", "py-3", "bg-gradient-to-r", "from-indigo-500", "to-indigo-600", "hover:from-indigo-600", "hover:to-indigo-500", "text-white", "font-semibold", "rounded-2xl", "transition-all", "shadow-md", "hover:shadow-lg", "hover:-translate-y-0.5", "flex", "items-center", "gap-2", "disabled:opacity-50", "disabled:cursor-not-allowed", "disabled:transform-none", 3, "click", "disabled"], ["name", "loader", 1, "text-inherit"], ["name", "save", 1, "text-inherit"]], template: function AddEditChildModalComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2);
        \u0275\u0275listener("click", function AddEditChildModalComponent_Template_div_click_1_listener() {
          return ctx.onBackdropClick();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(2, "div", 3);
        \u0275\u0275element(3, "div", 4);
        \u0275\u0275elementStart(4, "div", 5)(5, "div", 6)(6, "h2", 7);
        \u0275\u0275text(7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "button", 8);
        \u0275\u0275listener("click", function AddEditChildModalComponent_Template_button_click_8_listener() {
          return ctx.cancelled.emit();
        });
        \u0275\u0275element(9, "lucide-icon", 9);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "div", 10);
        \u0275\u0275repeaterCreate(11, AddEditChildModalComponent_For_12_Template, 7, 7, null, null, \u0275\u0275repeaterTrackByIdentity);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(13, AddEditChildModalComponent_Conditional_13_Template, 4, 1, "div", 11);
        \u0275\u0275conditionalCreate(14, AddEditChildModalComponent_Conditional_14_Template, 19, 13, "div", 12);
        \u0275\u0275conditionalCreate(15, AddEditChildModalComponent_Conditional_15_Template, 11, 5, "div", 12);
        \u0275\u0275conditionalCreate(16, AddEditChildModalComponent_Conditional_16_Template, 16, 5, "div", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "div", 13)(18, "div", 14);
        \u0275\u0275conditionalCreate(19, AddEditChildModalComponent_Conditional_19_Template, 3, 1, "button", 15)(20, AddEditChildModalComponent_Conditional_20_Template, 2, 1, "button", 16);
        \u0275\u0275element(21, "div", 17);
        \u0275\u0275conditionalCreate(22, AddEditChildModalComponent_Conditional_22_Template, 3, 1, "button", 18)(23, AddEditChildModalComponent_Conditional_23_Template, 3, 2, "button", 19);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275attribute("aria-label", ctx.i18n.t()["childForm.titleAdd"]);
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate1(" ", ctx.mode === "edit" ? ctx.i18n.t()["childForm.titleEdit"] : ctx.i18n.t()["childForm.titleAdd"], " ");
        \u0275\u0275advance(4);
        \u0275\u0275repeater(\u0275\u0275pureFunction0(8, _c0));
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.saveError() ? 13 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.currentStep() === 1 ? 14 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.currentStep() === 2 ? 15 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.currentStep() === 3 ? 16 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.currentStep() > 1 ? 19 : 20);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.currentStep() < 3 ? 22 : 23);
      }
    }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MaxLengthValidator, MinValidator, MaxValidator, NgModel, LucideAngularModule, LucideAngularComponent], styles: ["\n.animate-slide-up[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(24px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.animate-fade-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\nbutton[_ngcontent-%COMP%]:not(:disabled):active {\n  transform: scale(0.98);\n}\n/*# sourceMappingURL=add-edit-child-modal.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AddEditChildModalComponent, [{
    type: Component,
    args: [{ selector: "app-add-edit-child-modal", imports: [CommonModule, FormsModule, LucideAngularModule], template: `
    <!-- Backdrop -->
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4"
         role="dialog" aria-modal="true"
         [attr.aria-label]="i18n.t()['childForm.titleAdd']">

      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" (click)="onBackdropClick()"></div>

      <!-- Modal Card -->
      <div class="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up"
           style="max-height: 90vh; display: flex; flex-direction: column;">

        <!-- Top accent bar -->
        <div class="h-1 bg-gradient-to-r from-indigo-500 to-teal-400 flex-shrink-0"></div>

        <!-- Modal Body (scrollable) -->
        <div class="p-8 overflow-y-auto flex-1">

          <!-- Header -->
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-xl font-bold text-gray-800">
              {{ mode === 'edit' ? i18n.t()['childForm.titleEdit'] : i18n.t()['childForm.titleAdd'] }}
            </h2>
            <button (click)="cancelled.emit()"
                    class="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-700 transition-all shadow-sm border border-stone-200">
              <lucide-icon name="x" class="text-inherit"></lucide-icon>
            </button>
          </div>

          <!-- Step Indicator -->
          <div class="flex items-center justify-center mb-10">
            @for (step of [1, 2, 3]; track step) {
              <div class="flex flex-col items-center">
                <div class="w-3 h-3 rounded-full flex items-center justify-center transition-all"
                     [class]="getStepDotClass(step)">
                  @if (currentStep() > step) {
                    <lucide-icon name="check" class="text-inherit"></lucide-icon>
                  } @else {
                    <span class="text-xs font-bold">{{ step }}</span>
                  }
                </div>
                <span class="text-xs font-semibold mt-2"
                      [class]="currentStep() === step ? 'text-indigo-600' : 'text-stone-400'">
                  {{ getStepLabel(step) }}
                </span>
              </div>
              @if (step < 3) {
                <div class="w-16 h-0.5 mx-2 mb-5 rounded-full"
                     [class]="currentStep() > step ? 'bg-teal-400' : 'bg-stone-200'"></div>
              }
            }
          </div>

          <!-- Error Banner -->
          @if (saveError()) {
            <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 animate-fade-in">
              <lucide-icon name="alert-circle" class="text-inherit"></lucide-icon>
              <p class="text-red-700 text-sm font-medium">{{ saveError() }}</p>
            </div>
          }

          <!-- \u2500\u2500\u2500 STEP 1: Basics \u2500\u2500\u2500 -->
          @if (currentStep() === 1) {
            <div class="space-y-6 animate-fade-in">
              <!-- Name -->
              <div>
                <label class="block text-xs font-bold text-indigo-700 mb-2 ml-1 uppercase tracking-wider">
                  {{ i18n.t()['childForm.name.label'] }}
                </label>
                <input type="text" [(ngModel)]="formData.name"
                       (blur)="validateNameOnBlur()"
                       (input)="clearError('name')"
                       [placeholder]="i18n.t()['childForm.name.placeholder']"
                       class="w-full border border-stone-200 rounded-xl px-4 py-3 text-base text-gray-800 placeholder-stone-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
                       [class]="errors()['name'] ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''">
                @if (errors()['name']) {
                  <p class="mt-2 text-xs text-red-500 font-medium flex items-center gap-1">
                    <lucide-icon name="alert-circle" class="text-inherit"></lucide-icon>
                    {{ errors()['name'] }}
                  </p>
                }
              </div>

              <!-- Date of Birth -->
              <div>
                <label class="block text-xs font-bold text-indigo-700 mb-2 ml-1 uppercase tracking-wider">
                  {{ i18n.t()['childForm.dob.label'] }}
                </label>
                <div class="relative">
                  <input type="date" [(ngModel)]="formData.dateOfBirth"
                         (change)="clearError('dateOfBirth')"
                         class="w-full border border-stone-200 rounded-xl px-4 py-3 text-base text-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none appearance-none"
                         [class]="errors()['dateOfBirth'] ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''">
                </div>
                @if (errors()['dateOfBirth']) {
                  <p class="mt-2 text-xs text-red-500 font-medium flex items-center gap-1">
                    <lucide-icon name="alert-circle" class="text-inherit"></lucide-icon>
                    {{ errors()['dateOfBirth'] }}
                  </p>
                }
              </div>

              <!-- Gender -->
              <div>
                <label class="block text-xs font-bold text-indigo-700 mb-3 ml-1 uppercase tracking-wider">
                  {{ i18n.t()['childForm.gender.label'] }}
                </label>
                <div class="flex rounded-2xl overflow-hidden border-2 border-stone-200 gap-px bg-stone-200">
                  @for (opt of genderOptions; track opt.value) {
                    <button type="button"
                            (click)="formData.gender = opt.value; clearError('gender')"
                            class="flex-1 py-3 text-sm font-semibold transition-all"
                            [class]="formData.gender === opt.value
                              ? 'bg-indigo-500 text-white'
                              : 'bg-white text-stone-700 hover:bg-stone-50'">
                      {{ opt.label }}
                    </button>
                  }
                </div>
                @if (errors()['gender']) {
                  <p class="mt-2 text-xs text-red-500 font-medium flex items-center gap-1">
                    <lucide-icon name="alert-circle" class="text-inherit"></lucide-icon>
                    {{ errors()['gender'] }}
                  </p>
                }
              </div>
            </div>
          }

          <!-- \u2500\u2500\u2500 STEP 2: Medical \u2500\u2500\u2500 -->
          @if (currentStep() === 2) {
            <div class="space-y-6 animate-fade-in">
              <!-- Collapsible Header -->
              <button type="button" (click)="toggleMedical()"
                      class="w-full flex items-center justify-between p-4 bg-indigo-50 rounded-2xl border border-indigo-100 hover:bg-indigo-100 transition-all">
                <div class="flex items-center gap-3">
                  <lucide-icon name="stethoscope" class="text-indigo-500"></lucide-icon>
                  <span class="font-semibold text-indigo-700">{{ i18n.t()['childForm.step2.medical'] }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-indigo-400 font-medium">{{ i18n.t()['childForm.optional'] }}</span>
                  <lucide-icon name="chevron-down" class="text-indigo-400 transition-transform"
                        [class.rotate-180]="isMedicalExpanded()"></lucide-icon>
                </div>
              </button>

              @if (isMedicalExpanded()) {
                <div class="space-y-5 animate-fade-in">
                  <!-- Blood Type -->
                  <div>
                    <label class="block text-xs font-bold text-indigo-700 mb-2 ml-1 uppercase tracking-wider">
                      {{ i18n.t()['childForm.bloodType'] }}
                    </label>
                    <div class="relative">
                      <select [(ngModel)]="formData.bloodType"
                              class="w-full border border-stone-200 rounded-xl px-4 py-3 text-base text-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none appearance-none bg-white pr-10">
                        <option value="">--</option>
                        @for (bt of bloodTypes; track bt) {
                          <option [value]="bt">{{ bt }}</option>
                        }
                      </select>
                      <lucide-icon name="chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-lg pointer-events-none"></lucide-icon>
                    </div>
                  </div>

                  <!-- Birth Weight -->
                  <div>
                    <label class="block text-xs font-bold text-indigo-700 mb-2 ml-1 uppercase tracking-wider">
                      {{ i18n.t()['childForm.birthWeight'] }}
                    </label>
                    <div class="relative">
                      <input type="number" step="0.1" min="0.5" max="8"
                             [(ngModel)]="formData.birthWeight"
                             placeholder="e.g. 3.2"
                             class="w-full border border-stone-200 rounded-xl px-4 py-3 pr-10 text-base text-gray-800 placeholder-stone-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none">
                      <span class="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm font-medium pointer-events-none">kg</span>
                    </div>
                  </div>

                  <!-- Allergies -->
                  <div>
                    <label class="block text-xs font-bold text-indigo-700 mb-2 ml-1 uppercase tracking-wider">
                      {{ i18n.t()['childForm.allergies'] }}
                    </label>
                    <textarea [(ngModel)]="formData.allergies" rows="3"
                              [placeholder]="i18n.t()['childForm.allergies.placeholder']"
                              maxlength="500"
                              class="w-full border border-stone-200 rounded-xl px-4 py-3 text-base text-gray-800 placeholder-stone-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none resize-none"></textarea>
                  </div>
                </div>
              }
            </div>
          }

          <!-- \u2500\u2500\u2500 STEP 3: Documents \u2500\u2500\u2500 -->
          @if (currentStep() === 3) {
            <div class="space-y-6 animate-fade-in">
              <div class="text-center">
                <h3 class="text-lg font-bold text-gray-800 mb-1">{{ i18n.t()['childForm.step3.documents'] }}</h3>
                <p class="text-sm text-stone-400">{{ i18n.t()['childForm.uploadHint'] }}</p>
              </div>

              <!-- Drop Zone -->
              <div (click)="fileInput.click()"
                   (dragover)="onDragOver($event)"
                   (drop)="onFileDrop($event)"
                   class="border-2 border-dashed border-stone-300 rounded-2xl p-8 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all">
                <lucide-icon name="upload-cloud" class="text-4xl text-stone-300 mb-3"></lucide-icon>
                <p class="font-semibold text-stone-500 text-sm">{{ i18n.t()['childForm.uploadDocument'] }}</p>
                <p class="text-xs text-stone-400 mt-1">PDF, PNG, JPG \u2014 max 5MB</p>
              </div>
              <input #fileInput type="file" accept=".pdf,image/png,image/jpeg,image/webp" multiple
                     (change)="onFileSelected($event)" class="hidden">

              <!-- File List -->
              @if (uploadedFiles().length > 0) {
                <div class="space-y-2">
                  @for (file of uploadedFiles(); track file.name; let i = $index) {
                    <div class="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200 animate-fade-in">
                      <lucide-icon name="file-text" class="text-stone-400 text-lg"></lucide-icon>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-700 truncate">{{ file.name }}</p>
                        <p class="text-xs text-stone-400">{{ formatFileSize(file.size) }}</p>
                      </div>
                      <button type="button" (click)="removeFile(i)"
                              class="text-red-400 hover:text-red-600 transition-colors">
                        <lucide-icon name="x" class="text-inherit"></lucide-icon>
                      </button>
                    </div>
                  }
                </div>
              }

              <!-- File Error -->
              @if (fileError()) {
                <div class="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl animate-fade-in">
                  <lucide-icon name="alert-circle" class="text-inherit"></lucide-icon>
                  <p class="text-red-600 text-xs font-medium">{{ fileError() }}</p>
                </div>
              }
            </div>
          }

        </div><!-- /Modal Body -->

        <!-- Footer Actions -->
        <div class="p-6 border-t border-stone-100 flex-shrink-0">
          <div class="flex items-center gap-3">
            @if (currentStep() > 1) {
              <button type="button" (click)="prevStep()"
                      class="px-5 py-3 text-stone-600 hover:text-stone-900 font-semibold transition-colors flex items-center gap-1">
                <lucide-icon name="arrow-left" class="text-inherit"></lucide-icon>
                {{ i18n.t()['childForm.back'] }}
              </button>
            } @else {
              <button type="button" (click)="cancelled.emit()"
                      class="px-5 py-3 text-stone-500 hover:text-stone-700 font-medium transition-colors text-sm">
                {{ i18n.t()['childForm.cancel'] }}
              </button>
            }
            <div class="flex-1"></div>
            @if (currentStep() < 3) {
              <button type="button" (click)="nextStep()"
                      class="px-8 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-500 text-white font-semibold rounded-2xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2">
                {{ i18n.t()['childForm.next'] }}
                <lucide-icon name="arrow-right" class="text-lg"></lucide-icon>
              </button>
            } @else {
              <button type="button" (click)="save()" [disabled]="isSaving()"
                      class="px-8 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-500 text-white font-semibold rounded-2xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                @if (isSaving()) {
                  <lucide-icon name="loader" class="text-inherit"></lucide-icon>
                  {{ i18n.locale() === 'sq' ? 'Duke ruajtur...' : 'Saving...' }}
                } @else {
                  <lucide-icon name="save" class="text-inherit"></lucide-icon>
                  {{ i18n.t()['childForm.save'] }}
                }
              </button>
            }
          </div>
        </div>

      </div><!-- /Modal Card -->
    </div>
  `, styles: ["/* angular:styles/component:css;58225b4fd4362b36f2ac38e1c7ef2771c6915f6664b41cc91982e3a9fa8478a1;C:/Users/g_gus/Desktop/jona/kiddok/src/app/features/child/add-edit-child-modal/add-edit-child-modal.component.ts */\n.animate-slide-up {\n  animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(24px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.animate-fade-in {\n  animation: fadeIn 0.2s ease-out;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\nbutton:not(:disabled):active {\n  transform: scale(0.98);\n}\n/*# sourceMappingURL=add-edit-child-modal.component.css.map */\n"] }]
  }], null, { mode: [{
    type: Input
  }], child: [{
    type: Input
  }], saved: [{
    type: Output
  }], cancelled: [{
    type: Output
  }], onEscapeKey: [{
    type: HostListener,
    args: ["document:keydown.escape"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AddEditChildModalComponent, { className: "AddEditChildModalComponent", filePath: "src/app/features/child/add-edit-child-modal/add-edit-child-modal.component.ts", lineNumber: 339 });
})();

// src/app/components/onboarding-tour.component.ts
function OnboardingTourComponent_Conditional_0_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 8);
  }
  if (rf & 2) {
    const $index_r3 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", $index_r3 === ctx_r1.stepIndex() ? "w-6 bg-primary-500" : $index_r3 < ctx_r1.stepIndex() ? "w-1.5 bg-primary-300" : "w-1.5 bg-slate-200");
  }
}
function OnboardingTourComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
    \u0275\u0275listener("click", function OnboardingTourComponent_Conditional_0_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.maybeSkip());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 2);
    \u0275\u0275element(3, "div", 3);
    \u0275\u0275elementStart(4, "div", 4)(5, "div", 5);
    \u0275\u0275element(6, "lucide-icon", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 7);
    \u0275\u0275repeaterCreate(8, OnboardingTourComponent_Conditional_0_For_9_Template, 1, 1, "div", 8, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "h2", 9);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 10);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 11)(15, "button", 12);
    \u0275\u0275listener("click", function OnboardingTourComponent_Conditional_0_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.next());
    });
    \u0275\u0275element(16, "lucide-icon", 13);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 14)(19, "button", 15);
    \u0275\u0275listener("click", function OnboardingTourComponent_Conditional_0_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.skip());
    });
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 16);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-label", ctx_r1.currentStepTitle());
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", ctx_r1.currentStepAccentClass());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.currentStepIconBgClass());
    \u0275\u0275advance();
    \u0275\u0275property("name", ctx_r1.steps[ctx_r1.stepIndex()].icon)("ngClass", ctx_r1.currentStepIconColorClass());
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.steps);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.currentStepTitle(), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.currentStepBody(), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.isLastStep() ? "bg-teal-500 hover:bg-teal-600" : "bg-primary-500 hover:bg-primary-600");
    \u0275\u0275advance();
    \u0275\u0275property("name", ctx_r1.isLastStep() ? "check-circle" : "arrow-right");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isLastStep() ? ctx_r1.finishLabel() : ctx_r1.nextLabel(), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.skipLabel(), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r1.stepIndex() + 1, "/", ctx_r1.steps.length, " ");
  }
}
var OnboardingTourComponent = class _OnboardingTourComponent {
  constructor() {
    this.i18n = inject(I18nService);
    this.visible = signal(false, ...ngDevMode ? [{ debugName: "visible" }] : (
      /* istanbul ignore next */
      []
    ));
    this.stepIndex = signal(0, ...ngDevMode ? [{ debugName: "stepIndex" }] : (
      /* istanbul ignore next */
      []
    ));
    this.STORAGE_KEY = "kiddok_onboarding_done";
    this._dontShowAgain = false;
    this.steps = [
      {
        titleKey: "tour.welcome.title",
        bodyKey: "tour.welcome.body",
        icon: "party-popper",
        accentClass: "bg-gradient-to-r from-primary-600 via-primary-500 to-teal-400"
      },
      {
        titleKey: "tour.child.title",
        bodyKey: "tour.child.body",
        icon: "baby",
        accentClass: "bg-gradient-to-r from-purple-500 via-purple-400 to-pink-400"
      },
      {
        titleKey: "tour.temperature.title",
        bodyKey: "tour.temperature.body",
        icon: "thermometer",
        accentClass: "bg-gradient-to-r from-rose-500 via-rose-400 to-orange-400"
      },
      {
        titleKey: "tour.growth.title",
        bodyKey: "tour.growth.body",
        icon: "ruler",
        accentClass: "bg-gradient-to-r from-teal-500 via-teal-400 to-emerald-400"
      },
      {
        titleKey: "tour.vaccines.title",
        bodyKey: "tour.vaccines.body",
        icon: "syringe",
        accentClass: "bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400"
      },
      {
        titleKey: "tour.settings.title",
        bodyKey: "tour.settings.body",
        icon: "settings",
        accentClass: "bg-gradient-to-r from-slate-500 via-slate-400 to-gray-400"
      }
    ];
    this.t = computed(() => this.i18n.t(), ...ngDevMode ? [{ debugName: "t" }] : (
      /* istanbul ignore next */
      []
    ));
    this.currentStepTitle = computed(() => {
      const key = this.steps[this.stepIndex()]?.titleKey;
      return key ? this.t()[key] ?? key : "";
    }, ...ngDevMode ? [{ debugName: "currentStepTitle" }] : (
      /* istanbul ignore next */
      []
    ));
    this.currentStepBody = computed(() => {
      const key = this.steps[this.stepIndex()]?.bodyKey;
      return key ? this.t()[key] ?? key : "";
    }, ...ngDevMode ? [{ debugName: "currentStepBody" }] : (
      /* istanbul ignore next */
      []
    ));
    this.currentStepAccentClass = computed(() => this.steps[this.stepIndex()]?.accentClass ?? "bg-primary-500", ...ngDevMode ? [{ debugName: "currentStepAccentClass" }] : (
      /* istanbul ignore next */
      []
    ));
    this.currentStepIconBgClass = computed(() => {
      const icon = this.steps[this.stepIndex()]?.icon;
      if (icon === "party-popper")
        return "bg-primary-100";
      if (icon === "baby")
        return "bg-purple-100";
      if (icon === "thermometer")
        return "bg-rose-100";
      if (icon === "ruler")
        return "bg-teal-100";
      if (icon === "syringe")
        return "bg-blue-100";
      if (icon === "settings")
        return "bg-slate-100";
      return "bg-primary-100";
    }, ...ngDevMode ? [{ debugName: "currentStepIconBgClass" }] : (
      /* istanbul ignore next */
      []
    ));
    this.currentStepIconColorClass = computed(() => {
      const icon = this.steps[this.stepIndex()]?.icon;
      if (icon === "party-popper")
        return "text-primary-500";
      if (icon === "baby")
        return "text-purple-500";
      if (icon === "thermometer")
        return "text-rose-500";
      if (icon === "ruler")
        return "text-teal-500";
      if (icon === "syringe")
        return "text-blue-500";
      if (icon === "settings")
        return "text-slate-500";
      return "text-primary-500";
    }, ...ngDevMode ? [{ debugName: "currentStepIconColorClass" }] : (
      /* istanbul ignore next */
      []
    ));
    this.isLastStep = computed(() => this.stepIndex() === this.steps.length - 1, ...ngDevMode ? [{ debugName: "isLastStep" }] : (
      /* istanbul ignore next */
      []
    ));
    this.nextLabel = computed(() => this.isLastStep() ? this.t()["tour.finish"] ?? "Finish" : this.t()["tour.next"] ?? "Next", ...ngDevMode ? [{ debugName: "nextLabel" }] : (
      /* istanbul ignore next */
      []
    ));
    this.finishLabel = computed(() => this.t()["tour.finish"] ?? "Finish", ...ngDevMode ? [{ debugName: "finishLabel" }] : (
      /* istanbul ignore next */
      []
    ));
    this.skipLabel = computed(() => this.t()["tour.skip"] ?? "Skip", ...ngDevMode ? [{ debugName: "skipLabel" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  ngOnInit() {
    try {
      if (!localStorage.getItem(this.STORAGE_KEY)) {
        this.visible.set(true);
      }
    } catch (e) {
      this.visible.set(true);
    }
  }
  ngOnDestroy() {
  }
  next() {
    if (this.isLastStep()) {
      this.finish();
    } else {
      this.stepIndex.update((i) => i + 1);
    }
  }
  skip() {
    this._dontShowAgain = true;
    this.finish();
  }
  maybeSkip() {
    this._dontShowAgain = true;
    this.finish();
  }
  finish() {
    if (this._dontShowAgain) {
      try {
        localStorage.setItem(this.STORAGE_KEY, "true");
      } catch (e) {
      }
    }
    this.visible.set(false);
  }
  /** Called externally to restart the tour (e.g. from settings) */
  restart() {
    this.stepIndex.set(0);
    this._dontShowAgain = false;
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (e) {
    }
    this.visible.set(true);
  }
  static {
    this.\u0275fac = function OnboardingTourComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _OnboardingTourComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OnboardingTourComponent, selectors: [["app-onboarding-tour"]], decls: 1, vars: 1, consts: [["role", "dialog", "aria-modal", "true", 1, "fixed", "inset-0", "z-[100]", "flex", "items-center", "justify-center"], ["aria-hidden", "true", 1, "absolute", "inset-0", "bg-black/50", "backdrop-blur-sm", 3, "click"], [1, "relative", "z-10", "w-full", "max-w-sm", "mx-4", "bg-white", "rounded-[2rem]", "shadow-[0_32px_80px_-12px_rgba(0,0,0,0.3)]", "border", "border-white", "overflow-hidden", "animate-slide-up"], [1, "h-1.5", "w-full", 3, "ngClass"], [1, "p-8"], [1, "w-16", "h-16", "rounded-2xl", "flex", "items-center", "justify-center", "mb-6", "mx-auto", 3, "ngClass"], [1, "text-2xl", 3, "name", "ngClass"], [1, "flex", "justify-center", "gap-2", "mb-6"], [1, "h-1.5", "rounded-full", "transition-all", "duration-300", 3, "ngClass"], [1, "text-xl", "font-black", "text-gray-800", "text-center", "mb-3"], [1, "text-gray-500", "text-sm", "text-center", "leading-relaxed", "mb-8"], [1, "flex", "flex-col", "gap-3"], [1, "w-full", "py-3.5", "rounded-2xl", "font-bold", "text-white", "transition-all", "hover:opacity-90", "active:scale-98", "flex", "items-center", "justify-center", "gap-2", 3, "click", "ngClass"], [1, "text-inherit", 3, "name"], [1, "flex", "items-center", "justify-between", "gap-2"], [1, "px-4", "py-2", "text-slate-400", "hover:text-slate-600", "text-sm", "font-medium", "transition-colors", 3, "click"], [1, "text-xs", "text-slate-300"]], template: function OnboardingTourComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, OnboardingTourComponent_Conditional_0_Template, 23, 13, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275conditional(ctx.visible() ? 0 : -1);
      }
    }, dependencies: [CommonModule, NgClass, LucideAngularModule, LucideAngularComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n.animate-slide-up[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(24px) scale(0.96);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\nbutton[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n}\n/*# sourceMappingURL=onboarding-tour.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OnboardingTourComponent, [{
    type: Component,
    args: [{ selector: "app-onboarding-tour", imports: [CommonModule, LucideAngularModule], template: `
    <!-- Backdrop -->
    @if (visible()) {
      <div class="fixed inset-0 z-[100] flex items-center justify-center"
           role="dialog"
           aria-modal="true"
           [attr.aria-label]="currentStepTitle()">

        <!-- Semi-transparent overlay -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"
             (click)="maybeSkip()"
             aria-hidden="true">
        </div>

        <!-- Tour Card -->
        <div class="relative z-10 w-full max-w-sm mx-4 bg-white rounded-[2rem] shadow-[0_32px_80px_-12px_rgba(0,0,0,0.3)] border border-white overflow-hidden animate-slide-up">
          <!-- Top accent bar -->
          <div [ngClass]="currentStepAccentClass()"
               class="h-1.5 w-full">
          </div>

          <div class="p-8">
            <!-- Icon -->
            <div [ngClass]="currentStepIconBgClass()"
                 class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <lucide-icon [name]="steps[stepIndex()].icon"
                           [ngClass]="currentStepIconColorClass()"
                           class="text-2xl">
              </lucide-icon>
            </div>

            <!-- Step indicator -->
            <div class="flex justify-center gap-2 mb-6">
              @for (s of steps; track $index) {
                <div class="h-1.5 rounded-full transition-all duration-300"
                     [ngClass]="$index === stepIndex()
                       ? 'w-6 bg-primary-500'
                       : $index < stepIndex()
                         ? 'w-1.5 bg-primary-300'
                         : 'w-1.5 bg-slate-200'">
                </div>
              }
            </div>

            <!-- Title -->
            <h2 class="text-xl font-black text-gray-800 text-center mb-3">
              {{ currentStepTitle() }}
            </h2>

            <!-- Body -->
            <p class="text-gray-500 text-sm text-center leading-relaxed mb-8">
              {{ currentStepBody() }}
            </p>

            <!-- Actions -->
            <div class="flex flex-col gap-3">
              <button (click)="next()"
                      class="w-full py-3.5 rounded-2xl font-bold text-white transition-all hover:opacity-90 active:scale-98 flex items-center justify-center gap-2"
                      [ngClass]="isLastStep() ? 'bg-teal-500 hover:bg-teal-600' : 'bg-primary-500 hover:bg-primary-600'">
                <lucide-icon [name]="isLastStep() ? 'check-circle' : 'arrow-right'"
                             class="text-inherit">
                </lucide-icon>
                {{ isLastStep() ? finishLabel() : nextLabel() }}
              </button>

              <div class="flex items-center justify-between gap-2">
                <button (click)="skip()"
                        class="px-4 py-2 text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors">
                  {{ skipLabel() }}
                </button>
                <span class="text-xs text-slate-300">
                  {{ stepIndex() + 1 }}/{{ steps.length }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["/* angular:styles/component:css;e9eda34df72db1d415ed5eed0aea5dc142d278ebcc9c309b0b9276cc52f10532;C:/Users/g_gus/Desktop/jona/kiddok/src/app/components/onboarding-tour.component.ts */\n:host {\n  display: block;\n}\n.animate-slide-up {\n  animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(24px) scale(0.96);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\nbutton:active {\n  transform: scale(0.98);\n}\n/*# sourceMappingURL=onboarding-tour.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OnboardingTourComponent, { className: "OnboardingTourComponent", filePath: "src/app/components/onboarding-tour.component.ts", lineNumber: 115 });
})();

// src/app/components/offline-indicator.component.ts
function OfflineIndicatorComponent_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 3);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("(", ctx_r0.pendingCount(), ")");
  }
}
function OfflineIndicatorComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "lucide-icon", 1);
    \u0275\u0275elementStart(2, "span", 2);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, OfflineIndicatorComponent_Conditional_0_Conditional_4_Template, 2, 1, "span", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("size", 16);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.offlineService.hasPendingSync() ? ctx_r0.t()["offline.bannerPending"] : ctx_r0.t()["offline.banner"], " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.offlineService.hasPendingSync() ? 4 : -1);
  }
}
var OfflineIndicatorComponent = class _OfflineIndicatorComponent {
  constructor() {
    this.offlineService = inject(OfflineService);
    this.i18n = inject(I18nService);
    this.t = this.i18n.t;
    this.pendingCount = signal(0, ...ngDevMode ? [{ debugName: "pendingCount" }] : (
      /* istanbul ignore next */
      []
    ));
    effect(() => {
      if (this.offlineService.hasPendingSync()) {
        this.loadPendingCount();
      }
    });
  }
  loadPendingCount() {
    return __async(this, null, function* () {
      const count = yield this.offlineService.getSyncQueueCount();
      this.pendingCount.set(count);
    });
  }
  static {
    this.\u0275fac = function OfflineIndicatorComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _OfflineIndicatorComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OfflineIndicatorComponent, selectors: [["app-offline-indicator"]], decls: 1, vars: 1, consts: [["role", "status", "aria-live", "polite", 1, "fixed", "top-0", "left-0", "right-0", "z-[100]", "flex", "items-center", "justify-center", "gap-2", "px-4", "py-2.5", "bg-amber-50", "border-b", "border-amber-200", "shadow-sm", "animate-slide-down"], ["name", "wifi-off", "aria-hidden", "true", 1, "text-amber-500", "shrink-0", 3, "size"], [1, "text-sm", "font-bold", "text-amber-700"], [1, "text-xs", "text-amber-600", "font-medium"]], template: function OfflineIndicatorComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, OfflineIndicatorComponent_Conditional_0_Template, 5, 3, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275conditional(!ctx.offlineService.isOnline() ? 0 : -1);
      }
    }, dependencies: [CommonModule, LucideAngularModule, LucideAngularComponent], styles: ["\n.animate-slide-down[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_slideDown 0.3s ease-out;\n}\n@keyframes _ngcontent-%COMP%_slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-100%);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=offline-indicator.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OfflineIndicatorComponent, [{
    type: Component,
    args: [{ selector: "app-offline-indicator", standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    @if (!offlineService.isOnline()) {
      <div role="status" aria-live="polite"
           class="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-50 border-b border-amber-200 shadow-sm animate-slide-down">
        <lucide-icon name="wifi-off" class="text-amber-500 shrink-0" [size]="16" aria-hidden="true"></lucide-icon>
        <span class="text-sm font-bold text-amber-700">
          {{ offlineService.hasPendingSync() ? t()['offline.bannerPending'] : t()['offline.banner'] }}
        </span>
        @if (offlineService.hasPendingSync()) {
          <span class="text-xs text-amber-600 font-medium">({{ pendingCount() }})</span>
        }
      </div>
    }
  `, styles: ["/* angular:styles/component:css;a2709995141d048a4ebcb02005abc701a9327c289ac4c32b9b5325c9f1b50ac0;C:/Users/g_gus/Desktop/jona/kiddok/src/app/components/offline-indicator.component.ts */\n.animate-slide-down {\n  animation: slideDown 0.3s ease-out;\n}\n@keyframes slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-100%);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=offline-indicator.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OfflineIndicatorComponent, { className: "OfflineIndicatorComponent", filePath: "src/app/components/offline-indicator.component.ts", lineNumber: 42 });
})();

// src/app/services/export.service.ts
var ExportService = class _ExportService {
  constructor() {
    this.http = inject(HttpClient);
    this.toast = inject(ToastService);
  }
  get apiUrl() {
    return environment.apiUrl;
  }
  getHeaders() {
    const token = localStorage.getItem("kiddok_access_token");
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }
  getFileName(response, format) {
    const contentDisposition = response.headers.get("Content-Disposition");
    if (contentDisposition) {
      const match = contentDisposition.match(/filename[^;=\n]*=(?:(\\?['"])(.*?)\1|[^;\n]*)/);
      if (match && match[2]) {
        return match[2];
      }
    }
    return `kiddok-export.${format}`;
  }
  exportPdf(childId, dateFrom, dateTo) {
    return __async(this, null, function* () {
      const params = this.buildParams(dateFrom, dateTo);
      const url = `${this.apiUrl}/export/${childId}/pdf${params}`;
      try {
        const response = yield fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("kiddok_access_token")}`
          }
        });
        if (!response.ok) {
          const err = yield response.json().catch(() => ({ message: "Export failed" }));
          throw new Error(err.message ?? "Export failed");
        }
        const blob = yield response.blob();
        const filename = this.getFileNameFromContentDisposition(response, "pdf");
        this.downloadBlob(blob, filename);
      } catch (err) {
        if (err.name === "TypeError" && err.message.includes("fetch")) {
          this.toast.show("Nuk ka lidhje me serverin. Kontrolloni internetin.", "error");
        } else {
          this.toast.show(err.message ?? "Diqka shkoi keq. Riprovoni.", "error");
        }
        throw err;
      }
    });
  }
  exportCsv(childId, dateFrom, dateTo) {
    return __async(this, null, function* () {
      const params = this.buildParams(dateFrom, dateTo);
      const url = `${this.apiUrl}/export/${childId}/csv${params}`;
      try {
        const response = yield fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("kiddok_access_token")}`
          }
        });
        if (!response.ok) {
          const err = yield response.json().catch(() => ({ message: "Export failed" }));
          throw new Error(err.message ?? "Export failed");
        }
        const blob = yield response.blob();
        const filename = this.getFileNameFromContentDisposition(response, "csv");
        this.downloadBlob(blob, filename);
      } catch (err) {
        if (err.name === "TypeError" && err.message.includes("fetch")) {
          this.toast.show("Nuk ka lidhje me serverin. Kontrolloni internetin.", "error");
        } else {
          this.toast.show(err.message ?? "Diqka shkoi keq. Riprovoni.", "error");
        }
        throw err;
      }
    });
  }
  buildParams(dateFrom, dateTo) {
    const parts = [];
    if (dateFrom)
      parts.push(`from=${encodeURIComponent(dateFrom)}`);
    if (dateTo)
      parts.push(`to=${encodeURIComponent(dateTo)}`);
    return parts.length > 0 ? "?" + parts.join("&") : "";
  }
  getFileNameFromContentDisposition(response, fallbackExt) {
    const cd = response.headers.get("Content-Disposition");
    if (!cd)
      return `kiddok-export.${fallbackExt}`;
    const match = cd.match(/filename[^;=\n]*=(?:(\\?['"])(.*?)\1|[^;\n]*)/);
    return match?.[2] ?? `kiddok-export.${fallbackExt}`;
  }
  downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  static {
    this.\u0275fac = function ExportService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ExportService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ExportService, factory: _ExportService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExportService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/components/export-modal/export-modal.component.ts
function ExportModalComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275element(1, "lucide-icon", 22);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.isSq() ? 'Data "nga" duhet t\xEB jet\xEB para dates "deri".' : '"From" date must be before "to" date.', " ");
  }
}
function ExportModalComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275element(1, "lucide-icon", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t()["export.largeRangeWarning"], " ");
  }
}
function ExportModalComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275element(1, "lucide-icon", 24);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error(), " ");
  }
}
function ExportModalComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275element(1, "lucide-icon", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["export.generating"]);
  }
}
function ExportModalComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 27);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t()["export.exportBtn"]);
  }
}
var ExportModalComponent = class _ExportModalComponent {
  constructor() {
    this.childId = "";
    this.isOpen = false;
    this.closed = new EventEmitter();
    this.exportService = inject(ExportService);
    this.i18n = inject(I18nService);
    this.dateFrom = "";
    this.dateTo = "";
    this.format = "pdf";
    this.loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : (
      /* istanbul ignore next */
      []
    ));
    this.error = signal("", ...ngDevMode ? [{ debugName: "error" }] : (
      /* istanbul ignore next */
      []
    ));
    this.today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    this.showLargeRangeWarning = computed(() => {
      if (!this.dateFrom || !this.dateTo)
        return false;
      const from2 = new Date(this.dateFrom);
      const to2 = new Date(this.dateTo);
      const diffMs = to2.getTime() - from2.getTime();
      const diffDays = diffMs / (1e3 * 60 * 60 * 24);
      return diffDays > 365;
    }, ...ngDevMode ? [{ debugName: "showLargeRangeWarning" }] : (
      /* istanbul ignore next */
      []
    ));
    const to = /* @__PURE__ */ new Date();
    const from = /* @__PURE__ */ new Date();
    from.setDate(from.getDate() - 30);
    this.dateTo = to.toISOString().split("T")[0];
    this.dateFrom = from.toISOString().split("T")[0];
  }
  hasInvalidDateRange() {
    return !!(this.dateFrom && this.dateTo && this.dateFrom > this.dateTo);
  }
  onBackdropClick(event) {
    if (event.target.classList.contains("fixed")) {
      this.close();
    }
  }
  close() {
    this.closed.emit();
    this.error.set("");
  }
  onExport() {
    return __async(this, null, function* () {
      if (this.loading())
        return;
      this.error.set("");
      this.loading.set(true);
      try {
        if (this.format === "pdf") {
          yield this.exportService.exportPdf(this.childId, this.dateFrom, this.dateTo);
        } else {
          yield this.exportService.exportCsv(this.childId, this.dateFrom, this.dateTo);
        }
        this.close();
      } catch (err) {
        this.error.set(err.message ?? this.i18n.t()["export.errorServer"]);
      } finally {
        this.loading.set(false);
      }
    });
  }
  static {
    this.\u0275fac = function ExportModalComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ExportModalComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExportModalComponent, selectors: [["app-export-modal"]], inputs: { childId: "childId", isOpen: "isOpen" }, outputs: { closed: "closed" }, decls: 39, vars: 67, consts: [["role", "dialog", "aria-modal", "true", "aria-labelledby", "export-modal-title", 1, "fixed", "inset-0", "bg-black/40", "z-50", "flex", "items-center", "justify-center", "p-4", 3, "click"], [1, "bg-white", "rounded-3xl", "shadow-2xl", "w-full", "max-w-md", "p-6", "animate-slide-up", 3, "click"], [1, "flex", "items-center", "justify-between", "mb-6"], ["id", "export-modal-title", 1, "text-xl", "font-extrabold", "text-gray-800"], ["type", "button", 1, "w-9", "h-9", "rounded-xl", "bg-slate-50", "hover:bg-slate-100", "flex", "items-center", "justify-center", "text-slate-400", "hover:text-slate-600", "transition-all", "border", "border-slate-200", 3, "click"], ["name", "x", "aria-hidden", "true", 1, "text-inherit"], [1, "mb-5"], [1, "block", "text-sm", "font-bold", "text-gray-600", "mb-2"], [1, "grid", "grid-cols-2", "gap-3"], [1, "text-xs", "text-gray-500", "mb-1", "block"], ["type", "date", 1, "w-full", "px-4", "py-3", "rounded-2xl", "bg-slate-50", "border-2", "border-slate-200", "focus:bg-white", "focus:ring-2", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-sm", "text-gray-800", 3, "ngModelChange", "ngModel", "max"], [1, "mt-2", "text-xs", "text-red-500", "font-medium", "flex", "items-center", "gap-1"], [1, "flex", "gap-4"], [1, "flex", "items-center", "gap-2", "cursor-pointer", "px-4", "py-3", "rounded-2xl", "border-2", "transition-all"], ["type", "radio", "value", "pdf", 1, "sr-only", 3, "ngModelChange", "ngModel"], ["name", "file-text", "aria-hidden", "true", 1, "text-inherit"], [1, "text-sm", "font-bold"], ["type", "radio", "value", "csv", 1, "sr-only", 3, "ngModelChange", "ngModel"], ["name", "table", "aria-hidden", "true", 1, "text-inherit"], [1, "mb-4", "p-3", "bg-amber-50", "border", "border-amber-200", "rounded-xl", "text-xs", "text-amber-700", "flex", "gap-2"], [1, "mb-4", "p-3", "bg-red-50", "border", "border-red-200", "rounded-xl", "text-xs", "text-red-700", "flex", "gap-2"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-center", "gap-2", "py-4", "rounded-2xl", "font-bold", "text-base", "transition-all", "shadow-md", 3, "click", "disabled"], ["name", "alert-circle", 1, "text-inherit"], ["name", "alert-triangle", "aria-hidden", "true", 1, "text-inherit", "shrink-0"], ["name", "alert-circle", "aria-hidden", "true", 1, "text-inherit", "shrink-0"], [1, "animate-spin"], ["name", "loader-2", "aria-hidden", "true", 1, "text-inherit"], ["name", "download", "aria-hidden", "true", 1, "text-inherit"]], template: function ExportModalComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function ExportModalComponent_Template_div_click_0_listener($event) {
          return ctx.onBackdropClick($event);
        });
        \u0275\u0275elementStart(1, "div", 1);
        \u0275\u0275listener("click", function ExportModalComponent_Template_div_click_1_listener($event) {
          return $event.stopPropagation();
        });
        \u0275\u0275elementStart(2, "div", 2)(3, "h2", 3);
        \u0275\u0275text(4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "button", 4);
        \u0275\u0275listener("click", function ExportModalComponent_Template_button_click_5_listener() {
          return ctx.close();
        });
        \u0275\u0275element(6, "lucide-icon", 5);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 6)(8, "label", 7);
        \u0275\u0275text(9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "div", 8)(11, "div")(12, "label", 9);
        \u0275\u0275text(13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "input", 10);
        \u0275\u0275twoWayListener("ngModelChange", function ExportModalComponent_Template_input_ngModelChange_14_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.dateFrom, $event) || (ctx.dateFrom = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(15, "div")(16, "label", 9);
        \u0275\u0275text(17);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "input", 10);
        \u0275\u0275twoWayListener("ngModelChange", function ExportModalComponent_Template_input_ngModelChange_18_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.dateTo, $event) || (ctx.dateTo = $event);
          return $event;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275conditionalCreate(19, ExportModalComponent_Conditional_19_Template, 3, 1, "p", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "div", 6)(21, "label", 7);
        \u0275\u0275text(22);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "div", 12)(24, "label", 13)(25, "input", 14);
        \u0275\u0275twoWayListener("ngModelChange", function ExportModalComponent_Template_input_ngModelChange_25_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.format, $event) || (ctx.format = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275element(26, "lucide-icon", 15);
        \u0275\u0275elementStart(27, "span", 16);
        \u0275\u0275text(28);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(29, "label", 13)(30, "input", 17);
        \u0275\u0275twoWayListener("ngModelChange", function ExportModalComponent_Template_input_ngModelChange_30_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.format, $event) || (ctx.format = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275element(31, "lucide-icon", 18);
        \u0275\u0275elementStart(32, "span", 16);
        \u0275\u0275text(33);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275conditionalCreate(34, ExportModalComponent_Conditional_34_Template, 3, 1, "div", 19);
        \u0275\u0275conditionalCreate(35, ExportModalComponent_Conditional_35_Template, 3, 1, "div", 20);
        \u0275\u0275elementStart(36, "button", 21);
        \u0275\u0275listener("click", function ExportModalComponent_Template_button_click_36_listener() {
          return ctx.onExport();
        });
        \u0275\u0275conditionalCreate(37, ExportModalComponent_Conditional_37_Template, 4, 1)(38, ExportModalComponent_Conditional_38_Template, 3, 1);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1(" ", ctx.i18n.t()["export.title"], " ");
        \u0275\u0275advance();
        \u0275\u0275attribute("aria-label", ctx.i18n.t()["common.close"]);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.i18n.t()["export.dateRange"]);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.i18n.t()["export.from"]);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.dateFrom);
        \u0275\u0275property("max", ctx.today);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.i18n.t()["export.to"]);
        \u0275\u0275advance();
        \u0275\u0275classProp("border-red-400", ctx.hasInvalidDateRange());
        \u0275\u0275twoWayProperty("ngModel", ctx.dateTo);
        \u0275\u0275property("max", ctx.today);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.hasInvalidDateRange() ? 19 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.i18n.t()["export.format"]);
        \u0275\u0275advance(2);
        \u0275\u0275classProp("border-primary-400", ctx.format === "pdf")("bg-primary-50", ctx.format === "pdf")("border-slate-200", ctx.format !== "pdf")("bg-white", ctx.format !== "pdf");
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.format);
        \u0275\u0275advance();
        \u0275\u0275classProp("text-primary-600", ctx.format === "pdf")("text-slate-400", ctx.format !== "pdf");
        \u0275\u0275advance();
        \u0275\u0275classProp("text-primary-700", ctx.format === "pdf")("text-slate-600", ctx.format !== "pdf");
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.i18n.t()["export.pdf"]);
        \u0275\u0275advance();
        \u0275\u0275classProp("border-primary-400", ctx.format === "csv")("bg-primary-50", ctx.format === "csv")("border-slate-200", ctx.format !== "csv")("bg-white", ctx.format !== "csv");
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.format);
        \u0275\u0275advance();
        \u0275\u0275classProp("text-primary-600", ctx.format === "csv")("text-slate-400", ctx.format !== "csv");
        \u0275\u0275advance();
        \u0275\u0275classProp("text-primary-700", ctx.format === "csv")("text-slate-600", ctx.format !== "csv");
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.i18n.t()["export.csv"]);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.showLargeRangeWarning() ? 34 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.error() ? 35 : -1);
        \u0275\u0275advance();
        \u0275\u0275classProp("bg-primary-600", !ctx.loading() && !ctx.hasInvalidDateRange())("hover:bg-primary-500", !ctx.loading() && !ctx.hasInvalidDateRange())("text-white", !ctx.loading() && !ctx.hasInvalidDateRange())("opacity-60", ctx.loading() || ctx.hasInvalidDateRange())("cursor-not-allowed", ctx.loading() || ctx.hasInvalidDateRange())("bg-slate-200", ctx.loading() || ctx.hasInvalidDateRange())("text-slate-400", ctx.loading() || ctx.hasInvalidDateRange());
        \u0275\u0275property("disabled", ctx.loading() || ctx.hasInvalidDateRange());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.loading() ? 37 : 38);
      }
    }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, RadioControlValueAccessor, NgControlStatus, NgModel, LucideAngularModule, LucideAngularComponent], styles: ["\n.animate-slide-up[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(16px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\nbutton[_ngcontent-%COMP%]:not(:disabled):active {\n  transform: scale(0.98);\n}\n/*# sourceMappingURL=export-modal.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExportModalComponent, [{
    type: Component,
    args: [{ selector: "app-export-modal", standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], template: `
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
         role="dialog"
         aria-modal="true"
         aria-labelledby="export-modal-title"
         (click)="onBackdropClick($event)">

      <!-- Card -->
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 animate-slide-up"
           (click)="$event.stopPropagation()">

        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <h2 id="export-modal-title" class="text-xl font-extrabold text-gray-800">
            {{ i18n.t()['export.title'] }}
          </h2>
          <button type="button"
                  (click)="close()"
                  class="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all border border-slate-200"
                  [attr.aria-label]="i18n.t()['common.close']">
            <lucide-icon name="x" class="text-inherit" aria-hidden="true"></lucide-icon>
          </button>
        </div>

        <!-- Date Range -->
        <div class="mb-5">
          <label class="block text-sm font-bold text-gray-600 mb-2">{{ i18n.t()['export.dateRange'] }}</label>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs text-gray-500 mb-1 block">{{ i18n.t()['export.from'] }}</label>
              <input type="date"
                     [(ngModel)]="dateFrom"
                     [max]="today"
                     class="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-sm text-gray-800" />
            </div>
            <div>
              <label class="text-xs text-gray-500 mb-1 block">{{ i18n.t()['export.to'] }}</label>
              <input type="date"
                     [(ngModel)]="dateTo"
                     [max]="today"
                     class="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-sm text-gray-800"
                     [class.border-red-400]="hasInvalidDateRange()" />
            </div>
          </div>
          @if (hasInvalidDateRange()) {
            <p class="mt-2 text-xs text-red-500 font-medium flex items-center gap-1">
              <lucide-icon name="alert-circle" class="text-inherit"></lucide-icon>
              {{ i18n.isSq() ? 'Data "nga" duhet t\xEB jet\xEB para dates "deri".' : '"From" date must be before "to" date.' }}
            </p>
          }
        </div>

        <!-- Format Selector -->
        <div class="mb-5">
          <label class="block text-sm font-bold text-gray-600 mb-2">{{ i18n.t()['export.format'] }}</label>
          <div class="flex gap-4">
            <label class="flex items-center gap-2 cursor-pointer px-4 py-3 rounded-2xl border-2 transition-all"
                   [class.border-primary-400]="format === 'pdf'"
                   [class.bg-primary-50]="format === 'pdf'"
                   [class.border-slate-200]="format !== 'pdf'"
                   [class.bg-white]="format !== 'pdf'">
              <input type="radio" value="pdf" [(ngModel)]="format" class="sr-only" />
              <lucide-icon name="file-text" class="text-inherit" [class.text-primary-600]="format === 'pdf'" [class.text-slate-400]="format !== 'pdf'" aria-hidden="true"></lucide-icon>
              <span class="text-sm font-bold" [class.text-primary-700]="format === 'pdf'" [class.text-slate-600]="format !== 'pdf'">{{ i18n.t()['export.pdf'] }}</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer px-4 py-3 rounded-2xl border-2 transition-all"
                   [class.border-primary-400]="format === 'csv'"
                   [class.bg-primary-50]="format === 'csv'"
                   [class.border-slate-200]="format !== 'csv'"
                   [class.bg-white]="format !== 'csv'">
              <input type="radio" value="csv" [(ngModel)]="format" class="sr-only" />
              <lucide-icon name="table" class="text-inherit" [class.text-primary-600]="format === 'csv'" [class.text-slate-400]="format !== 'csv'" aria-hidden="true"></lucide-icon>
              <span class="text-sm font-bold" [class.text-primary-700]="format === 'csv'" [class.text-slate-600]="format !== 'csv'">{{ i18n.t()['export.csv'] }}</span>
            </label>
          </div>
        </div>

        <!-- Large Range Warning -->
        @if (showLargeRangeWarning()) {
          <div class="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 flex gap-2">
            <lucide-icon name="alert-triangle" class="text-inherit shrink-0" aria-hidden="true"></lucide-icon>
            {{ i18n.t()['export.largeRangeWarning'] }}
          </div>
        }

        <!-- Error Banner -->
        @if (error()) {
          <div class="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex gap-2">
            <lucide-icon name="alert-circle" class="text-inherit shrink-0" aria-hidden="true"></lucide-icon>
            {{ error() }}
          </div>
        }

        <!-- Export Button -->
        <button type="button"
                (click)="onExport()"
                [disabled]="loading() || hasInvalidDateRange()"
                class="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all shadow-md"
                [class.bg-primary-600]="!loading() && !hasInvalidDateRange()"
                [class.hover:bg-primary-500]="!loading() && !hasInvalidDateRange()"
                [class.text-white]="!loading() && !hasInvalidDateRange()"
                [class.opacity-60]="loading() || hasInvalidDateRange()"
                [class.cursor-not-allowed]="loading() || hasInvalidDateRange()"
                [class.bg-slate-200]="loading() || hasInvalidDateRange()"
                [class.text-slate-400]="loading() || hasInvalidDateRange()">
          @if (loading()) {
            <span class="animate-spin">
              <lucide-icon name="loader-2" class="text-inherit" aria-hidden="true"></lucide-icon>
            </span>
            <span>{{ i18n.t()['export.generating'] }}</span>
          } @else {
            <lucide-icon name="download" class="text-inherit" aria-hidden="true"></lucide-icon>
            <span>{{ i18n.t()['export.exportBtn'] }}</span>
          }
        </button>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;f17f6b29812216938f335d4014057ac497a5fba16c509487d48752bb2fb91a7e;C:/Users/g_gus/Desktop/jona/kiddok/src/app/components/export-modal/export-modal.component.ts */\n.animate-slide-up {\n  animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(16px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\nbutton:not(:disabled):active {\n  transform: scale(0.98);\n}\n/*# sourceMappingURL=export-modal.component.css.map */\n"] }]
  }], () => [], { childId: [{
    type: Input
  }], isOpen: [{
    type: Input
  }], closed: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExportModalComponent, { className: "ExportModalComponent", filePath: "src/app/components/export-modal/export-modal.component.ts", lineNumber: 144 });
})();

// src/app/components/shell.component.ts
var _c02 = () => [1, 2];
var _forTrack06 = ($index, $item) => $item.id;
function ShellComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275listener("click", function ShellComponent_Conditional_1_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.mobileSidebarOpen.set(false));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(1, "app-sidebar", 13);
  }
}
function ShellComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["child.saveSuccess"]);
  }
}
function ShellComponent_Conditional_11_Conditional_0_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 18);
    \u0275\u0275element(2, "div", 19);
    \u0275\u0275elementStart(3, "div", 20);
    \u0275\u0275element(4, "div", 21)(5, "div", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(6, "div", 23);
    \u0275\u0275elementEnd();
  }
}
function ShellComponent_Conditional_11_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275repeaterCreate(1, ShellComponent_Conditional_11_Conditional_0_For_2_Template, 7, 0, "div", 17, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c02));
  }
}
function ShellComponent_Conditional_11_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 24);
    \u0275\u0275element(2, "lucide-icon", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2", 26);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 27);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 28);
    \u0275\u0275listener("click", function ShellComponent_Conditional_11_Conditional_1_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.isAddingChild.set(true));
    });
    \u0275\u0275element(8, "lucide-icon", 29);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("size", 80);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["child.welcome"]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["child.welcomeSub"]);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["child.addNew"], " ");
  }
}
function ShellComponent_Conditional_11_Conditional_2_For_7_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275element(1, "lucide-icon", 46);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const child_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", child_r6.bloodType, " ");
  }
}
function ShellComponent_Conditional_11_Conditional_2_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "button", 37);
    \u0275\u0275listener("click", function ShellComponent_Conditional_11_Conditional_2_For_7_Template_button_click_1_listener() {
      const child_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openEditModal(child_r6));
    });
    \u0275\u0275element(2, "lucide-icon", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 39);
    \u0275\u0275listener("click", function ShellComponent_Conditional_11_Conditional_2_For_7_Template_div_click_3_listener() {
      const child_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectChild(child_r6.id));
    });
    \u0275\u0275elementStart(4, "div", 18);
    \u0275\u0275element(5, "img", 40);
    \u0275\u0275elementStart(6, "div")(7, "h3", 41);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 42);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(11, ShellComponent_Conditional_11_Conditional_2_For_7_Conditional_11_Template, 3, 1, "div", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 44);
    \u0275\u0275listener("click", function ShellComponent_Conditional_11_Conditional_2_For_7_Template_div_click_12_listener() {
      const child_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectChild(child_r6.id));
    });
    \u0275\u0275element(13, "lucide-icon", 45);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const child_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r1.i18n.t()["child.editProfile"]);
    \u0275\u0275advance(4);
    \u0275\u0275property("src", child_r6.avatarUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(child_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.toDisplay(child_r6.dateOfBirth, ctx_r1.i18n.locale()));
    \u0275\u0275advance();
    \u0275\u0275conditional(child_r6.bloodType ? 11 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["sidebar.openProfile"], " ");
  }
}
function ShellComponent_Conditional_11_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "h2", 30);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 31);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 14);
    \u0275\u0275repeaterCreate(6, ShellComponent_Conditional_11_Conditional_2_For_7_Template, 15, 6, "div", 32, _forTrack06);
    \u0275\u0275elementStart(8, "button", 33);
    \u0275\u0275listener("click", function ShellComponent_Conditional_11_Conditional_2_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.isAddingChild.set(true));
    });
    \u0275\u0275elementStart(9, "div", 34);
    \u0275\u0275element(10, "lucide-icon", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 36);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["child.selectChild"]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["sidebar.selectChildToContinue"]);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.dataService.children());
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["child.addNewBtn"], " ");
  }
}
function ShellComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ShellComponent_Conditional_11_Conditional_0_Template, 3, 1, "div", 14);
    \u0275\u0275conditionalCreate(1, ShellComponent_Conditional_11_Conditional_1_Template, 10, 4, "div", 15)(2, ShellComponent_Conditional_11_Conditional_2_Template, 13, 3, "div", 16);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.childrenLoading() ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.dataService.children().length === 0 && !ctx_r1.isAddingChild() ? 1 : 2);
  }
}
function ShellComponent_Conditional_12_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 52);
    \u0275\u0275element(1, "lucide-icon", 84);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.isSq() ? "Emri mund t\xEB p\xEBrmbaj\xEB vet\xEBm shkronja." : "Name can only contain letters.", " ");
  }
}
function ShellComponent_Conditional_12_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 69);
  }
}
function ShellComponent_Conditional_12_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 77);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.newChildDocumentError());
  }
}
function ShellComponent_Conditional_12_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 78);
    \u0275\u0275element(1, "lucide-icon", 85);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["child.documentAttached"]);
  }
}
function ShellComponent_Conditional_12_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "label", 50);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 86);
    \u0275\u0275twoWayListener("ngModelChange", function ShellComponent_Conditional_12_Conditional_73_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.newChildDocumentDate, $event) || (ctx_r1.newChildDocumentDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["child.documentIssueDate"]);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newChildDocumentDate);
  }
}
function ShellComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "h2", 47);
    \u0275\u0275element(2, "lucide-icon", 48);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 49)(5, "div")(6, "label", 50);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 51);
    \u0275\u0275twoWayListener("ngModelChange", function ShellComponent_Conditional_12_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newChildName, $event) || (ctx_r1.newChildName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function ShellComponent_Conditional_12_Template_input_input_8_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAddNameInput($event));
    })("blur", function ShellComponent_Conditional_12_Template_input_blur_8_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAddNameBlur());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, ShellComponent_Conditional_12_Conditional_9_Template, 3, 1, "p", 52);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div")(11, "label", 50);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 53)(14, "input", 54);
    \u0275\u0275twoWayListener("ngModelChange", function ShellComponent_Conditional_12_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newChildDob, $event) || (ctx_r1.newChildDob = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function ShellComponent_Conditional_12_Template_input_input_14_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDateInput($event, (v) => ctx_r1.newChildDob = v, ctx_r1.i18n.locale()));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 55);
    \u0275\u0275element(16, "lucide-icon", 56);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 57)(18, "div")(19, "label", 50);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 58);
    \u0275\u0275twoWayListener("ngModelChange", function ShellComponent_Conditional_12_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newChildBirthWeight, $event) || (ctx_r1.newChildBirthWeight = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div")(23, "label", 50);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 53)(26, "select", 59);
    \u0275\u0275twoWayListener("ngModelChange", function ShellComponent_Conditional_12_Template_select_ngModelChange_26_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newChildBloodType, $event) || (ctx_r1.newChildBloodType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(27, "option", 60);
    \u0275\u0275text(28, "--");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "option", 61);
    \u0275\u0275text(30, "A+");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "option", 62);
    \u0275\u0275text(32, "A-");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "option", 63);
    \u0275\u0275text(34, "B+");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "option", 64);
    \u0275\u0275text(36, "B-");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "option", 65);
    \u0275\u0275text(38, "AB+");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "option", 66);
    \u0275\u0275text(40, "AB-");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "option", 67);
    \u0275\u0275text(42, "O+");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "option", 68);
    \u0275\u0275text(44, "O-");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(45, ShellComponent_Conditional_12_Conditional_45_Template, 1, 0, "lucide-icon", 69);
    \u0275\u0275element(46, "lucide-icon", 70);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(47, "div")(48, "label", 50);
    \u0275\u0275text(49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "div", 53)(51, "select", 71);
    \u0275\u0275twoWayListener("ngModelChange", function ShellComponent_Conditional_12_Template_select_ngModelChange_51_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newChildGender, $event) || (ctx_r1.newChildGender = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(52, "option", 60);
    \u0275\u0275text(53, "--");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "option", 72);
    \u0275\u0275text(55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "option", 73);
    \u0275\u0275text(57);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(58, "lucide-icon", 70);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(59, "div")(60, "label", 50);
    \u0275\u0275text(61);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "textarea", 74);
    \u0275\u0275twoWayListener("ngModelChange", function ShellComponent_Conditional_12_Template_textarea_ngModelChange_62_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newChildAllergies, $event) || (ctx_r1.newChildAllergies = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(63, "div")(64, "label", 50);
    \u0275\u0275text(65);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "textarea", 75);
    \u0275\u0275twoWayListener("ngModelChange", function ShellComponent_Conditional_12_Template_textarea_ngModelChange_66_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newChildMedicalNotes, $event) || (ctx_r1.newChildMedicalNotes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(67, "div")(68, "label", 50);
    \u0275\u0275text(69);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "input", 76);
    \u0275\u0275listener("change", function ShellComponent_Conditional_12_Template_input_change_70_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onNewChildDocumentSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(71, ShellComponent_Conditional_12_Conditional_71_Template, 2, 1, "p", 77);
    \u0275\u0275conditionalCreate(72, ShellComponent_Conditional_12_Conditional_72_Template, 3, 1, "p", 78);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(73, ShellComponent_Conditional_12_Conditional_73_Template, 4, 2, "div");
    \u0275\u0275elementStart(74, "div")(75, "label", 50);
    \u0275\u0275text(76);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(77, "input", 79);
    \u0275\u0275twoWayListener("ngModelChange", function ShellComponent_Conditional_12_Template_input_ngModelChange_77_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newChildDeliveryDoctor, $event) || (ctx_r1.newChildDeliveryDoctor = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(78, "div", 80)(79, "button", 81);
    \u0275\u0275listener("click", function ShellComponent_Conditional_12_Template_button_click_79_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submitNewChild());
    });
    \u0275\u0275element(80, "lucide-icon", 82);
    \u0275\u0275text(81);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "button", 83);
    \u0275\u0275listener("click", function ShellComponent_Conditional_12_Template_button_click_82_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelAddChild());
    });
    \u0275\u0275text(83);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["child.addNew"], " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["child.fullName"]);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newChildName);
    \u0275\u0275property("ngClass", ctx_r1.addNameInvalid() ? "border-red-400 focus:ring-4 focus:ring-red-500/10 focus:border-red-500" : "border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500")("placeholder", ctx_r1.i18n.t()["placeholder.fullName"]);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.addNameInvalid() ? 9 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["child.dateOfBirth"]);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newChildDob);
    \u0275\u0275property("placeholder", ctx_r1.i18n.locale() === "sq" ? "DD/MM/YYYY" : "MM/DD/YYYY");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["child.birthWeight"]);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newChildBirthWeight);
    \u0275\u0275property("placeholder", ctx_r1.i18n.t()["placeholder.birthWeight"]);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["child.bloodType"]);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newChildBloodType);
    \u0275\u0275property("ngClass", ctx_r1.newChildBloodType ? "border-teal-300 text-gray-800 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500" : "border-slate-200 text-gray-600 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500");
    \u0275\u0275advance(19);
    \u0275\u0275conditional(ctx_r1.newChildBloodType ? 45 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["child.gender"], " ");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newChildGender);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["childForm.gender.male"]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["childForm.gender.female"]);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["child.criticalAllergies"]);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newChildAllergies);
    \u0275\u0275property("placeholder", ctx_r1.i18n.t()["placeholder.allergies"]);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["child.medicalNotes"]);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newChildMedicalNotes);
    \u0275\u0275property("placeholder", ctx_r1.i18n.t()["placeholder.medicalNotes"]);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["child.medicalDocument"]);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r1.i18n.t()["child.medicalDocument"]);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.newChildDocumentError() ? 71 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.newChildDocument() ? 72 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.newChildDocument() ? 73 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["child.deliveryDoctor"]);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newChildDeliveryDoctor);
    \u0275\u0275property("placeholder", ctx_r1.i18n.t()["placeholder.deliveryDoctor"]);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.addNameInvalid() && ctx_r1.newChildName.length > 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["child.saveProfile"], " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["child.cancel"]);
  }
}
function ShellComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "router-outlet", 87);
    \u0275\u0275listener("activate", function ShellComponent_Conditional_13_Template_router_outlet_activate_1_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onActivate($event));
    });
    \u0275\u0275elementEnd()();
  }
}
function ShellComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-export-modal", 88);
    \u0275\u0275listener("closed", function ShellComponent_Conditional_16_Template_app_export_modal_closed_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showExportModal.set(false));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("childId", ctx_r1.dataService.activeChildId())("isOpen", ctx_r1.showExportModal());
  }
}
function ShellComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-add-edit-child-modal", 89);
    \u0275\u0275listener("saved", function ShellComponent_Conditional_17_Template_app_add_edit_child_modal_saved_0_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onChildSaved($event));
    })("cancelled", function ShellComponent_Conditional_17_Template_app_add_edit_child_modal_cancelled_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("mode", ctx_r1.isAddingChild() ? "add" : "edit")("child", ctx_r1.editingChild() ?? void 0);
  }
}
function ShellComponent_Conditional_18_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 102);
  }
}
function ShellComponent_Conditional_18_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 52);
    \u0275\u0275element(1, "lucide-icon", 84);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.isSq() ? "Emri mund t\xEB p\xEBrmbaj\xEB vet\xEBm shkronja." : "Name can only contain letters.", " ");
  }
}
function ShellComponent_Conditional_18_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 105);
    \u0275\u0275element(1, "lucide-icon", 69);
    \u0275\u0275elementEnd();
  }
}
function ShellComponent_Conditional_18_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 106);
    \u0275\u0275element(1, "lucide-icon", 69);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.isSq() ? "Grupi i gjakut u verifikua." : "Blood type verified.", " ");
  }
}
function ShellComponent_Conditional_18_Conditional_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 77);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.documentError());
  }
}
function ShellComponent_Conditional_18_Conditional_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 78);
    \u0275\u0275element(1, "lucide-icon", 85);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["child.documentAttached"]);
  }
}
function ShellComponent_Conditional_18_Conditional_86_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "label", 50);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 86);
    \u0275\u0275twoWayListener("ngModelChange", function ShellComponent_Conditional_18_Conditional_86_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.editChildDocumentDate, $event) || (ctx_r1.editChildDocumentDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["child.documentIssueDate"]);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editChildDocumentDate);
  }
}
function ShellComponent_Conditional_18_Conditional_88_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 111);
    \u0275\u0275element(1, "lucide-icon", 85);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["child.saveSuccess"], " ");
  }
}
function ShellComponent_Conditional_18_Conditional_90_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 116);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["child.saving"]);
  }
}
function ShellComponent_Conditional_18_Conditional_91_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 82);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["sidebar.saveChanges"], " ");
  }
}
function ShellComponent_Conditional_18_Conditional_95_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 115)(1, "div", 117)(2, "div", 118);
    \u0275\u0275element(3, "lucide-icon", 119);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "p", 120);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 121);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "p", 122);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 123)(12, "button", 124);
    \u0275\u0275listener("click", function ShellComponent_Conditional_18_Conditional_95_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.showDeleteConfirm.set(false));
    });
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 125);
    \u0275\u0275listener("click", function ShellComponent_Conditional_18_Conditional_95_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.confirmDeleteChild());
    });
    \u0275\u0275element(15, "lucide-icon", 126);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["child.deleteConfirmTitle"]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_3_0 = ctx_r1.editingChild()) == null ? null : tmp_3_0.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["child.deleteConfirmBody"]);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["child.cancel"], " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["child.delete"], " ");
  }
}
function ShellComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 90);
    \u0275\u0275listener("click", function ShellComponent_Conditional_18_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeEditModal());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 91);
    \u0275\u0275element(3, "div", 92);
    \u0275\u0275elementStart(4, "div", 93)(5, "div", 94)(6, "h2", 95);
    \u0275\u0275element(7, "lucide-icon", 96);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 97);
    \u0275\u0275listener("click", function ShellComponent_Conditional_18_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeEditModal());
    });
    \u0275\u0275element(10, "lucide-icon", 98);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 99)(12, "div")(13, "label", 100);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 53)(16, "input", 101);
    \u0275\u0275twoWayListener("ngModelChange", function ShellComponent_Conditional_18_Template_input_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.editName, $event) || (ctx_r1.editName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function ShellComponent_Conditional_18_Template_input_input_16_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onEditNameInput($event));
    })("blur", function ShellComponent_Conditional_18_Template_input_blur_16_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onEditNameBlur());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(17, ShellComponent_Conditional_18_Conditional_17_Template, 1, 0, "lucide-icon", 102);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(18, ShellComponent_Conditional_18_Conditional_18_Template, 3, 1, "p", 52);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div")(20, "label", 100);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 53)(23, "input", 103);
    \u0275\u0275twoWayListener("ngModelChange", function ShellComponent_Conditional_18_Template_input_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.editDob, $event) || (ctx_r1.editDob = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function ShellComponent_Conditional_18_Template_input_input_23_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDateInput($event, (v) => ctx_r1.editDob = v, ctx_r1.i18n.locale()));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 55);
    \u0275\u0275element(25, "lucide-icon", 56);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "div")(27, "label", 100);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 53)(30, "select", 104);
    \u0275\u0275listener("ngModelChange", function ShellComponent_Conditional_18_Template_select_ngModelChange_30_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editBloodType.set($event));
    });
    \u0275\u0275elementStart(31, "option", 60);
    \u0275\u0275text(32, "--");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "option", 61);
    \u0275\u0275text(34, "A+");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "option", 62);
    \u0275\u0275text(36, "A-");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "option", 63);
    \u0275\u0275text(38, "B+");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "option", 64);
    \u0275\u0275text(40, "B-");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "option", 65);
    \u0275\u0275text(42, "AB+");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "option", 66);
    \u0275\u0275text(44, "AB-");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "option", 67);
    \u0275\u0275text(46, "O+");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "option", 68);
    \u0275\u0275text(48, "O-");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(49, ShellComponent_Conditional_18_Conditional_49_Template, 2, 0, "span", 105);
    \u0275\u0275element(50, "lucide-icon", 70);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(51, ShellComponent_Conditional_18_Conditional_51_Template, 3, 1, "p", 106);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "div")(53, "label", 100);
    \u0275\u0275text(54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "div", 53)(56, "select", 107);
    \u0275\u0275twoWayListener("ngModelChange", function ShellComponent_Conditional_18_Template_select_ngModelChange_56_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.editGender, $event) || (ctx_r1.editGender = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(57, "option", 60);
    \u0275\u0275text(58, "--");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "option", 72);
    \u0275\u0275text(60);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "option", 73);
    \u0275\u0275text(62);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(63, "lucide-icon", 70);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(64, "div")(65, "label", 100);
    \u0275\u0275text(66);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "input", 108);
    \u0275\u0275twoWayListener("ngModelChange", function ShellComponent_Conditional_18_Template_input_ngModelChange_67_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.editBirthWeight, $event) || (ctx_r1.editBirthWeight = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(68, "div")(69, "label", 100);
    \u0275\u0275text(70);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "input", 109);
    \u0275\u0275twoWayListener("ngModelChange", function ShellComponent_Conditional_18_Template_input_ngModelChange_71_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.editDeliveryDoctor, $event) || (ctx_r1.editDeliveryDoctor = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(72, "div")(73, "label", 50);
    \u0275\u0275text(74);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "textarea", 74);
    \u0275\u0275twoWayListener("ngModelChange", function ShellComponent_Conditional_18_Template_textarea_ngModelChange_75_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.editChildAllergies, $event) || (ctx_r1.editChildAllergies = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(76, "div")(77, "label", 50);
    \u0275\u0275text(78);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "textarea", 75);
    \u0275\u0275twoWayListener("ngModelChange", function ShellComponent_Conditional_18_Template_textarea_ngModelChange_79_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.editChildMedicalNotes, $event) || (ctx_r1.editChildMedicalNotes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(80, "div")(81, "label", 50);
    \u0275\u0275text(82);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "input", 76);
    \u0275\u0275listener("change", function ShellComponent_Conditional_18_Template_input_change_83_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDocumentSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(84, ShellComponent_Conditional_18_Conditional_84_Template, 2, 1, "p", 77);
    \u0275\u0275conditionalCreate(85, ShellComponent_Conditional_18_Conditional_85_Template, 3, 1, "p", 78);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(86, ShellComponent_Conditional_18_Conditional_86_Template, 4, 2, "div");
    \u0275\u0275elementStart(87, "div", 110);
    \u0275\u0275conditionalCreate(88, ShellComponent_Conditional_18_Conditional_88_Template, 3, 1, "div", 111);
    \u0275\u0275elementStart(89, "button", 112);
    \u0275\u0275listener("click", function ShellComponent_Conditional_18_Template_button_click_89_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveEditChild());
    });
    \u0275\u0275conditionalCreate(90, ShellComponent_Conditional_18_Conditional_90_Template, 3, 1)(91, ShellComponent_Conditional_18_Conditional_91_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(92, "button", 113);
    \u0275\u0275listener("click", function ShellComponent_Conditional_18_Template_button_click_92_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showDeleteConfirm.set(true));
    });
    \u0275\u0275element(93, "lucide-icon", 114);
    \u0275\u0275text(94);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(95, ShellComponent_Conditional_18_Conditional_95_Template, 17, 5, "div", 115);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-labelledby", "edit-child-title");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["child.editProfile"], " ");
    \u0275\u0275advance();
    \u0275\u0275ariaProperty("aria-label", \u0275\u0275interpolate(ctx_r1.i18n.t()["child.cancel"]));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["child.fullName"], " ");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editName);
    \u0275\u0275property("ngClass", ctx_r1.editNameInvalid() ? "border-red-400 focus:ring-4 focus:ring-red-500/10 focus:border-red-500" : "border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.editNameInvalid() ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.editNameInvalid() ? 18 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["child.dateOfBirth"], " ");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editDob);
    \u0275\u0275property("placeholder", ctx_r1.i18n.locale() === "sq" ? "DD/MM/YYYY" : "MM/DD/YYYY");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["child.bloodType"], " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r1.editBloodType())("ngClass", ctx_r1.editBloodType() ? "border-teal-300 text-gray-800 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500" : "border-slate-200 text-gray-600 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500");
    \u0275\u0275advance(19);
    \u0275\u0275conditional(ctx_r1.editBloodType() ? 49 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.editBloodType() ? 51 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["child.gender"], " ");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editGender);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["childForm.gender.male"]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["childForm.gender.female"]);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["child.birthWeight"], " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editBirthWeight);
    \u0275\u0275property("placeholder", ctx_r1.i18n.t()["placeholder.birthWeight"]);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["child.deliveryDoctor"], " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editDeliveryDoctor);
    \u0275\u0275property("placeholder", ctx_r1.i18n.t()["placeholder.deliveryDoctor"]);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["child.criticalAllergies"]);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editChildAllergies);
    \u0275\u0275property("placeholder", ctx_r1.i18n.t()["placeholder.allergies"]);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["child.medicalNotes"]);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editChildMedicalNotes);
    \u0275\u0275property("placeholder", ctx_r1.i18n.t()["placeholder.medicalNotes"]);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t()["child.medicalDocument"]);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r1.i18n.t()["child.medicalDocument"]);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.documentError() ? 84 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.editChildDocument() ? 85 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.editChildDocument() ? 86 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.saveSuccess() ? 88 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.editNameInvalid() || ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.saving() ? 90 : 91);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t()["sidebar.deleteProfile"], " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showDeleteConfirm() ? 95 : -1);
  }
}
var ShellComponent = class _ShellComponent {
  ngOnInit() {
  }
  onActivate(componentRef) {
    if (componentRef.openEditChild && componentRef.openAddChild) {
      componentRef.openEditChild.subscribe((child) => this.openEditModal(child));
      componentRef.openAddChild.subscribe(() => this.isAddingChild.set(true));
    }
  }
  constructor() {
    this.dataService = inject(DataService);
    this.i18n = inject(I18nService);
    this.router = inject(Router);
    this.route = inject(ActivatedRoute);
    this.navigateHandler = (e) => {
      const route = e.detail;
      this.navigateTo(route);
    };
    this.isAddingChild = signal(false, ...ngDevMode ? [{ debugName: "isAddingChild" }] : (
      /* istanbul ignore next */
      []
    ));
    this.showChildModal = signal(false, ...ngDevMode ? [{ debugName: "showChildModal" }] : (
      /* istanbul ignore next */
      []
    ));
    this.showExportModal = signal(false, ...ngDevMode ? [{ debugName: "showExportModal" }] : (
      /* istanbul ignore next */
      []
    ));
    this.childrenLoading = signal(false, ...ngDevMode ? [{ debugName: "childrenLoading" }] : (
      /* istanbul ignore next */
      []
    ));
    this.mobileSidebarOpen = signal(false, ...ngDevMode ? [{ debugName: "mobileSidebarOpen" }] : (
      /* istanbul ignore next */
      []
    ));
    this.settingsSaved = signal(false, ...ngDevMode ? [{ debugName: "settingsSaved" }] : (
      /* istanbul ignore next */
      []
    ));
    this.viewState = signal(localStorage.getItem("kiddok_active_child") ? "app" : "selector", ...ngDevMode ? [{ debugName: "viewState" }] : (
      /* istanbul ignore next */
      []
    ));
    this.switching = signal(false, ...ngDevMode ? [{ debugName: "switching" }] : (
      /* istanbul ignore next */
      []
    ));
    this.editingChild = signal(null, ...ngDevMode ? [{ debugName: "editingChild" }] : (
      /* istanbul ignore next */
      []
    ));
    this.editName = "";
    this.editDob = "";
    this.editBloodType = signal("", ...ngDevMode ? [{ debugName: "editBloodType" }] : (
      /* istanbul ignore next */
      []
    ));
    this.editNameInvalid = signal(false, ...ngDevMode ? [{ debugName: "editNameInvalid" }] : (
      /* istanbul ignore next */
      []
    ));
    this.editNameTouched = signal(false, ...ngDevMode ? [{ debugName: "editNameTouched" }] : (
      /* istanbul ignore next */
      []
    ));
    this.editChildAllergies = "";
    this.editChildMedicalNotes = "";
    this.editChildDocument = signal(null, ...ngDevMode ? [{ debugName: "editChildDocument" }] : (
      /* istanbul ignore next */
      []
    ));
    this.editChildDocumentDate = "";
    this.documentError = signal(null, ...ngDevMode ? [{ debugName: "documentError" }] : (
      /* istanbul ignore next */
      []
    ));
    this.editBirthWeight = null;
    this.editDeliveryDoctor = "";
    this.editGender = "";
    this.saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : (
      /* istanbul ignore next */
      []
    ));
    this.showDeleteConfirm = signal(false, ...ngDevMode ? [{ debugName: "showDeleteConfirm" }] : (
      /* istanbul ignore next */
      []
    ));
    this.saveSuccess = signal(false, ...ngDevMode ? [{ debugName: "saveSuccess" }] : (
      /* istanbul ignore next */
      []
    ));
    this.originalDocument = signal(null, ...ngDevMode ? [{ debugName: "originalDocument" }] : (
      /* istanbul ignore next */
      []
    ));
    this.documentDirty = signal(false, ...ngDevMode ? [{ debugName: "documentDirty" }] : (
      /* istanbul ignore next */
      []
    ));
    this.addNameInvalid = signal(false, ...ngDevMode ? [{ debugName: "addNameInvalid" }] : (
      /* istanbul ignore next */
      []
    ));
    this.parentName = "";
    this.parentSurname = "";
    this.parentPhone = "";
    this.newChildName = "";
    this.newChildDob = "";
    this.newChildBirthWeight = null;
    this.newChildDeliveryDoctor = "";
    this.newChildGender = "";
    this.newChildBloodType = "";
    this.newChildAllergies = "";
    this.newChildMedicalNotes = "";
    this.newChildDocument = signal(null, ...ngDevMode ? [{ debugName: "newChildDocument" }] : (
      /* istanbul ignore next */
      []
    ));
    this.newChildDocumentDate = "";
    this.newChildDocumentError = signal(null, ...ngDevMode ? [{ debugName: "newChildDocumentError" }] : (
      /* istanbul ignore next */
      []
    ));
    this.currentTab = signal("home", ...ngDevMode ? [{ debugName: "currentTab" }] : (
      /* istanbul ignore next */
      []
    ));
    effect(() => {
      if (this.dataService.children().length > 0) {
        this.childrenLoading.set(false);
      }
    });
    window.addEventListener("kiddok:navigate", this.navigateHandler);
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
      const url = e.urlAfterRedirects || e.url;
      const parts = url.split("/").filter((p) => p);
      const tab = parts[parts.length - 1];
      if (tab && tab !== "login") {
        this.currentTab.set(tab);
        this.dataService.currentTab.set(tab);
      }
    });
  }
  ngOnDestroy() {
    window.removeEventListener("kiddok:navigate", this.navigateHandler);
  }
  onEscapeKey() {
    if (this.mobileSidebarOpen()) {
      this.mobileSidebarOpen.set(false);
    }
  }
  openExportModal() {
    this.showExportModal.set(true);
  }
  // ── Validation ────────────────────────────────────────────────
  /** Returns true if name contains only letters and spaces */
  isValidName(name) {
    return /^[a-zA-Z\s]+$/.test(name.trim()) && name.trim().length > 0;
  }
  /** Returns true if name has any non-alphabetic characters */
  hasNameError(name) {
    return name.length > 0 && !this.isValidName(name);
  }
  // Edit modal name handlers
  onEditNameInput(event) {
    const value = event.target.value;
    this.editName = value;
    this.editNameTouched.set(true);
    this.editNameInvalid.set(this.hasNameError(value));
  }
  onEditNameBlur() {
    this.editNameTouched.set(true);
    this.editNameInvalid.set(this.hasNameError(this.editName));
  }
  // Add child name handlers
  onAddNameInput(event) {
    const value = event.target.value;
    this.newChildName = value;
    this.addNameInvalid.set(this.hasNameError(value));
  }
  onAddNameBlur() {
    this.addNameInvalid.set(this.hasNameError(this.newChildName));
  }
  // ── Computed nav items ─────────────────────────────────────────
  get navItems() {
    const t = this.i18n.t();
    return [
      { id: "home", icon: "dashboard", label: t["nav.home"] },
      { id: "diary", icon: "edit_document", label: t["nav.diary"] },
      { id: "temperature", icon: "thermostat", label: t["nav.temperatureDiary"] },
      { id: "growth", icon: "show_chart", label: t["nav.growthTracking"] },
      { id: "records", icon: "vaccines", label: t["nav.records"] },
      { id: "medications", icon: "pill", label: t["nav.medications"] },
      { id: "settings", icon: "settings", label: t["nav.settings"] }
    ];
  }
  // ── Edit Modal ─────────────────────────────────────────────────
  openEditModal(child) {
    this.editingChild.set(child);
    this.editName = child.name;
    this.editDob = this.toDisplay(child.dateOfBirth, this.i18n.locale());
    this.editBloodType.set(child.bloodType || "");
    this.editNameInvalid.set(false);
    this.editNameTouched.set(false);
    this.editChildAllergies = child.criticalAllergies || "";
    this.editChildMedicalNotes = child.medicalNotes || "";
    this.editChildDocument.set(child.medicalDocument || null);
    this.editChildDocumentDate = child.documentIssueDate || "";
    this.documentError.set(null);
    this.editBirthWeight = child.birthWeight ?? null;
    this.editDeliveryDoctor = child.deliveryDoctor || "";
    this.editGender = child.gender || "";
    this.originalDocument.set(child.medicalDocument || null);
    this.documentDirty.set(false);
    this.showDeleteConfirm.set(false);
  }
  closeEditModal() {
    this.editingChild.set(null);
    this.editNameInvalid.set(false);
    this.editNameTouched.set(false);
    this.editChildAllergies = "";
    this.editChildMedicalNotes = "";
    this.editChildDocument.set(null);
    this.editChildDocumentDate = "";
    this.documentError.set(null);
    this.showDeleteConfirm.set(false);
  }
  saveEditChild() {
    const child = this.editingChild();
    if (!child)
      return;
    if (this.hasNameError(this.editName)) {
      this.editNameInvalid.set(true);
      this.editNameTouched.set(true);
      return;
    }
    if (!this.editName || !this.editDob)
      return;
    this.saving.set(true);
    const isoDate = this.toIso(this.editDob, this.i18n.locale());
    this.dataService.updateChildApi(child.id, {
      name: this.editName.trim(),
      dateOfBirth: isoDate,
      bloodType: this.editBloodType() || void 0,
      // Issue #1: use editBirthWeight and editDeliveryDoctor from form, not original object
      birthWeight: this.editBirthWeight ?? void 0,
      deliveryDoctor: this.editDeliveryDoctor || void 0,
      // Issue #7: include gender
      gender: this.editGender || void 0,
      criticalAllergies: this.editChildAllergies || void 0,
      medicalNotes: this.editChildMedicalNotes || void 0,
      // Issue #8: only send medicalDocument if it was actually changed (dirty flag)
      medicalDocument: this.documentDirty() ? this.editChildDocument() || void 0 : void 0,
      documentIssueDate: this.documentDirty() ? this.editChildDocumentDate || void 0 : void 0
    }).then(() => {
      this.saveSuccess.set(true);
      setTimeout(() => this.saveSuccess.set(false), 3e3);
      this.closeEditModal();
    }).catch(() => {
      console.error("Save failed");
    }).finally(() => {
      this.saving.set(false);
    });
  }
  onDocumentSelected(event) {
    const input = event.target;
    if (!input.files?.length)
      return;
    const file = input.files[0];
    if (file.size > 5 * 1024 * 1024) {
      this.documentError.set(this.i18n.t()["error.documentTooLarge"]);
      return;
    }
    if (!file.type.match(/pdf|image\//)) {
      this.documentError.set(this.i18n.t()["error.invalidDocType"]);
      return;
    }
    this.documentError.set(null);
    this.documentDirty.set(true);
    const reader = new FileReader();
    reader.onload = () => {
      this.editChildDocument.set(reader.result);
    };
    reader.readAsDataURL(file);
  }
  confirmDeleteChild() {
    const child = this.editingChild();
    if (!child)
      return;
    this.dataService.deleteChildApi(child.id).catch(() => {
      this.dataService.deleteChild(child.id);
    });
    this.closeEditModal();
  }
  // ── Parent Profile ─────────────────────────────────────────────
  loadParentIntoForm() {
    const p = this.dataService.parentProfile();
    this.parentName = p.name;
    this.parentSurname = p.surname;
    this.parentPhone = p.phone;
  }
  saveParentProfile() {
    this.dataService.saveParentProfile({
      name: this.parentName,
      surname: this.parentSurname,
      phone: this.parentPhone
    });
    this.settingsSaved.set(true);
    setTimeout(() => this.settingsSaved.set(false), 3e3);
  }
  // ── Navigation ─────────────────────────────────────────────────
  goToSelector() {
    this.viewState.set("selector");
    this.isAddingChild.set(false);
    this.currentTab.set("home");
  }
  selectChild(id) {
    this.switching.set(true);
    this.dataService.switchChild(id);
    this.viewState.set("app");
    setTimeout(() => this.switching.set(false), 400);
  }
  navigateTo(tabId) {
    this.router.navigate(["/", tabId], { replaceUrl: true });
  }
  // ── Add Child Form ─────────────────────────────────────────────
  submitNewChild() {
    if (this.hasNameError(this.newChildName)) {
      this.addNameInvalid.set(true);
      return;
    }
    if (!this.newChildName || !this.newChildDob)
      return;
    const isoDate = this.toIso(this.newChildDob, this.i18n.locale());
    this.dataService.createChild({
      name: this.newChildName.trim(),
      dateOfBirth: isoDate,
      birthWeight: this.newChildBirthWeight ?? void 0,
      deliveryDoctor: this.newChildDeliveryDoctor || void 0,
      gender: this.newChildGender || void 0,
      bloodType: this.newChildBloodType || void 0,
      criticalAllergies: this.newChildAllergies || void 0,
      medicalNotes: this.newChildMedicalNotes || void 0,
      medicalDocument: this.newChildDocument() || void 0,
      documentIssueDate: this.newChildDocumentDate || void 0
    }).then(() => {
      this.cancelAddChild();
    }).catch(() => {
      console.error("Create child failed");
    });
  }
  onNewChildDocumentSelected(event) {
    const input = event.target;
    if (!input.files?.length)
      return;
    const file = input.files[0];
    if (file.size > 5 * 1024 * 1024) {
      this.newChildDocumentError.set(this.i18n.t()["error.documentTooLarge"]);
      return;
    }
    if (!file.type.match(/pdf|image\//)) {
      this.newChildDocumentError.set(this.i18n.t()["error.invalidDocType"]);
      return;
    }
    this.newChildDocumentError.set(null);
    const reader = new FileReader();
    reader.onload = () => {
      this.newChildDocument.set(reader.result);
    };
    reader.readAsDataURL(file);
  }
  cancelAddChild() {
    this.isAddingChild.set(false);
    this.newChildName = "";
    this.newChildDob = "";
    this.newChildBirthWeight = null;
    this.newChildDeliveryDoctor = "";
    this.newChildGender = "";
    this.newChildBloodType = "";
    this.newChildAllergies = "";
    this.newChildMedicalNotes = "";
    this.newChildDocument.set(null);
    this.newChildDocumentDate = "";
    this.newChildDocumentError.set(null);
    this.addNameInvalid.set(false);
  }
  logout() {
    this.dataService.logout();
    this.router.navigate(["/login"]);
  }
  // ── Date Helpers ───────────────────────────────────────────────
  get datePattern() {
    return this.i18n.locale() === "sq" ? "dd/MM/yyyy" : "MM/dd/yyyy";
  }
  onDateInput(event, setter, locale) {
    const input = event.target;
    let val = input.value.replace(/[^\d]/g, "");
    if (locale === "sq") {
      if (val.length > 2)
        val = val.slice(0, 2) + "/" + val.slice(2);
      if (val.length > 5)
        val = val.slice(0, 5) + "/" + val.slice(5);
    } else {
      if (val.length > 2)
        val = val.slice(0, 2) + "/" + val.slice(2);
      if (val.length > 5)
        val = val.slice(0, 5) + "/" + val.slice(5);
    }
    if (val.length > 10)
      val = val.slice(0, 10);
    setter(val);
  }
  toIso(displayDate, locale) {
    if (!displayDate || !displayDate.includes("/"))
      return displayDate;
    const parts = displayDate.split("/");
    if (locale === "sq") {
      return parts[2] + "-" + parts[1] + "-" + parts[0];
    } else {
      return parts[2] + "-" + parts[0] + "-" + parts[1];
    }
  }
  toDisplay(yyyymmdd, locale) {
    if (!yyyymmdd || yyyymmdd.includes("/"))
      return yyyymmdd;
    const [y, m, d] = yyyymmdd.split("-");
    if (locale === "sq")
      return d + "/" + m + "/" + y;
    return m + "/" + d + "/" + y;
  }
  // ── Child Modal ───────────────────────────────────────────────
  closeModal() {
    this.showChildModal.set(false);
  }
  onChildSaved(child) {
    this.closeModal();
  }
  static {
    this.\u0275fac = function ShellComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ShellComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ShellComponent, selectors: [["app-shell"]], hostBindings: function ShellComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("keydown.escape", function ShellComponent_keydown_escape_HostBindingHandler() {
          return ctx.onEscapeKey();
        }, \u0275\u0275resolveDocument);
      }
    }, decls: 19, vars: 13, consts: [[1, "h-screen", "flex", "bg-background", "overflow-hidden", "relative", "font-sans"], [1, "hidden", "lg:block"], ["id", "main-content", 1, "flex-1", "flex", "flex-col", "h-screen", "overflow-hidden", "relative", "z-10", "w-full"], ["href", "#main-content", 1, "sr-only", "focus:not-sr-only", "focus:absolute", "focus:top-2", "focus:left-2", "focus:z-50", "focus:px-4", "focus:py-2", "focus:bg-primary-600", "focus:text-white", "focus:rounded-lg"], [3, "childSwitchRequested", "addChildRequested", "switchProfileRequested", "backRequested", "localeToggleRequested", "exportRequested", "menuToggleRequested", "currentTab", "viewState", "switching"], ["aria-live", "polite", "aria-atomic", "true", 1, "sr-only"], [1, "flex-1", "overflow-y-auto", "w-full", "px-4", "pt-6", "pb-24", "lg:px-12", "lg:py-10", "bg-slate-50/50", "relative"], [1, "glass", "max-w-3xl", "mx-auto", "rounded-[2rem]", "p-10", "lg:p-14", "animate-slide-up", "shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]", "border", "border-white"], [1, "animate-fade-in", "h-full"], [3, "childId", "isOpen"], [3, "mode", "child"], ["role", "dialog", "aria-modal", "true", 1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4"], ["aria-hidden", "true", 1, "fixed", "inset-0", "z-40", "bg-black/40", "backdrop-blur-sm", "lg:hidden", 3, "click"], [1, "fixed", "inset-y-0", "left-0", "z-50", "w-72", "shadow-2xl", "lg:hidden"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3", "gap-6"], [1, "h-full", "flex", "flex-col", "items-center", "justify-center", "text-center", "animate-slide-up", "max-w-lg", "mx-auto"], [1, "animate-slide-up"], [1, "bg-white", "rounded-[2rem]", "p-8", "shadow-md", "border", "border-slate-100", "animate-pulse"], [1, "flex", "items-center", "gap-5", "mb-5"], [1, "w-16", "h-16", "rounded-full", "bg-gray-200"], [1, "space-y-2"], [1, "w-32", "h-5", "bg-gray-200", "rounded"], [1, "w-20", "h-4", "bg-gray-100", "rounded"], [1, "h-10", "bg-gray-100", "rounded-2xl"], [1, "w-40", "h-40", "bg-gradient-to-tr", "from-primary-100", "to-teal-50", "text-primary-500", "rounded-full", "flex", "items-center", "justify-center", "mb-10", "shadow-glass", "border", "border-white"], ["name", "party-popper", 1, "opacity-80", 3, "size"], [1, "text-3xl", "lg:text-4xl", "font-extrabold", "text-gray-800", "mb-4", "tracking-tight"], [1, "text-gray-500", "text-lg", "mb-10", "leading-relaxed"], [1, "bg-slate-900", "hover:bg-primary-600", "text-white", "px-10", "py-5", "rounded-2xl", "font-bold", "shadow-[0_10px_20px_rgba(0,0,0,0.1)]", "transition-all", "transform", "hover:-translate-y-1", "flex", "items-center", "gap-3", "text-lg", "w-full", "sm:w-auto", "justify-center", 3, "click"], ["name", "plus", "aria-hidden", "true", 1, "bg-white/20", "rounded-full", "p-1"], [1, "text-3xl", "font-extrabold", "text-gray-800", "mb-2", "tracking-tight"], [1, "text-gray-500", "text-sm", "mb-10", "font-medium", "leading-relaxed"], [1, "bg-white", "rounded-[2rem]", "p-8", "shadow-md", "border", "border-slate-100", "hover:shadow-xl", "hover:border-primary-200", "transition-all", "group", "relative", "card-hover"], ["type", "button", 1, "bg-slate-50", "rounded-[2rem]", "p-8", "shadow-md", "border-2", "border-dashed", "border-slate-200", "hover:border-primary-300", "hover:bg-primary-50", "transition-all", "cursor-pointer", "flex", "flex-col", "items-center", "justify-center", "gap-4", "text-center", "group", "w-full", "text-left", 3, "click"], [1, "w-16", "h-16", "rounded-full", "bg-slate-100", "group-hover:bg-primary-100", "flex", "items-center", "justify-center", "transition-all"], ["name", "plus", "aria-hidden", "true", 1, "text-3xl", "text-slate-400", "group-hover:text-primary-500", "transition-colors"], [1, "font-bold", "text-slate-500", "group-hover:text-primary-600", "transition-colors", "text-base"], [1, "absolute", "top-5", "right-5", "w-9", "h-9", "rounded-xl", "bg-slate-50", "hover:bg-primary-50", "border", "border-slate-200", "hover:border-primary-300", "flex", "items-center", "justify-center", "text-slate-400", "hover:text-primary-600", "transition-all", "shadow-sm", 3, "click"], ["name", "pencil", "aria-hidden", "true", 1, "text-base"], [1, "cursor-pointer", 3, "click"], [1, "w-16", "h-16", "rounded-full", "border-4", "border-slate-100", "group-hover:border-primary-200", "transition-all", "shadow-sm", 3, "src"], [1, "font-extrabold", "text-xl", "text-gray-800", "group-hover:text-primary-700", "transition-colors"], [1, "text-sm", "text-gray-500", "font-medium"], [1, "flex", "items-center", "gap-2", "text-sm", "text-gray-500", "font-medium"], [1, "mt-5", "bg-gradient-to-r", "from-primary-50", "to-teal-50", "rounded-2xl", "p-4", "flex", "items-center", "justify-center", "gap-2", "text-primary-600", "font-bold", "group-hover:from-primary-100", "group-hover:to-teal-100", "transition-all", "cursor-pointer", 3, "click"], ["name", "log-in", 1, "text-lg"], ["name", "droplet", 1, "text-teal-500", "text-base"], [1, "text-3xl", "font-extrabold", "text-gray-800", "mb-10", "flex", "items-center", "gap-4"], ["name", "user-plus", "aria-hidden", "true", 1, "text-primary-500", "bg-primary-50", "p-3", "rounded-2xl"], [1, "space-y-8"], [1, "block", "text-sm", "font-bold", "text-primary-700", "mb-3", "ml-1", "tracking-wide", "uppercase", "text-xs"], ["type", "text", 1, "w-full", "px-5", "py-4.5", "rounded-2xl", "bg-white", "border-2", "transition-all", "text-lg", "text-gray-800", "placeholder-gray-300", 3, "ngModelChange", "input", "blur", "ngModel", "ngClass", "placeholder"], [1, "mt-2", "text-sm", "text-red-500", "font-medium", "flex", "items-center", "gap-1"], [1, "relative"], ["type", "text", "maxlength", "10", 1, "w-full", "px-5", "py-4.5", "pr-12", "rounded-2xl", "bg-white", "border-2", "border-slate-200", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-lg", "text-gray-600", "placeholder-gray-300", 3, "ngModelChange", "input", "ngModel", "placeholder"], ["type", "button", "onclick", "this.previousElementSibling.showPicker?.()", 1, "absolute", "right-3", "top-1/2", "-translate-y-1/2", "w-8", "h-8", "flex", "items-center", "justify-center", "rounded-xl", "text-slate-400", "hover:text-primary-500", "hover:bg-primary-50", "transition-all", "cursor-pointer"], ["name", "calendar", 1, "text-inherit"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-6"], ["type", "number", "step", "0.01", 1, "w-full", "px-5", "py-4.5", "rounded-2xl", "bg-white", "border-2", "border-slate-200", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-lg", "text-gray-600", "shadow-sm", "placeholder-gray-300", 3, "ngModelChange", "ngModel", "placeholder"], [1, "w-full", "px-5", "py-4.5", "rounded-2xl", "bg-white", "border-2", "transition-all", "text-lg", "shadow-sm", "appearance-none", 3, "ngModelChange", "ngModel", "ngClass"], ["value", ""], ["value", "A+"], ["value", "A-"], ["value", "B+"], ["value", "B-"], ["value", "AB+"], ["value", "AB-"], ["value", "O+"], ["value", "O-"], ["name", "badge-check", 1, "text-inherit"], ["name", "chevron-down", 1, "text-inherit"], [1, "w-full", "px-5", "py-4.5", "rounded-2xl", "bg-white", "border-2", "border-slate-200", "transition-all", "text-lg", "shadow-sm", "appearance-none", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", 3, "ngModelChange", "ngModel"], ["value", "M"], ["value", "F"], ["rows", "2", 1, "w-full", "px-5", "py-4", "rounded-2xl", "bg-white", "border-2", "border-slate-200", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-lg", "text-gray-800", "shadow-sm", "placeholder-gray-300", "resize-none", 3, "ngModelChange", "ngModel", "placeholder"], ["rows", "3", 1, "w-full", "px-5", "py-4", "rounded-2xl", "bg-white", "border-2", "border-slate-200", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-lg", "text-gray-800", "shadow-sm", "placeholder-gray-300", "resize-none", 3, "ngModelChange", "ngModel", "placeholder"], ["type", "file", "accept", ".pdf,image/*", 1, "w-full", "file:mr-4", "file:px-4", "file:py-2", "file:rounded-xl", "file:border-0", "file:bg-primary-50", "file:text-primary-700", "file:font-bold", "file:cursor-pointer", "text-sm", "text-gray-500", "cursor-pointer", 3, "change"], [1, "text-red-500", "text-xs", "mt-1"], [1, "text-teal-600", "text-xs", "mt-1", "flex", "items-center", "gap-1"], ["type", "text", 1, "w-full", "px-5", "py-4.5", "rounded-2xl", "bg-white", "border-2", "border-slate-200", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-lg", "text-gray-800", "shadow-sm", "placeholder-gray-300", 3, "ngModelChange", "ngModel", "placeholder"], [1, "flex", "flex-col", "sm:flex-row", "gap-4", "pt-6", "border-t", "border-gray-100", "mt-4"], ["type", "button", 1, "flex-1", "bg-gradient-to-r", "from-primary-600", "to-primary-500", "hover:from-primary-500", "hover:to-primary-400", "text-white", "py-4.5", "rounded-2xl", "font-bold", "hover:shadow-lg", "hover:-translate-y-0.5", "transition-all", "flex", "items-center", "justify-center", "gap-2", "text-lg", "shadow-md", 3, "click", "disabled"], ["name", "save", "aria-hidden", "true", 1, "text-inherit"], ["type", "button", 1, "px-8", "py-4.5", "bg-slate-100", "text-slate-600", "font-bold", "rounded-2xl", "hover:bg-slate-200", "transition-colors", "text-lg", "hover:-translate-y-0.5", 3, "click"], ["name", "alert-circle", 1, "text-inherit"], ["name", "check-circle", 1, "text-inherit"], ["type", "date", 1, "w-full", "px-5", "py-4", "rounded-2xl", "bg-white", "border-2", "border-slate-200", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-lg", "text-gray-600", "shadow-sm", 3, "ngModelChange", "ngModel"], [3, "activate"], [3, "closed", "childId", "isOpen"], [3, "saved", "cancelled", "mode", "child"], ["aria-hidden", "true", 1, "absolute", "inset-0", "bg-black/40", "backdrop-blur-sm", 3, "click"], [1, "relative", "z-10", "w-full", "max-w-md", "bg-white", "rounded-[2rem]", "shadow-[0_32px_80px_-12px_rgba(0,0,0,0.25)]", "border", "border-slate-100", "overflow-hidden", "animate-slide-up"], [1, "h-1.5", "bg-gradient-to-r", "from-primary-600", "via-primary-500", "to-teal-400"], [1, "p-10"], [1, "flex", "items-center", "justify-between", "mb-8"], ["id", "edit-child-title", 1, "text-2xl", "font-black", "text-gray-800", "flex", "items-center", "gap-3"], ["name", "pencil", "aria-hidden", "true", 1, "text-inherit"], ["type", "button", 1, "w-9", "h-9", "rounded-xl", "bg-slate-50", "hover:bg-slate-100", "flex", "items-center", "justify-center", "text-slate-400", "hover:text-slate-600", "transition-all", "shadow-sm", "border", "border-slate-200", 3, "click", "aria-label"], ["name", "x", "aria-hidden", "true", 1, "text-inherit"], [1, "space-y-6"], [1, "block", "text-xs", "font-bold", "text-primary-700", "mb-2.5", "ml-1", "uppercase", "tracking-wider"], ["type", "text", 1, "w-full", "px-5", "py-4", "rounded-2xl", "bg-slate-50", "border-2", "transition-all", "text-lg", "text-gray-800", "pr-10", 3, "ngModelChange", "input", "blur", "ngModel", "ngClass"], ["name", "alert-circle", 1, "absolute", "right-3", "top-1/2", "-translate-y-1/2", "text-red-400", "text-xl", "animate-fade-in"], ["type", "text", "maxlength", "10", 1, "w-full", "px-5", "py-4", "pr-12", "rounded-2xl", "bg-slate-50", "border-2", "border-slate-200", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-lg", "text-gray-600", "placeholder-gray-300", 3, "ngModelChange", "input", "ngModel", "placeholder"], [1, "w-full", "px-5", "py-4", "rounded-2xl", "bg-slate-50", "border-2", "transition-all", "text-lg", "shadow-sm", "appearance-none", 3, "ngModelChange", "ngModel", "ngClass"], [1, "absolute", "right-12", "top-1/2", "-translate-y-1/2", "flex", "items-center", "gap-1", "animate-fade-in"], [1, "mt-2", "text-xs", "text-teal-600", "font-medium", "flex", "items-center", "gap-1", "animate-fade-in"], [1, "w-full", "px-5", "py-4", "rounded-2xl", "bg-slate-50", "border-2", "border-slate-200", "transition-all", "text-lg", "shadow-sm", "appearance-none", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", 3, "ngModelChange", "ngModel"], ["type", "number", "step", "0.01", 1, "w-full", "px-5", "py-4", "rounded-2xl", "bg-slate-50", "border-2", "border-slate-200", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-lg", "text-gray-800", "shadow-sm", "placeholder-gray-300", 3, "ngModelChange", "ngModel", "placeholder"], ["type", "text", 1, "w-full", "px-5", "py-4", "rounded-2xl", "bg-slate-50", "border-2", "border-slate-200", "focus:bg-white", "focus:ring-4", "focus:ring-primary-500/10", "focus:border-primary-500", "outline-none", "transition-all", "text-lg", "text-gray-800", "shadow-sm", "placeholder-gray-300", 3, "ngModelChange", "ngModel", "placeholder"], [1, "flex", "flex-col", "gap-3", "pt-4", "border-t", "border-gray-100"], [1, "flex", "items-center", "gap-2", "p-3", "bg-teal-50", "border", "border-teal-200", "rounded-xl", "text-teal-700", "text-sm", "font-medium", "animate-fade-in"], ["type", "button", 1, "w-full", "bg-gradient-to-r", "from-primary-600", "to-primary-500", "hover:from-primary-500", "hover:to-primary-400", "text-white", "py-4", "rounded-2xl", "font-bold", "hover:shadow-lg", "hover:-translate-y-0.5", "transition-all", "flex", "items-center", "justify-center", "gap-2", "text-base", "shadow-md", "disabled:opacity-50", "disabled:cursor-not-allowed", "disabled:transform-none", 3, "click", "disabled"], ["type", "button", 1, "w-full", "border-2", "border-red-200", "text-red-500", "hover:bg-red-50", "hover:border-red-300", "py-3.5", "rounded-2xl", "font-bold", "transition-all", "flex", "items-center", "justify-center", "gap-2", "text-sm", 3, "click"], ["name", "trash-2", "aria-hidden", "true", 1, "text-inherit"], [1, "mt-4", "p-5", "bg-red-50", "border-2", "border-red-200", "rounded-2xl", "animate-fade-in"], ["name", "loader", "aria-hidden", "true", 1, "text-inherit"], [1, "flex", "items-center", "gap-3", "mb-3"], [1, "w-10", "h-10", "bg-red-100", "rounded-full", "flex", "items-center", "justify-center"], ["name", "alert-triangle", 1, "text-inherit"], [1, "font-bold", "text-gray-800", "text-base"], [1, "text-sm", "text-gray-500"], [1, "text-sm", "text-gray-600", "mb-5"], [1, "flex", "gap-3"], ["type", "button", 1, "flex-1", "py-3", "rounded-xl", "border-2", "border-slate-200", "text-gray-600", "font-bold", "hover:bg-slate-100", "transition-all", "text-sm", 3, "click"], ["type", "button", 1, "flex-1", "py-3", "rounded-xl", "bg-gradient-to-r", "from-red-500", "to-red-400", "text-white", "font-bold", "hover:from-red-400", "hover:to-red-300", "transition-all", "text-sm", "shadow-sm", "flex", "items-center", "justify-center", "gap-2", 3, "click"], ["name", "trash", "aria-hidden", "true", 1, "text-inherit"]], template: function ShellComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275conditionalCreate(1, ShellComponent_Conditional_1_Template, 2, 0);
        \u0275\u0275element(2, "app-sidebar", 1);
        \u0275\u0275elementStart(3, "main", 2)(4, "a", 3);
        \u0275\u0275text(5, "Skip to main content");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "app-header", 4);
        \u0275\u0275listener("childSwitchRequested", function ShellComponent_Template_app_header_childSwitchRequested_6_listener($event) {
          return ctx.selectChild($event);
        })("addChildRequested", function ShellComponent_Template_app_header_addChildRequested_6_listener() {
          return ctx.showChildModal.set(true);
        })("switchProfileRequested", function ShellComponent_Template_app_header_switchProfileRequested_6_listener() {
          return ctx.goToSelector();
        })("backRequested", function ShellComponent_Template_app_header_backRequested_6_listener() {
          return ctx.goToSelector();
        })("localeToggleRequested", function ShellComponent_Template_app_header_localeToggleRequested_6_listener() {
          return ctx.i18n.toggleLocale();
        })("exportRequested", function ShellComponent_Template_app_header_exportRequested_6_listener() {
          return ctx.openExportModal();
        })("menuToggleRequested", function ShellComponent_Template_app_header_menuToggleRequested_6_listener() {
          return ctx.mobileSidebarOpen.set(!ctx.mobileSidebarOpen());
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 5);
        \u0275\u0275conditionalCreate(8, ShellComponent_Conditional_8_Template, 2, 1, "span");
        \u0275\u0275elementEnd();
        \u0275\u0275element(9, "app-offline-indicator");
        \u0275\u0275elementStart(10, "div", 6);
        \u0275\u0275conditionalCreate(11, ShellComponent_Conditional_11_Template, 3, 2)(12, ShellComponent_Conditional_12_Template, 84, 37, "div", 7)(13, ShellComponent_Conditional_13_Template, 2, 0, "div", 8);
        \u0275\u0275elementEnd()();
        \u0275\u0275element(14, "app-onboarding-tour")(15, "app-bottom-nav");
        \u0275\u0275conditionalCreate(16, ShellComponent_Conditional_16_Template, 1, 2, "app-export-modal", 9);
        \u0275\u0275conditionalCreate(17, ShellComponent_Conditional_17_Template, 1, 2, "app-add-edit-child-modal", 10);
        \u0275\u0275conditionalCreate(18, ShellComponent_Conditional_18_Template, 96, 43, "div", 11);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.mobileSidebarOpen() ? 1 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275property("currentTab", ctx.currentTab())("viewState", ctx.viewState())("switching", ctx.switching());
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.saveSuccess() ? 8 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275classProp("animate-fade-in", ctx.viewState() === "app" && ctx.switching())("animate-slide-up", ctx.viewState() === "selector" || ctx.isAddingChild());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.viewState() === "selector" ? 11 : ctx.isAddingChild() ? 12 : 13);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(ctx.showExportModal() ? 16 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.showChildModal() ? 17 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.editingChild() ? 18 : -1);
      }
    }, dependencies: [CommonModule, NgClass, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MaxLengthValidator, NgModel, LucideAngularModule, LucideAngularComponent, SidebarComponent, HeaderComponent, BottomNavComponent, AddEditChildModalComponent, OnboardingTourComponent, OfflineIndicatorComponent, ExportModalComponent, RouterOutlet], styles: ["\n.pb-safe[_ngcontent-%COMP%] {\n  padding-bottom: env(safe-area-inset-bottom, 1rem);\n}\n.card-hover[_ngcontent-%COMP%] {\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.card-hover[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15);\n}\nbutton[_ngcontent-%COMP%]:not(:disabled):active {\n  transform: scale(0.98);\n}\n.success-flash[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_success-flash 0.6s ease-out;\n}\n@keyframes _ngcontent-%COMP%_success-flash {\n  0% {\n    background-color: #d1fae5;\n  }\n  100% {\n    background-color: transparent;\n  }\n}\n.animate-slide-up[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_slideUp 0.35s ease-out;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(16px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.animate-fade-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=shell.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShellComponent, [{
    type: Component,
    args: [{ selector: "app-shell", changeDetection: ChangeDetectionStrategy.OnPush, imports: [CommonModule, FormsModule, LucideAngularModule, SidebarComponent, HeaderComponent, BottomNavComponent, AddEditChildModalComponent, OnboardingTourComponent, OfflineIndicatorComponent, ExportModalComponent, RouterOutlet], template: `

    <div class="h-screen flex bg-background overflow-hidden relative font-sans">

      <!-- Sprint 8: Mobile Sidebar Overlay (lg:hidden) -->
      @if (mobileSidebarOpen()) {
        <!-- Backdrop -->
        <div class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
             (click)="mobileSidebarOpen.set(false)"
             aria-hidden="true"></div>
        <!-- Sidebar panel -->
        <app-sidebar class="fixed inset-y-0 left-0 z-50 w-72 shadow-2xl lg:hidden" />
      }

      <!-- Desktop Sidebar -->
      <app-sidebar class="hidden lg:block" />

      <!-- Main Content Area -->
      <main class="flex-1 flex flex-col h-screen overflow-hidden relative z-10 w-full" id="main-content">

        <!-- Skip to main content link for keyboard users -->
        <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg">Skip to main content</a>

        <!-- Top Header (extracted to HeaderComponent) -->
        <app-header
          [currentTab]="currentTab()"
          [viewState]="viewState()"
          (childSwitchRequested)="selectChild($event)"
          (addChildRequested)="showChildModal.set(true)"
          (switchProfileRequested)="goToSelector()"
          (backRequested)="goToSelector()"
          (localeToggleRequested)="i18n.toggleLocale()"
          (exportRequested)="openExportModal()"
          (menuToggleRequested)="mobileSidebarOpen.set(!mobileSidebarOpen())"
          [switching]="switching()"
        />

        <!-- Live region for dynamic announcements -->
        <div aria-live="polite" aria-atomic="true" class="sr-only">
          @if (saveSuccess()) {
            <span>{{ i18n.t()['child.saveSuccess'] }}</span>
          }
        </div>

        <!-- Offline Indicator Banner -->
        <app-offline-indicator />

        <!-- Main Workspace -->
        <div class="flex-1 overflow-y-auto w-full px-4 pt-6 pb-24 lg:px-12 lg:py-10 bg-slate-50/50 relative"
             [class.animate-fade-in]="viewState() === 'app' && switching()"
             [class.animate-slide-up]="viewState() === 'selector' || isAddingChild()">

          <!-- ===== CHILD SELECTOR SCREEN ===== -->
          @if (viewState() === 'selector') {
            <!-- Sprint 8: Children Loading Skeleton -->
            @if (childrenLoading()) {
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                @for (i of [1,2]; track i) {
                  <div class="bg-white rounded-[2rem] p-8 shadow-md border border-slate-100 animate-pulse">
                    <div class="flex items-center gap-5 mb-5">
                      <div class="w-16 h-16 rounded-full bg-gray-200"></div>
                      <div class="space-y-2">
                        <div class="w-32 h-5 bg-gray-200 rounded"></div>
                        <div class="w-20 h-4 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                    <div class="h-10 bg-gray-100 rounded-2xl"></div>
                  </div>
                }
              </div>
            }
            @if (dataService.children().length === 0 && !isAddingChild()) {
              <div class="h-full flex flex-col items-center justify-center text-center animate-slide-up max-w-lg mx-auto">
                <div class="w-40 h-40 bg-gradient-to-tr from-primary-100 to-teal-50 text-primary-500 rounded-full flex items-center justify-center mb-10 shadow-glass border border-white">
                  <lucide-icon name="party-popper" [size]="80" class="opacity-80"></lucide-icon>
                </div>
                <h2 class="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">{{ i18n.t()['child.welcome'] }}</h2>
                <p class="text-gray-500 text-lg mb-10 leading-relaxed">{{ i18n.t()['child.welcomeSub'] }}</p>
                <button (click)="isAddingChild.set(true)" class="bg-slate-900 hover:bg-primary-600 text-white px-10 py-5 rounded-2xl font-bold shadow-[0_10px_20px_rgba(0,0,0,0.1)] transition-all transform hover:-translate-y-1 flex items-center gap-3 text-lg w-full sm:w-auto justify-center">
                  <lucide-icon name="plus" class="bg-white/20 rounded-full p-1" aria-hidden="true"></lucide-icon> {{ i18n.t()['child.addNew'] }}
                </button>
              </div>
            } @else {
              <div class="animate-slide-up">
                <h2 class="text-3xl font-extrabold text-gray-800 mb-2 tracking-tight">{{ i18n.t()['child.selectChild'] }}</h2>
                <p class="text-gray-500 text-sm mb-10 font-medium leading-relaxed">{{ i18n.t()['sidebar.selectChildToContinue'] }}</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  @for (child of dataService.children(); track child.id) {
                    <div class="bg-white rounded-[2rem] p-8 shadow-md border border-slate-100 hover:shadow-xl hover:border-primary-200 transition-all group relative card-hover">
                      <button (click)="openEditModal(child)"
                              class="absolute top-5 right-5 w-9 h-9 rounded-xl bg-slate-50 hover:bg-primary-50 border border-slate-200 hover:border-primary-300 flex items-center justify-center text-slate-400 hover:text-primary-600 transition-all shadow-sm"
                              [attr.aria-label]="i18n.t()['child.editProfile']">
                        <lucide-icon name="pencil" class="text-base" aria-hidden="true"></lucide-icon>
                      </button>
                      <div (click)="selectChild(child.id)" class="cursor-pointer">
                        <div class="flex items-center gap-5 mb-5">
                          <img [src]="child.avatarUrl" class="w-16 h-16 rounded-full border-4 border-slate-100 group-hover:border-primary-200 transition-all shadow-sm" />
                          <div>
                            <h3 class="font-extrabold text-xl text-gray-800 group-hover:text-primary-700 transition-colors">{{ child.name }}</h3>
                            <p class="text-sm text-gray-500 font-medium">{{ toDisplay(child.dateOfBirth, i18n.locale()) }}</p>
                          </div>
                        </div>
                        @if (child.bloodType) {
                          <div class="flex items-center gap-2 text-sm text-gray-500 font-medium">
                            <lucide-icon name="droplet" class="text-teal-500 text-base"></lucide-icon>
                            {{ child.bloodType }}
                          </div>
                        }
                      </div>
                      <div (click)="selectChild(child.id)" class="mt-5 bg-gradient-to-r from-primary-50 to-teal-50 rounded-2xl p-4 flex items-center justify-center gap-2 text-primary-600 font-bold group-hover:from-primary-100 group-hover:to-teal-100 transition-all cursor-pointer">
                        <lucide-icon name="log-in" class="text-lg"></lucide-icon>
                        {{ i18n.t()['sidebar.openProfile'] }}
                      </div>
                    </div>
                  }
                  <button type="button" (click)="isAddingChild.set(true)"
                          class="bg-slate-50 rounded-[2rem] p-8 shadow-md border-2 border-dashed border-slate-200 hover:border-primary-300 hover:bg-primary-50 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 text-center group w-full text-left">
                    <div class="w-16 h-16 rounded-full bg-slate-100 group-hover:bg-primary-100 flex items-center justify-center transition-all">
                      <lucide-icon name="plus" class="text-3xl text-slate-400 group-hover:text-primary-500 transition-colors" aria-hidden="true"></lucide-icon>
                    </div>
                    <p class="font-bold text-slate-500 group-hover:text-primary-600 transition-colors text-base">
                      {{ i18n.t()['child.addNewBtn'] }}
                    </p>
                  </button>
                </div>
              </div>
            }
          }

          <!-- ===== ADD CHILD FORM ===== -->
          @else if (isAddingChild()) {
            <div class="glass max-w-3xl mx-auto rounded-[2rem] p-10 lg:p-14 animate-slide-up shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white">
              <h2 class="text-3xl font-extrabold text-gray-800 mb-10 flex items-center gap-4">
                <lucide-icon name="user-plus" class="text-primary-500 bg-primary-50 p-3 rounded-2xl" aria-hidden="true"></lucide-icon>
                {{ i18n.t()['child.addNew'] }}
              </h2>
              <div class="space-y-8">
                <div>
                  <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()['child.fullName'] }}</label>
                  <input type="text" [(ngModel)]="newChildName"
                         class="w-full px-5 py-4.5 rounded-2xl bg-white border-2 transition-all text-lg text-gray-800 placeholder-gray-300"
                         [ngClass]="addNameInvalid() ? 'border-red-400 focus:ring-4 focus:ring-red-500/10 focus:border-red-500' : 'border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500'"
                         [placeholder]="i18n.t()['placeholder.fullName']"
                         (input)="onAddNameInput($event)"
                         (blur)="onAddNameBlur()">
                  @if (addNameInvalid()) {
                    <p class="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                      <lucide-icon name="alert-circle" class="text-inherit"></lucide-icon>
                      {{ i18n.isSq() ? 'Emri mund t\xEB p\xEBrmbaj\xEB vet\xEBm shkronja.' : 'Name can only contain letters.' }}
                    </p>
                  }
                </div>
                <div>
                  <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()['child.dateOfBirth'] }}</label>
                  <div class="relative">
                    <input type="text" [(ngModel)]="newChildDob" (input)="onDateInput($event, v => newChildDob = v, i18n.locale())"
                           [placeholder]="i18n.locale() === 'sq' ? 'DD/MM/YYYY' : 'MM/DD/YYYY'" maxlength="10"
                           class="w-full px-5 py-4.5 pr-12 rounded-2xl bg-white border-2 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-600 placeholder-gray-300">
                    <button type="button" onclick="this.previousElementSibling.showPicker?.()"
                            class="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-primary-500 hover:bg-primary-50 transition-all cursor-pointer">
                      <lucide-icon name="calendar" class="text-inherit"></lucide-icon>
                    </button>
                  </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()['child.birthWeight'] }}</label>
                    <input type="number" step="0.01" [(ngModel)]="newChildBirthWeight"
                           class="w-full px-5 py-4.5 rounded-2xl bg-white border-2 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-600 shadow-sm placeholder-gray-300"
                           [placeholder]="i18n.t()['placeholder.birthWeight']">
                  </div>
                  <div>
                    <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()['child.bloodType'] }}</label>
                    <div class="relative">
                      <select [(ngModel)]="newChildBloodType"
                              class="w-full px-5 py-4.5 rounded-2xl bg-white border-2 transition-all text-lg shadow-sm appearance-none"
                              [ngClass]="newChildBloodType ? 'border-teal-300 text-gray-800 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500' : 'border-slate-200 text-gray-600 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500'">
                        <option value="">--</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                      <!-- Blood type verified badge -->
                      @if (newChildBloodType) {
                        <lucide-icon name="badge-check" class="text-inherit"></lucide-icon>
                      }
                      <lucide-icon name="chevron-down" class="text-inherit"></lucide-icon>
                    </div>
                  </div>
                </div>

                <!-- Issue #7: Gender in Add form -->
                <div>
                  <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">
                    {{ i18n.t()['child.gender'] }}
                  </label>
                  <div class="relative">
                    <select [(ngModel)]="newChildGender"
                            class="w-full px-5 py-4.5 rounded-2xl bg-white border-2 border-slate-200 transition-all text-lg shadow-sm appearance-none focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500">
                      <option value="">--</option>
                      <option value="M">{{ i18n.t()['childForm.gender.male'] }}</option>
                      <option value="F">{{ i18n.t()['childForm.gender.female'] }}</option>
                    </select>
                    <lucide-icon name="chevron-down" class="text-inherit"></lucide-icon>
                  </div>
                </div>

                <!-- Critical Allergies -->
                <div>
                  <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()['child.criticalAllergies'] }}</label>
                  <textarea [(ngModel)]="newChildAllergies" rows="2"
                    class="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-200 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-800 shadow-sm placeholder-gray-300 resize-none"
                    [placeholder]="i18n.t()['placeholder.allergies']"></textarea>
                </div>

                <!-- Medical Notes -->
                <div>
                  <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()['child.medicalNotes'] }}</label>
                  <textarea [(ngModel)]="newChildMedicalNotes" rows="3"
                    class="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-200 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-800 shadow-sm placeholder-gray-300 resize-none"
                    [placeholder]="i18n.t()['placeholder.medicalNotes']"></textarea>
                </div>

                <!-- Medical Document Upload -->
                <div>
                  <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()['child.medicalDocument'] }}</label>
                  <input type="file" accept=".pdf,image/*" (change)="onNewChildDocumentSelected($event)"
                    class="w-full file:mr-4 file:px-4 file:py-2 file:rounded-xl file:border-0 file:bg-primary-50 file:text-primary-700 file:font-bold file:cursor-pointer text-sm text-gray-500 cursor-pointer"
                    [attr.aria-label]="i18n.t()['child.medicalDocument']">
                  @if (newChildDocumentError()) {
                    <p class="text-red-500 text-xs mt-1">{{ newChildDocumentError() }}</p>
                  }
                  @if (newChildDocument()) {
                    <p class="text-teal-600 text-xs mt-1 flex items-center gap-1"><lucide-icon name="check-circle" class="text-inherit"></lucide-icon> {{ i18n.t()['child.documentAttached'] }}</p>
                  }
                </div>

                <!-- Document Issue Date -->
                @if (newChildDocument()) {
                  <div>
                    <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()['child.documentIssueDate'] }}</label>
                    <input type="date" [(ngModel)]="newChildDocumentDate"
                      class="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-200 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-600 shadow-sm">
                  </div>
                }
                <div>
                  <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()['child.deliveryDoctor'] }}</label>
                  <input type="text" [(ngModel)]="newChildDeliveryDoctor"
                         class="w-full px-5 py-4.5 rounded-2xl bg-white border-2 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-800 shadow-sm placeholder-gray-300"
                         [placeholder]="i18n.t()['placeholder.deliveryDoctor']">
                </div>
                <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100 mt-4">
                  <button type="button" (click)="submitNewChild()"
                          class="flex-1 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white py-4.5 rounded-2xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-lg shadow-md"
                          [disabled]="addNameInvalid() && newChildName.length > 0">
                    <lucide-icon name="save" class="text-inherit" aria-hidden="true"></lucide-icon> {{ i18n.t()['child.saveProfile'] }}
                  </button>
                  <button type="button" (click)="cancelAddChild()"
                          class="px-8 py-4.5 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-colors text-lg hover:-translate-y-0.5">{{ i18n.t()['child.cancel'] }}</button>
                </div>
              </div>
            </div>
          }

          <!-- ===== MAIN APP VIEW ===== -->
          @else {
            <div class="animate-fade-in h-full">
              <router-outlet (activate)="onActivate($event)"></router-outlet>
            </div>
          }
        </div>
      </main>

      <!-- Onboarding Tour (Sprint 22) \u2014 shown once on first visit -->
      <app-onboarding-tour />

      <!-- Bottom Nav (Mobile) -->
      <app-bottom-nav />

      <!-- Export Modal (Sprint 5) -->
      @if (showExportModal()) {
        <app-export-modal
          [childId]="dataService.activeChildId()!"
          [isOpen]="showExportModal()"
          (closed)="showExportModal.set(false)"
        />
      }

      <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
           ADD/EDIT CHILD MODAL (Sprint 7 \u2014 3-step wizard)
           \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
      @if (showChildModal()) {
        <app-add-edit-child-modal
          [mode]="isAddingChild() ? 'add' : 'edit'"
          [child]="editingChild() ?? undefined"
          (saved)="onChildSaved($event)"
          (cancelled)="closeModal()"
        />
      }

      <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
           EDIT CHILD MODAL (Overlay)
           \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
      @if (editingChild()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" [attr.aria-labelledby]="'edit-child-title'">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" (click)="closeEditModal()" aria-hidden="true"></div>

          <!-- Modal Card -->
          <div class="relative z-10 w-full max-w-md bg-white rounded-[2rem] shadow-[0_32px_80px_-12px_rgba(0,0,0,0.25)] border border-slate-100 overflow-hidden animate-slide-up">

            <!-- Top accent -->
            <div class="h-1.5 bg-gradient-to-r from-primary-600 via-primary-500 to-teal-400"></div>

            <div class="p-10">

              <!-- Header -->
              <div class="flex items-center justify-between mb-8">
                <h2 id="edit-child-title" class="text-2xl font-black text-gray-800 flex items-center gap-3">
                  <lucide-icon name="pencil" class="text-inherit" aria-hidden="true"></lucide-icon>
                  {{ i18n.t()['child.editProfile'] }}
                </h2>
                <button type="button" (click)="closeEditModal()"
                        class="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all shadow-sm border border-slate-200"
                        aria-label="{{ i18n.t()['child.cancel'] }}">
                  <lucide-icon name="x" class="text-inherit" aria-hidden="true"></lucide-icon>
                </button>
              </div>

              <div class="space-y-6">

                <!-- Name -->
                <div>
                  <label class="block text-xs font-bold text-primary-700 mb-2.5 ml-1 uppercase tracking-wider">
                    {{ i18n.t()['child.fullName'] }}
                  </label>
                  <div class="relative">
                    <input type="text" [(ngModel)]="editName"
                           (input)="onEditNameInput($event)"
                           (blur)="onEditNameBlur()"
                           class="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 transition-all text-lg text-gray-800 pr-10"
                           [ngClass]="editNameInvalid() ? 'border-red-400 focus:ring-4 focus:ring-red-500/10 focus:border-red-500' : 'border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500'">
                    <!-- Invalid indicator icon -->
                    @if (editNameInvalid()) {
                      <lucide-icon name="alert-circle" class="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 text-xl animate-fade-in"></lucide-icon>
                    }
                  </div>
                  @if (editNameInvalid()) {
                    <p class="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                      <lucide-icon name="alert-circle" class="text-inherit"></lucide-icon>
                      {{ i18n.isSq() ? 'Emri mund t\xEB p\xEBrmbaj\xEB vet\xEBm shkronja.' : 'Name can only contain letters.' }}
                    </p>
                  }
                </div>

                <!-- Date of Birth -->
                <div>
                  <label class="block text-xs font-bold text-primary-700 mb-2.5 ml-1 uppercase tracking-wider">
                    {{ i18n.t()['child.dateOfBirth'] }}
                  </label>
                  <div class="relative">
                    <input type="text" [(ngModel)]="editDob" (input)="onDateInput($event, v => editDob = v, i18n.locale())"
                           [placeholder]="i18n.locale() === 'sq' ? 'DD/MM/YYYY' : 'MM/DD/YYYY'" maxlength="10"
                           class="w-full px-5 py-4 pr-12 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-600 placeholder-gray-300">
                    <button type="button" onclick="this.previousElementSibling.showPicker?.()"
                            class="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-primary-500 hover:bg-primary-50 transition-all cursor-pointer">
                      <lucide-icon name="calendar" class="text-inherit"></lucide-icon>
                    </button>
                  </div>
                </div>

                <!-- Blood Type with Verification Badge -->
                <div>
                  <label class="block text-xs font-bold text-primary-700 mb-2.5 ml-1 uppercase tracking-wider">
                    {{ i18n.t()['child.bloodType'] }}
                  </label>
                  <div class="relative">
                    <select [ngModel]="editBloodType()" (ngModelChange)="editBloodType.set($event)"
                            class="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 transition-all text-lg shadow-sm appearance-none"
                            [ngClass]="editBloodType() ? 'border-teal-300 text-gray-800 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500' : 'border-slate-200 text-gray-600 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500'">
                      <option value="">--</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                    <!-- Blood type verified badge (green checkmark) -->
                    @if (editBloodType()) {
                      <span class="absolute right-12 top-1/2 -translate-y-1/2 flex items-center gap-1 animate-fade-in">
                        <lucide-icon name="badge-check" class="text-inherit"></lucide-icon>
                      </span>
                    }
                    <lucide-icon name="chevron-down" class="text-inherit"></lucide-icon>
                  </div>
                  @if (editBloodType()) {
                    <p class="mt-2 text-xs text-teal-600 font-medium flex items-center gap-1 animate-fade-in">
                      <lucide-icon name="badge-check" class="text-inherit"></lucide-icon>
                      {{ i18n.isSq() ? 'Grupi i gjakut u verifikua.' : 'Blood type verified.' }}
                    </p>
                  }
                </div>

                <!-- Issue #7: Gender -->
                <div>
                  <label class="block text-xs font-bold text-primary-700 mb-2.5 ml-1 uppercase tracking-wider">
                    {{ i18n.t()['child.gender'] }}
                  </label>
                  <div class="relative">
                    <select [(ngModel)]="editGender"
                            class="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200 transition-all text-lg shadow-sm appearance-none focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500">
                      <option value="">--</option>
                      <option value="M">{{ i18n.t()['childForm.gender.male'] }}</option>
                      <option value="F">{{ i18n.t()['childForm.gender.female'] }}</option>
                    </select>
                    <lucide-icon name="chevron-down" class="text-inherit"></lucide-icon>
                  </div>
                </div>

                <!-- Issue #1: Birth Weight -->
                <div>
                  <label class="block text-xs font-bold text-primary-700 mb-2.5 ml-1 uppercase tracking-wider">
                    {{ i18n.t()['child.birthWeight'] }}
                  </label>
                  <input type="number" step="0.01" [(ngModel)]="editBirthWeight"
                         class="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-800 shadow-sm placeholder-gray-300"
                         [placeholder]="i18n.t()['placeholder.birthWeight']">
                </div>

                <!-- Issue #1: Delivery Doctor -->
                <div>
                  <label class="block text-xs font-bold text-primary-700 mb-2.5 ml-1 uppercase tracking-wider">
                    {{ i18n.t()['child.deliveryDoctor'] }}
                  </label>
                  <input type="text" [(ngModel)]="editDeliveryDoctor"
                         class="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-800 shadow-sm placeholder-gray-300"
                         [placeholder]="i18n.t()['placeholder.deliveryDoctor']">
                </div>

                <!-- Critical Allergies -->
                <div>
                  <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()['child.criticalAllergies'] }}</label>
                  <textarea [(ngModel)]="editChildAllergies" rows="2"
                    class="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-200 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-800 shadow-sm placeholder-gray-300 resize-none"
                    [placeholder]="i18n.t()['placeholder.allergies']"></textarea>
                </div>

                <!-- Medical Notes -->
                <div>
                  <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()['child.medicalNotes'] }}</label>
                  <textarea [(ngModel)]="editChildMedicalNotes" rows="3"
                    class="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-200 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-800 shadow-sm placeholder-gray-300 resize-none"
                    [placeholder]="i18n.t()['placeholder.medicalNotes']"></textarea>
                </div>

                <!-- Medical Document Upload -->
                <div>
                  <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()['child.medicalDocument'] }}</label>
                  <input type="file" accept=".pdf,image/*" (change)="onDocumentSelected($event)"
                    class="w-full file:mr-4 file:px-4 file:py-2 file:rounded-xl file:border-0 file:bg-primary-50 file:text-primary-700 file:font-bold file:cursor-pointer text-sm text-gray-500 cursor-pointer"
                    [attr.aria-label]="i18n.t()['child.medicalDocument']">
                  @if (documentError()) {
                    <p class="text-red-500 text-xs mt-1">{{ documentError() }}</p>
                  }
                  @if (editChildDocument()) {
                    <p class="text-teal-600 text-xs mt-1 flex items-center gap-1"><lucide-icon name="check-circle" class="text-inherit"></lucide-icon> {{ i18n.t()['child.documentAttached'] }}</p>
                  }
                </div>

                <!-- Document Issue Date -->
                @if (editChildDocument()) {
                  <div>
                    <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()['child.documentIssueDate'] }}</label>
                    <input type="date" [(ngModel)]="editChildDocumentDate"
                      class="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-200 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-600 shadow-sm">
                  </div>
                }

                <!-- Actions -->
                <div class="flex flex-col gap-3 pt-4 border-t border-gray-100">
                  <!-- Issue #9: Success Toast -->
                  @if (saveSuccess()) {
                    <div class="flex items-center gap-2 p-3 bg-teal-50 border border-teal-200 rounded-xl text-teal-700 text-sm font-medium animate-fade-in">
                      <lucide-icon name="check-circle" class="text-inherit"></lucide-icon>
                      {{ i18n.t()['child.saveSuccess'] }}
                    </div>
                  }
                  <button type="button" (click)="saveEditChild()"
                          class="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white py-4 rounded-2xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-base shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                          [disabled]="editNameInvalid() || saving()">
                    @if (saving()) {
                      <lucide-icon name="loader" class="text-inherit" aria-hidden="true"></lucide-icon>
                      <span>{{ i18n.t()['child.saving'] }}</span>
                    } @else {
                      <lucide-icon name="save" class="text-inherit" aria-hidden="true"></lucide-icon>
                      {{ i18n.t()['sidebar.saveChanges'] }}
                    }
                  </button>
                  <button type="button" (click)="showDeleteConfirm.set(true)"
                          class="w-full border-2 border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 py-3.5 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 text-sm">
                    <lucide-icon name="trash-2" class="text-inherit" aria-hidden="true"></lucide-icon>
                    {{ i18n.t()['sidebar.deleteProfile'] }}
                  </button>
                </div>
                <!-- Delete Confirmation Modal (Issue #5) -->
                @if (showDeleteConfirm()) {
                  <div class="mt-4 p-5 bg-red-50 border-2 border-red-200 rounded-2xl animate-fade-in">
                    <div class="flex items-center gap-3 mb-3">
                      <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <lucide-icon name="alert-triangle" class="text-inherit"></lucide-icon>
                      </div>
                      <div>
                        <p class="font-bold text-gray-800 text-base">{{ i18n.t()['child.deleteConfirmTitle'] }}</p>
                        <p class="text-sm text-gray-500">{{ editingChild()?.name }}</p>
                      </div>
                    </div>
                    <p class="text-sm text-gray-600 mb-5">{{ i18n.t()['child.deleteConfirmBody'] }}</p>
                    <div class="flex gap-3">
                      <button type="button" (click)="showDeleteConfirm.set(false)"
                              class="flex-1 py-3 rounded-xl border-2 border-slate-200 text-gray-600 font-bold hover:bg-slate-100 transition-all text-sm">
                        {{ i18n.t()['child.cancel'] }}
                      </button>
                      <button type="button" (click)="confirmDeleteChild()"
                              class="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-400 text-white font-bold hover:from-red-400 hover:to-red-300 transition-all text-sm shadow-sm flex items-center justify-center gap-2">
                        <lucide-icon name="trash" class="text-inherit" aria-hidden="true"></lucide-icon>
                        {{ i18n.t()['child.delete'] }}
                      </button>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      }

    </div>
  `, styles: ["/* angular:styles/component:css;e08d04d9a420a0524cd4e690e18b1480933c92bb627f1d54d8f847ac8aea2cd6;C:/Users/g_gus/Desktop/jona/kiddok/src/app/components/shell.component.ts */\n.pb-safe {\n  padding-bottom: env(safe-area-inset-bottom, 1rem);\n}\n.card-hover {\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.card-hover:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15);\n}\nbutton:not(:disabled):active {\n  transform: scale(0.98);\n}\n.success-flash {\n  animation: success-flash 0.6s ease-out;\n}\n@keyframes success-flash {\n  0% {\n    background-color: #d1fae5;\n  }\n  100% {\n    background-color: transparent;\n  }\n}\n.animate-slide-up {\n  animation: slideUp 0.35s ease-out;\n}\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(16px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.animate-fade-in {\n  animation: fadeIn 0.3s ease-out;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=shell.component.css.map */\n"] }]
  }], () => [], { onEscapeKey: [{
    type: HostListener,
    args: ["document:keydown.escape"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ShellComponent, { className: "ShellComponent", filePath: "src/app/components/shell.component.ts", lineNumber: 612 });
})();

// src/app/components/pin-lock.component.ts
function PinLockComponent_Conditional_16_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275element(1, "lucide-icon", 33);
    \u0275\u0275elementStart(2, "p", 34);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.userIdError());
  }
}
function PinLockComponent_Conditional_16_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275element(1, "lucide-icon", 33);
    \u0275\u0275elementStart(2, "p", 34);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.passwordError());
  }
}
function PinLockComponent_Conditional_16_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275element(1, "lucide-icon", 35);
    \u0275\u0275elementStart(2, "p", 36);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.errorMsg());
  }
}
function PinLockComponent_Conditional_16_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 37);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.loadingText(), " ");
  }
}
function PinLockComponent_Conditional_16_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 38);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.submitText(), " ");
  }
}
function PinLockComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 18);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 19)(5, "div")(6, "label", 20);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 21);
    \u0275\u0275element(9, "lucide-icon", 22);
    \u0275\u0275elementStart(10, "input", 23);
    \u0275\u0275twoWayListener("ngModelChange", function PinLockComponent_Conditional_16_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.userId, $event) || (ctx_r1.userId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("blur", function PinLockComponent_Conditional_16_Template_input_blur_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.touchUserId());
    })("input", function PinLockComponent_Conditional_16_Template_input_input_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearUserIdError());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(11, PinLockComponent_Conditional_16_Conditional_11_Template, 4, 1, "div", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div")(13, "label", 20);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 21);
    \u0275\u0275element(16, "lucide-icon", 25);
    \u0275\u0275elementStart(17, "input", 26);
    \u0275\u0275twoWayListener("ngModelChange", function PinLockComponent_Conditional_16_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.password, $event) || (ctx_r1.password = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("blur", function PinLockComponent_Conditional_16_Template_input_blur_17_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.touchPassword());
    })("input", function PinLockComponent_Conditional_16_Template_input_input_17_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearPasswordError());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 27);
    \u0275\u0275listener("click", function PinLockComponent_Conditional_16_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showPassword.set(!ctx_r1.showPassword()));
    });
    \u0275\u0275element(19, "lucide-icon", 28);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(20, PinLockComponent_Conditional_16_Conditional_20_Template, 4, 1, "div", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 29)(22, "button", 30);
    \u0275\u0275listener("click", function PinLockComponent_Conditional_16_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.enterForgotMode());
    });
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(24, PinLockComponent_Conditional_16_Conditional_24_Template, 4, 1, "div", 31);
    \u0275\u0275elementStart(25, "button", 32);
    \u0275\u0275listener("click", function PinLockComponent_Conditional_16_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submit());
    });
    \u0275\u0275conditionalCreate(26, PinLockComponent_Conditional_16_Conditional_26_Template, 2, 1)(27, PinLockComponent_Conditional_16_Conditional_27_Template, 2, 1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.welcomeTitle());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.welcomeSubtitle());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.usernameLabel(), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r1.userIdBorderClass());
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.userId);
    \u0275\u0275property("placeholder", ctx_r1.usernamePlaceholder());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.userIdError() ? 11 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.passwordLabel(), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r1.passwordBorderClass());
    \u0275\u0275property("type", ctx_r1.showPassword() ? "text" : "password");
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.password);
    \u0275\u0275property("placeholder", ctx_r1.passwordPlaceholder());
    \u0275\u0275advance(2);
    \u0275\u0275property("name", ctx_r1.showPassword() ? "eyeOff" : "eye");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.passwordError() ? 20 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.forgotLinkText(), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.errorMsg() ? 24 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.loading() ? 26 : 27);
  }
}
function PinLockComponent_Conditional_17_Conditional_9_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275element(1, "lucide-icon", 33);
    \u0275\u0275elementStart(2, "p", 34);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.forgotNidError());
  }
}
function PinLockComponent_Conditional_17_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "label", 20);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 43);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 21);
    \u0275\u0275element(6, "lucide-icon", 22);
    \u0275\u0275elementStart(7, "input", 23);
    \u0275\u0275twoWayListener("ngModelChange", function PinLockComponent_Conditional_17_Conditional_9_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.forgotNid, $event) || (ctx_r1.forgotNid = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("blur", function PinLockComponent_Conditional_17_Conditional_9_Template_input_blur_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.touchForgotNid());
    })("input", function PinLockComponent_Conditional_17_Conditional_9_Template_input_input_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.clearForgotNidError());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, PinLockComponent_Conditional_17_Conditional_9_Conditional_8_Template, 4, 1, "div", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.confirmLabel());
    \u0275\u0275advance(5);
    \u0275\u0275classMap(ctx_r1.forgotNidBorderClass());
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.forgotNid);
    \u0275\u0275property("placeholder", ctx_r1.usernamePlaceholder());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.forgotNidError() ? 8 : -1);
  }
}
function PinLockComponent_Conditional_17_Conditional_10_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275element(1, "lucide-icon", 33);
    \u0275\u0275elementStart(2, "p", 34);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.otpError());
  }
}
function PinLockComponent_Conditional_17_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 44)(1, "div", 45);
    \u0275\u0275element(2, "lucide-icon", 46);
    \u0275\u0275elementStart(3, "p", 47);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(5, "div")(6, "label", 20);
    \u0275\u0275text(7);
    \u0275\u0275elementStart(8, "span", 43);
    \u0275\u0275text(9, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 21);
    \u0275\u0275element(11, "lucide-icon", 48);
    \u0275\u0275elementStart(12, "input", 49);
    \u0275\u0275twoWayListener("ngModelChange", function PinLockComponent_Conditional_17_Conditional_10_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.otpCode, $event) || (ctx_r1.otpCode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("blur", function PinLockComponent_Conditional_17_Conditional_10_Template_input_blur_12_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.touchOtp());
    })("input", function PinLockComponent_Conditional_17_Conditional_10_Template_input_input_12_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.clearOtpError());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(13, PinLockComponent_Conditional_17_Conditional_10_Conditional_13_Template, 4, 1, "div", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.otpSuccessMsg(), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.otpLabel());
    \u0275\u0275advance(5);
    \u0275\u0275classMap(ctx_r1.otpBorderClass());
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.otpCode);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.otpError() ? 13 : -1);
  }
}
function PinLockComponent_Conditional_17_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275element(1, "lucide-icon", 35);
    \u0275\u0275elementStart(2, "p", 36);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.errorMsg());
  }
}
function PinLockComponent_Conditional_17_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 37);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.loadingText(), " ");
  }
}
function PinLockComponent_Conditional_17_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 38);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.submitText(), " ");
  }
}
function PinLockComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", function PinLockComponent_Conditional_17_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.backToLogin());
    });
    \u0275\u0275element(1, "lucide-icon", 40);
    \u0275\u0275elementStart(2, "span", 41);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "h2", 42);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 18);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 19);
    \u0275\u0275conditionalCreate(9, PinLockComponent_Conditional_17_Conditional_9_Template, 9, 6, "div");
    \u0275\u0275conditionalCreate(10, PinLockComponent_Conditional_17_Conditional_10_Template, 14, 6);
    \u0275\u0275conditionalCreate(11, PinLockComponent_Conditional_17_Conditional_11_Template, 4, 1, "div", 31);
    \u0275\u0275elementStart(12, "button", 32);
    \u0275\u0275listener("click", function PinLockComponent_Conditional_17_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submit());
    });
    \u0275\u0275conditionalCreate(13, PinLockComponent_Conditional_17_Conditional_13_Template, 2, 1)(14, PinLockComponent_Conditional_17_Conditional_14_Template, 2, 1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.backText());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.forgotTitle());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.forgotSubtitle());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r1.otpSent() ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.otpSent() ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.errorMsg() ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.loading() ? 13 : 14);
  }
}
var PinLockComponent = class _PinLockComponent {
  constructor() {
    this.dataService = inject(DataService);
    this.i18n = inject(I18nService);
    this.router = inject(Router);
    this.userId = "";
    this.password = "";
    this.forgotNid = "";
    this.otpCode = "";
    this.showPassword = signal(false, ...ngDevMode ? [{ debugName: "showPassword" }] : (
      /* istanbul ignore next */
      []
    ));
    this.loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : (
      /* istanbul ignore next */
      []
    ));
    this.errorMsg = signal("", ...ngDevMode ? [{ debugName: "errorMsg" }] : (
      /* istanbul ignore next */
      []
    ));
    this.isForgotMode = signal(false, ...ngDevMode ? [{ debugName: "isForgotMode" }] : (
      /* istanbul ignore next */
      []
    ));
    this.otpSent = signal(false, ...ngDevMode ? [{ debugName: "otpSent" }] : (
      /* istanbul ignore next */
      []
    ));
    this.userIdTouched = signal(false, ...ngDevMode ? [{ debugName: "userIdTouched" }] : (
      /* istanbul ignore next */
      []
    ));
    this.passwordTouched = signal(false, ...ngDevMode ? [{ debugName: "passwordTouched" }] : (
      /* istanbul ignore next */
      []
    ));
    this.forgotNidTouched = signal(false, ...ngDevMode ? [{ debugName: "forgotNidTouched" }] : (
      /* istanbul ignore next */
      []
    ));
    this.otpTouched = signal(false, ...ngDevMode ? [{ debugName: "otpTouched" }] : (
      /* istanbul ignore next */
      []
    ));
    this.userIdError = signal("", ...ngDevMode ? [{ debugName: "userIdError" }] : (
      /* istanbul ignore next */
      []
    ));
    this.passwordError = signal("", ...ngDevMode ? [{ debugName: "passwordError" }] : (
      /* istanbul ignore next */
      []
    ));
    this.forgotNidError = signal("", ...ngDevMode ? [{ debugName: "forgotNidError" }] : (
      /* istanbul ignore next */
      []
    ));
    this.otpError = signal("", ...ngDevMode ? [{ debugName: "otpError" }] : (
      /* istanbul ignore next */
      []
    ));
    this.isSq = computed(() => this.i18n.locale() === "sq", ...ngDevMode ? [{ debugName: "isSq" }] : (
      /* istanbul ignore next */
      []
    ));
    this.brandSubtitle = computed(() => this.i18n.t()["pin.dashboard"], ...ngDevMode ? [{ debugName: "brandSubtitle" }] : (
      /* istanbul ignore next */
      []
    ));
    this.welcomeTitle = computed(() => this.i18n.t()["pin.welcome"], ...ngDevMode ? [{ debugName: "welcomeTitle" }] : (
      /* istanbul ignore next */
      []
    ));
    this.welcomeSubtitle = computed(() => this.i18n.t()["child.welcomeSub"], ...ngDevMode ? [{ debugName: "welcomeSubtitle" }] : (
      /* istanbul ignore next */
      []
    ));
    this.usernameLabel = computed(() => this.i18n.t()["pin.enterUserId"], ...ngDevMode ? [{ debugName: "usernameLabel" }] : (
      /* istanbul ignore next */
      []
    ));
    this.usernamePlaceholder = computed(() => this.i18n.t()["pin.userIdHint"], ...ngDevMode ? [{ debugName: "usernamePlaceholder" }] : (
      /* istanbul ignore next */
      []
    ));
    this.passwordLabel = computed(() => this.i18n.t()["pin.enterPassword"], ...ngDevMode ? [{ debugName: "passwordLabel" }] : (
      /* istanbul ignore next */
      []
    ));
    this.passwordPlaceholder = computed(() => this.i18n.t()["pin.yourPassword"], ...ngDevMode ? [{ debugName: "passwordPlaceholder" }] : (
      /* istanbul ignore next */
      []
    ));
    this.submitText = computed(() => this.i18n.t()["pin.continueSignIn"], ...ngDevMode ? [{ debugName: "submitText" }] : (
      /* istanbul ignore next */
      []
    ));
    this.loadingText = computed(() => this.i18n.t()["pin.authenticating"], ...ngDevMode ? [{ debugName: "loadingText" }] : (
      /* istanbul ignore next */
      []
    ));
    this.languageLabel = computed(() => this.i18n.t()["pin.language"], ...ngDevMode ? [{ debugName: "languageLabel" }] : (
      /* istanbul ignore next */
      []
    ));
    this.footerText = computed(() => this.i18n.t()["pin.safeData"], ...ngDevMode ? [{ debugName: "footerText" }] : (
      /* istanbul ignore next */
      []
    ));
    this.forgotLinkText = computed(() => this.i18n.t()["pin.forgotPassword"], ...ngDevMode ? [{ debugName: "forgotLinkText" }] : (
      /* istanbul ignore next */
      []
    ));
    this.backText = computed(() => this.i18n.t()["pin.goBack"], ...ngDevMode ? [{ debugName: "backText" }] : (
      /* istanbul ignore next */
      []
    ));
    this.forgotTitle = computed(() => this.i18n.t()["pin.resetPassword"], ...ngDevMode ? [{ debugName: "forgotTitle" }] : (
      /* istanbul ignore next */
      []
    ));
    this.forgotSubtitle = computed(() => this.i18n.isSq() ? "Vendosni NID / NIPT p\xEBr t'u identifikuar dhe p\xEBr t\xEB rikthyer qasjen n\xEB llogarin\xEB tuaj." : "Enter your NID / NIPT to verify your identity and recover access to your account.", ...ngDevMode ? [{ debugName: "forgotSubtitle" }] : (
      /* istanbul ignore next */
      []
    ));
    this.confirmLabel = computed(() => this.i18n.t()["pin.nid"], ...ngDevMode ? [{ debugName: "confirmLabel" }] : (
      /* istanbul ignore next */
      []
    ));
    this.otpLabel = computed(() => this.i18n.t()["pin.confirmationCode"], ...ngDevMode ? [{ debugName: "otpLabel" }] : (
      /* istanbul ignore next */
      []
    ));
    this.otpSuccessMsg = computed(() => this.i18n.t()["pin.otpSent"], ...ngDevMode ? [{ debugName: "otpSuccessMsg" }] : (
      /* istanbul ignore next */
      []
    ));
    this.userIdBorderClass = computed(() => this.userIdTouched() && !this.userId ? "border-red-500 bg-red-50/50" : "border-slate-200 focus:border-[#1a3c8f]", ...ngDevMode ? [{ debugName: "userIdBorderClass" }] : (
      /* istanbul ignore next */
      []
    ));
    this.passwordBorderClass = computed(() => this.passwordTouched() && !this.password ? "border-red-500 bg-red-50/50" : "border-slate-200 focus:border-[#1a3c8f]", ...ngDevMode ? [{ debugName: "passwordBorderClass" }] : (
      /* istanbul ignore next */
      []
    ));
    this.forgotNidBorderClass = computed(() => this.forgotNidTouched() && !this.forgotNid ? "border-red-500 bg-red-50/50" : "border-slate-200 focus:border-[#1a3c8f]", ...ngDevMode ? [{ debugName: "forgotNidBorderClass" }] : (
      /* istanbul ignore next */
      []
    ));
    this.otpBorderClass = computed(() => this.otpTouched() && (!this.otpCode || this.otpCode.length < 6) ? "border-red-500 bg-red-50/50" : "border-slate-200 focus:border-[#1a3c8f]", ...ngDevMode ? [{ debugName: "otpBorderClass" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  // ── Mode switching ─────────────────────────────────────────
  enterForgotMode() {
    this.isForgotMode.set(true);
    this.otpSent.set(false);
    this.errorMsg.set("");
    this.userIdError.set("");
    this.passwordError.set("");
  }
  backToLogin() {
    this.isForgotMode.set(false);
    this.otpSent.set(false);
    this.forgotNid = "";
    this.otpCode = "";
    this.forgotNidTouched.set(false);
    this.otpTouched.set(false);
    this.forgotNidError.set("");
    this.otpError.set("");
    this.errorMsg.set("");
  }
  // ── Field touch / error helpers ─────────────────────────────
  touchUserId() {
    this.userIdTouched.set(true);
    if (!this.userId) {
      this.userIdError.set(this.i18n.t()["pin.enterNid"]);
    }
  }
  clearUserIdError() {
    if (this.userId) {
      this.userIdError.set("");
      this.errorMsg.set("");
    }
  }
  touchPassword() {
    this.passwordTouched.set(true);
    if (!this.password) {
      this.passwordError.set(this.i18n.t()["pin.enterPassword"]);
    }
  }
  clearPasswordError() {
    if (this.password) {
      this.passwordError.set("");
      this.errorMsg.set("");
    }
  }
  touchForgotNid() {
    this.forgotNidTouched.set(true);
    if (!this.forgotNid) {
      this.forgotNidError.set(this.i18n.t()["pin.enterNidConfirm"]);
    }
  }
  clearForgotNidError() {
    if (this.forgotNid) {
      this.forgotNidError.set("");
      this.errorMsg.set("");
    }
  }
  touchOtp() {
    this.otpTouched.set(true);
    if (!this.otpCode || this.otpCode.length < 6) {
      this.otpError.set(this.i18n.t()["pin.enterOtp"]);
    }
  }
  clearOtpError() {
    if (this.otpCode) {
      this.otpError.set("");
      this.errorMsg.set("");
    }
  }
  // ── Submit ───────────────────────────────────────────────────
  submit() {
    if (this.isForgotMode()) {
      this.handleForgot();
    } else {
      this.handleLogin();
    }
  }
  handleLogin() {
    this.userIdTouched.set(true);
    this.passwordTouched.set(true);
    if (!this.userId) {
      this.userIdError.set(this.i18n.t()["pin.enterNid"]);
    }
    if (!this.password) {
      this.passwordError.set(this.i18n.t()["pin.enterPassword"]);
    }
    if (!this.userId || !this.password)
      return;
    this.loading.set(true);
    this.errorMsg.set("");
    setTimeout(() => __async(this, null, function* () {
      const success = yield this.dataService.login(this.userId, this.password);
      if (success) {
        this.router.navigate(["/"]);
      } else {
        this.errorMsg.set(this.i18n.t()["pin.invalidCredentials"]);
        this.loading.set(false);
      }
    }), 700);
  }
  handleForgot() {
    if (!this.otpSent()) {
      this.forgotNidTouched.set(true);
      if (!this.forgotNid) {
        this.forgotNidError.set(this.i18n.t()["pin.enterNidConfirm"]);
        return;
      }
      this.loading.set(true);
      setTimeout(() => {
        this.loading.set(false);
        this.otpSent.set(true);
      }, 900);
      return;
    }
    this.otpTouched.set(true);
    if (!this.otpCode || this.otpCode.length < 6) {
      this.otpError.set(this.i18n.t()["pin.enterOtp"]);
      return;
    }
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
      this.dataService.login(this.forgotNid, "1234");
      this.router.navigate(["/"]);
    }, 700);
  }
  static {
    this.\u0275fac = function PinLockComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PinLockComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PinLockComponent, selectors: [["app-pin-lock"]], decls: 27, vars: 11, consts: [[1, "min-h-screen", "flex", "items-center", "justify-center", "p-4", "bg-gradient-to-br", "from-slate-100", "to-slate-200", "font-sans", "overflow-hidden", "relative"], [1, "absolute", "top-[-10%]", "right-[-5%]", "w-[500px]", "h-[500px]", "rounded-full", "bg-purple-200/30", "blur-3xl", "pointer-events-none"], [1, "absolute", "bottom-[-10%]", "left-[-5%]", "w-[400px]", "h-[400px]", "rounded-full", "bg-teal-200/20", "blur-3xl", "pointer-events-none"], [1, "relative", "z-10", "w-full", "max-w-md"], [1, "text-center", "mb-10"], [1, "inline-flex", "items-center", "justify-center", "w-20", "h-20", "rounded-3xl", "bg-gradient-to-br", "from-[#1a3c8f]", "to-[#0a1f5c]", "shadow-2xl", "mb-6"], ["name", "baby", 1, "text-4xl", "text-white"], [1, "text-4xl", "font-extrabold", "tracking-tight", "text-gray-900"], [1, "text-[#1a3c8f]"], [1, "text-slate-400", "mt-2", "text-sm", "font-medium"], [1, "bg-white", "rounded-[2rem]", "shadow-[0_24px_80px_-12px_rgba(45,27,105,0.18)]", "border", "border-slate-100", "overflow-hidden"], [1, "h-2", "bg-gradient-to-r", "from-[#1a3c8f]", "via-[#2a5fc8]", "to-[#1a3c8f]"], [1, "p-10"], [1, "mt-8", "pt-6", "border-t", "border-slate-100", "flex", "items-center", "justify-center", "gap-3"], [1, "text-slate-300", "text-xs", "font-medium"], [3, "click"], [1, "text-center", "text-slate-300", "text-xs", "mt-6", "font-medium"], [1, "text-2xl", "font-black", "text-gray-800", "mb-1"], [1, "text-slate-400", "text-sm", "mb-8", "font-medium", "leading-relaxed"], [1, "space-y-5"], [1, "block", "text-xs", "font-bold", "text-[#1a3c8f]", "mb-2.5", "ml-1", "uppercase", "tracking-wider"], [1, "relative"], ["name", "user", 1, "absolute", "left-4", "top-1/2", "-translate-y-1/2", "text-slate-400", "text-xl"], ["type", "text", 1, "w-full", "pl-12", "pr-5", "py-4", "rounded-2xl", "border-2", "bg-slate-50", "focus:bg-white", "focus:ring-4", "focus:ring-[#1a3c8f]/10", "outline-none", "transition-all", "text-gray-800", "text-base", "placeholder-slate-300", 3, "ngModelChange", "blur", "input", "ngModel", "placeholder"], [1, "flex", "items-center", "gap-1.5", "mt-2", "ml-1"], ["name", "key", 1, "absolute", "left-4", "top-1/2", "-translate-y-1/2", "text-slate-400", "text-xl"], [1, "w-full", "pl-12", "pr-14", "py-4", "rounded-2xl", "border-2", "bg-slate-50", "focus:bg-white", "focus:ring-4", "focus:ring-[#1a3c8f]/10", "outline-none", "transition-all", "text-gray-800", "text-base", 3, "ngModelChange", "blur", "input", "type", "ngModel", "placeholder"], ["type", "button", 1, "absolute", "right-4", "top-1/2", "-translate-y-1/2", "text-slate-400", "hover:text-slate-600", "transition-colors", 3, "click"], [1, "text-xl", 3, "name"], [1, "text-right", "-mt-1"], ["type", "button", 1, "text-xs", "font-semibold", "text-[#1a3c8f]", "hover:text-[#2a5fc8]", "transition-colors", "hover:underline", 3, "click"], [1, "p-3.5", "bg-red-50", "border", "border-red-200", "rounded-2xl", "flex", "items-center", "gap-2.5", "animate-fade-in"], [1, "w-full", "border-2", "border-[#c8102e]", "bg-gradient-to-r", "from-[#c8102e]", "to-[#e0173a]", "hover:from-[#a00d26]", "hover:to-[#c8102e]", "disabled:from-slate-300", "disabled:to-slate-300", "disabled:border-slate-300", "text-white", "font-bold", "py-4", "rounded-2xl", "transition-all", "shadow-md", "hover:shadow-lg", "hover:-translate-y-0.5", "disabled:hover:shadow-none", "disabled:translate-y-0", "flex", "items-center", "justify-center", "gap-3", "text-base", "mt-1", 3, "click", "disabled"], ["name", "alert-triangle", 1, "text-red-500", "text-base"], [1, "text-red-500", "text-xs", "font-medium"], ["name", "alert-circle", 1, "text-red-500", "text-lg"], [1, "text-red-600", "text-xs", "font-medium"], ["name", "refresh-cw", 1, "text-xl", "animate-spin"], ["name", "arrowRight", 1, "text-xl"], [1, "flex", "items-center", "gap-1.5", "text-sm", "text-slate-400", "hover:text-[#1a3c8f]", "transition-colors", "mb-6", "-ml-1", 3, "click"], ["name", "arrow-left", 1, "text-lg"], [1, "font-semibold"], [1, "text-2xl", "font-black", "text-[#1a3c8f]", "mb-1"], [1, "text-red-500", "ml-0.5"], [1, "p-4", "bg-emerald-50", "border", "border-emerald-200", "rounded-2xl", "animate-fade-in"], [1, "flex", "items-start", "gap-3"], ["name", "check-circle", 1, "text-emerald-500", "text-lg", "mt-0.5"], [1, "text-emerald-700", "text-xs", "font-medium", "leading-relaxed"], ["name", "lock", 1, "absolute", "left-4", "top-1/2", "-translate-y-1/2", "text-slate-400", "text-xl"], ["type", "text", "maxlength", "6", "placeholder", "\u25CF \u25CF \u25CF \u25CF \u25CF \u25CF", 1, "w-full", "pl-12", "pr-5", "py-4", "rounded-2xl", "border-2", "bg-slate-50", "focus:bg-white", "focus:ring-4", "focus:ring-[#1a3c8f]/10", "outline-none", "transition-all", "text-gray-800", "text-base", "tracking-widest", "font-mono", "placeholder-slate-300", "text-center", "text-lg", 3, "ngModelChange", "blur", "input", "ngModel"]], template: function PinLockComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "div", 1)(2, "div", 2);
        \u0275\u0275elementStart(3, "div", 3)(4, "div", 4)(5, "div", 5);
        \u0275\u0275element(6, "lucide-icon", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "h1", 7);
        \u0275\u0275text(8, "KidDok");
        \u0275\u0275elementStart(9, "span", 8);
        \u0275\u0275text(10, ".");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "p", 9);
        \u0275\u0275text(12);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "div", 10);
        \u0275\u0275element(14, "div", 11);
        \u0275\u0275elementStart(15, "div", 12);
        \u0275\u0275conditionalCreate(16, PinLockComponent_Conditional_16_Template, 28, 20);
        \u0275\u0275conditionalCreate(17, PinLockComponent_Conditional_17_Template, 15, 8);
        \u0275\u0275elementStart(18, "div", 13)(19, "span", 14);
        \u0275\u0275text(20);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "button", 15);
        \u0275\u0275listener("click", function PinLockComponent_Template_button_click_21_listener() {
          return ctx.i18n.setLocale("sq");
        });
        \u0275\u0275text(22, " SQ ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "button", 15);
        \u0275\u0275listener("click", function PinLockComponent_Template_button_click_23_listener() {
          return ctx.i18n.setLocale("en");
        });
        \u0275\u0275text(24, " EN ");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(25, "p", 16);
        \u0275\u0275text(26);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(12);
        \u0275\u0275textInterpolate(ctx.brandSubtitle());
        \u0275\u0275advance(4);
        \u0275\u0275conditional(!ctx.isForgotMode() ? 16 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.isForgotMode() ? 17 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.languageLabel());
        \u0275\u0275advance();
        \u0275\u0275classMap(\u0275\u0275interpolate1("px-4 py-1.5 rounded-full text-xs font-bold transition-all border-2 ", ctx.i18n.locale() === "sq" ? "bg-[#1a3c8f] text-white border-[#1a3c8f]" : "bg-white text-slate-400 border-slate-200 hover:border-[#1a3c8f]"));
        \u0275\u0275advance(2);
        \u0275\u0275classMap(\u0275\u0275interpolate1("px-4 py-1.5 rounded-full text-xs font-bold transition-all border-2 ", ctx.i18n.locale() === "en" ? "bg-[#1a3c8f] text-white border-[#1a3c8f]" : "bg-white text-slate-400 border-slate-200 hover:border-[#1a3c8f]"));
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.footerText());
      }
    }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, MaxLengthValidator, NgModel, LucideAngularModule, LucideAngularComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PinLockComponent, [{
    type: Component,
    args: [{
      selector: "app-pin-lock",
      imports: [CommonModule, FormsModule, LucideAngularModule],
      template: `
    <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-100 to-slate-200 font-sans overflow-hidden relative">

      <!-- Background blobs -->
      <div class="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-200/30 blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-teal-200/20 blur-3xl pointer-events-none"></div>

      <!-- Login Card -->
      <div class="relative z-10 w-full max-w-md">

        <!-- Branding header -->
        <div class="text-center mb-10">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#1a3c8f] to-[#0a1f5c] shadow-2xl mb-6">
            <lucide-icon name="baby" class="text-4xl text-white"></lucide-icon>
          </div>
          <h1 class="text-4xl font-extrabold tracking-tight text-gray-900">KidDok<span class="text-[#1a3c8f]">.</span></h1>
          <p class="text-slate-400 mt-2 text-sm font-medium">{{ brandSubtitle() }}</p>
        </div>

        <!-- Card -->
        <div class="bg-white rounded-[2rem] shadow-[0_24px_80px_-12px_rgba(45,27,105,0.18)] border border-slate-100 overflow-hidden">

          <!-- Card Top accent bar (e-Albania blue) -->
          <div class="h-2 bg-gradient-to-r from-[#1a3c8f] via-[#2a5fc8] to-[#1a3c8f]"></div>

          <div class="p-10">

            <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
                 NORMAL LOGIN VIEW
                 \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
            @if (!isForgotMode()) {

              <h2 class="text-2xl font-black text-gray-800 mb-1">{{ welcomeTitle() }}</h2>
              <p class="text-slate-400 text-sm mb-8 font-medium leading-relaxed">{{ welcomeSubtitle() }}</p>

              <div class="space-y-5">

                <!-- NID / NIPT field -->
                <div>
                  <label class="block text-xs font-bold text-[#1a3c8f] mb-2.5 ml-1 uppercase tracking-wider">
                    {{ usernameLabel() }}
                  </label>
                  <div class="relative">
                    <lucide-icon name="user" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl"></lucide-icon>
                    <input type="text"
                           [(ngModel)]="userId"
                           (blur)="touchUserId()"
                           (input)="clearUserIdError()"
                           [class]="userIdBorderClass()"
                           class="w-full pl-12 pr-5 py-4 rounded-2xl border-2 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#1a3c8f]/10 outline-none transition-all text-gray-800 text-base placeholder-slate-300"
                           [placeholder]="usernamePlaceholder()">
                  </div>
                  @if (userIdError()) {
                    <div class="flex items-center gap-1.5 mt-2 ml-1">
                      <lucide-icon name="alert-triangle" class="text-red-500 text-base"></lucide-icon>
                      <p class="text-red-500 text-xs font-medium">{{ userIdError() }}</p>
                    </div>
                  }
                </div>

                <!-- Password field -->
                <div>
                  <label class="block text-xs font-bold text-[#1a3c8f] mb-2.5 ml-1 uppercase tracking-wider">
                    {{ passwordLabel() }}
                  </label>
                  <div class="relative">
                    <lucide-icon name="key" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl"></lucide-icon>
                    <input [type]="showPassword() ? 'text' : 'password'"
                           [(ngModel)]="password"
                           (blur)="touchPassword()"
                           (input)="clearPasswordError()"
                           [class]="passwordBorderClass()"
                           class="w-full pl-12 pr-14 py-4 rounded-2xl border-2 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#1a3c8f]/10 outline-none transition-all text-gray-800 text-base"
                           [placeholder]="passwordPlaceholder()">
                    <button type="button" (click)="showPassword.set(!showPassword())"
                            class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                      <lucide-icon [name]="showPassword() ? 'eyeOff' : 'eye'" class="text-xl"></lucide-icon>
                    </button>
                  </div>
                  @if (passwordError()) {
                    <div class="flex items-center gap-1.5 mt-2 ml-1">
                      <lucide-icon name="alert-triangle" class="text-red-500 text-base"></lucide-icon>
                      <p class="text-red-500 text-xs font-medium">{{ passwordError() }}</p>
                    </div>
                  }
                </div>

                <!-- Forgot password link -->
                <div class="text-right -mt-1">
                  <button type="button" (click)="enterForgotMode()"
                          class="text-xs font-semibold text-[#1a3c8f] hover:text-[#2a5fc8] transition-colors hover:underline">
                    {{ forgotLinkText() }}
                  </button>
                </div>

                <!-- Global error -->
                @if (errorMsg()) {
                  <div class="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2.5 animate-fade-in">
                    <lucide-icon name="alert-circle" class="text-red-500 text-lg"></lucide-icon>
                    <p class="text-red-600 text-xs font-medium">{{ errorMsg() }}</p>
                  </div>
                }

                <!-- Submit button -->
                <button (click)="submit()"
                        [disabled]="loading()"
                        class="w-full border-2 border-[#c8102e] bg-gradient-to-r from-[#c8102e] to-[#e0173a] hover:from-[#a00d26] hover:to-[#c8102e] disabled:from-slate-300 disabled:to-slate-300 disabled:border-slate-300 text-white font-bold py-4 rounded-2xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:hover:shadow-none disabled:translate-y-0 flex items-center justify-center gap-3 text-base mt-1">
                  @if (loading()) {
                    <lucide-icon name="refresh-cw" class="text-xl animate-spin"></lucide-icon>
                    {{ loadingText() }}
                  } @else {
                    <lucide-icon name="arrowRight" class="text-xl"></lucide-icon>
                    {{ submitText() }}
                  }
                </button>

              </div>
            }

            <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
                 FORGOT PASSWORD VIEW
                 \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
            @if (isForgotMode()) {

              <!-- Back link -->
              <button (click)="backToLogin()" class="flex items-center gap-1.5 text-sm text-slate-400 hover:text-[#1a3c8f] transition-colors mb-6 -ml-1">
                <lucide-icon name="arrow-left" class="text-lg"></lucide-icon>
                <span class="font-semibold">{{ backText() }}</span>
              </button>

              <!-- Title -->
              <h2 class="text-2xl font-black text-[#1a3c8f] mb-1">{{ forgotTitle() }}</h2>
              <p class="text-slate-400 text-sm mb-8 font-medium leading-relaxed">{{ forgotSubtitle() }}</p>

              <div class="space-y-5">

                <!-- NID confirmation field (before OTP) -->
                @if (!otpSent()) {
                  <div>
                    <label class="block text-xs font-bold text-[#1a3c8f] mb-2.5 ml-1 uppercase tracking-wider">
                      {{ confirmLabel() }}<span class="text-red-500 ml-0.5">*</span>
                    </label>
                    <div class="relative">
                      <lucide-icon name="user" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl"></lucide-icon>
                      <input type="text"
                             [(ngModel)]="forgotNid"
                             (blur)="touchForgotNid()"
                             (input)="clearForgotNidError()"
                             [class]="forgotNidBorderClass()"
                             class="w-full pl-12 pr-5 py-4 rounded-2xl border-2 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#1a3c8f]/10 outline-none transition-all text-gray-800 text-base placeholder-slate-300"
                             [placeholder]="usernamePlaceholder()">
                    </div>
                    @if (forgotNidError()) {
                      <div class="flex items-center gap-1.5 mt-2 ml-1">
                        <lucide-icon name="alert-triangle" class="text-red-500 text-base"></lucide-icon>
                        <p class="text-red-500 text-xs font-medium">{{ forgotNidError() }}</p>
                      </div>
                    }
                  </div>
                }

                <!-- Success message + OTP entry (after nid submitted) -->
                @if (otpSent()) {
                  <!-- Green success banner -->
                  <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl animate-fade-in">
                    <div class="flex items-start gap-3">
                      <lucide-icon name="check-circle" class="text-emerald-500 text-lg mt-0.5"></lucide-icon>
                      <p class="text-emerald-700 text-xs font-medium leading-relaxed">
                        {{ otpSuccessMsg() }}
                      </p>
                    </div>
                  </div>

                  <!-- OTP input field -->
                  <div>
                    <label class="block text-xs font-bold text-[#1a3c8f] mb-2.5 ml-1 uppercase tracking-wider">
                      {{ otpLabel() }}<span class="text-red-500 ml-0.5">*</span>
                    </label>
                    <div class="relative">
                      <lucide-icon name="lock" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl"></lucide-icon>
                      <input type="text"
                             [(ngModel)]="otpCode"
                             (blur)="touchOtp()"
                             (input)="clearOtpError()"
                             [class]="otpBorderClass()"
                             maxlength="6"
                             class="w-full pl-12 pr-5 py-4 rounded-2xl border-2 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#1a3c8f]/10 outline-none transition-all text-gray-800 text-base tracking-widest font-mono placeholder-slate-300 text-center text-lg"
                             placeholder="\u25CF \u25CF \u25CF \u25CF \u25CF \u25CF">
                    </div>
                    @if (otpError()) {
                      <div class="flex items-center gap-1.5 mt-2 ml-1">
                        <lucide-icon name="alert-triangle" class="text-red-500 text-base"></lucide-icon>
                        <p class="text-red-500 text-xs font-medium">{{ otpError() }}</p>
                      </div>
                    }
                  </div>
                }

                <!-- Global error -->
                @if (errorMsg()) {
                  <div class="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2.5 animate-fade-in">
                    <lucide-icon name="alert-circle" class="text-red-500 text-lg"></lucide-icon>
                    <p class="text-red-600 text-xs font-medium">{{ errorMsg() }}</p>
                  </div>
                }

                <!-- Submit button -->
                <button (click)="submit()"
                        [disabled]="loading()"
                        class="w-full border-2 border-[#c8102e] bg-gradient-to-r from-[#c8102e] to-[#e0173a] hover:from-[#a00d26] hover:to-[#c8102e] disabled:from-slate-300 disabled:to-slate-300 disabled:border-slate-300 text-white font-bold py-4 rounded-2xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:hover:shadow-none disabled:translate-y-0 flex items-center justify-center gap-3 text-base mt-1">
                  @if (loading()) {
                    <lucide-icon name="refresh-cw" class="text-xl animate-spin"></lucide-icon>
                    {{ loadingText() }}
                  } @else {
                    <lucide-icon name="arrowRight" class="text-xl"></lucide-icon>
                    {{ submitText() }}
                  }
                </button>

              </div>
            }

            <!-- Language toggle -->
            <div class="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-3">
              <span class="text-slate-300 text-xs font-medium">{{ languageLabel() }}</span>
              <button (click)="i18n.setLocale('sq')"
                      class="px-4 py-1.5 rounded-full text-xs font-bold transition-all border-2 {{ i18n.locale() === 'sq' ? 'bg-[#1a3c8f] text-white border-[#1a3c8f]' : 'bg-white text-slate-400 border-slate-200 hover:border-[#1a3c8f]' }}">
                SQ
              </button>
              <button (click)="i18n.setLocale('en')"
                      class="px-4 py-1.5 rounded-full text-xs font-bold transition-all border-2 {{ i18n.locale() === 'en' ? 'bg-[#1a3c8f] text-white border-[#1a3c8f]' : 'bg-white text-slate-400 border-slate-200 hover:border-[#1a3c8f]' }}">
                EN
              </button>
            </div>

          </div>
        </div>

        <!-- Footer note -->
        <p class="text-center text-slate-300 text-xs mt-6 font-medium">{{ footerText() }}</p>

      </div>
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PinLockComponent, { className: "PinLockComponent", filePath: "src/app/components/pin-lock.component.ts", lineNumber: 257 });
})();

// src/app/app.routes.ts
var routes = [
  { path: "login", component: PinLockComponent },
  {
    path: "",
    component: ShellComponent,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", loadComponent: () => import("./chunk-XTCJNK3X.js").then((m) => m.HomeComponent) },
      { path: "diary", loadComponent: () => import("./chunk-44WEZ7IR.js").then((m) => m.DiaryComponent) },
      { path: "temperature", loadComponent: () => import("./chunk-CCISJIE7.js").then((m) => m.TemperatureDiaryComponent) },
      { path: "growth", loadComponent: () => import("./chunk-RIQ3ZVD3.js").then((m) => m.GrowthTrackingComponent) },
      { path: "records", loadComponent: () => import("./chunk-6WY7WSU4.js").then((m) => m.RecordsComponent) },
      { path: "vaccines", loadComponent: () => import("./chunk-BYEDVJ6Z.js").then((m) => m.VaccinesComponent) },
      { path: "medications", loadComponent: () => import("./chunk-KBOSMNVX.js").then((m) => m.MedicationsComponent) },
      { path: "appointments", loadComponent: () => import("./chunk-RC4L2GJK.js").then((m) => m.AppointmentsComponent) },
      { path: "lab-results", loadComponent: () => import("./chunk-UE5QQMUA.js").then((m) => m.LabResultsComponent) },
      { path: "analytics", loadComponent: () => import("./chunk-XBM3SKLE.js").then((m) => m.AnalyticsComponent) },
      { path: "settings", loadComponent: () => import("./chunk-VCVPTW3F.js").then((m) => m.SettingsPageComponent) }
    ]
  },
  { path: "**", redirectTo: "/login" }
];

// src/app/app.config.ts
registerLocaleData(it_default);
var appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideServiceWorker("ngsw-worker.js", {
      enabled: !isDevMode(),
      registrationStrategy: "registerWhenStable:30000"
    }),
    { provide: LOCALE_ID, useValue: "it" },
    importProvidersFrom(LucideAngularModule.pick({
      PartyPopper,
      Plus,
      Pencil,
      Droplet,
      LogIn,
      UserPlus,
      AlertCircle: CircleAlert,
      Calendar,
      BadgeCheck,
      ChevronDown,
      CheckCircle: CircleCheckBig,
      Save,
      X,
      AlertTriangle: TriangleAlert,
      Trash2,
      Trash,
      Loader,
      ArrowLeft,
      Menu,
      Globe,
      User,
      Users,
      Check,
      ArrowLeftRight,
      CirclePlus,
      Hand,
      Settings,
      ChevronLeft,
      ChevronRight,
      FileText,
      Clock,
      History,
      Inbox,
      TrendingUp,
      Thermometer,
      Ruler,
      Dumbbell,
      PlusCircle: CirclePlus,
      CalendarClock,
      CheckCircle2: CircleCheck,
      Hourglass,
      FolderOpen,
      Zap,
      RefreshCw,
      Cloud,
      Cake,
      Syringe,
      CalendarX,
      Baby,
      Database,
      Download,
      Heart,
      CalendarDays,
      CalendarCheck,
      Activity,
      FileCheck,
      Bell,
      ThermometerSun,
      FilePlus,
      ClipboardList,
      LayoutList,
      Shield,
      Scale,
      HeartPulse,
      Stethoscope,
      Pill,
      Target,
      ChartBar,
      Waves,
      Palette,
      Info,
      CircleHelp: CircleQuestionMark,
      WifiOff,
      Key,
      Eye,
      EyeOff,
      ArrowRight,
      Lock,
      LogOut,
      Home: House,
      BookOpen,
      FlaskConical,
      BarChart2: ChartNoAxesColumn
    }))
  ]
};

// src/app/components/toast.component.ts
var _forTrack07 = ($index, $item) => $item.id;
function ToastComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "lucide-icon", 3);
    \u0275\u0275elementStart(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 5);
    \u0275\u0275listener("click", function ToastComponent_For_2_Template_button_click_4_listener() {
      const toast_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.dismiss(toast_r2.id));
    });
    \u0275\u0275element(5, "lucide-icon", 6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const toast_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r2.toastClass(toast_r2.type));
    \u0275\u0275attribute("aria-live", "polite");
    \u0275\u0275advance();
    \u0275\u0275property("name", ctx_r2.toastIcon(toast_r2.type));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(toast_r2.message);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r2.t()["toast.dismiss"] || "Dismiss");
  }
}
var toastId = 0;
var ToastComponent = class _ToastComponent {
  constructor() {
    this.toastService = inject(ToastService);
    this.i18n = inject(I18nService);
    this.t = this.i18n.t;
    this.activeToasts = signal([], ...ngDevMode ? [{ debugName: "activeToasts" }] : (
      /* istanbul ignore next */
      []
    ));
    this.timeouts = /* @__PURE__ */ new Map();
  }
  ngOnInit() {
    this.toastService.subscribe((message, type, duration) => {
      this.addToast(message, type, duration);
    });
  }
  ngOnDestroy() {
    this.timeouts.forEach((t) => clearTimeout(t));
    this.timeouts.clear();
  }
  addToast(message, type, duration) {
    const id = ++toastId;
    const toast = { id, message, type };
    this.activeToasts.update((toasts) => [...toasts, toast]);
    const timeout = setTimeout(() => this.dismiss(id), duration);
    this.timeouts.set(id, timeout);
  }
  dismiss(id) {
    const timeout = this.timeouts.get(id);
    if (timeout) {
      clearTimeout(timeout);
      this.timeouts.delete(id);
    }
    this.activeToasts.update((toasts) => toasts.filter((t) => t.id !== id));
  }
  toastClass(type) {
    switch (type) {
      case "success":
        return "bg-teal-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      case "info":
        return "bg-slate-700 text-white";
    }
  }
  toastIcon(type) {
    switch (type) {
      case "success":
        return "check-circle";
      case "error":
        return "alert-circle";
      case "info":
        return "info";
    }
  }
  static {
    this.\u0275fac = function ToastComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ToastComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ToastComponent, selectors: [["app-toast"]], decls: 3, vars: 0, consts: [["role", "region", "aria-label", "Notifications", 1, "fixed", "bottom-4", "right-4", "z-[200]", "flex", "flex-col", "gap-2", "pointer-events-none"], ["role", "alert", 1, "pointer-events-auto", "flex", "items-center", "gap-3", "px-4", "py-3", "rounded-2xl", "shadow-lg", "max-w-sm", "animate-slide-up", 3, "class"], ["role", "alert", 1, "pointer-events-auto", "flex", "items-center", "gap-3", "px-4", "py-3", "rounded-2xl", "shadow-lg", "max-w-sm", "animate-slide-up"], ["aria-hidden", "true", 1, "text-inherit", "shrink-0", 3, "name"], [1, "flex-1", "text-sm", "font-medium", "text-white"], [1, "opacity-70", "hover:opacity-100", "transition-opacity", 3, "click"], ["name", "x", "aria-hidden", "true", 1, "w-4", "h-4", "text-white"]], template: function ToastComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275repeaterCreate(1, ToastComponent_For_2_Template, 6, 6, "div", 1, _forTrack07);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275repeater(ctx.activeToasts());
      }
    }, dependencies: [CommonModule, LucideAngularModule, LucideAngularComponent], styles: ["\n.animate-slide-up[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(16px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=toast.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastComponent, [{
    type: Component,
    args: [{ selector: "app-toast", standalone: true, imports: [CommonModule, LucideAngularModule], template: `
    <div class="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none" role="region" aria-label="Notifications">
      @for (toast of activeToasts(); track toast.id) {
        <div class="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg max-w-sm animate-slide-up"
             [class]="toastClass(toast.type)"
             role="alert"
             [attr.aria-live]="'polite'">
          <lucide-icon [name]="toastIcon(toast.type)" class="text-inherit shrink-0" aria-hidden="true"></lucide-icon>
          <span class="flex-1 text-sm font-medium text-white">{{ toast.message }}</span>
          <button (click)="dismiss(toast.id)" [attr.aria-label]="t()['toast.dismiss'] || 'Dismiss'" class="opacity-70 hover:opacity-100 transition-opacity">
            <lucide-icon name="x" class="w-4 h-4 text-white" aria-hidden="true"></lucide-icon>
          </button>
        </div>
      }
    </div>
  `, styles: ["/* angular:styles/component:css;0081357b92c64ced585dfc57c35de66c524eca7ab1c165cb4370f239721f4a11;C:/Users/g_gus/Desktop/jona/kiddok/src/app/components/toast.component.ts */\n.animate-slide-up {\n  animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(16px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=toast.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ToastComponent, { className: "ToastComponent", filePath: "src/app/components/toast.component.ts", lineNumber: 45 });
})();

// src/app/app.component.ts
var AppComponent = class _AppComponent {
  constructor() {
    this.data = inject(DataService);
    this.notif = inject(NotificationService);
  }
  ngOnInit() {
    setTimeout(() => {
      this.notif.checkVaccineAlerts();
    }, 1500);
  }
  static {
    this.\u0275fac = function AppComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AppComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 2, vars: 0, template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "router-outlet")(1, "app-toast");
      }
    }, dependencies: [RouterOutlet, ToastComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppComponent, [{
    type: Component,
    args: [{
      selector: "app-root",
      imports: [RouterOutlet, ToastComponent],
      template: `<router-outlet></router-outlet>
<app-toast />`
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.component.ts", lineNumber: 13 });
})();

// src/main.ts
bootstrapApplication(AppComponent, __spreadProps(__spreadValues({}, appConfig), {
  providers: [
    provideZoneChangeDetection(),
    ...appConfig.providers
  ]
})).then((appRef) => {
  window.__angularInjector__ = appRef.injector;
}).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
