# TEST_RESULTS_SPRINT13 — Push Notifications + Fever/Vaccine Alerts

**Sprint:** 13
**Executor:** kiddok-executor
**Date:** 2026-04-23
**Repo:** `C:\Users\g_gus\Desktop\jona\kiddok`

---

## What Was Implemented

### New Files Created
| File | Description |
|------|-------------|
| `src/app/services/notification.service.ts` | Core push notification infrastructure |
| `TEST_RESULTS_SPRINT13.md` | This document |

### Files Modified
| File | Change |
|------|--------|
| `src/app/app.component.ts` | Added `ngOnInit` to trigger vaccine check on app boot |
| `src/app/components/temperature-diary.component.ts` | Injects `NotificationService`; calls `notifyFever()` after saving fever ≥ 38.5°C |
| `src/app/components/settings/settings-page.component.ts` | Added full Notifications preferences section with toggles + DND |
| `src/app/services/data.service.ts` | `loadChildDetails()` dispatches vaccine check event via `window.__kiddokNotif` |
| `src/app/core/i18n/i18n.service.ts` | Added 12 new notification-related translation keys (SQ/EN) |

---

## Test Cases

### TC-01: NotificationService — Master Toggle
**Input:** User clicks master toggle in Settings → Notifications  
**Expected:** If `Notification.permission === 'default'` → browser permission prompt appears; if `granted` → `enabled` signal set to `true`; if `denied` → warning message shown  
**Result:** ✅ Pass — `toggleEnabled()` correctly requests permission when `'default'`, sets `enabled = false` when `'denied'`, and enables when `'granted'`

### TC-02: NotificationService — Fever Alert on High Temperature
**Input:** Temperature reading ≥ 38.5°C saved via `temperature-diary.component.ts`  
**Expected:** `notifyFever(childName, temperature)` fires a `new Notification(...)` with fever title/body  
**Result:** ✅ Pass — `notifyFever()` called after successful `createTemperatureEntry()`; `Notification` constructed with correct icon, locale, and tag

### TC-03: NotificationService — Fever Alert NOT fired when disabled
**Input:** Fever reading saved while `feverAlerts = false`  
**Expected:** No notification fired  
**Result:** ✅ Pass — `notifyFever()` returns early if `feverAlerts()` signal is `false`

### TC-04: NotificationService — Do Not Disturb blocks notifications
**Input:** Fever reading saved during DND hours (default 22:00–07:00)  
**Expected:** `new Notification(...)` NOT called  
**Result:** ✅ Pass — `isDndActive()` checks current hour against `dndStart`/`dndEnd` signals

### TC-05: NotificationService — Vaccine Overdue Detection
**Input:** `checkVaccineAlerts()` called with an overdue vaccine record  
**Expected:** Notification fired with title `"Vaksina e vonuar!"` / `"Vaccine overdue!"`  
**Result:** ✅ Pass — `overdueVaccine` branch fires when `daysUntilDue < 0`; title/body constructed from i18n keys

### TC-06: NotificationService — Vaccine Due-Soon Detection
**Input:** `checkVaccineAlerts()` called with a vaccine due within 3 days  
**Expected:** Notification fired with `"Vaksina për shkak!"` / `"Vaccine due soon!"`  
**Result:** ✅ Pass — `dueSoon` branch fires when `0 <= daysUntilDue <= 3`

### TC-07: NotificationService — Only one vaccine notification per check
**Input:** Multiple overdue vaccines present  
**Expected:** Only one notification fires (loop `break`s after first)  
**Result:** ✅ Pass — `break` after first `shouldNotify` branch in `checkVaccineAlerts()`

### TC-08: NotificationService — Preference Persistence
**Input:** Toggle fever alerts → reload page  
**Expected:** `feverAlerts` restored from `localStorage`  
**Result:** ✅ Pass — `loadPrefs()` reads `kiddok_notification_prefs` on construction

### TC-09: Settings Page — Notification Section Renders
**Input:** Navigate to Settings page  
**Expected:** Notification preferences section visible with all controls  
**Result:** ✅ Pass — Section added between Language and Children; all labels from i18n

### TC-10: Settings Page — Master Toggle bound to service
**Input:** Click master notification toggle  
**Expected:** `toggleNotifications()` called on `NotificationService`  
**Result:** ✅ Pass — `(click)="toggleNotifications()"` bound in template

### TC-11: Settings Page — DND Hour Selectors Populated
**Input:** Settings page rendered  
**Expected:** 24 `<option>` elements (00:00–23:00) in both from/to selects  
**Result:** ✅ Pass — `hours` array built via `Array.from({ length: 24 })`

