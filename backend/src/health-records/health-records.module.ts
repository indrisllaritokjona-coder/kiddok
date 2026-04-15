import { Module } from '@nestjs/common';
import { HealthRecordsService } from './health-records.service';
import { HealthRecordsController } from './health-records.controller';
import { ChildrenModule } from '../children/children.module';

@Module({
  imports: [ChildrenModule],
  providers: [HealthRecordsService],
  controllers: [HealthRecordsController]
})
export class HealthRecordsModule {}
