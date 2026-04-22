import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, ChildProfile } from '../services/data.service';
import { I18nService } from '../core/i18n/i18n.service';

interface NavItem {
  id: string;
  icon: string;
  labelKey: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <aside class="sidebar">
      <!-- Brand row -->
      <div class="sidebar__brand">
        <span class="sidebar__logo">KidDok</span>
        <button class="locale-toggle" (click)="i18n.toggleLocale()" [attr.aria-label]="'Switch to ' + (i18n.locale() === 'sq' ? 'English' : 'Albanian')">
          {{ i18n.locale() === 'sq' ? 'EN' : 'SQ' }}
        </button>
      </div>

      <!-- Active child mini-card -->
      <div class="sidebar__child-card" [class.sidebar__child-card--empty]="!activeChild()">
        @if (activeChild(); as child) {
          <img [src]="avatarUrl(child.id)" class="sidebar__avatar" [alt]="child.name + ' avatar'" />
          <div class="sidebar__child-info">
            <span class="sidebar__child-name">{{ child.name }}</span>
            <span class="sidebar__age-badge">{{ ageLabel(child) }}</span>
          </div>
        } @else {
          <div class="sidebar__child-placeholder">
            <span class="material-symbols-outlined sidebar__placeholder-icon">person</span>
            <span class="sidebar__placeholder-text">{{ t()['sidebar.noChildSelected'] }}</span>
          </div>
        }
      </div>

      <!-- Navigation list -->
      <nav class="sidebar__nav">
        @for (item of navItems; track item.id) {
          <button
            class="sidebar__nav-item"
            [class.sidebar__nav-item--active]="currentTab() === item.id"
            (click)="navigateTo(item.id)"
          >
            <span class="material-symbols-outlined sidebar__nav-icon">{{ item.icon }}</span>
            <span>{{ t()[item.labelKey] }}</span>
          </button>
        }
      </nav>

      <!-- Footer -->
      <div class="sidebar__footer">
        <button class="sidebar__footer-item" (click)="navigateTo('settings')">
          <span class="material-symbols-outlined">settings</span>
          <span>{{ t()['sidebar.footer.settings'] }}</span>
        </button>
        <button class="sidebar__footer-item sidebar__footer-item--logout" (click)="logout()">
          <span class="material-symbols-outlined">logout</span>
          <span>{{ t()['sidebar.footer.logout'] }}</span>
        </button>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 280px;
      height: 100dvh;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      position: relative;
      border-left: 4px solid;
      border-image: linear-gradient(to bottom, #6366F1, #14B8A6) 1;
      flex-shrink: 0;
    }

    .sidebar__brand {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 20px 16px;
    }

    .sidebar__logo {
      font-family: 'Inter', sans-serif;
      font-size: 28px;
      font-weight: 800;
      color: #6366F1;
      letter-spacing: -0.5px;
    }

    .locale-toggle {
      font-family: 'Inter', sans-serif;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 9999px;
      background: #f5f5f4;
      color: #78716C;
      border: none;
      cursor: pointer;
      transition: background 0.2s ease, color 0.2s ease;
    }

    .locale-toggle:hover {
      background: #e7e5e4;
      color: #44403c;
    }

    .sidebar__child-card {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 0 16px 8px;
      padding: 12px 16px;
      border-radius: 16px;
      background: #ffffff;
      border: 2px solid #c7d2fe;
    }

    .sidebar__child-card--empty {
      border: 2px dashed #e7e5e4;
      background: #fafaf9;
    }

    .sidebar__avatar {
      width: 36px;
      height: 36px;
      border-radius: 9999px;
      border: 2px solid #c7d2fe;
      flex-shrink: 0;
    }

    .sidebar__child-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }

    .sidebar__child-name {
      font-family: 'Inter', sans-serif;
      font-size: 15px;
      font-weight: 700;
      color: #1c1917;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sidebar__age-badge {
      font-family: 'Inter', sans-serif;
      font-size: 11px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 9999px;
      background: #eef2ff;
      color: #4338ca;
      width: fit-content;
    }

    .sidebar__child-placeholder {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 2px 0;
    }

    .sidebar__placeholder-icon {
      font-size: 20px;
      color: #a8a29e;
    }

    .sidebar__placeholder-text {
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      font-weight: 500;
      color: #a8a29e;
    }

    .sidebar__nav {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 8px 12px 16px;
      overflow-y: auto;
    }

    .sidebar__nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 16px;
      border-radius: 12px;
      border: none;
      background: transparent;
      cursor: pointer;
      transition: background 0.2s ease;
      width: 100%;
      text-align: left;
      font-family: 'Inter', sans-serif;
      font-size: 15px;
      font-weight: 600;
      color: #78716c;
    }

    .sidebar__nav-item:hover {
      background: #f5f5f4;
    }

    .sidebar__nav-item--active {
      background: #eef2ff;
      color: #6366F1;
      box-shadow: inset 4px 0 0 #6366F1;
    }

    .sidebar__nav-icon {
      font-size: 22px;
      font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
      flex-shrink: 0;
    }

    .sidebar__footer {
      padding: 12px 12px 24px;
      border-top: 1px solid #f5f5f4;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .sidebar__footer-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 16px;
      border-radius: 12px;
      border: none;
      background: transparent;
      cursor: pointer;
      transition: background 0.2s ease, color 0.2s ease;
      width: 100%;
      text-align: left;
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      font-weight: 500;
      color: #78716c;
    }

    .sidebar__footer-item:hover {
      background: #f5f5f4;
      color: #44403c;
    }

    .sidebar__footer-item--logout {
      color: #f43f5e;
    }

    .sidebar__footer-item--logout:hover {
      background: #fff1f2;
      color: #e11d48;
    }
  `]
})
export class SidebarComponent {
  protected dataService = inject(DataService);
  protected i18n = inject(I18nService);

  readonly t = this.i18n.t;
  readonly currentTab = this.dataService.currentTab;

  readonly navItems: NavItem[] = [
    { id: 'home', icon: 'home', labelKey: 'sidebar.nav.home' },
    { id: 'temperature', icon: 'thermostat', labelKey: 'sidebar.nav.temperature' },
    { id: 'growth', icon: 'trending_up', labelKey: 'sidebar.nav.growth' },
    { id: 'diary', icon: 'edit_document', labelKey: 'sidebar.nav.diary' },
    { id: 'vaccines', icon: 'vaccines', labelKey: 'sidebar.nav.vaccines' },
  ];

  readonly activeChild = computed(() => {
    const activeId = this.dataService.activeChildId();
    if (!activeId) return null;
    return this.dataService.children().find(c => c.id === activeId) ?? null;
  });

  avatarUrl(childId: string): string {
    return `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(childId)}`;
  }

  ageLabel(child: ChildProfile): string {
    const age = this.dataService.getChildAge(child);
    if (age.years >= 1) {
      return this.t()['sidebar.ageFormat']
        .replace('{n}', String(age.years));
    }
    return this.t()['sidebar.ageFormatMonths']
      .replace('{n}', String(age.months));
  }

  navigateTo(tabId: string): void {
    window.dispatchEvent(new CustomEvent('kiddok:navigate', { detail: tabId }));
  }

  logout(): void {
    this.dataService.logout();
  }
}
