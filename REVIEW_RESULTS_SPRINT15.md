# REVIEW_RESULTS_SPRINT15.md — Security + Performance Audit

**Sprint 15:** Appointments + LabResults modules
**Commit:** a8eae05 `feat: appointments + lab results modules`
**Reviewer:** kiddok-reviewer
**Date:** 2026-04-23

---

## Audit Summary: ⚠️ APPROVED WITH NOTES

Code is production-viable. Authorization model is sound. Two items flagged for follow-up — neither is a deployment blocker.

---

## 1. Security Audit — ✅ PASS

### Authorization Model
Both modules use the same pattern — correct and consistent:

| Check | Appointments | LabResults |
|-------|-------------|------------|
| JWT auth on all routes | ✅ `@UseGuards(AuthGuard('jwt'))` | ✅ same |
| `childrenService.findOne()` before create | ✅ `create()` calls it first | ✅ same |
| `findOne()` verifies `record.child.userId !== userId` | ✅ explicit ownership check | ✅ same |
| `update()` / `remove()` call `findOne()` before mutating | ✅ `await this.findOne()` guards both | ✅ same |
| `findAllByChild()` verifies child belongs to user | ✅ `childrenService.findOne()` | ✅ same |

### Input Validation
- DTOs use `class-validator` decorators — correct
- `CreateAppointmentDto.title` has `@IsString() @IsNotEmpty()` — ✅
- `CreateLabResultDto` fields properly validated — ✅
- Both update DTOs use `!== undefined` spread pattern — ✅ safe partial updates

### No SQL Injection / Mass Assignment Risk
Prisma ORM used throughout. Fields explicitly listed in `create()` and `update()`. No raw queries.

---

## 2. Bug: `UpdateAppointmentDto.dateTime` — Missing `@IsOptional()`

```typescript
// appointment.dto.ts
export class UpdateAppointmentDto {
  @IsDateString()
  @IsOptional()       // ← ✅ present — correct
  dateTime?: string;
```

```typescript
// lab-result.dto.ts — same pattern
@IsDateString()
@IsOptional()         // ← ✅ present — correct
date?: string;
```

**Finding:** Both DTOs are actually correct. No bug here. ✅

*(Prior AGENTS.md noted "silent save failure" for Temperature Diary — not relevant to this sprint.)*

---

## 3. Minor: `ngOnDestroy` Empty in Both Components

Both components declare `OnDestroy` but leave the handler empty:

```typescript
ngOnDestroy() {
  // cleanup if needed
}
```

**Verdict:** No subscriptions, intervals, or event listeners found in either component. Safe to leave as-is. Not a bug.

**Recommendation:** If HttpClient subscriptions or `setInterval` are added later, ensure they're cleaned up. Track as a note for future work.

---

## 4. Minor: Inconsistent Delete Method Naming

```typescript
// appointments.service.ts
async remove(userId: string, id: string) { ... }   // ✅ uses remove()

// lab-results.service.ts
async remove(userId: string, id: string) { ... }   // ✅ uses remove()
```

Both services use `remove()` — naming is consistent. ✅

---

## 5. Frontend Observations

### Shell routing — ✅ Correct
- Both components imported and routed via `@case ('appointments')` / `@case ('lab-results')` control flow syntax

### Sidebar nav entries — ✅ Present
- `{ id: 'appointments', icon: 'calendar-check' }` — ✅
- `{ id: 'lab-results', icon: 'flask-conical' }` — ✅

### Lab Results: No Edit Flow
Lab results component has **view modal** but no **edit modal**. Only Add + Delete are available.

| Feature | Appointments | LabResults |
|---------|-------------|------------|
| Create | ✅ modal | ✅ modal |
| Read list | ✅ | ✅ |
| View detail | ✅ inline | ✅ view modal |
| Update | ✅ edit modal + PATCH | ❌ missing |
| Delete | ✅ confirm modal | ✅ confirm modal |

**Note:** This may be intentional design (lab results are typically append-only). If edit is needed, it should be planned.

---

## 6. Performance — ✅ CLEAN

- No N+1 queries detected
- `findMany` uses indexed `childId` field
- No blocking loops or expensive computations
- Build output clean (only pre-existing budget warnings)

---

## Pending Fixes (carried from prior sprints)

From **AGENTS.md "Pending Fixes"**:
1. **Temperature Diary**: Chart effect memory leak, silent save failure
2. **Growth Tracking**: OnDestroy missing, no typed DTO, effect flicker

These remain unaddressed. Not introduced by Sprint 15.

---

## Verdict

**APPROVED FOR MERGE.** Sprint 15 modules are authorization-correct, build-clean, and structurally sound. No security or performance blockers.

One non-blocking note: Lab results edit flow is missing — confirm with product owner if needed.

---

*Reviewer: kiddok-reviewer | Commit: a8eae05 | Date: 2026-04-23*
