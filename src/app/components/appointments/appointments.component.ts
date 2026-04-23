import { Component, inject, signal, computed, OnInit, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { I18nService } from '../../core/i18n/i18n.service';

@Pipe({ name: 'replace', standalone: true })
export class ReplacePipe implements PipeTransform {
  transform(value: string, search: string, replacement: string | number): string {
    return value.replace(new RegExp(search, 'g'), String(replacement));
  }
}

export interface AppointmentRecord {
  id: string;
  childId: string;
  title: string;
  doctorName?: string;
  location?: string;
  dateTime: string;
  notes?: string;
  createdAt: string;
}

@Component({
  selector: 'app-appointments',
  imports: [CommonModule, FormsModule, LucideAngularModule, ReplacePipe],
  template: `
    <div class="min-h-screen bg-gray-50 pb-24">

      <!-- Header -->
      <div class="bg-white border-b border-gray-100 px-4 pt-6 pb-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-extrabold text-gray-800">{{ i18n.t()['appointments.title'] }}</h1>
            @if (activeChild()) {
              <p class="text-slate-400 text-sm mt-1 font-medium">{{ activeChild()?.name }}</p>
            }
          </div>
          <button (click)="openAddModal()"
            class="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-2xl font-bold shadow-sm transition-all flex items-center gap-2 text-sm">
            <lucide-icon name="plus" class="text-inherit"></lucide-icon>
            {{ i18n.t()['appointments.add'] }}
          </button>
        </div>
      </div>

      <!-- Overdue Banner -->
      @if (overdueCount() > 0) {
        <div class="px-4 mt-4">
          <div class="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
            <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <lucide-icon name="alert-circle" class="text-red-500 w-5 h-5"></lucide-icon>
            </div>
            <div class="flex-1">
              <p class="font-bold text-red-700 text-sm">
                {{ overdueCount() === 1
                  ? (i18n.t()['appointments.overdueCount'] | replace:'{n}':overdueCount()!)
                  : (i18n.t()['appointments.overdueCountPlural'] | replace:'{n}':overdueCount()!) }}
              </p>
            </div>
          </div>
        </div>
      }

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

      <!-- Empty State (no appointments at all) -->
      @if (!loading() && appointments().length === 0) {
        <div class="flex flex-col items-center justify-center mt-20 px-4">
          <svg width="160" height="160" viewBox="0 0 160 160" fill="none" class="mb-6">
            <circle cx="80" cy="80" r="60" fill="#F0FDF4"/>
            <rect x="60" y="50" width="40" height="36" rx="4" stroke="#10B981" stroke-width="3" fill="none"/>
            <line x1="60" y1="62" x2="100" y2="62" stroke="#10B981" stroke-width="3"/>
            <line x1="60" y1="74" x2="100" y2="74" stroke="#10B981" stroke-width="3"/>
            <line x1="60" y1="86" x2="80" y2="86" stroke="#10B981" stroke-width="3"/>
            <path d="M80 95 L80 105 M75 100 L85 100" stroke="#10B981" stroke-width="3" stroke-linecap="round"/>
          </svg>
          <h3 class="text-xl font-extrabold text-gray-700 mb-2">{{ i18n.t()['appointments.empty'] }}</h3>
          <p class="text-slate-400 text-center mb-6 text-sm">{{ i18n.t()['appointments.emptyHint'] }}</p>
          <button (click)="openAddModal()"
            class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-sm transition-all text-sm">
            <lucide-icon name="plus" class="text-inherit inline w-4 h-4 mr-1"></lucide-icon>
            {{ i18n.t()['appointments.addFirst'] }}
          </button>
        </div>
      }

      <!-- Appointment Sections -->
      @if (!loading() && appointments().length > 0) {

        <!-- OVERDUE Section -->
        @if (overdueCount() > 0) {
          <div class="px-4 mt-4">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {{ i18n.t()['appointments.section.overdue'] }}
              </span>
              <span class="bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full">{{ overdueCount() }}</span>
            </div>
            <div class="space-y-3">
              @for (appt of overdueAppts(); track appt.id) {
                <ng-container *ngTemplateOutlet="apptCard; context: { appt: appt, section: 'overdue' }"></ng-container>
              }
            </div>
          </div>
        }

        <!-- TODAY Section -->
        @if (todayCount() > 0) {
          <div class="px-4 mt-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {{ i18n.t()['appointments.section.today'] }}
              </span>
              <span class="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full">{{ todayCount() }}</span>
            </div>
            <div class="space-y-3">
              @for (appt of todayApptsFuture(); track appt.id) {
                <ng-container *ngTemplateOutlet="apptCard; context: { appt: appt, section: getSection(appt) }"></ng-container>
              }
            </div>
          </div>
        }

        <!-- PAST Section -->
        @if (pastTodayAppts().length > 0) {
          <div class="px-4 mt-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {{ i18n.t()['appointments.section.past'] }}
              </span>
              <span class="bg-slate-100 text-slate-500 text-xs font-semibold px-2 py-0.5 rounded-full">{{ pastTodayAppts().length }}</span>
            </div>
            <div class="space-y-3">
              @for (appt of pastTodayAppts(); track appt.id) {
                <ng-container *ngTemplateOutlet="apptCard; context: { appt: appt, section: 'past-today' }"></ng-container>
              }
            </div>
          </div>
        }

        <!-- UPCOMING Section -->
        @if (upcomingCount() > 0) {
          <div class="px-4 mt-6 mb-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {{ i18n.t()['appointments.section.upcoming'] }}
              </span>
              <span class="bg-teal-100 text-teal-700 text-xs font-semibold px-2 py-0.5 rounded-full">{{ upcomingCount() }}</span>
            </div>
            <div class="space-y-3">
              @for (appt of upcomingAppts(); track appt.id) {
                <ng-container *ngTemplateOutlet="apptCard; context: { appt: appt, section: getSection(appt) }"></ng-container>
              }
            </div>
          </div>
        }

      }
    </div>

    <!-- Appointment Card Template -->
    <ng-template #apptCard let-appt="appt" let-section="section">
      <div class="bg-white rounded-2xl shadow-sm overflow-hidden"
           [class.border-l-4]="true"
           [class.border-red-400]="section === 'overdue'"
           [class.border-amber-400]="section === 'today'"
           [class.border-teal-400]="section === 'upcoming'"
           [class.bg-red-50/30]="section === 'overdue'"
           [class.bg-amber-50/30]="section === 'today'"
           [class.bg-teal-50/30]="section === 'upcoming'"
           [class.border-slate-300]="section === 'past-today'"
           [class.bg-slate-50]="section === 'past-today'"
           [class.border]="section === 'today' || section === 'overdue' || section === 'past-today'"
           [class.border-red-200]="section === 'overdue'"
           [class.border-amber-200]="section === 'today'"
           [class.border-teal-200]="section === 'upcoming'">

        <div class="p-5">
          <div class="flex items-start gap-4">
            <!-- Icon -->
            <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                 [class.bg-red-100]="section === 'overdue'"
                 [class.bg-amber-100]="section === 'today'"
                 [class.bg-teal-100]="section === 'upcoming'"
                 [class.bg-slate-100]="section === 'past-today'">
              <lucide-icon name="calendar"
                [class.text-red-500]="section === 'overdue'"
                [class.text-amber-500]="section === 'today'"
                [class.text-teal-500]="section === 'upcoming'"
                [class.text-slate-400]="section === 'past-today'"
                class="w-5 h-5"></lucide-icon>
            </div>

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2">
                <h3 class="font-bold text-gray-800 text-base truncate" [title]="appt.title">{{ appt.title }}</h3>
                @if (section === 'overdue') {
                  <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-100 text-red-700 flex-shrink-0">
                    {{ i18n.t()['appointments.overdue'] }}
                  </span>
                } @else if (section === 'today') {
                  <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 flex-shrink-0">
                    {{ i18n.t()['appointments.today'] }}
                  </span>
                } @else if (section === 'upcoming') {
                  <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-100 text-teal-700 flex-shrink-0">
                    {{ i18n.t()['appointments.upcoming'] }}
                  </span>
                }
              </div>

              <!-- Date & Time -->
              <div class="flex items-center gap-2 mt-1.5 text-sm text-slate-500">
                <lucide-icon name="clock" class="w-3.5 h-3.5 text-slate-400 flex-shrink-0"></lucide-icon>
                <span>{{ formatDateTime(appt.dateTime) }}</span>
              </div>

              <!-- Doctor -->
              @if (appt.doctorName) {
                <div class="flex items-center gap-2 mt-1 text-xs text-slate-400">
                  <lucide-icon name="stethoscope" class="w-3.5 h-3.5 flex-shrink-0"></lucide-icon>
                  <span>{{ appt.doctorName }}</span>
                </div>
              }

              <!-- Location -->
              @if (appt.location) {
                <div class="flex items-center gap-2 mt-1 text-xs text-slate-400">
                  <lucide-icon name="map-pin" class="w-3.5 h-3.5 flex-shrink-0"></lucide-icon>
                  <span>{{ appt.location }}</span>
                </div>
              }
            </div>
          </div>

          <!-- Notes -->
          @if (appt.notes) {
            <div class="mt-3 text-xs text-slate-500 bg-slate-50 rounded-xl p-3">
              {{ appt.notes }}
            </div>
          }

          <!-- Actions -->
          <div class="flex items-center gap-2 mt-4">
            <button (click)="openEditModal(appt)"
              class="flex-1 py-2 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-600 transition-all flex items-center justify-center gap-1.5">
              <lucide-icon name="pencil" class="w-3.5 h-3.5"></lucide-icon>
              {{ i18n.t()['appointments.edit'] }}
            </button>
            <button (click)="confirmDelete(appt)"
              class="flex-1 py-2 rounded-xl text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 transition-all flex items-center justify-center gap-1.5">
              <lucide-icon name="trash-2" class="w-3.5 h-3.5"></lucide-icon>
              {{ i18n.t()['appointments.delete'] }}
            </button>
          </div>
        </div>
      </div>
    </ng-template>

    <!-- Add/Edit Modal -->
    @if (showModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
           (click)="closeModal()">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
             (click)="$event.stopPropagation()">

          <!-- Modal Header -->
          <div class="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
            <h2 class="text-xl font-extrabold text-gray-800">
              {{ editingAppt() ? i18n.t()['appointments.editAppt'] : i18n.t()['appointments.addAppt'] }}
            </h2>
            <button (click)="closeModal()" class="p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <lucide-icon name="x" class="w-5 h-5 text-slate-400"></lucide-icon>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6 space-y-5">
            <!-- Title -->
            <div>
              <label class="block text-xs font-bold text-indigo-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['appointments.titleLabel'] }}
                <span class="text-red-400 normal-case font-normal text-xs ml-1">*</span>
              </label>
              <input type="text" [(ngModel)]="formTitle"
                class="w-full px-4 py-3 rounded-2xl border-2 transition-all text-gray-800 text-sm font-medium"
                [class.border-red-300]="formTitle().trim() === '' && showValidation()"
                [class.border-slate-200]="!(formTitle().trim() === '' && showValidation())"
                [class.bg-white]="!(formTitle().trim() === '' && showValidation())"
                [class.bg-red-50]="formTitle().trim() === '' && showValidation()"
                [placeholder]="i18n.t()['appointments.titlePlaceholder']"
                (blur)="showValidation.set(true)">
            </div>

            <!-- Date & Time -->
            <div>
              <label class="block text-xs font-bold text-indigo-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['appointments.dateTime'] }}
                <span class="text-red-400 normal-case font-normal text-xs ml-1">*</span>
              </label>
              <input type="datetime-local" [(ngModel)]="formDateTime"
                class="w-full px-4 py-3 rounded-2xl border-2 transition-all text-gray-800 text-sm"
                [class.border-red-300]="formDateTime() === '' && showValidation()"
                [class.border-slate-200]="!(formDateTime() === '' && showValidation())"
                [class.bg-white]="!(formDateTime() === '' && showValidation())"
                [class.bg-red-50]="formDateTime() === '' && showValidation()">
            </div>

            <!-- Doctor -->
            <div>
              <label class="block text-xs font-bold text-indigo-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['appointments.doctor'] }}
                <span class="text-slate-400 normal-case font-normal text-xs ml-1">({{ i18n.t()['appointments.optional'] }})</span>
              </label>
              <input type="text" [(ngModel)]="formDoctorName"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-gray-800 text-sm font-medium"
                [placeholder]="i18n.t()['appointments.doctorPlaceholder']">
            </div>

            <!-- Location -->
            <div>
              <label class="block text-xs font-bold text-indigo-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['appointments.location'] }}
                <span class="text-slate-400 normal-case font-normal text-xs ml-1">({{ i18n.t()['appointments.optional'] }})</span>
              </label>
              <input type="text" [(ngModel)]="formLocation"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-gray-800 text-sm font-medium"
                [placeholder]="i18n.t()['appointments.locationPlaceholder']">
            </div>

            <!-- Notes -->
            <div>
              <label class="block text-xs font-bold text-indigo-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['appointments.notes'] }}
                <span class="text-slate-400 normal-case font-normal text-xs ml-1">({{ i18n.t()['appointments.optional'] }})</span>
              </label>
              <textarea [(ngModel)]="formNotes" rows="2"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-gray-800 text-sm resize-none"
                [placeholder]="i18n.t()['appointments.notesPlaceholder']"></textarea>
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
              {{ i18n.t()['appointments.cancel'] }}
            </button>
            <button (click)="saveAppointment()"
              [disabled]="saving() || !canSave()"
              class="flex-1 py-3.5 rounded-2xl font-bold text-white bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm flex items-center justify-center gap-2">
              @if (saving()) {
                <lucide-icon name="loader-2" class="w-4 h-4 animate-spin"></lucide-icon>
                {{ i18n.t()['appointments.saving'] }}
              } @else {
                <lucide-icon name="check" class="w-4 h-4"></lucide-icon>
                {{ i18n.t()['appointments.save'] }}
              }
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
            {{ i18n.t()['appointments.deleteConfirmTitle'] }}
          </h3>
          <p class="text-slate-500 text-sm text-center mb-6 font-medium">"{{ deletingAppt()?.title }}"</p>
          <div class="flex gap-3">
            <button (click)="showDeleteModal.set(false)"
              class="flex-1 py-3 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all text-sm">
              {{ i18n.t()['appointments.cancel'] }}
            </button>
            <button (click)="deleteAppointment()"
              class="flex-1 py-3 rounded-2xl font-bold text-white bg-red-500 hover:bg-red-600 transition-all text-sm">
              {{ i18n.t()['appointments.delete'] }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: []
})
export class AppointmentsComponent implements OnInit, OnDestroy {
  i18n = inject(I18nService);
  data = inject(DataService);

  // State
  loading = signal(false);
  saving = signal(false);
  showModal = signal(false);
  showDeleteModal = signal(false);
  showValidation = signal(false);
  editingAppt = signal<AppointmentRecord | null>(null);
  deletingAppt = signal<AppointmentRecord | null>(null);
  saveError = signal<string | null>(null);

  // Form fields
  formTitle = signal('');
  formDateTime = signal('');
  formDoctorName = signal('');
  formLocation = signal('');
  formNotes = signal('');

  // Computed
  activeChild = computed(() => {
    const id = this.data.activeChildId();
    return this.data.children().find(c => c.id === id) ?? null;
  });

  appointments = signal<AppointmentRecord[]>([]);

  // Section helpers
  isOverdue(appt: AppointmentRecord): boolean {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const apptDate = new Date(appt.dateTime);
    return apptDate < today;
  }

  isToday(appt: AppointmentRecord): boolean {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const apptDate = new Date(appt.dateTime);
    return apptDate >= todayStart && apptDate < now;
  }

  isPastToday(appt: AppointmentRecord): boolean {
    return this.isToday(appt) && new Date(appt.dateTime) < new Date();
  }

  getSection(appt: AppointmentRecord): string {
    if (this.isOverdue(appt)) return 'overdue';
    if (this.isPastToday(appt)) return 'past-today';
    if (this.isToday(appt)) return 'today';
    return 'upcoming';
  }

  overdueCount = computed(() => this.appointments().filter(a => this.isOverdue(a)).length);
  todayCount = computed(() => this.appointments().filter(a => this.isToday(a)).length);

  upcomingCount = computed(() => {
    const now = new Date();
    return this.appointments().filter(a => !this.isOverdue(a) && !this.isToday(a) && new Date(a.dateTime) >= now).length;
  });

  overdueAppts = computed(() =>
    this.appointments()
      .filter(a => this.isOverdue(a))
      .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
  );

  pastTodayAppts = computed(() =>
    this.appointments()
      .filter(a => this.isPastToday(a))
      .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
  );

  todayApptsFuture = computed(() =>
    this.appointments()
      .filter(a => this.isToday(a) && !this.isPastToday(a))
      .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
  );

  upcomingAppts = computed(() =>
    this.appointments()
      .filter(a => !this.isOverdue(a) && !this.isToday(a))
      .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
  );

  canSave = computed(() =>
    !!(this.formTitle().trim() && this.formDateTime())
  );

  ngOnInit() {
    this.loadAppointments();
  }

  ngOnDestroy() {
    // no cleanup needed
  }

  async loadAppointments() {
    const childId = this.data.activeChildId();
    if (!childId) return;

    this.loading.set(true);
    try {
      const token = localStorage.getItem(this.data.AUTH_KEY);
      const response = await fetch(`${this.data.API_URL}/appointments/child/${childId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        this.appointments.set(Array.isArray(data) ? data : []);
      }
    } catch {
      // silent fail
    } finally {
      this.loading.set(false);
    }
  }

  openAddModal() {
    this.editingAppt.set(null);
    this.formTitle.set('');
    this.formDateTime.set('');
    this.formDoctorName.set('');
    this.formLocation.set('');
    this.formNotes.set('');
    this.saveError.set(null);
    this.showValidation.set(false);
    this.showModal.set(true);
  }

  openEditModal(appt: AppointmentRecord) {
    this.editingAppt.set(appt);
    this.formTitle.set(appt.title);
    const dt = new Date(appt.dateTime);
    const pad = (n: number) => n.toString().padStart(2, '0');
    this.formDateTime.set(`${dt.getFullYear()}-${pad(dt.getMonth()+1)}-${pad(dt.getDate())}T${pad(dt.getHours())}:${pad(dt.getMinutes())}`);
    this.formDoctorName.set(appt.doctorName || '');
    this.formLocation.set(appt.location || '');
    this.formNotes.set(appt.notes || '');
    this.saveError.set(null);
    this.showValidation.set(false);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.editingAppt.set(null);
    this.showValidation.set(false);
  }

  async saveAppointment() {
    this.showValidation.set(true);
    if (!this.canSave()) return;

    const childId = this.data.activeChildId();
    if (!childId) return;

    this.saving.set(true);
    this.saveError.set(null);

    const payload: any = {
      title: this.formTitle().trim(),
      dateTime: new Date(this.formDateTime()).toISOString(),
      doctorName: this.formDoctorName().trim() || undefined,
      location: this.formLocation().trim() || undefined,
      notes: this.formNotes().trim() || undefined,
    };

    try {
      const token = localStorage.getItem(this.data.AUTH_KEY);
      const editing = this.editingAppt();
      const url = editing
        ? `${this.data.API_URL}/appointments/${editing.id}`
        : `${this.data.API_URL}/appointments/${childId}`;
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
      const list = [...this.appointments()];

      if (editing) {
        const idx = list.findIndex(a => a.id === saved.id);
        if (idx >= 0) list[idx] = { ...list[idx], ...saved };
      } else {
        list.unshift(saved as AppointmentRecord);
      }

      list.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
      this.appointments.set(list);
      this.closeModal();
    } catch (err: any) {
      this.saveError.set(err.message || this.i18n.t()['appointments.saveError']);
    } finally {
      this.saving.set(false);
    }
  }

  confirmDelete(appt: AppointmentRecord) {
    this.deletingAppt.set(appt);
    this.showDeleteModal.set(true);
  }

  async deleteAppointment() {
    const appt = this.deletingAppt();
    if (!appt) return;

    try {
      const token = localStorage.getItem(this.data.AUTH_KEY);
      const response = await fetch(`${this.data.API_URL}/appointments/${appt.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        this.appointments.set(this.appointments().filter(a => a.id !== appt.id));
      }
    } catch {
      // silent
    } finally {
      this.showDeleteModal.set(false);
      this.deletingAppt.set(null);
    }
  }

  formatDateTime(dateTimeStr: string): string {
    if (!dateTimeStr) return '';
    const d = new Date(dateTimeStr);
    const locale = this.i18n.isSq() ? 'sq-AL' : 'en-GB';
    const dateStr = d.toLocaleDateString(locale, { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
    return `${dateStr} ${timeStr}`;
  }
}