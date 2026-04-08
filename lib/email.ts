// lib/email.ts - Email service using Resend (optional)

import { Resend } from 'resend';
import { getEmailConfig } from './env';
import { prisma } from './db';

let resend: Resend | null = null;

/**
 * Get or initialize Resend client (lazy initialization)
 */
function getResendClient(): Resend | null {
  if (resend) return resend;
  
  const emailConfig = getEmailConfig();
  if (!emailConfig) {
    console.info('ℹ️  Resend not configured - using n8n webhooks for email');
    return null;
  }
  
  resend = new Resend(emailConfig.apiKey);
  return resend;
}

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  type: 'confirmation' | 'notification' | 'follow-up';
  leadId?: string;
}

/**
 * Send email and log delivery status
 */
export async function sendEmail(options: EmailOptions) {
  const { to, subject, html, text, type, leadId } = options;
  const emailConfig = getEmailConfig();
  
  // If Resend is not configured, just log it
  if (!emailConfig) {
    console.info(`ℹ️  Email to ${to} (Resend not configured - use n8n webhook)`);
    return { success: true, id: 'n8n-webhook' };
  }

  const client = getResendClient();
  if (!client) {
    console.warn(`⚠️  Cannot send email to ${to} - Resend client not initialized`);
    return { success: false, id: null };
  }

  try {
    // Send email via Resend
    const response = await client.emails.send({
      from: `ibusiness <noreply@ibusiness.com>`,
      to,
      subject,
      html,
      text,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    // Log successful send
    await prisma.emailLog.create({
      data: {
        to,
        subject,
        type,
        status: 'sent',
        resendId: response.data?.id,
        sentAt: new Date(),
        leadId,
      },
    });

    console.log(`✅ Email sent to ${to} (${response.data?.id})`);
    return { success: true, id: response.data?.id };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    // Log failed send
    await prisma.emailLog.create({
      data: {
        to,
        subject,
        type,
        status: 'failed',
        errorMessage,
        leadId,
      },
    });

    console.error(`❌ Failed to send email to ${to}:`, errorMessage);
    throw error;
  }
}

/**
 * Email template: Lead confirmation (sent to lead)
 */
export function leadConfirmationTemplate(name: string, bookingLink: string) {
  return {
    subject: 'Agendamento Confirmado - ibusiness Doc AI',
    html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1A2340; line-height: 1.6; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { color: #6B8E7F; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
      .content { background: #F8F9FA; padding: 20px; border-radius: 8px; margin: 20px 0; }
      .cta { display: inline-block; background: #1A2340; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 20px 0; }
      .footer { color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #E8EAED; padding-top: 20px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">ibusiness Doc AI</div>
      
      <p>Olá <strong>${name}</strong>,</p>
      
      <p>Obrigado por se registrar! Recebemos sua solicitação para agendar uma reunião de briefing.</p>
      
      <div class="content">
        <p><strong>Próximos passos:</strong></p>
        <ul>
          <li>Confirme a data/hora do seu agendamento</li>
          <li>Prepare suas dúvidas sobre nossos serviços</li>
          <li>Tenha em mão informações sobre sua clínica</li>
        </ul>
      </div>
      
      <a href="${bookingLink}" class="cta">Ver Agendamento</a>
      
      <p>Se você tiver alguma dúvida, responda a este e-mail ou entre em contato conosco.</p>
      
      <div class="footer">
        <p>ibusiness Doc AI America | healthcare@ibusiness.com</p>
        <p>© 2026 ibusiness. Todos os direitos reservados.</p>
      </div>
    </div>
  </body>
</html>
    `,
    text: `Olá ${name},\n\nObrigado por se registrar! Confirme seu agendamento em: ${bookingLink}`,
  };
}

/**
 * Email template: Internal alert (sent to team)
 */
export function teamAlertTemplate(leadData: { name: string; email: string; phone: string; clinicName: string }) {
  return {
    subject: `🔔 Novo Lead: ${leadData.name} - ${leadData.clinicName}`,
    html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1A2340; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .card { background: #F8F9FA; padding: 20px; border-left: 4px solid #6B8E7F; border-radius: 4px; }
      .label { color: #999; font-size: 12px; text-transform: uppercase; }
      .value { font-weight: bold; margin-bottom: 15px; }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Novo Lead Registrado</h2>
      
      <div class="card">
        <div>
          <div class="label">Nome</div>
          <div class="value">${leadData.name}</div>
        </div>
        <div>
          <div class="label">Email</div>
          <div class="value">${leadData.email}</div>
        </div>
        <div>
          <div class="label">Telefone</div>
          <div class="value">${leadData.phone}</div>
        </div>
        <div>
          <div class="label">Clínica</div>
          <div class="value">${leadData.clinicName}</div>
        </div>
      </div>
    </div>
  </body>
</html>
    `,
    text: `Novo Lead: ${leadData.name}\nClínica: ${leadData.clinicName}\nEmail: ${leadData.email}\nTelefone: ${leadData.phone}`,
  };
}

/**
 * Send confirmation email to lead and alert to team
 */
export async function sendLeadConfirmationEmails(
  leadId: string,
  leadData: { name: string; email: string; phone: string; clinicName: string },
  bookingLink: string
) {
  const emailConfig = getEmailConfig();
  
  // If Resend not configured, just skip email sending
  if (!emailConfig) {
    console.info(`ℹ️  Email sending disabled - configure Resend or use n8n webhook`);
    return;
  }

  try {
    // Send confirmation to lead
    const confirmationTemplate = leadConfirmationTemplate(leadData.name, bookingLink);
    await sendEmail({
      to: leadData.email,
      ...confirmationTemplate,
      type: 'confirmation',
      leadId,
    });

    // Send alert to team
    const teamTemplate = teamAlertTemplate(leadData);
    await sendEmail({
      to: emailConfig.adminEmail,
      ...teamTemplate,
      type: 'notification',
      leadId,
    });

    console.log(`✅ Lead confirmation emails sent for ${leadData.email}`);
  } catch (error) {
    console.error('Error sending lead confirmation emails:', error);
    throw error;
  }
}
