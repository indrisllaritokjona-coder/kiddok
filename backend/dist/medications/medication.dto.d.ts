export declare class CreateMedicationDto {
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate?: string;
    prescribedBy?: string;
    notes?: string;
    active?: boolean;
}
export declare class UpdateMedicationDto {
    name?: string;
    dosage?: string;
    frequency?: string;
    startDate?: string;
    endDate?: string;
    prescribedBy?: string;
    notes?: string;
    active?: boolean;
}
