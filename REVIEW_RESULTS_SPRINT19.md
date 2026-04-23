# REVIEW RESULTS — Sprint 19: PDF Export + Backup Import

**Date:** 2026-04-23
**Reviewer:** kiddok-reviewer
**Commit:** `feat: export health data as PDF + import from backup` (5429f1f)

---

## Overview

Sprint 19 adds two features: a PDF health report export (`GET /export/:childId/pdf`) and a JSON backup importer (`POST /import/child`). The implementation is structurally sound with good auth coverage, proper DTO validation, and clean separation of concerns. A few issues require attention before production.

---

## Security Audit

### ✅ Auth Guard Applied Correctly
Both `ExportController` and `ImportController` use `@UseGuards(AuthGuard('jwt'))`. JWT authentication is enforced on all endpoints.

### ✅ Authorization in Export Service
`fetchChildHealthData` checks `userId` via direct ownership and `familyMembers` OR — access control is correctly implemented.

### ⚠️ CSV Injection Potential in Export Controller
`csvEscape` is defined but **not applied to header section values** in the CSV export:

```ts
// export.controller.ts lines ~52-57
lines.push('Child Health Data Export');
lines.push(`Child,${csvEscape(child.name)}`);         // ✅ escaped
lines.push(`Date of Birth,${csvEscape(child.dateOfBirth)}`); // ✅ escaped
// ...but all header fields above use csvEscape in the actual code - verified safe
```

After re-reading the controller, header fields DO use `csvEscape`. **No CSV injection confirmed.**

### ✅ SQL Injection — Protected by Prisma
All DB operations use Prisma's parameterized queries. No raw SQL concatenation found.

### ✅ Mass Assignment — ImportService
`ImportService.importBackup` explicitly maps only known fields from `ImportBackupDto` to `prisma.child.create` data. No extraneous fields from the backup can leak into DB columns.

### ✅ DTO Validation — class-validator
`ImportBackupDto` uses `@IsString()`, `@IsDateString()`, `@IsNumber()`, `@IsBoolean()` on all fields. The `ValidationPipe` with `whitelist: true` strips unknown properties. Backup structure validated manually in `validateBackupStructure()` as a secondary check.

---

## Performance Audit

### ⚠️ N+1 Query Risk in PDF Generation — LOW
`fetchChildHealthData` uses `Promise.all` for all 9 entity queries — this is correct and avoids N+1.

### ✅ createMany Used for Bulk Inserts — Correct
Import service uses `prisma.<model>.createMany` for all entity types. This is the right approach for bulk inserts.

### ⚠️ Prisma createMany Limitation — Potential Data Loss
`createMany` in Prisma does NOT support nested create/connect operations. If any imported record has relations beyond the `childId` foreign key, those records silently fail to insert.

Current assessment: Appointment and LabResult models have no relations beyond `childId`, so this is fine for Sprint 19. **Flag for future awareness.**

### ⚠️ PDF Table Memory — Event Handlers Not Removed
`PDFDocument` event handlers (`data`, `end`, `error`) are attached but never removed after resolution. For single-request PDFs this is fine (GC will collect), but it could cause issues under high concurrency.

**Fix:** Use `doc.on('end', ...)` inside the Promise scope and let it GC naturally — this is already the case. No change needed for single-shot use.

### ✅ No Expensive Operations in Loops
All table row processing uses synchronous array mapping — O(n) without blocking the event loop.

---

## Code Quality

### 🐛 Dead Code — `NotFoundException`, `ForbiddenException` imported but not used
In `export.controller.ts`:

```ts
import { Controller, Get, Param, Res, UseGuards, Request, NotFoundException, ForbiddenException } from '@nestjs/common';
```

`NotFoundException` and `ForbiddenException` are imported but never thrown (auth errors come from the service layer). Minor — clean up unused imports.

### 🐛 Unused `csvEscape` in PDF Context
`csvEscape` function is defined in `export.controller.ts` but is only used in the CSV export path (`exportCsv`), not in the PDF path. No issue — it's correctly scoped.

### 🐛 Export Controller Has No `@Get(':childId/pdf')` Path Ordering Issue
NestJS matches routes in registration order. Both `':childId/pdf'` and `':childId/csv'` are on the same controller. Since they have distinct suffixes (`.pdf` vs `.csv`), NestJS will match them correctly. **No action needed.**

### ⚠️ PDF Table — Page Break Header Redraw
In `table()` method, when a new page is added mid-table, the header row is re-drawn. However the `doc.y` position after `doc.addPage()` may not account for the top margin. The header re-draw uses `doc.y + 5` which may render outside the margin area.

**Risk:** Low — pdfkit handles y-position after `addPage()` by starting at top margin. Verified.

### ⚠️ GrowthEntry — height/weight Tolerance
`BackupGrowthEntryDto` marks `height` and `weight` as `@IsNumber() @IsOptional()`. A height of `0` would fail validation since `IsNumber()` rejects zero values in some configurations. Use `@IsNumber({}, { message: ... })` or `@Min(0)` to explicitly allow zero.

**Impact:** Low — growth entries with 0 height/weight are rare.

---

## Data Integrity

### ⚠️ Prisma `unique` Constraint Missing on Appointment
`Appointment` model has no unique constraint. If the same appointment is imported twice (duplicate import), it will create two rows. Consider a unique constraint on `(childId, title, dateTime)` or adding a dedup strategy.

**Impact:** Medium — duplicate imports will stack records.

### ✅ All Required Fields Have Defaults
`Child`, `Appointment`, `LabResult` models all have required fields with proper types. No nullable-required-field mismatches.

### ✅ Date Consistency
All dates stored as `DateTime` in Prisma, parsed via `new Date()` before insert. Invalid date strings handled in `validateBackupStructure()`.

---

## Compliance / Validation Gaps

### ✅ ValidationPipe Configured Correctly
```ts
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
```
- `whitelist: true` strips unknown fields
- `transform: true` coerces types

### ✅ No Hardcoded Credentials
No secrets, keys, or credentials found in the sprint's files.

---

## Summary

| Category | Finding Count | Critical |
|----------|--------------|----------|
| Security | 0 | — |
| Performance | 2 low | — |
| Code Quality | 2 minor | — |
| Data Integrity | 1 medium | — |

### Issues to Address Before Production

1. **[MEDIUM] Duplicate Import Risk** — `Appointment` model has no unique constraint. Duplicate backup imports will stack identical appointments. Add a unique index on `(childId, title, dateTime)` or implement dedup logic in `ImportService`.

2. **[LOW] Zero Value Rejection in Growth DTO** — `@IsNumber()` may reject `height: 0` or `weight: 0`. Add `@Min(0)` to explicitly allow zero as a valid measurement.

3. **[MINOR] Unused Imports** — `NotFoundException` and `ForbiddenException` imported but unused in `export.controller.ts`. Clean up dead imports.

### Files Reviewed

| File | Status |
|------|--------|
| `src/export/export.service.ts` | ✅ Clean |
| `src/export/export.controller.ts` | ✅ Minor (unused imports) |
| `src/import/import.service.ts` | ✅ Clean |
| `src/import/import.controller.ts` | ✅ Clean |
| `src/import/import.dto.ts` | ✅ Minor (zero-value edge case) |
| `prisma/schema.prisma` | ✅ Clean |
| `src/app.module.ts` | ✅ Clean |

**Recommendation: APPROVED with caveats** — Sprint 19 is ready to merge once the duplicate import concern is addressed or consciously accepted as a known limitation.