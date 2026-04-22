# REVIEW_RESULTS_SPRINT16.md — Doctor Sharing + Multi-Parent Support

**Sprint:** 16
**Module:** Doctor Sharing + Multi-Parent Support
**Reviewer:** kiddok-reviewer
**Date:** 2026-04-23
**Commit:** ed22e60 (feat: doctor sharing + multi-parent support)
**Status:** ⚠️ APPROVED WITH NOTES — 2 issues to track

---

## Security Audit

### ✅ IDOR Protection — Primary Endpoints
- `createShareLink`: Checks `isOwner || isFamilyMember` ✅
- `revokeShareLink`: Only link creator can revoke ✅
- `addFamilyMember`: Owner-only ✅
- `removeFamilyMember`: Owner-only ✅
- `listFamilyMembers`: Owner OR family member ✅
- ChildrenService controller (`GET /:id`, `PATCH /:id`, `DELETE /:id`) uses `hasAccess()` ✅

### ⚠️ IDOR Gap — `listShareLinks`

**File:** `backend/src/share/share.service.ts` — `listShareLinks()`

```typescript
if (child.userId !== userId) {
  throw new ForbiddenException('You do not have access to this child profile.');
}
```

**Issue:** This check only verifies ownership (`child.userId !== userId`). It does NOT include the family member check like `createShareLink` does. So a family member who can legitimately create a share link will get a `403` when trying to list them — inconsistent and likely unintended.

**Fix:** Use `hasAccess()` from ChildrenService, or inline the family member check:
```typescript
const isOwner = child.userId === userId;
const isFamilyMember = child.familyMembers?.some(fm => fm.userId === userId) ?? false;
if (!isOwner && !isFamilyMember) { ... }
```
Note: Also needs `include: { familyMembers: true }` in the findFirst query above.

---

### ⚠️ Permission Ambiguity — Family Members Can Create Share Links

**File:** `backend/src/share/share.service.ts` — `createShareLink()`

The service allows family members to create share links (owner OR family member). If this is intentional (e.g., a grandparent sharing with a doctor), it's fine. If only the primary owner should generate share links, the family member branch should be removed.

**Recommend:** Confirm with product owner whether family members should have link-creation privilege. Document the decision in a comment.

---

## Input Validation

### ⚠️ Manual Expiry Check in Controller

**File:** `backend/src/share/share.controller.ts`

```typescript
const expiresAt = new Date(dto.expiresAt);
if (expiresAt <= new Date()) {
  throw new Error('Expiry date must be in the future');
}
```

This manually throws a raw `Error`. It should use NestJS's `BadRequestException`:
```typescript
throw new BadRequestException('Expiry date must be in the future');
```

The raw `Error` may not be caught by NestJS's exception layer properly and could leak stack traces.

---

### ✅ DTO Validation — AddFamilyMemberDto

```typescript
@IsIn(['parent', 'grandparent', 'nanny', 'doctor'])
role: string;
```
Correctly constrains role to a fixed set. Good.

---

## Data Exposure

### ⚠️ Public Share View Returns Full Child Profile

**File:** `backend/src/share/share.service.ts` — `getSharedChild()`

Returns `temperatureEntries` (30 records), `growthEntries` (10 records), and all `vaccines`. While intended as a shared profile view, this is a read-only endpoint for unauthenticated users. Consider:
- Returning only non-sensitive summary fields in the public view
- Filtering fields explicitly (use `select: {...}`) rather than returning entire relations

For doctor-sharing use case this may be intentional, but worth confirming the data minimization is appropriate.

---

## Architecture

### ✅ Prisma Schema
- `ShareLink` with `@@index` on `token` for fast lookups ✅
- `FamilyMember` with `@@unique([userId, childId])` prevents duplicate entries ✅
- `onDelete: Cascade` on all relations ✅

### ✅ Separate `findOneById()` for Controller IDOR Check
Correct separation of concerns — this is a clean pattern.

---

## Performance

### ✅ No N+1 Issues Detected
- `listFamilyMembers` uses `include: { user: { select: {...} } }` — single query ✅
- `createShareLink` uses single `findFirst` with `familyMembers` included ✅
- `findOne` uses `OR` in Prisma query — single query ✅

---

## Pending Fixes (for backlog)

| Priority | Issue | Location |
|----------|-------|----------|
| **High** | `listShareLinks` IDOR: family member check missing | `share.service.ts:listShareLinks()` |
| **Medium** | Raw `Error` in controller should be `BadRequestException` | `share.controller.ts:create()` |
| **Low** | Confirm whether family members can create share links | Product decision |
| **Low** | Consider field filtering on public share view | `share.service.ts:getSharedChild()` |

---

## Verdict

**APPROVED** — sprint delivers intended functionality with solid IDOR protection overall. The `listShareLinks` gap is a real bug worth fixing before the share-link feature is used in production. The controller error-throwing style is a minor hygiene issue. No security-critical vulnerabilities found.
