import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, NotFoundException, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  create(@Request() req, @Body() createChildDto: CreateChildDto) {
    return this.childrenService.create(req.user.userId, createChildDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.childrenService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    const child = await this.childrenService.findOne(id, req.user.userId);
    if (!child) {
      throw new NotFoundException('Child not found');
    }
    if (child.userId !== req.user.userId) {
      throw new ForbiddenException('You do not have access to this child profile.');
    }
    return child;
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateChildDto: UpdateChildDto) {
    return this.childrenService.update(id, req.user.userId, updateChildDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.childrenService.remove(id, req.user.userId);
  }
}
