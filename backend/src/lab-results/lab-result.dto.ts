import { IsString, IsNotEmpty, IsOptional, IsDateString, IsArray, IsIn, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

const ALLOWED_TYPES = ['hemogram', 'urinalysis', 'biochemistry', 'immunology', 'other'];
// 10MB base64 ≈ 10 * 1024 * 1024 * 4/3 ≈ 14,037,514 chars
const MAX_BASE64_LENGTH = 14_037_514;

export class CreateLabResultDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  testName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  result: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  unit?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  referenceRange?: string;

  @IsDateString()
  date: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  doctor?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  notes?: string;

  @IsString()
  @IsOptional()
  @IsIn(ALLOWED_TYPES)
  type?: string;

  @IsArray()
  @IsOptional()
  @IsArray({ each: true })
  attachments?: string[];
}

export class UpdateLabResultDto {
  @IsString()
  @IsOptional()
  @MaxLength(500)
  testName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  result?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  unit?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  referenceRange?: string;

  @IsDateString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  doctor?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  notes?: string;

  @IsString()
  @IsOptional()
  @IsIn(ALLOWED_TYPES)
  type?: string;

  @IsArray()
  @IsOptional()
  @IsArray({ each: true })
  attachments?: string[];
}
