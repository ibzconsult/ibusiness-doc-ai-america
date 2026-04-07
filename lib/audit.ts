// lib/audit.ts - HIPAA Audit Logging

import { prisma } from './db';

export enum AuditAction {
  FORM_SUBMITTED = 'form_submitted',
  MESSAGE_RECEIVED = 'message_received',
  MESSAGE_SENT = 'message_sent',
  DATA_ACCESSED = 'data_accessed',
  DATA_EXPORTED = 'data_exported',
  USER_AUTHENTICATED = 'user_authenticated',
  EMERGENCY_DETECTED = 'emergency_detected',
  PHI_FLAGGED = 'pii_flagged',
}

export enum AuditResource {
  LEAD = 'lead',
  CONVERSATION = 'conversation',
  MESSAGE = 'message',
  PHI_FIELD = 'pii_field',
  AUDIT_LOG = 'audit_log',
}

interface AuditLogOptions {
  action: AuditAction;
  resource: AuditResource;
  resourceId?: string;
  actor: string;
  actorId?: string;
  status?: 'success' | 'failure';
  details?: string;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Create audit log entry (HIPAA compliance requirement)
 */
export async function createAuditLog(options: AuditLogOptions) {
  try {
    const log = await prisma.auditLog.create({
      data: {
        action: options.action,
        resource: options.resource,
        resourceId: options.resourceId,
        actor: options.actor,
        actorId: options.actorId,
        status: options.status || 'success',
        details: options.details,
        ipAddress: options.ipAddress,
        userAgent: options.userAgent,
      },
    });

    if (options.status === 'failure') {
      console.warn(`⚠️  Audit: ${options.action} on ${options.resource} failed`, {
        resourceId: options.resourceId,
        details: options.details,
      });
    }

    return log;
  } catch (error) {
    console.error('Error creating audit log:', error);
    // Don't throw - continue operation even if logging fails
    return null;
  }
}

/**
 * Extract IP address from request headers
 */
export function getClientIp(request: Request): string | null {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Fallback for localhost
  return null;
}

/**
 * Extract user agent from request
 */
export function getUserAgent(request: Request): string | null {
  return request.headers.get('user-agent');
}

/**
 * Log form submission (lead capture)
 */
export async function auditFormSubmission(
  leadId: string,
  ipAddress: string | null,
  userAgent: string | null
) {
  return createAuditLog({
    action: AuditAction.FORM_SUBMITTED,
    resource: AuditResource.LEAD,
    resourceId: leadId,
    actor: 'website_form',
    status: 'success',
    ipAddress: ipAddress || undefined,
    userAgent: userAgent || undefined,
  });
}

/**
 * Log incoming chat message
 */
export async function auditMessageReceived(
  conversationId: string,
  messageId: string,
  containsPHI: boolean,
  ipAddress: string | null,
  userAgent: string | null
) {
  // Flag if PHI detected
  if (containsPHI) {
    await createAuditLog({
      action: AuditAction.PHI_FLAGGED,
      resource: AuditResource.PHI_FIELD,
      resourceId: messageId,
      actor: 'system',
      details: `PHI detected in message ${messageId}`,
      ipAddress: ipAddress || undefined,
      userAgent: userAgent || undefined,
    });
  }

  return createAuditLog({
    action: AuditAction.MESSAGE_RECEIVED,
    resource: AuditResource.MESSAGE,
    resourceId: messageId,
    actor: 'chat_user',
    details: `Conversation: ${conversationId}`,
    ipAddress: ipAddress || undefined,
    userAgent: userAgent || undefined,
  });
}

/**
 * Log emergency detection
 */
export async function auditEmergencyDetected(
  conversationId: string,
  messageId: string,
  reason: string,
  ipAddress: string | null,
  userAgent: string | null
) {
  return createAuditLog({
    action: AuditAction.EMERGENCY_DETECTED,
    resource: AuditResource.MESSAGE,
    resourceId: messageId,
    actor: 'system',
    details: `Emergency in conversation ${conversationId}: ${reason}`,
    ipAddress: ipAddress || undefined,
    userAgent: userAgent || undefined,
  });
}

/**
 * Get audit logs for a resource (with pagination)
 */
export async function getResourceAuditLogs(
  resource: AuditResource,
  resourceId: string,
  limit: number = 50
) {
  return prisma.auditLog.findMany({
    where: {
      resource,
      resourceId,
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

/**
 * Generate audit report (e.g., for HIPAA compliance review)
 */
export async function generateAuditReport(
  startDate: Date,
  endDate: Date,
  action?: AuditAction
) {
  const query: any = {
    createdAt: {
      gte: startDate,
      lte: endDate,
    },
  };

  if (action) {
    query.action = action;
  }

  const logs = await prisma.auditLog.findMany({
    where: query,
    orderBy: { createdAt: 'desc' },
  });

  return {
    period: { startDate, endDate },
    totalEntries: logs.length,
    byAction: logs.reduce(
      (acc: Record<string, number>, log: any) => {
        acc[log.action] = (acc[log.action] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ),
    byResource: logs.reduce(
      (acc: Record<string, number>, log: any) => {
        acc[log.resource] = (acc[log.resource] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ),
    failureCount: logs.filter((log: any) => log.status === 'failure').length,
    logs,
  };
}
