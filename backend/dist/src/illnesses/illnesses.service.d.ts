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
        notes: string | null;
        childId: string;
        loggedAt: Date;
        title: string;
        symptoms: string | null;
    }[]>;
    create(userId: string, dto: CreateIllnessDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        medications: string | null;
        notes: string | null;
        childId: string;
        loggedAt: Date;
        title: string;
        symptoms: string | null;
    }>;
    update(id: string, userId: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        medications: string | null;
        notes: string | null;
        childId: string;
        loggedAt: Date;
        title: string;
        symptoms: string | null;
    }>;
    delete(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        medications: string | null;
        notes: string | null;
        childId: string;
        loggedAt: Date;
        title: string;
        symptoms: string | null;
    }>;
}
