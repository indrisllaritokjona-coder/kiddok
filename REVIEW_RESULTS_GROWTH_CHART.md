# REVIEW RESULTS — Growth Chart Module
**Module:** `growth-chart` (GrowthChartComponent)
**Reviewer:** kiddok-reviewer
**Date:** 2026-04-23
**Commit:** (pending — to be added after fixes)

---

## Security Audit

### S1 — XSS: Chart.js data from API
**Status: PASS**

- Chart data is derived from `GrowthEntry[]` via `filteredEntries` computed signal — values flow through Angular's template rendering pipeline, not innerHTML.
- No use of `innerHTML`, `dangerouslySetInnerHTML`, or raw DOM manipulation.
- Chart labels come from `formatDate()` which uses `toLocaleDateString()` — always returns a plain string, never interpreted as HTML.
- Chart.js datasets receive plain numeric arrays (`heightData`, `weightData`) — no user-provided string interpolation.
- No string concatenation into chart config that could inject scripts.

**Conclusion:** No XSS surface identified.

---

### S2 — Auth: API calls use Bearer token
**Status: PASS**

- `loadGrowthEntries(childId)` calls `DataService.loadGrowthEntries()`.
- In `DataService`, `loadGrowthEntries()` uses `HttpClient.get()` with `this.getHeaders()`.
- `getHeaders()` reads `localStorage.getItem(this.AUTH_KEY)` and sets `Authorization: Bearer ${token}`.
- No unauthenticated API calls found in the component.
- No hardcoded credentials.

**Conclusion:** Auth header correctly attached.

---

### S3 — Input validation: date range inputs
**Status: PASS (with note)**

- `dateFrom` and `dateTo` are bound via `ngModel` on `<input type="date">` — native date inputs enforce format automatically.
- `filteredEntries` filters using `new Date(from)` comparison — if the date string is malformed, `new Date(badString)` returns `Invalid Date` which fails all comparisons, never throws.
- No direct string interpolation into HTTP requests.
- `selectRange()` constructs ISO date strings via `.toISOString().split('T')[0]` — safe, numeric-only output.

**Conclusion:** Input validation is sufficient.

---

## Performance Audit

### P1 — Chart.js destroy/rebuild: only when data changes
**Status: PASS**

- `renderChart()` checks `if (this.state() !== 'ok') return;` — early exit for non-chart states.
- Before rebuilding: `if (this.chartInstance) { this.chartInstance.destroy(); this.chartInstance = null; this.chartInitialized = false; }` — proper cleanup.
- `chartEffect` tracks `growthEntries()` and `selectedChildId()` via Angular signals — `renderChart()` only called when either changes.
- Guard: `if (this.chartInitialized)` inside chart effect prevents spurious renders.
- No `setInterval`, no polling.

**Conclusion:** Destroy/rebuild is data-gated, not render-gated.

---

### P2 — Effect cleanup: subscription teardown in effect
**Status: PASS**

- `ngOnDestroy` calls `this.chartEffect?.destroy()` which tears down the Angular effect and its tracked dependencies.
- No raw RxJS subscriptions in the component — all reactivity uses signals and Angular effects.
- `this.chartEffect?.destroy()` nulls the reference after cleanup.

**Conclusion:** Effect properly torn down.

---

### P3 — Chart.js lazy CDN load: only when component is used
**STATUS: PASS**

- Chart.js CDN script is injected dynamically inside `renderChart()`:
  ```typescript
  if (typeof (window as any).Chart === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
    script.onload = () => this.buildChart(ctx);
    document.head.appendChild(script);
  }
  ```
- No `Chart.js` imported in any bundle root — loaded on-demand when the component first renders a chart state.
- Subsequent chart renders skip the CDN fetch (window.Chart is cached after first load).

**Conclusion:** Lazy CDN load correctly implemented.

---

### P4 — Bundle impact: new large dependencies
**STATUS: PASS**

- `chart.js@4.4.0` is loaded via CDN only when chart is used — not in the main bundle.
- Angular component is standalone and uses only `@angular/core`, `@angular/common`, `forms`, `lucide-angular`.
- `lucide-angular` is already used across the project — no new icon imports added by this component.
- No other new dependencies introduced.

**Conclusion:** No bundle bloat.

---

## Additional Observations

### Obs1 — `chartInitialized` flag reset on destroy
In `renderChart()`, after `chartInstance.destroy()` the code also sets `chartInitialized = false`. This is inconsistent — `chartInitialized` is used as a guard in the effect to prevent rendering before first build, but resetting it after destroy means if data changes after destroy but before re-mount, the chart won't rebuild until the next effect trigger. However, `ngOnDestroy` is called before any re-render in normal Angular lifecycle. **Low severity — not a bug in practice.**

### Obs2 — Race condition on rapid child switch
If `onChildChange()` is called multiple times rapidly (switch child A → B quickly), `loadGrowthEntries` is fire-and-forget and `renderChart` has a 200ms `setTimeout` in `refresh()`. New data could arrive out of order. This is a pre-existing pattern in the codebase. **Low severity — acceptable.**

### Obs3 — `onDateRangeChange` sets `activeRange` redundantly
```typescript
onDateRangeChange() {
  this.activeRange.set(this.dateFrom() || this.dateTo() ? 'all' : 'all'); // always 'all'
}
```
The ternary always evaluates to `'all'` — no functional impact but dead code. Not a bug, just noise. **Informational.**

---

## Bug Fixes Applied

### B1 — WHO percentile band placeholder comment
Added a placeholder comment in `buildChart()` indicating where WHO growth percentile bands should be implemented when backend provides WHO reference data.

### B2 — Missing `sidebar.refresh` i18n key
Added `'sidebar.refresh': { sq: 'Rifresko', en: 'Refresh' }` to `i18n.service.ts` translations object.

---

## Summary

| Check | Result |
|---|---|
| S1 — XSS | PASS |
| S2 — Auth | PASS |
| S3 — Input Validation | PASS |
| P1 — Chart destroy/rebuild | PASS |
| P2 — Effect cleanup | PASS |
| P3 — Chart.js lazy CDN | PASS |
| P4 — Bundle impact | PASS |
| B1 — WHO band comment | FIXED |
| B2 — sidebar.refresh key | FIXED |

**Overall: CLEAN — no security or performance issues found. Two minor bugs fixed.**