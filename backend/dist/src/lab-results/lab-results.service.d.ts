import { PrismaService } from '../prisma/prisma.service';
import { ChildrenService } from '../children/children.service';
import { CreateLabResultDto, UpdateLabResultDto } from './lab-result.dto';
export declare class LabResultsService {
    private prisma;
    private childrenService;
    constructor(prisma: PrismaService, childrenService: ChildrenService);
    create(userId: string, childId: string, data: CreateLabResultDto): Promise<{
        id: string;
        testName: string;
        result: string;
        unit: string | null;
        referenceRange: string | null;
        date: Date;
        doctor: string | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
    }>;
    findAllByChild(userId: string, childId: string): Promise<{
        id: string;
        testName: string;
        result: string;
        unit: string | null;
        referenceRange: string | null;
        date: Date;
        doctor: string | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
    }[]>;
    findOne(userId: string, id: string): Promise<{
        child: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
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
            userId: string;
            avatarSeed: string | null;
        };
    } & {
        id: string;
        testName: string;
        result: string;
        unit: string | null;
        referenceRange: string | null;
        date: Date;
        doctor: string | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
    }>;
    update(userId: string, id: string, data: UpdateLabResultDto): Promise<{
        id: string;
        testName: string;
        result: string;
        unit: string | null;
        referenceRange: string | null;
        date: Date;
        doctor: string | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
    }>;
    remove(userId: string, id: string): Promise<{
        id: string;
        testName: string;
        result: string;
        unit: string | null;
        referenceRange: string | null;
        date: Date;
        doctor: string | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
    }>;
}
