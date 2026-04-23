import { Injectable, signal } from '@angular/core';
import { ChildProfile } from './data.service';

@Injectable({ providedIn: 'root' })
export class ModalService {
  // Add/Edit child modal state
  showChildModal = signal(false);
  isAddingChild = signal(false);
  editingChild = signal<ChildProfile | null>(null);

  openAddChild() {
    this.isAddingChild.set(true);
    this.editingChild.set(null);
    this.showChildModal.set(true);
  }

  openEditChild(child: ChildProfile) {
    this.editingChild.set(child);
    this.isAddingChild.set(false);
    this.showChildModal.set(true);
  }

  closeModal() {
    this.showChildModal.set(false);
    this.isAddingChild.set(false);
    this.editingChild.set(null);
  }

  onChildSaved(child: ChildProfile) {
    this.closeModal();
  }
}
