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
    findAllByChild(userId: string, childId: string): Promise<{
        medications: {
            adherencePct: number | null;
            doseLogs: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                notes: string | null;
                takenAt: Date;
                medicationId: string;
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
    findOne(userId: string, id: string): Promise<{
        adherencePct: number | null;
        doseLogs: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            notes: string | null;
            takenAt: Date;
            medicationId: string;
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
    update(userId: string, id: string, data: UpdateMedicationDto): Promise<{
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
    remove(userId: string, id: string): Promise<{
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
    logDose(userId: string, childId: string, dto: CreateDoseLogDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        takenAt: Date;
        medicationId: string;
    }>;
    getDoseLogs(userId: string, childId: string, medicationId: string): Promise<{
        logs: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            notes: string | null;
            takenAt: Date;
            medicationId: string;
        }[];
    }>;
    markDoseTaken(userId: string, medicationId: string, notes?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        takenAt: Date;
        medicationId: string;
    }>;
    private calculateAdherence;
    private getDosesPerDay;
}
