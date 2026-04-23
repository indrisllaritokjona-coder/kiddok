import { IsString, IsNotEmpty, IsOptional, IsDateString, IsArray } from 'class-validator';

export class CreateLabResultDto {
  @IsString()
  @IsNotEmpty()
  testName: string;

  @IsString()
  @IsNotEmpty()
  result: string;

  @IsString()
  @IsOptional()
  unit?: string;

  @IsString()
  @IsOptional()
  referenceRange?: string;

  @IsDateString()
  date: string;

  @IsString()
  @IsOptional()
  doctor?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsArray()
  @IsOptional()
  attachments?: string[];
}

export class UpdateLabResultDto {
  @IsString()
  @IsOptional()
  testName?: string;

  @IsString()
  @IsOptional()
  result?: string;

  @IsString()
  @IsOptional()
  unit?: string;

  @IsString()
  @IsOptional()
  referenceRange?: string;

  @IsDateString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  doctor?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsArray()
  @IsOptional()
  attachments?: string[];
}