import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { ToastService } from './toast.service';
import { NotificationService } from './notification.service';
import { OfflineService } from './offline.service';

export interface ChildProfile {
  id: string;
  userId: string;
  name: string;
  dateOfBirth: string;
  avatarSeed?: string;
  birthWeight?: number;
  deliveryDoctor?: string;
  bloodType?: string;
  criticalAllergies?: string;
  avatarUrl?: string;
  gender?: string;
  allergies?: string;
  medicalDocument?: string;
  documentIssueDate?: string;
  medicalNotes?: string;
}

export interface ParentProfile {
  name: string;
  surname: string;
  phone: string;
}

export interface MedicalRecord {
  id: string;
  childId: string;
  title: string;
  dueDate: string;
  completed: boolean;
  notes?: string;
}

export interface TemperatureEntry {
  id: string;
  childId: string;
  temperature: number;
  measuredAt: string;
  location?: string;
  notes?: string;
  createdAt: string;
}

export interface GrowthEntry {
  id: string;
  childId: string;
  height: number | null;
  weight: number | null;
  measuredAt: string;
  notes: string | null;
  createdAt: string;
}

export interface IllnessEpisode {
  id: string;
  childId: string;
  title: string;
  symptoms: string;
  medications: string;
  loggedAt: string;
}

export interface DiaryEntry {
  id: string;
  childId: string;
  type: 'symptom' | 'meal' | 'sleep' | 'mood' | 'activity';
  description: string;
  severity?: 'mild' | 'moderate' | 'severe';
  duration?: string;
  loggedAt: string;
  notes?: string;
}

