import { DiaryService } from './diary.service';
import { CreateDiaryEntryDto } from './dto/create-diary-entry.dto';
export declare class DiaryController {
    private readonly diaryService;
    constructor(diaryService: DiaryService);
    getByChild(req: any, childId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
        type: string;
        notes: string | null;
        description: string | null;
        severity: string | null;
        duration: string | null;
        loggedAt: Date;
    }[]>;
    create(req: any, dto: CreateDiaryEntryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
        type: string;
        notes: string | null;
        description: string | null;
        severity: string | null;
        duration: string | null;
        loggedAt: Date;
    }>;
    update(req: any, id: string, dto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
        type: string;
        notes: string | null;
        description: string | null;
        severity: string | null;
        duration: string | null;
        loggedAt: Date;
    }>;
    delete(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
        type: string;
        notes: string | null;
        description: string | null;
        severity: string | null;
        duration: string | null;
        loggedAt: Date;
    }>;
}
