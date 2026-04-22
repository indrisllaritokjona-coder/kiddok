import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ShareService } from './share.service';
import { CreateShareLinkDto } from './dto/create-share-link.dto';

@Controller('share')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @Post(':childId')
  @UseGuards(AuthGuard('jwt'))
  create(@Request() req, @Param('childId') childId: string, @Body() dto: CreateShareLinkDto) {
    const expiresAt = new Date(dto.expiresAt);
    if (expiresAt <= new Date()) {
      throw new Error('Expiry date must be in the future');
    }
    return this.shareService.createShareLink(childId, req.user.userId, expiresAt);
  }

  @Get(':token')
  view(@Param('token') token: string) {
    return this.shareService.getSharedChild(token);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  revoke(@Request() req, @Param('id') id: string) {
    return this.shareService.revokeShareLink(id, req.user.userId);
  }

  @Get('child/:childId')
  @UseGuards(AuthGuard('jwt'))
  list(@Request() req, @Param('childId') childId: string) {
    return this.shareService.listShareLinks(childId, req.user.userId);
  }
}
