import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { I18nService } from '../../core/i18n/i18n.service';

export interface LabResultRecord {
  id: string;
  childId: string;
  testName: string;
  result: string;
  unit?: string;
  referenceRange?: string;
  date: string;
  doctor?: string;
  notes?: string;
  createdAt: string;
}

@Component({
  selector: 'app-lab-results',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="min-h-screen bg-gray-50 pb-24">

      <!-- Header -->
      <div class="bg-white border-b border-gray-100 px-4 pt-6 pb-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-extrabold text-gray-800">{{ i18n.t()['labResults.title'] || 'Rezultatet e Laboratorit' }}</h1>
            @if (activeChild()) {
              <p class="text-slate-400 text-sm mt-1 font-medium">{{ activeChild()?.name }}</p>
            }
          </div>
          <button (click)="openAddModal()"
            class="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-2xl font-bold shadow-sm transition-all flex items-center gap-2 text-sm">
            <lucide-icon name="plus" class="text-inherit"></lucide-icon>
            {{ i18n.t()['labResults.add'] || 'Shto Rezultat' }}
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

      <!-- Empty State -->
      @if (!loading() && labResults().length === 0) {
        <div class="flex flex-col items-center justify-center mt-20 px-4">
          <svg width="160" height="160" viewBox="0 0 160 160" fill="none" class="mb-6">
            <circle cx="80" cy="80" r="60" fill="#EEF2FF"/>
            <path d="M55 90 L70 90 M70 90 L70 65 M70 65 L90 65 L90 90 L110 90" stroke="#6366F1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <circle cx="80" cy="50" r="10" stroke="#C7D2FE" stroke-width="3" fill="none"/>
          </svg>
          <h3 class="text-xl font-extrabold text-gray-700 mb-2">
            {{ i18n.t()['labResults.empty'] || 'Nuk ka rezultate laboratorike' }}
          </h3>
          <p class="text-slate-400 text-center mb-6 text-sm">
            {{ i18n.t()['labResults.emptyHint'] || 'Shtoni rezultatet e testimit për të ndjekur shëndetin' }}
          </p>
          <button (click)="openAddModal()"
            class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-sm transition-all text-sm">
            <lucide-icon name="plus" class="text-inherit inline w-4 h-4 mr-1"></lucide-icon>
            {{ i18n.t()['labResults.addFirst'] || 'Shto rezultatin e parë' }}
          </button>
        </div>
      }

      <!-- Lab Results List -->
      @if (!loading() && labResults().length > 0) {
        <div class="px-4 mt-4 space-y-3">
          @for (lr of labResults(); track lr.id) {
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div class="p-5">
                <div class="flex items-start gap-4">
                  <!-- Icon -->
                  <div class="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                    <lucide-icon name="flask-conical" class="text-violet-500 w-5 h-5"></lucide-icon>
                  </div>

                  <!-- Info -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2">
                      <h3 class="font-bold text-gray-800 text-base truncate">{{ lr.testName }}</h3>
                      <span class="text-xs font-semibold text-slate-400 flex-shrink-0">
                        {{ formatDate(lr.date) }}
                      </span>
                    </div>

                    <!-- Result Value -->
                    <div class="flex items-center gap-2 mt-1.5">
                      <span class="text-lg font-extrabold text-gray-800">{{ lr.result }}</span>
                      @if (lr.unit) {
                        <span class="text-sm text-slate-400">{{ lr.unit }}</span>
                      }
                      @if (lr.referenceRange) {
                        <span class="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                          {{ i18n.t()['labResults.refRange'] || 'Ref' }}: {{ lr.referenceRange }}
                        </span>
                      }
                    </div>

                    <!-- Doctor & Date -->
                    @if (lr.doctor) {
                      <div class="flex items-center gap-2 mt-1 text-xs text-slate-400">
                        <lucide-icon name="stethoscope" class="w-3.5 h-3.5 flex-shrink-0"></lucide-icon>
                        <span>{{ lr.doctor }}</span>
                      </div>
                    }
                  </div>
                </div>

                <!-- Notes -->
                @if (lr.notes) {
                  <div class="mt-3 text-xs text-slate-500 bg-slate-50 rounded-xl p-3">
                    {{ lr.notes }}
                  </div>
                }

                <!-- Actions -->
                <div class="flex items-center gap-2 mt-4">
                  <button (click)="openViewModal(lr)"
                    class="flex-1 py-2 rounded-xl text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-all flex items-center justify-center gap-1.5">
                    <lucide-icon name="eye" class="w-3.5 h-3.5"></lucide-icon>
                    {{ i18n.t()['labResults.view'] || 'Shiko Detajet' }}
                  </button>
                  <button (click)="confirmDelete(lr)"
                    class="flex-1 py-2 rounded-xl text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 transition-all flex items-center justify-center gap-1.5">
                    <lucide-icon name="trash-2" class="w-3.5 h-3.5"></lucide-icon>
                    {{ i18n.t()['labResults.delete'] || 'Fshi' }}
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>

    <!-- Add Modal -->
    @if (showModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
           (click)="closeModal()">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
             (click)="$event.stopPropagation()">

          <!-- Modal Header -->
          <div class="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
            <h2 class="text-xl font-extrabold text-gray-800">
              {{ i18n.t()['labResults.addResult'] || 'Shto Rezultat Laboratori' }}
            </h2>
            <button (click)="closeModal()" class="p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <lucide-icon name="x" class="w-5 h-5 text-slate-400"></lucide-icon>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6 space-y-5">
            <!-- Test Name -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['labResults.testName'] || 'Emri i Testit' }} *
              </label>
              <input type="text" [(ngModel)]="formTestName"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm font-medium"
                [placeholder]="i18n.t()['labResults.testNamePlaceholder'] || 'P.sh. Gjak i plotë'">
            </div>

            <!-- Result -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">
                  {{ i18n.t()['labResults.result'] || 'Rezultati' }} *
                </label>
                <input type="text" [(ngModel)]="formResult"
                  class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm font-medium">
              </div>
              <div>
                <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">
                  {{ i18n.t()['labResults.unit'] || 'Njësia' }}
                </label>
                <input type="text" [(ngModel)]="formUnit"
                  class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm font-medium"
                  placeholder="g/dL">
              </div>
            </div>

            <!-- Reference Range -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['labResults.referenceRange'] || 'Vlera Referente' }}
                <span class="text-slate-400 normal-case font-normal text-xs ml-1">({{ i18n.t()['labResults.optional'] || 'opsionale' }})</span>
              </label>
              <input type="text" [(ngModel)]="formReferenceRange"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm font-medium"
                placeholder="P.sh. 12.0 - 16.0">
            </div>

            <!-- Date -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['labResults.date'] || 'Data e Testit' }} *
              </label>
              <input type="date" [(ngModel)]="formDate"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm">
            </div>

            <!-- Doctor -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['labResults.doctor'] || 'Doktori' }}
                <span class="text-slate-400 normal-case font-normal text-xs ml-1">({{ i18n.t()['labResults.optional'] || 'opsionale' }})</span>
              </label>
              <input type="text" [(ngModel)]="formDoctor"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm font-medium"
                [placeholder]="i18n.t()['labResults.doctorPlaceholder'] || 'P.sh. Dr. Arben Basha'">
            </div>

            <!-- Notes -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['labResults.notes'] || 'Shënime' }}
                <span class="text-slate-400 normal-case font-normal text-xs ml-1">({{ i18n.t()['labResults.optional'] || 'opsionale' }})</span>
              </label>
              <textarea [(ngModel)]="formNotes" rows="2"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm resize-none"
                [placeholder]="i18n.t()['labResults.notesPlaceholder'] || 'Shëno detajet shtesë...'"></textarea>
            </div>

            <!-- Error -->
            @if (saveError()) {
              <div class="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold">
                {{ saveError() }}
              </div>
            }
          </div>

          <!-- Modal Footer -->
          <div class="px-6 pb-6 flex gap-3">
            <button (click)="closeModal()"
              class="flex-1 py-3.5 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all text-sm">
              {{ i18n.t()['labResults.cancel'] || 'Anulo' }}
            </button>
            <button (click)="saveLabResult()"
              [disabled]="saving() || !canSave()"
              class="flex-1 py-3.5 rounded-2xl font-bold text-white bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm flex items-center justify-center gap-2">
              @if (saving()) {
                <lucide-icon name="loader-2" class="w-4 h-4 animate-spin"></lucide-icon>
                {{ i18n.t()['labResults.saving'] || 'Duke ruajtur...' }}
              } @else {
                <lucide-icon name="check" class="w-4 h-4"></lucide-icon>
                {{ i18n.t()['labResults.save'] || 'Ruaj' }}
              }
            </button>
          </div>
        </div>
      </div>
    }

    <!-- View Modal -->
    @if (viewingResult()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
           (click)="viewingResult.set(null)">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md"
             (click)="$event.stopPropagation()">

          <!-- Modal Header -->
          <div class="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
            <h2 class="text-xl font-extrabold text-gray-800">
              {{ viewingResult()!.testName }}
            </h2>
            <button (click)="viewingResult.set(null)" class="p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <lucide-icon name="x" class="w-5 h-5 text-slate-400"></lucide-icon>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6 space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-slate-50 rounded-2xl p-4">
                <p class="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">{{ i18n.t()['labResults.result'] || 'Rezultati' }}</p>
                <p class="text-lg font-extrabold text-gray-800">{{ viewingResult()!.result }}
                  @if (viewingResult()!.unit) {
                    <span class="text-sm font-normal text-slate-400">{{ viewingResult()!.unit }}</span>
                  }
                </p>
              </div>
              <div class="bg-slate-50 rounded-2xl p-4">
                <p class="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">{{ i18n.t()['labResults.date'] || 'Data' }}</p>
                <p class="text-lg font-extrabold text-gray-800">{{ formatDate(viewingResult()!.date) }}</p>
              </div>
            </div>

            @if (viewingResult()!.referenceRange) {
              <div class="bg-violet-50 rounded-2xl p-4">
                <p class="text-xs text-violet-500 font-semibold uppercase tracking-wider mb-1">{{ i18n.t()['labResults.referenceRange'] || 'Vlera Referente' }}</p>
                <p class="text-base font-bold text-violet-700">{{ viewingResult()!.referenceRange }}</p>
              </div>
            }

            @if (viewingResult()!.doctor) {
              <div class="flex items-center gap-2 text-sm text-slate-500">
                <lucide-icon name="stethoscope" class="w-4 h-4 text-slate-400"></lucide-icon>
                <span>{{ viewingResult()!.doctor }}</span>
              </div>
            }

            @if (viewingResult()!.notes) {
              <div class="bg-slate-50 rounded-2xl p-4">
                <p class="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">{{ i18n.t()['labResults.notes'] || 'Shënime' }}</p>
                <p class="text-sm text-slate-600">{{ viewingResult()!.notes }}</p>
              </div>
            }
          </div>

          <!-- Modal Footer -->
          <div class="px-6 pb-6">
            <button (click)="viewingResult.set(null)"
              class="w-full py-3.5 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all text-sm">
              {{ i18n.t()['labResults.close'] || 'Mbyll' }}
            </button>
          </div>
        </div>
      </div>
    }

    <!-- Delete Confirmation Modal -->
    @if (showDeleteModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
           (click)="showDeleteModal.set(false)">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6"
             (click)="$event.stopPropagation()">
          <div class="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <lucide-icon name="trash-2" class="text-red-500 w-6 h-6"></lucide-icon>
          </div>
          <h3 class="text-lg font-extrabold text-gray-800 text-center mb-2">
            {{ i18n.t()['labResults.deleteConfirmTitle'] || 'Fshij Rezultatin?' }}
          </h3>
          <p class="text-slate-500 text-sm text-center mb-6">
            {{ deletingResult()?.testName }}
          </p>
          <div class="flex gap-3">
            <button (click)="showDeleteModal.set(false)"
              class="flex-1 py-3 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all text-sm">
              {{ i18n.t()['labResults.cancel'] || 'Anulo' }}
            </button>
            <button (click)="deleteLabResult()"
              class="flex-1 py-3 rounded-2xl font-bold text-white bg-red-500 hover:bg-red-600 transition-all text-sm">
              {{ i18n.t()['labResults.delete'] || 'Fshi' }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: []
})
export class LabResultsComponent implements OnInit, OnDestroy {
  i18n = inject(I18nService);
  data = inject(DataService);

