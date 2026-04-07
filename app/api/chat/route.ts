// app/api/chat/route.ts - Chat API endpoint with AI integration

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { chatMessageSchema, detectEmergency, detectPHI, analyzeSentiment, HEALTHCARE_SYSTEM_PROMPT } from '@/lib/schemas/chat';
import { generateHealthcareResponse, generateEmergencyNotification } from '@/lib/ai';
import { auditMessageReceived, auditEmergencyDetected, getClientIp, getUserAgent } from '@/lib/audit';
import { sendEmail } from '@/lib/email';
import { getEnv } from '@/lib/env';

/**
 * POST /api/chat
 * 
 * Receives user message, generates AI response, stores conversation
 * Detects PHI and emergencies, sends alerts if needed
 */
export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);
  const userAgent = getUserAgent(request);

  try {
    const body = await request.json();
    const validatedData = chatMessageSchema.parse(body);

    const {
      conversationId: existingConversationId,
      sessionId,
      userMessage,
      topic,
    } = validatedData;

    // Get or create conversation
    let conversation = existingConversationId
      ? await prisma.conversation.findUnique({
          where: { id: existingConversationId },
          include: { messages: { orderBy: { createdAt: 'asc' } } },
        })
      : null;

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          sessionId,
          topic,
          ipAddress: clientIp,
          userAgent,
        },
        include: { messages: true },
      });
    }

    // Detect PHI and emergency
    const containsPHI = detectPHI(userMessage);
    const isEmergency = detectEmergency(userMessage);
    const sentiment = analyzeSentiment(userMessage);

    // Store user message
    const userMsg = await prisma.conversationMessage.create({
      data: {
        conversationId: conversation.id,
        role: 'user',
        content: userMessage,
        containsPHI,
        isEmergency,
      },
    });

    // Audit the message
    await auditMessageReceived(
      conversation.id,
      userMsg.id,
      containsPHI,
      clientIp,
      userAgent
    );

    // If emergency detected, log and send alert
    if (isEmergency) {
      await auditEmergencyDetected(
        conversation.id,
        userMsg.id,
        `Emergency keywords detected: ${userMessage}`,
        clientIp,
        userAgent
      );

      // Send email alert to admin
      try {
        const emergencyNotification = generateEmergencyNotification(userMessage, conversation.id);
        await sendEmail({
          to: getEnv().NEXT_PUBLIC_ADMIN_EMAIL,
          subject: '🚨 ALERTA DE EMERGÊNCIA - Chat Detectou Palavras-chave',
          html: `<pre>${emergencyNotification}</pre>`,
          text: emergencyNotification,
          type: 'notification',
          leadId: undefined,
        });
      } catch (emailError) {
        console.error('Failed to send emergency alert:', emailError);
        // Continue anyway - emergency still logged
      }
    }

    // Generate AI response
    let assistantResponse: string;
    let model = 'gpt-4-turbo-preview';

    try {
      // Build conversation history for AI
      const conversationHistory = conversation.messages
        .filter((msg: any) => msg.role !== 'system')
        .map((msg: any) => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        }));

      // Get AI response
      const aiResponse = await generateHealthcareResponse(
        userMessage,
        conversationHistory,
        HEALTHCARE_SYSTEM_PROMPT
      );

      assistantResponse = aiResponse.content;
      model = aiResponse.model;

      // Store assistant message
      await prisma.conversationMessage.create({
        data: {
          conversationId: conversation.id,
          role: 'assistant',
          content: assistantResponse,
          model,
          tokens: aiResponse.tokens?.output,
        },
      });
    } catch (aiError) {
      console.error('AI generation error:', aiError);

      // Fallback response
      assistantResponse = isEmergency
        ? 'Detectei uma possível emergência. Por favor, ligue para 192 (SAMU) imediatamente. Como posso ajudar com informações adicionais?'
        : 'Desculpe, estou tendo dificuldades para processar sua mensagem. Por favor, tente novamente.';

      await prisma.conversationMessage.create({
        data: {
          conversationId: conversation.id,
          role: 'assistant',
          content: assistantResponse,
          model: 'fallback',
        },
      });
    }

    // Update conversation metadata
    await prisma.conversation.update({
      where: { id: conversation.id },
      data: {
        sentiment,
        resolution: isEmergency ? 'escalated' : undefined,
      },
    });

    // Return response
    return NextResponse.json(
      {
        success: true,
        conversationId: conversation.id,
        assistantMessage: assistantResponse,
        isEmergency,
        containsPHI,
        sentiment,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    // Validation error
    if (error instanceof z.ZodError) {
      const validationErrors = error.issues.map((err: any) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      console.warn('Chat validation error:', validationErrors);

      return NextResponse.json(
        {
          success: false,
          message: 'Erro na validação da mensagem',
          errors: validationErrors,
        },
        { status: 400 }
      );
    }

    // Log error
    console.error('Chat API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        success: false,
        message: 'Erro ao processar sua mensagem',
        error: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/chat
 * 
 * Retrieve conversation history
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');
    const sessionId = searchParams.get('sessionId');

    if (!conversationId && !sessionId) {
      return NextResponse.json(
        { success: false, message: 'conversationId ou sessionId necessário' },
        { status: 400 }
      );
    }

    // Fetch conversation
    const conversation = conversationId
      ? await prisma.conversation.findUnique({
          where: { id: conversationId },
          include: { messages: { orderBy: { createdAt: 'asc' } } },
        })
      : await prisma.conversation.findFirst({
          where: { sessionId: sessionId! },
          include: { messages: { orderBy: { createdAt: 'asc' } } },
        });

    if (!conversation) {
      return NextResponse.json(
        { success: false, message: 'Conversa não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        conversation: {
          id: conversation.id,
          sessionId: conversation.sessionId,
          topic: conversation.topic,
          sentiment: conversation.sentiment,
          resolution: conversation.resolution,
          messages: conversation.messages.map((msg: any) => ({
            id: msg.id,
            role: msg.role,
            content: msg.content,
            containsPHI: msg.containsPHI,
            isEmergency: msg.isEmergency,
            createdAt: msg.createdAt,
          })),
          createdAt: conversation.createdAt,
          startedAt: conversation.startedAt,
          endedAt: conversation.endedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Chat GET error:', error);

    return NextResponse.json(
      { success: false, message: 'Erro ao buscar conversa' },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/chat
 * 
 * CORS support
 */
export async function OPTIONS() {
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
