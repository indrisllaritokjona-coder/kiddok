import { Component, inject, signal, computed, Output, EventEmitter, OnInit } from '@angular/core'
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { NotificationService } from '../../services/notification.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="max-w-2xl mx-auto px-4 py-6 space-y-6">

      <!-- Section 1: Parent Profile -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <!-- Indigo accent bar -->
        <div class="h-1 bg-gradient-to-r from-indigo-500 to-indigo-400"></div>
        <div class="p-6">
          <h3 class="text-lg font-extrabold text-gray-800 dark:text-slate-100 mb-6 flex items-center gap-3">
            <lucide-icon name="user" class="text-inherit"></lucide-icon>
            {{ i18n.t()['settings.parentProfile'] }}
          </h3>

          @if (saveSuccess()) {
            <div class="mb-5 p-4 bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800 rounded-2xl flex items-center gap-3 animate-fade-in">
              <lucide-icon name="check-circle" class="text-inherit"></lucide-icon>
              <p class="text-teal-700 dark:text-teal-300 text-sm font-medium">{{ i18n.t()['settings.saved'] }}</p>
            </div>
          }

          <div class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-2 ml-1 uppercase tracking-wider">
                  {{ i18n.t()['settings.name'] }}
                </label>
                <input type="text" [(ngModel)]="parentForm().name"
                       class="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-600 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-gray-800 dark:text-slate-100 text-sm">
              </div>
              <div>
                <label class="block text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-2 ml-1 uppercase tracking-wider">
                  {{ i18n.t()['settings.surname'] }}
                </label>
                <input type="text" [(ngModel)]="parentForm().surname"
                       class="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-600 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-gray-800 dark:text-slate-100 text-sm">
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-2 ml-1 uppercase tracking-wider">
                {{ i18n.t()['settings.phone'] }}
              </label>
              <input type="tel" [(ngModel)]="parentForm().phone"
                     class="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-600 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-gray-800 dark:text-slate-100 text-sm">
            </div>
            <button (click)="saveParentProfile()"
                    [disabled]="isSaving()"
                    class="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-base">
              @if (isSaving()) {
                <lucide-icon name="loader" class="text-inherit animate-spin"></lucide-icon>
              } @else {
                <lucide-icon name="save" class="text-inherit"></lucide-icon>
              }
              {{ i18n.t()['settings.saveChanges'] }}
            </button>
          </div>
        </div>
      </div>

      <!-- Section 2: Appearance / Theme -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <!-- Purple accent bar -->
        <div class="h-1 bg-gradient-to-r from-purple-500 to-purple-400"></div>
        <div class="p-6">
          <h3 class="text-lg font-extrabold text-gray-800 dark:text-slate-100 mb-5 flex items-center gap-3">
            <lucide-icon name="palette" class="text-inherit"></lucide-icon>
            {{ i18n.t()['settings.theme.title'] }}
          </h3>

          <!-- Dark Mode Toggle -->
          <div class="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700">
            <div>
              <p class="font-bold text-gray-800 dark:text-slate-100 text-sm">{{ i18n.t()['settings.theme.darkMode'] }}</p>
              <p class="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{{ i18n.t()['settings.theme.darkModeDesc'] }}</p>
            </div>
            <button
              (click)="themeSvc.toggleDarkMode()"
              role="switch"
              [attr.aria-checked]="themeSvc.darkMode()"
              class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              [class]="themeSvc.darkMode() ? 'bg-purple-500' : 'bg-slate-200 dark:bg-slate-600'"
            >
              <span class="inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform"
                    [class]="themeSvc.darkMode() ? 'translate-x-6' : 'translate-x-1'"></span>
            </button>
          </div>

          <!-- Accent Color Picker -->
          <div class="py-4 border-b border-slate-100 dark:border-slate-700">
            <p class="font-bold text-gray-800 dark:text-slate-100 text-sm mb-3">{{ i18n.t()['settings.theme.accentColor'] }}</p>
            <p class="text-xs text-gray-500 dark:text-slate-400 mb-4">{{ i18n.t()['settings.theme.accentColorDesc'] }}</p>
            <div class="flex items-center gap-3">
              @for (color of accentColors; track color.id) {
                <button
                  (click)="themeSvc.setAccentColor(color.id)"
                  [attr.aria-label]="i18n.t()['settings.theme.color.' + color.id]"
                  [title]="i18n.t()['settings.theme.color.' + color.id]"
                  class="w-10 h-10 rounded-full border-2 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                  [style.background-color]="color.bg"
                  [style.border-color]="themeSvc.accentColor() === color.id ? color.border : 'transparent'"
                  [class]="themeSvc.accentColor() === color.id ? 'border-2 scale-110' : 'border-transparent hover:scale-105'"
                  [style.border-color]="themeSvc.accentColor() === color.id ? color.border : 'transparent'"
                >
                  @if (themeSvc.accentColor() === color.id) {
                    <lucide-icon name="check" class="text-white text-xs mx-auto" [style.color]="color.checkColor"></lucide-icon>
                  }
                </button>
              }
            </div>
          </div>

          <!-- Font Size -->
          <div class="pt-4">
            <p class="font-bold text-gray-800 dark:text-slate-100 text-sm mb-3">{{ i18n.t()['settings.theme.fontSize'] }}</p>
            <p class="text-xs text-gray-500 dark:text-slate-400 mb-4">{{ i18n.t()['settings.theme.fontSizeDesc'] }}</p>
            <div class="flex items-center gap-0 rounded-full bg-slate-100 dark:bg-slate-700 p-1.5">
              @for (size of fontSizes; track size.id) {
                <button
                  (click)="themeSvc.setFontSize(size.id)"
                  [attr.aria-label]="i18n.t()['settings.theme.size.' + size.id]"
                  [class]="themeSvc.fontSize() === size.id
                    ? 'px-5 py-2.5 rounded-full bg-purple-500 text-white font-bold text-sm shadow-sm transition-all'
                    : 'px-5 py-2.5 rounded-full text-slate-500 dark:text-slate-300 font-medium text-sm hover:text-slate-700 dark:hover:text-slate-100 transition-all'"
                >
                  {{ i18n.t()['settings.theme.size.' + size.id] }}
                </button>
              }
            </div>
          </div>
        </div>
      </div>

      <!-- Section 3: Language Toggle -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
        <h3 class="text-lg font-extrabold text-gray-800 dark:text-slate-100 mb-5 flex items-center gap-3">
          <lucide-icon name="globe" class="text-inherit"></lucide-icon>
          {{ i18n.t()['settings.language'] }}
        </h3>
        <div class="flex items-center justify-center">
          <div class="flex items-center gap-0 rounded-full bg-slate-100 dark:bg-slate-700 p-1.5">
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

      <!-- Section 4: Notifications -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <!-- Amber accent bar -->
        <div class="h-1 bg-gradient-to-r from-amber-500 to-amber-400"></div>
        <div class="p-6">
          <h3 class="text-lg font-extrabold text-gray-800 dark:text-slate-100 mb-5 flex items-center gap-3">
            <lucide-icon name="bell" class="text-inherit"></lucide-icon>
            {{ i18n.t()['settings.notifications.title'] }}
          </h3>

          @if (!notifSvc.isSupported) {
            <p class="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4">
              {{ i18n.locale() === 'sq' ? 'Shfletuesi juaj nuk mbështet njoftimet.' : 'Your browser does not support notifications.' }}
            </p>
          } @else {

            <!-- Master toggle -->
            <div class="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700">
              <div>
                <p class="font-bold text-gray-800 dark:text-slate-100 text-sm">{{ i18n.t()['settings.notifications.enable'] }}</p>
                <p class="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{{ i18n.t()['settings.notifications.enableDesc'] }}</p>
              </div>
              <button
                (click)="toggleNotifications()"
                role="switch"
                [attr.aria-checked]="notifSvc.enabled()"
                class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                [class]="notifSvc.enabled() ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-600'"
              >
                <span class="inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform"
                      [class]="notifSvc.enabled() ? 'translate-x-6' : 'translate-x-1'"></span>
              </button>
            </div>

            @if (notifSvc.permissionLevel === 'denied' && !notifSvc.enabled()) {
              <div class="mt-3 p-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-700 dark:text-amber-400">
                {{ i18n.t()['settings.notifications.browserDenied'] }}
              </div>
            }

            @if (notifSvc.enabled()) {
              <!-- Fever Alerts toggle -->
              <div class="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700">
                <div>
                  <p class="font-bold text-gray-800 dark:text-slate-100 text-sm">{{ i18n.t()['settings.notifications.feverAlerts'] }}</p>
                  <p class="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{{ i18n.t()['settings.notifications.feverAlertsDesc'] }}</p>
                </div>
                <button
                  (click)="notifSvc.updatePrefs({ feverAlerts: !notifSvc.feverAlerts() })"
                  role="switch"
                  [attr.aria-checked]="notifSvc.feverAlerts()"
                  class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  [class]="notifSvc.feverAlerts() ? 'bg-rose-500' : 'bg-slate-200 dark:bg-slate-600'"
                >
                  <span class="inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform"
                        [class]="notifSvc.feverAlerts() ? 'translate-x-6' : 'translate-x-1'"></span>
                </button>
              </div>

              <!-- Vaccine Alerts toggle -->
              <div class="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700">
                <div>
                  <p class="font-bold text-gray-800 dark:text-slate-100 text-sm">{{ i18n.t()['settings.notifications.vaccineAlerts'] }}</p>
                  <p class="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{{ i18n.t()['settings.notifications.vaccineAlertsDesc'] }}</p>
                </div>
                <button
                  (click)="notifSvc.updatePrefs({ vaccineAlerts: !notifSvc.vaccineAlerts() })"
                  role="switch"
                  [attr.aria-checked]="notifSvc.vaccineAlerts()"
                  class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  [class]="notifSvc.vaccineAlerts() ? 'bg-teal-500' : 'bg-slate-200 dark:bg-slate-600'"
                >
                  <span class="inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform"
                        [class]="notifSvc.vaccineAlerts() ? 'translate-x-6' : 'translate-x-1'"></span>
                </button>
              </div>

              <!-- Do Not Disturb -->
              <div class="pt-3">
                <p class="font-bold text-gray-800 dark:text-slate-100 text-sm mb-3">{{ i18n.t()['settings.notifications.dnd'] }}</p>
                <p class="text-xs text-gray-500 dark:text-slate-400 mb-3">{{ i18n.t()['settings.notifications.dndDesc'] }}</p>
                <div class="flex items-center gap-3">
                  <div class="flex items-center gap-2">
                    <label class="text-xs font-semibold text-gray-600 dark:text-slate-400">{{ i18n.t()['settings.notifications.dndFrom'] }}</label>
                    <select
                      [value]="notifSvc.dndStart()"
                      (change)="notifSvc.updatePrefs({ dndStart: +$any($event.target).value })"
                      class="px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm font-medium text-gray-700 dark:text-slate-100 focus:border-indigo-400 focus:outline-none"
                    >
                      @for (h of hours; track h.value) {
                        <option [value]="h.value">{{ h.label }}</option>
                      }
                    </select>
                  </div>
                  <span class="text-gray-400 dark:text-slate-500 font-medium">—</span>
                  <div class="flex items-center gap-2">
                    <label class="text-xs font-semibold text-gray-600 dark:text-slate-400">{{ i18n.t()['settings.notifications.dndTo'] }}</label>
                    <select
                      [value]="notifSvc.dndEnd()"
                      (change)="notifSvc.updatePrefs({ dndEnd: +$any($event.target).value })"
                      class="px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm font-medium text-gray-700 dark:text-slate-100 focus:border-indigo-400 focus:outline-none"
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

      <!-- Section 5: Children Management -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <!-- Teal accent bar -->
        <div class="h-1 bg-gradient-to-r from-teal-500 to-teal-400"></div>
        <div class="p-6">
          <h3 class="text-lg font-extrabold text-gray-800 dark:text-slate-100 mb-5 flex items-center gap-3">
            <lucide-icon name="baby" class="text-inherit"></lucide-icon>
            {{ i18n.t()['settings.children'] }}
          </h3>

          @if (dataService.children().length === 0) {
            <p class="text-gray-500 dark:text-slate-400 text-sm text-center py-6">
              {{ i18n.t()['settings.noChildren'] }}
            </p>
          } @else {
            <div class="space-y-3 mb-6">
              @for (child of dataService.children(); track child.id) {
                <div class="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-100 dark:border-slate-600 group">
                  <!-- Avatar -->
                  <img [src]="child.avatarUrl" class="w-12 h-12 rounded-full border-2 border-slate-200 dark:border-slate-600 flex-shrink-0" />
                  <!-- Info -->
                  <div class="flex-1 min-w-0">
                    <p class="font-bold text-gray-800 dark:text-slate-100 truncate">{{ child.name }}</p>
                    <p class="text-xs text-gray-500 dark:text-slate-400">{{ formatDate(child.dateOfBirth) }}</p>
                  </div>
                  <!-- Actions -->
                  @if (deleteConfirmId() === child.id) {
                    <!-- Inline confirm -->
                    <div class="flex items-center gap-2 animate-fade-in">
                      <span class="text-xs text-gray-500 dark:text-slate-400">{{ i18n.t()['settings.children.confirmDelete'] }}</span>
                      <button (click)="confirmDeleteChild(child.id)"
                              class="px-3 py-1.5 bg-rose-500 text-white text-xs font-bold rounded-lg hover:bg-rose-600 transition-colors">
                        {{ i18n.t()['settings.confirm'] }}
                      </button>
                      <button (click)="cancelDelete()"
                              class="px-3 py-1.5 bg-slate-200 dark:bg-slate-600 text-gray-600 dark:text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors">
                        {{ i18n.t()['settings.cancel'] }}
                      </button>
                    </div>
                  } @else {
                    <div class="flex items-center gap-2">
                      <button (click)="openEditChild.emit(child)"
                              class="px-3 py-2 bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all flex items-center gap-1.5">
                        <lucide-icon name="pencil" class="text-inherit"></lucide-icon>
                        {{ i18n.t()['settings.children.edit'] }}
                      </button>
                      <button (click)="requestDelete(child.id)"
                              class="px-3 py-2 bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 text-slate-400 dark:text-slate-500 text-xs font-bold rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:border-rose-300 dark:hover:border-rose-700 hover:text-rose-500 dark:hover:text-rose-400 transition-all flex items-center gap-1.5">
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
                  class="w-full border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm">
            <lucide-icon name="plus" class="text-inherit"></lucide-icon>
            {{ i18n.t()['settings.children.add'] }}
          </button>
        </div>
      </div>

      <!-- Section 6: Data Management -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <h3 class="text-lg font-extrabold text-gray-800 dark:text-slate-100 mb-5 flex items-center gap-3">
          <lucide-icon name="database" class="text-inherit"></lucide-icon>
          {{ i18n.t()['settings.data.title'] }}
        </h3>

        @if (showClearConfirm()) {
          <div class="mb-5 p-5 bg-rose-50 dark:bg-rose-900/30 border-2 border-rose-200 dark:border-rose-800 rounded-2xl animate-fade-in">
            <p class="text-sm text-gray-700 dark:text-rose-200 mb-4 font-medium flex items-center gap-2">
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
                      class="flex-1 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 text-gray-600 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all text-sm">
                {{ i18n.t()['settings.cancel'] }}
              </button>
            </div>
          </div>
        }

        <div class="space-y-3">
          <button (click)="exportData()"
                  class="w-full border-2 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:border-teal-300 dark:hover:border-teal-600 hover:text-teal-700 dark:hover:text-teal-300 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 text-base">
            <lucide-icon name="download" class="text-inherit"></lucide-icon>
            {{ i18n.t()['settings.data.export'] }}
          </button>
          @if (!showClearConfirm()) {
            <button (click)="requestClearAllData()"
                    class="w-full border-2 border-rose-200 dark:border-rose-800 text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:border-rose-300 dark:hover:border-rose-700 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm">
              <lucide-icon name="trash-2" class="text-inherit"></lucide-icon>
              {{ i18n.t()['settings.data.clear'] }}
            </button>
          }
        </div>
      </div>

      <!-- Section 7: About -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 text-center">
        <div class="flex items-center justify-center gap-3 mb-3">
          <lucide-icon name="heart" class="text-indigo-500 dark:text-purple-400" style="font-size: 32px;"></lucide-icon>
          <span class="text-[28px] font-extrabold text-gray-800 dark:text-slate-100 tracking-tight">KidDok</span>
        </div>
        <p class="text-gray-500 dark:text-slate-400 font-medium text-base mb-1">{{ i18n.t()['settings.about.tagline'] }}</p>
        <p class="text-gray-500 dark:text-slate-400 text-sm">{{ i18n.t()['settings.about.version'] }}</p>
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
export class SettingsPageComponent implements OnInit {
  dataService = inject(DataService);
  i18n = inject(I18nService);
  notifSvc = inject(NotificationService);
  themeSvc = inject(ThemeService);

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

  accentColors = [
    { id: 'purple' as const, bg: '#8b5cf6', border: '#7c3aed', checkColor: '#ffffff' },
    { id: 'blue' as const, bg: '#3b82f6', border: '#2563eb', checkColor: '#ffffff' },
    { id: 'green' as const, bg: '#22c55e', border: '#16a34a', checkColor: '#ffffff' },
    { id: 'orange' as const, bg: '#f97316', border: '#ea580c', checkColor: '#ffffff' },
  ];

  fontSizes = [
    { id: 'small' as const },
    { id: 'medium' as const },
    { id: 'large' as const },
  ];

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
      : 'flex items-center gap-1.5 px-5 py-2.5 rounded-full text-stone-500 dark:text-slate-300 font-medium text-sm hover:text-stone-700 dark:hover:text-slate-100 transition-all';
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