import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChildrenService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: any) {
    return this.prisma.child.create({
      data: {
        ...data,
        dateOfBirth: new Date(data.dateOfBirth),
        user: { connect: { id: userId } }
      }
    });
  }

  async findAllByUser(userId: string) {
    return this.prisma.child.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const child = await this.prisma.child.findFirst({
      where: { id, userId },
      include: {
        healthRecords: true,
        vaccines: true
      }
    });

    if (!child) {
      throw new NotFoundException('Fëmija nuk u gjet ose nuk keni akses!');
    }
    return child;
  }

  async update(id: string, userId: string, data: any) {
    // ensure belongs to user
    await this.findOne(id, userId); 

    if (data.dateOfBirth) {
        data.dateOfBirth = new Date(data.dateOfBirth);
    }

    return this.prisma.child.update({
      where: { id },
      data,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.child.delete({
      where: { id },
    });
  }
}
