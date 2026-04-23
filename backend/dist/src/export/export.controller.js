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
exports.ExportController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const export_service_1 = require("./export.service");
function csvEscape(value) {
    if (value === null || value === undefined)
        return '';
    const str = String(value);
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
        return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
}
let ExportController = class ExportController {
    exportService;
    constructor(exportService) {
        this.exportService = exportService;
    }
    async exportPdf(req, childId, res) {
        const userId = req.user.userId;
        const pdfBuffer = await this.exportService.generatePdf(childId, userId);
        const filename = `kiddok-health-report-${childId}.pdf`;
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${filename}"`,
            'Content-Length': pdfBuffer.length,
        });
        res.end(pdfBuffer);
    }
    async exportCsv(req, childId, res) {
        const userId = req.user.userId;
        const data = await this.exportService.getChildHealthData(childId, userId);
        if (!data.child) {
            throw new common_1.NotFoundException('Child not found.');
        }
        const { child, temperatureEntries, growthEntries, vaccines } = data;
        const lines = [];
        lines.push('Child Health Data Export');
        lines.push(`Child,${csvEscape(child.name)}`);
        lines.push(`Date of Birth,${csvEscape(child.dateOfBirth)}`);
        lines.push(`Blood Type,${csvEscape(child.bloodType ?? '')}`);
        lines.push(`Critical Allergies,${csvEscape(child.criticalAllergies ?? '')}`);
        lines.push(`Generated At,${new Date().toISOString()}`);
        lines.push('');
        lines.push('TEMPERATURE ENTRIES');
        lines.push('Date,Time,Temperature (°C),Location,Notes');
        for (const entry of temperatureEntries) {
            const d = new Date(entry.measuredAt);
            const dateStr = d.toLocaleDateString('sq-AL');
            const timeStr = d.toLocaleTimeString('sq-AL', { hour: '2-digit', minute: '2-digit' });
            lines.push([
                csvEscape(dateStr),
                csvEscape(timeStr),
                csvEscape(entry.temperature),
                csvEscape(entry.location ?? ''),
                csvEscape(entry.notes ?? ''),
            ].join(','));
        }
        lines.push('');
        lines.push('GROWTH ENTRIES');
        lines.push('Date,Height (cm),Weight (kg),Notes');
        for (const entry of growthEntries) {
            const d = new Date(entry.measuredAt);
            const dateStr = d.toLocaleDateString('sq-AL');
            lines.push([
                csvEscape(dateStr),
                csvEscape(entry.height ?? ''),
                csvEscape(entry.weight ?? ''),
                csvEscape(entry.notes ?? ''),
            ].join(','));
        }
        lines.push('');
        lines.push('VACCINE RECORDS');
        lines.push('Vaccine Name,Dose,Total Doses,Due Date,Completed At,Status,Administered By,Batch Number,Site,Notes');
        for (const v of vaccines) {
            lines.push([
                csvEscape(v.vaccineName ?? ''),
                csvEscape(v.doseNumber ?? ''),
                csvEscape(v.totalDoses ?? ''),
                csvEscape(v.dueDate ?? ''),
                csvEscape(v.completedAt ?? ''),
                csvEscape(v.status ?? ''),
                csvEscape(v.administeredBy ?? ''),
                csvEscape(v.batchNumber ?? ''),
                csvEscape(v.site ?? ''),
                csvEscape(v.notes ?? ''),
            ].join(','));
        }
        const csvContent = lines.join('\r\n');
        const safeName = (child.name || 'child').replace(/[^a-zA-Z0-9]/g, '_');
        const filename = `${safeName}_health_export_${new Date().toISOString().split('T')[0]}.csv`;
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('X-Generated-At', new Date().toISOString());
        res.setHeader('X-Child-Id', childId);
        res.send(csvContent);
    }
};
exports.ExportController = ExportController;
__decorate([
    (0, common_1.Get)(':childId/pdf'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('childId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ExportController.prototype, "exportPdf", null);
__decorate([
    (0, common_1.Get)(':childId/csv'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('childId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ExportController.prototype, "exportCsv", null);
exports.ExportController = ExportController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('export'),
    __metadata("design:paramtypes", [export_service_1.ExportService])
], ExportController);
//# sourceMappingURL=export.controller.js.map