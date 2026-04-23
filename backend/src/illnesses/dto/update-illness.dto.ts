import { IsString, IsOptional } from 'class-validator';

export class UpdateIllnessDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  symptoms?: string;

  @IsOptional()
  @IsString()
  medications?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
