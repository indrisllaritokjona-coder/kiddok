import { Component, inject, signal, computed } from '@angular/core'
import { LucideAngularModule } from 'lucide-angular';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, DiaryEntry } from '../services/data.service';
import { I18nService } from '../core/i18n/i18n.service';

type EntryType = DiaryEntry['type'];

interface CalendarEntry {
  id?: string;
  date: string;
  type: EntryType;
  description: string;
  severity?: 'mild' | 'moderate' | 'severe';
  duration?: string;
  notes?: string;
  loggedAt?: string;
}

interface DayCell {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  hasEntries: boolean;
  entryCount: number;
}

interface QuickAdd {
  type: EntryType;
  emoji: string;
  labelKey: string;
  description: string;
  bgClass: string;
  borderClass: string;
  description_placeholder?: string;
}

@Component({
    selector: 'app-diary',
    imports: [CommonModule, FormsModule, LucideAngularModule],
    template: `
    <div class="px-2 max-w-7xl mx-auto">

      <!-- Header -->
      <div class="flex items-center justify-between mb-6 flex-col sm:flex-row gap-4">
        <div>
          <h1 class="text-3xl font-extrabold text-gray-800">{{ i18n.t()['diary.title'] }}</h1>
          <p class="text-slate-400 text-sm mt-1 font-medium">{{ i18n.t()['diary.subtitle'] }}</p>
        </div>
        <button (click)="openAddEntry()"
                class="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white px-6 py-3 rounded-2xl font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-sm">
          <lucide-icon name="plus" class="text-inherit"></lucide-icon>
          {{ i18n.t()['diary.addEntry'] }}
        </button>
      </div>

      <!-- Quick-Add Bar -->
      <div class="flex items-center justify-center gap-3 mb-6 flex-wrap">
        @for (qa of quickAddButtons(); track qa.type) {
          <button (click)="quickAdd(qa)"
                  class="flex flex-col items-center gap-1.5 w-16 h-20 rounded-2xl border-2 transition-all hover:shadow-md hover:-translate-y-0.5 {{ qa.bgClass }} {{ qa.borderClass }}">
            <span class="text-2xl">{{ qa.emoji }}</span>
            <span class="text-xs font-semibold text-slate-600 leading-tight text-center px-1">{{ i18n.t()[qa.labelKey] }}</span>
          </button>
        }
      </div>

      <!-- Filter Pills -->
      <div class="flex items-center gap-2 mb-6 flex-wrap">
        @for (f of filterPills(); track f.value) {
          <button (click)="activeFilter.set(f.value)"
                  class="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border-2 transition-all
                         {{ activeFilter() === f.value ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-slate-500 border-slate-200 hover:border-primary-300' }}">
            {{ f.label() }}
          </button>
        }
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- ===== CALENDAR ===== -->
        <div class="lg:col-span-2 bg-white rounded-[2rem] shadow-soft border border-slate-100 overflow-hidden">
          <!-- Month navigation -->
          <div class="flex items-center justify-between p-5 border-b border-slate-100">
            <button (click)="prevMonth()" class="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
              <lucide-icon name="chevron-left" class="text-inherit"></lucide-icon>
            </button>
            <h2 class="text-lg font-extrabold text-gray-800 tracking-wide">{{ monthLabel() }}</h2>
            <button (click)="nextMonth()" class="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
              <lucide-icon name="chevron-right" class="text-inherit"></lucide-icon>
            </button>
          </div>

          <!-- Day-of-week headers -->
          <div class="grid grid-cols-7 border-b border-slate-100">
            @for (dow of weekDays(); track dow) {
              <div class="py-3 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">{{ dow }}</div>
            }
          </div>

          <!-- Calendar grid -->
          <div class="grid grid-cols-7 p-3 gap-1">
            @for (day of calendarDays(); track day.date.toISOString()) {
              <button (click)="selectDay(day)"
                      class="relative aspect-square flex flex-col items-center justify-center rounded-2xl transition-all text-sm font-semibold group
                             {{ day.isCurrentMonth ? (day.isSelected ? 'bg-primary-600 text-white shadow-md' : 'text-gray-700 hover:bg-primary-50') : 'text-slate-300' }}">
                <span>{{ day.day }}</span>
                @if (day.isToday && !day.isSelected) {
                  <span class="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                }
                @if (day.hasEntries && !day.isSelected) {
                  <span class="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                }
              </button>
            }
          </div>

          <!-- Legend -->
          <div class="flex items-center gap-6 px-5 py-4 border-t border-slate-100 bg-slate-50/50">
            <div class="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <span class="w-2 h-2 rounded-full bg-teal-400 inline-block"></span> {{ i18n.t()['diary.today'] }}
            </div>
            <div class="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <span class="w-2 h-2 rounded-full bg-primary-500 inline-block"></span> {{ i18n.t()['diary.hasEntries'] }}
            </div>
          </div>
        </div>

        <!-- ===== ENTRIES FOR SELECTED DATE ===== -->
        <div class="bg-white rounded-[2rem] shadow-soft border border-slate-100 overflow-hidden">
          <div class="p-5 border-b border-slate-100">
            <h3 class="font-extrabold text-gray-800 text-lg">{{ selectedDateLabel() }}</h3>
            <p class="text-slate-400 text-xs mt-1 font-medium">
              {{ filteredEntriesForDate().length }} {{ i18n.t()['diary.entryCount'] }}
            </p>
          </div>

          <div class="p-4 space-y-3 max-h-[500px] overflow-y-auto">
            @if (filteredEntriesForDate().length === 0) {
              <div class="text-center py-10">
                <lucide-icon name="inbox" class="text-inherit"></lucide-icon>
                <p class="text-slate-400 text-sm font-medium">{{ i18n.t()['diary.emptyState'] }}</p>
              </div>
            }
            @for (entry of filteredEntriesForDate(); track entry.id) {
              <div class="rounded-2xl border border-slate-100 p-4 bg-slate-50/60 hover:bg-slate-100/80 transition-colors group">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex items-center gap-2">
                    <lucide-icon [name]="typeIcon(entry.type)" class="text-base {{ typeIconClass(entry.type) }}"></lucide-icon>
                    <span class="text-xs font-bold uppercase tracking-wider {{ typeColorClass(entry.type) }}">
                      {{ typeLabel(entry.type) }}
                    </span>
                    @if (entry.severity) {
                      <span class="w-3 h-3 rounded-full {{ severityColor(entry.severity) }}"></span>
                    }
                  </div>
                  <button (click)="deleteEntry(entry)" class="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all">
                    <lucide-icon name="trash-2" class="text-inherit"></lucide-icon>
                  </button>
                </div>

                <p class="text-sm font-semibold text-gray-800 mb-1">{{ entry.description }}</p>

                @if (entry.type === 'symptom' && entry.duration) {
                  <p class="text-xs text-slate-500 font-medium mb-1">
                    <lucide-icon name="clock" class="text-inherit"></lucide-icon>
                    {{ entry.duration }}
                  </p>
                }

                @if (entry.notes) {
                  <p class="text-xs text-slate-500 italic mt-2 border-t border-slate-200 pt-2">{{ entry.notes }}</p>
                }
              </div>
            }
          </div>
        </div>

      </div>

      <!-- Recent Activity Timeline -->
      <div class="mt-8 bg-white rounded-[2rem] shadow-soft border border-slate-100 overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 class="font-extrabold text-gray-800 text-lg">{{ i18n.t()['diary.recentActivity'] }}</h3>
            <p class="text-slate-400 text-xs mt-0.5 font-medium">{{ i18n.t()['diary.recentEntries'] }}</p>
          </div>
          <lucide-icon name="history" class="text-inherit"></lucide-icon>
        </div>
        <div class="p-5">
          @if (recentEntries().length === 0) {
            <div class="text-center py-8">
              <lucide-icon name="inbox" class="text-inherit"></lucide-icon>
              <p class="text-slate-400 text-sm font-medium">{{ i18n.t()['diary.emptyState'] }}</p>
            </div>
          }
          <div class="space-y-3">
            @for (entry of recentEntries(); track entry.id) {
              <div class="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div class="flex flex-col items-center gap-1 min-w-[40px]">
                  <span class="text-xl">{{ typeEmoji(entry.type) }}</span>
                  @if (entry.severity) {
                    <span class="w-2.5 h-2.5 rounded-full {{ severityColor(entry.severity) }}"></span>
                  }
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-xs font-bold uppercase tracking-wider {{ typeColorClass(entry.type) }}">{{ typeLabel(entry.type) }}</span>
                    <span class="text-xs text-slate-400 font-medium">{{ formatEntryTime(entry.loggedAt) }}</span>
                  </div>
                  <p class="text-sm text-gray-800 font-medium truncate">{{ entry.description }}</p>
                  @if (entry.duration) {
                    <p class="text-xs text-slate-400 font-medium">{{ entry.duration }}</p>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      </div>

    </div>

    <!-- ===== ADD ENTRY MODAL ===== -->
    @if (showModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm" (click)="closeModal()">
        <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up" (click)="$event.stopPropagation()">

          <!-- Modal header -->
          <div class="flex items-center justify-between p-6 border-b border-slate-100">
            <div>
              <h3 class="text-xl font-extrabold text-gray-800">{{ i18n.t()['diary.addEntry'] }}</h3>
              <p class="text-slate-400 text-xs mt-0.5 font-medium">{{ selectedDateLabel() }}</p>
            </div>
            <button (click)="closeModal()" class="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
              <lucide-icon name="x" class="text-inherit"></lucide-icon>
            </button>
          </div>

          <!-- Entry type tabs -->
          <div class="flex p-4 gap-2 border-b border-slate-100">
            @for (type of entryTypes(); track type.value) {
              <button (click)="newEntryType.set(type.value)"
                      class="flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border-2 flex flex-col items-center gap-1
                             {{ newEntryType() === type.value ? 'bg-primary-600 text-white border-primary-600' : 'bg-slate-50 text-slate-500 border-transparent hover:bg-slate-100' }}">
                <lucide-icon [name]="type.icon" class="text-sm"></lucide-icon>
                <div>{{ type.label() }}</div>
              </button>
            }
          </div>

          <div class="p-6 space-y-5">

            <!-- Description (all types) -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['diary.description'] }}</label>
              <textarea [(ngModel)]="newDescription" rows="2"
                        class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm resize-none"
                        [placeholder]="i18n.t()['diary.descriptionPlaceholder']"></textarea>
            </div>

            <!-- SYMPTOM entry extra fields -->
            @if (newEntryType() === 'symptom') {
              <div>
                <label class="block text-xs font-bold text-primary-700 mb-3 uppercase tracking-wider">{{ i18n.t()['diary.symptoms'] }}</label>
                <div class="flex flex-wrap gap-2">
                  @for (symptom of symptomOptions(); track symptom.key) {
                    <button (click)="toggleSymptom(symptom.key)"
                            class="px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all
                                   {{ newSymptoms().includes(symptom.key) ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-slate-500 border-slate-200 hover:border-orange-300' }}">
                      {{ symptom.label() }}
                    </button>
                  }
                </div>
              </div>

              <!-- Severity selector -->
              <div>
                <label class="block text-xs font-bold text-primary-700 mb-3 uppercase tracking-wider">{{ i18n.t()['diary.severity.label'] }}</label>
                <div class="flex gap-3">
                  @for (sev of severities(); track sev.value) {
                    <button (click)="newSeverity.set(sev.value)"
                            class="flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border-2 transition-all {{ newSeverity() === sev.value ? sev.activeClass : 'bg-slate-50 border-slate-200 hover:' + sev.hoverClass }}">
                      <span class="w-5 h-5 rounded-full {{ sev.dotClass }}"></span>
                      <span class="text-xs font-bold {{ newSeverity() === sev.value ? sev.textClass : 'text-slate-500' }}">{{ sev.label() }}</span>
                    </button>
                  }
                </div>
              </div>

              <!-- Duration -->
              <div>
                <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['diary.duration'] }}</label>
                <input type="text" [(ngModel)]="newDuration"
                       class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm"
                       [placeholder]="i18n.t()['diary.durationPlaceholder']">
              </div>
            }

            <!-- Notes (all types) -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['diary.notes'] }}</label>
              <textarea [(ngModel)]="newNotes" rows="2"
                        class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm resize-none"
                        [placeholder]="i18n.t()['diary.notesPlaceholder']"></textarea>
            </div>

            <!-- Actions -->
            <div class="flex gap-3 pt-2">
              <button (click)="closeModal()"
                      class="flex-1 py-3.5 rounded-2xl bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-colors">
                {{ i18n.t()['diary.cancel'] }}
              </button>
              <button (click)="saveEntry()"
                      [disabled]="!canSave()"
                      class="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold text-sm shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                {{ i18n.t()['diary.save'] }}
              </button>
            </div>

          </div>
        </div>
      </div>
    }
  `
})
export class DiaryComponent {
  dataService = inject(DataService);
  i18n = inject(I18nService);

