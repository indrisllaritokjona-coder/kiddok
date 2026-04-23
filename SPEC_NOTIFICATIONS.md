# SPEC.md — Sprint 7: Notifications & Reminders

## 1. Architecture

### 1.1 High-Level Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         KidDok Architecture                          │
├──────────────┬──────────────────────┬───────────────────────────────┤
│   Frontend   │   Browser Notif API  │      Backend (NestJS)         │
│  (Angular)   │   ←──── push ────→   │  ┌─────────────────────────┐  │
│              │                       │  │  NotificationsModule    │  │
│ ┌──────────┐ │                       │  │  ┌───────────────────┐  │  │
│ │  Bell    │ │   ┌──────────────┐   │  │  │ NotificationSvc   │  │  │
│ │  Badge   │ │◄──│ SW / Events  │   │  │  │ CronSchedulerSvc  │  │  │
│ └────┬─────┘ │   └──────────────┘   │  │  └───────────────────┘  │  │
│      │ click │                       │  └─────────────────────────┘  │
│ ┌────▼──────▼──────┐                │           │                    │
│ │ NotificationPanel │                │  ┌───────▼────────────────┐ │
│ │ (sidebar overlay) │                │  │    Prisma (Postgres)   │ │
│ └───────────────────┘                │  │    notification table   │ │
└──────────────────────────────────────┴──────────────────────────────────┘
```

### 1.2 Tech Stack

- **Frontend**: Angular 17+, standalone components, `@angular/localize` for i18n
- **Backend**: NestJS + `@nestjs/schedule` (already installed)
- **Database**: PostgreSQL via Prisma ORM
- **Browser APIs**: Notifications API, Service Worker (optional for future push)
- **i18n**: `@ngx-translate/core` or Angular built-in i18n (SQ + EN)

---

## 2. Data Model

### 2.1 Prisma Schema

```prisma
model Notification {
  id        String   @id @default(cuid())
  userId    String
  type      NotificationType
  message   String
  read      Boolean  @default(false)
  createdAt DateTime @default(now())

  @@index([userId, read])
  @@index([userId, createdAt])
}