export interface LabResultRecord {
  id: string;
  childId: string;
  testName: string;
  result: string;
  unit?: string;
  referenceRange?: string;
  date: string;
  doctor?: string;
  notes?: string;
  type?: string;
  attachments: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface VaccineRecord {
  id: string;
  childId: string;
  vaccineName?: string;
  manufacturer?: string;
  doseNumber: number;
  totalDoses: number;
  dueDate: string;
  completedAt?: string;
  administeredBy?: string;
  batchNumber?: string;
  site?: string;
  notes?: string;
  status: 'overdue' | 'due' | 'upcoming' | 'completed';
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  readonly AUTH_KEY = 'kiddok_access_token';
  readonly CHILDREN_KEY = 'kiddok_children';
  readonly PARENT_KEY = 'kiddok_parent_profile';
  readonly ACTIVE_CHILD_KEY = 'kiddok_active_child';
  readonly API_URL = environment.apiUrl;

  private readonly toast = inject(ToastService);

  // Auth state
  isAuthenticated = signal<boolean>(!!localStorage.getItem(this.AUTH_KEY));

  // Children & active child
  children = signal<ChildProfile[]>([]);
  activeChildId = signal<string | null>(null);
  currentTab = signal<string>('home');

  // Medical data (per-child) — kept local for now
  illnesses = signal<IllnessEpisode[]>([]);
  records = signal<MedicalRecord[]>([]);
  temperatureEntries = signal<TemperatureEntry[]>([]);
  growthEntries = signal<GrowthEntry[]>([]);
  vaccineRecords = signal<VaccineRecord[]>([]);

  // Parent profile
  parentProfile = signal<ParentProfile>({ name: '', surname: '', phone: '' });

  constructor(private http: HttpClient) {
    this.init();
  }

  private async init() {
    // Try to load children from backend first
    await this.loadChildrenFromApi();

    // Fallback: also check localStorage
    const storedChildren = this.loadFromStorage<ChildProfile[]>(this.CHILDREN_KEY);
    if (storedChildren && storedChildren.length > 0 && this.children().length === 0) {
      this.children.set(storedChildren);
    }

    const storedParent = this.loadFromStorage<ParentProfile>(this.PARENT_KEY);
    if (storedParent) {
      this.parentProfile.set(storedParent);
    }

    const storedActiveId = localStorage.getItem(this.ACTIVE_CHILD_KEY);
    if (storedActiveId) {
      this.activeChildId.set(storedActiveId);
      this.loadChildDetails(storedActiveId);
    } else if (this.children().length > 0) {
      const first = this.children()[0];
      this.switchChild(first.id);
    }
  }

  // ─── Diary Entries ─────────────────────────────────────────────
  diaryEntries = signal<DiaryEntry[]>([]);
  labResults = signal<LabResultRecord[]>([]);

  /** POST /diary-entries → merge response into signal */
  async addDiaryEntry(entry: Omit<DiaryEntry, 'id'>): Promise<DiaryEntry | null> {
    try {
      const created = await firstValueFrom(
        this.http.post<DiaryEntry>(`${this.API_URL}/diary-entries`, entry, this.getHeaders())
      );
      const updated = [created, ...this.diaryEntries()];
      this.diaryEntries.set(updated);
      // Also persist to localStorage for offline
      this.saveDiaryLocally(entry.childId, updated);
      return created;
    } catch (err: any) {
      console.error('[DataService] addDiaryEntry failed:', err);
      this.toast.show('Ndodhi një gabim, provoni përsëri', 'error');
      return null;
    }
  }

  /** GET /diary-entries/child/:childId */
  async loadDiaryEntries(childId: string): Promise<void> {
    try {
      const entries = await firstValueFrom(
        this.http.get<DiaryEntry[]>(`${this.API_URL}/diary-entries/child/${childId}`, this.getHeaders())
      );
      this.diaryEntries.set(entries);
      this.saveDiaryLocally(childId, entries);
    } catch (err: any) {
      console.error('[DataService] loadDiaryEntries failed:', err);
      // Last-resort offline fallback
      const stored = localStorage.getItem(`kiddok_diary_${childId}`);
      this.diaryEntries.set(stored ? JSON.parse(stored) : []);
      this.toast.show('Ngarkimi dështoi, u përdorën të dhëna offline', 'info');
    }
  }

  /** PATCH /diary-entries/:id */
  async updateDiaryEntry(id: string, data: Partial<DiaryEntry>): Promise<DiaryEntry | null> {
    try {
      const updated = await firstValueFrom(
        this.http.patch<DiaryEntry>(`${this.API_URL}/diary-entries/${id}`, data, this.getHeaders())
      );
      const list = this.diaryEntries().map(e => e.id === id ? updated : e);
      this.diaryEntries.set(list);
      return updated;
    } catch (err: any) {
      console.error('[DataService] updateDiaryEntry failed:', err);
      this.toast.show('Ndodhi një gabim, provoni përsëri', 'error');
      return null;
    }
  }

  /** DELETE /diary-entries/:id */
  async deleteDiaryEntry(id: string): Promise<void> {
    try {
      await firstValueFrom(
        this.http.delete<void>(`${this.API_URL}/diary-entries/${id}`, this.getHeaders())
      );
      const list = this.diaryEntries().filter(e => e.id !== id);
      this.diaryEntries.set(list);
    } catch (err: any) {
      console.error('[DataService] deleteDiaryEntry failed:', err);
      this.toast.show('Ndodhi një gabim, provoni përsëri', 'error');
    }
  }

  private saveDiaryLocally(childId: string, entries: DiaryEntry[]) {
    try {
      localStorage.setItem(`kiddok_diary_${childId}`, JSON.stringify(entries));
    } catch {}
  }

  getDiaryEntriesByChild(childId: string): DiaryEntry[] {
    return this.diaryEntries().filter(e => e.childId === childId);
  }

  // ─── API calls ───────────────────────────────────────────────

  private getHeaders() {
    const token = localStorage.getItem(this.AUTH_KEY);
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  /** Sanitise avatar URL — only allow https:// DiceBear CDN */
  private isValidUrl(url: string): boolean {
    try {
      const u = new URL(url);
      return u.protocol === 'https:' && u.hostname === 'api.dicebear.com';
    } catch {
      return false;
    }
  }

  /** Build a consistent DiceBear avatar URL from a child profile */
  getAvatarUrl(child: Pick<ChildProfile, 'name' | 'avatarSeed'>): string {
    const seed = child.avatarSeed || child.name;
    return `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(seed)}`;
  }

  /** Generate a random avatar seed for a new child */
  generateAvatarSeed(): string {
    return 'child_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
  }

  /** Load all children from PostgreSQL via REST */
  async loadChildrenFromApi(): Promise<void> {
    const token = localStorage.getItem(this.AUTH_KEY);
    if (!token) return;

    try {
      const children = await firstValueFrom(
        this.http.get<any[]>(`${this.API_URL}/children`, this.getHeaders())
      );

      const profiles: ChildProfile[] = children.map(c => ({
        id: c.id,
        userId: c.userId,
        name: c.name,
        dateOfBirth: c.dateOfBirth,
        avatarSeed: c.avatarSeed ?? undefined,
        gender: c.gender ?? undefined,
        bloodType: c.bloodType ?? undefined,
        birthWeight: c.birthWeight ?? undefined,
        deliveryDoctor: c.deliveryDoctor ?? undefined,
        criticalAllergies: c.criticalAllergies ?? undefined,
        allergies: c.allergies ?? undefined,
        medicalDocument: c.medicalDocument ?? undefined,
        documentIssueDate: c.documentIssueDate ?? undefined,
        medicalNotes: c.medicalNotes ?? undefined,
        avatarUrl: this.getAvatarUrl({ name: c.name, avatarSeed: c.avatarSeed ?? undefined } as ChildProfile),
      }));

      this.children.set(profiles);
      this.saveToStorage(this.CHILDREN_KEY, profiles);
      // Cache to IndexedDB for offline access
      this.cacheToOffline();
    } catch (err: any) {
      console.error('[DataService] loadChildrenFromApi failed:', err);
      // On 401 (Unauthorized), clear auth and redirect to login
      if (err?.status === 401 || err?.status === 403) {
        this.logout();
        window.location.href = '/login';
        return;
      }
      this.toast.show('Ndodhi një gabim, provoni përsëri', 'error');
      // Fallback to offline cached data
      await this.loadFromOffline();
    }
  }

  /** Create a new child via POST /children */
  async createChild(data: Partial<ChildProfile>): Promise<ChildProfile> {
    const avatarSeed = this.generateAvatarSeed();
    const payload = {
      name: data.name,
      dateOfBirth: data.dateOfBirth,
      avatarSeed,
      gender: data.gender ?? null,
      bloodType: data.bloodType ?? null,
      birthWeight: data.birthWeight ?? null,
      deliveryDoctor: data.deliveryDoctor ?? null,
      criticalAllergies: data.criticalAllergies ?? null,
      allergies: data.allergies ?? null,
      medicalDocument: data.medicalDocument ?? null,
      documentIssueDate: data.documentIssueDate ? new Date(data.documentIssueDate) : null,
      medicalNotes: data.medicalNotes ?? null,
    };

    try {
      const created = await firstValueFrom(
        this.http.post<any>(`${this.API_URL}/children`, payload, this.getHeaders())
      );

      const profile: ChildProfile = {
        id: created.id,
        userId: created.userId,
        name: created.name,
        dateOfBirth: created.dateOfBirth,
        avatarSeed: created.avatarSeed ?? avatarSeed,
        gender: created.gender ?? undefined,
        bloodType: created.bloodType ?? undefined,
        birthWeight: created.birthWeight ?? undefined,
        deliveryDoctor: created.deliveryDoctor ?? undefined,
        criticalAllergies: created.criticalAllergies ?? undefined,
        avatarUrl: this.getAvatarUrl({ name: created.name, avatarSeed: created.avatarSeed ?? avatarSeed } as ChildProfile),
      };

      const updated = [...this.children(), profile];
      this.children.set(updated);
      this.saveToStorage(this.CHILDREN_KEY, updated);
      return profile;
    } catch (err: any) {
      console.error('[DataService] createChild failed:', err);
      this.toast.show('Ndodhi një gabim, provoni përsëri', 'error');
      throw err;
    }
  }

  /** Update an existing child via PATCH /children/:id */
  async updateChildApi(id: string, data: Partial<ChildProfile>): Promise<ChildProfile> {
    const payload: any = {
      name: data.name,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender ?? null,
      bloodType: data.bloodType ?? null,
      birthWeight: data.birthWeight ?? null,
      deliveryDoctor: data.deliveryDoctor ?? null,
      criticalAllergies: data.criticalAllergies ?? null,
      allergies: data.allergies ?? null,
      medicalNotes: data.medicalNotes ?? null,
    };

    if (data.medicalDocument !== undefined) {
      payload.medicalDocument = data.medicalDocument;
    }
    if (data.documentIssueDate !== undefined) {
      payload.documentIssueDate = data.documentIssueDate ? new Date(data.documentIssueDate) : null;
    }

    try {
      const updated = await firstValueFrom(
        this.http.patch<any>(`${this.API_URL}/children/${id}`, payload, this.getHeaders())
      );

      const profile: ChildProfile = {
        id: updated.id,
        userId: updated.userId,
        name: updated.name,
        dateOfBirth: updated.dateOfBirth,
        avatarSeed: updated.avatarSeed ?? undefined,
        gender: updated.gender ?? undefined,
        bloodType: updated.bloodType ?? undefined,
        birthWeight: updated.birthWeight ?? undefined,
        deliveryDoctor: updated.deliveryDoctor ?? undefined,
        criticalAllergies: updated.criticalAllergies ?? undefined,
        allergies: updated.allergies ?? undefined,
        medicalDocument: updated.medicalDocument ?? undefined,
        documentIssueDate: updated.documentIssueDate ?? undefined,
        medicalNotes: updated.medicalNotes ?? undefined,
        avatarUrl: this.getAvatarUrl({ name: updated.name, avatarSeed: updated.avatarSeed ?? undefined } as ChildProfile),
      };

      const current = this.children().map(c => c.id === id ? profile : c);
      this.children.set(current);
      this.saveToStorage(this.CHILDREN_KEY, current);
      return profile;
    } catch (err: any) {
      console.error('[DataService] updateChildApi failed:', err);
      this.toast.show('Ndodhi një gabim, provoni përsëri', 'error');
      throw err;
    }
  }

  /** Delete a child via DELETE /children/:id */
  async deleteChildApi(id: string): Promise<void> {
    try {
      await firstValueFrom(
        this.http.delete<void>(`${this.API_URL}/children/${id}`, this.getHeaders())
      );
    } catch (err: any) {
      console.error('[DataService] deleteChildApi failed:', err);
      this.toast.show('Ndodhi një gabim, provoni përsëri', 'error');
      throw err;
    }
    const updated = this.children().filter(c => c.id !== id);
    this.children.set(updated);
    this.saveToStorage(this.CHILDREN_KEY, updated);
  }

  async loadTemperatureEntries(childId: string): Promise<TemperatureEntry[]> {
    try {
      const entries = await firstValueFrom(
        this.http.get<TemperatureEntry[]>(`${this.API_URL}/temperature-entries/child/${childId}`, this.getHeaders())
      );
      this.temperatureEntries.set(entries);
      this.cacheTemperaturesToOffline(entries);
      return entries;
    } catch (err: any) {
      console.error('[DataService] loadTemperatureEntries failed:', err);
      const offlineEntries = await this.getOfflineTemperatures(childId);
      if (offlineEntries.length > 0) this.temperatureEntries.set(offlineEntries);
      return this.temperatureEntries();
    }
  }

  private async cacheTemperaturesToOffline(entries: TemperatureEntry[]): Promise<void> {
    try {
      const { OfflineService } = await import('./offline.service');
      const svc = new OfflineService();
      await svc.saveTemperaturesToOffline(entries);
    } catch {}
  }

  private async getOfflineTemperatures(childId: string): Promise<TemperatureEntry[]> {
    try {
      const { OfflineService } = await import('./offline.service');
      const svc = new OfflineService();
      return await svc.getTemperaturesFromOffline(childId);
    } catch { return []; }
  }

  async createTemperatureEntry(data: { childId: string; temperature: number; measuredAt: string; location?: string; notes?: string }): Promise<TemperatureEntry | null> {
    try {
      const created = await firstValueFrom(
        this.http.post<TemperatureEntry>(`${this.API_URL}/temperature-entries`, data, this.getHeaders())
      );
      const updated = [created, ...this.temperatureEntries()];
      this.temperatureEntries.set(updated);
      return created;
    } catch (err: any) {
      console.error('[DataService] createTemperatureEntry failed:', err);
      this.toast.show('Ndodhi një gabim, provoni përsëri', 'error');
      return null;
    }
  }

  async deleteTemperatureEntry(id: string): Promise<void> {
    try {
      await firstValueFrom(
        this.http.delete<void>(`${this.API_URL}/temperature-entries/${id}`, this.getHeaders())
      );
      const updated = this.temperatureEntries().filter(e => e.id !== id);
      this.temperatureEntries.set(updated);
    } catch (err: any) {
      console.error('[DataService] deleteTemperatureEntry failed:', err);
      this.toast.show('Ndodhi një gabim, provoni përsëri', 'error');
    }
  }

  async loadLabResults(childId: string): Promise<LabResultRecord[]> {
    try {
      const records = await firstValueFrom(
        this.http.get<LabResultRecord[]>(`${this.API_URL}/lab-results/child/${childId}`, this.getHeaders())
      );
      this.labResults.set(records);
      return records;
    } catch (err: any) {
      console.error('[DataService] loadLabResults failed:', err);
      return this.labResults();
    }
  }

  async addLabResult(childId: string, data: any): Promise<LabResultRecord> {
    const record = await firstValueFrom(
      this.http.post<LabResultRecord>(`${this.API_URL}/lab-results/${childId}`, data, this.getHeaders())
    );
    const updated = [record, ...this.labResults()];
    this.labResults.set(updated);
    return record;
  }

  async updateLabResult(id: string, data: any): Promise<LabResultRecord> {
    const record = await firstValueFrom(
      this.http.patch<LabResultRecord>(`${this.API_URL}/lab-results/${id}`, data, this.getHeaders())
    );
    const updated = this.labResults().map(r => r.id === id ? record : r);
    this.labResults.set(updated);
    return record;
  }

  async deleteLabResult(id: string): Promise<void> {
    await firstValueFrom(
      this.http.delete<void>(`${this.API_URL}/lab-results/${id}`, this.getHeaders())
    );
    const updated = this.labResults().filter(r => r.id !== id);
    this.labResults.set(updated);
  }

  async getLabResult(id: string): Promise<LabResultRecord> {
    return firstValueFrom(
      this.http.get<LabResultRecord>(`${this.API_URL}/lab-results/${id}`, this.getHeaders())
    );
  }

  async loadGrowthEntries(childId: string): Promise<GrowthEntry[]> {
    try {
      const entries = await firstValueFrom(
        this.http.get<GrowthEntry[]>(`${this.API_URL}/growth-entries/child/${childId}`, this.getHeaders())
      );
      this.growthEntries.set(entries);
      this.cacheGrowthToOffline(entries);
      return entries;
    } catch (err: any) {
      console.error('[DataService] loadGrowthEntries failed:', err);
      const offlineEntries = await this.getOfflineGrowth(childId);
      if (offlineEntries.length > 0) this.growthEntries.set(offlineEntries);
      return this.growthEntries();
    }
  }

  private async cacheGrowthToOffline(entries: GrowthEntry[]): Promise<void> {
    try {
      const { OfflineService } = await import('./offline.service');
      const svc = new OfflineService();
      await svc.saveGrowthToOffline(entries);
    } catch {}
  }

  private async getOfflineGrowth(childId: string): Promise<GrowthEntry[]> {
    try {
      const { OfflineService } = await import('./offline.service');
      const svc = new OfflineService();
      return await svc.getGrowthFromOffline(childId);
    } catch { return []; }
  }

  async loadVaccineRecords(childId: string): Promise<VaccineRecord[]> {
    try {
      const records = await firstValueFrom(
        this.http.get<VaccineRecord[]>(`${this.API_URL}/vaccines/child/${childId}`, this.getHeaders())
      );
      this.vaccineRecords.set(records);
      this.cacheVaccinesToOffline(records);
      return records;
    } catch (err: any) {
      console.error('[DataService] loadVaccineRecords failed:', err);
      const offlineRecords = await this.getOfflineVaccines(childId);
      if (offlineRecords.length > 0) this.vaccineRecords.set(offlineRecords);
      return this.vaccineRecords();
    }
  }

  private async cacheVaccinesToOffline(records: VaccineRecord[]): Promise<void> {
    try {
      const { OfflineService } = await import('./offline.service');
      const svc = new OfflineService();
      await svc.saveVaccinesToOffline(records);
    } catch {}
  }

  private async getOfflineVaccines(childId: string): Promise<VaccineRecord[]> {
    try {
      const { OfflineService } = await import('./offline.service');
      const svc = new OfflineService();
      return await svc.getVaccinesFromOffline(childId);
    } catch { return []; }
  }

  async exportChildCsv(childId: string): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.get(`${this.API_URL}/export/${childId}/csv`, {
          ...this.getHeaders(),
          responseType: 'blob',
        })
      ) as Blob;
      const url = URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      const contentDisposition = (response as any)['type'];
      // Extract filename from Content-Disposition or generate default
      a.download = `kiddok_export_${childId}_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error('[DataService] exportChildCsv failed:', err);
      this.toast.show('Eksportimi dështoi. Provoni përsëri.', 'error');
    }
  }

  async exportChildData(
    childId: string,
    dateFrom: string,
    dateTo: string,
    format: 'pdf' | 'csv'
  ): Promise<void> {
    try {
      const endpoint = `${this.API_URL}/export/${childId}/${format}?from=${encodeURIComponent(dateFrom)}&to=${encodeURIComponent(dateTo)}`;
      const response = await firstValueFrom(
        this.http.get(endpoint, {
          ...this.getHeaders(),
          responseType: 'blob',
        })
      ) as Blob;
      const contentType = (response as any)['type'] ?? (format === 'pdf' ? 'application/pdf' : 'text/csv');
      const blob = new Blob([response], { type: contentType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `kiddok-health-report-${childId}-${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err: any) {
      console.error('[DataService] exportChildData failed:', err);
      this.toast.show('Eksportimi dështoi. Provoni përsëri.', 'error');
      throw err;
    }
  }

