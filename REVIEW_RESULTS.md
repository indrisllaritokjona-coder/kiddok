# Code Review — Child Profile Edit Module

---

## Security

| Issue | Severity | File | Line | Description |
|-------|----------|------|------|-------------|
| IDOR not enforced at controller layer | **HIGH** | backend/src/children/children.controller.ts | 31–35 | `PATCH /children/:id` and `DELETE /children/:id` call service methods that internally call `findOne(id, userId)` to check ownership. While the service does enforce ownership, the controller has no guard preventing a user from calling another user's child IDs — the check is implicit inside the service, not at the entry point. A bug in the service could bypass this silently. |
| DTO is raw `any` — no class-validator decorators | **HIGH** | backend/src/children/children.controller.ts | 14, 26 | `create()` and `update()` accept `@Body() createChildDto: any`. No `@IsString()`, `@IsNotEmpty()`, or `@IsOptional()` decorators. Malformed or missing required fields (name, dateOfBirth) reach Prisma with no validation. |
| No server-side file size limit | **HIGH** | backend/src/children/children.controller.ts | — | Client enforces 5MB in `onDocumentSelected()`. The backend has no enforcement. A malicious or buggy client can send arbitrarily large base64 payloads, exhausting server memory/bandwidth. |
| Medical document base64 not validated for magic bytes | **MEDIUM** | shell.component.ts / children.service.ts | — | `medicalDocument` (base64) is accepted client-side based only on MIME regex match (`file.type.match(/pdf|image\//)`). A file with a .pdf extension but malicious content would be accepted and forwarded to the backend. No server-side content-type validation exists either. |
| `avatarUrl` from API rendered without URL validation | **MEDIUM** | data.service.ts | 89, 126 | `avatarUrl: c.avatarUrl ?? ...` — if the API returns a `javascript:` or `data:` URL, Angular's sanitizer may not catch it in all binding contexts. While Angular does sanitize `src` bindings, defense-in-depth URL validation should be applied before rendering. |
| Full error object leaked to console | **MEDIUM** | shell.component.ts | 366, 388 | `console.error('[DataService] loadChildrenFromApi failed:', err)` and `console.error('Save failed')` — error objects can contain stack traces, token info, or internal paths that leak to browser devtools in production. |
| `medicalDocument` base64 included in every edit save | **LOW** | shell.component.ts | 349–352 | Even when the user does not change the document, the original base64 string is re-sent on every PATCH. This inflates request size and increases exposure surface for the base64 payload in transit and logs. |
| Dev login bypasses real auth | **INFO** | data.service.ts | 328–343 | `login()` accepts PIN `1234` and creates a token with no server verification in the fallback branch. While this is likely intentional for development, it should be gated behind a build flag or environment variable — never present in production builds. |

---

## Performance

| Issue | Severity | File | Line | Description |
|-------|----------|------|------|-------------|
| Large base64 payload re-sent on every child edit save | **HIGH** | shell.component.ts | 349 | `openEditModal()` pre-populates `editChildDocument` with the child's existing base64 document. If the user edits only the name, the unchanged document (potentially multiple MB) is included in every PATCH request. Solution: track a "dirty" flag for the document field only; send `medicalDocument` only when a new file was selected. |
| No debounce on search/filter inputs | **MEDIUM** | shell.component.ts | — | The name validation runs on every `input` event with no debounce. For the date formatter (`onDateInput`), this is fine. But if any future search/filter field is added without debounce, rapid typing will fire excessive API calls. |
| `CommonModule` imported instead of selective directives | **LOW** | shell.component.ts | 3 | `CommonModule` is imported even though only structural directives (`@if`, `@for`) and `ngClass`, `ngStyle`, `async` pipe are used. While Angular tree-shakes unused components, importing `CommonModule` adds unnecessary runtime overhead. Should import `NgClass`, `NgStyle`, `SlicePipe`, `AsyncPipe` directly. |
| No `ChangeDetectionStrategy.OnPush` on shell component | **LOW** | shell.component.ts | 1 | The component uses multiple signals and computed values but relies on Angular's default change detection. Adding `OnPush` would reduce unnecessary checks, especially in the sidebar navigation and child list rendering. |
| `include: { healthRecords, vaccines }` in `findOne` without pagination | **MEDIUM** | children.service.ts | 29–30 | `findOne` eagerly loads `healthRecords` and `vaccines` with no limit. If a child accumulates many records, this could return a very large payload every time a single child is accessed. |
| `login()` dev fallback token stored in localStorage | **LOW** | data.service.ts | 341 | `localStorage.setItem(this.AUTH_KEY, 'dev-token-' + Date.now())` — dev tokens stored in localStorage could persist and accidentally be used against a production API if the environment variable is misconfigured. |

