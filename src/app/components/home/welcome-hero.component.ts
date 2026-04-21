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
      <div class="relative w-full rounded-3xl overflow-hidden shadow-soft mb-6 bg-gradient-to-br from-primary-500 via-primary-600 to-teal-500 text-white">
        <!-- Background pattern -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-teal-300 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
        </div>
        
        <div class="relative z-10 px-8 py-8 flex items-center gap-6">
          <!-- Avatar -->
          <img 
            [src]="avatarUrl()" 
            [alt]="child()!.name"
            class="w-16 h-16 rounded-full border-4 border-white/30 object-cover shadow-lg flex-shrink-0 hover:scale-105 transition-transform duration-200 cursor-pointer"
          />
          
          <!-- Text content -->
          <div class="flex-1 min-w-0">
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
          <div class="hidden sm:flex flex-col items-end text-white/80">
            <span class="text-xs font-medium opacity-70">{{ dayName() }}</span>
            <span class="text-lg font-bold text-white">{{ dateDisplay() }}</span>
          </div>
        </div>
      </div>
    } @else {
      <!-- No child selected state -->
      <div class="w-full rounded-3xl overflow-hidden shadow-soft mb-6 border-2 border-dashed border-primary-200 bg-primary-50/50">
        <div class="px-8 py-8 flex flex-col items-center justify-center text-center">
          <div class="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
            <span class="material-icons text-3xl text-primary-400">child_care</span>
          </div>
          <h2 class="text-xl font-extrabold text-primary-700 mb-1">{{ noChildGreeting() }}</h2>
          <p class="text-sm text-primary-500 font-medium">{{ i18n.t()['home.welcome.addChild'] }}</p>
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
    if (h < 12) return this.i18n.t()['home.welcome.morning'];
    if (h < 18) return this.i18n.t()['home.welcome.afternoon'];
    return this.i18n.t()['home.welcome.evening'];
  });

  timeIcon = computed(() => {
    const h = new Date().getHours();
    if (h < 12) return 'wb_sunny';
    if (h < 18) return 'wb_twilight';
    return 'nightlight_round';
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

  private calcAge(dob: string): { years: number; months: number } {
    const birth = new Date(dob);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    if (months < 0) { years--; months += 12; }
    return { years, months };
  }
}