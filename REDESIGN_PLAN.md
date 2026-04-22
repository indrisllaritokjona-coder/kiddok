# KidDok — 50-Sprint Redesign Roadmap

**Version:** 2.0  
**Date:** 2026-04-22  
**Status:** Draft — Ready for Sprint Execution  
**Architect:** kiddok-architect

---

## Executive Summary

KidDok is a bilingual (SQ/EN) digital health diary for parents of young children. The application is built with Angular 21 (frontend, signals, Tailwind CSS) and NestJS + Prisma + PostgreSQL (backend, Dockerized). The first two sprints (Temperature Diary, Growth Tracking) are complete. The remaining 13 sprints from the original plan are incomplete, and the codebase carries ~30 issues across security, clean code, performance, and translation quality.

This document supersedes the previous `REDESIGN_PLAN.md` and `SPRINT_REGISTRY.md`. It provides a complete, prioritized backlog for **50 sprints** — covering: bug fix sprints, feature completion sprints, infrastructure sprints, tech-debt sprints, and future feature sprints.

### Project Health Snapshot

| Area | Status |
|------|--------|
| Backend API (NestJS + Prisma + PostgreSQL) | Operational; missing DTOs and validation |
| Frontend (Angular 21 + Tailwind + Signals) | Operational; ~30 known issues |
| Temperature Diary (Sprint 1) | ✅ Built; 2 pending fixes |
| Growth Tracking (Sprint 2) | ✅ Built; 3 pending fixes |
| Child Profile Edit Module (Sprint 7) | ⚠️ Built; 9 known issues |
| i18n (SQ + EN) | ⚠️ 5+ typo/key gaps |
| Icon Migration (Material → Lucide) | 🔄 ~50% complete |
| CI/CD | ❌ Not set up |
| E2E Tests | ❌ Not started |
| Docker Build | ⚠️ SIGKILL mid-export issue |

---

## Icon Migration Status

**Partially complete (~50%).**

### ✅ Already Migrated to Lucide
- `diary.component.ts` — fully migrated
- `growth-tracking.component.ts` — fully migrated
- `header.component.ts` — mostly migrated (back arrow, menu, globe, user, users, check, arrow-left-right, circle-plus, hand, settings)
- `vaccine-alert-card.component.ts` — fully migrated
- `vaccine-schedule.component.ts` — fully migrated

### 🔄 Still Using Material Icons/Symbols (must migrate)

| File | Remaining Icons | Type |
|------|----------------|------|
| `shell.component.ts` | 1 (search icon in edit modal) | `material-icons` |
| `sidebar.component.ts` | 3 (person placeholder, nav items, settings, logout) | `material-symbols-outlined` |
| `bottom-nav.component.ts` | 1 (nav icons container) | `material-symbols-outlined` |
| `pin-lock.component.ts` | ~15 (child_care, warning, visibility, visibility_off, error_outline, arrow_back, check_circle, sync, etc.) | `material-icons` |
| `header.component.ts` | 1 (child-switcher chevron — still `material-icons`) | `material-icons` |
| `health-alert-card.component.ts` | ? | `material-icons` |
| `quick-actions-grid.component.ts` | ? | `material-icons` |
| `recent-activity-feed.component.ts` | ? | `material-icons` |
| `welcome-hero.component.ts` | ? | `material-icons` |
| `settings-page.component.ts` | ? | `material-icons` |

### Notes
- The `diary.component.ts` still has one inline `material-icons` usage for `type.icon` (diary type icons like fever, cough) — these are dynamic string icons bound to diary entry types, not static nav icons.
- Icon migration subagent completed: `diary.component.ts`, `growth-tracking.component.ts`, most of `header.component.ts`, both vaccine components.
- Remaining: shell, sidebar, bottom-nav, pin-lock, and all home sub-components.
- Icon mapping reference: `home` → `house`, `thermostat` → `thermometer`, `trending_up` → `ruler`/`trending-up`, `edit_document` → `book-open`, `vaccines` → `syringe`, `settings` → `settings`, `arrow_back` → `arrow-left`, `chevron` → `chevron-down`/`chevron-up`.

---

## Complete Sprint Backlog (50 Sprints)

---

### PHASE 1: Critical Bug Fixes (Sprints 1–5)

---

#### Sprint 1: Child Profile Edit — Critical Fixes
**Issues addressed:** #1–#9 (all 9 Child Profile Edit Module issues)

**Status:** Carries 9 known issues from TEST + REVIEW results.