---

## Clean Code

| Issue | Severity | File | Line | Description |
|-------|----------|------|------|-------------|
| `onBloodTypeChange()` is a no-op | **MEDIUM** | shell.component.ts | 310 | `onBloodTypeChange() { this.editBloodType.set(this.editBloodType()); }` — calling a signal getter inside its own setter has no effect. This method appears to be leftover scaffolding with no actual logic. |
| Duplicate name validation logic | **LOW** | shell.component.ts | 285–292 | `isValidName()` and `hasNameError()` both check `name.trim().length > 0 && !this.isValidName(name)`. The length/emptiness check is duplicated. `hasNameError` could be expressed simply as `!this.isValidName(name)`, since `isValidName` already requires non-empty. |
| `allergies` vs `criticalAllergies` — ambiguous dual fields | **MEDIUM** | data.service.ts, shell.component.ts | — | `ChildProfile` has both `allergies` and `criticalAllergies`. The API mapping maps both `c.allergies` and `c.criticalAllergies` but the UI only binds `criticalAllergies`. It's unclear whether `allergies` is a separate field or a legacy alias. This ambiguity risks data loss if the backend stores one and the frontend reads the other. |
| `onBloodTypeChange` wired in template but never called | **LOW** | shell.component.ts | 179 | The template binds `(ngModelChange)="onBloodTypeChange"` on the blood type select, but the method body is a no-op. The reactive update is handled by `editBloodType.set($event)` in the template already, so the handler is unnecessary. |
| No loading state on `saveEditChild()` | **MEDIUM** | shell.component.ts | 337 | After `saveEditChild()` is called, there is no loading spinner or disabled state on the Save button. Rapid double-clicks can result in multiple concurrent PATCH requests. Should add a `saving = signal(false)` guard. |
| `confirm()` browser dialog used for destructive action | **LOW** | shell.component.ts | 385 | `confirm('Are you sure...')` is a blocking browser dialog. This is fine functionally but poor UX — a custom modal is preferred. Also blocks code execution synchronously. |
| Missing `async/await` with `.catch()` for error handling | **LOW** | shell.component.ts | 387 | `deleteChildApi` is called with `.catch()` but `closeEditModal()` is called unconditionally before the async operation resolves. If the API call fails, the modal is already closed and the UI is out of sync. |

---

## Backend Validation

