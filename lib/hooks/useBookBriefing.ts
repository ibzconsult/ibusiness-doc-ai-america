// lib/hooks/useBookBriefing.ts - Hook for form submission

import { useState } from 'react';
import { bookBriefingSchema, type BookBriefingInput } from '@/lib/schemas/book-briefing';
import { z } from 'zod';

interface UseBookBriefingState {
  loading: boolean;
  error: string | null;
  success: boolean;
  leadId: string | null;
}

interface ValidationError {
  field: string;
  message: string;
}

export function useBookBriefing() {
  const [state, setState] = useState<UseBookBriefingState>({
    loading: false,
    error: null,
    success: false,
    leadId: null,
  });

  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  const submit = async (data: unknown) => {
    setState({ loading: true, error: null, success: false, leadId: null });
    setValidationErrors([]);

    try {
      // Validate data with Zod schema
      const validatedData = bookBriefingSchema.parse(data);

      // Send to API
      const response = await fetch('/api/book-briefing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle validation errors from API
        if (response.status === 400 && result.errors) {
          setValidationErrors(result.errors);
          setState({
            loading: false,
            error: result.message || 'Erro na validação',
            success: false,
            leadId: null,
          });
          return;
        }

        // Handle other errors
        setState({
          loading: false,
          error: result.message || 'Erro ao enviar formulário',
          success: false,
          leadId: null,
        });
        return;
      }

      // Success
      setState({
        loading: false,
        error: null,
        success: true,
        leadId: result.leadId,
      });

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Client-side validation errors
        const errors = error.issues.map((err: any) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        setValidationErrors(errors);

        setState({
          loading: false,
          error: 'Por favor, corrija os erros no formulário',
          success: false,
          leadId: null,
        });
        return;
      }

      // Network or other errors
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      console.error('Book briefing submission error:', error);

      setState({
        loading: false,
        error: errorMessage || 'Erro ao enviar formulário',
        success: false,
        leadId: null,
      });
    }
  };

  const reset = () => {
    setState({ loading: false, error: null, success: false, leadId: null });
    setValidationErrors([]);
  };

  return {
    ...state,
    validationErrors,
    submit,
    reset,
  };
}
