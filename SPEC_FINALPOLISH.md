# SPEC_FINALPOLISH.md — Sprint 12: Final Polish, i18n Audit, Responsive Check

**Sprint:** 12 / **Architect:** kiddok-architect / **Date:** 2026-04-22

---

## 1. i18n Audit — Orphaned Keys Found & Fixed

### Issue Pattern
Inline ternary `i18n.locale() === 'sq' ? 'sq string' : 'en string'` scattered across multiple files.
All should use `i18n.t()['key']` with translations registered in `i18n.service.ts`.

### Findings

| File | Line | Hardcoded String | Recommended Fix |
|------|------|-----------------|-----------------|
| `settings-page.component.ts` | 107 | `'Akzni s'ka fëmijë të regjistruar.' : 'No children registered yet.'` | Add `settings.noChildren` to i18n.service |
| `pin-lock.component.ts` | 290 | `'Paneli i Prindërve' : 'Parent Dashboard'` | Use `i18n.t()['pin.dashboard']` |
| `pin-lock.component.ts` | 293 | `'Mirësevini!' : 'Welcome!'` | Use `i18n.t()['pin.welcome']` |
| `pin-lock.component.ts` | 301 | `'Vendosni kodin e përdoruesit' : 'Enter User ID'` | Use `i18n.t()['pin.enterUserId']` |
| `pin-lock.component.ts` | 304 | `'F.sh. elena.hoxha' : 'e.g. elena.hoxha'` | Use `i18n.t()['pin.userIdHint']` |
| `pin-lock.component.ts` | 307 | `'Vendosni fjalëkalimin' : 'Enter Password'` | Use `i18n.t()['pin.enterPassword']` |
| `pin-lock.component.ts` | 310 | `'Fjalëkalimi juaj' : 'Your password'` | Use `i18n.t()['pin.yourPassword']` |
| `pin-lock.component.ts` | 313 | `'Vazhdoni me identifikimin' : 'Continue Sign In'` | Use `i18n.t()['pin.continueSignIn']` |
| `pin-lock.component.ts` | 316 | `'Duke u identifikuar...' : 'Authenticating...'` | Use `i18n.t()['pin.authenticating']` |
| `pin-lock.component.ts` | 319 | `'Gjuha:' : 'Language:'` | Use `i18n.t()['pin.language']` |
| `pin-lock.component.ts` | 322 | `'Të dhënat tuaja janë të sigurta & të mbrojtura' : 'Your data is safe & protected'` | Use `i18n.t()['pin.safeData']` |
| `pin-lock.component.ts` | 325 | `'Keni harruar fjalëkalimin tuaj?' : 'Forgot your password?'` | Use `i18n.t()['pin.forgotPassword']` |
| `pin-lock.component.ts` | 328 | `'Kthehu' : 'Go back'` | Use `i18n.t()['pin.goBack']` |
| `pin-lock.component.ts` | 333 | `'Ripërtëri fjalëkalimin' : 'Reset Password'` | Use `i18n.t()['pin.resetPassword']` |
| `pin-lock.component.ts` | 341 | `'NID / NIPT' : 'NID / NIPT'` | Use `i18n.t()['pin.nid']` |
| `pin-lock.component.ts` | 344 | `'Kodi i konfirmimit' : 'Confirmation Code'` | Use `i18n.t()['pin.confirmationCode']` |
| `pin-lock.component.ts` | 406 | `'Vendosni kodin e përdoruesit NID / NIPT' : 'Enter your User ID / NID / NIPT'` | Use `i18n.t()['pin.enterNid']` |
| `pin-lock.component.ts` | 418/473 | `'Vendosni fjalëkalimin' : 'Enter your password'` | Use `i18n.t()['pin.enterPassword']` |
| `pin-lock.component.ts` | 470 | `'Vendosni kodin e përdoruesit NID / NIPT' : 'Enter your User ID / NID / NIPT'` | Use `i18n.t()['pin.enterNid']` |
| `pin-lock.component.ts` | 484 | `'Kodi ose fjalëkalimi është i pasaktë.' : 'Invalid username or password.'` | Use `i18n.t()['pin.invalidCredentials']` |
| `shell.component.ts` | 63 | `'Zgjidhni profilin e fëmijës për të vazhduar.' : 'Select a child profile to continue.'` | Add `shell.selectChildToContinue` to i18n |
| `shell.component.ts` | 89 | `'Hapni Profilin' : 'Open Profile'` | Add `shell.openProfile` |
| `shell.component.ts` | 177 | `'Gjinia' : 'Gender'` | Use existing `child.gender` key |
| `shell.component.ts` | 303 | `'Modifiko Profilin e Fëmijës' : 'Edit Child Profile'` | Use existing `child.editProfile` |
| `shell.component.ts` | 391 | `'Gjinia' : 'Gender'` | Use existing `child.gender` key |
| `shell.component.ts` | 479 | `'Ruaj Ndryshimet' : 'Save Changes'` | Add `shell.saveChanges` |
| `shell.component.ts` | 485 | `'Fshi Profilin' : 'Delete Profile'` | Add `shell.deleteProfile` |
| `header.component.ts` | 48 | `i18n.locale() === 'sq' ? 'SQ' : 'EN'` | Add `header.sq` and `header.en` keys |
| `sidebar.component.ts` | 22 | `i18n.locale() === 'sq' ? 'EN' : 'SQ'` (toggle label) | Already uses `i18n.t()['language.label']`; fix the inline locale toggle |
| `header.component.ts` | 204, 207 | `'{n} vjeç' : '{n} years'` and `'{n} muaj' : '{n} months'` | Already in i18n as `sidebar.ageFormat` / `sidebar.ageFormatMonths` — fix callers to use those keys |

