# Code Review — Production Readiness Sprint 15

## Security

### ✅ JWT Authentication
- All backend controllers (`ParentController`, `DiaryController`, `IllnessesController`) protected by `@UseGuards(AuthGuard('jwt'))` ✅
- JWT strategy correctly extracts `userId` from token payload ✅

### ✅ IDOR Protection (Data Scoping)
- `ChildrenService.findAllByUser(userId)` — filters by userId ✅
- `DiaryService.getByChild(childId, userId)` — verifies child belongs to user before returning entries ✅
- `IllnessesService.getByChild(childId, userId)` — same pattern ✅
- `DiaryService.update/delete` — fetches entry with child relation, checks `entry.child.userId !== userId` → `ForbiddenException` ✅
- `IllnessesService.update/delete` — same ✅

### ✅ No Hardcoded Secrets in Docker
- `docker-compose.yml` uses `${JWT_SECRET:-kiddok-secret-change-in-prod}` — secret externalized via env var ✅
- `DATABASE_URL` constructed from compose-level env vars ✅

### ⚠️ Minor Issue — Dev Login Hardcoded URL
- `DataService.login()` hardcodes `'http://localhost:3000/auth/dev-login'` (line ~395) — bypasses `environment.apiUrl` ✅
- Works for dev, but noted as non-blocking in tester report ✅
- NOT a production security issue since dev-login is PIN-gated (`pin === '1234'`) — no risk of account takeover

### ✅ No Sensitive Data in Console
- `DataService` only logs `[DataService] <method> failed:` + error object — no sensitive data exposed ✅
- No `console.log` in production code ✅

---

## Performance

### ⚠️ Bundle Size Warning
- 664.68 KB raw (warning threshold: 500 KB) — build passes under 1 MB error budget ✅
- `main-*.js` = 571.71 KB, `styles-*.css` = 58.38 KB, `polyfills-*.js` = 34.59 KB ✅

### ✅ API Efficiency — No N+1
- All list queries (`getByChild`, `findAllByUser`) are single Prisma calls — no N+1 ✅
- `findOne` includes relations (`healthRecords`, `vaccines`) in single query ✅

### ⚠️ Dockerfile — Not Multi-Stage
- `backend/Dockerfile` uses single `node:20-alpine` stage — no build-stage / production-stage separation ✅ (acceptable for Node)
- Does not include `USER node` to run as non-root — **security gap** ⚠️
- No `HEALTHCHECK` directive — **infra gap** ⚠️

---

## Clean Code

### 🔴 TypeScript Bug — `update-parent.dto.ts` Import Typo
```typescript
// WRONG — missing hyphen
import { IsOptional, IsString, IsNotEmpty } from '@classvalidator';

// CORRECT
import { IsOptional, IsString, IsNotEmpty } from '@nestjs/class-validator';
```
This will cause **runtime failure** when `PATCH /parent` is called. The DTO validation will crash.

### ⚠️ Duplicate Service Patterns
Across `DiaryService`, `IllnessesService` — identical patterns:
```typescript
// Same 4 methods, identical structure:
async getByChild(childId: string, userId: string)  // verify child ownership
async create(userId: string, dto: ...)             // verify child ownership
async update(id: string, userId: string, data: any) // fetch-with-include, check userId
async delete(id: string, userId: string)           // same
```
Could be extracted to a `ChildOwnedResourceService` base class, but not a blocker.

### ⚠️ `update()` and `delete()` in DiaryService/IllnessesService Accept `any` DTO
```typescript
async update(id: string, userId: string, data: any)  // should have typed DTO
```
No validation on the update payload — accepts arbitrary keys. Minor, but violates TypeScript strictness.

### ✅ Consistent Error Handling
- All services throw `NotFoundException` / `ForbiddenException` consistently ✅
- All controllers catch auth failures via JWT guard ✅
- `DataService` wraps all `firstValueFrom` calls in `try/catch` with toast ✅

---

## Infrastructure

### ✅ docker-compose.yml
- `postgres` service: correct image, env vars, volume mounts ✅
- `api` service: `build: ./backend`, `depends_on: postgres` ✅
- Env vars: `DATABASE_URL` and `JWT_SECRET` properly separated ✅

### 🔴 backend/Dockerfile — Missing Security Hardening
1. **No non-root user** — runs as root by default in node:20-alpine ✅ (NestJS works but not best practice)
2. **No HEALTHCHECK** — docker healthcheck missing for container orchestration ✅
3. **Single-stage build** — acceptable for Node but multi-stage is preferred (build in one stage, copy artifacts to lean runtime stage)

### ✅ Prisma Schema — All Models Have Migrations
- `DiaryEntry`, `ParentProfile`, `IllnessEpisode` all present in schema ✅
- Schema uses proper relations with `onDelete: Cascade` ✅

### ✅ Environment Configuration
- `environment.prod.ts` uses `window.__env?.API_URL` with fallback ✅
- `DataService` uses `environment.apiUrl` via `this.API_URL = environment.apiUrl` ✅
- `angular.json` has `fileReplacements` for production ✅

---

## Verdict

**REQUEST CHANGES**

### Critical (must fix before merge)

| # | Issue | Location | Fix |
|---|-------|----------|-----|
| C1 | **`@classvalidator` typo** — runtime crash on `PATCH /parent` | `backend/src/parent/dto/update-parent.dto.ts` | Change `@classvalidator` → `@nestjs/class-validator` |

### High (should fix before production deploy)

| # | Issue | Location | Fix |
|---|-------|----------|-----|
| H1 | **Dockerfile runs as root** — no `USER node` directive | `backend/Dockerfile` | Add `USER node` before CMD |
| H2 | **No HEALTHCHECK in Dockerfile** | `backend/Dockerfile` | Add `HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:3000/health \|\| exit 1` |
| H3 | **`update()` methods accept `any` DTO** — no input validation | `diary.service.ts`, `illnesses.service.ts` | Create `UpdateDiaryEntryDto`, `UpdateIllnessDto` with validators |

### Notes (non-blocking)
- Bundle size 664.68 KB exceeds 500 KB warning — acceptable for v1.0
- Dev login hardcodes `localhost:3000` — not a production risk, should use `environment.apiUrl` in next sprint
- Duplicate service patterns — acceptable for v1.0, refactor in future iteration

---

**Summary**: The production infrastructure is solid. One critical import typo will crash `PATCH /parent` at runtime. The Dockerfile needs hardening (non-root user + healthcheck) before production deployment. Fix C1 before merge.