  // State
  loading = signal(false);
  saving = signal(false);
  showModal = signal(false);
  showDeleteModal = signal(false);
  viewingResult = signal<LabResultRecord | null>(null);
  deletingResult = signal<LabResultRecord | null>(null);
  saveError = signal<string | null>(null);

  // Form fields
  formTestName = signal('');
  formResult = signal('');
  formUnit = signal('');
  formReferenceRange = signal('');
  formDate = signal('');
  formDoctor = signal('');
  formNotes = signal('');

  // Computed
  activeChild = computed(() => {
    const id = this.data.activeChildId();
    return this.data.children().find(c => c.id === id) ?? null;
  });

  labResults = signal<LabResultRecord[]>([]);

  canSave = computed(() =>
    !!(this.formTestName().trim() && this.formResult().trim() && this.formDate())
  );

  ngOnInit() {
    this.loadLabResults();
  }

  ngOnDestroy() {
    // cleanup if needed
  }

  async loadLabResults() {
    const childId = this.data.activeChildId();
    if (!childId) return;

    this.loading.set(true);
    try {
      const token = localStorage.getItem(this.data.AUTH_KEY);
      const response = await fetch(`${this.data.API_URL}/lab-results/child/${childId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        this.labResults.set(Array.isArray(data) ? data : []);
      }
    } catch {
      // silent fail
    } finally {
      this.loading.set(false);
    }
  }

  openAddModal() {
    this.formTestName.set('');
    this.formResult.set('');
    this.formUnit.set('');
    this.formReferenceRange.set('');
    this.formDate.set(new Date().toISOString().split('T')[0]);
    this.formDoctor.set('');
    this.formNotes.set('');
    this.saveError.set(null);
    this.showModal.set(true);
  }

  openViewModal(lr: LabResultRecord) {
    this.viewingResult.set(lr);
  }

  closeModal() {
    this.showModal.set(false);
  }

  async saveLabResult() {
    if (!this.canSave()) return;

    const childId = this.data.activeChildId();
    if (!childId) return;

    this.saving.set(true);
    this.saveError.set(null);

    const payload: any = {
      testName: this.formTestName().trim(),
      result: this.formResult().trim(),
      unit: this.formUnit().trim() || undefined,
      referenceRange: this.formReferenceRange().trim() || undefined,
      date: new Date(this.formDate()).toISOString(),
      doctor: this.formDoctor().trim() || undefined,
      notes: this.formNotes().trim() || undefined,
    };

    try {
      const token = localStorage.getItem(this.data.AUTH_KEY);
      const response = await fetch(`${this.data.API_URL}/lab-results/${childId}`, {
        method: 'POST',
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
      const list = [saved as LabResultRecord, ...this.labResults()];
      // Sort by date desc
      list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.labResults.set(list);
      this.closeModal();
    } catch (err: any) {
      this.saveError.set(err.message || this.i18n.t()['labResults.saveError'] || 'Ruajtja dështoi.');
    } finally {
      this.saving.set(false);
    }
  }

  confirmDelete(lr: LabResultRecord) {
    this.deletingResult.set(lr);
    this.showDeleteModal.set(true);
  }

  async deleteLabResult() {
    const lr = this.deletingResult();
    if (!lr) return;

    try {
      const token = localStorage.getItem(this.data.AUTH_KEY);
      const response = await fetch(`${this.data.API_URL}/lab-results/${lr.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        this.labResults.set(this.labResults().filter(r => r.id !== lr.id));
      }
    } catch {
      // silent
    } finally {
      this.showDeleteModal.set(false);
      this.deletingResult.set(null);
    }
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString(this.i18n.isSq() ? 'sq-AL' : 'en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }
}