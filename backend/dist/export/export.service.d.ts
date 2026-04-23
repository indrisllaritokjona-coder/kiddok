import { PrismaService } from '../prisma/prisma.service';
export interface ChildHealthData {
    child: any;
    temperatureEntries: any[];
    growthEntries: any[];
    vaccines: any[];
    medications: any[];
    appointments: any[];
    labResults: any[];
    diaryEntries: any[];
    healthRecords: any[];
    illnessEpisodes: any[];
}
export declare class ExportService {
    private prisma;
    constructor(prisma: PrismaService);
    generatePdf(childId: string, userId: string): Promise<Buffer>;
    getChildHealthData(childId: string, userId: string): Promise<ChildHealthData>;
    private fetchChildHealthData;
    private buildPdf;
    private sectionTitle;
    private divider;
    private table;
}
