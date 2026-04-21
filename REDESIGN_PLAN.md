# KidDok Redesign Plan

**Version:** 1.0  
**Date:** 2026-04-21  
**Status:** Draft — Ready for Sprint Execution  

---

## 1. Vision & Design Language

### 1.1 Overall Feel

KidDok is a **warm, trustworthy digital health companion** for busy moms. It should feel like a beautifully designed parenting journal — not a cold medical portal. Think: soft gradients, friendly illustrations, tactile micro-interactions, and an interface that a tired mom can navigate in 30 seconds while holding a sick toddler.

**Emotional goals:**
- Calm and reassuring when everything is fine
- Clear and actionable when something is wrong
- Delightful enough that moms actually want to use it

### 1.2 Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Warm Indigo | `#6366F1` | CTAs, active states, brand accent |
| Primary Dark | Deep Indigo | `#4F46E5` | Hover states, emphasis |
| Secondary | Soft Teal | `#14B8A6` | Success states, health positive indicators |
| Accent Warm | Coral | `#F97316` | Fever indicators, warnings, alerts |
| Background | Warm White | `#FAFAF9` | Page background |
| Surface | Pure White | `#FFFFFF` | Cards, modals |
| Text Primary | Charcoal | `#1C1917` | Headings, primary text |
| Text Secondary | Stone | `#78716C` | Labels, secondary text |
| Border | Soft Gray | `#E7E5E4` | Card borders, dividers |
| Danger | Rose | `#E11D48` | Delete actions, critical alerts |

### 1.3 Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| App Logo | Inter | 28px | 800 (Extrabold) |
| Page Heading | Inter | 32px | 800 |
| Card Heading | Inter | 20px | 700 |
| Body | Inter | 16px | 400 |
| Label | Inter | 12px | 600 |
| Nav Item | Inter | 15px | 600 |
| Badge | Inter | 11px | 700 |

**Google Fonts import:** `Inter` (weights: 400, 500, 600, 700, 800)

### 1.4 Spacing System

- Base unit: **4px**
- Component padding: **24px** (cards), **20px** (modals)
- Section gaps: **24px–32px**
- Border radius: **16px** (buttons), **24px** (cards), **32px** (modals/large surfaces)

### 1.5 Motion Principles

| Type | Duration | Easing | When |
|------|----------|--------|------|
| Page transition | 350ms | ease-out | Tab/view switches |
| Card hover lift | 200ms | ease | Cards, nav items |
| Modal slide-up | 350ms | cubic-bezier(0.16, 1, 0.3, 1) | Modals, dropdowns |
| Button press | 100ms | ease | All buttons |
| Success flash | 600ms | ease-out | Save confirmations |
| Entry list stagger | 50ms per item | ease-out | List renders |

### 1.6 Visual Assets

- **Icons:** Google Material Symbols (Outlined variant, 24px, weight 300)
- **Illustrations:** Soft, hand-drawn style SVG illustrations for empty states
- **Avatars:** DiceBear Notionists API (consistent per child)
- **Background texture:** Subtle warm gradient, no cold clinical gradients
- **Glassmorphism:** Reserved for sidebar only — all other cards use solid white surfaces

---

## 2. UI Redesign

### 2.1 Sidebar (Desktop)

**Current:** Glassmorphic dark sidebar with gradient background, medical image overlay.

**Proposed:**
- **Width:** 280px (compact) or 320px (expanded)
- **Style:** Solid white with left border accent (4px, gradient from Primary to Teal)
- **Sections:**
  1. **Brand row:** KidDok logo + locale toggle button (top)
  2. **Active child mini-card:** Avatar + name + age badge (e.g., "2 vjeç")
  3. **Navigation items:** Icon + label, active state has indigo background pill
  4. **Footer:** Settings + Logout
- **Hover states:** Subtle gray background, smooth 200ms transition
- **Active state:** Left accent bar (4px indigo) + filled background pill

