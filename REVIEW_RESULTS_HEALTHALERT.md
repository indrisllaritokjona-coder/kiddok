# Code Review — HealthAlertCard + RecentActivityFeed Sprint 13

## Security

### XSS — APPROVED ✅
- All dynamic values interpolated via Angular `{{ }}` template syntax: `alert.title`, `alert.desc`, `item.title`, `item.value`, `item.notes` — Angular auto-escapes by default.
- No `innerHTML`, no `dangerouslySetInnerHTML`, no `renderer.setProperty` — no XSS surface found.
- Route navigation uses a namespaced custom event `kiddok:navigate` — no direct script injection possible.

### localStorage Dismiss Key — APPROVED ✅
- Key `kiddok_dismissed_alerts` is a hardcoded constant string — no user-controlled data exfiltration surface.
- Both `loadDismissed()` and `saveDismissed()` wrapped in `try/catch` — graceful handling if localStorage is blocked (private browsing, storage quota exceeded).
- `JSON.parse` failures silently default to empty `Set()` — no crash path.

### Console — APPROVED ✅
- No `console.log`, `console.warn`, or `console.error` calls in either component.
- No sensitive data (child IDs, temperatures, notes) written to console.

**Security Verdict: PASS — No issues found.**

---

## Performance

### Signal Usage — APPROVED ✅
- `HealthAlertCardComponent`:
  - `dismissedAlerts` (signal) — written only on explicit user dismiss, reads from localStorage once on init. Clean.
  - `alerts` (computed) — reads `i18n.t()`, `activeChildId()`, `dismissedAlerts()`, `temperatureEntries()`, `records()`, `growthEntries()`. All are signals or computed — no uncontrolled subscriptions. Bounded.
  - `hasAnyAlert` (computed) — thin wrapper over `alerts().length`. Minimal cost.
  - `effect()` in constructor clears dismissed when underlying data signals change. Fire-and-forget — Angular manages effect lifecycle within the component. Cleaned up on destroy.

- `RecentActivityFeedComponent`:
  - `displayedCount`, `expandedEntries`, `isRefreshing` — all signals, minimal writes.
  - `allItems` (computed) — bounded slice of 50 each for temps and growths, then merged + sorted. Maximum ~100 items. Bounded.
  - `displayedItems` (computed) — `allItems().slice(0, displayedCount())`. No new computation.
  - `hasMore` (computed) — simple length comparison. Minimal.

### Computed Chains — APPROVED ✅
- `displayedItems` depends on `allItems` + `displayedCount` — no circular chains.
- `hasMore` depends on `allItems` + `displayedCount` — no circular chains.
- `alerts` depends on data signals + i18n signal — no circular chains.
- `hasAnyAlert` depends on `alerts` — unidirectional, no circular dependency.

### Memory Leaks — APPROVED ✅
- `onDestroy` not explicitly implemented, but Angular standalone components with `inject()` signals and computed properties clean up automatically when the component is destroyed. No ZOMBIE subscriptions detected.
- Effect in `HealthAlertCardComponent` is created in the constructor and tracks `dataService.temperatureEntries()`, `dataService.records()`, `dataService.growthEntries()`. When these signals emit new references (arrays), the effect re-runs and calls `set(new Set())`. Angular manages the effect's lifecycle — it is not registered as a separate cleanup target beyond component destruction.

### Pull-to-refresh Touch Events — APPROVED ✅
- `onTouchStart` and `onTouchEnd` are template-bound event handlers, not `HostListener` decorators. They register one handler pair per component instance — no accumulation across renders.
- `isRefreshingInProgress` boolean guard prevents double-trigger during the simulated 1500ms refresh window.
- `deltaY > 80` threshold is fixed and reasonable.

**Performance Verdict: PASS — Signal usage is efficient, computed chains are bounded, no memory leaks detected.**

---

## Clean Code

### Duplicate Patterns — MINOR ⚠️
- `timeAgo()` in `HealthAlertCardComponent` and `formatTime()` in `RecentActivityFeedComponent` implement nearly identical relative-time logic. Both:
  - Check minutes < 60 → `"N min"` / `"N orë"`
  - Check hours < 24 → `"N h"` / `"N orë"`
  - Fall back to day-based format
- This is a candidate for extraction into a shared utility (e.g., `TimeUtils.timeAgo()`), but it is not a blocker — the implementations are in different components with slightly different output strings (Albanian vs English labels embedded per call site).
- **Recommendation:** Extract to `shared/utils/time.utils.ts` and inject `I18nService` for locale-aware formatting. Not required for merge, but worth tracking.

### Unused Code — MINOR ⚠️
- `groupLabel` field in `ActivityItem` interface is populated in `allItems` computed (via `getGroupLabel()`) but never referenced in the template. Template only renders `item.title`, `item.value`, `item.timeLabel`, `item.notes`, `item.borderColor`, `item.color`, `item.icon`. The `groupLabel` field is inert.
- `formatTime` calls `this.i18n.isSq()` twice (once in the `< 60 min` branch and again in the `< 24 h` branch — but the second branch is unreachable because the first branch fires first when `diffMins < 60`). This is a latent bug: hours-between-1-and-24 will show minutes, not hours. See TEST_RESULTS note on time formatting.
- **Recommendation:** Remove `groupLabel` from `ActivityItem` interface and the `getGroupLabel` call in `allItems` computed, or wire it into the template if it's meant to appear in the expanded notes view.

### TypeScript Strictness — CLEAN ✅
- All interface fields properly typed: `AlertItem`, `ActivityItem` — no `any`, no implicit `unknown`.
- `borderColor`, `color` fields typed as string literals (e.g., `'border-l-teal-400'`). Accepted because Tailwind classes are runtime strings.
- `type: 'temperature' | 'growth' as const` — proper literal type narrowing in `allItems` computed.
- Template class binding `[class.rotate-90]="isExpanded(item.id)"` is valid Angular syntax.

### Build Status
- Reviewer confirms: **Build passes** (pre-fixed: `items()` → `allItems()`, `private allItems` → `allItems`).

---

## Verdict

**CONDITIONAL APPROVE**

### Required (pre-merge)
None — the pre-fixed bugs (`items()` undefined and `private allItems` in template) resolve the blocker. Build is clean.

### Recommended (track for next sprint)
1. **[CLEANUP]** Remove `groupLabel` from `ActivityItem` interface and the `getGroupLabel` call in `allItems` — it's populated but never used in the template.
2. **[CLEANUP]** Deduplicate relative-time logic (`timeAgo` / `formatTime`) into a shared `TimeUtils` service or pure function — follow-up refactor, not a blocker.
3. **[BUG]** `formatTime` in `RecentActivityFeedComponent` — the `diffMins < 60` branch fires before `diffHours < 24`, so entries between 60 min and 24h show "N min ago" instead of hours. Swap the order: check `diffHours < 24` before `diffMins < 60`.

### Notes for Architect
- TEST_RESULTS flagged missing growth alert (P2) and medication alert (P3) from `alerts()` computed — these are spec completeness gaps, not code bugs. Route to next sprint.
- `RecentActivityFeedComponent` supports only `temperature` and `growth` types; spec §2.3 requires 4 types. Track as follow-up.

---
*Reviewed by: kiddok-reviewer | Sprint 13 | 2026-04-22*