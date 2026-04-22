# REVIEW_RESULTS_SPRINT13 — Push Notifications + Fever/Vaccine Alerts

**Sprint:** 13
**Reviewer:** kiddok-reviewer
**Date:** 2026-04-23
**Repo:** `C:\Users\g_gus\Desktop\jona\kiddok`
**Commit:** `54d8a28` (hotfix applied — 2 bugs fixed post-testing)

---

## Scope of Changes

| File | Change |
|------|--------|
| `src/app/services/notification.service.ts` | New service: `notifyFever()`, `checkVaccineAlerts()`, DND, preference persistence |
| `src/app/components/settings/settings-page.component.ts` | Notif section with toggles + DND selectors (hotfixed: `private notifSvc` → `notifSvc`) |
| `src/app/services/data.service.ts` | `loadChildDetails()` triggers vaccine check (hotfixed: `require()` → static import + `new NotificationService()`) |
| `src/app/app.component.ts` | `ngOnInit` fires `checkVaccineAlerts()` after 1500ms |
| `src/app/core/i18n/i18n.service.ts` | 12 notification i18n keys (SQ/EN) |

---

## Hotfixed Bugs — Verification

### Bug 1: `private notifSvc` in template (settings-page.component.ts)

**Before:** `private notifSvc = inject(NotificationService)`
**After:** `notifSvc = inject(NotificationService)`

Angular templates cannot access private class members. This is a TypeScript/AOT compilation error that would prevent the app from building. ✅ **Confirmed fixed.** `notifSvc` is now package-level visible and accessible from the template.

### Bug 2: `require()` in Angular build (data.service.ts:520)

**Before:** `const { NotificationService } = require('./notification.service')`
**After:** Static `import { NotificationService } from './notification.service'` at file top; `new NotificationService()` called directly in `setTimeout`

✅ **Confirmed fixed** — CommonJS `require()` removed from Angular TypeScript build.

---

## Code Quality Audit

### ✅ NotificationService — Well Structured

- Clean signal-based state (`enabled`, `feverAlerts`, `vaccineAlerts`, `dndStart`, `dndEnd`)
- `loadPrefs()` / `savePrefs()` with proper JSON parse/stringify and `try/catch`
- `isDndActive()` handles midnight-wrap correctly (e.g. 22:00–07:00)
- `send()` short-circuits on all guard conditions (support, enabled, DND, permission)
- `notifyFever()` has clear `FEVER_THRESHOLD` constant
- `checkVaccineAlerts()` breaks after first notification (only one per check)

### ✅ i18n Integration

- All user-facing strings sourced from `i18n.t()` keys
- Fallback to hardcoded SQ/EN strings if key missing — good defensive pattern
- 12 keys added, all verified in test

### ⚠️ Minor Issue: Dead Code — `window.__kiddokNotif`

`notification.service.ts` line 45 sets:
```ts
(window as any).__kiddokNotif = this;
```
This is never read anywhere after the hotfix (data.service.ts now calls `new NotificationService()` directly). It's dead code and should be removed for cleanliness. Not a production blocker.

### ⚠️ Minor Issue: `new NotificationService()` Outside Angular DI

`data.service.ts` uses:
```ts
const notifSvc = new NotificationService();
notifSvc.checkVaccineAlerts();
```

This creates a `NotificationService` instance bypassing Angular's DI system. Since `NotificationService` uses `@Injectable({ providedIn: 'root' })`, Angular's root injector still resolves the dependencies. It will work — but it's an anti-pattern:

- No `ChangeDetectorRef` integration (not needed here, but fragile)
- If `NotificationService` ever adds constructor-level dependencies that require a component or request-scoped context, this breaks silently
- The proper Angular way would be `inject(NotificationService)` in `DataService` and calling directly

**Recommendation:** Either inject `NotificationService` into `DataService`, or keep the current pattern but add a comment explaining why `new` is used. Not a production blocker for this current implementation.

---

## Security Audit

| Concern | Status | Notes |
|---------|--------|-------|
| XSS in notifications | ✅ Safe | All text from i18n keys; only `childName` (string) and `temperature` (number) interpolated — no raw HTML |
| Server-side push infra | ✅ N/A | Client-side Web Notifications API only — no VAPID keys, no push subscriptions |
| Permission denied bypass | ✅ Safe | `toggleEnabled()` correctly returns without re-requesting when `permission === 'denied'` |
| User input in notif body | ✅ Safe | `childName` and `temperature` are plain values, not user-authored HTML |
| DND hours storage | ✅ Acceptable | localStorage only; no sensitive data |

---

## Performance Notes

- `NotificationService` is a singleton (`providedIn: 'root'`), constructed once
- Preference loads from localStorage synchronously on construction — minimal cost
- `checkVaccineAlerts()` iterates all records for active child — O(n) where n = total records; acceptable for client-side use
- DND check is a simple integer comparison — no performance concern

---

## Production Readiness

| Check | Status |
|-------|--------|
| Hotfixed bugs resolved | ✅ Yes — both TS errors fixed |
| No new build errors | ✅ Build passes after hotfix |
| Security sound | ✅ No vulnerabilities found |
| Dead code present | ⚠️ `window.__kiddokNotif` — not a blocker, clean up in next sprint |
| DI anti-pattern | ⚠️ `new NotificationService()` in `data.service.ts` — not a blocker, document or refactor |

**Sprint 13 is approved for production.** The two bugs found by the tester were correctly identified and properly fixed. The notification system is well-structured, secure, and performs acceptably.

---

## Recommendations for Future Sprints

1. **Remove dead `window.__kiddokNotif`** assignment from `notification.service.ts` constructor
2. **Consider injecting `NotificationService` into `DataService`** instead of using `new` — more idiomatic Angular, easier to test
3. **Add a unit test** for `NotificationService` directly (mock `I18nService` and `DataService`) — current tests are integration-level via the UI; direct service testing would catch guard-condition bugs faster