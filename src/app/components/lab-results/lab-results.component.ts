import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, LabResultRecord } from '../../services/data.service';
import { I18nService } from '../../core/i18n/i18n.service';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 5;
const ALLOWED_TYPES = ['application/pdf', 'image/png', 'image/jpeg', 'image/webp'];

interface PendingFile {
  name: string;
  size: number;
  base64: string;
  mimeType: string;
}

@Component({
  selector: 'app-lab-results',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="min-h-screen bg-gray-50 pb-24">

      <!-- Header -->
      <div class="bg-white border-b border-gray-100 px-4 pt-6 pb-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-extrabold text-gray-800">{{ i18n.t()['labResults.title'] || 'Rezultatet e Laboratorit' }}</h1>
            @if (activeChild()) {
              <p class="text-slate-400 text-sm mt-1 font-medium">{{ activeChild()?.name }}</p>
            }
          </div>
          <button (click)="openAddModal()"
            class="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-2xl font-bold shadow-sm transition-all flex items-center gap-2 text-sm">
            <lucide-icon name="plus" class="text-inherit"></lucide-icon>
            {{ i18n.t()['labResults.add'] || 'Shto Rezultat' }}
          </button>
        </div>
      </div>

      <!-- Loading Skeleton -->
      @if (loading()) {
        <div class="px-4 mt-4 space-y-3">
          @for (i of [1,2,3]; track i) {
            <div class="bg-white rounded-2xl p-5 border border-gray-100 animate-pulse">
              <div class="flex gap-4">
                <div class="w-12 h-12 rounded-xl bg-gray-200"></div>
                <div class="flex-1 space-y-2">
                  <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div class="h-3 bg-gray-100 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          }
        </div>
      }

      <!-- Empty State -->
      @if (!loading() && labResults().length === 0) {
        <div class="flex flex-col items-center justify-center mt-20 px-4">
          <svg width="160" height="160" viewBox="0 0 160 160" fill="none" class="mb-6">
            <circle cx="80" cy="80" r="60" fill="#EEF2FF"/>
            <path d="M55 90 L70 90 M70 90 L70 65 M70 65 L90 65 L90 90 L110 90" stroke="#6366F1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <circle cx="80" cy="50" r="10" stroke="#C7D2FE" stroke-width="3" fill="none"/>
          </svg>
          <h3 class="text-xl font-extrabold text-gray-700 mb-2">
            {{ i18n.t()['labResults.empty'] || 'Nuk ka rezultate laboratorike' }}
          </h3>
          <p class="text-slate-400 text-center mb-6 text-sm">
            {{ i18n.t()['labResults.emptyHint'] || 'Shtoni rezultatet e testimit për të ndjekur shëndetin' }}
          </p>
          <button (click)="openAddModal()"
            class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-sm transition-all text-sm">
            <lucide-icon name="plus" class="text-inherit inline w-4 h-4 mr-1"></lucide-icon>
            {{ i18n.t()['labResults.addFirst'] || 'Shto rezultatin e parë' }}
          </button>
        </div>
      }

      <!-- Lab Results List -->
      @if (!loading() && labResults().length > 0) {
        <div class="px-4 mt-4 space-y-3">
          @for (lr of labResults(); track lr.id) {
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div class="p-5">
                <div class="flex items-start gap-4">
                  <!-- Icon -->
                  <div class="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                    <lucide-icon name="flask-conical" class="text-violet-500 w-5 h-5"></lucide-icon>
                  </div>

                  <!-- Info -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2">
                      <h3 class="font-bold text-gray-800 text-base truncate">{{ lr.testName }}</h3>
                      <span class="text-xs font-semibold text-slate-400 flex-shrink-0">
                        {{ formatDate(lr.date) }}
                      </span>
                    </div>

                    <!-- Result Value -->
                    <div class="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span class="text-lg font-extrabold text-gray-800">{{ lr.result }}</span>
                      @if (lr.unit) {
                        <span class="text-sm text-slate-400">{{ lr.unit }}</span>
                      }
                      @if (lr.referenceRange) {
                        <span class="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                          {{ i18n.t()['labResults.refRange'] || 'Ref' }}: {{ lr.referenceRange }}
                        </span>
                      }
                    </div>

                    <!-- Type badge -->
                    @if (lr.type) {
                      <div class="mt-1">
                        <span class="text-xs font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">
                          {{ getTypeLabel(lr.type) }}
                        </span>
                      </div>
                    }

                    <!-- Doctor -->
                    @if (lr.doctor) {
                      <div class="flex items-center gap-2 mt-1 text-xs text-slate-400">
                        <lucide-icon name="stethoscope" class="w-3.5 h-3.5 flex-shrink-0"></lucide-icon>
                        <span>{{ lr.doctor }}</span>
                      </div>
                    }

                    <!-- Attachments badge -->
                    @if (lr.attachments && lr.attachments.length > 0) {
                      <div class="flex items-center gap-1.5 mt-2">
                        <span class="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <lucide-icon name="paperclip" class="w-3 h-3"></lucide-icon>
                          {{ lr.attachments.length }} {{ i18n.t()['labResults.attachments'] || 'Dokumente' }}
                        </span>
                      </div>
                    }
                  </div>
                </div>

                <!-- Notes -->
                @if (lr.notes) {
                  <div class="mt-3 text-xs text-slate-500 bg-slate-50 rounded-xl p-3">
                    {{ lr.notes }}
                  </div>
                }

                <!-- Actions -->
                <div class="flex items-center gap-2 mt-4">
                  <button (click)="openViewModal(lr)"
                    class="flex-1 py-2 rounded-xl text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-all flex items-center justify-center gap-1.5">
                    <lucide-icon name="eye" class="w-3.5 h-3.5"></lucide-icon>
                    {{ i18n.t()['labResults.view'] || 'Shiko Detajet' }}
                  </button>
                  <button (click)="openEditModal(lr)"
                    class="flex-1 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all flex items-center justify-center gap-1.5">
                    <lucide-icon name="pencil" class="w-3.5 h-3.5"></lucide-icon>
                    {{ i18n.t()['medications.edit'] || 'Redakto' }}
                  </button>
                  <button (click)="confirmDelete(lr)"
                    class="flex-1 py-2 rounded-xl text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 transition-all flex items-center justify-center gap-1.5">
                    <lucide-icon name="trash-2" class="w-3.5 h-3.5"></lucide-icon>
                    {{ i18n.t()['labResults.delete'] || 'Fshi' }}
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>

    <!-- Add/Edit Modal -->
    @if (showModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
           (click)="closeModal()">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
             (click)="$event.stopPropagation()">

          <!-- Modal Header -->
          <div class="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
            <h2 class="text-xl font-extrabold text-gray-800">
              {{ editingResult() ? (i18n.t()['labResults.editResult'] || 'Redakto Rezultatin') : (i18n.t()['labResults.addResult'] || 'Shto Rezultat Laboratori') }}
            </h2>
            <button (click)="closeModal()" class="p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <lucide-icon name="x" class="w-5 h-5 text-slate-400"></lucide-icon>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6 space-y-5">

            <!-- Test Name -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['labResults.testName'] || 'Emri i Testit' }} *
              </label>
              <input type="text" [(ngModel)]="formTestName"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm font-medium"
                [placeholder]="i18n.t()['labResults.testNamePlaceholder'] || 'P.sh. Gjak i plotë'">
            </div>

            <!-- Type -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['labResults.type'] || 'Lloji i Testit' }}
                <span class="text-slate-400 normal-case font-normal text-xs ml-1">({{ i18n.t()['labResults.optional'] || 'opsionale' }})</span>
              </label>
              <select [(ngModel)]="formType"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm font-medium">
                <option value="">--</option>
                @for (opt of getTypeOptions(); track opt.value) {
                  <option [value]="opt.value">{{ opt.label }}</option>
                }
              </select>
            </div>

            <!-- Result + Unit -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">
                  {{ i18n.t()['labResults.result'] || 'Rezultati' }} *
                </label>
                <input type="text" [(ngModel)]="formResult"
                  class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm font-medium">
              </div>
              <div>
                <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">
                  {{ i18n.t()['labResults.unit'] || 'Njësia' }}
                </label>
                <input type="text" [(ngModel)]="formUnit"
                  class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm font-medium"
                  placeholder="g/dL">
              </div>
            </div>

            <!-- Reference Range -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['labResults.referenceRange'] || 'Vlera Referente' }}
                <span class="text-slate-400 normal-case font-normal text-xs ml-1">({{ i18n.t()['labResults.optional'] || 'opsionale' }})</span>
              </label>
              <input type="text" [(ngModel)]="formReferenceRange"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm font-medium"
                placeholder="P.sh. 12.0 - 16.0">
            </div>

            <!-- Date -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['labResults.date'] || 'Data e Testit' }} *
              </label>
              <input type="date" [(ngModel)]="formDate"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm">
            </div>

            <!-- Doctor -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['labResults.doctor'] || 'Doktori' }}
                <span class="text-slate-400 normal-case font-normal text-xs ml-1">({{ i18n.t()['labResults.optional'] || 'opsionale' }})</span>
              </label>
              <input type="text" [(ngModel)]="formDoctor"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm font-medium"
                [placeholder]="i18n.t()['labResults.doctorPlaceholder'] || 'P.sh. Dr. Arben Basha'">
            </div>

            <!-- Notes -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['labResults.notes'] || 'Shënime' }}
                <span class="text-slate-400 normal-case font-normal text-xs ml-1">({{ i18n.t()['labResults.optional'] || 'opsionale' }})</span>
              </label>
              <textarea [(ngModel)]="formNotes" rows="2" maxlength="500"
                class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-800 text-sm resize-none"
                [placeholder]="i18n.t()['labResults.notesPlaceholder'] || 'Shëno detajet shtesë...'"></textarea>
            </div>

            <!-- Attachments -->
            <div>
              <label class="block text-xs font-bold text-primary-700 mb-2 uppercase tracking-wider">
                {{ i18n.t()['labResults.attachments'] || 'Dokumente' }}
                <span class="text-slate-400 normal-case font-normal text-xs ml-1">({{ i18n.t()['labResults.optional'] || 'opsionale' }})</span>
              </label>

              <!-- Drop zone -->
              @if (pendingFiles().length < MAX_FILES) {
                <div
                  class="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all"
                  (click)="fileInput.click()"
                  (dragover)="onDragOver($event)"
                  (dragleave)="onDragLeave($event)"
                  (drop)="onDrop($event)">
                  <lucide-icon name="upload-cloud" class="w-8 h-8 text-slate-400 mx-auto mb-2"></lucide-icon>
                  <p class="text-sm text-slate-500">{{ i18n.t()['labResults.dropZoneHint'] || 'Zvëre dokumentin ose kliko për të zgjedhur' }}</p>
                  <p class="text-xs text-slate-400 mt-1">PDF, PNG, JPG, WebP · max 10MB</p>
                </div>
                <input #fileInput type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/png,image/jpeg,image/webp" class="hidden" (change)="onFileSelected($event)">
              }

              <!-- File list -->
              @if (pendingFiles().length > 0) {
                <div class="mt-3 space-y-2">
                  @for (file of pendingFiles(); track $index) {
                    <div class="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-200">
                      <div class="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        @if (file.mimeType === 'application/pdf') {
                          <lucide-icon name="file-text" class="w-5 h-5 text-red-500"></lucide-icon>
                        } @else {
                          <lucide-icon name="image" class="w-5 h-5 text-indigo-500"></lucide-icon>
                        }
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold text-gray-800 truncate">{{ file.name }}</p>
                        <p class="text-xs text-slate-400">{{ formatFileSize(file.size) }}</p>
                      </div>
                      <button (click)="removePendingFile($index)"
                        class="p-1.5 rounded-lg hover:bg-red-100 text-red-500 transition-colors flex-shrink-0">
                        <lucide-icon name="x" class="w-4 h-4"></lucide-icon>
                      </button>
                    </div>
                  }
                </div>
              }

              <!-- Error -->
              @if (fileError()) {
                <div class="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold mt-2">
                  {{ fileError() }}
                </div>
              }
            </div>

            <!-- Save Error -->
            @if (saveError()) {
              <div class="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold">
                {{ saveError() }}
              </div>
            }
          </div>

          <!-- Modal Footer -->
          <div class="px-6 pb-6 flex gap-3">
            <button (click)="closeModal()"
              class="flex-1 py-3.5 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all text-sm">
              {{ i18n.t()['labResults.cancel'] || 'Anulo' }}
            </button>
            <button (click)="saveLabResult()"
              [disabled]="saving() || !canSave()"
              class="flex-1 py-3.5 rounded-2xl font-bold text-white bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm flex items-center justify-center gap-2">
              @if (saving()) {
                <lucide-icon name="loader-2" class="w-4 h-4 animate-spin"></lucide-icon>
                {{ i18n.t()['labResults.saving'] || 'Duke ruajtur...' }}
              } @else {
                <lucide-icon name="check" class="w-4 h-4"></lucide-icon>
                {{ i18n.t()['labResults.save'] || 'Ruaj' }}
              }
            </button>
          </div>
        </div>
      </div>
    }

    <!-- View Modal -->
    @if (viewingResult()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
           (click)="viewingResult.set(null)">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md"
             (click)="$event.stopPropagation()">

          <!-- Modal Header -->
          <div class="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
            <h2 class="text-xl font-extrabold text-gray-800">
              {{ viewingResult()!.testName }}
            </h2>
            <button (click)="viewingResult.set(null)" class="p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <lucide-icon name="x" class="w-5 h-5 text-slate-400"></lucide-icon>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6 space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-slate-50 rounded-2xl p-4">
                <p class="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">{{ i18n.t()['labResults.result'] || 'Rezultati' }}</p>
                <p class="text-lg font-extrabold text-gray-800">{{ viewingResult()!.result }}
                  @if (viewingResult()!.unit) {
                    <span class="text-sm font-normal text-slate-400">{{ viewingResult()!.unit }}</span>
                  }
                </p>
              </div>
              <div class="bg-slate-50 rounded-2xl p-4">
                <p class="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">{{ i18n.t()['labResults.date'] || 'Data' }}</p>
                <p class="text-lg font-extrabold text-gray-800">{{ formatDate(viewingResult()!.date) }}</p>
              </div>
            </div>

            @if (viewingResult()!.type) {
              <div class="bg-violet-50 rounded-2xl p-4">
                <p class="text-xs text-violet-500 font-semibold uppercase tracking-wider mb-1">{{ i18n.t()['labResults.type'] || 'Lloji i Testit' }}</p>
                <p class="text-base font-bold text-violet-700">{{ getTypeLabel(viewingResult()!.type!) }}</p>
              </div>
            }

            @if (viewingResult()!.referenceRange) {
              <div class="bg-violet-50 rounded-2xl p-4">
                <p class="text-xs text-violet-500 font-semibold uppercase tracking-wider mb-1">{{ i18n.t()['labResults.referenceRange'] || 'Vlera Referente' }}</p>
                <p class="text-base font-bold text-violet-700">{{ viewingResult()!.referenceRange }}</p>
              </div>
            }

            @if (viewingResult()!.doctor) {
              <div class="flex items-center gap-2 text-sm text-slate-500">
                <lucide-icon name="stethoscope" class="w-4 h-4 text-slate-400"></lucide-icon>
                <span>{{ viewingResult()!.doctor }}</span>
              </div>
            }

            @if (viewingResult()!.notes) {
              <div class="bg-slate-50 rounded-2xl p-4">
                <p class="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">{{ i18n.t()['labResults.notes'] || 'Shënime' }}</p>
                <p class="text-sm text-slate-600">{{ viewingResult()!.notes }}</p>
              </div>
            }

            <!-- Attachments section -->
            @if (viewingResult()!.attachments && viewingResult()!.attachments.length > 0) {
              <div class="border border-slate-200 rounded-2xl overflow-hidden">
                <div class="px-4 py-3 bg-slate-50 border-b border-slate-200">
                  <p class="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {{ i18n.t()['labResults.attachments'] || 'Dokumente' }} ({{ viewingResult()!.attachments!.length }})
                  </p>
                </div>
                <div class="p-4 space-y-3">
                  @for (att of viewingResult()!.attachments; track $index) {
                    <div class="flex items-center gap-3 bg-white border border-slate-100 rounded-xl p-3">
                      <div class="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <lucide-icon name="file-text" class="w-5 h-5 text-indigo-500"></lucide-icon>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold text-gray-700">{{ i18n.t()['labResults.attachments'] || 'Dokumenti' }} {{ $index + 1 }}</p>
                      </div>
                      <div class="flex gap-1">
                        <button (click)="viewAttachment(att)"
                          class="p-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-colors">
                          <lucide-icon name="eye" class="w-4 h-4"></lucide-icon>
                        </button>
                        <button (click)="downloadAttachment(att, $index)"
                          class="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors">
                          <lucide-icon name="download" class="w-4 h-4"></lucide-icon>
                        </button>
                      </div>
                    </div>
                  }
                </div>
              </div>
            }
          </div>

          <!-- Modal Footer -->
          <div class="px-6 pb-6">
            <button (click)="viewingResult.set(null)"
              class="w-full py-3.5 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all text-sm">
              {{ i18n.t()['labResults.close'] || 'Mbyll' }}
            </button>
          </div>
        </div>
      </div>
    }

    <!-- Attachment Viewer Modal -->
    @if (viewingAttachment()) {
      <div class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
           (click)="viewingAttachment.set(null)">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
             (click)="$event.stopPropagation()">

          <!-- Viewer Header -->
          <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-slate-50">
            <p class="text-sm font-bold text-gray-700">{{ i18n.t()['labResults.viewAttachment'] || 'Shiko Dokumentin' }}</p>
            <div class="flex gap-2">
              <button (click)="downloadAttachment(viewingAttachment()!, 0)"
                class="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-colors">
                <lucide-icon name="download" class="w-4 h-4"></lucide-icon>
              </button>
              <button (click)="viewingAttachment.set(null)" class="p-2 rounded-xl hover:bg-gray-200 text-gray-500 transition-colors">
                <lucide-icon name="x" class="w-5 h-5"></lucide-icon>
              </button>
            </div>
          </div>

          <!-- Viewer Body -->
          <div class="flex-1 overflow-auto p-4 bg-gray-100">
            @if (isPdfAttachment(viewingAttachment()!)) {
              <iframe [src]="getPdfUrl(viewingAttachment()!)" class="w-full h-full min-h-[500px] rounded-xl border-0"></iframe>
            } @else {
              <img [src]="viewingAttachment()!" class="max-w-full max-h-full object-contain rounded-xl mx-auto" alt="Attachment">
            }
          </div>
        </div>
      </div>
    }

    <!-- Delete Confirmation Modal -->
    @if (showDeleteModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
           (click)="showDeleteModal.set(false)">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6"
             (click)="$event.stopPropagation()">
          <div class="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <lucide-icon name="trash-2" class="text-red-500 w-6 h-6"></lucide-icon>
          </div>
          <h3 class="text-lg font-extrabold text-gray-800 text-center mb-2">
            {{ i18n.t()['labResults.deleteConfirmTitle'] || 'Fshij Rezultatin?' }}
          </h3>
          <p class="text-slate-500 text-sm text-center mb-6">
            {{ deletingResult()?.testName }}
          </p>
          <div class="flex gap-3">
            <button (click)="showDeleteModal.set(false)"
              class="flex-1 py-3 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all text-sm">
              {{ i18n.t()['labResults.cancel'] || 'Anulo' }}
            </button>
            <button (click)="deleteLabResult()"
              class="flex-1 py-3 rounded-2xl font-bold text-white bg-red-500 hover:bg-red-600 transition-all text-sm">
              {{ i18n.t()['labResults.delete'] || 'Fshi' }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: []
})
export class LabResultsComponent implements OnInit, OnDestroy {
  i18n = inject(I18nService);
  data = inject(DataService);
  sanitizer = inject(DomSanitizer);

