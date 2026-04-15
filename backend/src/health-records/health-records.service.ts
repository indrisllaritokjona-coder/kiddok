import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChildrenService } from '../children/children.service';

@Injectable()
export class HealthRecordsService {
  constructor(
    private prisma: PrismaService,
    private childrenService: ChildrenService
  ) {}

  async create(userId: string, childId: string, data: any) {
    // Kjo verifikon nqs ky fëmijë i përket këtij prindi; përndryshe thyen (throws)
    await this.childrenService.findOne(childId, userId);

    return this.prisma.healthRecord.create({
      data: {
        ...data,
        child: { connect: { id: childId } }
      }
    });
  }

  async findAllByChild(userId: string, childId: string) {
    await this.childrenService.findOne(childId, userId);
    return this.prisma.healthRecord.findMany({
      where: { childId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(userId: string, id: string) {
    const record = await this.prisma.healthRecord.findUnique({
      where: { id },
      include: { child: true }
    });

    if (!record || record.child.userId !== userId) {
      throw new NotFoundException('Regjistrimi nuk u gjet ose nuk keni akses');
    }

    // Heqim te dhenat e thella nga responsi për siguri
    const { child, ...rest } = record;
    return rest;
  }

  async update(userId: string, id: string, data: any) {
    await this.findOne(userId, id); // Sigurohet që prindi ka akses para modifikimit
    
    return this.prisma.healthRecord.update({
      where: { id },
      data
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.prisma.healthRecord.delete({
      where: { id }
    });
  }
}
