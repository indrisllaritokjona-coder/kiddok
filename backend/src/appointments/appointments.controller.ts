import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './appointment.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('appointments')
@UsePipes(new ValidationPipe({ transform: true }))
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post(':childId')
  create(@Request() req: any, @Param('childId') childId: string, @Body() createDto: CreateAppointmentDto) {
    return this.appointmentsService.create(req.user.userId, childId, createDto);
  }

  @Get('child/:childId')
  findAllByChild(@Request() req: any, @Param('childId') childId: string) {
    return this.appointmentsService.findAllByChild(req.user.userId, childId);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.appointmentsService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() updateDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(req.user.userId, id, updateDto);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.appointmentsService.remove(req.user.userId, id);
  }
}