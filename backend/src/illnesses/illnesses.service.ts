import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIllnessDto } from './dto/create-illness.dto';
import { UpdateIllnessDto } from './dto/update-illness.dto';

@Injectable()
export class IllnessesService {
  constructor(private prisma: PrismaService) {}

  async getByChild(childId: string, userId: string) {
    const child = await this.prisma.child.findFirst({ where: { id: childId, userId } });
    if (!child) throw new NotFoundException('Child not found');
    return this.prisma.illnessEpisode.findMany({
      where: { childId },
      orderBy: { loggedAt: 'desc' },
    });
  }

  async create(userId: string, dto: CreateIllnessDto) {
    const child = await this.prisma.child.findFirst({ where: { id: dto.childId, userId } });
    if (!child) throw new ForbiddenException('Access denied');
    return this.prisma.illnessEpisode.create({
      data: {
        childId: dto.childId,
        title: dto.title,
        symptoms: dto.symptoms,
        medications: dto.medications,
        notes: dto.notes,
        loggedAt: new Date(),
      },
    });
  }

  async update(id: string, userId: string, data: UpdateIllnessDto) {
    const illness = await this.prisma.illnessEpisode.findUnique({
      where: { id },
      include: { child: true },
    });
    if (!illness) throw new NotFoundException('Illness not found');
    if (illness.child.userId !== userId) throw new ForbiddenException('Access denied');
    return this.prisma.illnessEpisode.update({ where: { id }, data });
  }

  async delete(id: string, userId: string) {
    const illness = await this.prisma.illnessEpisode.findUnique({
      where: { id },
      include: { child: true },
    });
    if (!illness) throw new NotFoundException('Illness not found');
    if (illness.child.userId !== userId) throw new ForbiddenException('Access denied');
    return this.prisma.illnessEpisode.delete({ where: { id } });
  }
}