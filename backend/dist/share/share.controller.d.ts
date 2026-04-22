import { ShareService } from './share.service';
import { CreateShareLinkDto } from './dto/create-share-link.dto';
export declare class ShareController {
    private readonly shareService;
    constructor(shareService: ShareService);
    create(req: any, childId: string, dto: CreateShareLinkDto): Promise<{
        id: string;
        createdAt: Date;
        childId: string;
        token: string;
        expiresAt: Date;
        createdBy: string;
    }>;
    view(token: string): Promise<{
        child: {
            vaccines: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                childId: string;
                notes: string | null;
                dateAdministered: Date | null;
                dueDate: Date | null;
                provider: string | null;
                completed: boolean;
            }[];
            temperatureEntries: {
                id: string;
                createdAt: Date;
                childId: string;
                notes: string | null;
                temperature: number;
                measuredAt: Date;
                location: string | null;
            }[];
            growthEntries: {
                id: string;
                createdAt: Date;
                childId: string;
                notes: string | null;
                measuredAt: Date;
                height: number | null;
                weight: number | null;
            }[];
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            dateOfBirth: Date;
            gender: string | null;
            bloodType: string | null;
            allergies: string | null;
            birthWeight: number | null;
            deliveryDoctor: string | null;
            criticalAllergies: string | null;
            medicalDocument: string | null;
            documentIssueDate: Date | null;
            medicalNotes: string | null;
            userId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        childId: string;
        token: string;
        expiresAt: Date;
        createdBy: string;
    }>;
    revoke(req: any, id: string): Promise<{
        message: string;
    }>;
    list(req: any, childId: string): Promise<{
        id: string;
        createdAt: Date;
        token: string;
        expiresAt: Date;
    }[]>;
}
