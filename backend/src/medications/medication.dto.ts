import { IsString, IsNotEmpty, IsOptional, IsDateString, IsBoolean, MaxLength, IsUUID } from 'class-validator';

export class CreateMedicationDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  dosage: string;

  @IsString()
  @IsNotEmpty()
  frequency: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsString()
  @IsOptional()
  prescribedBy?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}

export class UpdateMedicationDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  dosage?: string;

  @IsString()
  @IsOptional()
  frequency?: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsString()
  @IsOptional()
  prescribedBy?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}

export class CreateDoseLogDto {
  @IsUUID()
  @IsNotEmpty()
  medicationId: string;

  @IsDateString()
  takenAt: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  notes?: string;
}