| # | Issue | File | Severity |
|---|-------|------|----------|
| 1 | `birthWeight` + `deliveryDoctor` missing from Edit Modal | `shell.component.ts` | CRITICAL |
| 2 | `child.saveProfile` i18n key used but not defined | `shell.component.ts` | CRITICAL |
| 3 | `documentIssueDate` missing from Edit Modal | `shell.component.ts` | HIGH |
| 4 | No server-side file size limit | `children.controller.ts` | HIGH |
| 5 | No backend DTO validation (class-validator) | `children.controller.ts` | HIGH |
| 6 | IDOR check only in service layer, not controller | `children.controller.ts` | HIGH |
| 7 | Base64 document re-sent on every PATCH save | `shell.component.ts` | HIGH |
| 8 | No double-submit guard on `saveEditChild()` | `shell.component.ts` | MEDIUM |
| 9 | `confirm()` browser dialog for delete | `shell.component.ts` | LOW |

**Deliverables:**
- `CreateChildDto` + `UpdateChildDto` with class-validator decorators
- `birthWeight`, `deliveryDoctor`, `documentIssueDate` added to Edit Modal template
- `child.saveProfile` added to i18n.service.ts
- Server-side 5MB file size limit on base64 payload
- `saving = signal(false)` guard on save methods
- Custom delete confirmation modal replacing `confirm()`
- Document dirty-flag tracking: only send `medicalDocument` when file actually changed
- Explicit ownership check at controller level before service call

---

#### Sprint 2: Temperature Diary — Fixes
**Issues addressed:** #10, #11

| # | Issue | File | Severity |
|---|-------|------|----------|
| 10 | Chart memory leak — `effect()` never destroyed | `temperature-diary.component.ts` | LOW |
| 11 | Silent save failure — no user feedback on error | `temperature-diary.component.ts` | LOW |

**Deliverables:**
- `implements OnDestroy`, store effect reference, call `.destroy()` on ngOnDestroy
- `saveError = signal<string | null>(null)` — display inline error on failed save
- Extract `tempColor()` helper to deduplicate `tempTextClass`/`tempColorClass`/`tempDotClass`

---

#### Sprint 3: Growth Tracking — Fixes
**Issues addressed:** #12, #13, #14

| # | Issue | File | Severity |
|---|-------|------|----------|
| 12 | `OnDestroy` missing — chart + timeouts never cleaned up | `growth-tracking.component.ts` | MEDIUM |
| 13 | No typed DTO — `data: any` in controller | `growth-entries.controller.ts` | MEDIUM |
| 14 | Effect flicker — chart rebuilt on every signal change | `growth-tracking.component.ts` | LOW |

**Deliverables:**
- Add `OnDestroy`: `chartInstance?.destroy()`, clear `setTimeout` callbacks
- Create `CreateGrowthEntryDto` with `@IsNumber()`, `@IsOptional()`, `@IsDateString()`
- Add ValidationPipe to controller
- Debounce chart re-renders (300ms) or guard with `chartInitialized` flag
- Add SRI hash to Chart.js CDN script
- Show `saveError` feedback on failed save (matching temperature pattern)

---

#### Sprint 4: Translation Fixes Sprint
**Issues addressed:** #15, #16, #17 + home.alerts.clear missing

| # | Issue | Location | Severity |
|---|-------|----------|----------|
| 15 | "Akzni" typo → "Aktiviteti" in 5 places | `i18n.service.ts` | LOW |
| 16 | "Seviiteti" typo → "Seviiteti" (severity label) | `i18n.service.ts` | LOW |
| 17 | `home.alerts.fever` sq/en mismatch (different phrasing) | `i18n.service.ts` | LOW |
| — | `home.alerts.clear` key missing (blank at runtime) | `i18n.service.ts` | HIGH |
| — | `home.alerts.clearDesc` missing (inline `i18n.isSq()` ternary) | `health-alert-card.component.ts` | MEDIUM |
| — | `home.recentActivity.emptyDesc` "Akzni" typo | `i18n.service.ts` | LOW |
| — | Inline `gender` label hardcoded string in child form | `childForm.gender.label` | LOW |

