import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class ExportService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);

  private get apiUrl() {
    return environment.apiUrl;
  }

  private getHeaders() {
    const token = localStorage.getItem('kiddok_access_token');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  private getFileName(response: Response, format: 'pdf' | 'csv'): string {
    const contentDisposition = response.headers.get('Content-Disposition');
    if (contentDisposition) {
      const match = contentDisposition.match(/filename[^;=\n]*=(?:(\\?['"])(.*?)\1|[^;\n]*)/);
      if (match && match[2]) {
        return match[2];
      }
    }
    return `kiddok-export.${format}`;
  }

  async exportPdf(childId: string, dateFrom: string, dateTo: string): Promise<void> {
    const params = this.buildParams(dateFrom, dateTo);
    const url = `${this.apiUrl}/export/${childId}/pdf${params}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('kiddok_access_token')}`
        }
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({ message: 'Export failed' }));
        throw new Error(err.message ?? 'Export failed');
      }

      const blob = await response.blob();
      const filename = this.getFileNameFromContentDisposition(response, 'pdf');
      this.downloadBlob(blob, filename);
    } catch (err: any) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        this.toast.show('Nuk ka lidhje me serverin. Kontrolloni internetin.', 'error');
      } else {
        this.toast.show(err.message ?? 'Diqka shkoi keq. Riprovoni.', 'error');
      }
      throw err;
    }
  }

  async exportCsv(childId: string, dateFrom: string, dateTo: string): Promise<void> {
    const params = this.buildParams(dateFrom, dateTo);
    const url = `${this.apiUrl}/export/${childId}/csv${params}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('kiddok_access_token')}`
        }
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({ message: 'Export failed' }));
        throw new Error(err.message ?? 'Export failed');
      }

      const blob = await response.blob();
      const filename = this.getFileNameFromContentDisposition(response, 'csv');
      this.downloadBlob(blob, filename);
    } catch (err: any) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        this.toast.show('Nuk ka lidhje me serverin. Kontrolloni internetin.', 'error');
      } else {
        this.toast.show(err.message ?? 'Diqka shkoi keq. Riprovoni.', 'error');
      }
      throw err;
    }
  }

  private buildParams(dateFrom: string, dateTo: string): string {
    const parts: string[] = [];
    if (dateFrom) parts.push(`from=${encodeURIComponent(dateFrom)}`);
    if (dateTo) parts.push(`to=${encodeURIComponent(dateTo)}`);
    return parts.length > 0 ? '?' + parts.join('&') : '';
  }

  private getFileNameFromContentDisposition(response: Response, fallbackExt: string): string {
    const cd = response.headers.get('Content-Disposition');
    if (!cd) return `kiddok-export.${fallbackExt}`;
    const match = cd.match(/filename[^;=\n]*=(?:(\\?['"])(.*?)\1|[^;\n]*)/);
    return match?.[2] ?? `kiddok-export.${fallbackExt}`;
  }

  private downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