  // ── Calendar state ────────────────────────────────────────────────
  viewDate = signal(new Date());
  selectedDate = signal<string>(this.todayStr());

  showModal = signal(false);
  newEntryType = signal<EntryType>('symptom');
  activeFilter = signal<'all' | EntryType>('all');

  // Form fields
  newDescription = '';
  newSymptoms = signal<string[]>([]);
  newSeverity = signal<'mild' | 'moderate' | 'severe'>('mild');
  newDuration = '';
  newNotes = '';

  // ── Quick-add ─────────────────────────────────────────────────────
  quickAddButtons = computed<QuickAdd[]>(() => [
    { type: 'symptom', emoji: '😰', labelKey: 'diary.quickAdd.notWell', description: 'Nuk ndihem mirë', bgClass: 'bg-orange-50', borderClass: 'border-orange-200' },
    { type: 'meal', emoji: '🍽️', labelKey: 'diary.quickAdd.ate', description: 'Hëngri', bgClass: 'bg-teal-50', borderClass: 'border-teal-200' },
    { type: 'sleep', emoji: '😴', labelKey: 'diary.quickAdd.slept', description: 'Fjeti', bgClass: 'bg-indigo-50', borderClass: 'border-indigo-200' },
    { type: 'mood', emoji: '😊', labelKey: 'diary.quickAdd.happy', description: 'I gëzuar', bgClass: 'bg-yellow-50', borderClass: 'border-yellow-200' },
  ]);

