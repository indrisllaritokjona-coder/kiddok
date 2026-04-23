import {
  Component, inject, signal, computed, OnInit, OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { I18nService } from '../core/i18n/i18n.service';

export interface TourStep {
  titleKey: string;
  bodyKey: string;
  icon: string;
  /** SQ primary color description */
  accentClass: string;
}

@Component({
  selector: 'app-onboarding-tour',
  imports: [CommonModule, LucideAngularModule],
  template: `
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
  `,
  styles: [`
    :host { display: block; }

    .animate-slide-up {
      animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(24px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    button:active { transform: scale(0.98); }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingTourComponent implements OnInit, OnDestroy {
  private i18n = inject(I18nService);

  /** Tour visibility — driven by localStorage flag */
  visible = signal(false);

  /** Current step index */
  stepIndex = signal(0);

  private readonly STORAGE_KEY = 'kiddok_onboarding_done';
  private _dontShowAgain = false;

  readonly steps: TourStep[] = [
    {
      titleKey: 'tour.welcome.title',
      bodyKey: 'tour.welcome.body',
      icon: 'party-popper',
      accentClass: 'bg-gradient-to-r from-primary-600 via-primary-500 to-teal-400',
    },
    {
      titleKey: 'tour.child.title',
      bodyKey: 'tour.child.body',
      icon: 'baby',
      accentClass: 'bg-gradient-to-r from-purple-500 via-purple-400 to-pink-400',
    },
    {
      titleKey: 'tour.temperature.title',
      bodyKey: 'tour.temperature.body',
      icon: 'thermometer',
      accentClass: 'bg-gradient-to-r from-rose-500 via-rose-400 to-orange-400',
    },
    {
      titleKey: 'tour.growth.title',
      bodyKey: 'tour.growth.body',
      icon: 'ruler',
      accentClass: 'bg-gradient-to-r from-teal-500 via-teal-400 to-emerald-400',
    },
    {
      titleKey: 'tour.vaccines.title',
      bodyKey: 'tour.vaccines.body',
      icon: 'syringe',
      accentClass: 'bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400',
    },
    {
      titleKey: 'tour.settings.title',
      bodyKey: 'tour.settings.body',
      icon: 'settings',
      accentClass: 'bg-gradient-to-r from-slate-500 via-slate-400 to-gray-400',
    },
  ];

  t = computed(() => this.i18n.t());

  currentStepTitle = computed(() => {
    const key = this.steps[this.stepIndex()]?.titleKey;
    return key ? this.t()[key] ?? key : '';
  });

  currentStepBody = computed(() => {
    const key = this.steps[this.stepIndex()]?.bodyKey;
    return key ? this.t()[key] ?? key : '';
  });

  currentStepAccentClass = computed(() =>
    this.steps[this.stepIndex()]?.accentClass ?? 'bg-primary-500'
  );

  currentStepIconBgClass = computed(() => {
    const icon = this.steps[this.stepIndex()]?.icon;
    if (icon === 'party-popper') return 'bg-primary-100';
    if (icon === 'baby') return 'bg-purple-100';
    if (icon === 'thermometer') return 'bg-rose-100';
    if (icon === 'ruler') return 'bg-teal-100';
    if (icon === 'syringe') return 'bg-blue-100';
    if (icon === 'settings') return 'bg-slate-100';
    return 'bg-primary-100';
  });

  currentStepIconColorClass = computed(() => {
    const icon = this.steps[this.stepIndex()]?.icon;
    if (icon === 'party-popper') return 'text-primary-500';
    if (icon === 'baby') return 'text-purple-500';
    if (icon === 'thermometer') return 'text-rose-500';
    if (icon === 'ruler') return 'text-teal-500';
    if (icon === 'syringe') return 'text-blue-500';
    if (icon === 'settings') return 'text-slate-500';
    return 'text-primary-500';
  });

  isLastStep = computed(() => this.stepIndex() === this.steps.length - 1);

  nextLabel = computed(() =>
    this.isLastStep()
      ? (this.t()['tour.finish'] ?? 'Finish')
      : (this.t()['tour.next'] ?? 'Next')
  );

  finishLabel = computed(() => this.t()['tour.finish'] ?? 'Finish');
  skipLabel = computed(() => this.t()['tour.skip'] ?? 'Skip');

  ngOnInit() {
    // Show only if flag not set
    try {
      if (!localStorage.getItem(this.STORAGE_KEY)) {
        this.visible.set(true);
      }
    } catch {
      this.visible.set(true);
    }
  }

  ngOnDestroy() {
    // No cleanup needed
  }

  next() {
    if (this.isLastStep()) {
      this.finish();
    } else {
      this.stepIndex.update(i => i + 1);
    }
  }

  skip() {
    this._dontShowAgain = true;
    this.finish();
  }

  maybeSkip() {
    // Clicking backdrop acts as skip (don't show again)
    this._dontShowAgain = true;
    this.finish();
  }

  private finish() {
    if (this._dontShowAgain) {
      try {
        localStorage.setItem(this.STORAGE_KEY, 'true');
      } catch {}
    }
    this.visible.set(false);
  }

  /** Called externally to restart the tour (e.g. from settings) */
  restart() {
    this.stepIndex.set(0);
    this._dontShowAgain = false;
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch {}
    this.visible.set(true);
  }
}
