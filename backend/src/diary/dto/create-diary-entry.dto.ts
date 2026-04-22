import { IsString, IsOptional, IsEnum } from 'class-validator';

export class CreateDiaryEntryDto {
  @IsString()
  childId!: string;

  @IsString()
  @IsEnum(['symptom', 'meal', 'sleep', 'mood', 'activity'])
  type!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @IsEnum(['mild', 'moderate', 'severe'])
  severity?: string;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}