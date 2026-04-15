import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, IllnessEpisode } from '../services/data.service';

@Component({
  selector: 'app-diary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full bg-background flex flex-col pb-24">
      <!-- Header -->
      <div class="bg-surface px-6 py-4 shadow-soft sticky top-0 z-10 flex justify-between items-center">
        <h2 class="text-xl font-bold text-gray-800">Illness Diary</h2>
        <button 
          (click)="showForm.set(!showForm())"
          class="bg-primary-50 text-primary-600 p-2 rounded-full active:bg-primary-100 transition-colors"
        >
          <span class="material-icons">{{ showForm() ? 'close' : 'add' }}</span>
        </button>
      </div>

      <div class="p-4 flex-1 overflow-y-auto hide-scrollbar animate-fade-in">
        @if (showForm()) {
          <div class="bg-white rounded-3xl p-6 shadow-soft space-y-6">
            <h3 class="font-bold text-lg text-gray-800">Log New Episode</h3>
            
            <!-- Dates -->
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-xs font-medium text-gray-500">Start Date</label>
                <input type="date" class="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" [value]="today" #startDate>
              </div>
              <div class="space-y-1">
                <label class="text-xs font-medium text-gray-500">End Date</label>
                <input type="date" class="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" #endDate>
              </div>
            </div>

            <!-- Symptoms -->
            <div class="space-y-2">
              <label class="text-xs font-medium text-gray-500">Symptoms</label>
              <div class="flex flex-wrap gap-2">
                @for (symptom of availableSymptoms; track symptom) {
                  <button 
                    (click)="toggleSymptom(symptom)"
                    class="px-4 py-2 rounded-full text-sm font-medium transition-colors border"
                    [ngClass]="selectedSymptoms().includes(symptom) ? 'bg-primary-500 text-white border-primary-500 shadow-md' : 'bg-white text-gray-600 border-gray-200'"
                  >
                    {{ symptom }}
                  </button>
                }
              </div>
            </div>

            <!-- Temperature -->
            <div class="space-y-2">
              <label class="text-xs font-medium text-gray-500">Temperature Log (°C)</label>
              <div class="flex gap-2">
                <input type="number" step="0.1" placeholder="e.g. 38.5" class="w-1/2 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" #tempVal>
                <input type="time" class="w-1/2 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" [value]="currentTime" #tempTime>
              </div>
            </div>

            <!-- Photo Placeholders -->
            <div class="space-y-2">
              <label class="text-xs font-medium text-gray-500">Attach Photos (Mock)</label>
              <div class="h-24 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 bg-gray-50 active:bg-gray-100">
                <span class="material-icons">add_a_photo</span>
              </div>
            </div>

            <button 
              (click)="saveIllness(startDate.value, endDate.value, tempVal.value, tempTime.value)"
              class="w-full py-4 bg-primary-500 text-white rounded-xl font-bold shadow-soft active:scale-95 transition-transform"
            >
              Save Episode
            </button>
          </div>
        } @else {
          <!-- List View -->
          <div class="space-y-4">
            @for (episode of activeIllnesses(); track episode.id) {
              <div class="bg-white rounded-2xl p-5 shadow-soft border-l-4 border-primary-500">
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <span class="text-xs font-bold text-primary-600">{{ episode.startDate }}</span>
                    @if (episode.endDate) {
                      <span class="text-xs text-gray-500"> to {{ episode.endDate }}</span>
                    }
                  </div>
                  @if (episode.durationDays) {
                    <span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">{{ episode.durationDays }} days</span>
                  }
                </div>
                
                <h4 class="font-bold text-gray-800 mb-2">Symptoms</h4>
                <div class="flex flex-wrap gap-2 mb-4">
                  @for (symp of episode.symptoms; track symp) {
                    <span class="bg-red-50 text-red-600 text-xs px-3 py-1 rounded-full font-medium">{{ symp }}</span>
                  }
                </div>

                @if (episode.temperatureLogs.length > 0) {
                  <h4 class="font-bold text-gray-800 text-sm mb-2">Temperature Logs</h4>
                  <div class="space-y-1">
                    @for (log of episode.temperatureLogs; track log.timestamp) {
                      <div class="flex justify-between text-sm bg-gray-50 px-3 py-2 rounded-lg">
                        <span class="text-gray-600">{{ log.timestamp }}</span>
                        <span class="font-bold text-red-500">{{ log.temp }}°C</span>
                      </div>
                    }
                  </div>
                }
              </div>
            }
            @if (activeIllnesses().length === 0) {
              <div class="text-center py-10 text-gray-400">
                <span class="material-icons text-5xl mb-2 text-gray-300">fact_check</span>
                <p>No illness history for this child.</p>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class DiaryComponent {
  dataService = inject(DataService);
  showForm = signal(false);
  today = new Date().toISOString().split('T')[0];
  currentTime = new Date().toTimeString().slice(0, 5);
  
  availableSymptoms = ['Fever', 'Cough', 'Rash', 'Lethargy', 'Vomiting', 'Diarrhea'];
  selectedSymptoms = signal<string[]>([]);

  activeIllnesses = computed(() => {
    const activeId = this.dataService.activeChildId();
    return this.dataService.illnesses().filter(i => i.childId === activeId);
  });

  toggleSymptom(s: string) {
    const current = this.selectedSymptoms();
    if (current.includes(s)) {
      this.selectedSymptoms.set(current.filter(c => c !== s));
    } else {
      this.selectedSymptoms.set([...current, s]);
    }
  }

  saveIllness(start: string, end: string, tempRaw: string, tempTime: string) {
    const logs = [];
    if (tempRaw) {
      logs.push({ temp: parseFloat(tempRaw), timestamp: `${start}T${tempTime}` });
    }

    this.dataService.addIllness({
      startDate: start,
      endDate: end || undefined,
      durationDays: end ? Math.floor((new Date(end).getTime() - new Date(start).getTime()) / (1000 * 3600 * 24)) : undefined,
      symptoms: this.selectedSymptoms(),
      temperatureLogs: logs,
      medications: [], // skipped form input for brevity in mockup
      photoUrls: []
    });

    this.showForm.set(false);
    this.selectedSymptoms.set([]);
  }
}
