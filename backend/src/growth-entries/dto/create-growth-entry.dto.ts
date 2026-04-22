import { IsString, IsOptional, IsNumber, IsDateString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGrowthEntryDto {
  @IsString()
  childId!: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(30)
  @Max(200)
  height?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @Max(150)
  weight?: number;

  @IsDateString()
  measuredAt!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}