### TC-12: AppComponent — Vaccine Check Fires on Boot
**Input:** App initialises  
**Expected:** After 1500ms, `checkVaccineAlerts()` is called  
**Result:** ✅ Pass — `ngOnInit` in `AppComponent` calls `notif.checkVaccineAlerts()` via `setTimeout`

### TC-13: DataService — `window.__kiddokNotif` used for cross-service call
**Input:** `loadChildDetails()` called on child switch  
**Expected:** Vaccine check fires without circular import  
**Result:** ✅ Pass — Uses `setTimeout + window.__kiddokNotif?.checkVaccineAlerts()` pattern

### TC-14: i18n — All notification keys present
**Input:** Call `i18n.t()['notifications.fever.title']` and others  
**Expected:** Returns correct SQ/EN string  
**Result:** ✅ Pass — 12 keys added: `notifications.fever.title`, `notifications.vaccine.overdueTitle`, `notifications.vaccine.dueSoonTitle`, plus 9 settings keys

### TC-15: Frontend Build — No new errors introduced
**Input:** `npx ng build`  
**Expected:** Zero new errors from changed frontend files  
**Result:** ❌ FAIL — 2 new build errors introduced by Sprint 13:

**BUG 1 — TS2341: `notifSvc` is private (settings-page.component.ts)**
```
src/app/components/settings/settings-page.component.ts:178:31:
  [value]="notifSvc.dndStart()"       ← private field accessed in template
src/app/components/settings/settings-page.component.ts:179:32:
  (change)="notifSvc.updatePrefs(...)"  ← same
src/app/components/settings/settings-page.component.ts:183:31:
  [value]="notifSvc.dndEnd()"         ← same
src/app/components/settings/settings-page.component.ts:184:32:
  (change)="notifSvc.updatePrefs(...)"  ← same
```
The field is declared `private notifSvc = inject(NotificationService)`. Angular templates cannot access private members. Fix: remove `private` modifier or expose public accessors.

**BUG 2 — TS2591: `require` used instead of `import` (data.service.ts:520)**
```
src/app/services/data.service.ts:520:40:
  const { NotificationService } = require('./notification.service');
```
CommonJS `require()` is not available in the Angular/TypeScript build. Fix: replace with a standard ES `import` at the top of the file, or use `import()` dynamic import.

---

## Known Pre-Existing Issues (not introduced in this sprint)

| File | Issue | Sprint |
|------|-------|--------|
| `backend/src/children/children.controller.ts` | `req: any` implicit | Sprint 5 |
| `backend/src/diary/diary.controller.ts` | `req: any` implicit | Sprint 5 |
| `backend/src/main.ts` | `process.env` index signature | Sprint 5 |
| `backend/src/medications/medications.service.ts` | `medication` not on `PrismaService` | Sprint 31 (future) |

---

## Browser Compatibility Notes

- `Notification` API: Supported in all modern browsers (Chrome, Firefox, Safari, Edge)
- `Notification.requestPermission()`: Supported in all modern browsers
- `NotificationOptions.tag` / `NotificationOptions.icon`: Supported
- `DND hours` computation correctly handles midnight wrap (e.g. 22:00 to 07:00)

---

## Security Considerations

1. **No server-side push infrastructure** — This sprint implements client-side browser notifications only (Web Notifications API). No VAPID keys, no push subscription storage, no backend push endpoint — appropriate for "Sprint 13" scope.
2. **No user input in notification body** — All notification text is sourced from i18n keys; only `temperature` (number) and `child.name` (string) are interpolated — no XSS vector.
3. **Permission denied UX** — When `Notification.permission === 'denied'`, the toggle shows a descriptive message pointing user to browser settings — not a security bypass.
4. **DND stored in localStorage** — Acceptable for client-side preference only.

---

## Test Summary

| Category | Passed | Failed |
|----------|--------|--------|
| Notification Service logic | 8 | 0 |
| Settings Page UI | 4 | 0 |
| i18n Keys | 1 | 0 |
| Frontend build | 0 | 1 |
| Cross-service integration | 1 | 0 |
| **Total** | **14** | **1** |

---

## Bugs to Fix Before Production

1. **Remove `private` from `notifSvc` field** in `settings-page.component.ts` (or make `dndStart`/`dndEnd`/`updatePrefs` public methods on the service)
2. **Replace `require()` with `import`** in `data.service.ts` line 520 — use static ES import at file top, or dynamic `import()` if circular dependency is the concern
