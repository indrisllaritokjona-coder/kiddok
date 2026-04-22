import { PrismaService } from '../prisma/prisma.service';
import { ChildrenService } from '../children/children.service';
import { CreateLabResultDto, UpdateLabResultDto } from './lab-result.dto';
export declare class LabResultsService {
    private prisma;
    private childrenService;
    constructor(prisma: PrismaService, childrenService: ChildrenService);
    create(userId: string, childId: string, data: CreateLabResultDto): Promise<any>;
    findAllByChild(userId: string, childId: string): Promise<any>;
    findOne(userId: string, id: string): Promise<any>;
    update(userId: string, id: string, data: UpdateLabResultDto): Promise<any>;
    remove(userId: string, id: string): Promise<any>;
}
