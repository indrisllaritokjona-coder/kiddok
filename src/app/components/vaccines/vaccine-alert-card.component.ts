import { Component, Input, Output, EventEmitter, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../core/i18n/i18n.service';

export interface VaccineAlert {
  id: string;
  vaccineName: string;
  doseLabel: string;
  dueDate: string;
  status: 'overdue' | 'due' | 'upcoming';
  daysOverdue?: number;
}

@Component({
  selector: 'app-vaccine-alert-card',
  imports: [CommonModule],
  template: `
    <div class="relative overflow-hidden rounded-2xl border transition-all duration-200"
      [ngClass]="cardClasses()"
      [style.transform]="swipeOffset() > 0 ? 'translateX(' + swipeOffset() + 'px)' : 'translateX(0)'"
      (touchstart)="onTouchStart($event)"
      (touchmove)="onTouchMove($event)"
      (touchend)="onTouchEnd($event)">

      <!-- Swipe reveal background -->
      @if (swipeOffset() > 0) {
        <div class="absolute inset-0 bg-rose-500 flex items-center justify-end pr-4">
          <button (click)="emitDismiss()" class="text-white font-bold text-sm flex items-center gap-1">
            <span class="material-icons text-lg">close</span>
            {{ t()['vaccines.alertCard.dismiss'] }}
          </button>
        </div>
      }

      <!-- Card Content -->
      <div class="relative flex items-center gap-3 p-4">
        <!-- Status Dot -->
        <div class="flex-shrink-0">
          <div [ngClass]="dotClass()"
            [ngStyle]="alert.status === 'overdue' ? {'animation': 'pulse-dot 1.5s ease-in-out infinite'} : {}">
          </div>
        </div>

        <!-- Icon -->
        <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          [ngClass]="iconBgClass()">
          <span class="material-icons" [ngClass]="iconColorClass()">vaccines</span>
        </div>

        <!-- Text -->
        <div class="flex-1 min-w-0">
          <p class="font-bold text-gray-800 text-sm truncate">{{ alert.vaccineName }}</p>
          <div class="flex items-center gap-2 mt-0.5">
            <span class="text-xs text-gray-500">{{ alert.doseLabel }}</span>
            <span class="w-1 h-1 rounded-full bg-gray-300"></span>
            <span class="text-xs font-semibold" [ngClass]="statusTextClass()">
              {{ statusLabel() }}
            </span>
          </div>
        </div>

        <!-- CTA Button -->
        <button
          (click)="emitAction()"
          class="flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl transition-all hover:opacity-90"
          [ngClass]="ctaClass()">
          {{ ctaLabel() }}
        </button>

        <!-- Desktop Dismiss -->
        <button
          (click)="emitDismiss()"
          class="hidden sm:flex flex-shrink-0 w-6 h-6 items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all">
          <span class="material-icons text-base">close</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }

    @keyframes pulse-dot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.5; transform: scale(1.4); }
    }
  `]
})
export class VaccineAlertCardComponent {
  @Input({ required: true }) alert!: VaccineAlert;
  @Output() action = new EventEmitter<void>();
  @Output() dismiss = new EventEmitter<void>();

  private i18n = inject(I18nService);

  t = computed(() => this.i18n.t());
  isSq = computed(() => this.i18n.isSq());

  swipeOffset = signal(0);
  private touchStartX = 0;
  private readonly SWIPE_THRESHOLD = 80;

  // Status-driven classes
  cardClasses = computed(() => {
    switch (this.alert.status) {
      case 'overdue': return 'bg-rose-50 border-rose-200';
      case 'due':     return 'bg-orange-50 border-orange-200';
      case 'upcoming': return 'bg-teal-50 border-teal-200';
    }
  });

  dotClass = computed(() => {
    switch (this.alert.status) {
      case 'overdue': return 'w-3 h-3 rounded-full bg-orange-500';
      case 'due':     return 'w-3 h-3 rounded-full bg-orange-400';
      case 'upcoming': return 'w-3 h-3 rounded-full border-2 border-teal-500 bg-transparent';
    }
  });

  iconBgClass = computed(() => {
    switch (this.alert.status) {
      case 'overdue': return 'bg-rose-100';
      case 'due':     return 'bg-orange-100';
      case 'upcoming': return 'bg-teal-100';
    }
  });

  iconColorClass = computed(() => {
    switch (this.alert.status) {
      case 'overdue': return 'text-rose-500';
      case 'due':     return 'text-orange-500';
      case 'upcoming': return 'text-teal-500';
    }
  });

  statusTextClass = computed(() => {
    switch (this.alert.status) {
      case 'overdue': return 'text-rose-600';
      case 'due':     return 'text-orange-600';
      case 'upcoming': return 'text-teal-600';
    }
  });

  ctaClass = computed(() => {
    switch (this.alert.status) {
      case 'overdue': return 'bg-orange-500 hover:bg-orange-600 text-white';
      case 'due':     return 'bg-orange-500 hover:bg-orange-600 text-white';
      case 'upcoming': return 'bg-teal-500 hover:bg-teal-600 text-white';
    }
  });

  ctaLabel = computed(() => {
    switch (this.alert.status) {
      case 'overdue': return this.t()['vaccines.alertCard.markComplete'] || 'Mark complete';
      case 'due':     return this.t()['vaccines.alertCard.markComplete'] || 'Mark complete';
      case 'upcoming': return this.t()['vaccines.alertCard.viewDetails'] || 'View details';
    }
  });

  statusLabel = computed(() => {
    if (this.alert.status === 'overdue' && this.alert.daysOverdue) {
      if (this.isSq()) {
        return `e vonuar ${this.alert.daysOverdue} ditë`;
      }
      return `overdue by ${this.alert.daysOverdue} days`;
    }
    if (this.alert.status === 'due') {
      return this.t()['vaccines.alertCard.dueSoon'] || 'due today';
    }
    return this.t()['vaccines.alertCard.upcoming'] || 'upcoming';
  });

  // Touch handlers for swipe-to-dismiss
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchMove(event: TouchEvent) {
    const deltaX = event.touches[0].clientX - this.touchStartX;
    // Only allow right-to-left swipe (positive delta in our translateX)
    if (deltaX > 0) {
      this.swipeOffset.set(Math.min(deltaX, 120));
    }
  }

  onTouchEnd(_event: TouchEvent) {
    if (this.swipeOffset() >= this.SWIPE_THRESHOLD) {
      this.emitDismiss();
    }
    this.swipeOffset.set(0);
  }

  emitAction() {
    this.action.emit();
  }

  emitDismiss() {
    this.dismiss.emit();
  }
}