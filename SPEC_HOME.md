# SPEC — HomePageComponent Redesign (Sprint 3)

**Sprint:** 3  
**Architect:** kiddok-architect  
**Date:** 2026-04-22  
**Status:** Draft — Ready for Executor  

---

## 1. Overview

The HomePageComponent gets a complete redesign to become the central dashboard for parents. The new layout is warm, scannable, and action-oriented — allowing a busy parent to assess their child's health status in under 5 seconds.

### Design Goals

- **Speed-to-clarity:** Greet → assess status → take action in ≤5 seconds
- **Warm and reassuring:** Not clinical, not cold; feels like a parenting journal
- **Action-first:** Quick-action cards are the primary navigation, not a sidebar list
- **Alert-aware:** Critical health items (fever, overdue vaccines) surface immediately

---

## 2. Page Layout

```
┌─────────────────────────────────────┐
│ [Sidebar slot — placeholder for now] │
│ ┌───────────────────────────────────┐│
│ │        WelcomeHeroComponent       ││
│ │  Avatar + "Mirësevje, [Name]!"   ││
│ │  "Age segment" chip               ││
│ └───────────────────────────────────┘│
│ ┌───────────────────────────────────┐│
│ │    QuickActionsGridComponent      ││
│ │  [Temp]  [Growth]  [Diary] [Vacc] ││
│ └───────────────────────────────────┘│
│ ┌───────────────────────────────────┐│
│ │   HealthAlertCardComponent        ││
│ │  (only visible when alerts exist) ││
│ └───────────────────────────────────┘│
│ ┌───────────────────────────────────┐│
│ │   RecentActivityFeedComponent     ││
│ │  Timeline: temp + growth entries   ││
│ └───────────────────────────────────┘│
└─────────────────────────────────────┘
```

### 2.1 WelcomeHeroComponent

**Purpose:** Personalized greeting anchoring the page top.

**Visual:**
- Left: Child avatar (DiceBear Notionists, 56px, rounded-full, border-2 border-indigo-100)
- Center: Greeting text ("Mirësevje, Emma!" / "Welcome, Emma!") — 24px font-bold, Charcoal
- Below greeting: Age chip (e.g., "2 vjeç" / "2 years old") — small indigo pill badge
- Right: Large contextual icon (sun/moon based on time of day)

**Behavior:**
- Reads `selectedChild` from DataService
- If no child selected → shows "Mirësevje!" generic greeting + "Shto fëmijën" CTA
- Greeting uses time-of-day-aware message (morning/afternoon/evening) via i18n key `home.welcome.greeting`
- Avatar click → opens Child Selector

**i18n keys:**
```
home.welcome.greeting: { sq: 'Mirësevje, {name}!', en: 'Welcome, {name}!' }
home.welcome.greetingNoChild: { sq: 'Mirësevje!', en: 'Welcome!' }
home.welcome.ageYears: { sq: '{n} vjeç', en: '{n} years old' }
home.welcome.ageMonths: { sq: '{n} muaj', en: '{n} months old' }
home.welcome.addChild: { sq: 'Shto fëmijën', en: 'Add child' }
home.welcome.morning: { sq: 'Mirëmëngjes', en: 'Good morning' }
home.welcome.afternoon: { sq: 'Mirëmbrëma', en: 'Good afternoon' }
home.welcome.evening: { sq: 'Natën e mirë', en: 'Good evening' }
```

**States:**
- **With child:** Full hero with avatar, personalized greeting, age chip
- **No child:** Generic greeting, prominent "Add child" card (dashed border, soft indigo background)

---

### 2.2 QuickActionsGridComponent

**Purpose:** 4 primary action cards replacing the sidebar nav as the main navigation on mobile and desktop. Each card links to a module.

**Layout:** 2×2 grid (desktop: 4 columns in a row, tablet: 2×2, mobile: 2×2 stacked).

**Cards:**

