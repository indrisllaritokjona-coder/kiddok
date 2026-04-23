import { DiaryService } from './diary.service';
import { CreateDiaryEntryDto } from './dto/create-diary-entry.dto';
import { UpdateDiaryEntryDto } from './dto/update-diary-entry.dto';
export declare class DiaryController {
    private readonly diaryService;
    constructor(diaryService: DiaryService);
    getByChild(req: any, childId: string): Promise<{
        id: string;
        childId: string;
        type: string;
        description: string | null;
        severity: string | null;
        duration: string | null;
        loggedAt: Date;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(req: any, dto: CreateDiaryEntryDto): Promise<{
        id: string;
        childId: string;
        type: string;
        description: string | null;
        severity: string | null;
        duration: string | null;
        loggedAt: Date;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(req: any, id: string, dto: UpdateDiaryEntryDto): Promise<{
        id: string;
        childId: string;
        type: string;
        description: string | null;
        severity: string | null;
        duration: string | null;
        loggedAt: Date;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(req: any, id: string): Promise<{
        id: string;
        childId: string;
        type: string;
        description: string | null;
        severity: string | null;
        duration: string | null;
        loggedAt: Date;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