**Before → After:**
```
BEFORE: Dark glass panel (primary-600/90), white text, medical image overlay, complex layering
AFTER:  Clean white panel, stone/charcoal text, subtle left gradient border, no images
```

### 2.2 Navigation Items

| Tab ID | Icon (Material Symbols) | SQ Label | EN Label |
|--------|-------------------------|----------|---------|
| home | `home` | Ekrani Kryesor | Dashboard |
| temperature | `thermostat` | Temperatura | Temperature |
| growth | `trending_up` | Rritja | Growth |
| diary | `edit_document` | Ditari | Diary |
| vaccines | `vaccines` | Vaksinat | Vaccines |
| settings | `settings` | Konfigurime | Settings |

**New items in this redesign:** `temperature`, `growth`

### 2.3 Child Switcher (Header)

**Current:** Dropdown in header, shows avatar + name + expand chevron.

**Proposed:**
- **Location:** Header right side
- **Display:** Avatar (40px) + Name + age chip + chevron
- **Dropdown:** White rounded panel (max-height scroll), child mini-cards with avatar + name + born date + checkmark if active
- **Actions:** "Switch Child" button, "Add New Member" button at bottom
- **Behavior:** Click outside closes dropdown

### 2.4 Child Selector Screen (Empty/Multi State)

**Current:** Grid of child cards with "Open Profile" CTA.

**Proposed — Two states:**

**Empty (0 children):**
- Large welcome illustration (SVG)
- Headline: "Mirësevini në KidDok" / "Welcome to KidDok"
- Subtext: Benefit-oriented, not feature list
- Single prominent CTA: "Shto Fëmijën e Parë" / "Add Your First Child"
- Warm coral accent

**With children (2+ children):**
- Page title: "Zgjidhni Profilin" / "Select a Profile"
- Grid: 1 col (mobile) / 2 col (tablet) / 3 col (desktop)
- Card: Avatar + name + age + blood type badge + "Hapni" CTA
- Add new card: Dashed border, `+` icon, "Shto Pjestar të Ri"

### 2.5 Add/Edit Child Modal

**Current:** Full-screen form, many fields at once, complex modal.

**Proposed:**
- **Trigger:** Floating `+` button (mobile) or "Add Member" in child switcher dropdown
- **Style:** Centered overlay modal, rounded-3xl, max-w-lg
- **Steps approach:**
  1. **Step 1 — Basics:** Name + DOB + Gender (required)
  2. **Step 2 — Medical:** Blood type + Birth weight + Allergies (optional, collapsible)
  3. **Step 3 — Documents:** Medical document upload (optional)
- **Progress indicator:** Step dots at top
- **Validation:** Inline, real-time, friendly error messages
- **Save button:** Full-width gradient, disabled until required fields valid

### 2.6 Modals — General Principles

- **Backdrop:** `bg-black/30` with `backdrop-blur-sm`
- **Card:** White, rounded-3xl (32px radius), box-shadow `0 32px 80px -12px rgba(0,0,0,0.25)`
- **Close button:** Top-right, `w-9 h-9`, gray background, hover state
- **Top accent bar:** 4px gradient bar at very top of modal (brand accent)
- **Animation:** Slide up 350ms cubic-bezier

---

## 3. Component Architecture

### 3.1 New Component Tree

