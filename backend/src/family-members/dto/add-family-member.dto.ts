import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class AddFamilyMemberDto {
  @IsString()
  @IsNotEmpty()
  childId: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsIn(['parent', 'grandparent', 'nanny', 'doctor'])
  role: string;
}
