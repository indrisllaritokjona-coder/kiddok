import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MedicationsService } from './medications.service';
import { CreateMedicationDto, UpdateMedicationDto } from './medication.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('medications')
@UsePipes(new ValidationPipe({ transform: true }))
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Post(':childId')
  create(@Request() req, @Param('childId') childId: string, @Body() createDto: CreateMedicationDto) {
    return this.medicationsService.create(req.user.userId, childId, createDto);
  }

  @Get('child/:childId')
  findAllByChild(@Request() req, @Param('childId') childId: string) {
    return this.medicationsService.findAllByChild(req.user.userId, childId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.medicationsService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateDto: UpdateMedicationDto) {
    return this.medicationsService.update(req.user.userId, id, updateDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.medicationsService.remove(req.user.userId, id);
  }
}