  // State
  loading = signal(false);
  saving = signal(false);
  showModal = signal(false);
  showDeleteModal = signal(false);
  viewingResult = signal<LabResultRecord | null>(null);
  deletingResult = signal<LabResultRecord | null>(null);
  editingResult = signal<LabResultRecord | null>(null);
  saveError = signal<string | null>(null);
  fileError = signal<string | null>(null);
  viewingAttachment = signal<string | null>(null);
  pendingFiles = signal<PendingFile[]>([]);
  isDragOver = signal(false);

  readonly MAX_FILES = MAX_FILES;

  // Form fields
  formTestName = signal('');
  formResult = signal('');
  formUnit = signal('');
  formReferenceRange = signal('');
  formDate = signal('');
  formDoctor = signal('');
  formNotes = signal('');
  formType = signal('');

  // Computed
  activeChild = computed(() => {
    const id = this.data.activeChildId();
    return this.data.children().find(c => c.id === id) ?? null;
  });

  labResults = computed(() => this.data.labResults());

  canSave = computed(() =>
    !!(this.formTestName().trim() && this.formResult().trim() && this.formDate())
  );

  ngOnInit() {
    this.loadLabResults();
  }

  ngOnDestroy() {
    this.pendingFiles.set([]);
    this.viewingAttachment.set(null);
    this.viewingResult.set(null);
  }