```
ShellComponent (unchanged — shell, routing, child management)
├── SidebarComponent (NEW — extracted from shell, desktop nav)
│   ├── NavItemComponent (NEW — reusable nav item)
│   └── ChildMiniCardComponent (NEW — active child in sidebar)
├── HeaderComponent (NEW — extracted from shell, top bar)
│   ├── ChildSwitcherComponent (NEW — extracted from shell)
│   └── LocaleToggleComponent (NEW — language switcher)
├── BottomNavComponent (NEW — mobile tab bar)
│
├── HomePageComponent (REDESIGN — new layout, activity feed, quick actions)
│   ├── WelcomeHeroComponent (NEW — personalized greeting)
│   ├── QuickActionsGridComponent (NEW — 4-card grid)
│   ├── RecentActivityFeedComponent (NEW — timeline)
│   └── HealthAlertCardComponent (NEW — urgent items)
│
├── TemperaturePageComponent (NEW — dedicated page, NOT inside diary)
│   ├── TempLogFormComponent (NEW — quick temperature entry)
│   ├── TempGaugeDisplayComponent (NEW — large temp with color indicator)
│   ├── TempTrendChartComponent (NEW — 7-day / 30-day line chart)
│   └── TempAlertBadgeComponent (NEW — fever warning)
│
├── GrowthPageComponent (NEW)
│   ├── GrowthChartComponent (NEW — height/weight with percentile lines)
│   ├── GrowthLogFormComponent (NEW)
│   └── GrowthStatsCardComponent (NEW — current percentiles)
│
├── DiaryPageComponent (REFACTOR — symptoms focus, temperature moved out)
│
├── VaccinesPageComponent (REFACTOR — alerts, schedule, notifications)
│   ├── VaccineScheduleComponent (NEW)
│   ├── VaccineAlertCardComponent (NEW)
│   └── VaccineAddFormComponent (REFACTOR)
│
└── SettingsPageComponent (MINOR REFACTOR)
```

### 3.2 What Stays

| Component | Change |
|----------|--------|
| `ShellComponent` | Core shell stays; nav items update; routing updates |
| `DataService` | Signal-based state stays; API methods expand |
| `I18nService` | Translation structure stays; new keys added |
| `ChildProfile` interface | Extended with new fields for temp/growth |

### 3.3 What Changes

| Component | What Changes |
|----------|-------------|
| `HomeComponent` | New layout: hero → quick actions → recent activity |
| `DiaryComponent` | Refactor to symptoms-only; temperature moved to dedicated page |
| `RecordsComponent` | Refactor to vaccines + lab records; alerts added |

### 3.4 New Interfaces

```typescript
// Temperature
interface TemperatureEntry {
  id: string;
  childId: string;
  value: number;          // °C, e.g. 38.5
  measuredAt: string;     // ISO timestamp
  location?: 'oral' | 'axillary' | 'ear' | 'rectal' | 'forehead';
  context?: 'fever' | 'normal' | 'post-medication';
  medicationGiven?: string;
  medicationDose?: string;
  medicationEffectiveness?: 'none' | 'mild' | 'good' | 'great';
  notes?: string;
}

// Growth
interface GrowthEntry {
  id: string;
  childId: string;
  date: string;           // yyyy-MM-dd
  heightCm?: number;
  weightKg?: number;
  headCircumferenceCm?: number;
  notes?: string;
}

// Vaccine alert
interface VaccineAlert {
  id: string;
  childId: string;
  vaccineName: string;
  dueDate: string;
  status: 'upcoming' | 'due' | 'overdue' | 'completed';
  completedAt?: string;
  doseNumber?: number;
  totalDoses?: number;
  reminderEnabled: boolean;
}
```

---

## 4. Module Plans

### 4.1 Temperature Diary

**Priority: HIGH — This is the sprint focus.**

#### Data Model

```typescript
interface TemperatureReading {
  id: string;
  childId: string;
  value: number;           // Celsius, stored as decimal (e.g., 38.5)
  measuredAt: string;      // ISO 8601 timestamp
  location: 'oral' | 'axillary' | 'ear' | 'rectal' | 'forehead';
  context: 'fever-spike' | 'routine' | 'post-medication' | 'after-sleep';
  medicationName?: string;
  medicationDose?: string;
  medicationGivenAt?: string;
  effectiveness?: 'none' | 'mild' | 'good' | 'great';
  feverTriggered?: boolean;   // true if value >= 38.0°C
  notes?: string;
}
```

#### UI Design

