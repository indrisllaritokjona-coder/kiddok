# SPEC — Sprint 5: PDF/CSV Export Module

**Project:** KidDok (Angular 19 + NestJS)
**Author:** kiddok-architect
**Status:** Draft → Ready for Executor

---

## 1. Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    ShellComponent                         │
│  (hosts header + page content, manages viewState)        │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐│
│  │  HeaderComponent                                    ││
│  │  [Export btn]  [Child pill + dropdown] [Lang] [⚙]  ││
│  └─────────────────────────────────────────────────────┘│
│                                                          │
│  ── Export button → emits → openExportModal() signal ──  │
│                        ↓                                  │
│               ShellComponent opens                       │
│               <app-export-modal>                          │
└─────────────────────────────────────────────────────────┘

   ExportModalComponent (Angular dialog/modal)
   ├── DateFromInput    (type="date")
   ├── DateToInput      (type="date")
   ├── FormatSelector   (radio: PDF | CSV)
   └── ExportBtn → ExportService.export() → HTTP GET blob
                           ↓
                  Backend ExportController
                  GET /export/:childId/pdf?from=&to=
                  GET /export/:childId/csv?from=&to=
                           ↓
                  response: blob → browser auto-download
```

### Angular Module Structure

```
src/app/
├── components/
│   ├── export-modal/                ← NEW (modal component)
│   │   ├── export-modal.component.ts
│   │   └── export-modal.component.css
│   └── header/
│       └── header.component.ts      ← MODIFIED (add Export button)
├── services/
│   └── export.service.ts            ← NEW (HTTP + blob download)
└── core/i18n/i18n.service.ts        ← MODIFIED (add export labels)
```

### Backend (already exists — no changes)

```
backend/src/export/
├── export.controller.ts    (GET /export/:childId/pdf, GET /export/:childId/csv)
├── export.service.ts
└── export.module.ts
```

---

## 2. Component Breakdown

### 2.1 ExportModalComponent

**Selector:** `app-export-modal`
**Standalone:** yes
**Inputs:**
- `childId: string` — which child to export for
- `isOpen: boolean` — controls visibility
**Outputs:**
- `closed: EventEmitter<void>` — emitted on backdrop-click or X

**Template:**
```html
<!-- Backdrop -->
<div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
     (click)="onBackdropClick($event)">

  <!-- Card -->
  <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 animate-slide-up"
       (click)="$event.stopPropagation()">

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-extrabold text-gray-800">{{ t()['export.title'] }}</h2>
      <button (click)="close()" [attr.aria-label]="t()['common.close']">
        <lucide-icon name="x"></lucide-icon>
      </button>
    </div>

    <!-- Date Range -->
    <div class="mb-5">
      <label class="block text-sm font-bold text-gray-600 mb-2">{{ t()['export.dateRange'] }}</label>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="text-xs text-gray-500 mb-1 block">{{ t()['export.from'] }}</label>
          <input type="date" [(ngModel)]="dateFrom" class="input-base" />
        </div>
        <div>
          <label class="text-xs text-gray-500 mb-1 block">{{ t()['export.to'] }}</label>
          <input type="date" [(ngModel)]="dateTo" class="input-base" />
        </div>
      </div>
    </div>

    <!-- Format Selector -->
    <div class="mb-5">
      <label class="block text-sm font-bold text-gray-600 mb-2">{{ t()['export.format'] }}</label>
      <div class="flex gap-4">
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="radio" value="pdf" [(ngModel)]="format" />
          <lucide-icon name="file-text" class="text-inherit"></lucide-icon>
          <span class="text-sm font-medium">{{ t()['export.pdf'] }}</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="radio" value="csv" [(ngModel)]="format" />
          <lucide-icon name="table" class="text-inherit"></lucide-icon>
          <span class="text-sm font-medium">{{ t()['export.csv'] }}</span>
        </label>
      </div>
    </div>

    <!-- Large Range Warning -->
    @if (showLargeRangeWarning()) {
      <div class="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 flex gap-2">
        <lucide-icon name="alert-triangle" class="text-inherit shrink-0"></lucide-icon>
        {{ t()['export.largeRangeWarning'] }}
      </div>
    }

    <!-- No Data Info -->
    @if (noDataInRange) {
      <div class="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-700 flex gap-2">
        <lucide-icon name="info" class="text-inherit shrink-0"></lucide-icon>
        {{ t()['export.noDataInRange'] }}
      </div>
    }

    <!-- Export Button -->
    <button type="button"
            (click)="onExport()"
            [disabled]="loading"
            class="btn-primary w-full flex items-center justify-center gap-2">
      @if (loading) {
        <span class="animate-spin">
          <lucide-icon name="loader-2"></lucide-icon>
        </span>
        <span>{{ t()['export.generating'] }}</span>
      } @else {
        <lucide-icon name="download" class="text-inherit"></lucide-icon>
        <span>{{ t()['export.exportBtn'] }}</span>
      }
    </button>
  </div>
