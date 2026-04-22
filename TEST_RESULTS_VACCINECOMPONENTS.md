# Test Results — VaccineSchedule + VaccineAlertCard Sprint 14

## Critical Issues (block merge)

### 1. **Duplicate identifier `markComplete`** (TS2300) — in `vaccine-schedule.component.ts`
- **Line 311**: `@Output() markComplete = new EventEmitter<...>()` (EventEmitter)
- **Line 426**: `markComplete(entry: TimelineEntry, event: MouseEvent) { ... }` (method)
- Both are class members with the same name. TypeScript treats `markComplete` as the EventEmitter in the class body, so the method body `this.markComplete.emit(...)` works, but the template `markComplete(entry, $event)` is ambiguous — TypeScript sees it as trying to *call* the EventEmitter as a function (TS2348: "not callable").
- **Fix**: Rename the method from `markComplete` to `openMarkCompleteModal` (or similar), update the internal call in `confirmMarkComplete()` to use the new name, and update the button in the expanded panel template.

### 2. **TS2532: Object is possibly undefined** — `pendingEntry()?.scheduleEntry.doses`
- **Line 268**: `{{ pendingEntry()?.scheduleEntry.doses }}` — `pendingEntry()` returns `TimelineEntry | null`, so `.scheduleEntry` is possibly undefined. Optional chain `.scheduleEntry?.doses` or non-null assertion needed.
- **Fix**: Add optional chaining: `pendingEntry()?.scheduleEntry?.doses`

### 3. **TS2551: `activeChild` does not exist on `DataService`** — `dataService.activeChild()`
- **Line 411**: `const child = this.dataService.activeChild();` — `DataService` only has `activeChildId` (signal), not `activeChild()`.
- The component imports `DataService` and tries to get the child's DOB for computing due dates, but `DataService` has no `activeChild()` method.
- **Fix**: Either (a) add `activeChild: computed(() => this.children().find(c => c.id === this.activeChildId()))` to `DataService`, or (b) use `DataService.activeChildId()` and fetch child DOB from `childVaccines()` records, or (c) compute due dates purely from the vaccine record's `dueDate` field (which the code already does as a fallback on line 408-409).

### 4. **TS2322 + TS2341: `childId` type mismatch and private access** — `vaccines.component.ts`
- **Line 114**: `[childId]="dataService.activeChildId()"` — `activeChildId()` is `string | null` but `@Input() childId` is `required string`. Also, `dataService` is declared `private` but used in the template.
- **Fix**: Change input to `@Input() childId: string | null = null` OR add a computed that returns `''` when null; also make `dataService` public or use a getter.

### 5. **TS2345: `new Event('click')` not assignable to `MouseEvent`** — `vaccines.component.ts`
- **Lines 624, 641**: `this.markComplete(record, new Event('click'))` — `markComplete` method expects `MouseEvent` but gets `Event`.
- **Fix**: Change method signature to `markComplete(record: VaccineRecord, event: Event)` OR use `$any($event)` in template OR create a `new MouseEvent(...)` with minimal required properties.

### 6. **TS2345: `$event` type mismatch in template** — `vaccine-schedule.component.ts`
- **Line 165**: `(longpress)="onLongPress(entry, $event)"` — `$event` from a DOM `longpress` (custom event dispatch) is typed as `Event`, not `MouseEvent`.
- **Fix**: Change `onLongPress(entry: TimelineEntry, event: MouseEvent)` to `onLongPress(entry: TimelineEntry, event: Event)`.

### 7. **TS2440: `VaccineRecord` import conflicts with local declaration** — `vaccines.component.ts`
- **Line 6**: Imports `VaccineRecord` from `./vaccines/vaccine-schedule.component`, but `vaccines.component.ts` also declares its own `export interface VaccineRecord` at line ~13.
- **Fix**: Remove the local `VaccineRecord` interface from `vaccines.component.ts` and use the imported one (they appear identical). Update the file to import from the schedule component.

---

## Validation Checklist

