// lib/schemas/book-briefing.ts - Zod schema for form validation

import { z } from 'zod';

// Book Briefing form schema (from book-briefing/page.tsx)
export const bookBriefingSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome não pode ter mais de 100 caracteres')
    .trim(),

  email: z
    .string()
    .email('Email inválido')
    .toLowerCase()
    .trim(),

  phone: z
    .string()
    .min(10, 'Telefone inválido')
    .max(20, 'Telefone inválido')
    .regex(/^[\d\-\+\(\)\s]+$/, 'Telefone contém caracteres inválidos')
    .trim(),

  clinicName: z
    .string()
    .min(2, 'Nome da clínica deve ter pelo menos 2 caracteres')
    .max(150, 'Nome da clínica muito longo')
    .trim(),

  role: z
    .enum(['owner', 'manager', 'staff'])
    .default('staff'),

  message: z
    .string()
    .min(10, 'Mensagem deve ter pelo menos 10 caracteres')
    .max(2000, 'Mensagem não pode ter mais de 2000 caracteres')
    .trim()
    .optional(),
});

export type BookBriefingInput = z.infer<typeof bookBriefingSchema>;

// Response schema
export const bookBriefingResponseSchema = z.object({
  success: z.boolean(),
  leadId: z.string(),
  message: z.string(),
  confirmationSent: z.boolean(),
});

export type BookBriefingResponse = z.infer<typeof bookBriefingResponseSchema>;
