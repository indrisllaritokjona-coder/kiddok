import {
  Component, Input, Output, EventEmitter, signal, computed, inject, OnInit, OnChanges, OnDestroy, SimpleChanges, HostListener
} from '@angular/core'
import { LucideAngularModule } from 'lucide-angular';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { DataService, ChildProfile } from '../../../services/data.service';

export interface ChildDocument {
  id: string;
  name: string;
  size: number;
  type: string;
  data: string;
  uploadedAt: string;
}

export interface ChildFormData {
  name: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other' | '';
  bloodType?: string;
  birthWeight?: number;
  allergies?: string;
  documents?: ChildDocument[];
}

@Component({
  selector: 'app-add-edit-child-modal',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <!-- Backdrop -->
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4"
         role="dialog" aria-modal="true"
         [attr.aria-label]="i18n.t()['childForm.titleAdd']">

      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" (click)="onBackdropClick()"></div>

      <!-- Modal Card -->
      <div class="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up"
           style="max-height: 90vh; display: flex; flex-direction: column;">

        <!-- Top accent bar -->
        <div class="h-1 bg-gradient-to-r from-indigo-500 to-teal-400 flex-shrink-0"></div>

        <!-- Modal Body (scrollable) -->
        <div class="p-8 overflow-y-auto flex-1">

          <!-- Header -->
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-xl font-bold text-gray-800">
              {{ mode === 'edit' ? i18n.t()['childForm.titleEdit'] : i18n.t()['childForm.titleAdd'] }}
            </h2>
            <button (click)="cancelled.emit()"
                    class="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-700 transition-all shadow-sm border border-stone-200">
              <lucide-icon name="x" class="text-inherit"></lucide-icon>
            </button>
          </div>

          <!-- Step Indicator -->
          <div class="flex items-center justify-center mb-10">
            @for (step of [1, 2, 3]; track step) {
              <div class="flex flex-col items-center">
                <div class="w-3 h-3 rounded-full flex items-center justify-center transition-all"
                     [class]="getStepDotClass(step)">
                  @if (currentStep() > step) {
                    <lucide-icon name="check" class="text-inherit"></lucide-icon>
                  } @else {
                    <span class="text-xs font-bold">{{ step }}</span>
                  }
                </div>
                <span class="text-xs font-semibold mt-2"
                      [class]="currentStep() === step ? 'text-indigo-600' : 'text-stone-400'">
                  {{ getStepLabel(step) }}
                </span>
              </div>
              @if (step < 3) {
                <div class="w-16 h-0.5 mx-2 mb-5 rounded-full"
                     [class]="currentStep() > step ? 'bg-teal-400' : 'bg-stone-200'"></div>
              }
            }
          </div>

          <!-- Error Banner -->
          @if (saveError()) {
            <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 animate-fade-in">
              <lucide-icon name="alert-circle" class="text-inherit"></lucide-icon>
              <p class="text-red-700 text-sm font-medium">{{ saveError() }}</p>
            </div>
          }

          <!-- ─── STEP 1: Basics ─── -->
          @if (currentStep() === 1) {
            <div class="space-y-6 animate-fade-in">
              <!-- Name -->
              <div>
                <label class="block text-xs font-bold text-indigo-700 mb-2 ml-1 uppercase tracking-wider">
                  {{ i18n.t()['childForm.name.label'] }}
                </label>
                <input type="text" [(ngModel)]="formData.name"
                       (blur)="validateNameOnBlur()"
                       (input)="clearError('name')"
                       [placeholder]="i18n.t()['childForm.name.placeholder']"
                       class="w-full border border-stone-200 rounded-xl px-4 py-3 text-base text-gray-800 placeholder-stone-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
                       [class]="errors()['name'] ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''">
                @if (errors()['name']) {
                  <p class="mt-2 text-xs text-red-500 font-medium flex items-center gap-1">
                    <lucide-icon name="alert-circle" class="text-inherit"></lucide-icon>
                    {{ errors()['name'] }}
                  </p>
                }
              </div>

              <!-- Date of Birth -->
              <div>
                <label class="block text-xs font-bold text-indigo-700 mb-2 ml-1 uppercase tracking-wider">
                  {{ i18n.t()['childForm.dob.label'] }}
                </label>
                <div class="relative">
                  <input type="date" [(ngModel)]="formData.dateOfBirth"
                         (change)="clearError('dateOfBirth')"
                         class="w-full border border-stone-200 rounded-xl px-4 py-3 text-base text-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none appearance-none"
                         [class]="errors()['dateOfBirth'] ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''">
                </div>
                @if (errors()['dateOfBirth']) {
                  <p class="mt-2 text-xs text-red-500 font-medium flex items-center gap-1">
                    <lucide-icon name="alert-circle" class="text-inherit"></lucide-icon>
                    {{ errors()['dateOfBirth'] }}
                  </p>
                }
              </div>

              <!-- Gender -->
              <div>
                <label class="block text-xs font-bold text-indigo-700 mb-3 ml-1 uppercase tracking-wider">
                  {{ i18n.t()['childForm.gender.label'] }}
                </label>
                <div class="flex rounded-2xl overflow-hidden border-2 border-stone-200 gap-px bg-stone-200">
                  @for (opt of genderOptions; track opt.value) {
                    <button type="button"
                            (click)="formData.gender = opt.value; clearError('gender')"
                            class="flex-1 py-3 text-sm font-semibold transition-all"
                            [class]="formData.gender === opt.value
                              ? 'bg-indigo-500 text-white'
                              : 'bg-white text-stone-700 hover:bg-stone-50'">
                      {{ opt.label }}
                    </button>
                  }
                </div>
                @if (errors()['gender']) {
                  <p class="mt-2 text-xs text-red-500 font-medium flex items-center gap-1">
                    <lucide-icon name="alert-circle" class="text-inherit"></lucide-icon>
                    {{ errors()['gender'] }}
                  </p>
                }
              </div>
            </div>
          }

          <!-- ─── STEP 2: Medical ─── -->
          @if (currentStep() === 2) {
            <div class="space-y-6 animate-fade-in">
              <!-- Collapsible Header -->
              <button type="button" (click)="toggleMedical()"
                      class="w-full flex items-center justify-between p-4 bg-indigo-50 rounded-2xl border border-indigo-100 hover:bg-indigo-100 transition-all">
                <div class="flex items-center gap-3">
                  <lucide-icon name="stethoscope" class="text-indigo-500"></lucide-icon>
                  <span class="font-semibold text-indigo-700">{{ i18n.t()['childForm.step2.medical'] }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-indigo-400 font-medium">{{ i18n.t()['childForm.optional'] }}</span>
                  <lucide-icon name="chevron-down" class="text-indigo-400 transition-transform"
                        [class.rotate-180]="isMedicalExpanded()"></lucide-icon>
                </div>
              </button>

              @if (isMedicalExpanded()) {
                <div class="space-y-5 animate-fade-in">
                  <!-- Blood Type -->
                  <div>
                    <label class="block text-xs font-bold text-indigo-700 mb-2 ml-1 uppercase tracking-wider">
                      {{ i18n.t()['childForm.bloodType'] }}
                    </label>
                    <div class="relative">
                      <select [(ngModel)]="formData.bloodType"
                              class="w-full border border-stone-200 rounded-xl px-4 py-3 text-base text-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none appearance-none bg-white pr-10">
                        <option value="">--</option>
                        @for (bt of bloodTypes; track bt) {
                          <option [value]="bt">{{ bt }}</option>
                        }
                      </select>
                      <lucide-icon name="chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-lg pointer-events-none"></lucide-icon>
                    </div>
                  </div>

                  <!-- Birth Weight -->
                  <div>
                    <label class="block text-xs font-bold text-indigo-700 mb-2 ml-1 uppercase tracking-wider">
                      {{ i18n.t()['childForm.birthWeight'] }}
                    </label>
                    <div class="relative">
                      <input type="number" step="0.1" min="0.5" max="8"
                             [(ngModel)]="formData.birthWeight"
                             placeholder="e.g. 3.2"
                             class="w-full border border-stone-200 rounded-xl px-4 py-3 pr-10 text-base text-gray-800 placeholder-stone-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none">
                      <span class="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm font-medium pointer-events-none">kg</span>
                    </div>
                  </div>

                  <!-- Allergies -->
                  <div>
                    <label class="block text-xs font-bold text-indigo-700 mb-2 ml-1 uppercase tracking-wider">
                      {{ i18n.t()['childForm.allergies'] }}
                    </label>
                    <textarea [(ngModel)]="formData.allergies" rows="3"
                              [placeholder]="i18n.t()['childForm.allergies.placeholder']"
                              maxlength="500"
                              class="w-full border border-stone-200 rounded-xl px-4 py-3 text-base text-gray-800 placeholder-stone-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none resize-none"></textarea>
                  </div>
                </div>
              }
            </div>
          }

          <!-- ─── STEP 3: Documents ─── -->
          @if (currentStep() === 3) {
            <div class="space-y-6 animate-fade-in">
              <div class="text-center">
                <h3 class="text-lg font-bold text-gray-800 mb-1">{{ i18n.t()['childForm.step3.documents'] }}</h3>
                <p class="text-sm text-stone-400">{{ i18n.t()['childForm.uploadHint'] }}</p>
              </div>

              <!-- Drop Zone -->
              <div (click)="fileInput.click()"
                   (dragover)="onDragOver($event)"
                   (drop)="onFileDrop($event)"
                   class="border-2 border-dashed border-stone-300 rounded-2xl p-8 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all">
                <lucide-icon name="upload-cloud" class="text-4xl text-stone-300 mb-3"></lucide-icon>
                <p class="font-semibold text-stone-500 text-sm">{{ i18n.t()['childForm.uploadDocument'] }}</p>
                <p class="text-xs text-stone-400 mt-1">PDF, PNG, JPG — max 5MB</p>
              </div>
              <input #fileInput type="file" accept=".pdf,image/png,image/jpeg,image/webp" multiple
                     (change)="onFileSelected($event)" class="hidden">

              <!-- File List -->
              @if (uploadedFiles().length > 0) {
                <div class="space-y-2">
                  @for (file of uploadedFiles(); track file.name; let i = $index) {
                    <div class="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200 animate-fade-in">
                      <lucide-icon name="file-text" class="text-stone-400 text-lg"></lucide-icon>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-700 truncate">{{ file.name }}</p>
                        <p class="text-xs text-stone-400">{{ formatFileSize(file.size) }}</p>
                      </div>
                      <button type="button" (click)="removeFile(i)"
                              class="text-red-400 hover:text-red-600 transition-colors">
                        <lucide-icon name="x" class="text-inherit"></lucide-icon>
                      </button>
                    </div>
                  }
                </div>
              }

              <!-- File Error -->
              @if (fileError()) {
                <div class="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl animate-fade-in">
                  <lucide-icon name="alert-circle" class="text-inherit"></lucide-icon>
                  <p class="text-red-600 text-xs font-medium">{{ fileError() }}</p>
                </div>
              }
            </div>
          }

        </div><!-- /Modal Body -->

        <!-- Footer Actions -->
        <div class="p-6 border-t border-stone-100 flex-shrink-0">
          <div class="flex items-center gap-3">
            @if (currentStep() > 1) {
              <button type="button" (click)="prevStep()"
                      class="px-5 py-3 text-stone-600 hover:text-stone-900 font-semibold transition-colors flex items-center gap-1">
                <lucide-icon name="arrow-left" class="text-inherit"></lucide-icon>
                {{ i18n.t()['childForm.back'] }}
              </button>
            } @else {
              <button type="button" (click)="cancelled.emit()"
                      class="px-5 py-3 text-stone-500 hover:text-stone-700 font-medium transition-colors text-sm">
                {{ i18n.t()['childForm.cancel'] }}
              </button>
            }
            <div class="flex-1"></div>
            @if (currentStep() < 3) {
              <button type="button" (click)="nextStep()"
                      class="px-8 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-500 text-white font-semibold rounded-2xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2">
                {{ i18n.t()['childForm.next'] }}
                <lucide-icon name="arrow-right" class="text-lg"></lucide-icon>
              </button>
            } @else {
              <button type="button" (click)="save()" [disabled]="isSaving()"
                      class="px-8 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-500 text-white font-semibold rounded-2xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                @if (isSaving()) {
                  <lucide-icon name="loader" class="text-inherit"></lucide-icon>
                  {{ i18n.locale() === 'sq' ? 'Duke ruajtur...' : 'Saving...' }}
                } @else {
                  <lucide-icon name="save" class="text-inherit"></lucide-icon>
                  {{ i18n.t()['childForm.save'] }}
                }
              </button>
            }
          </div>
        </div>

      </div><!-- /Modal Card -->
    </div>
  `,
  styles: [`
    .animate-slide-up {
      animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.2s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    button:not(:disabled):active {
      transform: scale(0.98);
    }
  `]
})
export class AddEditChildModalComponent implements OnInit, OnChanges, OnDestroy {
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() child?: ChildProfile;

  @Output() saved = new EventEmitter<ChildProfile>();
  @Output() cancelled = new EventEmitter<void>();

  i18n = inject(I18nService);
  private dataService = inject(DataService);

  currentStep = signal<1 | 2 | 3>(1);
  isMedicalExpanded = signal(false);
  isSaving = signal(false);
  saveError = signal<string | null>(null);
  fileError = signal<string | null>(null);

  errors = signal<Record<string, string>>({});
  uploadedFiles = signal<{ name: string; size: number; type: string; data: string }[]>([]);

  formData: ChildFormData = {
    name: '',
    dateOfBirth: '',
    gender: '',
  };

  genderOptions: { value: 'male' | 'female' | 'other'; label: string }[] = [];
  bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  ngOnInit(): void {
    this.buildGenderOptions();
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.cancelled.emit();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['child'] && this.child) {
      this.formData = {
        name: this.child.name || '',
        dateOfBirth: this.child.dateOfBirth || '',
        gender: (this.child.gender as any) || '',
        bloodType: this.child.bloodType,
        birthWeight: this.child.birthWeight,
        allergies: this.child.allergies || this.child.criticalAllergies || '',
      };
      // TODO: load documents if present
    }
  }

  private buildGenderOptions() {
    const t = this.i18n.t();
    this.genderOptions = [
      { value: 'male', label: t['childForm.gender.male'] },
      { value: 'female', label: t['childForm.gender.female'] },
      { value: 'other', label: t['childForm.gender.other'] },
    ];
  }

  getStepDotClass(step: number): string {
    if (this.currentStep() > step) return 'bg-teal-500';
    if (this.currentStep() === step) return 'bg-indigo-500 text-white';
    return 'bg-stone-200 text-stone-500';
  }

  getStepLabel(step: number): string {
    const t = this.i18n.t();
    const labels: Record<number, string> = {
      1: t['childForm.step1.basics'],
      2: t['childForm.step2.medical'],
      3: t['childForm.step3.documents'],
    };
    return labels[step] || '';
  }

  clearError(field: string): void {
    this.errors.update(e => ({ ...e, [field]: '' }));
  }

  validateNameOnBlur(): void {
    const name = this.formData.name?.trim() ?? '';
    if (!name) {
      this.errors.update(e => ({ ...e, name: this.i18n.t()['childForm.name.error'] }));
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      this.errors.update(e => ({ ...e, name: this.i18n.t()['childForm.name.error'] }));
    }
  }

  validateStep1(): boolean {
    const errors: Record<string, string> = {};
    const t = this.i18n.t();
    const name = this.formData.name?.trim() ?? '';
    if (!name) {
      errors['name'] = t['childForm.name.error'];
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      errors['name'] = t['childForm.name.error'];
    }
    if (!this.formData.dateOfBirth) {
      errors['dateOfBirth'] = t['childForm.dob.error'];
    } else {
      const dob = new Date(this.formData.dateOfBirth);
      const today = new Date();
      if (dob > today) {
        errors['dateOfBirth'] = t['childForm.dob.futureError'];
      }
    }
    if (!this.formData.gender) {
      errors['gender'] = this.i18n.locale() === 'sq' ? 'Gjinia është e detyrueshme' : 'Gender is required';
    }
    this.errors.set(errors);
    return Object.keys(errors).length === 0;
  }

  nextStep(): void {
    if (this.currentStep() === 1 && !this.validateStep1()) return;
    if (this.currentStep() < 3) {
      this.currentStep.set((this.currentStep() + 1) as 1 | 2 | 3);
    }
  }

  prevStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.set((this.currentStep() - 1) as 1 | 2 | 3);
    }
  }

  toggleMedical(): void {
    this.isMedicalExpanded.update(v => !v);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    this.processFiles(files);
    input.value = '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    const files = Array.from(event.dataTransfer?.files ?? []);
    this.processFiles(files);
  }

  private processFiles(files: File[]): void {
    this.fileError.set(null);
    const current = this.uploadedFiles();
    const remaining = 3 - current.length;
    if (remaining <= 0) {
      this.fileError.set(this.i18n.locale() === 'sq' ? 'Maksimumi 3 skedarë' : 'Maximum 3 files allowed');
      return;
    }
    const toProcess = files.slice(0, remaining);
    for (const file of toProcess) {
      if (file.size > 5 * 1024 * 1024) {
        this.fileError.set(this.i18n.t()['childForm.fileTooBig']);
        continue;
      }
      if (!file.type.match(/pdf|image\/(png|jpeg|webp)/)) {
        this.fileError.set(this.i18n.t()['childForm.fileTypeError']);
        continue;
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedFiles.update(list => [
          ...list,
          { name: file.name, size: file.size, type: file.type, data: reader.result as string }
        ]);
      };
      reader.readAsDataURL(file);
    }
    const stillTooMany = files.length > remaining && current.length < 3;
    if (stillTooMany) {
      this.fileError.set(this.i18n.locale() === 'sq' ? 'Maksimumi 3 skedarë' : 'Maximum 3 files allowed');
    }
  }

  removeFile(index: number): void {
    this.uploadedFiles.update(list => list.filter((_, i) => i !== index));
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  async save(): Promise<void> {
    this.isSaving.set(true);
    this.saveError.set(null);
    try {
      let savedChild: ChildProfile;
      const payload: any = {
        name: this.formData.name.trim(),
        dateOfBirth: this.formData.dateOfBirth,
        gender: this.formData.gender || null,
        bloodType: this.formData.bloodType || null,
        birthWeight: this.formData.birthWeight || null,
        allergies: this.formData.allergies || null,
        criticalAllergies: this.formData.allergies || null,
        medicalNotes: null,
      };
      if (this.uploadedFiles().length > 0) {
        payload.documents = this.uploadedFiles().map(f => ({
          id: 'doc_' + Date.now() + '_' + Math.random().toString(36).slice(2),
          name: f.name,
          size: f.size,
          type: f.type,
          data: f.data,
          uploadedAt: new Date().toISOString(),
        }));
      }
      if (this.mode === 'edit' && this.child?.id) {
        savedChild = await this.dataService.updateChildApi(this.child.id, payload);
      } else {
        savedChild = await this.dataService.createChild(payload);
      }
      this.saved.emit(savedChild);
    } catch (err) {
      this.saveError.set(this.i18n.t()['childForm.error']);
    } finally {
      this.isSaving.set(false);
    }
  }

  onBackdropClick(): void {
    this.cancelled.emit();
  }
}