  filterPills = computed(() => {
    const t = this.i18n.t();
    return [
      { value: 'all' as const, label: () => t['diary.filter.all'] },
      { value: 'symptom' as const, label: () => t['diary.filter.symptom'] },
      { value: 'meal' as const, label: () => t['diary.filter.meal'] },
      { value: 'sleep' as const, label: () => t['diary.filter.sleep'] },
      { value: 'mood' as const, label: () => t['diary.filter.mood'] },
    ];
  });

  entryTypes = computed(() => {
    const t = this.i18n.t();
    return [
      { value: 'symptom' as const, icon: 'thermometer', label: () => t['diary.type.symptom'] },
      { value: 'meal' as const, icon: 'utensils', label: () => t['diary.type.meal'] },
      { value: 'sleep' as const, icon: 'moon', label: () => t['diary.type.sleep'] },
      { value: 'mood' as const, icon: 'smile', label: () => t['diary.type.mood'] },
    ];
  });

  severities = computed(() => {
    const t = this.i18n.t();
    return [
      { value: 'mild' as const, label: () => t['diary.severity.mild'], dotClass: 'bg-green-400', activeClass: 'border-green-300 bg-green-50', hoverClass: 'border-green-200', textClass: 'text-green-700' },
      { value: 'moderate' as const, label: () => t['diary.severity.moderate'], dotClass: 'bg-yellow-400', activeClass: 'border-yellow-300 bg-yellow-50', hoverClass: 'border-yellow-200', textClass: 'text-yellow-700' },
      { value: 'severe' as const, label: () => t['diary.severity.severe'], dotClass: 'bg-red-500', activeClass: 'border-red-300 bg-red-50', hoverClass: 'border-red-200', textClass: 'text-red-700' },
    ];
  });

