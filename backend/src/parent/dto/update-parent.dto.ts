import { IsOptional, IsString, IsNotEmpty } from 'classvalidator';

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