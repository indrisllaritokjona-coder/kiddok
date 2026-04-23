import { PrismaService } from '../prisma/prisma.service';
import { MailService } from './mail.service';
export declare class ReminderService {
    private prisma;
    private mailService;
    private readonly logger;
    constructor(prisma: PrismaService, mailService: MailService);
    handleDailyReminders(): Promise<void>;
    private sendVaccineReminders;
    private sendAppointmentReminders;
    private sendMedicationReminders;
}
