"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyMembersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
let FamilyMembersService = class FamilyMembersService {
    prisma;
    usersService;
    constructor(prisma, usersService) {
        this.prisma = prisma;
        this.usersService = usersService;
    }
    async addFamilyMember(ownerId, childId, email, role) {
        const child = await this.prisma.child.findFirst({ where: { id: childId } });
        if (!child) {
            throw new common_1.NotFoundException('Child not found');
        }
        if (child.userId !== ownerId) {
            throw new common_1.ForbiddenException('You do not have access to this child profile.');
        }
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('User with that email not found');
        }
        const existing = await this.prisma.familyMember.findFirst({
            where: { userId: user.id, childId },
        });
        if (existing) {
            throw new common_1.ConflictException('This user is already a family member of this child.');
        }
        return this.prisma.familyMember.create({
            data: { userId: user.id, childId, role },
        });
    }
    async removeFamilyMember(ownerId, familyMemberId) {
        const member = await this.prisma.familyMember.findFirst({
            where: { id: familyMemberId },
            include: { child: true },
        });
        if (!member) {
            throw new common_1.NotFoundException('Family member not found');
        }
        if (member.child.userId !== ownerId) {
            throw new common_1.ForbiddenException('Only the child owner can remove family members.');
        }
        await this.prisma.familyMember.delete({ where: { id: familyMemberId } });
        return { message: 'Family member removed' };
    }
    async listFamilyMembers(childId, userId) {
        const child = await this.prisma.child.findFirst({
            where: { id: childId },
            include: { familyMembers: { include: { user: { select: { id: true, name: true, email: true } } } } },
        });
        if (!child) {
            throw new common_1.NotFoundException('Child not found');
        }
        const isOwner = child.userId === userId;
        const isMember = child.familyMembers.some(fm => fm.userId === userId);
        if (!isOwner && !isMember) {
            throw new common_1.ForbiddenException('You do not have access to this child profile.');
        }
        return child.familyMembers;
    }
};
exports.FamilyMembersService = FamilyMembersService;
exports.FamilyMembersService = FamilyMembersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService])
], FamilyMembersService);
//# sourceMappingURL=family-members.service.js.map