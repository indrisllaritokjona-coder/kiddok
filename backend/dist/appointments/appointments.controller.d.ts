import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './appointment.dto';
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    create(req: any, childId: string, createDto: CreateAppointmentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
        notes: string | null;
        doctorName: string | null;
        location: string | null;
        title: string;
        dateTime: Date;
    }>;
    findAllByChild(req: any, childId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
        notes: string | null;
        doctorName: string | null;
        location: string | null;
        title: string;
        dateTime: Date;
    }[]>;
    findOne(req: any, id: string): Promise<{
        child: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
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
            userId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
        notes: string | null;
        doctorName: string | null;
        location: string | null;
        title: string;
        dateTime: Date;
    }>;
    update(req: any, id: string, updateDto: UpdateAppointmentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
        notes: string | null;
        doctorName: string | null;
        location: string | null;
        title: string;
        dateTime: Date;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
        notes: string | null;
        doctorName: string | null;
        location: string | null;
        title: string;
        dateTime: Date;
    }>;
}
