import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { I18nService } from '../../core/i18n/i18n.service';

@Component({
  selector: 'app-welcome-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (child()) {
      <div class="relative w-full rounded-3xl overflow-hidden shadow-soft mb-6 bg-gradient-to-br from-primary-500 via-primary-600 to-teal-500 text-white"
           style="background-size: 200% 200%; animation: gradientShift 8s ease infinite;">
        <!-- Background pattern -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-teal-300 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 animate-pulse" style="animation-delay: 2s;"></div>
        </div>

        <div class="relative z-10 px-8 py-8 flex items-center gap-6">
          <!-- Avatar -->
          <img
            [src]="avatarUrl()"
            [alt]="child()!.name"
            class="w-16 h-16 rounded-full border-4 border-white/30 object-cover shadow-lg flex-shrink-0 hover:scale-105 transition-transform duration-200 cursor-pointer"
          />

          <!-- Text content -->
          <div class="flex-1 min-w-0" [style.animation]="'fadeInUp 350ms ease-out both'">
            <p class="text-primary-100 text-sm font-medium mb-1 flex items-center gap-1.5">
              <span class="material-icons text-xs">{{ timeIcon() }}</span>
              {{ timeGreeting() }}
            </p>
            <h1 class="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              {{ greeting() }}
            </h1>
            <div class="flex items-center gap-2 mt-2">
              <span class="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold text-white border border-white/20">
                <span class="material-icons text-xs">cake</span>
                {{ ageText() }}
              </span>
            </div>
          </div>

          <!-- Date display -->
          <div class="hidden sm:flex flex-col items-end text-white/80" [style.animation]="'fadeInUp 350ms ease-out both'">
            <span class="text-xs font-medium opacity-70">{{ dayName() }}</span>
            <span class="text-lg font-bold text-white">{{ dateDisplay() }}</span>
          </div>

          <!-- Weather placeholder -->
          @if (weather()) {
            <div class="hidden md:flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm text-white/90">
              <span class="material-icons text-sm">wb_cloudy</span>
              <span>--°C</span>
            </div>
          }
        </div>
      </div>
    } @else {
      <!-- No child selected state -->
      <div class="w-full rounded-3xl overflow-hidden shadow-soft mb-6 bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200">
        <div class="px-8 py-10 flex flex-col items-center justify-center text-center">
          <!-- Warm illustration -->
          <div class="w-20 h-20 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center mb-5 shadow-md">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="20" r="10" fill="#6366F1" opacity="0.6"/>
              <circle cx="24" cy="20" r="6" fill="#6366F1" opacity="0.8"/>
              <path d="M14 38c0-6 4-10 10-10s10 4 10 10" stroke="#6366F1" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.5"/>
            </svg>
          </div>
          <h2 class="text-xl font-extrabold text-primary-700 mb-2">{{ noChildGreeting() }}</h2>
          <p class="text-sm text-primary-500 font-medium mb-4">{{ i18n.t()['home.welcome.subtitle'] }}</p>
          <button
            (click)="addFirstChild()"
            class="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
          >
            <span class="material-icons text-lg">add</span>
            {{ i18n.t()['home.addFirstChild'] }}
          </button>
        </div>
      </div>
    }
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class WelcomeHeroComponent {
  dataService = inject(DataService);
  i18n = inject(I18nService);

  weather = signal<{ icon: string; temp: number; location: string } | null>(null);

  child = computed(() => {
    const activeId = this.dataService.activeChildId();
    return this.dataService.children().find(c => c.id === activeId) ?? null;
  });

  avatarUrl = computed(() => {
    const c = this.child();
    if (!c) return '';
    return c.avatarUrl ?? `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(c.name)}`;
  });

  timeGreeting = computed(() => {
    const h = new Date().getHours();
    if (h >= 7 && h < 12) return this.i18n.t()['home.greeting.morning'];
    if (h >= 12 && h < 18) return this.i18n.t()['home.greeting.afternoon'];
    if (h >= 18 && h < 22) return this.i18n.t()['home.greeting.evening'];
    return this.i18n.t()['home.greeting.night']; // 22:00-06:59
  });

  timeIcon = computed(() => {
    const h = new Date().getHours();
    if (h >= 7 && h < 12) return 'wb_sunny';
    if (h >= 12 && h < 18) return 'wb_twilight';
    if (h >= 18 && h < 22) return 'nightlight_round';
    return 'bedtime'; // night
  });

  greeting = computed(() => {
    const c = this.child();
    if (!c) return '';
    const t = this.i18n.t();
    return t['home.welcome.greeting'].replace('{name}', c.name);
  });

  noChildGreeting = computed(() => {
    return this.i18n.t()['home.welcome.greetingNoChild'];
  });

  ageText = computed(() => {
    const c = this.child();
    if (!c) return '';
    const age = this.calcAge(c.dateOfBirth);
    const t = this.i18n.t();
    if (age.years > 0) {
      return t['home.welcome.ageYears'].replace('{n}', String(age.years));
    }
    return t['home.welcome.ageMonths'].replace('{n}', String(age.months));
  });

  dayName = computed(() => {
    const days = this.i18n.isSq()
      ? ['E diel', 'E hënë', 'E martë', 'E mërkurë', 'E enjte', 'E premte', 'E shtunë']
      : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  });

  dateDisplay = computed(() => {
    const d = new Date();
    if (this.i18n.isSq()) {
      return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    }
    return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
  });

  addFirstChild() {
    window.dispatchEvent(new CustomEvent('kiddok:navigate', { detail: 'settings' }));
  }

  private calcAge(dob: string): { years: number; months: number } {
    const birth = new Date(dob);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    if (months < 0) { years--; months += 12; }
    return { years, months };
  }
}