// lib/hooks/useChat.ts - Hook for chat functionality

import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { chatMessageSchema, type ChatResponse } from '@/lib/schemas/chat';
import { z } from 'zod';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isEmergency?: boolean;
  containsPHI?: boolean;
  timestamp: string;
}

interface UseChatState {
  conversationId: string | null;
  sessionId: string;
  messages: Message[];
  loading: boolean;
  error: string | null;
  isEmergency: boolean;
}

export function useChat() {
  const [state, setState] = useState<UseChatState>({
    conversationId: null,
    sessionId: uuidv4(),
    messages: [],
    loading: false,
    error: null,
    isEmergency: false,
  });

  const sendMessage = useCallback(
    async (userMessage: string) => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        // Validate message
        const validatedData = chatMessageSchema.parse({
          conversationId: state.conversationId,
          sessionId: state.sessionId,
          userMessage,
          topic: 'general',
        });

        // Add user message to UI immediately
        setState(prev => ({
          ...prev,
          messages: [
            ...prev.messages,
            {
              id: uuidv4(),
              role: 'user',
              content: userMessage,
              timestamp: new Date().toISOString(),
            },
          ],
        }));

        // Send to API
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(validatedData),
        });

        const result = (await response.json()) as ChatResponse;

        if (!response.ok) {
          setState(prev => ({
            ...prev,
            loading: false,
            error: (result as any).message || 'Erro ao enviar mensagem',
          }));
          return;
        }

        // Add assistant message
        setState(prev => ({
          ...prev,
          conversationId: result.conversationId,
          messages: [
            ...prev.messages,
            {
              id: uuidv4(),
              role: 'assistant',
              content: result.assistantMessage,
              isEmergency: result.isEmergency,
              containsPHI: result.containsPHI,
              timestamp: result.timestamp,
            },
          ],
          loading: false,
          isEmergency: result.isEmergency,
        }));

        // Show emergency warning if detected
        if (result.isEmergency) {
          console.warn('🚨 EMERGÊNCIA DETECTADA');
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          const validationErrors = error.issues.map((err: any) => err.message).join(', ');
          setState(prev => ({
            ...prev,
            loading: false,
            error: `Erro na validação: ${validationErrors}`,
          }));
          return;
        }

        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error('Chat error:', error);

        setState(prev => ({
          ...prev,
          loading: false,
          error: errorMessage || 'Erro ao enviar mensagem',
        }));
      }
    },
    [state.conversationId, state.sessionId]
  );

  const loadConversation = useCallback(
    async (conversationId: string) => {
      setState(prev => ({ ...prev, loading: true }));

      try {
        const response = await fetch(`/api/chat?conversationId=${conversationId}`);
        const result = await response.json();

        if (!response.ok) {
          setState(prev => ({
            ...prev,
            loading: false,
            error: 'Conversa não encontrada',
          }));
          return;
        }

        setState(prev => ({
          ...prev,
          conversationId,
          messages: result.conversation.messages.map((msg: any) => ({
            id: msg.id,
            role: msg.role,
            content: msg.content,
            isEmergency: msg.isEmergency,
            containsPHI: msg.containsPHI,
            timestamp: msg.createdAt,
          })),
          loading: false,
        }));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        setState(prev => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
      }
    },
    []
  );

  const clearChat = useCallback(() => {
    setState(prev => ({
      ...prev,
      conversationId: null,
      sessionId: uuidv4(),
      messages: [],
      error: null,
      isEmergency: false,
    }));
  }, []);

  return {
    ...state,
    sendMessage,
    loadConversation,
    clearChat,
  };
}
