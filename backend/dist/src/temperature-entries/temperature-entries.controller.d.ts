import { TemperatureEntriesService } from './temperature-entries.service';
export declare class TemperatureEntriesController {
    private readonly tempService;
    constructor(tempService: TemperatureEntriesService);
    create(req: any, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        temperature: number;
        measuredAt: Date;
        location: string | null;
        notes: string | null;
        childId: string;
    }>;
    findByChild(req: any, childId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        temperature: number;
        measuredAt: Date;
        location: string | null;
        notes: string | null;
        childId: string;
    }[]>;
    delete(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        temperature: number;
        measuredAt: Date;
        location: string | null;
        notes: string | null;
        childId: string;
    }>;
}
