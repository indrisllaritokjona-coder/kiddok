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
exports.GrowthEntriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GrowthEntriesService = class GrowthEntriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, data) {
        if (data.height === undefined && data.weight === undefined) {
            throw new common_1.BadRequestException('At least one of height or weight must be provided');
        }
        if (data.height !== undefined && (data.height < 30 || data.height > 200)) {
            throw new common_1.BadRequestException('Height must be between 30 cm and 200 cm');
        }
        if (data.weight !== undefined && (data.weight < 1 || data.weight > 150)) {
            throw new common_1.BadRequestException('Weight must be between 1 kg and 150 kg');
        }
        const measuredAt = new Date(data.measuredAt);
        if (isNaN(measuredAt.getTime())) {
            throw new common_1.BadRequestException('Invalid measuredAt date');
        }
        if (measuredAt > new Date()) {
            throw new common_1.BadRequestException('measuredAt cannot be in the future');
        }
        const child = await this.prisma.child.findFirst({
            where: { id: data.childId, userId },
        });
        if (!child) {
            throw new common_1.NotFoundException('Child not found or access denied');
        }
        return this.prisma.growthEntry.create({
            data: {
                childId: data.childId,
                height: data.height ?? null,
                weight: data.weight ?? null,
                measuredAt: measuredAt,
                notes: data.notes || null,
            },
        });
    }
    async findByChild(userId, childId) {
        const child = await this.prisma.child.findFirst({
            where: { id: childId, userId },
        });
        if (!child) {
            throw new common_1.NotFoundException('Child not found or access denied');
        }
        return this.prisma.growthEntry.findMany({
            where: { childId },
            orderBy: { measuredAt: 'desc' },
        });
    }
    async delete(userId, id) {
        const entry = await this.prisma.growthEntry.findFirst({
            where: { id },
            include: { child: true },
        });
        if (!entry) {
            throw new common_1.NotFoundException('Growth entry not found');
        }
        if (entry.child.userId !== userId) {
            throw new common_1.NotFoundException('Access denied');
        }
        return this.prisma.growthEntry.delete({ where: { id } });
    }
};
exports.GrowthEntriesService = GrowthEntriesService;
exports.GrowthEntriesService = GrowthEntriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GrowthEntriesService);
//# sourceMappingURL=growth-entries.service.js.map