**Akzni occurrences to fix (should be "Aktiviteti" or appropriate SQ word):**
- `settings.noChildren`: `'Akzni s'ka fëmijë të regjistruar.'` → `'Aktivitet s'ka fëmijë të regjistruar.'` or `'Nuk ka fëmijë të regjistruar.'`
- `header.noChildrenPlaceholder`: `'Akzni s'ka fëmijë'` → `'Nuk ka fëmijë'`
- `diary.emptyState`: `'Akzni s'ka shënime'` → `'Nuk ka shënime'`
- `home.recentActivity.empty`: `'Akzni s'ka ende'` → `'Nuk ka aktivitet ende'`
- `vaccines.emptyState`: `'Akzni s'ka vaksina'` → `'Nuk ka vaksina'`

**Deliverables:**
- All typo corrections in `i18n.service.ts`
- Add `home.alerts.clear` and `home.alerts.clearDesc` keys
- Remove inline `i18n.isSq()` ternary in `health-alert-card.component.ts`
- Add `childForm.gender.label` i18n key; remove hardcoded inline string

---

#### Sprint 5: Build-Critical Fixes
**Issues addressed:** Pre-existing build blockers

| # | Issue | File | Severity |
|---|-------|------|----------|
| — | Stray `return` statement in `data.service.ts` (build-breaker) | `data.service.ts` | CRITICAL |
| — | Wrong import paths in `sidebar.component.ts` (`../../` → `../`) | `sidebar.component.ts` | CRITICAL |
| — | `dataService.getParentName()` called but not implemented | `data.service.ts` | CRITICAL |
| — | Dead `onBloodTypeChange()` no-op in `shell.component.ts` | `shell.component.ts` | LOW |
| — | Dead `router.navigate([], { queryParams })` in `quick-actions-grid` | `quick-actions-grid.component.ts` | MEDIUM |
| — | `pin-lock.component.ts` TS2801 error: `Promise<boolean>` always true | `pin-lock.component.ts` | MEDIUM |
| — | Backend `implicit any` on `req` parameters (multiple controllers) | Backend controllers | MEDIUM |
| — | `PORT` index signature access in `main.ts` | `main.ts` | LOW |

**Deliverables:**
- Fix stray `return` in data.service.ts
- Fix import paths in sidebar.component.ts
- Add `getParentName()` to DataService
- Remove dead `onBloodTypeChange()` from shell
- Remove dead `router.navigate([])` from quick-actions-grid
- Fix `TS2801` in pin-lock (change `if (somePromise)` to proper await/observable check)
- Add typed `Request` parameters to backend controllers
- Fix `process.env['PORT']` in main.ts

---

### PHASE 2: Feature Completion (Sprints 6–13)

---

#### Sprint 6: Icon Migration — Complete
**Issues addressed:** #20 (complete remaining ~50%)

**Files still using Material Icons:**
- `shell.component.ts` — 1 icon (search)
- `sidebar.component.ts` — 3 icons
- `bottom-nav.component.ts` — 1 icon set
- `pin-lock.component.ts` — ~15 icons
- `header.component.ts` — 1 icon (chevron)
- `health-alert-card.component.ts`
- `quick-actions-grid.component.ts`
- `recent-activity-feed.component.ts`
- `welcome-hero.component.ts`
- `settings-page.component.ts`

**Also:** `diary.component.ts` has dynamic `type.icon` strings (fever, cough, etc.) bound to `material-icons` — these should map to Lucide equivalents.

**Icon mapping (Material → Lucide):**
```
home              → house
thermostat        → thermometer
trending_up       → trending-up
edit_document     → book-open
vaccines          → syringe (or shield)
settings          → settings
arrow_back        → arrow-left
visibility        → eye
visibility_off    → eye-off
warning           → alert-triangle
error_outline     → alert-circle
check_circle      → check-circle (or check)
sync (spinner)    → loader / refresh-cw
child_care        → baby
person            → user
chevron_right     → chevron-right
chevron_down      → chevron-down
menu              → menu
globe             → globe
```

**Deliverables:**
- All components use `lucide-angular` `<lucide-icon>` exclusively
- No `material-icons` or `material-symbols-outlined` CSS classes in any template
- Remove `material-symbols-outlined` from `index.html` / styles if only Lucide remains
- `diary.typeIcon()` method updated to return Lucide icon names

---

#### Sprint 7: Add/Edit Child Modal — Polish (Sprint 7 original)
**Status:** Built in Sprint 7; needs fixes from REVIEW_CHILDFORM.md

**Pending fixes:**
- `buildGenderOptions()` called in `ngOnChanges` — move to `ngOnInit` or cache
- Add `OnDestroy` hook (even no-op)
- Dead `onBloodTypeChange()` stub in shell (also Sprint 5)
- Inline gender label hardcoded string (also Sprint 4)
- `payload: any` in `save()` — type against API DTO

