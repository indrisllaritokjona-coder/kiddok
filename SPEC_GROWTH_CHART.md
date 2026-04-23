# SPEC — Growth Chart Module (Sprint 1)

**Sprint:** 1  
**Architect:** kiddok-architect  
**Date:** 2026-04-23  
**Status:** Draft → Ready for Executor  

---

## 1. Overview

**Module:** `GrowthChartComponent` — a standalone analytics card component that renders a dual-axis line chart (height cm + weight kg) per child over time.

**Goal:** Give parents a visual growth trajectory at a glance, embedded in the home dashboard.

**Design language:** Warm, journal-like. Soft card with rounded-[2rem] corners. Chart.js dual-axis line chart. Existing design tokens from `SPEC_HOME.md`.

---

## 2. Module Architecture

```
HomeComponent (home.component.ts)
  └── <app-growth-chart>  ← GrowthChartComponent (new)

GrowthChartComponent (growth-chart.component.ts)
  ├── Child Selector (inline <select>)
  ├── Date Range Filter (from / to date inputs)
  ├── Canvas (Chart.js line chart)
  └── Empty / Single-entry states

DataService (data.service.ts)   ← ALREADY EXISTS
  ├── children(): Child[]          signal
  ├── activeChildId(): string | null signal
  ├── growthEntries(): GrowthEntry[] signal
  ├── switchChild(id)             already exists
  └── loadGrowthEntries(childId)  already exists — calls GET /growth-entries/child/:childId

authInterceptor → HttpClient → NestJS API → Prisma → Postgres
```

---

## 3. Component Breakdown

### 3.1 File Structure

```
src/app/components/growth-chart/
├── growth-chart.component.ts    ← main component (standalone)
└── growth-chart.component.html  ← inline template (or separate if >100 lines)
```

The component is **standalone** (`standalone: true`), self-contained, no routing needed.

### 3.2 Inputs/State

| Signal/Field | Type | Source |
|---|---|---|
| `children()` | `Child[]` | `DataService.children()` |
| `activeChildId()` | `string \| null` | `DataService.activeChildId()` |
| `growthEntries()` | `GrowthEntry[]` | `DataService.growthEntries()` |
| `selectedChildId` | `string` | local state (init from `activeChildId`) |
| `dateFrom` | `string` (ISO date) | local state |
| `dateTo` | `string` (ISO date) | local state |
| `private chartInstance` | `Chart \| null` | local |
| `private chartInitialized` | `boolean` | local |

### 3.3 Data Flow

```
ngOnInit:
  selectedChildId ← activeChildId() ?? children()[0]?.id
  loadGrowthEntries(selectedChildId)
  initDateRange()

On selectedChildId change:
  loadGrowthEntries(selectedChildId)
  renderChart()

On dateFrom / dateTo change:
  renderChart()

On growthEntries() change:
  renderChart()
```

### 3.4 Chart Data Derivation

```typescript
// Filter by date range, then sort ascending by measuredAt (chronological for chart)
filteredEntries = computed(() => {
  return [...this.growthEntries()]
    .filter(e => {
      const d = new Date(e.measuredAt);
      return (!this.dateFrom || d >= new Date(this.dateFrom))
          && (!this.dateTo   || d <= new Date(this.dateTo));
    })
    .sort((a, b) => new Date(a.measuredAt).getTime() - new Date(b.measuredAt).getTime());
});

// Chart.js datasets (null for missing height/weight)
heightData = filteredEntries.map(e => e.height);
weightData = filteredEntries.map(e => e.weight);
labels     = filteredEntries.map(e => this.formatDate(e.measuredAt));
```

---

## 4. API Contract

### GET /growth-entries/child/:childId

- **Auth:** Bearer JWT (via `authInterceptor`)
- **Response:** `GrowthEntry[]` (sorted descending by `measuredAt` from backend)

```json
[
  {
    "id": "uuid",
    "childId": "uuid",
    "height": 88.5,
    "weight": 13.1,
    "measuredAt": "2026-01-15T00:00:00.000Z",
    "notes": "Rutina e parë e kontrolleve",
    "createdAt": "2026-01-15T10:30:00.000Z"
  }
]
```

Fields `height` and `weight` may be `null` individually.

**Reuse:** No backend changes required.

---

## 5. Component UI Layout

