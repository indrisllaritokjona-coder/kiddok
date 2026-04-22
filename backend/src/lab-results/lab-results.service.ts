import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChildrenService } from '../children/children.service';
import { CreateLabResultDto, UpdateLabResultDto } from './lab-result.dto';

@Injectable()
export class LabResultsService {
  constructor(
    private prisma: PrismaService,
    private childrenService: ChildrenService,
  ) {}

  async create(userId: string, childId: string, data: CreateLabResultDto) {
    await this.childrenService.findOne(childId, userId);

    return this.prisma.labResult.create({
      data: {
        testName: data.testName,
        result: data.result,
        unit: data.unit || null,
        referenceRange: data.referenceRange || null,
        date: new Date(data.date),
        doctor: data.doctor || null,
        notes: data.notes || null,
        child: { connect: { id: childId } },
      },
    });
  }

  async findAllByChild(userId: string, childId: string) {
    await this.childrenService.findOne(childId, userId);
    return this.prisma.labResult.findMany({
      where: { childId },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const record = await this.prisma.labResult.findUnique({
      where: { id },
      include: { child: true },
    });

    if (!record || record.child.userId !== userId) {
      throw new NotFoundException('Rezultati i laboratorit nuk u gjet ose nuk keni akses');
    }

    return record;
  }

  async update(userId: string, id: string, data: UpdateLabResultDto) {
    await this.findOne(userId, id);

    return this.prisma.labResult.update({
      where: { id },
      data: {
        ...(data.testName && { testName: data.testName }),
        ...(data.result && { result: data.result }),
        ...(data.unit !== undefined && { unit: data.unit }),
        ...(data.referenceRange !== undefined && { referenceRange: data.referenceRange }),
        ...(data.date && { date: new Date(data.date) }),
        ...(data.doctor !== undefined && { doctor: data.doctor }),
        ...(data.notes !== undefined && { notes: data.notes }),
      },
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.prisma.labResult.delete({
      where: { id },
    });
  }
}