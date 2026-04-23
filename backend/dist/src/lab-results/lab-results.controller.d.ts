import { LabResultsService } from './lab-results.service';
import { CreateLabResultDto, UpdateLabResultDto } from './lab-result.dto';
export declare class LabResultsController {
    private readonly labResultsService;
    constructor(labResultsService: LabResultsService);
    create(req: any, childId: string, createDto: CreateLabResultDto): Promise<{
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
    findAllByChild(req: any, childId: string): Promise<{
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
    findOne(req: any, id: string): Promise<{
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
    update(req: any, id: string, updateDto: UpdateLabResultDto): Promise<{
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
    remove(req: any, id: string): Promise<{
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
