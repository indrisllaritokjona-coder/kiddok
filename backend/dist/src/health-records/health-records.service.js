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
exports.HealthRecordsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const children_service_1 = require("../children/children.service");
let HealthRecordsService = class HealthRecordsService {
    prisma;
    childrenService;
    constructor(prisma, childrenService) {
        this.prisma = prisma;
        this.childrenService = childrenService;
    }
    async create(userId, childId, data) {
        await this.childrenService.findOne(childId, userId);
        return this.prisma.healthRecord.create({
            data: {
                ...data,
                child: { connect: { id: childId } }
            }
        });
    }
    async findAllByChild(userId, childId) {
        await this.childrenService.findOne(childId, userId);
        return this.prisma.healthRecord.findMany({
            where: { childId },
            orderBy: { createdAt: 'desc' }
        });
    }
    async findOne(userId, id) {
        const record = await this.prisma.healthRecord.findUnique({
            where: { id },
            include: { child: true }
        });
        if (!record || record.child.userId !== userId) {
            throw new common_1.NotFoundException('Regjistrimi nuk u gjet ose nuk keni akses');
        }
        const { child, ...rest } = record;
        return rest;
    }
    async update(userId, id, data) {
        await this.findOne(userId, id);
        return this.prisma.healthRecord.update({
            where: { id },
            data
        });
    }
    async remove(userId, id) {
        await this.findOne(userId, id);
        return this.prisma.healthRecord.delete({
            where: { id }
        });
    }
};
exports.HealthRecordsService = HealthRecordsService;
exports.HealthRecordsService = HealthRecordsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        children_service_1.ChildrenService])
], HealthRecordsService);
//# sourceMappingURL=health-records.service.js.map