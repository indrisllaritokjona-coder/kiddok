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
exports.LabResultsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const lab_results_service_1 = require("./lab-results.service");
const lab_result_dto_1 = require("./lab-result.dto");
let LabResultsController = class LabResultsController {
    labResultsService;
    constructor(labResultsService) {
        this.labResultsService = labResultsService;
    }
    create(req, childId, createDto) {
        return this.labResultsService.create(req.user.userId, childId, createDto);
    }
    findAllByChild(req, childId) {
        return this.labResultsService.findAllByChild(req.user.userId, childId);
    }
    findOne(req, id) {
        return this.labResultsService.findOne(req.user.userId, id);
    }
    update(req, id, updateDto) {
        return this.labResultsService.update(req.user.userId, id, updateDto);
    }
    remove(req, id) {
        return this.labResultsService.remove(req.user.userId, id);
    }
};
exports.LabResultsController = LabResultsController;
__decorate([
    (0, common_1.Post)(':childId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('childId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, lab_result_dto_1.CreateLabResultDto]),
    __metadata("design:returntype", void 0)
], LabResultsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('child/:childId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('childId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], LabResultsController.prototype, "findAllByChild", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], LabResultsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, lab_result_dto_1.UpdateLabResultDto]),
    __metadata("design:returntype", void 0)
], LabResultsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], LabResultsController.prototype, "remove", null);
exports.LabResultsController = LabResultsController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('lab-results'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:paramtypes", [lab_results_service_1.LabResultsService])
], LabResultsController);
//# sourceMappingURL=lab-results.controller.js.map