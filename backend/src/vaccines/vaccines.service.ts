import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChildrenService } from '../children/children.service';

@Injectable()
export class VaccinesService {
  constructor(
    private prisma: PrismaService,
    private childrenService: ChildrenService
  ) {}

  async create(userId: string, childId: string, data: any) {
    await this.childrenService.findOne(childId, userId);

    return this.prisma.vaccine.create({
      data: {
        ...data,
        child: { connect: { id: childId } }
      }
    });
  }

  async findAllByChild(userId: string, childId: string) {
    await this.childrenService.findOne(childId, userId);
    return this.prisma.vaccine.findMany({
      where: { childId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(userId: string, id: string) {
    const record = await this.prisma.vaccine.findUnique({
      where: { id },
      include: { child: true }
    });

    if (!record || record.child.userId !== userId) {
      throw new NotFoundException('Vaksina nuk u gjet ose nuk keni akses');
    }

    const { child, ...rest } = record;
    return rest;
  }

  async update(userId: string, id: string, data: any) {
    await this.findOne(userId, id); 
    
    return this.prisma.vaccine.update({
      where: { id },
      data
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.prisma.vaccine.delete({
      where: { id }
    });
  }
}