**Page Layout (top to bottom):**

1. **Header row:** Page title ("Temperatura" / "Temperature") + current child avatar + Add button
2. **Current Status Card:**
   - Large temperature number (48px font, bold)
   - Color-coded: Green (<37.5°C) | Orange (37.5–38.9°C) | Red (≥39.0°C)
   - Context label + time of reading
   - If fever: pulse animation + "Shënoni temperaturën" CTA
3. **Quick Add Bar:**
   - Shows last reading summary
   - "Lexim i Ri" button (primary, prominent)
4. **7-Day Trend Chart:**
   - Line chart, temperature on Y-axis, days on X-axis
   - Color-coded dots (green/orange/red by threshold)
   - WHO fever threshold line at 38.0°C (dashed red)
   - Tap dot to see reading details
5. **Recent Readings List:**
   - Each entry: time + value + color badge + medication chip (if any)
   - Swipe-to-delete on mobile
6. **Active Medications Card (if fever):**
   - Shows medication name + dose + time given + effectiveness

**Add Reading Modal:**
- Large number input (48px) with °C suffix
- Time (defaults to now)
- Measurement location (segmented control: armpit / mouth / ear / forehead)
- Context (segmented control: fever check / routine / after medication)
- Medication section (collapsible, shown when context = "after medication"):
  - Medication name (autocomplete from recent medications)
  - Dose
  - Time given
  - Effectiveness (after 30 min, prompt: "Si reagoi temperatura?")

**Fever Alert:**
- When temp ≥ 38.0°C logged, show alert banner at top of page:
  - Background: `bg-rose-50` with rose border
  - Text: "Temperatura e lartë u regjistrua" + reading value
  - Action: "Shiko Trend-in" / "Mark Medication Given"
- Alert persists for 24h or until a new reading < 38.0°C is logged

#### API Contract

```
GET    /children/:childId/temperatures?from=&to=&limit=50
POST   /children/:childId/temperatures
PATCH  /children/:childId/temperatures/:id
DELETE /children/:childId/temperatures/:id

Request (POST/PATCH):
{
  "value": 38.5,
  "measuredAt": "2026-04-21T14:30:00.000Z",
  "location": "axillary",
  "context": "fever-spike",
  "medicationName": "Paracetamol",
  "medicationDose": "5ml",
  "effectiveness": "good",
  "notes": "After nap, seemed fine"
}
```

#### Edge Cases

| Situation | Behavior |
|-----------|----------|
| Temp ≥ 39.5°C | Show urgent banner, suggest calling doctor |
| Temp logged with medication | Prompt to log effectiveness after 30 min |
| No readings in 7 days | Show "Sot jeni mirë!" encouraging empty state |
| Very frequent readings (>5/day) | Warning: "Shumë_lexime" — check if thermometer is faulty |
| Different measurement locations | Show location label on each reading, chart differentiates |

---

### 4.2 Growth Tracking

**Priority: MEDIUM — Planned for Sprint 2**

#### Data Model

```typescript
interface GrowthEntry {
  id: string;
  childId: string;
  date: string;              // yyyy-MM-dd
  heightCm: number;          // stored as decimal, e.g. 85.5
  weightKg: number;          // stored as decimal, e.g. 12.3
  headCircumferenceCm?: number;
  measuredBy?: string;       // "clinic" | "home"
  notes?: string;
}
```

#### UI Design

**Page Layout:**

1. **Header:** Title + child avatar + measurement unit toggle (metric/imperial)
2. **Latest Stats Row (3 cards):**
   - Height: value + comparison to last reading (↑ 1.2cm)
   - Weight: value + comparison arrow
   - Head circumference (if measured)
3. **Growth Chart (primary content):**
   - Dual-axis line chart: height (left Y) + weight (right Y) on same X (age/months)
   - WHO percentile bands as colored background zones (3rd, 15th, 50th, 85th, 97th)
   - Toggle between height-only / weight-only / both
   - Pinch-to-zoom time range: 0–6m, 0–12m, 0–24m, all