| Check | Status | Notes |
|-------|--------|-------|
| Vertical timeline with dot markers | ✅ PASS | Implemented with timeline dot + vertical connector line |
| Section headers: Overdue / Due Soon / Upcoming / Completed / Not Started | ✅ PASS | All 5 sections rendered with correct labels |
| Status colors: green=completed, teal=upcoming, orange+pulse=overdue, dashed=not started | ✅ PASS | `getDotClass()` returns correct classes; pulse animation via `pulse-overdue` CSS class |
| Tap-to-expand shows details (manufacturer, batch, site, doctor, notes) | ✅ PASS | `toggleExpand()` and expanded panel show all fields |
| Long-press triggers mark-complete date picker | ✅ PASS | `onLongPress()` opens modal; `event.preventDefault()` prevents click |
| Uses Albania vaccine schedule (26 entries, birth to 12 years) | ✅ PASS | `vaccine-schedule.constant.ts` has 26 entries |
| Computes due dates from child's DOB | ⚠️ PARTIAL | `getDueDate()` calls `this.dataService.activeChild()` which doesn't exist on DataService — fallback to `record.dueDate` works |
| Input/Output API: `[alert]` input, `(action)` output | ✅ PASS | `@Input({ required: true }) alert` and `@Output() action = new EventEmitter<void>()` |
| Status-driven colors (rose/orange/teal) | ✅ PASS | `cardClasses()`, `dotClass()`, `iconBgClass()`, etc. all use computed switch on status |
| Pulsing dot for overdue items | ✅ PASS | `[ngStyle]="alert.status === 'overdue' ? {'animation': 'pulse-dot 1.5s ease-in-out infinite'}` |
| Swipe-to-dismiss (80px threshold on mobile) | ✅ PASS | `onTouchStart/Move/End` with `SWIPE_THRESHOLD = 80` |
| Desktop dismiss button | ✅ PASS | Hidden on mobile (`hidden sm:flex`), visible on desktop |
| CTA button emits action event | ✅ PASS | `emitAction()` → `this.action.emit()` |
| Uses `<app-vaccine-schedule>` instead of inline timeline | ✅ PASS | In `vaccines.component.ts` template |
| Uses `<app-vaccine-alert-card>` for alert banner | ✅ PASS | In `vaccines.component.ts` template |
| `overdueAlerts` signal for alert banner | ✅ PASS | `overdueAlerts = computed<VaccineAlert[]>(...)` |
| 14 new i18n keys added | ✅ PASS | All 14 keys present in `i18n.service.ts` |
| No hardcoded strings | ⚠️ MINOR | Several fallbacks like `|| 'Akzni s\'ka vaksina'` use hardcoded strings as fallback; not critical |

---

## Build Result

**FAIL** — 12 TypeScript errors

```
TS2440: Import declaration conflicts with local declaration of 'VaccineRecord'
TS2322: Type 'string | null' is not assignable to type 'string' (childId input)
TS2341: Property 'dataService' is private and only accessible within class 'VaccinesComponent'
TS2345: Argument of type 'Event' is not assignable to parameter of type 'MouseEvent' (x3)
TS2348: Value of type 'EventEmitter<...>' is not callable (markComplete in template)
TS2532: Object is possibly 'undefined' (pendingEntry()?.scheduleEntry.doses)
TS2300: Duplicate identifier 'markComplete' (EventEmitter output vs method)
TS2551: Property 'activeChild' does not exist on DataService
TS2300: Duplicate identifier 'markComplete' (duplicate)
```

---

## Verdict

**REQUEST CHANGES**

The build fails with 12 TypeScript errors. The 7 critical issues are detailed above. The most impactful are:

1. **Duplicate `markComplete` identifier** — causes both TS2300 (duplicate) and TS2348 (not callable in template)
2. **`activeChild` doesn't exist on DataService** — runtime failure for due date computation
3. **`childId` type mismatch** — build breaks at template binding level

The `VaccineAlertCardComponent` itself is clean and has no build errors. `VaccineScheduleComponent` has the identifier collision and the `activeChild` reference issue. `VaccinesComponent` integration has the import conflict and the `Event` vs `MouseEvent` issues.

All functional features (timeline UI, swipe-to-dismiss, alert card visuals, i18n) are correctly implemented — only type errors block the build.