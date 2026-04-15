import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HealthRecordsService } from './health-records.service';

@UseGuards(AuthGuard('jwt'))
@Controller('health-records')
export class HealthRecordsController {
  constructor(private readonly healthRecordsService: HealthRecordsService) {}

  @Post(':childId')
  create(@Request() req, @Param('childId') childId: string, @Body() createData: any) {
    return this.healthRecordsService.create(req.user.userId, childId, createData);
  }

  @Get('child/:childId')
  findAllByChild(@Request() req, @Param('childId') childId: string) {
    return this.healthRecordsService.findAllByChild(req.user.userId, childId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.healthRecordsService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateData: any) {
    return this.healthRecordsService.update(req.user.userId, id, updateData);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.healthRecordsService.remove(req.user.userId, id);
  }
}
