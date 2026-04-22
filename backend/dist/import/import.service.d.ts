import { PrismaService } from '../prisma/prisma.service';
import { ImportBackupDto } from './import.dto';
export declare class ImportService {
    private prisma;
    constructor(prisma: PrismaService);
    importBackup(userId: string, data: ImportBackupDto): Promise<{
        childId: string;
        counts: Record<string, number>;
    }>;
    private validateBackupStructure;
}
