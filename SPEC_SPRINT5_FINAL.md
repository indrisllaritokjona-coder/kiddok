# SPEC — Sprint 5 FINAL: Export Module + Docker Backend

**Project:** KidDok (Angular 19 + NestJS)
**Author:** kiddok-architect
**Status:** Ready for Executor

---

## Context: What Was Broken and How It Was Fixed

Sprint 5 was committed at `5120a96` and BROKE THE BUILD. Root cause: `ShellComponent` stripped all page-level component imports (`HomeComponent`, `DiaryComponent`, `MedicationsComponent`, etc.) but the template still used `@switch (currentTab())` referencing `<app-home />`, `<app-diary />`, etc. — components no longer imported.

HEAD (`9f768db`) FIXED the issue differently: switched from `@switch` view-switching to Angular `<router-outlet>`. Page components are now routed, not lazy-imported into ShellComponent.

**This spec assumes HEAD is the starting point.** The fix described in §1 is based on the new RouterOutlet architecture.

---

## 1. What Needs to be Fixed in Current Shell

The current shell (`9f768db`) is in a transitional state:

| Issue | Severity | Fix |
|-------|----------|-----|
| `openExportModal()` is defined but HeaderComponent has no `exportRequested` output wired to it | HIGH | Wire `(exportRequested)="openExportModal()"` on the `<app-header>` tag in shell template |
| `showExportModal` signal exists, `ExportModalComponent` is imported — but there's no `@if` guard in the template for it | HIGH | Confirm `showExportModal` signal toggle is functional; verify the `@if` block is present |
| `exportChildData()` method does not exist in `DataService` — only `exportChildCsv()` (no params, no date range) | HIGH | Add `exportChildData(childId, dateFrom, dateTo, format)` method to DataService or create separate `ExportService` |
| DataService `exportChildCsv()` uses `responseType: 'blob'` but the HTTP error handling path is unclear | MEDIUM | Ensure `catchError` pipes are in place and user-facing toasts fire on failure |

**Minimum viable fix list for executor:**
1. Wire `exportRequested` output from HeaderComponent → `openExportModal()` in ShellComponent
2. Add/verify `@if (showExportModal())` guard around `<app-export-modal>` in shell template
3. Create proper `ExportService` with `exportPdf()` and `exportCsv()` methods that accept date range params
4. Confirm export button is visible in header when a child is active

---

## 2. Export Modal — Full Specification

### 2.1 Button Appearance (Header)

- **Shape:** Pill-shaped button (rounded-xl, bg-white, shadow-soft, border-gray-100)
- **Icon:** `download` Lucide icon (left of text)
- **Label:** `{{ t()['export.trigger'] }}` ("Eksporto" / "Export")
- **Position:** Header right section, before the child selector pill
- **Visibility:** `viewState === 'app' && !!activeChild()`
- **Behavior:** Click → emits `exportRequested` → ShellComponent calls `openExportModal()`

### 2.2 Modal Flow

```
ShellComponent.openExportModal()
    → showExportModal signal = true
    → @if (showExportModal()) renders <app-export-modal>
    → ExportModal opens with [childId] from dataService.activeChildId()
    → User picks dates + format → clicks Export
    → ExportService.exportPdf() or .exportCsv() fires HTTP request
    → Blob download triggers in browser
    → Modal closes automatically on success; shows error toast on failure
```

### 2.3 ExportService API

```typescript
@Injectable({ providedIn: 'root' })
export class ExportService {
  private http = inject(HttpClient);
  private api = inject(API_URL); // environment.apiUrl
  private auth = inject(AuthService);

  async exportPdf(childId: string, dateFrom: string, dateTo: string): Promise<void>
  async exportCsv(childId: string, dateFrom: string, dateTo: string): Promise<void>
}
```

Both methods:
1. Set `Authorization: Bearer <token>` header via interceptor
2. GET `/export/{childId}/{pdf|csv}?from={dateFrom}&to={dateTo}`
3. `responseType: 'arraybuffer'`
4. On 2xx: extract filename from `Content-Disposition` header (fallback: `kiddok-export.<format>`)
5. Create `Blob([buffer], { type: response.contentType })`
6. `URL.createObjectURL(blob)` → `<a download>` click → `URL.revokeObjectURL()`
7. On error: catch, parse error body, throw with user-friendly message
8. Auth token injected via `HttpInterceptor` (existing pattern in project)

---

## 3. DataService.exportChildData()

Add to `DataService`:

```typescript
async exportChildData(
  childId: string,
  dateFrom: string,
  dateTo: string,
  format: 'pdf' | 'csv'
): Promise<void> {
  const endpoint = `${this.API_URL}/export/${childId}/${format}?from=${dateFrom}&to=${dateTo}`;
  try {
    const response = await firstValueFrom(
      this.http.get(endpoint, {
        ...this.getHeaders(),
        responseType: 'blob',
      })
    );
    const contentType = response.type;
    const extension = format === 'pdf' ? 'pdf' : 'csv';
    const blob = new Blob([response], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kiddok-health-report-${childId}-${new Date().toISOString().split('T')[0]}.${extension}`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (err: any) {
    console.error('[DataService] exportChildData failed:', err);
    this.toast.show(this.i18n.t()['export.errorServer'], 'error');
    throw err;
  }
}
```

**Note:** `DataService` already has `exportChildCsv()` but it takes no date params. The executor should either:
- Option A: Extend the existing `exportChildCsv()` to accept date params (rename to `exportChildData`)
- Option B: Keep `exportChildCsv()` for legacy and add `exportChildData()` as new method

Recommendation: Option B (add new method, keep legacy for safety).

---

## 4. i18n Keys (SQ + EN) — 14 Total

Add to `I18nService` translation map:

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

---

## 5. Docker Setup for Backend

### 5.1 Backend/Dockerfile (EXISTING — no changes needed)

Assume NestJS multi-stage Dockerfile already exists. Verify it covers:
- `node:20-alpine` base
- `EXPOSE 3000`
- `CMD ["node", "dist/main.js"]`

### 5.2 Backend/docker-compose.yml (NEW — create this)

```yaml
version: '3.9'

