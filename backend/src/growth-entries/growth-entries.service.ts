import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GrowthEntriesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: any) {
    // Validate at least one of height or weight is provided
    if (data.height === undefined && data.weight === undefined) {
      throw new BadRequestException('At least one of height or weight must be provided');
    }

    // Validate height range
    if (data.height !== undefined && (data.height < 30 || data.height > 200)) {
      throw new BadRequestException('Height must be between 30 cm and 200 cm');
    }

    // Validate weight range
    if (data.weight !== undefined && (data.weight < 1 || data.weight > 150)) {
      throw new BadRequestException('Weight must be between 1 kg and 150 kg');
    }

    // Validate measuredAt is not in the future
    const measuredAt = new Date(data.measuredAt);
    if (isNaN(measuredAt.getTime())) {
      throw new BadRequestException('Invalid measuredAt date');
    }
    if (measuredAt > new Date()) {
      throw new BadRequestException('measuredAt cannot be in the future');
    }

    // Verify child belongs to user
    const child = await this.prisma.child.findFirst({
      where: { id: data.childId, userId },
    });
    if (!child) {
      throw new NotFoundException('Child not found or access denied');
    }

    return this.prisma.growthEntry.create({
      data: {
        childId: data.childId,
        height: data.height ?? null,
        weight: data.weight ?? null,
        measuredAt: measuredAt,
        notes: data.notes || null,
      },
    });
  }

  async findByChild(userId: string, childId: string) {
    // Verify child belongs to user
    const child = await this.prisma.child.findFirst({
      where: { id: childId, userId },
    });
    if (!child) {
      throw new NotFoundException('Child not found or access denied');
    }

    return this.prisma.growthEntry.findMany({
      where: { childId },
      orderBy: { measuredAt: 'desc' },
    });
  }

  async delete(userId: string, id: string) {
    const entry = await this.prisma.growthEntry.findFirst({
      where: { id },
      include: { child: true },
    });
    if (!entry) {
      throw new NotFoundException('Growth entry not found');
    }
    if (entry.child.userId !== userId) {
      throw new NotFoundException('Access denied');
    }

    return this.prisma.growthEntry.delete({ where: { id } });
  }
}
