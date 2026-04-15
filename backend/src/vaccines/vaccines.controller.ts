import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VaccinesService } from './vaccines.service';

@UseGuards(AuthGuard('jwt'))
@Controller('vaccines')
export class VaccinesController {
  constructor(private readonly vaccinesService: VaccinesService) {}

  @Post(':childId')
  create(@Request() req, @Param('childId') childId: string, @Body() createData: any) {
    return this.vaccinesService.create(req.user.userId, childId, createData);
  }

  @Get('child/:childId')
  findAllByChild(@Request() req, @Param('childId') childId: string) {
    return this.vaccinesService.findAllByChild(req.user.userId, childId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.vaccinesService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateData: any) {
    return this.vaccinesService.update(req.user.userId, id, updateData);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.vaccinesService.remove(req.user.userId, id);
  }
}
