import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private listeners: ((message: string, type: 'success' | 'error' | 'info', duration: number) => void)[] = [];

  show(message: string, type: 'success' | 'error' | 'info' = 'info', duration?: number) {
    const d = duration ?? (type === 'success' ? 3000 : type === 'error' ? 5000 : 3000);
    this.listeners.forEach(l => l(message, type, d));
  }

  subscribe(listener: (message: string, type: 'success' | 'error' | 'info', duration: number) => void) {
    this.listeners.push(listener);
  }

  /** Show a bilingual toast by translation key */
  showKey(key: string, type: 'success' | 'error' | 'info' = 'info', params?: Record<string, string | number>) {
    const msg = this.resolveKey(key, params);
    this.show(msg, type);
  }

  private resolveKey(key: string, params?: Record<string, string | number>): string {
    const locale = localStorage.getItem('kiddok_locale') || 'sq';
    const translations: Record<string, Record<string, string>> = {
      'error.api.generic': { sq: 'Ndodhi një gabim, provoni përsëri', en: 'Something went wrong, please try again' },
      'error.api.loadChildren': { sq: 'Ngarkimi i fëmijëve dështoi', en: 'Failed to load children' },
      'error.api.loadTemperature': { sq: 'Ngarkimi i temperaturave dështoi', en: 'Failed to load temperature entries' },
      'error.api.createTemperature': { sq: 'Ruajtja e temperaturës dështoi', en: 'Failed to save temperature' },
      'error.api.loadGrowth': { sq: 'Ngarkimi i rritjes dështoi', en: 'Failed to load growth entries' },
      'error.api.createGrowth': { sq: 'Ruajtja e rritjes dështoi', en: 'Failed to save growth entry' },
      'error.api.deleteGrowth': { sq: 'Fshirja e rritjes dështoi', en: 'Failed to delete growth entry' },
      'error.api.loadVaccines': { sq: 'Ngarkimi i vaksinave dështoi', en: 'Failed to load vaccine records' },
      'error.api.createVaccine': { sq: 'Ruajtja e vaksinave dështoi', en: 'Failed to save vaccine' },
      'error.api.deleteVaccine': { sq: 'Fshirja e vaksinave dështoi', en: 'Failed to delete vaccine' },
      'error.api.createChild': { sq: 'Krijimi i profilit dështoi', en: 'Failed to create profile' },
      'error.api.updateChild': { sq: 'Përditësimi i profilit dështoi', en: 'Failed to update profile' },
      'error.api.deleteChild': { sq: 'Fshirja e profilit dështoi', en: 'Failed to delete profile' },
      'error.api.fetchParent': { sq: 'Ngarkimi i profilit dështoi', en: 'Failed to load profile' },
      'error.api.updateParent': { sq: 'Përditësimi i profilit dështoi', en: 'Failed to update profile' },
      'error.api.export': { sq: 'Eksportimi dështoi. Provoni përsëri.', en: 'Export failed. Please try again.' },
      'error.api.login': { sq: 'Identifikimi dështoi', en: 'Login failed' },
      'success.saved': { sq: 'U ruajt me sukses!', en: 'Saved successfully!' },
      'success.deleted': { sq: 'U fshi me sukses!', en: 'Deleted successfully!' },
      'success.exported': { sq: 'Eksportimi u përfundua!', en: 'Export complete!' },
      'offline.queued': { sq: 'Ruajtur lokallisht — do të sinkronizohet kur të jeni online', en: 'Saved locally — will sync when online' },
    };
    let text = translations[key]?.[locale] || translations[key]?.['sq'] || key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        text = text.replace(`{${k}}`, String(v));
      }
    }
    return text;
  }
}
