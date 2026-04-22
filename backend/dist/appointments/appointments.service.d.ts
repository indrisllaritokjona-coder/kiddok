import { PrismaService } from '../prisma/prisma.service';
import { ChildrenService } from '../children/children.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './appointment.dto';
export declare class AppointmentsService {
    private prisma;
    private childrenService;
    constructor(prisma: PrismaService, childrenService: ChildrenService);
    create(userId: string, childId: string, data: CreateAppointmentDto): Promise<any>;
    findAllByChild(userId: string, childId: string): Promise<any>;
    findOne(userId: string, id: string): Promise<any>;
    update(userId: string, id: string, data: UpdateAppointmentDto): Promise<any>;
    remove(userId: string, id: string): Promise<any>;
}
