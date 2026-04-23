# SPEC_SPRINT9_FINAL.md — Sprint 9: Final Production Verification

**Status:** ARCHITECT REVIEW COMPLETE  
**Project:** KidDok — `C:\Users\g_gus\Desktop\jona\kiddok`  
**Sprint:** Sprint 9 — Last sprint before launch  
**Reference docs:** `SPEC_PRODUCTION.md`, `SPEC_UI_POLISH.md`

---

## Context: What Already Exists

This spec is the **final production verification sprint**. The codebase is feature-complete based on prior sprints. The goal now is **zero-error production build**, **bundle size compliance**, and **pre-launch sign-off**.

### Backend State (confirmed present)
- `backend/Dockerfile` ✅
- `docker-compose.yml` with `postgres` + `api` services ✅
- `backend/prisma/schema.prisma` with all models: `User`, `Child`, `ParentProfile`, `DiaryEntry`, `IllnessEpisode`, `Vaccine`, `HealthRecord`, `TemperatureEntry`, `GrowthEntry`, `Medication`, `MedicationDoseLog`, `Appointment`, `LabResult`, `FamilyMember`, `ShareLink` ✅
- JWT auth via `@nestjs/jwt` + `@nestjs/passport-jwt` ✅
- Helmet security headers ✅
- CORS via `ALLOWED_ORIGINS` env var ✅
- Global `ValidationPipe` with `whitelist: true, forbidNonWhitelisted: true` ✅
- `.env` and `.env.example` present ✅

### Frontend State (confirmed present)
- `src/environments/environment.prod.ts` ✅ (`apiUrl: 'https://api.kiddok.al'`)
- `angular.json` `fileReplacements` for production ✅
- `environment.ts` with `apiUrl: 'http://localhost:3000'` ✅
- ServiceWorker (`ngsw`) configured in production build ✅
- Bundle budget: 500KB warning / 1MB error (target: **< 700KB**) ✅
- All services present: `data.service.ts`, `toast.service.ts`, `offline.service.ts`, `sync.service.ts`, `export.service.ts`, `notification.service.ts`, `theme.service.ts`, `modal.service.ts` ✅

---

## 1. Production Build Verification

### 1a. Run Production Build

```bash
cd C:\Users\g_gus\Desktop\jona\kiddok
npm run build -- --configuration=production
```

**Acceptance criteria:**
- Zero TypeScript errors (ignore `console.error` — those are intentional error logging)
- Zero build errors in `dist/kiddok/browser`
- Service worker `ngsw.json` generated in output
- All lazy-loaded chunks present

### 1b. Fix Build Errors (if any)

If build fails, the Executor must fix errors in priority order:
1. **TypeScript compilation errors** — fix types/signatures
2. **Template errors** — fix Angular template bindings
3. **Missing assets** — confirm `angular.json` `assets` array includes all required files
4. **Module resolution failures** — fix `tsconfig.app.json` `paths` or `baseUrl`

---

## 2. Bundle Size Check

### 2a. Measure Bundle

After production build, inspect `dist/kiddok/browser`:

```bash
# List all JS chunks with sizes
Get-ChildItem dist/kiddok/browser -Filter "*.js" -Recurse | ForEach-Object { "{0,-60} {1,10:N0} bytes" -f $_.FullName.Replace("$PWD\",""), $_.Length }
```

**Target: total initial bundle < 700KB** (Angular app + vendor + polyfills + main)

### 2b. If Bundle Exceeds 700KB

Priority fixes (in order):
1. **Verify lazy loading** — run `fix_lazy.py` or inspect `angular.json` routing for `loadChildren()` patterns. All feature modules (vaccines, growth, temperature, diary, medications, appointments, health-records, lab-results) must be lazy-loaded.
2. **Check `src/styles.scss`** — ensure no massive CSS imports
3. **Remove unused Angular Material components** from imports if any
4. **Enable `optimization: true`** in production build config if not already set (Angular CLI handles this automatically for production)
5. **Check `tsconfig.json`** `target: "ES2022"` — confirm no ES5 polyfills being loaded unnecessarily

---

## 3. Pre-Launch Checklist (from SPEC_PRODUCTION.md)

All items must be **verified and checked off** by the Executor. Items marked ✅ = already done.

### 🔴 Must Fix / Must Verify