  async createGrowthEntry(data: { childId: string; height?: number | null; weight?: number | null; measuredAt: string; notes?: string }): Promise<GrowthEntry | null> {
    try {
      const created = await firstValueFrom(
        this.http.post<GrowthEntry>(`${this.API_URL}/growth-entries`, data, this.getHeaders())
      );
      const updated = [created, ...this.growthEntries()];
      this.growthEntries.set(updated);
      return created;
    } catch (err: any) {
      console.error('[DataService] createGrowthEntry failed:', err);
      this.toast.show('Ndodhi një gabim, provoni përsëri', 'error');
      return null;
    }
  }

  async deleteGrowthEntry(id: string): Promise<void> {
    try {
      await firstValueFrom(
        this.http.delete<void>(`${this.API_URL}/growth-entries/${id}`, this.getHeaders())
      );
      const updated = this.growthEntries().filter(e => e.id !== id);
      this.growthEntries.set(updated);
    } catch (err: any) {
      console.error('[DataService] deleteGrowthEntry failed:', err);
      this.toast.show('Ndodhi një gabim, provoni përsëri', 'error');
    }
  }

  // ─── Auth ───────────────────────────────────────────────────

  async login(username: string, password: string): Promise<boolean> {
    if (password === '1234') {
      try {
        const result = await firstValueFrom(
          this.http.post<any>(`${this.API_URL}/auth/dev-login`, {
            pin: '1234',
            name: username || 'Dev Parent'
          })
        );
        localStorage.setItem(this.AUTH_KEY, result.access_token);
        this.isAuthenticated.set(true);
        await this.loadChildrenFromApi();
        return true;
      } catch (err: any) {
        console.error('[DataService] dev-login failed:', err);
        this.toast.show('Ndodhi një gabim, provoni përsëri', 'error');
        // fallback to dev token for offline dev
        localStorage.setItem(this.AUTH_KEY, 'dev-token-' + Date.now());
        this.isAuthenticated.set(true);
        return true;
      }
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.AUTH_KEY);
    this.isAuthenticated.set(false);
    this.children.set([]);
    this.activeChildId.set(null);
    this.illnesses.set([]);
    this.records.set([]);
    localStorage.removeItem(this.ACTIVE_CHILD_KEY);
  }

