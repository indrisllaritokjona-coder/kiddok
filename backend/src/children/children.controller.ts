import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChildrenService } from './children.service';

@UseGuards(AuthGuard('jwt'))
@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  create(@Request() req, @Body() createChildDto: any) {
    return this.childrenService.create(req.user.userId, createChildDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.childrenService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.childrenService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateData: any) {
    return this.childrenService.update(id, req.user.userId, updateData);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.childrenService.remove(id, req.user.userId);
  }
}
