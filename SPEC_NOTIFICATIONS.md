# SPEC.md — Sprint 7: Notifications & Reminders Module

**Status:** Draft
**Sprint:** 7
**Created:** 2026-04-23
**Architect:** kiddok-architect

---

## 1. Overview

**Component:** `NotificationService` (frontend), `NotificationsModule` (backend), `NotificationPanelComponent` (UI), `NotificationBellComponent` (sidebar), daily cron job (backend)
**Purpose:** Bell icon in sidebar with unread badge → notification panel, browser push notifications for upcoming vaccines (3 days), appointments (24h), medication doses, and in-app notification persistence.
**Priority:** HIGH

---

## 2. Data Model

### 2.1 Prisma Schema — Notification Model

```prisma
model Notification {
  id        String   @id @default(cuid())
  userId    String
  user      User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  type      String   // 'vaccine_reminder' | 'medication_due' | 'appointment_reminder' | 'diary_reminder'
  message   String
  read      Boolean  @default(false)
  metadata  Json?    // { childId, recordId, recordType } for deep-linking
  createdAt DateTime @default(now())
}
```

**User relation update:**
```prisma
model User {
  // ...existing fields
  notifications Notification[]
}
```

### 2.2 Frontend Interface

```typescript
interface Notification {
  id: string;
  userId: string;
  type: 'vaccine_reminder' | 'medication_due' | 'appointment_reminder' | 'diary_reminder';
  message: string;
  read: boolean;
  metadata?: {
    childId: string;
    recordId: string;
    recordType: string;
  };
  createdAt: string; // ISO
}
```

---

## 3. UI Design

### 3.1 Bell Icon in Sidebar

**Position:** Top-right of sidebar, above nav items
**Icon:** `notifications` (Material Symbol, Outlined, 24px)
**Badge:**
- Shape: 16px circle, rose-500 background (`#F43F5E`)
- Position: top-right of bell icon, offset -4px
- Shows unread count (capped at "9+" for 10+)
- Hidden when count = 0
- Animate: subtle scale pulse on new notification (keyframe 0→1.2→1, 300ms)

### 3.2 Notification Panel

**Trigger:** Click/tap bell icon
**Style:** Slide-in overlay panel from right, 380px wide, white bg, rounded-l-3xl
**Backdrop:** Semi-transparent dark overlay (`rgba(0,0,0,0.3)`), closes panel on click

**Panel layout (top → bottom):**

```
┌─────────────────────────────────────┐
│ Header: "Njoftimet" / "Notifications"│
│  [Mark all read] button (right)     │
├─────────────────────────────────────┤
│ [Filter chips: All | Vaccine | Med  │
│  Appt | Diary]                      │
├─────────────────────────────────────┤
│ Notification List (scrollable)      │
│  └── NotificationItem × n          │
│                                     │
│ (empty state if no notifications)   │
└─────────────────────────────────────┘
```

### 3.3 Notification Item Card

```
┌──────────────────────────────────────┐
│ [Icon]  [Type label]   [Time ago]   │
│                                       │
│  Notification message text            │
│                                       │
│  [Mark read]              [Delete]   │
└──────────────────────────────────────┘
```

**Visual states:**

| State | Style |
|-------|-------|
| Unread | White bg, left border 3px rose-400, slightly elevated shadow |
| Read | Stone-50 bg, no border, flat |

**Icons per type:**
- `vaccine_reminder` → `vaccines` (indigo)
- `medication_due` → `medication` (emerald)
- `appointment_reminder` → `calendar_today` (amber)
- `diary_reminder` → `edit_note` (teal)

**Time format:** Relative — "5 min", "2 orë", "dje" / "5 min", "2 hrs", "yesterday"

**Actions:**
- Click card body → mark read + navigate to relevant record
- "Mark read" button → mark read (no navigation)
- "Delete" button → delete notification (confirm toast)

### 3.4 Empty State

- SVG bell illustration (muted stone-300)
- `"Nuk ka njoftime të reja"` / `"No new notifications"`
- Subtext: `"Do të shihni njoftimet këtu kur të ketë diçka të rëndësishme"`

