import { Routes } from '@angular/router';
import { ShellComponent } from './components/shell.component';
import { PinLockComponent } from './components/pin-lock.component';

export const routes: Routes = [
  { path: 'login', component: PinLockComponent },
  { path: 'child-selector', component: ShellComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];