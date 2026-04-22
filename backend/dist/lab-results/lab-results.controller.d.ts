import { LabResultsService } from './lab-results.service';
import { CreateLabResultDto, UpdateLabResultDto } from './lab-result.dto';
export declare class LabResultsController {
    private readonly labResultsService;
    constructor(labResultsService: LabResultsService);
    create(req: any, childId: string, createDto: CreateLabResultDto): Promise<any>;
    findAllByChild(req: any, childId: string): Promise<any>;
    findOne(req: any, id: string): Promise<any>;
    update(req: any, id: string, updateDto: UpdateLabResultDto): Promise<any>;
    remove(req: any, id: string): Promise<any>;
}
