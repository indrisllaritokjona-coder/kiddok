import { PrismaService } from '../prisma/prisma.service';
export declare class ChildrenService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, data: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        dateOfBirth: Date;
        gender: string | null;
        bloodType: string | null;
        allergies: string | null;
        userId: string;
    }>;
    findAllByUser(userId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        dateOfBirth: Date;
        gender: string | null;
        bloodType: string | null;
        allergies: string | null;
        userId: string;
    }[]>;
    findOne(id: string, userId: string): Promise<{
        healthRecords: {
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
        }[];
        vaccines: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            notes: string | null;
            childId: string;
            dateAdministered: Date | null;
            dueDate: Date | null;
            provider: string | null;
            completed: boolean;
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
        userId: string;
    }>;
    update(id: string, userId: string, data: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        dateOfBirth: Date;
        gender: string | null;
        bloodType: string | null;
        allergies: string | null;
        userId: string;
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        dateOfBirth: Date;
        gender: string | null;
        bloodType: string | null;
        allergies: string | null;
        userId: string;
    }>;
}
