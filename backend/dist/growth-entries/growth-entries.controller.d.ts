import { GrowthEntriesService } from './growth-entries.service';
import { CreateGrowthEntryDto } from './dto/create-growth-entry.dto';
export declare class GrowthEntriesController {
    private readonly growthService;
    constructor(growthService: GrowthEntriesService);
    create(req: any, data: CreateGrowthEntryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
        notes: string | null;
        measuredAt: Date;
        height: number | null;
        weight: number | null;
    }>;
    findByChild(req: any, childId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
        notes: string | null;
        measuredAt: Date;
        height: number | null;
        weight: number | null;
    }[]>;
    delete(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
        notes: string | null;
        measuredAt: Date;
        height: number | null;
        weight: number | null;
    }>;
}
