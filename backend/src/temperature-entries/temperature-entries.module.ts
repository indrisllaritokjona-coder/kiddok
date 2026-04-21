import { Module } from '@nestjs/common';
import { TemperatureEntriesController } from './temperature-entries.controller';
import { TemperatureEntriesService } from './temperature-entries.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TemperatureEntriesController],
  providers: [TemperatureEntriesService],
})
export class TemperatureEntriesModule {}