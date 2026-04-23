import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import PDFDocument from 'pdfkit';

export interface ChildHealthData {
  child: any;
  temperatureEntries: any[];
  growthEntries: any[];
  vaccines: any[];
  medications: any[];
  appointments: any[];
  labResults: any[];
  diaryEntries: any[];
  healthRecords: any[];
  illnessEpisodes: any[];
}

@Injectable()
export class ExportService {
  constructor(private prisma: PrismaService) {}

  /**
   * Export all health data for a child as a formatted PDF.
   */
  async generatePdf(childId: string, userId: string): Promise<Buffer> {
    // Fetch all data
    const data = await this.fetchChildHealthData(childId, userId);

    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50, size: 'A4' });
        const chunks: Buffer[] = [];

        doc.on('data', (chunk: Buffer) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        this.buildPdf(doc, data);
        doc.end();
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Public wrapper for CSV export — calls private fetchChildHealthData.
   */
  async getChildHealthData(childId: string, userId: string): Promise<ChildHealthData> {
    return this.fetchChildHealthData(childId, userId);
  }

  private async fetchChildHealthData(childId: string, userId: string): Promise<ChildHealthData> {
    const child = await this.prisma.child.findFirst({
      where: {
        id: childId,
        OR: [
          { userId },
          { familyMembers: { some: { userId } } },
        ],
      },
    });

    if (!child) {
      throw new NotFoundException('Child not found or access denied');
    }

    const [
      temperatureEntries,
      growthEntries,
      vaccines,
      medications,
      appointments,
      labResults,
      diaryEntries,
      healthRecords,
      illnessEpisodes,
    ] = await Promise.all([
      this.prisma.temperatureEntry.findMany({ where: { childId }, orderBy: { measuredAt: 'desc' } }),
      this.prisma.growthEntry.findMany({ where: { childId }, orderBy: { measuredAt: 'desc' } }),
      this.prisma.vaccine.findMany({ where: { childId }, orderBy: { dateAdministered: 'desc' } }),
      this.prisma.medication.findMany({ where: { childId }, orderBy: { createdAt: 'desc' } }),
      this.prisma.appointment.findMany({ where: { childId }, orderBy: { dateTime: 'desc' } }),
      this.prisma.labResult.findMany({ where: { childId }, orderBy: { date: 'desc' } }),
      this.prisma.diaryEntry.findMany({ where: { childId }, orderBy: { loggedAt: 'desc' } }),
      this.prisma.healthRecord.findMany({ where: { childId }, orderBy: { date: 'desc' } }),
      this.prisma.illnessEpisode.findMany({ where: { childId }, orderBy: { loggedAt: 'desc' } }),
    ]);

    return {
      child,
      temperatureEntries,
      growthEntries,
      vaccines,
      medications,
      appointments,
      labResults,
      diaryEntries,
      healthRecords,
      illnessEpisodes,
    };
  }

  private buildPdf(doc: PDFKit.PDFDocument, data: ChildHealthData): void {
    const { child } = data;
    const accentColor = '#2563eb';
    const textColor = '#1f2937';
    const mutedColor = '#6b7280';

    // ── HEADER ────────────────────────────────────────────────────────────────
    doc.rect(0, 0, doc.page.width, 80).fill(accentColor);
    doc.fill('#ffffff');
    doc.fontSize(22).font('Helvetica-Bold').text('KidDok', 50, 28, { lineBreak: false });
    doc.fontSize(11).font('Helvetica').text('Health Report', 50, 52);
    doc.text(new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }), doc.page.width - 180, 52);

    doc.moveDown(4);

    // ── CHILD PROFILE ─────────────────────────────────────────────────────────
    doc.fill(textColor);
    this.sectionTitle(doc, 'Child Profile', accentColor);
    this.divider(doc, accentColor);

    const profileFields: [string, string][] = [
      ['Name', child.name],
      ['Date of Birth', new Date(child.dateOfBirth).toLocaleDateString('en-GB')],
      ['Gender', child.gender || '—'],
      ['Blood Type', child.bloodType || '—'],
      ['Birth Weight', child.birthWeight ? `${child.birthWeight} kg` : '—'],
      ['Delivery Doctor', child.deliveryDoctor || '—'],
      ['Allergies', child.allergies || 'None recorded'],
      ['Critical Allergies', child.criticalAllergies || 'None recorded'],
      ['Medical Notes', child.medicalNotes || '—'],
    ];

    const col = doc.page.margins.left;
    profileFields.forEach(([label, value]) => {
      doc.font('Helvetica-Bold').fontSize(10).fill(accentColor).text(label + ':', col, doc.y, { continued: true, width: 130 });
      doc.font('Helvetica').fontSize(10).fill(textColor).text(value, doc.x, doc.y);
      doc.moveDown(0.5);
    });

    doc.moveDown(1);

    // ── TEMPERATURE DIARY ─────────────────────────────────────────────────────
    this.sectionTitle(doc, 'Temperature Diary', accentColor);
    this.divider(doc, accentColor);

    if (data.temperatureEntries.length === 0) {
      doc.fontSize(10).fill(mutedColor).text('No temperature records.');
    } else {
      this.table(doc, ['Date', 'Time', 'Temp (°C)', 'Location', 'Notes'],
        data.temperatureEntries.map(e => [
          new Date(e.measuredAt).toLocaleDateString('en-GB'),
          new Date(e.measuredAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
          e.temperature.toFixed(1),
          e.location || '—',
          e.notes || '—',
        ]));
    }

    doc.moveDown(1);

    // ── GROWTH TRACKING ───────────────────────────────────────────────────────
    this.sectionTitle(doc, 'Growth Tracking', accentColor);
    this.divider(doc, accentColor);

    if (data.growthEntries.length === 0) {
      doc.fontSize(10).fill(mutedColor).text('No growth records.');
    } else {
      this.table(doc, ['Date', 'Height (cm)', 'Weight (kg)', 'Notes'],
        data.growthEntries.map(e => [
          new Date(e.measuredAt).toLocaleDateString('en-GB'),
          e.height != null ? e.height.toFixed(1) : '—',
          e.weight != null ? e.weight.toFixed(1) : '—',
          e.notes || '—',
        ]));
    }

    doc.moveDown(1);

    // ── VACCINES ──────────────────────────────────────────────────────────────
    this.sectionTitle(doc, 'Vaccines', accentColor);
    this.divider(doc, accentColor);

    if (data.vaccines.length === 0) {
      doc.fontSize(10).fill(mutedColor).text('No vaccine records.');
    } else {
      this.table(doc, ['Vaccine', 'Date Given', 'Due Date', 'Provider', 'Status'],
        data.vaccines.map(v => [
          v.name,
          v.dateAdministered ? new Date(v.dateAdministered).toLocaleDateString('en-GB') : '—',
          v.dueDate ? new Date(v.dueDate).toLocaleDateString('en-GB') : '—',
          v.provider || '—',
          v.completed ? 'Completed' : 'Pending',
        ]));
    }

    doc.moveDown(1);

    // ── MEDICATIONS ────────────────────────────────────────────────────────────
    this.sectionTitle(doc, 'Medications', accentColor);
    this.divider(doc, accentColor);

    if (data.medications.length === 0) {
      doc.fontSize(10).fill(mutedColor).text('No medication records.');
    } else {
      this.table(doc, ['Name', 'Dosage', 'Frequency', 'Start Date', 'Prescribed By', 'Status'],
        data.medications.map(m => [
          m.name,
          m.dosage,
          m.frequency,
          new Date(m.startDate).toLocaleDateString('en-GB'),
          m.prescribedBy || '—',
          m.active ? 'Active' : 'Inactive',
        ]));
    }

    doc.moveDown(1);

    // ── APPOINTMENTS ───────────────────────────────────────────────────────────
    this.sectionTitle(doc, 'Appointments', accentColor);
    this.divider(doc, accentColor);

    if (data.appointments.length === 0) {
      doc.fontSize(10).fill(mutedColor).text('No appointment records.');
    } else {
      this.table(doc, ['Title', 'Date & Time', 'Doctor', 'Location', 'Notes'],
        data.appointments.map(a => [
          a.title,
          new Date(a.dateTime).toLocaleString('en-GB'),
          a.doctorName || '—',
          a.location || '—',
          a.notes || '—',
        ]));
    }

    doc.moveDown(1);

    // ── LAB RESULTS ────────────────────────────────────────────────────────────
    this.sectionTitle(doc, 'Lab Results', accentColor);
    this.divider(doc, accentColor);

    if (data.labResults.length === 0) {
      doc.fontSize(10).fill(mutedColor).text('No lab result records.');
    } else {
      this.table(doc, ['Test', 'Result', 'Unit', 'Reference Range', 'Date', 'Doctor'],
        data.labResults.map(l => [
          l.testName,
          l.result,
          l.unit || '—',
          l.referenceRange || '—',
          new Date(l.date).toLocaleDateString('en-GB'),
          l.doctor || '—',
        ]));
    }

    doc.moveDown(1);

    // ── DIARY ENTRIES ──────────────────────────────────────────────────────────
    this.sectionTitle(doc, 'Health Diary', accentColor);
    this.divider(doc, accentColor);

    if (data.diaryEntries.length === 0) {
      doc.fontSize(10).fill(mutedColor).text('No diary entries.');
    } else {
      this.table(doc, ['Date', 'Type', 'Severity', 'Duration', 'Description'],
        data.diaryEntries.map(d => [
          new Date(d.loggedAt).toLocaleDateString('en-GB'),
          d.type,
          d.severity || '—',
          d.duration || '—',
          (d.description || d.notes || '—').substring(0, 50),
        ]));
    }

    doc.moveDown(1);

    // ── ILLNESS EPISODES ───────────────────────────────────────────────────────
    this.sectionTitle(doc, 'Illness Episodes', accentColor);
    this.divider(doc, accentColor);

    if (data.illnessEpisodes.length === 0) {
      doc.fontSize(10).fill(mutedColor).text('No illness episodes recorded.');
    } else {
      this.table(doc, ['Date', 'Title', 'Symptoms', 'Medications', 'Notes'],
        data.illnessEpisodes.map(i => [
          new Date(i.loggedAt).toLocaleDateString('en-GB'),
          i.title,
          i.symptoms || '—',
          i.medications || '—',
          (i.notes || '—').substring(0, 50),
        ]));
    }

    doc.moveDown(1);

    // ── HEALTH RECORDS ─────────────────────────────────────────────────────────
    this.sectionTitle(doc, 'Health Records', accentColor);
    this.divider(doc, accentColor);

    if (data.healthRecords.length === 0) {
      doc.fontSize(10).fill(mutedColor).text('No health records.');
    } else {
      this.table(doc, ['Date', 'Type', 'Symptoms', 'Diagnosis', 'Doctor'],
        data.healthRecords.map(h => [
          new Date(h.date).toLocaleDateString('en-GB'),
          h.type,
          h.symptoms || '—',
          h.diagnosis || '—',
          h.doctorName || '—',
        ]));
    }

    // ── FOOTER ─────────────────────────────────────────────────────────────────
    const totalPages = doc.bufferedPageRange().count;
    for (let i = 0; i < totalPages; i++) {
      doc.switchToPage(i);
      doc.fontSize(8).fill(mutedColor)
        .text(`KidDok Health Report — Generated ${new Date().toLocaleString('en-GB')}`, 50, doc.page.height - 40, { align: 'center' })
        .text(`Page ${i + 1} of ${totalPages}`, 50, doc.page.height - 28, { align: 'center' });
    }
  }

  private sectionTitle(doc: PDFKit.PDFDocument, title: string, color: string): void {
    doc.moveDown(0.5);
    doc.fontSize(14).font('Helvetica-Bold').fill(color).text(title);
    doc.moveDown(0.3);
  }

  private divider(doc: PDFKit.PDFDocument, color: string): void {
    doc.strokeColor(color).lineWidth(1).moveTo(50, doc.y).lineTo(doc.page.width - 50, doc.y).stroke();
    doc.moveDown(0.5);
  }

  private table(doc: PDFKit.PDFDocument, headers: string[], rows: string[][]): void {
    const startX = 50;
    const colWidth = (doc.page.width - 100) / headers.length;
    const rowHeight = 20;

    // Header row
    doc.font('Helvetica-Bold').fontSize(9).fill('#ffffff');
    doc.rect(startX, doc.y, doc.page.width - 100, rowHeight).fill('#2563eb');
    headers.forEach((h, i) => {
      doc.text(h, startX + i * colWidth + 3, doc.y + 5, { width: colWidth - 6, continued: i < headers.length - 1 });
    });
    doc.moveDown(0.5);

    // Data rows
    rows.forEach((row, rowIdx) => {
      if (doc.y + rowHeight > doc.page.height - 60) {
        doc.addPage();
        // Re-draw header on new page
        doc.font('Helvetica-Bold').fontSize(9).fill('#ffffff');
        doc.rect(startX, doc.y, doc.page.width - 100, rowHeight).fill('#2563eb');
        headers.forEach((h, i) => {
          doc.text(h, startX + i * colWidth + 3, doc.y + 5, { width: colWidth - 6, continued: i < headers.length - 1 });
        });
        doc.moveDown(0.5);
      }

      const bgColor = rowIdx % 2 === 0 ? '#f9fafb' : '#ffffff';
      doc.rect(startX, doc.y, doc.page.width - 100, rowHeight).fill(bgColor);
      doc.font('Helvetica').fontSize(9).fill('#374151');
      row.forEach((cell, i) => {
        doc.text(cell, startX + i * colWidth + 3, doc.y + 5, { width: colWidth - 6, continued: i < row.length - 1 });
      });
      doc.moveDown(0.3);
    });
  }
}
