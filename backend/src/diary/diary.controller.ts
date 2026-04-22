import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DiaryService } from './diary.service';
import { CreateDiaryEntryDto } from './dto/create-diary-entry.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Get('child/:childId')
  getByChild(@Request() req, @Param('childId') childId: string) {
    return this.diaryService.getByChild(childId, req.user.userId);
  }

  @Post()
  create(@Request() req, @Body() dto: CreateDiaryEntryDto) {
    return this.diaryService.create(req.user.userId, dto);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() dto: any) {
    return this.diaryService.update(id, req.user.userId, dto);
  }

  @Delete(':id')
  delete(@Request() req, @Param('id') id: string) {
    return this.diaryService.delete(id, req.user.userId);
  }
}