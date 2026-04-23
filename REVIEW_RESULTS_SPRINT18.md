# REVIEW_RESULTS_SPRINT18 — Email Notifications + Reminder System

**Sprint:** 18 — Email Notifications + Reminder System
**Reviewer:** kiddok-reviewer
**Date:** 2026-04-23
**Commit reviewed:** `203a60b`

---

## Overview

The sprint delivers a functional email + reminder system with good fallback behavior (console logging when SMTP is unconfigured). The implementation is clean and tests pass. However, several issues ranging from security to correctness must be addressed before production.

---

## 🔴 Critical Issues

### R1: HTML injection in email templates
**File:** `mail.service.ts`

Child name, vaccine name, medication name, and other user-controlled fields are interpolated directly into HTML strings without escaping.

```typescript
// vaccine name in subject — no HTML escaping
subject: `KidDok — Rimbursim vaksine për ${childName}: ${vaccineName}`,
html: this.wrapHtml(html, 'Rimbursim Vaksine'),
```

An appointment titled `<img src=x onerror=alert(1)>` would inject HTML into the email client. While most email clients have some XSS protection, this is a real risk.

**Recommendation:** Either escape user content before interpolation using a library like `escape-html`, or use a proper templating engine (Handlebars, EJS) with explicit placeholder substitution. Given the templated structure already exists, adding a simple `escapeHtml()` helper and applying it to all user-provided fields is the minimal fix.

---

### R2: ReminderService has no OnModuleDestroy — cron stays registered after shutdown
**File:** `reminder.service.ts`

`ReminderService` is decorated with `@Cron(...)` but does not implement `OnModuleDestroy`. When the NestJS application shuts down, the scheduled job may keep running or attempt to use a closed Prisma connection.

**Recommendation:** Implement `OnModuleDestroy` and call `this.logger.log('ReminderService shutting down')` to confirm clean stop. For NestJS scheduler, jobs tied to the module lifecycle are cleaned up automatically, but explicit teardown is safer and aids debugging.

---

### R3: Deduplication Set is in-memory only — duplicate sends if cron fires twice
**File:** `reminder.service.ts`

`const sent = new Set<string>()` is recreated on every cron run. If the cron fires twice within the same time window (e.g., job restarts, overlap), the same reminders will be sent again. For medication reminders in particular, this could mean multiple daily emails.

**Recommendation:** Use a Prisma-backed dedup table (`ReminderSent { email, entityId, sentAt }`) with a unique constraint on `(email, entityId)` and a TTL query to clean up entries older than the reminder window. Alternatively, track last-sent time on the entity itself (e.g., `lastReminderSentAt` on `Vaccine`).

---

## 🟡 Medium Issues

### R4: Missing input sanitization on env-var parsed numbers
**File:** `reminder.service.ts`

```typescript
const daysBefore = parseInt(process.env['REMINDER_VACCINE_DAYS_BEFORE'] || '3', 10);
```

`parseInt` with radix 10 returns `NaN` for non-numeric input. `NaN * 24 * 60 * 60 * 1000` evaluates to `NaN`, which propagates into the Prisma query as an invalid date range and silently returns no results (no reminder sent).

**Recommendation:** Validate after parsing:
```typescript
const daysBefore = parseInt(process.env['REMINDER_VACCINE_DAYS_BEFORE'] || '3', 10);
if (isNaN(daysBefore) || daysBefore < 0 || daysBefore > 365) {
  this.logger.warn(`Invalid REMINDER_VACCINE_DAYS_BEFORE: ${envVal}, using default 3`);
}
```
Same pattern applies to `hoursBefore`.

---

### R5: Hardcoded "Prindi" — parent name not personalized
**File:** `reminder.service.ts`

All reminder emails use `parentName = 'Prindi'` (Albanian for "Parent"). The `Child` model has a `user` relation with `email`, but no `name` field on `ParentProfile` is connected. The `ParentProfile` model exists in the schema with `name` but is not linked to `Child`.

This was noted in the test results and is intentional for this sprint, but it should be tracked as a data-quality improvement.

**Recommendation:** Add a `parentProfile` relation to `Child` (or fetch from `ParentProfile` via `user.parentProfile`) and use the actual parent name in emails. This is tracked as a known limitation.

---

### R6: No rate limiting on email sends
**File:** `reminder.service.ts`

If a child has 50 active medications, the cron loop will fire 50 concurrent `sendMedicationReminder` calls. `MailService.send()` has no concurrency limit — the underlying SMTP connection pool may be overwhelmed or emails may be rate-limited by the SMTP provider, causing failures.

**Recommendation:** Add a small concurrency cap using something like:
```typescript
const BATCH_SIZE = 5;
for (let i = 0; i < medications.length; i += BATCH_SIZE) {
  await Promise.all(medications.slice(i, i + BATCH_SIZE).map(m => sendOne(m)));
}
```
Or use `@nestjs/bull` with a queue for reliable background email processing with built-in concurrency control.

---

### R7: MailService.send() swallows errors and never re-throws
**File:** `mail.service.ts`

```typescript
} catch (err) {
  this.logger.error(`Failed to send email to ${options.to}`, err);
}
```

The error is logged but the promise resolves normally. Callers have no way to know an email failed. This is acceptable for a reminder system (best-effort notifications), but if retry logic is added later, the current structure won't support it.

**Recommendation:** Add a `return false` on failure so callers can detect failure:
```typescript
return false; // email failed
```
Then in `ReminderService`, add a metric/counter for failed sends to alert on high failure rates.

---

## 🟢 Minor Issues / Notes

### R8: PrismaService implements OnModuleDestroy but ReminderService does not
**File:** `reminder.service.ts`

Contrast with `PrismaService` which properly implements `OnModuleDestroy` to `$disconnect()`. `ReminderService` relies on NestJS implicitly canceling the cron on shutdown, but explicit teardown is safer.

---

### R9: `mail.module.ts` only exports MailService, not ReminderService
**File:** `mail.module.ts`

`ReminderService` is provided but not exported. This means it cannot be injected elsewhere (e.g., for a manual "send test reminder" endpoint). If the module is intended to be self-contained this is fine, but any future endpoint for manually triggering reminders would need to either import `ReminderService` directly or have `MailModule` re-export it.

Not a bug — just noting the design boundary.

---

### R10: `wrapHtml` has hardcoded `lang="sq"` — good for Albanian, but no `Content-Language` header
**File:** `mail.service.ts`

The HTML template sets `lang="sq"` which is correct, but nodemailer doesn't automatically set a `Content-Language` MIME header. Email clients rely on both. Add when sending:
```typescript
headers: { 'Content-Language': 'sq-AL' }
```
Small but improves email deliverability and accessibility.

---

## Summary

| Category | Count |
|----------|-------|
| Critical (fix before prod) | 3 |
| Medium (recommended) | 4 |
| Minor / notes | 3 |

**Critical fixes required:** HTML injection (R1), OnModuleDestroy missing (R2), in-memory dedup risk (R3).

The implementation is solid in structure — the fallback behavior, env-driven config, and clean separation of concerns are all done well. The critical issues are all addressable with modest changes. None require architectural rework.

---

## Verdict

✅ **Approve for development use.** Ship with the 3 critical fixes in the next sprint.

---

*Reviewed by kiddok-reviewer — 2026-04-23*