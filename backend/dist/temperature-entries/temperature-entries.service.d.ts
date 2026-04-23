import { PrismaService } from '../prisma/prisma.service';
export declare class TemperatureEntriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
        notes: string | null;
        temperature: number;
        measuredAt: Date;
        location: string | null;
    }>;
    findByChild(userId: string, childId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
        notes: string | null;
        temperature: number;
        measuredAt: Date;
        location: string | null;
    }[]>;
    delete(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
        notes: string | null;
        temperature: number;
        measuredAt: Date;
        location: string | null;
    }>;
}
