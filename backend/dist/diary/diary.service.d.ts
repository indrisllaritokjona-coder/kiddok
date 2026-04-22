import { PrismaService } from '../prisma/prisma.service';
import { CreateDiaryEntryDto } from './dto/create-diary-entry.dto';
export declare class DiaryService {
    private prisma;
    constructor(prisma: PrismaService);
    getByChild(childId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
        type: string;
        notes: string | null;
        description: string | null;
        severity: string | null;
        duration: string | null;
        loggedAt: Date;
    }[]>;
    create(userId: string, dto: CreateDiaryEntryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
        type: string;
        notes: string | null;
        description: string | null;
        severity: string | null;
        duration: string | null;
        loggedAt: Date;
    }>;
    update(id: string, userId: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
        type: string;
        notes: string | null;
        description: string | null;
        severity: string | null;
        duration: string | null;
        loggedAt: Date;
    }>;
    delete(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
        type: string;
        notes: string | null;
        description: string | null;
        severity: string | null;
        duration: string | null;
        loggedAt: Date;
    }>;
}