**Deliverables:**
- All issues from REVIEW_RESULTS_CHILDFORM.md resolved
- 3-step wizard fully functional with all fields

---

#### Sprint 8: Sidebar Component — Extraction + Polish (Sprint 4 original)
**Status:** Built in Sprint 4; needs fixes from REVIEW_SIDEBAR.md

**Pending fixes:**
- Import paths fixed (from Sprint 5)
- `onBloodTypeChange()` no-op removed (from Sprint 5)
- `getParentName()` added (from Sprint 5)
- `getChildAge()` stray `return` fixed (from Sprint 5)

**Deliverables:**
- Desktop sidebar fully extracted from shell
- Active child mini-card with avatar + name + age badge
- All nav items with Lucide icons
- Locale toggle in sidebar footer
- Settings + Logout at bottom

---

#### Sprint 9: Header Component — Extraction (Sprint 5 original)
**Status:** Built in Sprint 5; needs remaining icon migration (Sprint 6)

**Deliverables:**
- Top bar extracted from shell
- Child switcher with avatar + name + chevron
- Locale toggle (EN/SQ)
- Back navigation on inner pages
- Lucide icons throughout (completed in Sprint 6)

---

#### Sprint 10: HomePage Sub-components (Sprint 14 original)
**Status:** Built in Sprint 14; needs review fixes

**Components built:**
- `WelcomeHeroComponent` — personalized greeting + child avatar + add child CTA
- `QuickActionsGridComponent` — 4-card grid (Temperature, Growth, Diary, Vaccines)
- `RecentActivityFeedComponent` — merged timeline of temperature + growth entries
- `HealthAlertCardComponent` — fever/vaccine alert banner

**Pending fixes:**
- Dead `router.navigate([])` in QuickActionsGrid (Sprint 5)
- `home.alerts.clear` / `home.alerts.clearDesc` missing (Sprint 4)
- `home.recentActivity.emptyDesc` "Akzni" typo (Sprint 4)
- Missing pulse animation on active alerts (per SPEC)
- Icon migration for all sub-components (Sprint 6)

**Deliverables:**
- All home sub-components fully migrated to Lucide
- All i18n keys present and correct
- Health alerts show with correct all-clear state
- Activity feed shows merged + sorted entries

---

#### Sprint 11: BottomNav Component — Mobile Tab Bar (Sprint 6 original)
**Status:** Built in Sprint 6; needs icon migration + polish

**Pending fixes:**
- Bottom nav icons still using `material-symbols-outlined` (Sprint 6)
- Active tab indicator needs correct highlighting per current route

**Deliverables:**
- 5-tab mobile bottom nav: Home, Temperature, Growth, Diary, Vaccines
- Lucide icons throughout
- Active state correctly highlights current route
- Badge count on vaccines tab for overdue count

---

#### Sprint 12: Diary Page — Refactor (Sprint 8 original)
**Status:** Built; needs review fixes

**Deliverables:**
- Symptoms-only focus (temperature moved to TemperaturePage in Sprint 1)
- Quick-add bar with symptom types: fever, cough, vomit, diarrhea, headache, rash, sore throat, tired, stomachache
- Severity selector: Mild / Moderate / Severe
- Duration input + description
- Date-grouped entry list
- Swipe-to-delete on mobile
- All Lucide icons (completed in Sprint 6)

---

#### Sprint 13: Vaccines Page — Full Redesign (Sprints 9–11 original)
**Status:** Partially built; needs completion

**Deliverables:**
- `VaccineScheduleComponent` — full Albanian national immunization schedule timeline
- `VaccineAlertCardComponent` — overdue/due alert cards with CTAs
- `VaccineAddFormComponent` — add vaccine record with dose tracking, batch number, injection site, doctor
- Vertical timeline UI: completed (green check) / upcoming (orange clock) / overdue (red warning)
- Expandable vaccine nodes with dose details
- Badge count on nav item for overdue vaccines
- Alert card on home page for next upcoming vaccine
- All Lucide icons (vaccine components already migrated in Sprint 6)
- Albanian + English schedule data embedded (SQ default, EN alternative)

---

#### Sprint 13b: Settings Page — Full Implementation (Sprint 13 original)
**Status:** Partial; needs i18n audit + data management

**Deliverables:**
- Parent profile: name, surname, phone
- Language toggle (already in header/sidebar)
- Children management: list, edit, delete
- Data export (JSON download of all child data)
- Data clear with confirmation modal
- About/version info
- Lucide icons throughout

