# REVIEW_RESULTS_SPRINT1.md — Security + Performance Audit

**Sprint:** 1  
**Date:** 2026-04-22  
**Reviewer:** kiddok-reviewer  
**Commit reviewed:** `10acb86`  
**Files reviewed:**
- `backend/src/children/children.controller.ts`
- `backend/src/children/children.service.ts`
- `backend/src/children/dto/create-child.dto.ts`
- `src/app/components/shell.component.ts`

---

## 1. Failing Test — Fix Applied

### ❌ Issue 5: ValidationPipe Missing on PATCH Handler

**Problem:** `@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))` was only on the `POST /children` endpoint. The `PATCH /children/:id` handler had no pipe, so `UpdateChildDto` class-validator decorators were never enforced at runtime. Malformed or malicious PATCH payloads would bypass all validation.

**Fix applied:**
```typescript
@Patch(':id')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))  // ← ADDED
async update(@Request() req, @Param('id') id: string, @Body() updateChildDto: UpdateChildDto) {
```

**Status:** ✅ Fixed — ValidationPipe now active on PATCH

---

## 2. Additional Security + Performance Issues Found

### 🔴 HIGH — `data: any` in Service Layer Bypasses Type Safety

**File:** `children.service.ts` — `create()`, `update()`

Both methods accept `data: any`, completely bypassing the DTO type system. Even with `ValidationPipe` on the controller, the service layer could receive arbitrary extra fields that pass `whitelist: true` but still cause runtime issues (e.g., unknown Prisma fields).

**Risk:** Medium — Prisma only writes known fields, but extra fields in the raw payload are silently ignored. If Prisma schema changes, mis-typed data could slip through.

**Recommendation:** Type the service methods as `CreateChildDto` and `UpdateChildDto` instead of `any`. This ensures compile-time alignment with the controller's validated DTOs.

---

### 🟡 MEDIUM — No Rate Limiting on Any Endpoint

**File:** `children.controller.ts`

No `@UseGuards(RateLimiterGuard)` or equivalent anywhere in the controller. Endpoints are auth-protected with JWT, but a compromised or abusive user could still hammer the API.

**Risk:** Low in MVP — JWT auth limits abuse surface. Elevate to HIGH if this becomes a multi-tenant or public-facing API.

---

### 🟡 MEDIUM — `findOneById()` Exposes Non-Ownership Data in Error Timing

**File:** `children.service.ts`

`findOneById(id: string)` (no `userId`) is used in the controller's IDOR check. It returns `null` for a missing record vs. a record belonging to another user — the same `null`. This is actually secure (both throw 404/403), but the identical response timing for "record not found" vs. "not your record" is good for security, not a flaw.

**No action needed.**

---

### 🟡 MEDIUM — `name` Field Has No Server-Side Length Cap

**File:** `create-child.dto.ts` — `CreateChildDto.name`

`@IsString()` / `@IsNotEmpty()` are present but there is no `@MaxLength()`. A user could submit a `name` of 10,000 characters, which would store and display fine in Postgres but could cause UI layout issues.

**Risk:** Low — UI renders fine, but worth adding `@MaxLength(100)` for belt-and-suspenders.

---

### 🟢 LOW — No Pagination on `findAllByUser()`

**File:** `children.service.ts`

`findAllByUser()` returns all children for a user with no limit. In a real-world app with many children, this could be a performance issue.

**Risk:** Very low for MVP (parents typically have 1–5 children). Add `take: 100` guard to be safe.

---

### 🟢 LOW — FileReader Memory Not Released in Document Upload

**File:** `shell.component.ts` — `onDocumentSelected()`, `onNewChildDocumentSelected()`

`FileReader.readAsDataURL()` loads the file entirely into memory as a base64 string. Large PDFs (close to 5MB) could cause memory pressure on low-end mobile devices.

**Risk:** Low — 5MB cap limits this, and `readAsDataURL` result is stored in a signal (Angular reactivity). The old result is GC-eligible once replaced. No explicit cleanup, but not a leak under normal usage.

**Note:** This is inherent to the base64-over-JSON approach. Acceptable for MVP.

---

### 🟢 LOW — `documentIssueDate` Not Validated on PATCH Update

**File:** `children.service.ts` — `update()`

The `create()` method validates `documentIssueDate` with `isNaN(parsed.getTime())` before writing. The `update()` method does **not** repeat this check for `documentIssueDate` — it only checks `dateOfBirth`. If a user sends a malformed `documentIssueDate` via PATCH, it writes directly to Prisma without validation.

**Fix recommended:** Mirror the `documentIssueDate` validation from `create()` into `update()`:
```typescript
if (data.documentIssueDate) {
  const parsed = new Date(data.documentIssueDate);
  if (isNaN(parsed.getTime())) {
    throw new BadRequestException('...');
  }
  data.documentIssueDate = parsed;
}
```

---

## 3. Issues Verified as Clean

| Item | Verdict |
|------|---------|
| IDOR protection | ✅ Controller-level `userId` check before any service call |
| DTO whitelist | ✅ `whitelist: true` strips unknown fields |
| Base64 size check | ✅ 5MB limit enforced in both `create()` and `update()` |
| Double-submit guard | ✅ `saving` signal + `[disabled]` binding on save button |
| `documentDirty` flag | ✅ `medicalDocument` only sent on new file selection |
| Inline delete confirm | ✅ No `window.confirm()` call |
| Signal cleanup | ✅ `ngOnDestroy` removes `kiddok:navigate` listener |
| `onBloodTypeChange()` dead code | ⚠️ Dead code present (`onBloodTypeChange()` with empty body); doesn't break anything but should be removed |

---

## 4. Risk Assessment

| Issue | Severity | Effort to Fix |
|-------|----------|---------------|
| ValidationPipe on PATCH | **HIGH** (was failing) | ✅ Fixed |
| `data: any` in service | MEDIUM | ~15 min |
| `documentIssueDate` not validated on update | MEDIUM | ~10 min |
| Rate limiting | MEDIUM | ~30 min |
| `name` no `@MaxLength` | LOW | ~5 min |
| No pagination on `findAll` | LOW | ~5 min |
| `onBloodTypeChange()` dead code | LOW | ~2 min |

**Overall sprint quality: GOOD.** The one failing test was a real validation gap. The additional issues found are medium/low priority. The core security model (IDOR, auth, DTO whitelist) is solid.

---

## 5. Recommendation

**Merge condition:** All HIGH issues resolved. The ValidationPipe fix resolves the failing test. Other issues can be tracked as tech debt for the next sprint.

**Priority follow-ups:**
1. Type `create()` / `update()` service params as DTOs (not `any`)
2. Add `documentIssueDate` validation to `update()`
3. Add `@UseRateLimiter()` guard to controller (when rate-limit skill is available)
