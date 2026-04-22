import { MedicationsService } from './medications.service';
import { CreateMedicationDto, UpdateMedicationDto } from './medication.dto';
export declare class MedicationsController {
    private readonly medicationsService;
    constructor(medicationsService: MedicationsService);
    create(req: any, childId: string, createDto: CreateMedicationDto): Promise<{
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
    findAllByChild(req: any, childId: string): Promise<{
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
    findOne(req: any, id: string): Promise<{
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
    update(req: any, id: string, updateDto: UpdateMedicationDto): Promise<{
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
    remove(req: any, id: string): Promise<{
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
