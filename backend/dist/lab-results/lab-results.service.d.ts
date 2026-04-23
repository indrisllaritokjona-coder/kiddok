import { PrismaService } from '../prisma/prisma.service';
import { ChildrenService } from '../children/children.service';
import { CreateLabResultDto, UpdateLabResultDto } from './lab-result.dto';
export declare class LabResultsService {
    private prisma;
    private childrenService;
    constructor(prisma: PrismaService, childrenService: ChildrenService);
    create(userId: string, childId: string, data: CreateLabResultDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        result: string;
        childId: string;
        date: Date;
        notes: string | null;
        testName: string;
        unit: string | null;
        referenceRange: string | null;
        doctor: string | null;
    }>;
    findAllByChild(userId: string, childId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        result: string;
        childId: string;
        date: Date;
        notes: string | null;
        testName: string;
        unit: string | null;
        referenceRange: string | null;
        doctor: string | null;
    }[]>;
    findOne(userId: string, id: string): Promise<{
        child: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
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
            avatarSeed: string | null;
            userId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        result: string;
        childId: string;
        date: Date;
        notes: string | null;
        testName: string;
        unit: string | null;
        referenceRange: string | null;
        doctor: string | null;
    }>;
    update(userId: string, id: string, data: UpdateLabResultDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        result: string;
        childId: string;
        date: Date;
        notes: string | null;
        testName: string;
        unit: string | null;
        referenceRange: string | null;
        doctor: string | null;
    }>;
    remove(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        result: string;
        childId: string;
        date: Date;
        notes: string | null;
        testName: string;
        unit: string | null;
        referenceRange: string | null;
        doctor: string | null;
    }>;
}
