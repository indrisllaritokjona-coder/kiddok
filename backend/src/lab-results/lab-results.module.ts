import { Module } from '@nestjs/common';
import { LabResultsController } from './lab-results.controller';
import { LabResultsService } from './lab-results.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ChildrenModule } from '../children/children.module';

@Module({
  imports: [PrismaModule, ChildrenModule],
  controllers: [LabResultsController],
  providers: [LabResultsService],
})
export class LabResultsModule {}