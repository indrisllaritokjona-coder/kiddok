# REVIEW_RESULTS_SPRINT20.md

**Sprint 20:** Analytics Dashboard + CSV Export
**Reviewer:** kiddok-reviewer
**Date:** 2026-04-23
**Commit reviewed:** `bc16a2c` — feat: analytics dashboard + CSV export

---

## Audit Summary

All deliverables reviewed against live code. Build is clean, architecture is sound, and the test results are accurate. Four findings: two minor correctness issues, one robustness concern, one informational note.

---

## Security Audit ✅

### CSV Export (`export.controller.ts`)

| Check | Result | Notes |
|-------|--------|-------|
| JWT auth guard | ✅ | `@UseGuards(AuthGuard('jwt'))` on controller |
| Ownership / access check | ✅ | Prisma query checks `userId` + `familyMembers`; `ForbiddenException` thrown |
| Child 404 check | ✅ | `NotFoundException` if `data.child` is null |
| CSV injection / escaping | ✅ | `csvEscape()` wraps fields, doubles inner quotes |
| Filename path traversal | ✅ | `safeName` strips all non-alphanumeric chars |
| Headers — `Content-Type`, `Content-Disposition` | ✅ | `text/csv; charset=utf-8`, attachment with filename |
| Custom response headers | ✅ | `X-Generated-At`, `X-Child-Id`, `Cache-Control: no-cache` |
| No sensitive data in headers | ✅ | `X-Child-Id` is not a secret (already in URL path) |

**No security issues found.**

### Frontend Data Service

| Check | Result | Notes |
|-------|--------|-------|
| Avatar URL allowlist | ✅ | Only `api.dicebear.com` accepted after HTTPS check |
| Auth token storage | ✅ | `localStorage` — standard practice for this app |
| CSV download error handling | ✅ | `try/catch` with user-facing toast |

---

## Correctness Issues

### 1. `csvEscape()` misses carriage return (`\r`)

**File:** `backend/src/export/export.controller.ts`, line 7

```typescript
function csvEscape(value: unknown): string {
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}
```

`csvEscape()` checks for `\n` but not `\r`. On Windows, `toLocaleDateString('sq-AL')` can produce strings with CRLF (`\r\n`) line separators. Fields containing `\r` will not be quoted, potentially causing CSV misalignment.

**Fix:** Add `|| str.includes('\r')` to the condition — or use `/\r|\n/` as a combined check.

**Severity:** Low (unlikely in practice since locale date strings rarely contain literal CRs, but technically incorrect per RFC 4180)

---

### 2. Chart.js script injected on every chart render

**File:** `src/app/components/analytics.component.ts`, `renderTempChart()`, `renderGrowthChart()`, `renderVaccinePie()`

Each of the three chart render methods checks `typeof (window as any).Chart === 'undefined'` and appends the CDN script tag if missing. While browsers deduplicate same-URL script tags (so the actual network load happens only once), the `onload` callback wiring runs on **every chart render call**. This means:
- On first render: script appended, `onload` fires after load, chart builds
- On subsequent renders: check passes but `onload` is not re-fired, chart builds synchronously

This works correctly but is fragile. The pattern relies on browser deduplication side effects.

**Fix:** Check `!this.chartInitialized` inside each render method, or extract script loading into a single `ngOnInit` initializer. Since `ngAfterViewInit` already has a `setTimeout` delay, a shared `loadChartJs(): Promise<void>` called once per component lifetime would be cleaner.

**Severity:** Low (works in practice, but worth simplifying)

---

## Robustness Concerns

### 3. Direct `new NotificationService()` instantiation

**File:** `src/app/services/data.service.ts`, `loadChildDetails()`

```typescript
loadChildDetails(childId: string) {
  // ...
  setTimeout(() => {
    try {
      const notifSvc = new NotificationService(); // ← breaks DI
      notifSvc.checkVaccineAlerts();
    } catch { /* ignore */ }
  }, 0);
}
```

This pattern:
- Breaks Angular's dependency injection — `NotificationService` loses its injected dependencies
- Silently swallows all errors (not just the specific "service not available" case)
- Runs inside `setTimeout(..., 0)` making stack traces hard to follow

**Fix:** Inject `NotificationService` into `DataService` via the constructor and call it directly (no `setTimeout`, no `new`).

**Severity:** Medium (alerts may silently fail to fire; not introduced by Sprint 20 but triggered from new analytics code path)

---

### 4. Empty vaccine doughnut is ambiguous

**File:** `src/app/components/analytics.component.ts`, `renderVaccinePie()`

```typescript
private renderVaccinePie() {
  // ...
  const summary = this.vaccineSummary();
  if (summary.total === 0) return; // ← silent early exit
}
```

If `vaccineSummary().total === 0`, the method returns early and the canvas is left blank. The empty state in the template (`@if (vaccineSummary().total > 0)`) handles this for the first render, but `effect()` can re-trigger `renderAllCharts()` after data loads asynchronously. If `vaccineSummary().total === 0` because the backend hasn't synced yet (the known limitation noted by tester), the pie re-renders as a blank canvas instead of the empty state.

**Fix:** When `summary.total === 0`, call `buildVaccinePie` with a zero-data config that renders the empty-state SVG/placeholder inside the canvas area — or track a `hasAttemptedRender` flag and always call `buildVaccinePie` even with empty data.

**Severity:** Low (only affects the brief window between async load and data arrival)

---

## Informational Notes

### Pre-existing issues (not blocking)

1. **Budget warning** (`initial exceeded 500kB`): Advisory only, pre-existing from full Angular + Chart.js bundle. Not introduced by Sprint 20.

2. **Vaccine compliance data sync risk** (tester's note): The tester flagged that if `vaccines` module has local state that doesn't propagate to `DataService.vaccineRecords`, the doughnut will show 0. This requires live integration testing with a real backend and should be verified before production.

3. **PDF export scaffolded but not wired**: `export.service.ts` has `generatePdf()` but no route. CSV export is fully wired.

---

## Performance Notes

- `Promise.all([...])` used in `fetchChildHealthData` — correct for parallel DB queries ✅
- Chart.js loaded from CDN (`cdn.jsdelivr.net`) — no bundled size impact ✅
- `OnDestroy` properly destroys all three chart instances ✅
- Signals-based reactivity — no explicit `changeDetection` issues ✅

---

## Verdict

| Category | Status |
|----------|--------|
| Security | ✅ PASS |
| CSV escaping | ⚠️ Minor (`\r` not handled) |
| Memory / lifecycle | ⚠️ Minor (chart re-injection pattern) |
| DI / robustness | ⚠️ Medium (`new NotificationService()`) |
| Functional correctness | ✅ PASS |
| Build | ✅ PASS |

**Recommendation:** Fix items 1 and 3 before production. Items 2 and 4 are minor but worth addressing in a follow-up cleanup sprint. The vaccine data sync risk (item 2 in informational notes) must be verified with live backend before launch.
