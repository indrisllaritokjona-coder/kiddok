import { Component, inject, signal, computed, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, ChildProfile } from '../services/data.service';
import { I18nService } from '../core/i18n/i18n.service';
import { Router } from '@angular/router';
import { HomeComponent } from './home.component';
import { DiaryComponent } from './diary.component';
import { TemperatureDiaryComponent } from './temperature-diary.component';
import { GrowthTrackingComponent } from './growth-tracking.component';
import { RecordsComponent } from './records.component';
import { SidebarComponent } from './sidebar.component';
import { HeaderComponent } from './header.component';
import { BottomNavComponent } from './bottom-nav.component';
import { FormsModule } from '@angular/forms';
import { AddEditChildModalComponent } from '../features/child/add-edit-child-modal/add-edit-child-modal.component';

@Component({
    selector: 'app-shell',
    imports: [CommonModule, FormsModule, HomeComponent, DiaryComponent, TemperatureDiaryComponent, GrowthTrackingComponent, RecordsComponent, SidebarComponent, HeaderComponent, BottomNavComponent, AddEditChildModalComponent],
    template: `

    <div class="h-screen flex bg-background overflow-hidden relative font-sans">

      <!-- Desktop Sidebar -->
      <app-sidebar class="hidden lg:block" />

      <!-- Main Content Area -->
      <main class="flex-1 flex flex-col h-screen overflow-hidden relative z-10 w-full">

        <!-- Top Header (extracted to HeaderComponent) -->
        <app-header
          [currentTab]="currentTab()"
          [viewState]="viewState()"
          (childSwitchRequested)="selectChild($event)"
          (addChildRequested)="showChildModal.set(true)"
          (switchProfileRequested)="goToSelector()"
          (backRequested)="goToSelector()"
          (localeToggleRequested)="i18n.toggleLocale()"
        />

        <!-- Main Workspace -->
        <div class="flex-1 overflow-y-auto w-full px-4 pt-6 pb-24 lg:px-12 lg:py-10 bg-slate-50/50 relative">

          <!-- ===== CHILD SELECTOR SCREEN ===== -->
          @if (viewState() === 'selector') {
            @if (dataService.children().length === 0 && !isAddingChild()) {
              <div class="h-full flex flex-col items-center justify-center text-center animate-slide-up max-w-lg mx-auto">
                <div class="w-40 h-40 bg-gradient-to-tr from-primary-100 to-teal-50 text-primary-500 rounded-full flex items-center justify-center mb-10 shadow-glass border border-white">
                  <span class="material-icons text-[80px] opacity-80">celebration</span>
                </div>
                <h2 class="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">{{ i18n.t()['child.welcome'] }}</h2>
                <p class="text-gray-500 text-lg mb-10 leading-relaxed">{{ i18n.t()['child.welcomeSub'] }}</p>
                <button (click)="isAddingChild.set(true)" class="bg-slate-900 hover:bg-primary-600 text-white px-10 py-5 rounded-2xl font-bold shadow-[0_10px_20px_rgba(0,0,0,0.1)] transition-all transform hover:-translate-y-1 flex items-center gap-3 text-lg w-full sm:w-auto justify-center">
                  <span class="material-icons bg-white/20 rounded-full p-1">add</span> {{ i18n.t()['child.addNew'] }}
                </button>
              </div>
            } @else {
              <div class="animate-slide-up">
                <h2 class="text-3xl font-extrabold text-gray-800 mb-2 tracking-tight">{{ i18n.t()['child.selectChild'] }}</h2>
                <p class="text-gray-400 text-sm mb-10 font-medium">
                  {{ i18n.locale() === 'sq' ? 'Zgjidhni profilin e fëmijës për të vazhduar.' : 'Select a child profile to continue.' }}
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  @for (child of dataService.children(); track child.id) {
                    <div class="bg-white rounded-[2rem] p-8 shadow-md border border-slate-100 hover:shadow-xl hover:border-primary-200 transition-all group relative card-hover">
                      <button (click)="openEditModal(child)"
                              class="absolute top-5 right-5 w-9 h-9 rounded-xl bg-slate-50 hover:bg-primary-50 border border-slate-200 hover:border-primary-300 flex items-center justify-center text-slate-400 hover:text-primary-600 transition-all shadow-sm">
                        <span class="material-icons text-base">edit</span>
                      </button>
                      <div (click)="selectChild(child.id)" class="cursor-pointer">
                        <div class="flex items-center gap-5 mb-5">
                          <img [src]="child.avatarUrl" class="w-16 h-16 rounded-full border-4 border-slate-100 group-hover:border-primary-200 transition-all shadow-sm" />
                          <div>
                            <h3 class="font-extrabold text-xl text-gray-800 group-hover:text-primary-700 transition-colors">{{ child.name }}</h3>
                            <p class="text-sm text-gray-400 font-medium">{{ toDisplay(child.dateOfBirth, i18n.locale()) }}</p>
                          </div>
                        </div>
                        @if (child.bloodType) {
                          <div class="flex items-center gap-2 text-sm text-gray-500 font-medium">
                            <span class="material-icons text-teal-500 text-base">water_drop</span>
                            {{ child.bloodType }}
                          </div>
                        }
                      </div>
                      <div (click)="selectChild(child.id)" class="mt-5 bg-gradient-to-r from-primary-50 to-teal-50 rounded-2xl p-4 flex items-center justify-center gap-2 text-primary-600 font-bold group-hover:from-primary-100 group-hover:to-teal-100 transition-all cursor-pointer">
                        <span class="material-icons text-lg">login</span>
                        {{ i18n.locale() === 'sq' ? 'Hapni Profilin' : 'Open Profile' }}
                      </div>
                    </div>
                  }
                  <div (click)="isAddingChild.set(true)"
                       class="bg-slate-50 rounded-[2rem] p-8 shadow-md border-2 border-dashed border-slate-200 hover:border-primary-300 hover:bg-primary-50 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 text-center group">
                    <div class="w-16 h-16 rounded-full bg-slate-100 group-hover:bg-primary-100 flex items-center justify-center transition-all">
                      <span class="material-icons text-3xl text-slate-400 group-hover:text-primary-500 transition-colors">add</span>
                    </div>
                    <p class="font-bold text-slate-500 group-hover:text-primary-600 transition-colors text-base">
                      {{ i18n.t()['child.addNewBtn'] }}
                    </p>
                  </div>
                </div>
              </div>
            }
          }

          <!-- ===== ADD CHILD FORM ===== -->
          @else if (isAddingChild()) {
            <div class="glass max-w-3xl mx-auto rounded-[2rem] p-10 lg:p-14 animate-slide-up shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white">
              <h2 class="text-3xl font-extrabold text-gray-800 mb-10 flex items-center gap-4">
                <span class="material-icons text-primary-500 bg-primary-50 p-3 rounded-2xl">person_add_alt_1</span>
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
                      <span class="material-icons text-xs">error_outline</span>
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
                      <span class="material-icons text-lg">calendar_month</span>
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
                        <span class="absolute right-12 top-1/2 -translate-y-1/2 material-icons text-teal-500 bg-teal-50 rounded-full text-sm animate-fade-in">verified</span>
                      }
                      <span class="absolute right-3 top-1/2 -translate-y-1/2 material-icons text-gray-400 text-lg pointer-events-none">expand_more</span>
                    </div>
                  </div>
                </div>

                <!-- Issue #7: Gender in Add form -->
                <div>
                  <label class="block text-sm font-bold text-primary-700 mb-3 ml-1 tracking-wide uppercase text-xs">
                    {{ i18n.locale() === 'sq' ? 'Gjinia' : 'Gender' }}
                  </label>
                  <div class="relative">
                    <select [(ngModel)]="newChildGender"
                            class="w-full px-5 py-4.5 rounded-2xl bg-white border-2 border-slate-200 transition-all text-lg shadow-sm appearance-none focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500">
                      <option value="">--</option>
                      <option value="M">{{ i18n.isSq() ? 'Mashkull' : 'Male' }}</option>
                      <option value="F">{{ i18n.isSq() ? 'Femer' : 'Female' }}</option>
                    </select>
                    <span class="absolute right-3 top-1/2 -translate-y-1/2 material-icons text-gray-400 text-lg pointer-events-none">expand_more</span>
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
                    class="w-full file:mr-4 file:px-4 file:py-2 file:rounded-xl file:border-0 file:bg-primary-50 file:text-primary-700 file:font-bold file:cursor-pointer text-sm text-gray-500 cursor-pointer">
                  @if (newChildDocumentError()) {
                    <p class="text-red-500 text-xs mt-1">{{ newChildDocumentError() }}</p>
                  }
                  @if (newChildDocument()) {
                    <p class="text-teal-600 text-xs mt-1 flex items-center gap-1"><span class="material-icons text-sm">check_circle</span> {{ i18n.t()['child.documentAttached'] }}</p>
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
                  <button (click)="submitNewChild()"
                          class="flex-1 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white py-4.5 rounded-2xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-lg shadow-md"
                          [disabled]="addNameInvalid() && newChildName.length > 0">
                    <span class="material-icons">save</span> {{ i18n.t()['child.saveProfile'] }}
                  </button>
                  <button (click)="cancelAddChild()"
                          class="px-8 py-4.5 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-colors text-lg hover:-translate-y-0.5">{{ i18n.t()['child.cancel'] }}</button>
                </div>
              </div>
            </div>
          }

          <!-- ===== MAIN APP VIEW ===== -->
          @else {
            <div class="animate-fade-in h-full">
              @switch (currentTab()) {
                @case ('home') { <app-home /> }
                @case ('diary') { <app-diary /> }
                @case ('temperature') { <app-temperature-diary /> }
                @case ('growth') { <app-growth-tracking /> }
                @case ('records') { <app-records /> }
                @case ('settings') {
                  <div class="glass max-w-2xl mx-auto rounded-[2rem] p-10 animate-slide-up shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white">
                    <h2 class="text-3xl font-extrabold text-gray-800 mb-2 flex items-center gap-4">
                      <span class="material-icons text-primary-500 bg-primary-50 p-3 rounded-2xl">settings</span>
                      {{ i18n.t()['nav.settings'] }}
                    </h2>
                    <div class="mt-8">
                      <h3 class="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2">
                        <span class="material-icons text-teal-500">person</span>
                        {{ i18n.t()['settings.parentProfile'] }}
                      </h3>
                      @if (settingsSaved()) {
                        <div class="mb-6 p-4 bg-teal-50 border border-teal-100 rounded-2xl flex items-center gap-3 animate-fade-in">
                          <span class="material-icons text-teal-500">check_circle</span>
                          <p class="text-teal-700 text-sm font-medium">{{ i18n.t()['settings.saved'] }}</p>
                        </div>
                      }
                      <div class="space-y-5">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label class="block text-xs font-bold text-primary-700 mb-2.5 ml-1 uppercase tracking-wider">{{ i18n.t()['settings.name'] }}</label>
                            <input type="text" [(ngModel)]="parentName"
                                   class="w-full px-5 py-4 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-base">
                          </div>
                          <div>
                            <label class="block text-xs font-bold text-primary-700 mb-2.5 ml-1 uppercase tracking-wider">{{ i18n.t()['settings.surname'] }}</label>
                            <input type="text" [(ngModel)]="parentSurname"
                                   class="w-full px-5 py-4 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-base">
                          </div>
                        </div>
                        <div>
                          <label class="block text-xs font-bold text-primary-700 mb-2.5 ml-1 uppercase tracking-wider">{{ i18n.t()['settings.phone'] }}</label>
                          <input type="tel" [(ngModel)]="parentPhone"
                                 class="w-full px-5 py-4 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-base">
                        </div>
                        <button (click)="saveParentProfile()"
                                class="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white py-4 px-8 rounded-2xl font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                          <span class="material-icons">save</span>
                          {{ i18n.t()['settings.saveChanges'] }}
                        </button>
                      </div>
                    </div>
                  </div>
                }
              }
            </div>
          }
        </div>
      </main>

      <!-- Bottom Nav (Mobile) -->
      <app-bottom-nav />

      <!-- ══════════════════════════════════════════
           ADD/EDIT CHILD MODAL (Sprint 7 — 3-step wizard)
           ══════════════════════════════════════════ -->
      @if (showChildModal()) {
        <app-add-edit-child-modal
          [mode]="isAddingChild() ? 'add' : 'edit'"
          [child]="editingChild() ?? undefined"
          (saved)="onChildSaved($event)"
          (cancelled)="closeModal()"
        />
      }

      <!-- ══════════════════════════════════════════
           EDIT CHILD MODAL (Overlay)
           ══════════════════════════════════════════ -->
      @if (editingChild()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" (click)="closeEditModal()"></div>

          <!-- Modal Card -->
          <div class="relative z-10 w-full max-w-md bg-white rounded-[2rem] shadow-[0_32px_80px_-12px_rgba(0,0,0,0.25)] border border-slate-100 overflow-hidden animate-slide-up">

            <!-- Top accent -->
            <div class="h-1.5 bg-gradient-to-r from-primary-600 via-primary-500 to-teal-400"></div>

            <div class="p-10">

              <!-- Header -->
              <div class="flex items-center justify-between mb-8">
                <h2 class="text-2xl font-black text-gray-800 flex items-center gap-3">
                  <span class="material-icons text-primary-500 bg-primary-50 p-2 rounded-xl">edit</span>
                  {{ i18n.locale() === 'sq' ? 'Modifiko Profilin e Fëmijës' : 'Edit Child Profile' }}
                </h2>
                <button (click)="closeEditModal()"
                        class="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all shadow-sm border border-slate-200">
                  <span class="material-icons text-base">close</span>
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
                      <span class="absolute right-3 top-1/2 -translate-y-1/2 material-icons text-red-400 text-xl animate-fade-in">error_outline</span>
                    }
                  </div>
                  @if (editNameInvalid()) {
                    <p class="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                      <span class="material-icons text-xs">error_outline</span>
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
                      <span class="material-icons text-lg">calendar_month</span>
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
                        <span class="material-icons text-teal-500 bg-teal-50 rounded-full text-sm shadow-sm">verified</span>
                      </span>
                    }
                    <span class="absolute right-3 top-1/2 -translate-y-1/2 material-icons text-gray-400 text-lg pointer-events-none">expand_more</span>
                  </div>
                  @if (editBloodType()) {
                    <p class="mt-2 text-xs text-teal-600 font-medium flex items-center gap-1 animate-fade-in">
                      <span class="material-icons text-xs text-teal-500">verified</span>
                      {{ i18n.isSq() ? 'Grupi i gjakut u verifikua.' : 'Blood type verified.' }}
                    </p>
                  }
                </div>

                <!-- Issue #7: Gender -->
                <div>
                  <label class="block text-xs font-bold text-primary-700 mb-2.5 ml-1 uppercase tracking-wider">
                    {{ i18n.locale() === 'sq' ? 'Gjinia' : 'Gender' }}
                  </label>
                  <div class="relative">
                    <select [(ngModel)]="editGender"
                            class="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200 transition-all text-lg shadow-sm appearance-none focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500">
                      <option value="">--</option>
                      <option value="M">{{ i18n.isSq() ? 'Mashkull' : 'Male' }}</option>
                      <option value="F">{{ i18n.isSq() ? 'Femer' : 'Female' }}</option>
                    </select>
                    <span class="absolute right-3 top-1/2 -translate-y-1/2 material-icons text-gray-400 text-lg pointer-events-none">expand_more</span>
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
                    class="w-full file:mr-4 file:px-4 file:py-2 file:rounded-xl file:border-0 file:bg-primary-50 file:text-primary-700 file:font-bold file:cursor-pointer text-sm text-gray-500 cursor-pointer">
                  @if (documentError()) {
                    <p class="text-red-500 text-xs mt-1">{{ documentError() }}</p>
                  }
                  @if (editChildDocument()) {
                    <p class="text-teal-600 text-xs mt-1 flex items-center gap-1"><span class="material-icons text-sm">check_circle</span> {{ i18n.t()['child.documentAttached'] }}</p>
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
                      <span class="material-icons text-teal-500">check_circle</span>
                      {{ i18n.isSq() ? 'Ndryshimet u ruajtën!' : 'Changes saved!' }}
                    </div>
                  }
                  <button (click)="saveEditChild()"
                          class="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white py-4 rounded-2xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-base shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                          [disabled]="editNameInvalid() || saving()">
                    @if (saving()) {
                      <span class="material-icons animate-spin">progress_activity</span>
                      {{ i18n.isSq() ? 'Duke ruajtur...' : 'Saving...' }}
                    } @else {
                      <span class="material-icons">save</span>
                      {{ i18n.locale() === 'sq' ? 'Ruaj Ndryshimet' : 'Save Changes' }}
                    }
                  </button>
                  <button (click)="showDeleteConfirm.set(true)"
                          class="w-full border-2 border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 py-3.5 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 text-sm">
                    <span class="material-icons text-base">delete_outline</span>
                    {{ i18n.locale() === 'sq' ? 'Fshi Profilin' : 'Delete Profile' }}
                  </button>
                </div>
                <!-- Delete Confirmation Modal (Issue #5) -->
                @if (showDeleteConfirm()) {
                  <div class="mt-4 p-5 bg-red-50 border-2 border-red-200 rounded-2xl animate-fade-in">
                    <div class="flex items-center gap-3 mb-3">
                      <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <span class="material-icons text-red-500 text-lg">warning</span>
                      </div>
                      <div>
                        <p class="font-bold text-gray-800 text-base">{{ i18n.isSq() ? 'Fshi profilin e fëmijës?' : 'Delete child profile?' }}</p>
                        <p class="text-sm text-gray-500">{{ editingChild()?.name }}</p>
                      </div>
                    </div>
                    <p class="text-sm text-gray-600 mb-5">{{ i18n.isSq() ? 'Ky veprim nuk mund të kthehet. Të gjitha të dhënat do të fshihen përgjithmonë.' : 'This action cannot be undone. All data will be permanently deleted.' }}</p>
                    <div class="flex gap-3">
                      <button (click)="showDeleteConfirm.set(false)"
                              class="flex-1 py-3 rounded-xl border-2 border-slate-200 text-gray-600 font-bold hover:bg-slate-100 transition-all text-sm">
                        {{ i18n.isSq() ? 'Anulo' : 'Cancel' }}
                      </button>
                      <button (click)="confirmDeleteChild()"
                              class="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-400 text-white font-bold hover:from-red-400 hover:to-red-300 transition-all text-sm shadow-sm flex items-center justify-center gap-2">
                        <span class="material-icons text-base">delete_forever</span>
                        {{ i18n.isSq() ? 'Fshi' : 'Delete' }}
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
export class ShellComponent {
  dataService = inject(DataService);
  i18n = inject(I18nService);
  router = inject(Router);

  private navigateHandler = (e: Event) => {
    const route = (e as CustomEvent<string>).detail;
    this.navigateTo(route);
  };

  constructor() {
    // Listen for cross-component navigation events from home sub-components
    window.addEventListener('kiddok:navigate', this.navigateHandler);
  }

  ngOnDestroy() {
    window.removeEventListener('kiddok:navigate', this.navigateHandler);
  }

  isAddingChild = signal(false);
  showChildModal = signal(false);
  settingsSaved = signal(false);
  viewState = signal<'selector' | 'app'>('selector');

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
  // TODO: implement dirty-flag optimization — track originalDocument and only send if changed
  originalDocument = signal<string | null>(null);

  // ── Add Child Form signals ─────────────────────────────────────
  addNameInvalid = signal(false);

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

  onBloodTypeChange() {
    // Dead code — reactivity already handled by editBloodType.set($event) in template (Issue #6 removed)
  }

  // Add child name handlers
  onAddNameInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.newChildName = value;
    this.addNameInvalid.set(this.hasNameError(value));
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
      medicalDocument: this.editChildDocument() || undefined,
      documentIssueDate: this.editChildDocumentDate || undefined,
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
    this.dataService.switchChild(id);
    this.viewState.set('app');
  }

  navigateTo(tabId: string) {
    if (tabId === 'settings') {
      this.loadParentIntoForm();
      this.settingsSaved.set(false);
    }
    if (tabId === 'home') {
      this.currentTab.set('home');
      this.dataService.currentTab.set('home');
    } else {
      if (this.viewState() === 'selector') {
        this.dataService.switchChild(this.dataService.activeChildId() ?? '');
        this.viewState.set('app');
      }
      this.currentTab.set(tabId);
      this.dataService.currentTab.set(tabId);
    }
  }

  // ── Add Child Form ─────────────────────────────────────────────

  submitNewChild() {
    // Block if name has error
    if (this.hasNameError(this.newChildName)) {
      this.addNameInvalid.set(true);
      return;
    }

    if (!this.newChildName || !this.newChildDob) return;

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
