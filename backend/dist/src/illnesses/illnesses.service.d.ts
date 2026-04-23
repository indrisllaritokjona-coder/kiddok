import { PrismaService } from '../prisma/prisma.service';
import { CreateIllnessDto } from './dto/create-illness.dto';
import { UpdateIllnessDto } from './dto/update-illness.dto';
export declare class IllnessesService {
    private prisma;
    constructor(prisma: PrismaService);
    getByChild(childId: string, userId: string): Promise<{
        id: string;
        childId: string;
        loggedAt: Date;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        medications: string | null;
        title: string;
        symptoms: string | null;
    }[]>;
    create(userId: string, dto: CreateIllnessDto): Promise<{
        id: string;
        childId: string;
        loggedAt: Date;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        medications: string | null;
        title: string;
        symptoms: string | null;
    }>;
    update(id: string, userId: string, data: UpdateIllnessDto): Promise<{
        id: string;
        childId: string;
        loggedAt: Date;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        medications: string | null;
        title: string;
        symptoms: string | null;
    }>;
    delete(id: string, userId: string): Promise<{
        id: string;
        childId: string;
        loggedAt: Date;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        medications: string | null;
        title: string;
        symptoms: string | null;
    }>;
}
