import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChildrenModule } from './children/children.module';
import { HealthRecordsModule } from './health-records/health-records.module';
import { VaccinesModule } from './vaccines/vaccines.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ChildrenModule, HealthRecordsModule, VaccinesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
