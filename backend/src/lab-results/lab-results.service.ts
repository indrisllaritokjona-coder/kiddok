import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChildrenService } from '../children/children.service';
import { CreateLabResultDto, UpdateLabResultDto } from './lab-result.dto';
const atob = (str: string) => Buffer.from(str, 'base64').toString('binary');

const MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024; // 10MB decoded
const MAX_ATTACHMENTS = 5;
const ALLOWED_BASE64_HEADERS = ['/9j/', 'iVBOR', 'UEs', 'JVBER', 'dGV4dC']; // jpg/png/pdf markers

function isValidBase64(str: string): boolean {
  try {
    // Must match base64 charset
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(str)) return false;
    const decoded = atob(str);
    // Check for null bytes that might indicate binary corruption
    if (decoded.includes('\0')) return false;
    return true;
  } catch {
    return false;
  }
}

function getDecodedSize(base64: string): number {
  try {
    return atob(base64).length;
  } catch {
    return 0;
  }
}

@Injectable()
export class LabResultsService {
  constructor(
    private prisma: PrismaService,
    private childrenService: ChildrenService,
  ) {}

  private validateAttachments(attachments: string[] | undefined): void {
    if (!attachments || attachments.length === 0) return;

    if (attachments.length > MAX_ATTACHMENTS) {
      throw new BadRequestException(`Maximum ${MAX_ATTACHMENTS} attachments allowed per result`);
    }

    for (const att of attachments) {
      if (!isValidBase64(att)) {
        throw new BadRequestException('Invalid attachment encoding');
      }
      const decodedSize = getDecodedSize(att);
      if (decodedSize > MAX_ATTACHMENT_SIZE) {
        throw new BadRequestException(`Attachment exceeds maximum size of 10MB`);
      }
      // Check for embedded filenames/data URI prefix (shouldn't have them in raw base64)
      if (att.includes('data:') || att.includes(';base64,')) {
        throw new BadRequestException('Invalid attachment format: contains data URI prefix');
      }
    }
  }

  async create(userId: string, childId: string, data: CreateLabResultDto) {
    await this.childrenService.findOne(childId, userId);
    this.validateAttachments(data.attachments);

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
    this.validateAttachments(data.attachments);

    return this.prisma.labResult.update({
      where: { id },
      data: {
        ...(data.testName !== undefined && { testName: data.testName }),
        ...(data.result !== undefined && { result: data.result }),
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