4. **Add Measurement FAB:** Opens bottom sheet (mobile) or side panel (desktop)
5. **Measurement History:** List with date, values, source badge

**Add Measurement Form:**
- Date (defaults to today)
- Height (cm) — large number input
- Weight (kg) — large number input  
- Head circumference (optional)
- Source: "Në shtëpi" / "Në klinikë" (affects display badge)

#### Charts Approach

- **Chart library:** Chart.js with ng2-charts wrapper (or native canvas for performance)
- **WHO Data:** Embed as static JSON — no external API needed
- **Percentile calculation:** Client-side using WHO LMS parameters
- **Mobile:** Horizontal scroll chart, simplified UI

#### API Contract

```
GET    /children/:childId/growth?from=&to=
POST   /children/:childId/growth
PATCH  /children/:childId/growth/:id
DELETE /children/:childId/growth/:id
```

---

### 4.3 Vaccination Alerts

**Priority: MEDIUM — Planned for Sprint 3**

#### Data Model

```typescript
interface Vaccine {
  id: string;
  childId: string;
  name: string;
  manufacturer?: string;
  doseNumber: number;
  totalDoses: number;
  dueDate: string;
  completedAt?: string;
  administeredBy?: string;
  batchNumber?: string;
  site?: string;         // injection site
  notes?: string;
}

interface VaccineSchedule {   // embedded reference schedule
  name: string;
  doseCount: number;
  doses: { months: number; label: string }[];
  country: 'AL' | 'US' | 'UK';
}
```

#### UI Design

**Page Layout:**

1. **Alert Banner (if any overdue):**
   - Coral/orange banner at top: "Keni vaksina të vonuara" + count
   - Tap to scroll to overdue section
2. **Vaccination Timeline:**
   - Vertical timeline with vaccine names
   - Each node: completed (green check) / upcoming (orange clock) / overdue (red warning)
   - Expandable nodes show dose details, date, batch number
3. **Coming Up Card:**
   - Next 2 upcoming vaccines with due dates
   - "Shëno si e bërë" quick action
4. **Full Schedule:**
   - Grouped by age period (0–6m, 6–12m, 1–2y, etc.)
   - Collapsible sections

**Add Vaccine Record:**
- Vaccine name (autocomplete from standard schedule)
- Dose number (auto-suggested based on previous)
- Date administered
- Batch/lot number
- Injection site (arm/thigh)
- Doctor/clinic name
- Notes

**Notification Approach:**
- In-app alert cards (not push notifications in this sprint)
- Badge count on vaccines nav item for overdue count
- Alert card on home page: "Vaksina e ardhshme: [Name] — [Due Date]"

#### Standard Vaccine Schedule (Albania — default)

Based on Albanian national immunization schedule (ISSHP/Albania):

| Age | Vaccine |
|-----|---------|
| Birth | BCG, HepB-1 |
| 2 months | DTaP-1, Hib-1, IPV-1, HepB-2, PCV-1, Rotavirus-1 |
| 4 months | DTaP-2, Hib-2, IPV-2, PCV-2, Rotavirus-2 |
| 6 months | DTaP-3, Hib-3, IPV-3, HepB-3, PCV-3 |
| 12 months | MMR-1, Varicella-1 |
| 18 months | DTaP-4, Hib-4 |
| 5–6 years | DTaP-5, IPV-4, MMR-2 |
| 11 years | Tdap, HPV (catch-up) |

*(English/US schedule available as alternative in i18n)*

---

## 5. Sprint Scope — Sprint 1

**Goal:** Temperature Diary as a standalone page

### What's In Scope (Temperature Diary — Sprint 1)

1. **New `TemperaturePageComponent`** — standalone page with:
   - Current status card (large temp display, color-coded)
   - 7-day trend line chart (Chart.js)
   - Quick-add reading modal
   - Fever alert banner
   - Recent readings list with medication chips
   - Effectiveness tracking prompt