| Card | Icon (Material Symbols) | Color | SQ Label | EN Label | Badge |
|------|------------------------|-------|----------|----------|-------|
| Temperature | `thermostat` | Coral (#F97316) | Temperatura | Temperature | (fever count if any) |
| Growth | `trending_up` | Teal (#14B8A6) | Rritja | Growth | — |
| Diary | `edit_document` | Indigo (#6366F1) | Ditari | Diary | — |
| Vaccines | `vaccines` | Soft Purple (#8B5CF6) | Vaksinat | Vaccines | (overdue count) |

**Card Design:**
- Size: equal-width cards in a responsive grid
- Background: Pure White (`#FFFFFF`)
- Border: 1px `#E7E5E4`, border-radius 16px
- Padding: 20px
- Icon: 32px, colored background circle (20% opacity tint of icon color)
- Title: 16px font-semibold, Charcoal
- Subtitle: 13px font-normal, Stone
- Hover: translateY(-4px), box-shadow `0 12px 24px -8px rgba(0,0,0,0.15)`, 200ms ease
- Active/press: scale(0.98), 100ms

**Badge (notification dot):**
- Position: top-right corner of card
- Size: 18px circle
- Color: Coral (#F97316) for fever count, Danger (#E11D48) for overdue vaccines
- Count: 1–99, if 99+ show "99+"

**i18n keys:**
```
home.quickActions.title: { sq: 'Veprimet e Shpejta', en: 'Quick Actions' }
home.quickActions.temperature: { sq: 'Temperatura', en: 'Temperature' }
home.quickActions.temperatureDesc: { sq: 'Monitoroni temperaturën', en: 'Track temperature' }
home.quickActions.growth: { sq: 'Rritja', en: 'Growth' }
home.quickActions.growthDesc: { sq: 'Gjatësia dhe pesha', en: 'Height & weight' }
home.quickActions.diary: { sq: 'Ditari', en: 'Diary' }
home.quickActions.diaryDesc: { sq: 'Simptomat dhe shënime', en: 'Symptoms & notes' }
home.quickActions.vaccines: { sq: 'Vaksinat', en: 'Vaccines' }
home.quickActions.vaccinesDesc: { sq: 'Planet dhe alertet', en: 'Schedule & alerts' }
```

**Empty states per card:**
- Temperature: "Shtoni leximin e parë" / "Add first reading"
- Growth: "Shtoni matjen e parë" / "Add first measurement"
- Diary: "Shënoni ditën e parë" / "Log first day"
- Vaccines: "Shtoni orarin e vaksinave" / "Add vaccine schedule"

---

### 2.3 HealthAlertCardComponent

**Purpose:** Surfacing urgent health items that need attention — fever, overdue vaccines, abnormal readings.

**Visibility:** Only rendered when 1+ health alert is active. Smooth slide-down animation when appearing.

**Layout:** Full-width card at top of content area (below QuickActionsGrid on mobile).

**Alert Types:**

| Alert | Priority | Background | Icon | Color |
|-------|----------|------------|------|-------|
| Fever (≥38.0°C) | HIGH | `bg-rose-50 border border-rose-200` | `warning` | `rose-500` |
| Overdue vaccine | HIGH | `bg-orange-50 border border-orange-200` | `vaccines` | `orange-500` |
| Recent abnormal reading | MEDIUM | `bg-amber-50 border border-amber-200` | `trending_up` | `amber-500` |

**Card Content (per alert):**
- Left: Icon in colored circle (32px)
- Center: Bold alert title + descriptive subtext (time/dose info)
- Right: "Merrni masë" / "Take action" button → navigates to relevant page

**Multiple alerts:** Stack vertically with 12px gap between them.

**i18n keys:**
```
home.alerts.title: { sq: 'Alerte Shëndetësore', en: 'Health Alerts' }
home.alerts.fever: { sq: 'Temperatura e lartë!', en: 'Fever detected!' }
home.alerts.feverDesc: { sq: '{value}°C — u matur {time}', en: '{value}°C — measured {time}' }
home.alerts.overdueVaccine: { sq: 'Vaksina e vonuar', en: 'Overdue vaccine' }
home.alerts.overdueVaccineDesc: { sq: '{name} — e vonuar {days} ditë', en: '{name} — {days} days overdue' }
home.alerts.abnormalReading: { sq: 'Lexim i pazakontë', en: 'Abnormal reading' }
home.alerts.abnormalReadingDesc: { sq: '{type} jashtë normës', en: '{type} out of range' }
home.alerts.takeAction: { sq: 'Merrni masë', en: 'Take action' }
home.alerts.viewDetails: { sq: 'Shiko detajet', en: 'View details' }
```

**Alert Detection Logic:**
```typescript
// Alert signals computed from data
hasFeverAlert = computed(() => {
  const latest = latestTemperature();
  return latest && latest.value >= 38.0;
});
overdueVaccineCount = computed(() => 
  vaccines().filter(v => v.status === 'overdue').length
);
```

---

### 2.4 RecentActivityFeedComponent

**Purpose:** A merged timeline of recent entries from Temperature, Growth, and Diary modules, sorted by date descending.

**Layout:** Vertical scrolling list with date-grouped entries.

**Entry Card (per item):**
- Left: Icon representing type (thermostat / trending_up / edit_note)
- Left accent: 3px colored bar matching module color (temp=coral, growth=teal, diary=indigo)
- Center: Entry title + value + time ago (e.g., "2 orë më parë" / "2 hours ago")
- Right: Chevron icon for navigation to detail
- Tap: Navigate to full entry in module

**Grouped by date:**
- "Today" header — entries from today
- "Yesterday" header — entries from yesterday
- "This Week" header — entries from past 7 days
- Date: DD/MM/YYYY (SQ) or MM/DD/YYYY (EN)

**Staggered animation:** 50ms delay per item, fade + slide-up from bottom.

**i18n keys:**
```
home.recentActivity.title: { sq: 'Aktiviteti i Funts', en: 'Recent Activity' }
home.recentActivity.empty: { sq: 'Nuk ka aktivitet ende', en: 'No activity yet' }
home.recentActivity.emptyDesc: { sq: 'Shtoni të parën duke përdorur veprimet e shpejta', en: 'Add your first entry using quick actions' }
home.recentActivity.today: { sq: 'Sot', en: 'Today' }
home.recentActivity.yesterday: { sq: 'Dje', en: 'Yesterday' }
home.recentActivity.thisWeek: { sq: 'Këtë javë', en: 'This week' }
home.recentActivity.earlier: { sq: 'Më herët', en: 'Earlier' }
home.recentActivity.hoursAgo: { sq: '{n} orë më parë', en: '{n} hours ago' }
home.recentActivity.minutesAgo: { sq: '{n} minuta më parë', en: '{n} minutes ago' }
home.recentActivity.daysAgo: { sq: '{n} ditë më parë', en: '{n} days ago' }
home.recentActivity.tempRecorded: { sq: 'Temperatura u regjistrua', en: 'Temperature recorded' }
home.recentActivity.growthUpdated: { sq: 'Rritja u përditësua', en: 'Growth updated' }
home.recentActivity.diaryEntry: { sq: 'Ditar i ri', en: 'New diary entry' }
```

**Merge Logic:**
```typescript
// Merged activity timeline
activityTimeline = computed(() => {
  const temps = recentTemperatures().map(t => ({
    type: 'temperature' as const,
    id: t.id,
    date: new Date(t.measuredAt),
    title: i18n.t()['home.recentActivity.tempRecorded'],
    value: `${t.value}°C`,
    icon: 'thermostat',
    color: t.value >= 38.0 ? '#F97316' : '#14B8A6',
  }));
  const growths = recentGrowth().map(g => ({
    type: 'growth' as const,
    id: g.id,
    date: new Date(g.date),
    title: i18n.t()['home.recentActivity.growthUpdated'],
    value: g.heightCm ? `${g.heightCm}cm` : `${g.weightKg}kg`,
    icon: 'trending_up',
    color: '#14B8A6',
  }));
  return [...temps, ...growths]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 10); // max 10 items
});
```

**Empty State:**
- Soft illustration (child-friendly, warm colors)
- Message: `home.recentActivity.empty`
- Sub-message: `home.recentActivity.emptyDesc`
- CTA button: "Shto fëmijën e parë" → child selector

---

## 3. Component Architecture

### 3.1 File Structure

```
src/app/
└── features/
    └── home/
        ├── home.routes.ts              (routing config)
        ├── home.routes.ts
        ├── welcome-hero/
        │   └── welcome-hero.component.ts
        ├── quick-actions-grid/
        │   └── quick-actions-grid.component.ts
        ├── health-alert-card/
        │   └── health-alert-card.component.ts
        └── recent-activity-feed/
            └── recent-activity-feed.component.ts
```

**No new route needed** — HomePageComponent is rendered inside ShellComponent at the `/home` route.

### 3.2 Standalone Component Pattern

All 4 components are standalone Angular components:

```typescript
// welcome-hero.component.ts
@Component({
  selector: 'app-welcome-hero',
  standalone: true,
  templateUrl: './welcome-hero.component.html',
  styleUrls: ['./welcome-hero.component.css'],
  imports: [I18nService, DatePipe, MaterialModule],
})
export class WelcomeHeroComponent {
  selectedChild = input.required<Child | null>();
  greeting$ = computed(() => /* time-aware greeting */);
}
```

### 3.3 DataService Integration

Components pull from these existing DataService signals:

```typescript
// DataService signals (already exist)
selectedChild: Signal<Child | null>
recentTemperatures: Signal<TemperatureEntry[]>  // last 10
recentGrowth: Signal<GrowthEntry[]>              // last 10
vaccines: Signal<VaccineAlert[]>
```

Components should use `computed()` signals to derive state — no direct subscription.

### 3.4 Sidebar Integration (Sprint 4 placeholder)

The HomePage currently uses `ShellComponent` as its parent. The `SidebarComponent` is being built in Sprint 4. Until then, HomePage renders with the existing sidebar structure (no structural changes needed — the HomePage components simply go into the main content area).

For the Sprint 3 implementation, assume `SidebarComponent` is already present and working. The HomePage content fills the area to the right of the sidebar.

---

## 4. i18n Implementation

### 4.1 Translation Key Structure

All i18n keys live under the `home.*` namespace. Keys are registered in `I18nService` via the existing `keys` object pattern.

### 4.2 New Keys to Add

```typescript
// home section
'home.welcome.*'           // 7 keys — greeting variants
'home.quickActions.*'      // 9 keys — card labels, descriptions
'home.alerts.*'            // 8 keys — alert types and actions
'home.recentActivity.*'    // 13 keys — timeline labels
```

**Total new keys:** ~37

### 4.3 Interpolation Pattern

Use `{placeholder}` for dynamic values:
- `{name}` — child name
- `{n}` — count or number
- `{value}` — temperature value
- `{time}` — relative time string
- `{days}` — days overdue

---

## 5. Design Specifications

### 5.1 Color Palette (from REDESIGN_PLAN section 1.2)

| Role | Hex | Usage |
|------|-----|-------|
| Primary | `#6366F1` | CTAs, active nav, hero accents |
| Primary Dark | `#4F46E5` | Hover states |
| Secondary | `#14B8A6` | Success, growth, positive indicators |
| Accent Coral | `#F97316` | Fever, heat-related alerts, warning |
| Background | `#FAFAF9` | Page background |
| Surface | `#FFFFFF` | Cards |
| Text Primary | `#1C1917` | Headings, body |
| Text Secondary | `#78716C` | Labels, captions |
| Border | `#E7E5E4` | Card borders, dividers |
| Danger | `#E11D48` | Critical alerts, delete |

### 5.2 Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Page Title | Inter | 32px | 800 |
| Section Heading | Inter | 20px | 700 |
| Card Title | Inter | 16px | 600 |
| Body | Inter | 16px | 400 |
| Label | Inter | 13px | 500 |
| Caption | Inter | 12px | 400 |

### 5.3 Spacing & Layout

- Page horizontal padding: 24px (mobile), 32px (desktop)
- Card gap: 16px
- Section gap: 32px
- Card border-radius: 16px
- Button border-radius: 12px

### 5.4 Motion

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Card hover lift | 200ms | ease | Mouse enter/leave |
| List stagger | 50ms/item | ease-out | On scroll-into-view |
| Alert slide-down | 300ms | cubic-bezier(0.16, 1, 0.3, 1) | Alert activation |
| Page enter | 350ms | ease-out | Route change |

### 5.5 Card Hover States

```css
/* Base card */
.card {
  transition: transform 200ms ease, box-shadow 200ms ease;
}
/* Hover */
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15);
}
/* Press */
.card:active {
  transform: scale(0.98);
  transition-duration: 100ms;
}
```

### 5.6 Empty State Design

- Illustration: Soft SVG, warm indigo/teal palette, child-friendly
- Message: 16px semibold, centered
- Sub-message: 14px regular, Stone color, centered
- CTA: Full-width indigo button below

---

## 6. Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| < 640px (mobile) | Single column, full-width cards |
| 640–1024px (tablet) | 2-column grid for QuickActions |
| > 1024px (desktop) | 4-column row for QuickActions, sidebar visible |

---

## 7. API / Data Contract

No new API calls are needed for Sprint 3 HomePage. The page reads from existing DataService signals that are already populated by sibling pages (Temperature, Growth, etc.).

If `recentTemperatures()` or `recentGrowth()` return empty arrays (no data yet), the RecentActivityFeedComponent shows the empty state illustration.

---

## 8. Acceptance Criteria

- [ ] Welcome hero shows child avatar, personalized greeting, and age chip
- [ ] Quick actions grid shows 4 cards: Temperature, Growth, Diary, Vaccines
- [ ] Cards navigate to their respective pages on tap
- [ ] Health alert appears when latest temperature ≥ 38.0°C
- [ ] Health alert appears when any vaccine is overdue
- [ ] Recent activity feed merges temperature + growth entries, sorted by date desc
- [ ] All strings are bilingual (SQ + EN) via I18nService
- [ ] Card hover lift animation works (200ms ease)
- [ ] List items animate in with staggered 50ms delay
- [ ] Empty state shows illustration + friendly message
- [ ] Layout is responsive across mobile/tablet/desktop
- [ ] No new routes needed — uses existing shell routing

---

## 9. Dependencies

- `Chart.js` + `ng2-charts` — already in package.json from previous sprints
- `I18nService` — existing, needs new keys added
- `DataService` — existing signals, no changes needed
- `Material Symbols` — already loaded via Google Fonts
- Angular 17+ standalone components API

---

## 10. Notes for Executor

1. **Do NOT create new routes** — HomePage is already routed via `ShellComponent`'s children configuration.
2. **Sidebar placeholder** — The sidebar slot is managed by ShellComponent. Sprint 3 HomePage components go into the main content area only.
3. **Badge counts** — Temperature badge shows fever count (temp ≥ 38.0°C in recent readings). Vaccine badge shows overdue count. Both 0 = no badge shown.
4. **Activity limit** — Timeline caps at 10 items (most recent). Do not paginate in Sprint 3.
5. **Time formatting** — Use relative time (e.g., "2 orë më parë") not absolute timestamps for entries.
6. **Illustrations** — Use inline SVG for empty state illustrations to avoid external dependencies.