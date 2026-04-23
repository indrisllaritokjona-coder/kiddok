import { PrismaService } from '../prisma/prisma.service';
import { ChildrenService } from '../children/children.service';
import { CreateMedicationDto, UpdateMedicationDto, CreateDoseLogDto } from './medication.dto';
export declare class MedicationsService {
    private prisma;
    private childrenService;
    constructor(prisma: PrismaService, childrenService: ChildrenService);
    create(userId: string, childId: string, data: CreateMedicationDto): Promise<{
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
    findAllByChild(userId: string, childId: string): Promise<{
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
    findOne(userId: string, id: string): Promise<{
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
    update(userId: string, id: string, data: UpdateMedicationDto): Promise<{
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
    remove(userId: string, id: string): Promise<{
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
    private sanitizeNotes;
    logDose(userId: string, childId: string, dto: CreateDoseLogDto): Promise<{
        id: string;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        takenAt: Date;
        medicationId: string;
    }>;
    getDoseLogs(userId: string, childId: string, medicationId: string): Promise<{
        logs: {
            id: string;
            notes: string | null;
            createdAt: Date;
            updatedAt: Date;
            takenAt: Date;
            medicationId: string;
        }[];
    }>;
    markDoseTaken(userId: string, medicationId: string, notes?: string): Promise<{
        id: string;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        takenAt: Date;
        medicationId: string;
    }>;
    private calculateAdherence;
    private getDosesPerDay;
}
