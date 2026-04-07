// __tests__/api/book-briefing.test.ts - Test cases for form API

/**
 * Test cases for POST /api/book-briefing
 * 
 * Run with: npm test __tests__/api/book-briefing.test.ts
 * 
 * Note: Requires test database setup
 */

import { bookBriefingSchema } from '@/lib/schemas/book-briefing';
import { z } from 'zod';

describe('Book Briefing Schema Validation', () => {
  
  describe('Valid inputs', () => {
    test('should accept valid form data', () => {
      const data = {
        name: 'Dr. João Silva',
        email: 'joao@example.com',
        phone: '+5511999999999',
        clinicName: 'Clínica São Paulo',
        role: 'owner',
        message: 'Interested in your services',
      };

      const result = bookBriefingSchema.parse(data);
      expect(result.email).toBe('joao@example.com'); // lowercase
      expect(result.name).toBe('Dr. João Silva');
    });

    test('should accept minimal form data (without message)', () => {
      const data = {
        name: 'Dr. João',
        email: 'joao@example.com',
        phone: '11999999999',
        clinicName: 'Clínica',
        role: 'owner',
      };

      const result = bookBriefingSchema.parse(data);
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('email');
    });

    test('should default role to staff', () => {
      const data = {
        name: 'Dr. João',
        email: 'joao@example.com',
        phone: '11999999999',
        clinicName: 'Clínica',
      };

      const result = bookBriefingSchema.parse(data);
      expect(result.role).toBe('staff');
    });

    test('should trim whitespace', () => {
      const data = {
        name: '  Dr. João  ',
        email: '  joao@example.com  ',
        phone: '  11999999999  ',
        clinicName: '  Clínica São Paulo  ',
        role: 'owner',
      };

      const result = bookBriefingSchema.parse(data);
      expect(result.name).toBe('Dr. João');
      expect(result.email).toBe('joao@example.com');
    });

    test('should accept different phone formats', () => {
      const validPhones = [
        '+5511999999999',
        '11999999999',
        '(11) 99999-9999',
        '+55 (11) 9999-9999',
      ];

      validPhones.forEach(phone => {
        const data = {
          name: 'Test',
          email: 'test@example.com',
          phone,
          clinicName: 'Clinic',
        };

        expect(() => bookBriefingSchema.parse(data)).not.toThrow();
      });
    });
  });

  describe('Invalid inputs - Name', () => {
    test('should reject name with less than 2 characters', () => {
      const data = {
        name: 'A',
        email: 'test@example.com',
        phone: '11999999999',
        clinicName: 'Clinic',
      };

      expect(() => bookBriefingSchema.parse(data)).toThrow(
        'Nome deve ter pelo menos 2 caracteres'
      );
    });

    test('should reject name with more than 100 characters', () => {
      const data = {
        name: 'A'.repeat(101),
        email: 'test@example.com',
        phone: '11999999999',
        clinicName: 'Clinic',
      };

      expect(() => bookBriefingSchema.parse(data)).toThrow(
        'Nome não pode ter mais de 100 caracteres'
      );
    });
  });

  describe('Invalid inputs - Email', () => {
    test('should reject invalid email format', () => {
      const invalidEmails = [
        'not-an-email',
        'test@',
        '@example.com',
        'test@example',
      ];

      invalidEmails.forEach(email => {
        const data = {
          name: 'Test',
          email,
          phone: '11999999999',
          clinicName: 'Clinic',
        };

        expect(() => bookBriefingSchema.parse(data)).toThrow();
      });
    });

    test('should convert email to lowercase', () => {
      const data = {
        name: 'Test',
        email: 'Test@Example.COM',
        phone: '11999999999',
        clinicName: 'Clinic',
      };

      const result = bookBriefingSchema.parse(data);
      expect(result.email).toBe('test@example.com');
    });
  });

  describe('Invalid inputs - Phone', () => {
    test('should reject phone with less than 10 digits', () => {
      const data = {
        name: 'Test',
        email: 'test@example.com',
        phone: '1199999',
        clinicName: 'Clinic',
      };

      expect(() => bookBriefingSchema.parse(data)).toThrow(
        'Telefone inválido'
      );
    });

    test('should reject phone with invalid characters', () => {
      const data = {
        name: 'Test',
        email: 'test@example.com',
        phone: '11999999abc',
        clinicName: 'Clinic',
      };

      expect(() => bookBriefingSchema.parse(data)).toThrow(
        'Telefone contém caracteres inválidos'
      );
    });
  });

  describe('Invalid inputs - Clinic Name', () => {
    test('should reject clinic name with less than 2 characters', () => {
      const data = {
        name: 'Test',
        email: 'test@example.com',
        phone: '11999999999',
        clinicName: 'C',
      };

      expect(() => bookBriefingSchema.parse(data)).toThrow(
        'Nome da clínica deve ter pelo menos 2 caracteres'
      );
    });

    test('should reject clinic name with more than 150 characters', () => {
      const data = {
        name: 'Test',
        email: 'test@example.com',
        phone: '11999999999',
        clinicName: 'C'.repeat(151),
      };

      expect(() => bookBriefingSchema.parse(data)).toThrow(
        'Nome da clínica muito longo'
      );
    });
  });

  describe('Invalid inputs - Message', () => {
    test('should reject message with less than 10 characters', () => {
      const data = {
        name: 'Test',
        email: 'test@example.com',
        phone: '11999999999',
        clinicName: 'Clinic',
        message: 'Short',
      };

      expect(() => bookBriefingSchema.parse(data)).toThrow(
        'Mensagem deve ter pelo menos 10 caracteres'
      );
    });

    test('should reject message with more than 2000 characters', () => {
      const data = {
        name: 'Test',
        email: 'test@example.com',
        phone: '11999999999',
        clinicName: 'Clinic',
        message: 'M'.repeat(2001),
      };

      expect(() => bookBriefingSchema.parse(data)).toThrow(
        'Mensagem não pode ter mais de 2000 caracteres'
      );
    });
  });

  describe('Invalid inputs - Role', () => {
    test('should reject invalid role', () => {
      const data = {
        name: 'Test',
        email: 'test@example.com',
        phone: '11999999999',
        clinicName: 'Clinic',
        role: 'invalid_role',
      };

      expect(() => bookBriefingSchema.parse(data)).toThrow();
    });

    test('should accept valid roles', () => {
      ['owner', 'manager', 'staff'].forEach(role => {
        const data = {
          name: 'Test',
          email: 'test@example.com',
          phone: '11999999999',
          clinicName: 'Clinic',
          role,
        };

        expect(() => bookBriefingSchema.parse(data)).not.toThrow();
      });
    });
  });

  describe('Missing required fields', () => {
    test('should reject missing name', () => {
      const data = {
        email: 'test@example.com',
        phone: '11999999999',
        clinicName: 'Clinic',
      };

      expect(() => bookBriefingSchema.parse(data)).toThrow();
    });

    test('should reject missing email', () => {
      const data = {
        name: 'Test',
        phone: '11999999999',
        clinicName: 'Clinic',
      };

      expect(() => bookBriefingSchema.parse(data)).toThrow();
    });

    test('should reject missing phone', () => {
      const data = {
        name: 'Test',
        email: 'test@example.com',
        clinicName: 'Clinic',
      };

      expect(() => bookBriefingSchema.parse(data)).toThrow();
    });

    test('should reject missing clinic name', () => {
      const data = {
        name: 'Test',
        email: 'test@example.com',
        phone: '11999999999',
      };

      expect(() => bookBriefingSchema.parse(data)).toThrow();
    });
  });
});

/**
 * Integration tests (requires database)
 * 
 * These tests would go in a separate file: __tests__/api/book-briefing.integration.test.ts
 * 
 * Scenarios to test:
 * 1. POST /api/book-briefing with valid data creates lead
 * 2. POST /api/book-briefing sends confirmation email
 * 3. POST /api/book-briefing sends team alert email
 * 4. POST /api/book-briefing logs audit entry
 * 5. GET /api/book-briefing?leadId=xxx returns lead data
 * 6. Duplicate email submission returns 409
 * 7. Invalid data returns 400 with validation errors
 * 8. Server error returns 500
 */
