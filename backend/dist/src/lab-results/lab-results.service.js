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
exports.LabResultsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const children_service_1 = require("../children/children.service");
const atob_1 = require("atob");
const MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024;
const MAX_ATTACHMENTS = 5;
const ALLOWED_BASE64_HEADERS = ['/9j/', 'iVBOR', 'UEs', 'JVBER', 'dGV4dC'];
function isValidBase64(str) {
    try {
        if (!/^[A-Za-z0-9+/]*={0,2}$/.test(str))
            return false;
        const decoded = (0, atob_1.decode)(str);
        if (decoded.includes('\0'))
            return false;
        return true;
    }
    catch {
        return false;
    }
}
function getDecodedSize(base64) {
    try {
        return (0, atob_1.decode)(base64).length;
    }
    catch {
        return 0;
    }
}
let LabResultsService = class LabResultsService {
    prisma;
    childrenService;
    constructor(prisma, childrenService) {
        this.prisma = prisma;
        this.childrenService = childrenService;
    }
    validateAttachments(attachments) {
        if (!attachments || attachments.length === 0)
            return;
        if (attachments.length > MAX_ATTACHMENTS) {
            throw new common_1.BadRequestException(`Maximum ${MAX_ATTACHMENTS} attachments allowed per result`);
        }
        for (const att of attachments) {
            if (!isValidBase64(att)) {
                throw new common_1.BadRequestException('Invalid attachment encoding');
            }
            const decodedSize = getDecodedSize(att);
            if (decodedSize > MAX_ATTACHMENT_SIZE) {
                throw new common_1.BadRequestException(`Attachment exceeds maximum size of 10MB`);
            }
            if (att.includes('data:') || att.includes(';base64,')) {
                throw new common_1.BadRequestException('Invalid attachment format: contains data URI prefix');
            }
        }
    }
    async create(userId, childId, data) {
        await this.childrenService.findOne(childId, userId);
        this.validateAttachments(data.attachments);
        return this.prisma.labResult.create({
            data: {
                testName: data.testName,
                result: data.result,
                unit: data.unit || null,
                referenceRange: data.referenceRange || null,
                date: new Date(data.date),
                doctor: data.doctor || null,
                notes: data.notes || null,
                type: data.type || null,
                attachments: data.attachments || [],
                child: { connect: { id: childId } },
            },
        });
    }
    async findAllByChild(userId, childId) {
        await this.childrenService.findOne(childId, userId);
        return this.prisma.labResult.findMany({
            where: { childId },
            orderBy: { date: 'desc' },
        });
    }
    async findOne(userId, id) {
        const record = await this.prisma.labResult.findUnique({
            where: { id },
            include: { child: true },
        });
        if (!record || record.child.userId !== userId) {
            throw new common_1.NotFoundException('Rezultati i laboratorit nuk u gjet ose nuk keni akses');
        }
        return record;
    }
    async update(userId, id, data) {
        await this.findOne(userId, id);
        this.validateAttachments(data.attachments);
        return this.prisma.labResult.update({
            where: { id },
            data: {
                ...(data.testName !== undefined && { testName: data.testName }),
                ...(data.result !== undefined && { result: data.result }),
                ...(data.unit !== undefined && { unit: data.unit }),
                ...(data.referenceRange !== undefined && { referenceRange: data.referenceRange }),
                ...(data.date && { date: new Date(data.date) }),
                ...(data.doctor !== undefined && { doctor: data.doctor }),
                ...(data.notes !== undefined && { notes: data.notes }),
                ...(data.type !== undefined && { type: data.type }),
                ...(data.attachments !== undefined && { attachments: data.attachments }),
            },
        });
    }
    async remove(userId, id) {
        await this.findOne(userId, id);
        return this.prisma.labResult.delete({
            where: { id },
        });
    }
};
exports.LabResultsService = LabResultsService;
exports.LabResultsService = LabResultsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        children_service_1.ChildrenService])
], LabResultsService);
//# sourceMappingURL=lab-results.service.js.map