# SPEC_PRODUCTION.md — Sprint 15: Final Polish Sprint

## Status: ARCHITECT REVIEW COMPLETE

---

## 1. Backend API Gaps & Fixes Needed

### ✅ PRESENT — API Endpoints Verified
| Method | Endpoint | Status |
|--------|----------|--------|
| POST | `/auth/dev-login` | ✅ Implemented |
| POST | `/auth/login` | ✅ Implemented |
| GET | `/children` | ✅ Implemented |
| POST | `/children` | ✅ Implemented |
| PATCH | `/children/:id` | ✅ Implemented |
| DELETE | `/children/:id` | ✅ Implemented |
| GET | `/temperature-entries/child/:childId` | ✅ Implemented |
| POST | `/temperature-entries` | ✅ Implemented |
| DELETE | `/temperature-entries/:id` | ✅ Implemented |
| GET | `/growth-entries/child/:childId` | ✅ Implemented |
| POST | `/growth-entries` | ✅ Implemented |
| DELETE | `/growth-entries/:id` | ✅ Implemented |
| GET | `/vaccines/child/:childId` | ✅ Implemented |
| POST | `/vaccines/:childId` | ✅ Implemented |
| PATCH | `/vaccines/:id` | ✅ Implemented |
| DELETE | `/vaccines/:id` | ✅ Implemented |
| GET | `/health-records/child/:childId` | ✅ Implemented |
| POST | `/health-records/:childId` | ✅ Implemented |
| PATCH | `/health-records/:id` | ✅ Implemented |
| DELETE | `/health-records/:id` | ✅ Implemented |

### ❌ MISSING — Backend API Gaps

| Issue | Description | Priority |
|-------|-------------|----------|
| **No `/parent` endpoints** | `DataService.fetchParentProfile()` calls `GET /parent` and `PATCH /parent`, but no Parent module exists in backend. Parent profile is stored locally only — **not persisted to DB**. | 🔴 HIGH |
| **No diary endpoints** | `DataService.addDiaryEntry()` / `loadDiaryEntries()` use localStorage only. No `POST /diary-entries` or `GET /diary-entries/child/:childId` backend routes exist. Diary entries are lost on logout/device switch. | 🔴 HIGH |
| **No illness endpoint** | Illnesses (`illnesses` signal) are localStorage-only. No backend `IllnessEpisode` model or CRUD routes. | 🟡 MEDIUM |
| **Auth header hardcoded** | `DataService.API_URL = 'http://localhost:3000'` — should use `environment.apiUrl`. The dev-login call bypasses `getHeaders()` (uses hardcoded URL too). | 🟡 MEDIUM |
| **No vaccine `GET /:id`** | Vaccines controller has `findOne` route at `GET /vaccines/:id`, but DataService never calls it. Not critical. | 🟢 LOW |
| **No health-record `GET /:id`** | Same as vaccine — endpoint exists but DataService doesn't call it. Not critical. | 🟢 LOW |

### 🔧 Fixes Required

**F1: Create Parent Module + Endpoints**
- Add `parent` module with `ParentController` + `ParentService`
- `GET /parent` — fetch parent profile by JWT userId
- `PATCH /parent` — update parent profile
- Add `Parent` model to Prisma schema (User already has profile fields — confirm schema covers `name`, `surname`, `phone`)

**F2: Create Diary Module + Endpoints**
- Add `diary-entries` module with `DiaryEntriesController` + `DiaryEntriesService`
- `POST /diary-entries` — create diary entry
- `GET /diary-entries/child/:childId` — fetch all entries for child
- `DELETE /diary-entries/:id` — delete entry
- Add `DiaryEntry` model to Prisma schema with fields: `id`, `childId`, `type`, `description`, `severity`, `duration`, `loggedAt`, `notes`

**F3: Create Illness Module + Endpoints**
- Add `illnesses` module with `IllnessesController` + `IllnessesService`
- `POST /illnesses`
- `GET /illnesses/child/:childId`
- `DELETE /illnesses/:id`
- Add `IllnessEpisode` model to Prisma schema

**F4: Fix DataService API URL**
- Replace hardcoded `'http://localhost:3000'` with `environment.apiUrl`
- Add `environment.prod.ts` with production API URL

---

## 2. Error Handling Gaps

### Current State: Partial
Most API calls have `try/catch` but **only log to console** — no user-facing toast/alert.

### ❌ Gaps

| Method | File:Line | Issue |
|--------|-----------|-------|
| `loadChildrenFromApi` | data.service.ts:200 | `console.error` only — no user message |
| `loadTemperatureEntries` | data.service.ts:309 | `console.error` only — no user message |
| `createTemperatureEntry` | data.service.ts:323 | `console.error` only + returns `null` silently |
| `loadGrowthEntries` | data.service.ts:348 | `console.error` only — no user message |
| `createGrowthEntry` | data.service.ts:362 | `console.error` only + returns `null` silently |
| `deleteGrowthEntry` | data.service.ts:375 | `console.error` only — no user message |
| `dev-login` | data.service.ts:395 | `console.error` only — falls through to dev-token silently |
| `createChild` | data.service.ts | No error handling at all — throws if API fails |
| `updateChildApi` | data.service.ts | No error handling at all |
| `deleteChildApi` | data.service.ts | No error handling at all |
| `fetchParentProfile` | data.service.ts | Returns empty object silently on failure |
| `updateParentProfile` | data.service.ts | Falls back to local-only on failure |

### 🔧 Fixes Required

**E1: Create ToastService**
- Add a `ToastService` (or use existing Angular Material snackbar) for user-facing error messages
- Error message: `"Ndodhi një gabim, provoni përsëri"` (Albanian)
- Show toast on every API catch block