  // ─── Children (local helpers still used for in-memory state) ──

  addChild(
    name: string,
    dateOfBirth: string,
    birthWeight?: number,
    deliveryDoctor?: string,
    bloodType?: string,
  ) {
    const avatarSeed = this.generateAvatarSeed();
    const newChild: ChildProfile = {
      id: 'child_' + Date.now(),
      userId: 'parent_1',
      name,
      dateOfBirth,
      avatarSeed,
      birthWeight,
      deliveryDoctor,
      bloodType,
      avatarUrl: this.getAvatarUrl({ name, avatarSeed } as ChildProfile),
    };

    const updated = [...this.children(), newChild];
    this.children.set(updated);
    this.saveToStorage(this.CHILDREN_KEY, updated);
    this.switchChild(newChild.id);
  }

  updateChild(
    id: string,
    name: string,
    dateOfBirth: string,
    birthWeight?: number,
    deliveryDoctor?: string,
    bloodType?: string,
  ) {
    const updated = this.children().map(c => {
      if (c.id !== id) return c;
      return { ...c, name, dateOfBirth, birthWeight, deliveryDoctor, bloodType };
    });
    this.children.set(updated);
    this.saveToStorage(this.CHILDREN_KEY, updated);
  }

  switchChild(id: string) {
    this.activeChildId.set(id);
    localStorage.setItem(this.ACTIVE_CHILD_KEY, id);
    this.loadChildDetails(id);
  }

