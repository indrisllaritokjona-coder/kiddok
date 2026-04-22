import { Injectable, signal, computed, inject } from '@angular/core';
import { I18nService } from '../core/i18n/i18n.service';
import { DataService } from './data.service';

/** Persisted notification preferences */
export interface NotificationPrefs {
  enabled: boolean;
  feverAlerts: boolean;
  vaccineAlerts: boolean;
  /** Do Not Disturb — start hour (0–23) */
  dndStart: number;
  /** Do Not Disturb — end hour (0–23) */
  dndEnd: number;
}

const PREFS_KEY = 'kiddok_notification_prefs';
const FEVER_THRESHOLD = 38.5; // °C
const VACCINE_DUE_DAYS = 3;   // notify N days before due

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private i18n = inject(I18nService);
  private data = inject(DataService);

  /** Global enable/disable (master switch) */
  enabled = signal(false);

  /** Fever alert toggle */
  feverAlerts = signal(true);

  /** Vaccine reminder toggle */
  vaccineAlerts = signal(true);

  /** Do Not Disturb start hour (0–23, default 22 = 10pm) */
  dndStart = signal(22);

  /** Do Not Disturb end hour (0–23, default 7 = 7am) */
  dndEnd = signal(7);

  private _initialized = false;

  constructor() {
    this.loadPrefs();
    // Register on window so DataService can trigger checks without circular imports
    (window as any).__kiddokNotif = this;
  }

  // ─── Preferences persistence ─────────────────────────────────

  private loadPrefs(): void {
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      if (raw) {
        const prefs: NotificationPrefs = JSON.parse(raw);
        this.enabled.set(prefs.enabled ?? false);
        this.feverAlerts.set(prefs.feverAlerts ?? true);
        this.vaccineAlerts.set(prefs.vaccineAlerts ?? true);
        this.dndStart.set(prefs.dndStart ?? 22);
        this.dndEnd.set(prefs.dndEnd ?? 7);
      }
    } catch { /* ignore */ }

    // Auto-request permission if globally enabled and not yet granted
    if (this.enabled() && Notification.permission === 'default') {
      this.requestPermission();
    }
  }

  private savePrefs(): void {
    const prefs: NotificationPrefs = {
      enabled: this.enabled(),
      feverAlerts: this.feverAlerts(),
      vaccineAlerts: this.vaccineAlerts(),
      dndStart: this.dndStart(),
      dndEnd: this.dndEnd(),
    };
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    } catch { /* ignore */ }
  }

  // ─── Permission ──────────────────────────────────────────────

  get permissionLevel(): 'default' | 'granted' | 'denied' {
    return Notification.permission as any;
  }

  get isSupported(): boolean {
    return typeof Notification !== 'undefined';
  }

  async requestPermission(): Promise<boolean> {
    if (!this.isSupported) return false;
    try {
      const result = await Notification.requestPermission();
      if (result === 'granted') {
        this.enabled.set(true);
        this.savePrefs();
        return true;
      }
    } catch { /* ignore */ }
    return false;
  }

  // ─── Master toggle (used by Settings) ────────────────────────

  async toggleEnabled(): Promise<void> {
    if (this.enabled()) {
      this.enabled.set(false);
      this.savePrefs();
      return;
    }
    if (Notification.permission === 'denied') {
      // Can't re-request when permanently denied — open settings hint
      console.warn('[NotificationService] Browser notifications permanently denied.');
      return;
    }
    const granted = await this.requestPermission();
    if (!granted) {
      this.enabled.set(false);
    }
    this.savePrefs();
  }

  updatePrefs(prefs: Partial<NotificationPrefs>): void {
    if (prefs.enabled !== undefined) this.enabled.set(prefs.enabled);
    if (prefs.feverAlerts !== undefined) this.feverAlerts.set(prefs.feverAlerts);
    if (prefs.vaccineAlerts !== undefined) this.vaccineAlerts.set(prefs.vaccineAlerts);
    if (prefs.dndStart !== undefined) this.dndStart.set(prefs.dndStart);
    if (prefs.dndEnd !== undefined) this.dndEnd.set(prefs.dndEnd);
    this.savePrefs();
  }

  // ─── Do Not Disturb check ────────────────────────────────────

  private isDndActive(): boolean {
    if (!this.enabled()) return true;
    const now = new Date();
    const hour = now.getHours();
    const { dndStart, dndEnd } = { dndStart: this.dndStart(), dndEnd: this.dndEnd() };
    if (dndStart < dndEnd) {
      // Normal range (e.g. 22–07: same day 22 to 07 next day = wrap)
      return hour >= dndStart || hour < dndEnd;
    } else {
      // Wrapped range: 22 → 07 means active from 22:00 to 06:59
      return hour >= dndStart || hour < dndEnd;
    }
  }

  // ─── Core send ───────────────────────────────────────────────

  private send(title: string, body: string, options?: NotificationOptions): boolean {
    if (!this.isSupported) return false;
    if (!this.enabled()) return false;
    if (this.isDndActive()) return false;
    if (Notification.permission !== 'granted') return false;

    try {
      const notif = new Notification(title, {
        icon: '/assets/icons/icon-192x192.png',
        badge: '/assets/icons/icon-72x72.png',
        lang: this.i18n.locale() === 'sq' ? 'sq-AL' : 'en-US',
        tag: 'kiddok-notif',
        ...options,
      });
      // Click → focus app window
      notif.onclick = () => {
        window.focus();
        notif.close();
      };
      return true;
    } catch (err) {
      console.error('[NotificationService] send failed:', err);
      return false;
    }
  }

  // ─── Fever alert ─────────────────────────────────────────────

  /**
   * Call after a temperature entry is saved.
   * Shows a browser notification if temp >= FEVER_THRESHOLD.
   */
  notifyFever(childName: string, temperature: number): void {
    if (!this.feverAlerts()) return;
    const t = this.i18n.t();
    const locale = this.i18n.locale();

    const title = t['notifications.fever.title'] ?? (locale === 'sq'
      ? 'Temperatura e lartë!'
      : 'High temperature!');
    const body = locale === 'sq'
      ? `${temperature}°C — ${childName}`
      : `${temperature}°C — ${childName}`;

    this.send(title, body);
  }

  // ─── Vaccine alerts ───────────────────────────────────────────

  /**
   * Check all vaccine records for the active child and fire
   * notifications for due/overdue vaccines.
   * Call on app init / child switch.
   */
  checkVaccineAlerts(): void {
    if (!this.vaccineAlerts()) return;
    const locale = this.i18n.locale();
    const t = this.i18n.t();
    const childId = this.data.activeChildId();
    if (!childId) return;

    const records = this.data.records().filter(r => r.childId === childId);
    const now = Date.now();

    for (const record of records) {
      if (record.completed) continue;

      const dueMs = new Date(record.dueDate).getTime();
      const daysUntilDue = Math.ceil((dueMs - now) / 86_400_000);

      let shouldNotify = false;
      let title = '';
      let body = '';

      if (daysUntilDue < 0) {
        // Overdue
        shouldNotify = true;
        const daysOverdue = Math.abs(daysUntilDue);
        title = t['notifications.vaccine.overdueTitle'] ?? (locale === 'sq'
          ? 'Vaksina e vonuar!'
          : 'Vaccine overdue!');
        body = locale === 'sq'
          ? `${record.title} — e vonuar ${daysOverdue} ditë`
          : `${record.title} — ${daysOverdue} day${daysOverdue !== 1 ? 's' : ''} overdue`;
      } else if (daysUntilDue <= VACCINE_DUE_DAYS) {
        // Due soon
        shouldNotify = true;
        title = t['notifications.vaccine.dueSoonTitle'] ?? (locale === 'sq'
          ? 'Vaksina për shkak!'
          : 'Vaccine due soon!');
        body = locale === 'sq'
          ? `${record.title} — për shkak ${daysUntilDue === 0 ? 'sot' : `pas ${daysUntilDue} ditësh`}`
          : `${record.title} — due ${daysUntilDue === 0 ? 'today' : `in ${daysUntilDue} days`}`;
      }

      if (shouldNotify) {
        this.send(title, body);
        break; // Only fire one vaccine notification per check
      }
    }
  }
}
