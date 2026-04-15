import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-diary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="px-2">
      <!-- Feature Header -->
      <div class="flex items-center justify-between mb-8 flex-col sm:flex-row gap-4">
        <div>
           <h1 class="text-3xl font-extrabold text-gray-800 mb-1">Ditari Mjekësor</h1>
           <p class="text-gray-500 font-medium">Dokumentim i menjëhershëm i sëmundjeve sipas backend API.</p>
        </div>
        <button (click)="isAdding.set(true)" class="bg-slate-900 hover:bg-primary-600 text-white px-6 py-3.5 rounded-2xl font-bold shadow-soft transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
          <span class="material-icons text-sm">add_box</span> Shto Rast të Ri
        </button>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start relative">
        
        <!-- Add Panel -->
        @if (isAdding()) {
          <div class="glass p-8 rounded-3xl shadow-soft xl:col-span-1 animate-slide-up border border-white sticky top-4">
            <div class="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
               <h3 class="font-bold text-xl text-gray-800">Skedar i Ri</h3>
               <button (click)="isAdding.set(false)" class="text-gray-400 hover:text-gray-600 bg-gray-100 p-1.5 rounded-xl"><span class="material-icons">close</span></button>
            </div>
            
            <div class="space-y-5">
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">Sëmundja / Diagnoza</label>
                <input [(ngModel)]="fTitle" type="text" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all font-semibold" placeholder="Psh: Grip Sezonal">
              </div>
              
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">Simptomat</label>
                <textarea [(ngModel)]="fSymptoms" rows="2" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all resize-none text-gray-600 font-medium" placeholder="Ethe, Kolle..."></textarea>
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">Medikamentet</label>
                <input [(ngModel)]="fMedications" type="text" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-600 font-medium" placeholder="Paracetamol, Antibiotik.">
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">Data e Fillimit</label>
                <input [(ngModel)]="fDate" type="date" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-600 font-medium">
              </div>

              <button (click)="submit()" class="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold py-4 rounded-2xl mt-4 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                Ruaj në Databazë
              </button>
            </div>
          </div>
        }

        <!-- List Array -->
        <div class="space-y-5" [ngClass]="isAdding() ? 'xl:col-span-2' : 'xl:col-span-3'">
          @if (illnesses().length === 0) {
             <div class="text-center py-20 bg-white border border-dashed border-gray-200 rounded-3xl">
                <span class="material-icons text-6xl text-gray-300 font-light mb-4">healing</span>
                <p class="text-xl font-bold text-gray-700 mb-2">Ditari është mbajtur i pastër.</p>
                <p class="text-gray-500">Këtu do të shfaqet arkiva vizuale e rekordeve të ngarkuara.</p>
             </div>
          } @else {
             <div class="grid gap-6 items-start" [ngClass]="isAdding() ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'">
              @for (entry of illnesses(); track entry.id) {
                <div class="bg-white rounded-3xl p-6 shadow-soft border border-gray-100 hover:shadow-lg transition-shadow group relative overflow-hidden">
                  <div class="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-orange-400 to-red-400 opacity-60"></div>
                  
                  <div class="flex justify-between items-start mb-5 pt-3">
                     <h3 class="text-xl font-extrabold text-gray-800">{{ entry.title }}</h3>
                     <span class="text-[10px] font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full uppercase tracking-wider">{{ entry.loggedAt | date:'shortDate' }}</span>
                  </div>

                  <div class="space-y-4">
                     <div class="bg-slate-50 p-3 rounded-2xl">
                       <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Simptomat</p>
                       <p class="text-sm font-semibold text-gray-700">{{ entry.symptoms }}</p>
                     </div>
                     <div class="bg-slate-50 p-3 rounded-2xl">
                       <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Medikamentet</p>
                       <p class="text-sm font-semibold text-gray-700">{{ entry.medications }}</p>
                     </div>
                  </div>
                </div>
              }
             </div>
          }
        </div>

      </div>
    </div>
  `
})
export class DiaryComponent {
  dataService = inject(DataService);
  
  isAdding = signal(false);
  fTitle = '';
  fSymptoms = '';
  fMedications = '';
  fDate = new Date().toISOString().substring(0,10);

  illnesses() { return this.dataService.illnesses(); }

  submit() {
    if(this.fTitle && this.fSymptoms) {
       this.dataService.addIllness({
         title: this.fTitle,
         symptoms: this.fSymptoms,
         medications: this.fMedications,
         loggedAt: new Date(this.fDate).toISOString()
       });
       this.isAdding.set(false);
       this.fTitle = ''; this.fSymptoms = ''; this.fMedications = '';
    }
  }
}
