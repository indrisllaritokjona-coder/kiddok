import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ParentService } from './parent.service';
import { UpdateParentDto } from './dto/update-parent.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('parent')
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  @Get()
  getProfile(@Request() req) {
    return this.parentService.getProfile(req.user.userId);
  }

  @Patch()
  updateProfile(@Request() req, @Body() dto: UpdateParentDto) {
    return this.parentService.updateProfile(req.user.userId, dto);
  }
}