import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IllnessesService } from './illnesses.service';
import { CreateIllnessDto } from './dto/create-illness.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('illnesses')
export class IllnessesController {
  constructor(private readonly illnessesService: IllnessesService) {}

  @Get('child/:childId')
  getByChild(@Request() req, @Param('childId') childId: string) {
    return this.illnessesService.getByChild(childId, req.user.userId);
  }

  @Post()
  create(@Request() req, @Body() dto: CreateIllnessDto) {
    return this.illnessesService.create(req.user.userId, dto);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() dto: any) {
    return this.illnessesService.update(id, req.user.userId, dto);
  }

  @Delete(':id')
  delete(@Request() req, @Param('id') id: string) {
    return this.illnessesService.delete(id, req.user.userId);
  }
}