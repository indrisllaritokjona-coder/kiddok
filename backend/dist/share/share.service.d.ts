import { PrismaService } from '../prisma/prisma.service';
export declare class ShareService {
    private prisma;
    constructor(prisma: PrismaService);
    createShareLink(childId: string, userId: string, expiresAt: Date): Promise<{
        id: string;
        createdAt: Date;
        childId: string;
        token: string;
        expiresAt: Date;
        createdBy: string;
    }>;
    getSharedChild(token: string): Promise<{
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
                updatedAt: Date;
                childId: string;
                notes: string | null;
                temperature: number;
                measuredAt: Date;
                location: string | null;
            }[];
            growthEntries: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
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
            avatarSeed: string | null;
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
    revokeShareLink(shareLinkId: string, userId: string): Promise<{
        message: string;
    }>;
    listShareLinks(childId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        token: string;
        expiresAt: Date;
    }[]>;
}
