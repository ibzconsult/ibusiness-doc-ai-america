// lib/ai.ts - AI service integration (OpenAI/Anthropic)

import { getAIConfig } from './env';

interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface AIResponse {
  content: string;
  model: string;
  tokens?: {
    input: number;
    output: number;
  };
}

/**
 * Call OpenAI API
 */
export async function callOpenAI(
  messages: AIMessage[],
  systemPrompt?: string
): Promise<AIResponse> {
  const { openaiApiKey } = getAIConfig();

  if (!openaiApiKey) {
    throw new Error('OPENAI_API_KEY não configurada');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: systemPrompt
          ? [{ role: 'system', content: systemPrompt }, ...messages]
          : messages,
        temperature: 0.7,
        max_tokens: 500,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error?.message}`);
    }

    const data = await response.json();

    return {
      content: data.choices[0].message.content,
      model: data.model,
      tokens: {
        input: data.usage?.prompt_tokens || 0,
        output: data.usage?.completion_tokens || 0,
      },
    };
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}

/**
 * Call Anthropic API (Claude)
 */
export async function callAnthropic(
  messages: AIMessage[],
  systemPrompt?: string
): Promise<AIResponse> {
  const { anthropicApiKey } = getAIConfig();

  if (!anthropicApiKey) {
    throw new Error('ANTHROPIC_API_KEY não configurada');
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 500,
        system: systemPrompt,
        messages: messages.map(msg => ({
          role: msg.role === 'system' ? 'user' : msg.role,
          content: msg.content,
        })),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Anthropic API error: ${error.error?.message}`);
    }

    const data = await response.json();

    return {
      content: data.content[0].text,
      model: data.model,
      tokens: {
        input: data.usage?.input_tokens || 0,
        output: data.usage?.output_tokens || 0,
      },
    };
  } catch (error) {
    console.error('Anthropic API error:', error);
    throw error;
  }
}

/**
 * Call AI based on configured provider
 */
export async function callAI(
  messages: AIMessage[],
  systemPrompt?: string
): Promise<AIResponse> {
  const config = getAIConfig();

  if (config.provider === 'anthropic') {
    return callAnthropic(messages, systemPrompt);
  }

  return callOpenAI(messages, systemPrompt);
}

/**
 * Healthcare-specific response generation
 */
export async function generateHealthcareResponse(
  userMessage: string,
  conversationHistory: AIMessage[],
  systemPrompt: string
): Promise<AIResponse> {
  const messages: AIMessage[] = [
    ...conversationHistory,
    { role: 'user', content: userMessage },
  ];

  return callAI(messages, systemPrompt);
}

/**
 * Generate emergency notification message
 */
export function generateEmergencyNotification(
  userMessage: string,
  conversationId: string
): string {
  return `
🚨 DETECÇÃO DE EMERGÊNCIA 🚨

ID da Conversa: ${conversationId}
Mensagem do usuário: "${userMessage}"
Timestamp: ${new Date().toISOString()}

Por favor, verifique imediatamente e tome as ações necessárias.
  `;
}
