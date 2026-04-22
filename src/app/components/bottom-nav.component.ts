import { Component, inject } from '@angular/core'
import { LucideAngularModule } from 'lucide-angular';

import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { DataService } from '../services/data.service';
import { I18nService } from '../core/i18n/i18n.service';

interface NavTab {
  id: string;
  icon: string;
  labelKey: string;
}

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <nav class="lg:hidden fixed bottom-0 w-full bg-white border-t border-stone-200 z-50 h-16"
         style="padding-bottom: env(safe-area-inset-bottom);">
      <div class="flex flex-row h-full">
        @for (tab of tabs; track tab.id) {
          <button
            class="flex flex-col items-center justify-center gap-1 flex-1 h-full py-2 px-1 transition-colors duration-200 appearance-none bg-transparent border-none cursor-pointer"
            [class.text-indigo-600]="currentTab() === tab.id"
            [class.text-stone-500]="currentTab() !== tab.id"
            (click)="navigate(tab.id)" aria-label="{{ label(tab.labelKey) }}">
            <lucide-icon [name]="tab.icon" class="text-2xl"></lucide-icon>
            <span class="text-xs font-semibold leading-none">{{ label(tab.labelKey) }}</span>
          </button>
        }
      </div>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class BottomNavComponent {
  protected dataService = inject(DataService);
  protected i18n = inject(I18nService);

  readonly currentTab = this.dataService.currentTab;

  readonly tabs: NavTab[] = [
    { id: 'home', icon: 'home', labelKey: 'bottomNav.home' },
    { id: 'temperature', icon: 'thermostat', labelKey: 'bottomNav.temperature' },
    { id: 'growth', icon: 'trending_up', labelKey: 'bottomNav.growth' },
    { id: 'diary', icon: 'edit_document', labelKey: 'bottomNav.diary' },
    { id: 'vaccines', icon: 'vaccines', labelKey: 'bottomNav.vaccines' },
  ];

  label(key: string): string {
    return this.i18n.t()[key] ?? key;
  }

  navigate(tabId: string): void {
    window.dispatchEvent(new CustomEvent('kiddok:navigate', { detail: tabId }));
  }
}
