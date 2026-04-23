import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateChildDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: string;

  @IsString()
  @IsOptional()
  avatarSeed?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  bloodType?: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value !== '' && value != null ? parseFloat(value) : undefined))
  birthWeight?: number;

  @IsString()
  @IsOptional()
  deliveryDoctor?: string;

  @IsString()
  @IsOptional()
  criticalAllergies?: string;

  @IsString()
  @IsOptional()
  medicalNotes?: string;

  @IsString()
  @IsOptional()
  medicalDocument?: string;

  @IsDateString()
  @IsOptional()
  documentIssueDate?: string;
}