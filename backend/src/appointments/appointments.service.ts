import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChildrenService } from '../children/children.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    private prisma: PrismaService,
    private childrenService: ChildrenService,
  ) {}

  async create(userId: string, childId: string, data: CreateAppointmentDto) {
    await this.childrenService.findOne(childId, userId);

    return this.prisma.appointment.create({
      data: {
        title: data.title,
        doctorName: data.doctorName || null,
        location: data.location || null,
        dateTime: new Date(data.dateTime),
        notes: data.notes || null,
        child: { connect: { id: childId } },
      },
    });
  }

  async findAllByChild(userId: string, childId: string) {
    await this.childrenService.findOne(childId, userId);
    return this.prisma.appointment.findMany({
      where: { childId },
      orderBy: { dateTime: 'asc' },
    });
  }

  async findOne(userId: string, id: string) {
    const record = await this.prisma.appointment.findUnique({
      where: { id },
      include: { child: true },
    });

    if (!record || record.child.userId !== userId) {
      throw new NotFoundException('Termini nuk u gjet ose nuk keni akses');
    }

    return record;
  }

  async update(userId: string, id: string, data: UpdateAppointmentDto) {
    await this.findOne(userId, id);

    return this.prisma.appointment.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.doctorName !== undefined && { doctorName: data.doctorName }),
        ...(data.location !== undefined && { location: data.location }),
        ...(data.dateTime && { dateTime: new Date(data.dateTime) }),
        ...(data.notes !== undefined && { notes: data.notes }),
      },
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.prisma.appointment.delete({
      where: { id },
    });
  }
}