import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4 space-y-6 animate-fade-in pb-24">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-800">Status Overview</h2>
        <button class="w-10 h-10 bg-white rounded-full shadow-soft flex items-center justify-center text-primary-500">
          <span class="material-icons">notifications</span>
        </button>
      </div>

      <!-- Quick Stats Card -->
      <div class="bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-6 shadow-soft text-white">
        <div class="flex items-center gap-4 mb-6">
          <img [src]="activeChild()?.avatarUrl" class="w-16 h-16 rounded-full border-2 border-white/30 bg-white/10" alt="Avatar"/>
          <div>
            <h3 class="text-xl font-bold">{{ activeChild()?.name }}</h3>
            <p class="text-primary-100 text-sm">{{ activeChild()?.age }} years old</p>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <p class="text-xs text-primary-100 font-medium mb-1">Last Illness</p>
            <p class="font-bold truncate">{{ recentIllness()?.symptoms?.join(', ') || 'None recently' }}</p>
          </div>
          <div class="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <p class="text-xs text-primary-100 font-medium mb-1">Next Doc Visit</p>
            <p class="font-bold">Not scheduled</p>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <h3 class="text-lg font-bold text-gray-800 pt-2">Quick Actions</h3>
      <div class="grid grid-cols-2 gap-4">
        <button class="bg-white p-4 rounded-2xl shadow-soft flex flex-col items-center gap-2 active:scale-95 transition-transform">
          <div class="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
            <span class="material-icons">add_alert</span>
          </div>
          <span class="text-sm font-medium text-gray-700">Log Illness</span>
        </button>
        <button class="bg-white p-4 rounded-2xl shadow-soft flex flex-col items-center gap-2 active:scale-95 transition-transform">
          <div class="w-12 h-12 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
            <span class="material-icons">vaccines</span>
          </div>
          <span class="text-sm font-medium text-gray-700">Add Vaccine</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class HomeComponent {
  dataService = inject(DataService);
  activeChild = computed(() => {
    const activeId = this.dataService.activeChildId();
    return this.dataService.children().find(c => c.id === activeId);
  });
  
  recentIllness = computed(() => {
    const activeId = this.dataService.activeChildId();
    const illnesses = this.dataService.illnesses().filter(i => i.childId === activeId);
    return illnesses.length > 0 ? illnesses[0] : null;
  });
}
