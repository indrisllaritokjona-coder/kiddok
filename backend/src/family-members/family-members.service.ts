import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class FamilyMembersService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async addFamilyMember(ownerId: string, childId: string, email: string, role: string) {
    // Verify child exists and user owns it
    const child = await this.prisma.child.findFirst({ where: { id: childId } });
    if (!child) {
      throw new NotFoundException('Child not found');
    }
    if (child.userId !== ownerId) {
      throw new ForbiddenException('You do not have access to this child profile.');
    }

    // Find user by email
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User with that email not found');
    }

    // Check if already a member
    const existing = await this.prisma.familyMember.findFirst({
      where: { userId: user.id, childId },
    });
    if (existing) {
      throw new ConflictException('This user is already a family member of this child.');
    }

    return this.prisma.familyMember.create({
      data: { userId: user.id, childId, role },
    });
  }

  async removeFamilyMember(ownerId: string, familyMemberId: string) {
    const member = await this.prisma.familyMember.findFirst({
      where: { id: familyMemberId },
      include: { child: true },
    });
    if (!member) {
      throw new NotFoundException('Family member not found');
    }
    if (member.child.userId !== ownerId) {
      throw new ForbiddenException('Only the child owner can remove family members.');
    }

    await this.prisma.familyMember.delete({ where: { id: familyMemberId } });
    return { message: 'Family member removed' };
  }

  async listFamilyMembers(childId: string, userId: string) {
    const child = await this.prisma.child.findFirst({
      where: { id: childId },
      include: { familyMembers: { include: { user: { select: { id: true, name: true, email: true } } } } },
    });
    if (!child) {
      throw new NotFoundException('Child not found');
    }

    // Owner or family member can view
    const isOwner = child.userId === userId;
    const isMember = child.familyMembers.some(fm => fm.userId === userId);
    if (!isOwner && !isMember) {
      throw new ForbiddenException('You do not have access to this child profile.');
    }

    return child.familyMembers;
  }
}
