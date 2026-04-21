import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GrowthEntriesService } from './growth-entries.service';

@Controller('growth-entries')
@UseGuards(AuthGuard('jwt'))
export class GrowthEntriesController {
  constructor(private readonly growthService: GrowthEntriesService) {}

  @Post()
  async create(@Request() req: any, @Body() data: any) {
    return this.growthService.create(req.user.userId, data);
  }

  @Get('child/:childId')
  async findByChild(@Request() req: any, @Param('childId') childId: string) {
    return this.growthService.findByChild(req.user.userId, childId);
  }

  @Delete(':id')
  async delete(@Request() req: any, @Param('id') id: string) {
    return this.growthService.delete(req.user.userId, id);
  }
}
