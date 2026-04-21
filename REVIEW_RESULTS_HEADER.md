# Code Review — HeaderComponent Sprint 5

## Pre-Review Notes

Three critical bugs were pre-fixed before this review:
1. `data.service.ts` — dangling `return this.parentProfile().name;` removed, `getParentName()` added as proper method
2. `sidebar.component.ts` — import paths fixed (`../../services` → `../services`)
3. `data.service.ts` — `getParentName()` method now exists

Build verified passing (`ng build` succeeds, only budget warnings remain — non-blocking).

---

## Security

### XSS Vectors — ✅ PASS

- All user-facing strings are routed through `i18n.t()` — no raw user input rendered in template.
- Avatar `src` values come from `child.avatarUrl` (API-provided or DiceBear), not from user-controlled fields.
- `dateOfBirth` displayed via `toDisplay()` — a pure string formatter that only rearranges `yyyymmdd` parts; it guards against `/` chars and returns invalid dates as-is without evaluation.
- No use of `innerHTML`, `dangerouslySetInnerHTML`, or any raw HTML rendering.
- No `eval()`, no template string interpolation of raw user content.

### Sensitive Data in Console — ✅ PASS

- No `console.log`, `console.warn`, or `console.error` in `header.component.ts`.
- API errors in `data.service.ts` use `console.error` with generic messages — appropriate for a backend service, not leaking sensitive data.

### Dropdown Click-Outside — ✅ PASS

```typescript
@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (!target.closest('app-header')) {
    this.showDropdown.set(false);
  }
}
```
Closes when clicking anywhere outside `<app-header>` — safe. No event.stopPropagation, no `preventDefault`, no interception of child dropdown interactions.

### Verdict: **SECURE** — No issues found.

---

## Performance

### Signal Reads — ✅ EFFICIENT

- `allChildren`, `activeChild`, `activeChildId`, `hasChildren` are all `computed()` — Angular's reactive dirty-checking ensures minimal re-evaluation.
- `activeChildAge` uses `activeChild()` which is already a computed — chain is efficient.
- `pageTitle` is a `computed()` with a simple `Record<string, string>` lookup — O(1).
- No signals read inside template without a computed wrapper (except `showDropdown` toggle — correct, it's a binary signal).

### Memory Leaks — ✅ NONE

- `@HostListener('document:click')` is managed by Angular — automatically removed on component destroy.
- No `addEventListener` calls manually wired in the component.
- No `setInterval` / `setTimeout` used for polling or repeating work.
- `dropdownRef` template reference (`#dropdownRef`) is declared in class but **never actually used** — this is a minor dead reference, not a leak.
- `ngOnDestroy()` is empty — nothing to clean up, which is correct since there are no subscriptions or manual listeners.

### Heavy Computation on Tab Changes — ✅ NONE

- `pageTitle` computed just does a `Record` key lookup — trivially cheap.
- No computations run on `@Input() currentTab` change; the header receives the tab as input but does not react to it beyond updating the title display.
- The `toDisplay()` function is a pure string transform (split + string concat) — no algorithmic complexity concerns.

### Verdict: **PERFORMANT** — No issues found.

---

## Clean Code

### Duplicate Logic vs Sidebar — ⚠️ MINOR CONCERN

- `toDisplay(yyyymmdd, locale)` is duplicated between `header.component.ts` and `shell.component.ts`. Both do identical date formatting. This should live in a shared utility (e.g., `src/app/core/utils/date.utils.ts`) or in `i18n.service.ts`.
- `dataService.getChildAge(child)` and `dataService.getParentName()` — no duplication.

### Unused Imports / Dead Code — ⚠️ MINOR

- `dropdownRef: HTMLElement | null` declared but never assigned or read — `@ViewChild('dropdownRef')` annotation is missing (or the reference was removed but the field was not). The field can be removed safely:
  ```typescript
  // REMOVE this dead field:
  private dropdownRef: HTMLElement | null = null;
  ```
- `ngOnDestroy()` is empty but present — either remove it or add a comment explaining it exists for future-proofing.

### TypeScript Strictness — ✅ CLEAN

- No `any` types in `header.component.ts`.
- `toDisplay()` has explicit `string` return type.
- `activeChildAge` computed has explicit return type `string | null`.
- All event emitters properly typed: `EventEmitter<void>` for `addChildRequested`, `backRequested`, etc.
- `ChildProfile` imported from `data.service` — properly namespaced.

### Structural Note

- `data.service.ts` has two near-identical sections for `updateChild` (local) and `updateChildApi` (HTTP) — intentional layering for now, not a code smell.

### Verdict: **CLEAN CODE** — One dead field (`dropdownRef`) and one duplicated utility (`toDisplay`). Recommend cleanup but not blocking.

---

## Final Verdict

**CONDITIONAL APPROVE**

The component is well-built and passes the build. Security and performance are solid. One dead field and one duplicated date utility should be cleaned up before production, but neither warrants blocking the merge.

### Required Before Merge (None — build passes)
### Recommended Before Production
1. **Remove dead `dropdownRef` field** — it serves no purpose in the class.
2. **Extract `toDisplay()` to a shared utility** — exists identically in `header.component.ts` and `shell.component.ts`.
3. **Budget warning** — `sidebar.component.ts` CSS exceeds the 2KB budget (2.86KB). Consider extracting styles or increasing budget if this is intentional.

---

*Reviewer: kiddok-reviewer | Sprint 5 | 2026-04-22*
