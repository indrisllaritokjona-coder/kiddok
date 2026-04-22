import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GrowthEntriesService } from './growth-entries.service';
import { CreateGrowthEntryDto } from './dto/create-growth-entry.dto';

@Controller('growth-entries')
@UseGuards(AuthGuard('jwt'))
export class GrowthEntriesController {
  constructor(private readonly growthService: GrowthEntriesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Request() req: any, @Body() data: CreateGrowthEntryDto) {
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