  loadChildDetails(childId: string) {
    // Load illnesses from backend
    this.loadIllnesses(childId);
    const storedRecords = localStorage.getItem(`kiddok_records_${childId}`);
    this.records.set(storedRecords ? JSON.parse(storedRecords) : []);
    this.loadTemperatureEntries(childId);
    this.loadGrowthEntries(childId);
    // Trigger vaccine alert check (NotificationService is providedIn: 'root', instantiate directly)
    setTimeout(() => {
      try {
        const notifSvc = new NotificationService();
        notifSvc.checkVaccineAlerts();
      } catch { /* ignore */ }
    }, 0);
  }

  // ─── Medical Records (localStorage) ─────────────────────────

  // ─── Illnesses ───────────────────────────────────────────────

  /** GET /illnesses/child/:childId → set this.illnesses signal */
  async loadIllnesses(childId: string): Promise<void> {
    try {
      const episodes = await firstValueFrom(
        this.http.get<IllnessEpisode[]>(`${this.API_URL}/illnesses/child/${childId}`, this.getHeaders())
      );
      this.illnesses.set(episodes);
      this.saveIllnessesLocally(childId, episodes);
    } catch (err: any) {
      console.error('[DataService] loadIllnesses failed:', err);
      // Last-resort offline fallback
      const stored = localStorage.getItem(`kiddok_illnesses_${childId}`);
      this.illnesses.set(stored ? JSON.parse(stored) : []);
      this.toast.show('Ngarkimi dështoi, u përdorën të dhëna offline', 'info');
    }
  }