| # | Item | Reference | Status |
|---|------|-----------|--------|
| P1 | Production build runs with zero errors | §1 above | 🔲 TODO |
| P2 | Bundle size < 700KB | §2 above | 🔲 TODO |
| P3 | `environment.prod.ts` has correct `apiUrl` | `src/environments/environment.prod.ts` | ✅ `apiUrl: 'https://api.kiddok.al'` |
| P4 | `angular.json` `fileReplacements` targets `environment.prod.ts` | `angular.json` production config | ✅ Confirmed |
| P5 | `DataService` uses `environment.apiUrl` (not hardcoded `localhost`) | `data.service.ts` — verify `API_URL` not hardcoded | 🔲 TODO |
| P6 | Docker compose final verification | §4 below | 🔲 TODO |
| P7 | Database migration final check | §5 below | 🔲 TODO |
| P8 | Security audit | §6 below | 🔲 TODO |
| P9 | Performance audit | §7 below | 🔲 TODO |
| P10 | ToastService exists and handles API errors | `src/app/services/toast.service.ts` | ✅ Confirmed |
| P11 | `backend/Dockerfile` exists and is correct | `backend/Dockerfile` | ✅ Confirmed |
| P12 | `docker-compose.yml` has both `postgres` and `api` services | `docker-compose.yml` | ✅ Confirmed |

### 🟡 Should Verify

| # | Item | Reference | Status |
|---|------|-----------|--------|
| S1 | Loading states on async components | UI components need `loading` signal | 🔲 TODO |
| S2 | All API methods have `try/catch` with toast | `data.service.ts` | 🔲 TODO |
| S3 | `.env.example` present in backend | `backend/.env.example` | 🔲 TODO (need to check) |
| S4 | Health-check endpoint on NestJS | `GET /health` | 🔲 TODO |

---

## 4. Docker Compose Final Verification

### 4a. Verify Service Definitions

```yaml
# docker-compose.yml must have:
services:
  postgres:
    image: postgres:15
    healthcheck: pg_isready
    environment: POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB
    ports: "5432:5432"
    volumes: postgres_data

  api:
    build: ./backend
    ports: "3000:3000"
    environment:
      DATABASE_URL: postgresql://admin:admin_password@postgres:5432/kiddok_db
      JWT_SECRET: ${JWT_SECRET:-kiddok-secret-change-in-prod}
    depends_on: postgres (with condition: service_healthy)
```

### 4b. Run Docker Compose Health Check

```bash
cd C:\Users\g_gus\Desktop\jona\kiddok
docker-compose up --build -d
# Wait 30s
docker-compose ps
docker-compose logs api --tail=20
```

**Acceptance criteria:**
- `api` container is `Up` and not restarting
- No Prisma/migration errors in logs
- Healthcheck passes: `docker inspect --format='{{.State.Health.Status}}' kiddok-api` → `healthy`

### 4c. Smoke Test API in Docker

