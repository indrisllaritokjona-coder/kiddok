import { Routes } from '@angular/router';
import { ShellComponent } from './components/shell.component';
import { PinLockComponent } from './components/pin-lock.component';

export const routes: Routes = [
  { path: 'login', component: PinLockComponent },
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('./components/home.component').then(m => m.HomeComponent) },
      { path: 'diary', loadComponent: () => import('./components/diary.component').then(m => m.DiaryComponent) },
      { path: 'temperature', loadComponent: () => import('./components/temperature-diary.component').then(m => m.TemperatureDiaryComponent) },
      { path: 'growth', loadComponent: () => import('./components/growth-tracking.component').then(m => m.GrowthTrackingComponent) },
      { path: 'records', loadComponent: () => import('./components/records.component').then(m => m.RecordsComponent) },
      { path: 'vaccines', loadComponent: () => import('./components/vaccines.component').then(m => m.VaccinesComponent) },
      { path: 'medications', loadComponent: () => import('./components/medications/medications.component').then(m => m.MedicationsComponent) },
      { path: 'appointments', loadComponent: () => import('./components/appointments/appointments.component').then(m => m.AppointmentsComponent) },
      { path: 'lab-results', loadComponent: () => import('./components/lab-results/lab-results.component').then(m => m.LabResultsComponent) },
      { path: 'analytics', loadComponent: () => import('./components/analytics.component').then(m => m.AnalyticsComponent) },
      { path: 'settings', loadComponent: () => import('./components/settings/settings-page.component').then(m => m.SettingsPageComponent) },
    ],
  },
  { path: '**', redirectTo: '/login' },
];