"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = __importStar(require("nodemailer"));
let MailService = MailService_1 = class MailService {
    transporter;
    logger = new common_1.Logger(MailService_1.name);
    onModuleInit() {
        const host = process.env['MAIL_HOST'];
        const port = parseInt(process.env['MAIL_PORT'] || '587', 10);
        const user = process.env['MAIL_USER'];
        const pass = process.env['MAIL_PASSWORD'];
        const from = process.env['MAIL_FROM'] || '"KidDok" <notifications@kiddok.app>';
        if (!host || !user) {
            this.logger.warn('Mail configuration missing. Emails will be logged to console only. ' +
                'Set MAIL_HOST, MAIL_USER, MAIL_PASSWORD environment variables.');
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
    escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
    async send(options) {
        try {
            const result = await this.transporter.sendMail({
                from: process.env['MAIL_FROM'] || '"KidDok" <notifications@kiddok.app>',
                to: options.to,
                subject: options.subject,
                html: options.html,
                text: options.text,
            });
            this.logger.log(`Email sent to ${options.to}, messageId: ${result.messageId}`);
        }
        catch (err) {
            this.logger.error(`Failed to send email to ${options.to}`, err);
        }
    }
    wrapHtml(content, title) {
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
    async sendVaccineReminder(toEmail, parentName, childName, vaccineName, dueDate) {
        const dueDateStr = dueDate.toLocaleDateString('sq-AL', { day: '2-digit', month: 'long', year: 'numeric' });
        const html = `
      <div class="title">🔔 Rimbursim Vaksine</div>
      <p>Pershendetje ${this.escapeHtml(parentName)},</p>
      <p>Fëmija <strong>${this.escapeHtml(childName)}</strong> ka një vaksine të ardhshme që duhet të monitoroni:</p>
      <div class="highlight">
        <div class="highlight-label">Vaksina</div>
        <div class="highlight-value">${this.escapeHtml(vaccineName)}</div>
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
    async sendAppointmentReminder(toEmail, parentName, childName, appointmentTitle, dateTime, doctorName, location) {
        const dtStr = dateTime.toLocaleString('sq-AL', {
            day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
        });
        const meta = [doctorName && `Mjeku: ${this.escapeHtml(doctorName)}`, location && `Vendndodhja: ${this.escapeHtml(location)}`].filter(Boolean).join(' • ');
        const html = `
      <div class="title">📅 Rimbursim Takimi</div>
      <p>Pershendetje ${this.escapeHtml(parentName)},</p>
      <p>Fëmija <strong>${this.escapeHtml(childName)}</strong> ka një takim të ardhshëm:</p>
      <div class="highlight">
        <div class="highlight-label">Takimi</div>
        <div class="highlight-value">${this.escapeHtml(appointmentTitle)}</div>
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
    async sendMedicationReminder(toEmail, parentName, childName, medicationName, dosage, frequency) {
        const html = `
      <div class="title">💊 Rimbursim Medikamenti</div>
      <p>Pershendetje ${this.escapeHtml(parentName)},</p>
      <p>Fëmija <strong>${this.escapeHtml(childName)}</strong> ka një medikament që duhet të marrë:</p>
      <div class="highlight">
        <div class="highlight-label">Medikamenti</div>
        <div class="highlight-value">${this.escapeHtml(medicationName)}</div>
        <div class="highlight-label" style="margin-top:8px">Doza</div>
        <div class="highlight-value">${this.escapeHtml(dosage)}</div>
        <div class="highlight-label" style="margin-top:8px">Frekuenca</div>
        <div class="highlight-value">${this.escapeHtml(frequency)}</div>
      </div>
    `;
        await this.send({
            to: toEmail,
            subject: `KidDok — Rimbursim medikamenti për ${childName}: ${medicationName}`,
            html: this.wrapHtml(html, 'Rimbursim Medikamenti'),
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)()
], MailService);
//# sourceMappingURL=mail.service.js.map