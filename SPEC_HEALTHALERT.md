# Sprint 13 Spec — HealthAlertCard Enhancement + RecentActivityFeed Polish

**Project root:** `C:\Users\g_gus\Desktop\jona\kiddok`
**Sprint:** 13
**Owner:** kiddok-architect

---

## 1. HealthAlertCard Enhancements

### 1.1 Component Location
`src/app/components/home/health-alert-card.component.ts`

### 1.2 Multiple Alert Types

The card aggregates alerts from child-domain signals (temperature, vaccine, growth, medication). Each alert carries:

| Alert | Source signal | Color | Icon |
|-------|--------------|-------|------|
| Fever (≥ 38.0°C) | `temperatureService.latestTemp` | Coral / Rose | thermometer |
| Overdue vaccines | `vaccineService.overdueCount` | Orange | syringe |
| Abnormal growth | `growthService.hasAbnormalReading` | Yellow / Amber | trending-down |
| Medication reminder | `medicationService.pendingReminders` | Purple | pill |

### 1.3 Alert Priority Ranking

Alerts sorted by urgency descending:

| Priority | Label | Trigger condition |
|----------|-------|-------------------|
| P0 | Fever | `latestTemp >= 38.0` |
| P1 | Overdue vaccine | `overdueCount > 0` |
| P2 | Abnormal growth | `hasAbnormalReading === true` |
| P3 | Medication reminder | `pendingReminders > 0` |

### 1.4 Dismissible Alerts

- Each alert row has a small `×` (close) button (top-right corner, muted color).
- Dismissal stored in a `Set<string>` signal `dismissedAlertIds`.
- Persisted to `localStorage` key `kiddok_dismissed_alerts`.
- On service data refresh (new measurement / new reading), cleared so dismissed alerts can re-appear.
- Dismissed alerts excluded from the displayed list but count toward "N alerts dismissed" badge is NOT shown — dismissed alerts simply disappear until next data update.

### 1.5 Link to Source

Each alert row is a clickable `<a>` (or router-link):

| Alert | Route |
|-------|-------|
| Fever | `/temperature` |
| Overdue vaccine | `/vaccines` |
| Abnormal growth | `/growth` |
| Medication | `/medication` |

### 1.6 Empty State

When no active (non-dismissed) alerts exist:
- Green checkmark SVG (animated: scale 0 → 1, 300ms ease-out).
- Text: `{{ 'home.alerts.allClear' | translate }}` ("Gjithçka në rregull!" / "All clear!").
- No expand/collapse — always visible when empty.

---

## 2. RecentActivityFeedComponent Polish

### 2.1 Component Location
`src/app/components/home/recent-activity-feed.component.ts`

### 2.2 Load-More Pagination

- Initial render: 5 most recent entries.
- "Shiko më shumë" button (`{{ 'home.activity.showMore' | translate }}`) appends next 5 entries.
- Button hidden when no more entries.
- Total count signal: `activityService.totalCount`.

### 2.3 Entry Type Color-Coded Left Border

Each entry has a 4px left border in type color:

| Type | Color | Tailwind class |
|------|-------|---------------|
| symptom | Red-500 | `border-l-red-500` |
| meal | Green-500 | `border-l-green-500` |
| sleep | Blue-500 | `border-l-blue-500` |
| mood | Yellow-500 | `border-l-yellow-500` |

### 2.4 Time Formatting

Entries `< 24h` old:
```
"para {N} orëve" / "{N} hours ago"
```
Single unit: "para 1 orëve" / "1 hour ago".

Entries `≥ 24h` old: locale date string (`DD/MM/YYYY` for SQ, `MM/DD/YYYY` for EN).

Special case: `< 60 seconds` → `"tani"` / `"just now"` (`home.activity.justNow`).

### 2.5 Tap to Expand

- Entry item is clickable (`(click)` toggles `expanded` state).
- Expanded: shows `notes` / `description` field inline below the entry row.
- Collapse on second tap.
- Smooth height animation via CSS `max-height` transition.

### 2.6 Pull-to-Refresh (Mobile)

- On mobile (touch events), pull-down gesture (delta Y > 60px) triggers `activityService.refresh()`.
- Visual: spinner icon at top of feed during refresh.
- Debounced — no refresh if one is already in progress.
- Uses Angular CDK `PullToRefresh` or manual touch event handling on the scroll container.

---

## 3. i18n Keys

### 3.1 New Keys to Add

Add to `src/assets/i18n/sq.json` and `src/assets/i18n/en.json`:

```json
{
  "home": {
    "alerts": {
      "dismiss": "Heq një njoftim / Dismiss alert",
      "fever": { "link": "Shiko temperaturën / View temperature" },
      "vaccine": { "link": "Shiko vaksinat / View vaccines" },
      "growth": { "link": "Shiko rritjen / View growth" },
      "allClear": "Gjithçka në rregull! / All clear!"
    },
    "activity": {
      "showMore": "Shiko më shumë / Show more",
      "ago": "para / ago",
      "justNow": "tani / just now"
    }
  }
}
```

---

## 4. Technical Notes

### 4.1 Signal Architecture

```
HealthAlertCard
  ├── temperatureService.latestTemp     → signal
  ├── vaccineService.overdueCount       → signal
  ├── growthService.hasAbnormalReading  → signal
  ├── medicationService.pendingReminders → signal
  └── dismissedAlertIds: Set<string>    → signal + localStorage

RecentActivityFeed
  ├── activityService.entries          → signal (paginated)
  ├── activityService.totalCount        → signal
  └── expandedEntryId: string | null    → signal
```

### 4.2 localStorage Keys

| Key | Type | Purpose |
|-----|------|---------|
| `kiddok_dismissed_alerts` | `string` (JSON array) | Persisted dismissed alert IDs |

### 4.3 CSS Animation

Empty state checkmark: `@keyframes scaleIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }`

Pull-to-refresh spinner: standard Tailwind `animate-spin`.

### 4.4 Routing

| Component | Route |
|-----------|-------|
| Temperature page | `/temperature` |
| Vaccines page | `/vaccines` |
| Growth page | `/growth` |
| Medication page | `/medication` |

---

## 5. Acceptance Criteria

- [ ] HealthAlertCard shows all 4 alert types, sorted by priority
- [ ] Each alert is dismissible; dismissal persists across page reloads
- [ ] Empty state shows animated green checkmark + allClear message
- [ ] Each alert links to its source page
- [ ] RecentActivityFeed shows 5 items initially, "Shiko më shumë" loads 5 more
- [ ] Each entry has a colored left border by type
- [ ] Relative time (< 24h) shows "para N orëve", older shows locale date
- [ ] Tap expands entry to show notes inline
- [ ] Pull-to-refresh works on mobile
- [ ] All new i18n keys added in both sq.json and en.json