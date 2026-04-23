import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SyncConflictDto, SyncResultDto, ConflictResolutionDto } from './dto/sync-conflict.dto';

// Entities that use last-write-wins strategy
const LAST_WRITE_WINS_ENTITIES = ['temperature', 'growth', 'diary'];
// Entities that require manual review for conflicts
const MEDICAL_DATA_ENTITIES = ['vaccine'];

@Injectable()
export class SyncService {
  constructor(private prisma: PrismaService) {}

  /**
   * Sync incoming local entries from the offline queue.
   * Detects conflicts by comparing localTimestamp vs server updatedAt.
   * - Last-write-wins for temperature, growth, diary
   * - Flag for manual review for vaccine/medical data
   */
  async syncEntries(userId: string, entries: any[]): Promise<SyncResultDto> {
    const conflicts: SyncConflictDto[] = [];
    let syncedCount = 0;
    let failedCount = 0;

    for (const entry of entries) {
      try {
        const result = await this.processEntry(userId, entry, conflicts);
        if (result.synced) syncedCount++;
        else failedCount++;
      } catch {
        failedCount++;
      }
    }

    return { success: failedCount === 0, syncedCount, failedCount, conflicts };
  }

  private async processEntry(
    userId: string,
    entry: any,
    conflicts: SyncConflictDto[]
  ): Promise<{ synced: boolean }> {
    const { entityType, action, data, localTimestamp } = entry;
    const entityId = data?.id;

    // Verify child ownership
    const child = await this.prisma.child.findFirst({
      where: { id: data?.childId, userId },
    });
    if (!child) return { synced: false };

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

  private async syncTemperatureEntry(
    userId: string,
    action: string,
    data: any,
    localTimestamp: number,
    conflicts: SyncConflictDto[]
  ): Promise<{ synced: boolean }> {
    if (action === 'create') {
      // For creates, no conflict possible — just insert
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
      // Check for conflict: server's updatedAt > local timestamp
      const serverEntry = await this.prisma.temperatureEntry.findUnique({
        where: { id: data.id },
      });

      if (serverEntry) {
        const serverTs = serverEntry.updatedAt.getTime();
        if (serverTs > localTimestamp) {
          // CONFLICT: server was updated after local edit
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
            // Apply last-write-wins: local wins — update server record
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

      // No conflict or server is older — apply update
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

  private async syncGrowthEntry(
    userId: string,
    action: string,
    data: any,
    localTimestamp: number,
    conflicts: SyncConflictDto[]
  ): Promise<{ synced: boolean }> {
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
            // Last-write-wins: local wins
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

  private async syncVaccineEntry(
    userId: string,
    action: string,
    data: any,
    localTimestamp: number,
    conflicts: SyncConflictDto[]
  ): Promise<{ synced: boolean }> {
    // Vaccines are medical data — flag conflicts for manual review
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
          // MEDICAL DATA CONFLICT — flag for manual review
          conflicts.push({
            entityType: 'vaccine',
            entityId: data.id,
            localTimestamp,
            serverTimestamp: serverTs,
            localData: data,
            serverData: serverEntry,
            conflictType: 'medical_data_manual_review',
          });
          // DO NOT auto-resolve — await manual resolution from client
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

  private async syncDiaryEntry(
    userId: string,
    action: string,
    data: any,
    localTimestamp: number,
    conflicts: SyncConflictDto[]
  ): Promise<{ synced: boolean }> {
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

  /**
   * Apply manual conflict resolution for medical data (vaccines).
   * Called by client after user reviews the conflict.
   */
  async resolveConflict(userId: string, resolution: ConflictResolutionDto): Promise<boolean> {
    const { entityType, entityId, resolution: res, mergedData } = resolution;

    const childId = await this.getEntityChildId(entityType, entityId);
    if (!childId) return false;

    const child = await this.prisma.child.findFirst({
      where: { id: childId, userId },
    });
    if (!child) return false;

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
          // Server data already correct — just acknowledge
          return true;
        }
        break;
      }
    }
    return false;
  }

  private async getEntityChildId(entityType: string, entityId: string): Promise<string | null> {
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

  /**
   * Check if server and local data actually differ on tracked fields.
   * Only flags a conflict if meaningful data changed.
   */
  private hasConflictingData(serverData: any, localData: any, fields: string[]): boolean {
    for (const field of fields) {
      const serverVal = serverData[field];
      const localVal = localData[field];
      if (localVal !== undefined && serverVal !== localVal) {
        return true;
      }
    }
    return false;
  }
}