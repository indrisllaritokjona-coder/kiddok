import { PrismaService } from '../prisma/prisma.service';
import { CreateDiaryEntryDto } from './dto/create-diary-entry.dto';
import { UpdateDiaryEntryDto } from './dto/update-diary-entry.dto';
export declare class DiaryService {
    private prisma;
    constructor(prisma: PrismaService);
    getByChild(childId: string, userId: string): Promise<{
        id: string;
        childId: string;
        type: string;
        description: string | null;
        severity: string | null;
        duration: string | null;
        loggedAt: Date;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(userId: string, dto: CreateDiaryEntryDto): Promise<{
        id: string;
        childId: string;
        type: string;
        description: string | null;
        severity: string | null;
        duration: string | null;
        loggedAt: Date;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, userId: string, data: UpdateDiaryEntryDto): Promise<{
        id: string;
        childId: string;
        type: string;
        description: string | null;
        severity: string | null;
        duration: string | null;
        loggedAt: Date;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: string, userId: string): Promise<{
        id: string;
        childId: string;
        type: string;
        description: string | null;
        severity: string | null;
        duration: string | null;
        loggedAt: Date;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