  /** POST /illnesses */
  async addIllness(data: any): Promise<IllnessEpisode | null> {
    const cid = this.activeChildId();
    if (!cid) return null;
    const payload = { childId: cid, title: data.title || '', symptoms: data.symptoms || '', medications: data.medications || '', notes: data.notes || '' };
    try {
      const episode = await firstValueFrom(
        this.http.post<IllnessEpisode>(`${this.API_URL}/illnesses`, payload, this.getHeaders())
      );
      const updated = [...this.illnesses(), episode];
      this.illnesses.set(updated);
      this.saveIllnessesLocally(cid, updated);
      return episode;
    } catch (err: any) {
      console.error('[DataService] addIllness failed:', err);
      this.toast.show('Ndodhi një gabim, provoni përsëri', 'error');
      return null;
    }
  }

  /** PATCH /illnesses/:id */
  async updateIllness(id: string, data: Partial<IllnessEpisode>): Promise<IllnessEpisode | null> {
    try {
      const updated = await firstValueFrom(
        this.http.patch<IllnessEpisode>(`${this.API_URL}/illnesses/${id}`, data, this.getHeaders())
      );
      const list = this.illnesses().map(i => i.id === id ? updated : i);
      this.illnesses.set(list);
      const cid = this.activeChildId();
      if (cid) this.saveIllnessesLocally(cid, list);
      return updated;
    } catch (err: any) {
      console.error('[DataService] updateIllness failed:', err);
      this.toast.show('Ndodhi një gabim, provoni përsëri', 'error');
      return null;
    }
  }

