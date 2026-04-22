import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class ShareService {
  constructor(private prisma: PrismaService) {}

  async createShareLink(childId: string, userId: string, expiresAt: Date) {
    // Verify child exists and user owns it (or is a family member)
    const child = await this.prisma.child.findFirst({
      where: { id: childId },
      include: { familyMembers: true },
    });

    if (!child) {
      throw new NotFoundException('Child not found');
    }

    const isOwner = child.userId === userId;
    const isFamilyMember = child.familyMembers.some(fm => fm.userId === userId);
    if (!isOwner && !isFamilyMember) {
      throw new ForbiddenException('You do not have access to this child profile.');
    }

    const token = randomUUID();
    const shareLink = await this.prisma.shareLink.create({
      data: {
        token,
        childId,
        createdBy: userId,
        expiresAt,
      },
    });

    return shareLink;
  }

  async getSharedChild(token: string) {
    const shareLink = await this.prisma.shareLink.findUnique({
      where: { token },
      include: {
        child: {
          include: {
            temperatureEntries: {
              orderBy: { measuredAt: 'desc' },
              take: 30,
            },
            growthEntries: {
              orderBy: { measuredAt: 'desc' },
              take: 10,
            },
            vaccines: true,
          },
        },
      },
    });

    if (!shareLink) {
      throw new NotFoundException('Share link not found');
    }

    if (new Date() > shareLink.expiresAt) {
      throw new BadRequestException('Share link has expired');
    }

    return shareLink;
  }

  async revokeShareLink(shareLinkId: string, userId: string) {
    const shareLink = await this.prisma.shareLink.findFirst({
      where: { id: shareLinkId },
    });

    if (!shareLink) {
      throw new NotFoundException('Share link not found');
    }

    if (shareLink.createdBy !== userId) {
      throw new ForbiddenException('You can only revoke your own share links.');
    }

    await this.prisma.shareLink.delete({ where: { id: shareLinkId } });
    return { message: 'Share link revoked' };
  }

  async listShareLinks(childId: string, userId: string) {
    const child = await this.prisma.child.findFirst({
      where: { id: childId },
    });

    if (!child) {
      throw new NotFoundException('Child not found');
    }

    if (child.userId !== userId) {
      throw new ForbiddenException('You do not have access to this child profile.');
    }

    return this.prisma.shareLink.findMany({
      where: { childId },
      select: {
        id: true,
        token: true,
        expiresAt: true,
        createdAt: true,
      },
    });
  }
}
