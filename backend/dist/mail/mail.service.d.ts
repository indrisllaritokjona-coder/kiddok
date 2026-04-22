import { OnModuleInit } from '@nestjs/common';
export interface EmailOptions {
    to: string;
    subject: string;
    html: string;
    text?: string;
}
export declare class MailService implements OnModuleInit {
    private transporter;
    private readonly logger;
    onModuleInit(): void;
    send(options: EmailOptions): Promise<void>;
    private wrapHtml;
    sendVaccineReminder(toEmail: string, parentName: string, childName: string, vaccineName: string, dueDate: Date): Promise<void>;
    sendAppointmentReminder(toEmail: string, parentName: string, childName: string, appointmentTitle: string, dateTime: Date, doctorName?: string, location?: string): Promise<void>;
    sendMedicationReminder(toEmail: string, parentName: string, childName: string, medicationName: string, dosage: string, frequency: string): Promise<void>;
}
