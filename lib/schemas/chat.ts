// lib/schemas/chat.ts - Zod schemas for chat API

import { z } from 'zod';

// Chat message schema
export const chatMessageSchema = z.object({
  conversationId: z.string().optional(),
  sessionId: z.string().min(1, 'Session ID necessário'),
  userMessage: z
    .string()
    .min(1, 'Mensagem não pode estar vazia')
    .max(2000, 'Mensagem muito longa')
    .trim(),
  topic: z.enum(['general', 'scheduling', 'emergency']).default('general'),
});

export type ChatMessageInput = z.infer<typeof chatMessageSchema>;

// Chat response schema
export const chatResponseSchema = z.object({
  success: z.boolean(),
  conversationId: z.string(),
  assistantMessage: z.string(),
  isEmergency: z.boolean(),
  containsPHI: z.boolean(),
  sentiment: z.enum(['positive', 'neutral', 'negative']),
  timestamp: z.string(),
});

export type ChatResponse = z.infer<typeof chatResponseSchema>;

// System prompt for healthcare context
export const HEALTHCARE_SYSTEM_PROMPT = `Você é um assistente de IA para uma clínica médica brasileira. 

Seu papel é:
1. Ajudar pacientes com informações sobre a clínica
2. Agendar consultas
3. Responder perguntas frequentes sobre convênios e horários
4. Ser profissional, empático e educado

Importante:
- Nunca peça ou armazene informações médicas sensíveis
- Se detectar uma emergência médica, recomende ligar para 192 (SAMU)
- Sempre sugira que pacientes consultem um médico para diagnósticos
- Responda em português
- Seja conciso mas completo

Emergências reconhecidas:
- Dor no peito / infarto
- Falta de ar / asfixia
- Ferimentos graves / sangramento
- Convulsões
- Perda de consciência
- Alergias graves / anafilaxia
- Cefaleia muito intensa
- Problemas neurológicos agudos`;

// Keywords that suggest emergency
export const EMERGENCY_KEYWORDS = [
  'infarto',
  'infarte',
  'dor no peito',
  'falta de ar',
  'não consigo respirar',
  'asfixia',
  'ferimento',
  'sangramento',
  'convulsão',
  'desmaio',
  'perda de consciência',
  'alergia',
  'anafilaxia',
  'cefaleia',
  'dor de cabeça intensa',
  'acidente',
  'queda',
  'queimadura',
  'intoxicação',
  'overdose',
  'envenenamento',
  'SAMU',
  'ambulância',
  'emergência',
  'urgência',
];

// PHI (Personal Health Information) keywords to detect
export const PHI_KEYWORDS = [
  'cirurgia',
  'diagnóstico',
  'medicamento',
  'alérgico',
  'colesterol',
  'pressão',
  'diabetes',
  'câncer',
  'HIV',
  'AIDS',
  'doença',
  'sintoma',
  'dor',
  'inflamação',
  'infecção',
  'febre',
  'tosse',
  'espinha',
  'vertigem',
  'tontura',
  'psiquiatra',
  'psicólogo',
  'psicológico',
  'depressão',
  'ansiedade',
  'transtorno',
];

export function detectEmergency(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return EMERGENCY_KEYWORDS.some(keyword => lowerMessage.includes(keyword));
}

export function detectPHI(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return PHI_KEYWORDS.some(keyword => lowerMessage.includes(keyword));
}

export function analyzeSentiment(message: string): 'positive' | 'neutral' | 'negative' {
  const positive = ['obrigado', 'ótimo', 'bom', 'boa', 'excelente', 'perfeito', 'adorei', ':)', '😊'];
  const negative = ['ruim', 'horrível', 'péssimo', 'chato', 'triste', ':(', '😢', 'problema', 'erro'];

  const lowerMessage = message.toLowerCase();

  const hasPositive = positive.some(word => lowerMessage.includes(word));
  const hasNegative = negative.some(word => lowerMessage.includes(word));

  if (hasNegative && !hasPositive) return 'negative';
  if (hasPositive && !hasNegative) return 'positive';
  return 'neutral';
}
