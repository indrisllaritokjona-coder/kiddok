import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChildrenService } from '../children/children.service';
import { CreateMedicationDto, UpdateMedicationDto } from './medication.dto';

@Injectable()
export class MedicationsService {
  constructor(
    private prisma: PrismaService,
    private childrenService: ChildrenService
  ) {}

  async create(userId: string, childId: string, data: CreateMedicationDto) {
    await this.childrenService.findOne(childId, userId);

    return this.prisma.medication.create({
      data: {
        name: data.name,
        dosage: data.dosage,
        frequency: data.frequency,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        prescribedBy: data.prescribedBy || null,
        notes: data.notes || null,
        active: data.active !== undefined ? data.active : true,
        child: { connect: { id: childId } }
      }
    });
  }

  async findAllByChild(userId: string, childId: string) {
    await this.childrenService.findOne(childId, userId);
    return this.prisma.medication.findMany({
      where: { childId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(userId: string, id: string) {
    const record = await this.prisma.medication.findUnique({
      where: { id },
      include: { child: true }
    });

    if (!record || record.child.userId !== userId) {
      throw new NotFoundException('Medikamenti nuk u gjet ose nuk keni akses');
    }

    const { child, ...rest } = record;
    return rest;
  }

  async update(userId: string, id: string, data: UpdateMedicationDto) {
    await this.findOne(userId, id);

    return this.prisma.medication.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.dosage && { dosage: data.dosage }),
        ...(data.frequency && { frequency: data.frequency }),
        ...(data.startDate && { startDate: new Date(data.startDate) }),
        ...(data.endDate !== undefined && { endDate: data.endDate ? new Date(data.endDate) : null }),
        ...(data.prescribedBy !== undefined && { prescribedBy: data.prescribedBy }),
        ...(data.notes !== undefined && { notes: data.notes }),
        ...(data.active !== undefined && { active: data.active })
      }
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.prisma.medication.delete({
      where: { id }
    });
  }
}