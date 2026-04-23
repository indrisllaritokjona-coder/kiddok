declare class BackupTemperatureEntryDto {
    temperature: number;
    measuredAt: string;
    location?: string;
    notes?: string;
}
declare class BackupGrowthEntryDto {
    height?: number;
    weight?: number;
    measuredAt: string;
    notes?: string;
}
declare class BackupVaccineDto {
    name: string;
    dateAdministered?: string;
    dueDate?: string;
    provider?: string;
    notes?: string;
    completed: boolean;
}
declare class BackupMedicationDto {
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate?: string;
    prescribedBy?: string;
    notes?: string;
    active: boolean;
}
declare class BackupAppointmentDto {
    title: string;
    dateTime: string;
    doctorName?: string;
    location?: string;
    notes?: string;
}
declare class BackupLabResultDto {
    testName: string;
    result: string;
    unit?: string;
    referenceRange?: string;
    date: string;
    doctor?: string;
    notes?: string;
}
declare class BackupDiaryEntryDto {
    type: string;
    description?: string;
    severity?: string;
    duration?: string;
    loggedAt: string;
    notes?: string;
}
declare class BackupIllnessEpisodeDto {
    title: string;
    symptoms?: string;
    medications?: string;
    notes?: string;
    loggedAt: string;
}
declare class BackupChildDto {
    name: string;
    dateOfBirth: string;
    gender?: string;
    bloodType?: string;
    allergies?: string;
    birthWeight?: number;
    deliveryDoctor?: string;
    criticalAllergies?: string;
    medicalNotes?: string;
    temperatureEntries?: BackupTemperatureEntryDto[];
    growthEntries?: BackupGrowthEntryDto[];
    vaccines?: BackupVaccineDto[];
    medications?: BackupMedicationDto[];
    appointments?: BackupAppointmentDto[];
    labResults?: BackupLabResultDto[];
    diaryEntries?: BackupDiaryEntryDto[];
    illnessEpisodes?: BackupIllnessEpisodeDto[];
}
export declare class ImportBackupDto {
    version: string;
    exportedAt: string;
    child: BackupChildDto;
}
export {};
