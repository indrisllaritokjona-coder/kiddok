import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TemperatureEntriesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: any) {
    // Validate temperature range
    if (data.temperature < 35.0 || data.temperature > 42.0) {
      throw new BadRequestException('Temperature must be between 35.0°C and 42.0°C');
    }

    // Validate measuredAt is not in the future
    const measuredAt = new Date(data.measuredAt);
    if (isNaN(measuredAt.getTime())) {
      throw new BadRequestException('Invalid measuredAt date');
    }
    if (measuredAt > new Date()) {
      throw new BadRequestException('measuredAt cannot be in the future');
    }

    // Validate location enum
    const validLocations = ['axillary', 'oral', 'rectal', 'ear', 'forehead'];
    if (data.location && !validLocations.includes(data.location)) {
      throw new BadRequestException(`Location must be one of: ${validLocations.join(', ')}`);
    }

    // Verify child belongs to user
    const child = await this.prisma.child.findFirst({
      where: { id: data.childId, userId },
    });
    if (!child) {
      throw new NotFoundException('Child not found or access denied');
    }

    return this.prisma.temperatureEntry.create({
      data: {
        childId: data.childId,
        temperature: data.temperature,
        measuredAt: measuredAt,
        location: data.location || null,
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

    // Default to last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return this.prisma.temperatureEntry.findMany({
      where: {
        childId,
        measuredAt: { gte: thirtyDaysAgo },
      },
      orderBy: { measuredAt: 'desc' },
    });
  }

  async delete(userId: string, id: string) {
    // Find the entry and verify ownership via child
    const entry = await this.prisma.temperatureEntry.findFirst({
      where: { id },
      include: { child: true },
    });
    if (!entry) {
      throw new NotFoundException('Temperature entry not found');
    }
    if (entry.child.userId !== userId) {
      throw new NotFoundException('Access denied');
    }

    return this.prisma.temperatureEntry.delete({ where: { id } });
  }
}