import { PrismaService } from '../prisma/prisma.service';
import { CreateIllnessDto } from './dto/create-illness.dto';
export declare class IllnessesService {
    private prisma;
    constructor(prisma: PrismaService);
    getByChild(childId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        medications: string | null;
        childId: string;
        symptoms: string | null;
        notes: string | null;
        loggedAt: Date;
        title: string;
    }[]>;
    create(userId: string, dto: CreateIllnessDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        medications: string | null;
        childId: string;
        symptoms: string | null;
        notes: string | null;
        loggedAt: Date;
        title: string;
    }>;
    update(id: string, userId: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        medications: string | null;
        childId: string;
        symptoms: string | null;
        notes: string | null;
        loggedAt: Date;
        title: string;
    }>;
    delete(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        medications: string | null;
        childId: string;
        symptoms: string | null;
        notes: string | null;
        loggedAt: Date;
        title: string;
    }>;
}
