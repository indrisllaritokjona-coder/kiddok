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
exports.ChildrenService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ChildrenService = class ChildrenService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, data) {
        const MAX_DOCUMENT_SIZE = 5 * 1024 * 1024;
        if (data.medicalDocument) {
            const base64Size = data.medicalDocument.length * 0.75;
            if (base64Size > MAX_DOCUMENT_SIZE) {
                throw new common_1.BadRequestException('Dokumenti tejkalon limitin prej 5MB. / Document exceeds 5MB limit.');
            }
        }
        if (data.documentIssueDate) {
            const parsed = new Date(data.documentIssueDate);
            if (isNaN(parsed.getTime())) {
                throw new common_1.BadRequestException('Data e lëshimit të dokumentit nuk është e vlefshme. / Document issue date is invalid.');
            }
            data.documentIssueDate = parsed;
        }
        return this.prisma.child.create({
            data: {
                ...data,
                dateOfBirth: new Date(data.dateOfBirth),
                user: { connect: { id: userId } }
            }
        });
    }
    async findAllByUser(userId) {
        return this.prisma.child.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, userId) {
        const child = await this.prisma.child.findFirst({
            where: { id, OR: [{ userId }, { familyMembers: { some: { userId } } }] },
            include: {
                healthRecords: true,
                vaccines: true
            }
        });
        if (!child) {
            throw new common_1.NotFoundException('Fëmija nuk u gjet ose nuk keni akses!');
        }
        return child;
    }
    async findOneById(id) {
        return this.prisma.child.findUnique({ where: { id } });
    }
    async hasAccess(childId, userId) {
        const child = await this.prisma.child.findFirst({
            where: { id: childId },
            include: { familyMembers: { where: { userId } } },
        });
        if (!child)
            return false;
        return child.userId === userId || child.familyMembers.length > 0;
    }
    async update(id, userId, data) {
        await this.findOne(id, userId);
        if (data.dateOfBirth) {
            data.dateOfBirth = new Date(data.dateOfBirth);
        }
        const MAX_DOCUMENT_SIZE = 5 * 1024 * 1024;
        if (data.medicalDocument) {
            const base64Size = data.medicalDocument.length * 0.75;
            if (base64Size > MAX_DOCUMENT_SIZE) {
                throw new common_1.BadRequestException('Dokumenti tejkalon limitin prej 5MB. / Document exceeds 5MB limit.');
            }
        }
        return this.prisma.child.update({
            where: { id },
            data,
        });
    }
    async remove(id, userId) {
        await this.findOne(id, userId);
        return this.prisma.child.delete({
            where: { id },
        });
    }
};
exports.ChildrenService = ChildrenService;
exports.ChildrenService = ChildrenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChildrenService);
//# sourceMappingURL=children.service.js.map