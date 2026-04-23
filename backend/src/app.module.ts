import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChildrenModule } from './children/children.module';
import { HealthRecordsModule } from './health-records/health-records.module';
import { VaccinesModule } from './vaccines/vaccines.module';
import { TemperatureEntriesModule } from './temperature-entries/temperature-entries.module';
import { GrowthEntriesModule } from './growth-entries/growth-entries.module';
import { ParentModule } from './parent/parent.module';
import { DiaryModule } from './diary/diary.module';
import { IllnessesModule } from './illnesses/illnesses.module';
import { MedicationsModule } from './medications/medications.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { LabResultsModule } from './lab-results/lab-results.module';
import { ShareModule } from './share/share.module';
import { FamilyMembersModule } from './family-members/family-members.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ExportModule } from './export/export.module';
import { ImportModule } from './import/import.module';
import { MailModule } from './mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SyncModule } from './sync/sync.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    ChildrenModule,
    HealthRecordsModule,
    VaccinesModule,
    TemperatureEntriesModule,
    GrowthEntriesModule,
    ParentModule,
    DiaryModule,
    IllnessesModule,
    MedicationsModule,
    AppointmentsModule,
    LabResultsModule,
    ShareModule,
    FamilyMembersModule,
    // Scheduling + Email
    ScheduleModule.forRoot(),
    MailModule,
    // Global rate limiting: 100 requests per minute per IP
    ThrottlerModule.forRoot([{
      name: 'short',
      ttl: 60000,
      limit: 100,
    }]),
    ExportModule,
    ImportModule,
    SyncModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}