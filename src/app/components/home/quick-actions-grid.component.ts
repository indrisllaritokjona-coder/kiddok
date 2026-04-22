import { Component, inject, computed } from '@angular/core'
import { LucideAngularModule } from 'lucide-angular';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { I18nService } from '../../core/i18n/i18n.service';

interface QuickAction {
  id: string;
  icon: string;
  labelKey: string;
  descKey: string;
  color: string;
  colorClass: string;
  badge: number;
  route: string;
}

@Component({
  selector: 'app-quick-actions-grid',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
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
  `,
  styles: [`
    :host { display: block; }
    button { transition: transform 200ms ease, box-shadow 200ms ease; }
    button:hover { transform: translateY(-4px); }
    button:active { transform: scale(0.95); }
  `]
})
export class QuickActionsGridComponent {
  dataService = inject(DataService);
  i18n = inject(I18nService);
  router = inject(Router);

  actions = computed<QuickAction[]>(() => {
    const t = this.i18n.t();
    const activeId = this.dataService.activeChildId();
    const temps = this.dataService.temperatureEntries().filter(e => e.childId === activeId);
    const records = this.dataService.records();
    const recentTemps = temps.slice(0, 10);
    const feverCount = recentTemps.filter(t => t.temperature >= 38.0).length;
    const overdueCount = records.filter(r => !r.completed && this.isOverdue(r.dueDate)).length;

    return [
      {
        id: 'temperature',
        icon: 'thermostat',
        labelKey: 'home.quickActions.temperature',
        descKey: 'home.quickActions.temperatureDesc',
        color: '#F97316',
        colorClass: 'bg-orange-50 text-orange-500',
        badge: feverCount,
        route: 'temperature',
      },
      {
        id: 'growth',
        icon: 'trending_up',
        labelKey: 'home.quickActions.growth',
        descKey: 'home.quickActions.growthDesc',
        color: '#14B8A6',
        colorClass: 'bg-teal-50 text-teal-500',
        badge: 0,
        route: 'growth',
      },
      {
        id: 'diary',
        icon: 'edit_document',
        labelKey: 'home.quickActions.diary',
        descKey: 'home.quickActions.diaryDesc',
        color: '#6366F1',
        colorClass: 'bg-primary-50 text-primary-500',
        badge: 0,
        route: 'diary',
      },
      {
        id: 'vaccines',
        icon: 'vaccines',
        labelKey: 'home.quickActions.vaccines',
        descKey: 'home.quickActions.vaccinesDesc',
        color: '#8B5CF6',
        colorClass: 'bg-purple-50 text-purple-500',
        badge: overdueCount,
        route: 'records',
      },
    ];
  });

  navigate(route: string) {
    this.router.navigate([], { queryParams: { tab: route } }).catch(() => {});
    window.dispatchEvent(new CustomEvent('kiddok:navigate', { detail: route }));
  }

  private isOverdue(dueDate: string): boolean {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  }
}