  symptomOptions = computed(() => {
    const t = this.i18n.t();
    return [
      { key: 'fever', label: () => t['diary.symptomTypes.fever'] },
      { key: 'cough', label: () => t['diary.symptomTypes.cough'] },
      { key: 'vomit', label: () => t['diary.symptomTypes.vomit'] },
      { key: 'diarrhea', label: () => t['diary.symptomTypes.diarrhea'] },
      { key: 'headache', label: () => t['diary.symptomTypes.headache'] },
      { key: 'rash', label: () => t['diary.symptomTypes.rash'] },
      { key: 'soreThroat', label: () => t['diary.symptomTypes.soreThroat'] },
      { key: 'tired', label: () => t['diary.symptomTypes.tired'] },
      { key: 'stomachache', label: () => t['diary.symptomTypes.stomachache'] },
    ];
  });

  // ── Helpers ───────────────────────────────────────────────────────
  weekDays = computed(() => {
    return this.i18n.locale() === 'sq'
      ? ['Di', 'Hën', 'Mar', 'Mër', 'Enj', 'Pre', 'Sht']
      : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  });

  monthLabel = computed(() => {
    const d = this.viewDate();
    return d.toLocaleDateString(this.i18n.locale() === 'sq' ? 'sq-AL' : 'en-US', { month: 'long', year: 'numeric' });
  });