2. **New API endpoints (backend):**
   - `GET /children/:id/temperatures`
   - `POST /children/:id/temperatures`
   - `PATCH /children/:id/temperatures/:id`
   - `DELETE /children/:id/temperatures/:id`
   - New Prisma model: `TemperatureReading`

3. **i18n expansion:**
   - All temperature-related strings
   - New translation keys for all UI elements

4. **Home page minor update:**
   - Add temperature quick-action card to Home quick actions grid

### Out of Scope for Sprint 1

- Growth tracking (Sprint 2)
- Vaccination alerts refined UI (Sprint 3)
- Push notifications (future)
- Measurement location selection (keep simple, location baked into context)
- Chart percentile bands (Sprint 2)

### Success Criteria

- [ ] Parent can log a temperature reading in ≤3 taps
- [ ] Fever ≥ 38.0°C triggers visible alert on page
- [ ] 7-day trend chart renders correctly
- [ ] All strings bilingual (SQ + EN)
- [ ] Backend stores and retrieves temperature data (not localStorage)

---

## 6. Implementation Order

> Written for a full-stack Angular developer starting from scratch on this redesign.

### Phase 1: Backend Foundation (Day 1)

**Step 1.1 — Prisma Schema Update**

File: `backend/prisma/schema.prisma`

Add new model:

