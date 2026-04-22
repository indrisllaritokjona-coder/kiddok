import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, NotFoundException, ForbiddenException, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  create(@Request() req, @Body() createChildDto: CreateChildDto) {
    return this.childrenService.create(req.user.userId, createChildDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.childrenService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    // Issue #6: IDOR check at controller level (before service call)
    const child = await this.childrenService.findOneById(id);
    if (!child) {
      throw new NotFoundException('Child not found');
    }
    if (child.userId !== req.user.userId) {
      throw new ForbiddenException('You do not have access to this child profile.');
    }
    return child;
  }

  @Patch(':id')
  async update(@Request() req, @Param('id') id: string, @Body() updateChildDto: UpdateChildDto) {
    // Issue #6: IDOR check at controller level (before service call)
    const child = await this.childrenService.findOneById(id);
    if (!child) {
      throw new NotFoundException('Child not found');
    }
    if (child.userId !== req.user.userId) {
      throw new ForbiddenException('You do not have access to this child profile.');
    }
    return this.childrenService.update(id, req.user.userId, updateChildDto);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    // Issue #6: IDOR check at controller level (before service call)
    const child = await this.childrenService.findOneById(id);
    if (!child) {
      throw new NotFoundException('Child not found');
    }
    if (child.userId !== req.user.userId) {
      throw new ForbiddenException('You do not have access to this child profile.');
    }
    return this.childrenService.remove(id, req.user.userId);
  }
}
