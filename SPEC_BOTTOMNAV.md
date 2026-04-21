# SPEC — BottomNavComponent (Sprint 6)

**File:** `SPEC_BOTTOMNAV.md`  
**Author:** kiddok-architect  
**Date:** 2026-04-22  
**Status:** Approved  

---

## 1. Overview

**Component:** `BottomNavComponent`  
**Type:** Mobile-only navigation component  
**Purpose:** Provide a 5-tab bottom tab bar for mobile devices (< 1024px), replacing the sidebar navigation on small screens.  
**Sprint:** 6

---

## 2. Design Specification

### 2.1 Layout

| Property | Value |
|----------|-------|
| Visibility | `display: none` on ≥1024px (`lg:hidden`) |
| Position | `fixed bottom-0` |
| Width | `w-full` |
| Z-index | `z-50` |
| Background | `bg-white` |
| Top border | `border-t border-stone-200` |
| Height | `h-16` (~64px) |
| Flex layout | `flex flex-row` — 5 equal-width tabs |

### 2.2 Tab Configuration

| Tab ID | Icon (Material Symbols) | SQ Label | EN Label |
|--------|-------------------------|----------|---------|
| `home` | `home` | Ballina | Home |
| `temperature` | `thermostat` | Temperatura | Temperature |
| `growth` | `trending_up` | Rritja | Growth |
| `diary` | `edit_document` | Ditari | Diary |
| `vaccines` | `vaccines` | Vaksinat | Vaccines |

### 2.3 Tab Item Design

Each tab is a `<button>` element with:
- **Flex container:** `flex flex-col items-center justify-center gap-1 flex-1 h-full`
- **Icon:** Material Symbols outlined, 24px, weight 300 — `text-stone-500` default, `text-indigo-600` active
- **Label:** Inter 12px/600 — `text-stone-500` default, `text-indigo-600` active
- **Active indicator:** Active tab gets indigo icon + indigo label. No underline/divider needed since the indigo color alone signals active state.
- **Padding:** `py-2 px-1` — touch target ≥ 44px height
- **Transition:** `transition-colors duration-200`

### 2.4 Active State Logic

- Read `currentTab` from `DataService` (signal `<string>`)
- Compare each tab's `id` against `currentTab()`
- Active tab: `text-indigo-600` on both icon and label
- Inactive tab: `text-stone-500` on both icon and label

### 2.5 Interaction

- **Tap:** Dispatch `kiddok:navigate` custom event with `detail: { tabId: 'home' | 'temperature' | 'growth' | 'diary' | 'vaccines' }`
- **Pattern:** Same as existing sidebar navigation (see `SidebarComponent` for reference)
- **No nested navigation** in bottom nav — all tabs lead to top-level pages

---

## 3. Implementation Specification

### 3.1 Component Metadata

```typescript
// bottom-nav.component.ts
@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.css'
})
export class BottomNavComponent {
  currentTab = inject(DataService).currentTab; // Signal<string>

  navigate(tabId: string) {
    window.dispatchEvent(new CustomEvent('kiddok:navigate', { detail: { tabId } }));
  }
}
```

### 3.2 Template Structure

```html
<nav class="lg:hidden fixed bottom-0 w-full bg-white border-t border-stone-200 z-50">
  <div class="flex flex-row h-16">
    @for (tab of tabs; track tab.id) {
      <button
        class="flex flex-col items-center justify-center gap-1 flex-1 h-full py-2 px-1 transition-colors duration-200"
        [class.text-indigo-600]="currentTab() === tab.id"
        [class.text-stone-500]="currentTab() !== tab.id"
        (click)="navigate(tab.id)">
        <span class="material-symbols-outlined text-2xl">{{ tab.icon }}</span>
        <span class="text-xs font-semibold">{{ tab.label }}</span>
      </button>
    }
  </div>
</nav>
```

### 3.3 Component Logic (TypeScript)

```typescript
tabs = [
  { id: 'home', icon: 'home', label: this.i18n.t()['bottomNav.home'] },
  { id: 'temperature', icon: 'thermostat', label: this.i18n.t()['bottomNav.temperature'] },
  { id: 'growth', icon: 'trending_up', label: this.i18n.t()['bottomNav.growth'] },
  { id: 'diary', icon: 'edit_document', label: this.i18n.t()['bottomNav.diary'] },
  { id: 'vaccines', icon: 'vaccines', label: this.i18n.t()['bottomNav.vaccines'] }
];
```

Labels are reactive — resolved at construction time from `I18nService`.

### 3.4 File Structure

```
src/app/components/bottom-nav/
├── bottom-nav.component.ts    # Standalone component
├── bottom-nav.component.html  # Template
└── bottom-nav.component.css   # (minimal, mostly Tailwind)
```

### 3.5 CSS

Minimal CSS needed — Tailwind handles everything. Only add:
- `button { appearance: none; background: none; border: none; cursor: pointer; }` (reset)
- Safe-area padding for iOS home indicator: `pb-safe` or `padding-bottom: env(safe-area-inset-bottom)`

---

## 4. i18n Keys

Add to `i18n.service.ts`:

```typescript
'bottomNav.home':         { sq: 'Ballina',    en: 'Home' },
'bottomNav.temperature':  { sq: 'Temperatura', en: 'Temperature' },
'bottomNav.growth':       { sq: 'Rritja',     en: 'Growth' },
'bottomNav.diary':        { sq: 'Ditari',     en: 'Diary' },
'bottomNav.vaccines':     { sq: 'Vaksinat',   en: 'Vaccines' },
```

---

## 5. Integration Points

### 5.1 ShellComponent

- Add `<app-bottom-nav />` to `shell.component.html`
- Position: after `<router-outlet>` and page content, before closing `</div>` of main content area
- Must be outside scrollable content so it stays fixed at viewport bottom

### 5.2 DataService

- Ensure `currentTab` signal exists and is initialized to `'home'`
- Ensure `kiddok:navigate` event listener updates `currentTab` (handled in ShellComponent)

### 5.3 Routing

No routing changes needed — `kiddok:navigate` custom event drives navigation, same as sidebar. Ensure routes for all 5 tabs exist:
- `/` → HomePageComponent
- `/temperature` → TemperaturePageComponent
- `/growth` → GrowthPageComponent
- `/diary` → DiaryPageComponent
- `/vaccines` → VaccinesPageComponent

---

## 6. Edge Cases

| Scenario | Behavior |
|----------|----------|
| No `currentTab` signal | Default to `'home'` |
| Unknown tab id in navigate event | Ignore silently |
| Long label text | Text truncation with ellipsis (`max-w-[60px] truncate`) |
| iOS home indicator | Add `padding-bottom: env(safe-area-inset-bottom)` |
| Very small screen (< 320px) | Labels may truncate — acceptable |

---

## 7. Acceptance Criteria

- [ ] Component renders 5 tabs on screens < 1024px
- [ ] Component hidden on screens ≥ 1024px (`lg:hidden`)
- [ ] Active tab icon and label use indigo color
- [ ] Tapping tab dispatches `kiddok:navigate` with correct tab id
- [ ] All labels are bilingual (SQ/EN) via I18nService
- [ ] Fixed to bottom of viewport across scroll
- [ ] Touch target ≥ 44px for accessibility
- [ ] Icon uses Material Symbols outlined variant, 24px
- [ ] No layout shift or jank on tab switch

---

## 8. Dependencies

- `DataService` — `currentTab` signal
- `I18nService` — translation strings
- Material Symbols font loaded globally (already present)
- Tailwind CSS (already present)
- Angular standalone components