services:
  postgres:
    image: postgres:16-alpine
    container_name: kiddok-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-kiddok}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-kiddok_secret}
      POSTGRES_DB: ${POSTGRES_DB:-kiddok}
    ports:
      - "${POSTGRES_PORT:-5432}:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER:-kiddok}"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: kiddok-backend
    restart: unless-stopped
    environment:
      NODE_ENV: ${NODE_ENV:-development}
      PORT: ${PORT:-3000}
      DATABASE_URL: ${DATABASE_URL:-postgresql://kiddok:kiddok_secret@postgres:5432/kiddok}
      JWT_SECRET: ${JWT_SECRET}
      JWT_EXPIRES_IN: ${JWT_EXPIRES_IN:-7d}
    ports:
      - "${PORT:-3000}:3000"
    depends_on:
      postgres:
        condition: service_healthy
    healthcheck:
      test: ["CMD-SHELL", "wget -qO- http://localhost:3000/health || exit 1"]
      interval: 15s
      timeout: 5s
      retries: 3

volumes:
  postgres_data:
```

**Key decisions:**
- `postgres` uses `postgres:16-alpine` — lean and sufficient for NestJS
- Backend healthcheck waits for postgres to be healthy before starting
- All secrets via environment variables (no hardcoding)
- Named volume `postgres_data` for persistent data

### 5.3 Backend/.env.example (EXISTING — verify contents)

```
# Server
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://kiddok:kiddok_secret@localhost:5432/kiddok
POSTGRES_USER=kiddok
POSTGRES_PASSWORD=kiddok_secret
POSTGRES_DB=kiddok
POSTGRES_PORT=5432

# JWT
JWT_SECRET=change-me-in-production
JWT_EXPIRES_IN=7d

# CORS (for Angular dev server)
CORS_ORIGIN=http://localhost:4200
```

Ensure the .env.example includes `POSTGRES_PORT` (presently missing based on audit).

---

## 6. File Inventory — What to Create / Modify

### Create
- `src/app/services/export.service.ts` — ExportService with exportPdf/exportCsv
- `backend/docker-compose.yml` — Compose file for Postgres + NestJS
- `SPEC_SPRINT5_FINAL.md` (this file)

### Modify
- `src/app/components/shell.component.ts` — Wire `(exportRequested)="openExportModal()"` to header
- `src/app/components/header/header.component.ts` — Add `exportRequested` @Output if not present
- `src/app/components/export-modal/export-modal.component.ts` — Ensure correct inputs/outputs
- `src/app/services/data.service.ts` — Add `exportChildData()` method with date range params
- `src/app/core/i18n/i18n.service.ts` — Add all 14 i18n keys (SQ + EN)

### No changes needed
- `backend/src/export/export.controller.ts` — Already exists
- `backend/src/export/export.service.ts` — Already exists
- `backend/Dockerfile` — Already exists

---

## 7. Edge Cases

| Case | Handling |
|------|----------|
| No data in range | Backend returns empty PDF/CSV with "No records found" note. Post-download check: if file size is 0, show info toast `export.noDataInRange`. |
| Date range > 365 days | Modal shows amber warning banner (pre-export). Backend still processes. |
| `from` date > `to` date | Inline validation: disable Export button, show red error text `export.fromAfterTo`. |
| Network / backend error | `catchError` → toast `export.errorServer` with error message if available. |
| Token expired mid-export | HttpInterceptor catches 401 → re-auth flow. |
| Offline | Check `OfflineService.isOnline()` before XHR; if offline, show toast `common.offline`. |
| No active child | Export button already hidden via `!!activeChild()` guard. |

---

## 8. Acceptance Criteria

- [ ] Export pill button visible in header when in app view with active child
- [ ] Clicking Export opens the modal with date range + PDF/CSV selector
- [ ] PDF export downloads a valid `.pdf` file
- [ ] CSV export downloads a valid `.csv` file
- [ ] Date validation: from > to disables export button
- [ ] Range > 365 days shows warning banner
- [ ] Loading state shows spinner + "Duke gjeneruar..." / "Generating..."
- [ ] Error toast on backend failure
- [ ] All 14 i18n labels functional in both SQ and EN
- [ ] Docker: `docker-compose up` starts Postgres + backend with healthchecks
- [ ] .env.example has POSTGRES_PORT and all required vars
- [ ] No TypeScript build errors
- [ ] No runtime console errors in normal flow

---

## 9. Pending Fixes (DO NOT TOUCH in Sprint 5)

These are tracked separately and must NOT be blocked by export work:

1. **Temperature Diary**: Chart effect memory leak, silent save failure
2. **Growth Tracking**: OnDestroy missing, no typed DTO, effect flicker

If similar issues are found in export code, fix them and note in commit message.

---

## 10. Execution Order

```
Step 1: Wire exportRequested in ShellComponent template (HIGH — unblocking)
Step 2: Create ExportService (src/app/services/export.service.ts)
Step 3: Add i18n keys to I18nService (both SQ + EN)
Step 4: Add exportChildData() to DataService (or extend existing method)
Step 5: Verify ExportModalComponent inputs/outputs match spec
Step 6: Create backend/docker-compose.yml
Step 7: Update .env.example with POSTGRES_PORT
Step 8: Verify all acceptance criteria manually
Step 9: Tester validates, writes TEST_RESULTS
Step 10: Reviewer audits, writes REVIEW_RESULTS
```