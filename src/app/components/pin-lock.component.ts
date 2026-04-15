import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pin-lock',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-primary-50 flex items-center justify-center p-6">
      <div class="bg-surface rounded-2xl shadow-soft p-8 w-full max-w-sm text-center">
        <!-- Secure App Lock Icon -->
        <div class="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600">
          <span class="material-icons text-3xl">lock</span>
        </div>
        
        <h2 class="text-2xl font-bold text-gray-800 mb-2">KidDok Security</h2>
        <p class="text-sm text-gray-500 mb-8">Enter your Parent PIN to access medical records</p>
        
        <div class="flex justify-center gap-3 mb-8">
          @for (dot of [1, 2, 3, 4]; track dot; let i = $index) {
            <div 
              class="w-4 h-4 rounded-full transition-colors duration-200"
              [ngClass]="i < pin().length ? 'bg-primary-500' : 'bg-gray-200'"
            ></div>
          }
        </div>

        <div class="grid grid-cols-3 gap-4 mb-6">
          @for (num of [1,2,3,4,5,6,7,8,9]; track num) {
            <button 
              (click)="addDigit(num.toString())"
              class="h-14 rounded-xl bg-gray-50 text-xl font-medium text-gray-700 hover:bg-primary-50 active:bg-primary-100 transition-colors shadow-sm"
            >
              {{ num }}
            </button>
          }
          <!-- Empty spot for grid alignment -->
          <div></div>
          <button 
            (click)="addDigit('0')"
            class="h-14 rounded-xl bg-gray-50 text-xl font-medium text-gray-700 hover:bg-primary-50 active:bg-primary-100 transition-colors shadow-sm"
          >
            0
          </button>
          <button 
            (click)="deleteDigit()"
            class="h-14 rounded-xl text-xl font-medium text-gray-400 hover:text-gray-700 transition-colors"
          >
            <span class="material-icons">backspace</span>
          </button>
        </div>

        @if (errorMsg()) {
          <p class="text-red-500 text-sm animate-pulse">{{ errorMsg() }}</p>
        }
      </div>
    </div>
  `
})
export class PinLockComponent {
  dataService = inject(DataService);
  pin = signal<string>('');
  errorMsg = signal<string>('');

  addDigit(digit: string) {
    if (this.pin().length < 4) {
      this.pin.update(p => p + digit);
      if (this.pin().length === 4) {
        this.verifyPin();
      }
    }
  }

  deleteDigit() {
    this.pin.update(p => p.slice(0, -1));
    this.errorMsg.set('');
  }

  verifyPin() {
    const success = this.dataService.login(this.pin());
    if (!success) {
      this.errorMsg.set('Invalid PIN. Any 4 digits will work for this mockup.');
      setTimeout(() => this.pin.set(''), 1000);
    }
  }
}
