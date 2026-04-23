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
exports.ShareService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const crypto_1 = require("crypto");
let ShareService = class ShareService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createShareLink(childId, userId, expiresAt) {
        const child = await this.prisma.child.findFirst({
            where: { id: childId },
            include: { familyMembers: true },
        });
        if (!child) {
            throw new common_1.NotFoundException('Child not found');
        }
        const isOwner = child.userId === userId;
        const isFamilyMember = child.familyMembers.some(fm => fm.userId === userId);
        if (!isOwner && !isFamilyMember) {
            throw new common_1.ForbiddenException('You do not have access to this child profile.');
        }
        const token = (0, crypto_1.randomUUID)();
        const shareLink = await this.prisma.shareLink.create({
            data: {
                token,
                childId,
                createdBy: userId,
                expiresAt,
            },
        });
        return shareLink;
    }
    async getSharedChild(token) {
        const shareLink = await this.prisma.shareLink.findUnique({
            where: { token },
            include: {
                child: {
                    include: {
                        temperatureEntries: {
                            orderBy: { measuredAt: 'desc' },
                            take: 30,
                        },
                        growthEntries: {
                            orderBy: { measuredAt: 'desc' },
                            take: 10,
                        },
                        vaccines: true,
                    },
                },
            },
        });
        if (!shareLink) {
            throw new common_1.NotFoundException('Share link not found');
        }
        if (new Date() > shareLink.expiresAt) {
            throw new common_1.BadRequestException('Share link has expired');
        }
        return shareLink;
    }
    async revokeShareLink(shareLinkId, userId) {
        const shareLink = await this.prisma.shareLink.findFirst({
            where: { id: shareLinkId },
        });
        if (!shareLink) {
            throw new common_1.NotFoundException('Share link not found');
        }
        if (shareLink.createdBy !== userId) {
            throw new common_1.ForbiddenException('You can only revoke your own share links.');
        }
        await this.prisma.shareLink.delete({ where: { id: shareLinkId } });
        return { message: 'Share link revoked' };
    }
    async listShareLinks(childId, userId) {
        const child = await this.prisma.child.findFirst({
            where: { id: childId },
        });
        if (!child) {
            throw new common_1.NotFoundException('Child not found');
        }
        if (child.userId !== userId) {
            throw new common_1.ForbiddenException('You do not have access to this child profile.');
        }
        return this.prisma.shareLink.findMany({
            where: { childId },
            select: {
                id: true,
                token: true,
                expiresAt: true,
                createdAt: true,
            },
        });
    }
};
exports.ShareService = ShareService;
exports.ShareService = ShareService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShareService);
//# sourceMappingURL=share.service.js.map