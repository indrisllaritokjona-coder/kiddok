# KidDok — PDF/CSV Export Module: Technical Specification
**Architect:** The Architect  
**Date:** 2026-04-23  
**Status:** Draft → For Executor

---

## 1. Module Architecture

```
HeaderComponent (header.component.ts)
  └── Export Dropdown Button (inline in header right section)
        ├── ExportMenuDropdownComponent
        │     ├── Date Range Picker (from/to)
        │     ├── Format Selector (PDF | CSV radio)
        │     ├── Export button → triggers download
        │     └── Loading spinner overlay

DataService (data.service.ts)
  └── exportChildData(childId, format, from, to) → GET /export/:childId/pdf?from=&to=
                                               or GET /export/:childId/csv?from=&to=

AuthInterceptor (auth.interceptor.ts)
  └── Bearer token attached automatically
```

---

## 2. UI Placement

The **Export** button lives in the `header.component.ts`, in the right section of the header bar. It appears as a pill/button next to the existing child switcher pill.

### Button States
| State | Visual |
|-------|--------|
| Default | Icon + text "Export" |
| Hover | Elevated shadow, primary color tint |
| Loading | Spinner replaces icon, text "Duke eksportuar..." / "Exporting..." |
| Disabled | Opacity 50%, no pointer events |

### Dropdown Panel
- Appears below the export button (dropdown)
- White card, rounded-2xl, shadow, border
- Contains: Date range inputs + format selector + CTA button

---

## 3. Component: ExportMenuDropdown

### Template Structure

```html
<!-- Export Button in header -->
<button type="button" (click)="toggleExportMenu()"
        class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-soft border border-gray-100 hover:border-primary-300 hover:shadow-md transition-all"
        [disabled]="isExporting()">
  @if (isExporting()) {
    <span class="animate-spin">⟳</span>
    <span>{{ i18n.t()['export.exporting'] }}</span>
  } @else {
    <lucide-icon name="download"></lucide-icon>
    <span class="font-bold text-sm">{{ i18n.t()['export.button'] }}</span>
  }
</button>

<!-- Dropdown Panel -->
@if (showExportMenu()) {
  <div class="absolute right-0 top-full mt-2 w-80 bg-white rounded-3xl shadow-[...] border border-gray-100 p-5 z-50">

    <!-- Date Range -->
    <div class="mb-4">
      <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
        {{ i18n.t()['export.dateRange'] }}
      </label>
      <div class="flex gap-3">
        <div class="flex-1">
          <input type="date" [(ngModel)]="dateFrom" [max]="today"
                 class="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:border-primary-400 focus:ring-2 focus:ring-primary-100" />
        </div>
        <div class="flex-1">
          <input type="date" [(ngModel)]="dateTo" [max]="today"
                 class="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:border-primary-400 focus:ring-2 focus:ring-primary-100" />
        </div>
      </div>
      @if (dateRangeError()) {
        <p class="text-xs text-red-500 mt-1">{{ dateRangeError() }}</p>
      }
    </div>

    <!-- Format Selector -->
    <div class="mb-5">
      <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
        {{ i18n.t()['export.format'] }}
      </label>
      <div class="flex gap-3">
        <label class="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer transition-all"
               [class.border-primary-400]="selectedFormat === 'pdf'"
               [class.bg-primary-50]="selectedFormat === 'pdf'">
          <input type="radio" name="format" value="pdf" [(ngModel)]="selectedFormat" />
          <span class="font-bold text-sm">{{ i18n.t()['export.pdf'] }}</span>
        </label>
        <label class="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer transition-all"
               [class.border-primary-400]="selectedFormat === 'csv'"
               [class.bg-primary-50]="selectedFormat === 'csv'">
          <input type="radio" name="format" value="csv" [(ngModel)]="selectedFormat" />
          <span class="font-bold text-sm">{{ i18n.t()['export.csv'] }}</span>
        </label>
      </div>
    </div>

    <!-- CTA -->
    <button type="button" (click)="executeExport()"
            [disabled]="isExporting() || !dateFrom || !dateTo"
            class="w-full py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
      @if (isExporting()) {
        <span>{{ i18n.t()['export.exporting'] }}</span>
      } @else {
        <span>{{ i18n.t()['export.download'] }}</span>
      }
    </button>
  </div>
}
```

---

## 4. DataService Changes

### 4.1 New Method

