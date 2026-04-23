import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ToastService } from '../services/toast.service';
import { I18nService } from '../core/i18n/i18n.service';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

let toastId = 0;

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none" role="region" aria-label="Notifications">
      @for (toast of activeToasts(); track toast.id) {
        <div class="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg max-w-sm animate-slide-up"
             [class]="toastClass(toast.type)"
             role="alert"
             [attr.aria-live]="'polite'">
          <lucide-icon [name]="toastIcon(toast.type)" class="text-inherit shrink-0" aria-hidden="true"></lucide-icon>
          <span class="flex-1 text-sm font-medium text-white">{{ toast.message }}</span>
          <button (click)="dismiss(toast.id)" [attr.aria-label]="t()['toast.dismiss'] || 'Dismiss'" class="opacity-70 hover:opacity-100 transition-opacity">
            <lucide-icon name="x" class="w-4 h-4 text-white" aria-hidden="true"></lucide-icon>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .animate-slide-up {
      animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class ToastComponent implements OnInit, OnDestroy {
  toastService = inject(ToastService);
  i18n = inject(I18nService);

  readonly t = this.i18n.t;
  activeToasts = signal<Toast[]>([]);
  private timeouts = new Map<number, ReturnType<typeof setTimeout>>();

  ngOnInit() {
    this.toastService.subscribe((message, type, duration) => {
      this.addToast(message, type, duration);
    });
  }

  ngOnDestroy() {
    this.timeouts.forEach(t => clearTimeout(t));
    this.timeouts.clear();
  }

  private addToast(message: string, type: 'success' | 'error' | 'info', duration: number) {
    const id = ++toastId;
    const toast: Toast = { id, message, type };
    this.activeToasts.update(toasts => [...toasts, toast]);

    const timeout = setTimeout(() => this.dismiss(id), duration);
    this.timeouts.set(id, timeout);
  }

  dismiss(id: number) {
    const timeout = this.timeouts.get(id);
    if (timeout) {
      clearTimeout(timeout);
      this.timeouts.delete(id);
    }
    this.activeToasts.update(toasts => toasts.filter(t => t.id !== id));
  }

  toastClass(type: 'success' | 'error' | 'info'): string {
    switch (type) {
      case 'success': return 'bg-teal-500 text-white';
      case 'error': return 'bg-red-500 text-white';
      case 'info': return 'bg-slate-700 text-white';
    }
  }

  toastIcon(type: 'success' | 'error' | 'info'): string {
    switch (type) {
      case 'success': return 'check-circle';
      case 'error': return 'alert-circle';
      case 'info': return 'info';
    }
  }
}
