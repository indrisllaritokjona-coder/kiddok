import {
  I18nService
} from "./chunk-IK3YYCP3.js";
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  inject,
  setClassMetadata,
  ɵɵdefineDirective,
  ɵɵlistener
} from "./chunk-SFGRG2UU.js";

// src/app/directives/tooltip.directive.ts
var TooltipDirective = class _TooltipDirective {
  constructor() {
    this.tooltipPosition = "top";
    this.tooltipDelay = 300;
    this.el = inject(ElementRef);
    this.i18n = inject(I18nService);
    this._timeoutId = null;
    this._visible = false;
    this._tooltipEl = null;
  }
  get key() {
    return this.tooltipKey ?? this.appTooltip ?? "";
  }
  // ── Lifecycle ────────────────────────────────────────────────────
  ngOnInit() {
    const hostEl = this.el.nativeElement;
    const style = hostEl.style;
    if (!style.position || style.position === "static") {
      style.position = "relative";
    }
  }
  ngOnDestroy() {
    this._clearTimeout();
    this._hideTooltip();
  }
  // ── Event handlers ───────────────────────────────────────────────
  onMouseEnter() {
    this._timeoutId = setTimeout(() => this._showTooltip(), this.tooltipDelay);
  }
  onMouseLeave() {
    this._clearTimeout();
    this._hideTooltip();
  }
  onFocus() {
    this._timeoutId = setTimeout(() => this._showTooltip(), this.tooltipDelay);
  }
  onBlur() {
    this._clearTimeout();
    this._hideTooltip();
  }
  // ── Private helpers ──────────────────────────────────────────────
  _clearTimeout() {
    if (this._timeoutId !== null) {
      clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }
  }
  _showTooltip() {
    if (this._visible || !this.key)
      return;
    this._visible = true;
    const t = this.i18n.t();
    const text = t[this.key] ?? this.key;
    const tip = document.createElement("div");
    tip.setAttribute("role", "tooltip");
    tip.textContent = text;
    tip.className = `app-tooltip`;
    tip.style.cssText = `
      position: fixed;
      z-index: 9999;
      padding: 6px 10px;
      background: #1e293b;
      color: #f8fafc;
      font-size: 12px;
      font-weight: 500;
      border-radius: 8px;
      white-space: nowrap;
      pointer-events: none;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    const host = this.el.nativeElement;
    const hostRect = host.getBoundingClientRect();
    let top = 0;
    let left = 0;
    switch (this.tooltipPosition) {
      case "top":
        top = hostRect.top;
        left = hostRect.left + hostRect.width / 2;
        break;
      case "bottom":
        top = hostRect.bottom;
        left = hostRect.left + hostRect.width / 2;
        break;
      case "left":
        top = hostRect.top + hostRect.height / 2;
        left = hostRect.left;
        break;
      case "right":
        top = hostRect.top + hostRect.height / 2;
        left = hostRect.right;
        break;
    }
    document.body.appendChild(tip);
    const tipRect = tip.getBoundingClientRect();
    if (this.tooltipPosition === "top") {
      top = hostRect.top - tipRect.height - 8;
      left = Math.max(8, left - tipRect.width / 2);
    } else if (this.tooltipPosition === "bottom") {
      top = hostRect.bottom + 8;
      left = Math.max(8, left - tipRect.width / 2);
    } else if (this.tooltipPosition === "left") {
      top = Math.max(8, top - tipRect.height / 2);
      left = hostRect.left - tipRect.width - 8;
    } else {
      top = Math.max(8, top - tipRect.height / 2);
      left = hostRect.right + 8;
    }
    tip.style.top = `${top}px`;
    tip.style.left = `${left}px`;
    this._tooltipEl = tip;
  }
  _hideTooltip() {
    if (!this._visible)
      return;
    this._visible = false;
    if (this._tooltipEl) {
      this._tooltipEl.remove();
      this._tooltipEl = null;
    }
  }
  static {
    this.\u0275fac = function TooltipDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TooltipDirective)();
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _TooltipDirective, selectors: [["", "appTooltip", ""]], hostBindings: function TooltipDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("mouseenter", function TooltipDirective_mouseenter_HostBindingHandler() {
          return ctx.onMouseEnter();
        })("mouseleave", function TooltipDirective_mouseleave_HostBindingHandler() {
          return ctx.onMouseLeave();
        })("focus", function TooltipDirective_focus_HostBindingHandler() {
          return ctx.onFocus();
        })("blur", function TooltipDirective_blur_HostBindingHandler() {
          return ctx.onBlur();
        });
      }
    }, inputs: { appTooltip: "appTooltip", tooltipKey: "tooltipKey", tooltipPosition: "tooltipPosition", tooltipDelay: "tooltipDelay" } });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipDirective, [{
    type: Directive,
    args: [{
      selector: "[appTooltip]",
      standalone: true
    }]
  }], null, { appTooltip: [{
    type: Input
  }], tooltipKey: [{
    type: Input
  }], tooltipPosition: [{
    type: Input
  }], tooltipDelay: [{
    type: Input
  }], onMouseEnter: [{
    type: HostListener,
    args: ["mouseenter"]
  }], onMouseLeave: [{
    type: HostListener,
    args: ["mouseleave"]
  }], onFocus: [{
    type: HostListener,
    args: ["focus"]
  }], onBlur: [{
    type: HostListener,
    args: ["blur"]
  }] });
})();

export {
  TooltipDirective
};
//# sourceMappingURL=chunk-MTRHY5T4.js.map