---

### PHASE 3: Infrastructure & Quality (Sprints 14–20)

---

#### Sprint 14: Docker Build Fix + Backend Hardening
**Issues addressed:** #18, #19

| # | Issue | Severity |
|---|-------|----------|
| 18 | Dockerfile missing `prisma generate` step | HIGH |
| 19 | Docker image build keeps getting SIGKILL'd mid-export | HIGH |

**Deliverables:**
- Verify `prisma generate` is in Dockerfile (schema claims it was fixed — verify)
- Investigate SIGKILL: likely OOM during `docker build`. Solutions:
  - Multi-stage build to reduce final image size
  - `--compress` flag for build context
  - Split `npm install` and `prisma generate` across layers
  - Use `docker build --progress=plain` to identify exact step
- Docker Compose with health checks for Postgres
- `.dockerignore` to exclude `node_modules`, `.git`, `dist`, `.angular`

---

#### Sprint 15: CI/CD Pipeline
**Status:** Not started

**Deliverables:**
- GitHub Actions workflow (or equivalent):
  - `lint` job: ESLint + Prettier check
  - `test` job: Jest for backend, Karma/Jasmine for frontend
  - `build` job: `ng build` + `docker build`
  - `e2e` job: Playwright or Cypress tests
- Branch protection: PR required for merge to main
- Secrets management for `DATABASE_URL`, `JWT_SECRET`, etc.
- Docker image push to registry on main merge
- Preview environments for PRs (optional)

---

#### Sprint 16: E2E Testing Setup
**Status:** Not started

**Deliverables:**
- Install Playwright or Cypress
- Test coverage for critical flows:
  - Login (PIN + credentials)
  - Add child profile
  - Log temperature reading
  - Log growth measurement
  - Switch between children
  - Language toggle (SQ ↔ EN)
  - Delete child profile
- CI integration (from Sprint 15)
- Test reports in CI

---

#### Sprint 17: Unit Testing — Backend
**Status:** Not started

**Deliverables:**
- Jest configured for NestJS backend
- Unit tests for all service methods:
  - ChildrenService: CRUD + ownership checks
  - TemperatureEntriesService: validation (future date, ranges)
  - GrowthEntriesService: validation (height/weight ranges, at-least-one)
  - AuthService: login/logout
- Coverage goal: 80%+
- Tests run in CI (Sprint 15)

---

#### Sprint 18: Unit Testing — Frontend
**Status:** Not started

**Deliverables:**
- Jest configured for Angular (with Jest preset)
- Component-level tests for:
  - ShellComponent: navigation, child switching
  - TemperatureDiaryComponent: signal state, chart rendering
  - GrowthTrackingComponent: signal state, chart rendering
  - I18nService: locale switching, key resolution
- Service mocks for DataService API calls
- Coverage goal: 70%+

---

#### Sprint 19: Performance Audit + Fixes
**Deliverables:**
- Audit all `data: any` usages → typed DTOs throughout backend
- Add pagination to all `findMany` queries (temperatures, growth, health records)
- Add `ChangeDetectionStrategy.OnPush` to all components that don't use ViewContainerRef
- Replace `CommonModule` with selective imports in components
- Audit `async/await` without `try/catch` — add structured error handling
- Remove all `console.error` with full error objects in production code
- Audit no-op/dangling methods across all components
- Add `take: 50` to all `include: { healthRecords, vaccines }` in children service

---

#### Sprint 20: Security Audit + Hardening
**Deliverables:**
- Implement proper JWT in HTTP-only cookie (not localStorage) — migration
- Add Rate limiting (`@nestjs/throttler`) to auth endpoints
- Add CORS configuration for production domain
- Audit all XSS vectors: sanitise avatar URLs, document URLs
- Add ` helmet` for security headers
- Audit IDOR across all endpoints (ensure every controller has explicit ownership guard)
- Content Security Policy (CSP) headers
- Add `generated_at` / `version` to all API responses for cache busting

---

### PHASE 4: Polish & UX (Sprints 21–30)

---

#### Sprint 21: Empty States — All Pages
**Deliverables:**
- Each page (Home, Temperature, Growth, Diary, Vaccines, Settings) has a illustrated empty state
- Empty state includes: friendly SVG illustration + headline + CTA button
- All empty states have SQ + EN translations

---

