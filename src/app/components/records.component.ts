import { Component, inject, signal } from '@angular/core'
import { LucideAngularModule } from 'lucide-angular';

import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-records',
    imports: [CommonModule, FormsModule, LucideAngularModule],
    template: `
    <div class="px-2">
       <div class="flex items-center justify-between mb-8 flex-col sm:flex-row gap-4">
        <div>
           <h1 class="text-3xl font-extrabold text-gray-800 mb-1">Dosja e Vaksinave</h1>
           <p class="text-gray-500 font-medium">Kalendari zyrtar i mjekimeve dhe rekomandimeve të mjekut.</p>
        </div>
        <button (click)="isAdding.set(true)" class="bg-slate-900 hover:bg-primary-600 text-white px-6 py-3.5 rounded-2xl font-bold shadow-soft transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
          <lucide-icon name="calendar-clock" class="text-inherit"></lucide-icon> Shto Dokument i Ri
        </button>
      </div>

       <div class="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start relative">
        
        <!-- Add Panel -->
        @if (isAdding()) {
          <div class="bg-white p-8 rounded-3xl shadow-soft xl:col-span-1 animate-slide-up border border-gray-100 sticky top-4">
            <div class="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
               <h3 class="font-bold text-xl text-gray-800">Skeda e Vaksinimit</h3>
               <button (click)="isAdding.set(false)" class="text-gray-500 hover:text-gray-600 bg-gray-100 p-1.5 rounded-xl"><lucide-icon name="x" class="text-inherit"></lucide-icon></button>
            </div>
            
            <div class="space-y-5">
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">Emërtimi / Përshkrimi</label>
                <input [(ngModel)]="fTitle" type="text" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all font-semibold" placeholder="Psh: Vaksina MMR II">
              </div>
              
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">Kryerja është...</label>
                <div class="flex gap-4">
                  <label class="flex-1 cursor-pointer flex items-center p-3 rounded-2xl border" [ngClass]="fCompleted ? 'border-primary-500 bg-primary-50' : 'border-gray-200 bg-slate-50'">
                    <input type="radio" [value]="true" [(ngModel)]="fCompleted" class="hidden">
                    <lucide-icon name="check-circle" class="text-inherit"></lucide-icon> <span class="font-bold text-sm text-gray-700">Përfunduar</span>
                  </label>
                  <label class="flex-1 cursor-pointer flex items-center p-3 rounded-2xl border" [ngClass]="!fCompleted ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-slate-50'">
                    <input type="radio" [value]="false" [(ngModel)]="fCompleted" class="hidden">
                    <lucide-icon name="clock" class="text-inherit"></lucide-icon> <span class="font-bold text-sm text-gray-700">Në Pritje</span>
                  </label>
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">Data e Planifikimit/Bërjes</label>
                <input [(ngModel)]="fDate" type="date" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-600 font-medium">
              </div>

              <button (click)="submit()" class="w-full bg-gradient-to-r from-teal-500 to-teal-400 text-white font-bold py-4 rounded-2xl mt-4 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                Përditëso Dosjen
              </button>
            </div>
          </div>
        }

        <!-- List Array -->
        <div class="space-y-4" [ngClass]="isAdding() ? 'xl:col-span-2' : 'xl:col-span-3'">
          @if (records().length === 0) {
             <div class="text-center py-20 bg-white border border-dashed border-gray-200 rounded-3xl">
                <lucide-icon name="folder-open" class="text-inherit"></lucide-icon>
                <p class="text-xl font-bold text-gray-700 mb-2">Asnjë e dhënë laboratorike.</p>
                <p class="text-gray-500">Regjistro të paktën një vaksinë ose vizitë te mjeku.</p>
             </div>
          } @else {
             <!-- Use a sleek grid layout -->
             <div class="grid gap-6 items-start" [ngClass]="isAdding() ? 'grid-cols-1 2xl:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'">
              @for (entry of records(); track entry.id) {
                <div class="bg-white rounded-3xl p-6 shadow-sm border hover:border-teal-200 hover:shadow-md transition-all group relative" [ngClass]="entry.completed ? 'border-gray-100' : 'border-orange-100 bg-orange-50/10'">
                  <div class="flex gap-4">
                     <!-- Icon Box -->
                     <div class="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center border" [ngClass]="entry.completed ? 'bg-teal-50 text-teal-500 border-teal-100' : 'bg-orange-50 text-orange-500 border-orange-100'">
                       <lucide-icon [name]="entry.completed ? 'check-circle-2' : 'hourglass'" class="text-3xl"></lucide-icon>
                     </div>
                     
                     <div class="flex-1 mt-1">
                       <h3 class="text-lg font-extrabold text-gray-800 leading-tight mb-1">{{ entry.title }}</h3>
                       <p class="text-sm font-semibold" [ngClass]="entry.completed ? 'text-teal-600' : 'text-orange-600'">
                         {{ entry.dueDate | date:'longDate' }}
                       </p>
                     </div>
                  </div>
                  
                  <!-- Tag indicator -->
                  <div class="absolute right-4 top-4">
                     @if(entry.completed) {
                       <span class="bg-teal-50 text-teal-600 px-3 py-1 rounded-full text-xs font-bold border border-teal-200/50">Kryer</span>
                     } @else {
                       <span class="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-orange-200/50">
                         Në plan
                       </span>
                     }
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
export class RecordsComponent {
  dataService = inject(DataService);

  isAdding = signal(false);
  fTitle = '';
  fCompleted = true;
  fDate = new Date().toISOString().substring(0,10);

  records() { return this.dataService.records(); }

  submit() {
    if(this.fTitle) {
       this.dataService.addVaccine({
         title: this.fTitle,
         completed: this.fCompleted,
         dueDate: new Date(this.fDate).toISOString()
       });
       this.isAdding.set(false);
       this.fTitle = '';
       this.fCompleted = true;
    }
  }
}
