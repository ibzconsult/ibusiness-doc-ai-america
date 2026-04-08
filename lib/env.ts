// lib/env.ts - Environment variable validation with strict type checking

import { z } from 'zod';

const envSchema = z.object({
  // Required variables
  DATABASE_URL: z.string().url('Invalid DATABASE_URL format'),
  OPENAI_API_KEY: z.string().min(1, 'OPENAI_API_KEY is required'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  
  // Optional variables with defaults
  NEXT_PUBLIC_DOMAIN: z.string().default('https://ibusiness.com'),
  NEXT_PUBLIC_SUPPORT_EMAIL: z.string().email().default('support@ibusiness.com'),
  NEXT_PUBLIC_ADMIN_EMAIL: z.string().email().default('admin@ibusiness.com'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  HIPAA_COMPLIANCE_MODE: z.string().optional(),
  LOG_CONVERSATIONS: z.string().optional(),
  CONVERSATION_TTL_DAYS: z.string().optional(),
  
  // Optional third-party integrations
  RESEND_API_KEY: z.string().optional(), // Now optional - use n8n instead
  ANTHROPIC_API_KEY: z.string().optional(),
  TWILIO_ACCOUNT_SID: z.string().optional(),
  TWILIO_AUTH_TOKEN: z.string().optional(),
  TWILIO_PHONE_NUMBER: z.string().optional(),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_VERCEL_ANALYTICS_ENABLED: z.string().optional(),
  N8N_WEBHOOK_URL: z.string().url().optional(),
  N8N_API_KEY: z.string().optional(),
});

type Env = z.infer<typeof envSchema>;

let validatedEnv: Env | null = null;

/**
 * Get validated environment variables
 * Throws error if validation fails
 */
export function getEnv(): Env {
  if (validatedEnv) return validatedEnv;

  const env = process.env;
  
  try {
    validatedEnv = envSchema.parse(env);
    return validatedEnv;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues
        .map((e: any) => `${e.path.join('.')}: ${e.message}`)
        .join('\n');
      
      throw new Error(
        `❌ Environment variable validation failed:\n${missingVars}\n\n` +
        `Please check your .env.local file against .env.example`
      );
    }
    throw error;
  }
}

/**
 * Verify all critical HIPAA variables at startup
 */
export function verifyHIPAACompliance(): boolean {
  const env = getEnv();
  
  if (!env.HIPAA_COMPLIANCE_MODE) {
    console.warn('⚠️  HIPAA Compliance Mode is disabled - not suitable for production!');
    return false;
  }
  
  const required = [
    'DATABASE_URL',
    'OPENAI_API_KEY',
    'JWT_SECRET',
  ];
  
  const missing = required.filter(key => !env[key as keyof Env]);
  
  if (missing.length > 0) {
    throw new Error(
      `❌ Critical HIPAA variables missing: ${missing.join(', ')}`
    );
  }

  console.log('✅ HIPAA compliance variables verified');
  return true;
}

/**
 * Get email configuration (optional - use n8n webhooks instead)
 */
export function getEmailConfig() {
  const env = getEnv();
  
  if (!env.RESEND_API_KEY) {
    console.info('ℹ️  RESEND_API_KEY not set - using n8n webhooks for email');
    return null;
  }
  
  return {
    apiKey: env.RESEND_API_KEY,
    supportEmail: env.NEXT_PUBLIC_SUPPORT_EMAIL,
    adminEmail: env.NEXT_PUBLIC_ADMIN_EMAIL,
  };
}

/**
 * Get AI configuration
 */
export function getAIConfig() {
  const env = getEnv();
  
  return {
    openaiApiKey: env.OPENAI_API_KEY,
    anthropicApiKey: env.ANTHROPIC_API_KEY,
    provider: env.ANTHROPIC_API_KEY ? 'anthropic' : 'openai',
  };
}

/**
 * Get Twilio configuration (if available)
 */
export function getTwilioConfig() {
  const env = getEnv();
  
  if (!env.TWILIO_ACCOUNT_SID) {
    return null;
  }
  
  return {
    accountSid: env.TWILIO_ACCOUNT_SID,
    authToken: env.TWILIO_AUTH_TOKEN,
    phoneNumber: env.TWILIO_PHONE_NUMBER,
  };
}
