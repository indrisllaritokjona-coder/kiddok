import { PrismaService } from '../prisma/prisma.service';
import { ChildrenService } from '../children/children.service';
export declare class VaccinesService {
    private prisma;
    private childrenService;
    constructor(prisma: PrismaService, childrenService: ChildrenService);
    create(userId: string, childId: string, data: any): Promise<{
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
    }>;
    findAllByChild(userId: string, childId: string): Promise<{
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
    }[]>;
    findOne(userId: string, id: string): Promise<{
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
    }>;
    update(userId: string, id: string, data: any): Promise<{
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
    }>;
    remove(userId: string, id: string): Promise<{
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
    }>;
}
