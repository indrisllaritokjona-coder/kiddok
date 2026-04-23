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
exports.VaccinesController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const vaccines_service_1 = require("./vaccines.service");
let VaccinesController = class VaccinesController {
    vaccinesService;
    constructor(vaccinesService) {
        this.vaccinesService = vaccinesService;
    }
    create(req, childId, createData) {
        return this.vaccinesService.create(req.user.userId, childId, createData);
    }
    findAllByChild(req, childId) {
        return this.vaccinesService.findAllByChild(req.user.userId, childId);
    }
    findOne(req, id) {
        return this.vaccinesService.findOne(req.user.userId, id);
    }
    update(req, id, updateData) {
        return this.vaccinesService.update(req.user.userId, id, updateData);
    }
    remove(req, id) {
        return this.vaccinesService.remove(req.user.userId, id);
    }
};
exports.VaccinesController = VaccinesController;
__decorate([
    (0, common_1.Post)(':childId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('childId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], VaccinesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('child/:childId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('childId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], VaccinesController.prototype, "findAllByChild", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], VaccinesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], VaccinesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], VaccinesController.prototype, "remove", null);
exports.VaccinesController = VaccinesController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('vaccines'),
    __metadata("design:paramtypes", [vaccines_service_1.VaccinesService])
], VaccinesController);
//# sourceMappingURL=vaccines.controller.js.map