**E2: Add Loading State**
- Add `loading = signal<boolean>(false)` for async operations
- Show spinner/loading indicator during API calls

**E3: Wrap All API Methods**
- All methods that call `firstValueFrom(http.*)` should have `try/catch` with toast on failure

---

## 3. Environment / Config Issues

### ❌ Gaps

| Issue | Fix |
|-------|-----|
| No `src/environments/environment.prod.ts` file | Create it with `production: true` and production API URL |
| `DataService.API_URL` hardcoded to `'http://localhost:3000'` | Use `environment.apiUrl` instead |
| Angular `fileReplacements` for production build may not be configured | Check `angular.json` production configuration includes environment replacement |
| No `.env` file checked in for backend DATABASE_URL | Document required env vars |

### 🔧 Fixes Required

**CFG1:** Create `src/environments/environment.prod.ts`
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.kiddok.example.com'  // TODO: real URL
};
```

**CFG2:** Update `DataService` to use `environment.apiUrl` via constructor injection or import

**CFG3:** Verify `angular.json` has `fileReplacements` for production configuration

---

## 4. Production Build Status

### Current State: Not Run (Architect Review)

**Pre-build checks:**
- No `console.log` statements found in source files ✅ (only `console.error` for error logging — acceptable)
- TypeScript strictness: unknown (needs build run)
- Bundle size: unknown (target < 700KB)

### 🔧 Fixes Required

**B1:** Run `npm run build -- --configuration=production` — verify zero errors
**B2:** Check bundle size in `dist/kiddok/browser` output
**B3:** Confirm `ng build --configuration=production` removes/scrubs `console.error` calls (or use build optimizer)
**B4:** Verify all Lazy Loading modules are properly code-split

---

## 5. Docker / Backend Status

### Current Docker Setup

**`docker-compose.yml`** — Only Postgres:
```yaml
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin_password
      POSTGRES_DB: kiddok_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped
```

### ❌ Gaps

| Issue | Description |
|-------|-------------|
| **No Dockerfile for NestJS backend** | The backend cannot be containerized and started with `docker-compose up`. Need to add `backend/Dockerfile` and `docker-compose.yml` service for the NestJS app. |
| **No backend service in docker-compose** | docker-compose only has Postgres, not the API server |
| **No `.env` file in repo** | No `.env.example` documenting required `DATABASE_URL`, `JWT_SECRET`, etc. |
| **Prisma schema may need migration** | Confirm `npx prisma migrate deploy` works before first deploy |

### 🔧 Fixes Required

**D1: Create `backend/Dockerfile`**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./dist/
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

**D2: Update `docker-compose.yml`**
- Add NestJS backend service with:
  - Build context: `./backend`
  - Depends on: `postgres`
  - Environment: `DATABASE_URL=postgresql://admin:admin_password@postgres:5432/kiddok_db`
  - Port: `3000:3000`
- Add optional `pgadmin` or similar for DB management

**D3: Add `.env.example`**
```
DATABASE_URL=postgresql://admin:admin_password@localhost:5432/kiddok_db
JWT_SECRET=your-secret-here
PORT=3000
```

---

## 6. Pre-Launch Checklist

### 🔴 Must Fix Before First Deploy

- [ ] **F1:** Create Parent module + endpoints (`GET /parent`, `PATCH /parent`) — parent data currently lost on logout
- [ ] **F2:** Create DiaryEntry module + endpoints — diary data currently localStorage-only
- [ ] **F3:** Create Illness module + endpoints (or clarify that illness tracking is local-only and intentional)
- [ ] **CFG1:** Create `environment.prod.ts` with production API URL
- [ ] **CFG2:** Fix `DataService.API_URL` to use `environment.apiUrl`
- [ ] **E1:** Add ToastService for user-facing error messages
- [ ] **D1:** Create `backend/Dockerfile`
- [ ] **D2:** Add NestJS service to `docker-compose.yml`
- [ ] **B1:** Run production build, fix all TypeScript errors
- [ ] **B2:** Verify bundle size < 700KB
- [ ] **B3:** Configure `fileReplacements` in `angular.json` for production environment

### 🟡 Should Fix Before First Deploy

- [ ] **E2:** Add loading states to all async operations
- [ ] **E3:** Wrap all API methods with try/catch + toast
- [ ] **CFG3:** Verify angular.json production configuration
- [ ] **B4:** Verify code splitting is working
- [ ] **D3:** Add `.env.example` to backend
- [ ] Run `prisma migrate deploy` and verify DB schema is current

### 🟢 Nice to Have

- [ ] Replace `console.error` with proper logging service (e.g., `Logger` from `@nestjs/common`)
- [ ] Add health-check endpoint (`GET /health`) to NestJS
- [ ] Add request/response logging middleware
- [ ] API rate limiting middleware
- [ ] CORS configuration for production domain

---

## Summary

**The backend structure is solid** — NestJS + Prisma + Postgres with proper JWT auth, health records, vaccines, temperature, and growth tracking. The main gaps are:

1. **No Parent or Diary backend modules** — these data types are localStorage-only
2. **No production environment config** — `environment.prod.ts` missing, `DataService` has hardcoded URL
3. **No backend Dockerization** — NestJS app can't be started with `docker-compose up`
4. **No user-facing error handling** — API failures only log to console
5. **Production build not verified** — needs to be run and bundle size confirmed

The Executor should tackle fixes F1-F4, CFG1-CFG3, E1, D1-D2, and B1-B3 in Sprint 15.
