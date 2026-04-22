# TEST_RESULTS_SPRINT10.md — Performance Audit + Security Hardening

**Date:** 2026-04-23
**Tester:** kiddok-tester
**Status:** PASS

---

## Verification Checklist

| Item | File | Finding | Status |
|------|------|---------|--------|
| OnPush change detection | `shell.component.ts` | `ChangeDetectionStrategy.OnPush` imported and applied to `@Component` decorator | ✅ PASS |
| JWT secret externalized | `jwt.strategy.ts` | `secretOrKey: process.env.JWT_SECRET` with runtime check — no hardcoded value | ✅ PASS |
| helmet() called | `main.ts` | `app.use(helmet())` present after `NestFactory.create` | ✅ PASS |
| forbidNonWhitelisted | `main.ts` | `ValidationPipe` has `forbidNonWhitelisted: true` | ✅ PASS |
| ThrottlerModule | `app.module.ts` | `ThrottlerModule.forRoot([{ name: 'short', ttl: 60000, limit: 100 }])` present | ✅ PASS |
| Avatar URL sanitization | `data.service.ts` | `isValidUrl()` checks `protocol === 'https:'` and `hostname === 'api.dicebear.com'`, applied in `loadChildrenFromApi`, `createChild`, `updateChildApi` | ✅ PASS |
| Frontend TS build | Angular build | `npx ng build --configuration development` — 0 `error TS` in output | ✅ PASS |

---

## 1. Performance Audit

### 1.1 Bundle Size
- **Raw:** 688 kB / **Transfer:** 150 kB (budget: 500 kB) — exceeds budget
- Root cause: Angular 21 framework + Chart.js + Lucide icons + Tailwind
- **Flagged** for future sprint (lazy loading or budget realignment)

### 1.2 ChangeDetectionStrategy — shell.component.ts
```typescript
import { Component, inject, signal, computed, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
// ...
@Component({
    selector: 'app-shell',
    changeDetection: ChangeDetectionStrategy.OnPush,
```
✅ `OnPush` applied to the host shell component. All child components are standalone signal-based components — correct architecture.

### 1.3 Memory Leak Fixes
| Component | Fix | Status |
|-----------|-----|--------|
| `temperature-diary.component.ts` | `chartEffect.destroy()` + `chartInstance.destroy()` in `ngOnDestroy` | ✅ |
| `growth-tracking.component.ts` | `chartEffect.destroy()` + `chartInstance.destroy()` + `resizeTimeout` cleanup in `ngOnDestroy` | ✅ |
| `shell.component.ts` | `window.removeEventListener('kiddok:navigate', this.navigateHandler)` in `ngOnDestroy` | ✅ |

---

## 2. Security Hardening

### 2.1 JWT Secret — jwt.strategy.ts
```typescript
const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error('JWT_SECRET environment variable is not set');
}
super({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: secret,  // ✅ No hardcoded value
});
```
✅ Now reads from `process.env.JWT_SECRET`. Throws at startup if missing — correct fail-fast behavior.

### 2.2 Helmet — main.ts
```typescript
import helmet from 'helmet';
// ...
app.use(helmet());
```
✅ `helmet()` called before any routes. Sets CSP, XSS, clickjacking, MIME-sniffing headers.

### 2.3 ValidationPipe forbidNonWhitelisted — main.ts
```typescript
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  transform: true,
  forbidNonWhitelisted: true,
}));
```
✅ Rejects any request DTO property not explicitly defined in the DTO class — prevents mass-assignment attacks.

### 2.4 ThrottlerModule — app.module.ts
```typescript
import { ThrottlerModule } from '@nestjs/throttler';
// ...
ThrottlerModule.forRoot([{
  name: 'short',
  ttl: 60000,
  limit: 100,
}]),
```
✅ Global 100 req/min rate limiting applied. Auth endpoints also get `@Throttle(5, 60)` — 5 attempts per minute per IP.

### 2.5 Avatar URL Sanitization — data.service.ts
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
Applied in:
- `loadChildrenFromApi()` — on API response avatarUrl
- `createChild()` — on created child avatarUrl
- `updateChildApi()` — on updated child avatarUrl
- Invalid URLs fall back to DiceBear deterministic avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(name)}`

✅ Prevents stored XSS via avatarUrl injection from a compromised API.

### 2.6 CORS Configurable — main.ts
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
✅ Origins now configurable via `ALLOWED_ORIGINS` env var (comma-separated). Dev fallback restricts to localhost only.

---

## 3. Frontend TypeScript Build

```
cd C:\Users\g_gus\Desktop\jona\kiddok; npx ng build --configuration development
Select-String -Pattern "error TS" → (no output)
```
✅ Zero `error TS` in the build output. No new TypeScript errors introduced by Sprint 10 changes.

---

## 4. Known Pre-existing Issues (NOT in Scope)

| Issue | File | Note |
|-------|------|------|
| 18 Prisma TS errors (schema model mismatch) | `parent.service.ts`, `diary.service.ts`, `illnesses.service.ts` | Pre-existing — schema drift — separate ticket |
| `implicit any` on `req` params | `illnesses.controller.ts`, `vaccines.controller.ts`, `parent.controller.ts` | Pre-existing |
| JWT in localStorage (XSS risk) | `data.service.ts` | Flagged for Sprint 20 (httpOnly cookie migration) |
| Bundle exceeds 500 kB budget | `angular.json` | Flagged — budget needs realignment or lazy loading required |

---

## 5. Summary

Sprint 10 changes **PASS** all automated verification checks:

- ✅ `shell.component.ts`: `ChangeDetectionStrategy.OnPush` applied
- ✅ `jwt.strategy.ts`: No hardcoded secret — uses `process.env.JWT_SECRET`
- ✅ `main.ts`: `helmet()` called, `forbidNonWhitelisted: true` on ValidationPipe
- ✅ `app.module.ts`: `ThrottlerModule` global rate limiter present
- ✅ `data.service.ts`: `isValidUrl()` sanitizes avatar URLs to `api.dicebear.com` only
- ✅ Frontend build: 0 TypeScript errors

**Recommendation:** Merge to `main`. Address bundle budget and Prisma schema issues in follow-up sprints.
