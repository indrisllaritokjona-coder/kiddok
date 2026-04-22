import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateShareLinkDto {
  @IsDateString()
  @IsNotEmpty()
  expiresAt: string;
}