  async loadLabResults() {
    const childId = this.data.activeChildId();
    if (!childId) return;

    this.loading.set(true);
    try {
      await this.data.loadLabResults(childId);
    } catch {
      // silent fail
    } finally {
      this.loading.set(false);
    }
  }

  openAddModal() {
    this.editingResult.set(null);
    this.formTestName.set('');
    this.formResult.set('');
    this.formUnit.set('');
    this.formReferenceRange.set('');
    this.formDate.set(new Date().toISOString().split('T')[0]);
    this.formDoctor.set('');
    this.formNotes.set('');
    this.formType.set('');
    this.pendingFiles.set([]);
    this.saveError.set(null);
    this.fileError.set(null);
    this.showModal.set(true);
  }

  openEditModal(lr: LabResultRecord) {
    this.editingResult.set(lr);
    this.formTestName.set(lr.testName);
    this.formResult.set(lr.result);
    this.formUnit.set(lr.unit || '');
    this.formReferenceRange.set(lr.referenceRange || '');
    this.formDate.set(lr.date.split('T')[0]);
    this.formDoctor.set(lr.doctor || '');
    this.formNotes.set(lr.notes || '');
    this.formType.set(lr.type || '');
    // Load existing attachments, preserving original filenames where encoded
    const existing = (lr.attachments || []).map((att, i) => {
      const filename = this.getFilenameFromAtt(att, i);
      return {
        name: filename,
        size: Math.round((att.length * 3) / 4), // rough base64 estimate
        base64: att,
        mimeType: this.guessMimeType(att),
      };
    });
    this.pendingFiles.set(existing);
    this.saveError.set(null);
    this.fileError.set(null);
    this.showModal.set(true);
  }

