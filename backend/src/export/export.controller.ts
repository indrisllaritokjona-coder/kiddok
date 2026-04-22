import { Controller, Get, Param, Res, UseGuards, Request, NotFoundException, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExportService } from './export.service';

/** Escapes a CSV field: wraps in quotes if contains comma/quote/newline, doubles inner quotes */
function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

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

  /**
   * GET /export/:childId/csv
   * Exports temperature, growth, and vaccine records as a CSV file.
   */
  @Get(':childId/csv')
  async exportCsv(@Request() req: any, @Param('childId') childId: string, @Res() res: any) {
    const userId = req.user.userId;

    const data = await this.exportService.getChildHealthData(childId, userId);

    if (!data.child) {
      throw new NotFoundException('Child not found.');
    }

    const { child, temperatureEntries, growthEntries, vaccines } = data;

    const lines: string[] = [];

    // ── Header section ──────────────────────────────────────────────
    lines.push('Child Health Data Export');
    lines.push(`Child,${csvEscape(child.name)}`);
    lines.push(`Date of Birth,${csvEscape(child.dateOfBirth)}`);
    lines.push(`Blood Type,${csvEscape(child.bloodType ?? '')}`);
    lines.push(`Critical Allergies,${csvEscape(child.criticalAllergies ?? '')}`);
    lines.push(`Generated At,${new Date().toISOString()}`);
    lines.push('');

    // ── Temperature Entries ─────────────────────────────────────────
    lines.push('TEMPERATURE ENTRIES');
    lines.push('Date,Time,Temperature (°C),Location,Notes');
    for (const entry of temperatureEntries) {
      const d = new Date(entry.measuredAt);
      const dateStr = d.toLocaleDateString('sq-AL');
      const timeStr = d.toLocaleTimeString('sq-AL', { hour: '2-digit', minute: '2-digit' });
      lines.push([
        csvEscape(dateStr),
        csvEscape(timeStr),
        csvEscape(entry.temperature),
        csvEscape(entry.location ?? ''),
        csvEscape(entry.notes ?? ''),
      ].join(','));
    }
    lines.push('');

    // ── Growth Entries ──────────────────────────────────────────────
    lines.push('GROWTH ENTRIES');
    lines.push('Date,Height (cm),Weight (kg),Notes');
    for (const entry of growthEntries) {
      const d = new Date(entry.measuredAt);
      const dateStr = d.toLocaleDateString('sq-AL');
      lines.push([
        csvEscape(dateStr),
        csvEscape(entry.height ?? ''),
        csvEscape(entry.weight ?? ''),
        csvEscape(entry.notes ?? ''),
      ].join(','));
    }
    lines.push('');

    // ── Vaccine Records ──────────────────────────────────────────────
    lines.push('VACCINE RECORDS');
    lines.push('Vaccine Name,Dose,Total Doses,Due Date,Completed At,Status,Administered By,Batch Number,Site,Notes');
    for (const v of vaccines) {
      lines.push([
        csvEscape(v.vaccineName ?? ''),
        csvEscape(v.doseNumber ?? ''),
        csvEscape(v.totalDoses ?? ''),
        csvEscape(v.dueDate ?? ''),
        csvEscape(v.completedAt ?? ''),
        csvEscape(v.status ?? ''),
        csvEscape(v.administeredBy ?? ''),
        csvEscape(v.batchNumber ?? ''),
        csvEscape(v.site ?? ''),
        csvEscape(v.notes ?? ''),
      ].join(','));
    }

    const csvContent = lines.join('\r\n');
    const safeName = (child.name || 'child').replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `${safeName}_health_export_${new Date().toISOString().split('T')[0]}.csv`;

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('X-Generated-At', new Date().toISOString());
    res.setHeader('X-Child-Id', childId);
    res.send(csvContent);
  }
}