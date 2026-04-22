import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './appointment.dto';
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    create(req: any, childId: string, createDto: CreateAppointmentDto): Promise<any>;
    findAllByChild(req: any, childId: string): Promise<any>;
    findOne(req: any, id: string): Promise<any>;
    update(req: any, id: string, updateDto: UpdateAppointmentDto): Promise<any>;
    remove(req: any, id: string): Promise<any>;
}
