"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportBackupDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class BackupTemperatureEntryDto {
    temperature;
    measuredAt;
    location;
    notes;
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BackupTemperatureEntryDto.prototype, "temperature", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BackupTemperatureEntryDto.prototype, "measuredAt", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupTemperatureEntryDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupTemperatureEntryDto.prototype, "notes", void 0);
class BackupGrowthEntryDto {
    height;
    weight;
    measuredAt;
    notes;
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], BackupGrowthEntryDto.prototype, "height", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], BackupGrowthEntryDto.prototype, "weight", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BackupGrowthEntryDto.prototype, "measuredAt", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupGrowthEntryDto.prototype, "notes", void 0);
class BackupVaccineDto {
    name;
    dateAdministered;
    dueDate;
    provider;
    notes;
    completed;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BackupVaccineDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupVaccineDto.prototype, "dateAdministered", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupVaccineDto.prototype, "dueDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupVaccineDto.prototype, "provider", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupVaccineDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BackupVaccineDto.prototype, "completed", void 0);
class BackupMedicationDto {
    name;
    dosage;
    frequency;
    startDate;
    endDate;
    prescribedBy;
    notes;
    active;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BackupMedicationDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BackupMedicationDto.prototype, "dosage", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BackupMedicationDto.prototype, "frequency", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BackupMedicationDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupMedicationDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupMedicationDto.prototype, "prescribedBy", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupMedicationDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BackupMedicationDto.prototype, "active", void 0);
class BackupAppointmentDto {
    title;
    dateTime;
    doctorName;
    location;
    notes;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BackupAppointmentDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BackupAppointmentDto.prototype, "dateTime", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupAppointmentDto.prototype, "doctorName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupAppointmentDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupAppointmentDto.prototype, "notes", void 0);
class BackupLabResultDto {
    testName;
    result;
    unit;
    referenceRange;
    date;
    doctor;
    notes;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BackupLabResultDto.prototype, "testName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BackupLabResultDto.prototype, "result", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupLabResultDto.prototype, "unit", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupLabResultDto.prototype, "referenceRange", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BackupLabResultDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupLabResultDto.prototype, "doctor", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupLabResultDto.prototype, "notes", void 0);
class BackupDiaryEntryDto {
    type;
    description;
    severity;
    duration;
    loggedAt;
    notes;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BackupDiaryEntryDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupDiaryEntryDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupDiaryEntryDto.prototype, "severity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupDiaryEntryDto.prototype, "duration", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BackupDiaryEntryDto.prototype, "loggedAt", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupDiaryEntryDto.prototype, "notes", void 0);
class BackupIllnessEpisodeDto {
    title;
    symptoms;
    medications;
    notes;
    loggedAt;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BackupIllnessEpisodeDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupIllnessEpisodeDto.prototype, "symptoms", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupIllnessEpisodeDto.prototype, "medications", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupIllnessEpisodeDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BackupIllnessEpisodeDto.prototype, "loggedAt", void 0);
class BackupChildDto {
    name;
    dateOfBirth;
    gender;
    bloodType;
    allergies;
    birthWeight;
    deliveryDoctor;
    criticalAllergies;
    medicalNotes;
    temperatureEntries;
    growthEntries;
    vaccines;
    medications;
    appointments;
    labResults;
    diaryEntries;
    illnessEpisodes;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BackupChildDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BackupChildDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupChildDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupChildDto.prototype, "bloodType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupChildDto.prototype, "allergies", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], BackupChildDto.prototype, "birthWeight", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupChildDto.prototype, "deliveryDoctor", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupChildDto.prototype, "criticalAllergies", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BackupChildDto.prototype, "medicalNotes", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => BackupTemperatureEntryDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], BackupChildDto.prototype, "temperatureEntries", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => BackupGrowthEntryDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], BackupChildDto.prototype, "growthEntries", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => BackupVaccineDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], BackupChildDto.prototype, "vaccines", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => BackupMedicationDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], BackupChildDto.prototype, "medications", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => BackupAppointmentDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], BackupChildDto.prototype, "appointments", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => BackupLabResultDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], BackupChildDto.prototype, "labResults", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => BackupDiaryEntryDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], BackupChildDto.prototype, "diaryEntries", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => BackupIllnessEpisodeDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], BackupChildDto.prototype, "illnessEpisodes", void 0);
class ImportBackupDto {
    version;
    exportedAt;
    child;
}
exports.ImportBackupDto = ImportBackupDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ImportBackupDto.prototype, "version", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ImportBackupDto.prototype, "exportedAt", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", BackupChildDto)
], ImportBackupDto.prototype, "child", void 0);
//# sourceMappingURL=import.dto.js.map