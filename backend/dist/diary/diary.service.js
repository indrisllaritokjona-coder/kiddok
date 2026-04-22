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
exports.DiaryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DiaryService = class DiaryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getByChild(childId, userId) {
        const child = await this.prisma.child.findFirst({ where: { id: childId, userId } });
        if (!child)
            throw new common_1.NotFoundException('Child not found');
        return this.prisma.diaryEntry.findMany({
            where: { childId },
            orderBy: { loggedAt: 'desc' },
        });
    }
    async create(userId, dto) {
        const child = await this.prisma.child.findFirst({ where: { id: dto.childId, userId } });
        if (!child)
            throw new common_1.ForbiddenException('Access denied');
        return this.prisma.diaryEntry.create({
            data: {
                childId: dto.childId,
                type: dto.type,
                description: dto.description,
                severity: dto.severity,
                duration: dto.duration,
                notes: dto.notes,
                loggedAt: new Date(),
            },
        });
    }
    async update(id, userId, data) {
        const entry = await this.prisma.diaryEntry.findUnique({
            where: { id },
            include: { child: true },
        });
        if (!entry)
            throw new common_1.NotFoundException('Entry not found');
        if (entry.child.userId !== userId)
            throw new common_1.ForbiddenException('Access denied');
        return this.prisma.diaryEntry.update({
            where: { id },
            data,
        });
    }
    async delete(id, userId) {
        const entry = await this.prisma.diaryEntry.findUnique({
            where: { id },
            include: { child: true },
        });
        if (!entry)
            throw new common_1.NotFoundException('Entry not found');
        if (entry.child.userId !== userId)
            throw new common_1.ForbiddenException('Access denied');
        return this.prisma.diaryEntry.delete({ where: { id } });
    }
};
exports.DiaryService = DiaryService;
exports.DiaryService = DiaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DiaryService);
//# sourceMappingURL=diary.service.js.map