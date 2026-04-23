import { MedicationsService } from './medications.service';
import { CreateMedicationDto, UpdateMedicationDto, CreateDoseLogDto } from './medication.dto';
export declare class MedicationsController {
    private readonly medicationsService;
    constructor(medicationsService: MedicationsService);
    create(req: any, childId: string, createDto: CreateMedicationDto): Promise<{
        id: string;
        name: string;
        dosage: string;
        frequency: string;
        startDate: Date;
        endDate: Date | null;
        prescribedBy: string | null;
        notes: string | null;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
    }>;
    findAllByChild(req: any, childId: string): Promise<{
        medications: {
            adherencePct: number | null;
            doseLogs: {
                id: string;
                notes: string | null;
                createdAt: Date;
                updatedAt: Date;
                takenAt: Date;
                medicationId: string;
            }[];
            id: string;
            name: string;
            dosage: string;
            frequency: string;
            startDate: Date;
            endDate: Date | null;
            prescribedBy: string | null;
            notes: string | null;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            childId: string;
        }[];
        activeCount: number;
        archivedCount: number;
    }>;
    findOne(req: any, id: string): Promise<{
        adherencePct: number | null;
        doseLogs: {
            id: string;
            notes: string | null;
            createdAt: Date;
            updatedAt: Date;
            takenAt: Date;
            medicationId: string;
        }[];
        id: string;
        name: string;
        dosage: string;
        frequency: string;
        startDate: Date;
        endDate: Date | null;
        prescribedBy: string | null;
        notes: string | null;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
    }>;
    update(req: any, id: string, updateDto: UpdateMedicationDto): Promise<{
        id: string;
        name: string;
        dosage: string;
        frequency: string;
        startDate: Date;
        endDate: Date | null;
        prescribedBy: string | null;
        notes: string | null;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        name: string;
        dosage: string;
        frequency: string;
        startDate: Date;
        endDate: Date | null;
        prescribedBy: string | null;
        notes: string | null;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
    }>;
    logDose(req: any, childId: string, dto: CreateDoseLogDto): Promise<{
        id: string;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        takenAt: Date;
        medicationId: string;
    }>;
    getDoseLogs(req: any, childId: string, medicationId: string): Promise<{
        logs: {
            id: string;
            notes: string | null;
            createdAt: Date;
            updatedAt: Date;
            takenAt: Date;
            medicationId: string;
        }[];
    }>;
}
