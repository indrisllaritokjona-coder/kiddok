import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChildrenService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: any) {
    // Validate medicalDocument size (base64 max ~6.7MB for 5MB file)
    const MAX_DOCUMENT_SIZE = 5 * 1024 * 1024; // 5MB in bytes
    if (data.medicalDocument) {
      const base64Size = data.medicalDocument.length * 0.75;
      if (base64Size > MAX_DOCUMENT_SIZE) {
        throw new BadRequestException('Dokumenti tejkalon limitin prej 5MB. / Document exceeds 5MB limit.');
      }
    }

    // Validate documentIssueDate
    if (data.documentIssueDate) {
      const parsed = new Date(data.documentIssueDate);
      if (isNaN(parsed.getTime())) {
        throw new BadRequestException('Data e lëshimit të dokumentit nuk është e vlefshme. / Document issue date is invalid.');
      }
      data.documentIssueDate = parsed;
    }

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
      where: { id, OR: [{ userId }, { familyMembers: { some: { userId } } }] },
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

  // Issue #6: Separate method for controller-level IDOR check (no userId filter)
  async findOneById(id: string) {
    return this.prisma.child.findUnique({ where: { id } });
  }

  // Check if user has access to child (owner or family member)
  async hasAccess(childId: string, userId: string): Promise<boolean> {
    const child = await this.prisma.child.findFirst({
      where: { id: childId },
      include: { familyMembers: { where: { userId } } },
    });
    if (!child) return false;
    return child.userId === userId || child.familyMembers.length > 0;
  }

  async update(id: string, userId: string, data: any) {
    // ensure belongs to user
    await this.findOne(id, userId);

    if (data.dateOfBirth) {
        data.dateOfBirth = new Date(data.dateOfBirth);
    }

    // Validate document size on update as well
    const MAX_DOCUMENT_SIZE = 5 * 1024 * 1024;
    if (data.medicalDocument) {
      const base64Size = data.medicalDocument.length * 0.75;
      if (base64Size > MAX_DOCUMENT_SIZE) {
        throw new BadRequestException('Dokumenti tejkalon limitin prej 5MB. / Document exceeds 5MB limit.');
      }
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
