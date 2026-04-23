import { PrismaService } from '../prisma/prisma.service';
export declare class GrowthEntriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        measuredAt: Date;
        notes: string | null;
        childId: string;
        height: number | null;
        weight: number | null;
    }>;
    findByChild(userId: string, childId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        measuredAt: Date;
        notes: string | null;
        childId: string;
        height: number | null;
        weight: number | null;
    }[]>;
    delete(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        measuredAt: Date;
        notes: string | null;
        childId: string;
        height: number | null;
        weight: number | null;
    }>;
}
