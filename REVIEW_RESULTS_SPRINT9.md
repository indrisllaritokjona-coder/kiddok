# REVIEW_RESULTS_SPRINT9.md — Reviewer/Refiner

**Project:** KidDok
**Sprint:** 9
**Reviewer:** kiddok-reviewer
**Date:** 2026-04-23

---

## 1. Security Audit

### ✅ Health Controller (`/health`) — PASS
- Intentional: public endpoint for Docker/lb health checks
- Returns only `{ status: 'ok', timestamp }` — no sensitive data
- Correct: no `@UseGuards` applied

### ✅ JWT 7-day expiration — PASS
- `auth.module.ts` confirmed: `signOptions: { expiresIn: '7d' }`
- `auth.module.ts` also uses `process.env.JWT_SECRET` as primary (with fallback for dev)

### ✅ CORS — PASS
- `.env.example` documents `ALLOWED_ORIGINS` with comma-separated list
- Defaults to `[/^http:\/\/localhost:\d+$/]` when env var absent
- Credentials and allowed headers correctly configured in `main.ts`
- Note: production must set `ALLOWED_ORIGINS=https://app.kiddok.al`

### ✅ ValidationPipe — PASS
- `main.ts` global pipe: `whitelist: true, forbidNonWhitelisted: true, transform: true`
- All DTOs properly typed (`UpdateDiaryEntryDto`, `UpdateIllnessDto`, etc.) replacing `any`

### ✅ Rate Limiting — PASS
- Global `ThrottlerModule` in `app.module.ts`: 100 req/min per IP
- Auth endpoints explicitly guarded with `@UseGuards(ThrottlerGuard)` + 5 req/min throttle:
  - `POST /auth/login`
  - `POST /auth/dev-login`

### ✅ environment.prod.ts — PASS
- Only contains `production: true`, `apiUrl`, `useMocks: false`
- No hardcoded secrets, DB URLs, or JWT keys

---

## 2. ⚠️ Critical Finding: JWT Strategy fallback regression

**File:** `backend/src/auth/strategies/jwt.strategy.ts`

**Before (expected):** Throw if `JWT_SECRET` is unset
```ts
const secret = process.env.JWT_SECRET;
if (!secret) { throw new Error('JWT_SECRET environment variable is not set'); }
```

**After (regression):**
```ts
const secret = process.env.JWT_SECRET || 'kiddok_secret_key_123';
```

**Impact:** If production deployment omits `JWT_SECRET`, the app starts with the **default dev secret**. Tokens signed with the dev secret remain valid for 7 days — an attacker who knows the default secret can forge tokens for any user.

**Fix required:**
```ts
const secret = process.env.JWT_SECRET;
if (!secret) { throw new Error('JWT_SECRET environment variable is not set'); }
super({ secret, ... });
```

This should be treated as a **must-fix before production**.

---

## 3. Performance Audit

### ✅ Bundle size — PASS
- `angular.json` budget lowered from `1mb` → `700kb`
- Tester reported 683KB raw bundle — within budget with margin

### ✅ Lazy loading — PASS
- All 11 route children in `app.routes.ts` use `loadComponent()`:
  ```
  home, diary, temperature, growth, records, vaccines,
  medications, appointments, lab-results, analytics, settings
  ```
- `ShellComponent` and `PinLockComponent` are the only eagerly-loaded components

### ✅ ngsw-config.json — PASS
- `dataGroups[0].cacheConfig` uses `strategy: "freshness"` for all API routes
- `timeout: "10s"` — falls back to stale cache if API is unreachable
- Asset groups use `prefetch` for app shell, `lazy` for assets

---

## 4. Smoke Tests Coverage (e2e/smoke.spec.ts)

15 tests covering:
- Login, child CRUD, temperature, growth, vaccines, medications, appointments, diary
- Offline mode queue, reconnect sync, logout, JWT enforcement, Docker health, prod build

**Note:** Test SM13 (production build) requires a separate `npx serve` on port 4201 — not part of the default Docker stack. Not a blocker.

---

## 5. Summary

| Area | Status | Notes |
|------|--------|-------|
| Health controller | ✅ PASS | Public, intentional |
| JWT expiration | ✅ PASS | 7d confirmed |
| CORS configuration | ✅ PASS | Env-documented, safe defaults |
| ValidationPipe | ✅ PASS | whitelist + forbidNonWhitelisted |
| Rate limiting | ✅ PASS | Global + auth-specific |
| environment.prod.ts | ✅ PASS | No hardcoded secrets |
| JWT Strategy fallback | ⚠️ REGRESSION | Must-fix: remove default secret |
| Bundle size | ✅ PASS | 683KB < 700KB |
| Lazy loading | ✅ PASS | All routes use loadComponent |
| Service worker cache | ✅ PASS | freshness strategy, 10s timeout |

---

## Required Fix Before Production

**File:** `backend/src/auth/strategies/jwt.strategy.ts`

```typescript
// FIX: Remove fallback secret — env var must always be set in production
const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error('JWT_SECRET environment variable is not set');
}
super({
  secret,  // <— use variable directly, not with ||
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
});
```