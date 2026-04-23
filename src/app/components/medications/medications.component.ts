import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, ChildProfile } from '../../services/data.service';
import { I18nService } from '../../core/i18n/i18n.service';

export interface MedicationDoseLog {
  id: string;
  medicationId: string;
  takenAt: string;
  notes?: string;
  createdAt: string;
}

export interface MedicationRecord {
  id: string;
  childId: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy?: string;
  notes?: string;
  active: boolean;
  createdAt: string;
  doseLogs: MedicationDoseLog[];
  adherencePct: number | null;
}

const QUICK_FREQUENCIES = [
  { value: 'once_daily', labelSq: '1x ditën', labelEn: 'Once daily' },
  { value: 'twice_daily', labelSq: '2x ditën', labelEn: 'Twice daily' },
  { value: 'three_times_daily', labelSq: '3x ditën', labelEn: 'Three times daily' },
  { value: 'every_8_hours', labelSq: 'Çdo 8 orë', labelEn: 'Every 8 hours' },
  { value: 'as_needed', labelSq: 'Sipas nevojës', labelEn: 'As needed' },
];

type TabType = 'active' | 'archived';

@Component({
  selector: 'app-medications',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="min-h-screen bg-gray-50 pb-24">

      <!-- Header -->
      <div class="bg-white border-b border-gray-100 px-4 pt-6 pb-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-extrabold text-gray-800">{{ i18n.t()['medTracker.title'] || 'Medikamentet' }}</h1>
            @if (activeChild()) {
              <p class="text-slate-400 text-sm mt-1 font-medium">{{ activeChild()?.name }}</p>
            }
          </div>
          <button (click)="openAddModal()"
            class="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-2xl font-bold shadow-sm transition-all flex items-center gap-2 text-sm">
            <lucide-icon name="plus" class="text-inherit"></lucide-icon>
            {{ i18n.t()['medications.add'] || 'Shto Medikament' }}
          </button>
        </div>
      </div>

      <!-- Adherence Summary Banner -->
      @if (activeScheduledMeds().length > 0 && overallAdherence() !== null) {
        <div class="px-4 mt-4">
          <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
            <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
              <lucide-icon name="bar-chart-2" class="text-emerald-600 w-5 h-5"></lucide-icon>
            </div>
            <div class="flex-1">
              <p class="font-bold text-emerald-700 text-sm">
                {{ onTimeCount() }}/{{ activeScheduledMeds().length }} {{ i18n.t()['medTracker.adherenceLabel'] || 'medikamente në kohë' }} — {{ overallAdherence() }}% {{ i18n.t()['medTracker.adherence'] || 'përputhshmëria' }}
              </p>
            </div>
          </div>
        </div>
      }

      <!-- Tab Switcher -->
      <div class="px-4 mt-4">
        <div class="flex bg-white rounded-2xl p-1 border border-gray-100">
          <button (click)="activeTab.set('active')"
            class="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all"
            [ngClass]="activeTab() === 'active' ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'">
            {{ i18n.t()['medTracker.activeTab'] || 'Aktiv' }}
            @if (activeMeds().length > 0) {
              <span class="ml-1 text-xs opacity-75">({{ activeMeds().length }})</span>
            }
          </button>
          <button (click)="activeTab.set('archived')"
            class="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all"
            [ngClass]="activeTab() === 'archived' ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'">
            {{ i18n.t()['medTracker.archivedTab'] || 'Arkivë' }}
            @if (archivedMeds().length > 0) {
              <span class="ml-1 text-xs opacity-75">({{ archivedMeds().length }})</span>
            }
          </button>
        </div>
      </div>

      <!-- Loading Skeleton -->
      @if (loading()) {
        <div class="px-4 mt-4 space-y-3">
          @for (i of [1,2,3]; track i) {
            <div class="bg-white rounded-2xl p-5 border border-gray-100 animate-pulse">
              <div class="flex gap-4">
                <div class="w-12 h-12 rounded-xl bg-gray-200"></div>
                <div class="flex-1 space-y-2">
                  <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div class="h-3 bg-gray-100 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          }
        </div>
      }

      <!-- Empty State: No active meds -->
      @if (!loading() && activeTab() === 'active' && activeMeds().length === 0) {
        <div class="flex flex-col items-center justify-center mt-20 px-4">
          <svg width="160" height="160" viewBox="0 0 160 160" fill="none" class="mb-6">
            <circle cx="80" cy="80" r="60" fill="#EEF2FF"/>
            <path d="M65 75h30M65 85h20" stroke="#6366F1" stroke-width="4" stroke-linecap="round"/>
            <circle cx="80" cy="80" r="40" stroke="#C7D2FE" stroke-width="3" fill="none"/>
          </svg>
          <h3 class="text-xl font-extrabold text-gray-700 mb-2">{{ i18n.t()['medTracker.noActiveMeds'] || 'Nuk ka medikamente aktive' }}</h3>
          <p class="text-slate-400 text-center mb-6 text-sm">{{ i18n.t()['medications.emptyHint'] || 'Shtoni medikamentet e para për të ndjekur trajtimin' }}</p>
          <button (click)="openAddModal()"
            class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-sm transition-all text-sm">
            <lucide-icon name="plus" class="text-inherit inline w-4 h-4 mr-1"></lucide-icon>
            {{ i18n.t()['medications.addFirst'] || 'Shto medikamentin e parë' }}
          </button>
        </div>
      }

      <!-- Empty State: No archived meds -->
      @if (!loading() && activeTab() === 'archived' && archivedMeds().length === 0) {
        <div class="flex flex-col items-center justify-center mt-20 px-4">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" class="mb-4 opacity-40">
            <circle cx="60" cy="60" r="50" stroke="#9CA3AF" stroke-width="3" fill="none"/>
            <path d="M50 60h20M60 50v20" stroke="#9CA3AF" stroke-width="3" stroke-linecap="round"/>
          </svg>
          <h3 class="text-lg font-extrabold text-gray-600 mb-1">{{ i18n.t()['medTracker.noArchivedMeds'] || 'Nuk ka medikamente të arkivuar' }}</h3>
        </div>
      }

      <!-- Active Medications List -->
      @if (!loading() && activeTab() === 'active' && activeMeds().length > 0) {
        <div class="px-4 mt-4 space-y-3">
          @for (med of activeMeds(); track med.id) {
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div class="p-5">
                <div class="flex items-start gap-4">
                  <!-- Icon -->
                  <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-green-100">
                    <lucide-icon name="pill" class="text-green-600 w-5 h-5"></lucide-icon>
                  </div>

                  <!-- Info -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2">
                      <h3 class="font-bold text-gray-800 text-base truncate">{{ med.name }}</h3>
                      <!-- Adherence Badge -->
                      @if (med.adherencePct !== null) {
                        <span class="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                              [ngClass]="adherenceBadgeClass(med.adherencePct)">
                          {{ med.adherencePct }}%
                        </span>
                      } @else {
                        <span class="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 bg-gray-100 text-gray-500">
                          {{ i18n.t()['medTracker.asNeeded'] || 'Sipas nevojës' }}
                        </span>
                      }
                    </div>

                    <!-- Dosage & Frequency -->
                    <div class="flex items-center gap-2 mt-1.5 text-sm text-slate-500">
                      <lucide-icon name="syringe" class="w-3.5 h-3.5 text-slate-400 flex-shrink-0"></lucide-icon>
                      <span>{{ med.dosage }} — {{ frequencyLabel(med.frequency) }}</span>
                    </div>

                    <!-- Duration -->
                    <div class="flex items-center gap-2 mt-1 text-xs text-slate-400">
                      <lucide-icon name="calendar" class="w-3.5 h-3.5 flex-shrink-0"></lucide-icon>
                      <span>{{ formatDate(med.startDate) }}
                        @if (med.endDate) {
                          → {{ formatDate(med.endDate) }}
                        } @else {
                          → {{ i18n.t()['medications.ongoing'] || 'Në vazhdim' }}
                        }
                      </span>
                    </div>

                    <!-- Prescribed by -->
                    @if (med.prescribedBy) {
                      <div class="flex items-center gap-2 mt-1 text-xs text-slate-400">
                        <lucide-icon name="user" class="w-3.5 h-3.5 flex-shrink-0"></lucide-icon>
                        <span>{{ med.prescribedBy }}</span>
                      </div>
                    }

                    <!-- Last dose -->
                    @if (med.doseLogs && med.doseLogs.length > 0) {
                      <div class="flex items-center gap-2 mt-2 text-xs text-indigo-600 font-medium">
                        <lucide-icon name="clock" class="w-3.5 h-3.5"></lucide-icon>
                        <span>{{ i18n.t()['medTracker.recentDose'] || 'Doza e fundit:' }} {{ relativeTime(med.doseLogs[0].takenAt) }}</span>
                      </div>
                    }
                  </div>
                </div>

                <!-- Notes -->
                @if (med.notes) {
                  <div class="mt-3 text-xs text-slate-500 bg-slate-50 rounded-xl p-3">{{ med.notes }}</div>
                }

                <!-- Adherence Bar (for scheduled meds) -->
                @if (med.adherencePct !== null) {
                  <div class="mt-3 h-1 rounded-full bg-gray-100 overflow-hidden">
                    <div class="h-full rounded-full transition-all duration-500" [ngClass]="adherenceBarClass(med.adherencePct)"
                         [style.width.%]="med.adherencePct"></div>
                  </div>
                }

                <!-- Actions -->
                <div class="flex items-center gap-2 mt-4">
                  <button (click)="openDoseLogModal(med)"
                    class="flex-1 py-2 rounded-xl text-xs font-semibold bg-indigo-500 hover:bg-indigo-600 text-white transition-all flex items-center justify-center gap-1.5">
                    <lucide-icon name="plus-circle" class="w-3.5 h-3.5"></lucide-icon>
                    {{ i18n.t()['medTracker.logDose'] || 'Regjistro Dozën' }}
                  </button>
                  <button (click)="openHistoryDrawer(med)"
                    class="flex-1 py-2 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-600 transition-all flex items-center justify-center gap-1.5">
                    <lucide-icon name="clock" class="w-3.5 h-3.5"></lucide-icon>
                    {{ i18n.t()['medTracker.viewHistory'] || 'Shiko Historikun' }}
                  </button>
                  <button (click)="openEditModal(med)"
                    class="py-2 px-3 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-600 transition-all flex items-center justify-center">
                    <lucide-icon name="pencil" class="w-3.5 h-3.5"></lucide-icon>
                  </button>
                  <button (click)="confirmDelete(med)"
                    class="py-2 px-3 rounded-xl text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 transition-all flex items-center justify-center">
                    <lucide-icon name="trash-2" class="w-3.5 h-3.5"></lucide-icon>
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      }

      <!-- Archived Medications List -->
      @if (!loading() && activeTab() === 'archived' && archivedMeds().length > 0) {
        <div class="px-4 mt-4 space-y-3">
          @for (med of archivedMeds(); track med.id) {
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden opacity-80">
              <div class="p-5">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-100">
                    <lucide-icon name="pill-off" class="text-gray-400 w-5 h-5"></lucide-icon>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2">
                      <h3 class="font-bold text-gray-800 text-base truncate">{{ med.name }}</h3>
                      <span class="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 bg-gray-100 text-gray-500">
                        {{ i18n.t()['medTracker.archived'] || 'Arkivë' }}
                      </span>
                    </div>
                    <div class="flex items-center gap-2 mt-1.5 text-sm text-slate-500">
                      <lucide-icon name="syringe" class="w-3.5 h-3.5 text-slate-400 flex-shrink-0"></lucide-icon>
                      <span>{{ med.dosage }} — {{ frequencyLabel(med.frequency) }}</span>
                    </div>
                    <div class="flex items-center gap-2 mt-1 text-xs text-slate-400">
                      <lucide-icon name="calendar" class="w-3.5 h-3.5 flex-shrink-0"></lucide-icon>
                      <span>{{ formatDate(med.startDate) }}
                        @if (med.endDate) {
                          → {{ formatDate(med.endDate) }}
                        } @else {
                          → {{ i18n.t()['medications.ongoing'] || 'Në vazhdim' }}
                        }
                      </span>
                    </div>
                    @if (med.adherencePct !== null) {
                      <div class="mt-2">
                        <span class="text-xs font-semibold px-2.5 py-1 rounded-full"
                              [ngClass]="adherenceBadgeClass(med.adherencePct)">
                          {{ med.adherencePct }}% {{ i18n.t()['medTracker.adherence'] || 'përputhshmëria' }}
                        </span>
                      </div>
                    }
                  </div>
                </div>
                <!-- Edit only action -->
                <div class="flex items-center gap-2 mt-4">
                  <button (click)="openEditModal(med)"
                    class="flex-1 py-2 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-600 transition-all flex items-center justify-center gap-1.5">
                    <lucide-icon name="pencil" class="w-3.5 h-3.5"></lucide-icon>
                    {{ i18n.t()['medications.edit'] || 'Redakto' }}
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>

    <!-- Add/Edit Medication Modal -->
    @if (showModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" (click)="closeModal()">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto" (click)="$event.stopPropagation()">
          <div class="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
            <h2 class="text-xl font-extrabold text-gray-800">
              {{ editingMed() ? (i18n.t()['medications.editMed'] || 'Redakto Medikamentin')
                               : (i18n.t()['medications.addMed'] || 'Shto Medikament') }}
            </h2>
            <button (click)="closeModal()" class="p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <lucide-icon name="x" class="w-5 h-5 text-slate-400"></lucide-icon>
            </button>
          </div>
          <div class="p-6 space-y-5">
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['medications.name'] || 'Emri i medikamentit' }} *</label>
              <input type="text" [(ngModel)]="formName"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm font-medium"
                [placeholder]="i18n.t()['medications.namePlaceholder'] || 'P.sh. Amoxicillin'">
            </div>
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['medications.dosage'] || 'Doza' }} *</label>
              <input type="text" [(ngModel)]="formDosage"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm font-medium"
                placeholder="P.sh. 250mg ose 5ml">
            </div>
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['medications.frequency'] || 'Frekuenca' }} *</label>
              <div class="grid grid-cols-2 gap-2">
                @for (freq of quickFrequencies; track freq.value) {
                  <button type="button" (click)="formFrequency.set(freq.value)"
                    class="py-2.5 rounded-xl text-xs font-semibold border-2 transition-all text-center"
                    [ngClass]="formFrequency() === freq.value ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-indigo-200'">
                    {{ i18n.isSq() ? freq.labelSq : freq.labelEn }}
                  </button>
                }
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['medications.startDate'] || 'Data e fillimit' }} *</label>
              <input type="date" [(ngModel)]="formStartDate"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm">
            </div>
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['medications.endDate'] || 'Data e përfundimit' }} <span class="text-slate-400 normal-case font-normal text-xs ml-1">({{ i18n.t()['medications.optional'] || 'opsionale' }})</span></label>
              <input type="date" [(ngModel)]="formEndDate"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm">
            </div>
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['medications.prescribedBy'] || 'Përshkruar nga' }} <span class="text-slate-400 normal-case font-normal text-xs ml-1">({{ i18n.t()['medications.optional'] || 'opsionale' }})</span></label>
              <input type="text" [(ngModel)]="formPrescribedBy"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm font-medium"
                [placeholder]="i18n.t()['medications.prescribedByPlaceholder'] || 'P.sh. Dr. Elena Hoxha'">
            </div>
            <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div>
                <p class="font-semibold text-gray-800 text-sm">{{ i18n.t()['medications.active'] || 'Aktiv' }}</p>
                <p class="text-xs text-slate-500">{{ i18n.t()['medications.activeHint'] || 'Medikamenti në përdorim aktualisht' }}</p>
              </div>
              <button type="button" (click)="formActive.set(!formActive())"
                class="relative w-12 h-7 rounded-full transition-colors"
                [ngClass]="formActive() ? 'bg-indigo-500' : 'bg-slate-300'">
                <span class="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform"
                      [ngClass]="formActive() ? 'translate-x-5' : 'translate-x-0'"></span>
              </button>
            </div>
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['medications.notes'] || 'Shënime' }} <span class="text-slate-400 normal-case font-normal text-xs ml-1">({{ i18n.t()['medications.optional'] || 'opsionale' }})</span></label>
              <textarea [(ngModel)]="formNotes" rows="2"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm resize-none"
                [placeholder]="i18n.t()['medications.notesPlaceholder'] || 'Shëno detajet shtesë...'"></textarea>
            </div>
            @if (saveError()) {
              <div class="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold">{{ saveError() }}</div>
            }
          </div>
          <div class="px-6 pb-6 flex gap-3">
            <button (click)="closeModal()"
              class="flex-1 py-3.5 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all text-sm">
              {{ i18n.t()['medications.cancel'] || 'Anulo' }}
            </button>
            <button (click)="saveMedication()"
              [disabled]="saving() || !canSave()"
              class="flex-1 py-3.5 rounded-2xl font-bold text-white bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm flex items-center justify-center gap-2">
              @if (saving()) {
                <lucide-icon name="loader-2" class="w-4 h-4 animate-spin"></lucide-icon>
                {{ i18n.t()['medications.saving'] || 'Duke ruajtur...' }}
              } @else {
                <lucide-icon name="check" class="w-4 h-4"></lucide-icon>
                {{ i18n.t()['medications.save'] || 'Ruaj' }}
              }
            </button>
          </div>
        </div>
      </div>
    }

    <!-- Log Dose Modal -->
    @if (showDoseLogModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" (click)="closeDoseLogModal()">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md" (click)="$event.stopPropagation()">
          <div class="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
            <h2 class="text-xl font-extrabold text-gray-800">{{ i18n.t()['medTracker.logDose'] || 'Regjistro Dozën' }}</h2>
            <button (click)="closeDoseLogModal()" class="p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <lucide-icon name="x" class="w-5 h-5 text-slate-400"></lucide-icon>
            </button>
          </div>
          <div class="p-6 space-y-5">
            @if (doseLogMed()) {
              <div class="bg-indigo-50 rounded-xl p-3 text-sm">
                <span class="font-bold text-indigo-700">{{ doseLogMed()?.name }}</span>
                <span class="text-indigo-500 ml-2">{{ doseLogMed()?.dosage }}</span>
              </div>
            }
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['medTracker.doseTakenAt'] || 'Data dhe Ora' }} *</label>
              <input type="datetime-local" [(ngModel)]="doseLogTakenAt"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm">
            </div>
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['medTracker.doseNotes'] || 'Shënime' }} <span class="text-slate-400 normal-case font-normal text-xs ml-1">({{ i18n.t()['medications.optional'] || 'opsionale' }})</span></label>
              <textarea [(ngModel)]="doseLogNotes" rows="2"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm resize-none"
                [placeholder]="i18n.t()['medTracker.doseNotesPlaceholder'] || 'Opsionale, p.sh. me ushqim'"></textarea>
            </div>
            @if (doseLogError()) {
              <div class="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold">{{ doseLogError() }}</div>
            }
          </div>
          <div class="px-6 pb-6 flex gap-3">
            <button (click)="closeDoseLogModal()"
              class="flex-1 py-3.5 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all text-sm">
              {{ i18n.t()['medTracker.cancel'] || 'Anulo' }}
            </button>
            <button (click)="saveDoseLog()"
              [disabled]="doseLogSaving()"
              class="flex-1 py-3.5 rounded-2xl font-bold text-white bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 transition-all text-sm flex items-center justify-center gap-2">
              @if (doseLogSaving()) {
                <lucide-icon name="loader-2" class="w-4 h-4 animate-spin"></lucide-icon>
                {{ i18n.t()['medications.saving'] || 'Duke ruajtur...' }}
              } @else {
                <lucide-icon name="check" class="w-4 h-4"></lucide-icon>
                {{ i18n.t()['medTracker.save'] || 'Ruaj' }}
              }
            </button>
          </div>
        </div>
      </div>
    }

    <!-- Dose History Drawer -->
    @if (showHistoryDrawer()) {
      <div class="fixed inset-0 z-50 flex flex-col justify-end bg-black/40 backdrop-blur-sm" (click)="closeHistoryDrawer()">
        <div class="bg-white rounded-t-3xl shadow-2xl max-h-[70vh] overflow-y-auto" (click)="$event.stopPropagation()">
          <div class="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
            <h2 class="text-xl font-extrabold text-gray-800">{{ i18n.t()['medTracker.doseHistory'] || 'Historia e Dozave' }}</h2>
            <button (click)="closeHistoryDrawer()" class="p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <lucide-icon name="x" class="w-5 h-5 text-slate-400"></lucide-icon>
            </button>
          </div>
          <div class="p-6">
            @if (!historyMed()?.doseLogs || historyMed()!.doseLogs.length === 0) {
              <div class="text-center py-8">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" class="mx-auto mb-4 opacity-40">
                  <circle cx="40" cy="40" r="30" stroke="#9CA3AF" stroke-width="3" fill="none"/>
                  <path d="M30 40h20M40 30v20" stroke="#9CA3AF" stroke-width="3" stroke-linecap="round"/>
                </svg>
                <p class="text-slate-400 text-sm">{{ i18n.t()['medTracker.noDoses'] || 'Ende nuk ka doza të regjistruara' }}</p>
              </div>
            } @else {
              <div class="space-y-3">
                @for (log of historyMed()!.doseLogs; track log.id) {
                  <div class="border-b border-gray-50 pb-3 mb-3 last:border-0 last:pb-0 last:mb-0">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <lucide-icon name="check" class="text-emerald-600 w-4 h-4"></lucide-icon>
                      </div>
                      <div class="flex-1">
                        <p class="text-sm font-semibold text-gray-800">{{ formatDateTime(log.takenAt) }}</p>
                        @if (log.notes) {
                          <p class="text-xs text-slate-500 mt-0.5">{{ log.notes }}</p>
                        }
                      </div>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </div>
    }

    <!-- Delete Confirmation Modal -->
    @if (showDeleteModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" (click)="showDeleteModal.set(false)">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6" (click)="$event.stopPropagation()">
          <div class="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <lucide-icon name="trash-2" class="text-red-500 w-6 h-6"></lucide-icon>
          </div>
          <h3 class="text-lg font-extrabold text-gray-800 text-center mb-2">{{ i18n.t()['medications.deleteConfirmTitle'] || 'Fshij Medikamentin?' }}</h3>
          <p class="text-slate-500 text-sm text-center mb-6">{{ deletingMed()?.name }}</p>
          <div class="flex gap-3">
            <button (click)="showDeleteModal.set(false)"
              class="flex-1 py-3 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all text-sm">
              {{ i18n.t()['medications.cancel'] || 'Anulo' }}
            </button>
            <button (click)="deleteMedication()"
              class="flex-1 py-3 rounded-2xl font-bold text-white bg-red-500 hover:bg-red-600 transition-all text-sm">
              {{ i18n.t()['medications.delete'] || 'Fshi' }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: []
})
export class MedicationsComponent implements OnInit, OnDestroy {
  i18n = inject(I18nService);
  data = inject(DataService);

  quickFrequencies = QUICK_FREQUENCIES;

  // State
  loading = signal(false);
  saving = signal(false);
  showModal = signal(false);
  showDeleteModal = signal(false);
  showDoseLogModal = signal(false);
  showHistoryDrawer = signal(false);
  editingMed = signal<MedicationRecord | null>(null);
  deletingMed = signal<MedicationRecord | null>(null);
  doseLogMed = signal<MedicationRecord | null>(null);
  historyMed = signal<MedicationRecord | null>(null);
  saveError = signal<string | null>(null);
  doseLogError = signal<string | null>(null);
  doseLogSaving = signal(false);
  activeTab = signal<TabType>('active');

  // Form fields for med
  formName = signal('');
  formDosage = signal('');
  formFrequency = signal('once_daily');
  formStartDate = signal('');
  formEndDate = signal('');
  formPrescribedBy = signal('');
  formNotes = signal('');
  formActive = signal(true);

  // Form fields for dose log
  doseLogTakenAt = signal('');
  doseLogNotes = signal('');

  // Computed
  activeChild = computed(() => {
    const id = this.data.activeChildId();
    return this.data.children().find(c => c.id === id) ?? null;
  });

  medications = signal<MedicationRecord[]>([]);

  activeMeds = computed(() => this.medications().filter(m => m.active));
  archivedMeds = computed(() => this.medications().filter(m => !m.active));

  activeScheduledMeds = computed(() => this.activeMeds().filter(m => m.frequency !== 'as_needed'));
  onTimeCount = computed(() => {
    const scheduled = this.activeScheduledMeds();
    return scheduled.filter(m => (m.adherencePct ?? 0) >= 80).length;
  });
  overallAdherence = computed(() => {
    const scheduled = this.activeScheduledMeds();
    if (scheduled.length === 0) return null;
    const total = scheduled.reduce((sum, m) => sum + (m.adherencePct ?? 0), 0);
    return Math.round(total / scheduled.length);
  });

  canSave = computed(() =>
    !!(this.formName().trim() && this.formDosage().trim() && this.formFrequency() && this.formStartDate())
  );

  ngOnInit() {
    this.loadMedications();
  }

  ngOnDestroy() {}

  async loadMedications() {
    const childId = this.data.activeChildId();
    if (!childId) return;

    this.loading.set(true);
    try {
      const token = localStorage.getItem(this.data.AUTH_KEY);
      const response = await fetch(`${this.data.API_URL}/medications/child/${childId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        const meds: MedicationRecord[] = (data.medications || []).map((m: any) => ({
          ...m,
          startDate: m.startDate,
          endDate: m.endDate,
          adherencePct: m.adherencePct ?? null,
          doseLogs: m.doseLogs || [],
        }));
        this.medications.set(meds);
      }
    } catch {
      // silent fail
    } finally {
      this.loading.set(false);
    }
  }

  openAddModal() {
    this.editingMed.set(null);
    this.formName.set('');
    this.formDosage.set('');
    this.formFrequency.set('once_daily');
    this.formStartDate.set(new Date().toISOString().split('T')[0]);
    this.formEndDate.set('');
    this.formPrescribedBy.set('');
    this.formNotes.set('');
    this.formActive.set(true);
    this.saveError.set(null);
    this.showModal.set(true);
  }

  openEditModal(med: MedicationRecord) {
    this.editingMed.set(med);
    this.formName.set(med.name);
    this.formDosage.set(med.dosage);
    this.formFrequency.set(med.frequency);
    this.formStartDate.set(med.startDate ? med.startDate.split('T')[0] : '');
    this.formEndDate.set(med.endDate ? med.endDate.split('T')[0] : '');
    this.formPrescribedBy.set(med.prescribedBy || '');
    this.formNotes.set(med.notes || '');
    this.formActive.set(med.active);
    this.saveError.set(null);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.editingMed.set(null);
  }

  openDoseLogModal(med: MedicationRecord) {
    this.doseLogMed.set(med);
    // Default to now
    const now = new Date();
    now.setSeconds(0, 0);
    this.doseLogTakenAt.set(now.toISOString().slice(0, 16));
    this.doseLogNotes.set('');
    this.doseLogError.set(null);
    this.showDoseLogModal.set(true);
  }

  closeDoseLogModal() {
    this.showDoseLogModal.set(false);
    this.doseLogMed.set(null);
  }

  openHistoryDrawer(med: MedicationRecord) {
    this.historyMed.set(med);
    this.showHistoryDrawer.set(true);
  }

  closeHistoryDrawer() {
    this.showHistoryDrawer.set(false);
    this.historyMed.set(null);
  }

  async saveDoseLog() {
    const med = this.doseLogMed();
    if (!med || !this.doseLogTakenAt()) return;

    const childId = this.data.activeChildId();
    if (!childId) return;

    this.doseLogSaving.set(true);
    this.doseLogError.set(null);

    try {
      const token = localStorage.getItem(this.data.AUTH_KEY);
      const response = await fetch(`${this.data.API_URL}/medications/${childId}/doses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          medicationId: med.id,
          takenAt: new Date(this.doseLogTakenAt()).toISOString(),
          notes: this.doseLogNotes().trim() || undefined
        })
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || 'Save failed');
      }

      const newLog: MedicationDoseLog = await response.json();

      // Update local medications list
      const meds = this.medications().map(m => {
        if (m.id !== med.id) return m;
        const doseLogs = [newLog, ...(m.doseLogs || [])];
        return { ...m, doseLogs };
      });
      this.medications.set(meds);
      this.closeDoseLogModal();
    } catch (err: any) {
      this.doseLogError.set(err.message || this.i18n.t()['medications.saveError'] || 'Ruajtja dështoi.');
    } finally {
      this.doseLogSaving.set(false);
    }
  }

  async saveMedication() {
    if (!this.canSave()) return;

    const childId = this.data.activeChildId();
    if (!childId) return;

    this.saving.set(true);
    this.saveError.set(null);

    const payload: any = {
      name: this.formName().trim(),
      dosage: this.formDosage().trim(),
      frequency: this.formFrequency(),
      startDate: new Date(this.formStartDate()).toISOString(),
      endDate: this.formEndDate() ? new Date(this.formEndDate()).toISOString() : undefined,
      prescribedBy: this.formPrescribedBy().trim() || undefined,
      notes: this.formNotes().trim() || undefined,
      active: this.formActive(),
    };

    try {
      const token = localStorage.getItem(this.data.AUTH_KEY);
      const editing = this.editingMed();
      const url = editing
        ? `${this.data.API_URL}/medications/${editing.id}`
        : `${this.data.API_URL}/medications/${childId}`;
      const method = editing ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || 'Save failed');
      }

      const saved = await response.json();
      const meds = [...this.medications()];

      if (editing) {
        const idx = meds.findIndex(m => m.id === saved.id);
        if (idx >= 0) meds[idx] = { ...meds[idx], ...saved };
      } else {
        meds.unshift({ ...saved as MedicationRecord, doseLogs: [], adherencePct: null });
      }

      this.medications.set(meds);
      this.closeModal();
    } catch (err: any) {
      this.saveError.set(err.message || this.i18n.t()['medications.saveError'] || 'Ruajtja dështoi.');
    } finally {
      this.saving.set(false);
    }
  }

  confirmDelete(med: MedicationRecord) {
    this.deletingMed.set(med);
    this.showDeleteModal.set(true);
  }

  async deleteMedication() {
    const med = this.deletingMed();
    if (!med) return;

    try {
      const token = localStorage.getItem(this.data.AUTH_KEY);
      const response = await fetch(`${this.data.API_URL}/medications/${med.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        this.medications.set(this.medications().filter(m => m.id !== med.id));
      }
    } catch {
      // silent
    } finally {
      this.showDeleteModal.set(false);
      this.deletingMed.set(null);
    }
  }

  frequencyLabel(freq: string): string {
    const f = QUICK_FREQUENCIES.find(f => f.value === freq);
    return f ? (this.i18n.isSq() ? f.labelSq : f.labelEn) : freq;
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString(this.i18n.isSq() ? 'sq-AL' : 'en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  formatDateTime(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleString(this.i18n.isSq() ? 'sq-AL' : 'en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }

  relativeTime(dateStr: string): string {
    if (!dateStr) return '';
    const now = new Date();
    const then = new Date(dateStr);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return this.i18n.isSq() ? 'tani' : 'just now';
    if (diffMins < 60) {
      return (this.i18n.isSq()
        ? `${diffMins} minuta më parë`
        : `${diffMins} min ago`).replace('{n}', String(diffMins));
    }
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) {
      return (this.i18n.isSq()
        ? `${diffHours} orë më parë`
        : `${diffHours} hours ago`).replace('{n}', String(diffHours));
    }
    const diffDays = Math.floor(diffHours / 24);
    return (this.i18n.isSq()
      ? `${diffDays} ditë më parë`
      : `${diffDays} days ago`).replace('{n}', String(diffDays));
  }

  adherenceBadgeClass(pct: number | null): string {
    if (pct === null) return 'bg-gray-100 text-gray-500';
    if (pct >= 80) return 'bg-emerald-100 text-emerald-700';
    if (pct >= 50) return 'bg-amber-100 text-amber-700';
    return 'bg-rose-100 text-rose-700';
  }

  adherenceBarClass(pct: number | null): string {
    if (pct === null) return 'bg-gray-200';
    if (pct >= 80) return 'bg-emerald-400';
    if (pct >= 50) return 'bg-amber-400';
    return 'bg-rose-400';
  }
}
