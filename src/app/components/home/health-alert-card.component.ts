import { Component, inject, computed, signal, effect } from '@angular/core'
import { LucideAngularModule } from 'lucide-angular';

import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { I18nService } from '../../core/i18n/i18n.service';

interface AlertItem {
  type: string;
  priority: number;
  icon: string;
  iconBgClass: string;
  iconClass: string;
  bgClass: string;
  btnClass: string;
  title: string;
  desc: string;
  route: string;
  id: string;
}

@Component({
  selector: 'app-health-alert-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
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
              {{ i18n.isSq() ? 'Të gjitha temperaturas normale, asnjë vaksine e vonuar.' : 'All temperatures normal, no overdue vaccines.' }}
            </p>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes scaleIn {
      from { transform: scale(0); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .animate-slide-up { animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
    .animate-scale-in { animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
  `]
})
export class HealthAlertCardComponent {
  dataService = inject(DataService);
  i18n = inject(I18nService);

  private readonly DISMISSED_KEY = 'kiddok_dismissed_alerts';

  dismissedAlerts = signal<Set<string>>(this.loadDismissed());

  constructor() {
    // Auto-clear dismissed alerts when underlying data changes
    effect(() => {
      // Track temperature entries, records — if they change, clear dismissed
      this.dataService.temperatureEntries();
      this.dataService.records();
      this.dataService.growthEntries();
      this.dismissedAlerts.set(new Set());
    });
  }

  private loadDismissed(): Set<string> {
    try {
      const raw = localStorage.getItem(this.DISMISSED_KEY);
      if (raw) {
        const arr = JSON.parse(raw) as string[];
        return new Set(arr);
      }
    } catch {}
    return new Set();
  }

  private saveDismissed(set: Set<string>) {
    try {
      localStorage.setItem(this.DISMISSED_KEY, JSON.stringify([...set]));
    } catch {}
  }

  dismissAlert(alertId: string, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    const updated = new Set(this.dismissedAlerts());
    updated.add(alertId);
    this.dismissedAlerts.set(updated);
    this.saveDismissed(updated);
  }

  alerts = computed<AlertItem[]>(() => {
    const t = this.i18n.t();
    const result: AlertItem[] = [];
    const activeId = this.dataService.activeChildId();
    const dismissed = this.dismissedAlerts();

    // Fever alert — P0
    const temps = this.dataService.temperatureEntries()
      .filter(e => e.childId === activeId)
      .sort((a, b) => new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime());
    if (temps.length > 0 && temps[0].temperature >= 38.0) {
      const latest = temps[0];
      const measuredDate = new Date(latest.measuredAt);
      const timeAgo = this.timeAgo(measuredDate);
      const id = 'fever_' + latest.id;
      if (!dismissed.has(id)) {
        result.push({
          type: 'fever',
          priority: 0,
          icon: 'thermostat',
          iconBgClass: 'bg-rose-100',
          iconClass: 'text-rose-500',
          bgClass: 'bg-rose-50 border border-rose-200',
          btnClass: 'bg-rose-500 hover:bg-rose-600 text-white',
          title: t['home.alerts.fever'],
          desc: t['home.alerts.feverDesc']
            .replace('{value}', String(latest.temperature))
            .replace('{time}', timeAgo),
          route: 'temperature',
          id,
        });
      }
    }

    // Overdue vaccine alerts — P1
    const overdueVaccines = this.dataService.records()
      .filter(r => !r.completed && new Date(r.dueDate) < new Date());
    for (const v of overdueVaccines.slice(0, 3)) {
      const days = Math.floor((Date.now() - new Date(v.dueDate).getTime()) / 86400000);
      const id = 'vaccine_' + v.id;
      if (!dismissed.has(id)) {
        result.push({
          type: 'vaccine',
          priority: 1,
          icon: 'vaccines',
          iconBgClass: 'bg-orange-100',
          iconClass: 'text-orange-500',
          bgClass: 'bg-orange-50 border border-orange-200',
          btnClass: 'bg-orange-500 hover:bg-orange-600 text-white',
          title: t['home.alerts.overdueVaccine'],
          desc: t['home.alerts.overdueVaccineDesc']
            .replace('{name}', v.title)
            .replace('{days}', String(days)),
          route: 'records',
          id,
        });
      }
    }

    // Sort by priority
    result.sort((a, b) => a.priority - b.priority);
    return result;
  });

  hasAnyAlert = computed(() => this.alerts().length > 0);

  navigate(route: string) {
    window.dispatchEvent(new CustomEvent('kiddok:navigate', { detail: route }));
  }

  private timeAgo(date: Date): string {
    const diffMs = Date.now() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffMins < 60) return `${diffMins} min`;
    if (diffHours < 24) return `${diffHours} h`;
    return `${diffDays} d`;
  }
}
