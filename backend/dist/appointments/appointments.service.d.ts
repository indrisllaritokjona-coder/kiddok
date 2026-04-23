import { PrismaService } from '../prisma/prisma.service';
import { ChildrenService } from '../children/children.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './appointment.dto';
export declare class AppointmentsService {
    private prisma;
    private childrenService;
    constructor(prisma: PrismaService, childrenService: ChildrenService);
    create(userId: string, childId: string, data: CreateAppointmentDto): Promise<{
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
    findAllByChild(userId: string, childId: string): Promise<{
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
    findOne(userId: string, id: string): Promise<{
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
    update(userId: string, id: string, data: UpdateAppointmentDto): Promise<{
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
    remove(userId: string, id: string): Promise<{
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
