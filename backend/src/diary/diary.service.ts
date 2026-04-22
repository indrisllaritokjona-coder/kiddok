import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDiaryEntryDto } from './dto/create-diary-entry.dto';

@Injectable()
export class DiaryService {
  constructor(private prisma: PrismaService) {}

  async getByChild(childId: string, userId: string) {
    // verify child belongs to user
    const child = await this.prisma.child.findFirst({ where: { id: childId, userId } });
    if (!child) throw new NotFoundException('Child not found');
    return this.prisma.diaryEntry.findMany({
      where: { childId },
      orderBy: { loggedAt: 'desc' },
    });
  }

  async create(userId: string, dto: CreateDiaryEntryDto) {
    const child = await this.prisma.child.findFirst({ where: { id: dto.childId, userId } });
    if (!child) throw new ForbiddenException('Access denied');
    return this.prisma.diaryEntry.create({
      data: {
        childId: dto.childId,
        type: dto.type,
        description: dto.description,
        severity: dto.severity,
        duration: dto.duration,
        notes: dto.notes,
        loggedAt: new Date(),
      },
    });
  }

  async update(id: string, userId: string, data: any) {
    const entry = await this.prisma.diaryEntry.findUnique({
      where: { id },
      include: { child: true },
    });
    if (!entry) throw new NotFoundException('Entry not found');
    if (entry.child.userId !== userId) throw new ForbiddenException('Access denied');
    return this.prisma.diaryEntry.update({
      where: { id },
      data,
    });
  }

  async delete(id: string, userId: string) {
    const entry = await this.prisma.diaryEntry.findUnique({
      where: { id },
      include: { child: true },
    });
    if (!entry) throw new NotFoundException('Entry not found');
    if (entry.child.userId !== userId) throw new ForbiddenException('Access denied');
    return this.prisma.diaryEntry.delete({ where: { id } });
  }
}