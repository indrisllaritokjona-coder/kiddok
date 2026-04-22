# REVIEW_RESULTS_SPRINT17 — Backend Service Unit Tests

**Date:** 2026-04-23
**Sprint:** 17 — Backend Unit Tests
**Reviewer:** kiddok-reviewer (security + performance audit)
**Status:** ✅ APPROVED — with minor findings

---

## Summary

| Area | Verdict |
|------|---------|
| Test architecture | ✅ Solid |
| Mock strategy | ✅ Correct — no live DB required |
| IDOR protection in tests | ✅ Verified |
| Security posture | ✅ No critical issues |
| Performance | ✅ No concerns in test code |

---

## Security Findings

### 1. Authorization layering — VaccinesService ✅

The `findOne` test mocks `prisma.vaccine.findUnique` directly, skipping the `findOne`-based ownership check used in `create` and `findAllByChild`. However, the service's own `findOne` implements authorization inline (`record.child.userId !== userId`), so this approach is valid. IDOR protection is properly tested:

- ✅ Vaccine not found → `NotFoundException`
- ✅ User doesn't own child's vaccine → `NotFoundException`

No bypasses detected.

### 2. AuthService password timing — acceptable ⚠️

`validateUser` performs `usersService.findByEmail` (async DB lookup) before `bcrypt.compare`. This means "user not found" responses are faster than "wrong password" responses. Given bcrypt's intentional slowness (10+ rounds), this is not practically exploitable, but a strict timing-attack mitigation would check email format validity before DB lookup. **Low risk, not a blocker.**

### 3. No `devLogin` test coverage

Noted in test results as pending. `devLogin` creates real users as a side effect — worth a dedicated test or helper to avoid DB dependency leakage.

---

## Mock Adequacy Findings

### 3. `mockChildrenService.findOne` returns incomplete object ⚠️

In both `VaccinesService` create and `findAllByChild` tests, the mock returns only `{ id: childId }`:

```ts
mockChildrenService.findOne.mockResolvedValue({ id: childId });
```

The real `ChildrenService.findOne` includes `{ healthRecords: true, vaccines: true }` in its `include` clause. The mocks only satisfy the `id` check (for authorization), so no bug is present — but if future tests access those relations from the returned object, tests will silently pass with `undefined`. Flag for awareness.

### 4. No test for `hasAccess` method

`ChildrenService.hasAccess(id, userId)` is implemented but untested. It performs a separate `findFirst` with `familyMembers` include. If this method is called by other services for authorization decisions, it should have coverage.

---

## Missing Coverage (Non-Blocking)

| Method | Tested | Notes |
|--------|--------|-------|
| `ChildrenService.update` | ❌ | Has document size validation + IDOR check |
| `ChildrenService.remove` | ❌ | Has IDOR check |
| `VaccinesService.update` | ❌ | Has authorization + DTO passthrough |
| `VaccinesService.remove` | ❌ | Has authorization + cascade |
| `AuthService.devLogin` | ❌ | Side-effect heavy — needs test helper |
| `ChildrenService.hasAccess` | ❌ | Authorization utility |

These are non-blocking for sprint 17 but should be addressed before production.

---

## Test Quality Assessment

**Strengths:**
- Jest `clearAllMocks()` called in `beforeEach` across all suites — correct isolation
- AuthService uses real `bcrypt.hash` + known password — avoids brittle mock
- JWT `sign` mocked at service level, not interceptor level — correct abstraction boundary
- `children.service.spec.ts` tests both happy path AND error paths (5MB limit, invalid date)

**Structural correctness:**
- `app.controller.spec.ts` exists (1 test) — verified present
- All 4 suites confirmed on disk at `backend/src/`

---

## Verdict

**✅ APPROVED**

Sprint 17 tests are well-structured, correctly isolated, and test meaningful authorization boundaries. The 18 passing tests cover the critical paths for `create`, `findAll`, and `findOne` across 3 services. No security vulnerabilities or performance concerns introduced by the test code itself.

**Recommended follow-up (next sprint):**
1. Add tests for `update`/`remove` on ChildrenService and VaccinesService
2. Add `devLogin` test with test helper for user creation
3. Expand `mockChildrenService.findOne` to include full object shape if relation access is needed
4. Consider timing-attack mitigation in AuthService (low priority)

---

**Reviewed at:** 2026-04-23 01:43 GMT+2
**Reviewer:** kiddok-reviewer