#### Sprint 22: Animation & Motion Audit
**Deliverables:**
- Page transitions: 350ms ease-out (or Angular route animations)
- Card hover lift: 200ms ease on all cards
- Modal slide-up: 350ms cubic-bezier(0.16, 1, 0.3, 1)
- Button press: 100ms ease
- Success flash: 600ms ease-out on save
- List stagger: 50ms per item on entry lists
- Fever alert pulse animation (repeating, not one-shot)
- Chart data points animate in on load
- Loading skeleton screens instead of spinners where appropriate

---

#### Sprint 23: Error States + Toast System
**Deliverables:**
- Global toast notification system (success/error/info)
- Inline field errors on all forms (not just browser validation)
- Network error state: "Nuk u lidh dot me serverin" / "Could not connect to server"
- 404/403 error pages with friendly illustrations
- Retry buttons on failed API calls
- Save error → toast: "Ruajtja dështoi. Provo përsëri."

---

#### Sprint 24: Responsive Design Audit
**Deliverables:**
- Mobile-first audit of all pages
- Sidebar collapses to bottom nav on mobile (already planned)
- Desktop: 3-column child grid; Tablet: 2-column; Mobile: 1-column
- Charts responsive (Chart.js responsive: true)
- Modal full-screen on mobile, centered overlay on desktop
- Touch targets minimum 44x44px
- No horizontal scroll on any page

---

#### Sprint 25: Date/Time Formatting Audit
**Deliverables:**
- Fix `onDateInput()` locale-aware formatting (DD/MM/YYYY for SQ, MM/DD/YYYY for EN)
- Fix `toIso()` locale-aware parsing
- Relative time display: "5 minuta më parë" / "5 minutes ago"
- Calendar widget uses locale-appropriate first day of week (Monday for SQ, Sunday for EN)
- Date inputs use native `<input type="date">` with locale formatting

---

#### Sprint 26: Accessibility (a11y) Audit
**Deliverables:**
- All images have `alt` text
- All form inputs have associated `<label>` elements
- Color contrast: all text meets WCAG AA (4.5:1 for body, 3:1 for large text)
- Focus indicators visible on all interactive elements
- `aria-label` on icon-only buttons
- `role` attributes on custom components (tabs, modals, accordions)
- Keyboard navigation: Tab, Enter, Escape all work
- Screen reader announcements for dynamic content (aria-live regions)

---

#### Sprint 27: PWA Setup
**Deliverables:**
- Service worker for offline capability
- Web app manifest with icons, theme color, display: standalone
- Offline fallback page
- Cache strategies: App Shell cached, API responses network-first
- Push notification infrastructure (token storage, service worker registration)
- "Add to Home Screen" prompt

---

