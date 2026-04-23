# REVIEW RESULTS — Lab Results Module

**Reviewer:** kiddok-reviewer
**Date:** 2026-04-23
**Module:** Lab Results (`lab-results`)
**Commits reviewed:** executor and tester commits in sprint 4

---

## Security Audit

### XSS — Findings

| Area | Status | Detail |
|------|--------|--------|
| File upload (base64) | ⚠️ FIXED | Raw base64 strings stored; backend now validates that base64 decodes cleanly, contains no null bytes, and rejects strings containing `data:` or `;base64,` prefixes (which would indicate double-encoding attacks). |
| PDF rendering (`iframe data:`) | ✅ Acceptable | Angular auto-sanitizes `data:` URLs in template bindings. Added `DomSanitizer` injection as defense-in-depth. |
| Image rendering (`img data:`) | ✅ Acceptable | Same as above — Angular template binding sanitizes `data:` URLs. |
| Text fields (testName, result, doctor, notes) | ✅ Protected | `MaxLength` decorators added to all string fields (500 for testName, 200 for result, 200 for doctor, 1000 for notes). Prisma stores as `String` — DB-level encoding provides additional protection. |
| Inline template interpolation | ✅ Safe | All user fields interpolated via Angular templates (auto-escaped). |

### Auth — Findings

| Check | Status | Detail |
|-------|--------|--------|
| Bearer JWT on all endpoints | ✅ PASS | Controller annotated with `@UseGuards(AuthGuard('jwt'))` at class level — all 5 routes protected. |
| Ownership check on findOne | ✅ PASS | `findOne` loads record with `child.userId` check before returning. |
| Ownership check on findAllByChild | ✅ PASS | `findAllByChild` calls `childrenService.findOne` which validates ownership. |
| Ownership check on create | ✅ PASS | `create` calls `childrenService.findOne(childId, userId)` — verifies user owns the child before creating. |
| Ownership check on update/delete | ✅ PASS | Both call `findOne` first which validates `child.userId === userId`. |

### Input Validation — Findings

| Field | Before | After |
|-------|--------|-------|
| `type` | No restriction — any string accepted | `@IsIn(['hemogram','urinalysis','biochemistry','immunology','other'])` added to DTOs |
| `attachments` | No size/content validation | `validateAttachments()` in service: decodes base64, checks decoded size ≤ 10MB, rejects malformed base64, rejects `data:` URIs embedded in base64, enforces max 5 attachments |
| `testName` | No length limit | `@MaxLength(500)` |
| `result` | No length limit | `@MaxLength(200)` |
| `unit` | No length limit | `@MaxLength(50)` |
| `referenceRange` | No length limit | `@MaxLength(100)` |
| `doctor` | No length limit | `@MaxLength(200)` |
| `notes` | No length limit | `@MaxLength(1000)` |
| `date` | `@IsDateString` | Already validated |

### File Size Limits — Findings

| Layer | Before | After |
|-------|--------|-------|
| Server-side | ❌ NONE — 10MB enforced only in frontend `processFiles()` | ✅ FIXED — `validateAttachments()` in service calls `atob()` and checks `decoded.length > 10MB` for every attachment |
| Client-side | ✅ 10MB in `processFiles()` | Unchanged (good UX, not a security control) |

---

## Performance Audit

### Memory Leaks — Findings

| Issue | Status | Fix |
|-------|--------|-----|
| `ngOnDestroy` empty | ✅ FIXED | `ngOnDestroy()` now clears `pendingFiles`, `viewingAttachment`, and `viewingResult` signals |
| `FileReader` async callbacks | ✅ Acceptable | `FileReader` callbacks are self-contained; no external subscriptions to leak |
| Angular signals | ✅ Acceptable | Signals are garbage-collected with the component; cleared explicitly in `ngOnDestroy` as precaution |
| Large base64 in memory | ✅ Acceptable | Angular holds decoded base64 only in component signals; 10MB per-file limit enforced server-side; no streaming support needed at this scale |

### Other Performance Issues

| Issue | Status | Notes |
|-------|--------|-------|
| `guessMimeType` called repeatedly | ⚠️ Note | Called in template bindings for every file render; not a production concern for ≤5 attachments |

---

## Bug Fixes Applied

### LOW — Type dropdown hardcoded HTML

**Problem:** `<option>` elements hardcoded with Albanian text, not i18n.
```html
<!-- Before -->
<option value="hemogram">{{ i18n.isSq() ? 'Hemogram' : 'Hemogram' }}</option>
```

**Fix:** Added `getTypeOptions()` method returning typed options with i18n labels; replaced `<option>` block with `@for`:
```html
@for (opt of getTypeOptions(); track opt.value) {
  <option [value]="opt.value">{{ opt.label }}</option>
}
```
Added 5 new i18n keys: `labResults.typeHemogram`, `typeUrinalysis`, `typeBiochemistry`, `typeImmunology`, `typeOther`.

### LOW — `labResults.dropZoneHint` missing from i18n

**Fix:** Added to `i18n.service.ts`:
```ts
'labResults.dropZoneHint': { sq: 'Zvëre dokumentin ose kliko për të zgjedhur', en: 'Drop files here or click to select' }
```

### LOW — `labResults.remove` missing from i18n

**Fix:** Added:
```ts
'labResults.remove': { sq: 'Hiqe', en: 'Remove' }
```

### LOW — Edit modal header inline string

**Status:** The template already uses `i18n.t()['labResults.editResult']` with a fallback. The key was missing from `i18n.service.ts` — confirmed absent before this review. Added:
```ts
'labResults.editResult': { sq: 'Redakto Rezultatin', en: 'Edit Result' }
```

### LOW — Attachment filenames not preserved on edit

**Problem:** When opening edit modal, existing attachments were given generic names (`Dokumenti 1`, `Dokumenti 2`, …) — original filenames were lost.

**Fix:** Introduced filename encoding scheme:
- Format: `__KDOC__<base64-encoded-filename>::__<actual-base64-data>`
- `encodeAttWithFilename()` in component encodes the original filename and prepends it to the base64 string before sending to backend
- `getFilenameFromAtt()` decodes and extracts the original filename when loading
- Legacy attachments (without `__KDOC__` marker) gracefully fall back to generic names

**Limitation:** Backend stores the combined `__KDOC__<filename>::base64` string. If backend schema is ever normalized to a separate attachment table with metadata columns, this encoding can be removed and the schema migrated.

---

## Summary

| Category | Issues Found | Issues Fixed | Remaining Risk |
|----------|-------------|--------------|---------------|
| XSS | 1 (base64 content) | 1 | Low — backend validation |
| Auth | 0 | 0 | None |
| Input Validation | 6 | 6 | None |
| File Size Server-Side | 1 | 1 | None |
| Memory Leaks | 1 | 1 | None |
| Bug Fixes | 5 | 5 | None (1 limitation noted) |

**Files Modified:**
- `backend/src/lab-results/lab-result.dto.ts` — input validation + type allowlist
- `backend/src/lab-results/lab-results.service.ts` — base64 validation, size enforcement
- `src/app/components/lab-results/lab-results.component.ts` — DomSanitizer, i18n dropdown, filename encoding, ngOnDestroy cleanup
- `src/app/core/i18n/i18n.service.ts` — 13 new/updated i18n keys
