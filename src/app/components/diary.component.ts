import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { I18nService } from '../core/i18n/i18n.service';

interface CalendarEntry {
  id?: string;
  date: string;        // yyyy-mm-dd
  type: 'SYMPTOM' | 'TEMP' | 'MEDICATION';
  symptoms?: string[];
  temperature?: number;
  temperatureTime?: string;
  medicationName?: string;
  medicationDose?: string;
  medicationTime?: string;
  medicationEffectiveness?: string;
  notes?: string;
  createdAt?: string;
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

@Component({
    selector: 'app-diary',
    imports: [CommonModule, FormsModule],
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
          <span class="material-icons text-lg">add</span>
          {{ i18n.t()['diary.addEntry'] }}
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- ===== CALENDAR ===== -->
        <div class="lg:col-span-2 bg-white rounded-[2rem] shadow-soft border border-slate-100 overflow-hidden">
          <!-- Month navigation -->
          <div class="flex items-center justify-between p-5 border-b border-slate-100">
            <button (click)="prevMonth()" class="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
              <span class="material-icons text-gray-600">chevron_left</span>
            </button>
            <h2 class="text-lg font-extrabold text-gray-800 tracking-wide">{{ monthLabel() }}</h2>
            <button (click)="nextMonth()" class="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
              <span class="material-icons text-gray-600">chevron_right</span>
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
              <span class="w-2 h-2 rounded-full bg-primary-500 inline-block"></span> {{ i18n.t()['diary.today'] === 'Sot' ? 'Ka regjistrime' : 'Has entries' }}
            </div>
          </div>
        </div>

        <!-- ===== ENTRIES FOR SELECTED DATE ===== -->
        <div class="bg-white rounded-[2rem] shadow-soft border border-slate-100 overflow-hidden">
          <div class="p-5 border-b border-slate-100">
            <h3 class="font-extrabold text-gray-800 text-lg">
              {{ selectedDateLabel() }}
            </h3>
            <p class="text-slate-400 text-xs mt-1 font-medium">
              {{ entriesForSelectedDate().length }} {{ entriesForSelectedDate().length === 1 ? 'regjistrim' : 'regjistrime' }}
            </p>
          </div>

          <div class="p-4 space-y-3 max-h-[500px] overflow-y-auto">
            @if (entriesForSelectedDate().length === 0) {
              <div class="text-center py-10">
                <span class="material-icons text-5xl text-slate-200 mb-3">event_note</span>
                <p class="text-slate-400 text-sm font-medium">{{ i18n.t()['diary.noEntries'] }}</p>
                <button (click)="openAddEntry()" class="mt-3 text-primary-600 text-sm font-bold hover:underline">
                  + {{ i18n.t()['diary.addEntry'] }}
                </button>
              </div>
            }
            @for (entry of entriesForSelectedDate(); track entry.id) {
              <div class="rounded-2xl border border-slate-100 p-4 bg-slate-50/60 hover:bg-slate-100/80 transition-colors group">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex items-center gap-2">
                    <span class="material-icons text-base {{ entry.type === 'SYMPTOM' ? 'text-orange-500' : entry.type === 'TEMP' ? 'text-red-500' : 'text-blue-500' }}">
                      {{ entry.type === 'SYMPTOM' ? 'thermostat' : entry.type === 'TEMP' ? 'water_drop' : 'medication' }}
                    </span>
                    <span class="text-xs font-bold uppercase tracking-wider {{ entry.type === 'SYMPTOM' ? 'text-orange-500' : entry.type === 'TEMP' ? 'text-red-500' : 'text-blue-500' }}">
                      {{ entry.type === 'SYMPTOM' ? i18n.t()['diary.symptoms'] : entry.type === 'TEMP' ? i18n.t()['diary.temperature'] : i18n.t()['diary.medication'] }}
                    </span>
                  </div>
                  <button (click)="deleteEntry(entry)" class="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all">
                    <span class="material-icons text-sm">delete_outline</span>
                  </button>
                </div>

                @if (entry.type === 'SYMPTOM' && entry.symptoms?.length) {
                  <div class="flex flex-wrap gap-1.5 mb-2">
                    @for (s of entry.symptoms; track s) {
                      <span class="px-2.5 py-1 bg-orange-50 text-orange-600 text-xs font-bold rounded-full border border-orange-100">{{ s }}</span>
                    }
                  </div>
                }
                @if (entry.type === 'TEMP' && entry.temperature) {
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-2xl font-black text-red-500">{{ entry.temperature }}°C</span>
                    @if (entry.temperatureTime) {
                      <span class="text-xs text-slate-400 font-medium">{{ entry.temperatureTime }}</span>
                    }
                  </div>
                }
                @if (entry.type === 'MEDICATION') {
                  <div class="space-y-1 mb-1">
                    <p class="font-bold text-gray-800 text-sm">{{ entry.medicationName }}</p>
                    @if (entry.medicationDose) {
                      <p class="text-xs text-slate-500 font-medium">Doza: {{ entry.medicationDose }}</p>
                    }
                    @if (entry.medicationTime) {
                      <p class="text-xs text-slate-500 font-medium">Ora: {{ entry.medicationTime }}</p>
                    }
                    @if (entry.medicationEffectiveness) {
                      <p class="text-xs font-bold text-teal-600 mt-1">
                        {{ effectivenessLabel(entry.medicationEffectiveness) }}
                      </p>
                    }
                  </div>
                }
                @if (entry.notes) {
                  <p class="text-xs text-slate-500 italic mt-2 border-t border-slate-200 pt-2">{{ entry.notes }}</p>
                }
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
              <span class="material-icons text-gray-600 text-lg">close</span>
            </button>
          </div>

          <!-- Entry type tabs -->
          <div class="flex p-4 gap-2 border-b border-slate-100">
            @for (type of entryTypes(); track type.value) {
              <button (click)="newEntryType.set(type.value)"
                      class="flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border-2
                             {{ newEntryType() === type.value ? 'bg-primary-600 text-white border-primary-600' : 'bg-slate-50 text-slate-500 border-transparent hover:bg-slate-100' }}">
                <span class="material-icons text-sm mb-0.5">{{ type.icon }}</span>
                <div>{{ type.label() }}</div>
              </button>
            }
          </div>

          <div class="p-6 space-y-5">

            <!-- SYMPTOM entry -->
            @if (newEntryType() === 'SYMPTOM') {
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
            }

            <!-- TEMPERATURE entry -->
            @if (newEntryType() === 'TEMP') {
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-primary-700 mb-3 uppercase tracking-wider">{{ i18n.t()['diary.temperatureReading'] }}</label>
                  <input type="number" step="0.1" [(ngModel)]="newTemperature"
                         class="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg text-gray-800 font-bold placeholder-slate-300"
                         placeholder="38.5">
                </div>
                <div>
                  <label class="block text-xs font-bold text-primary-700 mb-3 uppercase tracking-wider">{{ i18n.t()['diary.temperatureTime'] }}</label>
                  <input type="time" [(ngModel)]="newTempTime"
                         class="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800">
                </div>
              </div>
            }

            <!-- MEDICATION entry -->
            @if (newEntryType() === 'MEDICATION') {
              <div class="space-y-4">
                <div>
                  <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['diary.medicationName'] }}</label>
                  <input type="text" [(ngModel)]="newMedName"
                         class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm"
                         placeholder="P.sh. Paracetamol">
                </div>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['diary.medicationDose'] }}</label>
                    <input type="text" [(ngModel)]="newMedDose"
                           class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm"
                           placeholder="P.sh. 5ml">
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['diary.medicationTime'] }}</label>
                    <input type="time" [(ngModel)]="newMedTime"
                           class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm">
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['diary.effectiveness'] }}</label>
                  <select [(ngModel)]="newMedEffect"
                          class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm">
                    <option value="">--</option>
                    <option value="none">{{ i18n.t()['diary.effectivenessOptions.none'] }}</option>
                    <option value="mild">{{ i18n.t()['diary.effectivenessOptions.mild'] }}</option>
                    <option value="good">{{ i18n.t()['diary.effectivenessOptions.good'] }}</option>
                    <option value="great">{{ i18n.t()['diary.effectivenessOptions.great'] }}</option>
                  </select>
                </div>
              </div>
            }

            <!-- Notes (all types) -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">{{ i18n.t()['diary.notes'] }}</label>
              <textarea [(ngModel)]="newNotes" rows="2"
                        class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm resize-none"
                        placeholder="Shënime shtesë..."></textarea>
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
  newEntryType = signal<'SYMPTOM' | 'TEMP' | 'MEDICATION'>('SYMPTOM');

  // Form fields
  newSymptoms = signal<string[]>([]);
  newTemperature: number | null = null;
  newTempTime = '';
  newMedName = '';
  newMedDose = '';
  newMedTime = '';
  newMedEffect = '';
  newNotes = '';

  // ── Helpers ───────────────────────────────────────────────────────
  weekDays = computed(() => {
    const dow = this.i18n.locale() === 'sq'
      ? ['Di', 'Hën', 'Mar', 'Mër', 'Enj', 'Pre', 'Sht']
      : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return dow;
  });

  symptomOptions = computed(() => [
    { key: 'fever', label: () => this.i18n.t()['diary.symptomTypes.fever'] },
    { key: 'cough', label: () => this.i18n.t()['diary.symptomTypes.cough'] },
    { key: 'vomit', label: () => this.i18n.t()['diary.symptomTypes.vomit'] },
    { key: 'diarrhea', label: () => this.i18n.t()['diary.symptomTypes.diarrhea'] },
    { key: 'headache', label: () => this.i18n.t()['diary.symptomTypes.headache'] },
    { key: 'rash', label: () => this.i18n.t()['diary.symptomTypes.rash'] },
  ]);

  entryTypes = computed(() => [
    { value: 'SYMPTOM' as const, icon: 'thermostat', label: () => this.i18n.t()['diary.symptoms'] },
    { value: 'TEMP' as const, icon: 'water_drop', label: () => this.i18n.t()['diary.temperature'] },
    { value: 'MEDICATION' as const, icon: 'medication', label: () => this.i18n.t()['diary.medication'] },
  ]);

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
    const startDow = firstDay.getDay(); // 0 = Sunday
    const today = new Date();
    const todayStr = this.todayStr();
    const selected = this.selectedDate();
    const entries = this.allEntries();

    const days: DayCell[] = [];

    // Leading empty cells
    for (let i = 0; i < startDow; i++) {
      const d = new Date(year, month, -startDow + i + 1);
      days.push({ date: d, day: d.getDate(), isCurrentMonth: false, isToday: false, isSelected: false, hasEntries: false, entryCount: 0 });
    }

    // Current month days
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

    // Trailing cells to fill grid
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month + 1, i);
      days.push({ date: d, day: d.getDate(), isCurrentMonth: false, isToday: false, isSelected: false, hasEntries: false, entryCount: 0 });
    }

    return days;
  });

  allEntries = computed<CalendarEntry[]>(() => {
    // Combine from dataService - for now use local signals (backend stores in healthRecords)
    return this.dataService.illnesses().map((r: any) => ({
      id: r.id,
      date: r.date ? this.formatDate(new Date(r.date)) : this.todayStr(),
      type: 'SYMPTOM' as const,
      symptoms: r.symptoms ? r.symptoms.split(',').map((s: string) => s.trim()) : [],
      notes: r.notes,
      createdAt: r.createdAt,
    }));
  });

  entriesForSelectedDate = computed(() => {
    return this.allEntries().filter(e => e.date === this.selectedDate());
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
    this.newEntryType.set('SYMPTOM');
    this.newSymptoms.set([]);
    this.newTemperature = null;
    this.newTempTime = '';
    this.newMedName = '';
    this.newMedDose = '';
    this.newMedTime = '';
    this.newMedEffect = '';
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
    if (this.newEntryType() === 'SYMPTOM') return this.newSymptoms().length > 0;
    if (this.newEntryType() === 'TEMP') return !!this.newTemperature;
    if (this.newEntryType() === 'MEDICATION') return !!this.newMedName;
    return false;
  }

  saveEntry() {
    const childId = this.dataService.activeChildId();
    if (!childId) return;

    const payload: any = {
      date: new Date(this.selectedDate() + 'T12:00:00'),
      type: this.newEntryType(),
      notes: this.newNotes || undefined,
    };

    if (this.newEntryType() === 'SYMPTOM') {
      payload.symptoms = this.newSymptoms().join(', ');
      payload.type = 'SYMPTOM';
    } else if (this.newEntryType() === 'TEMP') {
      payload.temperature = this.newTemperature;
      payload.temperatureTime = this.newTempTime || undefined;
      payload.type = 'TEMP';
    } else if (this.newEntryType() === 'MEDICATION') {
      payload.medicationName = this.newMedName;
      payload.medicationDose = this.newMedDose || undefined;
      payload.medicationTime = this.newMedTime || undefined;
      payload.medicationEffectiveness = this.newMedEffect || undefined;
      payload.type = 'MEDICATION';
    }

    this.dataService.addIllness(payload);
    this.closeModal();
  }

  deleteEntry(entry: CalendarEntry) {
    // TODO: call delete API
  }

  effectivenessLabel(val: string): string {
    const map: Record<string, string> = {
      none: this.i18n.t()['diary.effectivenessOptions.none'],
      mild: this.i18n.t()['diary.effectivenessOptions.mild'],
      good: this.i18n.t()['diary.effectivenessOptions.good'],
      great: this.i18n.t()['diary.effectivenessOptions.great'],
    };
    return map[val] ?? val;
  }

  // ── Utilities ────────────────────────────────────────────────────
  private todayStr() { return this.formatDate(new Date()); }

  private formatDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
}
