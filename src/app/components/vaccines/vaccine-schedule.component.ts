import { Component, Input, Output, EventEmitter, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { VACCINE_SCHEDULE, ScheduleEntry } from './vaccine-schedule.constant';

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

export interface VaccineAlert {
  id: string;
  vaccineName: string;
  doseLabel: string;
  dueDate: string;
  status: 'overdue' | 'due' | 'upcoming';
  daysOverdue?: number;
}

type TimelineStatus = 'completed' | 'due' | 'upcoming' | 'overdue' | 'not_started';

interface TimelineEntry {
  scheduleEntry: ScheduleEntry;
  doseIndex: number;        // 1-based dose number within the series
  record?: VaccineRecord;   // matched child record, if any
  status: TimelineStatus;
  diffDays: number;         // days until due (negative = overdue)
}

@Component({
  selector: 'app-vaccine-schedule',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

      <!-- Header -->
      <div class="px-5 pt-5 pb-4 border-b border-gray-100 flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
          <span class="material-icons text-indigo-500 text-lg">vaccines</span>
        </div>
        <div>
          <h2 class="text-lg font-extrabold text-gray-800">{{ t()['vaccines.schedule.title'] }}</h2>
        </div>
      </div>

      <!-- Legend -->
      <div class="px-5 py-3 flex items-center gap-4 text-xs text-gray-500 border-b border-gray-50">
        <span class="flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span>
          {{ t()['vaccines.schedule.completed'] }}
        </span>
        <span class="flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full border-2 border-teal-500 inline-block"></span>
          {{ t()['vaccines.schedule.upcoming'] }}
        </span>
        <span class="flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block pulse-overdue"></span>
          {{ t()['vaccines.schedule.overdue'] }}
        </span>
        <span class="flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full border border-dashed border-gray-400 inline-block"></span>
          {{ t()['vaccines.schedule.notStarted'] }}
        </span>
      </div>

      <!-- Timeline Scroll Area -->
      <div class="max-h-[480px] overflow-y-auto">
        @if (timelineEntries().length === 0) {
          <div class="flex flex-col items-center justify-center py-12 text-gray-400">
            <span class="material-icons text-4xl mb-2">event_busy</span>
            <p class="text-sm">{{ t()['vaccines.emptyState'] || 'Akzni s\'ka vaksina' }}</p>
          </div>
        }

        <!-- Overdue Section -->
        @if (overdueEntries().length > 0) {
          <div class="px-5 py-3">
            <h3 class="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-orange-500 pulse-overdue inline-block"></span>
              {{ t()['vaccines.schedule.overdue'] }} ({{ overdueEntries().length }})
            </h3>
            <div class="space-y-2">
              @for (entry of overdueEntries(); track entry.scheduleEntry.code + entry.doseIndex) {
                <ng-container *ngTemplateOutlet="timelineRow; context: { entry: entry }"></ng-container>
              }
            </div>
          </div>
        }

        <!-- Due Soon Section -->
        @if (dueEntries().length > 0) {
          <div class="px-5 py-3">
            <h3 class="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">
              {{ t()['vaccines.schedule.dueSoon'] || 'Due soon' }} ({{ dueEntries().length }})
            </h3>
            <div class="space-y-2">
              @for (entry of dueEntries(); track entry.scheduleEntry.code + entry.doseIndex) {
                <ng-container *ngTemplateOutlet="timelineRow; context: { entry: entry }"></ng-container>
              }
            </div>
          </div>
        }

        <!-- Upcoming Section -->
        @if (upcomingEntries().length > 0) {
          <div class="px-5 py-3">
            <h3 class="text-xs font-bold text-teal-600 uppercase tracking-widest mb-3">
              {{ t()['vaccines.schedule.upcoming'] }} ({{ upcomingEntries().length }})
            </h3>
            <div class="space-y-2">
              @for (entry of upcomingEntries(); track entry.scheduleEntry.code + entry.doseIndex) {
                <ng-container *ngTemplateOutlet="timelineRow; context: { entry: entry }"></ng-container>
              }
            </div>
          </div>
        }

        <!-- Completed Section -->
        @if (completedEntries().length > 0) {
          <div class="px-5 py-3">
            <h3 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
              {{ t()['vaccines.schedule.completed'] }} ({{ completedEntries().length }})
            </h3>
            <div class="space-y-2">
              @for (entry of completedEntries(); track entry.scheduleEntry.code + entry.doseIndex) {
                <ng-container *ngTemplateOutlet="timelineRow; context: { entry: entry }"></ng-container>
              }
            </div>
          </div>
        }

        <!-- Not Started Section -->
        @if (notStartedEntries().length > 0) {
          <div class="px-5 py-3">
            <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              {{ t()['vaccines.schedule.notStarted'] }} ({{ notStartedEntries().length }})
            </h3>
            <div class="space-y-2 opacity-60">
              @for (entry of notStartedEntries(); track entry.scheduleEntry.code + entry.doseIndex) {
                <ng-container *ngTemplateOutlet="timelineRow; context: { entry: entry }"></ng-container>
              }
            </div>
          </div>
        }
      </div>
    </div>

    <!-- Timeline Row Template -->
    <ng-template #timelineRow let-entry="entry">
      <div class="flex items-start gap-3 cursor-pointer group"
        (click)="toggleExpand(entry)"
        (longpress)="onLongPress(entry, $event)">

        <!-- Timeline Dot -->
        <div class="flex flex-col items-center flex-shrink-0 pt-1">
          <div [ngClass]="getDotClass(entry.status)"
            [ngStyle]="entry.status === 'overdue' ? {'animation': 'pulse-dot 1.5s ease-in-out infinite'} : {}">
          </div>
          <div class="w-0.5 h-6 bg-gray-200 mt-1"></div>
        </div>

        <!-- Content Card -->
        <div class="flex-1 bg-gray-50 hover:bg-gray-100 rounded-xl p-3 transition-all border border-transparent group-hover:border-gray-200">
          <div class="flex items-start justify-between gap-2 mb-1">
            <div class="flex-1 min-w-0">
              <p class="font-bold text-gray-800 text-sm leading-tight truncate">
                {{ isSq() ? entry.scheduleEntry.nameSq : entry.scheduleEntry.nameEn }}
              </p>
              <p class="text-xs text-gray-500">
                {{ t()['vaccines.doseNumber'] || 'Doza' }} {{ entry.doseIndex }}/{{ entry.scheduleEntry.doses }}
                <span class="ml-1 text-xs" [ngClass]="getStatusTextClass(entry.status)">
                  {{ getStatusLabel(entry.status) }}
                </span>
              </p>
            </div>
            <div class="flex flex-col items-end gap-1 flex-shrink-0">
              <span class="text-xs font-semibold text-gray-600">{{ formatDate(getDueDate(entry)) }}</span>
              <span [ngClass]="getBadgeClass(entry.status)"
                class="text-xs font-bold px-2 py-0.5 rounded-full">
                {{ entry.doseIndex }}/{{ entry.scheduleEntry.doses }}
              </span>
            </div>
          </div>

          <!-- Expanded Details -->
          @if (expandedEntry() && expandedEntry()!.scheduleEntry.code === entry.scheduleEntry.code && expandedEntry()!.doseIndex === entry.doseIndex) {
            <div class="mt-3 pt-3 border-t border-gray-200 space-y-1.5">
              @if (entry.record) {
                @if (entry.record.manufacturer) {
                  <div class="flex justify-between text-xs">
                    <span class="text-gray-500 font-medium">{{ t()['vaccines.manufacturer'] || 'Prodhuesi' }}:</span>
                    <span class="text-gray-700 font-semibold">{{ entry.record.manufacturer }}</span>
                  </div>
                }
                @if (entry.record.batchNumber) {
                  <div class="flex justify-between text-xs">
                    <span class="text-gray-500 font-medium">{{ t()['vaccines.batchNumber'] || 'Batch' }}:</span>
                    <span class="text-gray-700 font-semibold">{{ entry.record.batchNumber }}</span>
                  </div>
                }
                @if (entry.record.site) {
                  <div class="flex justify-between text-xs">
                    <span class="text-gray-500 font-medium">{{ t()['vaccines.injectionSite'] || 'Vendi' }}:</span>
                    <span class="text-gray-700 font-semibold">
                      {{ entry.record.site === 'thigh' ? (t()['vaccines.site.thigh'] || 'Kofshë') : (t()['vaccines.site.arm'] || 'Krah') }}
                    </span>
                  </div>
                }
                @if (entry.record.administeredBy) {
                  <div class="flex justify-between text-xs">
                    <span class="text-gray-500 font-medium">{{ t()['vaccines.doctor'] || 'Mjeku' }}:</span>
                    <span class="text-gray-700 font-semibold">{{ entry.record.administeredBy }}</span>
                  </div>
                }
                @if (entry.record.completedAt) {
                  <div class="flex justify-between text-xs">
                    <span class="text-gray-500 font-medium">{{ t()['vaccines.dateGiven'] || 'Data' }}:</span>
                    <span class="text-gray-700 font-semibold">{{ formatDate(entry.record.completedAt) }}</span>
                  </div>
                }
                @if (entry.record.notes) {
                  <div class="text-xs text-gray-600 bg-white rounded-lg p-2 mt-1">
                    {{ entry.record.notes }}
                  </div>
                }
                @if (entry.status !== 'completed') {
                  <button (click)="markComplete(entry, $event)"
                    class="w-full mt-2 bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold py-2 rounded-xl transition-all">
                    {{ t()['vaccines.schedule.markComplete'] || 'Shëno të përfunduar' }}
                  </button>
                }
              } @else {
                <p class="text-xs text-gray-400 italic">{{ t()['vaccines.schedule.notStarted'] || 'E pamartur' }}</p>
              }
            </div>
          }
        </div>
      </div>
    </ng-template>

    <!-- Mark Complete Modal -->
    @if (showMarkCompleteModal()) {
      <div class="fixed inset-0 z-50 flex items-end justify-center sm:items-center" (click)="closeModalOnBackdrop($event)">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <div class="relative bg-white rounded-3xl w-full max-w-lg mx-4 mb-0 sm:mb-0 animate-slide-up">
          <div class="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between rounded-t-3xl">
            <h2 class="text-xl font-extrabold text-gray-800">{{ t()['vaccines.schedule.markComplete'] }}</h2>
            <button (click)="showMarkCompleteModal.set(false)" class="text-gray-500 bg-gray-100 p-2 rounded-xl">
              <span class="material-icons">close</span>
            </button>
          </div>
          <div class="px-6 py-5 space-y-4">
            <p class="text-sm text-gray-600">
              {{ pendingEntry() ? (isSq() ? pendingEntry()!.scheduleEntry.nameSq : pendingEntry()!.scheduleEntry.nameEn) : '' }}
              — {{ t()['vaccines.doseNumber'] || 'Doza' }} {{ pendingEntry()?.doseIndex }}/{{ pendingEntry()?.scheduleEntry.doses }}
            </p>
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                {{ t()['vaccines.schedule.completionDate'] || 'Data e përfundimit' }}
              </label>
              <input type="date" [(ngModel)]="completionDate"
                class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-gray-700">
            </div>
          </div>
          <div class="px-6 pb-6 pt-2 flex gap-3">
            <button (click)="showMarkCompleteModal.set(false)"
              class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3.5 rounded-2xl transition-all">
              {{ t()['vaccines.cancel'] || 'Anulo' }}
            </button>
            <button (click)="confirmMarkComplete()"
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

    @keyframes pulse-dot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.5; transform: scale(1.4); }
    }
    .pulse-overdue { animation: pulse-dot 1.5s ease-in-out infinite; }

    @keyframes slide-up {
      from { transform: translateY(100%); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
    .animate-slide-up { animation: slide-up 0.3s ease-out; }
  `]
})
export class VaccineScheduleComponent implements OnInit {
  @Input({ required: true }) childId!: string;
  @Input() vaccineRecords: VaccineRecord[] = [];
  @Output() markComplete = new EventEmitter<{ entry: TimelineEntry; date: string }>();

  private dataService = inject(DataService);
  private i18n = inject(I18nService);

  t = computed(() => this.i18n.t());
  isSq = computed(() => this.i18n.isSq());

  // Expand state
  expandedEntry = signal<TimelineEntry | null>(null);

  // Mark Complete Modal
  showMarkCompleteModal = signal(false);
  pendingEntry = signal<TimelineEntry | null>(null);
  completionDate = '';

  timelineEntries = computed<TimelineEntry[]>(() => {
    const records = this.vaccineRecords ?? [];
    const entries: TimelineEntry[] = [];
    const now = new Date();

    for (const scheduleEntry of VACCINE_SCHEDULE) {
      for (let dose = 1; dose <= scheduleEntry.doses; dose++) {
        const key = `${scheduleEntry.code}-${dose}`;
        const record = records.find(r => {
          const recordDose = this.parseDoseNumber(r.vaccineName);
          return this.normalizeCode(r.vaccineName) === scheduleEntry.code && recordDose === dose;
        });

        let status: TimelineStatus = 'not_started';
        let diffDays = 0;

        if (record) {
          if (record.completedAt || record.status === 'completed') {
            status = 'completed';
            diffDays = 0;
          } else {
            const due = new Date(record.dueDate);
            diffDays = Math.floor((due.getTime() - now.getTime()) / 86400000);
            if (diffDays < 0) status = 'overdue';
            else if (diffDays <= 7) status = 'due';
            else status = 'upcoming';
          }
        }

        entries.push({
          scheduleEntry,
          doseIndex: dose,
          record,
          status,
          diffDays,
        });
      }
    }

    return entries;
  });

  overdueEntries   = computed(() => this.timelineEntries().filter(e => e.status === 'overdue'));
  dueEntries       = computed(() => this.timelineEntries().filter(e => e.status === 'due'));
  upcomingEntries  = computed(() => this.timelineEntries().filter(e => e.status === 'upcoming'));
  completedEntries = computed(() => this.timelineEntries().filter(e => e.status === 'completed'));
  notStartedEntries = computed(() => this.timelineEntries().filter(e => e.status === 'not_started'));

  ngOnInit() {
    // Set default completion date to today
    this.completionDate = new Date().toISOString().split('T')[0];
  }

  private normalizeCode(name: string): string {
    return name.replace(/\s*\(Dose\s*\d+\)/i, '').trim();
  }

  private parseDoseNumber(name: string): number {
    const match = name.match(/-\d+$|-(\d+)$/);
    if (match) return parseInt(match[1], 10);
    return 1;
  }

  toggleExpand(entry: TimelineEntry) {
    const key = entry.scheduleEntry.code + entry.doseIndex;
    const current = this.expandedEntry();
    if (current && current.scheduleEntry.code === entry.scheduleEntry.code && current.doseIndex === entry.doseIndex) {
      this.expandedEntry.set(null);
    } else {
      this.expandedEntry.set(entry);
    }
  }

  onLongPress(entry: TimelineEntry, event: MouseEvent) {
    if (entry.status === 'completed') return;
    event.preventDefault();
    this.pendingEntry.set(entry);
    this.completionDate = new Date().toISOString().split('T')[0];
    this.showMarkCompleteModal.set(true);
  }

  getDueDate(entry: TimelineEntry): string {
    if (entry.record?.dueDate) return entry.record.dueDate;
    // Compute from child birth date + schedule recommended day
    const child = this.dataService.activeChild();
    if (!child) return '';
    const birth = new Date(child.dateOfBirth);
    const due = new Date(birth.getTime() + entry.scheduleEntry.recommendedDay * 86400000);
    return due.toISOString().split('T')[0];
  }

  confirmMarkComplete() {
    const entry = this.pendingEntry();
    if (!entry || !this.completionDate) return;
    this.markComplete.emit({ entry, date: this.completionDate });
    this.showMarkCompleteModal.set(false);
    this.expandedEntry.set(null);
  }

  markComplete(entry: TimelineEntry, event: MouseEvent) {
    event.stopPropagation();
    this.pendingEntry.set(entry);
    this.completionDate = new Date().toISOString().split('T')[0];
    this.showMarkCompleteModal.set(true);
  }

  getDotClass(status: TimelineStatus): string {
    switch (status) {
      case 'completed':   return 'w-3 h-3 rounded-full bg-green-500';
      case 'overdue':     return 'w-3 h-3 rounded-full bg-orange-500';
      case 'due':         return 'w-3 h-3 rounded-full border-2 border-orange-400 bg-transparent';
      case 'upcoming':    return 'w-3 h-3 rounded-full border-2 border-teal-500 bg-transparent';
      case 'not_started': return 'w-3 h-3 rounded-full border-2 border-dashed border-gray-400 bg-transparent';
    }
  }

  getBadgeClass(status: TimelineStatus): string {
    switch (status) {
      case 'completed':   return 'bg-gray-100 text-gray-500';
      case 'overdue':     return 'bg-orange-100 text-orange-700';
      case 'due':         return 'bg-orange-50 text-orange-600';
      case 'upcoming':    return 'bg-teal-50 text-teal-700';
      case 'not_started': return 'bg-gray-50 text-gray-400';
    }
  }

  getStatusTextClass(status: TimelineStatus): string {
    switch (status) {
      case 'completed':   return 'text-green-600';
      case 'overdue':     return 'text-orange-600';
      case 'due':         return 'text-orange-500';
      case 'upcoming':    return 'text-teal-600';
      case 'not_started': return 'text-gray-400';
    }
  }

  getStatusLabel(status: TimelineStatus): string {
    const labels: Record<TimelineStatus, string> = {
      completed:   this.t()['vaccines.schedule.completed'] || 'Përfunduar',
      overdue:     this.t()['vaccines.schedule.overdue'] || 'I vonuar',
      due:         this.t()['vaccines.schedule.dueSoon'] || 'Së shpejti',
      upcoming:    this.t()['vaccines.schedule.upcoming'] || 'Në pritje',
      not_started: this.t()['vaccines.schedule.notStarted'] || 'I pamartur',
    };
    return labels[status];
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '--';
    const d = new Date(dateStr);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}/${d.getFullYear()}`;
  }

  closeModalOnBackdrop(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('fixed')) {
      this.showMarkCompleteModal.set(false);
    }
  }
}