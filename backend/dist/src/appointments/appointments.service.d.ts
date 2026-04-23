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
        location: string | null;
        notes: string | null;
        childId: string;
        title: string;
        doctorName: string | null;
        dateTime: Date;
    }>;
    findAllByChild(userId: string, childId: string): Promise<{
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
    findOne(userId: string, id: string): Promise<{
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
    update(userId: string, id: string, data: UpdateAppointmentDto): Promise<{
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
    remove(userId: string, id: string): Promise<{
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
