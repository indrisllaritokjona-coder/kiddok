import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from './mail.service';

/**
 * ReminderService — cron-based scheduler that checks for:
 *   - Vaccines due within REMINDER_VACCINE_DAYS_BEFORE days (default 3)
 *   - Appointments in the next REMINDER_APPOINTMENT_HOURS_BEFORE hours (default 24)
 *   - Active medications (daily reminder)
 * Sends email reminders to the parent.
 */
@Injectable()
export class ReminderService {
  private readonly logger = new Logger(ReminderService.name);

  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  /**
   * Runs daily at 8:00 AM server time (configurable via REMINDER_CHECK_CRON env).
   */
  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async handleDailyReminders() {
    this.logger.log('Running daily reminder check');
    try {
      await Promise.all([
        this.sendVaccineReminders(),
        this.sendAppointmentReminders(),
        this.sendMedicationReminders(),
      ]);
      this.logger.log('Daily reminder check completed');
    } catch (err) {
      this.logger.error('Daily reminder check failed', err);
    }
  }

  // --- Vaccine reminders ---

  private async sendVaccineReminders() {
    const daysBefore = parseInt(process.env['REMINDER_VACCINE_DAYS_BEFORE'] || '3', 10);
    const now = new Date();
    const futureDate = new Date(now.getTime() + daysBefore * 24 * 60 * 60 * 1000);

    const vaccines = await this.prisma.vaccine.findMany({
      where: {
        completed: false,
        dueDate: { gte: now, lte: futureDate },
      },
      include: {
        child: {
          include: {
            user: { select: { email: true } },
          },
        },
      },
    });

    const sent = new Set<string>();
    for (const vaccine of vaccines) {
      const email = vaccine.child.user?.email;
      if (!email || sent.has(email + vaccine.id)) continue;

      await this.mailService.sendVaccineReminder(
        email,
        'Prindi', // parent name — could be fetched from parent profile
        vaccine.child.name,
        vaccine.name,
        vaccine.dueDate!,
      );
      sent.add(email + vaccine.id);
      this.logger.log(`Vaccine reminder sent: ${vaccine.name} for ${vaccine.child.name} → ${email}`);
    }
  }

  // --- Appointment reminders ---

  private async sendAppointmentReminders() {
    const hoursBefore = parseInt(process.env['REMINDER_APPOINTMENT_HOURS_BEFORE'] || '24', 10);
    const now = new Date();
    const future = new Date(now.getTime() + hoursBefore * 60 * 60 * 1000);

    const appointments = await this.prisma.appointment.findMany({
      where: { dateTime: { gte: now, lte: future } },
      include: {
        child: {
          include: {
            user: { select: { email: true } },
          },
        },
      },
    });

    const sent = new Set<string>();
    for (const appt of appointments) {
      const email = appt.child.user?.email;
      if (!email || sent.has(email + appt.id)) continue;

      await this.mailService.sendAppointmentReminder(
        email,
        'Prindi',
        appt.child.name,
        appt.title,
        appt.dateTime,
        appt.doctorName ?? undefined,
        appt.location ?? undefined,
      );
      sent.add(email + appt.id);
      this.logger.log(`Appointment reminder sent: "${appt.title}" for ${appt.child.name} → ${email}`);
    }
  }

  // --- Medication reminders ---

  private async sendMedicationReminders() {
    const medications = await this.prisma.medication.findMany({
      where: { active: true },
      include: {
        child: {
          include: {
            user: { select: { email: true } },
          },
        },
      },
    });

    const sent = new Set<string>();
    for (const med of medications) {
      const email = med.child.user?.email;
      if (!email || sent.has(email + med.id)) continue;

      await this.mailService.sendMedicationReminder(
        email,
        'Prindi',
        med.child.name,
        med.name,
        med.dosage,
        med.frequency,
      );
      sent.add(email + med.id);
      this.logger.log(`Medication reminder sent: ${med.name} for ${med.child.name} → ${email}`);
    }
  }
}