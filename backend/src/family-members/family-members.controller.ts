import { Controller, Post, Delete, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FamilyMembersService } from './family-members.service';
import { AddFamilyMemberDto } from './dto/add-family-member.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('family-members')
export class FamilyMembersController {
  constructor(private readonly familyMembersService: FamilyMembersService) {}

  @Post()
  add(@Request() req, @Body() dto: AddFamilyMemberDto) {
    return this.familyMembersService.addFamilyMember(req.user.userId, dto.childId, dto.email, dto.role);
  }

  @Get('child/:childId')
  list(@Request() req, @Param('childId') childId: string) {
    return this.familyMembersService.listFamilyMembers(childId, req.user.userId);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.familyMembersService.removeFamilyMember(req.user.userId, id);
  }
}