```typescript
async exportChildData(
  childId: string,
  format: 'pdf' | 'csv',
  from?: string,
  to?: string
): Promise<void> {
  const token = localStorage.getItem('kiddok_access_token');
  const params = new HttpParams()
    .set('from', from ?? '')
    .set('to', to ?? '');

  const url = `${environment.apiUrl}/export/${childId}/${format}?${params.toString()}`;

  // Use window.open or anchor click to trigger download
  // Since backend returns a file blob, we use fetch + blob download
  const response = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) throw new Error('Export failed');

  const blob = await response.blob();
  const contentDisposition = response.headers.get('content-disposition') ?? '';
  const filename = contentDisposition.match(/filename="(.+)"/)?.[1] ?? `kiddok-export.${format}`;

  const urlBlob = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = urlBlob;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(urlBlob);
}
```

---

## 5. API Contract

### GET /export/:childId/pdf?from=&to=
- **Auth:** Bearer JWT
- **Query params:** `from` (ISO date), `to` (ISO date) — optional
- **Response:** `application/pdf` binary stream

### GET /export/:childId/csv?from=&to=
- **Auth:** Bearer JWT
- **Query params:** `from` (ISO date), `to` (ISO date) — optional
- **Response:** `text/csv; charset=utf-8` file download

---

## 6. Execution Roadmap

| Step | File | Action |
|------|------|--------|
| 1 | `src/app/core/i18n/i18n.service.ts` | Add all export i18n keys (see Section 7) |
| 2 | `src/app/services/data.service.ts` | Add `exportChildData(childId, format, from, to)` method |
| 3 | `src/app/components/header.component.ts` | Add export button + dropdown template to header template |
| 4 | `src/app/components/header.component.ts` | Add `showExportMenu`, `isExporting`, `dateFrom`, `dateTo`, `selectedFormat` signals |
| 5 | `src/app/components/header.component.ts` | Add `toggleExportMenu()`, `executeExport()` methods |
| 6 | `src/app/components/header.component.ts` | Add date range validation (from <= to, not future) |
| 7 | `src/app/components/header.component.ts` | Handle no-data-in-range response gracefully |

---

## 7. i18n Keys

```typescript
// Export
'export.button':           { sq: 'Eksporto',        en: 'Export' },
'export.dateRange':        { sq: 'Periudha',         en: 'Date Range' },
'export.from':             { sq: 'Nga',              en: 'From' },
'export.to':               { sq: 'Deri',             en: 'To' },
'export.format':           { sq: 'Formati',          en: 'Format' },
'export.pdf':              { sq: 'PDF',              en: 'PDF' },
'export.csv':              { sq: 'CSV',              en: 'CSV' },
'export.download':         { sq: 'Shkarko',          en: 'Download' },
'export.exporting':        { sq: 'Duke eksportuar…', en: 'Exporting…' },
'export.success':          { sq: 'Eksportimi u kry.', en: 'Export complete.' },
'export.error':            { sq: 'Eksportimi dështoi.', en: 'Export failed.' },
'export.noData':           { sq: 'Nuk ka të dhëna në këtë periudhë.', en: 'No data in this date range.' },
'export.invalidRange':     { sq: 'Data e fillimit duhet të jetë para asaj të mbarimit.', en: 'Start date must be before end date.' },
```

---

## 8. Edge Cases

| Scenario | Handling |
|----------|----------|
| No dates selected | Default to "all time" (no from/to params sent) |
| from > to | Show `invalidRange` error, block export |
| Future dates selected | Cap at today's date (`max` attribute on date inputs) |
| Backend returns empty PDF/CSV | Show toast `noData` — not an error, just no data |
| Export fails (network error, 500) | Show toast `error` with retry option |
| Export in progress, user clicks again | Block second click — `isExporting()` guard |
| Very large date range (years) | Backend handles pagination — no frontend limit |
| User closes dropdown mid-export | Export continues, result downloads when ready |
| Child switcher changes active child during export | Current export completes for original childId |
| JWT expires during export | 401 → redirect to login (auth interceptor handles this) |

---

## 9. Loading State

- While `isExporting()` is true:
  - Button text changes to i18n `export.exporting`
  - Spinner icon replaces download icon
  - Dropdown CTA button disabled
  - Clicking export button again is no-op (guard in `executeExport()`)
- On `executeExport()` completion (success or error), `isExporting.set(false)`

---

## 10. Design Notes

- **Export button** matches existing header button style (pill, white bg, shadow-soft, border-gray-100)
- **Dropdown** uses same shadow/rounded/border system as child switcher dropdown
- **Date inputs** styled with focus ring in primary color (`focus:border-primary-400 focus:ring-2 focus:ring-primary-100`)
- **Format selector** uses custom radio styling — selected option gets `border-primary-400 bg-primary-50`
- No third-party date picker dependency — native `<input type="date">` with browser-native picker