import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './services/data.service';
import { PinLockComponent } from './components/pin-lock.component';
import { ShellComponent } from './components/shell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PinLockComponent, ShellComponent],
  template: `
    @if (dataService.isAuthenticated()) {
      <app-shell />
    } @else {
      <app-pin-lock />
    }
  `
})
export class AppComponent {
  dataService = inject(DataService);
}
