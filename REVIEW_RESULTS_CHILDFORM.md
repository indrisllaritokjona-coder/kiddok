# Code Review — Add/Edit Child Modal Sprint 7

## Security

### XSS — PASS
- **File upload**: MIME type validated via regex `pdf|image/(png|jpeg|webp)`. FileReader reads as base64 data URL. `accept` attribute restricts input to PDFs and images. No injection vector.
- **Name field**: Displayed via Angular `{{ }}` binding which auto-escapes HTML. Regex validation `/^[a-zA-Z\s]+$/` further constrains input at validation layer. Safe.
- **No sensitive data in console**: No PII, tokens, or secrets logged. Error messages use i18n keys only.
- **Modal backdrop click**: `onBackdropClick()` emits `cancelled` event — standard dismiss pattern, no direct DOM manipulation.

### Verdict: No security issues found.

---

## Performance

### Signal Usage — PASS
- `currentStep`, `isMedicalExpanded`, `isSaving`, `saveError`, `fileError`, `errors`, `uploadedFiles` are all Angular signals — correct reactive primitive for form state.
- `uploadedFiles` signal array updates via `spread + push` in FileReader callback — O(n) per file, bounded at 3 files max. Acceptable.

### File Base64 Encoding — PASS
- `reader.readAsDataURL(file)` is called per-file in a synchronous loop. At max 3 files × 5MB each = 15MB base64 strings held in memory — bounded by the 3-file cap. No unbounded growth.
- After `processFiles()`, `input.value = ''` is reset to allow re-selecting same file — prevents FileReader re-use issues. Good.

### Memory Leaks — MINOR CONCERN
- **`buildGenderOptions()` called in `ngOnChanges`**: Every time `child` input changes, this rebuilds a static array from i18n. Should be moved to `ngOnInit` or memoized — not a leak but wasteful on re-renders.
- **No `OnDestroy` hook**: If the modal is opened/closed repeatedly, there's no cleanup for signal subscriptions or FileReader references. For a modal with bounded lifetime this is low-risk, but worth adding `implements OnDestroy` with a no-op destroyer for future-proofing.
- **FileReader instances**: Not stored or cancelled — acceptable since FileReader is short-lived per file operation.

### Verdict: No blocking perf issues. One low-priority cleanup recommendation (memoize gender options / add OnDestroy).

---

## Clean Code

### Duplicate Validation Logic — MINOR CONCERN
- Name validation regex `/^[a-zA-Z\s]+$/` appears in **two places**: `validateNameOnBlur()` and `validateStep1()`. Both must stay in sync. Consider extracting to a private helper: `private isValidName(name: string): boolean`.
- DOB future-date check only in `validateStep1()`, not in `validateNameOnBlur()`. Intentional (blur doesn't need DOB), but worth a comment.

### Unused Imports — PASS
- `OnInit` imported but never implemented (component uses `OnChanges` only). `SimpleChanges` is used. No other unused imports detected.
- Dead code: `onBloodTypeChange()` in `shell.component.ts` is a no-op stub — confirmed not called anywhere (replaced by reactive `editBloodType.set()` in template). Low priority but should be removed before production.

### TypeScript Strictness — PASS
- No `any` in the modal component itself. `formData: ChildFormData` is a typed interface.
- `ChildFormData` uses discriminated union for `gender` field: `'male' | 'female' | 'other' | ''` — properly typed.
- `payload: any` in `save()` method is the only `any` — used to assemble a payload that matches the API shape. Acceptable with a TODO comment to type it properly against the API DTO.
- No strict-template errors; build passes after pre-fixed `cancelled.emit()` rename.

### i18n Gap — MINOR
- Gender label: `{{ i18n.locale() === 'sq' ? 'Gjinia' : 'Gender' }}` — hardcoded inline string. Should use a dedicated i18n key (e.g., `childForm.gender.label`). Not blocking but inconsistent with the i18n architecture.

---

## Verdict

**CONDITIONAL APPROVE**

The module is production-ready from a security and performance standpoint. Build passes. The following are non-blocking but should be tracked for cleanup:

1. **[LOW] `buildGenderOptions()` called in `ngOnChanges`**: Move to `ngOnInit` or cache the result since it's static per locale.
2. **[LOW] Add `OnDestroy` hook**: Even a no-op `ngOnDestroy() {}` prevents future memory leak surprises.
3. **[LOW] Dead `onBloodTypeChange()` stub** in `shell.component.ts`: Remove.
4. **[MINOR] Inline gender label hardcoded string**: Extract to i18n key `childForm.gender.label` for consistency.
5. **[MINOR] `payload: any` in `save()`**: Consider typing against an API DTO interface.

None of these block merge. The sprint delivers a working 3-step wizard with proper signal-based state, safe file handling, and clean validation. Proceed to merge.
