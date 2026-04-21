# Code Review — BottomNavComponent Sprint 6

Reviewed by: kiddok-reviewer
Files: bottom-nav.component.ts, shell.component.ts, TEST_RESULTS_BOTTOMNAV.md

---

## Security

**XSS vectors: CLEAN**
- `{{ tab.icon }}` renders from hardcoded `NavTab[]` array strings — no user-controlled data.
- `{{ label(tab.labelKey) }}` calls `this.i18n.t()[key]` — i18n service returns plain strings from a static translation map, not user input.
- No innerHTML, no `dangerouslySetInnerHTML`, no dynamic template construction.

**Sensitive data in console: CLEAN**
- `navigate(tabId: string)` dispatches `new CustomEvent('kiddok:navigate', { detail: tabId })` where `tabId` comes from the hardcoded `tabs` array. No child names, medical data, or PII emitted.

**Custom event dispatch: CLEAN**
- `CustomEvent` with `detail: tabId` where `tabId` is a narrow string literal type from the static `NavTab` interface. Safe.

---

## Performance

**Signal reads: EFFICIENT**
- `currentTab()` is called per-tab in the template. Each `@for` iteration calls it once for the class binding — O(5) signal reads per render. Acceptable.
- No nested signal reads, no computed chains, no repeated subscriptions.

**Memory leaks: CLEAN**
- `BottomNavComponent` is a pure presentational component with no subscriptions, no `setInterval`, no event listeners of its own. Angular's change detection handles cleanup naturally.
- `ShellComponent` correctly teardown `kiddok:navigate` listener in `ngOnDestroy`. ✅

**Heavy computations: NONE**
- `label(key)` is a simple dictionary lookup — O(1). No loops, no sorting, no computation.

---

## Clean Code

**Duplicate logic vs SidebarComponent: MINOR DUPLICATION** ⚠️
- Both `BottomNavComponent.navigate()` and `SidebarComponent.navigateTo()` dispatch `window.dispatchEvent(new CustomEvent('kiddok:navigate', { detail: tabId }))` — identical pattern duplicated in two components.
- No shared `NavigationService` or utility.
- **Not a blocker for merge**, but should be consolidated in a future refactor (sprint 7 or later) into a shared service or at minimum a shared helper function.

**Unused injection: DEAD CODE** ⚠️
- `protected dataService = inject(DataService)` is declared in `BottomNavComponent` but `dataService` is never used in the component (only `i18n` is used). The `currentTab` signal is accessed via `this.dataService.currentTab` — so `dataService` IS used.
- Wait — re-reading: `readonly currentTab = this.dataService.currentTab` — dataService IS used for the signal. So the injection is valid. No dead code.

**TypeScript strictness: CLEAN**
- `label(key: string): string` — properly typed return.
- `NavTab` interface defined at top of file.
- No `any` types.
- Standalone component with explicit imports.

---

## Verdict

**CONDITIONAL APPROVE**

All acceptance criteria met. The component is secure, performant, and well-typed. The only note is the `kiddok:navigate` dispatch duplication between BottomNav and Sidebar — this is a shared pattern-level issue, not a defect. It does not block merge.

**Recommendation for backlog**: Extract `kiddok:navigate` dispatching into a shared `NavigationService` or a lightweight utility function to DRY up the two components. Not a Sprint 6 blocker.