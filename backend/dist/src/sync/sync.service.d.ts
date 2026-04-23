import { PrismaService } from '../prisma/prisma.service';
import { SyncResultDto, ConflictResolutionDto } from './dto/sync-conflict.dto';
export declare class SyncService {
    private prisma;
    constructor(prisma: PrismaService);
    syncEntries(userId: string, entries: any[]): Promise<SyncResultDto>;
    private processEntry;
    private syncTemperatureEntry;
    private syncGrowthEntry;
    private syncVaccineEntry;
    private syncDiaryEntry;
    resolveConflict(userId: string, resolution: ConflictResolutionDto): Promise<boolean>;
    private getEntityChildId;
    private hasConflictingData;
}
