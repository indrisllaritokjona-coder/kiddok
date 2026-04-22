import { IllnessesService } from './illnesses.service';
import { CreateIllnessDto } from './dto/create-illness.dto';
export declare class IllnessesController {
    private readonly illnessesService;
    constructor(illnessesService: IllnessesService);
    getByChild(req: any, childId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        medications: string | null;
        childId: string;
        symptoms: string | null;
        notes: string | null;
        loggedAt: Date;
        title: string;
    }[]>;
    create(req: any, dto: CreateIllnessDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        medications: string | null;
        childId: string;
        symptoms: string | null;
        notes: string | null;
        loggedAt: Date;
        title: string;
    }>;
    update(req: any, id: string, dto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        medications: string | null;
        childId: string;
        symptoms: string | null;
        notes: string | null;
        loggedAt: Date;
        title: string;
    }>;
    delete(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        medications: string | null;
        childId: string;
        symptoms: string | null;
        notes: string | null;
        loggedAt: Date;
        title: string;
    }>;
}
