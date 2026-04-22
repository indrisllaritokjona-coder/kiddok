import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LabResultsService } from './lab-results.service';
import { CreateLabResultDto, UpdateLabResultDto } from './lab-result.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('lab-results')
@UsePipes(new ValidationPipe({ transform: true }))
export class LabResultsController {
  constructor(private readonly labResultsService: LabResultsService) {}

  @Post(':childId')
  create(@Request() req: any, @Param('childId') childId: string, @Body() createDto: CreateLabResultDto) {
    return this.labResultsService.create(req.user.userId, childId, createDto);
  }

  @Get('child/:childId')
  findAllByChild(@Request() req: any, @Param('childId') childId: string) {
    return this.labResultsService.findAllByChild(req.user.userId, childId);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.labResultsService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() updateDto: UpdateLabResultDto) {
    return this.labResultsService.update(req.user.userId, id, updateDto);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.labResultsService.remove(req.user.userId, id);
  }
}