import { Component, inject, signal, computed, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService, ChildProfile } from '../services/data.service';
import { I18nService } from '../core/i18n/i18n.service';

export interface VaccineRecord {
  id: string;
  childId: string;
  vaccineName: string;
  manufacturer?: string;
  doseNumber: number;
  totalDoses: number;
  dueDate: string;
  completedAt?: string;
  administeredBy?: string;
  batchNumber?: string;
  site?: string;
  notes?: string;
  status: 'overdue' | 'due' | 'upcoming' | 'completed';
}

const STANDARD_VACCINES = [
  'BCG', 'HepB-1', 'DTaP-1', 'DTaP-2', 'DTaP-3', 'DTaP-4', 'DTaP-5',
  'Hib-1', 'Hib-2', 'Hib-3', 'Hib-4',
  'IPV-1', 'IPV-2', 'IPV-3', 'IPV-4',
  'HepB-2', 'HepB-3',
  'PCV-1', 'PCV-2', 'PCV-3',
  'Rotavirus-1', 'Rotavirus-2',
  'MMR-1', 'MMR-2',
  'Varicella-1',
  'HPV', 'Tdap',
];

@Component({
  selector: 'app-vaccines',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 pb-24">

      <!-- Header -->
      <div class="bg-white border-b border-gray-100 px-4 pt-6 pb-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-extrabold text-gray-800">{{ t()['vaccines.title'] || 'Vaksinat' }}</h1>
          </div>
          <button (click)="showAddModal.set(true)"
            class="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-2xl font-bold shadow-sm transition-all flex items-center gap-2 text-sm">
            <span class="material-icons text-sm">add</span>
            {{ t()['vaccines.addRecord'] || 'Shto Vaksina' }}
          </button>
        </div>
      </div>

      <!-- Loading Skeleton -->
      @if (loading()) {
        <div class="px-4 mt-6 space-y-4">
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
      @if (!loading() && childVaccines().length === 0) {
        <div class="flex flex-col items-center justify-center mt-20 px-4">
          <!-- Inline SVG illustration -->
          <svg width="160" height="160" viewBox="0 0 160 160" fill="none" class="mb-6">
            <circle cx="80" cy="80" r="60" fill="#EEF2FF"/>
            <rect x="60" y="40" width="40" height="80" rx="8" fill="#6366F1" opacity="0.3"/>
            <rect x="70" y="30" width="20" height="20" rx="4" fill="#6366F1"/>
            <rect x="72" y="70" width="16" height="40" rx="4" fill="#6366F1"/>
            <rect x="68" y="110" width="24" height="6" rx="3" fill="#14B8A6"/>
            <rect x="50" y="78" width="30" height="3" rx="1.5" fill="#6366F1" opacity="0.5"/>
            <rect x="80" y="78" width="30" height="3" rx="1.5" fill="#6366F1" opacity="0.5"/>
          </svg>
          <h2 class="text-xl font-bold text-gray-700 mb-2">{{ t()['vaccines.emptyState'] || 'Akzni s\'ka vaksina' }}</h2>
          <p class="text-gray-500 text-center mb-6 max-w-xs">{{ t()['vaccines.emptyStateHint'] || 'Shtoni vaksinat e para për të ndjekur çdo dozë' }}</p>
          <button (click)="showAddModal.set(true)"
            class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-sm transition-all flex items-center gap-2">
            <span class="material-icons text-sm">add</span>
            {{ t()['vaccines.addRecord'] || 'Shto Vaksina' }}
          </button>
        </div>
      }

      <!-- Alert Banner (Overdue) -->
      @if (overdueCount() > 0 && !loading()) {
        <div class="mx-4 mt-6 bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center gap-3" id="overdue-section">
          <div class="relative flex-shrink-0">
            <div class="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></div>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-bold text-rose-700 text-sm">
              {{ t()['vaccines.alert.overdue'].replace('{n}', overdueCount().toString()) }}
            </p>
          </div>
          <button (click)="showAddModal.set(true)"
            class="bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold px-4 py-2 rounded-xl flex-shrink-0 transition-all">
            {{ t()['vaccines.markComplete'] || 'Shëno si e bërë' }}
          </button>
        </div>
      }

      <!-- Coming Up Card -->
      @if (upcomingVaccines().length > 0 && !loading()) {
        <div class="mx-4 mt-6">
          <h3 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">
            {{ t()['vaccines.comingUp'] || 'Vijon së shpejti' }}
          </h3>
          <div class="space-y-3">
            @for (v of upcomingVaccines().slice(0, 2); track v.id) {
              <div class="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center"
                  [ngClass]="getStatusBgClass(v.status)">
                  <span class="material-icons" [ngClass]="getStatusTextClass(v.status)">{{ getStatusIcon(v.status) }}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-bold text-gray-800 text-sm truncate">{{ v.vaccineName }}</p>
                  <p class="text-xs text-gray-500">{{ formatDate(v.dueDate) }}</p>
                </div>
                <div class="text-right flex-shrink-0">
                  <span class="text-xs font-bold px-2.5 py-1 rounded-full"
                    [ngClass]="getBadgeClass(v.status)">
                    {{ v.doseNumber }}/{{ v.totalDoses }} {{ t()['vaccines.dosesProgress'] ? '' : 'doza' }}
                  </span>
                </div>
              </div>
            }
          </div>
        </div>
      }

      <!-- Vaccine Timeline -->
      @if (!loading() && childVaccines().length > 0) {
        <!-- Overdue Section -->
        @if (overdueVaccines().length > 0) {
          <div class="mx-4 mt-6">
            <h3 class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3 ml-1 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              {{ t()['vaccines.status.overdue'] || 'Vonuar' }} ({{ overdueVaccines().length }})
            </h3>
            <div class="space-y-3">
              @for (v of overdueVaccines(); track v.id) {
                <ng-container *ngTemplateOutlet="vaccineCard; context: {v: v}"></ng-container>
              }
            </div>
          </div>
        }

        <!-- Due Section -->
        @if (dueVaccines().length > 0) {
          <div class="mx-4 mt-6">
            <h3 class="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3 ml-1">
              {{ t()['vaccines.status.due'] || 'Për shkak' }} ({{ dueVaccines().length }})
            </h3>
            <div class="space-y-3">
              @for (v of dueVaccines(); track v.id) {
                <ng-container *ngTemplateOutlet="vaccineCard; context: {v: v}"></ng-container>
              }
            </div>
          </div>
        }

        <!-- Upcoming Section -->
        @if (upcomingVaccines().length > 0) {
          <div class="mx-4 mt-6">
            <h3 class="text-xs font-bold text-teal-600 uppercase tracking-widest mb-3 ml-1">
              {{ t()['vaccines.status.upcoming'] || 'Së shpejti' }} ({{ upcomingVaccines().length }})
            </h3>
            <div class="space-y-3">
              @for (v of upcomingVaccines(); track v.id) {
                <ng-container *ngTemplateOutlet="vaccineCard; context: {v: v}"></ng-container>
              }
            </div>
          </div>
        }

        <!-- Completed Section -->
        @if (completedVaccines().length > 0) {
          <div class="mx-4 mt-6">
            <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">
              {{ t()['vaccines.status.completed'] || 'Përfunduar' }} ({{ completedVaccines().length }})
            </h3>
            <div class="space-y-3">
              @for (v of completedVaccines(); track v.id) {
                <ng-container *ngTemplateOutlet="vaccineCard; context: {v: v}"></ng-container>
              }
            </div>
          </div>
        }
      }

    </div>

    <!-- Vaccine Card Template -->
    <ng-template #vaccineCard let-v="v">
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer"
        (click)="toggleExpand(v.id)">
        <div class="p-4 flex items-start gap-4">
          <!-- Icon -->
          <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            [ngClass]="getStatusBgClass(v.status)">
            <span class="material-icons text-xl" [ngClass]="getStatusTextClass(v.status)">{{ getStatusIcon(v.status) }}</span>
          </div>

          <!-- Main Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2 mb-1">
              <p class="font-bold text-gray-800 text-sm leading-tight">{{ v.vaccineName }}</p>
              <span class="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                [ngClass]="getBadgeClass(v.status)">
                {{ v.doseNumber }}/{{ v.totalDoses }}
              </span>
            </div>
            <div class="flex items-center gap-3 text-xs text-gray-500">
              <span>{{ formatDate(v.dueDate) }}</span>
              <span class="px-1.5 py-0.5 rounded-full text-xs font-bold"
                [ngClass]="getStatusBadgeClass(v.status)">
                {{ getStatusLabel(v.status) }}
              </span>
            </div>
          </div>

          <!-- Expand Icon -->
          <span class="material-icons text-gray-400 text-lg flex-shrink-0 transition-transform"
            [ngClass]="expandedId() === v.id ? 'rotate-180' : ''">expand_more</span>
        </div>

        <!-- Expanded Details -->
        @if (expandedId() === v.id) {
          <div class="px-4 pb-4 border-t border-gray-100 pt-3 space-y-2">
            @if (v.batchNumber) {
              <div class="flex justify-between text-xs">
                <span class="text-gray-500 font-medium">{{ t()['vaccines.batchNumber'] || 'Batch' }}:</span>
                <span class="text-gray-700 font-semibold">{{ v.batchNumber }}</span>
              </div>
            }
            @if (v.site) {
              <div class="flex justify-between text-xs">
                <span class="text-gray-500 font-medium">{{ t()['vaccines.injectionSite'] || 'Vendi' }}:</span>
                <span class="text-gray-700 font-semibold">{{ v.site === 'thigh' ? (t()['vaccines.site.thigh'] || 'Kofshë') : (t()['vaccines.site.arm'] || 'Krah') }}</span>
              </div>
            }
            @if (v.administeredBy) {
              <div class="flex justify-between text-xs">
                <span class="text-gray-500 font-medium">{{ t()['vaccines.doctor'] || 'Mjeku' }}:</span>
                <span class="text-gray-700 font-semibold">{{ v.administeredBy }}</span>
              </div>
            }
            @if (v.completedAt) {
              <div class="flex justify-between text-xs">
                <span class="text-gray-500 font-medium">{{ t()['vaccines.dateGiven'] || 'Data' }}:</span>
                <span class="text-gray-700 font-semibold">{{ formatDate(v.completedAt) }}</span>
              </div>
            }
            @if (v.notes) {
              <div class="text-xs text-gray-600 bg-gray-50 rounded-xl p-2.5 mt-1">
                {{ v.notes }}
              </div>
            }
            @if (v.status !== 'completed') {
              <button (click)="markComplete(v, $event)"
                class="w-full mt-2 bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold py-2.5 rounded-xl transition-all">
                {{ t()['vaccines.markComplete'] || 'Shëno si e bërë' }}
              </button>
            }
          </div>
        }
      </div>
    </ng-template>

    <!-- Add Vaccine Modal -->
    @if (showAddModal()) {
      <div class="fixed inset-0 z-50 flex items-end justify-center sm:items-center" (click)="closeModalOnBackdrop($event)">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

        <!-- Modal Panel -->
        <div class="relative bg-white rounded-3xl w-full max-w-lg mx-4 mb-0 sm:mb-0 max-h-[90vh] overflow-y-auto animate-slide-up">

          <!-- Header -->
          <div class="sticky top-0 bg-white px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between rounded-t-3xl">
            <h2 class="text-xl font-extrabold text-gray-800">{{ t()['vaccines.addRecord'] || 'Shto Vaksina' }}</h2>
            <button (click)="showAddModal.set(false)" class="text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-xl transition-all">
              <span class="material-icons">close</span>
            </button>
          </div>

          <!-- Form -->
          <div class="px-6 py-5 space-y-5">
            <!-- Vaccine Name -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                {{ t()['vaccines.vaccineName'] || 'Emri i Vaksines' }} *
              </label>
              <input [(ngModel)]="formVaccineName" type="text"
                list="vaccine-suggestions"
                class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-gray-700"
                placeholder="P.sh. DTaP-2, MMR-1...">
              <datalist id="vaccine-suggestions">
                @for (name of standardVaccines; track name) {
                  <option [value]="name">{{ name }}</option>
                }
              </datalist>
            </div>

            <!-- Dose Number & Total -->
            <div class="flex gap-4">
              <div class="flex-1">
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                  {{ t()['vaccines.doseNumber'] || 'Doza nr.' }} *
                </label>
                <input [(ngModel)]="formDoseNumber" type="number" min="1" max="10"
                  class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-gray-700">
              </div>
              <div class="flex-1">
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                  {{ t()['vaccines.totalDoses'] || 'Nga gjithsej' }} *
                </label>
                <input [(ngModel)]="formTotalDoses" type="number" min="1" max="10"
                  class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-gray-700">
              </div>
            </div>

            <!-- Due Date -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                {{ t()['vaccines.dateGiven'] || 'Data e vendosjes' }} *
              </label>
              <input [(ngModel)]="formDueDate" type="date"
                class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-gray-600 font-semibold">
            </div>

            <!-- Batch Number -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                {{ t()['vaccines.batchNumber'] || 'Numri i batch-it' }}
              </label>
              <input [(ngModel)]="formBatchNumber" type="text"
                class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-gray-700"
                placeholder="P.sh. AB1234">
            </div>

            <!-- Injection Site -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                {{ t()['vaccines.injectionSite'] || 'Vendi i injeksionit' }}
              </label>
              <select [(ngModel)]="formSite"
                class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-gray-700 bg-white">
                <option value="">--</option>
                <option value="arm">{{ t()['vaccines.site.arm'] || 'Krah' }}</option>
                <option value="thigh">{{ t()['vaccines.site.thigh'] || 'Kofshë' }}</option>
              </select>
            </div>

            <!-- Doctor -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                {{ t()['vaccines.doctor'] || 'Mjeku/Dhoma' }}
              </label>
              <input [(ngModel)]="formDoctor" type="text"
                class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-gray-700"
                placeholder="P.sh. Dr. Gashi">
            </div>

            <!-- Notes -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                {{ t()['vaccines.notes'] || 'Shënime' }}
              </label>
              <textarea [(ngModel)]="formNotes" rows="3"
                class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-gray-700 resize-none"
                placeholder="Shënime shtesë..."></textarea>
            </div>
          </div>

          <!-- Actions -->
          <div class="px-6 pb-6 pt-2 flex gap-3">
            <button (click)="showAddModal.set(false)"
              class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3.5 rounded-2xl transition-all">
              {{ t()['vaccines.cancel'] || 'Anulo' }}
            </button>
            <button (click)="saveVaccine()"
              class="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-2xl transition-all shadow-sm">
              {{ t()['vaccines.save'] || 'Ruaj' }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class VaccinesComponent implements OnInit {
  private dataService = inject(DataService);
  private i18n = inject(I18nService);
  private router = inject(Router);

  standardVaccines = STANDARD_VACCINES;

  // Signals
  loading = signal(true);
  vaccines = signal<VaccineRecord[]>([]);
  showAddModal = signal(false);
  expandedId = signal<string | null>(null);
  saving = signal(false);

  // Form fields
  formVaccineName = '';
  formDoseNumber = 1;
  formTotalDoses = 1;
  formDueDate = '';
  formBatchNumber = '';
  formSite = '';
  formDoctor = '';
  formNotes = '';

  t = computed(() => this.i18n.t());

  childVaccines = computed(() => {
    const childId = this.dataService.activeChildId();
    if (!childId) return [];
    return this.vaccines().filter(v => v.childId === childId);
  });

  overdueVaccines = computed(() => this.childVaccines().filter(v => v.status === 'overdue'));
  dueVaccines = computed(() => this.childVaccines().filter(v => v.status === 'due'));
  upcomingVaccines = computed(() => this.childVaccines().filter(v => v.status === 'upcoming'));
  completedVaccines = computed(() => this.childVaccines().filter(v => v.status === 'completed'));
  overdueCount = computed(() => this.overdueVaccines().length);

  ngOnInit() {
    this.loadVaccines();
  }

  async loadVaccines() {
    this.loading.set(true);
    const childId = this.dataService.activeChildId();
    if (!childId) {
      this.loading.set(false);
      return;
    }

    try {
      const res = await fetch(`${this.dataService.API_URL}/vaccines/child/${childId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(this.dataService.AUTH_KEY)}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        const records: VaccineRecord[] = (data.vaccines || []).map((v: any) => this.mapToRecord(v));
        this.vaccines.set(records);
      } else {
        // Fallback: use sample data for demo
        this.loadSampleData(childId);
      }
    } catch {
      // Fallback: use sample data
      const cid = this.dataService.activeChildId();
      if (cid) this.loadSampleData(cid);
    }
    this.loading.set(false);
  }

  private loadSampleData(childId: string) {
    const now = new Date();
    const sample: VaccineRecord[] = [
      {
        id: 'v1', childId, vaccineName: 'DTaP-1', doseNumber: 1, totalDoses: 5,
        dueDate: this.dateStr(new Date(now.getTime() - 10 * 86400000)),
        completedAt: this.dateStr(new Date(now.getTime() - 10 * 86400000)),
        administeredBy: 'Dr. Gashi', batchNumber: 'AB1234', site: 'thigh', status: 'completed'
      },
      {
        id: 'v2', childId, vaccineName: 'MMR-1', doseNumber: 1, totalDoses: 2,
        dueDate: this.dateStr(new Date(now.getTime() + 7 * 86400000)),
        status: 'upcoming'
      },
      {
        id: 'v3', childId, vaccineName: 'DTaP-2', doseNumber: 2, totalDoses: 5,
        dueDate: this.dateStr(new Date(now.getTime() - 5 * 86400000)),
        status: 'overdue'
      },
      {
        id: 'v4', childId, vaccineName: 'Hib-1', doseNumber: 1, totalDoses: 4,
        dueDate: this.dateStr(new Date(now.getTime() + 30 * 86400000)),
        status: 'upcoming'
      },
    ];
    this.vaccines.set(sample);
  }

  private mapToRecord(v: any): VaccineRecord {
    const now = new Date();
    const due = new Date(v.dueDate);
    let status: 'overdue' | 'due' | 'upcoming' | 'completed' = 'upcoming';

    if (v.completedAt || v.status === 'completed') {
      status = 'completed';
    } else {
      const diffDays = Math.floor((due.getTime() - now.getTime()) / 86400000);
      if (diffDays < 0) status = 'overdue';
      else if (diffDays <= 7) status = 'due';
      else status = 'upcoming';
    }

    return {
      id: v.id,
      childId: v.childId,
      vaccineName: v.vaccineName,
      manufacturer: v.manufacturer,
      doseNumber: v.doseNumber,
      totalDoses: v.totalDoses,
      dueDate: v.dueDate,
      completedAt: v.completedAt,
      administeredBy: v.administeredBy,
      batchNumber: v.batchNumber,
      site: v.site,
      notes: v.notes,
      status
    };
  }

  private dateStr(d: Date): string {
    return d.toISOString().split('T')[0];
  }

  toggleExpand(id: string) {
    this.expandedId.set(this.expandedId() === id ? null : id);
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}/${d.getFullYear()}`;
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'overdue': return 'warning';
      case 'due': return 'schedule';
      case 'upcoming': return 'event';
      case 'completed': return 'task_alt';
      default: return 'vaccines';
    }
  }

  getStatusBgClass(status: string): string {
    switch (status) {
      case 'overdue': return 'bg-rose-100';
      case 'due': return 'bg-orange-100';
      case 'upcoming': return 'bg-teal-100';
      case 'completed': return 'bg-gray-100';
      default: return 'bg-gray-100';
    }
  }

  getStatusTextClass(status: string): string {
    switch (status) {
      case 'overdue': return 'text-rose-500';
      case 'due': return 'text-orange-500';
      case 'upcoming': return 'text-teal-500';
      case 'completed': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  }

  getBadgeClass(status: string): string {
    switch (status) {
      case 'overdue': return 'bg-rose-100 text-rose-700';
      case 'due': return 'bg-orange-100 text-orange-700';
      case 'upcoming': return 'bg-teal-100 text-teal-700';
      case 'completed': return 'bg-gray-100 text-gray-500';
      default: return 'bg-gray-100 text-gray-500';
    }
  }

  getStatusBadgeClass(status: string): string {
    return this.getBadgeClass(status);
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      overdue: this.t()['vaccines.status.overdue'] || 'Vonuar',
      due: this.t()['vaccines.status.due'] || 'Për shkak',
      upcoming: this.t()['vaccines.status.upcoming'] || 'Së shpejti',
      completed: this.t()['vaccines.status.completed'] || 'Përfunduar',
    };
    return labels[status] || status;
  }

  closeModalOnBackdrop(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('fixed')) {
      this.showAddModal.set(false);
    }
  }

  async saveVaccine() {
    if (!this.formVaccineName.trim()) return;
    if (!this.formDueDate) return;

    const childId = this.dataService.activeChildId();
    if (!childId) return;

    this.saving.set(true);
    try {
      const payload = {
        childId,
        vaccineName: this.formVaccineName.trim(),
        doseNumber: this.formDoseNumber || 1,
        totalDoses: this.formTotalDoses || 1,
        dueDate: this.formDueDate,
        batchNumber: this.formBatchNumber || undefined,
        site: this.formSite || undefined,
        administeredBy: this.formDoctor || undefined,
        notes: this.formNotes || undefined,
      };

      const res = await fetch(`${this.dataService.API_URL}/vaccines`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(this.dataService.AUTH_KEY)}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        this.showAddModal.set(false);
        this.resetForm();
        await this.loadVaccines();
      }
    } catch (err) {
      console.error('[Vaccines] save failed:', err);
    }
    this.saving.set(false);
  }

  async markComplete(vaccine: VaccineRecord, event: MouseEvent) {
    event.stopPropagation();
    try {
      const res = await fetch(`${this.dataService.API_URL}/vaccines/${vaccine.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(this.dataService.AUTH_KEY)}`
        },
        body: JSON.stringify({ status: 'completed', completedAt: new Date().toISOString() })
      });
      if (res.ok) {
        // Update locally
        const updated = this.vaccines().map(v =>
          v.id === vaccine.id
            ? { ...v, status: 'completed' as const, completedAt: new Date().toISOString() }
            : v
        );
        this.vaccines.set(updated);
        this.expandedId.set(null);
      }
    } catch (err) {
      console.error('[Vaccines] mark complete failed:', err);
    }
  }

  private resetForm() {
    this.formVaccineName = '';
    this.formDoseNumber = 1;
    this.formTotalDoses = 1;
    this.formDueDate = '';
    this.formBatchNumber = '';
    this.formSite = '';
    this.formDoctor = '';
    this.formNotes = '';
  }
}