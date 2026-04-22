"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ReminderService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReminderService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../prisma/prisma.service");
const mail_service_1 = require("./mail.service");
let ReminderService = ReminderService_1 = class ReminderService {
    prisma;
    mailService;
    logger = new common_1.Logger(ReminderService_1.name);
    constructor(prisma, mailService) {
        this.prisma = prisma;
        this.mailService = mailService;
    }
    async handleDailyReminders() {
        this.logger.log('Running daily reminder check');
        try {
            await Promise.all([
                this.sendVaccineReminders(),
                this.sendAppointmentReminders(),
                this.sendMedicationReminders(),
            ]);
            this.logger.log('Daily reminder check completed');
        }
        catch (err) {
            this.logger.error('Daily reminder check failed', err);
        }
    }
    async sendVaccineReminders() {
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
        const sent = new Set();
        for (const vaccine of vaccines) {
            const email = vaccine.child.user?.email;
            if (!email || sent.has(email + vaccine.id))
                continue;
            await this.mailService.sendVaccineReminder(email, 'Prindi', vaccine.child.name, vaccine.name, vaccine.dueDate);
            sent.add(email + vaccine.id);
            this.logger.log(`Vaccine reminder sent: ${vaccine.name} for ${vaccine.child.name} → ${email}`);
        }
    }
    async sendAppointmentReminders() {
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
        const sent = new Set();
        for (const appt of appointments) {
            const email = appt.child.user?.email;
            if (!email || sent.has(email + appt.id))
                continue;
            await this.mailService.sendAppointmentReminder(email, 'Prindi', appt.child.name, appt.title, appt.dateTime, appt.doctorName ?? undefined, appt.location ?? undefined);
            sent.add(email + appt.id);
            this.logger.log(`Appointment reminder sent: "${appt.title}" for ${appt.child.name} → ${email}`);
        }
    }
    async sendMedicationReminders() {
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
        const sent = new Set();
        for (const med of medications) {
            const email = med.child.user?.email;
            if (!email || sent.has(email + med.id))
                continue;
            await this.mailService.sendMedicationReminder(email, 'Prindi', med.child.name, med.name, med.dosage, med.frequency);
            sent.add(email + med.id);
            this.logger.log(`Medication reminder sent: ${med.name} for ${med.child.name} → ${email}`);
        }
    }
};
exports.ReminderService = ReminderService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_8AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReminderService.prototype, "handleDailyReminders", null);
exports.ReminderService = ReminderService = ReminderService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mail_service_1.MailService])
], ReminderService);
//# sourceMappingURL=reminder.service.js.map