  openViewModal(lr: LabResultRecord) {
    this.viewingResult.set(lr);
  }

  closeModal() {
    this.showModal.set(false);
    this.editingResult.set(null);
  }

  async saveLabResult() {
    if (!this.canSave()) return;

    const childId = this.data.activeChildId();
    if (!childId) return;

    this.saving.set(true);
    this.saveError.set(null);

    const attachments = this.pendingFiles().map(f => f.base64);

    const payload: any = {
      testName: this.formTestName().trim(),
      result: this.formResult().trim(),
      unit: this.formUnit().trim() || undefined,
      referenceRange: this.formReferenceRange().trim() || undefined,
      date: new Date(this.formDate()).toISOString(),
      doctor: this.formDoctor().trim() || undefined,
      notes: this.formNotes().trim() || undefined,
      type: this.formType().trim() || undefined,
      attachments,
    };

    try {
      if (this.editingResult()) {
        await this.data.updateLabResult(this.editingResult()!.id, payload);
      } else {
        await this.data.addLabResult(childId, payload);
      }
      // Reload to get server data
      await this.data.loadLabResults(childId);
      this.closeModal();
    } catch (err: any) {
      this.saveError.set(err?.message || this.i18n.t()['labResults.saveError'] || 'Ruajtja dështoi.');
    } finally {
      this.saving.set(false);
    }
  }

