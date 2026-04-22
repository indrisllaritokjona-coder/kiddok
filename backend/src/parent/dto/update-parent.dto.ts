import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateParentDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  surname?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phone?: string;
}