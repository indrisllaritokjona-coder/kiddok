# SPEC — Sprint 4: SidebarComponent

**Version:** 1.0
**Date:** 2026-04-22
**Status:** Ready for Executor
**Sprint:** 4
**Component:** SidebarComponent

---

## 1. Overview

Extract a dedicated `SidebarComponent` from `ShellComponent` for use on desktop layouts. The sidebar replaces the current glassmorphic dark panel with a clean white surface and left gradient border accent. It provides navigation, active child context, locale toggle, and footer actions.

---

## 2. Design Specification

### 2.1 Dimensions

| State | Width |
|-------|-------|
| Compact (default) | 280px |
| Expanded (future toggle) | 320px |

**Height:** Full viewport height (`100dvh`), fixed position.

### 2.2 Visual Style

- **Background:** Solid white (`#FFFFFF`), NO glassmorphism, NO dark overlay
- **Left border accent:** 4px vertical gradient bar on the left edge — primary (#6366F1) to teal (#14B8A6), top-to-bottom
- **Text colors:**
  - Primary text: Charcoal `#1C1917`
  - Secondary/label text: Stone `#78716C`
  - Active item: Primary Indigo `#6366F1`
- **Hover background:** `#F5F5F4` (stone-50), 200ms ease transition
- **Active item background:** `#EEF2FF` (indigo-100), rounded-xl pill

### 2.3 Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Brand logo | Inter | 28px | 800 (Extrabold) |
| Child name | Inter | 16px | 700 |
| Nav item label | Inter | 15px | 600 |
| Age badge | Inter | 11px | 700 |
| Footer label | Inter | 13px | 500 |

### 2.4 Spacing

- **Section padding:** 20px horizontal, 16px vertical
- **Nav item padding:** 12px horizontal, 10px vertical
- **Border radius:** 12px (nav items), 16px (cards), 9999px (pills/badges)

### 2.5 Icons

- **Library:** Google Material Symbols (Outlined variant, 24px, weight 300)
- **Color:** Stone `#78716C` default, Indigo `#6366F1` active

---

## 3. Component Structure

```
SidebarComponent (standalone)
├── Brand row (top)
│   ├── KidDok logo text
│   └── Locale toggle button (SQ/EN switcher)
├── Active child mini-card
│   ├── DiceBear avatar (36px, rounded-full)
│   ├── Child name
│   └── Age badge ("2 vjeç" / "2 years")
├── Navigation list (5 items)
│   └── NavItem × 5 (home, temperature, growth, diary, vaccines)
├── Footer row
│   ├── Settings nav item
│   └── Logout button/icon
```

---

## 4. Sections Detail

### 4.1 Brand Row

- KidDok logo: `"KidDok"` in indigo, bold, 28px
- Locale toggle: small pill button, toggles between `"SQ"` and `"EN"`, calls `i18nService.toggleLocale()`
- Position: top of sidebar, always visible

### 4.2 Active Child Mini-Card

- **Avatar:** DiceBear Notionists API — `https://api.dicebear.com/7.x/notionists/svg?seed={childId}`
  - Size: 36px × 36px, rounded-full, border: 2px solid indigo-200
- **Child name:** Full name, bold, stone-900
- **Age badge:** Pill badge, indigo-100 background, indigo-700 text, format: `"2 vjeç"` (SQ) / `"2 years"` (EN)
- **Data source:** Reads `selectedChild()` signal from `DataService`
- **No child selected:** Show placeholder card with "Zidhni Profilin" / "Select Profile" and a dashed border

### 4.3 Navigation Items

| Tab ID | Icon | SQ Label | EN Label |
|--------|------|---------|---------|
| home | `home` | Ekrani Kryesor | Dashboard |
| temperature | `thermostat` | Temperatura | Temperature |
| growth | `trending_up` | Rritja | Growth |
| diary | `edit_document` | Ditari | Diary |
| vaccines | `vaccines` | Vaksinat | Vaccines |

**Active state:**
- Left accent bar: 4px indigo bar on left edge of item
- Background pill: `bg-indigo-100`, border-radius `12px`
- Icon + text color: `text-indigo-600`

**Hover state:**
- Background: `bg-stone-50`, 200ms ease transition

**Implementation:**
- Reads `currentTab` signal (injected from parent or passed as input)
- Calls `navigateTo(tab)` method (bound from ShellComponent)
- Both `currentTab` signal and `navigateTo()` method are injected/passed into the sidebar

### 4.4 Footer

- **Settings item:** `settings` icon + `"Konfigurime"` / `"Settings"`, navigates to settings tab
- **Logout:** Icon-only (`logout`) or text label, triggers logout action

---

## 5. New i18n Keys

```typescript
// Section headers
'sidebar.brand': { sq: 'KidDok', en: 'KidDok' }
'sidebar.activeChild': { sq: 'Fëmija Aktiv', en: 'Active Child' }
'sidebar.noChildSelected': { sq: 'Zgjidhni Profilin', en: 'Select Profile' }

// Age format
'sidebar.ageFormat': { sq: '{n} vjeç', en: '{n} years' }
'sidebar.ageFormatMonths': { sq: '{n} muaj', en: '{n} months' }

// Nav items
'sidebar.nav.home': { sq: 'Ekrani Kryesor', en: 'Dashboard' }
'sidebar.nav.temperature': { sq: 'Temperatura', en: 'Temperature' }
'sidebar.nav.growth': { sq: 'Rritja', en: 'Growth' }
'sidebar.nav.diary': { sq: 'Ditari', en: 'Diary' }
'sidebar.nav.vaccines': { sq: 'Vaksinat', en: 'Vaccines' }
'sidebar.nav.settings': { sq: 'Konfigurime', en: 'Settings' }

// Footer
'sidebar.footer.settings': { sq: 'Konfigurime', en: 'Settings' }
'sidebar.footer.logout': { sq: 'Dilni', en: 'Logout' }
```

---

## 6. Inputs / Outputs / Bindings

```typescript
// Inputs
currentTab: InputSignal<string>    // bound to shell's currentTab signal
selectedChild: InputSignal<ChildProfile | null>  // from DataService.selectedChild()

// Outputs
tabChange: OutputEmitter<string>   // emits when nav item clicked

// Method binding (passed from parent)
navigateTo: (tab: string) => void  // bound to shell's navigateTo method
```

**Alternative (simpler):** SidebarComponent is injected with `DataService` directly and reads `currentTab` signal + calls `navigateTo()` internally. No inputs needed.

---

## 7. File Structure

```
src/app/components/sidebar/
├── sidebar.component.ts        # Standalone component
├── sidebar.component.html     # Template
├── sidebar.component.css      # Component-scoped styles
└── sidebar.component.spec.ts  # Unit tests
```

---

## 8. Template Structure

```html
<aside class="sidebar">
  <!-- Brand row -->
  <div class="sidebar__brand">
    <span class="sidebar__logo">KidDok</span>
    <button class="locale-toggle" (click)="toggleLocale()">
      {{ currentLocale === 'sq' ? 'EN' : 'SQ' }}
    </button>
  </div>

  <!-- Active child mini-card -->
  <div class="sidebar__child-card" [class.sidebar__child-card--empty]="!activeChild()">
    @if (activeChild()) {
      <img [src]="avatarUrl(activeChild()!.id)" class="sidebar__avatar" alt="avatar" />
      <div class="sidebar__child-info">
        <span class="sidebar__child-name">{{ activeChild()!.name }}</span>
        <span class="sidebar__age-badge">{{ ageLabel(activeChild()!) }}</span>
      </div>
    } @else {
      <div class="sidebar__child-placeholder">
        <span>{{ t['sidebar.noChildSelected'] }}</span>
      </div>
    }
  </div>

  <!-- Nav items -->
  <nav class="sidebar__nav">
    @for (item of navItems; track item.id) {
      <button
        class="sidebar__nav-item"
        [class.sidebar__nav-item--active]="currentTab() === item.id"
        (click)="navigateTo(item.id)">
        <span class="material-icons">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </button>
    }
  </nav>

  <!-- Footer -->
  <div class="sidebar__footer">
    <button class="sidebar__footer-item" (click)="navigateTo('settings')">
      <span class="material-icons">settings</span>
      <span>{{ t['sidebar.footer.settings'] }}</span>
    </button>
    <button class="sidebar__footer-item sidebar__footer-item--logout" (click)="logout()">
      <span class="material-icons">logout</span>
      <span>{{ t['sidebar.footer.logout'] }}</span>
    </button>
  </div>
</aside>
```

---

## 9. CSS (Tailwind + component styles)

```css
.sidebar {
  @apply w-[280px] h-full bg-white flex flex-col relative;
  /* Left gradient border accent */
  border-left: 4px solid;
  border-image: linear-gradient(to bottom, #6366F1, #14B8A6) 1;
}

.sidebar__brand {
  @apply flex items-center justify-between px-5 py-5;
}

.sidebar__logo {
  @apply text-[28px] font-extrabold text-indigo-600 tracking-tight;
}

.locale-toggle {
  @apply text-xs font-bold px-2.5 py-1 rounded-full bg-stone-100 text-stone-600
         hover:bg-stone-200 transition-colors duration-200 cursor-pointer;
}

.sidebar__child-card {
  @apply flex items-center gap-3 mx-4 px-4 py-3 rounded-2xl bg-stone-50 border-2 border-dashed border-stone-200;
}

.sidebar__child-card--empty {
  @apply border-dashed;
}

.sidebar__child-card:not(.sidebar__child-card--empty) {
  @apply border-indigo-100 bg-white;
}

.sidebar__avatar {
  @apply w-9 h-9 rounded-full border-2 border-indigo-200;
}

.sidebar__child-name {
  @apply text-base font-bold text-stone-900;
}

.sidebar__age-badge {
  @apply text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700;
}

.sidebar__nav {
  @apply flex-1 flex flex-col gap-1 px-3 py-4 overflow-y-auto;
}

.sidebar__nav-item {
  @apply flex items-center gap-3 px-4 py-3 rounded-xl text-stone-600
         hover:bg-stone-50 transition-all duration-200 cursor-pointer
         text-left w-full border-none bg-transparent;
}

.sidebar__nav-item--active {
  @apply bg-indigo-100 text-indigo-600;
  /* Left accent bar via pseudo-element or inner span */
  box-shadow: inset 4px 0 0 #6366F1;
}

.sidebar__nav-item--active .material-icons,
.sidebar__nav-item--active span:last-child {
  @apply text-indigo-600;
}

.sidebar__footer {
  @apply px-3 pb-6 pt-4 border-t border-stone-100 flex flex-col gap-1;
}

.sidebar__footer-item {
  @apply flex items-center gap-3 px-4 py-2.5 rounded-xl text-stone-500
         hover:bg-stone-50 hover:text-stone-700 transition-all duration-200 cursor-pointer
         text-left w-full border-none bg-transparent text-sm;
}

.sidebar__footer-item--logout {
  @apply text-rose-500 hover:bg-rose-50 hover:text-rose-600;
}
```

---

## 10. TypeScript

```typescript
import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { ChildProfile } from '../../models/child-profile.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private dataService = inject(DataService);
  protected i18n = inject(I18nService);

  activeChild = this.dataService.selectedChild;
  currentTab = this.dataService.currentTab;
  t = this.i18n.translations;

  navItems = [
    { id: 'home', icon: 'home', label: computed(() => this.t()['sidebar.nav.home']) },
    { id: 'temperature', icon: 'thermostat', label: computed(() => this.t()['sidebar.nav.temperature']) },
    { id: 'growth', icon: 'trending_up', label: computed(() => this.t()['sidebar.nav.growth']) },
    { id: 'diary', icon: 'edit_document', label: computed(() => this.t()['sidebar.nav.diary']) },
    { id: 'vaccines', icon: 'vaccines', label: computed(() => this.t()['sidebar.nav.vaccines']) },
  ];

  currentLocale = this.i18n.currentLocale;

  avatarUrl(childId: string): string {
    return `https://api.dicebear.com/7.x/notionists/svg?seed=${childId}`;
  }

  ageLabel(child: ChildProfile): string {
    const age = this.dataService.getChildAge(child);
    const unit = age.years >= 1
      ? this.i18n.t()['sidebar.ageFormat'].replace('{n}', String(age.years))
      : this.i18n.t()['sidebar.ageFormatMonths'].replace('{n}', String(age.months));
    return unit;
  }

  toggleLocale(): void {
    this.i18n.toggleLocale();
  }

  navigateTo(tab: string): void {
    this.dataService.navigateTo(tab);
  }

  logout(): void {
    this.dataService.logout();
  }
}
```

---

## 11. Integration

- `SidebarComponent` is imported directly into `ShellComponent`
- No routing changes needed — sidebar uses existing `navigateTo(tab)` from `DataService`
- `DataService.currentTab` signal drives active state
- Locale toggle calls `i18nService.toggleLocale()` (already wired)

---

## 12. Acceptance Criteria

- [ ] Sidebar renders at 280px width, white background, left gradient border accent
- [ ] Brand row shows "KidDok" logo + SQ/EN toggle button
- [ ] Active child mini-card shows avatar, name, age badge from `selectedChild()` signal
- [ ] Placeholder card shown when no child selected (dashed border)
- [ ] All 5 nav items render with correct Material Symbol icons and labels
- [ ] Active item shows indigo background pill + left accent bar
- [ ] Hover state transitions smoothly (200ms ease)
- [ ] Footer shows Settings + Logout with correct icons and labels
- [ ] All strings use i18n keys (no hardcoded SQ or EN)
- [ ] Component is standalone (no NgModule)
- [ ] No glassmorphism, no dark background, no medical image overlay