```prisma
model TemperatureReading {
  id            String   @id @default(cuid())
  childId       String
  child         Child    @relation(fields: [childId], references: [id], onDelete: Cascade)
  value         Float    // Celsius
  measuredAt    DateTime
  location      String   // oral | axillary | ear | rectal | forehead
  context       String   // fever-spike | routine | post-medication | after-sleep
  medicationName String?
  medicationDose  String?
  medicationGivenAt DateTime?
  effectiveness String?  // none | mild | good | great
  notes         String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

Run: `npx prisma migrate dev --name add_temperature_reading`

**Step 1.2 — Temperature Module (NestJS)**

Create `backend/src/temperatures/`:

- `temperatures.controller.ts` — REST endpoints
- `temperatures.service.ts` — CRUD logic
- `temperatures.module.ts`

Register in `backend/src/app.module.ts`.

**Step 1.3 — Update ChildrenService include**

In `children.service.ts` `findOne()`, add `temperatureReadings: true` to the include clause so full child fetch includes temperature history.

---

### Phase 2: Frontend Foundation (Day 1–2)

**Step 2.1 — i18n Expansion**

Add to `i18n.service.ts`:

```typescript
// Temperature page
'temp.title': { sq: 'Temperatura', en: 'Temperature' },
'temp.currentTemp': { sq: 'Temperatura Aktuale', en: 'Current Temperature' },
'temp.addReading': { sq: 'Lexim i Ri', en: 'New Reading' },
'temp.feverWarning': { sq: 'Temperatura e lartë!', en: 'Fever Detected!' },
'temp.sevenDayTrend': { sq: 'Trend 7-Ditor', en: '7-Day Trend' },
'temp.recentReadings': { sq: 'Leximet e Funta', en: 'Recent Readings' },
'temp.medicationGiven': { sq: 'Ilaç i Dhënë', en: 'Medication Given' },
'temp.effectiveness': { sq: 'Efektiviteti', en: 'Effectiveness' },
'temp.effectivenessPrompt': { sq: 'Si reagoi temperatura pas 30 minutash?', en: 'How did temperature respond after 30 minutes?' },
'temp.save': { sq: 'Ruaj Leximin', en: 'Save Reading' },
'temp.cancel': { sq: 'Anulo', en: 'Cancel' },
'temp.value': { sq: 'Temperatura (°C)', en: 'Temperature (°C)' },
'temp.time': { sq: 'Ora', en: 'Time' },
'temp.context': { sq: 'Konteksti', en: 'Context' },
'temp.contextFever': { sq: 'Kontroll temperature', en: 'Fever Check' },
'temp.contextRoutine': { sq: 'Rutinore', en: 'Routine' },
'temp.contextPostMed': { sq: 'Pas ilaçit', en: 'After Medication' },
'temp.noReadings': { sq: 'Nuk ka lexime', en: 'No readings yet' },
'temp.allGood': { sq: 'Të gjitha temperaturas mirë! 🎉', en: 'All temperatures normal! 🎉' },
```

**Step 2.2 — DataService API methods**

Add to `DataService`:

```typescript
async getTemperatures(childId: string, from?: Date, to?: Date): Promise<TemperatureEntry[]>
async addTemperature(childId: string, data: Partial<TemperatureEntry>): Promise<TemperatureEntry>
async updateTemperature(childId: string, id: string, data: Partial<TemperatureEntry>): Promise<TemperatureEntry>
async deleteTemperature(childId: string, id: string): Promise<void>
```

**Step 2.3 — Routing Update**

File: `app.routes.ts` (or routing module)

Add new route:
```typescript
{ path: 'temperature', component: TemperaturePageComponent }
```

**Step 2.4 — ShellComponent nav update**

In `shell.component.ts`, add `temperature` to `navItems`:

```typescript
{ id: 'temperature', icon: 'thermostat', label: t['temp.title'] },
```

---

### Phase 3: Temperature Page Component (Day 2–3)

**Step 3.1 — Core Signals**

```typescript
temperatures = signal<TemperatureEntry[]>([]);
selectedDate = signal<Date>(new Date());
showAddModal = signal(false);
currentChildTemp = computed(() => {
  const temps = this.temperatures();
  if (!temps.length) return null;
  return temps.sort((a, b) => new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime())[0];
});
recentReadings = computed(() => this.temperatures().slice(0, 10));
weekTemps = computed(() => {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return this.temperatures().filter(t => new Date(t.measuredAt) >= weekAgo);
});
hasFever = computed(() => {
  const curr = this.currentChildTemp();
  return curr ? curr.value >= 38.0 : false;
});
```

**Step 3.2 — TempGaugeDisplay Component**

Large temperature display:
- Font size: 56px (font-black)
- Color: `text-teal-500` (<37.5) | `text-orange-500` (37.5–38.9) | `text-rose-600` (≥39.0)
- Subtitle: context label + time
- Fever state: pulsing ring animation

**Step 3.3 — 7-Day Trend Chart**

Using Chart.js:
- Type: `line`
- X-axis: Date (last 7 days)
- Y-axis: Temperature °C
- Data points: colored by threshold
- Horizontal line at 38.0°C (fever threshold, dashed red)
- Smooth bezier curve
- On mobile: simplified (no grid lines, larger touch targets)

**Step 3.4 — Add Reading Modal**

- Large number stepper input (38.0–42.0°C, step 0.1)
- Time picker (defaults to now)
- Context segmented control
- Collapsible medication section (shows when context = "after-medication")
- Effectiveness select (shown for post-medication readings)
- Save button (disabled if value < 35 or > 45)

**Step 3.5 — Recent Readings List**

- Grouped by date
- Each row: time (left) + value with color badge + medication chip if given
- Tap to expand and see notes
- Swipe left to reveal delete (mobile)

**Step 3.6 — Fever Alert Banner**

```typescript
// Template
@if (hasFever()) {
  <div class="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center gap-3 mb-6 animate-slide-up">
    <span class="material-icons text-rose-500 bg-rose-100 rounded-full p-2">warning</span>
    <div class="flex-1">
      <p class="font-bold text-rose-700">{{ i18n.t()['temp.feverWarning'] }}</p>
      <p class="text-sm text-rose-600">{{ currentChildTemp()?.value }}°C — {{ i18n.t()['temp.feverActionHint'] }}</p>
    </div>
    <button (click)="openAddMedModal()" class="bg-rose-100 hover:bg-rose-200 text-rose-700 px-3 py-1.5 rounded-xl text-sm font-bold transition-colors">
      {{ i18n.t()['temp.markMedication'] }}
    </button>
  </div>
}
```

---

### Phase 4: Integration & Polish (Day 3–4)

**Step 4.1 — Home Page Update**

Add to the Quick Actions grid (HomeComponent):
```typescript
// New quick action card
{ id: 'temperature', icon: 'thermostat', label: t['temp.title'], color: 'orange', description: 'Monitoroni temperaturën' }
```

**Step 4.2 — Mobile Bottom Nav**

Update `ShellComponent` mobile nav items array:
```typescript
{ id: 'home', icon: 'home', label: 'Ballina' },
{ id: 'temperature', icon: 'thermostat', label: 'Temperatura' },
{ id: 'diary', icon: 'edit_document', label: 'Ditari' },
{ id: 'vaccines', icon: 'vaccines', label: 'Vaksinat' },
{ id: 'settings', icon: 'settings', label: 'Konfigurime' },
```

**Step 4.3 — Chart.js Integration**

```bash
npm install chart.js ng2-charts
```

Add to `app.config.ts` or main.ts:
```typescript
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
```

**Step 4.4 — Testing**

- Log temperature reading → stored in Postgres
- Fever reading → alert banner appears
- Chart renders → 7-day trend visible
- Delete reading → removed from list
- Locale toggle → all strings switch to EN
- Mobile bottom nav → temperature tab accessible

---

### Phase 5: Polish & i18n (Day 4)

**Step 5.1 — Animation refinements**

- Add `animate-pulse` to fever alert badge
- Ensure `animate-slide-up` is on all modals and cards
- Add staggered list animation for readings list
- Chart data points animate in on load

**Step 5.2 — Empty states**

- No readings: friendly illustration + "Shtoni leximin e parë" CTA
- All readings normal: positive empty state ("Të gjitha temperaturas mirë!")

**Step 5.3 — Final i18n audit**

- Verify every label, placeholder, error message, empty state has SQ + EN
- Check date formats (DD/MM/YYYY for SQ, MM/DD/YYYY for EN)

---

## Appendix: File Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `REDESIGN_PLAN.md` | CREATE | This document |
| `backend/prisma/schema.prisma` | EDIT | Add `TemperatureReading` model |
| `backend/src/temperatures/` | CREATE | New controller/service/module |
| `backend/src/app.module.ts` | EDIT | Register TemperatureModule |
| `backend/src/children/children.service.ts` | EDIT | Include temperatureReadings in findOne |
| `src/app/core/i18n/i18n.service.ts` | EDIT | Add temperature translation keys |
| `src/app/services/data.service.ts` | EDIT | Add temperature API methods |
| `src/app/components/temperature.component.ts` | CREATE | New temperature page |
| `src/app/components/home.component.ts` | EDIT | Add temp quick action card |
| `src/app/components/shell.component.ts` | EDIT | Add temp nav item, update routing |
| `src/app/app.routes.ts` (or routing module) | EDIT | Add temperature route |
| `tailwind.config.js` | CHECK | Ensure chart.js colors work with custom palette |
| `package.json` | EDIT | Add `chart.js`, `ng2-charts` dependencies |

---

## Notes for Executor

- The existing `DiaryComponent` tracks temperature alongside symptoms — **do not delete that functionality yet**. The temperature page in Sprint 1 operates independently. After Sprint 2, we will consolidate.
- The current `records.component.ts` handles vaccines — the vaccine schedule system will build on top of the existing structure.
- All new components use **standalone Angular components** (no NgModule).
- API calls go to `http://localhost:3000` (backend). Do not use localStorage for temperature data in this sprint.
- Use the `I18nService` for all user-facing strings — never hardcode SQ or EN text.
