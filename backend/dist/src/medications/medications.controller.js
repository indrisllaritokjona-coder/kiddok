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
exports.MedicationsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const medications_service_1 = require("./medications.service");
const medication_dto_1 = require("./medication.dto");
let MedicationsController = class MedicationsController {
    medicationsService;
    constructor(medicationsService) {
        this.medicationsService = medicationsService;
    }
    create(req, childId, createDto) {
        return this.medicationsService.create(req.user.userId, childId, createDto);
    }
    findAllByChild(req, childId) {
        return this.medicationsService.findAllByChild(req.user.userId, childId);
    }
    findOne(req, id) {
        return this.medicationsService.findOne(req.user.userId, id);
    }
    update(req, id, updateDto) {
        return this.medicationsService.update(req.user.userId, id, updateDto);
    }
    remove(req, id) {
        return this.medicationsService.remove(req.user.userId, id);
    }
    logDose(req, childId, dto) {
        return this.medicationsService.logDose(req.user.userId, childId, dto);
    }
    getDoseLogs(req, childId, medicationId) {
        return this.medicationsService.getDoseLogs(req.user.userId, childId, medicationId);
    }
};
exports.MedicationsController = MedicationsController;
__decorate([
    (0, common_1.Post)(':childId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('childId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, medication_dto_1.CreateMedicationDto]),
    __metadata("design:returntype", void 0)
], MedicationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('child/:childId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('childId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], MedicationsController.prototype, "findAllByChild", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], MedicationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, medication_dto_1.UpdateMedicationDto]),
    __metadata("design:returntype", void 0)
], MedicationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], MedicationsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':childId/doses'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('childId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, medication_dto_1.CreateDoseLogDto]),
    __metadata("design:returntype", void 0)
], MedicationsController.prototype, "logDose", null);
__decorate([
    (0, common_1.Get)(':childId/doses/:medicationId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('childId')),
    __param(2, (0, common_1.Param)('medicationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], MedicationsController.prototype, "getDoseLogs", null);
exports.MedicationsController = MedicationsController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('medications'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:paramtypes", [medications_service_1.MedicationsService])
], MedicationsController);
//# sourceMappingURL=medications.controller.js.map