import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { I18nService } from '../../core/i18n/i18n.service';

interface ActivityItem {
  id: string;
  type: 'temperature' | 'growth';
  icon: string;
  color: string;
  accentColor: string;
  title: string;
  value: string;
  timeAgo: string;
  date: Date;
  groupLabel: string;
}

@Component({
  selector: 'app-recent-activity-feed',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-6">
      <h2 class="text-lg font-bold text-gray-700 mb-4 px-1 flex items-center gap-2">
        <span class="material-icons text-teal-500 text-xl">history</span>
        {{ i18n.t()['home.recentActivity.title'] }}
      </h2>

      @if (items().length === 0) {
        <!-- Empty state -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
          <!-- Inline SVG illustration: child-friendly, warm colors -->
          <svg class="w-24 h-24 mx-auto mb-4 text-primary-200" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="50" fill="currentColor" opacity="0.15"/>
            <circle cx="60" cy="45" r="18" fill="currentColor" opacity="0.3"/>
            <path d="M32 85 C32 65, 45 55, 60 55 C75 55, 88 65, 88 85 Z" fill="currentColor" opacity="0.2"/>
            <circle cx="52" cy="42" r="3" fill="currentColor" opacity="0.5"/>
            <circle cx="68" cy="42" r="3" fill="currentColor" opacity="0.5"/>
            <path d="M54 52 Q60 57 66 52" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.4"/>
          </svg>
          <p class="font-semibold text-gray-600 text-base mb-1">{{ i18n.t()['home.recentActivity.empty'] }}</p>
          <p class="text-sm text-gray-400 font-medium">{{ i18n.t()['home.recentActivity.emptyDesc'] }}</p>
        </div>
      } @else {
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50 overflow-hidden">
          @for (item of items(); track item.id; let i = $index) {
            <div 
              class="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer group"
              [style.animation-delay]="(i * 50) + 'ms'"
              style="animation: slideUp 0.35s ease-out both;"
            >
              <!-- Left accent bar -->
              <div class="w-1 h-12 rounded-full flex-shrink-0" [class]="item.accentColor"></div>

              <!-- Icon -->
              <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                   [class]="item.color">
                <span class="material-icons text-lg">{{ item.icon }}</span>
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-gray-800 text-sm truncate">{{ item.title }}</p>
                <p class="text-xs text-gray-400 font-medium mt-0.5">{{ item.value }}</p>
              </div>

              <!-- Time + chevron -->
              <div class="flex items-center gap-2 flex-shrink-0">
                <span class="text-xs text-gray-400 font-medium">{{ item.timeAgo }}</span>
                <span class="material-icons text-gray-300 text-base group-hover:text-primary-400 transition-colors">chevron_right</span>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class RecentActivityFeedComponent {
  dataService = inject(DataService);
  i18n = inject(I18nService);

  items = computed<ActivityItem[]>(() => {
    const t = this.i18n.t();
    const activeId = this.dataService.activeChildId();
    const now = new Date();

    const temps = this.dataService.temperatureEntries()
      .filter(e => e.childId === activeId)
      .sort((a, b) => new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime())
      .slice(0, 10);

    const growths = this.dataService.growthEntries()
      .filter(e => e.childId === activeId)
      .sort((a, b) => new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime())
      .slice(0, 10);

    const tempItems: ActivityItem[] = temps.map(e => ({
      id: e.id,
      type: 'temperature' as const,
      icon: 'thermostat',
      color: e.temperature >= 38.0 ? 'bg-orange-50 text-orange-500' : 'bg-teal-50 text-teal-500',
      accentColor: e.temperature >= 38.0 ? 'bg-orange-400' : 'bg-teal-400',
      title: t['home.recentActivity.tempRecorded'],
      value: `${e.temperature}°C${e.location ? ' · ' + e.location : ''}`,
      timeAgo: this.timeAgo(new Date(e.measuredAt), t),
      date: new Date(e.measuredAt),
      groupLabel: this.getGroupLabel(new Date(e.measuredAt), now, t),
    }));

    const growthItems: ActivityItem[] = growths.map(e => ({
      id: e.id,
      type: 'growth' as const,
      icon: 'trending_up',
      color: 'bg-teal-50 text-teal-500',
      accentColor: 'bg-teal-400',
      title: t['home.recentActivity.growthUpdated'],
      value: [
        e.height ? `${e.height} cm` : null,
        e.weight ? `${e.weight} kg` : null,
      ].filter(Boolean).join(' · ') || '--',
      timeAgo: this.timeAgo(new Date(e.measuredAt), t),
      date: new Date(e.measuredAt),
      groupLabel: this.getGroupLabel(new Date(e.measuredAt), now, t),
    }));

    return [...tempItems, ...growthItems]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 10);
  });

  private timeAgo(date: Date, t: Record<string, string>): string {
    const diffMs = Date.now() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffMins < 60) return t['home.recentActivity.minutesAgo'].replace('{n}', String(diffMins));
    if (diffHours < 24) return t['home.recentActivity.hoursAgo'].replace('{n}', String(diffHours));
    return t['home.recentActivity.daysAgo'].replace('{n}', String(diffDays));
  }

  private getGroupLabel(date: Date, now: Date, t: Record<string, string>): string {
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const itemDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diffDays = Math.floor((today.getTime() - itemDay.getTime()) / 86400000);
    if (diffDays === 0) return t['home.recentActivity.today'];
    if (diffDays === 1) return t['home.recentActivity.yesterday'];
    if (diffDays < 7) return t['home.recentActivity.thisWeek'];
    return t['home.recentActivity.earlier'];
  }
}