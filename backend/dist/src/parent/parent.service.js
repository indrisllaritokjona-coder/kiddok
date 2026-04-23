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
exports.ParentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ParentService = class ParentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProfile(userId) {
        let profile = await this.prisma.parentProfile.findUnique({
            where: { userId },
        });
        if (!profile) {
            const user = await this.prisma.user.findUnique({ where: { id: userId } });
            if (!user)
                throw new common_1.NotFoundException('User not found');
            profile = await this.prisma.parentProfile.create({
                data: {
                    name: user.name,
                    surname: '',
                    phone: '',
                    userId: user.id,
                },
            });
        }
        return profile;
    }
    async updateProfile(userId, dto) {
        let profile = await this.prisma.parentProfile.findUnique({
            where: { userId },
        });
        if (!profile) {
            const user = await this.prisma.user.findUnique({ where: { id: userId } });
            if (!user)
                throw new common_1.NotFoundException('User not found');
            profile = await this.prisma.parentProfile.create({
                data: {
                    name: dto.name ?? user.name,
                    surname: dto.surname ?? '',
                    phone: dto.phone ?? '',
                    userId: user.id,
                },
            });
            return profile;
        }
        return this.prisma.parentProfile.update({
            where: { userId },
            data: dto,
        });
    }
};
exports.ParentService = ParentService;
exports.ParentService = ParentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ParentService);
//# sourceMappingURL=parent.service.js.map