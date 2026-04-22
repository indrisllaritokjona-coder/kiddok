import { PrismaService } from '../prisma/prisma.service';
import { ChildrenService } from '../children/children.service';
import { CreateMedicationDto, UpdateMedicationDto } from './medication.dto';
export declare class MedicationsService {
    private prisma;
    private childrenService;
    constructor(prisma: PrismaService, childrenService: ChildrenService);
    create(userId: string, childId: string, data: CreateMedicationDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
        notes: string | null;
        dosage: string;
        frequency: string;
        startDate: Date;
        endDate: Date | null;
        prescribedBy: string | null;
        active: boolean;
    }>;
    findAllByChild(userId: string, childId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
        notes: string | null;
        dosage: string;
        frequency: string;
        startDate: Date;
        endDate: Date | null;
        prescribedBy: string | null;
        active: boolean;
    }[]>;
    findOne(userId: string, id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
        notes: string | null;
        dosage: string;
        frequency: string;
        startDate: Date;
        endDate: Date | null;
        prescribedBy: string | null;
        active: boolean;
    }>;
    update(userId: string, id: string, data: UpdateMedicationDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
        notes: string | null;
        dosage: string;
        frequency: string;
        startDate: Date;
        endDate: Date | null;
        prescribedBy: string | null;
        active: boolean;
    }>;
    remove(userId: string, id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
        notes: string | null;
        dosage: string;
        frequency: string;
        startDate: Date;
        endDate: Date | null;
        prescribedBy: string | null;
        active: boolean;
    }>;
}
