import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ImportBackupDto } from './import.dto';

@Injectable()
export class ImportService {
  constructor(private prisma: PrismaService) {}

  /**
   * Import a child and all related health records from a JSON backup.
   * Validates the structure before importing.
   */
  async importBackup(userId: string, data: ImportBackupDto): Promise<{ childId: string; counts: Record<string, number> }> {
    this.validateBackupStructure(data);

    const { child } = data;
    const counts: Record<string, number> = {};

    // Create the child
    const createdChild = await this.prisma.child.create({
      data: {
        name: child.name,
        dateOfBirth: new Date(child.dateOfBirth),
        gender: child.gender || null,
        bloodType: child.bloodType || null,
        allergies: child.allergies || null,
        birthWeight: child.birthWeight || null,
        deliveryDoctor: child.deliveryDoctor || null,
        criticalAllergies: child.criticalAllergies || null,
        medicalNotes: child.medicalNotes || null,
        user: { connect: { id: userId } },
      },
    });

    counts['child'] = 1;

    // Import temperature entries
    if (child.temperatureEntries?.length) {
      await this.prisma.temperatureEntry.createMany({
        data: child.temperatureEntries.map(e => ({
          childId: createdChild.id,
          temperature: e.temperature,
          measuredAt: new Date(e.measuredAt),
          location: e.location || null,
          notes: e.notes || null,
        })),
      });
      counts['temperatureEntries'] = child.temperatureEntries.length;
    }

    // Import growth entries
    if (child.growthEntries?.length) {
      await this.prisma.growthEntry.createMany({
        data: child.growthEntries.map(e => ({
          childId: createdChild.id,
          height: e.height || null,
          weight: e.weight || null,
          measuredAt: new Date(e.measuredAt),
          notes: e.notes || null,
        })),
      });
      counts['growthEntries'] = child.growthEntries.length;
    }

    // Import vaccines
    if (child.vaccines?.length) {
      await this.prisma.vaccine.createMany({
        data: child.vaccines.map(v => ({
          childId: createdChild.id,
          name: v.name,
          dateAdministered: v.dateAdministered ? new Date(v.dateAdministered) : null,
          dueDate: v.dueDate ? new Date(v.dueDate) : null,
          provider: v.provider || null,
          notes: v.notes || null,
          completed: v.completed,
        })),
      });
      counts['vaccines'] = child.vaccines.length;
    }

    // Import medications
    if (child.medications?.length) {
      await this.prisma.medication.createMany({
        data: child.medications.map(m => ({
          childId: createdChild.id,
          name: m.name,
          dosage: m.dosage,
          frequency: m.frequency,
          startDate: new Date(m.startDate),
          endDate: m.endDate ? new Date(m.endDate) : null,
          prescribedBy: m.prescribedBy || null,
          notes: m.notes || null,
          active: m.active,
        })),
      });
      counts['medications'] = child.medications.length;
    }

    // Import appointments
    if (child.appointments?.length) {
      await this.prisma.appointment.createMany({
        data: child.appointments.map(a => ({
          childId: createdChild.id,
          title: a.title,
          dateTime: new Date(a.dateTime),
          doctorName: a.doctorName || null,
          location: a.location || null,
          notes: a.notes || null,
        })),
      });
      counts['appointments'] = child.appointments.length;
    }

    // Import lab results
    if (child.labResults?.length) {
      await this.prisma.labResult.createMany({
        data: child.labResults.map(l => ({
          childId: createdChild.id,
          testName: l.testName,
          result: l.result,
          unit: l.unit || null,
          referenceRange: l.referenceRange || null,
          date: new Date(l.date),
          doctor: l.doctor || null,
          notes: l.notes || null,
        })),
      });
      counts['labResults'] = child.labResults.length;
    }

    // Import diary entries
    if (child.diaryEntries?.length) {
      await this.prisma.diaryEntry.createMany({
        data: child.diaryEntries.map(d => ({
          childId: createdChild.id,
          type: d.type,
          description: d.description || null,
          severity: d.severity || null,
          duration: d.duration || null,
          loggedAt: new Date(d.loggedAt),
          notes: d.notes || null,
        })),
      });
      counts['diaryEntries'] = child.diaryEntries.length;
    }

    // Import illness episodes
    if (child.illnessEpisodes?.length) {
      await this.prisma.illnessEpisode.createMany({
        data: child.illnessEpisodes.map(i => ({
          childId: createdChild.id,
          title: i.title,
          symptoms: i.symptoms || null,
          medications: i.medications || null,
          notes: i.notes || null,
          loggedAt: new Date(i.loggedAt),
        })),
      });
      counts['illnessEpisodes'] = child.illnessEpisodes.length;
    }

    return { childId: createdChild.id, counts };
  }

  private validateBackupStructure(data: ImportBackupDto): void {
    if (!data) {
      throw new BadRequestException('Invalid backup: empty body');
    }
    if (!data.child) {
      throw new BadRequestException('Invalid backup: missing "child" field');
    }
    if (!data.child.name) {
      throw new BadRequestException('Invalid backup: child "name" is required');
    }
    if (!data.child.dateOfBirth) {
      throw new BadRequestException('Invalid backup: child "dateOfBirth" is required');
    }
    const dob = new Date(data.child.dateOfBirth);
    if (isNaN(dob.getTime())) {
      throw new BadRequestException('Invalid backup: child "dateOfBirth" is not a valid date');
    }
  }
}
