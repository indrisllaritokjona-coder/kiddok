import { Component, inject, computed, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { I18nService } from '../../core/i18n/i18n.service';

interface ActivityItem {
  id: string;
  type: 'temperature' | 'growth';
  icon: string;
  color: string;
  borderColor: string;
  title: string;
  value: string;
  timeLabel: string;
  date: Date;
  groupLabel: string;
  notes?: string;
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

      @if (isRefreshing()) {
        <div class="flex justify-center py-3">
          <span class="material-icons text-teal-500 animate-spin text-2xl">refresh</span>
        </div>
      }

      @if (items().length === 0 && !isRefreshing()) {
        <!-- Empty state -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
          <svg class="w-24 h-24 mx-auto mb-4 text-primary-200" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="50" fill="currentColor" opacity="0.15"/>
            <circle cx="60" cy="45" r="18" fill="currentColor" opacity="0.3"/>
            <path d="M32 85 C32 65, 45 55, 60 55 C75 55, 88 65, 88 85 Z" fill="currentColor" opacity="0.2"/>
            <circle cx="52" cy="42" r="3" fill="currentColor" opacity="0.5"/>
            <circle cx="68" cy="42" r="3" fill="currentColor" opacity="0.5"/>
            <path d="M54 52 Q60 57 66 52" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.4"/>
          </svg>
          <p class="font-semibold text-gray-600 text-base mb-1">{{ i18n.t()['home.recentActivity.empty'] }}</p>
          <p class="text-sm text-gray-500 font-medium">{{ i18n.t()['home.recentActivity.emptyDesc'] }}</p>
        </div>
      } @else {
        <div 
          class="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50 overflow-hidden"
          (touchstart)="onTouchStart($event)"
          (touchend)="onTouchEnd($event)"
        >
          @for (item of displayedItems(); track item.id; let i = $index) {
            <div 
              class="border-l-4 flex flex-col gap-0 p-0 hover:bg-gray-50 transition-colors cursor-pointer group"
              [class]="item.borderColor"
              (click)="toggleExpand(item.id)"
            >
              <div class="flex items-center gap-4 p-4">
                <!-- Icon -->
                <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                     [class]="item.color">
                  <span class="material-icons text-lg">{{ item.icon }}</span>
                </div>

                <!-- Content -->
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-gray-800 text-sm truncate">{{ item.title }}</p>
                  <p class="text-xs text-gray-500 font-medium mt-0.5">{{ item.value }}</p>
                </div>

                <!-- Time + chevron -->
                <div class="flex items-center gap-2 flex-shrink-0">
                  <span class="text-xs text-gray-500 font-medium">{{ item.timeLabel }}</span>
                  <span class="material-icons text-gray-300 text-base group-hover:text-primary-400 transition-colors"
                        [class.rotate-90]="isExpanded(item.id)">expand_more</span>
                </div>
              </div>

              <!-- Expanded notes -->
              @if (isExpanded(item.id) && item.notes) {
                <div class="px-4 pb-4 pt-1 text-xs text-gray-600 border-t border-gray-100">
                  {{ item.notes }}
                </div>
              }
            </div>
          }
        </div>

        @if (hasMore()) {
          <button 
            (click)="loadMore()"
            class="mt-3 w-full py-3 rounded-xl text-sm font-bold text-primary-500 bg-white border border-primary-100 hover:bg-primary-50 transition-colors"
          >
            {{ i18n.t()['home.activity.showMore'] }}
          </button>
        }
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .rotate-90 { transform: rotate(180deg); }
  `]
})
export class RecentActivityFeedComponent {
  dataService = inject(DataService);
  i18n = inject(I18nService);

  displayedCount = signal(5);
  expandedEntries = signal<Set<string>>(new Set());
  isRefreshing = signal(false);

  // Pull-to-refresh touch tracking
  private touchStartY = 0;
  private isRefreshingInProgress = false;

  private allItems = computed<ActivityItem[]>(() => {
    const t = this.i18n.t();
    const activeId = this.dataService.activeChildId();
    const now = new Date();

    const temps = this.dataService.temperatureEntries()
      .filter(e => e.childId === activeId)
      .sort((a, b) => new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime())
      .slice(0, 50);

    const growths = this.dataService.growthEntries()
      .filter(e => e.childId === activeId)
      .sort((a, b) => new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime())
      .slice(0, 50);

    const tempItems: ActivityItem[] = temps.map(e => ({
      id: e.id,
      type: 'temperature' as const,
      icon: 'thermostat',
      color: e.temperature >= 38.0 ? 'bg-orange-50 text-orange-500' : 'bg-teal-50 text-teal-500',
      borderColor: e.temperature >= 38.0 ? 'border-l-orange-400' : 'border-l-teal-400',
      title: t['home.recentActivity.tempRecorded'],
      value: `${e.temperature}°C${e.location ? ' · ' + e.location : ''}`,
      timeLabel: this.formatTime(new Date(e.measuredAt), t),
      date: new Date(e.measuredAt),
      groupLabel: this.getGroupLabel(new Date(e.measuredAt), now, t),
      notes: e.notes ?? undefined,
    }));

    const growthItems: ActivityItem[] = growths.map(e => ({
      id: e.id,
      type: 'growth' as const,
      icon: 'trending_up',
      color: 'bg-teal-50 text-teal-500',
      borderColor: 'border-l-teal-400',
      title: t['home.recentActivity.growthUpdated'],
      value: [
        e.height ? `${e.height} cm` : null,
        e.weight ? `${e.weight} kg` : null,
      ].filter(Boolean).join(' · ') || '--',
      timeLabel: this.formatTime(new Date(e.measuredAt), t),
      date: new Date(e.measuredAt),
      groupLabel: this.getGroupLabel(new Date(e.measuredAt), now, t),
      notes: e.notes ?? undefined,
    }));

    return [...tempItems, ...growthItems]
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  });

  displayedItems = computed(() => this.allItems().slice(0, this.displayedCount()));

  hasMore = computed(() => this.allItems().length > this.displayedCount());

  loadMore() {
    this.displayedCount.update(n => n + 5);
  }

  toggleExpand(id: string) {
    const updated = new Set(this.expandedEntries());
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    this.expandedEntries.set(updated);
  }

  isExpanded(id: string): boolean {
    return this.expandedEntries().has(id);
  }

  // Pull-to-refresh
  onTouchStart(event: TouchEvent) {
    this.touchStartY = event.touches[0].clientY;
  }

  onTouchEnd(event: TouchEvent) {
    const deltaY = event.changedTouches[0].clientY - this.touchStartY;
    if (deltaY > 80 && !this.isRefreshingInProgress) {
      this.refresh();
    }
  }

  refresh() {
    if (this.isRefreshingInProgress) return;
    this.isRefreshingInProgress = true;
    this.isRefreshing.set(true);

    // Simulate refresh — reload data from service
    const activeId = this.dataService.activeChildId();
    if (activeId) {
      this.dataService.loadTemperatureEntries(activeId);
      this.dataService.loadGrowthEntries(activeId);
    }

    setTimeout(() => {
      this.isRefreshing.set(false);
      this.isRefreshingInProgress = false;
    }, 1500);
  }

  private formatTime(date: Date, t: Record<string, string>): string {
    const diffMs = Date.now() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) {
      return t['home.activity.justNow'] ?? 'tani';
    }
    if (diffMins < 60) {
      const unit = this.i18n.isSq() ? 'orë' : 'hour';
      const n = diffMins;
      const ago = t['home.activity.ago'] ?? 'ago';
      return `${diffMins} ${unit} ${ago}`;
    }
    if (diffHours < 24) {
      const unit = this.i18n.isSq() ? 'orë' : 'hour';
      const ago = t['home.activity.ago'] ?? 'ago';
      return `${diffHours} ${unit} ${ago}`;
    }
    // ≥ 24h: locale date
    const locale = this.i18n.isSq() ? 'sq' : 'en-US';
    return date.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });
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
