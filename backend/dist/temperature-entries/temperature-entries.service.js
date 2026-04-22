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
exports.TemperatureEntriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TemperatureEntriesService = class TemperatureEntriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, data) {
        if (data.temperature < 35.0 || data.temperature > 42.0) {
            throw new common_1.BadRequestException('Temperature must be between 35.0°C and 42.0°C');
        }
        const measuredAt = new Date(data.measuredAt);
        if (isNaN(measuredAt.getTime())) {
            throw new common_1.BadRequestException('Invalid measuredAt date');
        }
        if (measuredAt > new Date()) {
            throw new common_1.BadRequestException('measuredAt cannot be in the future');
        }
        const validLocations = ['axillary', 'oral', 'rectal', 'ear', 'forehead'];
        if (data.location && !validLocations.includes(data.location)) {
            throw new common_1.BadRequestException(`Location must be one of: ${validLocations.join(', ')}`);
        }
        const child = await this.prisma.child.findFirst({
            where: { id: data.childId, userId },
        });
        if (!child) {
            throw new common_1.NotFoundException('Child not found or access denied');
        }
        return this.prisma.temperatureEntry.create({
            data: {
                childId: data.childId,
                temperature: data.temperature,
                measuredAt: measuredAt,
                location: data.location || null,
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
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return this.prisma.temperatureEntry.findMany({
            where: {
                childId,
                measuredAt: { gte: thirtyDaysAgo },
            },
            orderBy: { measuredAt: 'desc' },
        });
    }
    async delete(userId, id) {
        const entry = await this.prisma.temperatureEntry.findFirst({
            where: { id },
            include: { child: true },
        });
        if (!entry) {
            throw new common_1.NotFoundException('Temperature entry not found');
        }
        if (entry.child.userId !== userId) {
            throw new common_1.NotFoundException('Access denied');
        }
        return this.prisma.temperatureEntry.delete({ where: { id } });
    }
};
exports.TemperatureEntriesService = TemperatureEntriesService;
exports.TemperatureEntriesService = TemperatureEntriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TemperatureEntriesService);
//# sourceMappingURL=temperature-entries.service.js.map