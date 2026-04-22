import { Module } from '@nestjs/common';
import { ImportController } from './import.controller';
import { ImportService } from './import.service';
import { ChildrenModule } from '../children/children.module';

@Module({
  imports: [ChildrenModule],
  controllers: [ImportController],
  providers: [ImportService],
})
export class ImportModule {}
