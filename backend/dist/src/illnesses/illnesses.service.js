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
exports.IllnessesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let IllnessesService = class IllnessesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getByChild(childId, userId) {
        const child = await this.prisma.child.findFirst({ where: { id: childId, userId } });
        if (!child)
            throw new common_1.NotFoundException('Child not found');
        return this.prisma.illnessEpisode.findMany({
            where: { childId },
            orderBy: { loggedAt: 'desc' },
        });
    }
    async create(userId, dto) {
        const child = await this.prisma.child.findFirst({ where: { id: dto.childId, userId } });
        if (!child)
            throw new common_1.ForbiddenException('Access denied');
        return this.prisma.illnessEpisode.create({
            data: {
                childId: dto.childId,
                title: dto.title,
                symptoms: dto.symptoms,
                medications: dto.medications,
                notes: dto.notes,
                loggedAt: new Date(),
            },
        });
    }
    async update(id, userId, data) {
        const illness = await this.prisma.illnessEpisode.findUnique({
            where: { id },
            include: { child: true },
        });
        if (!illness)
            throw new common_1.NotFoundException('Illness not found');
        if (illness.child.userId !== userId)
            throw new common_1.ForbiddenException('Access denied');
        return this.prisma.illnessEpisode.update({ where: { id }, data });
    }
    async delete(id, userId) {
        const illness = await this.prisma.illnessEpisode.findUnique({
            where: { id },
            include: { child: true },
        });
        if (!illness)
            throw new common_1.NotFoundException('Illness not found');
        if (illness.child.userId !== userId)
            throw new common_1.ForbiddenException('Access denied');
        return this.prisma.illnessEpisode.delete({ where: { id } });
    }
};
exports.IllnessesService = IllnessesService;
exports.IllnessesService = IllnessesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IllnessesService);
//# sourceMappingURL=illnesses.service.js.map