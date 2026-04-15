import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, ChildProfile } from '../services/data.service';
import { HomeComponent } from './home.component';
import { DiaryComponent } from './diary.component';
import { RecordsComponent } from './records.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, HomeComponent, DiaryComponent, RecordsComponent],
  template: `
    <div class="h-screen flex flex-col bg-background overflow-hidden relative">
      <!-- Top Header: Multi-Child Toggle -->
      <header class="bg-surface px-4 pt-8 pb-4 shadow-sm z-20 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="relative" (click)="showChildList.set(!showChildList())">
            <div class="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
              <img [src]="activeChild()?.avatarUrl" class="w-8 h-8 rounded-full border border-gray-200" alt="Active"/>
              <span class="font-semibold text-gray-800">{{ activeChild()?.name }}</span>
              <span class="material-icons text-gray-400 text-sm">expand_more</span>
            </div>
            
            <!-- Dropdown -->
            @if (showChildList()) {
              <div class="absolute top-12 left-0 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-fade-in z-50">
                @for (child of dataService.children(); track child.id) {
                  <div 
                    (click)="switchChild(child.id)"
                    class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <img [src]="child.avatarUrl" class="w-8 h-8 rounded-full" alt="avatar" />
                    <span class="font-medium text-gray-700">{{ child.name }}</span>
                    @if (child.id === dataService.activeChildId()) {
                      <span class="material-icons text-primary-500 ml-auto text-sm">check</span>
                    }
                  </div>
                }
              </div>
            }
          </div>
        </div>

        <button class="text-gray-400 hover:text-gray-600">
          <span class="material-icons">menu</span>
        </button>
      </header>

      <!-- Main Content Area based on Bottom Nav -->
      <main class="flex-1 overflow-y-auto relative">
        @switch (currentTab()) {
          @case ('home') { <app-home /> }
          @case ('diary') { <app-diary /> }
          @case ('records') { <app-records /> }
          @case ('settings') {
            <div class="p-6 flex flex-col items-center justify-center h-full text-gray-400">
               <span class="material-icons text-5xl mb-4">settings</span>
               <p>Settings Mockup</p>
               <button 
                 (click)="dataService.logout()"
                 class="mt-8 px-6 py-2 bg-red-50 text-red-600 rounded-full font-bold"
               >
                 Lock App
               </button>
            </div>
          }
        }
      </main>

      <!-- Bottom Navigation App-Like -->
      <nav class="absolute bottom-0 w-full bg-surface/90 backdrop-blur-md border-t border-gray-100 pb-safe pt-2 px-6 flex justify-between items-center z-20">
        @for (nav of navItems; track nav.id) {
          <button 
            (click)="currentTab.set(nav.id)"
            class="flex flex-col items-center gap-1 p-2 min-w-[64px] transition-colors"
            [ngClass]="currentTab() === nav.id ? 'text-primary-600' : 'text-gray-400 hover:text-gray-600'"
          >
            <span class="material-icons text-2xl transition-transform" [ngClass]="currentTab() === nav.id ? 'scale-110' : ''">
              {{ nav.icon }}
            </span>
            <span class="text-[10px] font-medium">{{ nav.label }}</span>
          </button>
        }
      </nav>
    </div>
  `,
  styles: [`
    .pb-safe { padding-bottom: env(safe-area-inset-bottom, 1rem); }
    .animate-fade-in { animation: fadeIn 0.2s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class ShellComponent {
  dataService = inject(DataService);
  showChildList = signal(false);
  
  navItems = [
    { id: 'home', icon: 'space_dashboard', label: 'Home' },
    { id: 'diary', icon: 'edit_document', label: 'Diary' },
    { id: 'records', icon: 'folder_shared', label: 'Records' },
    { id: 'settings', icon: 'settings', label: 'Settings' }
  ];
  currentTab = signal('home');

  activeChild() {
    const activeId = this.dataService.activeChildId();
    return this.dataService.children().find(c => c.id === activeId);
  }

  switchChild(id: string) {
    this.dataService.switchChild(id);
    this.showChildList.set(false);
  }
}
