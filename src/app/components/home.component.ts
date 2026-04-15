import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="px-2">
      <!-- Welcome Hero -->
      <div class="relative w-full rounded-3xl overflow-hidden shadow-soft mb-8 bg-gradient-to-r from-primary-600 to-teal-500 text-white p-8 lg:p-12 border border-primary-500">
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80')] opacity-20 mix-blend-overlay bg-cover bg-center"></div>
        <div class="relative z-10 flex flex-col justify-center h-full">
          <h1 class="text-3xl lg:text-4xl font-extrabold mb-2 text-white">Përmbledhja Mjekësore</h1>
          <p class="text-primary-100 text-lg font-medium max-w-xl">Shikoni pasqyrën tuaj. Më poshtë keni statistikat dhe ecurinë e <span class="font-bold text-white">{{ activeChild()?.name || 'Fëmijës' }}</span>.</p>
        </div>
        <div class="absolute right-0 bottom-0 p-8 hidden md:block">
           <div class="w-40 h-40 bg-white/20 backdrop-blur-md rounded-full absolute -right-10 -bottom-10 blur-3xl"></div>
           <span class="material-icons opacity-40 text-[140px] mix-blend-overlay relative">favorite</span>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <div class="glass p-8 group hover:-translate-y-1 transition-all duration-300">
          <div class="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-5 shadow-sm border border-orange-100">
            <span class="material-icons text-3xl transition-transform group-hover:scale-110">local_hospital</span>
          </div>
          <p class="text-gray-500 font-bold mb-1 uppercase text-xs tracking-wider">Evente të Sëmundjeve</p>
          <div class="flex items-end gap-2 text-gray-800">
            <h3 class="text-5xl font-black tracking-tight">{{ illnesses().length }}</h3>
            <span class="text-sm text-gray-400 font-semibold mb-1.5">regjistrime</span>
          </div>
        </div>

        <div class="glass p-8 group hover:-translate-y-1 transition-all duration-300">
          <div class="w-14 h-14 rounded-2xl bg-teal-50 text-teal-500 flex items-center justify-center mb-5 shadow-sm border border-teal-100">
            <span class="material-icons text-3xl transition-transform group-hover:scale-110">vaccines</span>
          </div>
          <p class="text-gray-500 font-bold mb-1 uppercase text-xs tracking-wider">Vaksina të Regjistruara</p>
          <div class="flex items-end gap-2 text-gray-800">
            <h3 class="text-5xl font-black tracking-tight">{{ records().length }}</h3>
            <span class="text-sm text-gray-400 font-semibold mb-1.5">totali</span>
          </div>
        </div>

        <div class="glass p-8 group hover:-translate-y-1 transition-all duration-300">
          <div class="w-14 h-14 rounded-2xl bg-primary-50 text-primary-500 flex items-center justify-center mb-5 shadow-sm border border-primary-100">
            <span class="material-icons text-3xl transition-transform group-hover:scale-110">cake</span>
          </div>
          <p class="text-gray-500 font-bold mb-1 uppercase text-xs tracking-wider">Koha e Plotë</p>
          <div class="mt-2 text-gray-800">
            @if(activeChild()) {
               <h3 class="text-3xl font-black tracking-tight">{{ activeChild()?.dateOfBirth | date:'yyyy' }}</h3>
               <span class="text-sm text-gray-400 font-semibold mb-1.5">Viti i Lindjes</span>
            } @else {
               <h3 class="text-xl font-black opacity-50">-</h3>
               <span class="text-xs text-gray-400">Të dhëna bosh</span>
            }
          </div>
        </div>
      </div>

      <!-- Dual Info Dashboard -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div class="bg-white rounded-3xl p-8 shadow-soft border border-gray-100 relative">
           <h3 class="text-xl font-extrabold text-gray-800 mb-6 flex items-center gap-3">
             <span class="material-icons text-orange-400 bg-orange-50 p-2 rounded-xl">history</span> 
             Historiku i Ecurisë
           </h3>
           
           @if (illnesses().length === 0) {
             <div class="py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-center">
               <span class="material-icons text-gray-300 text-5xl mb-3">check_circle_outline</span>
               <p class="text-gray-500 font-semibold">Të gjitha të dhënat janë të pastra.</p>
             </div>
           } @else {
             <div class="space-y-4">
               @for (i of illnesses() | slice:0:3; track i.id) {
                 <div class="flex p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                   <div class="mr-5 mt-1 bg-orange-50 p-3 rounded-xl text-orange-500 border border-orange-100">
                      <span class="material-icons">sick</span>
                   </div>
                   <div>
                     <h4 class="font-bold text-gray-800 text-lg mb-1">{{ i.title }}</h4>
                     <p class="text-xs text-gray-400 font-bold mb-2 uppercase tracking-wide">{{ i.loggedAt | date:'mediumDate' }}</p>
                     <p class="text-sm text-gray-600 font-medium">Simptomat: <span class="text-gray-800">{{ i.symptoms }}</span></p>
                   </div>
                 </div>
               }
             </div>
           }
        </div>

        <div class="bg-white rounded-3xl p-8 shadow-soft border border-gray-100 relative overflow-hidden">
           <div class="absolute -right-20 -top-20 w-64 h-64 bg-teal-50 rounded-full blur-[80px]"></div>
           
           <h3 class="text-xl font-extrabold text-gray-800 mb-6 flex items-center gap-3 relative z-10">
             <span class="material-icons text-teal-500 bg-teal-50 p-2 rounded-xl">next_plan</span> 
             Dosja Konfidenciale
           </h3>

           @if (records().length === 0) {
             <div class="py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-center relative z-10">
               <span class="material-icons text-gray-300 text-5xl mb-3">folder_open</span>
               <p class="text-gray-500 font-semibold">Dritarja juaj e vaksinave.</p>
             </div>
           } @else {
             <div class="space-y-4 relative z-10">
               @for (v of records() | slice:0:3; track v.id) {
                 <div class="flex items-center justify-between p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                   <div>
                     <h4 class="font-bold text-gray-800 text-lg flex items-center gap-2 mb-1">
                       {{ v.title }}
                       @if(v.completed) {
                         <span class="material-icons text-base text-green-500">verified</span>
                       }
                     </h4>
                     <p class="text-xs font-bold text-gray-400 tracking-wide uppercase">Caktuar: {{ v.dueDate | date:'mediumDate' }}</p>
                   </div>
                   <div class="w-12 h-12 rounded-full flex items-center justify-center border" [ngClass]="v.completed ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-50 text-slate-500 border-slate-200'">
                      <span class="material-icons">{{ v.completed ? 'check' : 'hourglass_empty' }}</span>
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
export class HomeComponent {
  dataService = inject(DataService);

  activeChild() { return this.dataService.children().find(c => c.id === this.dataService.activeChildId()); }
  illnesses() { return this.dataService.illnesses(); }
  records() { return this.dataService.records(); }
}