  /** DELETE /illnesses/:id */
  async deleteIllness(id: string): Promise<void> {
    try {
      await firstValueFrom(
        this.http.delete<void>(`${this.API_URL}/illnesses/${id}`, this.getHeaders())
      );
      const list = this.illnesses().filter(i => i.id !== id);
      this.illnesses.set(list);
      const cid = this.activeChildId();
      if (cid) this.saveIllnessesLocally(cid, list);
    } catch (err: any) {
      console.error('[DataService] deleteIllness failed:', err);
      this.toast.show('Ndodhi një gabim, provoni përsëri', 'error');
    }
  }

  private saveIllnessesLocally(childId: string, episodes: IllnessEpisode[]) {
    try {
      localStorage.setItem(`kiddok_illnesses_${childId}`, JSON.stringify(episodes));
    } catch {}
  }

  addVaccine(data: any) {
    const cid = this.activeChildId();
    if (!cid) return;
    const record: MedicalRecord = {
      id: 'rec_' + Date.now(),
      childId: cid,
      title: data.title || '',
      dueDate: data.dueDate || '',
      completed: false,
      notes: data.notes || '',
    };
    const updated = [...this.records(), record];
    this.records.set(updated);
    localStorage.setItem(`kiddok_records_${cid}`, JSON.stringify(updated));
  }

  // ─── Parent Profile ──────────────────────────────────────────

  async fetchParentProfile(): Promise<ParentProfile> {
    try {
      const token = localStorage.getItem(this.AUTH_KEY);
      if (!token) return { name: '', surname: '', phone: '' };
      const profile = await firstValueFrom(
        this.http.get<ParentProfile>(`${this.API_URL}/parent`, this.getHeaders())
      );
      this.parentProfile.set(profile);
      this.saveToStorage(this.PARENT_KEY, profile);
      return profile;
    } catch (err: any) {
      console.error('[DataService] fetchParentProfile failed:', err);
      this.toast.show('Ndodhi një gabim gjatë ngarkimit të profilit', 'error');
      return { name: '', surname: '', phone: '' };
    }
  }