### 3.5 Filter Chips

- Pill buttons: All | Vaksinat | Medikamentet | Takimet | Ditari
- Active chip: indigo-100 bg, indigo-700 text
- Inactive: stone-100 bg, stone-500 text

---

## 4. Backend API

### 4.1 Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/notifications` | List notifications for authenticated user |
| PATCH | `/notifications/:id/read` | Mark single notification as read |
| PATCH | `/notifications/read-all` | Mark all notifications as read |
| DELETE | `/notifications/:id` | Delete a single notification |
| DELETE | `/notifications/delete-read` | Delete all read notifications |

### 4.2 GET /notifications

**Auth:** Bearer JWT
**Query params:** `?page=1&limit=20&type=vaccine_reminder`
**Response 200:**
```json
{
  "notifications": [
    {
      "id": "cuid",
      "type": "vaccine_reminder",
      "message": "DTaP-3 për Emma-n është për shkak pas 3 ditësh",
      "read": false,
      "metadata": {
        "childId": "uuid",
        "recordId": "cuid",
        "recordType": "vaccine"
      },
      "createdAt": "2026-04-23T08:00:00.000Z"
    }
  ],
  "unreadCount": 5,
  "total": 12
}
```

### 4.3 PATCH /notifications/:id/read

**Response 200:** Updated notification
**Response 404:** Not found

### 4.4 Module Structure

```
backend/src/notifications/
├── notifications.controller.ts
├── notifications.service.ts
├── notifications.module.ts
└── notifications.cron.ts
```

---

## 5. Daily Cron Job

**Schedule:** Every day at 07:00 (local server time)
**Implementation:** `@Cron(CronExpression.EVERY_DAY_AT_7AM)` in `NotificationsCron`
**Imports:** `AppointmentsService`, `VaccinesService`, `MedicationsService`

### 5.1 Checks

| Check | Condition | Notification Type |
|-------|-----------|------------------|
| Vaccines | `dueDate` within 3 days, not completed | `vaccine_reminder` |
| Appointments | `dateTime` within 24 hours, not past | `appointment_reminder` |
| Medications | Active medication with `frequency` = daily/pattern suggesting dose due | `medication_due` |

### 5.2 Deduplication

Before inserting, check if a `Notification` with same `{userId, type, metadata.recordId}` and `createdAt` within last 24h already exists. Skip if duplicate.

### 5.3 Cron Implementation Pattern

```typescript
@Injectable()
export class NotificationsCron {
  constructor(
    private prisma: PrismaService,
    private appointmentsService: AppointmentsService,
    private vaccinesService: VaccinesService,
    private medicationsService: MedicationsService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_7AM)
  async checkUpcomingEvents(): Promise<void> {
    // 1. Get all users with active children
    // 2. For each user, check vaccines, appointments, medications
    // 3. Insert Notification records (not push — cron only persists)
  }
}
```

---

## 6. Browser Push Notifications

### 6.1 Permission Flow

1. On first bell icon click, if `Notification.permission === 'default'`, show a small inline tooltip/popover near the bell:
   - `"Aktivo njoftimet e shfletuesit?"` / `"Enable browser notifications?"`
   - `[Po]` `[Jo]` buttons
2. If user clicks `Po` → call `NotificationService.requestPermission()`
3. If permission denied (`'denied'`) → show persistent small warning icon on bell, tooltip: `"Njoftimet e shfletuesit janë bllokuar"` / `"Browser notifications are blocked"`

### 6.2 Push on Cron Events

- Cron job **persists** notifications to DB (fire-and-forget to notification table)
- **Separately**, after persisting, the cron service calls `NotificationGateway` (WebSocket) to push real-time to connected clients
- If client is offline but push permission granted → `NotificationService.send()` called server-side via WebSocket ACK (or future: Firebase Cloud Messaging)
- For now: push via WebSocket gateway injected into cron

### 6.3 NotificationGateway (WebSocket)

