import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { I18nService } from '../../core/i18n/i18n.service';

@Component({
  selector: 'app-health-alert-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (hasAnyAlert()) {
      <div class="mb-6 space-y-3">
        <h2 class="text-lg font-bold text-gray-700 mb-3 px-1 flex items-center gap-2">
          <span class="material-icons text-red-500 text-xl">warning</span>
          {{ i18n.t()['home.alerts.title'] }}
        </h2>

        @for (alert of alerts(); track alert.type) {
          <div 
            class="flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 animate-slide-up"
            [class]="alert.bgClass"
          >
            <!-- Icon -->
            <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                 [class]="alert.iconBgClass">
              <span class="material-icons text-lg" [class]="alert.iconClass">{{ alert.icon }}</span>
            </div>

            <!-- Text -->
            <div class="flex-1 min-w-0">
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
      </div>
    } @else {
      <!-- All clear state -->
      <div class="mb-6 p-5 rounded-2xl bg-teal-50 border border-teal-100 flex items-center gap-4">
        <div class="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
          <span class="material-icons text-teal-500 text-lg">check_circle</span>
        </div>
        <div>
          <p class="font-bold text-teal-700 text-sm">{{ i18n.t()['home.alerts.clear'] }}</p>
          <p class="text-xs text-teal-500 font-medium mt-0.5">
            {{ i18n.isSq() ? 'Të gjitha temperaturas normale, asnjë vaksine e vonuar.' : 'All temperatures normal, no overdue vaccines.' }}
          </p>
        </div>
      </div>
    }
  `,
  styles: [`
    :host { display: block; }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-slide-up { animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
  `]
})
export class HealthAlertCardComponent {
  dataService = inject(DataService);
  i18n = inject(I18nService);

  alerts = computed(() => {
    const t = this.i18n.t();
    const result: any[] = [];
    const activeId = this.dataService.activeChildId();

    // Fever alert
    const temps = this.dataService.temperatureEntries()
      .filter(e => e.childId === activeId)
      .sort((a, b) => new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime());
    if (temps.length > 0 && temps[0].temperature >= 38.0) {
      const latest = temps[0];
      const measuredDate = new Date(latest.measuredAt);
      const timeAgo = this.timeAgo(measuredDate);
      result.push({
        type: 'fever',
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
      });
    }

    // Overdue vaccine alerts
    const overdueVaccines = this.dataService.records()
      .filter(r => !r.completed && new Date(r.dueDate) < new Date());
    for (const v of overdueVaccines.slice(0, 3)) {
      const days = Math.floor((Date.now() - new Date(v.dueDate).getTime()) / 86400000);
      result.push({
        type: 'vaccine',
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
      });
    }

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