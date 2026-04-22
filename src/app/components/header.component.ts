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
import { DataService, ChildProfile } from '../services/data.service';
import { I18nService } from '../core/i18n/i18n.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="px-6 py-5 lg:px-10 lg:py-7 flex items-center justify-between lg:justify-end border-b border-gray-200/50 bg-white/60 backdrop-blur-xl z-30 shadow-sm">

      <!-- LEFT: Back button + Page title -->
      <div class="flex items-center gap-3">
        @if (viewState === 'app') {
          <button (click)="backRequested.emit()"
                  class="flex items-center gap-2 px-3 py-2 rounded-xl bg-white shadow-soft border border-gray-100 hover:border-primary-300 hover:shadow-md transition-all text-gray-600 hover:text-primary-600">
            <span class="material-icons text-lg">arrow_back</span>
            <span class="text-sm font-bold hidden sm:block">{{ i18n.t()['nav.back'] }}</span>
          </button>
        }
        <button class="lg:hidden p-2 rounded-xl bg-white shadow-soft border border-gray-100">
          <span class="material-icons text-gray-700">menu</span>
        </button>
        <!-- Page title -->
        <h1 class="text-base lg:text-lg font-extrabold text-gray-800 hidden sm:block ml-2">
          {{ pageTitle() }}
        </h1>
      </div>

      <!-- RIGHT: Language toggle + Child switcher + Parent avatar -->
      <div class="flex items-center gap-4 lg:gap-8">

        <!-- Language toggle (mobile only) -->
        <button (click)="localeToggleRequested.emit()"
                class="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-xs font-bold text-gray-600 transition-all"
                aria-label="Switch to English/Albanian">
          <span class="material-icons text-sm">language</span>
          {{ i18n.locale() === 'sq' ? i18n.t()['header.sq'] : i18n.t()['header.en'] }}
        </button>

        <!-- Child Switcher Pill -->
        <div class="relative" #dropdownRef>
          <button (click)="toggleDropdown()"
                  class="flex items-center gap-3 bg-white px-4 py-2 lg:py-2.5 rounded-2xl shadow-soft border border-gray-100 hover:border-primary-300 hover:shadow-md transition-all"
                  [class.border-primary-300]="showDropdown()"
                  [class.shadow-md]="showDropdown()">
            @if (activeChild()) {
              <img [src]="activeChild()!.avatarUrl"
                   class="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-primary-100 object-cover" />
              <span class="font-bold text-gray-800 hidden sm:block text-sm lg:text-base">{{ activeChild()!.name }}</span>
              @if (activeChildAge()) {
                <span class="bg-primary-50 text-primary-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {{ activeChildAge() }}
                </span>
              }
            } @else {
              <div class="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300">
                <span class="material-icons text-gray-500 text-sm">person</span>
              </div>
              <span class="font-bold text-gray-500 hidden sm:block">{{ i18n.t()['child.addNewBtn'] }}</span>
            }
            <span class="material-icons text-gray-500 text-sm transition-transform duration-200"
                  [class.rotate-180]="showDropdown()">expand_more</span>
          </button>

          <!-- Dropdown Panel -->
          @if (showDropdown()) {
            <div class="absolute right-0 top-full mt-2 w-80 bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 py-3 animate-slide-up z-50 overflow-hidden max-h-[80vh] overflow-y-auto">

              <!-- Section label -->
              <div class="px-5 pb-3 pt-1 mb-2 border-b border-gray-50 flex items-center gap-2">
                <span class="material-icons text-primary-500 text-sm">family_restroom</span>
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
                <div (click)="onChildSelected(child)"
                     class="flex items-center gap-4 px-5 py-3 hover:bg-primary-50 cursor-pointer transition-colors mx-2 mt-0 rounded-2xl border border-transparent hover:border-primary-100 group"
                     [class.bg-indigo-50]="child.id === activeChildId()">
                  <img [src]="child.avatarUrl"
                       class="w-12 h-12 rounded-full border border-gray-200 shadow-sm" />
                  <div class="flex flex-col flex-1 min-w-0">
                    <span class="font-extrabold text-gray-800 group-hover:text-primary-700 transition-colors truncate">{{ child.name }}</span>
                    <span class="text-xs text-gray-500 font-medium">
                      {{ i18n.t()['child.born'] }}: {{ toDisplay(child.dateOfBirth, i18n.locale()) }}
                    </span>
                  </div>
                  @if (child.id === activeChildId()) {
                    <span class="material-icons text-teal-500 bg-teal-50 rounded-full p-1 flex-shrink-0">check</span>
                  }
                </div>
              }

              <!-- Action buttons -->
              @if (hasChildren()) {
                <div class="px-4 pt-2 pb-1 mt-2 border-t border-gray-100">
                  <button (click)="onSwitchChild()"
                          class="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-primary-50 hover:bg-primary-100 text-primary-700 font-bold transition-colors border border-primary-200">
                    <span class="material-icons text-lg">swap_horiz</span>
                    {{ i18n.t()['header.switchChild'] }}
                  </button>
                </div>
              }
              <div class="px-4 pt-2 mt-1">
                <button (click)="onAddNewMember()"
                        class="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold transition-colors border border-slate-200 hover:border-slate-300">
                  <span class="material-icons text-base">add_circle_outline</span>
                  {{ i18n.t()['header.addNewMember'] }}
                </button>
              </div>
            </div>
          }
        </div>

        <!-- Parent welcome block (desktop only, app view) -->
        @if (viewState === 'app' && dataService.getParentName()) {
          <div class="hidden lg:flex items-center gap-2 text-sm text-gray-500 font-medium">
            <span class="material-icons text-teal-500 text-lg">waving_hand</span>
            <span>{{ i18n.t()['welcome.loggedIn'] }}, </span>
            <span class="font-bold text-gray-700">{{ dataService.getParentName() }}</span>
          </div>
        }

        <!-- Parent avatar -->
        <div class="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-tr from-primary-500 to-teal-400 p-[2px] shadow-soft cursor-pointer hover:shadow-lg transition-shadow">
          <div class="w-full h-full bg-white rounded-full flex items-center justify-center border-2 border-white">
            <span class="material-icons text-gray-700 lg:text-xl text-lg">manage_accounts</span>
          </div>
        </div>
      </div>
    </header>
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

  @Output() childSwitchRequested = new EventEmitter<string>();
  @Output() addChildRequested = new EventEmitter<void>();
  @Output() switchProfileRequested = new EventEmitter<void>();
  @Output() backRequested = new EventEmitter<void>();
  @Output() localeToggleRequested = new EventEmitter<void>();

  dataService = inject(DataService);
  i18n = inject(I18nService);

  showDropdown = signal(false);
  private dropdownRef: HTMLElement | null = null;

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
    const age = this.dataService.getChildAge(child);
    const isSq = this.i18n.isSq();
    if (age.years > 0) {
      const label = isSq ? '{n} vjeç' : '{n} years';
      return label.replace('{n}', String(age.years));
    }
    const label = isSq ? '{n} muaj' : '{n} months';
    return label.replace('{n}', String(age.months));
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

  // ── Dropdown ────────────────────────────────────────────────────

  toggleDropdown() {
    this.showDropdown.update(v => !v);
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
  }

  // ── Click outside ───────────────────────────────────────────────

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Close if click is outside the dropdown AND outside the trigger button
    if (!target.closest('app-header')) {
      this.showDropdown.set(false);
    }
  }

  // ── Date helpers ────────────────────────────────────────────────

  toDisplay(yyyymmdd: string, locale: string): string {
    if (!yyyymmdd || yyyymmdd.includes('/')) return yyyymmdd;
    const [y, m, d] = yyyymmdd.split('-');
    if (locale === 'sq') return d + '/' + m + '/' + y;
    return m + '/' + d + '/' + y;
  }

  ngOnDestroy() {
    // Cleanup if needed
  }
}