| Issue | Severity | File | Line | Description |
|-------|----------|------|------|-------------|
| No class-validator DTOs on any endpoint | **HIGH** | backend/src/children/children.controller.ts | — | All create/update DTOs are `any`. No `@IsString()`, `@IsDateString()`, `@IsOptional()`, `@IsNumber()` decorators. Required fields (`name`, `dateOfBirth`) have no backend enforcement. |
| `name` and `dateOfBirth` are required but not enforced | **HIGH** | backend/src/children/children.service.ts | 9, 27 | Both `create()` and `update()` pass all fields to Prisma without checking for requiredness. Prisma will throw a generic `PrismaClientKnownRequestError` if required fields are missing, leaking schema details. |
| `documentIssueDate` conversion to `new Date()` can throw | **MEDIUM** | backend/src/children/children.service.ts | 30 | `data.documentIssueDate ? new Date(data.documentIssueDate) : null` — if a malformed date string is sent, `new Date('')` returns `Invalid Date` (not an exception), which Prisma may silently store as `1970-01-01`. Should validate before converting. |
| `data` typed as `any` throughout the service | **MEDIUM** | backend/src/children/children.service.ts | — | Service methods accept `data: any`. No typed input DTOs. This makes refactoring dangerous and hides missing field coverage. |
| `update` in service uses same `data` as `create` | **LOW** | backend/src/children/children.service.ts | 27 | `update()` passes the entire payload to Prisma's `data` without filtering. Fields that should be `undefined` (to indicate "do not update") may be set to `null` instead, potentially clearing values. `undefined` fields in Prisma's `update` data are ignored; `null` fields overwrite. Current frontend sends `null` for fields it wants cleared. This is intentional but needs explicit documentation. |
| No Prisma schema file reviewed — fields may not match API | **INFO** | — | — | The Prisma schema was not in scope. If the schema has changed since the service was written, fields like `avatarUrl`, `gender`, `allergies` may be missing or renamed, causing silent field loss. |

---

## Recommendations

### Must Fix (before merge)
1. **Add server-side file size limit** — read the `Content-Length` header or validate base64 string length before passing to Prisma. Enforce a hard limit (e.g., 5MB decoded).
2. **Add class-validator DTOs** — create `CreateChildDto` and `UpdateChildDto` with `@nestjs/class-validator` decorators. At minimum: `@IsString()`, `@IsNotEmpty()` on `name` and `dateOfBirth`, `@IsOptional()` on the rest.
3. **Guard PATCH/DELETE with explicit ownership check at controller level** — extract the `findOne` ownership check into the controller or a shared guard, so the controller throws immediately rather than silently delegating to service internals.
4. **Add `saving` signal to `saveEditChild()`** — prevent double-submit and show loading state.

### Should Fix
5. **Track document dirty flag** — only send `medicalDocument` in the PATCH payload when a new file was actually selected. Store the original document separately (`originalDocument`) and compare before building the payload.
6. **Add `ChangeDetectionStrategy.OnPush`** to `ShellComponent` to reduce unnecessary change detection cycles.
7. **Add pagination/limits** to `healthRecords` and `vaccines` includes in `findOne`. Use `take: 50` or similar.
8. **Remove `console.error` with full error objects** in production-bound code — use structured logging that redacts sensitive fields, or at minimum log only `err.message`.
9. **Validate `avatarUrl` before binding** to `[src]` — ensure it starts with `http://` or `https://`, reject `javascript:` and `data:` schemes.
10. **Add debounce** to name validation input (300ms) to avoid excessive reactive updates.

### Nice to Fix
11. **Replace `confirm()` with a custom modal** for delete confirmation.
12. **Remove `onBloodTypeChange` no-op** and clean up the `(ngModelChange)` binding — `editBloodType.set($event)` is sufficient.
13. **Deduplicate `isValidName` / `hasNameError`** — simplify `hasNameError` to `!this.isValidName(name)`.
14. **Clarify `allergies` vs `criticalAllergies`** — either deprecate `allergies` or document the distinction clearly.
15. **Gate dev-login PIN `1234`** behind `process.env.NODE_ENV !== 'production'` or an explicit `ENABLE_DEV_AUTH=true` flag.
16. **Add async/await with proper error handling** for `deleteChildApi` — `await` the call and handle failure before closing the modal.

---

## Verdict

**REQUEST CHANGES**

The module has solid foundational patterns (Angular signals, Prisma parameterized queries, JWT auth guard). However, it has critical gaps:

- **No backend input validation** — `any` DTOs mean malformed requests reach Prisma unchecked. This is the most urgent fix.
- **No server-side file size enforcement** — an exploitable resource exhaustion vector.
- **Base64 document re-sent on every save** — a correctness and performance issue that will degrade with file size.

The clean code issues (`onBloodTypeChange` no-op, no double-submit guard, `confirm()` dialog) are lower severity but degrade production UX.

**All "Must Fix" items must be addressed before approval. "Should Fix" items are strongly recommended.**