```typescript
@WebSocketGateway()
export class NotificationGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('subscribeNotifications')
  handleSubscribe(client: Socket, userId: string) {
    client.join(`user:${userId}`);
  }

  sendToUser(userId: string, notification: Notification) {
    this.server.to(`user:${userId}`).emit('newNotification', notification);
  }
}
```

---

## 7. Component Structure (Frontend)

```
src/app/components/
├── notification-bell/
│   ├── notification-bell.component.ts
│   ├── notification-bell.component.html
│   └── notification-bell.component.scss
└── notification-panel/
    ├── notification-panel.component.ts
    ├── notification-panel.component.html
    ├── notification-panel.component.scss
    └── notification-item/
        ├── notification-item.component.ts
        ├── notification-item.component.html
        └── notification-item.component.scss

src/app/services/
├── notifications.service.ts   (NEW — wraps REST calls)
```

**Note:** `NotificationService.ts` already exists (from previous sprint) — rename to `NotificationPreferencesService` if needed, or extend it.

---

## 8. File Locations

```
backend/src/notifications/
├── notifications.controller.ts
├── notifications.service.ts
├── notifications.module.ts
└── notifications.cron.ts

frontend/src/app/components/notification-bell/
├── notification-bell.component.ts
├── notification-bell.component.html
└── notification-bell.component.scss

frontend/src/app/components/notification-panel/
├── notification-panel.component.ts
├── notification-panel.component.html
├── notification-panel.component.scss
└── notification-item/
    ├── notification-item.component.ts
    ├── notification-item.component.html
    └── notification-item.component.scss

frontend/src/app/services/
└── notifications.service.ts  (NEW — HTTP client wrapper)
```

---

## 9. i18n Keys

| Key | SQ | EN |
|-----|----|----|
| `notifications.title` | Njoftimet | Notifications |
| `notifications.markAllRead` | Shëno të gjitha si të lexuara | Mark all as read |
| `notifications.empty` | Nuk ka njoftime të reja | No new notifications |
| `notifications.emptyHint` | Do të shihni njoftimet këtu kur të ketë diçka të rëndësishme | You'll see notifications here when something important happens |
| `notifications.filter.all` | Të gjitha | All |
| `notifications.filter.vaccines` | Vaksinat | Vaccines |
| `notifications.filter.medications` | Medikamentet | Medications |
| `notifications.filter.appointments` | Takimet | Appointments |
| `notifications.filter.diary` | Ditari | Diary |
| `notifications.type.vaccine_reminder` | Vaksina | Vaccine |
| `notifications.type.medication_due` | Medikament | Medication |
| `notifications.type.appointment_reminder` | Takim | Appointment |
| `notifications.type.diary_reminder` | Ditari | Diary |
| `notifications.delete` | Fshi | Delete |
| `notifications.markRead` | Shëno si të lexuar | Mark as read |
| `notifications.permission.title` | Aktivo njoftimet e shfletuesit? | Enable browser notifications? |
| `notifications.permission.denied` | Njoftimet e shfletuesit janë bllokuar | Browser notifications are blocked |
| `notifications.permission.enable` | Po | Yes |
| `notifications.permission.no` | Jo | No |
| `notifications.time.now` | Tani | Now |
| `notifications.time.minutes` | {n} min | {n} min |
| `notifications.time.hours` | {n} orë | {n} hrs |
| `notifications.time.yesterday` | Dje | Yesterday |
| `notifications.time.days` | {n} ditë | {n} days |
| `notifications.push.title.vaccine` | Vaksina për shkak! | Vaccine due soon! |
| `notifications.push.body.vaccine` | {name} — për shkak {days} ditë | {name} — due in {days} days |
| `notifications.push.title.appointment` | Takim nesër! | Appointment tomorrow! |
| `notifications.push.body.appointment` | {title} me {doctor} në {location} | {title} with {doctor} at {location} |
| `notifications.push.title.medication` | Medikament për shkak! | Medication due! |
| `notifications.push.body.medication` | {name} — doza e ardhshme | {name} — next dose |
| `notifications.deleted` | Njoftimi u fshi | Notification deleted |
| `notifications.deletedAll` | Të gjitha njoftimet u fshinë | All notifications deleted |
| `notifications.markedRead` | Shëno si të lexuar | Marked as read |

