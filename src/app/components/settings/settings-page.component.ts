import { Component, inject, signal, computed, Output, EventEmitter } from '@angular/core'
import { LucideAngularModule } from 'lucide-angular';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="max-w-2xl mx-auto px-4 py-6 space-y-6">

      <!-- Section 1: Parent Profile -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <!-- Indigo accent bar -->
        <div class="h-1 bg-gradient-to-r from-indigo-500 to-indigo-400"></div>
        <div class="p-6">
          <h3 class="text-lg font-extrabold text-gray-800 mb-6 flex items-center gap-3">
            <lucide-icon name="user" class="text-inherit"></lucide-icon>
            {{ i18n.t()['settings.parentProfile'] }}
          </h3>

          @if (saveSuccess()) {
            <div class="mb-5 p-4 bg-teal-50 border border-teal-100 rounded-2xl flex items-center gap-3 animate-fade-in">
              <lucide-icon name="check-circle" class="text-inherit"></lucide-icon>
              <p class="text-teal-700 text-sm font-medium">{{ i18n.t()['settings.saved'] }}</p>
            </div>
          }

          <div class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-indigo-700 mb-2 ml-1 uppercase tracking-wider">
                  {{ i18n.t()['settings.name'] }}
                </label>
                <input type="text" [(ngModel)]="parentForm().name"
                       class="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-gray-800 text-sm">
              </div>
              <div>
                <label class="block text-xs font-bold text-indigo-700 mb-2 ml-1 uppercase tracking-wider">
                  {{ i18n.t()['settings.surname'] }}
                </label>
                <input type="text" [(ngModel)]="parentForm().surname"
                       class="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-gray-800 text-sm">
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-indigo-700 mb-2 ml-1 uppercase tracking-wider">
                {{ i18n.t()['settings.phone'] }}
              </label>
              <input type="tel" [(ngModel)]="parentForm().phone"
                     class="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-gray-800 text-sm">
            </div>
            <button (click)="saveParentProfile()"
                    [disabled]="isSaving()"
                    class="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-base">
              @if (isSaving()) {
                <lucide-icon name="loader" class="text-inherit"></lucide-icon>
              } @else {
                <lucide-icon name="save" class="text-inherit"></lucide-icon>
              }
              {{ i18n.t()['settings.saveChanges'] }}
            </button>
          </div>
        </div>
      </div>

      <!-- Section 2: Language Toggle -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 class="text-lg font-extrabold text-gray-800 mb-5 flex items-center gap-3">
          <lucide-icon name="globe" class="text-inherit"></lucide-icon>
          {{ i18n.t()['settings.language'] }}
        </h3>
        <div class="flex items-center justify-center">
          <div class="flex items-center gap-0 rounded-full bg-slate-100 p-1.5">
            <button aria-label="Switch to Albanian" (click)="setLocale('sq')"
                    [class]="activeClass('sq')">
              @if (i18n.locale() === 'sq') {
                <lucide-icon name="check" class="text-inherit"></lucide-icon>
              }
              {{ i18n.t()['settings.language.sq'] }}
            </button>
            <button aria-label="Switch to English" (click)="setLocale('en')"
                    [class]="activeClass('en')">
              @if (i18n.locale() === 'en') {
                <lucide-icon name="check" class="text-inherit"></lucide-icon>
              }
              {{ i18n.t()['settings.language.en'] }}
            </button>
          </div>
        </div>
      </div>

      <!-- Section 3: Notifications -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <!-- Amber accent bar -->
        <div class="h-1 bg-gradient-to-r from-amber-500 to-amber-400"></div>
        <div class="p-6">
          <h3 class="text-lg font-extrabold text-gray-800 mb-5 flex items-center gap-3">
            <lucide-icon name="bell" class="text-inherit"></lucide-icon>
            {{ i18n.t()['settings.notifications.title'] }}
          </h3>

          @if (!notifSvc.isSupported) {
            <p class="text-sm text-amber-600 bg-amber-50 rounded-xl p-4">
              {{ i18n.locale() === 'sq' ? 'Shfletuesi juaj nuk mbështet njoftimet.' : 'Your browser does not support notifications.' }}
            </p>
          } @else {

            <!-- Master toggle -->
            <div class="flex items-center justify-between py-3 border-b border-slate-100">
              <div>
                <p class="font-bold text-gray-800 text-sm">{{ i18n.t()['settings.notifications.enable'] }}</p>
                <p class="text-xs text-gray-500 mt-0.5">{{ i18n.t()['settings.notifications.enableDesc'] }}</p>
              </div>
              <button
                (click)="toggleNotifications()"
                role="switch"
                [attr.aria-checked]="notifSvc.enabled()"
                class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                [class]="notifSvc.enabled() ? 'bg-indigo-500' : 'bg-slate-200'"
              >
                <span class="inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform"
                      [class]="notifSvc.enabled() ? 'translate-x-6' : 'translate-x-1'"></span>
              </button>
            </div>

            @if (notifSvc.permissionLevel === 'denied' && !notifSvc.enabled()) {
              <div class="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
                {{ i18n.t()['settings.notifications.browserDenied'] }}
              </div>
            }

            @if (notifSvc.enabled()) {
              <!-- Fever Alerts toggle -->
              <div class="flex items-center justify-between py-3 border-b border-slate-100">
                <div>
                  <p class="font-bold text-gray-800 text-sm">{{ i18n.t()['settings.notifications.feverAlerts'] }}</p>
                  <p class="text-xs text-gray-500 mt-0.5">{{ i18n.t()['settings.notifications.feverAlertsDesc'] }}</p>
                </div>
                <button
                  (click)="notifSvc.updatePrefs({ feverAlerts: !notifSvc.feverAlerts() })"
                  role="switch"
                  [attr.aria-checked]="notifSvc.feverAlerts()"
                  class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  [class]="notifSvc.feverAlerts() ? 'bg-rose-500' : 'bg-slate-200'"
                >
                  <span class="inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform"
                        [class]="notifSvc.feverAlerts() ? 'translate-x-6' : 'translate-x-1'"></span>
                </button>
              </div>

              <!-- Vaccine Alerts toggle -->
              <div class="flex items-center justify-between py-3 border-b border-slate-100">
                <div>
                  <p class="font-bold text-gray-800 text-sm">{{ i18n.t()['settings.notifications.vaccineAlerts'] }}</p>
                  <p class="text-xs text-gray-500 mt-0.5">{{ i18n.t()['settings.notifications.vaccineAlertsDesc'] }}</p>
                </div>
                <button
                  (click)="notifSvc.updatePrefs({ vaccineAlerts: !notifSvc.vaccineAlerts() })"
                  role="switch"
                  [attr.aria-checked]="notifSvc.vaccineAlerts()"
                  class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  [class]="notifSvc.vaccineAlerts() ? 'bg-teal-500' : 'bg-slate-200'"
                >
                  <span class="inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform"
                        [class]="notifSvc.vaccineAlerts() ? 'translate-x-6' : 'translate-x-1'"></span>
                </button>
              </div>

              <!-- Do Not Disturb -->
              <div class="pt-3">
                <p class="font-bold text-gray-800 text-sm mb-3">{{ i18n.t()['settings.notifications.dnd'] }}</p>
                <p class="text-xs text-gray-500 mb-3">{{ i18n.t()['settings.notifications.dndDesc'] }}</p>
                <div class="flex items-center gap-3">
                  <div class="flex items-center gap-2">
                    <label class="text-xs font-semibold text-gray-600">{{ i18n.t()['settings.notifications.dndFrom'] }}</label>
                    <select
                      [value]="notifSvc.dndStart()"
                      (change)="notifSvc.updatePrefs({ dndStart: +$any($event.target).value })"
                      class="px-3 py-2 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm font-medium text-gray-700 focus:border-indigo-400 focus:outline-none"
                    >
                      @for (h of hours; track h.value) {
                        <option [value]="h.value">{{ h.label }}</option>
                      }
                    </select>
                  </div>
                  <span class="text-gray-400 font-medium">—</span>
                  <div class="flex items-center gap-2">
                    <label class="text-xs font-semibold text-gray-600">{{ i18n.t()['settings.notifications.dndTo'] }}</label>
                    <select
                      [value]="notifSvc.dndEnd()"
                      (change)="notifSvc.updatePrefs({ dndEnd: +$any($event.target).value })"
                      class="px-3 py-2 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm font-medium text-gray-700 focus:border-indigo-400 focus:outline-none"
                    >
                      @for (h of hours; track h.value) {
                        <option [value]="h.value">{{ h.label }}</option>
                      }
                    </select>
                  </div>
                </div>
              </div>
            }
          }
        </div>
      </div>

      <!-- Section 4: Children Management -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <!-- Teal accent bar -->
        <div class="h-1 bg-gradient-to-r from-teal-500 to-teal-400"></div>
        <div class="p-6">
          <h3 class="text-lg font-extrabold text-gray-800 mb-5 flex items-center gap-3">
            <lucide-icon name="baby" class="text-inherit"></lucide-icon>
            {{ i18n.t()['settings.children'] }}
          </h3>

          @if (dataService.children().length === 0) {
            <p class="text-gray-500 text-sm text-center py-6">
              {{ i18n.t()['settings.noChildren'] }}
            </p>
          } @else {
            <div class="space-y-3 mb-6">
              @for (child of dataService.children(); track child.id) {
                <div class="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 group">
                  <!-- Avatar -->
                  <img [src]="child.avatarUrl" class="w-12 h-12 rounded-full border-2 border-slate-200 flex-shrink-0" />
                  <!-- Info -->
                  <div class="flex-1 min-w-0">
                    <p class="font-bold text-gray-800 truncate">{{ child.name }}</p>
                    <p class="text-xs text-gray-500">{{ formatDate(child.dateOfBirth) }}</p>
                  </div>
                  <!-- Actions -->
                  @if (deleteConfirmId() === child.id) {
                    <!-- Inline confirm -->
                    <div class="flex items-center gap-2 animate-fade-in">
                      <span class="text-xs text-gray-500">{{ i18n.t()['settings.children.confirmDelete'] }}</span>
                      <button (click)="confirmDeleteChild(child.id)"
                              class="px-3 py-1.5 bg-rose-500 text-white text-xs font-bold rounded-lg hover:bg-rose-600 transition-colors">
                        {{ i18n.t()['settings.confirm'] }}
                      </button>
                      <button (click)="cancelDelete()"
                              class="px-3 py-1.5 bg-slate-200 text-gray-600 text-xs font-bold rounded-lg hover:bg-slate-300 transition-colors">
                        {{ i18n.t()['settings.cancel'] }}
                      </button>
                    </div>
                  } @else {
                    <div class="flex items-center gap-2">
                      <button (click)="openEditChild.emit(child)"
                              class="px-3 py-2 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-all flex items-center gap-1.5">
                        <lucide-icon name="pencil" class="text-inherit"></lucide-icon>
                        {{ i18n.t()['settings.children.edit'] }}
                      </button>
                      <button (click)="requestDelete(child.id)"
                              class="px-3 py-2 bg-white border border-slate-200 text-slate-400 text-xs font-bold rounded-xl hover:bg-rose-50 hover:border-rose-300 hover:text-rose-500 transition-all flex items-center gap-1.5">
                        <lucide-icon name="trash-2" class="text-inherit"></lucide-icon>
                        {{ i18n.t()['settings.children.delete'] }}
                      </button>
                    </div>
                  }
                </div>
              }
            </div>
          }

          <button (click)="openAddChild.emit()"
                  class="w-full border-2 border-dashed border-slate-300 text-slate-500 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm">
            <lucide-icon name="plus" class="text-inherit"></lucide-icon>
            {{ i18n.t()['settings.children.add'] }}
          </button>
        </div>
      </div>

      <!-- Section 4: Data Management -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 class="text-lg font-extrabold text-gray-800 mb-5 flex items-center gap-3">
          <lucide-icon name="database" class="text-inherit"></lucide-icon>
          {{ i18n.t()['settings.data.title'] }}
        </h3>

        @if (showClearConfirm()) {
          <div class="mb-5 p-5 bg-rose-50 border-2 border-rose-200 rounded-2xl animate-fade-in">
            <p class="text-sm text-gray-700 mb-4 font-medium flex items-center gap-2">
              <lucide-icon name="alert-triangle" class="text-inherit"></lucide-icon>
              {{ i18n.t()['settings.data.clearConfirm'] }}
            </p>
            <div class="flex gap-3">
              <button (click)="confirmClearAllData()"
                      class="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-rose-400 text-white font-bold hover:from-rose-400 hover:to-rose-300 transition-all text-sm shadow-sm flex items-center justify-center gap-2">
                <lucide-icon name="trash" class="text-inherit"></lucide-icon>
                {{ i18n.t()['settings.confirm'] }}
              </button>
              <button (click)="cancelClearAllData()"
                      class="flex-1 py-3 rounded-xl border-2 border-slate-200 text-gray-600 font-bold hover:bg-slate-100 transition-all text-sm">
                {{ i18n.t()['settings.cancel'] }}
              </button>
            </div>
          </div>
        }

        <div class="space-y-3">
          <button (click)="exportData()"
                  class="w-full border-2 border-slate-200 text-slate-600 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 text-base">
            <lucide-icon name="download" class="text-inherit"></lucide-icon>
            {{ i18n.t()['settings.data.export'] }}
          </button>
          @if (!showClearConfirm()) {
            <button (click)="requestClearAllData()"
                    class="w-full border-2 border-rose-200 text-rose-500 hover:bg-rose-50 hover:border-rose-300 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm">
              <lucide-icon name="trash-2" class="text-inherit"></lucide-icon>
              {{ i18n.t()['settings.data.clear'] }}
            </button>
          }
        </div>
      </div>

      <!-- Section 5: About -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
        <div class="flex items-center justify-center gap-3 mb-3">
          <lucide-icon name="heart" class="text-indigo-500" style="font-size: 32px;"></lucide-icon>
          <span class="text-[28px] font-extrabold text-gray-800 tracking-tight">KidDok</span>
        </div>
        <p class="text-gray-500 font-medium text-base mb-1">{{ i18n.t()['settings.about.tagline'] }}</p>
        <p class="text-gray-500 text-sm">{{ i18n.t()['settings.about.version'] }}</p>
      </div>

    </div>
  `,
  styles: [`
    .animate-fade-in {
      animation: fadeIn 0.25s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class SettingsPageComponent {
  dataService = inject(DataService);
  i18n = inject(I18nService);
  private notifSvc = inject(NotificationService);

  @Output() openEditChild = new EventEmitter<any>();
  @Output() openAddChild = new EventEmitter<void>();

  parentForm = signal({ name: '', surname: '', phone: '' });
  saveSuccess = signal(false);
  isSaving = signal(false);
  showClearConfirm = signal(false);
  deleteConfirmId = signal<string | null>(null);

  hours: { value: number; label: string }[] = Array.from({ length: 24 }, (_, i) => ({
    value: i,
    label: `${i.toString().padStart(2, '0')}:00`,
  }));

  ngOnInit() {
    this.loadParentProfile();
  }

  loadParentProfile(): void {
    const profile = this.dataService.parentProfile();
    this.parentForm.set({ name: profile.name, surname: profile.surname, phone: profile.phone });
  }

  async saveParentProfile(): Promise<void> {
    this.isSaving.set(true);
    try {
      await this.dataService.updateParentProfile(this.parentForm());
      this.saveSuccess.set(true);
      setTimeout(() => this.saveSuccess.set(false), 3000);
    } finally {
      this.isSaving.set(false);
    }
  }

  setLocale(locale: 'sq' | 'en'): void {
    this.i18n.setLocale(locale);
  }

  async toggleNotifications(): Promise<void> {
    await this.notifSvc.toggleEnabled();
  }

  activeClass(locale: 'sq' | 'en'): string {
    const isActive = this.i18n.locale() === locale;
    return isActive
      ? 'flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-indigo-500 text-white font-bold text-sm shadow-sm transition-all'
      : 'flex items-center gap-1.5 px-5 py-2.5 rounded-full text-stone-500 font-medium text-sm hover:text-stone-700 transition-all';
  }

  formatDate(dob: string): string {
    if (!dob) return '';
    try {
      const date = new Date(dob);
      const d = date.getDate().toString().padStart(2, '0');
      const m = (date.getMonth() + 1).toString().padStart(2, '0');
      const y = date.getFullYear();
      return `${d}/${m}/${y}`;
    } catch {
      return dob;
    }
  }

  requestDelete(childId: string): void {
    this.deleteConfirmId.set(childId);
  }

  cancelDelete(): void {
    this.deleteConfirmId.set(null);
  }

  async confirmDeleteChild(childId: string): Promise<void> {
    this.deleteConfirmId.set(null);
    await this.dataService.deleteChild(childId);
  }

  requestClearAllData(): void {
    this.showClearConfirm.set(true);
  }

  cancelClearAllData(): void {
    this.showClearConfirm.set(false);
  }

  async confirmClearAllData(): Promise<void> {
    await this.dataService.clearAllData();
    window.location.reload();
  }

  exportData(): void {
    const data = this.dataService.exportAllData();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    a.href = url;
    a.download = `kiddok-export-${date}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
