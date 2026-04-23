import {
  Component,
  inject,
  signal,
  computed,
  HostListener,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { DataService, ChildProfile } from '../services/data.service';
import { I18nService } from '../core/i18n/i18n.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <header class="px-6 py-5 lg:px-10 lg:py-7 flex items-center justify-between lg:justify-end border-b border-gray-200/50 bg-white/60 backdrop-blur-xl z-30 shadow-sm">

      <!-- LEFT: Back button + Page title -->
      <div class="flex items-center gap-3">
        @if (viewState === 'app') {
          <button type="button" (click)="backRequested.emit()"
                  class="flex items-center gap-2 px-3 py-2 rounded-xl bg-white shadow-soft border border-gray-100 hover:border-primary-300 hover:shadow-md transition-all text-gray-600 hover:text-primary-600"
                  [attr.aria-label]="i18n.t()['nav.back']">
            <lucide-icon name="arrow-left" class="text-inherit" aria-hidden="true"></lucide-icon>
            <span class="text-sm font-bold hidden sm:block">{{ i18n.t()['nav.back'] }}</span>
          </button>
        }
        <button type="button" class="lg:hidden p-2 rounded-xl bg-white shadow-soft border border-gray-100" [attr.aria-label]="i18n.t()['nav.menu']">
          <lucide-icon name="menu" class="text-inherit" aria-hidden="true"></lucide-icon>
        </button>
        <!-- Page title -->
        <h1 class="text-base lg:text-lg font-extrabold text-gray-800 hidden sm:block ml-2">
          {{ pageTitle() }}
        </h1>
      </div>

      <!-- RIGHT: Language toggle + Quick switch + Child switcher + Parent avatar -->
      <div class="flex items-center gap-4 lg:gap-8">

        <!-- Language toggle (mobile only) -->
        <button type="button" (click)="localeToggleRequested.emit()"
                class="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-xs font-bold text-gray-600 transition-all"
                [attr.aria-label]="i18n.locale() === 'sq' ? 'Switch to English' : 'Kalo në shqip'">
          <lucide-icon name="globe" class="text-inherit" aria-hidden="true"></lucide-icon>
          {{ i18n.locale() === 'sq' ? i18n.t()['header.sq'] : i18n.t()['header.en'] }}
        </button>

        <!-- Export button (app view only, when a child is active) -->
        @if (viewState === 'app' && activeChild()) {
          <button type="button"
                  (click)="exportRequested.emit()"
                  class="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-white shadow-soft border border-gray-100 hover:border-primary-300 hover:shadow-md transition-all text-gray-600 hover:text-primary-600"
                  [attr.aria-label]="i18n.t()['export.trigger']">
            <lucide-icon name="download" class="text-inherit" aria-hidden="true"></lucide-icon>
            <span class="text-sm font-bold hidden xl:block">{{ i18n.t()['export.trigger'] }}</span>
          </button>
        }

        <!-- Quick Switcher button (desktop only, app view) -->
        @if (viewState === 'app' && hasChildren()) {
          <button type="button" (click)="openQuickSwitcher()"
                  class="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-primary-50 hover:bg-primary-100 border border-primary-200 text-primary-700 font-bold text-sm transition-all shadow-sm"
                  [attr.aria-label]="i18n.t()['header.quickSwitch']">
            <lucide-icon name="repeat" class="text-inherit" aria-hidden="true"></lucide-icon>
            <span class="hidden xl:inline">{{ i18n.t()['header.quickSwitch'] }}</span>
            <span class="text-xs font-mono bg-primary-100 px-1.5 py-0.5 rounded border border-primary-200">Alt+C</span>
          </button>
        }

        <!-- Child Switcher Pill -->
        <div class="relative">
          <button type="button" (click)="toggleDropdown()"
                  class="flex items-center gap-3 bg-white px-4 py-2 lg:py-2.5 rounded-2xl shadow-soft border border-gray-100 hover:border-primary-300 hover:shadow-md transition-all"
                  [class.border-primary-300]="showDropdown()"
                  [class.shadow-md]="showDropdown()"
                  [class.opacity-70]="switching"
                  [attr.aria-expanded]="showDropdown()"
                  aria-haspopup="listbox">
            @if (activeChild()) {
              <img [src]="activeChild()!.avatarUrl"
                   [alt]="activeChild()!.name"
                   class="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-primary-100 object-cover" />
              <span class="font-bold text-gray-800 hidden sm:block text-sm lg:text-base">{{ activeChild()!.name }}</span>
              @if (activeChildAge()) {
                <span class="bg-primary-50 text-primary-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {{ activeChildAge() }}
                </span>
              }
            } @else {
              <div class="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300">
                <lucide-icon name="user" class="text-inherit" aria-hidden="true"></lucide-icon>
              </div>
              <span class="font-bold text-gray-500 hidden sm:block">{{ i18n.t()['child.addNewBtn'] }}</span>
            }
            <lucide-icon name="chevron-down" class="text-gray-500 text-sm transition-transform duration-200" [class.rotate-180]="showDropdown()" aria-hidden="true"></lucide-icon>
          </button>

          <!-- Dropdown Panel -->
          @if (showDropdown()) {
            <div role="listbox" aria-label="Child selector" class="absolute right-0 top-full mt-2 w-80 bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 py-3 animate-slide-up z-50 overflow-hidden max-h-[80vh] overflow-y-auto">

              <!-- Section label -->
              <div class="px-5 pb-3 pt-1 mb-2 border-b border-gray-50 flex items-center gap-2">
                <lucide-icon name="users" class="text-inherit" aria-hidden="true"></lucide-icon>
                <span class="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {{ i18n.t()['header.profileLabel'] }}
                </span>
              </div>

              <!-- Empty state -->
              @if (!hasChildren()) {
                <div class="px-5 py-8 text-center">
                  <p class="text-gray-500 text-sm font-medium">
                    {{ i18n.t()['header.noChildrenPlaceholder'] }}
                  </p>
                </div>
              }

              <!-- Child list -->
              @for (child of allChildren(); track child.id) {
                <div role="option" (click)="onChildSelected(child)"
                     class="flex items-center gap-4 px-5 py-3 hover:bg-primary-50 cursor-pointer transition-colors mx-2 mt-0 rounded-2xl border border-transparent hover:border-primary-100 group"
                     [class.bg-indigo-50]="child.id === activeChildId()"
                     [attr.aria-selected]="child.id === activeChildId()">
                  <img [src]="child.avatarUrl"
                       [alt]="child.name"
                       class="w-12 h-12 rounded-full border border-gray-200 shadow-sm" />
                  <div class="flex flex-col flex-1 min-w-0">
                    <span class="font-extrabold text-gray-800 group-hover:text-primary-700 transition-colors truncate">{{ child.name }}</span>
                    <span class="text-xs text-gray-500 font-medium">
                      {{ i18n.t()['child.born'] }}: {{ toDisplay(child.dateOfBirth, i18n.locale()) }}
                    </span>
                  </div>
                  @if (child.id === activeChildId()) {
                    <lucide-icon name="check" class="text-teal-500" aria-hidden="true"></lucide-icon>
                  }
                </div>
              }

              <!-- Action buttons -->
              @if (hasChildren()) {
                <div class="px-4 pt-2 pb-1 mt-2 border-t border-gray-100">
                  <button type="button" (click)="onSwitchChild()"
                          class="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-primary-50 hover:bg-primary-100 text-primary-700 font-bold transition-colors border border-primary-200">
                    <lucide-icon name="arrow-left-right" class="text-inherit" aria-hidden="true"></lucide-icon>
                    {{ i18n.t()['header.switchChild'] }}
                  </button>
                </div>
              }
              <div class="px-4 pt-2 mt-1">
                <button type="button" (click)="onAddNewMember()"
                        class="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold transition-colors border border-slate-200 hover:border-slate-300">
                  <lucide-icon name="circle-plus" class="text-inherit" aria-hidden="true"></lucide-icon>
                  {{ i18n.t()['header.addNewMember'] }}
                </button>
              </div>
            </div>
          }
        </div>

        <!-- Parent welcome block (desktop only, app view) -->
        @if (viewState === 'app' && dataService.getParentName()) {
          <div class="hidden lg:flex items-center gap-2 text-sm text-gray-500 font-medium">
            <lucide-icon name="hand" class="text-inherit" aria-hidden="true"></lucide-icon>
            <span>{{ i18n.t()['welcome.loggedIn'] }}, </span>
            <span class="font-bold text-gray-700">{{ dataService.getParentName() }}</span>
          </div>
        }

        <!-- Parent avatar -->
        <div role="button" tabindex="0" class="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-tr from-primary-500 to-teal-400 p-[2px] shadow-soft cursor-pointer hover:shadow-lg transition-shadow"
             aria-label="{{ i18n.t()['nav.settings'] }}">
          <div class="w-full h-full bg-white rounded-full flex items-center justify-center border-2 border-white">
            <lucide-icon name="settings" class="text-inherit" aria-hidden="true"></lucide-icon>
          </div>
        </div>
      </div>
    </header>

    <!-- Quick Switcher Modal (Alt+C) -->
    @if (quickSwitcherOpen()) {
      <div class="fixed inset-0 z-[100] flex items-center justify-center" role="dialog" aria-modal="true" aria-label="{{ i18n.t()['header.quickSwitch'] }}">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" (click)="closeQuickSwitcher()" aria-hidden="true"></div>

        <!-- Switcher Card -->
        <div class="relative z-10 w-full max-w-sm mx-4 bg-white rounded-[2rem] shadow-[0_32px_80px_-12px_rgba(0,0,0,0.25)] border border-slate-100 overflow-hidden animate-slide-up">
          <!-- Top accent -->
          <div class="h-1.5 bg-gradient-to-r from-primary-600 via-primary-500 to-teal-400"></div>

          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div class="flex items-center gap-3">
              <lucide-icon name="repeat" class="text-primary-500" aria-hidden="true"></lucide-icon>
              <h2 class="text-lg font-black text-gray-800">{{ i18n.t()['header.quickSwitch'] }}</h2>
            </div>
            <button type="button" (click)="closeQuickSwitcher()"
                    class="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all border border-slate-200">
              <lucide-icon name="x" class="text-inherit" aria-hidden="true"></lucide-icon>
            </button>
          </div>

          <!-- Child Grid -->
          <div class="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
            @for (child of allChildren(); track child.id) {
              <button type="button" (click)="onQuickSwitch(child)"
                      class="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all border-2 text-left"
                      [class.border-primary-300]="child.id === activeChildId()"
                      [class.bg-primary-50]="child.id === activeChildId()"
                      [class.border-slate-100]="child.id !== activeChildId()"
                      [class.hover:bg-slate-50]="child.id !== activeChildId()">
                <!-- Avatar -->
                <div class="relative shrink-0">
                  <img [src]="child.avatarUrl" [alt]="child.name"
                       class="w-14 h-14 rounded-full object-cover shadow-sm"
                       [class.border-2]="true"
                       [class.border-primary-400]="child.id === activeChildId()"
                       [class.border-slate-200]="child.id !== activeChildId()" />
                  @if (child.id === activeChildId()) {
                    <span class="absolute -bottom-1 -right-1 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                      <lucide-icon name="check" class="text-white text-[10px]" aria-hidden="true"></lucide-icon>
                    </span>
                  }
                </div>
                <!-- Name + Age -->
                <div class="flex flex-col flex-1 min-w-0">
                  <span class="font-extrabold text-gray-800 truncate">{{ child.name }}</span>
                  <span class="text-xs text-gray-500 font-medium">{{ getChildAgeStr(child) }}</span>
                </div>
                <!-- Active badge -->
                @if (child.id === activeChildId()) {
                  <span class="text-xs font-bold text-primary-600 bg-primary-100 px-2 py-1 rounded-full shrink-0">
                    {{ i18n.t()['child.activeBadge'] }}
                  </span>
                }
              </button>
            }

            <!-- Add New Member -->
            <button type="button" (click)="onAddNewMember()"
                    class="w-full flex items-center justify-center gap-2 py-3.5 mt-2 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold border-2 border-dashed border-slate-200 hover:border-slate-300 transition-all">
              <lucide-icon name="circle-plus" class="text-inherit" aria-hidden="true"></lucide-icon>
              {{ i18n.t()['header.addNewMember'] }}
            </button>
          </div>

          <!-- Footer hint -->
          <div class="px-6 py-3 bg-slate-50 border-t border-gray-100 text-center">
            <span class="text-xs text-gray-400 font-medium">{{ i18n.t()['header.altShortcut'] }}</span>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .animate-slide-up {
      animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    button:not(:disabled):active {
      transform: scale(0.98);
    }
  `]
})
export class HeaderComponent implements OnDestroy {
  @Input() currentTab = 'home';
  @Input() viewState: 'selector' | 'app' = 'selector';
  @Input() switching = false;

  @Output() childSwitchRequested = new EventEmitter<string>();
  @Output() addChildRequested = new EventEmitter<void>();
  @Output() switchProfileRequested = new EventEmitter<void>();
  @Output() backRequested = new EventEmitter<void>();
  @Output() localeToggleRequested = new EventEmitter<void>();
  @Output() exportRequested = new EventEmitter<void>();

  dataService = inject(DataService);
  i18n = inject(I18nService);

  showDropdown = signal(false);
  quickSwitcherOpen = signal(false);

  // ── Computed ────────────────────────────────────────────────────

  allChildren = computed(() => this.dataService.children());

  activeChild = computed(() => {
    const activeId = this.dataService.activeChildId();
    return this.dataService.children().find(c => c.id === activeId) ?? null;
  });

  activeChildId = computed(() => this.dataService.activeChildId());

  hasChildren = computed(() => this.allChildren().length > 0);

  activeChildAge = computed(() => {
    const child = this.activeChild();
    if (!child) return null;
    return this.getChildAgeStr(child);
  });

  pageTitle = computed(() => {
    const t = this.i18n.t();
    const tabTitles: Record<string, string> = {
      home: t['nav.home'],
      diary: t['nav.diary'],
      temperature: t['nav.temperatureDiary'],
      growth: t['nav.growthTracking'],
      records: t['nav.records'],
      settings: t['nav.settings'],
    };
    return tabTitles[this.currentTab] ?? t['nav.home'];
  });

  // ── Keyboard shortcut: Alt+C ─────────────────────────────────────

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.altKey && event.key.toLowerCase() === 'c') {
      event.preventDefault();
      if (this.viewState === 'app' && this.hasChildren()) {
        this.openQuickSwitcher();
      }
    }
    if (event.key === 'Escape' && this.quickSwitcherOpen()) {
      this.closeQuickSwitcher();
    }
  }

  // ── Quick Switcher ─────────────────────────────────────────────

  openQuickSwitcher() {
    this.quickSwitcherOpen.set(true);
    this.showDropdown.set(false);
  }

  closeQuickSwitcher() {
    this.quickSwitcherOpen.set(false);
  }

  onQuickSwitch(child: ChildProfile) {
    this.childSwitchRequested.emit(child.id);
    this.closeQuickSwitcher();
  }

  // ── Dropdown ────────────────────────────────────────────────────

  toggleDropdown() {
    this.showDropdown.update(v => !v);
    if (this.showDropdown()) {
      this.quickSwitcherOpen.set(false);
    }
  }

  onChildSelected(child: ChildProfile) {
    this.childSwitchRequested.emit(child.id);
    this.showDropdown.set(false);
  }

  onSwitchChild() {
    this.switchProfileRequested.emit();
    this.showDropdown.set(false);
  }

  onAddNewMember() {
    this.addChildRequested.emit();
    this.showDropdown.set(false);
    this.quickSwitcherOpen.set(false);
  }

  // ── Click outside ──────────────────────────────────────────────

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('app-header')) {
      this.showDropdown.set(false);
    }
  }

  // ── Helpers ────────────────────────────────────────────────────

  toDisplay(yyyymmdd: string, locale: string): string {
    if (!yyyymmdd || yyyymmdd.includes('/')) return yyyymmdd;
    const [y, m, d] = yyyymmdd.split('-');
    if (locale === 'sq') return d + '/' + m + '/' + y;
    return m + '/' + d + '/' + y;
  }

  getChildAgeStr(child: ChildProfile): string {
    const age = this.dataService.getChildAge(child);
    const isSq = this.i18n.isSq();
    if (age.years > 0) {
      return isSq ? `${age.years} vjeç` : `${age.years} years`;
    }
    return isSq ? `${age.months} muaj` : `${age.months} months`;
  }

  ngOnDestroy() {
    // Cleanup if needed
  }
}