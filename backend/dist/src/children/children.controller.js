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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildrenController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const children_service_1 = require("./children.service");
const create_child_dto_1 = require("./dto/create-child.dto");
const update_child_dto_1 = require("./dto/update-child.dto");
let ChildrenController = class ChildrenController {
    childrenService;
    constructor(childrenService) {
        this.childrenService = childrenService;
    }
    create(req, createChildDto) {
        return this.childrenService.create(req.user.userId, createChildDto);
    }
    findAll(req) {
        return this.childrenService.findAllByUser(req.user.userId);
    }
    async findOne(req, id) {
        const child = await this.childrenService.findOneById(id);
        if (!child) {
            throw new common_1.NotFoundException('Child not found');
        }
        if (!await this.childrenService.hasAccess(id, req.user.userId)) {
            throw new common_1.ForbiddenException('You do not have access to this child profile.');
        }
        return child;
    }
    async update(req, id, updateChildDto) {
        const child = await this.childrenService.findOneById(id);
        if (!child) {
            throw new common_1.NotFoundException('Child not found');
        }
        if (!await this.childrenService.hasAccess(id, req.user.userId)) {
            throw new common_1.ForbiddenException('You do not have access to this child profile.');
        }
        return this.childrenService.update(id, req.user.userId, updateChildDto);
    }
    async remove(req, id) {
        const child = await this.childrenService.findOneById(id);
        if (!child) {
            throw new common_1.NotFoundException('Child not found');
        }
        if (!await this.childrenService.hasAccess(id, req.user.userId)) {
            throw new common_1.ForbiddenException('You do not have access to this child profile.');
        }
        return this.childrenService.remove(id, req.user.userId);
    }
};
exports.ChildrenController = ChildrenController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, transform: true })),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_child_dto_1.CreateChildDto]),
    __metadata("design:returntype", void 0)
], ChildrenController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChildrenController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ChildrenController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, transform: true })),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_child_dto_1.UpdateChildDto]),
    __metadata("design:returntype", Promise)
], ChildrenController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ChildrenController.prototype, "remove", null);
exports.ChildrenController = ChildrenController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('children'),
    __metadata("design:paramtypes", [children_service_1.ChildrenService])
], ChildrenController);
//# sourceMappingURL=children.controller.js.map