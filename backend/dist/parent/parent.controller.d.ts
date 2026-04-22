import { ParentService } from './parent.service';
import { UpdateParentDto } from './dto/update-parent.dto';
export declare class ParentController {
    private readonly parentService;
    constructor(parentService: ParentService);
    getProfile(req: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        surname: string;
        phone: string;
    }>;
    updateProfile(req: any, dto: UpdateParentDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        surname: string;
        phone: string;
    }>;
}
