import { PrismaService } from '../prisma/prisma.service';
import { ChildrenService } from '../children/children.service';
export declare class HealthRecordsService {
    private prisma;
    private childrenService;
    constructor(prisma: PrismaService, childrenService: ChildrenService);
    create(userId: string, childId: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        type: string;
        symptoms: string | null;
        diagnosis: string | null;
        medications: string | null;
        notes: string | null;
        attachments: string[];
        doctorName: string | null;
        childId: string;
    }>;
    findAllByChild(userId: string, childId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        type: string;
        symptoms: string | null;
        diagnosis: string | null;
        medications: string | null;
        notes: string | null;
        attachments: string[];
        doctorName: string | null;
        childId: string;
    }[]>;
    findOne(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        type: string;
        symptoms: string | null;
        diagnosis: string | null;
        medications: string | null;
        notes: string | null;
        attachments: string[];
        doctorName: string | null;
        childId: string;
    }>;
    update(userId: string, id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        type: string;
        symptoms: string | null;
        diagnosis: string | null;
        medications: string | null;
        notes: string | null;
        attachments: string[];
        doctorName: string | null;
        childId: string;
    }>;
    remove(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        type: string;
        symptoms: string | null;
        diagnosis: string | null;
        medications: string | null;
        notes: string | null;
        attachments: string[];
        doctorName: string | null;
        childId: string;
    }>;
}
