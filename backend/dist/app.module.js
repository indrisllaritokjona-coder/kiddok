"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const children_module_1 = require("./children/children.module");
const health_records_module_1 = require("./health-records/health-records.module");
const vaccines_module_1 = require("./vaccines/vaccines.module");
const temperature_entries_module_1 = require("./temperature-entries/temperature-entries.module");
const growth_entries_module_1 = require("./growth-entries/growth-entries.module");
const parent_module_1 = require("./parent/parent.module");
const diary_module_1 = require("./diary/diary.module");
const illnesses_module_1 = require("./illnesses/illnesses.module");
const medications_module_1 = require("./medications/medications.module");
const appointments_module_1 = require("./appointments/appointments.module");
const lab_results_module_1 = require("./lab-results/lab-results.module");
const share_module_1 = require("./share/share.module");
const family_members_module_1 = require("./family-members/family-members.module");
const throttler_1 = require("@nestjs/throttler");
const export_module_1 = require("./export/export.module");
const import_module_1 = require("./import/import.module");
const mail_module_1 = require("./mail/mail.module");
const schedule_1 = require("@nestjs/schedule");
const sync_module_1 = require("./sync/sync.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            children_module_1.ChildrenModule,
            health_records_module_1.HealthRecordsModule,
            vaccines_module_1.VaccinesModule,
            temperature_entries_module_1.TemperatureEntriesModule,
            growth_entries_module_1.GrowthEntriesModule,
            parent_module_1.ParentModule,
            diary_module_1.DiaryModule,
            illnesses_module_1.IllnessesModule,
            medications_module_1.MedicationsModule,
            appointments_module_1.AppointmentsModule,
            lab_results_module_1.LabResultsModule,
            share_module_1.ShareModule,
            family_members_module_1.FamilyMembersModule,
            schedule_1.ScheduleModule.forRoot(),
            mail_module_1.MailModule,
            throttler_1.ThrottlerModule.forRoot([{
                    name: 'short',
                    ttl: 60000,
                    limit: 100,
                }]),
            export_module_1.ExportModule,
            import_module_1.ImportModule,
            sync_module_1.SyncModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map