import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: any) {
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new ConflictException('Ky email ekziston tashmë.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        pin: data.pin || null,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
