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
exports.GrowthEntriesController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const growth_entries_service_1 = require("./growth-entries.service");
const create_growth_entry_dto_1 = require("./dto/create-growth-entry.dto");
let GrowthEntriesController = class GrowthEntriesController {
    growthService;
    constructor(growthService) {
        this.growthService = growthService;
    }
    async create(req, data) {
        return this.growthService.create(req.user.userId, data);
    }
    async findByChild(req, childId) {
        return this.growthService.findByChild(req.user.userId, childId);
    }
    async delete(req, id) {
        return this.growthService.delete(req.user.userId, id);
    }
};
exports.GrowthEntriesController = GrowthEntriesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_growth_entry_dto_1.CreateGrowthEntryDto]),
    __metadata("design:returntype", Promise)
], GrowthEntriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('child/:childId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('childId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GrowthEntriesController.prototype, "findByChild", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GrowthEntriesController.prototype, "delete", null);
exports.GrowthEntriesController = GrowthEntriesController = __decorate([
    (0, common_1.Controller)('growth-entries'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [growth_entries_service_1.GrowthEntriesService])
], GrowthEntriesController);
//# sourceMappingURL=growth-entries.controller.js.map