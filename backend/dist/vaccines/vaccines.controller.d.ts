import { VaccinesService } from './vaccines.service';
export declare class VaccinesController {
    private readonly vaccinesService;
    constructor(vaccinesService: VaccinesService);
    create(req: any, childId: string, createData: any): Promise<{
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
    }>;
    findAllByChild(req: any, childId: string): Promise<{
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
    }[]>;
    findOne(req: any, id: string): Promise<{
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
    }>;
    update(req: any, id: string, updateData: any): Promise<{
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
    }>;
    remove(req: any, id: string): Promise<{
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
    }>;
}
