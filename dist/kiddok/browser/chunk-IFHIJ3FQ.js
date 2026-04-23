import {
  ApplicationRef,
  Attribute,
  ChangeDetectorRef,
  Component,
  DEFAULT_CURRENCY_CODE,
  DOCUMENT,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  IMAGE_CONFIG,
  IMAGE_CONFIG_DEFAULTS,
  INTERNAL_APPLICATION_ERROR_HANDLER,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  IterableDiffers,
  KeyValueDiffers,
  LOCALE_ID,
  LocaleDataIndex,
  NgModule,
  NgModuleRef$1,
  NgZone,
  Optional,
  Output,
  Pipe,
  PlatformLocation,
  Renderer2,
  RendererStyleFlags2,
  RuntimeError,
  Self,
  SkipSelf,
  Subject,
  TemplateRef,
  Version,
  ViewContainerRef,
  __async,
  __spreadProps,
  __spreadValues,
  afterNextRender,
  booleanAttribute,
  computed,
  createNgModule,
  findLocaleData,
  forkJoin,
  formatRuntimeError,
  forwardRef,
  from,
  getDOM,
  getLocalePluralCase,
  inject,
  isPromise,
  isSignal,
  isSubscribable,
  map,
  numberAttribute,
  performanceMarkFeature,
  registerLocaleData,
  setClassMetadata,
  signal,
  stringify,
  untracked,
  unwrapSafeValue,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵgetInheritedFactory,
  ɵɵinject,
  ɵɵinjectAttribute,
  ɵɵlistener,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵstyleProp
} from "./chunk-SFGRG2UU.js";

// node_modules/@angular/common/fesm2022/_location-chunk.mjs
/**
 * @license Angular v21.2.9
 * (c) 2010-2026 Google LLC. https://angular.dev/
 * License: MIT
 */
function joinWithSlash(start, end) {
  if (!start) return end;
  if (!end) return start;
  if (start.endsWith("/")) {
    return end.startsWith("/") ? start + end.slice(1) : start + end;
  }
  return end.startsWith("/") ? start + end : `${start}/${end}`;
}
function stripTrailingSlash(url) {
  const pathEndIdx = url.search(/#|\?|$/);
  return url[pathEndIdx - 1] === "/" ? url.slice(0, pathEndIdx - 1) + url.slice(pathEndIdx) : url;
}
function normalizeQueryParams(params) {
  return params && params[0] !== "?" ? `?${params}` : params;
}
var LocationStrategy = class _LocationStrategy {
  historyGo(relativePosition) {
    throw new Error(ngDevMode ? "Not implemented" : "");
  }
  static \u0275fac = function LocationStrategy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LocationStrategy)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _LocationStrategy,
    factory: () => (() => inject(PathLocationStrategy))(),
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LocationStrategy, [{
    type: Injectable,
    args: [{
      providedIn: "root",
      useFactory: () => inject(PathLocationStrategy)
    }]
  }], null, null);
})();
var APP_BASE_HREF = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "appBaseHref" : "");
var PathLocationStrategy = class _PathLocationStrategy extends LocationStrategy {
  _platformLocation;
  _baseHref;
  _removeListenerFns = [];
  constructor(_platformLocation, href) {
    super();
    this._platformLocation = _platformLocation;
    this._baseHref = href ?? this._platformLocation.getBaseHrefFromDOM() ?? inject(DOCUMENT).location?.origin ?? "";
  }
  ngOnDestroy() {
    while (this._removeListenerFns.length) {
      this._removeListenerFns.pop()();
    }
  }
  onPopState(fn) {
    this._removeListenerFns.push(this._platformLocation.onPopState(fn), this._platformLocation.onHashChange(fn));
  }
  getBaseHref() {
    return this._baseHref;
  }
  prepareExternalUrl(internal) {
    return joinWithSlash(this._baseHref, internal);
  }
  path(includeHash = false) {
    const pathname = this._platformLocation.pathname + normalizeQueryParams(this._platformLocation.search);
    const hash = this._platformLocation.hash;
    return hash && includeHash ? `${pathname}${hash}` : pathname;
  }
  pushState(state, title, url, queryParams) {
    const externalUrl = this.prepareExternalUrl(url + normalizeQueryParams(queryParams));
    this._platformLocation.pushState(state, title, externalUrl);
  }
  replaceState(state, title, url, queryParams) {
    const externalUrl = this.prepareExternalUrl(url + normalizeQueryParams(queryParams));
    this._platformLocation.replaceState(state, title, externalUrl);
  }
  forward() {
    this._platformLocation.forward();
  }
  back() {
    this._platformLocation.back();
  }
  getState() {
    return this._platformLocation.getState();
  }
  historyGo(relativePosition = 0) {
    this._platformLocation.historyGo?.(relativePosition);
  }
  static \u0275fac = function PathLocationStrategy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PathLocationStrategy)(\u0275\u0275inject(PlatformLocation), \u0275\u0275inject(APP_BASE_HREF, 8));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _PathLocationStrategy,
    factory: _PathLocationStrategy.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PathLocationStrategy, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: PlatformLocation
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [APP_BASE_HREF]
    }]
  }], null);
})();
var NoTrailingSlashPathLocationStrategy = class _NoTrailingSlashPathLocationStrategy extends PathLocationStrategy {
  prepareExternalUrl(internal) {
    const path = extractUrlPath(internal);
    if (path.endsWith("/") && path.length > 1) {
      internal = path.slice(0, -1) + internal.slice(path.length);
    }
    return super.prepareExternalUrl(internal);
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275NoTrailingSlashPathLocationStrategy_BaseFactory;
    return function NoTrailingSlashPathLocationStrategy_Factory(__ngFactoryType__) {
      return (\u0275NoTrailingSlashPathLocationStrategy_BaseFactory || (\u0275NoTrailingSlashPathLocationStrategy_BaseFactory = \u0275\u0275getInheritedFactory(_NoTrailingSlashPathLocationStrategy)))(__ngFactoryType__ || _NoTrailingSlashPathLocationStrategy);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _NoTrailingSlashPathLocationStrategy,
    factory: _NoTrailingSlashPathLocationStrategy.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NoTrailingSlashPathLocationStrategy, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var TrailingSlashPathLocationStrategy = class _TrailingSlashPathLocationStrategy extends PathLocationStrategy {
  prepareExternalUrl(internal) {
    const path = extractUrlPath(internal);
    if (!path.endsWith("/")) {
      internal = path + "/" + internal.slice(path.length);
    }
    return super.prepareExternalUrl(internal);
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275TrailingSlashPathLocationStrategy_BaseFactory;
    return function TrailingSlashPathLocationStrategy_Factory(__ngFactoryType__) {
      return (\u0275TrailingSlashPathLocationStrategy_BaseFactory || (\u0275TrailingSlashPathLocationStrategy_BaseFactory = \u0275\u0275getInheritedFactory(_TrailingSlashPathLocationStrategy)))(__ngFactoryType__ || _TrailingSlashPathLocationStrategy);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _TrailingSlashPathLocationStrategy,
    factory: _TrailingSlashPathLocationStrategy.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TrailingSlashPathLocationStrategy, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function extractUrlPath(url) {
  const questionMarkOrHashIndex = url.search(/[?#]/);
  const pathEnd = questionMarkOrHashIndex > -1 ? questionMarkOrHashIndex : url.length;
  return url.slice(0, pathEnd);
}
var Location = class _Location {
  _subject = new Subject();
  _basePath;
  _locationStrategy;
  _urlChangeListeners = [];
  _urlChangeSubscription = null;
  constructor(locationStrategy) {
    this._locationStrategy = locationStrategy;
    const baseHref = this._locationStrategy.getBaseHref();
    this._basePath = _stripOrigin(stripTrailingSlash(_stripIndexHtml(baseHref)));
    this._locationStrategy.onPopState((ev) => {
      this._subject.next({
        "url": this.path(true),
        "pop": true,
        "state": ev.state,
        "type": ev.type
      });
    });
  }
  ngOnDestroy() {
    this._urlChangeSubscription?.unsubscribe();
    this._urlChangeListeners = [];
  }
  path(includeHash = false) {
    return this.normalize(this._locationStrategy.path(includeHash));
  }
  getState() {
    return this._locationStrategy.getState();
  }
  isCurrentPathEqualTo(path, query = "") {
    return this.path() == this.normalize(path + normalizeQueryParams(query));
  }
  normalize(url) {
    return _Location.stripTrailingSlash(_stripBasePath(this._basePath, _stripIndexHtml(url)));
  }
  prepareExternalUrl(url) {
    if (url && url[0] !== "/") {
      url = "/" + url;
    }
    return this._locationStrategy.prepareExternalUrl(url);
  }
  go(path, query = "", state = null) {
    this._locationStrategy.pushState(state, "", path, query);
    this._notifyUrlChangeListeners(this.prepareExternalUrl(path + normalizeQueryParams(query)), state);
  }
  replaceState(path, query = "", state = null) {
    this._locationStrategy.replaceState(state, "", path, query);
    this._notifyUrlChangeListeners(this.prepareExternalUrl(path + normalizeQueryParams(query)), state);
  }
  forward() {
    this._locationStrategy.forward();
  }
  back() {
    this._locationStrategy.back();
  }
  historyGo(relativePosition = 0) {
    this._locationStrategy.historyGo?.(relativePosition);
  }
  onUrlChange(fn) {
    this._urlChangeListeners.push(fn);
    this._urlChangeSubscription ??= this.subscribe((v) => {
      this._notifyUrlChangeListeners(v.url, v.state);
    });
    return () => {
      const fnIndex = this._urlChangeListeners.indexOf(fn);
      this._urlChangeListeners.splice(fnIndex, 1);
      if (this._urlChangeListeners.length === 0) {
        this._urlChangeSubscription?.unsubscribe();
        this._urlChangeSubscription = null;
      }
    };
  }
  _notifyUrlChangeListeners(url = "", state) {
    this._urlChangeListeners.forEach((fn) => fn(url, state));
  }
  subscribe(onNext, onThrow, onReturn) {
    return this._subject.subscribe({
      next: onNext,
      error: onThrow ?? void 0,
      complete: onReturn ?? void 0
    });
  }
  static normalizeQueryParams = normalizeQueryParams;
  static joinWithSlash = joinWithSlash;
  static stripTrailingSlash = stripTrailingSlash;
  static \u0275fac = function Location_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Location)(\u0275\u0275inject(LocationStrategy));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _Location,
    factory: () => createLocation(),
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Location, [{
    type: Injectable,
    args: [{
      providedIn: "root",
      useFactory: createLocation
    }]
  }], () => [{
    type: LocationStrategy
  }], null);
})();
function createLocation() {
  return new Location(\u0275\u0275inject(LocationStrategy));
}
function _stripBasePath(basePath, url) {
  if (!basePath || !url.startsWith(basePath)) {
    return url;
  }
  const strippedUrl = url.substring(basePath.length);
  if (strippedUrl === "" || ["/", ";", "?", "#"].includes(strippedUrl[0])) {
    return strippedUrl;
  }
  return url;
}
function _stripIndexHtml(url) {
  return url.replace(/\/index.html$/, "");
}
function _stripOrigin(baseHref) {
  const isAbsoluteUrl2 = new RegExp("^(https?:)?//").test(baseHref);
  if (isAbsoluteUrl2) {
    const [, pathname] = baseHref.split(/\/\/[^\/]+/);
    return pathname;
  }
  return baseHref;
}

// node_modules/@angular/common/fesm2022/_common_module-chunk.mjs
/**
 * @license Angular v21.2.9
 * (c) 2010-2026 Google LLC. https://angular.dev/
 * License: MIT
 */
var HashLocationStrategy = class _HashLocationStrategy extends LocationStrategy {
  _platformLocation;
  _baseHref = "";
  _removeListenerFns = [];
  constructor(_platformLocation, _baseHref) {
    super();
    this._platformLocation = _platformLocation;
    if (_baseHref != null) {
      this._baseHref = _baseHref;
    }
  }
  ngOnDestroy() {
    while (this._removeListenerFns.length) {
      this._removeListenerFns.pop()();
    }
  }
  onPopState(fn) {
    this._removeListenerFns.push(this._platformLocation.onPopState(fn), this._platformLocation.onHashChange(fn));
  }
  getBaseHref() {
    return this._baseHref;
  }
  path(includeHash = false) {
    const path = this._platformLocation.hash ?? "#";
    return path.length > 0 ? path.substring(1) : path;
  }
  prepareExternalUrl(internal) {
    const url = joinWithSlash(this._baseHref, internal);
    return url.length > 0 ? "#" + url : url;
  }
  pushState(state, title, path, queryParams) {
    const url = this.prepareExternalUrl(path + normalizeQueryParams(queryParams)) || this._platformLocation.pathname;
    this._platformLocation.pushState(state, title, url);
  }
  replaceState(state, title, path, queryParams) {
    const url = this.prepareExternalUrl(path + normalizeQueryParams(queryParams)) || this._platformLocation.pathname;
    this._platformLocation.replaceState(state, title, url);
  }
  forward() {
    this._platformLocation.forward();
  }
  back() {
    this._platformLocation.back();
  }
  getState() {
    return this._platformLocation.getState();
  }
  historyGo(relativePosition = 0) {
    this._platformLocation.historyGo?.(relativePosition);
  }
  static \u0275fac = function HashLocationStrategy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HashLocationStrategy)(\u0275\u0275inject(PlatformLocation), \u0275\u0275inject(APP_BASE_HREF, 8));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _HashLocationStrategy,
    factory: _HashLocationStrategy.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HashLocationStrategy, [{
    type: Injectable
  }], () => [{
    type: PlatformLocation
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [APP_BASE_HREF]
    }]
  }], null);
})();
var CURRENCIES_EN = {
  "ADP": [void 0, void 0, 0],
  "AFN": [void 0, "\u060B", 0],
  "ALL": [void 0, void 0, 0],
  "AMD": [void 0, "\u058F", 2],
  "AOA": [void 0, "Kz"],
  "ARS": [void 0, "$"],
  "AUD": ["A$", "$"],
  "AZN": [void 0, "\u20BC"],
  "BAM": [void 0, "KM"],
  "BBD": [void 0, "$"],
  "BDT": [void 0, "\u09F3"],
  "BHD": [void 0, void 0, 3],
  "BIF": [void 0, void 0, 0],
  "BMD": [void 0, "$"],
  "BND": [void 0, "$"],
  "BOB": [void 0, "Bs"],
  "BRL": ["R$"],
  "BSD": [void 0, "$"],
  "BWP": [void 0, "P"],
  "BYN": [void 0, void 0, 2],
  "BYR": [void 0, void 0, 0],
  "BZD": [void 0, "$"],
  "CAD": ["CA$", "$", 2],
  "CHF": [void 0, void 0, 2],
  "CLF": [void 0, void 0, 4],
  "CLP": [void 0, "$", 0],
  "CNY": ["CN\xA5", "\xA5"],
  "COP": [void 0, "$", 2],
  "CRC": [void 0, "\u20A1", 2],
  "CUC": [void 0, "$"],
  "CUP": [void 0, "$"],
  "CZK": [void 0, "K\u010D", 2],
  "DJF": [void 0, void 0, 0],
  "DKK": [void 0, "kr", 2],
  "DOP": [void 0, "$"],
  "EGP": [void 0, "E\xA3"],
  "ESP": [void 0, "\u20A7", 0],
  "EUR": ["\u20AC"],
  "FJD": [void 0, "$"],
  "FKP": [void 0, "\xA3"],
  "GBP": ["\xA3"],
  "GEL": [void 0, "\u20BE"],
  "GHS": [void 0, "GH\u20B5"],
  "GIP": [void 0, "\xA3"],
  "GNF": [void 0, "FG", 0],
  "GTQ": [void 0, "Q"],
  "GYD": [void 0, "$", 2],
  "HKD": ["HK$", "$"],
  "HNL": [void 0, "L"],
  "HRK": [void 0, "kn"],
  "HUF": [void 0, "Ft", 2],
  "IDR": [void 0, "Rp", 2],
  "ILS": ["\u20AA"],
  "INR": ["\u20B9"],
  "IQD": [void 0, void 0, 0],
  "IRR": [void 0, void 0, 0],
  "ISK": [void 0, "kr", 0],
  "ITL": [void 0, void 0, 0],
  "JMD": [void 0, "$"],
  "JOD": [void 0, void 0, 3],
  "JPY": ["\xA5", void 0, 0],
  "KGS": [void 0, "\u20C0"],
  "KHR": [void 0, "\u17DB"],
  "KMF": [void 0, "CF", 0],
  "KPW": [void 0, "\u20A9", 0],
  "KRW": ["\u20A9", void 0, 0],
  "KWD": [void 0, void 0, 3],
  "KYD": [void 0, "$"],
  "KZT": [void 0, "\u20B8"],
  "LAK": [void 0, "\u20AD", 0],
  "LBP": [void 0, "L\xA3", 0],
  "LKR": [void 0, "Rs"],
  "LRD": [void 0, "$"],
  "LTL": [void 0, "Lt"],
  "LUF": [void 0, void 0, 0],
  "LVL": [void 0, "Ls"],
  "LYD": [void 0, void 0, 3],
  "MGA": [void 0, "Ar", 0],
  "MGF": [void 0, void 0, 0],
  "MMK": [void 0, "K", 0],
  "MNT": [void 0, "\u20AE", 2],
  "MRO": [void 0, void 0, 0],
  "MUR": [void 0, "Rs", 2],
  "MXN": ["MX$", "$"],
  "MYR": [void 0, "RM"],
  "NAD": [void 0, "$"],
  "NGN": [void 0, "\u20A6"],
  "NIO": [void 0, "C$"],
  "NOK": [void 0, "kr", 2],
  "NPR": [void 0, "Rs"],
  "NZD": ["NZ$", "$"],
  "OMR": [void 0, void 0, 3],
  "PHP": ["\u20B1"],
  "PKR": [void 0, "Rs", 2],
  "PLN": [void 0, "z\u0142"],
  "PYG": [void 0, "\u20B2", 0],
  "RON": [void 0, "lei"],
  "RSD": [void 0, void 0, 0],
  "RUB": [void 0, "\u20BD"],
  "RWF": [void 0, "RF", 0],
  "SBD": [void 0, "$"],
  "SEK": [void 0, "kr", 2],
  "SGD": [void 0, "$"],
  "SHP": [void 0, "\xA3"],
  "SLE": [void 0, void 0, 2],
  "SLL": [void 0, void 0, 0],
  "SOS": [void 0, void 0, 0],
  "SRD": [void 0, "$"],
  "SSP": [void 0, "\xA3"],
  "STD": [void 0, void 0, 0],
  "STN": [void 0, "Db"],
  "SYP": [void 0, "\xA3", 0],
  "THB": [void 0, "\u0E3F"],
  "TMM": [void 0, void 0, 0],
  "TND": [void 0, void 0, 3],
  "TOP": [void 0, "T$"],
  "TRL": [void 0, void 0, 0],
  "TRY": [void 0, "\u20BA"],
  "TTD": [void 0, "$"],
  "TWD": ["NT$", "$", 2],
  "TZS": [void 0, void 0, 2],
  "UAH": [void 0, "\u20B4"],
  "UGX": [void 0, void 0, 0],
  "USD": ["$"],
  "UYI": [void 0, void 0, 0],
  "UYU": [void 0, "$"],
  "UYW": [void 0, void 0, 4],
  "UZS": [void 0, void 0, 2],
  "VEF": [void 0, "Bs", 2],
  "VND": ["\u20AB", void 0, 0],
  "VUV": [void 0, void 0, 0],
  "XAF": ["FCFA", void 0, 0],
  "XCD": ["EC$", "$"],
  "XCG": ["Cg."],
  "XOF": ["F\u202FCFA", void 0, 0],
  "XPF": ["CFPF", void 0, 0],
  "XXX": ["\xA4"],
  "YER": [void 0, void 0, 0],
  "ZAR": [void 0, "R"],
  "ZMK": [void 0, void 0, 0],
  "ZMW": [void 0, "ZK"],
  "ZWD": [void 0, void 0, 0]
};
var NumberFormatStyle;
(function(NumberFormatStyle2) {
  NumberFormatStyle2[NumberFormatStyle2["Decimal"] = 0] = "Decimal";
  NumberFormatStyle2[NumberFormatStyle2["Percent"] = 1] = "Percent";
  NumberFormatStyle2[NumberFormatStyle2["Currency"] = 2] = "Currency";
  NumberFormatStyle2[NumberFormatStyle2["Scientific"] = 3] = "Scientific";
})(NumberFormatStyle || (NumberFormatStyle = {}));
var Plural;
(function(Plural2) {
  Plural2[Plural2["Zero"] = 0] = "Zero";
  Plural2[Plural2["One"] = 1] = "One";
  Plural2[Plural2["Two"] = 2] = "Two";
  Plural2[Plural2["Few"] = 3] = "Few";
  Plural2[Plural2["Many"] = 4] = "Many";
  Plural2[Plural2["Other"] = 5] = "Other";
})(Plural || (Plural = {}));
var FormStyle;
(function(FormStyle2) {
  FormStyle2[FormStyle2["Format"] = 0] = "Format";
  FormStyle2[FormStyle2["Standalone"] = 1] = "Standalone";
})(FormStyle || (FormStyle = {}));
var TranslationWidth;
(function(TranslationWidth2) {
  TranslationWidth2[TranslationWidth2["Narrow"] = 0] = "Narrow";
  TranslationWidth2[TranslationWidth2["Abbreviated"] = 1] = "Abbreviated";
  TranslationWidth2[TranslationWidth2["Wide"] = 2] = "Wide";
  TranslationWidth2[TranslationWidth2["Short"] = 3] = "Short";
})(TranslationWidth || (TranslationWidth = {}));
var FormatWidth;
(function(FormatWidth2) {
  FormatWidth2[FormatWidth2["Short"] = 0] = "Short";
  FormatWidth2[FormatWidth2["Medium"] = 1] = "Medium";
  FormatWidth2[FormatWidth2["Long"] = 2] = "Long";
  FormatWidth2[FormatWidth2["Full"] = 3] = "Full";
})(FormatWidth || (FormatWidth = {}));
var NumberSymbol = {
  Decimal: 0,
  Group: 1,
  List: 2,
  PercentSign: 3,
  PlusSign: 4,
  MinusSign: 5,
  Exponential: 6,
  SuperscriptingExponent: 7,
  PerMille: 8,
  Infinity: 9,
  NaN: 10,
  TimeSeparator: 11,
  CurrencyDecimal: 12,
  CurrencyGroup: 13
};
var WeekDay;
(function(WeekDay2) {
  WeekDay2[WeekDay2["Sunday"] = 0] = "Sunday";
  WeekDay2[WeekDay2["Monday"] = 1] = "Monday";
  WeekDay2[WeekDay2["Tuesday"] = 2] = "Tuesday";
  WeekDay2[WeekDay2["Wednesday"] = 3] = "Wednesday";
  WeekDay2[WeekDay2["Thursday"] = 4] = "Thursday";
  WeekDay2[WeekDay2["Friday"] = 5] = "Friday";
  WeekDay2[WeekDay2["Saturday"] = 6] = "Saturday";
})(WeekDay || (WeekDay = {}));
function getLocaleId(locale) {
  return findLocaleData(locale)[LocaleDataIndex.LocaleId];
}
function getLocaleDayPeriods(locale, formStyle, width) {
  const data = findLocaleData(locale);
  const amPmData = [data[LocaleDataIndex.DayPeriodsFormat], data[LocaleDataIndex.DayPeriodsStandalone]];
  const amPm = getLastDefinedValue(amPmData, formStyle);
  return getLastDefinedValue(amPm, width);
}
function getLocaleDayNames(locale, formStyle, width) {
  const data = findLocaleData(locale);
  const daysData = [data[LocaleDataIndex.DaysFormat], data[LocaleDataIndex.DaysStandalone]];
  const days = getLastDefinedValue(daysData, formStyle);
  return getLastDefinedValue(days, width);
}
function getLocaleMonthNames(locale, formStyle, width) {
  const data = findLocaleData(locale);
  const monthsData = [data[LocaleDataIndex.MonthsFormat], data[LocaleDataIndex.MonthsStandalone]];
  const months = getLastDefinedValue(monthsData, formStyle);
  return getLastDefinedValue(months, width);
}
function getLocaleEraNames(locale, width) {
  const data = findLocaleData(locale);
  const erasData = data[LocaleDataIndex.Eras];
  return getLastDefinedValue(erasData, width);
}
function getLocaleDateFormat(locale, width) {
  const data = findLocaleData(locale);
  return getLastDefinedValue(data[LocaleDataIndex.DateFormat], width);
}
function getLocaleTimeFormat(locale, width) {
  const data = findLocaleData(locale);
  return getLastDefinedValue(data[LocaleDataIndex.TimeFormat], width);
}
function getLocaleDateTimeFormat(locale, width) {
  const data = findLocaleData(locale);
  const dateTimeFormatData = data[LocaleDataIndex.DateTimeFormat];
  return getLastDefinedValue(dateTimeFormatData, width);
}
function getLocaleNumberSymbol(locale, symbol) {
  const data = findLocaleData(locale);
  const res = data[LocaleDataIndex.NumberSymbols][symbol];
  if (typeof res === "undefined") {
    if (symbol === NumberSymbol.CurrencyDecimal) {
      return data[LocaleDataIndex.NumberSymbols][NumberSymbol.Decimal];
    } else if (symbol === NumberSymbol.CurrencyGroup) {
      return data[LocaleDataIndex.NumberSymbols][NumberSymbol.Group];
    }
  }
  return res;
}
function getLocaleNumberFormat(locale, type) {
  const data = findLocaleData(locale);
  return data[LocaleDataIndex.NumberFormats][type];
}
function getLocaleCurrencies(locale) {
  const data = findLocaleData(locale);
  return data[LocaleDataIndex.Currencies];
}
var getLocalePluralCase2 = getLocalePluralCase;
function checkFullData(data) {
  if (!data[LocaleDataIndex.ExtraData]) {
    throw new RuntimeError(2303, ngDevMode && `Missing extra locale data for the locale "${data[LocaleDataIndex.LocaleId]}". Use "registerLocaleData" to load new data. See the "I18n guide" on angular.io to know more.`);
  }
}
function getLocaleExtraDayPeriodRules(locale) {
  const data = findLocaleData(locale);
  checkFullData(data);
  const rules = data[LocaleDataIndex.ExtraData][2] || [];
  return rules.map((rule) => {
    if (typeof rule === "string") {
      return extractTime(rule);
    }
    return [extractTime(rule[0]), extractTime(rule[1])];
  });
}
function getLocaleExtraDayPeriods(locale, formStyle, width) {
  const data = findLocaleData(locale);
  checkFullData(data);
  const dayPeriodsData = [data[LocaleDataIndex.ExtraData][0], data[LocaleDataIndex.ExtraData][1]];
  const dayPeriods = getLastDefinedValue(dayPeriodsData, formStyle) || [];
  return getLastDefinedValue(dayPeriods, width) || [];
}
function getLastDefinedValue(data, index) {
  for (let i = index; i > -1; i--) {
    if (typeof data[i] !== "undefined") {
      return data[i];
    }
  }
  throw new RuntimeError(2304, ngDevMode && "Locale data API: locale data undefined");
}
function extractTime(time) {
  const [h, m] = time.split(":");
  return {
    hours: +h,
    minutes: +m
  };
}
function getCurrencySymbol(code, format, locale = "en") {
  const currency = getLocaleCurrencies(locale)[code] || CURRENCIES_EN[code] || [];
  const symbolNarrow = currency[1];
  if (format === "narrow" && typeof symbolNarrow === "string") {
    return symbolNarrow;
  }
  return currency[0] || code;
}
var DEFAULT_NB_OF_CURRENCY_DIGITS = 2;
function getNumberOfCurrencyDigits(code) {
  let digits;
  const currency = CURRENCIES_EN[code];
  if (currency) {
    digits = currency[2];
  }
  return typeof digits === "number" ? digits : DEFAULT_NB_OF_CURRENCY_DIGITS;
}
var ISO8601_DATE_REGEX = /^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
var NAMED_FORMATS = {};
var DATE_FORMATS_SPLIT = /((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/;
function formatDate(value, format, locale, timezone) {
  let date = toDate(value);
  const namedFormat = getNamedFormat(locale, format);
  format = namedFormat || format;
  let parts = [];
  let match;
  while (format) {
    match = DATE_FORMATS_SPLIT.exec(format);
    if (match) {
      parts = parts.concat(match.slice(1));
      const part = parts.pop();
      if (!part) {
        break;
      }
      format = part;
    } else {
      parts.push(format);
      break;
    }
  }
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    assertValidDateFormat(parts);
  }
  let dateTimezoneOffset = date.getTimezoneOffset();
  if (timezone) {
    dateTimezoneOffset = timezoneToOffset(timezone, dateTimezoneOffset);
    date = convertTimezoneToLocal(date, timezone);
  }
  let text = "";
  parts.forEach((value2) => {
    const dateFormatter = getDateFormatter(value2);
    text += dateFormatter ? dateFormatter(date, locale, dateTimezoneOffset) : value2 === "''" ? "'" : value2.replace(/(^'|'$)/g, "").replace(/''/g, "'");
  });
  return text;
}
function assertValidDateFormat(parts) {
  if (parts.some((part) => /^Y+$/.test(part)) && !parts.some((part) => /^w+$/.test(part))) {
    const message = `Suspicious use of week-based year "Y" in date pattern "${parts.join("")}". Did you mean to use calendar year "y" instead?`;
    if (parts.length === 1) {
      console.error(formatRuntimeError(2300, message));
    } else {
      throw new RuntimeError(2300, message);
    }
  }
}
function createDate(year, month, date) {
  const newDate = /* @__PURE__ */ new Date(0);
  newDate.setFullYear(year, month, date);
  newDate.setHours(0, 0, 0);
  return newDate;
}
function getNamedFormat(locale, format) {
  const localeId = getLocaleId(locale);
  NAMED_FORMATS[localeId] ??= {};
  if (NAMED_FORMATS[localeId][format]) {
    return NAMED_FORMATS[localeId][format];
  }
  let formatValue = "";
  switch (format) {
    case "shortDate":
      formatValue = getLocaleDateFormat(locale, FormatWidth.Short);
      break;
    case "mediumDate":
      formatValue = getLocaleDateFormat(locale, FormatWidth.Medium);
      break;
    case "longDate":
      formatValue = getLocaleDateFormat(locale, FormatWidth.Long);
      break;
    case "fullDate":
      formatValue = getLocaleDateFormat(locale, FormatWidth.Full);
      break;
    case "shortTime":
      formatValue = getLocaleTimeFormat(locale, FormatWidth.Short);
      break;
    case "mediumTime":
      formatValue = getLocaleTimeFormat(locale, FormatWidth.Medium);
      break;
    case "longTime":
      formatValue = getLocaleTimeFormat(locale, FormatWidth.Long);
      break;
    case "fullTime":
      formatValue = getLocaleTimeFormat(locale, FormatWidth.Full);
      break;
    case "short":
      const shortTime = getNamedFormat(locale, "shortTime");
      const shortDate = getNamedFormat(locale, "shortDate");
      formatValue = formatDateTime(getLocaleDateTimeFormat(locale, FormatWidth.Short), [shortTime, shortDate]);
      break;
    case "medium":
      const mediumTime = getNamedFormat(locale, "mediumTime");
      const mediumDate = getNamedFormat(locale, "mediumDate");
      formatValue = formatDateTime(getLocaleDateTimeFormat(locale, FormatWidth.Medium), [mediumTime, mediumDate]);
      break;
    case "long":
      const longTime = getNamedFormat(locale, "longTime");
      const longDate = getNamedFormat(locale, "longDate");
      formatValue = formatDateTime(getLocaleDateTimeFormat(locale, FormatWidth.Long), [longTime, longDate]);
      break;
    case "full":
      const fullTime = getNamedFormat(locale, "fullTime");
      const fullDate = getNamedFormat(locale, "fullDate");
      formatValue = formatDateTime(getLocaleDateTimeFormat(locale, FormatWidth.Full), [fullTime, fullDate]);
      break;
  }
  if (formatValue) {
    NAMED_FORMATS[localeId][format] = formatValue;
  }
  return formatValue;
}
function formatDateTime(str, opt_values) {
  if (opt_values) {
    str = str.replace(/\{([^}]+)}/g, function(match, key) {
      return opt_values != null && key in opt_values ? opt_values[key] : match;
    });
  }
  return str;
}
function padNumber(num, digits, minusSign = "-", trim, negWrap) {
  let neg = "";
  if (num < 0 || negWrap && num <= 0) {
    if (negWrap) {
      num = -num + 1;
    } else {
      num = -num;
      neg = minusSign;
    }
  }
  let strNum = String(num);
  while (strNum.length < digits) {
    strNum = "0" + strNum;
  }
  if (trim) {
    strNum = strNum.slice(strNum.length - digits);
  }
  return neg + strNum;
}
function formatFractionalSeconds(milliseconds, digits) {
  const strMs = padNumber(milliseconds, 3);
  return strMs.substring(0, digits);
}
function dateGetter(name, size, offset = 0, trim = false, negWrap = false) {
  return function(date, locale) {
    let part = getDatePart(name, date);
    if (offset > 0 || part > -offset) {
      part += offset;
    }
    if (name === 3) {
      if (part === 0 && offset === -12) {
        part = 12;
      }
    } else if (name === 6) {
      return formatFractionalSeconds(part, size);
    }
    const localeMinus = getLocaleNumberSymbol(locale, NumberSymbol.MinusSign);
    return padNumber(part, size, localeMinus, trim, negWrap);
  };
}
function getDatePart(part, date) {
  switch (part) {
    case 0:
      return date.getFullYear();
    case 1:
      return date.getMonth();
    case 2:
      return date.getDate();
    case 3:
      return date.getHours();
    case 4:
      return date.getMinutes();
    case 5:
      return date.getSeconds();
    case 6:
      return date.getMilliseconds();
    case 7:
      return date.getDay();
    default:
      throw new RuntimeError(2301, ngDevMode && `Unknown DateType value "${part}".`);
  }
}
function dateStrGetter(name, width, form = FormStyle.Format, extended = false) {
  return function(date, locale) {
    return getDateTranslation(date, locale, name, width, form, extended);
  };
}
function getDateTranslation(date, locale, name, width, form, extended) {
  switch (name) {
    case 2:
      return getLocaleMonthNames(locale, form, width)[date.getMonth()];
    case 1:
      return getLocaleDayNames(locale, form, width)[date.getDay()];
    case 0:
      const currentHours = date.getHours();
      const currentMinutes = date.getMinutes();
      if (extended) {
        const rules = getLocaleExtraDayPeriodRules(locale);
        const dayPeriods = getLocaleExtraDayPeriods(locale, form, width);
        const index = rules.findIndex((rule) => {
          if (Array.isArray(rule)) {
            const [from2, to] = rule;
            const afterFrom = currentHours >= from2.hours && currentMinutes >= from2.minutes;
            const beforeTo = currentHours < to.hours || currentHours === to.hours && currentMinutes < to.minutes;
            if (from2.hours < to.hours) {
              if (afterFrom && beforeTo) {
                return true;
              }
            } else if (afterFrom || beforeTo) {
              return true;
            }
          } else {
            if (rule.hours === currentHours && rule.minutes === currentMinutes) {
              return true;
            }
          }
          return false;
        });
        if (index !== -1) {
          return dayPeriods[index];
        }
      }
      return getLocaleDayPeriods(locale, form, width)[currentHours < 12 ? 0 : 1];
    case 3:
      return getLocaleEraNames(locale, width)[date.getFullYear() <= 0 ? 0 : 1];
    default:
      const unexpected = name;
      throw new RuntimeError(2302, ngDevMode && `unexpected translation type ${unexpected}`);
  }
}
function timeZoneGetter(width) {
  return function(date, locale, offset) {
    const zone = -1 * offset;
    const minusSign = getLocaleNumberSymbol(locale, NumberSymbol.MinusSign);
    const hours = zone > 0 ? Math.floor(zone / 60) : Math.ceil(zone / 60);
    switch (width) {
      case 0:
        return (zone >= 0 ? "+" : "") + padNumber(hours, 2, minusSign) + padNumber(Math.abs(zone % 60), 2, minusSign);
      case 1:
        return "GMT" + (zone >= 0 ? "+" : "") + padNumber(hours, 1, minusSign);
      case 2:
        return "GMT" + (zone >= 0 ? "+" : "") + padNumber(hours, 2, minusSign) + ":" + padNumber(Math.abs(zone % 60), 2, minusSign);
      case 3:
        if (offset === 0) {
          return "Z";
        } else {
          return (zone >= 0 ? "+" : "") + padNumber(hours, 2, minusSign) + ":" + padNumber(Math.abs(zone % 60), 2, minusSign);
        }
      default:
        throw new RuntimeError(2310, ngDevMode && `Unknown zone width "${width}"`);
    }
  };
}
var JANUARY = 0;
var THURSDAY = 4;
function getFirstThursdayOfYear(year) {
  const firstDayOfYear = createDate(year, JANUARY, 1).getDay();
  return createDate(year, 0, 1 + (firstDayOfYear <= THURSDAY ? THURSDAY : THURSDAY + 7) - firstDayOfYear);
}
function getThursdayThisIsoWeek(datetime) {
  const currentDay = datetime.getDay();
  const deltaToThursday = currentDay === 0 ? -3 : THURSDAY - currentDay;
  return createDate(datetime.getFullYear(), datetime.getMonth(), datetime.getDate() + deltaToThursday);
}
function weekGetter(size, monthBased = false) {
  return function(date, locale) {
    let result;
    if (monthBased) {
      const nbDaysBefore1stDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay() - 1;
      const today = date.getDate();
      result = 1 + Math.floor((today + nbDaysBefore1stDayOfMonth) / 7);
    } else {
      const thisThurs = getThursdayThisIsoWeek(date);
      const firstThurs = getFirstThursdayOfYear(thisThurs.getFullYear());
      const diff = thisThurs.getTime() - firstThurs.getTime();
      result = 1 + Math.round(diff / 6048e5);
    }
    return padNumber(result, size, getLocaleNumberSymbol(locale, NumberSymbol.MinusSign));
  };
}
function weekNumberingYearGetter(size, trim = false) {
  return function(date, locale) {
    const thisThurs = getThursdayThisIsoWeek(date);
    const weekNumberingYear = thisThurs.getFullYear();
    return padNumber(weekNumberingYear, size, getLocaleNumberSymbol(locale, NumberSymbol.MinusSign), trim);
  };
}
var DATE_FORMATS = {};
function getDateFormatter(format) {
  if (DATE_FORMATS[format]) {
    return DATE_FORMATS[format];
  }
  let formatter;
  switch (format) {
    case "G":
    case "GG":
    case "GGG":
      formatter = dateStrGetter(3, TranslationWidth.Abbreviated);
      break;
    case "GGGG":
      formatter = dateStrGetter(3, TranslationWidth.Wide);
      break;
    case "GGGGG":
      formatter = dateStrGetter(3, TranslationWidth.Narrow);
      break;
    case "y":
      formatter = dateGetter(0, 1, 0, false, true);
      break;
    case "yy":
      formatter = dateGetter(0, 2, 0, true, true);
      break;
    case "yyy":
      formatter = dateGetter(0, 3, 0, false, true);
      break;
    case "yyyy":
      formatter = dateGetter(0, 4, 0, false, true);
      break;
    case "Y":
      formatter = weekNumberingYearGetter(1);
      break;
    case "YY":
      formatter = weekNumberingYearGetter(2, true);
      break;
    case "YYY":
      formatter = weekNumberingYearGetter(3);
      break;
    case "YYYY":
      formatter = weekNumberingYearGetter(4);
      break;
    case "M":
    case "L":
      formatter = dateGetter(1, 1, 1);
      break;
    case "MM":
    case "LL":
      formatter = dateGetter(1, 2, 1);
      break;
    case "MMM":
      formatter = dateStrGetter(2, TranslationWidth.Abbreviated);
      break;
    case "MMMM":
      formatter = dateStrGetter(2, TranslationWidth.Wide);
      break;
    case "MMMMM":
      formatter = dateStrGetter(2, TranslationWidth.Narrow);
      break;
    case "LLL":
      formatter = dateStrGetter(2, TranslationWidth.Abbreviated, FormStyle.Standalone);
      break;
    case "LLLL":
      formatter = dateStrGetter(2, TranslationWidth.Wide, FormStyle.Standalone);
      break;
    case "LLLLL":
      formatter = dateStrGetter(2, TranslationWidth.Narrow, FormStyle.Standalone);
      break;
    case "w":
      formatter = weekGetter(1);
      break;
    case "ww":
      formatter = weekGetter(2);
      break;
    case "W":
      formatter = weekGetter(1, true);
      break;
    case "d":
      formatter = dateGetter(2, 1);
      break;
    case "dd":
      formatter = dateGetter(2, 2);
      break;
    case "c":
    case "cc":
      formatter = dateGetter(7, 1);
      break;
    case "ccc":
      formatter = dateStrGetter(1, TranslationWidth.Abbreviated, FormStyle.Standalone);
      break;
    case "cccc":
      formatter = dateStrGetter(1, TranslationWidth.Wide, FormStyle.Standalone);
      break;
    case "ccccc":
      formatter = dateStrGetter(1, TranslationWidth.Narrow, FormStyle.Standalone);
      break;
    case "cccccc":
      formatter = dateStrGetter(1, TranslationWidth.Short, FormStyle.Standalone);
      break;
    case "E":
    case "EE":
    case "EEE":
      formatter = dateStrGetter(1, TranslationWidth.Abbreviated);
      break;
    case "EEEE":
      formatter = dateStrGetter(1, TranslationWidth.Wide);
      break;
    case "EEEEE":
      formatter = dateStrGetter(1, TranslationWidth.Narrow);
      break;
    case "EEEEEE":
      formatter = dateStrGetter(1, TranslationWidth.Short);
      break;
    case "a":
    case "aa":
    case "aaa":
      formatter = dateStrGetter(0, TranslationWidth.Abbreviated);
      break;
    case "aaaa":
      formatter = dateStrGetter(0, TranslationWidth.Wide);
      break;
    case "aaaaa":
      formatter = dateStrGetter(0, TranslationWidth.Narrow);
      break;
    case "b":
    case "bb":
    case "bbb":
      formatter = dateStrGetter(0, TranslationWidth.Abbreviated, FormStyle.Standalone, true);
      break;
    case "bbbb":
      formatter = dateStrGetter(0, TranslationWidth.Wide, FormStyle.Standalone, true);
      break;
    case "bbbbb":
      formatter = dateStrGetter(0, TranslationWidth.Narrow, FormStyle.Standalone, true);
      break;
    case "B":
    case "BB":
    case "BBB":
      formatter = dateStrGetter(0, TranslationWidth.Abbreviated, FormStyle.Format, true);
      break;
    case "BBBB":
      formatter = dateStrGetter(0, TranslationWidth.Wide, FormStyle.Format, true);
      break;
    case "BBBBB":
      formatter = dateStrGetter(0, TranslationWidth.Narrow, FormStyle.Format, true);
      break;
    case "h":
      formatter = dateGetter(3, 1, -12);
      break;
    case "hh":
      formatter = dateGetter(3, 2, -12);
      break;
    case "H":
      formatter = dateGetter(3, 1);
      break;
    case "HH":
      formatter = dateGetter(3, 2);
      break;
    case "m":
      formatter = dateGetter(4, 1);
      break;
    case "mm":
      formatter = dateGetter(4, 2);
      break;
    case "s":
      formatter = dateGetter(5, 1);
      break;
    case "ss":
      formatter = dateGetter(5, 2);
      break;
    case "S":
      formatter = dateGetter(6, 1);
      break;
    case "SS":
      formatter = dateGetter(6, 2);
      break;
    case "SSS":
      formatter = dateGetter(6, 3);
      break;
    case "Z":
    case "ZZ":
    case "ZZZ":
      formatter = timeZoneGetter(0);
      break;
    case "ZZZZZ":
      formatter = timeZoneGetter(3);
      break;
    case "O":
    case "OO":
    case "OOO":
    case "z":
    case "zz":
    case "zzz":
      formatter = timeZoneGetter(1);
      break;
    case "OOOO":
    case "ZZZZ":
    case "zzzz":
      formatter = timeZoneGetter(2);
      break;
    default:
      return null;
  }
  DATE_FORMATS[format] = formatter;
  return formatter;
}
function timezoneToOffset(timezone, fallback) {
  timezone = timezone.replace(/:/g, "");
  const requestedTimezoneOffset = Date.parse("Jan 01, 1970 00:00:00 " + timezone) / 6e4;
  return isNaN(requestedTimezoneOffset) ? fallback : requestedTimezoneOffset;
}
function addDateMinutes(date, minutes) {
  date = new Date(date.getTime());
  date.setMinutes(date.getMinutes() + minutes);
  return date;
}
function convertTimezoneToLocal(date, timezone, reverse) {
  const reverseValue = -1;
  const dateTimezoneOffset = date.getTimezoneOffset();
  const timezoneOffset = timezoneToOffset(timezone, dateTimezoneOffset);
  return addDateMinutes(date, reverseValue * (timezoneOffset - dateTimezoneOffset));
}
function toDate(value) {
  if (isDate(value)) {
    return value;
  }
  if (typeof value === "number" && !isNaN(value)) {
    return new Date(value);
  }
  if (typeof value === "string") {
    value = value.trim();
    if (/^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(value)) {
      const [y, m = 1, d = 1] = value.split("-").map((val) => +val);
      return createDate(y, m - 1, d);
    }
    const parsedNb = parseFloat(value);
    if (!isNaN(value - parsedNb)) {
      return new Date(parsedNb);
    }
    let match;
    if (match = value.match(ISO8601_DATE_REGEX)) {
      return isoStringToDate(match);
    }
  }
  const date = new Date(value);
  if (!isDate(date)) {
    throw new RuntimeError(2311, ngDevMode && `Unable to convert "${value}" into a date`);
  }
  return date;
}
function isoStringToDate(match) {
  const date = /* @__PURE__ */ new Date(0);
  let tzHour = 0;
  let tzMin = 0;
  const dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear;
  const timeSetter = match[8] ? date.setUTCHours : date.setHours;
  if (match[9]) {
    tzHour = Number(match[9] + match[10]);
    tzMin = Number(match[9] + match[11]);
  }
  dateSetter.call(date, Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  const h = Number(match[4] || 0) - tzHour;
  const m = Number(match[5] || 0) - tzMin;
  const s = Number(match[6] || 0);
  const ms = Math.floor(parseFloat("0." + (match[7] || 0)) * 1e3);
  timeSetter.call(date, h, m, s, ms);
  return date;
}
function isDate(value) {
  return value instanceof Date && !isNaN(value.valueOf());
}
var NUMBER_FORMAT_REGEXP = /^(\d+)?\.((\d+)(-(\d+))?)?$/;
var MAX_DIGITS = 22;
var DECIMAL_SEP = ".";
var ZERO_CHAR = "0";
var PATTERN_SEP = ";";
var GROUP_SEP = ",";
var DIGIT_CHAR = "#";
var CURRENCY_CHAR = "\xA4";
var PERCENT_CHAR = "%";
function formatNumberToLocaleString(value, pattern, locale, groupSymbol, decimalSymbol, digitsInfo, isPercent = false) {
  let formattedText = "";
  let isZero = false;
  if (!isFinite(value)) {
    formattedText = getLocaleNumberSymbol(locale, NumberSymbol.Infinity);
  } else {
    let parsedNumber = parseNumber(value);
    if (isPercent) {
      parsedNumber = toPercent(parsedNumber);
    }
    let minInt = pattern.minInt;
    let minFraction = pattern.minFrac;
    let maxFraction = pattern.maxFrac;
    if (digitsInfo) {
      const parts = digitsInfo.match(NUMBER_FORMAT_REGEXP);
      if (parts === null) {
        throw new RuntimeError(2306, ngDevMode && `${digitsInfo} is not a valid digit info`);
      }
      const minIntPart = parts[1];
      const minFractionPart = parts[3];
      const maxFractionPart = parts[5];
      if (minIntPart != null) {
        minInt = parseIntAutoRadix(minIntPart);
      }
      if (minFractionPart != null) {
        minFraction = parseIntAutoRadix(minFractionPart);
      }
      if (maxFractionPart != null) {
        maxFraction = parseIntAutoRadix(maxFractionPart);
      } else if (minFractionPart != null && minFraction > maxFraction) {
        maxFraction = minFraction;
      }
    }
    roundNumber(parsedNumber, minFraction, maxFraction);
    let digits = parsedNumber.digits;
    let integerLen = parsedNumber.integerLen;
    const exponent = parsedNumber.exponent;
    let decimals = [];
    isZero = digits.every((d) => !d);
    for (; integerLen < minInt; integerLen++) {
      digits.unshift(0);
    }
    for (; integerLen < 0; integerLen++) {
      digits.unshift(0);
    }
    if (integerLen > 0) {
      decimals = digits.splice(integerLen, digits.length);
    } else {
      decimals = digits;
      digits = [0];
    }
    const groups = [];
    if (digits.length >= pattern.lgSize) {
      groups.unshift(digits.splice(-pattern.lgSize, digits.length).join(""));
    }
    while (digits.length > pattern.gSize) {
      groups.unshift(digits.splice(-pattern.gSize, digits.length).join(""));
    }
    if (digits.length) {
      groups.unshift(digits.join(""));
    }
    formattedText = groups.join(getLocaleNumberSymbol(locale, groupSymbol));
    if (decimals.length) {
      formattedText += getLocaleNumberSymbol(locale, decimalSymbol) + decimals.join("");
    }
    if (exponent) {
      formattedText += getLocaleNumberSymbol(locale, NumberSymbol.Exponential) + "+" + exponent;
    }
  }
  if (value < 0 && !isZero) {
    formattedText = pattern.negPre + formattedText + pattern.negSuf;
  } else {
    formattedText = pattern.posPre + formattedText + pattern.posSuf;
  }
  return formattedText;
}
function formatCurrency(value, locale, currency, currencyCode, digitsInfo) {
  const format = getLocaleNumberFormat(locale, NumberFormatStyle.Currency);
  const pattern = parseNumberFormat(format, getLocaleNumberSymbol(locale, NumberSymbol.MinusSign));
  pattern.minFrac = getNumberOfCurrencyDigits(currencyCode);
  pattern.maxFrac = pattern.minFrac;
  const res = formatNumberToLocaleString(value, pattern, locale, NumberSymbol.CurrencyGroup, NumberSymbol.CurrencyDecimal, digitsInfo);
  return res.replace(CURRENCY_CHAR, currency).replace(CURRENCY_CHAR, "").trim();
}
function formatPercent(value, locale, digitsInfo) {
  const format = getLocaleNumberFormat(locale, NumberFormatStyle.Percent);
  const pattern = parseNumberFormat(format, getLocaleNumberSymbol(locale, NumberSymbol.MinusSign));
  const res = formatNumberToLocaleString(value, pattern, locale, NumberSymbol.Group, NumberSymbol.Decimal, digitsInfo, true);
  return res.replace(new RegExp(PERCENT_CHAR, "g"), getLocaleNumberSymbol(locale, NumberSymbol.PercentSign));
}
function formatNumber(value, locale, digitsInfo) {
  const format = getLocaleNumberFormat(locale, NumberFormatStyle.Decimal);
  const pattern = parseNumberFormat(format, getLocaleNumberSymbol(locale, NumberSymbol.MinusSign));
  return formatNumberToLocaleString(value, pattern, locale, NumberSymbol.Group, NumberSymbol.Decimal, digitsInfo);
}
function parseNumberFormat(format, minusSign = "-") {
  const p = {
    minInt: 1,
    minFrac: 0,
    maxFrac: 0,
    posPre: "",
    posSuf: "",
    negPre: "",
    negSuf: "",
    gSize: 0,
    lgSize: 0
  };
  const patternParts = format.split(PATTERN_SEP);
  const positive = patternParts[0];
  const negative = patternParts[1];
  const positiveParts = positive.indexOf(DECIMAL_SEP) !== -1 ? positive.split(DECIMAL_SEP) : [positive.substring(0, positive.lastIndexOf(ZERO_CHAR) + 1), positive.substring(positive.lastIndexOf(ZERO_CHAR) + 1)], integer = positiveParts[0], fraction = positiveParts[1] || "";
  p.posPre = integer.substring(0, integer.indexOf(DIGIT_CHAR));
  for (let i = 0; i < fraction.length; i++) {
    const ch = fraction.charAt(i);
    if (ch === ZERO_CHAR) {
      p.minFrac = p.maxFrac = i + 1;
    } else if (ch === DIGIT_CHAR) {
      p.maxFrac = i + 1;
    } else {
      p.posSuf += ch;
    }
  }
  const groups = integer.split(GROUP_SEP);
  p.gSize = groups[1] ? groups[1].length : 0;
  p.lgSize = groups[2] || groups[1] ? (groups[2] || groups[1]).length : 0;
  if (negative) {
    const trunkLen = positive.length - p.posPre.length - p.posSuf.length, pos = negative.indexOf(DIGIT_CHAR);
    p.negPre = negative.substring(0, pos).replace(/'/g, "");
    p.negSuf = negative.slice(pos + trunkLen).replace(/'/g, "");
  } else {
    p.negPre = minusSign + p.posPre;
    p.negSuf = p.posSuf;
  }
  return p;
}
function toPercent(parsedNumber) {
  if (parsedNumber.digits[0] === 0) {
    return parsedNumber;
  }
  const fractionLen = parsedNumber.digits.length - parsedNumber.integerLen;
  if (parsedNumber.exponent) {
    parsedNumber.exponent += 2;
  } else {
    if (fractionLen === 0) {
      parsedNumber.digits.push(0, 0);
    } else if (fractionLen === 1) {
      parsedNumber.digits.push(0);
    }
    parsedNumber.integerLen += 2;
  }
  return parsedNumber;
}
function parseNumber(num) {
  let numStr = Math.abs(num) + "";
  let exponent = 0, digits, integerLen;
  let i, j, zeros;
  if ((integerLen = numStr.indexOf(DECIMAL_SEP)) > -1) {
    numStr = numStr.replace(DECIMAL_SEP, "");
  }
  if ((i = numStr.search(/e/i)) > 0) {
    if (integerLen < 0) integerLen = i;
    integerLen += +numStr.slice(i + 1);
    numStr = numStr.substring(0, i);
  } else if (integerLen < 0) {
    integerLen = numStr.length;
  }
  for (i = 0; numStr.charAt(i) === ZERO_CHAR; i++) {
  }
  if (i === (zeros = numStr.length)) {
    digits = [0];
    integerLen = 1;
  } else {
    zeros--;
    while (numStr.charAt(zeros) === ZERO_CHAR) zeros--;
    integerLen -= i;
    digits = [];
    for (j = 0; i <= zeros; i++, j++) {
      digits[j] = Number(numStr.charAt(i));
    }
  }
  if (integerLen > MAX_DIGITS) {
    digits = digits.splice(0, MAX_DIGITS - 1);
    exponent = integerLen - 1;
    integerLen = 1;
  }
  return {
    digits,
    exponent,
    integerLen
  };
}
function roundNumber(parsedNumber, minFrac, maxFrac) {
  if (minFrac > maxFrac) {
    throw new RuntimeError(2307, ngDevMode && `The minimum number of digits after fraction (${minFrac}) is higher than the maximum (${maxFrac}).`);
  }
  let digits = parsedNumber.digits;
  let fractionLen = digits.length - parsedNumber.integerLen;
  const fractionSize = Math.min(Math.max(minFrac, fractionLen), maxFrac);
  let roundAt = fractionSize + parsedNumber.integerLen;
  let digit = digits[roundAt];
  if (roundAt > 0) {
    digits.splice(Math.max(parsedNumber.integerLen, roundAt));
    for (let j = roundAt; j < digits.length; j++) {
      digits[j] = 0;
    }
  } else {
    fractionLen = Math.max(0, fractionLen);
    parsedNumber.integerLen = 1;
    digits.length = Math.max(1, roundAt = fractionSize + 1);
    digits[0] = 0;
    for (let i = 1; i < roundAt; i++) digits[i] = 0;
  }
  if (digit >= 5) {
    if (roundAt - 1 < 0) {
      for (let k = 0; k > roundAt; k--) {
        digits.unshift(0);
        parsedNumber.integerLen++;
      }
      digits.unshift(1);
      parsedNumber.integerLen++;
    } else {
      digits[roundAt - 1]++;
    }
  }
  for (; fractionLen < Math.max(0, fractionSize); fractionLen++) digits.push(0);
  let dropTrailingZeros = fractionSize !== 0;
  const minLen = minFrac + parsedNumber.integerLen;
  const carry = digits.reduceRight(function(carry2, d, i, digits2) {
    d = d + carry2;
    digits2[i] = d < 10 ? d : d - 10;
    if (dropTrailingZeros) {
      if (digits2[i] === 0 && i >= minLen) {
        digits2.pop();
      } else {
        dropTrailingZeros = false;
      }
    }
    return d >= 10 ? 1 : 0;
  }, 0);
  if (carry) {
    digits.unshift(carry);
    parsedNumber.integerLen++;
  }
}
function parseIntAutoRadix(text) {
  const result = parseInt(text);
  if (isNaN(result)) {
    throw new RuntimeError(2305, ngDevMode && "Invalid integer literal when parsing " + text);
  }
  return result;
}
var NgLocalization = class _NgLocalization {
  static \u0275fac = function NgLocalization_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgLocalization)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _NgLocalization,
    factory: () => (() => new NgLocaleLocalization(inject(LOCALE_ID)))(),
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgLocalization, [{
    type: Injectable,
    args: [{
      providedIn: "root",
      useFactory: () => new NgLocaleLocalization(inject(LOCALE_ID))
    }]
  }], null, null);
})();
function getPluralCategory(value, cases, ngLocalization, locale) {
  let key = `=${value}`;
  if (cases.indexOf(key) > -1) {
    return key;
  }
  key = ngLocalization.getPluralCategory(value, locale);
  if (cases.indexOf(key) > -1) {
    return key;
  }
  if (cases.indexOf("other") > -1) {
    return "other";
  }
  throw new RuntimeError(2308, ngDevMode && `No plural message found for value "${value}"`);
}
var NgLocaleLocalization = class _NgLocaleLocalization extends NgLocalization {
  locale;
  constructor(locale) {
    super();
    this.locale = locale;
  }
  getPluralCategory(value, locale) {
    const plural = getLocalePluralCase2(locale || this.locale)(value);
    switch (plural) {
      case Plural.Zero:
        return "zero";
      case Plural.One:
        return "one";
      case Plural.Two:
        return "two";
      case Plural.Few:
        return "few";
      case Plural.Many:
        return "many";
      default:
        return "other";
    }
  }
  static \u0275fac = function NgLocaleLocalization_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgLocaleLocalization)(\u0275\u0275inject(LOCALE_ID));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _NgLocaleLocalization,
    factory: _NgLocaleLocalization.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgLocaleLocalization, [{
    type: Injectable
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [LOCALE_ID]
    }]
  }], null);
})();
var WS_REGEXP = /\s+/;
var EMPTY_ARRAY = [];
var NgClass = class _NgClass {
  _ngEl;
  _renderer;
  initialClasses = EMPTY_ARRAY;
  rawClass;
  stateMap = /* @__PURE__ */ new Map();
  constructor(_ngEl, _renderer) {
    this._ngEl = _ngEl;
    this._renderer = _renderer;
  }
  set klass(value) {
    this.initialClasses = value != null ? value.trim().split(WS_REGEXP) : EMPTY_ARRAY;
  }
  set ngClass(value) {
    this.rawClass = typeof value === "string" ? value.trim().split(WS_REGEXP) : value;
  }
  ngDoCheck() {
    for (const klass of this.initialClasses) {
      this._updateState(klass, true);
    }
    const rawClass = this.rawClass;
    if (Array.isArray(rawClass) || rawClass instanceof Set) {
      for (const klass of rawClass) {
        this._updateState(klass, true);
      }
    } else if (rawClass != null) {
      for (const klass of Object.keys(rawClass)) {
        this._updateState(klass, Boolean(rawClass[klass]));
      }
    }
    this._applyStateDiff();
  }
  _updateState(klass, nextEnabled) {
    const state = this.stateMap.get(klass);
    if (state !== void 0) {
      if (state.enabled !== nextEnabled) {
        state.changed = true;
        state.enabled = nextEnabled;
      }
      state.touched = true;
    } else {
      this.stateMap.set(klass, {
        enabled: nextEnabled,
        changed: true,
        touched: true
      });
    }
  }
  _applyStateDiff() {
    for (const stateEntry of this.stateMap) {
      const klass = stateEntry[0];
      const state = stateEntry[1];
      if (state.changed) {
        this._toggleClass(klass, state.enabled);
        state.changed = false;
      } else if (!state.touched) {
        if (state.enabled) {
          this._toggleClass(klass, false);
        }
        this.stateMap.delete(klass);
      }
      state.touched = false;
    }
  }
  _toggleClass(klass, enabled) {
    if (ngDevMode) {
      if (typeof klass !== "string") {
        throw new Error(`NgClass can only toggle CSS classes expressed as strings, got ${stringify(klass)}`);
      }
    }
    klass = klass.trim();
    if (klass.length > 0) {
      klass.split(WS_REGEXP).forEach((klass2) => {
        if (enabled) {
          this._renderer.addClass(this._ngEl.nativeElement, klass2);
        } else {
          this._renderer.removeClass(this._ngEl.nativeElement, klass2);
        }
      });
    }
  }
  static \u0275fac = function NgClass_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgClass)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Renderer2));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NgClass,
    selectors: [["", "ngClass", ""]],
    inputs: {
      klass: [0, "class", "klass"],
      ngClass: "ngClass"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgClass, [{
    type: Directive,
    args: [{
      selector: "[ngClass]"
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Renderer2
  }], {
    klass: [{
      type: Input,
      args: ["class"]
    }],
    ngClass: [{
      type: Input,
      args: ["ngClass"]
    }]
  });
})();
var NgComponentOutlet = class _NgComponentOutlet {
  _viewContainerRef;
  ngComponentOutlet = null;
  ngComponentOutletInputs;
  ngComponentOutletInjector;
  ngComponentOutletEnvironmentInjector;
  ngComponentOutletContent;
  ngComponentOutletNgModule;
  _componentRef;
  _moduleRef;
  _inputsUsed = /* @__PURE__ */ new Map();
  get componentInstance() {
    return this._componentRef?.instance ?? null;
  }
  constructor(_viewContainerRef) {
    this._viewContainerRef = _viewContainerRef;
  }
  _needToReCreateNgModuleInstance(changes) {
    return changes["ngComponentOutletNgModule"] !== void 0;
  }
  _needToReCreateComponentInstance(changes) {
    return changes["ngComponentOutlet"] !== void 0 || changes["ngComponentOutletContent"] !== void 0 || changes["ngComponentOutletInjector"] !== void 0 || changes["ngComponentOutletEnvironmentInjector"] !== void 0 || this._needToReCreateNgModuleInstance(changes);
  }
  ngOnChanges(changes) {
    if (this._needToReCreateComponentInstance(changes)) {
      this._viewContainerRef.clear();
      this._inputsUsed.clear();
      this._componentRef = void 0;
      if (this.ngComponentOutlet) {
        const injector = this.ngComponentOutletInjector || this._viewContainerRef.parentInjector;
        if (this._needToReCreateNgModuleInstance(changes)) {
          this._moduleRef?.destroy();
          if (this.ngComponentOutletNgModule) {
            this._moduleRef = createNgModule(this.ngComponentOutletNgModule, getParentInjector(injector));
          } else {
            this._moduleRef = void 0;
          }
        }
        this._componentRef = this._viewContainerRef.createComponent(this.ngComponentOutlet, {
          injector,
          ngModuleRef: this._moduleRef,
          projectableNodes: this.ngComponentOutletContent,
          environmentInjector: this.ngComponentOutletEnvironmentInjector
        });
      }
    }
  }
  ngDoCheck() {
    if (this._componentRef) {
      if (this.ngComponentOutletInputs) {
        for (const inputName of Object.keys(this.ngComponentOutletInputs)) {
          this._inputsUsed.set(inputName, true);
        }
      }
      this._applyInputStateDiff(this._componentRef);
    }
  }
  ngOnDestroy() {
    this._moduleRef?.destroy();
  }
  _applyInputStateDiff(componentRef) {
    for (const [inputName, touched] of this._inputsUsed) {
      if (!touched) {
        componentRef.setInput(inputName, void 0);
        this._inputsUsed.delete(inputName);
      } else {
        componentRef.setInput(inputName, this.ngComponentOutletInputs[inputName]);
        this._inputsUsed.set(inputName, false);
      }
    }
  }
  static \u0275fac = function NgComponentOutlet_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgComponentOutlet)(\u0275\u0275directiveInject(ViewContainerRef));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NgComponentOutlet,
    selectors: [["", "ngComponentOutlet", ""]],
    inputs: {
      ngComponentOutlet: "ngComponentOutlet",
      ngComponentOutletInputs: "ngComponentOutletInputs",
      ngComponentOutletInjector: "ngComponentOutletInjector",
      ngComponentOutletEnvironmentInjector: "ngComponentOutletEnvironmentInjector",
      ngComponentOutletContent: "ngComponentOutletContent",
      ngComponentOutletNgModule: "ngComponentOutletNgModule"
    },
    exportAs: ["ngComponentOutlet"],
    features: [\u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgComponentOutlet, [{
    type: Directive,
    args: [{
      selector: "[ngComponentOutlet]",
      exportAs: "ngComponentOutlet"
    }]
  }], () => [{
    type: ViewContainerRef
  }], {
    ngComponentOutlet: [{
      type: Input
    }],
    ngComponentOutletInputs: [{
      type: Input
    }],
    ngComponentOutletInjector: [{
      type: Input
    }],
    ngComponentOutletEnvironmentInjector: [{
      type: Input
    }],
    ngComponentOutletContent: [{
      type: Input
    }],
    ngComponentOutletNgModule: [{
      type: Input
    }]
  });
})();
function getParentInjector(injector) {
  const parentNgModule = injector.get(NgModuleRef$1);
  return parentNgModule.injector;
}
var NgForOfContext = class {
  $implicit;
  ngForOf;
  index;
  count;
  constructor($implicit, ngForOf, index, count) {
    this.$implicit = $implicit;
    this.ngForOf = ngForOf;
    this.index = index;
    this.count = count;
  }
  get first() {
    return this.index === 0;
  }
  get last() {
    return this.index === this.count - 1;
  }
  get even() {
    return this.index % 2 === 0;
  }
  get odd() {
    return !this.even;
  }
};
var NgForOf = class _NgForOf {
  _viewContainer;
  _template;
  _differs;
  set ngForOf(ngForOf) {
    this._ngForOf = ngForOf;
    this._ngForOfDirty = true;
  }
  set ngForTrackBy(fn) {
    if ((typeof ngDevMode === "undefined" || ngDevMode) && fn != null && typeof fn !== "function") {
      console.warn(`trackBy must be a function, but received ${JSON.stringify(fn)}. See https://angular.dev/api/common/NgForOf#change-propagation for more information.`);
    }
    this._trackByFn = fn;
  }
  get ngForTrackBy() {
    return this._trackByFn;
  }
  _ngForOf = null;
  _ngForOfDirty = true;
  _differ = null;
  _trackByFn;
  constructor(_viewContainer, _template, _differs) {
    this._viewContainer = _viewContainer;
    this._template = _template;
    this._differs = _differs;
  }
  set ngForTemplate(value) {
    if (value) {
      this._template = value;
    }
  }
  ngDoCheck() {
    if (this._ngForOfDirty) {
      this._ngForOfDirty = false;
      const value = this._ngForOf;
      if (!this._differ && value) {
        if (typeof ngDevMode === "undefined" || ngDevMode) {
          try {
            this._differ = this._differs.find(value).create(this.ngForTrackBy);
          } catch (e) {
            let errorMessage = `Cannot find a differ supporting object '${value}' of type '${getTypeName(value)}'. NgFor only supports binding to Iterables, such as Arrays.`;
            if (typeof value === "object") {
              errorMessage += " Did you mean to use the keyvalue pipe?";
            }
            throw new RuntimeError(-2200, errorMessage);
          }
        } else {
          this._differ = this._differs.find(value).create(this.ngForTrackBy);
        }
      }
    }
    if (this._differ) {
      const changes = this._differ.diff(this._ngForOf);
      if (changes) this._applyChanges(changes);
    }
  }
  _applyChanges(changes) {
    const viewContainer = this._viewContainer;
    changes.forEachOperation((item, adjustedPreviousIndex, currentIndex) => {
      if (item.previousIndex == null) {
        viewContainer.createEmbeddedView(this._template, new NgForOfContext(item.item, this._ngForOf, -1, -1), currentIndex === null ? void 0 : currentIndex);
      } else if (currentIndex == null) {
        viewContainer.remove(adjustedPreviousIndex === null ? void 0 : adjustedPreviousIndex);
      } else if (adjustedPreviousIndex !== null) {
        const view = viewContainer.get(adjustedPreviousIndex);
        viewContainer.move(view, currentIndex);
        applyViewChange(view, item);
      }
    });
    for (let i = 0, ilen = viewContainer.length; i < ilen; i++) {
      const viewRef = viewContainer.get(i);
      const context = viewRef.context;
      context.index = i;
      context.count = ilen;
      context.ngForOf = this._ngForOf;
    }
    changes.forEachIdentityChange((record) => {
      const viewRef = viewContainer.get(record.currentIndex);
      applyViewChange(viewRef, record);
    });
  }
  static ngTemplateContextGuard(dir, ctx) {
    return true;
  }
  static \u0275fac = function NgForOf_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgForOf)(\u0275\u0275directiveInject(ViewContainerRef), \u0275\u0275directiveInject(TemplateRef), \u0275\u0275directiveInject(IterableDiffers));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NgForOf,
    selectors: [["", "ngFor", "", "ngForOf", ""]],
    inputs: {
      ngForOf: "ngForOf",
      ngForTrackBy: "ngForTrackBy",
      ngForTemplate: "ngForTemplate"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgForOf, [{
    type: Directive,
    args: [{
      selector: "[ngFor][ngForOf]"
    }]
  }], () => [{
    type: ViewContainerRef
  }, {
    type: TemplateRef
  }, {
    type: IterableDiffers
  }], {
    ngForOf: [{
      type: Input
    }],
    ngForTrackBy: [{
      type: Input
    }],
    ngForTemplate: [{
      type: Input
    }]
  });
})();
function applyViewChange(view, record) {
  view.context.$implicit = record.item;
}
function getTypeName(type) {
  return type["name"] || typeof type;
}
var NgIf = class _NgIf {
  _viewContainer;
  _context = new NgIfContext();
  _thenTemplateRef = null;
  _elseTemplateRef = null;
  _thenViewRef = null;
  _elseViewRef = null;
  constructor(_viewContainer, templateRef) {
    this._viewContainer = _viewContainer;
    this._thenTemplateRef = templateRef;
  }
  set ngIf(condition) {
    this._context.$implicit = this._context.ngIf = condition;
    this._updateView();
  }
  set ngIfThen(templateRef) {
    assertTemplate(templateRef, (typeof ngDevMode === "undefined" || ngDevMode) && "ngIfThen");
    this._thenTemplateRef = templateRef;
    this._thenViewRef = null;
    this._updateView();
  }
  set ngIfElse(templateRef) {
    assertTemplate(templateRef, (typeof ngDevMode === "undefined" || ngDevMode) && "ngIfElse");
    this._elseTemplateRef = templateRef;
    this._elseViewRef = null;
    this._updateView();
  }
  _updateView() {
    if (this._context.$implicit) {
      if (!this._thenViewRef) {
        this._viewContainer.clear();
        this._elseViewRef = null;
        if (this._thenTemplateRef) {
          this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context);
        }
      }
    } else {
      if (!this._elseViewRef) {
        this._viewContainer.clear();
        this._thenViewRef = null;
        if (this._elseTemplateRef) {
          this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context);
        }
      }
    }
  }
  static ngIfUseIfTypeGuard;
  static ngTemplateGuard_ngIf;
  static ngTemplateContextGuard(dir, ctx) {
    return true;
  }
  static \u0275fac = function NgIf_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgIf)(\u0275\u0275directiveInject(ViewContainerRef), \u0275\u0275directiveInject(TemplateRef));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NgIf,
    selectors: [["", "ngIf", ""]],
    inputs: {
      ngIf: "ngIf",
      ngIfThen: "ngIfThen",
      ngIfElse: "ngIfElse"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgIf, [{
    type: Directive,
    args: [{
      selector: "[ngIf]"
    }]
  }], () => [{
    type: ViewContainerRef
  }, {
    type: TemplateRef
  }], {
    ngIf: [{
      type: Input
    }],
    ngIfThen: [{
      type: Input
    }],
    ngIfElse: [{
      type: Input
    }]
  });
})();
var NgIfContext = class {
  $implicit = null;
  ngIf = null;
};
function assertTemplate(templateRef, property) {
  if (templateRef && !templateRef.createEmbeddedView) {
    throw new RuntimeError(2020, (typeof ngDevMode === "undefined" || ngDevMode) && `${property} must be a TemplateRef, but received '${stringify(templateRef)}'.`);
  }
}
var SwitchView = class {
  _viewContainerRef;
  _templateRef;
  _created = false;
  constructor(_viewContainerRef, _templateRef) {
    this._viewContainerRef = _viewContainerRef;
    this._templateRef = _templateRef;
  }
  create() {
    this._created = true;
    this._viewContainerRef.createEmbeddedView(this._templateRef);
  }
  destroy() {
    this._created = false;
    this._viewContainerRef.clear();
  }
  enforceState(created) {
    if (created && !this._created) {
      this.create();
    } else if (!created && this._created) {
      this.destroy();
    }
  }
};
var NgSwitch = class _NgSwitch {
  _defaultViews = [];
  _defaultUsed = false;
  _caseCount = 0;
  _lastCaseCheckIndex = 0;
  _lastCasesMatched = false;
  _ngSwitch;
  set ngSwitch(newValue) {
    this._ngSwitch = newValue;
    if (this._caseCount === 0) {
      this._updateDefaultCases(true);
    }
  }
  _addCase() {
    return this._caseCount++;
  }
  _addDefault(view) {
    this._defaultViews.push(view);
  }
  _matchCase(value) {
    const matched = value === this._ngSwitch;
    this._lastCasesMatched ||= matched;
    this._lastCaseCheckIndex++;
    if (this._lastCaseCheckIndex === this._caseCount) {
      this._updateDefaultCases(!this._lastCasesMatched);
      this._lastCaseCheckIndex = 0;
      this._lastCasesMatched = false;
    }
    return matched;
  }
  _updateDefaultCases(useDefault) {
    if (this._defaultViews.length > 0 && useDefault !== this._defaultUsed) {
      this._defaultUsed = useDefault;
      for (const defaultView of this._defaultViews) {
        defaultView.enforceState(useDefault);
      }
    }
  }
  static \u0275fac = function NgSwitch_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgSwitch)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NgSwitch,
    selectors: [["", "ngSwitch", ""]],
    inputs: {
      ngSwitch: "ngSwitch"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgSwitch, [{
    type: Directive,
    args: [{
      selector: "[ngSwitch]"
    }]
  }], null, {
    ngSwitch: [{
      type: Input
    }]
  });
})();
var NgSwitchCase = class _NgSwitchCase {
  ngSwitch;
  _view;
  ngSwitchCase;
  constructor(viewContainer, templateRef, ngSwitch) {
    this.ngSwitch = ngSwitch;
    if ((typeof ngDevMode === "undefined" || ngDevMode) && !ngSwitch) {
      throwNgSwitchProviderNotFoundError("ngSwitchCase", "NgSwitchCase");
    }
    ngSwitch._addCase();
    this._view = new SwitchView(viewContainer, templateRef);
  }
  ngDoCheck() {
    this._view.enforceState(this.ngSwitch._matchCase(this.ngSwitchCase));
  }
  static \u0275fac = function NgSwitchCase_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgSwitchCase)(\u0275\u0275directiveInject(ViewContainerRef), \u0275\u0275directiveInject(TemplateRef), \u0275\u0275directiveInject(NgSwitch, 9));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NgSwitchCase,
    selectors: [["", "ngSwitchCase", ""]],
    inputs: {
      ngSwitchCase: "ngSwitchCase"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgSwitchCase, [{
    type: Directive,
    args: [{
      selector: "[ngSwitchCase]"
    }]
  }], () => [{
    type: ViewContainerRef
  }, {
    type: TemplateRef
  }, {
    type: NgSwitch,
    decorators: [{
      type: Optional
    }, {
      type: Host
    }]
  }], {
    ngSwitchCase: [{
      type: Input
    }]
  });
})();
var NgSwitchDefault = class _NgSwitchDefault {
  constructor(viewContainer, templateRef, ngSwitch) {
    if ((typeof ngDevMode === "undefined" || ngDevMode) && !ngSwitch) {
      throwNgSwitchProviderNotFoundError("ngSwitchDefault", "NgSwitchDefault");
    }
    ngSwitch._addDefault(new SwitchView(viewContainer, templateRef));
  }
  static \u0275fac = function NgSwitchDefault_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgSwitchDefault)(\u0275\u0275directiveInject(ViewContainerRef), \u0275\u0275directiveInject(TemplateRef), \u0275\u0275directiveInject(NgSwitch, 9));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NgSwitchDefault,
    selectors: [["", "ngSwitchDefault", ""]]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgSwitchDefault, [{
    type: Directive,
    args: [{
      selector: "[ngSwitchDefault]"
    }]
  }], () => [{
    type: ViewContainerRef
  }, {
    type: TemplateRef
  }, {
    type: NgSwitch,
    decorators: [{
      type: Optional
    }, {
      type: Host
    }]
  }], null);
})();
function throwNgSwitchProviderNotFoundError(attrName, directiveName) {
  throw new RuntimeError(2e3, `An element with the "${attrName}" attribute (matching the "${directiveName}" directive) must be located inside an element with the "ngSwitch" attribute (matching "NgSwitch" directive)`);
}
var NgPlural = class _NgPlural {
  _localization;
  _activeView;
  _caseViews = {};
  constructor(_localization) {
    this._localization = _localization;
  }
  set ngPlural(value) {
    this._updateView(value);
  }
  addCase(value, switchView) {
    this._caseViews[value] = switchView;
  }
  _updateView(switchValue) {
    this._clearViews();
    const cases = Object.keys(this._caseViews);
    const key = getPluralCategory(switchValue, cases, this._localization);
    this._activateView(this._caseViews[key]);
  }
  _clearViews() {
    if (this._activeView) this._activeView.destroy();
  }
  _activateView(view) {
    if (view) {
      this._activeView = view;
      this._activeView.create();
    }
  }
  static \u0275fac = function NgPlural_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgPlural)(\u0275\u0275directiveInject(NgLocalization));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NgPlural,
    selectors: [["", "ngPlural", ""]],
    inputs: {
      ngPlural: "ngPlural"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgPlural, [{
    type: Directive,
    args: [{
      selector: "[ngPlural]"
    }]
  }], () => [{
    type: NgLocalization
  }], {
    ngPlural: [{
      type: Input
    }]
  });
})();
var NgPluralCase = class _NgPluralCase {
  value;
  constructor(value, template, viewContainer, ngPlural) {
    this.value = value;
    const isANumber = !isNaN(Number(value));
    ngPlural.addCase(isANumber ? `=${value}` : value, new SwitchView(viewContainer, template));
  }
  static \u0275fac = function NgPluralCase_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgPluralCase)(\u0275\u0275injectAttribute("ngPluralCase"), \u0275\u0275directiveInject(TemplateRef), \u0275\u0275directiveInject(ViewContainerRef), \u0275\u0275directiveInject(NgPlural, 1));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NgPluralCase,
    selectors: [["", "ngPluralCase", ""]]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgPluralCase, [{
    type: Directive,
    args: [{
      selector: "[ngPluralCase]"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Attribute,
      args: ["ngPluralCase"]
    }]
  }, {
    type: TemplateRef
  }, {
    type: ViewContainerRef
  }, {
    type: NgPlural,
    decorators: [{
      type: Host
    }]
  }], null);
})();
var NgStyle = class _NgStyle {
  _ngEl;
  _differs;
  _renderer;
  _ngStyle = null;
  _differ = null;
  constructor(_ngEl, _differs, _renderer) {
    this._ngEl = _ngEl;
    this._differs = _differs;
    this._renderer = _renderer;
  }
  set ngStyle(values) {
    this._ngStyle = values;
    if (!this._differ && values) {
      this._differ = this._differs.find(values).create();
    }
  }
  ngDoCheck() {
    if (this._differ) {
      const changes = this._differ.diff(this._ngStyle);
      if (changes) {
        this._applyChanges(changes);
      }
    }
  }
  _setStyle(nameAndUnit, value) {
    const [name, unit] = nameAndUnit.split(".");
    const flags = name.indexOf("-") === -1 ? void 0 : RendererStyleFlags2.DashCase;
    if (value != null) {
      this._renderer.setStyle(this._ngEl.nativeElement, name, unit ? `${value}${unit}` : value, flags);
    } else {
      this._renderer.removeStyle(this._ngEl.nativeElement, name, flags);
    }
  }
  _applyChanges(changes) {
    changes.forEachRemovedItem((record) => this._setStyle(record.key, null));
    changes.forEachAddedItem((record) => this._setStyle(record.key, record.currentValue));
    changes.forEachChangedItem((record) => this._setStyle(record.key, record.currentValue));
  }
  static \u0275fac = function NgStyle_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgStyle)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(KeyValueDiffers), \u0275\u0275directiveInject(Renderer2));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NgStyle,
    selectors: [["", "ngStyle", ""]],
    inputs: {
      ngStyle: "ngStyle"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgStyle, [{
    type: Directive,
    args: [{
      selector: "[ngStyle]"
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: KeyValueDiffers
  }, {
    type: Renderer2
  }], {
    ngStyle: [{
      type: Input,
      args: ["ngStyle"]
    }]
  });
})();
var NgTemplateOutlet = class _NgTemplateOutlet {
  _viewContainerRef;
  _viewRef = null;
  ngTemplateOutletContext = null;
  ngTemplateOutlet = null;
  ngTemplateOutletInjector = null;
  injector = inject(Injector);
  constructor(_viewContainerRef) {
    this._viewContainerRef = _viewContainerRef;
  }
  ngOnChanges(changes) {
    if (this._shouldRecreateView(changes)) {
      const viewContainerRef = this._viewContainerRef;
      if (this._viewRef) {
        viewContainerRef.remove(viewContainerRef.indexOf(this._viewRef));
      }
      if (!this.ngTemplateOutlet) {
        this._viewRef = null;
        return;
      }
      const viewContext = this._createContextForwardProxy();
      this._viewRef = viewContainerRef.createEmbeddedView(this.ngTemplateOutlet, viewContext, {
        injector: this._getInjector()
      });
    }
  }
  _getInjector() {
    if (this.ngTemplateOutletInjector === "outlet") {
      return this.injector;
    }
    return this.ngTemplateOutletInjector ?? void 0;
  }
  _shouldRecreateView(changes) {
    return !!changes["ngTemplateOutlet"] || !!changes["ngTemplateOutletInjector"];
  }
  _createContextForwardProxy() {
    return new Proxy({}, {
      set: (_target, prop, newValue) => {
        if (!this.ngTemplateOutletContext) {
          return false;
        }
        return Reflect.set(this.ngTemplateOutletContext, prop, newValue);
      },
      get: (_target, prop, receiver) => {
        if (!this.ngTemplateOutletContext) {
          return void 0;
        }
        return Reflect.get(this.ngTemplateOutletContext, prop, receiver);
      }
    });
  }
  static \u0275fac = function NgTemplateOutlet_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgTemplateOutlet)(\u0275\u0275directiveInject(ViewContainerRef));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NgTemplateOutlet,
    selectors: [["", "ngTemplateOutlet", ""]],
    inputs: {
      ngTemplateOutletContext: "ngTemplateOutletContext",
      ngTemplateOutlet: "ngTemplateOutlet",
      ngTemplateOutletInjector: "ngTemplateOutletInjector"
    },
    features: [\u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgTemplateOutlet, [{
    type: Directive,
    args: [{
      selector: "[ngTemplateOutlet]"
    }]
  }], () => [{
    type: ViewContainerRef
  }], {
    ngTemplateOutletContext: [{
      type: Input
    }],
    ngTemplateOutlet: [{
      type: Input
    }],
    ngTemplateOutletInjector: [{
      type: Input
    }]
  });
})();
var COMMON_DIRECTIVES = [NgClass, NgComponentOutlet, NgForOf, NgIf, NgTemplateOutlet, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, NgPlural, NgPluralCase];
function invalidPipeArgumentError(type, value) {
  return new RuntimeError(2100, ngDevMode && `InvalidPipeArgument: '${value}' for pipe '${stringify(type)}'`);
}
function warnIfSignal(pipeName, value) {
  if (isSignal(value)) {
    console.warn(`The ${pipeName} does not unwrap signals. Received a signal with value:`, value());
  }
}
var SubscribableStrategy = class {
  createSubscription(async, updateLatestValue, onError) {
    return untracked(() => async.subscribe({
      next: updateLatestValue,
      error: onError
    }));
  }
  dispose(subscription) {
    untracked(() => subscription.unsubscribe());
  }
};
var PromiseStrategy = class {
  createSubscription(async, updateLatestValue, onError) {
    async.then((v) => updateLatestValue?.(v), (e) => onError?.(e));
    return {
      unsubscribe: () => {
        updateLatestValue = null;
        onError = null;
      }
    };
  }
  dispose(subscription) {
    subscription.unsubscribe();
  }
};
var _promiseStrategy = new PromiseStrategy();
var _subscribableStrategy = new SubscribableStrategy();
var AsyncPipe = class _AsyncPipe {
  _ref;
  _latestValue = null;
  markForCheckOnValueUpdate = true;
  _subscription = null;
  _obj = null;
  _strategy = null;
  applicationErrorHandler = inject(INTERNAL_APPLICATION_ERROR_HANDLER);
  constructor(ref) {
    this._ref = ref;
  }
  ngOnDestroy() {
    if (this._subscription) {
      this._dispose();
    }
    this._ref = null;
  }
  transform(obj) {
    if (!this._obj) {
      if (obj) {
        try {
          this.markForCheckOnValueUpdate = false;
          this._subscribe(obj);
        } finally {
          this.markForCheckOnValueUpdate = true;
        }
      }
      return this._latestValue;
    }
    if (obj !== this._obj) {
      this._dispose();
      return this.transform(obj);
    }
    return this._latestValue;
  }
  _subscribe(obj) {
    this._obj = obj;
    this._strategy = this._selectStrategy(obj);
    this._subscription = this._strategy.createSubscription(obj, (value) => this._updateLatestValue(obj, value), (e) => this.applicationErrorHandler(e));
  }
  _selectStrategy(obj) {
    if (isPromise(obj)) {
      return _promiseStrategy;
    }
    if (isSubscribable(obj)) {
      return _subscribableStrategy;
    }
    throw invalidPipeArgumentError(_AsyncPipe, obj);
  }
  _dispose() {
    this._strategy.dispose(this._subscription);
    this._latestValue = null;
    this._subscription = null;
    this._obj = null;
  }
  _updateLatestValue(async, value) {
    if (async === this._obj) {
      this._latestValue = value;
      if (this.markForCheckOnValueUpdate) {
        this._ref?.markForCheck();
      }
    }
  }
  static \u0275fac = function AsyncPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AsyncPipe)(\u0275\u0275directiveInject(ChangeDetectorRef, 16));
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({
    name: "async",
    type: _AsyncPipe,
    pure: false
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AsyncPipe, [{
    type: Pipe,
    args: [{
      name: "async",
      pure: false
    }]
  }], () => [{
    type: ChangeDetectorRef
  }], null);
})();
var LowerCasePipe = class _LowerCasePipe {
  transform(value) {
    if (value == null) return null;
    assertPipeArgument(_LowerCasePipe, value);
    return value.toLowerCase();
  }
  static \u0275fac = function LowerCasePipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LowerCasePipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({
    name: "lowercase",
    type: _LowerCasePipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LowerCasePipe, [{
    type: Pipe,
    args: [{
      name: "lowercase"
    }]
  }], null, null);
})();
var unicodeWordMatch = /(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])\S*/g;
var TitleCasePipe = class _TitleCasePipe {
  transform(value) {
    if (value == null) return null;
    assertPipeArgument(_TitleCasePipe, value);
    return value.replace(unicodeWordMatch, (txt) => txt[0].toUpperCase() + txt.slice(1).toLowerCase());
  }
  static \u0275fac = function TitleCasePipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TitleCasePipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({
    name: "titlecase",
    type: _TitleCasePipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TitleCasePipe, [{
    type: Pipe,
    args: [{
      name: "titlecase"
    }]
  }], null, null);
})();
var UpperCasePipe = class _UpperCasePipe {
  transform(value) {
    if (value == null) return null;
    assertPipeArgument(_UpperCasePipe, value);
    return value.toUpperCase();
  }
  static \u0275fac = function UpperCasePipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UpperCasePipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({
    name: "uppercase",
    type: _UpperCasePipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UpperCasePipe, [{
    type: Pipe,
    args: [{
      name: "uppercase"
    }]
  }], null, null);
})();
function assertPipeArgument(pipe, value) {
  if (typeof value !== "string") {
    throw invalidPipeArgumentError(pipe, value);
  }
}
var DEFAULT_DATE_FORMAT = "mediumDate";
var DATE_PIPE_DEFAULT_TIMEZONE = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "DATE_PIPE_DEFAULT_TIMEZONE" : "");
var DATE_PIPE_DEFAULT_OPTIONS = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "DATE_PIPE_DEFAULT_OPTIONS" : "");
var DatePipe = class _DatePipe {
  locale;
  defaultTimezone;
  defaultOptions;
  constructor(locale, defaultTimezone, defaultOptions) {
    this.locale = locale;
    this.defaultTimezone = defaultTimezone;
    this.defaultOptions = defaultOptions;
  }
  transform(value, format, timezone, locale) {
    if (value == null || value === "" || value !== value) return null;
    try {
      const _format = format ?? this.defaultOptions?.dateFormat ?? DEFAULT_DATE_FORMAT;
      const _timezone = timezone ?? this.defaultOptions?.timezone ?? this.defaultTimezone ?? void 0;
      return formatDate(value, _format, locale || this.locale, _timezone);
    } catch (error) {
      throw invalidPipeArgumentError(_DatePipe, error.message);
    }
  }
  static \u0275fac = function DatePipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DatePipe)(\u0275\u0275directiveInject(LOCALE_ID, 16), \u0275\u0275directiveInject(DATE_PIPE_DEFAULT_TIMEZONE, 24), \u0275\u0275directiveInject(DATE_PIPE_DEFAULT_OPTIONS, 24));
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({
    name: "date",
    type: _DatePipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DatePipe, [{
    type: Pipe,
    args: [{
      name: "date"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [LOCALE_ID]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DATE_PIPE_DEFAULT_TIMEZONE]
    }, {
      type: Optional
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DATE_PIPE_DEFAULT_OPTIONS]
    }, {
      type: Optional
    }]
  }], null);
})();
var _INTERPOLATION_REGEXP = /#/g;
var I18nPluralPipe = class _I18nPluralPipe {
  _localization;
  constructor(_localization) {
    this._localization = _localization;
  }
  transform(value, pluralMap, locale) {
    if (value == null) return "";
    if (typeof pluralMap !== "object" || pluralMap === null) {
      throw invalidPipeArgumentError(_I18nPluralPipe, pluralMap);
    }
    const key = getPluralCategory(value, Object.keys(pluralMap), this._localization, locale);
    return pluralMap[key].replace(_INTERPOLATION_REGEXP, value.toString());
  }
  static \u0275fac = function I18nPluralPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _I18nPluralPipe)(\u0275\u0275directiveInject(NgLocalization, 16));
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({
    name: "i18nPlural",
    type: _I18nPluralPipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(I18nPluralPipe, [{
    type: Pipe,
    args: [{
      name: "i18nPlural"
    }]
  }], () => [{
    type: NgLocalization
  }], null);
})();
var I18nSelectPipe = class _I18nSelectPipe {
  transform(value, mapping) {
    if (value == null) return "";
    if (typeof mapping !== "object" || typeof value !== "string") {
      throw invalidPipeArgumentError(_I18nSelectPipe, mapping);
    }
    if (mapping.hasOwnProperty(value)) {
      return mapping[value];
    }
    if (mapping.hasOwnProperty("other")) {
      return mapping["other"];
    }
    return "";
  }
  static \u0275fac = function I18nSelectPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _I18nSelectPipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({
    name: "i18nSelect",
    type: _I18nSelectPipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(I18nSelectPipe, [{
    type: Pipe,
    args: [{
      name: "i18nSelect"
    }]
  }], null, null);
})();
var JsonPipe = class _JsonPipe {
  transform(value) {
    ngDevMode && warnIfSignal("JsonPipe", value);
    return JSON.stringify(value, null, 2);
  }
  static \u0275fac = function JsonPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _JsonPipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({
    name: "json",
    type: _JsonPipe,
    pure: false
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(JsonPipe, [{
    type: Pipe,
    args: [{
      name: "json",
      pure: false
    }]
  }], null, null);
})();
function makeKeyValuePair(key, value) {
  return {
    key,
    value
  };
}
var KeyValuePipe = class _KeyValuePipe {
  differs;
  constructor(differs) {
    this.differs = differs;
  }
  differ;
  keyValues = [];
  compareFn = defaultComparator;
  transform(input, compareFn = defaultComparator) {
    ngDevMode && warnIfSignal("KeyValuePipe", input);
    if (!input || !(input instanceof Map) && typeof input !== "object") {
      return null;
    }
    this.differ ??= this.differs.find(input).create();
    const differChanges = this.differ.diff(input);
    const compareFnChanged = compareFn !== this.compareFn;
    if (differChanges) {
      this.keyValues = [];
      differChanges.forEachItem((r) => {
        this.keyValues.push(makeKeyValuePair(r.key, r.currentValue));
      });
    }
    if (differChanges || compareFnChanged) {
      if (compareFn) {
        this.keyValues.sort(compareFn);
      }
      this.compareFn = compareFn;
    }
    return this.keyValues;
  }
  static \u0275fac = function KeyValuePipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _KeyValuePipe)(\u0275\u0275directiveInject(KeyValueDiffers, 16));
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({
    name: "keyvalue",
    type: _KeyValuePipe,
    pure: false
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(KeyValuePipe, [{
    type: Pipe,
    args: [{
      name: "keyvalue",
      pure: false
    }]
  }], () => [{
    type: KeyValueDiffers
  }], null);
})();
function defaultComparator(keyValueA, keyValueB) {
  const a = keyValueA.key;
  const b = keyValueB.key;
  if (a === b) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  if (typeof a == "string" && typeof b == "string") {
    return a < b ? -1 : 1;
  }
  if (typeof a == "number" && typeof b == "number") {
    return a - b;
  }
  if (typeof a == "boolean" && typeof b == "boolean") {
    return a < b ? -1 : 1;
  }
  const aString = String(a);
  const bString = String(b);
  return aString == bString ? 0 : aString < bString ? -1 : 1;
}
var DecimalPipe = class _DecimalPipe {
  _locale;
  constructor(_locale) {
    this._locale = _locale;
  }
  transform(value, digitsInfo, locale) {
    if (!isValue(value)) return null;
    locale ||= this._locale;
    try {
      const num = strToNumber(value);
      return formatNumber(num, locale, digitsInfo);
    } catch (error) {
      throw invalidPipeArgumentError(_DecimalPipe, error.message);
    }
  }
  static \u0275fac = function DecimalPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DecimalPipe)(\u0275\u0275directiveInject(LOCALE_ID, 16));
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({
    name: "number",
    type: _DecimalPipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DecimalPipe, [{
    type: Pipe,
    args: [{
      name: "number"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [LOCALE_ID]
    }]
  }], null);
})();
var PercentPipe = class _PercentPipe {
  _locale;
  constructor(_locale) {
    this._locale = _locale;
  }
  transform(value, digitsInfo, locale) {
    if (!isValue(value)) return null;
    locale ||= this._locale;
    try {
      const num = strToNumber(value);
      return formatPercent(num, locale, digitsInfo);
    } catch (error) {
      throw invalidPipeArgumentError(_PercentPipe, error.message);
    }
  }
  static \u0275fac = function PercentPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PercentPipe)(\u0275\u0275directiveInject(LOCALE_ID, 16));
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({
    name: "percent",
    type: _PercentPipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PercentPipe, [{
    type: Pipe,
    args: [{
      name: "percent"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [LOCALE_ID]
    }]
  }], null);
})();
var CurrencyPipe = class _CurrencyPipe {
  _locale;
  _defaultCurrencyCode;
  constructor(_locale, _defaultCurrencyCode = "USD") {
    this._locale = _locale;
    this._defaultCurrencyCode = _defaultCurrencyCode;
  }
  transform(value, currencyCode = this._defaultCurrencyCode, display = "symbol", digitsInfo, locale) {
    if (!isValue(value)) return null;
    locale ||= this._locale;
    if (typeof display === "boolean") {
      if (typeof ngDevMode === "undefined" || ngDevMode) {
        console.warn(`Warning: the currency pipe has been changed in Angular v5. The symbolDisplay option (third parameter) is now a string instead of a boolean. The accepted values are "code", "symbol" or "symbol-narrow".`);
      }
      display = display ? "symbol" : "code";
    }
    let currency = currencyCode || this._defaultCurrencyCode;
    if (display !== "code") {
      if (display === "symbol" || display === "symbol-narrow") {
        currency = getCurrencySymbol(currency, display === "symbol" ? "wide" : "narrow", locale);
      } else {
        currency = display;
      }
    }
    try {
      const num = strToNumber(value);
      return formatCurrency(num, locale, currency, currencyCode, digitsInfo);
    } catch (error) {
      throw invalidPipeArgumentError(_CurrencyPipe, error.message);
    }
  }
  static \u0275fac = function CurrencyPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CurrencyPipe)(\u0275\u0275directiveInject(LOCALE_ID, 16), \u0275\u0275directiveInject(DEFAULT_CURRENCY_CODE, 16));
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({
    name: "currency",
    type: _CurrencyPipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CurrencyPipe, [{
    type: Pipe,
    args: [{
      name: "currency"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [LOCALE_ID]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DEFAULT_CURRENCY_CODE]
    }]
  }], null);
})();
function isValue(value) {
  return !(value == null || value === "" || value !== value);
}
function strToNumber(value) {
  if (typeof value === "string" && !isNaN(Number(value) - parseFloat(value))) {
    return Number(value);
  }
  if (typeof value !== "number") {
    throw new RuntimeError(2309, ngDevMode && `${value} is not a number`);
  }
  return value;
}
var SlicePipe = class _SlicePipe {
  transform(value, start, end) {
    if (value == null) return null;
    const supports = typeof value === "string" || Array.isArray(value);
    if (!supports) {
      throw invalidPipeArgumentError(_SlicePipe, value);
    }
    return value.slice(start, end);
  }
  static \u0275fac = function SlicePipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SlicePipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({
    name: "slice",
    type: _SlicePipe,
    pure: false
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SlicePipe, [{
    type: Pipe,
    args: [{
      name: "slice",
      pure: false
    }]
  }], null, null);
})();
var COMMON_PIPES = [AsyncPipe, UpperCasePipe, LowerCasePipe, JsonPipe, SlicePipe, DecimalPipe, PercentPipe, TitleCasePipe, CurrencyPipe, DatePipe, I18nPluralPipe, I18nSelectPipe, KeyValuePipe];
var CommonModule = class _CommonModule {
  static \u0275fac = function CommonModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CommonModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _CommonModule,
    imports: [NgClass, NgComponentOutlet, NgForOf, NgIf, NgTemplateOutlet, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, NgPlural, NgPluralCase, AsyncPipe, UpperCasePipe, LowerCasePipe, JsonPipe, SlicePipe, DecimalPipe, PercentPipe, TitleCasePipe, CurrencyPipe, DatePipe, I18nPluralPipe, I18nSelectPipe, KeyValuePipe],
    exports: [NgClass, NgComponentOutlet, NgForOf, NgIf, NgTemplateOutlet, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, NgPlural, NgPluralCase, AsyncPipe, UpperCasePipe, LowerCasePipe, JsonPipe, SlicePipe, DecimalPipe, PercentPipe, TitleCasePipe, CurrencyPipe, DatePipe, I18nPluralPipe, I18nSelectPipe, KeyValuePipe]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CommonModule, [{
    type: NgModule,
    args: [{
      imports: [COMMON_DIRECTIVES, COMMON_PIPES],
      exports: [COMMON_DIRECTIVES, COMMON_PIPES]
    }]
  }], null, null);
})();

// node_modules/@angular/common/fesm2022/_platform_navigation-chunk.mjs
/**
 * @license Angular v21.2.9
 * (c) 2010-2026 Google LLC. https://angular.dev/
 * License: MIT
 */
var PRECOMMIT_HANDLER_SUPPORTED = new InjectionToken("", {
  factory: () => {
    return typeof window !== "undefined" && typeof window.NavigationPrecommitController !== "undefined";
  }
});
var PlatformNavigation = class _PlatformNavigation {
  static \u0275fac = function PlatformNavigation_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlatformNavigation)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _PlatformNavigation,
    factory: () => (() => window.navigation)(),
    providedIn: "platform"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlatformNavigation, [{
    type: Injectable,
    args: [{
      providedIn: "platform",
      useFactory: () => window.navigation
    }]
  }], null, null);
})();

// node_modules/@angular/common/fesm2022/common.mjs
/**
 * @license Angular v21.2.9
 * (c) 2010-2026 Google LLC. https://angular.dev/
 * License: MIT
 */
var NavigationAdapterForLocation = class _NavigationAdapterForLocation extends Location {
  navigation = inject(PlatformNavigation);
  destroyRef = inject(DestroyRef);
  constructor() {
    super(inject(LocationStrategy));
    this.registerNavigationListeners();
  }
  registerNavigationListeners() {
    const currentEntryChangeListener = () => {
      this._notifyUrlChangeListeners(this.path(true), this.getState());
    };
    this.navigation.addEventListener("currententrychange", currentEntryChangeListener);
    this.destroyRef.onDestroy(() => {
      this.navigation.removeEventListener("currententrychange", currentEntryChangeListener);
    });
  }
  getState() {
    return this.navigation.currentEntry?.getState();
  }
  replaceState(path, query = "", state = null) {
    const url = this.prepareExternalUrl(path + normalizeQueryParams(query));
    this.navigation.navigate(url, {
      state,
      history: "replace"
    });
  }
  go(path, query = "", state = null) {
    const url = this.prepareExternalUrl(path + normalizeQueryParams(query));
    this.navigation.navigate(url, {
      state,
      history: "push"
    });
  }
  back() {
    this.navigation.back();
  }
  forward() {
    this.navigation.forward();
  }
  onUrlChange(fn) {
    this._urlChangeListeners.push(fn);
    return () => {
      const fnIndex = this._urlChangeListeners.indexOf(fn);
      this._urlChangeListeners.splice(fnIndex, 1);
    };
  }
  static \u0275fac = function NavigationAdapterForLocation_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NavigationAdapterForLocation)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _NavigationAdapterForLocation,
    factory: _NavigationAdapterForLocation.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NavigationAdapterForLocation, [{
    type: Injectable
  }], () => [], null);
})();
function registerLocaleData2(data, localeId, extraData) {
  return registerLocaleData(data, localeId, extraData);
}
var PLATFORM_BROWSER_ID = "browser";
var ViewportScroller = class _ViewportScroller {
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _ViewportScroller,
    providedIn: "root",
    factory: () => false ? new NullViewportScroller() : new BrowserViewportScroller(inject(DOCUMENT), window)
  });
};
var BrowserViewportScroller = class {
  document;
  window;
  offset = () => [0, 0];
  constructor(document, window2) {
    this.document = document;
    this.window = window2;
  }
  setOffset(offset) {
    if (Array.isArray(offset)) {
      this.offset = () => offset;
    } else {
      this.offset = offset;
    }
  }
  getScrollPosition() {
    return [this.window.scrollX, this.window.scrollY];
  }
  scrollToPosition(position, options) {
    this.window.scrollTo(__spreadProps(__spreadValues({}, options), {
      left: position[0],
      top: position[1]
    }));
  }
  scrollToAnchor(target, options) {
    const elSelected = findAnchorFromDocument(this.document, target);
    if (elSelected) {
      this.scrollToElement(elSelected, options);
      elSelected.focus();
    }
  }
  setHistoryScrollRestoration(scrollRestoration) {
    try {
      this.window.history.scrollRestoration = scrollRestoration;
    } catch (e) {
      console.warn(formatRuntimeError(2400, ngDevMode && "Failed to set `window.history.scrollRestoration`. This may occur when:\n\u2022 The script is running inside a sandboxed iframe\n\u2022 The window is partially navigated or inactive\n\u2022 The script is executed in an untrusted or special context (e.g., test runners, browser extensions, or content previews)\nScroll position may not be preserved across navigation."));
    }
  }
  scrollToElement(el, options) {
    const rect = el.getBoundingClientRect();
    const left = rect.left + this.window.pageXOffset;
    const top = rect.top + this.window.pageYOffset;
    const offset = this.offset();
    this.window.scrollTo(__spreadProps(__spreadValues({}, options), {
      left: left - offset[0],
      top: top - offset[1]
    }));
  }
};
function findAnchorFromDocument(document, target) {
  const documentResult = document.getElementById(target) || document.getElementsByName(target)[0];
  if (documentResult) {
    return documentResult;
  }
  if (typeof document.createTreeWalker === "function" && document.body && typeof document.body.attachShadow === "function") {
    const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
    let currentNode = treeWalker.currentNode;
    while (currentNode) {
      const shadowRoot = currentNode.shadowRoot;
      if (shadowRoot) {
        const result = shadowRoot.getElementById(target) || shadowRoot.querySelector(`[name="${target}"]`);
        if (result) {
          return result;
        }
      }
      currentNode = treeWalker.nextNode();
    }
  }
  return null;
}
var PLACEHOLDER_QUALITY = "20";
function getUrl(src, win) {
  return isAbsoluteUrl(src) ? new URL(src) : new URL(src, win.location.href);
}
function isAbsoluteUrl(src) {
  return /^https?:\/\//.test(src);
}
function extractHostname(url) {
  return isAbsoluteUrl(url) ? new URL(url).hostname : url;
}
function isValidPath(path) {
  const isString = typeof path === "string";
  if (!isString || path.trim() === "") {
    return false;
  }
  try {
    const url = new URL(path);
    return true;
  } catch (e) {
    return false;
  }
}
function normalizePath(path) {
  return path.endsWith("/") ? path.slice(0, -1) : path;
}
function normalizeSrc(src) {
  return src.startsWith("/") ? src.slice(1) : src;
}
var noopImageLoader = (config) => config.src;
var IMAGE_LOADER = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "ImageLoader" : "", {
  factory: () => noopImageLoader
});
function createImageLoader(buildUrlFn, exampleUrls) {
  return function provideImageLoader(path) {
    if (!isValidPath(path)) {
      throwInvalidPathError(path, exampleUrls || []);
    }
    path = normalizePath(path);
    const loaderFn = (config) => {
      if (isAbsoluteUrl(config.src)) {
        throwUnexpectedAbsoluteUrlError(path, config.src);
      }
      return buildUrlFn(path, __spreadProps(__spreadValues({}, config), {
        src: normalizeSrc(config.src)
      }));
    };
    const providers = [{
      provide: IMAGE_LOADER,
      useValue: loaderFn
    }];
    return providers;
  };
}
function throwInvalidPathError(path, exampleUrls) {
  throw new RuntimeError(2959, ngDevMode && `Image loader has detected an invalid path (\`${path}\`). To fix this, supply a path using one of the following formats: ${exampleUrls.join(" or ")}`);
}
function throwUnexpectedAbsoluteUrlError(path, url) {
  throw new RuntimeError(2959, ngDevMode && `Image loader has detected a \`<img>\` tag with an invalid \`ngSrc\` attribute: ${url}. This image loader expects \`ngSrc\` to be a relative URL - however the provided value is an absolute URL. To fix this, provide \`ngSrc\` as a path relative to the base URL configured for this loader (\`${path}\`).`);
}
function normalizeLoaderTransform(transform, separator) {
  if (typeof transform === "string") {
    return transform;
  }
  return Object.entries(transform).map(([key, value]) => `${key}${separator}${value}`).join(",");
}
var provideCloudflareLoader = createImageLoader(createCloudflareUrl, ngDevMode ? ["https://<ZONE>/cdn-cgi/image/<OPTIONS>/<SOURCE-IMAGE>"] : void 0);
function createCloudflareUrl(path, config) {
  let params = `format=auto`;
  if (config.width) {
    params += `,width=${config.width}`;
  }
  if (config.height) {
    params += `,height=${config.height}`;
  }
  if (config.isPlaceholder) {
    params += `,quality=${PLACEHOLDER_QUALITY}`;
  }
  if (config.loaderParams?.["transform"]) {
    const transformStr = normalizeLoaderTransform(config.loaderParams["transform"], "=");
    params += `,${transformStr}`;
  }
  return `${path}/cdn-cgi/image/${params}/${config.src}`;
}
var cloudinaryLoaderInfo = {
  name: "Cloudinary",
  testUrl: isCloudinaryUrl
};
var CLOUDINARY_LOADER_REGEX = /https?\:\/\/[^\/]+\.cloudinary\.com\/.+/;
function isCloudinaryUrl(url) {
  return CLOUDINARY_LOADER_REGEX.test(url);
}
var provideCloudinaryLoader = createImageLoader(createCloudinaryUrl, ngDevMode ? ["https://res.cloudinary.com/mysite", "https://mysite.cloudinary.com", "https://subdomain.mysite.com"] : void 0);
function createCloudinaryUrl(path, config) {
  const quality = config.isPlaceholder ? "q_auto:low" : "q_auto";
  let params = `f_auto,${quality}`;
  if (config.width) {
    params += `,w_${config.width}`;
  }
  if (config.height) {
    params += `,h_${config.height}`;
  }
  if (config.loaderParams?.["rounded"]) {
    params += `,r_max`;
  }
  if (config.loaderParams?.["transform"]) {
    const transformStr = normalizeLoaderTransform(config.loaderParams["transform"], "_");
    params += `,${transformStr}`;
  }
  return `${path}/image/upload/${params}/${config.src}`;
}
var imageKitLoaderInfo = {
  name: "ImageKit",
  testUrl: isImageKitUrl
};
var IMAGE_KIT_LOADER_REGEX = /https?\:\/\/[^\/]+\.imagekit\.io\/.+/;
function isImageKitUrl(url) {
  return IMAGE_KIT_LOADER_REGEX.test(url);
}
var provideImageKitLoader = createImageLoader(createImagekitUrl, ngDevMode ? ["https://ik.imagekit.io/mysite", "https://subdomain.mysite.com"] : void 0);
function createImagekitUrl(path, config) {
  const {
    src,
    width
  } = config;
  const params = [];
  if (width) {
    params.push(`w-${width}`);
  }
  if (config.height) {
    params.push(`h-${config.height}`);
  }
  if (config.isPlaceholder) {
    params.push(`q-${PLACEHOLDER_QUALITY}`);
  }
  if (config.loaderParams?.["transform"]) {
    const transformStr = normalizeLoaderTransform(config.loaderParams["transform"], "-");
    params.push(transformStr);
  }
  const urlSegments = params.length ? [path, `tr:${params.join(",")}`, src] : [path, src];
  const url = new URL(urlSegments.join("/"));
  return url.href;
}
var imgixLoaderInfo = {
  name: "Imgix",
  testUrl: isImgixUrl
};
var IMGIX_LOADER_REGEX = /https?\:\/\/[^\/]+\.imgix\.net\/.+/;
function isImgixUrl(url) {
  return IMGIX_LOADER_REGEX.test(url);
}
var provideImgixLoader = createImageLoader(createImgixUrl, ngDevMode ? ["https://somepath.imgix.net/"] : void 0);
function createImgixUrl(path, config) {
  const params = [];
  params.push("auto=format");
  if (config.width) {
    params.push(`w=${config.width}`);
  }
  if (config.height) {
    params.push(`h=${config.height}`);
  }
  if (config.isPlaceholder) {
    params.push(`q=${PLACEHOLDER_QUALITY}`);
  }
  if (config.loaderParams?.["transform"]) {
    const transform = normalizeLoaderTransform(config.loaderParams["transform"], "=").split(",");
    params.push(...transform);
  }
  const url = new URL(`${path}/${config.src}`);
  url.search = params.join("&");
  return url.href;
}
var netlifyLoaderInfo = {
  name: "Netlify",
  testUrl: isNetlifyUrl
};
var NETLIFY_LOADER_REGEX = /https?\:\/\/[^\/]+\.netlify\.app\/.+/;
function isNetlifyUrl(url) {
  return NETLIFY_LOADER_REGEX.test(url);
}
function imgDirectiveDetails(ngSrc, includeNgSrc = true) {
  const ngSrcInfo = includeNgSrc ? `(activated on an <img> element with the \`ngSrc="${ngSrc}"\`) ` : "";
  return `The NgOptimizedImage directive ${ngSrcInfo}has detected that`;
}
function assertDevMode(checkName) {
  if (!ngDevMode) {
    throw new RuntimeError(2958, `Unexpected invocation of the ${checkName} in the prod mode. Please make sure that the prod mode is enabled for production builds.`);
  }
}
var LCPImageObserver = class _LCPImageObserver {
  images = /* @__PURE__ */ new Map();
  window = inject(DOCUMENT).defaultView;
  observer = null;
  constructor() {
    assertDevMode("LCP checker");
    if (typeof PerformanceObserver !== "undefined") {
      this.observer = this.initPerformanceObserver();
    }
  }
  initPerformanceObserver() {
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length === 0) return;
      const lcpElement = entries[entries.length - 1];
      const imgSrc = lcpElement.element?.src ?? "";
      if (imgSrc.startsWith("data:") || imgSrc.startsWith("blob:")) return;
      const img = this.images.get(imgSrc);
      if (!img) return;
      if (!img.priority && !img.alreadyWarnedPriority) {
        img.alreadyWarnedPriority = true;
        logMissingPriorityError(imgSrc);
      }
      if (img.modified && !img.alreadyWarnedModified) {
        img.alreadyWarnedModified = true;
        logModifiedWarning(imgSrc);
      }
    });
    observer.observe({
      type: "largest-contentful-paint",
      buffered: true
    });
    return observer;
  }
  registerImage(rewrittenSrc, isPriority) {
    if (!this.observer) return;
    const url = getUrl(rewrittenSrc, this.window).href;
    const existingState = this.images.get(url);
    if (existingState) {
      existingState.priority = existingState.priority || isPriority;
      existingState.count++;
    } else {
      const newObservedImageState = {
        priority: isPriority,
        modified: false,
        alreadyWarnedModified: false,
        alreadyWarnedPriority: false,
        count: 1
      };
      this.images.set(url, newObservedImageState);
    }
  }
  unregisterImage(rewrittenSrc) {
    if (!this.observer) return;
    const url = getUrl(rewrittenSrc, this.window).href;
    const existingState = this.images.get(url);
    if (existingState) {
      existingState.count--;
      if (existingState.count <= 0) {
        this.images.delete(url);
      }
    }
  }
  updateImage(originalSrc, newSrc) {
    if (!this.observer) return;
    const originalUrl = getUrl(originalSrc, this.window).href;
    const newUrl = getUrl(newSrc, this.window).href;
    if (originalUrl === newUrl) return;
    const originalState = this.images.get(originalUrl);
    if (!originalState) return;
    originalState.count--;
    if (originalState.count <= 0) {
      this.images.delete(originalUrl);
    }
    const newState = this.images.get(newUrl);
    if (newState) {
      newState.priority = newState.priority || originalState.priority;
      newState.modified = true;
      newState.alreadyWarnedPriority = newState.alreadyWarnedPriority || originalState.alreadyWarnedPriority;
      newState.alreadyWarnedModified = newState.alreadyWarnedModified || originalState.alreadyWarnedModified;
      newState.count++;
    } else {
      this.images.set(newUrl, {
        priority: originalState.priority,
        modified: true,
        alreadyWarnedModified: originalState.alreadyWarnedModified,
        alreadyWarnedPriority: originalState.alreadyWarnedPriority,
        count: 1
      });
    }
  }
  ngOnDestroy() {
    if (!this.observer) return;
    this.observer.disconnect();
    this.images.clear();
  }
  static \u0275fac = function LCPImageObserver_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LCPImageObserver)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _LCPImageObserver,
    factory: _LCPImageObserver.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LCPImageObserver, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
function logMissingPriorityError(ngSrc) {
  const directiveDetails = imgDirectiveDetails(ngSrc);
  console.error(formatRuntimeError(2955, `${directiveDetails} this image is the Largest Contentful Paint (LCP) element but was not marked "priority". This image should be marked "priority" in order to prioritize its loading. To fix this, add the "priority" attribute.`));
}
function logModifiedWarning(ngSrc) {
  const directiveDetails = imgDirectiveDetails(ngSrc);
  console.warn(formatRuntimeError(2964, `${directiveDetails} this image is the Largest Contentful Paint (LCP) element and has had its "ngSrc" attribute modified. This can cause slower loading performance. It is recommended not to modify the "ngSrc" property on any image which could be the LCP element.`));
}
var INTERNAL_PRECONNECT_CHECK_BLOCKLIST = /* @__PURE__ */ new Set(["localhost", "127.0.0.1", "0.0.0.0", "[::1]"]);
var PRECONNECT_CHECK_BLOCKLIST = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "PRECONNECT_CHECK_BLOCKLIST" : "");
var PreconnectLinkChecker = class _PreconnectLinkChecker {
  document = inject(DOCUMENT);
  preconnectLinks = null;
  alreadySeen = /* @__PURE__ */ new Set();
  window = this.document.defaultView;
  blocklist = new Set(INTERNAL_PRECONNECT_CHECK_BLOCKLIST);
  constructor() {
    assertDevMode("preconnect link checker");
    const blocklist = inject(PRECONNECT_CHECK_BLOCKLIST, {
      optional: true
    });
    if (blocklist) {
      this.populateBlocklist(blocklist);
    }
  }
  populateBlocklist(origins) {
    if (Array.isArray(origins)) {
      deepForEach(origins, (origin) => {
        this.blocklist.add(extractHostname(origin));
      });
    } else {
      this.blocklist.add(extractHostname(origins));
    }
  }
  assertPreconnect(rewrittenSrc, originalNgSrc) {
    if (false) return;
    const imgUrl = getUrl(rewrittenSrc, this.window);
    if (this.blocklist.has(imgUrl.hostname) || this.alreadySeen.has(imgUrl.origin)) return;
    this.alreadySeen.add(imgUrl.origin);
    this.preconnectLinks ??= this.queryPreconnectLinks();
    if (!this.preconnectLinks.has(imgUrl.origin)) {
      console.warn(formatRuntimeError(2956, `${imgDirectiveDetails(originalNgSrc)} there is no preconnect tag present for this image. Preconnecting to the origin(s) that serve priority images ensures that these images are delivered as soon as possible. To fix this, please add the following element into the <head> of the document:
  <link rel="preconnect" href="${imgUrl.origin}">`));
    }
  }
  queryPreconnectLinks() {
    const preconnectUrls = /* @__PURE__ */ new Set();
    const links = this.document.querySelectorAll("link[rel=preconnect]");
    for (const link of links) {
      const url = getUrl(link.href, this.window);
      preconnectUrls.add(url.origin);
    }
    return preconnectUrls;
  }
  ngOnDestroy() {
    this.preconnectLinks?.clear();
    this.alreadySeen.clear();
  }
  static \u0275fac = function PreconnectLinkChecker_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PreconnectLinkChecker)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _PreconnectLinkChecker,
    factory: _PreconnectLinkChecker.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PreconnectLinkChecker, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
function deepForEach(input, fn) {
  for (let value of input) {
    Array.isArray(value) ? deepForEach(value, fn) : fn(value);
  }
}
var DEFAULT_PRELOADED_IMAGES_LIMIT = 5;
var PRELOADED_IMAGES = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "NG_OPTIMIZED_PRELOADED_IMAGES" : "", {
  factory: () => /* @__PURE__ */ new Set()
});
var PreloadLinkCreator = class _PreloadLinkCreator {
  preloadedImages = inject(PRELOADED_IMAGES);
  document = inject(DOCUMENT);
  errorShown = false;
  createPreloadLinkTag(renderer, src, srcset, sizes) {
    if (ngDevMode && !this.errorShown && this.preloadedImages.size >= DEFAULT_PRELOADED_IMAGES_LIMIT) {
      this.errorShown = true;
      console.warn(formatRuntimeError(2961, `The \`NgOptimizedImage\` directive has detected that more than ${DEFAULT_PRELOADED_IMAGES_LIMIT} images were marked as priority. This might negatively affect an overall performance of the page. To fix this, remove the "priority" attribute from images with less priority.`));
    }
    if (this.preloadedImages.has(src)) {
      return;
    }
    this.preloadedImages.add(src);
    const preload = renderer.createElement("link");
    renderer.setAttribute(preload, "as", "image");
    renderer.setAttribute(preload, "href", src);
    renderer.setAttribute(preload, "rel", "preload");
    renderer.setAttribute(preload, "fetchpriority", "high");
    if (sizes) {
      renderer.setAttribute(preload, "imageSizes", sizes);
    }
    if (srcset) {
      renderer.setAttribute(preload, "imageSrcset", srcset);
    }
    renderer.appendChild(this.document.head, preload);
  }
  static \u0275fac = function PreloadLinkCreator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PreloadLinkCreator)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _PreloadLinkCreator,
    factory: _PreloadLinkCreator.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PreloadLinkCreator, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var BASE64_IMG_MAX_LENGTH_IN_ERROR = 50;
var VALID_WIDTH_DESCRIPTOR_SRCSET = /^((\s*\d+w\s*(,|$)){1,})$/;
var VALID_DENSITY_DESCRIPTOR_SRCSET = /^((\s*\d+(\.\d+)?x\s*(,|$)){1,})$/;
var ABSOLUTE_SRCSET_DENSITY_CAP = 3;
var RECOMMENDED_SRCSET_DENSITY_CAP = 2;
var DENSITY_SRCSET_MULTIPLIERS = [1, 2];
var VIEWPORT_BREAKPOINT_CUTOFF = 640;
var ASPECT_RATIO_TOLERANCE = 0.1;
var OVERSIZED_IMAGE_TOLERANCE = 1e3;
var FIXED_SRCSET_WIDTH_LIMIT = 1920;
var FIXED_SRCSET_HEIGHT_LIMIT = 1080;
var PLACEHOLDER_DIMENSION_LIMIT = 1e3;
var DATA_URL_WARN_LIMIT = 4e3;
var DATA_URL_ERROR_LIMIT = 1e4;
var BUILT_IN_LOADERS = [imgixLoaderInfo, imageKitLoaderInfo, cloudinaryLoaderInfo, netlifyLoaderInfo];
var PRIORITY_COUNT_THRESHOLD = 10;
var IMGS_WITH_PRIORITY_ATTR_COUNT = 0;
var NgOptimizedImage = class _NgOptimizedImage {
  imageLoader = inject(IMAGE_LOADER);
  config = processConfig(inject(IMAGE_CONFIG));
  renderer = inject(Renderer2);
  imgElement = inject(ElementRef).nativeElement;
  injector = inject(Injector);
  destroyRef = inject(DestroyRef);
  lcpObserver;
  _renderedSrc = null;
  ngSrc;
  ngSrcset;
  sizes;
  width;
  height;
  decoding;
  loading;
  priority = false;
  loaderParams;
  disableOptimizedSrcset = false;
  fill = false;
  placeholder;
  placeholderConfig;
  src;
  srcset;
  constructor() {
    if (ngDevMode) {
      this.lcpObserver = this.injector.get(LCPImageObserver);
      this.destroyRef.onDestroy(() => {
        if (!this.priority && this._renderedSrc !== null) {
          this.lcpObserver.unregisterImage(this._renderedSrc);
        }
      });
    }
    this.destroyRef.onDestroy(() => {
      this.renderer.removeAttribute(this.imgElement, "loading");
    });
  }
  ngOnInit() {
    performanceMarkFeature("NgOptimizedImage");
    if (ngDevMode) {
      const ngZone = this.injector.get(NgZone);
      assertNonEmptyInput(this, "ngSrc", this.ngSrc);
      assertValidNgSrcset(this, this.ngSrcset);
      assertNoConflictingSrc(this);
      if (this.ngSrcset) {
        assertNoConflictingSrcset(this);
      }
      assertNotBase64Image(this);
      assertNotBlobUrl(this);
      if (this.fill) {
        assertEmptyWidthAndHeight(this);
        ngZone.runOutsideAngular(() => assertNonZeroRenderedHeight(this, this.imgElement, this.renderer, this.destroyRef));
      } else {
        assertNonEmptyWidthAndHeight(this);
        if (this.height !== void 0) {
          assertGreaterThanZero(this, this.height, "height");
        }
        if (this.width !== void 0) {
          assertGreaterThanZero(this, this.width, "width");
        }
        ngZone.runOutsideAngular(() => assertNoImageDistortion(this, this.imgElement, this.renderer, this.destroyRef));
      }
      assertValidLoadingInput(this);
      assertValidDecodingInput(this);
      if (!this.ngSrcset) {
        assertNoComplexSizes(this);
      }
      assertValidPlaceholder(this, this.imageLoader);
      assertNotMissingBuiltInLoader(this.ngSrc, this.imageLoader);
      assertNoNgSrcsetWithoutLoader(this, this.imageLoader);
      assertNoLoaderParamsWithoutLoader(this, this.imageLoader);
      ngZone.runOutsideAngular(() => {
        this.lcpObserver.registerImage(this.getRewrittenSrc(), this.priority);
      });
      if (this.priority) {
        const checker = this.injector.get(PreconnectLinkChecker);
        checker.assertPreconnect(this.getRewrittenSrc(), this.ngSrc);
        if (true) {
          const applicationRef = this.injector.get(ApplicationRef);
          assetPriorityCountBelowThreshold(applicationRef);
        }
      }
    }
    if (this.placeholder) {
      this.removePlaceholderOnLoad(this.imgElement);
    }
    this.setHostAttributes();
  }
  setHostAttributes() {
    if (this.fill) {
      this.sizes ||= "100vw";
    } else {
      this.setHostAttribute("width", this.width.toString());
      this.setHostAttribute("height", this.height.toString());
    }
    this.setHostAttribute("loading", this.getLoadingBehavior());
    this.setHostAttribute("fetchpriority", this.getFetchPriority());
    this.setHostAttribute("decoding", this.getDecoding());
    this.setHostAttribute("ng-img", "true");
    const rewrittenSrcset = this.updateSrcAndSrcset();
    if (this.sizes) {
      if (this.getLoadingBehavior() === "lazy") {
        this.setHostAttribute("sizes", "auto, " + this.sizes);
      } else {
        this.setHostAttribute("sizes", this.sizes);
      }
    } else {
      if (this.ngSrcset && VALID_WIDTH_DESCRIPTOR_SRCSET.test(this.ngSrcset) && this.getLoadingBehavior() === "lazy") {
        this.setHostAttribute("sizes", "auto, 100vw");
      }
    }
    if (false) {
      const preloadLinkCreator = this.injector.get(PreloadLinkCreator);
      preloadLinkCreator.createPreloadLinkTag(this.renderer, this.getRewrittenSrc(), rewrittenSrcset, this.sizes);
    }
  }
  ngOnChanges(changes) {
    if (ngDevMode) {
      assertNoPostInitInputChange(this, changes, ["ngSrcset", "width", "height", "priority", "fill", "loading", "sizes", "loaderParams", "disableOptimizedSrcset"]);
    }
    if (changes["ngSrc"] && !changes["ngSrc"].isFirstChange()) {
      const oldSrc = this._renderedSrc;
      this.updateSrcAndSrcset(true);
      if (ngDevMode) {
        const newSrc = this._renderedSrc;
        if (oldSrc && newSrc && oldSrc !== newSrc) {
          const ngZone = this.injector.get(NgZone);
          ngZone.runOutsideAngular(() => {
            this.lcpObserver.updateImage(oldSrc, newSrc);
          });
        }
      }
    }
    if (ngDevMode && changes["placeholder"]?.currentValue && true && true) {
      assertPlaceholderDimensions(this, this.imgElement);
    }
  }
  getAspectRatio() {
    if (this.width && this.height && this.height !== 0) {
      return this.width / this.height;
    }
    return null;
  }
  callImageLoader(configWithoutCustomParams) {
    let augmentedConfig = configWithoutCustomParams;
    if (this.loaderParams) {
      augmentedConfig.loaderParams = this.loaderParams;
    }
    const ratio = this.getAspectRatio();
    if (ratio !== null && augmentedConfig.width) {
      augmentedConfig.height = Math.round(augmentedConfig.width / ratio);
    }
    return this.imageLoader(augmentedConfig);
  }
  getLoadingBehavior() {
    if (!this.priority && this.loading !== void 0) {
      return this.loading;
    }
    return this.priority ? "eager" : "lazy";
  }
  getFetchPriority() {
    return this.priority ? "high" : "auto";
  }
  getDecoding() {
    if (this.priority) {
      return "sync";
    }
    return this.decoding ?? "auto";
  }
  getRewrittenSrc() {
    if (!this._renderedSrc) {
      const imgConfig = {
        src: this.ngSrc
      };
      this._renderedSrc = this.callImageLoader(imgConfig);
    }
    return this._renderedSrc;
  }
  getRewrittenSrcset() {
    const widthSrcSet = VALID_WIDTH_DESCRIPTOR_SRCSET.test(this.ngSrcset);
    const finalSrcs = this.ngSrcset.split(",").filter((src) => src !== "").map((srcStr) => {
      srcStr = srcStr.trim();
      const width = widthSrcSet ? parseFloat(srcStr) : parseFloat(srcStr) * this.width;
      return `${this.callImageLoader({
        src: this.ngSrc,
        width
      })} ${srcStr}`;
    });
    return finalSrcs.join(", ");
  }
  getAutomaticSrcset() {
    if (this.sizes) {
      return this.getResponsiveSrcset();
    } else {
      return this.getFixedSrcset();
    }
  }
  getResponsiveSrcset() {
    const {
      breakpoints
    } = this.config;
    let filteredBreakpoints = breakpoints;
    if (this.sizes?.trim() === "100vw") {
      filteredBreakpoints = breakpoints.filter((bp) => bp >= VIEWPORT_BREAKPOINT_CUTOFF);
    }
    const finalSrcs = filteredBreakpoints.map((bp) => `${this.callImageLoader({
      src: this.ngSrc,
      width: bp
    })} ${bp}w`);
    return finalSrcs.join(", ");
  }
  updateSrcAndSrcset(forceSrcRecalc = false) {
    if (forceSrcRecalc) {
      this._renderedSrc = null;
    }
    const rewrittenSrc = this.getRewrittenSrc();
    this.setHostAttribute("src", rewrittenSrc);
    let rewrittenSrcset = void 0;
    if (this.ngSrcset) {
      rewrittenSrcset = this.getRewrittenSrcset();
    } else if (this.shouldGenerateAutomaticSrcset()) {
      rewrittenSrcset = this.getAutomaticSrcset();
    }
    if (rewrittenSrcset) {
      this.setHostAttribute("srcset", rewrittenSrcset);
    }
    return rewrittenSrcset;
  }
  getFixedSrcset() {
    const finalSrcs = DENSITY_SRCSET_MULTIPLIERS.map((multiplier) => `${this.callImageLoader({
      src: this.ngSrc,
      width: this.width * multiplier
    })} ${multiplier}x`);
    return finalSrcs.join(", ");
  }
  shouldGenerateAutomaticSrcset() {
    let oversizedImage = false;
    if (!this.sizes) {
      oversizedImage = this.width > FIXED_SRCSET_WIDTH_LIMIT || this.height > FIXED_SRCSET_HEIGHT_LIMIT;
    }
    return !this.disableOptimizedSrcset && !this.srcset && this.imageLoader !== noopImageLoader && !oversizedImage;
  }
  generatePlaceholder(placeholderInput) {
    const {
      placeholderResolution
    } = this.config;
    if (placeholderInput === true) {
      return `url(${this.callImageLoader({
        src: this.ngSrc,
        width: placeholderResolution,
        isPlaceholder: true
      })})`;
    } else if (typeof placeholderInput === "string") {
      return `url(${placeholderInput})`;
    }
    return null;
  }
  shouldBlurPlaceholder(placeholderConfig) {
    if (!placeholderConfig || !placeholderConfig.hasOwnProperty("blur")) {
      return true;
    }
    return Boolean(placeholderConfig.blur);
  }
  removePlaceholderOnLoad(img) {
    const callback = () => {
      const changeDetectorRef = this.injector.get(ChangeDetectorRef);
      removeLoadListenerFn();
      removeErrorListenerFn();
      this.placeholder = false;
      changeDetectorRef.markForCheck();
    };
    const removeLoadListenerFn = this.renderer.listen(img, "load", callback);
    const removeErrorListenerFn = this.renderer.listen(img, "error", callback);
    this.destroyRef.onDestroy(() => {
      removeLoadListenerFn();
      removeErrorListenerFn();
    });
    callOnLoadIfImageIsLoaded(img, callback);
  }
  setHostAttribute(name, value) {
    this.renderer.setAttribute(this.imgElement, name, value);
  }
  static \u0275fac = function NgOptimizedImage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgOptimizedImage)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NgOptimizedImage,
    selectors: [["img", "ngSrc", ""]],
    hostVars: 18,
    hostBindings: function NgOptimizedImage_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275styleProp("position", ctx.fill ? "absolute" : null)("width", ctx.fill ? "100%" : null)("height", ctx.fill ? "100%" : null)("inset", ctx.fill ? "0" : null)("background-size", ctx.placeholder ? "cover" : null)("background-position", ctx.placeholder ? "50% 50%" : null)("background-repeat", ctx.placeholder ? "no-repeat" : null)("background-image", ctx.placeholder ? ctx.generatePlaceholder(ctx.placeholder) : null)("filter", ctx.placeholder && ctx.shouldBlurPlaceholder(ctx.placeholderConfig) ? "blur(15px)" : null);
      }
    },
    inputs: {
      ngSrc: [2, "ngSrc", "ngSrc", unwrapSafeUrl],
      ngSrcset: "ngSrcset",
      sizes: "sizes",
      width: [2, "width", "width", numberAttribute],
      height: [2, "height", "height", numberAttribute],
      decoding: "decoding",
      loading: "loading",
      priority: [2, "priority", "priority", booleanAttribute],
      loaderParams: "loaderParams",
      disableOptimizedSrcset: [2, "disableOptimizedSrcset", "disableOptimizedSrcset", booleanAttribute],
      fill: [2, "fill", "fill", booleanAttribute],
      placeholder: [2, "placeholder", "placeholder", booleanOrUrlAttribute],
      placeholderConfig: "placeholderConfig",
      src: "src",
      srcset: "srcset"
    },
    features: [\u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgOptimizedImage, [{
    type: Directive,
    args: [{
      selector: "img[ngSrc]",
      host: {
        "[style.position]": 'fill ? "absolute" : null',
        "[style.width]": 'fill ? "100%" : null',
        "[style.height]": 'fill ? "100%" : null',
        "[style.inset]": 'fill ? "0" : null',
        "[style.background-size]": 'placeholder ? "cover" : null',
        "[style.background-position]": 'placeholder ? "50% 50%" : null',
        "[style.background-repeat]": 'placeholder ? "no-repeat" : null',
        "[style.background-image]": "placeholder ? generatePlaceholder(placeholder) : null",
        "[style.filter]": 'placeholder && shouldBlurPlaceholder(placeholderConfig) ? "blur(15px)" : null'
      }
    }]
  }], () => [], {
    ngSrc: [{
      type: Input,
      args: [{
        required: true,
        transform: unwrapSafeUrl
      }]
    }],
    ngSrcset: [{
      type: Input
    }],
    sizes: [{
      type: Input
    }],
    width: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    height: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    decoding: [{
      type: Input
    }],
    loading: [{
      type: Input
    }],
    priority: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    loaderParams: [{
      type: Input
    }],
    disableOptimizedSrcset: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    fill: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    placeholder: [{
      type: Input,
      args: [{
        transform: booleanOrUrlAttribute
      }]
    }],
    placeholderConfig: [{
      type: Input
    }],
    src: [{
      type: Input
    }],
    srcset: [{
      type: Input
    }]
  });
})();
function processConfig(config) {
  let sortedBreakpoints = {};
  if (config.breakpoints) {
    sortedBreakpoints.breakpoints = config.breakpoints.sort((a, b) => a - b);
  }
  return Object.assign({}, IMAGE_CONFIG_DEFAULTS, config, sortedBreakpoints);
}
function assertNoConflictingSrc(dir) {
  if (dir.src) {
    throw new RuntimeError(2950, `${imgDirectiveDetails(dir.ngSrc)} both \`src\` and \`ngSrc\` have been set. Supplying both of these attributes breaks lazy loading. The NgOptimizedImage directive sets \`src\` itself based on the value of \`ngSrc\`. To fix this, please remove the \`src\` attribute.`);
  }
}
function assertNoConflictingSrcset(dir) {
  if (dir.srcset) {
    throw new RuntimeError(2951, `${imgDirectiveDetails(dir.ngSrc)} both \`srcset\` and \`ngSrcset\` have been set. Supplying both of these attributes breaks lazy loading. The NgOptimizedImage directive sets \`srcset\` itself based on the value of \`ngSrcset\`. To fix this, please remove the \`srcset\` attribute.`);
  }
}
function assertNotBase64Image(dir) {
  let ngSrc = dir.ngSrc.trim();
  if (ngSrc.startsWith("data:")) {
    if (ngSrc.length > BASE64_IMG_MAX_LENGTH_IN_ERROR) {
      ngSrc = ngSrc.substring(0, BASE64_IMG_MAX_LENGTH_IN_ERROR) + "...";
    }
    throw new RuntimeError(2952, `${imgDirectiveDetails(dir.ngSrc, false)} \`ngSrc\` is a Base64-encoded string (${ngSrc}). NgOptimizedImage does not support Base64-encoded strings. To fix this, disable the NgOptimizedImage directive for this element by removing \`ngSrc\` and using a standard \`src\` attribute instead.`);
  }
}
function assertNoComplexSizes(dir) {
  let sizes = dir.sizes;
  if (sizes?.match(/((\)|,)\s|^)\d+px/)) {
    throw new RuntimeError(2952, `${imgDirectiveDetails(dir.ngSrc, false)} \`sizes\` was set to a string including pixel values. For automatic \`srcset\` generation, \`sizes\` must only include responsive values, such as \`sizes="50vw"\` or \`sizes="(min-width: 768px) 50vw, 100vw"\`. To fix this, modify the \`sizes\` attribute, or provide your own \`ngSrcset\` value directly.`);
  }
}
function assertValidPlaceholder(dir, imageLoader) {
  assertNoPlaceholderConfigWithoutPlaceholder(dir);
  assertNoRelativePlaceholderWithoutLoader(dir, imageLoader);
  assertNoOversizedDataUrl(dir);
}
function assertNoPlaceholderConfigWithoutPlaceholder(dir) {
  if (dir.placeholderConfig && !dir.placeholder) {
    throw new RuntimeError(2952, `${imgDirectiveDetails(dir.ngSrc, false)} \`placeholderConfig\` options were provided for an image that does not use the \`placeholder\` attribute, and will have no effect.`);
  }
}
function assertNoRelativePlaceholderWithoutLoader(dir, imageLoader) {
  if (dir.placeholder === true && imageLoader === noopImageLoader) {
    throw new RuntimeError(2963, `${imgDirectiveDetails(dir.ngSrc)} the \`placeholder\` attribute is set to true but no image loader is configured (i.e. the default one is being used), which would result in the same image being used for the primary image and its placeholder. To fix this, provide a loader or remove the \`placeholder\` attribute from the image.`);
  }
}
function assertNoOversizedDataUrl(dir) {
  if (dir.placeholder && typeof dir.placeholder === "string" && dir.placeholder.startsWith("data:")) {
    if (dir.placeholder.length > DATA_URL_ERROR_LIMIT) {
      throw new RuntimeError(2965, `${imgDirectiveDetails(dir.ngSrc)} the \`placeholder\` attribute is set to a data URL which is longer than ${DATA_URL_ERROR_LIMIT} characters. This is strongly discouraged, as large inline placeholders directly increase the bundle size of Angular and hurt page load performance. To fix this, generate a smaller data URL placeholder.`);
    }
    if (dir.placeholder.length > DATA_URL_WARN_LIMIT) {
      console.warn(formatRuntimeError(2965, `${imgDirectiveDetails(dir.ngSrc)} the \`placeholder\` attribute is set to a data URL which is longer than ${DATA_URL_WARN_LIMIT} characters. This is discouraged, as large inline placeholders directly increase the bundle size of Angular and hurt page load performance. For better loading performance, generate a smaller data URL placeholder.`));
    }
  }
}
function assertNotBlobUrl(dir) {
  const ngSrc = dir.ngSrc.trim();
  if (ngSrc.startsWith("blob:")) {
    throw new RuntimeError(2952, `${imgDirectiveDetails(dir.ngSrc)} \`ngSrc\` was set to a blob URL (${ngSrc}). Blob URLs are not supported by the NgOptimizedImage directive. To fix this, disable the NgOptimizedImage directive for this element by removing \`ngSrc\` and using a regular \`src\` attribute instead.`);
  }
}
function assertNonEmptyInput(dir, name, value) {
  const isString = typeof value === "string";
  const isEmptyString = isString && value.trim() === "";
  if (!isString || isEmptyString) {
    throw new RuntimeError(2952, `${imgDirectiveDetails(dir.ngSrc)} \`${name}\` has an invalid value (\`${value}\`). To fix this, change the value to a non-empty string.`);
  }
}
function assertValidNgSrcset(dir, value) {
  if (value == null) return;
  assertNonEmptyInput(dir, "ngSrcset", value);
  const stringVal = value;
  const isValidWidthDescriptor = VALID_WIDTH_DESCRIPTOR_SRCSET.test(stringVal);
  const isValidDensityDescriptor = VALID_DENSITY_DESCRIPTOR_SRCSET.test(stringVal);
  if (isValidDensityDescriptor) {
    assertUnderDensityCap(dir, stringVal);
  }
  const isValidSrcset = isValidWidthDescriptor || isValidDensityDescriptor;
  if (!isValidSrcset) {
    throw new RuntimeError(2952, `${imgDirectiveDetails(dir.ngSrc)} \`ngSrcset\` has an invalid value (\`${value}\`). To fix this, supply \`ngSrcset\` using a comma-separated list of one or more width descriptors (e.g. "100w, 200w") or density descriptors (e.g. "1x, 2x").`);
  }
}
function assertUnderDensityCap(dir, value) {
  const underDensityCap = value.split(",").every((num) => num === "" || parseFloat(num) <= ABSOLUTE_SRCSET_DENSITY_CAP);
  if (!underDensityCap) {
    throw new RuntimeError(2952, `${imgDirectiveDetails(dir.ngSrc)} the \`ngSrcset\` contains an unsupported image density:\`${value}\`. NgOptimizedImage generally recommends a max image density of ${RECOMMENDED_SRCSET_DENSITY_CAP}x but supports image densities up to ${ABSOLUTE_SRCSET_DENSITY_CAP}x. The human eye cannot distinguish between image densities greater than ${RECOMMENDED_SRCSET_DENSITY_CAP}x - which makes them unnecessary for most use cases. Images that will be pinch-zoomed are typically the primary use case for ${ABSOLUTE_SRCSET_DENSITY_CAP}x images. Please remove the high density descriptor and try again.`);
  }
}
function postInitInputChangeError(dir, inputName) {
  let reason;
  if (inputName === "width" || inputName === "height") {
    reason = `Changing \`${inputName}\` may result in different attribute value applied to the underlying image element and cause layout shifts on a page.`;
  } else {
    reason = `Changing the \`${inputName}\` would have no effect on the underlying image element, because the resource loading has already occurred.`;
  }
  return new RuntimeError(2953, `${imgDirectiveDetails(dir.ngSrc)} \`${inputName}\` was updated after initialization. The NgOptimizedImage directive will not react to this input change. ${reason} To fix this, either switch \`${inputName}\` to a static value or wrap the image element in an @if that is gated on the necessary value.`);
}
function assertNoPostInitInputChange(dir, changes, inputs) {
  inputs.forEach((input) => {
    const isUpdated = changes.hasOwnProperty(input);
    if (isUpdated && !changes[input].isFirstChange()) {
      if (input === "ngSrc") {
        dir = {
          ngSrc: changes[input].previousValue
        };
      }
      throw postInitInputChangeError(dir, input);
    }
  });
}
function assertGreaterThanZero(dir, inputValue, inputName) {
  const validNumber = typeof inputValue === "number" && inputValue > 0;
  const validString = typeof inputValue === "string" && /^\d+$/.test(inputValue.trim()) && parseInt(inputValue) > 0;
  if (!validNumber && !validString) {
    throw new RuntimeError(2952, `${imgDirectiveDetails(dir.ngSrc)} \`${inputName}\` has an invalid value. To fix this, provide \`${inputName}\` as a number greater than 0.`);
  }
}
function assertNoImageDistortion(dir, img, renderer, destroyRef) {
  const callback = () => {
    removeLoadListenerFn();
    removeErrorListenerFn();
    const computedStyle = window.getComputedStyle(img);
    let renderedWidth = parseFloat(computedStyle.getPropertyValue("width"));
    let renderedHeight = parseFloat(computedStyle.getPropertyValue("height"));
    const boxSizing = computedStyle.getPropertyValue("box-sizing");
    if (boxSizing === "border-box") {
      const paddingTop = computedStyle.getPropertyValue("padding-top");
      const paddingRight = computedStyle.getPropertyValue("padding-right");
      const paddingBottom = computedStyle.getPropertyValue("padding-bottom");
      const paddingLeft = computedStyle.getPropertyValue("padding-left");
      renderedWidth -= parseFloat(paddingRight) + parseFloat(paddingLeft);
      renderedHeight -= parseFloat(paddingTop) + parseFloat(paddingBottom);
    }
    const renderedAspectRatio = renderedWidth / renderedHeight;
    const nonZeroRenderedDimensions = renderedWidth !== 0 && renderedHeight !== 0;
    const intrinsicWidth = img.naturalWidth;
    const intrinsicHeight = img.naturalHeight;
    const intrinsicAspectRatio = intrinsicWidth / intrinsicHeight;
    const suppliedWidth = dir.width;
    const suppliedHeight = dir.height;
    const suppliedAspectRatio = suppliedWidth / suppliedHeight;
    const inaccurateDimensions = Math.abs(suppliedAspectRatio - intrinsicAspectRatio) > ASPECT_RATIO_TOLERANCE;
    const stylingDistortion = nonZeroRenderedDimensions && Math.abs(intrinsicAspectRatio - renderedAspectRatio) > ASPECT_RATIO_TOLERANCE;
    if (inaccurateDimensions) {
      console.warn(formatRuntimeError(2952, `${imgDirectiveDetails(dir.ngSrc)} the aspect ratio of the image does not match the aspect ratio indicated by the width and height attributes. 
Intrinsic image size: ${intrinsicWidth}w x ${intrinsicHeight}h (aspect-ratio: ${round(intrinsicAspectRatio)}). 
Supplied width and height attributes: ${suppliedWidth}w x ${suppliedHeight}h (aspect-ratio: ${round(suppliedAspectRatio)}). 
To fix this, update the width and height attributes.`));
    } else if (stylingDistortion) {
      console.warn(formatRuntimeError(2952, `${imgDirectiveDetails(dir.ngSrc)} the aspect ratio of the rendered image does not match the image's intrinsic aspect ratio. 
Intrinsic image size: ${intrinsicWidth}w x ${intrinsicHeight}h (aspect-ratio: ${round(intrinsicAspectRatio)}). 
Rendered image size: ${renderedWidth}w x ${renderedHeight}h (aspect-ratio: ${round(renderedAspectRatio)}). 
This issue can occur if "width" and "height" attributes are added to an image without updating the corresponding image styling. To fix this, adjust image styling. In most cases, adding "height: auto" or "width: auto" to the image styling will fix this issue.`));
    } else if (!dir.ngSrcset && nonZeroRenderedDimensions) {
      const recommendedWidth = RECOMMENDED_SRCSET_DENSITY_CAP * renderedWidth;
      const recommendedHeight = RECOMMENDED_SRCSET_DENSITY_CAP * renderedHeight;
      const oversizedWidth = intrinsicWidth - recommendedWidth >= OVERSIZED_IMAGE_TOLERANCE;
      const oversizedHeight = intrinsicHeight - recommendedHeight >= OVERSIZED_IMAGE_TOLERANCE;
      if (oversizedWidth || oversizedHeight) {
        console.warn(formatRuntimeError(2960, `${imgDirectiveDetails(dir.ngSrc)} the intrinsic image is significantly larger than necessary. 
Rendered image size: ${renderedWidth}w x ${renderedHeight}h. 
Intrinsic image size: ${intrinsicWidth}w x ${intrinsicHeight}h. 
Recommended intrinsic image size: ${recommendedWidth}w x ${recommendedHeight}h. 
Note: Recommended intrinsic image size is calculated assuming a maximum DPR of ${RECOMMENDED_SRCSET_DENSITY_CAP}. To improve loading time, resize the image or consider using the "ngSrcset" and "sizes" attributes.`));
      }
    }
  };
  const removeLoadListenerFn = renderer.listen(img, "load", callback);
  const removeErrorListenerFn = renderer.listen(img, "error", () => {
    removeLoadListenerFn();
    removeErrorListenerFn();
  });
  destroyRef.onDestroy(() => {
    removeLoadListenerFn();
    removeErrorListenerFn();
  });
  callOnLoadIfImageIsLoaded(img, callback);
}
function assertNonEmptyWidthAndHeight(dir) {
  let missingAttributes = [];
  if (dir.width === void 0) missingAttributes.push("width");
  if (dir.height === void 0) missingAttributes.push("height");
  if (missingAttributes.length > 0) {
    throw new RuntimeError(2954, `${imgDirectiveDetails(dir.ngSrc)} these required attributes are missing: ${missingAttributes.map((attr) => `"${attr}"`).join(", ")}. Including "width" and "height" attributes will prevent image-related layout shifts. To fix this, include "width" and "height" attributes on the image tag or turn on "fill" mode with the \`fill\` attribute.`);
  }
}
function assertEmptyWidthAndHeight(dir) {
  if (dir.width || dir.height) {
    throw new RuntimeError(2952, `${imgDirectiveDetails(dir.ngSrc)} the attributes \`height\` and/or \`width\` are present along with the \`fill\` attribute. Because \`fill\` mode causes an image to fill its containing element, the size attributes have no effect and should be removed.`);
  }
}
function assertNonZeroRenderedHeight(dir, img, renderer, destroyRef) {
  const callback = () => {
    removeLoadListenerFn();
    removeErrorListenerFn();
    const renderedHeight = img.clientHeight;
    if (dir.fill && renderedHeight === 0) {
      console.warn(formatRuntimeError(2952, `${imgDirectiveDetails(dir.ngSrc)} the height of the fill-mode image is zero. This is likely because the containing element does not have the CSS 'position' property set to one of the following: "relative", "fixed", or "absolute". To fix this problem, make sure the container element has the CSS 'position' property defined and the height of the element is not zero.`));
    }
  };
  const removeLoadListenerFn = renderer.listen(img, "load", callback);
  const removeErrorListenerFn = renderer.listen(img, "error", () => {
    removeLoadListenerFn();
    removeErrorListenerFn();
  });
  destroyRef.onDestroy(() => {
    removeLoadListenerFn();
    removeErrorListenerFn();
  });
  callOnLoadIfImageIsLoaded(img, callback);
}
function assertValidLoadingInput(dir) {
  if (dir.loading && dir.priority) {
    throw new RuntimeError(2952, `${imgDirectiveDetails(dir.ngSrc)} the \`loading\` attribute was used on an image that was marked "priority". Setting \`loading\` on priority images is not allowed because these images will always be eagerly loaded. To fix this, remove the \u201Cloading\u201D attribute from the priority image.`);
  }
  const validInputs = ["auto", "eager", "lazy"];
  if (typeof dir.loading === "string" && !validInputs.includes(dir.loading)) {
    throw new RuntimeError(2952, `${imgDirectiveDetails(dir.ngSrc)} the \`loading\` attribute has an invalid value (\`${dir.loading}\`). To fix this, provide a valid value ("lazy", "eager", or "auto").`);
  }
}
function assertValidDecodingInput(dir) {
  const validInputs = ["sync", "async", "auto"];
  if (typeof dir.decoding === "string" && !validInputs.includes(dir.decoding)) {
    throw new RuntimeError(2952, `${imgDirectiveDetails(dir.ngSrc)} the \`decoding\` attribute has an invalid value (\`${dir.decoding}\`). To fix this, provide a valid value ("sync", "async", or "auto").`);
  }
}
function assertNotMissingBuiltInLoader(ngSrc, imageLoader) {
  if (imageLoader === noopImageLoader) {
    let builtInLoaderName = "";
    for (const loader of BUILT_IN_LOADERS) {
      if (loader.testUrl(ngSrc)) {
        builtInLoaderName = loader.name;
        break;
      }
    }
    if (builtInLoaderName) {
      console.warn(formatRuntimeError(2962, `NgOptimizedImage: It looks like your images may be hosted on the ${builtInLoaderName} CDN, but your app is not using Angular's built-in loader for that CDN. We recommend switching to use the built-in by calling \`provide${builtInLoaderName}Loader()\` in your \`providers\` and passing it your instance's base URL. If you don't want to use the built-in loader, define a custom loader function using IMAGE_LOADER to silence this warning.`));
    }
  }
}
function assertNoNgSrcsetWithoutLoader(dir, imageLoader) {
  if (dir.ngSrcset && imageLoader === noopImageLoader) {
    console.warn(formatRuntimeError(2963, `${imgDirectiveDetails(dir.ngSrc)} the \`ngSrcset\` attribute is present but no image loader is configured (i.e. the default one is being used), which would result in the same image being used for all configured sizes. To fix this, provide a loader or remove the \`ngSrcset\` attribute from the image.`));
  }
}
function assertNoLoaderParamsWithoutLoader(dir, imageLoader) {
  if (dir.loaderParams && imageLoader === noopImageLoader) {
    console.warn(formatRuntimeError(2963, `${imgDirectiveDetails(dir.ngSrc)} the \`loaderParams\` attribute is present but no image loader is configured (i.e. the default one is being used), which means that the loaderParams data will not be consumed and will not affect the URL. To fix this, provide a custom loader or remove the \`loaderParams\` attribute from the image.`));
  }
}
function assetPriorityCountBelowThreshold(appRef) {
  return __async(this, null, function* () {
    if (IMGS_WITH_PRIORITY_ATTR_COUNT === 0) {
      IMGS_WITH_PRIORITY_ATTR_COUNT++;
      yield appRef.whenStable();
      if (IMGS_WITH_PRIORITY_ATTR_COUNT > PRIORITY_COUNT_THRESHOLD) {
        console.warn(formatRuntimeError(2966, `NgOptimizedImage: The "priority" attribute is set to true more than ${PRIORITY_COUNT_THRESHOLD} times (${IMGS_WITH_PRIORITY_ATTR_COUNT} times). Marking too many images as "high" priority can hurt your application's LCP (https://web.dev/lcp). "Priority" should only be set on the image expected to be the page's LCP element.`));
      }
    } else {
      IMGS_WITH_PRIORITY_ATTR_COUNT++;
    }
  });
}
function assertPlaceholderDimensions(dir, imgElement) {
  const computedStyle = window.getComputedStyle(imgElement);
  let renderedWidth = parseFloat(computedStyle.getPropertyValue("width"));
  let renderedHeight = parseFloat(computedStyle.getPropertyValue("height"));
  if (renderedWidth > PLACEHOLDER_DIMENSION_LIMIT || renderedHeight > PLACEHOLDER_DIMENSION_LIMIT) {
    console.warn(formatRuntimeError(2967, `${imgDirectiveDetails(dir.ngSrc)} it uses a placeholder image, but at least one of the dimensions attribute (height or width) exceeds the limit of ${PLACEHOLDER_DIMENSION_LIMIT}px. To fix this, use a smaller image as a placeholder.`));
  }
}
function callOnLoadIfImageIsLoaded(img, callback) {
  if (img.complete && img.naturalWidth) {
    callback();
  }
}
function round(input) {
  return Number.isInteger(input) ? input : input.toFixed(2);
}
function unwrapSafeUrl(value) {
  if (typeof value === "string") {
    return value;
  }
  return unwrapSafeValue(value);
}
function booleanOrUrlAttribute(value) {
  if (typeof value === "string" && value !== "true" && value !== "false" && value !== "") {
    return value;
  }
  return booleanAttribute(value);
}

// node_modules/lucide-angular/fesm2020/lucide-angular.mjs
var _c0 = ["*"];
var Activity = [["path", {
  d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
  key: "169zse"
}]];
var ArrowLeftRight = [["path", {
  d: "M8 3 4 7l4 4",
  key: "9rb6wj"
}], ["path", {
  d: "M4 7h16",
  key: "6tx8e3"
}], ["path", {
  d: "m16 21 4-4-4-4",
  key: "siv7j2"
}], ["path", {
  d: "M20 17H4",
  key: "h6l3hr"
}]];
var ArrowLeft = [["path", {
  d: "m12 19-7-7 7-7",
  key: "1l729n"
}], ["path", {
  d: "M19 12H5",
  key: "x3x0zl"
}]];
var ArrowRight = [["path", {
  d: "M5 12h14",
  key: "1ays0h"
}], ["path", {
  d: "m12 5 7 7-7 7",
  key: "xquz4c"
}]];
var Baby = [["path", {
  d: "M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5",
  key: "1u7htd"
}], ["path", {
  d: "M15 12h.01",
  key: "1k8ypt"
}], ["path", {
  d: "M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1",
  key: "11xh7x"
}], ["path", {
  d: "M9 12h.01",
  key: "157uk2"
}]];
var BadgeCheck = [["path", {
  d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
  key: "3c2336"
}], ["path", {
  d: "m9 12 2 2 4-4",
  key: "dzmm74"
}]];
var Bell = [["path", {
  d: "M10.268 21a2 2 0 0 0 3.464 0",
  key: "vwvbt9"
}], ["path", {
  d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
  key: "11g9vi"
}]];
var BookOpen = [["path", {
  d: "M12 7v14",
  key: "1akyts"
}], ["path", {
  d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
  key: "ruj8y"
}]];
var Cake = [["path", {
  d: "M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8",
  key: "1w3rig"
}], ["path", {
  d: "M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1",
  key: "n2jgmb"
}], ["path", {
  d: "M2 21h20",
  key: "1nyx9w"
}], ["path", {
  d: "M7 8v3",
  key: "1qtyvj"
}], ["path", {
  d: "M12 8v3",
  key: "hwp4zt"
}], ["path", {
  d: "M17 8v3",
  key: "1i6e5u"
}], ["path", {
  d: "M7 4h.01",
  key: "1bh4kh"
}], ["path", {
  d: "M12 4h.01",
  key: "1ujb9j"
}], ["path", {
  d: "M17 4h.01",
  key: "1upcoc"
}]];
var CalendarCheck = [["path", {
  d: "M8 2v4",
  key: "1cmpym"
}], ["path", {
  d: "M16 2v4",
  key: "4m81vk"
}], ["rect", {
  width: "18",
  height: "18",
  x: "3",
  y: "4",
  rx: "2",
  key: "1hopcy"
}], ["path", {
  d: "M3 10h18",
  key: "8toen8"
}], ["path", {
  d: "m9 16 2 2 4-4",
  key: "19s6y9"
}]];
var CalendarClock = [["path", {
  d: "M16 14v2.2l1.6 1",
  key: "fo4ql5"
}], ["path", {
  d: "M16 2v4",
  key: "4m81vk"
}], ["path", {
  d: "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5",
  key: "1osxxc"
}], ["path", {
  d: "M3 10h5",
  key: "r794hk"
}], ["path", {
  d: "M8 2v4",
  key: "1cmpym"
}], ["circle", {
  cx: "16",
  cy: "16",
  r: "6",
  key: "qoo3c4"
}]];
var CalendarDays = [["path", {
  d: "M8 2v4",
  key: "1cmpym"
}], ["path", {
  d: "M16 2v4",
  key: "4m81vk"
}], ["rect", {
  width: "18",
  height: "18",
  x: "3",
  y: "4",
  rx: "2",
  key: "1hopcy"
}], ["path", {
  d: "M3 10h18",
  key: "8toen8"
}], ["path", {
  d: "M8 14h.01",
  key: "6423bh"
}], ["path", {
  d: "M12 14h.01",
  key: "1etili"
}], ["path", {
  d: "M16 14h.01",
  key: "1gbofw"
}], ["path", {
  d: "M8 18h.01",
  key: "lrp35t"
}], ["path", {
  d: "M12 18h.01",
  key: "mhygvu"
}], ["path", {
  d: "M16 18h.01",
  key: "kzsmim"
}]];
var CalendarX = [["path", {
  d: "M8 2v4",
  key: "1cmpym"
}], ["path", {
  d: "M16 2v4",
  key: "4m81vk"
}], ["rect", {
  width: "18",
  height: "18",
  x: "3",
  y: "4",
  rx: "2",
  key: "1hopcy"
}], ["path", {
  d: "M3 10h18",
  key: "8toen8"
}], ["path", {
  d: "m14 14-4 4",
  key: "rymu2i"
}], ["path", {
  d: "m10 14 4 4",
  key: "3sz06r"
}]];
var Calendar = [["path", {
  d: "M8 2v4",
  key: "1cmpym"
}], ["path", {
  d: "M16 2v4",
  key: "4m81vk"
}], ["rect", {
  width: "18",
  height: "18",
  x: "3",
  y: "4",
  rx: "2",
  key: "1hopcy"
}], ["path", {
  d: "M3 10h18",
  key: "8toen8"
}]];
var ChartBar = [["path", {
  d: "M3 3v16a2 2 0 0 0 2 2h16",
  key: "c24i48"
}], ["path", {
  d: "M7 16h8",
  key: "srdodz"
}], ["path", {
  d: "M7 11h12",
  key: "127s9w"
}], ["path", {
  d: "M7 6h3",
  key: "w9rmul"
}]];
var ChartNoAxesColumn = [["path", {
  d: "M5 21v-6",
  key: "1hz6c0"
}], ["path", {
  d: "M12 21V3",
  key: "1lcnhd"
}], ["path", {
  d: "M19 21V9",
  key: "unv183"
}]];
var Check = [["path", {
  d: "M20 6 9 17l-5-5",
  key: "1gmf2c"
}]];
var ChevronDown = [["path", {
  d: "m6 9 6 6 6-6",
  key: "qrunsl"
}]];
var ChevronLeft = [["path", {
  d: "m15 18-6-6 6-6",
  key: "1wnfg3"
}]];
var ChevronRight = [["path", {
  d: "m9 18 6-6-6-6",
  key: "mthhwq"
}]];
var CircleAlert = [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}], ["line", {
  x1: "12",
  x2: "12",
  y1: "8",
  y2: "12",
  key: "1pkeuh"
}], ["line", {
  x1: "12",
  x2: "12.01",
  y1: "16",
  y2: "16",
  key: "4dfq90"
}]];
var CircleCheckBig = [["path", {
  d: "M21.801 10A10 10 0 1 1 17 3.335",
  key: "yps3ct"
}], ["path", {
  d: "m9 11 3 3L22 4",
  key: "1pflzl"
}]];
var CircleCheck = [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}], ["path", {
  d: "m9 12 2 2 4-4",
  key: "dzmm74"
}]];
var CirclePlus = [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}], ["path", {
  d: "M8 12h8",
  key: "1wcyev"
}], ["path", {
  d: "M12 8v8",
  key: "napkw2"
}]];
var CircleQuestionMark = [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}], ["path", {
  d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
  key: "1u773s"
}], ["path", {
  d: "M12 17h.01",
  key: "p32p05"
}]];
var ClipboardList = [["rect", {
  width: "8",
  height: "4",
  x: "8",
  y: "2",
  rx: "1",
  ry: "1",
  key: "tgr4d6"
}], ["path", {
  d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
  key: "116196"
}], ["path", {
  d: "M12 11h4",
  key: "1jrz19"
}], ["path", {
  d: "M12 16h4",
  key: "n85exb"
}], ["path", {
  d: "M8 11h.01",
  key: "1dfujw"
}], ["path", {
  d: "M8 16h.01",
  key: "18s6g9"
}]];
var Clock = [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}], ["path", {
  d: "M12 6v6l4 2",
  key: "mmk7yg"
}]];
var Cloud = [["path", {
  d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",
  key: "p7xjir"
}]];
var Database = [["ellipse", {
  cx: "12",
  cy: "5",
  rx: "9",
  ry: "3",
  key: "msslwz"
}], ["path", {
  d: "M3 5V19A9 3 0 0 0 21 19V5",
  key: "1wlel7"
}], ["path", {
  d: "M3 12A9 3 0 0 0 21 12",
  key: "mv7ke4"
}]];
var Download = [["path", {
  d: "M12 15V3",
  key: "m9g1x1"
}], ["path", {
  d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
  key: "ih7n3h"
}], ["path", {
  d: "m7 10 5 5 5-5",
  key: "brsn70"
}]];
var Droplet = [["path", {
  d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z",
  key: "c7niix"
}]];
var Dumbbell = [["path", {
  d: "M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z",
  key: "9m4mmf"
}], ["path", {
  d: "m2.5 21.5 1.4-1.4",
  key: "17g3f0"
}], ["path", {
  d: "m20.1 3.9 1.4-1.4",
  key: "1qn309"
}], ["path", {
  d: "M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z",
  key: "1t2c92"
}], ["path", {
  d: "m9.6 14.4 4.8-4.8",
  key: "6umqxw"
}]];
var EyeOff = [["path", {
  d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
  key: "ct8e1f"
}], ["path", {
  d: "M14.084 14.158a3 3 0 0 1-4.242-4.242",
  key: "151rxh"
}], ["path", {
  d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
  key: "13bj9a"
}], ["path", {
  d: "m2 2 20 20",
  key: "1ooewy"
}]];
var Eye = [["path", {
  d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
  key: "1nclc0"
}], ["circle", {
  cx: "12",
  cy: "12",
  r: "3",
  key: "1v7zrd"
}]];
var FileCheck = [["path", {
  d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
  key: "1oefj6"
}], ["path", {
  d: "M14 2v5a1 1 0 0 0 1 1h5",
  key: "wfsgrz"
}], ["path", {
  d: "m9 15 2 2 4-4",
  key: "1grp1n"
}]];
var FilePlus = [["path", {
  d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
  key: "1oefj6"
}], ["path", {
  d: "M14 2v5a1 1 0 0 0 1 1h5",
  key: "wfsgrz"
}], ["path", {
  d: "M9 15h6",
  key: "cctwl0"
}], ["path", {
  d: "M12 18v-6",
  key: "17g6i2"
}]];
var FileText = [["path", {
  d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
  key: "1oefj6"
}], ["path", {
  d: "M14 2v5a1 1 0 0 0 1 1h5",
  key: "wfsgrz"
}], ["path", {
  d: "M10 9H8",
  key: "b1mrlr"
}], ["path", {
  d: "M16 13H8",
  key: "t4e002"
}], ["path", {
  d: "M16 17H8",
  key: "z1uh3a"
}]];
var FlaskConical = [["path", {
  d: "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",
  key: "18mbvz"
}], ["path", {
  d: "M6.453 15h11.094",
  key: "3shlmq"
}], ["path", {
  d: "M8.5 2h7",
  key: "csnxdl"
}]];
var FolderOpen = [["path", {
  d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
  key: "usdka0"
}]];
var Globe = [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}], ["path", {
  d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
  key: "13o1zl"
}], ["path", {
  d: "M2 12h20",
  key: "9i4pu4"
}]];
var Hand = [["path", {
  d: "M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2",
  key: "1fvzgz"
}], ["path", {
  d: "M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2",
  key: "1kc0my"
}], ["path", {
  d: "M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8",
  key: "10h0bg"
}], ["path", {
  d: "M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",
  key: "1s1gnw"
}]];
var HeartPulse = [["path", {
  d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
  key: "mvr1a0"
}], ["path", {
  d: "M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27",
  key: "auskq0"
}]];
var Heart = [["path", {
  d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
  key: "mvr1a0"
}]];
var History = [["path", {
  d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
  key: "1357e3"
}], ["path", {
  d: "M3 3v5h5",
  key: "1xhq8a"
}], ["path", {
  d: "M12 7v5l4 2",
  key: "1fdv2h"
}]];
var Hourglass = [["path", {
  d: "M5 22h14",
  key: "ehvnwv"
}], ["path", {
  d: "M5 2h14",
  key: "pdyrp9"
}], ["path", {
  d: "M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22",
  key: "1d314k"
}], ["path", {
  d: "M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2",
  key: "1vvvr6"
}]];
var House = [["path", {
  d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",
  key: "5wwlr5"
}], ["path", {
  d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  key: "r6nss1"
}]];
var Inbox = [["polyline", {
  points: "22 12 16 12 14 15 10 15 8 12 2 12",
  key: "o97t9d"
}], ["path", {
  d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
  key: "oot6mr"
}]];
var Info = [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}], ["path", {
  d: "M12 16v-4",
  key: "1dtifu"
}], ["path", {
  d: "M12 8h.01",
  key: "e9boi3"
}]];
var Key = [["path", {
  d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",
  key: "g0fldk"
}], ["path", {
  d: "m21 2-9.6 9.6",
  key: "1j0ho8"
}], ["circle", {
  cx: "7.5",
  cy: "15.5",
  r: "5.5",
  key: "yqb3hr"
}]];
var LayoutList = [["rect", {
  width: "7",
  height: "7",
  x: "3",
  y: "3",
  rx: "1",
  key: "1g98yp"
}], ["rect", {
  width: "7",
  height: "7",
  x: "3",
  y: "14",
  rx: "1",
  key: "1bb6yr"
}], ["path", {
  d: "M14 4h7",
  key: "3xa0d5"
}], ["path", {
  d: "M14 9h7",
  key: "1icrd9"
}], ["path", {
  d: "M14 15h7",
  key: "1mj8o2"
}], ["path", {
  d: "M14 20h7",
  key: "11slyb"
}]];
var Loader = [["path", {
  d: "M12 2v4",
  key: "3427ic"
}], ["path", {
  d: "m16.2 7.8 2.9-2.9",
  key: "r700ao"
}], ["path", {
  d: "M18 12h4",
  key: "wj9ykh"
}], ["path", {
  d: "m16.2 16.2 2.9 2.9",
  key: "1bxg5t"
}], ["path", {
  d: "M12 18v4",
  key: "jadmvz"
}], ["path", {
  d: "m4.9 19.1 2.9-2.9",
  key: "bwix9q"
}], ["path", {
  d: "M2 12h4",
  key: "j09sii"
}], ["path", {
  d: "m4.9 4.9 2.9 2.9",
  key: "giyufr"
}]];
var Lock = [["rect", {
  width: "18",
  height: "11",
  x: "3",
  y: "11",
  rx: "2",
  ry: "2",
  key: "1w4ew1"
}], ["path", {
  d: "M7 11V7a5 5 0 0 1 10 0v4",
  key: "fwvmzm"
}]];
var LogIn = [["path", {
  d: "m10 17 5-5-5-5",
  key: "1bsop3"
}], ["path", {
  d: "M15 12H3",
  key: "6jk70r"
}], ["path", {
  d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",
  key: "u53s6r"
}]];
var LogOut = [["path", {
  d: "m16 17 5-5-5-5",
  key: "1bji2h"
}], ["path", {
  d: "M21 12H9",
  key: "dn1m92"
}], ["path", {
  d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
  key: "1uf3rs"
}]];
var Menu = [["path", {
  d: "M4 5h16",
  key: "1tepv9"
}], ["path", {
  d: "M4 12h16",
  key: "1lakjw"
}], ["path", {
  d: "M4 19h16",
  key: "1djgab"
}]];
var Palette = [["path", {
  d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
  key: "e79jfc"
}], ["circle", {
  cx: "13.5",
  cy: "6.5",
  r: ".5",
  fill: "currentColor",
  key: "1okk4w"
}], ["circle", {
  cx: "17.5",
  cy: "10.5",
  r: ".5",
  fill: "currentColor",
  key: "f64h9f"
}], ["circle", {
  cx: "6.5",
  cy: "12.5",
  r: ".5",
  fill: "currentColor",
  key: "qy21gx"
}], ["circle", {
  cx: "8.5",
  cy: "7.5",
  r: ".5",
  fill: "currentColor",
  key: "fotxhn"
}]];
var PartyPopper = [["path", {
  d: "M5.8 11.3 2 22l10.7-3.79",
  key: "gwxi1d"
}], ["path", {
  d: "M4 3h.01",
  key: "1vcuye"
}], ["path", {
  d: "M22 8h.01",
  key: "1mrtc2"
}], ["path", {
  d: "M15 2h.01",
  key: "1cjtqr"
}], ["path", {
  d: "M22 20h.01",
  key: "1mrys2"
}], ["path", {
  d: "m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10",
  key: "hbicv8"
}], ["path", {
  d: "m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17",
  key: "1i94pl"
}], ["path", {
  d: "m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7",
  key: "1cofks"
}], ["path", {
  d: "M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z",
  key: "4kbmks"
}]];
var Pencil = [["path", {
  d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
  key: "1a8usu"
}], ["path", {
  d: "m15 5 4 4",
  key: "1mk7zo"
}]];
var Pill = [["path", {
  d: "m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z",
  key: "wa1lgi"
}], ["path", {
  d: "m8.5 8.5 7 7",
  key: "rvfmvr"
}]];
var Plus = [["path", {
  d: "M5 12h14",
  key: "1ays0h"
}], ["path", {
  d: "M12 5v14",
  key: "s699le"
}]];
var RefreshCw = [["path", {
  d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
  key: "v9h5vc"
}], ["path", {
  d: "M21 3v5h-5",
  key: "1q7to0"
}], ["path", {
  d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
  key: "3uifl3"
}], ["path", {
  d: "M8 16H3v5",
  key: "1cv678"
}]];
var Ruler = [["path", {
  d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",
  key: "icamh8"
}], ["path", {
  d: "m14.5 12.5 2-2",
  key: "inckbg"
}], ["path", {
  d: "m11.5 9.5 2-2",
  key: "fmmyf7"
}], ["path", {
  d: "m8.5 6.5 2-2",
  key: "vc6u1g"
}], ["path", {
  d: "m17.5 15.5 2-2",
  key: "wo5hmg"
}]];
var Save = [["path", {
  d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
  key: "1c8476"
}], ["path", {
  d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",
  key: "1ydtos"
}], ["path", {
  d: "M7 3v4a1 1 0 0 0 1 1h7",
  key: "t51u73"
}]];
var Scale = [["path", {
  d: "M12 3v18",
  key: "108xh3"
}], ["path", {
  d: "m19 8 3 8a5 5 0 0 1-6 0zV7",
  key: "zcdpyk"
}], ["path", {
  d: "M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1",
  key: "1yorad"
}], ["path", {
  d: "m5 8 3 8a5 5 0 0 1-6 0zV7",
  key: "eua70x"
}], ["path", {
  d: "M7 21h10",
  key: "1b0cd5"
}]];
var Settings = [["path", {
  d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
  key: "1i5ecw"
}], ["circle", {
  cx: "12",
  cy: "12",
  r: "3",
  key: "1v7zrd"
}]];
var Shield = [["path", {
  d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
  key: "oel41y"
}]];
var Stethoscope = [["path", {
  d: "M11 2v2",
  key: "1539x4"
}], ["path", {
  d: "M5 2v2",
  key: "1yf1q8"
}], ["path", {
  d: "M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1",
  key: "rb5t3r"
}], ["path", {
  d: "M8 15a6 6 0 0 0 12 0v-3",
  key: "x18d4x"
}], ["circle", {
  cx: "20",
  cy: "10",
  r: "2",
  key: "ts1r5v"
}]];
var Syringe = [["path", {
  d: "m18 2 4 4",
  key: "22kx64"
}], ["path", {
  d: "m17 7 3-3",
  key: "1w1zoj"
}], ["path", {
  d: "M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5",
  key: "1exhtz"
}], ["path", {
  d: "m9 11 4 4",
  key: "rovt3i"
}], ["path", {
  d: "m5 19-3 3",
  key: "59f2uf"
}], ["path", {
  d: "m14 4 6 6",
  key: "yqp9t2"
}]];
var Target = [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}], ["circle", {
  cx: "12",
  cy: "12",
  r: "6",
  key: "1vlfrh"
}], ["circle", {
  cx: "12",
  cy: "12",
  r: "2",
  key: "1c9p78"
}]];
var ThermometerSun = [["path", {
  d: "M12 2v2",
  key: "tus03m"
}], ["path", {
  d: "M12 8a4 4 0 0 0-1.645 7.647",
  key: "wz5p04"
}], ["path", {
  d: "M2 12h2",
  key: "1t8f8n"
}], ["path", {
  d: "M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z",
  key: "yu0u2z"
}], ["path", {
  d: "m4.93 4.93 1.41 1.41",
  key: "149t6j"
}], ["path", {
  d: "m6.34 17.66-1.41 1.41",
  key: "1m8zz5"
}]];
var Thermometer = [["path", {
  d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z",
  key: "17jzev"
}]];
var Trash2 = [["path", {
  d: "M10 11v6",
  key: "nco0om"
}], ["path", {
  d: "M14 11v6",
  key: "outv1u"
}], ["path", {
  d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
  key: "miytrc"
}], ["path", {
  d: "M3 6h18",
  key: "d0wm0j"
}], ["path", {
  d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
  key: "e791ji"
}]];
var Trash = [["path", {
  d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
  key: "miytrc"
}], ["path", {
  d: "M3 6h18",
  key: "d0wm0j"
}], ["path", {
  d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
  key: "e791ji"
}]];
var TriangleAlert = [["path", {
  d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
  key: "wmoenq"
}], ["path", {
  d: "M12 9v4",
  key: "juzpu7"
}], ["path", {
  d: "M12 17h.01",
  key: "p32p05"
}]];
var TrendingUp = [["path", {
  d: "M16 7h6v6",
  key: "box55l"
}], ["path", {
  d: "m22 7-8.5 8.5-5-5L2 17",
  key: "1t1m79"
}]];
var UserPlus = [["path", {
  d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
  key: "1yyitq"
}], ["circle", {
  cx: "9",
  cy: "7",
  r: "4",
  key: "nufk8"
}], ["line", {
  x1: "19",
  x2: "19",
  y1: "8",
  y2: "14",
  key: "1bvyxn"
}], ["line", {
  x1: "22",
  x2: "16",
  y1: "11",
  y2: "11",
  key: "1shjgl"
}]];
var User = [["path", {
  d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
  key: "975kel"
}], ["circle", {
  cx: "12",
  cy: "7",
  r: "4",
  key: "17ys0d"
}]];
var Users = [["path", {
  d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
  key: "1yyitq"
}], ["path", {
  d: "M16 3.128a4 4 0 0 1 0 7.744",
  key: "16gr8j"
}], ["path", {
  d: "M22 21v-2a4 4 0 0 0-3-3.87",
  key: "kshegd"
}], ["circle", {
  cx: "9",
  cy: "7",
  r: "4",
  key: "nufk8"
}]];
var Waves = [["path", {
  d: "M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
  key: "knzxuh"
}], ["path", {
  d: "M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
  key: "2jd2cc"
}], ["path", {
  d: "M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
  key: "rd2r6e"
}]];
var WifiOff = [["path", {
  d: "M12 20h.01",
  key: "zekei9"
}], ["path", {
  d: "M8.5 16.429a5 5 0 0 1 7 0",
  key: "1bycff"
}], ["path", {
  d: "M5 12.859a10 10 0 0 1 5.17-2.69",
  key: "1dl1wf"
}], ["path", {
  d: "M19 12.859a10 10 0 0 0-2.007-1.523",
  key: "4k23kn"
}], ["path", {
  d: "M2 8.82a15 15 0 0 1 4.177-2.643",
  key: "1grhjp"
}], ["path", {
  d: "M22 8.82a15 15 0 0 0-11.288-3.764",
  key: "z3jwby"
}], ["path", {
  d: "m2 2 20 20",
  key: "1ooewy"
}]];
var X = [["path", {
  d: "M18 6 6 18",
  key: "1bl5f8"
}], ["path", {
  d: "m6 6 12 12",
  key: "d8bk6v"
}]];
var Zap = [["path", {
  d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
  key: "1xq2db"
}]];
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
var LUCIDE_ICONS = new InjectionToken("LucideIcons", {
  factory: () => new LucideIconProvider({})
});
var LucideIconProvider = class {
  constructor(icons) {
    this.icons = icons;
  }
  getIcon(name) {
    return this.hasIcon(name) ? this.icons[name] : null;
  }
  hasIcon(name) {
    return typeof this.icons === "object" && name in this.icons;
  }
};
var LucideIconConfig = class {
  constructor() {
    this.color = defaultAttributes.stroke;
    this.size = defaultAttributes.width;
    this.strokeWidth = defaultAttributes["stroke-width"];
    this.absoluteStrokeWidth = false;
  }
};
LucideIconConfig.\u0275fac = function LucideIconConfig_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || LucideIconConfig)();
};
LucideIconConfig.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
  token: LucideIconConfig,
  factory: LucideIconConfig.\u0275fac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LucideIconConfig, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};
function formatFixed(number, decimals = 3) {
  return parseFloat(number.toFixed(decimals)).toString(10);
}
var LucideAngularComponent = class {
  constructor(elem, renderer, changeDetector, iconProviders, iconConfig) {
    this.elem = elem;
    this.renderer = renderer;
    this.changeDetector = changeDetector;
    this.iconProviders = iconProviders;
    this.iconConfig = iconConfig;
    this.absoluteStrokeWidth = false;
    this.defaultSize = defaultAttributes.height;
  }
  get size() {
    return this._size ?? this.iconConfig.size;
  }
  set size(value) {
    if (value) {
      this._size = this.parseNumber(value);
    } else {
      delete this._size;
    }
  }
  get strokeWidth() {
    return this._strokeWidth ?? this.iconConfig.strokeWidth;
  }
  set strokeWidth(value) {
    if (value) {
      this._strokeWidth = this.parseNumber(value);
    } else {
      delete this._strokeWidth;
    }
  }
  ngOnChanges(changes) {
    if (changes.name || changes.img || changes.color || changes.size || changes.absoluteStrokeWidth || changes.strokeWidth || changes.class) {
      this.color = this.color ?? this.iconConfig.color;
      this.size = this.parseNumber(this.size ?? this.iconConfig.size);
      this.strokeWidth = this.parseNumber(this.strokeWidth ?? this.iconConfig.strokeWidth);
      this.absoluteStrokeWidth = this.absoluteStrokeWidth ?? this.iconConfig.absoluteStrokeWidth;
      const nameOrIcon = this.img ?? this.name;
      const restAttributes = this.getRestAttributes();
      if (!hasA11yProp(restAttributes)) {
        this.renderer.setAttribute(this.elem.nativeElement, "aria-hidden", "true");
      }
      if (typeof nameOrIcon === "string") {
        const icoOfName = this.getIcon(this.toPascalCase(nameOrIcon));
        if (icoOfName) {
          this.replaceElement(icoOfName);
        } else {
          throw new Error(`The "${nameOrIcon}" icon has not been provided by any available icon providers.`);
        }
      } else if (Array.isArray(nameOrIcon)) {
        this.replaceElement(nameOrIcon);
      } else {
        throw new Error(`No icon name or image has been provided.`);
      }
    }
    this.changeDetector.markForCheck();
  }
  replaceElement(img) {
    const childElements = this.elem.nativeElement.childNodes;
    const attributes = __spreadProps(__spreadValues({}, defaultAttributes), {
      width: this.size,
      height: this.size,
      stroke: this.color ?? this.iconConfig.color,
      "stroke-width": this.absoluteStrokeWidth ? formatFixed(this.strokeWidth / (this.size / this.defaultSize)) : this.strokeWidth.toString(10)
    });
    const icoElement = this.createElement(["svg", attributes, img]);
    icoElement.classList.add("lucide");
    if (typeof this.name === "string") {
      icoElement.classList.add(`lucide-${this.name.replace("_", "-")}`);
    }
    if (this.class) {
      icoElement.classList.add(...this.class.split(/ /).map((a) => a.trim()).filter((a) => a.length > 0));
    }
    for (const child of childElements) {
      this.renderer.removeChild(this.elem.nativeElement, child);
    }
    this.renderer.appendChild(this.elem.nativeElement, icoElement);
  }
  getRestAttributes() {
    const restAttributeMap = this.elem.nativeElement.attributes;
    const restAttributes = Object.fromEntries(Array.from(restAttributeMap).map((item) => [item.name, item.value]));
    return restAttributes;
  }
  toPascalCase(str) {
    return str.replace(/(\w)([a-z0-9]*)(_|-|\s*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase());
  }
  parseNumber(value) {
    if (typeof value === "string") {
      const parsedValue = parseInt(value, 10);
      if (isNaN(parsedValue)) {
        throw new Error(`${value} is not numeric.`);
      }
      return parsedValue;
    }
    return value;
  }
  getIcon(name) {
    for (const iconProvider of Array.isArray(this.iconProviders) ? this.iconProviders : [this.iconProviders]) {
      if (iconProvider.hasIcon(name)) {
        return iconProvider.getIcon(name);
      }
    }
    return null;
  }
  createElement([tag, attrs, children = []]) {
    const element = this.renderer.createElement(tag, "http://www.w3.org/2000/svg");
    Object.keys(attrs).forEach((name) => {
      const attrValue = typeof attrs[name] === "string" ? attrs[name] : attrs[name].toString(10);
      this.renderer.setAttribute(element, name, attrValue);
    });
    if (children.length) {
      children.forEach((child) => {
        const childElement = this.createElement(child);
        this.renderer.appendChild(element, childElement);
      });
    }
    return element;
  }
};
LucideAngularComponent.\u0275fac = function LucideAngularComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || LucideAngularComponent)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(LUCIDE_ICONS), \u0275\u0275directiveInject(LucideIconConfig));
};
LucideAngularComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: LucideAngularComponent,
  selectors: [["lucide-angular"], ["lucide-icon"], ["i-lucide"], ["span-lucide"]],
  inputs: {
    class: "class",
    name: "name",
    img: "img",
    color: "color",
    absoluteStrokeWidth: "absoluteStrokeWidth",
    size: "size",
    strokeWidth: "strokeWidth"
  },
  standalone: false,
  features: [\u0275\u0275NgOnChangesFeature],
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function LucideAngularComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275projection(0);
    }
  },
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LucideAngularComponent, [{
    type: Component,
    args: [{
      selector: "lucide-angular, lucide-icon, i-lucide, span-lucide",
      template: "<ng-content></ng-content>"
    }]
  }], function() {
    return [{
      type: ElementRef,
      decorators: [{
        type: Inject,
        args: [ElementRef]
      }]
    }, {
      type: Renderer2,
      decorators: [{
        type: Inject,
        args: [Renderer2]
      }]
    }, {
      type: ChangeDetectorRef,
      decorators: [{
        type: Inject,
        args: [ChangeDetectorRef]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [LUCIDE_ICONS]
      }]
    }, {
      type: LucideIconConfig,
      decorators: [{
        type: Inject,
        args: [LucideIconConfig]
      }]
    }];
  }, {
    class: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    img: [{
      type: Input
    }],
    color: [{
      type: Input
    }],
    absoluteStrokeWidth: [{
      type: Input
    }],
    size: [{
      type: Input
    }],
    strokeWidth: [{
      type: Input
    }]
  });
})();
var Icons = class {
  constructor(icons) {
    this.icons = icons;
  }
};
var legacyIconProviderFactory = (icons) => {
  return new LucideIconProvider(icons ?? {});
};
var LucideAngularModule = class _LucideAngularModule {
  static pick(icons) {
    return {
      ngModule: _LucideAngularModule,
      providers: [{
        provide: LUCIDE_ICONS,
        multi: true,
        useValue: new LucideIconProvider(icons)
      }, {
        provide: LUCIDE_ICONS,
        multi: true,
        useFactory: legacyIconProviderFactory,
        deps: [[new Optional(), Icons]]
      }]
    };
  }
};
LucideAngularModule.\u0275fac = function LucideAngularModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || LucideAngularModule)();
};
LucideAngularModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: LucideAngularModule,
  declarations: [LucideAngularComponent],
  exports: [LucideAngularComponent]
});
LucideAngularModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [[]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LucideAngularModule, [{
    type: NgModule,
    args: [{
      declarations: [LucideAngularComponent],
      imports: [],
      exports: [LucideAngularComponent]
    }]
  }], null, null);
})();

// node_modules/@angular/forms/fesm2022/forms.mjs
/**
 * @license Angular v21.2.9
 * (c) 2010-2026 Google LLC. https://angular.dev/
 * License: MIT
 */
var BaseControlValueAccessor = class _BaseControlValueAccessor {
  _renderer;
  _elementRef;
  onChange = (_) => {
  };
  onTouched = () => {
  };
  constructor(_renderer, _elementRef) {
    this._renderer = _renderer;
    this._elementRef = _elementRef;
  }
  setProperty(key, value) {
    this._renderer.setProperty(this._elementRef.nativeElement, key, value);
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  setDisabledState(isDisabled) {
    this.setProperty("disabled", isDisabled);
  }
  static \u0275fac = function BaseControlValueAccessor_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BaseControlValueAccessor)(\u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(ElementRef));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _BaseControlValueAccessor
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseControlValueAccessor, [{
    type: Directive
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }], null);
})();
var BuiltInControlValueAccessor = class _BuiltInControlValueAccessor extends BaseControlValueAccessor {
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275BuiltInControlValueAccessor_BaseFactory;
    return function BuiltInControlValueAccessor_Factory(__ngFactoryType__) {
      return (\u0275BuiltInControlValueAccessor_BaseFactory || (\u0275BuiltInControlValueAccessor_BaseFactory = \u0275\u0275getInheritedFactory(_BuiltInControlValueAccessor)))(__ngFactoryType__ || _BuiltInControlValueAccessor);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _BuiltInControlValueAccessor,
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BuiltInControlValueAccessor, [{
    type: Directive
  }], null, null);
})();
var NG_VALUE_ACCESSOR = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "NgValueAccessor" : "");
var CHECKBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxControlValueAccessor),
  multi: true
};
var CheckboxControlValueAccessor = class _CheckboxControlValueAccessor extends BuiltInControlValueAccessor {
  writeValue(value) {
    this.setProperty("checked", value);
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275CheckboxControlValueAccessor_BaseFactory;
    return function CheckboxControlValueAccessor_Factory(__ngFactoryType__) {
      return (\u0275CheckboxControlValueAccessor_BaseFactory || (\u0275CheckboxControlValueAccessor_BaseFactory = \u0275\u0275getInheritedFactory(_CheckboxControlValueAccessor)))(__ngFactoryType__ || _CheckboxControlValueAccessor);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CheckboxControlValueAccessor,
    selectors: [["input", "type", "checkbox", "formControlName", ""], ["input", "type", "checkbox", "formControl", ""], ["input", "type", "checkbox", "ngModel", ""]],
    hostBindings: function CheckboxControlValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("change", function CheckboxControlValueAccessor_change_HostBindingHandler($event) {
          return ctx.onChange($event.target.checked);
        })("blur", function CheckboxControlValueAccessor_blur_HostBindingHandler() {
          return ctx.onTouched();
        });
      }
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([CHECKBOX_VALUE_ACCESSOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckboxControlValueAccessor, [{
    type: Directive,
    args: [{
      selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]",
      host: {
        "(change)": "onChange($any($event.target).checked)",
        "(blur)": "onTouched()"
      },
      providers: [CHECKBOX_VALUE_ACCESSOR],
      standalone: false
    }]
  }], null, null);
})();
var DEFAULT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DefaultValueAccessor),
  multi: true
};
function _isAndroid() {
  const userAgent = getDOM() ? getDOM().getUserAgent() : "";
  return /android (\d+)/.test(userAgent.toLowerCase());
}
var COMPOSITION_BUFFER_MODE = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "CompositionEventMode" : "");
var DefaultValueAccessor = class _DefaultValueAccessor extends BaseControlValueAccessor {
  _compositionMode;
  _composing = false;
  constructor(renderer, elementRef, _compositionMode) {
    super(renderer, elementRef);
    this._compositionMode = _compositionMode;
    if (this._compositionMode == null) {
      this._compositionMode = !_isAndroid();
    }
  }
  writeValue(value) {
    const normalizedValue = value == null ? "" : value;
    this.setProperty("value", normalizedValue);
  }
  _handleInput(value) {
    if (!this._compositionMode || this._compositionMode && !this._composing) {
      this.onChange(value);
    }
  }
  _compositionStart() {
    this._composing = true;
  }
  _compositionEnd(value) {
    this._composing = false;
    this._compositionMode && this.onChange(value);
  }
  static \u0275fac = function DefaultValueAccessor_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DefaultValueAccessor)(\u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(COMPOSITION_BUFFER_MODE, 8));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _DefaultValueAccessor,
    selectors: [["input", "formControlName", "", 3, "type", "checkbox"], ["textarea", "formControlName", ""], ["input", "formControl", "", 3, "type", "checkbox"], ["textarea", "formControl", ""], ["input", "ngModel", "", 3, "type", "checkbox"], ["textarea", "ngModel", ""], ["", "ngDefaultControl", ""]],
    hostBindings: function DefaultValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("input", function DefaultValueAccessor_input_HostBindingHandler($event) {
          return ctx._handleInput($event.target.value);
        })("blur", function DefaultValueAccessor_blur_HostBindingHandler() {
          return ctx.onTouched();
        })("compositionstart", function DefaultValueAccessor_compositionstart_HostBindingHandler() {
          return ctx._compositionStart();
        })("compositionend", function DefaultValueAccessor_compositionend_HostBindingHandler($event) {
          return ctx._compositionEnd($event.target.value);
        });
      }
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([DEFAULT_VALUE_ACCESSOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultValueAccessor, [{
    type: Directive,
    args: [{
      selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]",
      host: {
        "(input)": "_handleInput($any($event.target).value)",
        "(blur)": "onTouched()",
        "(compositionstart)": "_compositionStart()",
        "(compositionend)": "_compositionEnd($any($event.target).value)"
      },
      providers: [DEFAULT_VALUE_ACCESSOR],
      standalone: false
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [COMPOSITION_BUFFER_MODE]
    }]
  }], null);
})();
function isEmptyInputValue(value) {
  return value == null || lengthOrSize(value) === 0;
}
function lengthOrSize(value) {
  if (value == null) {
    return null;
  } else if (Array.isArray(value) || typeof value === "string") {
    return value.length;
  } else if (value instanceof Set) {
    return value.size;
  }
  return null;
}
var NG_VALIDATORS = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "NgValidators" : "");
var NG_ASYNC_VALIDATORS = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "NgAsyncValidators" : "");
var EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
function minValidator(min) {
  return (control) => {
    if (control.value == null || min == null) {
      return null;
    }
    const value = parseFloat(control.value);
    return !isNaN(value) && value < min ? {
      "min": {
        "min": min,
        "actual": control.value
      }
    } : null;
  };
}
function maxValidator(max) {
  return (control) => {
    if (control.value == null || max == null) {
      return null;
    }
    const value = parseFloat(control.value);
    return !isNaN(value) && value > max ? {
      "max": {
        "max": max,
        "actual": control.value
      }
    } : null;
  };
}
function requiredValidator(control) {
  return isEmptyInputValue(control.value) ? {
    "required": true
  } : null;
}
function requiredTrueValidator(control) {
  return control.value === true ? null : {
    "required": true
  };
}
function emailValidator(control) {
  if (isEmptyInputValue(control.value)) {
    return null;
  }
  return EMAIL_REGEXP.test(control.value) ? null : {
    "email": true
  };
}
function minLengthValidator(minLength) {
  return (control) => {
    const length = control.value?.length ?? lengthOrSize(control.value);
    if (length === null || length === 0) {
      return null;
    }
    return length < minLength ? {
      "minlength": {
        "requiredLength": minLength,
        "actualLength": length
      }
    } : null;
  };
}
function maxLengthValidator(maxLength) {
  return (control) => {
    const length = control.value?.length ?? lengthOrSize(control.value);
    if (length !== null && length > maxLength) {
      return {
        "maxlength": {
          "requiredLength": maxLength,
          "actualLength": length
        }
      };
    }
    return null;
  };
}
function patternValidator(pattern) {
  if (!pattern) return nullValidator;
  let regex;
  let regexStr;
  if (typeof pattern === "string") {
    regexStr = "";
    if (pattern.charAt(0) !== "^") regexStr += "^";
    regexStr += pattern;
    if (pattern.charAt(pattern.length - 1) !== "$") regexStr += "$";
    regex = new RegExp(regexStr);
  } else {
    regexStr = pattern.toString();
    regex = pattern;
  }
  return (control) => {
    if (isEmptyInputValue(control.value)) {
      return null;
    }
    const value = control.value;
    return regex.test(value) ? null : {
      "pattern": {
        "requiredPattern": regexStr,
        "actualValue": value
      }
    };
  };
}
function nullValidator(control) {
  return null;
}
function isPresent(o) {
  return o != null;
}
function toObservable(value) {
  const obs = isPromise(value) ? from(value) : value;
  if ((typeof ngDevMode === "undefined" || ngDevMode) && !isSubscribable(obs)) {
    let errorMessage = `Expected async validator to return Promise or Observable.`;
    if (typeof value === "object") {
      errorMessage += " Are you using a synchronous validator where an async validator is expected?";
    }
    throw new RuntimeError(-1101, errorMessage);
  }
  return obs;
}
function mergeErrors(arrayOfErrors) {
  let res = {};
  arrayOfErrors.forEach((errors) => {
    res = errors != null ? __spreadValues(__spreadValues({}, res), errors) : res;
  });
  return Object.keys(res).length === 0 ? null : res;
}
function executeValidators(control, validators) {
  return validators.map((validator) => validator(control));
}
function isValidatorFn(validator) {
  return !validator.validate;
}
function normalizeValidators(validators) {
  return validators.map((validator) => {
    return isValidatorFn(validator) ? validator : (c) => validator.validate(c);
  });
}
function compose(validators) {
  if (!validators) return null;
  const presentValidators = validators.filter(isPresent);
  if (presentValidators.length == 0) return null;
  return function(control) {
    return mergeErrors(executeValidators(control, presentValidators));
  };
}
function composeValidators(validators) {
  return validators != null ? compose(normalizeValidators(validators)) : null;
}
function composeAsync(validators) {
  if (!validators) return null;
  const presentValidators = validators.filter(isPresent);
  if (presentValidators.length == 0) return null;
  return function(control) {
    const observables = executeValidators(control, presentValidators).map(toObservable);
    return forkJoin(observables).pipe(map(mergeErrors));
  };
}
function composeAsyncValidators(validators) {
  return validators != null ? composeAsync(normalizeValidators(validators)) : null;
}
function mergeValidators(controlValidators, dirValidator) {
  if (controlValidators === null) return [dirValidator];
  return Array.isArray(controlValidators) ? [...controlValidators, dirValidator] : [controlValidators, dirValidator];
}
function getControlValidators(control) {
  return control._rawValidators;
}
function getControlAsyncValidators(control) {
  return control._rawAsyncValidators;
}
function makeValidatorsArray(validators) {
  if (!validators) return [];
  return Array.isArray(validators) ? validators : [validators];
}
function hasValidator(validators, validator) {
  return Array.isArray(validators) ? validators.includes(validator) : validators === validator;
}
function addValidators(validators, currentValidators) {
  const current = makeValidatorsArray(currentValidators);
  const validatorsToAdd = makeValidatorsArray(validators);
  validatorsToAdd.forEach((v) => {
    if (!hasValidator(current, v)) {
      current.push(v);
    }
  });
  return current;
}
function removeValidators(validators, currentValidators) {
  return makeValidatorsArray(currentValidators).filter((v) => !hasValidator(validators, v));
}
var AbstractControlDirective = class {
  get value() {
    return this.control ? this.control.value : null;
  }
  get valid() {
    return this.control ? this.control.valid : null;
  }
  get invalid() {
    return this.control ? this.control.invalid : null;
  }
  get pending() {
    return this.control ? this.control.pending : null;
  }
  get disabled() {
    return this.control ? this.control.disabled : null;
  }
  get enabled() {
    return this.control ? this.control.enabled : null;
  }
  get errors() {
    return this.control ? this.control.errors : null;
  }
  get pristine() {
    return this.control ? this.control.pristine : null;
  }
  get dirty() {
    return this.control ? this.control.dirty : null;
  }
  get touched() {
    return this.control ? this.control.touched : null;
  }
  get status() {
    return this.control ? this.control.status : null;
  }
  get untouched() {
    return this.control ? this.control.untouched : null;
  }
  get statusChanges() {
    return this.control ? this.control.statusChanges : null;
  }
  get valueChanges() {
    return this.control ? this.control.valueChanges : null;
  }
  get path() {
    return null;
  }
  _composedValidatorFn;
  _composedAsyncValidatorFn;
  _rawValidators = [];
  _rawAsyncValidators = [];
  _setValidators(validators) {
    this._rawValidators = validators || [];
    this._composedValidatorFn = composeValidators(this._rawValidators);
  }
  _setAsyncValidators(validators) {
    this._rawAsyncValidators = validators || [];
    this._composedAsyncValidatorFn = composeAsyncValidators(this._rawAsyncValidators);
  }
  get validator() {
    return this._composedValidatorFn || null;
  }
  get asyncValidator() {
    return this._composedAsyncValidatorFn || null;
  }
  _onDestroyCallbacks = [];
  _registerOnDestroy(fn) {
    this._onDestroyCallbacks.push(fn);
  }
  _invokeOnDestroyCallbacks() {
    this._onDestroyCallbacks.forEach((fn) => fn());
    this._onDestroyCallbacks = [];
  }
  reset(value = void 0) {
    this.control?.reset(value);
  }
  hasError(errorCode, path) {
    return this.control ? this.control.hasError(errorCode, path) : false;
  }
  getError(errorCode, path) {
    return this.control ? this.control.getError(errorCode, path) : null;
  }
};
var ControlContainer = class extends AbstractControlDirective {
  name;
  get formDirective() {
    return null;
  }
  get path() {
    return null;
  }
};
var NgControl = class extends AbstractControlDirective {
  _parent = null;
  name = null;
  valueAccessor = null;
};
var AbstractControlStatus = class {
  _cd;
  constructor(cd) {
    this._cd = cd;
  }
  get isTouched() {
    this._cd?.control?._touched?.();
    return !!this._cd?.control?.touched;
  }
  get isUntouched() {
    return !!this._cd?.control?.untouched;
  }
  get isPristine() {
    this._cd?.control?._pristine?.();
    return !!this._cd?.control?.pristine;
  }
  get isDirty() {
    return !!this._cd?.control?.dirty;
  }
  get isValid() {
    this._cd?.control?._status?.();
    return !!this._cd?.control?.valid;
  }
  get isInvalid() {
    return !!this._cd?.control?.invalid;
  }
  get isPending() {
    return !!this._cd?.control?.pending;
  }
  get isSubmitted() {
    this._cd?._submitted?.();
    return !!this._cd?.submitted;
  }
};
var ngControlStatusHost = {
  "[class.ng-untouched]": "isUntouched",
  "[class.ng-touched]": "isTouched",
  "[class.ng-pristine]": "isPristine",
  "[class.ng-dirty]": "isDirty",
  "[class.ng-valid]": "isValid",
  "[class.ng-invalid]": "isInvalid",
  "[class.ng-pending]": "isPending"
};
var NgControlStatus = class _NgControlStatus extends AbstractControlStatus {
  constructor(cd) {
    super(cd);
  }
  static \u0275fac = function NgControlStatus_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgControlStatus)(\u0275\u0275directiveInject(NgControl, 2));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NgControlStatus,
    selectors: [["", "formControlName", ""], ["", "ngModel", ""], ["", "formControl", ""]],
    hostVars: 14,
    hostBindings: function NgControlStatus_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("ng-untouched", ctx.isUntouched)("ng-touched", ctx.isTouched)("ng-pristine", ctx.isPristine)("ng-dirty", ctx.isDirty)("ng-valid", ctx.isValid)("ng-invalid", ctx.isInvalid)("ng-pending", ctx.isPending);
      }
    },
    standalone: false,
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgControlStatus, [{
    type: Directive,
    args: [{
      selector: "[formControlName],[ngModel],[formControl]",
      host: ngControlStatusHost,
      standalone: false
    }]
  }], () => [{
    type: NgControl,
    decorators: [{
      type: Self
    }]
  }], null);
})();
var NgControlStatusGroup = class _NgControlStatusGroup extends AbstractControlStatus {
  constructor(cd) {
    super(cd);
  }
  static \u0275fac = function NgControlStatusGroup_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgControlStatusGroup)(\u0275\u0275directiveInject(ControlContainer, 10));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NgControlStatusGroup,
    selectors: [["", "formGroupName", ""], ["", "formArrayName", ""], ["", "ngModelGroup", ""], ["", "formGroup", ""], ["", "formArray", ""], ["form", 3, "ngNoForm", ""], ["", "ngForm", ""]],
    hostVars: 16,
    hostBindings: function NgControlStatusGroup_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("ng-untouched", ctx.isUntouched)("ng-touched", ctx.isTouched)("ng-pristine", ctx.isPristine)("ng-dirty", ctx.isDirty)("ng-valid", ctx.isValid)("ng-invalid", ctx.isInvalid)("ng-pending", ctx.isPending)("ng-submitted", ctx.isSubmitted);
      }
    },
    standalone: false,
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgControlStatusGroup, [{
    type: Directive,
    args: [{
      selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],[formArray],form:not([ngNoForm]),[ngForm]",
      host: __spreadProps(__spreadValues({}, ngControlStatusHost), {
        "[class.ng-submitted]": "isSubmitted"
      }),
      standalone: false
    }]
  }], () => [{
    type: ControlContainer,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }]
  }], null);
})();
var formControlNameExample = `
  <div [formGroup]="myGroup">
    <input formControlName="firstName">
  </div>

  In your class:

  this.myGroup = new FormGroup({
      firstName: new FormControl()
  });`;
var formGroupNameExample = `
  <div [formGroup]="myGroup">
      <div formGroupName="person">
        <input formControlName="firstName">
      </div>
  </div>

  In your class:

  this.myGroup = new FormGroup({
      person: new FormGroup({ firstName: new FormControl() })
  });`;
var formArrayNameExample = `
  <div [formGroup]="myGroup">
    <div formArrayName="cities">
      <div *ngFor="let city of cityArray.controls; index as i">
        <input [formControlName]="i">
      </div>
    </div>
  </div>

  In your class:

  this.cityArray = new FormArray([new FormControl('SF')]);
  this.myGroup = new FormGroup({
    cities: this.cityArray
  });`;
var ngModelGroupExample = `
  <form>
      <div ngModelGroup="person">
        <input [(ngModel)]="person.name" name="firstName">
      </div>
  </form>`;
var ngModelWithFormGroupExample = `
  <div [formGroup]="myGroup">
      <input formControlName="firstName">
      <input [(ngModel)]="showMoreControls" [ngModelOptions]="{standalone: true}">
  </div>
`;
var VERSION = /* @__PURE__ */ new Version("21.2.9");
function controlParentException(nameOrIndex) {
  return new RuntimeError(1050, `formControlName must be used with a parent formGroup or formArray directive. You'll want to add a formGroup/formArray
      directive and pass it an existing FormGroup/FormArray instance (you can create one in your class).

      ${describeFormControl(nameOrIndex)}

    Example:

    ${formControlNameExample}`);
}
function describeFormControl(nameOrIndex) {
  if (nameOrIndex == null || nameOrIndex === "") {
    return "";
  }
  const valueType = typeof nameOrIndex === "string" ? "name" : "index";
  return `Affected Form Control ${valueType}: "${nameOrIndex}"`;
}
function ngModelGroupException() {
  return new RuntimeError(1051, `formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents
      that also have a "form" prefix: formGroupName, formArrayName, or formGroup.

      Option 1:  Update the parent to be formGroupName (reactive form strategy)

      ${formGroupNameExample}

      Option 2: Use ngModel instead of formControlName (template-driven strategy)

      ${ngModelGroupExample}`);
}
function missingFormException() {
  return new RuntimeError(1052, `formGroup expects a FormGroup instance. Please pass one in.

      Example:

      ${formControlNameExample}`);
}
function groupParentException() {
  return new RuntimeError(1053, `formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup
    directive and pass it an existing FormGroup instance (you can create one in your class).

    Example:

    ${formGroupNameExample}`);
}
function arrayParentException() {
  return new RuntimeError(1054, `formArrayName must be used with a parent formGroup directive.  You'll want to add a formGroup
      directive and pass it an existing FormGroup instance (you can create one in your class).

      Example:

      ${formArrayNameExample}`);
}
var disabledAttrWarning = `
  It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true
  when you set up this control in your component class, the disabled attribute will actually be set in the DOM for
  you. We recommend using this approach to avoid 'changed after checked' errors.

  Example:
  // Specify the \`disabled\` property at control creation time:
  form = new FormGroup({
    first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),
    last: new FormControl('Drew', Validators.required)
  });

  // Controls can also be enabled/disabled after creation:
  form.get('first')?.enable();
  form.get('last')?.disable();
`;
var asyncValidatorsDroppedWithOptsWarning = `
  It looks like you're constructing using a FormControl with both an options argument and an
  async validators argument. Mixing these arguments will cause your async validators to be dropped.
  You should either put all your validators in the options object, or in separate validators
  arguments. For example:

  // Using validators arguments
  fc = new FormControl(42, Validators.required, myAsyncValidator);

  // Using AbstractControlOptions
  fc = new FormControl(42, {validators: Validators.required, asyncValidators: myAV});

  // Do NOT mix them: async validators will be dropped!
  fc = new FormControl(42, {validators: Validators.required}, /* Oops! */ myAsyncValidator);
`;
function ngModelWarning(directiveName) {
  const versionSubDomain = VERSION.major !== "0" ? `v${VERSION.major}.` : "";
  return `
  It looks like you're using ngModel on the same form field as ${directiveName}.
  Support for using the ngModel input property and ngModelChange event with
  reactive form directives has been deprecated in Angular v6 and will be removed
  in a future version of Angular.

  For more information on this, see our API docs here:
  https://${versionSubDomain}angular.dev/api/forms/${directiveName === "formControl" ? "FormControlDirective" : "FormControlName"}
  `;
}
function describeKey(isFormGroup, key) {
  return isFormGroup ? `with name: '${key}'` : `at index: ${key}`;
}
function noControlsError(isFormGroup) {
  return `
    There are no form controls registered with this ${isFormGroup ? "group" : "array"} yet. If you're using ngModel,
    you may want to check next tick (e.g. use setTimeout).
  `;
}
function missingControlError(isFormGroup, key) {
  return `Cannot find form control ${describeKey(isFormGroup, key)}`;
}
function missingControlValueError(isFormGroup, key) {
  return `Must supply a value for form control ${describeKey(isFormGroup, key)}`;
}
var VALID = "VALID";
var INVALID = "INVALID";
var PENDING = "PENDING";
var DISABLED = "DISABLED";
var ControlEvent = class {
};
var ValueChangeEvent = class extends ControlEvent {
  value;
  source;
  constructor(value, source) {
    super();
    this.value = value;
    this.source = source;
  }
};
var PristineChangeEvent = class extends ControlEvent {
  pristine;
  source;
  constructor(pristine, source) {
    super();
    this.pristine = pristine;
    this.source = source;
  }
};
var TouchedChangeEvent = class extends ControlEvent {
  touched;
  source;
  constructor(touched, source) {
    super();
    this.touched = touched;
    this.source = source;
  }
};
var StatusChangeEvent = class extends ControlEvent {
  status;
  source;
  constructor(status, source) {
    super();
    this.status = status;
    this.source = source;
  }
};
var FormSubmittedEvent = class extends ControlEvent {
  source;
  constructor(source) {
    super();
    this.source = source;
  }
};
var FormResetEvent = class extends ControlEvent {
  source;
  constructor(source) {
    super();
    this.source = source;
  }
};
function pickValidators(validatorOrOpts) {
  return (isOptionsObj(validatorOrOpts) ? validatorOrOpts.validators : validatorOrOpts) || null;
}
function coerceToValidator(validator) {
  return Array.isArray(validator) ? composeValidators(validator) : validator || null;
}
function pickAsyncValidators(asyncValidator, validatorOrOpts) {
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    if (isOptionsObj(validatorOrOpts) && asyncValidator) {
      console.warn(asyncValidatorsDroppedWithOptsWarning);
    }
  }
  return (isOptionsObj(validatorOrOpts) ? validatorOrOpts.asyncValidators : asyncValidator) || null;
}
function coerceToAsyncValidator(asyncValidator) {
  return Array.isArray(asyncValidator) ? composeAsyncValidators(asyncValidator) : asyncValidator || null;
}
function isOptionsObj(validatorOrOpts) {
  return validatorOrOpts != null && !Array.isArray(validatorOrOpts) && typeof validatorOrOpts === "object";
}
function assertControlPresent(parent, isGroup, key) {
  const controls = parent.controls;
  const collection = isGroup ? Object.keys(controls) : controls;
  if (!collection.length) {
    throw new RuntimeError(1e3, typeof ngDevMode === "undefined" || ngDevMode ? noControlsError(isGroup) : "");
  }
  if (!controls[key]) {
    throw new RuntimeError(1001, typeof ngDevMode === "undefined" || ngDevMode ? missingControlError(isGroup, key) : "");
  }
}
function assertAllValuesPresent(control, isGroup, value) {
  control._forEachChild((_, key) => {
    if (value[key] === void 0) {
      throw new RuntimeError(-1002, typeof ngDevMode === "undefined" || ngDevMode ? missingControlValueError(isGroup, key) : "");
    }
  });
}
var AbstractControl = class {
  _pendingDirty = false;
  _hasOwnPendingAsyncValidator = null;
  _pendingTouched = false;
  _onCollectionChange = () => {
  };
  _updateOn;
  _parent = null;
  _asyncValidationSubscription;
  _composedValidatorFn;
  _composedAsyncValidatorFn;
  _rawValidators;
  _rawAsyncValidators;
  value;
  constructor(validators, asyncValidators) {
    this._assignValidators(validators);
    this._assignAsyncValidators(asyncValidators);
  }
  get validator() {
    return this._composedValidatorFn;
  }
  set validator(validatorFn) {
    this._rawValidators = this._composedValidatorFn = validatorFn;
  }
  get asyncValidator() {
    return this._composedAsyncValidatorFn;
  }
  set asyncValidator(asyncValidatorFn) {
    this._rawAsyncValidators = this._composedAsyncValidatorFn = asyncValidatorFn;
  }
  get parent() {
    return this._parent;
  }
  get status() {
    return untracked(this.statusReactive);
  }
  set status(v) {
    untracked(() => this.statusReactive.set(v));
  }
  _status = computed(() => this.statusReactive(), ...ngDevMode ? [{
    debugName: "_status"
  }] : []);
  statusReactive = signal(void 0, ...ngDevMode ? [{
    debugName: "statusReactive"
  }] : []);
  get valid() {
    return this.status === VALID;
  }
  get invalid() {
    return this.status === INVALID;
  }
  get pending() {
    return this.status === PENDING;
  }
  get disabled() {
    return this.status === DISABLED;
  }
  get enabled() {
    return this.status !== DISABLED;
  }
  errors;
  get pristine() {
    return untracked(this.pristineReactive);
  }
  set pristine(v) {
    untracked(() => this.pristineReactive.set(v));
  }
  _pristine = computed(() => this.pristineReactive(), ...ngDevMode ? [{
    debugName: "_pristine"
  }] : []);
  pristineReactive = signal(true, ...ngDevMode ? [{
    debugName: "pristineReactive"
  }] : []);
  get dirty() {
    return !this.pristine;
  }
  get touched() {
    return untracked(this.touchedReactive);
  }
  set touched(v) {
    untracked(() => this.touchedReactive.set(v));
  }
  _touched = computed(() => this.touchedReactive(), ...ngDevMode ? [{
    debugName: "_touched"
  }] : []);
  touchedReactive = signal(false, ...ngDevMode ? [{
    debugName: "touchedReactive"
  }] : []);
  get untouched() {
    return !this.touched;
  }
  _events = new Subject();
  events = this._events.asObservable();
  valueChanges;
  statusChanges;
  get updateOn() {
    return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : "change";
  }
  setValidators(validators) {
    this._assignValidators(validators);
  }
  setAsyncValidators(validators) {
    this._assignAsyncValidators(validators);
  }
  addValidators(validators) {
    this.setValidators(addValidators(validators, this._rawValidators));
  }
  addAsyncValidators(validators) {
    this.setAsyncValidators(addValidators(validators, this._rawAsyncValidators));
  }
  removeValidators(validators) {
    this.setValidators(removeValidators(validators, this._rawValidators));
  }
  removeAsyncValidators(validators) {
    this.setAsyncValidators(removeValidators(validators, this._rawAsyncValidators));
  }
  hasValidator(validator) {
    return hasValidator(this._rawValidators, validator);
  }
  hasAsyncValidator(validator) {
    return hasValidator(this._rawAsyncValidators, validator);
  }
  clearValidators() {
    this.validator = null;
  }
  clearAsyncValidators() {
    this.asyncValidator = null;
  }
  markAsTouched(opts = {}) {
    const changed = this.touched === false;
    this.touched = true;
    const sourceControl = opts.sourceControl ?? this;
    if (!opts.onlySelf) {
      this._parent?.markAsTouched(__spreadProps(__spreadValues({}, opts), {
        sourceControl
      }));
    }
    if (changed && opts.emitEvent !== false) {
      this._events.next(new TouchedChangeEvent(true, sourceControl));
    }
  }
  markAllAsDirty(opts = {}) {
    this.markAsDirty({
      onlySelf: true,
      emitEvent: opts.emitEvent,
      sourceControl: this
    });
    this._forEachChild((control) => control.markAllAsDirty(opts));
  }
  markAllAsTouched(opts = {}) {
    this.markAsTouched({
      onlySelf: true,
      emitEvent: opts.emitEvent,
      sourceControl: this
    });
    this._forEachChild((control) => control.markAllAsTouched(opts));
  }
  markAsUntouched(opts = {}) {
    const changed = this.touched === true;
    this.touched = false;
    this._pendingTouched = false;
    const sourceControl = opts.sourceControl ?? this;
    this._forEachChild((control) => {
      control.markAsUntouched({
        onlySelf: true,
        emitEvent: opts.emitEvent,
        sourceControl
      });
    });
    if (!opts.onlySelf) {
      this._parent?._updateTouched(opts, sourceControl);
    }
    if (changed && opts.emitEvent !== false) {
      this._events.next(new TouchedChangeEvent(false, sourceControl));
    }
  }
  markAsDirty(opts = {}) {
    const changed = this.pristine === true;
    this.pristine = false;
    const sourceControl = opts.sourceControl ?? this;
    if (!opts.onlySelf) {
      this._parent?.markAsDirty(__spreadProps(__spreadValues({}, opts), {
        sourceControl
      }));
    }
    if (changed && opts.emitEvent !== false) {
      this._events.next(new PristineChangeEvent(false, sourceControl));
    }
  }
  markAsPristine(opts = {}) {
    const changed = this.pristine === false;
    this.pristine = true;
    this._pendingDirty = false;
    const sourceControl = opts.sourceControl ?? this;
    this._forEachChild((control) => {
      control.markAsPristine({
        onlySelf: true,
        emitEvent: opts.emitEvent
      });
    });
    if (!opts.onlySelf) {
      this._parent?._updatePristine(opts, sourceControl);
    }
    if (changed && opts.emitEvent !== false) {
      this._events.next(new PristineChangeEvent(true, sourceControl));
    }
  }
  markAsPending(opts = {}) {
    this.status = PENDING;
    const sourceControl = opts.sourceControl ?? this;
    if (opts.emitEvent !== false) {
      this._events.next(new StatusChangeEvent(this.status, sourceControl));
      this.statusChanges.emit(this.status);
    }
    if (!opts.onlySelf) {
      this._parent?.markAsPending(__spreadProps(__spreadValues({}, opts), {
        sourceControl
      }));
    }
  }
  disable(opts = {}) {
    const skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);
    this.status = DISABLED;
    this.errors = null;
    this._forEachChild((control) => {
      control.disable(__spreadProps(__spreadValues({}, opts), {
        onlySelf: true
      }));
    });
    this._updateValue();
    const sourceControl = opts.sourceControl ?? this;
    if (opts.emitEvent !== false) {
      this._events.next(new ValueChangeEvent(this.value, sourceControl));
      this._events.next(new StatusChangeEvent(this.status, sourceControl));
      this.valueChanges.emit(this.value);
      this.statusChanges.emit(this.status);
    }
    this._updateAncestors(__spreadProps(__spreadValues({}, opts), {
      skipPristineCheck
    }), this);
    this._onDisabledChange.forEach((changeFn) => changeFn(true));
  }
  enable(opts = {}) {
    const skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);
    this.status = VALID;
    this._forEachChild((control) => {
      control.enable(__spreadProps(__spreadValues({}, opts), {
        onlySelf: true
      }));
    });
    this.updateValueAndValidity({
      onlySelf: true,
      emitEvent: opts.emitEvent
    });
    this._updateAncestors(__spreadProps(__spreadValues({}, opts), {
      skipPristineCheck
    }), this);
    this._onDisabledChange.forEach((changeFn) => changeFn(false));
  }
  _updateAncestors(opts, sourceControl) {
    if (!opts.onlySelf) {
      this._parent?.updateValueAndValidity(opts);
      if (!opts.skipPristineCheck) {
        this._parent?._updatePristine({}, sourceControl);
      }
      this._parent?._updateTouched({}, sourceControl);
    }
  }
  setParent(parent) {
    this._parent = parent;
  }
  getRawValue() {
    return this.value;
  }
  updateValueAndValidity(opts = {}) {
    this._setInitialStatus();
    this._updateValue();
    if (this.enabled) {
      const shouldHaveEmitted = this._cancelExistingSubscription();
      this.errors = this._runValidator();
      this.status = this._calculateStatus();
      if (this.status === VALID || this.status === PENDING) {
        this._runAsyncValidator(shouldHaveEmitted, opts.emitEvent);
      }
    }
    const sourceControl = opts.sourceControl ?? this;
    if (opts.emitEvent !== false) {
      this._events.next(new ValueChangeEvent(this.value, sourceControl));
      this._events.next(new StatusChangeEvent(this.status, sourceControl));
      this.valueChanges.emit(this.value);
      this.statusChanges.emit(this.status);
    }
    if (!opts.onlySelf) {
      this._parent?.updateValueAndValidity(__spreadProps(__spreadValues({}, opts), {
        sourceControl
      }));
    }
  }
  _updateTreeValidity(opts = {
    emitEvent: true
  }) {
    this._forEachChild((ctrl) => ctrl._updateTreeValidity(opts));
    this.updateValueAndValidity({
      onlySelf: true,
      emitEvent: opts.emitEvent
    });
  }
  _setInitialStatus() {
    this.status = this._allControlsDisabled() ? DISABLED : VALID;
  }
  _runValidator() {
    return this.validator ? this.validator(this) : null;
  }
  _runAsyncValidator(shouldHaveEmitted, emitEvent) {
    if (this.asyncValidator) {
      this.status = PENDING;
      this._hasOwnPendingAsyncValidator = {
        emitEvent: emitEvent !== false,
        shouldHaveEmitted: shouldHaveEmitted !== false
      };
      const obs = toObservable(this.asyncValidator(this));
      this._asyncValidationSubscription = obs.subscribe((errors) => {
        this._hasOwnPendingAsyncValidator = null;
        this.setErrors(errors, {
          emitEvent,
          shouldHaveEmitted
        });
      });
    }
  }
  _cancelExistingSubscription() {
    if (this._asyncValidationSubscription) {
      this._asyncValidationSubscription.unsubscribe();
      const shouldHaveEmitted = (this._hasOwnPendingAsyncValidator?.emitEvent || this._hasOwnPendingAsyncValidator?.shouldHaveEmitted) ?? false;
      this._hasOwnPendingAsyncValidator = null;
      return shouldHaveEmitted;
    }
    return false;
  }
  setErrors(errors, opts = {}) {
    this.errors = errors;
    this._updateControlsErrors(opts.emitEvent !== false, this, opts.shouldHaveEmitted);
  }
  get(path) {
    let currPath = path;
    if (currPath == null) return null;
    if (!Array.isArray(currPath)) currPath = currPath.split(".");
    if (currPath.length === 0) return null;
    return currPath.reduce((control, name) => control && control._find(name), this);
  }
  getError(errorCode, path) {
    const control = path ? this.get(path) : this;
    return control?.errors ? control.errors[errorCode] : null;
  }
  hasError(errorCode, path) {
    return !!this.getError(errorCode, path);
  }
  get root() {
    let x = this;
    while (x._parent) {
      x = x._parent;
    }
    return x;
  }
  _updateControlsErrors(emitEvent, changedControl, shouldHaveEmitted) {
    this.status = this._calculateStatus();
    if (emitEvent) {
      this.statusChanges.emit(this.status);
    }
    if (emitEvent || shouldHaveEmitted) {
      this._events.next(new StatusChangeEvent(this.status, changedControl));
    }
    if (this._parent) {
      this._parent._updateControlsErrors(emitEvent, changedControl, shouldHaveEmitted);
    }
  }
  _initObservables() {
    this.valueChanges = new EventEmitter();
    this.statusChanges = new EventEmitter();
  }
  _calculateStatus() {
    if (this._allControlsDisabled()) return DISABLED;
    if (this.errors) return INVALID;
    if (this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(PENDING)) return PENDING;
    if (this._anyControlsHaveStatus(INVALID)) return INVALID;
    return VALID;
  }
  _anyControlsHaveStatus(status) {
    return this._anyControls((control) => control.status === status);
  }
  _anyControlsDirty() {
    return this._anyControls((control) => control.dirty);
  }
  _anyControlsTouched() {
    return this._anyControls((control) => control.touched);
  }
  _updatePristine(opts, changedControl) {
    const newPristine = !this._anyControlsDirty();
    const changed = this.pristine !== newPristine;
    this.pristine = newPristine;
    if (!opts.onlySelf) {
      this._parent?._updatePristine(opts, changedControl);
    }
    if (changed) {
      this._events.next(new PristineChangeEvent(this.pristine, changedControl));
    }
  }
  _updateTouched(opts = {}, changedControl) {
    this.touched = this._anyControlsTouched();
    this._events.next(new TouchedChangeEvent(this.touched, changedControl));
    if (!opts.onlySelf) {
      this._parent?._updateTouched(opts, changedControl);
    }
  }
  _onDisabledChange = [];
  _registerOnCollectionChange(fn) {
    this._onCollectionChange = fn;
  }
  _setUpdateStrategy(opts) {
    if (isOptionsObj(opts) && opts.updateOn != null) {
      this._updateOn = opts.updateOn;
    }
  }
  _parentMarkedDirty(onlySelf) {
    return !onlySelf && !!this._parent?.dirty && !this._parent._anyControlsDirty();
  }
  _find(name) {
    return null;
  }
  _assignValidators(validators) {
    this._rawValidators = Array.isArray(validators) ? validators.slice() : validators;
    this._composedValidatorFn = coerceToValidator(this._rawValidators);
  }
  _assignAsyncValidators(validators) {
    this._rawAsyncValidators = Array.isArray(validators) ? validators.slice() : validators;
    this._composedAsyncValidatorFn = coerceToAsyncValidator(this._rawAsyncValidators);
  }
};
var FormGroup = class extends AbstractControl {
  constructor(controls, validatorOrOpts, asyncValidator) {
    super(pickValidators(validatorOrOpts), pickAsyncValidators(asyncValidator, validatorOrOpts));
    (typeof ngDevMode === "undefined" || ngDevMode) && validateFormGroupControls(controls);
    this.controls = controls;
    this._initObservables();
    this._setUpdateStrategy(validatorOrOpts);
    this._setUpControls();
    this.updateValueAndValidity({
      onlySelf: true,
      emitEvent: !!this.asyncValidator
    });
  }
  controls;
  registerControl(name, control) {
    if (this.controls[name]) return this.controls[name];
    this.controls[name] = control;
    control.setParent(this);
    control._registerOnCollectionChange(this._onCollectionChange);
    return control;
  }
  addControl(name, control, options = {}) {
    this.registerControl(name, control);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
    this._onCollectionChange();
  }
  removeControl(name, options = {}) {
    if (this.controls[name]) this.controls[name]._registerOnCollectionChange(() => {
    });
    delete this.controls[name];
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
    this._onCollectionChange();
  }
  setControl(name, control, options = {}) {
    if (this.controls[name]) this.controls[name]._registerOnCollectionChange(() => {
    });
    delete this.controls[name];
    if (control) this.registerControl(name, control);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
    this._onCollectionChange();
  }
  contains(controlName) {
    return this.controls.hasOwnProperty(controlName) && this.controls[controlName].enabled;
  }
  setValue(value, options = {}) {
    assertAllValuesPresent(this, true, value);
    Object.keys(value).forEach((name) => {
      assertControlPresent(this, true, name);
      this.controls[name].setValue(value[name], {
        onlySelf: true,
        emitEvent: options.emitEvent
      });
    });
    this.updateValueAndValidity(options);
  }
  patchValue(value, options = {}) {
    if (value == null) return;
    Object.keys(value).forEach((name) => {
      const control = this.controls[name];
      if (control) {
        control.patchValue(value[name], {
          onlySelf: true,
          emitEvent: options.emitEvent
        });
      }
    });
    this.updateValueAndValidity(options);
  }
  reset(value = {}, options = {}) {
    this._forEachChild((control, name) => {
      control.reset(value ? value[name] : null, __spreadProps(__spreadValues({}, options), {
        onlySelf: true
      }));
    });
    this._updatePristine(options, this);
    this._updateTouched(options, this);
    this.updateValueAndValidity(options);
    if (options?.emitEvent !== false) {
      this._events.next(new FormResetEvent(this));
    }
  }
  getRawValue() {
    return this._reduceChildren({}, (acc, control, name) => {
      acc[name] = control.getRawValue();
      return acc;
    });
  }
  _syncPendingControls() {
    let subtreeUpdated = this._reduceChildren(false, (updated, child) => {
      return child._syncPendingControls() ? true : updated;
    });
    if (subtreeUpdated) this.updateValueAndValidity({
      onlySelf: true
    });
    return subtreeUpdated;
  }
  _forEachChild(cb) {
    Object.keys(this.controls).forEach((key) => {
      const control = this.controls[key];
      control && cb(control, key);
    });
  }
  _setUpControls() {
    this._forEachChild((control) => {
      control.setParent(this);
      control._registerOnCollectionChange(this._onCollectionChange);
    });
  }
  _updateValue() {
    this.value = this._reduceValue();
  }
  _anyControls(condition) {
    for (const [controlName, control] of Object.entries(this.controls)) {
      if (this.contains(controlName) && condition(control)) {
        return true;
      }
    }
    return false;
  }
  _reduceValue() {
    let acc = {};
    return this._reduceChildren(acc, (acc2, control, name) => {
      if (control.enabled || this.disabled) {
        acc2[name] = control.value;
      }
      return acc2;
    });
  }
  _reduceChildren(initValue, fn) {
    let res = initValue;
    this._forEachChild((control, name) => {
      res = fn(res, control, name);
    });
    return res;
  }
  _allControlsDisabled() {
    for (const controlName of Object.keys(this.controls)) {
      if (this.controls[controlName].enabled) {
        return false;
      }
    }
    return Object.keys(this.controls).length > 0 || this.disabled;
  }
  _find(name) {
    return this.controls.hasOwnProperty(name) ? this.controls[name] : null;
  }
};
function validateFormGroupControls(controls) {
  const invalidKeys = Object.keys(controls).filter((key) => key.includes("."));
  if (invalidKeys.length > 0) {
    console.warn(`FormGroup keys cannot include \`.\`, please replace the keys for: ${invalidKeys.join(",")}.`);
  }
}
var FormRecord = class extends FormGroup {
};
var CALL_SET_DISABLED_STATE = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "CallSetDisabledState" : "", {
  factory: () => setDisabledStateDefault
});
var setDisabledStateDefault = "always";
function controlPath(name, parent) {
  return [...parent.path, name];
}
function setUpControl(control, dir, callSetDisabledState = setDisabledStateDefault) {
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    if (!control) _throwError(dir, "Cannot find control with");
    if (!dir.valueAccessor) _throwMissingValueAccessorError(dir);
  }
  setUpValidators(control, dir);
  dir.valueAccessor.writeValue(control.value);
  if (control.disabled || callSetDisabledState === "always") {
    dir.valueAccessor.setDisabledState?.(control.disabled);
  }
  setUpViewChangePipeline(control, dir);
  setUpModelChangePipeline(control, dir);
  setUpBlurPipeline(control, dir);
  setUpDisabledChangeHandler(control, dir);
}
function cleanUpControl(control, dir, validateControlPresenceOnChange = true) {
  const noop = () => {
    if (validateControlPresenceOnChange && (typeof ngDevMode === "undefined" || ngDevMode)) {
      _noControlError(dir);
    }
  };
  dir?.valueAccessor?.registerOnChange(noop);
  dir?.valueAccessor?.registerOnTouched(noop);
  cleanUpValidators(control, dir);
  if (control) {
    dir._invokeOnDestroyCallbacks();
    control._registerOnCollectionChange(() => {
    });
  }
}
function registerOnValidatorChange(validators, onChange) {
  validators.forEach((validator) => {
    if (validator.registerOnValidatorChange) validator.registerOnValidatorChange(onChange);
  });
}
function setUpDisabledChangeHandler(control, dir) {
  if (dir.valueAccessor.setDisabledState) {
    const onDisabledChange = (isDisabled) => {
      dir.valueAccessor.setDisabledState(isDisabled);
    };
    control.registerOnDisabledChange(onDisabledChange);
    dir._registerOnDestroy(() => {
      control._unregisterOnDisabledChange(onDisabledChange);
    });
  }
}
function setUpValidators(control, dir) {
  const validators = getControlValidators(control);
  if (dir.validator !== null) {
    control.setValidators(mergeValidators(validators, dir.validator));
  } else if (typeof validators === "function") {
    control.setValidators([validators]);
  }
  const asyncValidators = getControlAsyncValidators(control);
  if (dir.asyncValidator !== null) {
    control.setAsyncValidators(mergeValidators(asyncValidators, dir.asyncValidator));
  } else if (typeof asyncValidators === "function") {
    control.setAsyncValidators([asyncValidators]);
  }
  const onValidatorChange = () => control.updateValueAndValidity();
  registerOnValidatorChange(dir._rawValidators, onValidatorChange);
  registerOnValidatorChange(dir._rawAsyncValidators, onValidatorChange);
}
function cleanUpValidators(control, dir) {
  let isControlUpdated = false;
  if (control !== null) {
    if (dir.validator !== null) {
      const validators = getControlValidators(control);
      if (Array.isArray(validators) && validators.length > 0) {
        const updatedValidators = validators.filter((validator) => validator !== dir.validator);
        if (updatedValidators.length !== validators.length) {
          isControlUpdated = true;
          control.setValidators(updatedValidators);
        }
      }
    }
    if (dir.asyncValidator !== null) {
      const asyncValidators = getControlAsyncValidators(control);
      if (Array.isArray(asyncValidators) && asyncValidators.length > 0) {
        const updatedAsyncValidators = asyncValidators.filter((asyncValidator) => asyncValidator !== dir.asyncValidator);
        if (updatedAsyncValidators.length !== asyncValidators.length) {
          isControlUpdated = true;
          control.setAsyncValidators(updatedAsyncValidators);
        }
      }
    }
  }
  const noop = () => {
  };
  registerOnValidatorChange(dir._rawValidators, noop);
  registerOnValidatorChange(dir._rawAsyncValidators, noop);
  return isControlUpdated;
}
function setUpViewChangePipeline(control, dir) {
  dir.valueAccessor.registerOnChange((newValue) => {
    control._pendingValue = newValue;
    control._pendingChange = true;
    control._pendingDirty = true;
    if (control.updateOn === "change") updateControl(control, dir);
  });
}
function setUpBlurPipeline(control, dir) {
  dir.valueAccessor.registerOnTouched(() => {
    control._pendingTouched = true;
    if (control.updateOn === "blur" && control._pendingChange) updateControl(control, dir);
    if (control.updateOn !== "submit") control.markAsTouched();
  });
}
function updateControl(control, dir) {
  if (control._pendingDirty) control.markAsDirty();
  control.setValue(control._pendingValue, {
    emitModelToViewChange: false
  });
  dir.viewToModelUpdate(control._pendingValue);
  control._pendingChange = false;
}
function setUpModelChangePipeline(control, dir) {
  const onChange = (newValue, emitModelEvent) => {
    dir.valueAccessor.writeValue(newValue);
    if (emitModelEvent) dir.viewToModelUpdate(newValue);
  };
  control.registerOnChange(onChange);
  dir._registerOnDestroy(() => {
    control._unregisterOnChange(onChange);
  });
}
function setUpFormContainer(control, dir) {
  if (control == null && (typeof ngDevMode === "undefined" || ngDevMode)) _throwError(dir, "Cannot find control with");
  setUpValidators(control, dir);
}
function cleanUpFormContainer(control, dir) {
  return cleanUpValidators(control, dir);
}
function _noControlError(dir) {
  return _throwError(dir, "There is no FormControl instance attached to form control element with");
}
function _throwError(dir, message) {
  const messageEnd = _describeControlLocation(dir);
  throw new Error(`${message} ${messageEnd}`);
}
function _describeControlLocation(dir) {
  const path = dir.path;
  if (path && path.length > 1) return `path: '${path.join(" -> ")}'`;
  if (path?.[0]) return `name: '${path}'`;
  return "unspecified name attribute";
}
function _throwMissingValueAccessorError(dir) {
  const loc = _describeControlLocation(dir);
  throw new RuntimeError(-1203, `No value accessor for form control ${loc}.`);
}
function _throwInvalidValueAccessorError(dir) {
  const loc = _describeControlLocation(dir);
  throw new RuntimeError(1200, `Value accessor was not provided as an array for form control with ${loc}. Check that the \`NG_VALUE_ACCESSOR\` token is configured as a \`multi: true\` provider.`);
}
function isPropertyUpdated(changes, viewModel) {
  if (!changes.hasOwnProperty("model")) return false;
  const change = changes["model"];
  if (change.isFirstChange()) return true;
  return !Object.is(viewModel, change.currentValue);
}
function isBuiltInAccessor(valueAccessor) {
  return Object.getPrototypeOf(valueAccessor.constructor) === BuiltInControlValueAccessor;
}
function syncPendingControls(form, directives) {
  form._syncPendingControls();
  directives.forEach((dir) => {
    const control = dir.control;
    if (control.updateOn === "submit" && control._pendingChange) {
      dir.viewToModelUpdate(control._pendingValue);
      control._pendingChange = false;
    }
  });
}
function selectValueAccessor(dir, valueAccessors) {
  if (!valueAccessors) return null;
  if (!Array.isArray(valueAccessors) && (typeof ngDevMode === "undefined" || ngDevMode)) _throwInvalidValueAccessorError(dir);
  let defaultAccessor = void 0;
  let builtinAccessor = void 0;
  let customAccessor = void 0;
  valueAccessors.forEach((v) => {
    if (v.constructor === DefaultValueAccessor) {
      defaultAccessor = v;
    } else if (isBuiltInAccessor(v)) {
      if (builtinAccessor && (typeof ngDevMode === "undefined" || ngDevMode)) _throwError(dir, "More than one built-in value accessor matches form control with");
      builtinAccessor = v;
    } else {
      if (customAccessor && (typeof ngDevMode === "undefined" || ngDevMode)) _throwError(dir, "More than one custom value accessor matches form control with");
      customAccessor = v;
    }
  });
  if (customAccessor) return customAccessor;
  if (builtinAccessor) return builtinAccessor;
  if (defaultAccessor) return defaultAccessor;
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    _throwError(dir, "No valid value accessor for form control with");
  }
  return null;
}
function removeListItem$1(list, el) {
  const index = list.indexOf(el);
  if (index > -1) list.splice(index, 1);
}
function _ngModelWarning(name, type, instance, warningConfig) {
  if (warningConfig === "never") return;
  if ((warningConfig === null || warningConfig === "once") && !type._ngModelWarningSentOnce || warningConfig === "always" && !instance._ngModelWarningSent) {
    console.warn(ngModelWarning(name));
    type._ngModelWarningSentOnce = true;
    instance._ngModelWarningSent = true;
  }
}
var formDirectiveProvider$2 = {
  provide: ControlContainer,
  useExisting: forwardRef(() => NgForm)
};
var resolvedPromise$1 = (() => Promise.resolve())();
var NgForm = class _NgForm extends ControlContainer {
  callSetDisabledState;
  get submitted() {
    return untracked(this.submittedReactive);
  }
  _submitted = computed(() => this.submittedReactive(), ...ngDevMode ? [{
    debugName: "_submitted"
  }] : []);
  submittedReactive = signal(false, ...ngDevMode ? [{
    debugName: "submittedReactive"
  }] : []);
  _directives = /* @__PURE__ */ new Set();
  form;
  ngSubmit = new EventEmitter();
  options;
  constructor(validators, asyncValidators, callSetDisabledState) {
    super();
    this.callSetDisabledState = callSetDisabledState;
    this.form = new FormGroup({}, composeValidators(validators), composeAsyncValidators(asyncValidators));
  }
  ngAfterViewInit() {
    this._setUpdateStrategy();
  }
  get formDirective() {
    return this;
  }
  get control() {
    return this.form;
  }
  get path() {
    return [];
  }
  get controls() {
    return this.form.controls;
  }
  addControl(dir) {
    resolvedPromise$1.then(() => {
      const container = this._findContainer(dir.path);
      dir.control = container.registerControl(dir.name, dir.control);
      setUpControl(dir.control, dir, this.callSetDisabledState);
      dir.control.updateValueAndValidity({
        emitEvent: false
      });
      this._directives.add(dir);
    });
  }
  getControl(dir) {
    return this.form.get(dir.path);
  }
  removeControl(dir) {
    resolvedPromise$1.then(() => {
      const container = this._findContainer(dir.path);
      container?.removeControl(dir.name);
      this._directives.delete(dir);
    });
  }
  addFormGroup(dir) {
    resolvedPromise$1.then(() => {
      const container = this._findContainer(dir.path);
      const group = new FormGroup({});
      setUpFormContainer(group, dir);
      container.registerControl(dir.name, group);
      group.updateValueAndValidity({
        emitEvent: false
      });
    });
  }
  removeFormGroup(dir) {
    resolvedPromise$1.then(() => {
      const container = this._findContainer(dir.path);
      container?.removeControl?.(dir.name);
    });
  }
  getFormGroup(dir) {
    return this.form.get(dir.path);
  }
  updateModel(dir, value) {
    resolvedPromise$1.then(() => {
      const ctrl = this.form.get(dir.path);
      ctrl.setValue(value);
    });
  }
  setValue(value) {
    this.control.setValue(value);
  }
  onSubmit($event) {
    this.submittedReactive.set(true);
    syncPendingControls(this.form, this._directives);
    this.ngSubmit.emit($event);
    this.form._events.next(new FormSubmittedEvent(this.control));
    return $event?.target?.method === "dialog";
  }
  onReset() {
    this.resetForm();
  }
  resetForm(value = void 0) {
    this.form.reset(value);
    this.submittedReactive.set(false);
  }
  _setUpdateStrategy() {
    if (this.options && this.options.updateOn != null) {
      this.form._updateOn = this.options.updateOn;
    }
  }
  _findContainer(path) {
    path.pop();
    return path.length ? this.form.get(path) : this.form;
  }
  static \u0275fac = function NgForm_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgForm)(\u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10), \u0275\u0275directiveInject(CALL_SET_DISABLED_STATE, 8));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NgForm,
    selectors: [["form", 3, "ngNoForm", "", 3, "formGroup", "", 3, "formArray", ""], ["ng-form"], ["", "ngForm", ""]],
    hostBindings: function NgForm_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("submit", function NgForm_submit_HostBindingHandler($event) {
          return ctx.onSubmit($event);
        })("reset", function NgForm_reset_HostBindingHandler() {
          return ctx.onReset();
        });
      }
    },
    inputs: {
      options: [0, "ngFormOptions", "options"]
    },
    outputs: {
      ngSubmit: "ngSubmit"
    },
    exportAs: ["ngForm"],
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([formDirectiveProvider$2]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgForm, [{
    type: Directive,
    args: [{
      selector: "form:not([ngNoForm]):not([formGroup]):not([formArray]),ng-form,[ngForm]",
      providers: [formDirectiveProvider$2],
      host: {
        "(submit)": "onSubmit($event)",
        "(reset)": "onReset()"
      },
      outputs: ["ngSubmit"],
      exportAs: "ngForm",
      standalone: false
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_ASYNC_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [CALL_SET_DISABLED_STATE]
    }]
  }], {
    options: [{
      type: Input,
      args: ["ngFormOptions"]
    }]
  });
})();
function removeListItem(list, el) {
  const index = list.indexOf(el);
  if (index > -1) list.splice(index, 1);
}
function isFormControlState(formState) {
  return typeof formState === "object" && formState !== null && Object.keys(formState).length === 2 && "value" in formState && "disabled" in formState;
}
var FormControl = class FormControl2 extends AbstractControl {
  defaultValue = null;
  _onChange = [];
  _pendingValue;
  _pendingChange = false;
  constructor(formState = null, validatorOrOpts, asyncValidator) {
    super(pickValidators(validatorOrOpts), pickAsyncValidators(asyncValidator, validatorOrOpts));
    this._applyFormState(formState);
    this._setUpdateStrategy(validatorOrOpts);
    this._initObservables();
    this.updateValueAndValidity({
      onlySelf: true,
      emitEvent: !!this.asyncValidator
    });
    if (isOptionsObj(validatorOrOpts) && (validatorOrOpts.nonNullable || validatorOrOpts.initialValueIsDefault)) {
      if (isFormControlState(formState)) {
        this.defaultValue = formState.value;
      } else {
        this.defaultValue = formState;
      }
    }
  }
  setValue(value, options = {}) {
    this.value = this._pendingValue = value;
    if (this._onChange.length && options.emitModelToViewChange !== false) {
      this._onChange.forEach((changeFn) => changeFn(this.value, options.emitViewToModelChange !== false));
    }
    this.updateValueAndValidity(options);
  }
  patchValue(value, options = {}) {
    this.setValue(value, options);
  }
  reset(formState = this.defaultValue, options = {}) {
    this._applyFormState(formState);
    this.markAsPristine(options);
    this.markAsUntouched(options);
    this.setValue(this.value, options);
    if (options.overwriteDefaultValue) {
      this.defaultValue = this.value;
    }
    this._pendingChange = false;
    if (options?.emitEvent !== false) {
      this._events.next(new FormResetEvent(this));
    }
  }
  _updateValue() {
  }
  _anyControls(condition) {
    return false;
  }
  _allControlsDisabled() {
    return this.disabled;
  }
  registerOnChange(fn) {
    this._onChange.push(fn);
  }
  _unregisterOnChange(fn) {
    removeListItem(this._onChange, fn);
  }
  registerOnDisabledChange(fn) {
    this._onDisabledChange.push(fn);
  }
  _unregisterOnDisabledChange(fn) {
    removeListItem(this._onDisabledChange, fn);
  }
  _forEachChild(cb) {
  }
  _syncPendingControls() {
    if (this.updateOn === "submit") {
      if (this._pendingDirty) this.markAsDirty();
      if (this._pendingTouched) this.markAsTouched();
      if (this._pendingChange) {
        this.setValue(this._pendingValue, {
          onlySelf: true,
          emitModelToViewChange: false
        });
        return true;
      }
    }
    return false;
  }
  _applyFormState(formState) {
    if (isFormControlState(formState)) {
      this.value = this._pendingValue = formState.value;
      formState.disabled ? this.disable({
        onlySelf: true,
        emitEvent: false
      }) : this.enable({
        onlySelf: true,
        emitEvent: false
      });
    } else {
      this.value = this._pendingValue = formState;
    }
  }
};
var isFormControl = (control) => control instanceof FormControl;
var AbstractFormGroupDirective = class _AbstractFormGroupDirective extends ControlContainer {
  _parent;
  ngOnInit() {
    this._checkParentType();
    this.formDirective.addFormGroup(this);
  }
  ngOnDestroy() {
    this.formDirective?.removeFormGroup(this);
  }
  get control() {
    return this.formDirective.getFormGroup(this);
  }
  get path() {
    return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
  }
  get formDirective() {
    return this._parent ? this._parent.formDirective : null;
  }
  _checkParentType() {
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275AbstractFormGroupDirective_BaseFactory;
    return function AbstractFormGroupDirective_Factory(__ngFactoryType__) {
      return (\u0275AbstractFormGroupDirective_BaseFactory || (\u0275AbstractFormGroupDirective_BaseFactory = \u0275\u0275getInheritedFactory(_AbstractFormGroupDirective)))(__ngFactoryType__ || _AbstractFormGroupDirective);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _AbstractFormGroupDirective,
    standalone: false,
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AbstractFormGroupDirective, [{
    type: Directive,
    args: [{
      standalone: false
    }]
  }], null, null);
})();
function modelParentException() {
  return new RuntimeError(1350, `
    ngModel cannot be used to register form controls with a parent formGroup directive.  Try using
    formGroup's partner directive "formControlName" instead.  Example:

    ${formControlNameExample}

    Or, if you'd like to avoid registering this form control, indicate that it's standalone in ngModelOptions:

    Example:

    ${ngModelWithFormGroupExample}`);
}
function formGroupNameException() {
  return new RuntimeError(1351, `
    ngModel cannot be used to register form controls with a parent formGroupName or formArrayName directive.

    Option 1: Use formControlName instead of ngModel (reactive strategy):

    ${formGroupNameExample}

    Option 2:  Update ngModel's parent be ngModelGroup (template-driven strategy):

    ${ngModelGroupExample}`);
}
function missingNameException() {
  return new RuntimeError(1352, `If ngModel is used within a form tag, either the name attribute must be set or the form
    control must be defined as 'standalone' in ngModelOptions.

    Example 1: <input [(ngModel)]="person.firstName" name="first">
    Example 2: <input [(ngModel)]="person.firstName" [ngModelOptions]="{standalone: true}">`);
}
function modelGroupParentException() {
  return new RuntimeError(1353, `
    ngModelGroup cannot be used with a parent formGroup directive.

    Option 1: Use formGroupName instead of ngModelGroup (reactive strategy):

    ${formGroupNameExample}

    Option 2:  Use a regular form tag instead of the formGroup directive (template-driven strategy):

    ${ngModelGroupExample}`);
}
var modelGroupProvider = {
  provide: ControlContainer,
  useExisting: forwardRef(() => NgModelGroup)
};
var NgModelGroup = class _NgModelGroup extends AbstractFormGroupDirective {
  name = "";
  constructor(parent, validators, asyncValidators) {
    super();
    this._parent = parent;
    this._setValidators(validators);
    this._setAsyncValidators(asyncValidators);
  }
  _checkParentType() {
    if (!(this._parent instanceof _NgModelGroup) && !(this._parent instanceof NgForm) && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw modelGroupParentException();
    }
  }
  static \u0275fac = function NgModelGroup_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgModelGroup)(\u0275\u0275directiveInject(ControlContainer, 5), \u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NgModelGroup,
    selectors: [["", "ngModelGroup", ""]],
    inputs: {
      name: [0, "ngModelGroup", "name"]
    },
    exportAs: ["ngModelGroup"],
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([modelGroupProvider]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgModelGroup, [{
    type: Directive,
    args: [{
      selector: "[ngModelGroup]",
      providers: [modelGroupProvider],
      exportAs: "ngModelGroup",
      standalone: false
    }]
  }], () => [{
    type: ControlContainer,
    decorators: [{
      type: Host
    }, {
      type: SkipSelf
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_ASYNC_VALIDATORS]
    }]
  }], {
    name: [{
      type: Input,
      args: ["ngModelGroup"]
    }]
  });
})();
var formControlBinding$1 = {
  provide: NgControl,
  useExisting: forwardRef(() => NgModel)
};
var resolvedPromise = (() => Promise.resolve())();
var NgModel = class _NgModel extends NgControl {
  _changeDetectorRef;
  callSetDisabledState;
  control = new FormControl();
  static ngAcceptInputType_isDisabled;
  _registered = false;
  viewModel;
  name = "";
  isDisabled;
  model;
  options;
  update = new EventEmitter();
  constructor(parent, validators, asyncValidators, valueAccessors, _changeDetectorRef, callSetDisabledState) {
    super();
    this._changeDetectorRef = _changeDetectorRef;
    this.callSetDisabledState = callSetDisabledState;
    this._parent = parent;
    this._setValidators(validators);
    this._setAsyncValidators(asyncValidators);
    this.valueAccessor = selectValueAccessor(this, valueAccessors);
  }
  ngOnChanges(changes) {
    this._checkForErrors();
    if (!this._registered || "name" in changes) {
      if (this._registered) {
        this._checkName();
        if (this.formDirective) {
          const oldName = changes["name"].previousValue;
          this.formDirective.removeControl({
            name: oldName,
            path: this._getPath(oldName)
          });
        }
      }
      this._setUpControl();
    }
    if ("isDisabled" in changes) {
      this._updateDisabled(changes);
    }
    if (isPropertyUpdated(changes, this.viewModel)) {
      this._updateValue(this.model);
      this.viewModel = this.model;
    }
  }
  ngOnDestroy() {
    this.formDirective?.removeControl(this);
  }
  get path() {
    return this._getPath(this.name);
  }
  get formDirective() {
    return this._parent ? this._parent.formDirective : null;
  }
  viewToModelUpdate(newValue) {
    this.viewModel = newValue;
    this.update.emit(newValue);
  }
  _setUpControl() {
    this._setUpdateStrategy();
    this._isStandalone() ? this._setUpStandalone() : this.formDirective.addControl(this);
    this._registered = true;
  }
  _setUpdateStrategy() {
    if (this.options && this.options.updateOn != null) {
      this.control._updateOn = this.options.updateOn;
    }
  }
  _isStandalone() {
    return !this._parent || !!(this.options && this.options.standalone);
  }
  _setUpStandalone() {
    setUpControl(this.control, this, this.callSetDisabledState);
    this.control.updateValueAndValidity({
      emitEvent: false
    });
  }
  _checkForErrors() {
    if ((typeof ngDevMode === "undefined" || ngDevMode) && !this._isStandalone()) {
      checkParentType$1(this._parent);
    }
    this._checkName();
  }
  _checkName() {
    if (this.options && this.options.name) this.name = this.options.name;
    if (!this._isStandalone() && !this.name && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw missingNameException();
    }
  }
  _updateValue(value) {
    resolvedPromise.then(() => {
      this.control.setValue(value, {
        emitViewToModelChange: false
      });
      this._changeDetectorRef?.markForCheck();
    });
  }
  _updateDisabled(changes) {
    const disabledValue = changes["isDisabled"].currentValue;
    const isDisabled = disabledValue !== 0 && booleanAttribute(disabledValue);
    resolvedPromise.then(() => {
      if (isDisabled && !this.control.disabled) {
        this.control.disable();
      } else if (!isDisabled && this.control.disabled) {
        this.control.enable();
      }
      this._changeDetectorRef?.markForCheck();
    });
  }
  _getPath(controlName) {
    return this._parent ? controlPath(controlName, this._parent) : [controlName];
  }
  static \u0275fac = function NgModel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgModel)(\u0275\u0275directiveInject(ControlContainer, 9), \u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10), \u0275\u0275directiveInject(NG_VALUE_ACCESSOR, 10), \u0275\u0275directiveInject(ChangeDetectorRef, 8), \u0275\u0275directiveInject(CALL_SET_DISABLED_STATE, 8));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NgModel,
    selectors: [["", "ngModel", "", 3, "formControlName", "", 3, "formControl", ""]],
    inputs: {
      name: "name",
      isDisabled: [0, "disabled", "isDisabled"],
      model: [0, "ngModel", "model"],
      options: [0, "ngModelOptions", "options"]
    },
    outputs: {
      update: "ngModelChange"
    },
    exportAs: ["ngModel"],
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([formControlBinding$1]), \u0275\u0275InheritDefinitionFeature, \u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgModel, [{
    type: Directive,
    args: [{
      selector: "[ngModel]:not([formControlName]):not([formControl])",
      providers: [formControlBinding$1],
      exportAs: "ngModel",
      standalone: false
    }]
  }], () => [{
    type: ControlContainer,
    decorators: [{
      type: Optional
    }, {
      type: Host
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_ASYNC_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALUE_ACCESSOR]
    }]
  }, {
    type: ChangeDetectorRef,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [ChangeDetectorRef]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [CALL_SET_DISABLED_STATE]
    }]
  }], {
    name: [{
      type: Input
    }],
    isDisabled: [{
      type: Input,
      args: ["disabled"]
    }],
    model: [{
      type: Input,
      args: ["ngModel"]
    }],
    options: [{
      type: Input,
      args: ["ngModelOptions"]
    }],
    update: [{
      type: Output,
      args: ["ngModelChange"]
    }]
  });
})();
function checkParentType$1(parent) {
  if (!(parent instanceof NgModelGroup) && parent instanceof AbstractFormGroupDirective) {
    throw formGroupNameException();
  } else if (!(parent instanceof NgModelGroup) && !(parent instanceof NgForm)) {
    throw modelParentException();
  }
}
var \u0275NgNoValidate = class _\u0275NgNoValidate {
  static \u0275fac = function \u0275NgNoValidate_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _\u0275NgNoValidate)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _\u0275NgNoValidate,
    selectors: [["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""]],
    hostAttrs: ["novalidate", ""],
    standalone: false
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(\u0275NgNoValidate, [{
    type: Directive,
    args: [{
      selector: "form:not([ngNoForm]):not([ngNativeValidate])",
      host: {
        "novalidate": ""
      },
      standalone: false
    }]
  }], null, null);
})();
var NUMBER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NumberValueAccessor),
  multi: true
};
var NumberValueAccessor = class _NumberValueAccessor extends BuiltInControlValueAccessor {
  writeValue(value) {
    const normalizedValue = value == null ? "" : value;
    this.setProperty("value", normalizedValue);
  }
  registerOnChange(fn) {
    this.onChange = (value) => {
      fn(value == "" ? null : parseFloat(value));
    };
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275NumberValueAccessor_BaseFactory;
    return function NumberValueAccessor_Factory(__ngFactoryType__) {
      return (\u0275NumberValueAccessor_BaseFactory || (\u0275NumberValueAccessor_BaseFactory = \u0275\u0275getInheritedFactory(_NumberValueAccessor)))(__ngFactoryType__ || _NumberValueAccessor);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NumberValueAccessor,
    selectors: [["input", "type", "number", "formControlName", ""], ["input", "type", "number", "formControl", ""], ["input", "type", "number", "ngModel", ""]],
    hostBindings: function NumberValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("input", function NumberValueAccessor_input_HostBindingHandler($event) {
          return ctx.onChange($event.target.value);
        })("blur", function NumberValueAccessor_blur_HostBindingHandler() {
          return ctx.onTouched();
        });
      }
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([NUMBER_VALUE_ACCESSOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NumberValueAccessor, [{
    type: Directive,
    args: [{
      selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]",
      host: {
        "(input)": "onChange($any($event.target).value)",
        "(blur)": "onTouched()"
      },
      providers: [NUMBER_VALUE_ACCESSOR],
      standalone: false
    }]
  }], null, null);
})();
var RADIO_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioControlValueAccessor),
  multi: true
};
function throwNameError() {
  throw new RuntimeError(1202, `
      If you define both a name and a formControlName attribute on your radio button, their values
      must match. Ex: <input type="radio" formControlName="food" name="food">
    `);
}
var RadioControlRegistry = class _RadioControlRegistry {
  _accessors = [];
  add(control, accessor) {
    this._accessors.push([control, accessor]);
  }
  remove(accessor) {
    for (let i = this._accessors.length - 1; i >= 0; --i) {
      if (this._accessors[i][1] === accessor) {
        this._accessors.splice(i, 1);
        return;
      }
    }
  }
  select(accessor) {
    this._accessors.forEach((c) => {
      if (this._isSameGroup(c, accessor) && c[1] !== accessor) {
        c[1].fireUncheck(accessor.value);
      }
    });
  }
  _isSameGroup(controlPair, accessor) {
    if (!controlPair[0].control) return false;
    return controlPair[0]._parent === accessor._control._parent && controlPair[1].name === accessor.name;
  }
  static \u0275fac = function RadioControlRegistry_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RadioControlRegistry)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _RadioControlRegistry,
    factory: _RadioControlRegistry.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RadioControlRegistry, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var RadioControlValueAccessor = class _RadioControlValueAccessor extends BuiltInControlValueAccessor {
  _registry;
  _injector;
  _state;
  _control;
  _fn;
  setDisabledStateFired = false;
  onChange = () => {
  };
  name;
  formControlName;
  value;
  callSetDisabledState = inject(CALL_SET_DISABLED_STATE, {
    optional: true
  }) ?? setDisabledStateDefault;
  constructor(renderer, elementRef, _registry, _injector) {
    super(renderer, elementRef);
    this._registry = _registry;
    this._injector = _injector;
  }
  ngOnInit() {
    this._control = this._injector.get(NgControl);
    this._checkName();
    this._registry.add(this._control, this);
  }
  ngOnDestroy() {
    this._registry.remove(this);
  }
  writeValue(value) {
    this._state = value === this.value;
    this.setProperty("checked", this._state);
  }
  registerOnChange(fn) {
    this._fn = fn;
    this.onChange = () => {
      fn(this.value);
      this._registry.select(this);
    };
  }
  setDisabledState(isDisabled) {
    if (this.setDisabledStateFired || isDisabled || this.callSetDisabledState === "whenDisabledForLegacyCode") {
      this.setProperty("disabled", isDisabled);
    }
    this.setDisabledStateFired = true;
  }
  fireUncheck(value) {
    this.writeValue(value);
  }
  _checkName() {
    if (this.name && this.formControlName && this.name !== this.formControlName && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throwNameError();
    }
    if (!this.name && this.formControlName) this.name = this.formControlName;
  }
  static \u0275fac = function RadioControlValueAccessor_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RadioControlValueAccessor)(\u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(RadioControlRegistry), \u0275\u0275directiveInject(Injector));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _RadioControlValueAccessor,
    selectors: [["input", "type", "radio", "formControlName", ""], ["input", "type", "radio", "formControl", ""], ["input", "type", "radio", "ngModel", ""]],
    hostBindings: function RadioControlValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("change", function RadioControlValueAccessor_change_HostBindingHandler() {
          return ctx.onChange();
        })("blur", function RadioControlValueAccessor_blur_HostBindingHandler() {
          return ctx.onTouched();
        });
      }
    },
    inputs: {
      name: "name",
      formControlName: "formControlName",
      value: "value"
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([RADIO_VALUE_ACCESSOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RadioControlValueAccessor, [{
    type: Directive,
    args: [{
      selector: "input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]",
      host: {
        "(change)": "onChange()",
        "(blur)": "onTouched()"
      },
      providers: [RADIO_VALUE_ACCESSOR],
      standalone: false
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: RadioControlRegistry
  }, {
    type: Injector
  }], {
    name: [{
      type: Input
    }],
    formControlName: [{
      type: Input
    }],
    value: [{
      type: Input
    }]
  });
})();
var RANGE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RangeValueAccessor),
  multi: true
};
var RangeValueAccessor = class _RangeValueAccessor extends BuiltInControlValueAccessor {
  writeValue(value) {
    this.setProperty("value", parseFloat(value));
  }
  registerOnChange(fn) {
    this.onChange = (value) => {
      fn(value == "" ? null : parseFloat(value));
    };
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275RangeValueAccessor_BaseFactory;
    return function RangeValueAccessor_Factory(__ngFactoryType__) {
      return (\u0275RangeValueAccessor_BaseFactory || (\u0275RangeValueAccessor_BaseFactory = \u0275\u0275getInheritedFactory(_RangeValueAccessor)))(__ngFactoryType__ || _RangeValueAccessor);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _RangeValueAccessor,
    selectors: [["input", "type", "range", "formControlName", ""], ["input", "type", "range", "formControl", ""], ["input", "type", "range", "ngModel", ""]],
    hostBindings: function RangeValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("change", function RangeValueAccessor_change_HostBindingHandler($event) {
          return ctx.onChange($event.target.value);
        })("input", function RangeValueAccessor_input_HostBindingHandler($event) {
          return ctx.onChange($event.target.value);
        })("blur", function RangeValueAccessor_blur_HostBindingHandler() {
          return ctx.onTouched();
        });
      }
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([RANGE_VALUE_ACCESSOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RangeValueAccessor, [{
    type: Directive,
    args: [{
      selector: "input[type=range][formControlName],input[type=range][formControl],input[type=range][ngModel]",
      host: {
        "(change)": "onChange($any($event.target).value)",
        "(input)": "onChange($any($event.target).value)",
        "(blur)": "onTouched()"
      },
      providers: [RANGE_VALUE_ACCESSOR],
      standalone: false
    }]
  }], null, null);
})();
var FormArray = class extends AbstractControl {
  constructor(controls, validatorOrOpts, asyncValidator) {
    super(pickValidators(validatorOrOpts), pickAsyncValidators(asyncValidator, validatorOrOpts));
    this.controls = controls;
    this._initObservables();
    this._setUpdateStrategy(validatorOrOpts);
    this._setUpControls();
    this.updateValueAndValidity({
      onlySelf: true,
      emitEvent: !!this.asyncValidator
    });
  }
  controls;
  at(index) {
    return this.controls[this._adjustIndex(index)];
  }
  push(control, options = {}) {
    if (Array.isArray(control)) {
      control.forEach((ctrl) => {
        this.controls.push(ctrl);
        this._registerControl(ctrl);
      });
    } else {
      this.controls.push(control);
      this._registerControl(control);
    }
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
    this._onCollectionChange();
  }
  insert(index, control, options = {}) {
    this.controls.splice(index, 0, control);
    this._registerControl(control);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
  }
  removeAt(index, options = {}) {
    let adjustedIndex = this._adjustIndex(index);
    if (adjustedIndex < 0) adjustedIndex = 0;
    if (this.controls[adjustedIndex]) this.controls[adjustedIndex]._registerOnCollectionChange(() => {
    });
    this.controls.splice(adjustedIndex, 1);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
  }
  setControl(index, control, options = {}) {
    let adjustedIndex = this._adjustIndex(index);
    if (adjustedIndex < 0) adjustedIndex = 0;
    if (this.controls[adjustedIndex]) this.controls[adjustedIndex]._registerOnCollectionChange(() => {
    });
    this.controls.splice(adjustedIndex, 1);
    if (control) {
      this.controls.splice(adjustedIndex, 0, control);
      this._registerControl(control);
    }
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
    this._onCollectionChange();
  }
  get length() {
    return this.controls.length;
  }
  setValue(value, options = {}) {
    assertAllValuesPresent(this, false, value);
    value.forEach((newValue, index) => {
      assertControlPresent(this, false, index);
      this.at(index).setValue(newValue, {
        onlySelf: true,
        emitEvent: options.emitEvent
      });
    });
    this.updateValueAndValidity(options);
  }
  patchValue(value, options = {}) {
    if (value == null) return;
    value.forEach((newValue, index) => {
      if (this.at(index)) {
        this.at(index).patchValue(newValue, {
          onlySelf: true,
          emitEvent: options.emitEvent
        });
      }
    });
    this.updateValueAndValidity(options);
  }
  reset(value = [], options = {}) {
    this._forEachChild((control, index) => {
      control.reset(value[index], __spreadProps(__spreadValues({}, options), {
        onlySelf: true
      }));
    });
    this._updatePristine(options, this);
    this._updateTouched(options, this);
    this.updateValueAndValidity(options);
    if (options?.emitEvent !== false) {
      this._events.next(new FormResetEvent(this));
    }
  }
  getRawValue() {
    return this.controls.map((control) => control.getRawValue());
  }
  clear(options = {}) {
    if (this.controls.length < 1) return;
    this._forEachChild((control) => control._registerOnCollectionChange(() => {
    }));
    this.controls.splice(0);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
  }
  _adjustIndex(index) {
    return index < 0 ? index + this.length : index;
  }
  _syncPendingControls() {
    let subtreeUpdated = this.controls.reduce((updated, child) => {
      return child._syncPendingControls() ? true : updated;
    }, false);
    if (subtreeUpdated) this.updateValueAndValidity({
      onlySelf: true
    });
    return subtreeUpdated;
  }
  _forEachChild(cb) {
    this.controls.forEach((control, index) => {
      cb(control, index);
    });
  }
  _updateValue() {
    this.value = this.controls.filter((control) => control.enabled || this.disabled).map((control) => control.value);
  }
  _anyControls(condition) {
    return this.controls.some((control) => control.enabled && condition(control));
  }
  _setUpControls() {
    this._forEachChild((control) => this._registerControl(control));
  }
  _allControlsDisabled() {
    for (const control of this.controls) {
      if (control.enabled) return false;
    }
    return this.controls.length > 0 || this.disabled;
  }
  _registerControl(control) {
    control.setParent(this);
    control._registerOnCollectionChange(this._onCollectionChange);
  }
  _find(name) {
    return this.at(name) ?? null;
  }
};
var AbstractFormDirective = class _AbstractFormDirective extends ControlContainer {
  callSetDisabledState;
  get submitted() {
    return untracked(this._submittedReactive);
  }
  set submitted(value) {
    this._submittedReactive.set(value);
  }
  _submitted = computed(() => this._submittedReactive(), ...ngDevMode ? [{
    debugName: "_submitted"
  }] : []);
  _submittedReactive = signal(false, ...ngDevMode ? [{
    debugName: "_submittedReactive"
  }] : []);
  _oldForm;
  _onCollectionChange = () => this._updateDomValue();
  directives = [];
  constructor(validators, asyncValidators, callSetDisabledState) {
    super();
    this.callSetDisabledState = callSetDisabledState;
    this._setValidators(validators);
    this._setAsyncValidators(asyncValidators);
  }
  ngOnChanges(changes) {
    this.onChanges(changes);
  }
  ngOnDestroy() {
    this.onDestroy();
  }
  onChanges(changes) {
    this._checkFormPresent();
    if (changes.hasOwnProperty("form")) {
      this._updateValidators();
      this._updateDomValue();
      this._updateRegistrations();
      this._oldForm = this.form;
    }
  }
  onDestroy() {
    if (this.form) {
      cleanUpValidators(this.form, this);
      if (this.form._onCollectionChange === this._onCollectionChange) {
        this.form._registerOnCollectionChange(() => {
        });
      }
    }
  }
  get formDirective() {
    return this;
  }
  get path() {
    return [];
  }
  addControl(dir) {
    const ctrl = this.form.get(dir.path);
    setUpControl(ctrl, dir, this.callSetDisabledState);
    ctrl.updateValueAndValidity({
      emitEvent: false
    });
    this.directives.push(dir);
    return ctrl;
  }
  getControl(dir) {
    return this.form.get(dir.path);
  }
  removeControl(dir) {
    cleanUpControl(dir.control || null, dir, false);
    removeListItem$1(this.directives, dir);
  }
  addFormGroup(dir) {
    this._setUpFormContainer(dir);
  }
  removeFormGroup(dir) {
    this._cleanUpFormContainer(dir);
  }
  getFormGroup(dir) {
    return this.form.get(dir.path);
  }
  getFormArray(dir) {
    return this.form.get(dir.path);
  }
  addFormArray(dir) {
    this._setUpFormContainer(dir);
  }
  removeFormArray(dir) {
    this._cleanUpFormContainer(dir);
  }
  updateModel(dir, value) {
    const ctrl = this.form.get(dir.path);
    ctrl.setValue(value);
  }
  onReset() {
    this.resetForm();
  }
  resetForm(value = void 0, options = {}) {
    this.form.reset(value, options);
    this._submittedReactive.set(false);
  }
  onSubmit($event) {
    this.submitted = true;
    syncPendingControls(this.form, this.directives);
    this.ngSubmit.emit($event);
    this.form._events.next(new FormSubmittedEvent(this.control));
    return $event?.target?.method === "dialog";
  }
  _updateDomValue() {
    this.directives.forEach((dir) => {
      const oldCtrl = dir.control;
      const newCtrl = this.form.get(dir.path);
      if (oldCtrl !== newCtrl) {
        cleanUpControl(oldCtrl || null, dir);
        if (isFormControl(newCtrl)) {
          setUpControl(newCtrl, dir, this.callSetDisabledState);
          dir.control = newCtrl;
        }
      }
    });
    this.form._updateTreeValidity({
      emitEvent: false
    });
  }
  _setUpFormContainer(dir) {
    const ctrl = this.form.get(dir.path);
    setUpFormContainer(ctrl, dir);
    ctrl.updateValueAndValidity({
      emitEvent: false
    });
  }
  _cleanUpFormContainer(dir) {
    const ctrl = this.form?.get(dir.path);
    if (ctrl) {
      const isControlUpdated = cleanUpFormContainer(ctrl, dir);
      if (isControlUpdated) {
        ctrl.updateValueAndValidity({
          emitEvent: false
        });
      }
    }
  }
  _updateRegistrations() {
    this.form._registerOnCollectionChange(this._onCollectionChange);
    this._oldForm?._registerOnCollectionChange(() => {
    });
  }
  _updateValidators() {
    setUpValidators(this.form, this);
    if (this._oldForm) {
      cleanUpValidators(this._oldForm, this);
    }
  }
  _checkFormPresent() {
    if (!this.form && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw missingFormException();
    }
  }
  static \u0275fac = function AbstractFormDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AbstractFormDirective)(\u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10), \u0275\u0275directiveInject(CALL_SET_DISABLED_STATE, 8));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _AbstractFormDirective,
    features: [\u0275\u0275InheritDefinitionFeature, \u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AbstractFormDirective, [{
    type: Directive
  }], () => [{
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_ASYNC_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [CALL_SET_DISABLED_STATE]
    }]
  }], null);
})();
var formDirectiveProvider$1 = {
  provide: ControlContainer,
  useExisting: forwardRef(() => FormArrayDirective)
};
var FormArrayDirective = class _FormArrayDirective extends AbstractFormDirective {
  form = null;
  ngSubmit = new EventEmitter();
  get control() {
    return this.form;
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275FormArrayDirective_BaseFactory;
    return function FormArrayDirective_Factory(__ngFactoryType__) {
      return (\u0275FormArrayDirective_BaseFactory || (\u0275FormArrayDirective_BaseFactory = \u0275\u0275getInheritedFactory(_FormArrayDirective)))(__ngFactoryType__ || _FormArrayDirective);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _FormArrayDirective,
    selectors: [["", "formArray", ""]],
    hostBindings: function FormArrayDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("submit", function FormArrayDirective_submit_HostBindingHandler($event) {
          return ctx.onSubmit($event);
        })("reset", function FormArrayDirective_reset_HostBindingHandler() {
          return ctx.onReset();
        });
      }
    },
    inputs: {
      form: [0, "formArray", "form"]
    },
    outputs: {
      ngSubmit: "ngSubmit"
    },
    exportAs: ["ngForm"],
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([formDirectiveProvider$1]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormArrayDirective, [{
    type: Directive,
    args: [{
      selector: "[formArray]",
      providers: [formDirectiveProvider$1],
      host: {
        "(submit)": "onSubmit($event)",
        "(reset)": "onReset()"
      },
      exportAs: "ngForm",
      standalone: false
    }]
  }], null, {
    form: [{
      type: Input,
      args: ["formArray"]
    }],
    ngSubmit: [{
      type: Output
    }]
  });
})();
var NG_MODEL_WITH_FORM_CONTROL_WARNING = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "NgModelWithFormControlWarning" : "");
var formControlBinding = {
  provide: NgControl,
  useExisting: forwardRef(() => FormControlDirective)
};
var FormControlDirective = class _FormControlDirective extends NgControl {
  _ngModelWarningConfig;
  callSetDisabledState;
  viewModel;
  form;
  set isDisabled(isDisabled) {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      console.warn(disabledAttrWarning);
    }
  }
  model;
  update = new EventEmitter();
  static _ngModelWarningSentOnce = false;
  _ngModelWarningSent = false;
  constructor(validators, asyncValidators, valueAccessors, _ngModelWarningConfig, callSetDisabledState) {
    super();
    this._ngModelWarningConfig = _ngModelWarningConfig;
    this.callSetDisabledState = callSetDisabledState;
    this._setValidators(validators);
    this._setAsyncValidators(asyncValidators);
    this.valueAccessor = selectValueAccessor(this, valueAccessors);
  }
  ngOnChanges(changes) {
    if (this._isControlChanged(changes)) {
      const previousForm = changes["form"].previousValue;
      if (previousForm) {
        cleanUpControl(previousForm, this, false);
      }
      setUpControl(this.form, this, this.callSetDisabledState);
      this.form.updateValueAndValidity({
        emitEvent: false
      });
    }
    if (isPropertyUpdated(changes, this.viewModel)) {
      if (typeof ngDevMode === "undefined" || ngDevMode) {
        _ngModelWarning("formControl", _FormControlDirective, this, this._ngModelWarningConfig);
      }
      this.form.setValue(this.model);
      this.viewModel = this.model;
    }
  }
  ngOnDestroy() {
    if (this.form) {
      cleanUpControl(this.form, this, false);
    }
  }
  get path() {
    return [];
  }
  get control() {
    return this.form;
  }
  viewToModelUpdate(newValue) {
    this.viewModel = newValue;
    this.update.emit(newValue);
  }
  _isControlChanged(changes) {
    return changes.hasOwnProperty("form");
  }
  static \u0275fac = function FormControlDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormControlDirective)(\u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10), \u0275\u0275directiveInject(NG_VALUE_ACCESSOR, 10), \u0275\u0275directiveInject(NG_MODEL_WITH_FORM_CONTROL_WARNING, 8), \u0275\u0275directiveInject(CALL_SET_DISABLED_STATE, 8));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _FormControlDirective,
    selectors: [["", "formControl", ""]],
    inputs: {
      form: [0, "formControl", "form"],
      isDisabled: [0, "disabled", "isDisabled"],
      model: [0, "ngModel", "model"]
    },
    outputs: {
      update: "ngModelChange"
    },
    exportAs: ["ngForm"],
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([formControlBinding]), \u0275\u0275InheritDefinitionFeature, \u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormControlDirective, [{
    type: Directive,
    args: [{
      selector: "[formControl]",
      providers: [formControlBinding],
      exportAs: "ngForm",
      standalone: false
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_ASYNC_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALUE_ACCESSOR]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [NG_MODEL_WITH_FORM_CONTROL_WARNING]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [CALL_SET_DISABLED_STATE]
    }]
  }], {
    form: [{
      type: Input,
      args: ["formControl"]
    }],
    isDisabled: [{
      type: Input,
      args: ["disabled"]
    }],
    model: [{
      type: Input,
      args: ["ngModel"]
    }],
    update: [{
      type: Output,
      args: ["ngModelChange"]
    }]
  });
})();
var formGroupNameProvider = {
  provide: ControlContainer,
  useExisting: forwardRef(() => FormGroupName)
};
var FormGroupName = class _FormGroupName extends AbstractFormGroupDirective {
  name = null;
  constructor(parent, validators, asyncValidators) {
    super();
    this._parent = parent;
    this._setValidators(validators);
    this._setAsyncValidators(asyncValidators);
  }
  _checkParentType() {
    if (hasInvalidParent(this._parent) && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw groupParentException();
    }
  }
  static \u0275fac = function FormGroupName_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormGroupName)(\u0275\u0275directiveInject(ControlContainer, 13), \u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _FormGroupName,
    selectors: [["", "formGroupName", ""]],
    inputs: {
      name: [0, "formGroupName", "name"]
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([formGroupNameProvider]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormGroupName, [{
    type: Directive,
    args: [{
      selector: "[formGroupName]",
      providers: [formGroupNameProvider],
      standalone: false
    }]
  }], () => [{
    type: ControlContainer,
    decorators: [{
      type: Optional
    }, {
      type: Host
    }, {
      type: SkipSelf
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_ASYNC_VALIDATORS]
    }]
  }], {
    name: [{
      type: Input,
      args: ["formGroupName"]
    }]
  });
})();
var formArrayNameProvider = {
  provide: ControlContainer,
  useExisting: forwardRef(() => FormArrayName)
};
var FormArrayName = class _FormArrayName extends ControlContainer {
  _parent;
  name = null;
  constructor(parent, validators, asyncValidators) {
    super();
    this._parent = parent;
    this._setValidators(validators);
    this._setAsyncValidators(asyncValidators);
  }
  ngOnInit() {
    if (hasInvalidParent(this._parent) && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw arrayParentException();
    }
    this.formDirective.addFormArray(this);
  }
  ngOnDestroy() {
    this.formDirective?.removeFormArray(this);
  }
  get control() {
    return this.formDirective.getFormArray(this);
  }
  get formDirective() {
    return this._parent ? this._parent.formDirective : null;
  }
  get path() {
    return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
  }
  static \u0275fac = function FormArrayName_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormArrayName)(\u0275\u0275directiveInject(ControlContainer, 13), \u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _FormArrayName,
    selectors: [["", "formArrayName", ""]],
    inputs: {
      name: [0, "formArrayName", "name"]
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([formArrayNameProvider]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormArrayName, [{
    type: Directive,
    args: [{
      selector: "[formArrayName]",
      providers: [formArrayNameProvider],
      standalone: false
    }]
  }], () => [{
    type: ControlContainer,
    decorators: [{
      type: Optional
    }, {
      type: Host
    }, {
      type: SkipSelf
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_ASYNC_VALIDATORS]
    }]
  }], {
    name: [{
      type: Input,
      args: ["formArrayName"]
    }]
  });
})();
function hasInvalidParent(parent) {
  return !(parent instanceof FormGroupName) && !(parent instanceof AbstractFormDirective) && !(parent instanceof FormArrayName);
}
var controlNameBinding = {
  provide: NgControl,
  useExisting: forwardRef(() => FormControlName)
};
var FormControlName = class _FormControlName extends NgControl {
  _ngModelWarningConfig;
  _added = false;
  viewModel;
  control;
  name = null;
  set isDisabled(isDisabled) {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      console.warn(disabledAttrWarning);
    }
  }
  model;
  update = new EventEmitter();
  static _ngModelWarningSentOnce = false;
  _ngModelWarningSent = false;
  constructor(parent, validators, asyncValidators, valueAccessors, _ngModelWarningConfig) {
    super();
    this._ngModelWarningConfig = _ngModelWarningConfig;
    this._parent = parent;
    this._setValidators(validators);
    this._setAsyncValidators(asyncValidators);
    this.valueAccessor = selectValueAccessor(this, valueAccessors);
  }
  ngOnChanges(changes) {
    if (!this._added) this._setUpControl();
    if (isPropertyUpdated(changes, this.viewModel)) {
      if (typeof ngDevMode === "undefined" || ngDevMode) {
        _ngModelWarning("formControlName", _FormControlName, this, this._ngModelWarningConfig);
      }
      this.viewModel = this.model;
      this.formDirective.updateModel(this, this.model);
    }
  }
  ngOnDestroy() {
    this.formDirective?.removeControl(this);
  }
  viewToModelUpdate(newValue) {
    this.viewModel = newValue;
    this.update.emit(newValue);
  }
  get path() {
    return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
  }
  get formDirective() {
    return this._parent ? this._parent.formDirective : null;
  }
  _setUpControl() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      checkParentType(this._parent, this.name);
    }
    this.control = this.formDirective.addControl(this);
    this._added = true;
  }
  static \u0275fac = function FormControlName_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormControlName)(\u0275\u0275directiveInject(ControlContainer, 13), \u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10), \u0275\u0275directiveInject(NG_VALUE_ACCESSOR, 10), \u0275\u0275directiveInject(NG_MODEL_WITH_FORM_CONTROL_WARNING, 8));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _FormControlName,
    selectors: [["", "formControlName", ""]],
    inputs: {
      name: [0, "formControlName", "name"],
      isDisabled: [0, "disabled", "isDisabled"],
      model: [0, "ngModel", "model"]
    },
    outputs: {
      update: "ngModelChange"
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([controlNameBinding]), \u0275\u0275InheritDefinitionFeature, \u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormControlName, [{
    type: Directive,
    args: [{
      selector: "[formControlName]",
      providers: [controlNameBinding],
      standalone: false
    }]
  }], () => [{
    type: ControlContainer,
    decorators: [{
      type: Optional
    }, {
      type: Host
    }, {
      type: SkipSelf
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_ASYNC_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALUE_ACCESSOR]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [NG_MODEL_WITH_FORM_CONTROL_WARNING]
    }]
  }], {
    name: [{
      type: Input,
      args: ["formControlName"]
    }],
    isDisabled: [{
      type: Input,
      args: ["disabled"]
    }],
    model: [{
      type: Input,
      args: ["ngModel"]
    }],
    update: [{
      type: Output,
      args: ["ngModelChange"]
    }]
  });
})();
function checkParentType(parent, name) {
  if (!(parent instanceof FormGroupName) && parent instanceof AbstractFormGroupDirective) {
    throw ngModelGroupException();
  } else if (!(parent instanceof FormGroupName) && !(parent instanceof AbstractFormDirective) && !(parent instanceof FormArrayName)) {
    throw controlParentException(name);
  }
}
var formDirectiveProvider = {
  provide: ControlContainer,
  useExisting: forwardRef(() => FormGroupDirective)
};
var FormGroupDirective = class _FormGroupDirective extends AbstractFormDirective {
  form = null;
  ngSubmit = new EventEmitter();
  get control() {
    return this.form;
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275FormGroupDirective_BaseFactory;
    return function FormGroupDirective_Factory(__ngFactoryType__) {
      return (\u0275FormGroupDirective_BaseFactory || (\u0275FormGroupDirective_BaseFactory = \u0275\u0275getInheritedFactory(_FormGroupDirective)))(__ngFactoryType__ || _FormGroupDirective);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _FormGroupDirective,
    selectors: [["", "formGroup", ""]],
    hostBindings: function FormGroupDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("submit", function FormGroupDirective_submit_HostBindingHandler($event) {
          return ctx.onSubmit($event);
        })("reset", function FormGroupDirective_reset_HostBindingHandler() {
          return ctx.onReset();
        });
      }
    },
    inputs: {
      form: [0, "formGroup", "form"]
    },
    outputs: {
      ngSubmit: "ngSubmit"
    },
    exportAs: ["ngForm"],
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([formDirectiveProvider]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormGroupDirective, [{
    type: Directive,
    args: [{
      selector: "[formGroup]",
      providers: [formDirectiveProvider],
      host: {
        "(submit)": "onSubmit($event)",
        "(reset)": "onReset()"
      },
      exportAs: "ngForm",
      standalone: false
    }]
  }], null, {
    form: [{
      type: Input,
      args: ["formGroup"]
    }],
    ngSubmit: [{
      type: Output
    }]
  });
})();
var SELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectControlValueAccessor),
  multi: true
};
function _buildValueString$1(id, value) {
  if (id == null) return `${value}`;
  if (value && typeof value === "object") value = "Object";
  return `${id}: ${value}`.slice(0, 50);
}
function _extractId$1(valueString) {
  return valueString.split(":")[0];
}
var SelectControlValueAccessor = class _SelectControlValueAccessor extends BuiltInControlValueAccessor {
  value;
  _optionMap = /* @__PURE__ */ new Map();
  _idCounter = 0;
  set compareWith(fn) {
    if (typeof fn !== "function" && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw new RuntimeError(1201, `compareWith must be a function, but received ${JSON.stringify(fn)}`);
    }
    this._compareWith = fn;
  }
  _compareWith = Object.is;
  appRefInjector = inject(ApplicationRef).injector;
  destroyRef = inject(DestroyRef);
  cdr = inject(ChangeDetectorRef);
  _queuedWrite = false;
  _writeValueAfterRender() {
    if (this._queuedWrite || this.appRefInjector.destroyed) {
      return;
    }
    this._queuedWrite = true;
    afterNextRender({
      write: () => {
        if (this.destroyRef.destroyed) {
          return;
        }
        this._queuedWrite = false;
        this.writeValue(this.value);
      }
    }, {
      injector: this.appRefInjector
    });
  }
  writeValue(value) {
    this.cdr.markForCheck();
    this.value = value;
    const id = this._getOptionId(value);
    const valueString = _buildValueString$1(id, value);
    this.setProperty("value", valueString);
  }
  registerOnChange(fn) {
    this.onChange = (valueString) => {
      this.value = this._getOptionValue(valueString);
      fn(this.value);
    };
  }
  _registerOption() {
    return (this._idCounter++).toString();
  }
  _getOptionId(value) {
    for (const id of this._optionMap.keys()) {
      if (this._compareWith(this._optionMap.get(id), value)) return id;
    }
    return null;
  }
  _getOptionValue(valueString) {
    const id = _extractId$1(valueString);
    return this._optionMap.has(id) ? this._optionMap.get(id) : valueString;
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275SelectControlValueAccessor_BaseFactory;
    return function SelectControlValueAccessor_Factory(__ngFactoryType__) {
      return (\u0275SelectControlValueAccessor_BaseFactory || (\u0275SelectControlValueAccessor_BaseFactory = \u0275\u0275getInheritedFactory(_SelectControlValueAccessor)))(__ngFactoryType__ || _SelectControlValueAccessor);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _SelectControlValueAccessor,
    selectors: [["select", "formControlName", "", 3, "multiple", ""], ["select", "formControl", "", 3, "multiple", ""], ["select", "ngModel", "", 3, "multiple", ""]],
    hostBindings: function SelectControlValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("change", function SelectControlValueAccessor_change_HostBindingHandler($event) {
          return ctx.onChange($event.target.value);
        })("blur", function SelectControlValueAccessor_blur_HostBindingHandler() {
          return ctx.onTouched();
        });
      }
    },
    inputs: {
      compareWith: "compareWith"
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([SELECT_VALUE_ACCESSOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectControlValueAccessor, [{
    type: Directive,
    args: [{
      selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]",
      host: {
        "(change)": "onChange($any($event.target).value)",
        "(blur)": "onTouched()"
      },
      providers: [SELECT_VALUE_ACCESSOR],
      standalone: false
    }]
  }], null, {
    compareWith: [{
      type: Input
    }]
  });
})();
var NgSelectOption = class _NgSelectOption {
  _element;
  _renderer;
  _select;
  id;
  constructor(_element, _renderer, _select) {
    this._element = _element;
    this._renderer = _renderer;
    this._select = _select;
    if (this._select) this.id = this._select._registerOption();
  }
  set ngValue(value) {
    if (this._select == null) return;
    this._select._optionMap.set(this.id, value);
    this._setElementValue(_buildValueString$1(this.id, value));
    this._select._writeValueAfterRender();
  }
  set value(value) {
    this._setElementValue(value);
    this._select?._writeValueAfterRender();
  }
  _setElementValue(value) {
    this._renderer.setProperty(this._element.nativeElement, "value", value);
  }
  ngOnDestroy() {
    this._select?._optionMap.delete(this.id);
    this._select?._writeValueAfterRender();
  }
  static \u0275fac = function NgSelectOption_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgSelectOption)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(SelectControlValueAccessor, 9));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NgSelectOption,
    selectors: [["option"]],
    inputs: {
      ngValue: "ngValue",
      value: "value"
    },
    standalone: false
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgSelectOption, [{
    type: Directive,
    args: [{
      selector: "option",
      standalone: false
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: SelectControlValueAccessor,
    decorators: [{
      type: Optional
    }, {
      type: Host
    }]
  }], {
    ngValue: [{
      type: Input,
      args: ["ngValue"]
    }],
    value: [{
      type: Input,
      args: ["value"]
    }]
  });
})();
var SELECT_MULTIPLE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectMultipleControlValueAccessor),
  multi: true
};
function _buildValueString(id, value) {
  if (id == null) return `${value}`;
  if (typeof value === "string") value = `'${value}'`;
  if (value && typeof value === "object") value = "Object";
  return `${id}: ${value}`.slice(0, 50);
}
function _extractId(valueString) {
  return valueString.split(":")[0];
}
var SelectMultipleControlValueAccessor = class _SelectMultipleControlValueAccessor extends BuiltInControlValueAccessor {
  value;
  _optionMap = /* @__PURE__ */ new Map();
  _idCounter = 0;
  set compareWith(fn) {
    if (typeof fn !== "function" && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw new RuntimeError(1201, `compareWith must be a function, but received ${JSON.stringify(fn)}`);
    }
    this._compareWith = fn;
  }
  _compareWith = Object.is;
  writeValue(value) {
    this.value = value;
    let optionSelectedStateSetter;
    if (Array.isArray(value)) {
      const ids = value.map((v) => this._getOptionId(v));
      optionSelectedStateSetter = (opt, o) => {
        opt._setSelected(ids.indexOf(o.toString()) > -1);
      };
    } else {
      optionSelectedStateSetter = (opt, o) => {
        opt._setSelected(false);
      };
    }
    this._optionMap.forEach(optionSelectedStateSetter);
  }
  registerOnChange(fn) {
    this.onChange = (element) => {
      const selected = [];
      const selectedOptions = element.selectedOptions;
      if (selectedOptions !== void 0) {
        const options = selectedOptions;
        for (let i = 0; i < options.length; i++) {
          const opt = options[i];
          const val = this._getOptionValue(opt.value);
          selected.push(val);
        }
      } else {
        const options = element.options;
        for (let i = 0; i < options.length; i++) {
          const opt = options[i];
          if (opt.selected) {
            const val = this._getOptionValue(opt.value);
            selected.push(val);
          }
        }
      }
      this.value = selected;
      fn(selected);
    };
  }
  _registerOption(value) {
    const id = (this._idCounter++).toString();
    this._optionMap.set(id, value);
    return id;
  }
  _getOptionId(value) {
    for (const id of this._optionMap.keys()) {
      if (this._compareWith(this._optionMap.get(id)._value, value)) return id;
    }
    return null;
  }
  _getOptionValue(valueString) {
    const id = _extractId(valueString);
    return this._optionMap.has(id) ? this._optionMap.get(id)._value : valueString;
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275SelectMultipleControlValueAccessor_BaseFactory;
    return function SelectMultipleControlValueAccessor_Factory(__ngFactoryType__) {
      return (\u0275SelectMultipleControlValueAccessor_BaseFactory || (\u0275SelectMultipleControlValueAccessor_BaseFactory = \u0275\u0275getInheritedFactory(_SelectMultipleControlValueAccessor)))(__ngFactoryType__ || _SelectMultipleControlValueAccessor);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _SelectMultipleControlValueAccessor,
    selectors: [["select", "multiple", "", "formControlName", ""], ["select", "multiple", "", "formControl", ""], ["select", "multiple", "", "ngModel", ""]],
    hostBindings: function SelectMultipleControlValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("change", function SelectMultipleControlValueAccessor_change_HostBindingHandler($event) {
          return ctx.onChange($event.target);
        })("blur", function SelectMultipleControlValueAccessor_blur_HostBindingHandler() {
          return ctx.onTouched();
        });
      }
    },
    inputs: {
      compareWith: "compareWith"
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([SELECT_MULTIPLE_VALUE_ACCESSOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectMultipleControlValueAccessor, [{
    type: Directive,
    args: [{
      selector: "select[multiple][formControlName],select[multiple][formControl],select[multiple][ngModel]",
      host: {
        "(change)": "onChange($event.target)",
        "(blur)": "onTouched()"
      },
      providers: [SELECT_MULTIPLE_VALUE_ACCESSOR],
      standalone: false
    }]
  }], null, {
    compareWith: [{
      type: Input
    }]
  });
})();
var \u0275NgSelectMultipleOption = class _\u0275NgSelectMultipleOption {
  _element;
  _renderer;
  _select;
  id;
  _value;
  constructor(_element, _renderer, _select) {
    this._element = _element;
    this._renderer = _renderer;
    this._select = _select;
    if (this._select) {
      this.id = this._select._registerOption(this);
    }
  }
  set ngValue(value) {
    if (this._select == null) return;
    this._value = value;
    this._setElementValue(_buildValueString(this.id, value));
    this._select.writeValue(this._select.value);
  }
  set value(value) {
    if (this._select) {
      this._value = value;
      this._setElementValue(_buildValueString(this.id, value));
      this._select.writeValue(this._select.value);
    } else {
      this._setElementValue(value);
    }
  }
  _setElementValue(value) {
    this._renderer.setProperty(this._element.nativeElement, "value", value);
  }
  _setSelected(selected) {
    this._renderer.setProperty(this._element.nativeElement, "selected", selected);
  }
  ngOnDestroy() {
    if (this._select) {
      this._select._optionMap.delete(this.id);
      this._select.writeValue(this._select.value);
    }
  }
  static \u0275fac = function \u0275NgSelectMultipleOption_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _\u0275NgSelectMultipleOption)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(SelectMultipleControlValueAccessor, 9));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _\u0275NgSelectMultipleOption,
    selectors: [["option"]],
    inputs: {
      ngValue: "ngValue",
      value: "value"
    },
    standalone: false
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(\u0275NgSelectMultipleOption, [{
    type: Directive,
    args: [{
      selector: "option",
      standalone: false
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: SelectMultipleControlValueAccessor,
    decorators: [{
      type: Optional
    }, {
      type: Host
    }]
  }], {
    ngValue: [{
      type: Input,
      args: ["ngValue"]
    }],
    value: [{
      type: Input,
      args: ["value"]
    }]
  });
})();
function toInteger(value) {
  return typeof value === "number" ? value : parseInt(value, 10);
}
function toFloat(value) {
  return typeof value === "number" ? value : parseFloat(value);
}
var AbstractValidatorDirective = class _AbstractValidatorDirective {
  _validator = nullValidator;
  _onChange;
  _enabled;
  ngOnChanges(changes) {
    if (this.inputName in changes) {
      const input = this.normalizeInput(changes[this.inputName].currentValue);
      this._enabled = this.enabled(input);
      this._validator = this._enabled ? this.createValidator(input) : nullValidator;
      this._onChange?.();
    }
  }
  validate(control) {
    return this._validator(control);
  }
  registerOnValidatorChange(fn) {
    this._onChange = fn;
  }
  enabled(input) {
    return input != null;
  }
  static \u0275fac = function AbstractValidatorDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AbstractValidatorDirective)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _AbstractValidatorDirective,
    features: [\u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AbstractValidatorDirective, [{
    type: Directive
  }], null, null);
})();
var MAX_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MaxValidator),
  multi: true
};
var MaxValidator = class _MaxValidator extends AbstractValidatorDirective {
  max;
  inputName = "max";
  normalizeInput = (input) => toFloat(input);
  createValidator = (max) => maxValidator(max);
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MaxValidator_BaseFactory;
    return function MaxValidator_Factory(__ngFactoryType__) {
      return (\u0275MaxValidator_BaseFactory || (\u0275MaxValidator_BaseFactory = \u0275\u0275getInheritedFactory(_MaxValidator)))(__ngFactoryType__ || _MaxValidator);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MaxValidator,
    selectors: [["input", "type", "number", "max", "", "formControlName", ""], ["input", "type", "number", "max", "", "formControl", ""], ["input", "type", "number", "max", "", "ngModel", ""]],
    hostVars: 1,
    hostBindings: function MaxValidator_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("max", ctx._enabled ? ctx.max : null);
      }
    },
    inputs: {
      max: "max"
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([MAX_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MaxValidator, [{
    type: Directive,
    args: [{
      selector: "input[type=number][max][formControlName],input[type=number][max][formControl],input[type=number][max][ngModel]",
      providers: [MAX_VALIDATOR],
      host: {
        "[attr.max]": "_enabled ? max : null"
      },
      standalone: false
    }]
  }], null, {
    max: [{
      type: Input
    }]
  });
})();
var MIN_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MinValidator),
  multi: true
};
var MinValidator = class _MinValidator extends AbstractValidatorDirective {
  min;
  inputName = "min";
  normalizeInput = (input) => toFloat(input);
  createValidator = (min) => minValidator(min);
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MinValidator_BaseFactory;
    return function MinValidator_Factory(__ngFactoryType__) {
      return (\u0275MinValidator_BaseFactory || (\u0275MinValidator_BaseFactory = \u0275\u0275getInheritedFactory(_MinValidator)))(__ngFactoryType__ || _MinValidator);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MinValidator,
    selectors: [["input", "type", "number", "min", "", "formControlName", ""], ["input", "type", "number", "min", "", "formControl", ""], ["input", "type", "number", "min", "", "ngModel", ""]],
    hostVars: 1,
    hostBindings: function MinValidator_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("min", ctx._enabled ? ctx.min : null);
      }
    },
    inputs: {
      min: "min"
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([MIN_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MinValidator, [{
    type: Directive,
    args: [{
      selector: "input[type=number][min][formControlName],input[type=number][min][formControl],input[type=number][min][ngModel]",
      providers: [MIN_VALIDATOR],
      host: {
        "[attr.min]": "_enabled ? min : null"
      },
      standalone: false
    }]
  }], null, {
    min: [{
      type: Input
    }]
  });
})();
var REQUIRED_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => RequiredValidator),
  multi: true
};
var CHECKBOX_REQUIRED_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => CheckboxRequiredValidator),
  multi: true
};
var RequiredValidator = class _RequiredValidator extends AbstractValidatorDirective {
  required;
  inputName = "required";
  normalizeInput = booleanAttribute;
  createValidator = (input) => requiredValidator;
  enabled(input) {
    return input;
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275RequiredValidator_BaseFactory;
    return function RequiredValidator_Factory(__ngFactoryType__) {
      return (\u0275RequiredValidator_BaseFactory || (\u0275RequiredValidator_BaseFactory = \u0275\u0275getInheritedFactory(_RequiredValidator)))(__ngFactoryType__ || _RequiredValidator);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _RequiredValidator,
    selectors: [["", "required", "", "formControlName", "", 3, "type", "checkbox"], ["", "required", "", "formControl", "", 3, "type", "checkbox"], ["", "required", "", "ngModel", "", 3, "type", "checkbox"]],
    hostVars: 1,
    hostBindings: function RequiredValidator_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("required", ctx._enabled ? "" : null);
      }
    },
    inputs: {
      required: "required"
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([REQUIRED_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RequiredValidator, [{
    type: Directive,
    args: [{
      selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]",
      providers: [REQUIRED_VALIDATOR],
      host: {
        "[attr.required]": '_enabled ? "" : null'
      },
      standalone: false
    }]
  }], null, {
    required: [{
      type: Input
    }]
  });
})();
var CheckboxRequiredValidator = class _CheckboxRequiredValidator extends RequiredValidator {
  createValidator = (input) => requiredTrueValidator;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275CheckboxRequiredValidator_BaseFactory;
    return function CheckboxRequiredValidator_Factory(__ngFactoryType__) {
      return (\u0275CheckboxRequiredValidator_BaseFactory || (\u0275CheckboxRequiredValidator_BaseFactory = \u0275\u0275getInheritedFactory(_CheckboxRequiredValidator)))(__ngFactoryType__ || _CheckboxRequiredValidator);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CheckboxRequiredValidator,
    selectors: [["input", "type", "checkbox", "required", "", "formControlName", ""], ["input", "type", "checkbox", "required", "", "formControl", ""], ["input", "type", "checkbox", "required", "", "ngModel", ""]],
    hostVars: 1,
    hostBindings: function CheckboxRequiredValidator_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("required", ctx._enabled ? "" : null);
      }
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([CHECKBOX_REQUIRED_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckboxRequiredValidator, [{
    type: Directive,
    args: [{
      selector: "input[type=checkbox][required][formControlName],input[type=checkbox][required][formControl],input[type=checkbox][required][ngModel]",
      providers: [CHECKBOX_REQUIRED_VALIDATOR],
      host: {
        "[attr.required]": '_enabled ? "" : null'
      },
      standalone: false
    }]
  }], null, null);
})();
var EMAIL_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => EmailValidator),
  multi: true
};
var EmailValidator = class _EmailValidator extends AbstractValidatorDirective {
  email;
  inputName = "email";
  normalizeInput = booleanAttribute;
  createValidator = (input) => emailValidator;
  enabled(input) {
    return input;
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275EmailValidator_BaseFactory;
    return function EmailValidator_Factory(__ngFactoryType__) {
      return (\u0275EmailValidator_BaseFactory || (\u0275EmailValidator_BaseFactory = \u0275\u0275getInheritedFactory(_EmailValidator)))(__ngFactoryType__ || _EmailValidator);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _EmailValidator,
    selectors: [["", "email", "", "formControlName", ""], ["", "email", "", "formControl", ""], ["", "email", "", "ngModel", ""]],
    inputs: {
      email: "email"
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([EMAIL_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmailValidator, [{
    type: Directive,
    args: [{
      selector: "[email][formControlName],[email][formControl],[email][ngModel]",
      providers: [EMAIL_VALIDATOR],
      standalone: false
    }]
  }], null, {
    email: [{
      type: Input
    }]
  });
})();
var MIN_LENGTH_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MinLengthValidator),
  multi: true
};
var MinLengthValidator = class _MinLengthValidator extends AbstractValidatorDirective {
  minlength;
  inputName = "minlength";
  normalizeInput = (input) => toInteger(input);
  createValidator = (minlength) => minLengthValidator(minlength);
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MinLengthValidator_BaseFactory;
    return function MinLengthValidator_Factory(__ngFactoryType__) {
      return (\u0275MinLengthValidator_BaseFactory || (\u0275MinLengthValidator_BaseFactory = \u0275\u0275getInheritedFactory(_MinLengthValidator)))(__ngFactoryType__ || _MinLengthValidator);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MinLengthValidator,
    selectors: [["", "minlength", "", "formControlName", ""], ["", "minlength", "", "formControl", ""], ["", "minlength", "", "ngModel", ""]],
    hostVars: 1,
    hostBindings: function MinLengthValidator_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("minlength", ctx._enabled ? ctx.minlength : null);
      }
    },
    inputs: {
      minlength: "minlength"
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([MIN_LENGTH_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MinLengthValidator, [{
    type: Directive,
    args: [{
      selector: "[minlength][formControlName],[minlength][formControl],[minlength][ngModel]",
      providers: [MIN_LENGTH_VALIDATOR],
      host: {
        "[attr.minlength]": "_enabled ? minlength : null"
      },
      standalone: false
    }]
  }], null, {
    minlength: [{
      type: Input
    }]
  });
})();
var MAX_LENGTH_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MaxLengthValidator),
  multi: true
};
var MaxLengthValidator = class _MaxLengthValidator extends AbstractValidatorDirective {
  maxlength;
  inputName = "maxlength";
  normalizeInput = (input) => toInteger(input);
  createValidator = (maxlength) => maxLengthValidator(maxlength);
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MaxLengthValidator_BaseFactory;
    return function MaxLengthValidator_Factory(__ngFactoryType__) {
      return (\u0275MaxLengthValidator_BaseFactory || (\u0275MaxLengthValidator_BaseFactory = \u0275\u0275getInheritedFactory(_MaxLengthValidator)))(__ngFactoryType__ || _MaxLengthValidator);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MaxLengthValidator,
    selectors: [["", "maxlength", "", "formControlName", ""], ["", "maxlength", "", "formControl", ""], ["", "maxlength", "", "ngModel", ""]],
    hostVars: 1,
    hostBindings: function MaxLengthValidator_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("maxlength", ctx._enabled ? ctx.maxlength : null);
      }
    },
    inputs: {
      maxlength: "maxlength"
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([MAX_LENGTH_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MaxLengthValidator, [{
    type: Directive,
    args: [{
      selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]",
      providers: [MAX_LENGTH_VALIDATOR],
      host: {
        "[attr.maxlength]": "_enabled ? maxlength : null"
      },
      standalone: false
    }]
  }], null, {
    maxlength: [{
      type: Input
    }]
  });
})();
var PATTERN_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => PatternValidator),
  multi: true
};
var PatternValidator = class _PatternValidator extends AbstractValidatorDirective {
  pattern;
  inputName = "pattern";
  normalizeInput = (input) => input;
  createValidator = (input) => patternValidator(input);
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275PatternValidator_BaseFactory;
    return function PatternValidator_Factory(__ngFactoryType__) {
      return (\u0275PatternValidator_BaseFactory || (\u0275PatternValidator_BaseFactory = \u0275\u0275getInheritedFactory(_PatternValidator)))(__ngFactoryType__ || _PatternValidator);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _PatternValidator,
    selectors: [["", "pattern", "", "formControlName", ""], ["", "pattern", "", "formControl", ""], ["", "pattern", "", "ngModel", ""]],
    hostVars: 1,
    hostBindings: function PatternValidator_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("pattern", ctx._enabled ? ctx.pattern : null);
      }
    },
    inputs: {
      pattern: "pattern"
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([PATTERN_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PatternValidator, [{
    type: Directive,
    args: [{
      selector: "[pattern][formControlName],[pattern][formControl],[pattern][ngModel]",
      providers: [PATTERN_VALIDATOR],
      host: {
        "[attr.pattern]": "_enabled ? pattern : null"
      },
      standalone: false
    }]
  }], null, {
    pattern: [{
      type: Input
    }]
  });
})();
var SHARED_FORM_DIRECTIVES = [\u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, RangeValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, SelectMultipleControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, MaxLengthValidator, PatternValidator, CheckboxRequiredValidator, EmailValidator, MinValidator, MaxValidator];
var TEMPLATE_DRIVEN_DIRECTIVES = [NgModel, NgModelGroup, NgForm];
var REACTIVE_DRIVEN_DIRECTIVES = [FormControlDirective, FormGroupDirective, FormArrayDirective, FormControlName, FormGroupName, FormArrayName];
var \u0275InternalFormsSharedModule = class _\u0275InternalFormsSharedModule {
  static \u0275fac = function \u0275InternalFormsSharedModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _\u0275InternalFormsSharedModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _\u0275InternalFormsSharedModule,
    declarations: [\u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, RangeValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, SelectMultipleControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, MaxLengthValidator, PatternValidator, CheckboxRequiredValidator, EmailValidator, MinValidator, MaxValidator],
    exports: [\u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, RangeValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, SelectMultipleControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, MaxLengthValidator, PatternValidator, CheckboxRequiredValidator, EmailValidator, MinValidator, MaxValidator]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(\u0275InternalFormsSharedModule, [{
    type: NgModule,
    args: [{
      declarations: SHARED_FORM_DIRECTIVES,
      exports: SHARED_FORM_DIRECTIVES
    }]
  }], null, null);
})();
function isAbstractControlOptions(options) {
  return !!options && (options.asyncValidators !== void 0 || options.validators !== void 0 || options.updateOn !== void 0);
}
var FormBuilder = class _FormBuilder {
  useNonNullable = false;
  get nonNullable() {
    const nnfb = new _FormBuilder();
    nnfb.useNonNullable = true;
    return nnfb;
  }
  group(controls, options = null) {
    const reducedControls = this._reduceControls(controls);
    let newOptions = {};
    if (isAbstractControlOptions(options)) {
      newOptions = options;
    } else if (options !== null) {
      newOptions.validators = options.validator;
      newOptions.asyncValidators = options.asyncValidator;
    }
    return new FormGroup(reducedControls, newOptions);
  }
  record(controls, options = null) {
    const reducedControls = this._reduceControls(controls);
    return new FormRecord(reducedControls, options);
  }
  control(formState, validatorOrOpts, asyncValidator) {
    let newOptions = {};
    if (!this.useNonNullable) {
      return new FormControl(formState, validatorOrOpts, asyncValidator);
    }
    if (isAbstractControlOptions(validatorOrOpts)) {
      newOptions = validatorOrOpts;
    } else {
      newOptions.validators = validatorOrOpts;
      newOptions.asyncValidators = asyncValidator;
    }
    return new FormControl(formState, __spreadProps(__spreadValues({}, newOptions), {
      nonNullable: true
    }));
  }
  array(controls, validatorOrOpts, asyncValidator) {
    const createdControls = controls.map((c) => this._createControl(c));
    return new FormArray(createdControls, validatorOrOpts, asyncValidator);
  }
  _reduceControls(controls) {
    const createdControls = {};
    Object.keys(controls).forEach((controlName) => {
      createdControls[controlName] = this._createControl(controls[controlName]);
    });
    return createdControls;
  }
  _createControl(controls) {
    if (controls instanceof FormControl) {
      return controls;
    } else if (controls instanceof AbstractControl) {
      return controls;
    } else if (Array.isArray(controls)) {
      const value = controls[0];
      const validator = controls.length > 1 ? controls[1] : null;
      const asyncValidator = controls.length > 2 ? controls[2] : null;
      return this.control(value, validator, asyncValidator);
    } else {
      return this.control(controls);
    }
  }
  static \u0275fac = function FormBuilder_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormBuilder)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _FormBuilder,
    factory: _FormBuilder.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var NonNullableFormBuilder = class _NonNullableFormBuilder {
  static \u0275fac = function NonNullableFormBuilder_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NonNullableFormBuilder)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _NonNullableFormBuilder,
    factory: () => (() => inject(FormBuilder).nonNullable)(),
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NonNullableFormBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root",
      useFactory: () => inject(FormBuilder).nonNullable
    }]
  }], null, null);
})();
var UntypedFormBuilder = class _UntypedFormBuilder extends FormBuilder {
  group(controlsConfig, options = null) {
    return super.group(controlsConfig, options);
  }
  control(formState, validatorOrOpts, asyncValidator) {
    return super.control(formState, validatorOrOpts, asyncValidator);
  }
  array(controlsConfig, validatorOrOpts, asyncValidator) {
    return super.array(controlsConfig, validatorOrOpts, asyncValidator);
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275UntypedFormBuilder_BaseFactory;
    return function UntypedFormBuilder_Factory(__ngFactoryType__) {
      return (\u0275UntypedFormBuilder_BaseFactory || (\u0275UntypedFormBuilder_BaseFactory = \u0275\u0275getInheritedFactory(_UntypedFormBuilder)))(__ngFactoryType__ || _UntypedFormBuilder);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _UntypedFormBuilder,
    factory: _UntypedFormBuilder.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UntypedFormBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var FormsModule = class _FormsModule {
  static withConfig(opts) {
    return {
      ngModule: _FormsModule,
      providers: [{
        provide: CALL_SET_DISABLED_STATE,
        useValue: opts.callSetDisabledState ?? setDisabledStateDefault
      }]
    };
  }
  static \u0275fac = function FormsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormsModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _FormsModule,
    declarations: [NgModel, NgModelGroup, NgForm],
    exports: [\u0275InternalFormsSharedModule, NgModel, NgModelGroup, NgForm]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [\u0275InternalFormsSharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormsModule, [{
    type: NgModule,
    args: [{
      declarations: TEMPLATE_DRIVEN_DIRECTIVES,
      exports: [\u0275InternalFormsSharedModule, TEMPLATE_DRIVEN_DIRECTIVES]
    }]
  }], null, null);
})();
var ReactiveFormsModule = class _ReactiveFormsModule {
  static withConfig(opts) {
    return {
      ngModule: _ReactiveFormsModule,
      providers: [{
        provide: NG_MODEL_WITH_FORM_CONTROL_WARNING,
        useValue: opts.warnOnNgModelWithFormControl ?? "always"
      }, {
        provide: CALL_SET_DISABLED_STATE,
        useValue: opts.callSetDisabledState ?? setDisabledStateDefault
      }]
    };
  }
  static \u0275fac = function ReactiveFormsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReactiveFormsModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _ReactiveFormsModule,
    declarations: [FormControlDirective, FormGroupDirective, FormArrayDirective, FormControlName, FormGroupName, FormArrayName],
    exports: [\u0275InternalFormsSharedModule, FormControlDirective, FormGroupDirective, FormArrayDirective, FormControlName, FormGroupName, FormArrayName]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [\u0275InternalFormsSharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReactiveFormsModule, [{
    type: NgModule,
    args: [{
      declarations: [REACTIVE_DRIVEN_DIRECTIVES],
      exports: [\u0275InternalFormsSharedModule, REACTIVE_DRIVEN_DIRECTIVES]
    }]
  }], null, null);
})();

export {
  LocationStrategy,
  PathLocationStrategy,
  Location,
  HashLocationStrategy,
  NgClass,
  NgStyle,
  NgTemplateOutlet,
  DatePipe,
  CommonModule,
  PRECOMMIT_HANDLER_SUPPORTED,
  PlatformNavigation,
  registerLocaleData2 as registerLocaleData,
  PLATFORM_BROWSER_ID,
  ViewportScroller,
  Activity,
  ArrowLeftRight,
  ArrowLeft,
  ArrowRight,
  Baby,
  BadgeCheck,
  Bell,
  BookOpen,
  Cake,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  CalendarX,
  Calendar,
  ChartBar,
  ChartNoAxesColumn,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleCheckBig,
  CircleCheck,
  CirclePlus,
  CircleQuestionMark,
  ClipboardList,
  Clock,
  Cloud,
  Database,
  Download,
  Droplet,
  Dumbbell,
  EyeOff,
  Eye,
  FileCheck,
  FilePlus,
  FileText,
  FlaskConical,
  FolderOpen,
  Globe,
  Hand,
  HeartPulse,
  Heart,
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
  Menu,
  Palette,
  PartyPopper,
  Pencil,
  Pill,
  Plus,
  RefreshCw,
  Ruler,
  Save,
  Scale,
  Settings,
  Shield,
  Stethoscope,
  Syringe,
  Target,
  ThermometerSun,
  Thermometer,
  Trash2,
  Trash,
  TriangleAlert,
  TrendingUp,
  UserPlus,
  User,
  Users,
  Waves,
  WifiOff,
  X,
  Zap,
  LucideAngularComponent,
  LucideAngularModule,
  DefaultValueAccessor,
  NgControlStatus,
  NgModel,
  NumberValueAccessor,
  RadioControlValueAccessor,
  SelectControlValueAccessor,
  NgSelectOption,
  ɵNgSelectMultipleOption,
  MaxValidator,
  MinValidator,
  MaxLengthValidator,
  FormsModule
};
//# sourceMappingURL=chunk-IFHIJ3FQ.js.map