```bash
# Get container name
$container = (docker-compose ps -q api).Replace("`n","").Substring(0,12)
# Test health endpoint (if exists)
docker exec $container wget -qO- http://localhost:3000/api/children -O /dev/null -w "%{http_code}\n" --header "Authorization: Bearer invalid"
# Should return 401 (not 000 or connection refused)
```

---

## 5. Database Migration Final Check

### 5a. Verify Prisma Schema is Production-Ready

```bash
cd C:\Users\g_gus\Desktop\jona\kiddok\backend
# Check migrations folder exists
Get-ChildItem prisma/migrations -Name
```

### 5b. Dry Run Migration (against a test DB or shadow DB)

```bash
cd C:\Users\g_gus\Desktop\jona\kiddok\backend
npx prisma migrate deploy --dry-run
```

**Acceptance criteria:**
- No "migration file missing" or "drift detected" errors
- All models in `schema.prisma` have corresponding migration SQL

### 5c. Validate Schema with Prisma Client

```bash
cd C:\Users\g_gus\Desktop\jona\kiddok\backend
npx prisma validate
```

---

## 6. Security Audit

### 6a. JWT Configuration

| Check | Expected | Pass/Fail |
|-------|----------|-----------|
| JWT secret is not `kiddok-super-secret-jwt-key-2024` in production | Environment variable or secret manager | 🔲 Must verify |
| JWT expiration set (`expiresIn`) | Not `null` or infinite | ✅ |
| JWT decoded in `JwtStrategy` | `validate()` returns user object | ✅ |
| Token refresh not needed for MVP | Single-session auth (acceptable) | ✅ |

**Verify JWT expires in `backend/src/auth/jwt.strategy.ts` or `auth.service.ts`:**

### 6b. CORS Configuration

**In `backend/src/main.ts`:**
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

| Check | Status |
|-------|--------|
| `ALLOWED_ORIGINS` env var documented in `.env.example` | 🔲 TODO |
| Credentials allowed (for JWT cookie/header) | ✅ |
| Only necessary methods exposed | ✅ |
| `localhost` regex not used in production CORS | 🔲 Must set `ALLOWED_ORIGINS` for prod |

### 6c. Input Validation

**`ValidationPipe` in `main.ts`:**
```typescript
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  transform: true,
  forbidNonWhitelisted: true,
}));
```

| Check | Status |
|-------|--------|
| All DTOs use `class-validator` decorators | 🔲 TODO — verify |
| String fields have `@IsString()`, `@MaxLength()` | 🔲 TODO — verify |
| Numeric fields have `@IsNumber()`, `@Min()`/`@Max()` | 🔲 TODO — verify |
| Email field uses `@IsEmail()` | 🔲 TODO — verify |
| Date fields use `@IsDateString()` or `@Type(() => Date)` | 🔲 TODO — verify |

### 6d. File Upload Limits

| Check | Status |
|-------|--------|
| No file upload endpoints in current codebase | ✅ (health records use JSON `attachments: string[]`, no multipart) |
| If file uploads added later: limit max size (e.g., 5MB) | N/A for current scope |

### 6e. Rate Limiting

| Check | Status |
|-------|--------|
| `@nestjs/throttler` or equivalent configured | 🔲 Not found in `main.ts` — consider adding or noting as non-blocking |

---

## 7. Performance Audit

### 7a. Bundle Splitting Verification

**Check `angular.json` routing — all feature modules must use lazy loading:**

In `src/app/app.routes.ts` (or `app.config.ts` if using functional routing):

```typescript
// ✅ CORRECT — lazy loaded
{
  path: 'vaccines',
  loadComponent: () => import('./components/vaccines.component').then(m => m.VaccinesComponent)
},
// ❌ WRONG — eager (blocks initial bundle)
{ path: 'vaccines', component: VaccinesComponent }
```

**Run analysis to check lazy loading:**
```bash
cd C:\Users\g_gus\Desktop\jona\kiddok
node fix_lazy.py
```

### 7b. Service Worker / PWA

**Check `angular.json` production config:**
- `serviceWorker: "src/ngsw-config.json"` ✅

**Verify `ngsw-config.json` exists:**
```bash
Test-Path "C:\Users\g_gus\Desktop\jona\kiddok\src\ngsw-config.json"
```

### 7c. API Response Optimization

| Check | Status |
|-------|--------|
| NestJS uses `DefaultSerializer` or no serialization overhead | 🔲 TODO — verify |
| `findMany()` with `select:` or `include:` is specific (not selecting entire models) | 🔲 TODO — check controllers |
| Pagination on list endpoints (e.g., `findAll` for children) | 🔲 TODO — check |

### 7d. Offline-First Architecture

The app uses `offline.service.ts` + `sync.service.ts` + IndexedDB:
- ✅ Service worker for asset caching
- ✅ `SyncQueue` for offline mutation queuing
- ✅ Background sync on reconnection

---

## 8. Final E2E Smoke Test Plan

### 8a. Manual Smoke Tests (Playwright)

**Setup:**
```bash
cd C:\Users\g_gus\Desktop\jona\kiddok
npx playwright install chromium
# Start backend: docker-compose up -d
# Start frontend dev server: npm start
```

**Smoke test cases:**

| # | Test | Steps | Expected Result |
|---|------|-------|-----------------|
| SM1 | Dev login | Click dev login button | Redirects to child selector, JWT stored |
| SM2 | Add child | Fill form: name "Test Child", DOB, gender, blood type, save | Child appears in selector |
| SM3 | Edit child | Edit name, save | Toast "Ndryshimet u ruajtën!", name updated |
| SM4 | Add temperature reading | Select child, add temp 37.5°C | Reading appears in chart |
| SM5 | Add growth entry | Add height 75cm, weight 10kg | Entry appears in growth list + chart |
| SM6 | Add vaccine | Add vaccine "MMR" with date | Vaccine appears in list |
| SM7 | Add medication | Add medication "Amoxicillin" | Medication appears in active list |
| SM8 | Add appointment | Add appointment "Pediatric checkup" | Appears in appointments |
| SM9 | Add diary entry | Add diary note | Appears in diary |
| SM10 | Offline mode | Disconnect network, add temp reading | Toast shows offline, data queued |
| SM11 | Reconnect sync | Reconnect network | Queued data syncs, toast "Data synced" |
| SM12 | Logout | Click logout | Redirected to login, JWT cleared |
| SM13 | Production build loads | Serve `dist/kiddok/browser`, open app | App loads, no 404 resources |
| SM14 | Docker backend | `docker-compose up`, `curl localhost:3000/api/children` | Returns `[]` or `401` (auth required) |
| SM15 | JWT required | Call `/api/children` without token | Returns 401 |

### 8b. Playwright Script (automated)

**File:** `e2e/smoke.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:4200';

