import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface ChildProfile {
  id: string;
  userId: string;
  name: string;
  dateOfBirth: string;
  bloodType?: string;
  avatarUrl?: string; 
}

export interface MedicalRecord { // Vaccines
  id: string;
  childId: string;
  title: string;
  dueDate: string;
  completed: boolean;
  notes?: string;
}

export interface IllnessEpisode { // Health Records
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
  private http = inject(HttpClient);

  // Read raw storage initially, true if string exists
  isAuthenticated = signal<boolean>(!!localStorage.getItem('kiddok_access_token'));
  
  children = signal<ChildProfile[]>([]);
  activeChildId = signal<string | null>(null);

  illnesses = signal<IllnessEpisode[]>([]);
  records = signal<MedicalRecord[]>([]);

  constructor() {
    if (this.isAuthenticated()) {
      this.loadChildrenFromAPI();
    }
  }

  logout() {
    localStorage.removeItem('kiddok_access_token');
    this.isAuthenticated.set(false);
    this.children.set([]);
    this.activeChildId.set(null);
  }

  loadChildrenFromAPI() {
    this.http.get<ChildProfile[]>(`${environment.apiUrl}/children`).subscribe({
      next: (data) => {
        // Set premium aesthetics generic avatar mapping
        const populated = data.map(c => ({
          ...c,
          avatarUrl: c.avatarUrl || `https://api.dicebear.com/7.x/notionists/svg?seed=${c.name}`
        }));
        this.children.set(populated);
        
        if (populated.length > 0 && !this.activeChildId()) {
          this.switchChild(populated[0].id);
        } else if (populated.length === 0) {
          this.activeChildId.set(null);
        }
      },
      error: (e) => {
        // If NestJS returns 401 Unauthorized, maybe token expired => force logout
        if(e.status === 401) this.logout();
      }
    });
  }

  switchChild(id: string) {
    this.activeChildId.set(id);
    this.loadChildDetails(id);
  }

  loadChildDetails(childId: string) {
     this.http.get<any>(`${environment.apiUrl}/children/${childId}`).subscribe({
       next: (data) => {
         // Fill arrays with real PostgreSQL Data
         this.illnesses.set(data.healthRecords || []);
         this.records.set(data.vaccines || []);
       }
     });
  }

  // CREATE Calls
  addChild(name: string, dateOfBirth: string) {
    return this.http.post<ChildProfile>(`${environment.apiUrl}/children`, {
      name, dateOfBirth, bloodType: 'Nuk dihet'
    }).subscribe({
      next: () => {
         this.loadChildrenFromAPI();
      }
    });
  }

  addIllness(data: any) {
    const cid = this.activeChildId();
    if(!cid) return;
    this.http.post(`${environment.apiUrl}/health-records/${cid}`, data).subscribe({
      next: () => this.loadChildDetails(cid)
    });
  }

  addVaccine(data: any) {
    const cid = this.activeChildId();
    if(!cid) return;
    this.http.post(`${environment.apiUrl}/vaccines/${cid}`, data).subscribe({
      next: () => this.loadChildDetails(cid)
    });
  }
}
