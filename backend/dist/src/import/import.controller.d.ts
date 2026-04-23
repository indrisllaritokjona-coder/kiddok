import { ImportService } from './import.service';
import { ImportBackupDto } from './import.dto';
export declare class ImportController {
    private readonly importService;
    constructor(importService: ImportService);
    importChild(req: any, importDto: ImportBackupDto): Promise<{
        childId: string;
        counts: Record<string, number>;
    }>;
}