</div>
```

**State (signals):**
```typescript
dateFrom  = signal<string>('');   // ISO date string YYYY-MM-DD
dateTo    = signal<string>('');   // ISO date string YYYY-MM-DD
format    = signal<'pdf'|'csv'>('pdf');
loading   = signal<boolean>(false);
noDataInRange = signal<boolean>(false);
error     = signal<string>('');
```

**Large range threshold:** > 365 days → warning shown.

---

### 2.2 ExportService

```typescript
@Injectable({ providedIn: 'root' })
export class ExportService {
  private http = inject(HttpClient);
  private api  = inject(API_URL); // e.g. environment.apiUrl

  async exportPdf(childId: string, dateFrom: string, dateTo: string): Promise<void>;
  async exportCsv(childId: string, dateFrom: string, dateTo: string): Promise<void>;
}
```

Both methods:
1. GET `/export/{childId}/{pdf|csv}?from={dateFrom}&to={dateTo}` with `Authorization: Bearer <token>`
2. Response type: `arraybuffer`
3. Extract filename from `Content-Disposition` header (fallback: `kiddok-export.{pdf|csv}`)
4. Trigger browser download via `Blob` + `URL.createObjectURL`
5. Throw on non-2xx response (catches backend errors)

---

### 2.3 HeaderComponent Modification

Add Export button in the right section of the header, before or after the child switcher pill.

**Template addition:**
```html
<!-- Export button (app view only, when a child is active) -->
@if (viewState === 'app' && activeChild()) {
  <button type="button"
          (click)="exportRequested.emit()"
          class="flex items-center gap-2 px-3 py-2 rounded-xl bg-white shadow-soft border border-gray-100 hover:border-primary-300 hover:shadow-md transition-all text-gray-600 hover:text-primary-600"
          [attr.aria-label]="i18n.t()['export.trigger']">
    <lucide-icon name="download" class="text-inherit" aria-hidden="true"></lucide-icon>
    <span class="text-sm font-bold hidden sm:block">{{ i18n.t()['export.trigger'] }}</span>
  </button>
}
```

**Output added:**
```typescript
@Output() exportRequested = new EventEmitter<void>();
```

**ShellComponent wiring:**
```html
<app-header
  [viewState]="viewState()"
  (exportRequested)="openExportModal()"
  ... />
```

And add `<app-export-modal>` to ShellComponent template:
```html
@if (showExportModal()) {
  <app-export-modal
    [childId]="dataService.activeChildId()!"
    [isOpen]="showExportModal()"
    (closed)="showExportModal.set(false)" />
}
```

---

## 3. API Contract

### GET `/export/:childId/pdf`

**Query params:**
| Param  | Type   | Required | Notes |
|--------|--------|----------|-------|
| `from` | string | No       | ISO date `YYYY-MM-DD`; defaults to beginning of child's record history |
| `to`   | string | No       | ISO date `YYYY-MM-DD`; defaults to today |

**Headers:**
```
Authorization: Bearer <jwt>
```

**Response (200):**
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="kiddok-health-report-<childId>.pdf"
X-Generated-At: <iso timestamp>
<binary pdf buffer>
```

**Error responses (throw NotFoundException / ForbiddenException / 500):**
```json
{ "statusCode": 404, "message": "Child not found." }
{ "statusCode": 403, "message": "Forbidden." }
```

### GET `/export/:childId/csv`

**Query params:** same as PDF.

**Response (200):**
```
Content-Type: text/csv; charset=utf-8
Content-Disposition: attachment; filename="<childName>_health_export_<date>.csv"
X-Generated-At: <iso timestamp>
X-Child-Id: <childId>
<csv text>
```

---

## 4. Data Flow

```
User clicks "Export" button in header
    ↓
ShellComponent.openExportModal()
    ↓
showExportModal signal = true
    ↓
ExportModal opens (childId from activeChildId)
    ↓
User selects dates + format → clicks "Export"
    ↓
ExportService.exportPdf() OR .exportCsv()
    ↓
HttpClient GET with Authorization header, responseType: 'arraybuffer'
    ↓
Backend validates JWT + child ownership
    ↓
Backend queries data within [from, to] range
    ↓
Backend streams PDF/CSV with Content-Disposition: attachment
    ↓
Angular receives arraybuffer
    ↓
Blob created → Object URL → <a download> click → browser downloads
    ↓
URL.revokeObjectURL() cleanup
    ↓
Modal closes (or error toast shown)
```

---

