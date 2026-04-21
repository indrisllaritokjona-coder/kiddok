import { Module } from '@nestjs/common';
import { GrowthEntriesController } from './growth-entries.controller';
import { GrowthEntriesService } from './growth-entries.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GrowthEntriesController],
  providers: [GrowthEntriesService],
})
export class GrowthEntriesModule {}
