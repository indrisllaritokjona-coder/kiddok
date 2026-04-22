import { Controller, Post, Body, UseGuards, Request, UsePipes, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ImportService } from './import.service';
import { ImportBackupDto } from './import.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('import')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  /**
   * POST /import/child
   * Imports a child and all related health records from a JSON backup.
   */
  @Post('child')
  @HttpCode(HttpStatus.CREATED)
  async importChild(@Request() req: any, @Body() importDto: ImportBackupDto) {
    const userId = req.user.userId;
    return this.importService.importBackup(userId, importDto);
  }
}
