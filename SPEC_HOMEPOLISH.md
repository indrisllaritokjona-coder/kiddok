# Sprint 11 — HomePage Sub-components Polish

## Overview
Enhance the existing `WelcomeHeroComponent` and `QuickActionsGridComponent` with better animations, responsiveness, polish, and time-aware greetings. No structural changes — purely visual/UX improvements.

---

## 1. WelcomeHeroComponent Enhancements

**File:** `src/app/components/home/welcome-hero.component.ts`

### 1.1 Time-Aware Greeting (Albanian-first, English fallback)

| Time of Day | Hours | Albanian | English |
|-------------|-------|----------|---------|
| Morning | 07:00–11:59 | Mirëmëngjes | Good morning |
| Afternoon | 12:00–17:59 | Mirëditë | Good afternoon |
| Evening | 18:00–21:59 | Mirëmbrëma | Good evening |
| Night | 22:00–06:59 | Natën e mirë | Good night |

The existing `timeGreeting()` computed must be updated to use this 4-state logic (currently only morning/afternoon/evening). Night state must be added.

Update `timeIcon()` mapping accordingly:
- Morning → `wb_sunny`
- Afternoon → `wb_twilight`
- Evening → `nightlight_round`
- Night → `bedtime` (new icon for night)

### 1.2 Animated Background (CSS Keyframe — no JS)

Replace the static `opacity-10` blob pattern with a CSS `@keyframes` animated gradient background.

**CSS:**
```css
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

The container already has `bg-gradient-to-br from-primary-500 via-primary-600 to-teal-500`. Add `background-size: 200% 200%` and `animation: gradientShift 8s ease infinite` for a subtle shimmer effect.

Blurred decorative blobs can remain but should be slightly animated too (translate/fade).

### 1.3 Weather Integration Placeholder

Add a placeholder slot in the hero for future weather data:

```html
<!-- After date display, small weather pill -->
<div class="hidden md:flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm text-white/90">
  <span class="material-icons text-sm">wb_cloudy</span>
  <span>--°C</span>
</div>
```

The weather state (icon, temperature, location) will be a `signal<WeatherData | null>` initialized to `null`. Expose `weather()` signal for future service injection. Do NOT call any weather API — just the placeholder UI.

### 1.4 Better No-Child State

Replace the flat dashed-border no-child card with a warmer, illustration-style card:

- Use an inline SVG or Emoji illustration for warmth (e.g., 👶 or a custom SVG)
- Add a friendly CTA: `{{ i18n.t()['home.addFirstChild'] }}`
- Keep existing `home.welcome.addChild` text but make it more prominent
- Card background: soft gradient from `primary-50` to `primary-100`, rounded-3xl

### 1.5 i18n Keys (WelcomeHero)

| Key | SQ | EN |
|-----|----|----|
| `home.greeting.morning` | Mirëmëngjes | Good morning |
| `home.greeting.afternoon` | Mirëditë | Good afternoon |
| `home.greeting.evening` | Mirëmbrëma | Good evening |
| `home.greeting.night` | Natën e mirë | Good night |
| `home.addFirstChild` | Shto fëmijën e parë | Add your first child |
| `home.welcome.subtitle` | Të dhënat e tua mjekësore në një vend | Your medical records in one place |

---

## 2. QuickActionsGridComponent Polish

**File:** `src/app/components/home/quick-actions-grid.component.ts`

### 2.1 Card Press Animation

Add `active:scale-95 transition-transform` to buttons via Tailwind classes. Already has `:active` in styles — add the Tailwind utility for consistency:

```html
<button
  class="... active:scale-95 transition-transform ..."
```

### 2.2 Badge Pulse Animation

Badges with counts should gently pulse. Add CSS:

```css
@keyframes pulse-badge {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}
.badge-pulse { animation: pulse-badge 2s ease-in-out infinite; }
```

Apply `badge-pulse` class to badges where `badge > 0`. Badge renders as:

```html
@if (action.badge > 0) {
  <span class="... badge-pulse">...</span>
}
```

### 2.3 Hover Lift Effect (already partially implemented)

Enhance hover to use exact spec values:
- `hover:shadow-xl` (not `hover:shadow-lg`)
- `hover:-translate-y-1` (4px lift, not 2px — update from existing 4px in styles)
- Add `transition-shadow` to ensure shadow animates smoothly

### 2.4 Keyboard Navigation

Each button needs:
- `tabindex="0"` (already focusable via `button` tag)
- `role="button"` (implicit on `<button>`)
- On Enter/Space: trigger navigate

Use Angular's `@HostListener` or `(keydown.enter)` binding. Simpler approach — just ensure `type="button"` to prevent form submission issues, and add:

```html
(keydown.enter)="navigate(action.route)"
(keydown.space)="navigate(action.route)"
```

Or add to host via `@HostListener('keydown', ['$event'])`.

### 2.5 Icon Color Precision

Icon color class currently uses generic `text-primary-500`. Make it match card accent:

- Temperature card: `text-orange-500` (already correct)
- Growth card: `text-teal-500` (already correct)
- Diary card: `text-primary-500` (already correct)
- Vaccines card: `text-purple-500` (already correct)

Ensure the icon circle background and icon color are consistent with the `color` property.

---

## 3. Shared Animation System

**File:** `src/styles.css` (global styles)

Add these keyframes once, reuse in both components:

```css
/* Staggered entry animation */
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

/* Gentle badge pulse for alerts */
@keyframes pulse-subtle {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.15); opacity: 0.9; }
}

/* Subtle gradient shimmer for hero background */
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

Usage:
- `WelcomeHeroComponent` uses `fadeInUp` for staggered content entry (stagger via `--stagger` CSS variable)
- `QuickActionsGridComponent` badges use `pulse-subtle` for the badge pulse
- `WelcomeHeroComponent` background uses `gradientShift`

---

## 4. Acceptance Criteria

### WelcomeHeroComponent
- [ ] Greeting switches correctly at 07:00, 12:00, 18:00, 22:00 boundaries
- [ ] Night greeting shows "Natën e mirë" / "Good night" for 22:00–06:59
- [ ] Background gradient animates subtly (CSS keyframe, no JS)
- [ ] Weather placeholder pill visible (hidden on mobile)
- [ ] No-child state shows warm illustration + "Shto fëmijën e parë" CTA
- [ ] All new i18n keys present in translation files

### QuickActionsGridComponent
- [ ] Cards scale down to 95% on press (active:scale-95)
- [ ] Badges with count > 0 pulse gently
- [ ] Hover lifts card with shadow-xl and -translate-y-1
- [ ] Enter/Space key triggers navigation when button is focused
- [ ] Icon colors match card accent color precisely

### Shared
- [ ] `fadeInUp` keyframe defined in global styles
- [ ] `pulse-subtle` keyframe defined in global styles
- [ ] `gradientShift` keyframe defined in global styles
- [ ] Stagger animation uses CSS variable `--stagger` delay

---

## 5. File Changes

| File | Change |
|------|--------|
| `src/styles.css` | Add 3 keyframes + stagger utility |
| `src/app/components/home/welcome-hero.component.ts` | Time-aware greeting (4 states), animated bg, weather placeholder, no-child illustration |
| `src/app/components/home/quick-actions-grid.component.ts` | Badge pulse, press animation, keyboard nav |
| `src/assets/i18n/sq.json` | Add 6 new keys |
| `src/assets/i18n/en.json` | Add 6 new keys |