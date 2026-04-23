import { Module } from '@nestjs/common';
import { ExportController } from './export.controller';
import { ExportService } from './export.service';
import { ChildrenModule } from '../children/children.module';
import { TemperatureEntriesModule } from '../temperature-entries/temperature-entries.module';
import { GrowthEntriesModule } from '../growth-entries/growth-entries.module';
import { VaccinesModule } from '../vaccines/vaccines.module';

@Module({
  controllers: [ExportController],
  providers: [ExportService],
  imports: [
    ChildrenModule,
    TemperatureEntriesModule,
    GrowthEntriesModule,
    VaccinesModule,
  ],
})
export class ExportModule {}