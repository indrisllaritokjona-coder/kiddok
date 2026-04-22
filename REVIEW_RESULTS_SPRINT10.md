# REVIEW_RESULTS_SPRINT10.md — Security + Performance Audit

**Date:** 2026-04-23
**Reviewer:** kiddok-reviewer
**Sprint:** 10 — Performance Hardening + Security
**Status:** ✅ APPROVED with one follow-up flag

---

## Source Verification

All code verified against the working repository at `C:\Users\g_gus\Desktop\jona\kiddok`.

---

## 1. Performance Review

### 1.1 `ChangeDetectionStrategy.OnPush` — shell.component.ts ✅

```typescript
import { Component, ..., ChangeDetectionStrategy } from '@angular/core';
@Component({
    selector: 'app-shell',
    changeDetection: ChangeDetectionStrategy.OnPush,
    ...
})
```

**Finding:** `OnPush` is correctly applied to the shell host component. Child components are standalone signal-based components — this is the correct architecture. No change detection cycles triggered on the shell unless an injected signal changes.

### 1.2 Memory Leak Fixes ✅

Verified via grep against source files:

| Component | Destroy Call | Verified |
|-----------|-------------|----------|
| `temperature-diary.component.ts` | `chartEffect.destroy()` + `chartInstance.destroy()` in `ngOnDestroy` | ✅ Lines 312, 316 |
| `growth-tracking.component.ts` | `chartEffect.destroy()` + `chartInstance.destroy()` + `resizeTimeout` cleanup in `ngOnDestroy` | ✅ Lines 330, 334, 337–339 |
| `shell.component.ts` | `window.removeEventListener('kiddok:navigate', this.navigateHandler)` in `ngOnDestroy` | ✅ Confirmed |

**Finding:** All three memory leak vectors are correctly patched. Chart.js instances and resize timeouts are cleaned up on component destruction.

### 1.3 Bundle Size ⚠️

- **Raw:** 688 kB / **Transfer:** 150 kB
- **Budget:** 500 kB (from angular.json)
- **Exceeds budget by ~38%**

**Finding:** Known issue flagged for future sprint. Root causes are Angular 21 framework, Chart.js, Lucide icons, and Tailwind. No new code contributed to bundle size in Sprint 10. **Recommendation:** Lazy-load chart components or defer Chart.js loading until first tab navigation.

---

## 2. Security Review

### 2.1 JWT Secret Externalized — jwt.strategy.ts ✅

```typescript
const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error('JWT_SECRET environment variable is not set');
}
super({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: secret,
});
```

**Finding:** ✅ No hardcoded secret. Startup fails fast if `JWT_SECRET` is not set — correct fail-secure behavior. Verified in source at `backend\src\auth\strategies\jwt.strategy.ts`.

### 2.2 Helmet Middleware — main.ts ✅

```typescript
app.use(helmet());
```

**Finding:** ✅ `helmet()` is called early in the bootstrap sequence (before any routes). Sets CSP, XSS, clickjacking, MIME-sniffing, and HSTS headers.

### 2.3 `forbidNonWhitelisted` Validation — main.ts ✅

```typescript
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  transform: true,
  forbidNonWhitelisted: true,
}));
```

**Finding:** ✅ Global `ValidationPipe` strips unknown properties (`whitelist: true`) and rejects requests with extra fields (`forbidNonWhitelisted: true`). Prevents mass-assignment attacks on all DTOs.

### 2.4 ThrottlerModule — app.module.ts ✅

```typescript
ThrottlerModule.forRoot([{
  name: 'short',
  ttl: 60000,
  limit: 100,
}])
```

**Finding:** ✅ Global rate limiter at 100 req/min per IP. Additionally, `auth.controller.ts` has `@UseGuards(ThrottlerGuard)` + `@Throttle({ short: { limit: 5, ttl: 60000 } })` on login/register — 5 attempts per minute per IP for auth endpoints.

### 2.5 Avatar URL Sanitization — data.service.ts ✅

```typescript
private isValidUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === 'https:' && u.hostname === 'api.dicebear.com';
  } catch {
    return false;
  }
}
```

**Finding:** ✅ Applied in all three entry points: `loadChildrenFromApi()`, `createChild()`, and `updateChildApi()`. Invalid URLs fall back to a deterministic DiceBear avatar. No SVG injection vectors are possible since only `api.dicebear.com` is allowlisted and only `https:` is accepted.

### 2.6 CORS Configurable — main.ts ✅

```typescript
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim())
  : [/^http:\/\/localhost:\d+$/];
app.enableCors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});
```

**Finding:** ✅ Origins are configurable via `ALLOWED_ORIGINS` env var. Dev fallback restricts to localhost only. Credentials enabled. Only explicit headers allowed.

### 2.7 Frontend TypeScript Build ✅

**Finding:** `npx ng build --configuration development` produces 0 `error TS` in output. No new TypeScript errors introduced.

---

## 3. One Follow-up Flag

### ⚠️ ThrottlerGuard is NOT globally applied

`ThrottlerModule.forRoot()` is imported in `app.module.ts`, but the `ThrottlerGuard` is **not** registered globally via `APP_GUARD`. This means:

- The **global rate limit** (100 req/min) only applies to routes that explicitly use `@UseGuards(ThrottlerGuard)`
- Currently, only the auth controller has this guard
- Other REST endpoints (children, diary, vaccines, growth, etc.) have **no rate limiting** unless they also use the guard

**Fix:** Add to `app.module.ts` providers array:
```typescript
{
  provide: APP_GUARD,
  useClass: ThrottlerGuard,
},
```

This should be addressed before production deployment. Sprint-backlog note.

---

## 4. Not in Scope (Pre-existing Issues)

| Issue | File | Note |
|-------|------|------|
| 18 Prisma TS errors | `parent.service.ts`, `diary.service.ts`, `illnesses.service.ts` | Schema drift — separate ticket |
| `implicit any` on `req` params | `illnesses.controller.ts`, `vaccines.controller.ts`, `parent.controller.ts` | Pre-existing |
| JWT in localStorage (XSS risk) | `data.service.ts` | Sprint 20 — httpOnly cookie migration |
| Bundle 688kB vs 500kB budget | `angular.json` | Lazy loading or budget realignment |

---

## 5. Summary

| Area | Status | Notes |
|------|--------|-------|
| JWT secret externalized | ✅ PASS | No hardcoded value, fail-fast |
| helmet() | ✅ PASS | Called before routes |
| forbidNonWhitelisted | ✅ PASS | Global ValidationPipe |
| ThrottlerModule (global) | ⚠️ PARTIAL | Configured but guard not globally bound |
| ThrottlerModule (auth) | ✅ PASS | 5 req/min on auth endpoints |
| Avatar URL sanitization | ✅ PASS | HTTPS + hostname allowlist |
| CORS configurable | ✅ PASS | Env var + localhost fallback |
| OnPush change detection | ✅ PASS | Applied to shell component |
| Memory leak fixes | ✅ PASS | chartEffect + chartInstance + resizeTimeout |
| Frontend TS build | ✅ PASS | Zero TypeScript errors |

**Decision:** ✅ **APPROVED for merge.** The ThrottlerGuard global binding gap should be addressed before production — low effort fix but important for DoS protection on non-auth endpoints.
