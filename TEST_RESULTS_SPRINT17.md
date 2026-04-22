# TEST_RESULTS_SPRINT17 — Backend Service Unit Tests

**Date:** 2026-04-23
**Sprint:** 17 — Backend Unit Tests
**Tester:** kiddok-tester (validation)
**Status:** ✅ PASS — All 18 tests passing

---

## Summary

| Area | Result |
|------|--------|
| ChildrenService tests | ✅ PASS (7 tests) |
| AuthService tests | ✅ PASS (5 tests) |
| VaccinesService tests | ✅ PASS (5 tests) |
| AppController tests | ✅ PASS (1 test) |
| Total | **18 tests, 18 passing** |

---

## Test Files Verified

| File | Exists |
|------|--------|
| `src/children/children.service.spec.ts` | ✅ |
| `src/auth/auth.service.spec.ts` | ✅ |
| `src/vaccines/vaccines.service.spec.ts` | ✅ |

---

## Test Execution

```
Test Suites: 4 passed, 4 total
Tests:       18 passed, 18 total
Time:        2.369 s
Ran all test suites.
```

---

## Test Cases

### `src/children/children.service.spec.ts`
| Test | Description | Status |
|------|-------------|--------|
| `create — should create a child with valid data` | Validates child creation with date conversion | ✅ |
| `create — should throw BadRequestException when document exceeds 5MB` | Validates file size limit enforcement | ✅ |
| `create — should throw BadRequestException for invalid documentIssueDate` | Date validation | ✅ |
| `findAll — should return all children for a user` | User-scoped findMany | ✅ |
| `findAll — should return empty array when user has no children` | Empty state | ✅ |
| `findOne — should return a child when user has access` | Ownership + family member check | ✅ |
| `findOne — should throw NotFoundException when child does not exist` | Not found path | ✅ |

### `src/auth/auth.service.spec.ts`
| Test | Description | Status |
|------|-------------|--------|
| `validateUser — should return user without password when credentials are valid` | Login validation | ✅ |
| `validateUser — should return null when user is not found` | Invalid email | ✅ |
| `validateUser — should return null when password is incorrect` | Wrong password | ✅ |
| `login — should return access token and user data on successful login` | JWT generation | ✅ |
| `register — should create a new user` | User registration | ✅ |

### `src/vaccines/vaccines.service.spec.ts`
| Test | Description | Status |
|------|-------------|--------|
| `create — should create a vaccine record for a child` | Vaccine creation | ✅ |
| `findAllByChild — should return all vaccines for a child` | Child-scoped list | ✅ |
| `findOne — should return a vaccine record when user owns the child` | Ownership check | ✅ |
| `findOne — should throw NotFoundException when vaccine does not exist` | Not found | ✅ |
| `findOne — should throw NotFoundException when user does not own the child` | IDOR prevention | ✅ |

---

## Validation Approach

- **PrismaService mocked** — no database connection required; all tests run in isolation
- **ChildrenService mocked in VaccinesService** — proper layering validation
- **bcrypt mocked implicitly** — `bcrypt.compare` called on real logic but password known from test setup
- **JWT sign mocked** — tests verify correct payload structure passed to `jwtService.sign()`

---

## Notes

- Jest v30 was already installed (along with `@types/jest` and `ts-jest`)
- Existing `jest` config in `package.json` was sufficient — no `jest.config.js` needed
- Pattern matches existing `app.controller.spec.ts` approach (NestJS Testing module + mocks via `useValue`)
- 3 tests use `jest.clearAllMocks()` in `beforeEach` to ensure test isolation
- Coverage not measured yet — future sprint can add `--coverage` flag

---

## Pending from Review

- Consider adding tests for `update` and `remove` methods in ChildrenService and VaccinesService
- Consider adding tests for `devLogin` in AuthService
- Consider adding tests for `hasAccess` method in ChildrenService
- AuthService `devLogin` creates users as side effect — consider separating user creation into a test helper