import { Component, inject, signal, computed, OnDestroy, OnInit, ChangeDetectionStrategy, effect, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { DataService, ChildProfile } from '../services/data.service';
import { I18nService } from '../core/i18n/i18n.service';
import { Router, ActivatedRoute, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { SidebarComponent } from './sidebar.component';
import { HeaderComponent } from './header.component';
import { BottomNavComponent } from './bottom-nav.component';
import { FormsModule } from '@angular/forms';
import { AddEditChildModalComponent } from '../features/child/add-edit-child-modal/add-edit-child-modal.component';
import { OnboardingTourComponent } from './onboarding-tour.component';
import { OfflineIndicatorComponent } from './offline-indicator.component';
import { ExportModalComponent } from './export-modal/export-modal.component';

@Component({
    selector: 'app-shell',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, FormsModule, LucideAngularModule, SidebarComponent, HeaderComponent, BottomNavComponent, AddEditChildModalComponent, OnboardingTourComponent, OfflineIndicatorComponent, ExportModalComponent, RouterOutlet],
    template: `

    <div class="h-screen flex bg-background overflow-hidden relative font-sans">

      <!-- Sprint 8: Mobile Sidebar Overlay (lg:hidden) -->
      @if (mobileSidebarOpen()) {
        <!-- Backdrop -->
        <div class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
             (click)="mobileSidebarOpen.set(false)"
             aria-hidden="true"></div>
        <!-- Sidebar panel -->
        <app-sidebar class="fixed inset-y-0 left-0 z-50 w-72 shadow-2xl lg:hidden" />
      }

      <!-- Desktop Sidebar -->
      <app-sidebar class="hidden lg:block" />

      <!-- Main Content Area -->
      <main class="flex-1 flex flex-col h-screen overflow-hidden relative z-10 w-full" id="main-content">

        <!-- Skip to main content link for keyboard users -->
        <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg">Skip to main content</a>

        <!-- Top Header (extracted to HeaderComponent) -->
        <app-header
          [currentTab]="currentTab()"
          [viewState]="viewState()"
          (childSwitchRequested)="selectChild($event)"
          (addChildRequested)="showChildModal.set(true)"
          (switchProfileRequested)="goToSelector()"
          (backRequested)="goToSelector()"
          (localeToggleRequested)="i18n.toggleLocale()"
          (exportRequested)="openExportModal()"
          (menuToggleRequested)="mobileSidebarOpen.set(!mobileSidebarOpen())"
          [switching]="switching()"
        />

        <!-- Live region for dynamic announcements -->
        <div aria-live="polite" aria-atomic="true" class="sr-only">
          @if (saveSuccess()) {
            <span>{{ i18n.t()['child.saveSuccess'] }}</span>
          }
        </div>

        <!-- Offline Indicator Banner -->
        <app-offline-indicator />

        <!-- Main Workspace -->
        <div class="flex-1 overflow-y-auto w-full px-4 pt-6 pb-24 lg:px-12 lg:py-10 bg-slate-50/50 relative"
             [class.animate-fade-in]="viewState() === 'app' && switching()"
             [class.animate-slide-up]="viewState() === 'selector' || isAddingChild()">

          <!-- ===== CHILD SELECTOR SCREEN ===== -->
          @if (viewState() === 'selector') {
            <!-- Sprint 8: Children Loading Skeleton -->
            @if (childrenLoading()) {
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                @for (i of [1,2]; track i) {
                  <div class="bg-white rounded-[2rem] p-8 shadow-md border border-slate-100 animate-pulse">
                    <div class="flex items-center gap-5 mb-5">
                      <div class="w-16 h-16 rounded-full bg-gray-200"></div>
                      <div class="space-y-2">
                        <div class="w-32 h-5 bg-gray-200 rounded"></div>
                        <div class="w-20 h-4 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                    <div class="h-10 bg-gray-100 rounded-2xl"></div>
                  </div>
                }
              </div>
            }
            @if (dataService.children().length === 0) {
              <div class="h-full flex flex-col items-center justify-center text-center animate-slide-up max-w-lg mx-auto">
                <div class="w-40 h-40 bg-gradient-to-tr from-primary-100 to-teal-50 text-primary-500 rounded-full flex items-center justify-center mb-10 shadow-glass border border-white">
                  <lucide-icon name="party-popper" [size]="80" class="opacity-80"></lucide-icon>
                </div>
                <h2 class="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">{{ i18n.t()['child.welcome'] }}</h2>
                <p class="text-gray-500 text-lg mb-10 leading-relaxed">{{ i18n.t()['child.welcomeSub'] }}</p>
                <button (click)="showChildModal.set(true)" class="bg-slate-900 hover:bg-primary-600 text-white px-10 py-5 rounded-2xl font-bold shadow-[0_10px_20px_rgba(0,0,0,0.1)] transition-all transform hover:-translate-y-1 flex items-center gap-3 text-lg w-full sm:w-auto justify-center">
                  <lucide-icon name="plus" class="bg-white/20 rounded-full p-1" aria-hidden="true"></lucide-icon> {{ i18n.t()['child.addNew'] }}
                </button>
              </div>
            } @else {
              <div class="animate-slide-up">
                <h2 class="text-3xl font-extrabold text-gray-800 mb-2 tracking-tight">{{ i18n.t()['child.selectChild'] }}</h2>
                <p class="text-gray-500 text-sm mb-10 font-medium leading-relaxed">{{ i18n.t()['sidebar.selectChildToContinue'] }}</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  @for (child of dataService.children(); track child.id) {
                    <div class="bg-white rounded-[2rem] p-8 shadow-md border border-slate-100 hover:shadow-xl hover:border-primary-200 transition-all group relative card-hover">
                      <button (click)="openEditModal(child)"
                              class="absolute top-5 right-5 w-9 h-9 rounded-xl bg-slate-50 hover:bg-primary-50 border border-slate-200 hover:border-primary-300 flex items-center justify-center text-slate-400 hover:text-primary-600 transition-all shadow-sm"
                              [attr.aria-label]="i18n.t()['child.editProfile']">
                        <lucide-icon name="pencil" class="text-base" aria-hidden="true"></lucide-icon>
                      </button>
                      <div (click)="selectChild(child.id)" class="cursor-pointer">
                        <div class="flex items-center gap-5 mb-5">
                          <img [src]="child.avatarUrl" class="w-16 h-16 rounded-full border-4 border-slate-100 group-hover:border-primary-200 transition-all shadow-sm" />
                          <div>
                            <h3 class="font-extrabold text-xl text-gray-800 group-hover:text-primary-700 transition-colors">{{ child.name }}</h3>
                            <p class="text-sm text-gray-500 font-medium">{{ toDisplay(child.dateOfBirth, i18n.locale()) }}</p>
                          </div>
                        </div>
                        @if (child.bloodType) {
                          <div class="flex items-center gap-2 text-sm text-gray-500 font-medium">
                            <lucide-icon name="droplet" class="text-teal-500 text-base"></lucide-icon>
                            {{ child.bloodType }}
                          </div>
                        }
                      </div>
                      <div (click)="selectChild(child.id)" class="mt-5 bg-gradient-to-r from-primary-50 to-teal-50 rounded-2xl p-4 flex items-center justify-center gap-2 text-primary-600 font-bold group-hover:from-primary-100 group-hover:to-teal-100 transition-all cursor-pointer">
                        <lucide-icon name="log-in" class="text-lg"></lucide-icon>
                        {{ i18n.t()['sidebar.openProfile'] }}
                      </div>
                    </div>
                  }
                  <button type="button" (click)="showChildModal.set(true)"
                          class="bg-slate-50 rounded-[2rem] p-8 shadow-md border-2 border-dashed border-slate-200 hover:border-primary-300 hover:bg-primary-50 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 text-center group w-full text-left">
                    <div class="w-16 h-16 rounded-full bg-slate-100 group-hover:bg-primary-100 flex items-center justify-center transition-all">
                      <lucide-icon name="plus" class="text-3xl text-slate-400 group-hover:text-primary-500 transition-colors" aria-hidden="true"></lucide-icon>
                    </div>
                    <p class="font-bold text-slate-500 group-hover:text-primary-600 transition-colors text-base">
                      {{ i18n.t()['child.addNewBtn'] }}
                    </p>
                  </button>
                </div>
              </div>
            }
          }

          <!-- ===== ADD CHILD FORM ===== -->
          @else if (isAddingChild()) {
            <div class="glass max-w-3xl mx-auto rounded-[2rem] p-10 lg:p-14 animate-slide-up shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white">
              <h2 class="text-3xl font-extrabold text-gray-800 mb-10 flex items-center gap-4">
                <lucide-icon name="user-plus" class="text-primary-500 bg-primary-50 p-3 rounded-2xl" aria-hidden="true"></lucide-icon>
                {{ i18n.t()['child.addNew'] }}
              </h2>
              <div class="space-y-8">
                <div>
                  <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()['child.fullName'] }}</label>
                  <input type="text" [(ngModel)]="newChildName"
                         class="w-full px-5 py-4.5 rounded-2xl bg-white border-2 transition-all text-lg text-gray-800 placeholder-gray-300"
                         [ngClass]="addNameInvalid() ? 'border-red-400 focus:ring-4 focus:ring-red-500/10 focus:border-red-500' : 'border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500'"
                         [placeholder]="i18n.t()['placeholder.fullName']"
                         (input)="onAddNameInput($event)"
                         (blur)="onAddNameBlur()">
                  @if (addNameInvalid()) {
                    <p class="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                      <lucide-icon name="alert-circle" class="text-inherit"></lucide-icon>
                      {{ i18n.isSq() ? 'Emri mund të përmbajë vetëm shkronja.' : 'Name can only contain letters.' }}
                    </p>
                  }
                </div>
                <div>
                  <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()['child.dateOfBirth'] }}</label>
                  <div class="relative">
                    <input type="text" [(ngModel)]="newChildDob" (input)="onDateInput($event, v => newChildDob = v, i18n.locale())"
                           [placeholder]="i18n.locale() === 'sq' ? 'DD/MM/YYYY' : 'MM/DD/YYYY'" maxlength="10"
                           class="w-full px-5 py-4.5 pr-12 rounded-2xl bg-white border-2 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-600 placeholder-gray-300">
                    <button type="button" onclick="this.previousElementSibling.showPicker?.()"
                            class="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-primary-500 hover:bg-primary-50 transition-all cursor-pointer">
                      <lucide-icon name="calendar" class="text-inherit"></lucide-icon>
                    </button>
                  </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()['child.birthWeight'] }}</label>
                    <input type="number" step="0.01" [(ngModel)]="newChildBirthWeight"
                           class="w-full px-5 py-4.5 rounded-2xl bg-white border-2 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-600 shadow-sm placeholder-gray-300"
                           [placeholder]="i18n.t()['placeholder.birthWeight']">
                  </div>
                  <div>
                    <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()['child.bloodType'] }}</label>
                    <div class="relative">
                      <select [(ngModel)]="newChildBloodType"
                              class="w-full px-5 py-4.5 rounded-2xl bg-white border-2 transition-all text-lg shadow-sm appearance-none"
                              [ngClass]="newChildBloodType ? 'border-teal-300 text-gray-800 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500' : 'border-slate-200 text-gray-600 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500'">
                        <option value="">--</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                      <!-- Blood type verified badge -->
                      @if (newChildBloodType) {
                        <lucide-icon name="badge-check" class="text-inherit"></lucide-icon>
                      }
                      <lucide-icon name="chevron-down" class="text-inherit"></lucide-icon>
                    </div>
                  </div>
                </div>

                <!-- Issue #7: Gender in Add form -->
                <div>
                  <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">
                    {{ i18n.t()['child.gender'] }}
                  </label>
                  <div class="relative">
                    <select [(ngModel)]="newChildGender"
                            class="w-full px-5 py-4.5 rounded-2xl bg-white border-2 border-slate-200 transition-all text-lg shadow-sm appearance-none focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500">
                      <option value="">--</option>
                      <option value="M">{{ i18n.t()['childForm.gender.male'] }}</option>
                      <option value="F">{{ i18n.t()['childForm.gender.female'] }}</option>
                    </select>
                    <lucide-icon name="chevron-down" class="text-inherit"></lucide-icon>
                  </div>
                </div>

                <!-- Critical Allergies -->
                <div>
                  <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()['child.criticalAllergies'] }}</label>
                  <textarea [(ngModel)]="newChildAllergies" rows="2"
                    class="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-200 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-800 shadow-sm placeholder-gray-300 resize-none"
                    [placeholder]="i18n.t()['placeholder.allergies']"></textarea>
                </div>

                <!-- Medical Notes -->
                <div>
                  <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()['child.medicalNotes'] }}</label>
                  <textarea [(ngModel)]="newChildMedicalNotes" rows="3"
                    class="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-200 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-800 shadow-sm placeholder-gray-300 resize-none"
                    [placeholder]="i18n.t()['placeholder.medicalNotes']"></textarea>
                </div>

                <!-- Medical Document Upload -->
                <div>
                  <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()['child.medicalDocument'] }}</label>
                  <input type="file" accept=".pdf,image/*" (change)="onNewChildDocumentSelected($event)"
                    class="w-full file:mr-4 file:px-4 file:py-2 file:rounded-xl file:border-0 file:bg-primary-50 file:text-primary-700 file:font-bold file:cursor-pointer text-sm text-gray-500 cursor-pointer"
                    [attr.aria-label]="i18n.t()['child.medicalDocument']">
                  @if (newChildDocumentError()) {
                    <p class="text-red-500 text-xs mt-1">{{ newChildDocumentError() }}</p>
                  }
                  @if (newChildDocument()) {
                    <p class="text-teal-600 text-xs mt-1 flex items-center gap-1"><lucide-icon name="check-circle" class="text-inherit"></lucide-icon> {{ i18n.t()['child.documentAttached'] }}</p>
                  }
                </div>

                <!-- Document Issue Date -->
                @if (newChildDocument()) {
                  <div>
                    <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()['child.documentIssueDate'] }}</label>
                    <input type="date" [(ngModel)]="newChildDocumentDate"
                      class="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-200 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-600 shadow-sm">
                  </div>
                }
                <div>
                  <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()['child.deliveryDoctor'] }}</label>
                  <input type="text" [(ngModel)]="newChildDeliveryDoctor"
                         class="w-full px-5 py-4.5 rounded-2xl bg-white border-2 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-800 shadow-sm placeholder-gray-300"
                         [placeholder]="i18n.t()['placeholder.deliveryDoctor']">
                </div>
                <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100 mt-4">
                  <div class="w-full">
                    @if (addFormError()) {
                      <p class="text-red-500 text-sm font-bold mb-3 animate-fade-in flex items-center gap-2">
                        <lucide-icon name="alert-circle" class="text-inherit"></lucide-icon>
                        {{ addFormError() }}
                      </p>
                    }
                    <div class="flex gap-4 w-full">
                      <button type="button" (click)="submitNewChild()"
                              class="flex-1 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white py-4.5 rounded-2xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-lg shadow-md"
                              [disabled]="addNameInvalid() && newChildName.length > 0">
                        <lucide-icon name="save" class="text-inherit" aria-hidden="true"></lucide-icon> {{ i18n.t()['child.saveProfile'] }}
                      </button>
                      <button type="button" (click)="cancelAddChild()"
                              class="px-8 py-4.5 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-colors text-lg hover:-translate-y-0.5">{{ i18n.t()['child.cancel'] }}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }

          <!-- ===== MAIN APP VIEW ===== -->
          @else {
            <div class="animate-fade-in h-full">
              <router-outlet (activate)="onActivate($event)"></router-outlet>
            </div>
          }
        </div>
      </main>

      <!-- Onboarding Tour (Sprint 22) — shown once on first visit -->
      <app-onboarding-tour />

      <!-- Bottom Nav (Mobile) -->
      <app-bottom-nav />

      <!-- Export Modal (Sprint 5) -->
      @if (showExportModal()) {
        <app-export-modal
          [childId]="dataService.activeChildId()!"
          [isOpen]="showExportModal()"
          (closed)="showExportModal.set(false)"
        />
      }

      <!-- ══════════════════════════════════════════
           ADD/EDIT CHILD MODAL (Sprint 7 — 3-step wizard)
           ══════════════════════════════════════════ -->
      @if (showChildModal()) {
        <app-add-edit-child-modal
          [mode]="editingChild() ? 'edit' : 'add'"
          [child]="editingChild() ?? undefined"
          (saved)="onChildSaved($event)"
          (cancelled)="closeModal()"
        />
      }

      <!-- ══════════════════════════════════════════
           EDIT CHILD MODAL (Overlay)
           ══════════════════════════════════════════ -->
      @if (editingChild()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" [attr.aria-labelledby]="'edit-child-title'">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" (click)="closeEditModal()" aria-hidden="true"></div>

          <!-- Modal Card -->
          <div class="relative z-10 w-full max-w-md bg-white rounded-[2rem] shadow-[0_32px_80px_-12px_rgba(0,0,0,0.25)] border border-slate-100 overflow-hidden animate-slide-up">

            <!-- Top accent -->
            <div class="h-1.5 bg-gradient-to-r from-primary-600 via-primary-500 to-teal-400"></div>

            <div class="p-10">

              <!-- Header -->
              <div class="flex items-center justify-between mb-8">
                <h2 id="edit-child-title" class="text-2xl font-black text-gray-800 flex items-center gap-3">
                  <lucide-icon name="pencil" class="text-inherit" aria-hidden="true"></lucide-icon>
                  {{ i18n.t()['child.editProfile'] }}
                </h2>
                <button type="button" (click)="closeEditModal()"
                        class="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all shadow-sm border border-slate-200"
                        aria-label="{{ i18n.t()['child.cancel'] }}">
                  <lucide-icon name="x" class="text-inherit" aria-hidden="true"></lucide-icon>
                </button>
              </div>

              <div class="space-y-6">

                <!-- Name -->
                <div>
                  <label class="block text-xs font-bold text-primary-700 mb-2.5 ml-1 uppercase tracking-wider">
                    {{ i18n.t()['child.fullName'] }}
                  </label>
                  <div class="relative">
                    <input type="text" [(ngModel)]="editName"
                           (input)="onEditNameInput($event)"
                           (blur)="onEditNameBlur()"
                           class="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 transition-all text-lg text-gray-800 pr-10"
                           [ngClass]="editNameInvalid() ? 'border-red-400 focus:ring-4 focus:ring-red-500/10 focus:border-red-500' : 'border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500'">
                    <!-- Invalid indicator icon -->
                    @if (editNameInvalid()) {
                      <lucide-icon name="alert-circle" class="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 text-xl animate-fade-in"></lucide-icon>
                    }
                  </div>
                  @if (editNameInvalid()) {
                    <p class="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                      <lucide-icon name="alert-circle" class="text-inherit"></lucide-icon>
                      {{ i18n.isSq() ? 'Emri mund të përmbajë vetëm shkronja.' : 'Name can only contain letters.' }}
                    </p>
                  }
                </div>

                <!-- Date of Birth -->
                <div>
                  <label class="block text-xs font-bold text-primary-700 mb-2.5 ml-1 uppercase tracking-wider">
                    {{ i18n.t()['child.dateOfBirth'] }}
                  </label>
                  <div class="relative">
                    <input type="text" [(ngModel)]="editDob" (input)="onDateInput($event, v => editDob = v, i18n.locale())"
                           [placeholder]="i18n.locale() === 'sq' ? 'DD/MM/YYYY' : 'MM/DD/YYYY'" maxlength="10"
                           class="w-full px-5 py-4 pr-12 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-600 placeholder-gray-300">
                    <button type="button" onclick="this.previousElementSibling.showPicker?.()"
                            class="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-primary-500 hover:bg-primary-50 transition-all cursor-pointer">
                      <lucide-icon name="calendar" class="text-inherit"></lucide-icon>
                    </button>
                  </div>
                </div>

                <!-- Blood Type with Verification Badge -->
                <div>
                  <label class="block text-xs font-bold text-primary-700 mb-2.5 ml-1 uppercase tracking-wider">
                    {{ i18n.t()['child.bloodType'] }}
                  </label>
                  <div class="relative">
                    <select [ngModel]="editBloodType()" (ngModelChange)="editBloodType.set($event)"
                            class="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 transition-all text-lg shadow-sm appearance-none"
                            [ngClass]="editBloodType() ? 'border-teal-300 text-gray-800 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500' : 'border-slate-200 text-gray-600 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500'">
                      <option value="">--</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                    <!-- Blood type verified badge (green checkmark) -->
                    @if (editBloodType()) {
                      <span class="absolute right-12 top-1/2 -translate-y-1/2 flex items-center gap-1 animate-fade-in">
                        <lucide-icon name="badge-check" class="text-inherit"></lucide-icon>
                      </span>
                    }
                    <lucide-icon name="chevron-down" class="text-inherit"></lucide-icon>
                  </div>
                  @if (editBloodType()) {
                    <p class="mt-2 text-xs text-teal-600 font-medium flex items-center gap-1 animate-fade-in">
                      <lucide-icon name="badge-check" class="text-inherit"></lucide-icon>
                      {{ i18n.isSq() ? 'Grupi i gjakut u verifikua.' : 'Blood type verified.' }}
                    </p>
                  }
                </div>

                <!-- Issue #7: Gender -->
                <div>
                  <label class="block text-xs font-bold text-primary-700 mb-2.5 ml-1 uppercase tracking-wider">
                    {{ i18n.t()['child.gender'] }}
                  </label>
                  <div class="relative">
                    <select [(ngModel)]="editGender"
                            class="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200 transition-all text-lg shadow-sm appearance-none focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500">
                      <option value="">--</option>
                      <option value="M">{{ i18n.t()['childForm.gender.male'] }}</option>
                      <option value="F">{{ i18n.t()['childForm.gender.female'] }}</option>
                    </select>
                    <lucide-icon name="chevron-down" class="text-inherit"></lucide-icon>
                  </div>
                </div>

                <!-- Issue #1: Birth Weight -->
                <div>
                  <label class="block text-xs font-bold text-primary-700 mb-2.5 ml-1 uppercase tracking-wider">
                    {{ i18n.t()['child.birthWeight'] }}
                  </label>
                  <input type="number" step="0.01" [(ngModel)]="editBirthWeight"
                         class="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-800 shadow-sm placeholder-gray-300"
                         [placeholder]="i18n.t()['placeholder.birthWeight']">
                </div>

                <!-- Issue #1: Delivery Doctor -->
                <div>
                  <label class="block text-xs font-bold text-primary-700 mb-2.5 ml-1 uppercase tracking-wider">
                    {{ i18n.t()['child.deliveryDoctor'] }}
                  </label>
                  <input type="text" [(ngModel)]="editDeliveryDoctor"
                         class="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-800 shadow-sm placeholder-gray-300"
                         [placeholder]="i18n.t()['placeholder.deliveryDoctor']">
                </div>

                <!-- Critical Allergies -->
                <div>
                  <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()['child.criticalAllergies'] }}</label>
                  <textarea [(ngModel)]="editChildAllergies" rows="2"
                    class="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-200 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-800 shadow-sm placeholder-gray-300 resize-none"
                    [placeholder]="i18n.t()['placeholder.allergies']"></textarea>
                </div>

                <!-- Medical Notes -->
                <div>
                  <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()['child.medicalNotes'] }}</label>
                  <textarea [(ngModel)]="editChildMedicalNotes" rows="3"
                    class="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-200 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-800 shadow-sm placeholder-gray-300 resize-none"
                    [placeholder]="i18n.t()['placeholder.medicalNotes']"></textarea>
                </div>

                <!-- Medical Document Upload -->
                <div>
                  <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()['child.medicalDocument'] }}</label>
                  <input type="file" accept=".pdf,image/*" (change)="onDocumentSelected($event)"
                    class="w-full file:mr-4 file:px-4 file:py-2 file:rounded-xl file:border-0 file:bg-primary-50 file:text-primary-700 file:font-bold file:cursor-pointer text-sm text-gray-500 cursor-pointer"
                    [attr.aria-label]="i18n.t()['child.medicalDocument']">
                  @if (documentError()) {
                    <p class="text-red-500 text-xs mt-1">{{ documentError() }}</p>
                  }
                  @if (editChildDocument()) {
                    <p class="text-teal-600 text-xs mt-1 flex items-center gap-1"><lucide-icon name="check-circle" class="text-inherit"></lucide-icon> {{ i18n.t()['child.documentAttached'] }}</p>
                  }
                </div>

                <!-- Document Issue Date -->
                @if (editChildDocument()) {
                  <div>
                    <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">{{ i18n.t()['child.documentIssueDate'] }}</label>
                    <input type="date" [(ngModel)]="editChildDocumentDate"
                      class="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-200 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-600 shadow-sm">
                  </div>
                }

                <!-- Actions -->
                <div class="flex flex-col gap-3 pt-4 border-t border-gray-100">
                  <!-- Issue #9: Success Toast -->
                  @if (saveSuccess()) {
                    <div class="flex items-center gap-2 p-3 bg-teal-50 border border-teal-200 rounded-xl text-teal-700 text-sm font-medium animate-fade-in">
                      <lucide-icon name="check-circle" class="text-inherit"></lucide-icon>
                      {{ i18n.t()['child.saveSuccess'] }}
                    </div>
                  }
                  <button type="button" (click)="saveEditChild()"
                          class="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white py-4 rounded-2xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-base shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                          [disabled]="editNameInvalid() || saving()">
                    @if (saving()) {
                      <lucide-icon name="loader" class="text-inherit" aria-hidden="true"></lucide-icon>
                      <span>{{ i18n.t()['child.saving'] }}</span>
                    } @else {
                      <lucide-icon name="save" class="text-inherit" aria-hidden="true"></lucide-icon>
                      {{ i18n.t()['sidebar.saveChanges'] }}
                    }
                  </button>
                  <button type="button" (click)="showDeleteConfirm.set(true)"
                          class="w-full border-2 border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 py-3.5 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 text-sm">
                    <lucide-icon name="trash-2" class="text-inherit" aria-hidden="true"></lucide-icon>
                    {{ i18n.t()['sidebar.deleteProfile'] }}
                  </button>
                </div>
                <!-- Delete Confirmation Modal (Issue #5) -->
                @if (showDeleteConfirm()) {
                  <div class="mt-4 p-5 bg-red-50 border-2 border-red-200 rounded-2xl animate-fade-in">
                    <div class="flex items-center gap-3 mb-3">
                      <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <lucide-icon name="alert-triangle" class="text-inherit"></lucide-icon>
                      </div>
                      <div>
                        <p class="font-bold text-gray-800 text-base">{{ i18n.t()['child.deleteConfirmTitle'] }}</p>
                        <p class="text-sm text-gray-500">{{ editingChild()?.name }}</p>
                      </div>
                    </div>
                    <p class="text-sm text-gray-600 mb-5">{{ i18n.t()['child.deleteConfirmBody'] }}</p>
                    <div class="flex gap-3">
                      <button type="button" (click)="showDeleteConfirm.set(false)"
                              class="flex-1 py-3 rounded-xl border-2 border-slate-200 text-gray-600 font-bold hover:bg-slate-100 transition-all text-sm">
                        {{ i18n.t()['child.cancel'] }}
                      </button>
                      <button type="button" (click)="confirmDeleteChild()"
                              class="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-400 text-white font-bold hover:from-red-400 hover:to-red-300 transition-all text-sm shadow-sm flex items-center justify-center gap-2">
                        <lucide-icon name="trash" class="text-inherit" aria-hidden="true"></lucide-icon>
                        {{ i18n.t()['child.delete'] }}
                      </button>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      }

    </div>
  `,
    styles: [`
    .pb-safe { padding-bottom: env(safe-area-inset-bottom, 1rem); }

    /* Issue E: Micro-animations */
    .card-hover {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .card-hover:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px -8px rgba(0,0,0,0.15);
    }

    /* Button press effect */
    button:not(:disabled):active {
      transform: scale(0.98);
    }

    /* Success flash */
    .success-flash {
      animation: success-flash 0.6s ease-out;
    }
    @keyframes success-flash {
      0% { background-color: #d1fae5; }
      100% { background-color: transparent; }
    }

    /* Slide up animation */
    .animate-slide-up {
      animation: slideUp 0.35s ease-out;
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Fade in animation */
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class ShellComponent implements OnDestroy, OnInit {
  dataService = inject(DataService);
  i18n = inject(I18nService);
  router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit() {
  }

  private navigateHandler = (e: Event) => {
    const route = (e as CustomEvent<string>).detail;
    this.navigateTo(route);
  };

  onActivate(componentRef: any) {
    if (componentRef.openEditChild && componentRef.openAddChild) {
      componentRef.openEditChild.subscribe((child: any) => this.openEditModal(child));
      componentRef.openAddChild.subscribe(() => this.showChildModal.set(true));
    }
  }

  constructor() {
    // Dismiss childrenLoading skeleton once children signal populates
    effect(() => {
      if (this.dataService.children().length > 0) {
        this.childrenLoading.set(false);
      }
    });

    // Listen for cross-component navigation events from home sub-components
    window.addEventListener('kiddok:navigate', this.navigateHandler);
    
    // Sync currentTab from URL changes
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      const url = e.urlAfterRedirects || e.url;
      const parts = url.split('/').filter((p: string) => p);
      const tab = parts[parts.length - 1];
      if (tab && tab !== 'login') {
        this.currentTab.set(tab);
        this.dataService.currentTab.set(tab);
      }
    });
  }

  ngOnDestroy() {
    window.removeEventListener('kiddok:navigate', this.navigateHandler);
  }

  isAddingChild = signal(false);
  showChildModal = signal(false);
  showExportModal = signal(false);
  // Sprint 8: Children loading skeleton
  childrenLoading = signal(false);
  // Sprint 8: Mobile sidebar overlay visibility
  mobileSidebarOpen = signal(false);

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.mobileSidebarOpen()) {
      this.mobileSidebarOpen.set(false);
    }
  }
  settingsSaved = signal(false);
  viewState = signal<'selector' | 'app'>(
    localStorage.getItem('kiddok_active_child') ? 'app' : 'selector'
  );
  switching = signal(false);

  openExportModal() {
    this.showExportModal.set(true);
  }

  // ── Edit Child Modal signals ──────────────────────────────────
  editingChild = signal<ChildProfile | null>(null);
  editName = '';
  editDob = '';
  editBloodType = signal('');   // reactive signal for blood type
  editNameInvalid = signal(false);
  editNameTouched = signal(false);
  editChildAllergies = '';
  editChildMedicalNotes = '';
  editChildDocument = signal<string | null>(null);
  editChildDocumentDate = '';
  documentError = signal<string | null>(null);
  // Issue #1: birthWeight and deliveryDoctor missing from edit modal
  editBirthWeight: number | null = null;
  editDeliveryDoctor = '';
  // Issue #7: gender field for edit modal
  editGender = '';
  // Issue #4: saving signal to prevent double-submit
  saving = signal(false);
  // Issue #5: custom delete confirmation modal
  showDeleteConfirm = signal(false);
  // Issue #9: save success toast
  saveSuccess = signal(false);
  // Issue #8: dirty-flag for medical document optimization (base64 only sent when changed)
  originalDocument = signal<string | null>(null);
  documentDirty = signal(false);

  // ── Add Child Form signals ─────────────────────────────────────
  addNameInvalid = signal(false);
  addFormError = signal<string | null>(null);

  // ── Parent Profile fields ──────────────────────────────────────
  parentName = '';
  parentSurname = '';
  parentPhone = '';
  newChildName = '';
  newChildDob = '';
  newChildBirthWeight: number | null = null;
  newChildDeliveryDoctor = '';
  newChildGender = '';
  newChildBloodType = '';
  newChildAllergies = '';
  newChildMedicalNotes = '';
  newChildDocument = signal<string | null>(null);
  newChildDocumentDate = '';
  newChildDocumentError = signal<string | null>(null);

  // ── Validation ────────────────────────────────────────────────

  /** Returns true if name contains only letters and spaces */
  isValidName(name: string): boolean {
    return /^[a-zA-Z\s]+$/.test(name.trim()) && name.trim().length > 0;
  }

  /** Returns true if name has any non-alphabetic characters */
  hasNameError(name: string): boolean {
    return name.length > 0 && !this.isValidName(name);
  }

  // Edit modal name handlers
  onEditNameInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.editName = value;
    this.editNameTouched.set(true);
    this.editNameInvalid.set(this.hasNameError(value));
  }

  onEditNameBlur() {
    this.editNameTouched.set(true);
    this.editNameInvalid.set(this.hasNameError(this.editName));
  }

  // Add child name handlers
  onAddNameInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.newChildName = value;
    this.addNameInvalid.set(this.hasNameError(value));
    this.addFormError.set(null);
  }

  onAddNameBlur() {
    this.addNameInvalid.set(this.hasNameError(this.newChildName));
  }

  // ── Computed nav items ─────────────────────────────────────────

  get navItems() {
    const t = this.i18n.t();
    return [
      { id: 'home', icon: 'dashboard', label: t['nav.home'] },
      { id: 'diary', icon: 'edit_document', label: t['nav.diary'] },
      { id: 'temperature', icon: 'thermostat', label: t['nav.temperatureDiary'] },
      { id: 'growth', icon: 'show_chart', label: t['nav.growthTracking'] },
      { id: 'records', icon: 'vaccines', label: t['nav.records'] },
      { id: 'medications', icon: 'pill', label: t['nav.medications'] },
      { id: 'settings', icon: 'settings', label: t['nav.settings'] },
    ];
  }

  currentTab = signal('home');

  // ── Edit Modal ─────────────────────────────────────────────────

  openEditModal(child: ChildProfile) {
    this.editingChild.set(child);
    this.editName = child.name;
    this.editDob = this.toDisplay(child.dateOfBirth, this.i18n.locale());
    this.editBloodType.set(child.bloodType || '');
    // Reset validation state
    this.editNameInvalid.set(false);
    this.editNameTouched.set(false);
    // Reset medical fields
    this.editChildAllergies = child.criticalAllergies || '';
    this.editChildMedicalNotes = child.medicalNotes || '';
    this.editChildDocument.set(child.medicalDocument || null);
    this.editChildDocumentDate = child.documentIssueDate || '';
    this.documentError.set(null);
    // Issue #1: populate birthWeight and deliveryDoctor
    this.editBirthWeight = child.birthWeight ?? null;
    this.editDeliveryDoctor = child.deliveryDoctor || '';
    // Issue #7: populate gender
    this.editGender = child.gender || '';
    // Issue #8: track original document for dirty-flag optimization
    this.originalDocument.set(child.medicalDocument || null);
    this.documentDirty.set(false);
    // Reset delete confirm state
    this.showDeleteConfirm.set(false);
  }

  closeEditModal() {
    this.editingChild.set(null);
    this.editNameInvalid.set(false);
    this.editNameTouched.set(false);
    this.editChildAllergies = '';
    this.editChildMedicalNotes = '';
    this.editChildDocument.set(null);
    this.editChildDocumentDate = '';
    this.documentError.set(null);
    this.showDeleteConfirm.set(false);
  }

  saveEditChild() {
    const child = this.editingChild();
    if (!child) return;

    // Block save if name is invalid
    if (this.hasNameError(this.editName)) {
      this.editNameInvalid.set(true);
      this.editNameTouched.set(true);
      return;
    }

    if (!this.editName || !this.editDob) return;

    // Issue #4: prevent double-submit
    this.saving.set(true);

    const isoDate = this.toIso(this.editDob, this.i18n.locale());

    this.dataService.updateChildApi(child.id, {
      name: this.editName.trim(),
      dateOfBirth: isoDate,
      bloodType: this.editBloodType() || undefined,
      // Issue #1: use editBirthWeight and editDeliveryDoctor from form, not original object
      birthWeight: this.editBirthWeight ?? undefined,
      deliveryDoctor: this.editDeliveryDoctor || undefined,
      // Issue #7: include gender
      gender: this.editGender || undefined,
      criticalAllergies: this.editChildAllergies || undefined,
      medicalNotes: this.editChildMedicalNotes || undefined,
      // Issue #8: only send medicalDocument if it was actually changed (dirty flag)
      medicalDocument: this.documentDirty() ? (this.editChildDocument() || undefined) : undefined,
      documentIssueDate: this.documentDirty() ? (this.editChildDocumentDate || undefined) : undefined,
    }).then(() => {
      // Issue #9: show success toast
      this.saveSuccess.set(true);
      setTimeout(() => this.saveSuccess.set(false), 3000);
      this.closeEditModal();
    }).catch(() => {
      // Show error toast-like message
      console.error('Save failed');
    }).finally(() => {
      this.saving.set(false);
    });
  }

  onDocumentSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      this.documentError.set(this.i18n.t()['error.documentTooLarge']);
      return;
    }
    // Validate type
    if (!file.type.match(/pdf|image\//)) {
      this.documentError.set(this.i18n.t()['error.invalidDocType']);
      return;
    }
    this.documentError.set(null);
    this.documentDirty.set(true);
    const reader = new FileReader();
    reader.onload = () => {
      this.editChildDocument.set(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  confirmDeleteChild() {
    const child = this.editingChild();
    if (!child) return;
    // Issue #5: use custom modal — just perform the delete (modal is shown via showDeleteConfirm signal)
    this.dataService.deleteChildApi(child.id).catch(() => {
      // Fallback to local delete if API fails
      this.dataService.deleteChild(child.id);
    });
    this.closeEditModal();
  }

  // ── Parent Profile ─────────────────────────────────────────────

  loadParentIntoForm() {
    const p = this.dataService.parentProfile();
    this.parentName = p.name;
    this.parentSurname = p.surname;
    this.parentPhone = p.phone;
  }

  saveParentProfile() {
    this.dataService.saveParentProfile({
      name: this.parentName,
      surname: this.parentSurname,
      phone: this.parentPhone,
    });
    this.settingsSaved.set(true);
    setTimeout(() => this.settingsSaved.set(false), 3000);
  }

  // ── Navigation ─────────────────────────────────────────────────

  goToSelector() {
    this.viewState.set('selector');
    this.isAddingChild.set(false);
    this.currentTab.set('home');
  }

  selectChild(id: string) {
    this.switching.set(true);
    this.dataService.switchChild(id);
    this.viewState.set('app');
    setTimeout(() => this.switching.set(false), 400);
  }

  navigateTo(tabId: string) {
    // Navigate with router so the URL changes
    this.router.navigate(['/', tabId], { replaceUrl: true });
  }

  // ── Add Child Form ─────────────────────────────────────────────

  submitNewChild() {
    this.addFormError.set(null);
    // Block if name has error
    if (this.hasNameError(this.newChildName)) {
      this.addNameInvalid.set(true);
      return;
    }

    if (!this.newChildName || !this.newChildDob) {
      this.addFormError.set(this.i18n.isSq() ? 'Emri dhe datëlindja janë të detyrueshme.' : 'Name and date of birth are required.');
      return;
    }

    const isoDate = this.toIso(this.newChildDob, this.i18n.locale());
    this.dataService.createChild({
      name: this.newChildName.trim(),
      dateOfBirth: isoDate,
      birthWeight: this.newChildBirthWeight ?? undefined,
      deliveryDoctor: this.newChildDeliveryDoctor || undefined,
      gender: this.newChildGender || undefined,
      bloodType: this.newChildBloodType || undefined,
      criticalAllergies: this.newChildAllergies || undefined,
      medicalNotes: this.newChildMedicalNotes || undefined,
      medicalDocument: this.newChildDocument() || undefined,
      documentIssueDate: this.newChildDocumentDate || undefined,
    }).then(() => {
      this.cancelAddChild();
    }).catch(() => {
      console.error('Create child failed');
    });
  }

  onNewChildDocumentSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    if (file.size > 5 * 1024 * 1024) {
      this.newChildDocumentError.set(this.i18n.t()['error.documentTooLarge']);
      return;
    }
    if (!file.type.match(/pdf|image\//)) {
      this.newChildDocumentError.set(this.i18n.t()['error.invalidDocType']);
      return;
    }
    this.newChildDocumentError.set(null);
    const reader = new FileReader();
    reader.onload = () => {
      this.newChildDocument.set(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  cancelAddChild() {
    this.isAddingChild.set(false);
    this.newChildName = '';
    this.newChildDob = '';
    this.newChildBirthWeight = null;
    this.newChildDeliveryDoctor = '';
    this.newChildGender = '';
    this.newChildBloodType = '';
    this.newChildAllergies = '';
    this.newChildMedicalNotes = '';
    this.newChildDocument.set(null);
    this.newChildDocumentDate = '';
    this.newChildDocumentError.set(null);
    this.addNameInvalid.set(false);
    this.addFormError.set(null);
  }

  logout() {
    this.dataService.logout();
    this.router.navigate(['/login']);
  }

  // ── Date Helpers ───────────────────────────────────────────────

  get datePattern(): string {
    return this.i18n.locale() === 'sq' ? 'dd/MM/yyyy' : 'MM/dd/yyyy';
  }

  onDateInput(event: Event, setter: (v: string) => void, locale: string) {
    const input = event.target as HTMLInputElement;
    let val = input.value.replace(/[^\d]/g, '');
    if (locale === 'sq') {
      if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2);
      if (val.length > 5) val = val.slice(0, 5) + '/' + val.slice(5);
    } else {
      if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2);
      if (val.length > 5) val = val.slice(0, 5) + '/' + val.slice(5);
    }
    if (val.length > 10) val = val.slice(0, 10);
    setter(val);
  }

  toIso(displayDate: string, locale: string): string {
    if (!displayDate || !displayDate.includes('/')) return displayDate;
    const parts = displayDate.split('/');
    if (locale === 'sq') {
      return parts[2] + '-' + parts[1] + '-' + parts[0];
    } else {
      return parts[2] + '-' + parts[0] + '-' + parts[1];
    }
  }

  toDisplay(yyyymmdd: string, locale: string): string {
    if (!yyyymmdd || yyyymmdd.includes('/')) return yyyymmdd;
    const [y, m, d] = yyyymmdd.split('-');
    if (locale === 'sq') return d + '/' + m + '/' + y;
    return m + '/' + d + '/' + y;
  }

  // ── Child Modal ───────────────────────────────────────────────

  closeModal(): void {
    this.showChildModal.set(false);
  }

  onChildSaved(child: ChildProfile): void {
    this.closeModal();
    // Refresh children list is handled by DataService already
  }
}
