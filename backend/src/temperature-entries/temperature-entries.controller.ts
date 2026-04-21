import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TemperatureEntriesService } from './temperature-entries.service';

@Controller('temperature-entries')
@UseGuards(AuthGuard('jwt'))
export class TemperatureEntriesController {
  constructor(private readonly tempService: TemperatureEntriesService) {}

  @Post()
  async create(@Request() req: any, @Body() data: any) {
    return this.tempService.create(req.user.userId, data);
  }

  @Get('child/:childId')
  async findByChild(@Request() req: any, @Param('childId') childId: string) {
    return this.tempService.findByChild(req.user.userId, childId);
  }

  @Delete(':id')
  async delete(@Request() req: any, @Param('id') id: string) {
    return this.tempService.delete(req.user.userId, id);
  }
}