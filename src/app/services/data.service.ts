import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface ChildProfile {
  id: string;
  userId: string;
  name: string;
  dateOfBirth: string;
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

@Injectable({
  providedIn: 'root'
})
export class DataService {
  readonly AUTH_KEY = 'kiddok_access_token';
  readonly CHILDREN_KEY = 'kiddok_children';
  readonly PARENT_KEY = 'kiddok_parent_profile';
  readonly ACTIVE_CHILD_KEY = 'kiddok_active_child';
  readonly API_URL = 'http://localhost:3000';

  // Auth state
  isAuthenticated = signal<boolean>(!!localStorage.getItem(this.AUTH_KEY));

  // Children & active child
  children = signal<ChildProfile[]>([]);
  activeChildId = signal<string | null>(null);

  // Medical data (per-child) — kept local for now
  illnesses = signal<IllnessEpisode[]>([]);
  records = signal<MedicalRecord[]>([]);
  temperatureEntries = signal<TemperatureEntry[]>([]);
  growthEntries = signal<GrowthEntry[]>([]);

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

  // ─── API calls ───────────────────────────────────────────────

  private getHeaders() {
    const token = localStorage.getItem(this.AUTH_KEY);
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
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
        gender: c.gender ?? undefined,
        bloodType: c.bloodType ?? undefined,
        birthWeight: c.birthWeight ?? undefined,
        deliveryDoctor: c.deliveryDoctor ?? undefined,
        criticalAllergies: c.criticalAllergies ?? undefined,
        allergies: c.allergies ?? undefined,
        medicalDocument: c.medicalDocument ?? undefined,
        documentIssueDate: c.documentIssueDate ?? undefined,
        medicalNotes: c.medicalNotes ?? undefined,
        avatarUrl: c.avatarUrl ?? `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(c.name)}`,
      }));

      this.children.set(profiles);
      this.saveToStorage(this.CHILDREN_KEY, profiles);
    } catch (err) {
      console.error('[DataService] loadChildrenFromApi failed:', err);
    }
  }

  /** Create a new child via POST /children */
  async createChild(data: Partial<ChildProfile>): Promise<ChildProfile> {
    const payload = {
      name: data.name,
      dateOfBirth: data.dateOfBirth,
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

    const created = await firstValueFrom(
      this.http.post<any>(`${this.API_URL}/children`, payload, this.getHeaders())
    );

    const profile: ChildProfile = {
      id: created.id,
      userId: created.userId,
      name: created.name,
      dateOfBirth: created.dateOfBirth,
      gender: created.gender ?? undefined,
      bloodType: created.bloodType ?? undefined,
      birthWeight: created.birthWeight ?? undefined,
      deliveryDoctor: created.deliveryDoctor ?? undefined,
      criticalAllergies: created.criticalAllergies ?? undefined,
      avatarUrl: created.avatarUrl ?? `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(created.name)}`,
    };

    const updated = [...this.children(), profile];
    this.children.set(updated);
    this.saveToStorage(this.CHILDREN_KEY, updated);
    return profile;
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

    const updated = await firstValueFrom(
      this.http.patch<any>(`${this.API_URL}/children/${id}`, payload, this.getHeaders())
    );

    const profile: ChildProfile = {
      id: updated.id,
      userId: updated.userId,
      name: updated.name,
      dateOfBirth: updated.dateOfBirth,
      gender: updated.gender ?? undefined,
      bloodType: updated.bloodType ?? undefined,
      birthWeight: updated.birthWeight ?? undefined,
      deliveryDoctor: updated.deliveryDoctor ?? undefined,
      criticalAllergies: updated.criticalAllergies ?? undefined,
      allergies: updated.allergies ?? undefined,
      medicalDocument: updated.medicalDocument ?? undefined,
      documentIssueDate: updated.documentIssueDate ?? undefined,
      medicalNotes: updated.medicalNotes ?? undefined,
      avatarUrl: updated.avatarUrl ?? `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(updated.name)}`,
    };

    const current = this.children().map(c => c.id === id ? profile : c);
    this.children.set(current);
    this.saveToStorage(this.CHILDREN_KEY, current);
    return profile;
  }

  /** Delete a child via DELETE /children/:id */
  async deleteChildApi(id: string): Promise<void> {
    await firstValueFrom(
      this.http.delete<void>(`${this.API_URL}/children/${id}`, this.getHeaders())
    );
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
      return entries;
    } catch (err) {
      console.error('[DataService] loadTemperatureEntries failed:', err);
      return [];
    }
  }

  async createTemperatureEntry(data: { childId: string; temperature: number; measuredAt: string; location?: string; notes?: string }): Promise<TemperatureEntry | null> {
    try {
      const created = await firstValueFrom(
        this.http.post<TemperatureEntry>(`${this.API_URL}/temperature-entries`, data, this.getHeaders())
      );
      const updated = [created, ...this.temperatureEntries()];
      this.temperatureEntries.set(updated);
      return created;
    } catch (err) {
      console.error('[DataService] createTemperatureEntry failed:', err);
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
    } catch (err) {
      console.error('[DataService] deleteTemperatureEntry failed:', err);
    }
  }

  async loadGrowthEntries(childId: string): Promise<GrowthEntry[]> {
    try {
      const entries = await firstValueFrom(
        this.http.get<GrowthEntry[]>(`${this.API_URL}/growth-entries/child/${childId}`, this.getHeaders())
      );
      this.growthEntries.set(entries);
      return entries;
    } catch (err) {
      console.error('[DataService] loadGrowthEntries failed:', err);
      return [];
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
    } catch (err) {
      console.error('[DataService] createGrowthEntry failed:', err);
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
    } catch (err) {
      console.error('[DataService] deleteGrowthEntry failed:', err);
    }
  }

  // ─── Auth ───────────────────────────────────────────────────

  async login(username: string, password: string): Promise<boolean> {
    if (password === '1234') {
      try {
        const result = await firstValueFrom(
          this.http.post<any>('http://localhost:3000/auth/dev-login', {
            pin: '1234',
            name: username || 'Dev Parent'
          })
        );
        localStorage.setItem(this.AUTH_KEY, result.access_token);
        this.isAuthenticated.set(true);
        await this.loadChildrenFromApi();
        return true;
      } catch (err) {
        console.error('[DataService] dev-login failed:', err);
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
    const avatarUrl = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(name)}`;
    const newChild: ChildProfile = {
      id: 'child_' + Date.now(),
      userId: 'parent_1',
      name,
      dateOfBirth,
      birthWeight,
      deliveryDoctor,
      bloodType,
      avatarUrl,
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

  deleteChild(id: string) {
    const updated = this.children().filter(c => c.id !== id);
    this.children.set(updated);
    this.saveToStorage(this.CHILDREN_KEY, updated);
    if (this.activeChildId() === id) {
      const next = updated[0];
      if (next) this.switchChild(next.id);
      else this.activeChildId.set(null);
    }
  }

  switchChild(id: string) {
    this.activeChildId.set(id);
    localStorage.setItem(this.ACTIVE_CHILD_KEY, id);
    this.loadChildDetails(id);
  }

  loadChildDetails(childId: string) {
    const storedIllnesses = localStorage.getItem(`kiddok_illnesses_${childId}`);
    this.illnesses.set(storedIllnesses ? JSON.parse(storedIllnesses) : []);
    const storedRecords = localStorage.getItem(`kiddok_records_${childId}`);
    this.records.set(storedRecords ? JSON.parse(storedRecords) : []);
    this.loadTemperatureEntries(childId);
    this.loadGrowthEntries(childId);
  }

  // ─── Medical Records (localStorage) ─────────────────────────

  addIllness(data: any) {
    const cid = this.activeChildId();
    if (!cid) return;
    const episode: IllnessEpisode = {
      id: 'ill_' + Date.now(),
      childId: cid,
      title: data.title || '',
      symptoms: data.symptoms || '',
      medications: data.medications || '',
      loggedAt: new Date().toISOString(),
    };
    const updated = [...this.illnesses(), episode];
    this.illnesses.set(updated);
    localStorage.setItem(`kiddok_illnesses_${cid}`, JSON.stringify(updated));
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

  saveParentProfile(profile: ParentProfile) {
    this.parentProfile.set(profile);
    this.saveToStorage(this.PARENT_KEY, profile);
  }

  getParentName(): string {
    return this.parentProfile().name;
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
}
