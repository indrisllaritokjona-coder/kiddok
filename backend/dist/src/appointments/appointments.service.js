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
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const children_service_1 = require("../children/children.service");
let AppointmentsService = class AppointmentsService {
    prisma;
    childrenService;
    constructor(prisma, childrenService) {
        this.prisma = prisma;
        this.childrenService = childrenService;
    }
    async create(userId, childId, data) {
        await this.childrenService.findOne(childId, userId);
        return this.prisma.appointment.create({
            data: {
                title: data.title,
                doctorName: data.doctorName || null,
                location: data.location || null,
                dateTime: new Date(data.dateTime),
                notes: data.notes || null,
                child: { connect: { id: childId } },
            },
        });
    }
    async findAllByChild(userId, childId) {
        await this.childrenService.findOne(childId, userId);
        return this.prisma.appointment.findMany({
            where: { childId },
            orderBy: { dateTime: 'asc' },
        });
    }
    async findOne(userId, id) {
        const record = await this.prisma.appointment.findUnique({
            where: { id },
            include: { child: true },
        });
        if (!record || record.child.userId !== userId) {
            throw new common_1.NotFoundException('Termini nuk u gjet ose nuk keni akses');
        }
        return record;
    }
    async update(userId, id, data) {
        await this.findOne(userId, id);
        return this.prisma.appointment.update({
            where: { id },
            data: {
                ...(data.title && { title: data.title }),
                ...(data.doctorName !== undefined && { doctorName: data.doctorName }),
                ...(data.location !== undefined && { location: data.location }),
                ...(data.dateTime && { dateTime: new Date(data.dateTime) }),
                ...(data.notes !== undefined && { notes: data.notes }),
            },
        });
    }
    async remove(userId, id) {
        await this.findOne(userId, id);
        return this.prisma.appointment.delete({
            where: { id },
        });
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        children_service_1.ChildrenService])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map