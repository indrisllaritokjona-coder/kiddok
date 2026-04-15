import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full bg-background flex flex-col pb-24">
      <div class="bg-surface px-6 py-4 shadow-soft sticky top-0 z-10">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Medical Records</h2>
        
        <!-- Tabs -->
        <div class="flex gap-2 bg-gray-100 p-1 rounded-xl">
          @for (tab of tabs; track tab) {
            <button 
              (click)="activeTab.set(tab)"
              class="flex-1 py-2 text-sm font-medium text-center rounded-lg transition-colors"
              [ngClass]="activeTab() === tab ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
            >
              {{ tab }}
            </button>
          }
        </div>
      </div>

      <div class="p-4 flex-1 overflow-y-auto hide-scrollbar">
        <div class="space-y-4">
          @for (record of filteredRecords(); track record.id) {
            <div class="bg-white p-5 rounded-2xl shadow-soft">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-primary-50 text-primary-500 flex items-center justify-center">
                    <span class="material-icons">
                      {{ record.type === 'Vaccine' ? 'vaccines' : (record.type === 'Lab' ? 'science' : 'medical_information') }}
                    </span>
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-800">{{ record.title }}</h4>
                    <p class="text-xs text-gray-500">{{ record.date }}</p>
                  </div>
                </div>
              </div>
              <p class="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">{{ record.notes }}</p>
            </div>
          }

          @if (filteredRecords().length === 0) {
            <div class="text-center py-10 text-gray-400">
              <span class="material-icons text-5xl mb-2 text-gray-300">folder_open</span>
              <p>No {{ activeTab() }} records found.</p>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class RecordsComponent {
  dataService = inject(DataService);
  tabs = ['Vaccine', 'Lab', 'Recommendation'];
  activeTab = signal('Vaccine');

  filteredRecords = computed(() => {
    const activeId = this.dataService.activeChildId();
    return this.dataService.records().filter(r => r.childId === activeId && r.type === this.activeTab());
  });
}