---

## 10. Edge Cases

| Scenario | Handling |
|----------|----------|
| `Notification.permission === 'denied'` | Show lock/warning icon on bell, tooltip explains blocked state |
| `Notification.permission === 'default'` | Show permission prompt on first bell click |
| No upcoming events | Show empty state in panel |
| User has no children | Skip cron checks for that user |
| Notification deleted while panel open | Remove from list with fade-out animation |
| Bell clicked while panel open | Close panel |
| Network error loading notifications | Show inline error + retry button |
| Very long notification message | Truncate at 120 chars with "..." + full text in tooltip |
| 10+ unread | Badge shows "9+" |
| Mark all read | All items animate to "read" state simultaneously |
| Duplicate cron notifications | Deduplication check — skip if exists within 24h |

---

## 11. Technical Approach

### 11.1 Backend (NestJS + Prisma)

- **Prisma:** Add `Notification` model, update `User` relation
- **Module:** `NotificationsModule` with controller + service + cron
- **Auth:** All endpoints require JWT guard
- **Cron:** `@nestjs/schedule` already installed; `NotificationsCron` runs daily checks
- **WebSocket:** `NotificationGateway` for real-time push to frontend
- **DTOs:** `CreateNotificationDto` (internal), `NotificationResponseDto`

### 11.2 Frontend (Angular 19+)

- **Signals:** `notifications = signal<Notification[]>([])`, `unreadCount = signal(0)`, `panelOpen = signal(false)`, `activeFilter = signal<'all'|'vaccine_reminder'|'medication_due'|'appointment_reminder'|'diary_reminder'>('all')`
- **Services:** `NotificationsService` wraps REST calls (GET, PATCH, DELETE)
- **WebSocket:** Connect via `NotificationGateway` client on app init; subscribe to `user:${userId}` room
- **Bell Component:** Standalone, reads `unreadCount`, toggles `panelOpen`
- **Panel Component:** Slides in from right, fetches notifications on open
- **Integration:** `NotificationBellComponent` added to `SidebarComponent` (top nav area)

### 11.3 WebSocket Client Integration

```typescript
// In app initialization
socket.emit('subscribeNotifications', userId);
socket.on('newNotification', (notif: Notification) => {
  this.notifications.update(n => [notif, ...n]);
  this.unreadCount.update(c => c + 1);
});
```

---

## 12. Acceptance Criteria

- [ ] Bell icon appears in sidebar with unread count badge (hidden when 0)
- [ ] Badge pulses briefly when new notification arrives
- [ ] Clicking bell opens notification panel from right
- [ ] Notifications are grouped by type filter chips
- [ ] Unread notifications have rose left border; read ones are muted
- [ ] "Mark all read" marks all notifications as read with animation
- [ ] "Delete" removes notification with fade-out
- [ ] Cron job runs daily and creates notification records for vaccines due in 3 days
- [ ] Cron job creates notifications for appointments within 24h
- [ ] Cron deduplicates — no double notifications within 24h
- [ ] Browser push permission requested on first bell click
- [ ] Permission denied state shows warning icon on bell
- [ ] All i18n labels work in SQ and EN
- [ ] Panel closes on backdrop click or ESC key
- [ ] WebSocket push delivers new notifications in real-time
- [ ] Backend persists notifications to PostgreSQL
- [ ] Mobile responsive — panel is full-width on small screens

---

## 13. Dependencies

### Backend
- `@nestjs/schedule` (already installed)
- `@nestjs/websockets` + `@nestjs/platform-socket.io` (for NotificationGateway)

### Frontend
- `socket.io-client` (for WebSocket connection to gateway)
- No new UI libraries required (Tailwind + Material Symbols already in use)

---

*Sprint 7 — Architect: notifications & reminders spec complete*