  async updateParentProfile(data: Partial<ParentProfile>): Promise<ParentProfile> {
    const updated = { ...this.parentProfile(), ...data };
    try {
      const result = await firstValueFrom(
        this.http.patch<ParentProfile>(`${this.API_URL}/parent`, data, this.getHeaders())
      );
      this.parentProfile.set(result);
      this.saveToStorage(this.PARENT_KEY, result);
      return result;
    } catch (err: any) {
      console.error('[DataService] updateParentProfile failed:', err);
      this.toast.show('Ndodhi një gabim, provoni përsëri', 'error');
      // Offline fallback — still persist locally
      this.parentProfile.set(updated);
      this.saveToStorage(this.PARENT_KEY, updated);
      return updated;
    }
  }

  async deleteChild(childId: string): Promise<void> {
    try {
      await firstValueFrom(
        this.http.delete<void>(`${this.API_URL}/children/${childId}`, this.getHeaders())
      );
    } catch { /* fall through to local */ }
    const updated = this.children().filter(c => c.id !== childId);
    this.children.set(updated);
    this.saveToStorage(this.CHILDREN_KEY, updated);
    // Also clear child-specific localStorage
    try {
      localStorage.removeItem(`kiddok_diary_${childId}`);
      localStorage.removeItem(`kiddok_illnesses_${childId}`);
      localStorage.removeItem(`kiddok_records_${childId}`);
    } catch {}
    if (this.activeChildId() === childId) {
      const next = updated[0];
      if (next) this.switchChild(next.id);
      else this.activeChildId.set(null);
    }
  }

  async clearAllData(): Promise<void> {
    try {
      localStorage.clear();
    } catch {}
    this.children.set([]);
    this.parentProfile.set({ name: '', surname: '', phone: '' });
    this.activeChildId.set(null);
    this.illnesses.set([]);
    this.records.set([]);
    this.temperatureEntries.set([]);
    this.growthEntries.set([]);
    this.diaryEntries.set([]);
  }

  exportAllData(): object {
    const children = this.children();
    const exportData: Record<string, any> = {
      exportedAt: new Date().toISOString(),
      version: '1.0.0',
      parentProfile: this.parentProfile(),
      children: children.map(child => ({
        ...child,
        diary: this.getDiaryEntriesByChild(child.id),
        illnesses: this.illnesses().filter(i => i.childId === child.id),
        records: this.records().filter(r => r.childId === child.id),
      })),
    };
    return exportData;
  }

  saveParentProfile(profile: ParentProfile) {
    this.parentProfile.set(profile);
    this.saveToStorage(this.PARENT_KEY, profile);
  }

  getParentName(): string {
    return this.parentProfile().name;
  }

  getChildAge(child: ChildProfile): { years: number; months: number } {
    const today = new Date();
    const dob = new Date(child.dateOfBirth);
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    if (months < 0) { years--; months += 12; }
    const dayDiff = today.getDate() - dob.getDate();
    if (dayDiff < 0) { months--; if (months < 0) { years--; months += 12; } }
    return { years, months };
  }

  // ─── Helpers ────────────────────────────────────────────────

  private saveToStorage(key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }

  private loadFromStorage<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) as T : null;
    } catch {
      return null;
    }
  }

  // ─── Offline / IndexedDB helpers ───────────────────────────

  private async cacheToOffline(): Promise<void> {
    try {
      const offlineService = new (await import('./offline.service')).OfflineService();
      await offlineService.saveChildrenToOffline(this.children());
      const activeId = this.activeChildId();
      if (activeId) {
        await offlineService.saveTemperaturesToOffline(this.temperatureEntries());
        await offlineService.saveGrowthToOffline(this.growthEntries());
        await offlineService.saveVaccinesToOffline(this.vaccineRecords());
        await offlineService.saveDiaryToOffline(this.diaryEntries());
      }
    } catch { /* best-effort */ }
  }

  private async loadFromOffline(): Promise<void> {
    try {
      const { OfflineService } = await import('./offline.service');
      const offlineService = new OfflineService();
      const cachedChildren = await offlineService.getChildrenFromOffline();
      if (cachedChildren.length > 0) {
        this.children.set(cachedChildren);
        this.saveToStorage(this.CHILDREN_KEY, cachedChildren);
        const firstChild = cachedChildren[0];
        this.activeChildId.set(firstChild.id);
        localStorage.setItem(this.ACTIVE_CHILD_KEY, firstChild.id);
        await offlineService.loadCachedChildData(firstChild.id);
      }
    } catch { /* best-effort */ }
  }
}
