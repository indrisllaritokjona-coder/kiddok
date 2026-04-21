# Code Review — HomePageComponent Sprint 3

## Security
| Issue | Severity | File | Line | Description |
|-------|----------|-------|------|-------------|
| No token exposure in client-side code | ✅ PASS | data.service.ts | 58 | Bearer token read from localStorage only at request time, never logged or exposed to template |
| No sensitive data in console.log | ✅ PASS | data.service.ts | 72 | `console.error` on API failure contains no PII; stack traces not exposed |
| Angular auto-escapes interpolation | ✅ PASS | all components | — | All user data rendered via `{{ }}` interpolation; no `[innerHTML]` or `dangerouslySetInnerHTML` equivalents |
| Signal reads scoped to user session | ✅ PASS | data.service.ts | 50–54 | `children`, `activeChildId`, `temperatureEntries`, `growthEntries` are instance signals; no global mutable state leakage |
| No auth token in URL or query params | ✅ PASS | all components | — | Navigation uses `kiddok:navigate` CustomEvent; no token in URLs |

## Performance
| Issue | Severity | File | Line | Description |
|-------|----------|-------|------|-------------|
| Signals auto-cleanup (no explicit destroy needed) | ✅ PASS | all components | — | Components use Angular signals (`computed`, `signal`) which auto-cleanup; no manual subscriptions |
| No Chart.js on HomePage | ✅ PASS | all home components | — | Charts not loaded on any home sub-component; confirmed lightweight render |
| RecentActivityFeed merge is O(n) | ✅ PASS | recent-activity-feed.component.ts | 50–87 | Merge: two `.sort()` calls (O(n log n) each on at most 10 items) then `.slice(0, 10)` and final sort — all bounded, negligible |
| N+1 in data access | ✅ PASS | data.service.ts | 76–100 | `loadChildrenFromApi` is single REST call; subsequent `loadTemperatureEntries`/`loadGrowthEntries` are called per child-switch, not per item |
| QuickActionsGrid badge count filters correctly | ⚠️ WARN | quick-actions-grid.component.ts | 40–41 | `temperatureEntries().filter(e => e.childId === activeId)` and `records().filter(r => ...)` correctly scope to active child; tester flag was incorrect for records (records are already per-child from `loadChildDetails`) |
| ShellComponent has `ngOnDestroy` cleanup | ✅ PASS | shell.component.ts | 143 | `window.removeEventListener('kiddok:navigate', this.navigateHandler)` correctly removes event listener |

## Clean Code
| Issue | Severity | File | Line | Description |
|-------|----------|-------|------|-------------|
| `router.navigate([], { queryParams })` dead code | ⚠️ MEDIUM | quick-actions-grid.component.ts | 63–65 | `navigate()` method calls `router.navigate([])` then catches error; this always fails silently and falls through to the working `kiddok:navigate` event dispatch. Should be removed. |
| `onBloodTypeChange` method dead code | ⚠️ MEDIUM | shell.component.ts | 213 | Method body is empty comment; reactivity handled by template binding `editBloodType.set($event)` directly |
| `datePattern` getter never used | ⚠️ LOW | shell.component.ts | 354 | `get datePattern()` defined but never called; `onDateInput` has its own locale logic |
| TypeScript: `any[]` for API response in `loadChildrenFromApi` | ⚠️ MEDIUM | data.service.ts | 76 | `this.http.get<any[]>` — should use a typed DTO instead of `any[]` |
| Duplicate merge sort pattern | ⚠️ LOW | recent-activity-feed.component.ts | 66–87 | `tempItems` and `growthItems` each call `.sort()` before the final merge sort; redundant for at-most-10 items but functionally correct |
| Missing i18n key: `home.alerts.clear` | 🔴 HIGH | health-alert-card.component.ts | 25 | Runtime undefined string when no alerts present; TEST_RESULTS confirmed this |
| Typo in i18n: `home.recentActivity.emptyDesc` ("Akzni") | ⚠️ LOW | i18n service | — | Wrong word; tester flagged; fix in i18n.service.ts |
| Hardcoded all-clear subtext (uses `i18n.isSq()` inline) | ⚠️ MEDIUM | health-alert-card.component.ts | 25 | Should use i18n key `home.alerts.clearDesc` instead of inline ternary |
| Missing pulse animation on active alerts | ⚠️ LOW | health-alert-card.component.ts | — | SPEC calls for repeating pulse on active alerts; only entry `animate-slide-up` exists |
| Unused `avatarUrl` fallback | ✅ OK | welcome-hero.component.ts | 41 | DiceBear fallback is appropriate; not a code smell |

## Backend Validation
| Check | Status | Notes |
|-------|--------|-------|
| Backend reachable | ❌ FAIL | NestJS not running at `http://localhost:3000` in current environment |
| API endpoints respond | ⚠️ SKIPPED | Cannot test — backend offline |
| DTOs typed | ⚠️ PARTIAL | `ChildProfile`, `TemperatureEntry`, `GrowthEntry`, `MedicalRecord` all have TypeScript interfaces; but `loadChildrenFromApi` uses `any[]` for raw response |

## Verdict
**REQUEST CHANGES**

The components are well-structured and the build passes cleanly. Two items must be resolved before merge:

1. **[CRITICAL]** Add missing `home.alerts.clear` i18n key in `i18n.service.ts` — causes blank text at runtime when no health alerts are present.
2. **[MEDIUM]** Remove dead `router.navigate([], { queryParams })` from `QuickActionsGrid.navigate()` — it always fails silently and pollutes the method.
3. **[MEDIUM]** Replace `any[]` with a typed DTO in `DataService.loadChildrenFromApi()` for backend response.
4. **[LOW]** Fix `home.recentActivity.emptyDesc` typo ("Akzni" → "Aktiviteti") in i18n.service.ts.
5. **[LOW]** Add i18n key `home.alerts.clearDesc` and remove inline `i18n.isSq()` ternary in HealthAlertCard all-clear state.
6. **[LOW]** Remove dead `onBloodTypeChange` method from ShellComponent.
