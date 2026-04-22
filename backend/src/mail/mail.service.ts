import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

@Injectable()
export class MailService implements OnModuleInit {
  private transporter: Transporter;
  private readonly logger = new Logger(MailService.name);

  onModuleInit() {
    const host = process.env['MAIL_HOST'];
    const port = parseInt(process.env['MAIL_PORT'] || '587', 10);
    const user = process.env['MAIL_USER'];
    const pass = process.env['MAIL_PASSWORD'];
    const from = process.env['MAIL_FROM'] || '"KidDok" <notifications@kiddok.app>';

    if (!host || !user) {
      this.logger.warn(
        'Mail configuration missing. Emails will be logged to console only. ' +
        'Set MAIL_HOST, MAIL_USER, MAIL_PASSWORD environment variables.',
      );
      // Create a test account that logs to console
      this.transporter = nodemailer.createTransport({
        jsonTransport: true,
      });
      return;
    }

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    this.logger.log(`MailService initialized (host: ${host}:${port})`);
  }

  async send(options: EmailOptions): Promise<void> {
    try {
      const result = await this.transporter.sendMail({
        from: process.env['MAIL_FROM'] || '"KidDok" <notifications@kiddok.app>',
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      });
      this.logger.log(`Email sent to ${options.to}, messageId: ${result.messageId}`);
    } catch (err) {
      this.logger.error(`Failed to send email to ${options.to}`, err);
    }
  }

  // --- Template helpers ---

  private wrapHtml(content: string, title: string): string {
    return `<!DOCTYPE html>
<html lang="sq">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f4f7fc; margin: 0; padding: 20px; }
    .container { background: #ffffff; border-radius: 12px; padding: 32px; max-width: 600px; margin: 0 auto; }
    .header { text-align: center; margin-bottom: 24px; }
    .logo { font-size: 24px; font-weight: bold; color: #4f46e5; }
    .title { font-size: 20px; color: #1e293b; margin: 16px 0 8px; }
    .body { color: #475569; line-height: 1.6; }
    .highlight { background: #eef2ff; border-radius: 8px; padding: 16px; margin: 16px 0; }
    .highlight-label { font-weight: bold; color: #4f46e5; font-size: 14px; }
    .highlight-value { font-size: 18px; color: #1e293b; margin-top: 4px; }
    .cta { display: inline-block; background: #4f46e5; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px; }
    .footer { text-align: center; color: #94a3b8; font-size: 12px; margin-top: 24px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">KidDok 🩺</div>
    </div>
    <div class="body">${content}</div>
    <div class="footer">KidDok — Ditari digjital i shëndetit për fëmijët</div>
  </div>
</body>
</html>`;
  }

  async sendVaccineReminder(
    toEmail: string,
    parentName: string,
    childName: string,
    vaccineName: string,
    dueDate: Date,
  ): Promise<void> {
    const dueDateStr = dueDate.toLocaleDateString('sq-AL', { day: '2-digit', month: 'long', year: 'numeric' });
    const html = `
      <div class="title">🔔 Rimbursim Vaksine</div>
      <p>Pershendetje ${parentName},</p>
      <p>Fëmija <strong>${childName}</strong> ka një vaksine të ardhshme që duhet të monitoroni:</p>
      <div class="highlight">
        <div class="highlight-label">Vaksina</div>
        <div class="highlight-value">${vaccineName}</div>
        <div class="highlight-label" style="margin-top:8px">Data e pritshme</div>
        <div class="highlight-value">${dueDateStr}</div>
      </div>
      <p>Hapni aplikacionin KidDok për të shënuar vakinën pasi të kryhet.</p>
      <p style="font-size:12px;color:#94a3b8">Nëse keni pyetje, contactoni pediatricianin tuaj.</p>
    `;
    await this.send({
      to: toEmail,
      subject: `KidDok — Rimbursim vaksine për ${childName}: ${vaccineName}`,
      html: this.wrapHtml(html, 'Rimbursim Vaksine'),
    });
  }

  async sendAppointmentReminder(
    toEmail: string,
    parentName: string,
    childName: string,
    appointmentTitle: string,
    dateTime: Date,
    doctorName?: string,
    location?: string,
  ): Promise<void> {
    const dtStr = dateTime.toLocaleString('sq-AL', {
      day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
    const meta = [doctorName && `Mjeku: ${doctorName}`, location && `Vendndodhja: ${location}`].filter(Boolean).join(' • ');
    const html = `
      <div class="title">📅 Rimbursim Takimi</div>
      <p>Pershendetje ${parentName},</p>
      <p>Fëmija <strong>${childName}</strong> ka një takim të ardhshëm:</p>
      <div class="highlight">
        <div class="highlight-label">Takimi</div>
        <div class="highlight-value">${appointmentTitle}</div>
        <div class="highlight-label" style="margin-top:8px">Data dhe ora</div>
        <div class="highlight-value">${dtStr}</div>
        ${meta ? `<div class="highlight-label" style="margin-top:8px">Detajet</div><div class="highlight-value">${meta}</div>` : ''}
      </div>
    `;
    await this.send({
      to: toEmail,
      subject: `KidDok — Takim për ${childName}: ${appointmentTitle}`,
      html: this.wrapHtml(html, 'Rimbursim Takimi'),
    });
  }

  async sendMedicationReminder(
    toEmail: string,
    parentName: string,
    childName: string,
    medicationName: string,
    dosage: string,
    frequency: string,
  ): Promise<void> {
    const html = `
      <div class="title">💊 Rimbursim Medikamenti</div>
      <p>Pershendetje ${parentName},</p>
      <p>Fëmija <strong>${childName}</strong> ka një medikament që duhet të marrë:</p>
      <div class="highlight">
        <div class="highlight-label">Medikamenti</div>
        <div class="highlight-value">${medicationName}</div>
        <div class="highlight-label" style="margin-top:8px">Doza</div>
        <div class="highlight-value">${dosage}</div>
        <div class="highlight-label" style="margin-top:8px">Frekuenca</div>
        <div class="highlight-value">${frequency}</div>
      </div>
    `;
    await this.send({
      to: toEmail,
      subject: `KidDok — Rimbursim medikamenti për ${childName}: ${medicationName}`,
      html: this.wrapHtml(html, 'Rimbursim Medikamenti'),
    });
  }
}