import { Injectable, signal, effect } from '@angular/core';

export type AccentColor = 'purple' | 'blue' | 'green' | 'orange';
export type FontSize = 'small' | 'medium' | 'large';

export interface ThemeConfig {
  darkMode: boolean;
  accentColor: AccentColor;
  fontSize: FontSize;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'kiddok_theme';

  darkMode = signal<boolean>(false);
  accentColor = signal<AccentColor>('purple');
  fontSize = signal<FontSize>('medium');

  constructor() {
    this.load();
    // Apply theme class to <html> element reactively
    effect(() => this.applyTheme());
  }

  private load(): void {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        const cfg: ThemeConfig = JSON.parse(raw);
        this.darkMode.set(cfg.darkMode ?? false);
        this.accentColor.set(cfg.accentColor ?? 'purple');
        this.fontSize.set(cfg.fontSize ?? 'medium');
      }
    } catch {
      // ignore
    }
  }

  private persist(): void {
    try {
      const cfg: ThemeConfig = {
        darkMode: this.darkMode(),
        accentColor: this.accentColor(),
        fontSize: this.fontSize(),
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cfg));
    } catch {}
  }

  private applyTheme(): void {
    const root = document.documentElement;

    // Dark mode
    if (this.darkMode()) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Accent color (data attribute for CSS variable switching)
    root.setAttribute('data-accent', this.accentColor());

    // Font size
    root.setAttribute('data-font-size', this.fontSize());
  }

  toggleDarkMode(): void {
    this.darkMode.update(v => !v);
    this.persist();
  }

  setDarkMode(value: boolean): void {
    this.darkMode.set(value);
    this.persist();
  }

  setAccentColor(color: AccentColor): void {
    this.accentColor.set(color);
    this.persist();
  }

  setFontSize(size: FontSize): void {
    this.fontSize.set(size);
    this.persist();
  }
}