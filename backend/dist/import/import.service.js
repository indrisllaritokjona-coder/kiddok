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
exports.ImportService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ImportService = class ImportService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async importBackup(userId, data) {
        this.validateBackupStructure(data);
        const { child } = data;
        const counts = {};
        const createdChild = await this.prisma.child.create({
            data: {
                name: child.name,
                dateOfBirth: new Date(child.dateOfBirth),
                gender: child.gender || null,
                bloodType: child.bloodType || null,
                allergies: child.allergies || null,
                birthWeight: child.birthWeight || null,
                deliveryDoctor: child.deliveryDoctor || null,
                criticalAllergies: child.criticalAllergies || null,
                medicalNotes: child.medicalNotes || null,
                user: { connect: { id: userId } },
            },
        });
        counts['child'] = 1;
        if (child.temperatureEntries?.length) {
            await this.prisma.temperatureEntry.createMany({
                data: child.temperatureEntries.map(e => ({
                    childId: createdChild.id,
                    temperature: e.temperature,
                    measuredAt: new Date(e.measuredAt),
                    location: e.location || null,
                    notes: e.notes || null,
                })),
            });
            counts['temperatureEntries'] = child.temperatureEntries.length;
        }
        if (child.growthEntries?.length) {
            await this.prisma.growthEntry.createMany({
                data: child.growthEntries.map(e => ({
                    childId: createdChild.id,
                    height: e.height || null,
                    weight: e.weight || null,
                    measuredAt: new Date(e.measuredAt),
                    notes: e.notes || null,
                })),
            });
            counts['growthEntries'] = child.growthEntries.length;
        }
        if (child.vaccines?.length) {
            await this.prisma.vaccine.createMany({
                data: child.vaccines.map(v => ({
                    childId: createdChild.id,
                    name: v.name,
                    dateAdministered: v.dateAdministered ? new Date(v.dateAdministered) : null,
                    dueDate: v.dueDate ? new Date(v.dueDate) : null,
                    provider: v.provider || null,
                    notes: v.notes || null,
                    completed: v.completed,
                })),
            });
            counts['vaccines'] = child.vaccines.length;
        }
        if (child.medications?.length) {
            await this.prisma.medication.createMany({
                data: child.medications.map(m => ({
                    childId: createdChild.id,
                    name: m.name,
                    dosage: m.dosage,
                    frequency: m.frequency,
                    startDate: new Date(m.startDate),
                    endDate: m.endDate ? new Date(m.endDate) : null,
                    prescribedBy: m.prescribedBy || null,
                    notes: m.notes || null,
                    active: m.active,
                })),
            });
            counts['medications'] = child.medications.length;
        }
        if (child.appointments?.length) {
            await this.prisma.appointment.createMany({
                data: child.appointments.map(a => ({
                    childId: createdChild.id,
                    title: a.title,
                    dateTime: new Date(a.dateTime),
                    doctorName: a.doctorName || null,
                    location: a.location || null,
                    notes: a.notes || null,
                })),
            });
            counts['appointments'] = child.appointments.length;
        }
        if (child.labResults?.length) {
            await this.prisma.labResult.createMany({
                data: child.labResults.map(l => ({
                    childId: createdChild.id,
                    testName: l.testName,
                    result: l.result,
                    unit: l.unit || null,
                    referenceRange: l.referenceRange || null,
                    date: new Date(l.date),
                    doctor: l.doctor || null,
                    notes: l.notes || null,
                })),
            });
            counts['labResults'] = child.labResults.length;
        }
        if (child.diaryEntries?.length) {
            await this.prisma.diaryEntry.createMany({
                data: child.diaryEntries.map(d => ({
                    childId: createdChild.id,
                    type: d.type,
                    description: d.description || null,
                    severity: d.severity || null,
                    duration: d.duration || null,
                    loggedAt: new Date(d.loggedAt),
                    notes: d.notes || null,
                })),
            });
            counts['diaryEntries'] = child.diaryEntries.length;
        }
        if (child.illnessEpisodes?.length) {
            await this.prisma.illnessEpisode.createMany({
                data: child.illnessEpisodes.map(i => ({
                    childId: createdChild.id,
                    title: i.title,
                    symptoms: i.symptoms || null,
                    medications: i.medications || null,
                    notes: i.notes || null,
                    loggedAt: new Date(i.loggedAt),
                })),
            });
            counts['illnessEpisodes'] = child.illnessEpisodes.length;
        }
        return { childId: createdChild.id, counts };
    }
    validateBackupStructure(data) {
        if (!data) {
            throw new common_1.BadRequestException('Invalid backup: empty body');
        }
        if (!data.child) {
            throw new common_1.BadRequestException('Invalid backup: missing "child" field');
        }
        if (!data.child.name) {
            throw new common_1.BadRequestException('Invalid backup: child "name" is required');
        }
        if (!data.child.dateOfBirth) {
            throw new common_1.BadRequestException('Invalid backup: child "dateOfBirth" is required');
        }
        const dob = new Date(data.child.dateOfBirth);
        if (isNaN(dob.getTime())) {
            throw new common_1.BadRequestException('Invalid backup: child "dateOfBirth" is not a valid date');
        }
    }
};
exports.ImportService = ImportService;
exports.ImportService = ImportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ImportService);
//# sourceMappingURL=import.service.js.map