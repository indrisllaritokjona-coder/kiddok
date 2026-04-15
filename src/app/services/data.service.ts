import { Injectable, signal } from '@angular/core';

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  avatarUrl: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
}

export interface IllnessEpisode {
  id: string;
  childId: string;
  startDate: string;
  endDate?: string;
  durationDays?: number;
  symptoms: string[];
  temperatureLogs: { temp: number; timestamp: string }[];
  medications: Medication[];
  photoUrls: string[];
}

export interface MedicalRecord {
  id: string;
  childId: string;
  type: 'Vaccine' | 'Lab' | 'Recommendation';
  title: string;
  date: string;
  notes: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Mock Auth State
  isAuthenticated = signal<boolean>(false);

  // Mock Children
  children = signal<ChildProfile[]>([
    { id: 'c1', name: 'Liam', age: 4, avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?seed=Liam' },
    { id: 'c2', name: 'Emma', age: 2, avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?seed=Emma' }
  ]);

  // Active Child
  activeChildId = signal<string>('c1');

  // Mock Illness History
  illnesses = signal<IllnessEpisode[]>([
    {
      id: 'i1',
      childId: 'c1',
      startDate: '2026-04-10',
      durationDays: 3,
      symptoms: ['Fever', 'Cough', 'Lethargy'],
      temperatureLogs: [
        { temp: 38.5, timestamp: '2026-04-10T10:00' },
        { temp: 39.0, timestamp: '2026-04-10T14:30' }
      ],
      medications: [
        { name: 'Paracetamol', dosage: '5ml', frequency: 'Every 6 hours' }
      ],
      photoUrls: []
    }
  ]);

  // Mock Records
  records = signal<MedicalRecord[]>([
    {
      id: 'r1',
      childId: 'c1',
      type: 'Vaccine',
      title: 'MMR Dose 1',
      date: '2024-05-15',
      notes: 'Administered at City Clinic'
    },
    {
      id: 'r2',
      childId: 'c1',
      type: 'Lab',
      title: 'Complete Blood Count',
      date: '2025-10-01',
      notes: 'All normal, platelets slightly elevated'
    },
    {
      id: 'r3',
      childId: 'c2',
      type: 'Recommendation',
      title: 'Dietary Supplement',
      date: '2026-01-20',
      notes: 'Add Vitamin D drops (400 IU daily)'
    }
  ]);

  login(pin: string): boolean {
    // For mockup, any 4-digit PIN is accepted
    if (pin.length === 4) {
      this.isAuthenticated.set(true);
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated.set(false);
  }

  switchChild(id: string) {
    this.activeChildId.set(id);
  }

  addIllness(illness: Omit<IllnessEpisode, 'id' | 'childId'>) {
    const newIllness: IllnessEpisode = {
      ...illness,
      id: 'i' + Math.random().toString(36).substr(2, 9),
      childId: this.activeChildId()
    };
    this.illnesses.update(curr => [newIllness, ...curr]);
  }
}