  confirmDelete(lr: LabResultRecord) {
    this.deletingResult.set(lr);
    this.showDeleteModal.set(true);
  }

  async deleteLabResult() {
    const lr = this.deletingResult();
    if (!lr) return;

    try {
      await this.data.deleteLabResult(lr.id);
      const childId = this.data.activeChildId();
      if (childId) await this.data.loadLabResults(childId);
    } catch {
      // silent
    } finally {
      this.showDeleteModal.set(false);
      this.deletingResult.set(null);
    }
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString(this.i18n.isSq() ? 'sq-AL' : 'en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  getTypeLabel(type: string): string {
    const labels: Record<string, Record<string, string>> = {
      hemogram: { sq: 'Hemogram', en: 'Hemogram' },
      urinalysis: { sq: 'Analizë Urine', en: 'Urinalysis' },
      biochemistry: { sq: 'Biokim i gjakut', en: 'Blood Biochemistry' },
      immunology: { sq: 'Imunologji', en: 'Immunology' },
      other: { sq: 'Tjetër', en: 'Other' },
    };
    return labels[type]?.[this.i18n.isSq() ? 'sq' : 'en'] || type;
  }

  // ─── File handling ───────────────────────────────────────────

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver.set(false);
    const files = event.dataTransfer?.files;
    if (files) this.processFiles(files);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) this.processFiles(input.files);
    input.value = ''; // reset so same file can be re-selected
  }

  private processFiles(files: FileList) {
    this.fileError.set(null);

    if (this.pendingFiles().length >= MAX_FILES) {
      this.fileError.set(this.i18n.t()['labResults.maxFilesReached'] || 'Maksimumi 5 fajlla për rezultat');
      return;
    }

    const remaining = MAX_FILES - this.pendingFiles().length;
    const toProcess = Array.from(files).slice(0, remaining);

    for (const file of toProcess) {
      if (file.size > MAX_FILE_SIZE) {
        this.fileError.set(this.i18n.t()['labResults.fileTooBig'] || 'Skedari tejkalon 10MB');
        continue;
      }
      if (!ALLOWED_TYPES.includes(file.type)) {
        this.fileError.set(this.i18n.t()['labResults.fileTypeError'] || 'Lloji i skedarit nuk mbështetet. Vetëm PDF dhe imazhe.');
        continue;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = (e.target?.result as string).split(',')[1];
        // Encode filename into attachment so it's preserved on edit
        const encodedAtt = this.encodeAttWithFilename(base64, file.name);
        const pending: PendingFile = {
          name: file.name,
          size: file.size,
          base64: encodedAtt,
          mimeType: file.type,
        };
        this.pendingFiles.update(list => [...list, pending]);
      };
      reader.readAsDataURL(file);
    }

    if (Array.from(files).length > remaining) {
      this.fileError.set(this.i18n.t()['labResults.maxFilesReached'] || 'Maksimumi 5 fajlla për rezultat');
    }
  }

  removePendingFile(index: number) {
    this.pendingFiles.update(list => list.filter((_, i) => i !== index));
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  guessMimeType(base64: string): string {
    if (base64.startsWith('/9j/')) return 'image/jpeg';
    if (base64.startsWith('iVBOR')) return 'image/png';
    if (base64.startsWith('UEs')) return 'application/pdf';
    if (base64.startsWith('JVBER')) return 'application/pdf';
    return 'application/octet-stream';
  }

  isPdfAttachment(base64: string): boolean {
    return this.guessMimeType(base64) === 'application/pdf';
  }

  getPdfUrl(base64: string): string {
    const mime = this.guessMimeType(base64);
    return `data:${mime};base64,${base64}`;
  }

  viewAttachment(base64: string) {
    this.viewingAttachment.set(base64);
  }

  downloadAttachment(base64: string, index: number) {
    const mime = this.guessMimeType(base64);
    const ext = mime.split('/')[1];
    const filename = this.getFilenameFromAtt(base64, index);
    const dataUrl = `data:${mime};base64,${base64}`;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    a.click();
  }

  // ─── Filename encoding (preserves original name through edit cycles) ──

  private encodeAttWithFilename(base64: string, filename: string): string {
    try {
      // Base64-encode the filename to avoid corrupting the base64 data
      const b64Name = btoa(encodeURIComponent(filename));
      return `__KDOC__${b64Name}::__${base64}`;
    } catch {
      return base64;
    }
  }

  private getFilenameFromAtt(base64: string, index: number): string {
    const marker = '__KDOC__';
    const sep = '::__';
    const idx = base64.indexOf(marker);
    if (idx === -1) {
      // Legacy attachment without filename encoding — use generic name
      return `${this.i18n.t()['labResults.attachments'] || 'Dokumenti'} ${index + 1}`;
    }
    try {
      const endIdx = base64.indexOf(sep, idx);
      if (endIdx === -1) return `${this.i18n.t()['labResults.attachments'] || 'Dokumenti'} ${index + 1}`;
      const b64Name = base64.substring(idx + marker.length, endIdx);
      return decodeURIComponent(atob(b64Name));
    } catch {
      return `${this.i18n.t()['labResults.attachments'] || 'Dokumenti'} ${index + 1}`;
    }
  }

  // ─── Type dropdown options ────────────────────────────────────────

  getTypeOptions() {
    return [
      { value: 'hemogram', label: this.i18n.t()['labResults.typeHemogram'] || 'Hemogram' },
      { value: 'urinalysis', label: this.i18n.t()['labResults.typeUrinalysis'] || 'Urinalysis' },
      { value: 'biochemistry', label: this.i18n.t()['labResults.typeBiochemistry'] || 'Blood Biochemistry' },
      { value: 'immunology', label: this.i18n.t()['labResults.typeImmunology'] || 'Immunology' },
      { value: 'other', label: this.i18n.t()['labResults.typeOther'] || 'Other' },
    ];
  }
}