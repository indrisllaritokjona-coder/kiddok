export declare class CreateLabResultDto {
    testName: string;
    result: string;
    unit?: string;
    referenceRange?: string;
    date: string;
    doctor?: string;
    notes?: string;
    type?: string;
    attachments?: string[];
}
export declare class UpdateLabResultDto {
    testName?: string;
    result?: string;
    unit?: string;
    referenceRange?: string;
    date?: string;
    doctor?: string;
    notes?: string;
    type?: string;
    attachments?: string[];
}
