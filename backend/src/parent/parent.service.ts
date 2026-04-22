import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateParentDto } from './dto/update-parent.dto';

@Injectable()
export class ParentService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    let profile = await this.prisma.parentProfile.findUnique({
      where: { userId },
    });
    if (!profile) {
      // auto-create from User
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new NotFoundException('User not found');
      profile = await this.prisma.parentProfile.create({
        data: {
          name: user.name,
          surname: '',
          phone: '',
          userId: user.id,
        },
      });
    }
    return profile;
  }

  async updateProfile(userId: string, dto: UpdateParentDto) {
    let profile = await this.prisma.parentProfile.findUnique({
      where: { userId },
    });
    if (!profile) {
      // auto-create
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new NotFoundException('User not found');
      profile = await this.prisma.parentProfile.create({
        data: {
          name: dto.name ?? user.name,
          surname: dto.surname ?? '',
          phone: dto.phone ?? '',
          userId: user.id,
        },
      });
      return profile;
    }
    return this.prisma.parentProfile.update({
      where: { userId },
      data: dto,
    });
  }
}