### Fix Strategy
1. Add missing translation keys to `i18n.service.ts` (pin-lock group, shell group)
2. Replace inline ternaries with `i18n.t()['key']` calls
3. Verify all i18n keys are present in `i18n.service.ts` translations object

---

## 2. Responsive Breakpoints — Consistency Check

### Breakpoint Convention
- **Mobile:** `< 640px` (Tailwind `sm:`)
- **Tablet:** `640px–1023px` (Tailwind `md:`)
- **Desktop:** `1024px+` (Tailwind `lg:`)
- Bottom nav: `lg:hidden` (shows on mobile/tablet only)
- Sidebar: `hidden lg:block` (shows on desktop only)

### Findings

| Component | Issue | Fix |
|-----------|-------|-----|
| `bottom-nav.component.ts` | ✅ Correctly uses `lg:hidden` | — |
| `sidebar.component.ts` | ✅ Correctly uses `hidden lg:block` | — |
| `shell.component.ts` | ✅ Correctly uses `hidden lg:block` for sidebar | — |
| `header.component.ts` | ✅ Mix of `sm:block`, `lg:flex`, `lg:hidden` | Consistent |
| `shell.component.ts` | ✅ Grid uses `sm:grid-cols-2 lg:grid-cols-3` | Consistent |
| `records.component.ts` | Uses `2xl:grid-cols-2` alongside `lg:grid-cols-3` | 2xl breakpoint is fine (1440px+); no change needed |
| `vaccines.component.ts` | ✅ Modal uses `sm:items-center` for alignment | Consistent |

### Summary
No responsive inconsistencies found. Breakpoints are used consistently across all components. The `2xl:` breakpoint in records is an additive enhancement and does not conflict.

---

## 3. Global Animation System

### Findings

| Animation | Current Usage | Expected Standard | Status |
|-----------|--------------|-------------------|--------|
| Page transitions | Inline `[style.animation]="'fadeInUp 600ms ease 200ms both'"` in `welcome-hero.component.ts:46` | `350ms ease-out` per spec | ❌ **TOO SLOW** — should use global fadeInUp keyframe |
| `animate-slide-up` | Used in modals across diary, shell, growth-tracking, vaccines, header, health-alert | ✅ Defined per-component with `0.3s cubic-bezier(0.16, 1, 0.3, 1)` | ✅ Consistent |
| `animate-fade-in` | Used for inline notifications (settings, pin-lock, shell overlays) | ✅ Per-component definition `0.3s ease-out` | ✅ Consistent |
| Card hover lift | No consistent global card hover animation | Add `.card-hover` utility to `styles.css` | ❌ **MISSING** |

