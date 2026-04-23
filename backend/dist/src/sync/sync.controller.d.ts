import { SyncService } from './sync.service';
import { ConflictResolutionDto } from './dto/sync-conflict.dto';
export declare class SyncController {
    private readonly syncService;
    constructor(syncService: SyncService);
    sync(req: any, body: {
        entries: any[];
    }): Promise<import("./dto/sync-conflict.dto").SyncResultDto>;
    getConflicts(req: any): Promise<{
        message: string;
    }>;
    resolveConflict(req: any, resolution: ConflictResolutionDto): Promise<{
        success: boolean;
    }>;
}
