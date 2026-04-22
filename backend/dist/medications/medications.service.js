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
exports.MedicationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const children_service_1 = require("../children/children.service");
let MedicationsService = class MedicationsService {
    prisma;
    childrenService;
    constructor(prisma, childrenService) {
        this.prisma = prisma;
        this.childrenService = childrenService;
    }
    async create(userId, childId, data) {
        await this.childrenService.findOne(childId, userId);
        return this.prisma.medication.create({
            data: {
                name: data.name,
                dosage: data.dosage,
                frequency: data.frequency,
                startDate: new Date(data.startDate),
                endDate: data.endDate ? new Date(data.endDate) : null,
                prescribedBy: data.prescribedBy || null,
                notes: data.notes || null,
                active: data.active !== undefined ? data.active : true,
                child: { connect: { id: childId } }
            }
        });
    }
    async findAllByChild(userId, childId) {
        await this.childrenService.findOne(childId, userId);
        return this.prisma.medication.findMany({
            where: { childId },
            orderBy: { createdAt: 'desc' }
        });
    }
    async findOne(userId, id) {
        const record = await this.prisma.medication.findUnique({
            where: { id },
            include: { child: true }
        });
        if (!record || record.child.userId !== userId) {
            throw new common_1.NotFoundException('Medikamenti nuk u gjet ose nuk keni akses');
        }
        const { child, ...rest } = record;
        return rest;
    }
    async update(userId, id, data) {
        await this.findOne(userId, id);
        return this.prisma.medication.update({
            where: { id },
            data: {
                ...(data.name && { name: data.name }),
                ...(data.dosage && { dosage: data.dosage }),
                ...(data.frequency && { frequency: data.frequency }),
                ...(data.startDate && { startDate: new Date(data.startDate) }),
                ...(data.endDate !== undefined && { endDate: data.endDate ? new Date(data.endDate) : null }),
                ...(data.prescribedBy !== undefined && { prescribedBy: data.prescribedBy }),
                ...(data.notes !== undefined && { notes: data.notes }),
                ...(data.active !== undefined && { active: data.active })
            }
        });
    }
    async remove(userId, id) {
        await this.findOne(userId, id);
        return this.prisma.medication.delete({
            where: { id }
        });
    }
};
exports.MedicationsService = MedicationsService;
exports.MedicationsService = MedicationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        children_service_1.ChildrenService])
], MedicationsService);
//# sourceMappingURL=medications.service.js.map