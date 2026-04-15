import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, ChildProfile } from '../services/data.service';
import { HomeComponent } from './home.component';
import { DiaryComponent } from './diary.component';
import { RecordsComponent } from './records.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, FormsModule, HomeComponent, DiaryComponent, RecordsComponent],
  template: `
    <div class="h-screen flex bg-background overflow-hidden relative font-sans">
      
      <!-- Desktop Sidebar (Glassmorphism) -->
      <aside class="w-72 glass-dark hidden lg:flex flex-col m-5 mr-0 z-20 text-white relative overflow-hidden shadow-2xl">
        <div class="absolute inset-0 bg-gradient-to-bl from-primary-600/90 via-primary-800/90 to-primary-900/95 mix-blend-multiply"></div>
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=500&q=60')] bg-cover opacity-10 mix-blend-overlay"></div>
        
        <div class="relative z-10 flex flex-col h-full p-6">
          <div class="flex items-center gap-4 mb-14 mt-4 ml-2">
            <div class="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md border border-white/20 shadow-glass">
              <span class="material-icons text-3xl text-white">child_care</span>
            </div>
            <span class="text-3xl font-extrabold tracking-tight">KidDok<span class="text-teal-400">.</span></span>
          </div>

          <nav class="flex-1 space-y-3">
            @for (nav of navItems; track nav.id) {
              <button 
                (click)="currentTab.set(nav.id)"
                class="w-full flex items-center gap-5 px-5 py-4 rounded-2xl transition-all duration-300 group"
                [ngClass]="currentTab() === nav.id ? 'bg-white/10 border border-white/20 shadow-glass translate-x-2' : 'hover:bg-white/5 hover:translate-x-1 border border-transparent'"
              >
                <span class="material-icons transition-transform duration-300" [ngClass]="currentTab() === nav.id ? 'text-teal-300 scale-110' : 'text-primary-200 group-hover:text-white'">
                  {{ nav.icon }}
                </span>
                <span class="font-semibold text-[17px] tracking-wide" [ngClass]="currentTab() === nav.id ? 'text-white' : 'text-primary-100 group-hover:text-white'">{{ nav.label }}</span>
                @if (currentTab() === nav.id) {
                  <span class="material-icons ml-auto text-teal-300 text-sm">chevron_right</span>
                }
              </button>
            }
          </nav>

          <div class="mt-auto">
            <button (click)="dataService.logout()" class="w-full flex items-center justify-center gap-3 px-5 py-4 rounded-2xl border border-red-400/30 text-red-300 hover:bg-red-500/20 hover:text-red-100 transition-all font-semibold hover:border-red-400/50">
              <span class="material-icons">logout</span>
              Dil nga Sistemi
            </button>
          </div>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="flex-1 flex flex-col h-screen overflow-hidden relative relative z-10 w-full">
        
        <!-- Top Header for Desktop & Mobile -->
        <header class="px-6 py-5 lg:px-10 lg:py-7 flex items-center justify-between lg:justify-end border-b border-gray-200/50 bg-white/60 backdrop-blur-xl z-30 shadow-sm">
          
          <!-- Mobile Menu Button -->
          <button class="lg:hidden p-2 rounded-xl bg-white shadow-soft border border-gray-100">
            <span class="material-icons text-gray-700">menu</span>
          </button>

          <!-- Child Profile Switcher -->
          <div class="flex items-center gap-4 lg:gap-8">
            
            <div class="relative">
              <button (click)="showChildList.set(!showChildList())" 
                      class="flex items-center gap-3 bg-white px-4 py-2 lg:py-2.5 rounded-2xl shadow-soft border border-gray-100 hover:border-primary-300 hover:shadow-md transition-all">
                @if (activeChild()) {
                  <img [src]="activeChild()?.avatarUrl" class="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-primary-100 object-cover" />
                  <span class="font-bold text-gray-800 hidden sm:block text-sm lg:text-base">{{ activeChild()?.name }}</span>
                } @else {
                  <div class="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300"><span class="material-icons text-gray-400 text-sm">person</span></div>
                  <span class="font-bold text-gray-500 hidden sm:block">Shto Fëmijën</span>
                }
                <span class="material-icons text-gray-400 text-sm transition-transform" [class.rotate-180]="showChildList()">expand_more</span>
              </button>
              
              <!-- Dropdown -->
              @if (showChildList()) {
                <div class="absolute right-0 top-16 lg:top-20 w-80 bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 py-3 animate-slide-up z-50 overflow-hidden">
                  <div class="px-5 pb-3 pt-1 mb-2 border-b border-gray-50 flex items-center gap-2">
                     <span class="material-icons text-primary-500 text-sm">family_restroom</span>
                     <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Profili i Fëmijës</span>
                  </div>
                  @for (child of dataService.children(); track child.id) {
                    <div (click)="switchChild(child.id)"
                         class="flex items-center gap-4 px-5 py-3 hover:bg-primary-50 cursor-pointer transition-colors m-2 mt-0 rounded-2xl border border-transparent hover:border-primary-100 group">
                      <img [src]="child.avatarUrl" class="w-12 h-12 rounded-full border border-gray-200 shadow-sm" />
                      <div class="flex flex-col">
                        <span class="font-extrabold text-gray-800 group-hover:text-primary-700 transition-colors">{{ child.name }}</span>
                        <span class="text-xs text-gray-500 font-medium">Lindur: {{ child.dateOfBirth | date:'shortDate' }}</span>
                      </div>
                      @if (child.id === dataService.activeChildId()) {
                        <span class="material-icons text-teal-500 ml-auto bg-teal-50 rounded-full p-1">check</span>
                      }
                    </div>
                  }
                  
                  <div class="px-4 pt-3 mt-1 border-t border-gray-50">
                    <button (click)="isAddingChild.set(true); showChildList.set(false)" class="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold transition-colors border border-slate-200 hover:border-slate-300">
                      <span class="material-icons text-base">add_circle_outline</span> Shto Pjestar të Ri
                    </button>
                  </div>
                </div>
              }
            </div>

            <!-- Parent Admin -->
            <div class="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-tr from-primary-500 to-teal-400 p-[2px] shadow-soft cursor-pointer hover:shadow-lg transition-shadow">
              <div class="w-full h-full bg-white rounded-full flex items-center justify-center border-2 border-white">
                <span class="material-icons text-gray-700 lg:text-xl text-lg">manage_accounts</span>
              </div>
            </div>

          </div>
        </header>

        <!-- Main Workspace -->
        <div class="flex-1 overflow-y-auto w-full px-4 pt-6 pb-24 lg:px-12 lg:py-10 bg-slate-50/50 relative">
          
          @if(dataService.children().length === 0 && !isAddingChild()) {
            <div class="h-full flex flex-col items-center justify-center text-center animate-slide-up max-w-lg mx-auto">
              <div class="w-40 h-40 bg-gradient-to-tr from-primary-100 to-teal-50 text-primary-500 rounded-full flex items-center justify-center mb-10 shadow-glass border border-white">
                <span class="material-icons text-[80px] opacity-80">celebration</span>
              </div>
              <h2 class="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">Mirësevini në KidDok</h2>
              <p class="text-gray-500 text-lg mb-10 leading-relaxed">Ky është laboratori juaj dixhital. Gjithçka është gati dhe e lidhur me bazën e të dhënave. Shtoni profilin e parë për të nisur!</p>
              <button (click)="isAddingChild.set(true)" class="bg-slate-900 hover:bg-primary-600 text-white px-10 py-5 rounded-2xl font-bold shadow-[0_10px_20px_rgba(0,0,0,0.1)] transition-all transform hover:-translate-y-1 flex items-center gap-3 text-lg w-full sm:w-auto justify-center">
                <span class="material-icons bg-white/20 rounded-full p-1">add</span> Regjistro Profilin e Fëmijës
              </button>
            </div>
          } @else if (isAddingChild()) {
            <div class="glass max-w-3xl mx-auto rounded-[2rem] p-8 lg:p-12 animate-slide-up shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white">
              <h2 class="text-3xl font-extrabold text-gray-800 mb-8 flex items-center gap-4">
                <span class="material-icons text-primary-500 bg-primary-50 p-3 rounded-2xl">person_add_alt_1</span> 
                Shtoni Profil të Ri
              </h2>
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2 ml-1">Emri i Fëmijës</label>
                  <input type="text" [(ngModel)]="newChildName" class="w-full px-5 py-4.5 rounded-2xl bg-white border border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all shadow-sm font-semibold text-lg" placeholder="Përfshini emrin dhe mbiemrin">
                </div>
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2 ml-1">Datëlindja</label>
                  <input type="date" [(ngModel)]="newChildDob" class="w-full px-5 py-4.5 rounded-2xl bg-white border border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-600 shadow-sm font-semibold text-lg">
                </div>
                <div class="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-100 mt-4">
                  <button (click)="submitNewChild()" class="flex-1 bg-gradient-to-r from-primary-600 to-primary-500 text-white py-4.5 rounded-2xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-lg">
                    <span class="material-icons">save</span> Ruaj në Databazë
                  </button>
                  <button (click)="isAddingChild.set(false)" class="px-10 py-4.5 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-colors text-lg">Anulo</button>
                </div>
              </div>
            </div>
          } @else {
            <div class="animate-fade-in h-full">
              @switch (currentTab()) {
                @case ('home') { <app-home /> }
                @case ('diary') { <app-diary /> }
                @case ('records') { <app-records /> }
                @case ('settings') {
                  <div class="px-8 py-20 text-center glass rounded-3xl mt-10 max-w-2xl mx-auto border border-dashed border-gray-300">
                    <span class="material-icons text-[80px] text-gray-300 mb-6 drop-shadow-sm">construction</span>
                    <h2 class="text-3xl font-extrabold text-gray-700 mb-3 tracking-tight">Konfigurime Sistemi</h2>
                    <p class="text-gray-500 text-lg">Ky modul do të bëhet i disponueshëm gjatë përditësimeve Premium.</p>
                  </div>
                }
              }
            </div>
          }

        </div>

      </main>

      <!-- Bottom Nav (Mobile) -->
      <nav class="lg:hidden absolute bottom-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-200 pb-safe pt-2 px-6 flex justify-around items-center z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
        @for (nav of navItems; track nav.id) {
          <button 
            (click)="currentTab.set(nav.id)"
            class="flex flex-col items-center gap-1.5 p-2 transition-all relative"
            [ngClass]="currentTab() === nav.id ? 'text-primary-600' : 'text-slate-400 hover:text-slate-600'"
          >
            @if (currentTab() === nav.id) {
              <div class="absolute -top-2.5 w-10 h-1 bg-gradient-to-r from-primary-500 to-teal-400 rounded-b-full"></div>
            }
            <span class="material-icons text-[26px] transition-transform" [ngClass]="currentTab() === nav.id ? 'scale-110 mb-0.5' : ''">
              {{ nav.icon }}
            </span>
            <span class="text-[11px] font-bold tracking-wide">{{ nav.label }}</span>
          </button>
        }
      </nav>

    </div>
  `,
  styles: [`
    .pb-safe { padding-bottom: env(safe-area-inset-bottom, 1rem); }
  `]
})
export class ShellComponent {
  dataService = inject(DataService);
  showChildList = signal(false);
  isAddingChild = signal(false);
  
  newChildName = '';
  newChildDob = '';

  navItems = [
    { id: 'home', icon: 'dashboard', label: 'Ekrani Kryesor' },
    { id: 'diary', icon: 'edit_document', label: 'Ditari Mjekësor' },
    { id: 'records', icon: 'vaccines', label: 'Dosja & Vaksinat' },
    { id: 'settings', icon: 'settings', label: 'Konfigurime' }
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

  submitNewChild() {
    if(this.newChildName && this.newChildDob) {
       this.dataService.addChild(this.newChildName, this.newChildDob);
       this.isAddingChild.set(false);
       this.newChildName = '';
       this.newChildDob = '';
    }
  }
}
