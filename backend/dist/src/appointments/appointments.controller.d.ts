import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './appointment.dto';
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    create(req: any, childId: string, createDto: CreateAppointmentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        location: string | null;
        notes: string | null;
        childId: string;
        title: string;
        doctorName: string | null;
        dateTime: Date;
    }>;
    findAllByChild(req: any, childId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        location: string | null;
        notes: string | null;
        childId: string;
        title: string;
        doctorName: string | null;
        dateTime: Date;
    }[]>;
    findOne(req: any, id: string): Promise<{
        child: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            dateOfBirth: Date;
            gender: string | null;
            bloodType: string | null;
            allergies: string | null;
            birthWeight: number | null;
            deliveryDoctor: string | null;
            criticalAllergies: string | null;
            medicalDocument: string | null;
            documentIssueDate: Date | null;
            medicalNotes: string | null;
            avatarSeed: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        location: string | null;
        notes: string | null;
        childId: string;
        title: string;
        doctorName: string | null;
        dateTime: Date;
    }>;
    update(req: any, id: string, updateDto: UpdateAppointmentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        location: string | null;
        notes: string | null;
        childId: string;
        title: string;
        doctorName: string | null;
        dateTime: Date;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        location: string | null;
        notes: string | null;
        childId: string;
        title: string;
        doctorName: string | null;
        dateTime: Date;
    }>;
}
