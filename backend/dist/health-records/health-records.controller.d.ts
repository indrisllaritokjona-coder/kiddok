import { HealthRecordsService } from './health-records.service';
export declare class HealthRecordsController {
    private readonly healthRecordsService;
    constructor(healthRecordsService: HealthRecordsService);
    create(req: any, childId: string, createData: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        type: string;
        symptoms: string | null;
        diagnosis: string | null;
        medications: string | null;
        notes: string | null;
        attachments: string[];
        doctorName: string | null;
        childId: string;
    }>;
    findAllByChild(req: any, childId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        type: string;
        symptoms: string | null;
        diagnosis: string | null;
        medications: string | null;
        notes: string | null;
        attachments: string[];
        doctorName: string | null;
        childId: string;
    }[]>;
    findOne(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        type: string;
        symptoms: string | null;
        diagnosis: string | null;
        medications: string | null;
        notes: string | null;
        attachments: string[];
        doctorName: string | null;
        childId: string;
    }>;
    update(req: any, id: string, updateData: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        type: string;
        symptoms: string | null;
        diagnosis: string | null;
        medications: string | null;
        notes: string | null;
        attachments: string[];
        doctorName: string | null;
        childId: string;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        type: string;
        symptoms: string | null;
        diagnosis: string | null;
        medications: string | null;
        notes: string | null;
        attachments: string[];
        doctorName: string | null;
        childId: string;
    }>;
}