test('SM1: Dev login', async ({ page }) => {
  await page.goto(BASE);
  await page.click('[data-testid="dev-login-btn"]');
  await expect(page.url()).not.toContain('/login');
});

test('SM2: Add child', async ({ page }) => {
  await page.goto(BASE);
  await page.click('[data-testid="add-child-btn"]');
  await page.fill('[data-testid="child-name-input"]', 'Test Child');
  await page.fill('[data-testid="child-dob-input"]', '2022-01-15');
  await page.click('[data-testid="save-child-btn"]');
  await expect(page.locator('text=Test Child')).toBeVisible();
});

test('SM3: Add temperature reading', async ({ page }) => {
  await page.goto(BASE);
  await page.click('[data-testid="add-temp-btn"]');
  await page.fill('[data-testid="temp-input"]', '37.5');
  await page.click('[data-testid="save-temp-btn"]');
  await expect(page.locator('text=37.5')).toBeVisible();
});

test('SM13: Production build loads', async ({ page }) => {
  // Serve dist folder with any static server
  await page.goto('http://localhost:4201');
  await expect(page.locator('app-root')).toBeVisible();
});
```

### 8c. Final Checklist Before "Go Live"

- [ ] All 15 smoke tests pass
- [ ] Production build: zero errors, zero warnings (or only budget warnings)
- [ ] Bundle size measured and < 700KB
- [ ] Docker compose: `api` + `postgres` both healthy
- [ ] `prisma migrate deploy` runs without errors
- [ ] `ALLOWED_ORIGINS` set for production domain
- [ ] `JWT_SECRET` changed from default
- [ ] Service worker registered (`ngsw`)
- [ ] No console errors in production build
- [ ] All `TODO` and `FIXME` comments reviewed (no critical ones outstanding)

---

## Executor Tasks (Summary)

The Executor must:

1. **Run production build** (`npm run build --configuration=production`) — fix all errors
2. **Measure bundle** — verify < 700KB, fix if needed
3. **Verify `DataService`** — no hardcoded `localhost:3000`
4. **Verify Docker compose** — run `docker-compose up --build -d`, check logs
5. **Run `prisma migrate deploy --dry-run`** — fix any schema drift
6. **Security audit** — verify JWT expiration, DTO validation, CORS env var
7. **Performance audit** — confirm lazy loading, check `ngsw-config.json`
8. **Run E2E smoke tests** (manual or Playwright)
9. **Commit** with `git add . && git commit -m "sprint9: executor final production verification"`
10. **Report commit hash + any blockers**

---

## Reviewer Sign-off (kiddok-reviewer)

After Executor commits, the Reviewer must:
- Re-run production build and confirm zero errors
- Inspect bundle chunks and confirm < 700KB
- Check `docker-compose ps` for healthy containers
- Verify JWT strategy has expiration
- Confirm `ValidationPipe` uses `whitelist: true, forbidNonWhitelisted: true`
- Write `REVIEW_RESULTS_SPRINT9_FINAL.md`

---

## Pre-Launch Sign-Off Table

| # | Milestone | Owner | Status |
|---|-----------|-------|--------|
| 1 | Production build passes | Executor | 🔲 |
| 2 | Bundle size < 700KB | Executor | 🔲 |
| 3 | Docker compose healthy | Executor | 🔲 |
| 4 | DB migration verified | Executor | 🔲 |
| 5 | Security audit passed | Reviewer | 🔲 |
| 6 | E2E smoke tests pass | Executor/Reviewer | 🔲 |
| 7 | FINAL APPROVAL | User | 🔲 |

---

_Reference: SPEC_PRODUCTION.md (Sprint 15), SPEC_UI_POLISH.md (Sprint 10), angular.json, docker-compose.yml, backend/prisma/schema.prisma, backend/src/main.ts_
