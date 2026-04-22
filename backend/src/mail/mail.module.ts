import { Module, Global } from '@nestjs/common';
import { MailService } from './mail.service';
import { ReminderService } from './reminder.service';

@Global()
@Module({
  providers: [MailService, ReminderService],
  exports: [MailService],
})
export class MailModule {}