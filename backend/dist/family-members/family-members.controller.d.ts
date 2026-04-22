import { FamilyMembersService } from './family-members.service';
import { AddFamilyMemberDto } from './dto/add-family-member.dto';
export declare class FamilyMembersController {
    private readonly familyMembersService;
    constructor(familyMembersService: FamilyMembersService);
    add(req: any, dto: AddFamilyMemberDto): Promise<{
        id: string;
        userId: string;
        childId: string;
        role: string;
    }>;
    list(req: any, childId: string): Promise<({
        user: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        userId: string;
        childId: string;
        role: string;
    })[]>;
    remove(req: any, id: string): Promise<{
        message: string;
    }>;
}
