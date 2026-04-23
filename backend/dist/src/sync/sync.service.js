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
exports.SyncService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const LAST_WRITE_WINS_ENTITIES = ['temperature', 'growth', 'diary'];
const MEDICAL_DATA_ENTITIES = ['vaccine'];
let SyncService = class SyncService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async syncEntries(userId, entries) {
        const conflicts = [];
        let syncedCount = 0;
        let failedCount = 0;
        for (const entry of entries) {
            try {
                const result = await this.processEntry(userId, entry, conflicts);
                if (result.synced)
                    syncedCount++;
                else
                    failedCount++;
            }
            catch {
                failedCount++;
            }
        }
        return { success: failedCount === 0, syncedCount, failedCount, conflicts };
    }
    async processEntry(userId, entry, conflicts) {
        const { entityType, action, data, localTimestamp } = entry;
        const entityId = data?.id;
        const child = await this.prisma.child.findFirst({
            where: { id: data?.childId, userId },
        });
        if (!child)
            return { synced: false };
        switch (entityType) {
            case 'temperature':
                return this.syncTemperatureEntry(userId, action, data, localTimestamp, conflicts);
            case 'growth':
                return this.syncGrowthEntry(userId, action, data, localTimestamp, conflicts);
            case 'vaccine':
                return this.syncVaccineEntry(userId, action, data, localTimestamp, conflicts);
            case 'diary':
                return this.syncDiaryEntry(userId, action, data, localTimestamp, conflicts);
            default:
                return { synced: false };
        }
    }
    async syncTemperatureEntry(userId, action, data, localTimestamp, conflicts) {
        if (action === 'create') {
            await this.prisma.temperatureEntry.create({
                data: {
                    childId: data.childId,
                    temperature: data.temperature,
                    measuredAt: new Date(data.measuredAt),
                    location: data.location || null,
                    notes: data.notes || null,
                },
            });
            return { synced: true };
        }
        if (action === 'update' && data.id) {
            const serverEntry = await this.prisma.temperatureEntry.findUnique({
                where: { id: data.id },
            });
            if (serverEntry) {
                const serverTs = serverEntry.updatedAt.getTime();
                if (serverTs > localTimestamp) {
                    const hasDataChange = this.hasConflictingData(serverEntry, data, ['temperature', 'measuredAt', 'location', 'notes']);
                    if (hasDataChange) {
                        conflicts.push({
                            entityType: 'temperature',
                            entityId: data.id,
                            localTimestamp,
                            serverTimestamp: serverTs,
                            localData: data,
                            serverData: serverEntry,
                            conflictType: 'last_write_wins',
                        });
                        await this.prisma.temperatureEntry.update({
                            where: { id: data.id },
                            data: {
                                temperature: data.temperature ?? serverEntry.temperature,
                                measuredAt: data.measuredAt ? new Date(data.measuredAt) : serverEntry.measuredAt,
                                location: data.location !== undefined ? data.location : serverEntry.location,
                                notes: data.notes !== undefined ? data.notes : serverEntry.notes,
                            },
                        });
                        return { synced: true };
                    }
                }
            }
            await this.prisma.temperatureEntry.update({
                where: { id: data.id },
                data: {
                    temperature: data.temperature ?? undefined,
                    measuredAt: data.measuredAt ? new Date(data.measuredAt) : undefined,
                    location: data.location !== undefined ? data.location : undefined,
                    notes: data.notes !== undefined ? data.notes : undefined,
                },
            });
            return { synced: true };
        }
        if (action === 'delete' && data.id) {
            await this.prisma.temperatureEntry.delete({ where: { id: data.id } });
            return { synced: true };
        }
        return { synced: false };
    }
    async syncGrowthEntry(userId, action, data, localTimestamp, conflicts) {
        if (action === 'create') {
            await this.prisma.growthEntry.create({
                data: {
                    childId: data.childId,
                    height: data.height ?? null,
                    weight: data.weight ?? null,
                    measuredAt: new Date(data.measuredAt),
                    notes: data.notes || null,
                },
            });
            return { synced: true };
        }
        if (action === 'update' && data.id) {
            const serverEntry = await this.prisma.growthEntry.findUnique({
                where: { id: data.id },
            });
            if (serverEntry) {
                const serverTs = serverEntry.updatedAt.getTime();
                if (serverTs > localTimestamp) {
                    const hasDataChange = this.hasConflictingData(serverEntry, data, ['height', 'weight', 'measuredAt', 'notes']);
                    if (hasDataChange) {
                        conflicts.push({
                            entityType: 'growth',
                            entityId: data.id,
                            localTimestamp,
                            serverTimestamp: serverTs,
                            localData: data,
                            serverData: serverEntry,
                            conflictType: 'last_write_wins',
                        });
                        await this.prisma.growthEntry.update({
                            where: { id: data.id },
                            data: {
                                height: data.height !== undefined ? data.height : serverEntry.height,
                                weight: data.weight !== undefined ? data.weight : serverEntry.weight,
                                measuredAt: data.measuredAt ? new Date(data.measuredAt) : serverEntry.measuredAt,
                                notes: data.notes !== undefined ? data.notes : serverEntry.notes,
                            },
                        });
                        return { synced: true };
                    }
                }
            }
            await this.prisma.growthEntry.update({
                where: { id: data.id },
                data: {
                    height: data.height !== undefined ? data.height : undefined,
                    weight: data.weight !== undefined ? data.weight : undefined,
                    measuredAt: data.measuredAt ? new Date(data.measuredAt) : undefined,
                    notes: data.notes !== undefined ? data.notes : undefined,
                },
            });
            return { synced: true };
        }
        if (action === 'delete' && data.id) {
            await this.prisma.growthEntry.delete({ where: { id: data.id } });
            return { synced: true };
        }
        return { synced: false };
    }
    async syncVaccineEntry(userId, action, data, localTimestamp, conflicts) {
        if (action === 'create') {
            await this.prisma.vaccine.create({
                data: {
                    childId: data.childId,
                    name: data.name || '',
                    dateAdministered: data.dateAdministered ? new Date(data.dateAdministered) : null,
                    dueDate: data.dueDate ? new Date(data.dueDate) : null,
                    provider: data.provider || null,
                    notes: data.notes || null,
                    completed: data.completed ?? false,
                },
            });
            return { synced: true };
        }
        if (action === 'update' && data.id) {
            const serverEntry = await this.prisma.vaccine.findUnique({
                where: { id: data.id },
            });
            if (serverEntry) {
                const serverTs = serverEntry.updatedAt.getTime();
                if (serverTs > localTimestamp) {
                    conflicts.push({
                        entityType: 'vaccine',
                        entityId: data.id,
                        localTimestamp,
                        serverTimestamp: serverTs,
                        localData: data,
                        serverData: serverEntry,
                        conflictType: 'medical_data_manual_review',
                    });
                    return { synced: false };
                }
            }
            await this.prisma.vaccine.update({
                where: { id: data.id },
                data: {
                    name: data.name !== undefined ? data.name : undefined,
                    dateAdministered: data.dateAdministered !== undefined ? (data.dateAdministered ? new Date(data.dateAdministered) : null) : undefined,
                    dueDate: data.dueDate !== undefined ? (data.dueDate ? new Date(data.dueDate) : null) : undefined,
                    provider: data.provider !== undefined ? data.provider : undefined,
                    notes: data.notes !== undefined ? data.notes : undefined,
                    completed: data.completed !== undefined ? data.completed : undefined,
                },
            });
            return { synced: true };
        }
        if (action === 'delete' && data.id) {
            await this.prisma.vaccine.delete({ where: { id: data.id } });
            return { synced: true };
        }
        return { synced: false };
    }
    async syncDiaryEntry(userId, action, data, localTimestamp, conflicts) {
        if (action === 'create') {
            await this.prisma.diaryEntry.create({
                data: {
                    childId: data.childId,
                    type: data.type,
                    description: data.description || null,
                    severity: data.severity || null,
                    duration: data.duration || null,
                    loggedAt: new Date(data.loggedAt),
                    notes: data.notes || null,
                },
            });
            return { synced: true };
        }
        if (action === 'update' && data.id) {
            const serverEntry = await this.prisma.diaryEntry.findUnique({
                where: { id: data.id },
            });
            if (serverEntry) {
                const serverTs = serverEntry.updatedAt.getTime();
                if (serverTs > localTimestamp) {
                    const hasDataChange = this.hasConflictingData(serverEntry, data, ['type', 'description', 'severity', 'duration', 'loggedAt', 'notes']);
                    if (hasDataChange) {
                        conflicts.push({
                            entityType: 'diary',
                            entityId: data.id,
                            localTimestamp,
                            serverTimestamp: serverTs,
                            localData: data,
                            serverData: serverEntry,
                            conflictType: 'last_write_wins',
                        });
                        await this.prisma.diaryEntry.update({
                            where: { id: data.id },
                            data: {
                                type: data.type !== undefined ? data.type : serverEntry.type,
                                description: data.description !== undefined ? data.description : serverEntry.description,
                                severity: data.severity !== undefined ? data.severity : serverEntry.severity,
                                duration: data.duration !== undefined ? data.duration : serverEntry.duration,
                                loggedAt: data.loggedAt ? new Date(data.loggedAt) : serverEntry.loggedAt,
                                notes: data.notes !== undefined ? data.notes : serverEntry.notes,
                            },
                        });
                        return { synced: true };
                    }
                }
            }
            await this.prisma.diaryEntry.update({
                where: { id: data.id },
                data: {
                    type: data.type !== undefined ? data.type : undefined,
                    description: data.description !== undefined ? data.description : undefined,
                    severity: data.severity !== undefined ? data.severity : undefined,
                    duration: data.duration !== undefined ? data.duration : undefined,
                    loggedAt: data.loggedAt ? new Date(data.loggedAt) : undefined,
                    notes: data.notes !== undefined ? data.notes : undefined,
                },
            });
            return { synced: true };
        }
        if (action === 'delete' && data.id) {
            await this.prisma.diaryEntry.delete({ where: { id: data.id } });
            return { synced: true };
        }
        return { synced: false };
    }
    async resolveConflict(userId, resolution) {
        const { entityType, entityId, resolution: res, mergedData } = resolution;
        const childId = await this.getEntityChildId(entityType, entityId);
        if (!childId)
            return false;
        const child = await this.prisma.child.findFirst({
            where: { id: childId, userId },
        });
        if (!child)
            return false;
        switch (entityType) {
            case 'vaccine': {
                if (res === 'local_wins' && mergedData) {
                    await this.prisma.vaccine.update({
                        where: { id: entityId },
                        data: {
                            name: mergedData.name ?? undefined,
                            dateAdministered: mergedData.dateAdministered ? new Date(mergedData.dateAdministered) : null,
                            dueDate: mergedData.dueDate ? new Date(mergedData.dueDate) : null,
                            provider: mergedData.provider ?? undefined,
                            notes: mergedData.notes ?? undefined,
                            completed: mergedData.completed ?? undefined,
                        },
                    });
                    return true;
                }
                if (res === 'server_wins') {
                    return true;
                }
                break;
            }
        }
        return false;
    }
    async getEntityChildId(entityType, entityId) {
        switch (entityType) {
            case 'temperature': {
                const entry = await this.prisma.temperatureEntry.findUnique({ where: { id: entityId } });
                return entry?.childId ?? null;
            }
            case 'growth': {
                const entry = await this.prisma.growthEntry.findUnique({ where: { id: entityId } });
                return entry?.childId ?? null;
            }
            case 'vaccine': {
                const entry = await this.prisma.vaccine.findUnique({ where: { id: entityId } });
                return entry?.childId ?? null;
            }
            case 'diary': {
                const entry = await this.prisma.diaryEntry.findUnique({ where: { id: entityId } });
                return entry?.childId ?? null;
            }
            default:
                return null;
        }
    }
    hasConflictingData(serverData, localData, fields) {
        for (const field of fields) {
            const serverVal = serverData[field];
            const localVal = localData[field];
            if (localVal !== undefined && serverVal !== localVal) {
                return true;
            }
        }
        return false;
    }
};
exports.SyncService = SyncService;
exports.SyncService = SyncService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SyncService);
//# sourceMappingURL=sync.service.js.map