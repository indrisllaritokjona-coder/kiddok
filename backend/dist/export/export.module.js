"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportModule = void 0;
const common_1 = require("@nestjs/common");
const export_controller_1 = require("./export.controller");
const children_module_1 = require("../children/children.module");
const temperature_entries_module_1 = require("../temperature-entries/temperature-entries.module");
const growth_entries_module_1 = require("../growth-entries/growth-entries.module");
const vaccines_module_1 = require("../vaccines/vaccines.module");
let ExportModule = class ExportModule {
};
exports.ExportModule = ExportModule;
exports.ExportModule = ExportModule = __decorate([
    (0, common_1.Module)({
        controllers: [export_controller_1.ExportController],
        imports: [
            children_module_1.ChildrenModule,
            temperature_entries_module_1.TemperatureEntriesModule,
            growth_entries_module_1.GrowthEntriesModule,
            vaccines_module_1.VaccinesModule,
        ],
    })
], ExportModule);
//# sourceMappingURL=export.module.js.map