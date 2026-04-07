// app/api/book-briefing/route.ts - Form submission endpoint for lead capture

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { bookBriefingSchema } from '@/lib/schemas/book-briefing';
import { sendLeadConfirmationEmails } from '@/lib/email';
import { auditFormSubmission, getClientIp, getUserAgent } from '@/lib/audit';
import { getEnv } from '@/lib/env';

/**
 * POST /api/book-briefing
 * 
 * Receives form submission from /book-briefing page
 * Creates lead, sends confirmation emails, logs audit trail
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate with Zod schema
    const validatedData = bookBriefingSchema.parse(body);

    // Extract client info for audit logging
    const clientIp = getClientIp(request);
    const userAgent = getUserAgent(request);

    // Create lead in database
    const lead = await prisma.bookBriefingLead.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        clinicName: validatedData.clinicName,
        role: validatedData.role,
        message: validatedData.message || '',
        status: 'new',
        source: 'website',
      },
    });

    console.log(`✅ Lead created: ${lead.id} (${lead.email})`);

    // Log form submission for HIPAA audit trail
    await auditFormSubmission(lead.id, clientIp, userAgent);

    // Generate booking link (in real app, this would be a calendar link)
    const domain = getEnv().NEXT_PUBLIC_DOMAIN;
    const bookingLink = `${domain}/book-briefing?confirmed=true&leadId=${lead.id}`;

    // Send confirmation emails
    try {
      await sendLeadConfirmationEmails(
        lead.id,
        {
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          clinicName: lead.clinicName,
        },
        bookingLink
      );

      console.log(`✅ Confirmation emails sent for ${lead.email}`);
    } catch (emailError) {
      console.error('⚠️  Error sending confirmation emails:', emailError);
      // Don't fail the request if emails fail - lead is still created
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        leadId: lead.id,
        message: 'Obrigado! Recebemos sua solicitação. Você receberá um e-mail de confirmação em breve.',
        confirmationSent: true,
      },
      { status: 201 }
    );
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      const validationErrors = error.issues.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      console.warn('❌ Form validation error:', validationErrors);

      return NextResponse.json(
        {
          success: false,
          message: 'Erro na validação do formulário',
          errors: validationErrors,
        },
        { status: 400 }
      );
    }

    // Handle database errors
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      console.warn('⚠️  Duplicate email submission');

      return NextResponse.json(
        {
          success: false,
          message: 'Este e-mail já foi registrado. Verifique sua caixa de entrada.',
        },
        { status: 409 }
      );
    }

    // Log unexpected errors
    console.error('❌ Book briefing API error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        success: false,
        message: 'Erro ao processar seu pedido. Por favor, tente novamente.',
        error: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/book-briefing
 * 
 * Get lead details (if leadId provided)
 * Used for confirmation page verification
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get('leadId');

    if (!leadId) {
      return NextResponse.json(
        { success: false, message: 'leadId é necessário' },
        { status: 400 }
      );
    }

    // Fetch lead (minimal info, not PHI)
    const lead = await prisma.bookBriefingLead.findUnique({
      where: { id: leadId },
      select: {
        id: true,
        name: true,
        email: true,
        clinicName: true,
        status: true,
        createdAt: true,
      },
    });

    if (!lead) {
      return NextResponse.json(
        { success: false, message: 'Lead não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        lead,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Book briefing GET error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Erro ao buscar informações',
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/book-briefing
 * 
 * CORS support
 */
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    { message: 'OK' },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
