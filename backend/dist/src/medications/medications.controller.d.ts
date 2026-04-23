import { MedicationsService } from './medications.service';
import { CreateMedicationDto, UpdateMedicationDto, CreateDoseLogDto } from './medication.dto';
export declare class MedicationsController {
    private readonly medicationsService;
    constructor(medicationsService: MedicationsService);
    create(req: any, childId: string, createDto: CreateMedicationDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        childId: string;
        dosage: string;
        frequency: string;
        startDate: Date;
        endDate: Date | null;
        prescribedBy: string | null;
        active: boolean;
    }>;
    findAllByChild(req: any, childId: string): Promise<{
        medications: {
            adherencePct: number | null;
            doseLogs: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                notes: string | null;
                medicationId: string;
                takenAt: Date;
            }[];
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            notes: string | null;
            childId: string;
            dosage: string;
            frequency: string;
            startDate: Date;
            endDate: Date | null;
            prescribedBy: string | null;
            active: boolean;
        }[];
        activeCount: number;
        archivedCount: number;
    }>;
    findOne(req: any, id: string): Promise<{
        adherencePct: number | null;
        doseLogs: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            notes: string | null;
            medicationId: string;
            takenAt: Date;
        }[];
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        childId: string;
        dosage: string;
        frequency: string;
        startDate: Date;
        endDate: Date | null;
        prescribedBy: string | null;
        active: boolean;
    }>;
    update(req: any, id: string, updateDto: UpdateMedicationDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        childId: string;
        dosage: string;
        frequency: string;
        startDate: Date;
        endDate: Date | null;
        prescribedBy: string | null;
        active: boolean;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        childId: string;
        dosage: string;
        frequency: string;
        startDate: Date;
        endDate: Date | null;
        prescribedBy: string | null;
        active: boolean;
    }>;
    logDose(req: any, childId: string, dto: CreateDoseLogDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        medicationId: string;
        takenAt: Date;
    }>;
    getDoseLogs(req: any, childId: string, medicationId: string): Promise<{
        logs: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            notes: string | null;
            medicationId: string;
            takenAt: Date;
        }[];
    }>;
}
