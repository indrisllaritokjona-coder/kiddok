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
        const medications = await this.prisma.medication.findMany({
            where: { childId },
            include: { doseLogs: { orderBy: { takenAt: 'desc' } } },
            orderBy: { createdAt: 'desc' }
        });
        const result = medications.map(med => ({
            ...med,
            adherencePct: this.calculateAdherence(med),
        }));
        const activeCount = result.filter(m => m.active).length;
        const archivedCount = result.filter(m => !m.active).length;
        return { medications: result, activeCount, archivedCount };
    }
    async findOne(userId, id) {
        const record = await this.prisma.medication.findUnique({
            where: { id },
            include: { child: true, doseLogs: { orderBy: { takenAt: 'desc' } } }
        });
        if (!record || record.child.userId !== userId) {
            throw new common_1.NotFoundException('Medikamenti nuk u gjet ose nuk keni akses');
        }
        const { child, ...rest } = record;
        return { ...rest, adherencePct: this.calculateAdherence(record) };
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
    sanitizeNotes(notes) {
        if (!notes)
            return null;
        const stripped = notes.replace(/<[^>]*>/g, '').trim();
        const sanitized = stripped.replace(/javascript:/gi, '').replace(/on\w+=/gi, '');
        return sanitized.length > 0 ? sanitized.slice(0, 500) : null;
    }
    async logDose(userId, childId, dto) {
        const medication = await this.prisma.medication.findUnique({
            where: { id: dto.medicationId },
            include: { child: true }
        });
        if (!medication) {
            throw new common_1.NotFoundException('Medikamenti nuk u gjet');
        }
        if (medication.childId !== childId) {
            throw new common_1.BadRequestException('Medikamenti nuk i përket këtij fëmije');
        }
        if (medication.child.userId !== userId) {
            throw new common_1.NotFoundException('Nuk keni akses');
        }
        if (!medication.active) {
            throw new common_1.BadRequestException('Medikamenti është i arkivuar');
        }
        const takenAt = new Date(dto.takenAt);
        if (takenAt > new Date()) {
            throw new common_1.BadRequestException('Data nuk mund të jetë në të ardhmen');
        }
        return this.prisma.medicationDoseLog.create({
            data: {
                medicationId: dto.medicationId,
                takenAt,
                notes: this.sanitizeNotes(dto.notes),
            }
        });
    }
    async getDoseLogs(userId, childId, medicationId) {
        await this.childrenService.findOne(childId, userId);
        const medication = await this.prisma.medication.findUnique({
            where: { id: medicationId },
            include: { child: true }
        });
        if (!medication || medication.childId !== childId) {
            throw new common_1.NotFoundException('Medikamenti nuk u gjet');
        }
        if (medication.child.userId !== userId) {
            throw new common_1.NotFoundException('Nuk keni akses');
        }
        const logs = await this.prisma.medicationDoseLog.findMany({
            where: { medicationId },
            orderBy: { takenAt: 'desc' }
        });
        return { logs };
    }
    async markDoseTaken(userId, medicationId, notes) {
        const medication = await this.prisma.medication.findUnique({
            where: { id: medicationId },
            include: { child: true }
        });
        if (!medication) {
            throw new common_1.NotFoundException('Medikamenti nuk u gjet');
        }
        if (medication.child.userId !== userId) {
            throw new common_1.NotFoundException('Nuk keni akses');
        }
        return this.prisma.medicationDoseLog.create({
            data: {
                medicationId,
                takenAt: new Date(),
                notes: notes || null
            }
        });
    }
    calculateAdherence(med) {
        if (med.frequency === 'as_needed')
            return null;
        const today = new Date();
        const startDate = new Date(med.startDate);
        const endDate = med.endDate ? new Date(med.endDate) : today;
        const effectiveEnd = endDate < today ? endDate : today;
        const diffTime = effectiveEnd.getTime() - startDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        if (diffDays <= 0)
            return 0;
        const dosesPerDay = this.getDosesPerDay(med.frequency);
        const expectedDoses = diffDays * dosesPerDay;
        const actualDoses = med.doseLogs.length;
        return Math.min(100, Math.round((actualDoses / expectedDoses) * 100));
    }
    getDosesPerDay(frequency) {
        switch (frequency) {
            case 'once_daily': return 1;
            case 'twice_daily': return 2;
            case 'three_times_daily': return 3;
            case 'every_8_hours': return 3;
            case 'as_needed': return 0;
            default: return 1;
        }
    }
};
exports.MedicationsService = MedicationsService;
exports.MedicationsService = MedicationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        children_service_1.ChildrenService])
], MedicationsService);
//# sourceMappingURL=medications.service.js.map