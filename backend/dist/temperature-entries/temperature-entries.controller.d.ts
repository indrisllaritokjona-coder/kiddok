import { TemperatureEntriesService } from './temperature-entries.service';
export declare class TemperatureEntriesController {
    private readonly tempService;
    constructor(tempService: TemperatureEntriesService);
    create(req: any, data: any): Promise<{
        id: string;
        createdAt: Date;
        childId: string;
        notes: string | null;
        temperature: number;
        measuredAt: Date;
        location: string | null;
    }>;
    findByChild(req: any, childId: string): Promise<{
        id: string;
        createdAt: Date;
        childId: string;
        notes: string | null;
        temperature: number;
        measuredAt: Date;
        location: string | null;
    }[]>;
    delete(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        childId: string;
        notes: string | null;
        temperature: number;
        measuredAt: Date;
        location: string | null;
    }>;
}