enum NotificationType {
  VACCINE_REMINDER
  MEDICATION_DUE
  APPOINTMENT_REMINDER
  DIARY_REMINDER
}
```

### 2.2 TypeScript Interfaces

```typescript
// shared/src/models/notification.model.ts
export enum NotificationType {
  VACCINE_REMINDER      = 'VACCINE_REMINDER',
  MEDICATION_DUE        = 'MEDICATION_DUE',
  APPOINTMENT_REMINDER  = 'APPOINTMENT_REMINDER',
  DIARY_REMINDER        = 'DIARY_REMINDER',
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface CreateNotificationDto {
  userId: string;
  type: NotificationType;
  message: string;
}
```

---

## 3. Backend Specification

### 3.1 API Endpoints

| Method | Endpoint                     | Auth     | Description                     |
|--------|------------------------------|----------|---------------------------------|
| GET    | `/notifications`             | JWT      | List all notifications for user |
| PATCH  | `/notifications/:id/read`    | JWT      | Mark single notification as read |
| PATCH  | `/notifications/read-all`    | JWT      | Mark all user notifications read |
| DELETE | `/notifications/:id`          | JWT      | Dismiss/delete notification     |
| DELETE | `/notifications`              | JWT      | Clear all read notifications     |

#### GET /notifications
**Query params**: `?read=true|false&limit=50&offset=0`
**Response 200**:
```json
{
  "data": [Notification],
  "total": 120,
  "unread": 5
}
```

#### PATCH /notifications/:id/read
**Response 200**: `{ "id": "...", "read": true }`

#### PATCH /notifications/read-all
**Response 200**: `{ "updated": 5 }`

#### DELETE /notifications/:id
**Response 200**: `{ "deleted": true }`

#### DELETE /notifications
**Query params**: `?readOnly=true` (clears all read)
**Response 200**: `{ "deleted": 12 }`

### 3.2 NotificationService

```typescript
@Injectable()
export class NotificationService {
  findAll(userId: string, filters?: { read?: boolean }): Promise<PaginatedResult>
  markAsRead(id: string, userId: string): Promise<Notification>
  markAllAsRead(userId: string): Promise<number>
  dismiss(id: string, userId: string): Promise<void>
  clearRead(userId: string): Promise<number>
  create(dto: CreateNotificationDto): Promise<Notification>
}
```

### 3.3 Cron Scheduler Service

Runs daily at **06:00 AM** server time:

```typescript
@Injectable()
export class NotificationCronService {
  @Cron('0 6 * * *', { name: 'notification-daily-check' })
  async checkUpcomingEvents(): Promise<void> {
    // 1. Vaccines due within 3 days → VACCINE_REMINDER
    // 2. Appointments within 24 hours → APPOINTMENT_REMINDER
    // 3. Medication doses due today → MEDICATION_DUE
  }
}
```

#### Cron Logic Details

**Vaccine Reminders**
```sql
SELECT v.id, v.childId, v.vaccineName, v.dueDate
FROM vaccine_records v
JOIN children c ON c.id = v.childId
WHERE v.dueDate BETWEEN NOW() AND NOW() + INTERVAL '3 days'
  AND v.id NOT IN (SELECT refId FROM notifications WHERE type = 'VACCINE_REMINDER' AND createdAt > NOW() - INTERVAL '1 day')
```

**Appointment Reminders**
```sql
SELECT a.id, a.childId, a.title, a.dateTime
FROM appointments a
WHERE a.dateTime BETWEEN NOW() AND NOW() + INTERVAL '24 hours'
  AND a.id NOT IN (SELECT refId FROM notifications WHERE type = 'APPOINTMENT_REMINDER' AND createdAt > NOW() - INTERVAL '1 day')
```

**Medication Doses**
```sql
SELECT md.id, md.childId, md.medicationName, md.times
FROM medication_doses md
WHERE md.active = true
  AND EXISTS (SELECT 1 FROM jsonb_array_elements_text(md.times) t WHERE t = to_char(NOW(), 'HH24:MI'))
```

---

## 4. Frontend Specification

### 4.1 Component Breakdown

```
src/app/
├── features/
│   └── notifications/
│       ├── notification-bell/           ← Standalone component
│       │   ├── notification-bell.component.ts
│       │   ├── notification-bell.component.html
│       │   └── notification-bell.component.scss
│       ├── notification-panel/          ← Sidebar overlay panel
│       │   ├── notification-panel.component.ts
│       │   ├── notification-panel.component.html
│       │   └── notification-panel.component.scss
│       └── notifications.routes.ts
├── services/
│   └── notification.service.ts
└── i18n/
    ├── sq.json
    └── en.json
```

### 4.2 NotificationBellComponent

- **Input**: `unreadCount: number`
- **Output**: `opened: EventEmitter<void>`
- **States**: default (bell icon), has-unread (badge with count), permission-denied (muted bell)
- **Badge**: Red circle, max display "99+"
- **Behavior**: Click → emits `opened` event → parent opens panel

### 4.3 NotificationPanelComponent

- **Input**: `isOpen: boolean`
- **Output**: `closed: EventEmitter<void>`
- **Sections**:
  1. Header: "Notifications" + "Mark all read" button
  2. Empty state: icon + message in SQ/EN
  3. Notification list (scrollable, virtual scroll for >50 items)
  4. Each item: icon by type, message, relative time, dismiss (×) button
- **Behavior**:
  - Auto-refresh every 60 seconds
  - Swipe-to-dismiss on mobile
  - Click item → mark read + navigate to relevant section

### 4.4 NotificationService (Frontend)

```typescript
@Injectable({ providedIn: 'root' })
export class NotificationService {
  getNotifications(params?: { read?: boolean }): Observable<NotificationResponse>
  markAsRead(id: string): Observable<Notification>
  markAllRead(): Observable<{ updated: number }>
  dismiss(id: string): Observable<void>
  requestBrowserPermission(): Observable<NotificationPermission>
  showBrowserNotification(title: string, options?: NotificationOptions): void
}
```

### 4.5 Browser Notification Integration

```typescript
// notification.service.ts (frontend)
requestBrowserPermission(): Observable<NotificationPermission> {
  return from(Notification.requestPermission());
}

showBrowserNotification(title: string, body: string, icon?: string): void {
  if (Notification.permission === 'granted') {
    new Notification(title, { body, icon: icon ?? '/assets/icons/bell.svg' });
  }
}
```

**Permission flow**:
1. On first user interaction with bell → request permission
2. If granted → enable browser push
3. If denied → show in-app only, hide browser notif button
4. If default → prompt again after user sees in-app panel

---

## 5. i18n Strings

### 5.1 Key Translations

| Key                         | SQ                               | EN                            |
|-----------------------------|----------------------------------|-------------------------------|
| `notifications.title`      | Njoftimet                        | Notifications                  |
| `notifications.empty`       | Nuk keni njoftime të reja         | No new notifications           |
| `notifications.markAllRead` | Shëno të gjitha si të lexuara     | Mark all as read              |
| `notifications.dismiss`     | Fshij                            | Dismiss                        |
| `notif.vaccine_reminder`    | Vaksina për %s përfundon më %s   | Vaccine %s due on %s           |
| `notif.medication_due`      | Medikamenti %s duhet marrë tani  | Medication %s is due now       |
| `notif.appointment_reminder`| Termini për %s nesër në %s       | Appointment for %s tomorrow at %s |
| `notif.diary_reminder`      | Kujtesë për ditarin e fëmiut      | Diary reminder for child       |
| `notif.permission.denied`   | Njoftimet e shfletuesit janë bllokuar | Browser notifications are blocked |
| `notif.browser.enabled`    | Njoftimet e shfletuesit aktive   | Browser notifications enabled |

---

## 6. Data Flow

### 6.1 Cron Generation Flow

```
CronTrigger (06:00)
    ↓
Vaccine/Appointment/Medication queries
    ↓
NotificationService.create() per event
    ↓
Prisma: INSERT notification
    ↓
[Future]: Push via WebSocket or SSE to connected clients
    ↓
Frontend polls /notifications or receives WS event
    ↓
NotificationBell badge count updates
    ↓
[If permission granted] Browser Notification fires
```

### 6.2 User Interaction Flow

```
User clicks bell icon
    ↓
Parent component opens NotificationPanel
    ↓
Service GET /notifications → renders list
    ↓
User reads / dismisses notification
    ↓
PATCH /notifications/:id/read  OR  DELETE /notifications/:id
    ↓
Badge count updates reactively
```

---

## 7. Edge Cases

| Edge Case                          | Handling Strategy                                        |
|------------------------------------|----------------------------------------------------------|
| Browser permission denied          | Show in-app notifications only; bell shows permission icon with tooltip |
| No upcoming events                 | Show empty state with friendly illustration + message    |
| Mark all read with 0 unread         | Button disabled/grayed out, no-op API call               |
| Delete notification not owned by user | 403 Forbidden, logged as security event                 |
| Concurrent mark-all-read requests  | Use optimistic UI updates; debounce rapid clicks         |
| Notification created while panel open | Auto-append to list without full refresh, badge updates |
| Very large unread count (>999)      | Badge shows "999+"                                       |
| User switches child context         | Notifications scoped to current child + parent user      |
| App open + cron fires               | No duplicate notifications for same event (de-dup by refId + type + 24h window) |
| Offline user                       | Queue notifications locally; sync on reconnect (future)   |

---

## 8. Component Tree

```
AppComponent
├── SidebarComponent
│   ├── NavLinksComponent
│   ├── ChildSwitcherComponent
│   └── NotificationBellComponent   ← [SPRINT 7 NEW]
└── RouterOutlet
    └── Pages (growth, diary, vaccines, etc.)
        └── Modals/Overlays
            └── NotificationPanelComponent ← [SPRINT 7 NEW]
```

---

## 9. Execution Roadmap

### Phase 1: Backend Foundation (1–1.5 days)
- [ ] Add `Notification` model + migration to Prisma schema
- [ ] Create `notifications.controller.ts` with all 5 endpoints
- [ ] Implement `NotificationService` (CRUD + mark-read-all)
- [ ] Write unit tests for service (Jest)

### Phase 2: Cron Engine (0.5 day)
- [ ] Create `NotificationCronService` with `@Cron('0 6 * * *')`
- [ ] Implement vaccine query (3-day window)
- [ ] Implement appointment query (24h window)
- [ ] Implement medication dose query (today, time-based)
- [ ] De-duplication logic (same refId+type within 24h → skip)
- [ ] Unit tests for cron service

### Phase 3: Frontend Core (1–1.5 days)
- [ ] `NotificationService` (Angular service, HTTP calls)
- [ ] `NotificationBellComponent` (standalone, badge, click emitter)
- [ ] `NotificationPanelComponent` (list, empty state, dismiss)
- [ ] Add to `SidebarComponent` layout
- [ ] i18n: add `sq.json` + `en.json` strings

### Phase 4: Browser Notifications (0.5 day)
- [ ] `requestBrowserPermission()` flow in service
- [ ] Permission state handling (granted/denied/default)
- [ ] Push notification trigger when new notification arrives
- [ ] Graceful degradation if permission denied

### Phase 5: Polish & Integration (0.5 day)
- [ ] Real-time badge count via polling or signal updates
- [ ] Scroll virtualization for large notification lists
- [ ] Mobile swipe-to-dismiss
- [ ] E2E test (Playwright): bell → panel → mark read → badge updates

---

## 10. File Changes Summary

```
backend/
├── prisma/schema.prisma                    (+ Notification model)
├── src/notifications/
│   ├── notifications.module.ts               (new)
│   ├── notifications.controller.ts          (new)
│   ├── notifications.service.ts             (new)
│   ├── notifications-cron.service.ts        (new)
│   ├── dto/
│   │   ├── list-notifications.dto.ts       (new)
│   │   └── create-notification.dto.ts      (new)
│   └── entities/
│       └── notification.entity.ts           (new)
└── src/__mocks__/notification.service.spec.ts

frontend/src/app/
├── shared/src/models/notification.model.ts  (shared types)
├── features/notifications/
│   ├── notification-bell/
│   │   ├── notification-bell.component.ts
│   │   ├── notification-bell.component.html
│   │   └── notification-bell.component.scss
│   ├── notification-panel/
│   │   ├── notification-panel.component.ts
│   │   ├── notification-panel.component.html
│   │   └── notification-panel.component.scss
│   └── notifications.routes.ts
├── services/
│   └── notification.service.ts             (new)
└── i18n/
    ├── sq.json                             (update)
    └── en.json                             (update)

e2e/
└── notifications.spec.ts                   (new)
```

---

## 11. Dependencies

| Package                          | Version  | Note                        |
|----------------------------------|----------|-----------------------------|
| `@nestjs/schedule`               | `^4.x`   | ✅ Already installed        |
| `@nestjs/core` + `@nestjs/common`| `^10.x`  |                             |
| `prisma` + `@prisma/client`      | `^5.x`   |                             |
| `@angular/localize`              | `^17.x`  |                             |
| `date-fns`                       | `^3.x`   | For date manipulation in cron |

---

*Author: kiddok-architect | Sprint: 7 | Status: PLANNED*