  calendarDays = computed<DayCell[]>(() => {
    const view = this.viewDate();
    const year = view.getFullYear();
    const month = view.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDow = firstDay.getDay();
    const todayStr = this.todayStr();
    const selected = this.selectedDate();
    const entries = this.allEntries();

    const days: DayCell[] = [];

    for (let i = 0; i < startDow; i++) {
      const d = new Date(year, month, -startDow + i + 1);
      days.push({ date: d, day: d.getDate(), isCurrentMonth: false, isToday: false, isSelected: false, hasEntries: false, entryCount: 0 });
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
      const date = new Date(year, month, d);
      const dateStr = this.formatDate(date);
      const dayEntries = entries.filter(e => e.date === dateStr);
      days.push({
        date,
        day: d,
        isCurrentMonth: true,
        isToday: dateStr === todayStr,
        isSelected: dateStr === selected,
        hasEntries: dayEntries.length > 0,
        entryCount: dayEntries.length,
      });
    }

    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month + 1, i);
      days.push({ date: d, day: d.getDate(), isCurrentMonth: false, isToday: false, isSelected: false, hasEntries: false, entryCount: 0 });
    }

    return days;
  });

  allEntries = computed<CalendarEntry[]>(() => {
    const childId = this.dataService.activeChildId();
    if (!childId) return [];
    const diaryEntries = this.dataService.getDiaryEntriesByChild(childId);
    return diaryEntries.map(e => ({
      id: e.id,
      date: e.loggedAt ? this.formatDate(new Date(e.loggedAt)) : this.todayStr(),
      type: e.type,
      description: e.description,
      severity: e.severity,
      duration: e.duration,
      notes: e.notes,
      loggedAt: e.loggedAt,
    }));
  });

  entriesForSelectedDate = computed(() => {
    return this.allEntries().filter(e => e.date === this.selectedDate());
  });

  filteredEntriesForDate = computed(() => {
    const filter = this.activeFilter();
    const entries = this.entriesForSelectedDate();
    if (filter === 'all') return entries;
    return entries.filter(e => e.type === filter);
  });

  recentEntries = computed(() => {
    const childId = this.dataService.activeChildId();
    if (!childId) return [];
    const filter = this.activeFilter();
    let entries = this.dataService.getDiaryEntriesByChild(childId)
      .sort((a, b) => new Date(b.loggedAt).getTime() - new Date(a.loggedAt).getTime())
      .slice(0, 7);
    if (filter !== 'all') {
      entries = entries.filter(e => e.type === filter);
    }
    return entries;
  });

  selectedDateLabel = computed(() => {
    const d = new Date(this.selectedDate() + 'T00:00:00');
    return d.toLocaleDateString(this.i18n.locale() === 'sq' ? 'sq-AL' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' });
  });

  // ── Actions ──────────────────────────────────────────────────────
  prevMonth() {
    const d = this.viewDate();
    this.viewDate.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  nextMonth() {
    const d = this.viewDate();
    this.viewDate.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  selectDay(day: DayCell) {
    this.selectedDate.set(this.formatDate(day.date));
  }

  openAddEntry() {
    this.showModal.set(true);
    this.newEntryType.set('symptom');
    this.newDescription = '';
    this.newSymptoms.set([]);
    this.newSeverity.set('mild');
    this.newDuration = '';
    this.newNotes = '';
  }

  quickAdd(qa: QuickAdd) {
    this.showModal.set(true);
    this.newEntryType.set(qa.type);
    this.newDescription = qa.description;
    this.newSymptoms.set([]);
    this.newSeverity.set('mild');
    this.newDuration = '';
    this.newNotes = '';
  }

  closeModal() {
    this.showModal.set(false);
  }

  toggleSymptom(symptom: string) {
    const current = this.newSymptoms();
    if (current.includes(symptom)) {
      this.newSymptoms.set(current.filter(s => s !== symptom));
    } else {
      this.newSymptoms.set([...current, symptom]);
    }
  }

  canSave(): boolean {
    if (this.newEntryType() === 'symptom') return this.newSymptoms().length > 0;
    return !!this.newDescription.trim();
  }

  saveEntry() {
    const childId = this.dataService.activeChildId();
    if (!childId) return;

    const description = this.newEntryType() === 'symptom'
      ? this.newSymptoms().map(s => this.i18n.t()['diary.symptomTypes.' + s] || s).join(', ')
      : this.newDescription;

    const entry: Omit<DiaryEntry, 'id'> = {
      childId,
      type: this.newEntryType(),
      description: description.trim(),
      severity: this.newEntryType() === 'symptom' ? this.newSeverity() : undefined,
      duration: this.newDuration.trim() || undefined,
      loggedAt: new Date(this.selectedDate() + 'T12:00:00').toISOString(),
      notes: this.newNotes.trim() || undefined,
    };

    this.dataService.addDiaryEntry(entry);
    this.closeModal();
  }

  deleteEntry(entry: CalendarEntry) {
    if (!entry.id) return;
    const current = this.dataService.diaryEntries();
    const updated = current.filter(e => e.id !== entry.id);
    this.dataService.diaryEntries.set(updated);
    const childId = this.dataService.activeChildId();
    if (childId) {
      try { localStorage.setItem(`kiddok_diary_${childId}`, JSON.stringify(updated)); } catch {}
    }
  }

  // ── Utilities ───────────────────────────────────────────────────
  typeIcon(type: EntryType): string {
    const map: Record<string, string> = {
      symptom: 'thermometer',
      meal: 'utensils',
      sleep: 'moon',
      mood: 'smile',
      activity: 'footprints',
    };
    return map[type] ?? 'circle';
  }

  typeIconClass(type: EntryType): string {
    const map: Record<string, string> = {
      symptom: 'text-orange-500',
      meal: 'text-teal-500',
      sleep: 'text-indigo-500',
      mood: 'text-yellow-500',
      activity: 'text-blue-500',
    };
    return map[type] ?? 'text-slate-400';
  }

  typeColorClass(type: EntryType): string {
    const map: Record<string, string> = {
      symptom: 'text-orange-500',
      meal: 'text-teal-500',
      sleep: 'text-indigo-500',
      mood: 'text-yellow-600',
      activity: 'text-blue-500',
    };
    return map[type] ?? 'text-slate-400';
  }

  typeLabel(type: EntryType): string {
    const t = this.i18n.t();
    return t['diary.type.' + type] ?? type;
  }

  typeEmoji(type: EntryType): string {
    const map: Record<string, string> = {
      symptom: '😰',
      meal: '🍽️',
      sleep: '😴',
      mood: '😊',
      activity: '🏃',
    };
    return map[type] ?? '📝';
  }

  severityColor(severity: string): string {
    switch (severity) {
      case 'mild': return 'bg-green-400 ring-2 ring-green-200';
      case 'moderate': return 'bg-yellow-400 ring-2 ring-yellow-200';
      case 'severe': return 'bg-red-500 ring-2 ring-red-200';
      default: return 'bg-slate-300';
    }
  }

  formatEntryTime(iso?: string): string {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleTimeString(this.i18n.locale() === 'sq' ? 'sq-AL' : 'en-US', { hour: '2-digit', minute: '2-digit' });
  }

  private todayStr() { return this.formatDate(new Date()); }

  private formatDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
}
