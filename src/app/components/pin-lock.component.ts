import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-pin-lock', 
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-hero-pattern">
      <div class="glass rounded-3xl w-full max-w-5xl overflow-hidden flex shadow-soft animate-fade-in relative z-10 border border-white/40">
        
        <!-- Left Panel: Branding / Visual (Visible on md+) -->
        <div class="hidden md:flex flex-col w-1/2 p-12 bg-gradient-to-br from-primary-500 to-primary-900 text-white relative items-start justify-between min-h-[600px]">
          <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544605151-df1f87920404?auto=format&fit=crop&q=80')] opacity-20 bg-cover mix-blend-overlay"></div>
          
          <div class="z-10 relative">
            <div class="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur text-white mb-6 border border-white/20">
              <span class="material-icons text-3xl">child_care</span>
            </div>
            <h1 class="text-4xl font-bold tracking-tight mb-4 text-white">KidDok.</h1>
            <p class="text-primary-100 text-lg leading-relaxed">Kartelë mjekësore dixhitale. Rindërtuar për fuqinë e ekraneve të Mëdha Desktop, me databazën tuaj lokale API.</p>
          </div>

          <div class="z-10 relative glass border border-white/10 rounded-2xl p-6 mt-8 w-full hover:bg-white/10 transition-colors">
            <div class="flex items-center gap-4 mb-2">
              <span class="material-icons text-teal-400 text-3xl">shield</span>
              <h3 class="font-semibold text-xl text-white">100% e Sigurtë</h3>
            </div>
            <p class="text-primary-100/90 text-sm">Të dhënat tuaja udhëtojnë përmes urave të mbrojtura me teknologjinë NestJS, të strehuara tek PostgreSQL.</p>
          </div>
        </div>

        <!-- Right Panel: Auth Form -->
        <div class="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center bg-white/80">
          <h2 class="text-3xl font-bold text-gray-800 mb-2">{{ isRegister() ? 'Krijoni llogarinë' : 'Mirësevini!' }}</h2>
          <p class="text-gray-500 mb-10">{{ isRegister() ? 'Bashkohuni duke u regjistruar.' : 'Hyni në llogarinë tuaj në Backend.' }}</p>

          <form class="space-y-6 animate-slide-up" (submit)="$event.preventDefault(); submit()">
            @if (isRegister()) {
              <div class="animate-fade-in text-left">
                <label class="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Emri i Plotë</label>
                <input [value]="name()" (input)="name.set($any($event.target).value)"
                       type="text" class="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800" placeholder="Përfshini mbiemrin (Opsionale)">
              </div>
            }

            <div class="text-left">
              <label class="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Adresa Email</label>
              <input [value]="email()" (input)="email.set($any($event.target).value)"
                     type="email" class="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800" placeholder="admin@kiddok.al">
            </div>

            <div class="text-left">
              <label class="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Fjalëkalimi i Fuqishëm</label>
              <input [value]="password()" (input)="password.set($any($event.target).value)"
                     type="password" class="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800" placeholder="********">
            </div>

            @if (errorMsg()) {
              <div class="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 animate-fade-in text-left">
                  <span class="material-icons text-red-500">error_outline</span>
                  <p class="text-red-600 text-sm font-medium">{{ errorMsg() }}</p>
              </div>
            }
            
            @if (successMsg()) {
              <div class="p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3 animate-fade-in text-left">
                  <span class="material-icons text-green-500">check_circle</span>
                  <p class="text-green-700 text-sm font-medium">{{ successMsg() }}</p>
              </div>
            }

            <button type="submit" [disabled]="loading() || (!email() || !password())"
                    class="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 rounded-2xl transition-all shadow-md transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:transform-none mt-2">
              {{ loading() ? 'Duke përpunuar...' : (isRegister() ? 'Regjistruko' : 'Hyr në Databazë') }}
            </button>
          </form>

          <div class="mt-8 text-center border-t border-gray-100 pt-6">
            <button (click)="toggleMode()" class="text-slate-500 hover:text-primary-600 transition-colors font-medium text-sm">
              {{ isRegister() ? 'Keni llogari? Hyni këtu.' : 'Nuk keni ende llogari? Krijoni një!' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PinLockComponent {
  dataService = inject(DataService);
  http = inject(HttpClient);
  
  isRegister = signal(false);
  loading = signal(false);
  errorMsg = signal('');
  successMsg = signal('');

  email = signal('');
  password = signal('');
  name = signal('');

  toggleMode() {
    this.isRegister.set(!this.isRegister());
    this.errorMsg.set('');
    this.successMsg.set('');
  }

  submit() {
    this.loading.set(true);
    this.errorMsg.set('');
    
    if (this.isRegister()) {
      this.http.post(`${environment.apiUrl}/auth/register`, {
        email: this.email(),
        password: this.password(),
        name: this.name()
      }).subscribe({
        next: () => {
          this.successMsg.set('Llogaria juaj u krijua! Ngarkuar në sekondë në PostgreSQL. Tani logohuni.');
          this.isRegister.set(false);
          this.loading.set(false);
        },
        error: (err) => {
          this.errorMsg.set(err.error?.message || 'Gabim gjatë lidhjes. A i bëtë run backendit?');
          this.loading.set(false);
        }
      });
    } else {
      this.http.post<any>(`${environment.apiUrl}/auth/login`, {
        email: this.email(),
        password: this.password()
      }).subscribe({
        next: (res) => {
          localStorage.setItem('kiddok_access_token', res.access_token);
          this.dataService.isAuthenticated.set(true); 
          this.loading.set(false);
          
          if(this.dataService.loadChildrenFromAPI) {
            this.dataService.loadChildrenFromAPI();
          }
        },
        error: (err) => {
          this.errorMsg.set(err.error?.message || 'Të dhënat janë të pasakta sipas databazës JWT.');
          this.loading.set(false);
        }
      });
    }
  }
}