## 5. Edge Cases

| Edge Case | Handling |
|-----------|----------|
| No data in selected range | Backend returns empty PDF/CSV with a "No records found" note. Modal shows info message via `X-Has-Data: false` header check OR by pre-fetching a lightweight count endpoint. Simpler: show info toast after download if file is empty (0 bytes). |
| Large date range (>365 days) | Modal shows amber warning banner before export. Backend still processes. |
| Backend not responding (network error) | HttpClient error → `catchError` → toast error: `i18n.t()['export.errorServer']` |
| Backend returns 4xx/5xx | `catchError` → parse error body → toast: `error.message ?? i18n.t()['export.errorServer']` |
| No active child (shouldn't happen — button hidden) | Guard: button only shown when `activeChild()` is truthy. |
| Token expired mid-export | HttpInterceptor catches 401 → triggers re-auth flow. |
| Date "from" > date "to" | Inline validation: disable Export button, show red error text. |
| Downloaded file wrong extension | Backend guarantees correct `Content-Type`. Client trusts it. |
| Offline | `OfflineService.isOnline()` check before XHR; if offline, show toast `i18n.t()['common.offline']`. |

---

## 6. i18n Labels (SQ + EN) — 12 keys

| Key | SQ (Albanian) | EN (English) |
|-----|---------------|-------------|
| `export.title` | Eksportim | Export |
| `export.trigger` | Eksporto | Export |
| `export.dateRange` | Periudha | Date Range |
| `export.from` | Nga | From |
| `export.to` | Deri | To |
| `export.format` | Formati | Format |
| `export.pdf` | PDF | PDF |
| `export.csv` | CSV | CSV |
| `export.exportBtn` | Shkarko | Download |
| `export.generating` | Duke gjeneruar... | Generating... |
| `export.noDataInRange` | Nuk ka të dhëna në periudhën e zgjedhur. | No data in the selected range. |
| `export.largeRangeWarning` | Periudha e zgjedhur është e gjerë — eksportimi mund të zgjasë. | Selected range is large — export may take longer. |
| `export.errorServer` | Diqka shkoi keq. Riprovoni. | Something went wrong. Please try again. |
| `common.close` | Mbylle | Close |

**Total: 14 keys** (12 requirements + 2 shared)

---

## 7. Execution Roadmap

### Step 1: ExportService
- Create `export.service.ts`
- Implement `exportPdf()` and `exportCsv()` with `HttpClient` blob download pattern
- Inject `AuthService` (or use `HttpInterceptor`) for Bearer token

### Step 2: I18n labels
- Add all 14 keys to `I18nService` translation map (both SQ and EN)

### Step 3: ExportModalComponent
- Create `components/export-modal/` directory
- Build component with date inputs, radio selector, loading state, warning/info banners
- Add `largeRangeWarning()` computed signal (>365 days)
- Wire `onExport()` → `ExportService` → handle success/error

### Step 4: ShellComponent integration
- Add `showExportModal = signal(false)` and `openExportModal()` method
- Add `<app-export-modal>` to template with `[childId]` and `(closed)` binding

### Step 5: HeaderComponent
- Add `exportRequested` @Output EventEmitter
- Add Export button in template (hidden unless `viewState === 'app'` and `activeChild()`)
- Pass `(exportRequested)` to ShellComponent

### Step 6: Styles
- Modal uses existing design tokens (rounded-3xl, shadow-2xl, bg-white, etc.)
- Ensure responsive: full-screen on mobile, centered card on desktop

### Step 7: Edge case testing
- Test with no data in range
- Test with range > 365 days
- Test with from > to
- Test with network failure
- Test with 401 from backend

---

## 8. Pending Fixes (from Prior Reviews)

> These should be tracked separately and do NOT block Sprint 5:
> 1. **Temperature Diary**: Chart effect memory leak, silent save failure
> 2. **Growth Tracking**: OnDestroy missing, no typed DTO, effect flicker

Sprint 5 does not touch those modules. If similar patterns are found during export work, fix them and note in commit.

---

## 9. Acceptance Criteria

- [ ] Export button visible in header when a child is active
- [ ] Export modal opens on button click
- [ ] Date range picker works (from/to, validates from ≤ to)
- [ ] PDF and CSV radio buttons work
- [ ] PDF export downloads a valid `.pdf` file
- [ ] CSV export downloads a valid `.csv` file
- [ ] Loading spinner + "Duke gjeneruar..." text shown during request
- [ ] Error toast shown if backend fails
- [ ] Info message shown if no data in range (after download)
- [ ] Warning banner shown for range > 365 days
- [ ] All 14 i18n labels available in both SQ and EN
- [ ] No console errors in normal flow
- [ ] Module compiles and runs without errors