#### Sprint 28: Push Notifications — Temperature Fever Alerts
**Deliverables:**
- Browser push notification on fever ≥ 38.5°C
- Notification: "Temperatura e lartë! 38.7°C — {{ child name }}"
- Permission request flow (gentle, not blocking)
- Notification click → opens temperature page
- Do Not Disturb hours setting (don't notify 10pm–7am)

---

#### Sprint 29: Push Notifications — Vaccine Reminders
**Deliverables:**
- Browser push notification 3 days before vaccine due date
- Notification: "{{ vaccine name }} — për shkak më {{ date }}"
- Notification click → opens vaccines page
- Overdue notification (fires once, then daily reminder)

---

#### Sprint 30: Data Export + Backup
**Deliverables:**
- Export all child data as JSON (via Settings page)
- PDF report generation per child (temperature history, growth chart, vaccine status)
- Include date range selector for export
- Email backup option (future: SendGrid/integration)

---

### PHASE 5: Future Features (Sprints 31–50)

---

#### Sprint 31: Medication Tracking Module
**Description:** Log medications (name, dose, frequency, start/end date) with reminders.
**Deliverables:**
- New `MedicationEntry` model + API
- Medication log list per child
- Add/edit medication form
- Reminder scheduling (in-app at first, push later)
- Medication history in child profile

---

#### Sprint 32: Appointment Scheduling
**Description:** Track pediatrician appointments, checkups, lab visits.
**Deliverables:**
- `Appointment` model + API
- Calendar view of upcoming appointments
- Appointment types: routine checkup, sick visit, vaccination, lab work
- Reminder 24h before
- Notes field per appointment

---

#### Sprint 33: Lab Results Module
**Description:** Attach and track lab results (blood tests, urine tests, etc.)
**Deliverables:**
- `LabResult` model + API
- File upload for PDF/image results
- Reference range display (with high/low indicators)
- Date + test type categorization
- Historical trend charts for recurring tests (e.g., hemoglobin)

---

#### Sprint 34: Growth — WHO Percentile Integration
**Description:** Add WHO growth chart percentile bands to the growth chart.
**Deliverables:**
- Embed WHO LMS data as static JSON (0–5 years for height/weight)
- Chart.js shaded percentile bands (3rd, 15th, 50th, 85th, 97th)
- Percentile calculation client-side using WHO LMS formula
- Toggle: absolute values vs percentile view
- Alerts if child falls outside 3rd/97th percentile

---

#### Sprint 35: Growth — Dual-Metric Chart
**Description:** Height + weight on same chart with dual Y-axes (already in spec, needs implementation).
**Deliverables:**
- Single Chart.js instance with `y` and `y1` axes
- Toggle: height-only / weight-only / both
- Smooth bezier curves
- Pinch-to-zoom time range selector: 0–6m, 0–12m, 0–24m, all

---

#### Sprint 36: Doctor/Nurse Access — Read-Only Sharing
**Description:** Generate a time-limited read-only link to share a child's health summary.
**Deliverables:**
- `ShareLink` model: token, childId, expiresAt, createdByUserId
- API: POST /share/:childId (generate), GET /share/:token (view), DELETE /share/:id (revoke)
- Public read-only view (no login required)
- Summary page: last 30 days temperature, growth chart snapshot, vaccine status
- Optional: QR code generation

---

#### Sprint 37: Multi-Parent Support
**Description:** Allow two parents to share access to the same child profile.
**Deliverables:**
- `FamilyMember` model: userId, childId, role (parent, grandparent, nanny, doctor)
- Invite flow: email/SMS link to join family
- Role-based permissions (parent = full access, doctor = read-only)
- Family settings page showing all members

---

#### Sprint 38: Vaccination — International Schedules
**Description:** Support US/UK/WHO vaccine schedules alongside Albanian.
**Deliverables:**
- Schedule data structure supports multiple countries
- User selects country during onboarding
- Schedule comparison view: Albanian default vs selected country
- Visual diff: which vaccines are unique to which schedule
- Toggle between schedules in Vaccines page

---

#### Sprint 39: Dashboard — Customizable Widgets
**Description:** Allow parents to reorder and customize home page widgets.
**Deliverables:**
- Drag-and-drop widget reordering
- Widget visibility toggles
- Preferred child selector (which child's data shows on home by default)
- Persist preferences in localStorage + backend

---

#### Sprint 40: Sleep Tracking Module
**Description:** Dedicated sleep log (bedtime, wake time, quality, interruptions).
**Deliverables:**
- `SleepEntry` model + API
- Sleep quality: 1–5 stars
- Night interruptions log
- Weekly sleep summary chart
- Average bedtime/wake time calculation
- Sleep goals (optional)

---

#### Sprint 41: Meal/Nutrition Tracking
**Description:** Log meals, breastfeeding, formula, solid foods.
**Deliverables:**
- `MealEntry` model + API
- Food type: breastfeeding / formula / solid
- Portion size estimation
- Photo attachment (optional)
- Daily nutrition summary
- Allergy flagging against child's `criticalAllergies`

---

#### Sprint 42: Development Milestones
**Description:** Track developmental milestones (first words, walking, potty training, etc.)
**Deliverables:**
- `Milestone` model + API
- Pre-populated list of age-appropriate milestones (0–6y, based on CDC/Albanian pediatric guidelines)
- Date achieved + optional notes/photo
- Timeline view: "First walked on {{ date }}"
- Reminder: "Approaching milestone age — watch for X"

---

#### Sprint 43: Health Report — PDF Generation
**Description:** Generate a formatted health report for doctor visits.
**Deliverables:**
- Select date range + child
- Auto-generate PDF including:
  - Growth chart (pct. bands)
  - Recent temperature readings
  - Vaccination status
  - Medication log
  - Allergy summary
- Print-optimized CSS
- Email report option

---

#### Sprint 44: Mood/Behavior Tracking
**Description:** Log mood and behavioral observations over time.
**Deliverables:**
- `MoodEntry` model + API
- Mood options: happy, calm, fussy, tantrum, anxious, tired, sick
- Behavior notes (free text)
- Daily mood chart
- Correlation hints: "Mood tends to be worse on fever days"

---

#### Sprint 45: Firebase/Analytics Integration
**Description:** Add analytics to understand usage patterns (opt-in).
**Deliverables:**
- Firebase Analytics or Plausible for:
  - Page views, time on page
  - Feature usage (temperature logged, growth added)
  - Error tracking (Sentry)
- Privacy-first: no PII sent, IP anonymized
- Dashboard for product team (usage metrics)

---

#### Sprint 46: Localization — Full i18n Audit
**Description:** Comprehensive audit and improvement of all translation strings.
**Deliverables:**
- Every user-facing string in i18n.service.ts (no hardcoded SQ/EN anywhere)
- Pluralization support for SQ (Albanian has complex plural rules)
- Date/time formatting fully locale-aware
- Currency formatting for any future billing features
- RTL language preparation (future Arabic support)
- Professional translation review (human translator for SQ)

---

#### Sprint 47: Performance — Lazy Loading + Code Splitting
**Deliverables:**
- Lazy load all feature pages (Temperature, Growth, Diary, Vaccines) via Angular routes
- Defer Chart.js loading until page is visible
- Preload upcoming routes on hover (router预加载)
- Bundle size audit: target <200KB initial load
- Skeleton screens for lazy-loaded routes

---

#### Sprint 48: Performance — Service Worker + Caching
**Deliverables:**
- HTTP caching headers on API responses (static assets: 1 year, API: no-cache)
- IndexedDB for offline-first temperature/growth entry (queue and sync)
- Background sync when connection restored
- App update notification ("New version available — refresh")

---

#### Sprint 49: Production Hardening
**Deliverables:**
- Environment-specific configuration (dev/staging/prod)
- PostgreSQL connection pooling (PgBouncer or equivalent)
- Redis session store (for JWT blacklist / refresh tokens)
- Database backups: daily automated pg_dump
- Uptime monitoring (external service like Better Uptime)
- Error tracking (Sentry)
- Log aggregation (structured JSON logging → log service)

---

#### Sprint 50: v1.0 Release + Launch Checklist
**Deliverables:**
- All sprints 1–49 completed and merged
- E2E test suite passing
- Performance benchmarks met (Lighthouse score ≥ 90)
- Security penetration test (basic)
- Privacy policy + terms of service published
- Parent onboarding flow tested
- App Store / Play Store listing (if PWA → installable)
- Announcement post / social media
- v1.0 tag + GitHub release

---

## Issue Index

| # | Issue | Sprint |
|---|-------|--------|
| 1 | birthWeight + deliveryDoctor missing from Edit Modal | 1 |
| 2 | child.saveProfile i18n key missing | 1 |
| 3 | documentIssueDate missing from Edit Modal | 1 |
| 4 | No server-side file size limit | 1 |
| 5 | No backend DTO validation | 1 |
| 6 | IDOR check only in service layer | 1 |
| 7 | Base64 document re-sent on every PATCH | 1 |
| 8 | No double-submit guard on saveEditChild() | 1 |
| 9 | confirm() browser dialog for delete | 1 |
| 10 | Temperature chart memory leak | 2 |
| 11 | Temperature silent save failure | 2 |
| 12 | Growth OnDestroy missing | 3 |
| 13 | Growth no typed DTO | 3 |
| 14 | Growth effect flicker | 3 |
| 15 | "Akzni" typo in 5 places | 4 |
| 16 | "Seviiteti" typo in sq translation | 4 |
| 17 | home.alerts.fever sq/en mismatch | 4 |
| 18 | Dockerfile missing prisma generate | 14 |
| 19 | Docker SIGKILL mid-export | 14 |
| 20 | Icon migration incomplete | 6 |

---

## Team Labels (Permanent)

| Label | Role | Persona |
|-------|------|---------|
| `kiddok-architect` | Architect/Planner | Senior architect, specs + roadmap |
| `kiddok-executor` | Executor/Developer | Full-stack Angular dev, builds from spec |
| `kiddok-tester` | Tester/QA | Meticulous QA, finds bugs + validation gaps |
| `kiddok-reviewer` | Reviewer/Refiner | Security + performance expert |

## Operating Rules

```
User request
    ↓
kiddok-architect → creates SPEC.md / REDESIGN_PLAN.md + commits
    ↓
kiddok-executor → reads SPEC, builds module, commits
    ↓
kiddok-tester → reads code, validates, writes TEST_RESULTS_*.md, commits
    ↓
kiddok-reviewer → security + perf audit, writes REVIEW_RESULTS_*.md, commits
    ↓
Report to user
```

---

*Document version 2.0 — Supersedes all prior REDESIGN_PLAN.md and SPRINT_REGISTRY.md*
*Maintained by: kiddok-architect*
