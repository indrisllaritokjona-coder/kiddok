import { LabResultsService } from './lab-results.service';
import { CreateLabResultDto, UpdateLabResultDto } from './lab-result.dto';
export declare class LabResultsController {
    private readonly labResultsService;
    constructor(labResultsService: LabResultsService);
    create(req: any, childId: string, createDto: CreateLabResultDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        result: string;
        notes: string | null;
        childId: string;
        date: Date;
        testName: string;
        unit: string | null;
        referenceRange: string | null;
        doctor: string | null;
    }>;
    findAllByChild(req: any, childId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        result: string;
        notes: string | null;
        childId: string;
        date: Date;
        testName: string;
        unit: string | null;
        referenceRange: string | null;
        doctor: string | null;
    }[]>;
    findOne(req: any, id: string): Promise<{
        child: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
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
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        result: string;
        notes: string | null;
        childId: string;
        date: Date;
        testName: string;
        unit: string | null;
        referenceRange: string | null;
        doctor: string | null;
    }>;
    update(req: any, id: string, updateDto: UpdateLabResultDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        result: string;
        notes: string | null;
        childId: string;
        date: Date;
        testName: string;
        unit: string | null;
        referenceRange: string | null;
        doctor: string | null;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        result: string;
        notes: string | null;
        childId: string;
        date: Date;
        testName: string;
        unit: string | null;
        referenceRange: string | null;
        doctor: string | null;
    }>;
}
