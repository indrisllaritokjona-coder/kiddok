import { ExportService } from './export.service';
export declare class ExportController {
    private readonly exportService;
    constructor(exportService: ExportService);
    exportPdf(req: any, childId: string, res: any): Promise<void>;
    exportCsv(req: any, childId: string, res: any): Promise<void>;
}