### Required Global Style Additions (`styles.css`)

```css
/* Add to styles.css — Sprint 12 */

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Consistent 350ms ease-out for all page-level entrances */
.animate-fade-in {
  animation: fadeInUp 350ms ease-out both;
}

/* Consistent card hover lift */
.card-hover {
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
}
.card-hover:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/* Consistent slide-up for modals */
.animate-slide-up {
  animation: slideUp 350ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Actions
1. Add missing global `@keyframes fadeInUp` and `animate-fade-in` / `animate-slide-up` to `styles.css` (currently only defined per-component)
2. Fix `welcome-hero.component.ts:46` to use `350ms ease-out` instead of `600ms ease 200ms both`
3. Add `.card-hover` utility to `styles.css`
4. Replace per-component `@keyframes` definitions with global ones

---

## 4. Accessibility Quick Check

### Findings

| Issue | File | Line | Description |
|-------|------|------|-------------|
| ⚠️ Missing `alt` text | `sidebar.component.ts` | 29 | `<img ... alt="avatar" />` uses generic placeholder — should describe the child or use `aria-label` |
| ✅ `tabindex` present | `quick-actions-grid.component.ts` | 34 | `tabindex="0"` present on action buttons |
| ✅ Labels present | `settings-page.component.ts` | inputs | All form inputs have associated labels |
| ⚠️ Color contrast | Multiple files | — | Uses `text-gray-400` on white — need to verify contrast ratio ≥ 4.5:1 |
| ⚠️ No `role` on icon-only buttons | `bottom-nav.component.ts` | — | Nav items are icon-only with tooltip; need `aria-label` |
| ⚠️ Missing `aria-label` on avatar images | `settings-page.component.ts` | 110 | `<img [src]="child.avatarUrl" ... />` — no alt |
| ⚠️ Language toggle buttons | `settings-page.component.ts` | 79, 86 | Language switch buttons need `aria-label` |

### Color Contrast Audit
- `text-gray-400` (#9CA3AF) on white (#FFFFFF): **ratio ~3.0:1** — **FAILS WCAG AA** for body text
- Fix: Replace `text-gray-400` with `text-gray-500` (#6B7280, ratio ~5.5:1) for small text labels, or use `text-gray-600` (#4B5563, ratio ~7.5:1)
- Affected files: `health-alert-card.component.ts`, `recent-activity-feed.component.ts`, `settings-page.component.ts`, `quick-actions-grid.component.ts`

### Required Accessibility Fixes
1. Replace all `text-gray-400` on white backgrounds with `text-gray-500` (≥ 4.5:1 contrast)
2. Add `aria-label` to all avatar `<img>` elements
3. Add `aria-label` to language toggle buttons in `settings-page.component.ts`
4. Add `aria-label` to icon-only nav items in `bottom-nav.component.ts`
5. Fix `sidebar.component.ts:29` alt text: `alt="{{ child.name }}'s avatar"` or similar descriptive text

---

## Summary of Required Changes

### High Priority
- [ ] **i18n:** Add ~25 missing translation keys to `i18n.service.ts` and replace all inline `locale() === 'sq' ? ...` ternaries
- [ ] **Accessibility:** Replace `text-gray-400` with `text-gray-500` across all components for WCAG AA compliance

### Medium Priority
- [ ] **Animation:** Add global `animate-fade-in`, `animate-slide-up`, `card-hover` to `styles.css`
- [ ] **Animation:** Fix `welcome-hero.component.ts:46` from `600ms ease` to `350ms ease-out`
- [ ] **Accessibility:** Add `aria-label` to avatar images, language toggles, and bottom nav

### Low Priority (Nice-to-have)
- [ ] **Animation:** Remove per-component `@keyframes` definitions once global ones are in `styles.css`
