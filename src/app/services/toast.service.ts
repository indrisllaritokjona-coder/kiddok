import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private listeners: ((message: string, type: 'success' | 'error' | 'info') => void)[] = [];

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.listeners.forEach(l => l(message, type));
  }

  subscribe(listener: (message: string, type: 'success' | 'error' | 'info') => void) {
    this.listeners.push(listener);
  }
}