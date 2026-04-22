import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
export declare class FamilyMembersService {
    private prisma;
    private usersService;
    constructor(prisma: PrismaService, usersService: UsersService);
    addFamilyMember(ownerId: string, childId: string, email: string, role: string): Promise<{
        id: string;
        userId: string;
        childId: string;
        role: string;
    }>;
    removeFamilyMember(ownerId: string, familyMemberId: string): Promise<{
        message: string;
    }>;
    listFamilyMembers(childId: string, userId: string): Promise<({
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
}
