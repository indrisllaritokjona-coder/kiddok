import { Module } from '@nestjs/common';
import { IllnessesController } from './illnesses.controller';
import { IllnessesService } from './illnesses.service';

@Module({
  controllers: [IllnessesController],
  providers: [IllnessesService],
  exports: [IllnessesService],
})
export class IllnessesModule {}