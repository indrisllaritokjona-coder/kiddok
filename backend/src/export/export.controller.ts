import { Controller, Get, Param, Res, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExportService } from './export.service';

@UseGuards(AuthGuard('jwt'))
@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  /**
   * GET /export/:childId/pdf
   * Generates and downloads a PDF health report for the specified child.
   */
  @Get(':childId/pdf')
  async exportPdf(@Request() req: any, @Param('childId') childId: string, @Res() res: any) {
    const userId = req.user.userId;
    const pdfBuffer = await this.exportService.generatePdf(childId, userId);

    const filename = `kiddok-health-report-${childId}.pdf`;
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': pdfBuffer.length,
    });

    res.end(pdfBuffer);
  }
}