```
┌──────────────────────────────────────────────────────────────┐
│  Growth Chart                              [Child ▾] [⟳]    │
├──────────────────────────────────────────────────────────────┤
│  Date range: [from ▾] → [to ▾]                             │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│         Canvas — Chart.js line, dual Y-axis                 │
│         Left axis: cm  |  Right axis: kg                    │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  ● Gjatësia (indigo)    ● Pesha (teal)                      │
└──────────────────────────────────────────────────────────────┘
```

**Colors:**
- Height line: `rgba(99, 102, 241, 0.9)` (indigo-500), fill `rgba(99,102,241,0.1)`
- Weight line: `rgba(20, 184, 166, 0.9)` (teal-500), fill `rgba(20,184,166,0.1)`

---

## 6. i18n Keys

All labels in SQ + EN:

| Key | SQ | EN |
|---|---|---|
| `growthChart.title` | Grafiku i Rritjes | Growth Chart |
| `growthChart.child` | Fëmija | Child |
| `growthChart.dateFrom` | Nga data | From date |
| `growthChart.dateTo` | Deri në datën | To date |
| `growthChart.noData` | S'mund të vizualizohet — shtoni të paktën 2 matje | Can't visualize — add at least 2 measurements |
| `growthChart.singleEntry` | Vetëm një matje — nevojiten të paktën 2 për grafikun | Only one measurement — at least 2 needed for chart |
| `growthChart.noChild` | Zgjidhni fëmijën për të parë grafikun | Select a child to view the chart |
| `growthChart.heightLabel` | Gjatësia (cm) | Height (cm) |
| `growthChart.weightLabel` | Pesha (kg) | Weight (kg) |
| `growthChart.clearFilter` | Fshi filtrin | Clear filter |

---

## 7. Edge Cases

| Scenario | Handling |
|---|---|
| `growthEntries()` is empty | Show empty state: icon + `growthChart.noData` message |
| Only 1 entry | Show message `growthChart.singleEntry` above canvas; canvas hidden |
| `height === null` for some entries | Chart dataset point set to `null`; Chart.js handles gaps gracefully with `tension` |
| `weight === null` for some entries | Same as above, for weight dataset |
| Child switched | `loadGrowthEntries(newId)` → `renderChart()` |
| Date range filter removes all entries | Show empty state (same as no data) |
| Chart.js not yet loaded from CDN | Lazy-load via `<script>` tag in `renderChart()` (same pattern as `growth-tracking.component.ts`) |
| Canvas re-renders (new data) | Destroy existing `chartInstance` before rebuilding |
| Resize window | Chart.js `responsive: true` + `maintainAspectRatio: false` handles this |

---

## 8. Execution Roadmap

| Step | File | Action |
|---|---|---|
| 1 | `src/app/components/growth-chart/growth-chart.component.ts` | Create standalone component skeleton with signals, `ngOnInit`, `ngOnDestroy`, `ViewChild('chartCanvas')` |
| 2 | `DataService` | No changes — `loadGrowthEntries()` and `growthEntries()` already exist |
| 3 | `src/app/components/growth-chart/growth-chart.component.ts` | Add child selector `<select>` bound to `selectedChildId`; trigger `switchChild()` and `loadGrowthEntries()` on change |
| 4 | `src/app/components/growth-chart/growth-chart.component.ts` | Add date range inputs (`dateFrom`, `dateTo`) |
| 5 | `src/app/components/growth-chart/growth-chart.component.ts` | Add `filteredEntries` computed signal; add `buildChart()` method using Chart.js CDN pattern |
| 6 | `src/app/components/growth-chart/growth-chart.component.ts` | Implement `renderChart()`: destroy old instance, lazy-load Chart.js if needed, call `buildChart()` |
| 7 | `src/app/components/growth-chart/growth-chart.component.ts` | Add empty state (`noData`, `singleEntry`, `noChild` cases) |
| 8 | `src/app/home/home.component.ts` | Import and embed `<app-growth-chart>` in the home template |
| 9 | `src/app/core/i18n/i18n.service.ts` | Add all `growthChart.*` i18n keys (SQ + EN) |
| 10 | `ng build` + test on `http://localhost:4200` | Verify chart renders for Leona (8 entries) and Flavio (4 entries); test edge cases |

---

## 9. Seed Data Reference

| Child | DOB | Entries (Jan–Apr 2026) | Heights | Weights |
|---|---|---|---|---|
| Leona | 2022-03-15 | 8 entries | 86 → 93 cm | 12.5 → 14.2 kg |
| Flavio | 2024-01-08 | 4 entries | 62 → 73.5 cm | 5.8 → 7.8 kg |

The chart must display both children via the child selector. Default selection: `activeChildId()` from DataService.
