import {
  Directive, Input, OnInit, OnDestroy, HostListener,
  ElementRef, inject, ChangeDetectionStrategy
} from '@angular/core';
import { I18nService } from '../core/i18n/i18n.service';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Tooltip directive — applies a contextual i18n-aware tooltip to any element.
 *
 * Usage:
 *   <button appTooltip [tooltipKey]="'tooltip.tempNormal'" ...>ℹ</button>
 *   <span appTooltip [tooltipKey]="'tooltip.vaccineOverdue'" tooltipPosition="bottom">⚠</span>
 *
 * Or as an i18n key carrier:
 *   <button appTooltip="tooltip.tempNormal">ℹ</button>
 */
@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnInit, OnDestroy {
  /** I18n key set directly via selector binding: <button appTooltip="key"> */
  @Input() appTooltip?: string;

  /** I18n key set via property binding: [tooltipKey]="'key'" */
  @Input() tooltipKey?: string;

  /** Tooltip placement relative to host element */
  @Input() tooltipPosition: TooltipPosition = 'top';

  /** Delay in ms before showing the tooltip */
  @Input() tooltipDelay = 300;

  private el = inject(ElementRef);
  private i18n = inject(I18nService);

  private _timeoutId: ReturnType<typeof setTimeout> | null = null;
  private _visible = false;
  private _tooltipEl: HTMLElement | null = null;

  get key(): string {
    return this.tooltipKey ?? this.appTooltip ?? '';
  }

  // ── Lifecycle ────────────────────────────────────────────────────

  ngOnInit() {
    const hostEl = this.el.nativeElement as HTMLElement;
    const style = hostEl.style;
    if (!style.position || style.position === 'static') {
      style.position = 'relative';
    }
  }

  ngOnDestroy() {
    this._clearTimeout();
    this._hideTooltip();
  }

  // ── Event handlers ───────────────────────────────────────────────

  @HostListener('mouseenter')
  onMouseEnter() {
    this._timeoutId = setTimeout(() => this._showTooltip(), this.tooltipDelay);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this._clearTimeout();
    this._hideTooltip();
  }

  @HostListener('focus')
  onFocus() {
    this._timeoutId = setTimeout(() => this._showTooltip(), this.tooltipDelay);
  }

  @HostListener('blur')
  onBlur() {
    this._clearTimeout();
    this._hideTooltip();
  }

  // ── Private helpers ──────────────────────────────────────────────

  private _clearTimeout() {
    if (this._timeoutId !== null) {
      clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }
  }

  private _showTooltip() {
    if (this._visible || !this.key) return;
    this._visible = true;

    const t = this.i18n.t();
    const text = t[this.key] ?? this.key;

    const tip = document.createElement('div');
    tip.setAttribute('role', 'tooltip');
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

    const host = this.el.nativeElement as HTMLElement;
    const hostRect = host.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (this.tooltipPosition) {
      case 'top':
        top = hostRect.top;
        left = hostRect.left + hostRect.width / 2;
        break;
      case 'bottom':
        top = hostRect.bottom;
        left = hostRect.left + hostRect.width / 2;
        break;
      case 'left':
        top = hostRect.top + hostRect.height / 2;
        left = hostRect.left;
        break;
      case 'right':
        top = hostRect.top + hostRect.height / 2;
        left = hostRect.right;
        break;
    }

    document.body.appendChild(tip);
    const tipRect = tip.getBoundingClientRect();

    if (this.tooltipPosition === 'top') {
      top = hostRect.top - tipRect.height - 8;
      left = Math.max(8, left - tipRect.width / 2);
    } else if (this.tooltipPosition === 'bottom') {
      top = hostRect.bottom + 8;
      left = Math.max(8, left - tipRect.width / 2);
    } else if (this.tooltipPosition === 'left') {
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

  private _hideTooltip() {
    if (!this._visible) return;
    this._visible = false;
    if (this._tooltipEl) {
      this._tooltipEl.remove();
      this._tooltipEl = null;
    }
  }
}
