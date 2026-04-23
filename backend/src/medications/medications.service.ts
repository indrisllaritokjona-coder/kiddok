import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChildrenService } from '../children/children.service';
import { CreateMedicationDto, UpdateMedicationDto, CreateDoseLogDto } from './medication.dto';

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

    const medications = await this.prisma.medication.findMany({
      where: { childId },
      include: { doseLogs: { orderBy: { takenAt: 'desc' } } },
      orderBy: { createdAt: 'desc' }
    });

    const result = medications.map(med => ({
      ...med,
      adherencePct: this.calculateAdherence(med),
    }));

    const activeCount = result.filter(m => m.active).length;
    const archivedCount = result.filter(m => !m.active).length;

    return { medications: result, activeCount, archivedCount };
  }

  async findOne(userId: string, id: string) {
    const record = await this.prisma.medication.findUnique({
      where: { id },
      include: { child: true, doseLogs: { orderBy: { takenAt: 'desc' } } }
    });

    if (!record || record.child.userId !== userId) {
      throw new NotFoundException('Medikamenti nuk u gjet ose nuk keni akses');
    }

    const { child, ...rest } = record;
    return { ...rest, adherencePct: this.calculateAdherence(record) };
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

  // ─── Dose Log Methods ──────────────────────────────────────────

  async logDose(userId: string, childId: string, dto: CreateDoseLogDto) {
    // Validate medication belongs to child and user owns the child
    const medication = await this.prisma.medication.findUnique({
      where: { id: dto.medicationId },
      include: { child: true }
    });

    if (!medication) {
      throw new NotFoundException('Medikamenti nuk u gjet');
    }

    if (medication.childId !== childId) {
      throw new BadRequestException('Medikamenti nuk i përket këtij fëmije');
    }

    if (medication.child.userId !== userId) {
      throw new NotFoundException('Nuk keni akses');
    }

    if (!medication.active) {
      throw new BadRequestException('Medikamenti është i arkivuar');
    }

    const takenAt = new Date(dto.takenAt);
    if (takenAt > new Date()) {
      throw new BadRequestException('Data nuk mund të jetë në të ardhmen');
    }

    return this.prisma.medicationDoseLog.create({
      data: {
        medicationId: dto.medicationId,
        takenAt,
        notes: dto.notes || null
      }
    });
  }

  async getDoseLogs(userId: string, childId: string, medicationId: string) {
    // Verify child belongs to user
    await this.childrenService.findOne(childId, userId);

    const medication = await this.prisma.medication.findUnique({
      where: { id: medicationId },
      include: { child: true }
    });

    if (!medication || medication.childId !== childId) {
      throw new NotFoundException('Medikamenti nuk u gjet');
    }

    if (medication.child.userId !== userId) {
      throw new NotFoundException('Nuk keni akses');
    }

    const logs = await this.prisma.medicationDoseLog.findMany({
      where: { medicationId },
      orderBy: { takenAt: 'desc' }
    });

    return { logs };
  }

  async markDoseTaken(userId: string, medicationId: string, notes?: string) {
    const medication = await this.prisma.medication.findUnique({
      where: { id: medicationId },
      include: { child: true }
    });

    if (!medication) {
      throw new NotFoundException('Medikamenti nuk u gjet');
    }

    if (medication.child.userId !== userId) {
      throw new NotFoundException('Nuk keni akses');
    }

    return this.prisma.medicationDoseLog.create({
      data: {
        medicationId,
        takenAt: new Date(),
        notes: notes || null
      }
    });
  }

  // ─── Adherence Calculation ─────────────────────────────────────

  private calculateAdherence(med: {
    frequency: string;
    startDate: Date;
    endDate: Date | null;
    doseLogs: { takenAt: Date }[];
  }): number | null {
    if (med.frequency === 'as_needed') return null;

    const today = new Date();
    const startDate = new Date(med.startDate);
    const endDate = med.endDate ? new Date(med.endDate) : today;

    const effectiveEnd = endDate < today ? endDate : today;
    const diffTime = effectiveEnd.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (diffDays <= 0) return 0;

    const dosesPerDay = this.getDosesPerDay(med.frequency);
    const expectedDoses = diffDays * dosesPerDay;
    const actualDoses = med.doseLogs.length;

    return Math.min(100, Math.round((actualDoses / expectedDoses) * 100));
  }

  private getDosesPerDay(frequency: string): number {
    switch (frequency) {
      case 'once_daily': return 1;
      case 'twice_daily': return 2;
      case 'three_times_daily': return 3;
      case 'every_8_hours': return 3;
      case 'as_needed': return 0;
      default: return 1;
    }
  }
}
