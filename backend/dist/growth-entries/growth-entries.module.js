"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrowthEntriesModule = void 0;
const common_1 = require("@nestjs/common");
const growth_entries_controller_1 = require("./growth-entries.controller");
const growth_entries_service_1 = require("./growth-entries.service");
const prisma_module_1 = require("../prisma/prisma.module");
let GrowthEntriesModule = class GrowthEntriesModule {
};
exports.GrowthEntriesModule = GrowthEntriesModule;
exports.GrowthEntriesModule = GrowthEntriesModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [growth_entries_controller_1.GrowthEntriesController],
        providers: [growth_entries_service_1.GrowthEntriesService],
    })
], GrowthEntriesModule);
//# sourceMappingURL=growth-entries.module.js.map