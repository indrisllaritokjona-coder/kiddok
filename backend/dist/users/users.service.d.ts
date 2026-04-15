import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(data: any): Promise<{
        id: string;
        email: string;
        password: string;
        pin: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        id: string;
        email: string;
        password: string;
        pin: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
