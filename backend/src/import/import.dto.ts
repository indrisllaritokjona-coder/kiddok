import { IsString, IsOptional, IsArray, ValidateNested, IsBoolean, IsNumber, IsDateString, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

class BackupTemperatureEntryDto {
  @IsNumber() temperature: number;
  @IsDateString() measuredAt: string;
  @IsString() @IsOptional() location?: string;
  @IsString() @IsOptional() notes?: string;
}

class BackupGrowthEntryDto {
  @IsNumber() @IsOptional() height?: number;
  @IsNumber() @IsOptional() weight?: number;
  @IsDateString() measuredAt: string;
  @IsString() @IsOptional() notes?: string;
}

class BackupVaccineDto {
  @IsString() name: string;
  @IsDateString() @IsOptional() dateAdministered?: string;
  @IsDateString() @IsOptional() dueDate?: string;
  @IsString() @IsOptional() provider?: string;
  @IsString() @IsOptional() notes?: string;
  @IsBoolean() completed: boolean;
}

class BackupMedicationDto {
  @IsString() name: string;
  @IsString() dosage: string;
  @IsString() frequency: string;
  @IsDateString() startDate: string;
  @IsDateString() @IsOptional() endDate?: string;
  @IsString() @IsOptional() prescribedBy?: string;
  @IsString() @IsOptional() notes?: string;
  @IsBoolean() active: boolean;
}

class BackupAppointmentDto {
  @IsString() title: string;
  @IsDateString() dateTime: string;
  @IsString() @IsOptional() doctorName?: string;
  @IsString() @IsOptional() location?: string;
  @IsString() @IsOptional() notes?: string;
}

class BackupLabResultDto {
  @IsString() testName: string;
  @IsString() result: string;
  @IsString() @IsOptional() unit?: string;
  @IsString() @IsOptional() referenceRange?: string;
  @IsDateString() date: string;
  @IsString() @IsOptional() doctor?: string;
  @IsString() @IsOptional() notes?: string;
}

class BackupDiaryEntryDto {
  @IsString() type: string;
  @IsString() @IsOptional() description?: string;
  @IsString() @IsOptional() severity?: string;
  @IsString() @IsOptional() duration?: string;
  @IsDateString() loggedAt: string;
  @IsString() @IsOptional() notes?: string;
}

class BackupIllnessEpisodeDto {
  @IsString() title: string;
  @IsString() @IsOptional() symptoms?: string;
  @IsString() @IsOptional() medications?: string;
  @IsString() @IsOptional() notes?: string;
  @IsDateString() loggedAt: string;
}

class BackupChildDto {
  @IsString() name: string;
  @IsDateString() dateOfBirth: string;
  @IsString() @IsOptional() gender?: string;
  @IsString() @IsOptional() bloodType?: string;
  @IsString() @IsOptional() allergies?: string;
  @IsNumber() @IsOptional() birthWeight?: number;
  @IsString() @IsOptional() deliveryDoctor?: string;
  @IsString() @IsOptional() criticalAllergies?: string;
  @IsString() @IsOptional() medicalNotes?: string;

  @IsArray() @ValidateNested() @Type(() => BackupTemperatureEntryDto) @IsOptional() temperatureEntries?: BackupTemperatureEntryDto[];
  @IsArray() @ValidateNested() @Type(() => BackupGrowthEntryDto) @IsOptional() growthEntries?: BackupGrowthEntryDto[];
  @IsArray() @ValidateNested() @Type(() => BackupVaccineDto) @IsOptional() vaccines?: BackupVaccineDto[];
  @IsArray() @ValidateNested() @Type(() => BackupMedicationDto) @IsOptional() medications?: BackupMedicationDto[];
  @IsArray() @ValidateNested() @Type(() => BackupAppointmentDto) @IsOptional() appointments?: BackupAppointmentDto[];
  @IsArray() @ValidateNested() @Type(() => BackupLabResultDto) @IsOptional() labResults?: BackupLabResultDto[];
  @IsArray() @ValidateNested() @Type(() => BackupDiaryEntryDto) @IsOptional() diaryEntries?: BackupDiaryEntryDto[];
  @IsArray() @ValidateNested() @Type(() => BackupIllnessEpisodeDto) @IsOptional() illnessEpisodes?: BackupIllnessEpisodeDto[];
}

export class ImportBackupDto {
  @IsString() version: string;
  @IsDateString() exportedAt: string;
  @IsObject() child: BackupChildDto;
}
