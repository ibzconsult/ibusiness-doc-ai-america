// FORM_API_INTEGRATION_GUIDE.md - How to integrate Form API with the Book Briefing page

## 📋 Form API Integration Guide

The Form API is ready at `POST /api/book-briefing`. Here's how to integrate it with your existing book-briefing page.

### Current Status
- ✅ API endpoint implemented (`app/api/book-briefing/route.ts`)
- ✅ Validation schema created (`lib/schemas/book-briefing.ts`)
- ✅ Client hook provided (`lib/hooks/useBookBriefing.ts`)
- ✅ Email templates ready
- ✅ Database schema ready
- ✅ Audit logging ready

### Integration Steps

#### 1. Update Book Briefing Component

In `app/book-briefing/page.tsx`, add the useBookBriefing hook:

```typescript
'use client';

import { useBookBriefing } from '@/lib/hooks/useBookBriefing';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookBriefingSchema } from '@/lib/schemas/book-briefing';

export default function BookBriefingPage() {
  const { 
    submit, 
    loading, 
    error, 
    success, 
    validationErrors,
    reset 
  } = useBookBriefing();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(bookBriefingSchema),
  });

  const onSubmit = async (data) => {
    await submit(data);
  };

  if (success) {
    return (
      <div className="bg-success-green/10 border border-success-green rounded-lg p-4">
        <h2>Obrigado!</h2>
        <p>Sua solicitação foi recebida. Você receberá um e-mail de confirmação em breve.</p>
        <button onClick={reset} className="mt-4">
          Enviar Outro Formulário
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="bg-error-red/10 border border-error-red rounded-lg p-3 text-error-red">
          {error}
        </div>
      )}

      <div>
        <label>Nome</label>
        <input 
          {...register('name')}
          className={errors.name ? 'border-error-red' : ''}
        />
        {errors.name && (
          <span className="text-error-red text-sm">{errors.name.message}</span>
        )}
      </div>

      <div>
        <label>Email</label>
        <input 
          {...register('email')}
          type="email"
          className={errors.email ? 'border-error-red' : ''}
        />
        {errors.email && (
          <span className="text-error-red text-sm">{errors.email.message}</span>
        )}
      </div>

      <div>
        <label>Telefone</label>
        <input 
          {...register('phone')}
          className={errors.phone ? 'border-error-red' : ''}
        />
        {errors.phone && (
          <span className="text-error-red text-sm">{errors.phone.message}</span>
        )}
      </div>

      <div>
        <label>Nome da Clínica</label>
        <input 
          {...register('clinicName')}
          className={errors.clinicName ? 'border-error-red' : ''}
        />
        {errors.clinicName && (
          <span className="text-error-red text-sm">{errors.clinicName.message}</span>
        )}
      </div>

      <div>
        <label>Sua Função</label>
        <select {...register('role')}>
          <option value="owner">Proprietário da Clínica</option>
          <option value="manager">Gestor</option>
          <option value="staff">Equipe</option>
        </select>
      </div>

      <div>
        <label>Mensagem (Opcional)</label>
        <textarea 
          {...register('message')}
          rows={4}
        />
        {errors.message && (
          <span className="text-error-red text-sm">{errors.message.message}</span>
        )}
      </div>

      <button 
        type="submit"
        disabled={loading}
        className="bg-navy text-white px-6 py-2 rounded"
      >
        {loading ? 'Enviando...' : 'Agendar Briefing'}
      </button>
    </form>
  );
}
```

#### 2. Install Zod Hook Form Resolver

```bash
npm install @hookform/resolvers
```

#### 3. API Endpoints Available

**POST /api/book-briefing**
- Request: Form data
- Response: `{ success: true, leadId: string, message: string }`
- Status codes: 201 (created), 400 (validation), 409 (duplicate), 500 (error)

**GET /api/book-briefing?leadId=xxx**
- Returns: Lead details (name, email, clinic, status)
- Status codes: 200 (found), 404 (not found)

**OPTIONS /api/book-briefing**
- CORS support

#### 4. What Happens on Submission

1. ✅ Form data validated with Zod schema
2. ✅ Lead created in database (`BookBriefingLead` table)
3. ✅ Form submission logged for HIPAA audit trail
4. ✅ Confirmation email sent to lead
5. ✅ Team alert email sent to admin
6. ✅ Success response returned

#### 5. Database Record Created

When a lead submits the form, this is saved:

```sql
INSERT INTO BookBriefingLead (
  name,
  email,
  phone,
  clinicName,
  role,
  message,
  status,
  source,
  createdAt
) VALUES (...)
```

Fields:
- `name` - Full name
- `email` - Email address (lowercase, unique)
- `phone` - Phone number
- `clinicName` - Clinic name
- `role` - owner/manager/staff
- `message` - Optional message
- `status` - Initially "new"
- `source` - "website"
- `createdAt` - Timestamp

#### 6. Emails Sent

**To Lead:**
```
Subject: Agendamento Confirmado - ibusiness Doc AI
Body: Confirmation template with booking link
```

**To Team:**
```
Subject: 🔔 Novo Lead: {name} - {clinicName}
Body: Alert with all lead details
```

#### 7. Audit Log Entry Created

```sql
INSERT INTO AuditLog (
  action,           -- 'form_submitted'
  resource,         -- 'lead'
  resourceId,       -- lead.id
  actor,            -- 'website_form'
  ipAddress,        -- Client IP
  userAgent,        -- Browser info
  status,           -- 'success'
  createdAt         -- Timestamp
)
```

#### 8. Testing the API

**Using curl:**
```bash
curl -X POST http://localhost:3000/api/book-briefing \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. João Silva",
    "email": "joao@example.com",
    "phone": "+5511999999999",
    "clinicName": "Clínica São Paulo",
    "role": "owner",
    "message": "Interested in your AI services"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "leadId": "clp1234567890abcdef",
  "message": "Obrigado! Recebemos sua solicitação...",
  "confirmationSent": true
}
```

#### 9. Error Handling

**Validation Error (400):**
```json
{
  "success": false,
  "message": "Erro na validação do formulário",
  "errors": [
    {
      "field": "email",
      "message": "Email inválido"
    }
  ]
}
```

**Duplicate Email (409):**
```json
{
  "success": false,
  "message": "Este e-mail já foi registrado..."
}
```

**Server Error (500):**
```json
{
  "success": false,
  "message": "Erro ao processar seu pedido"
}
```

#### 10. Monitoring & Debugging

**View submissions:**
```bash
npm run db:studio
# Navigate to BookBriefingLead table
```

**View audit logs:**
```bash
npm run db:studio
# Navigate to AuditLog table, filter by action = 'form_submitted'
```

**View email logs:**
```bash
npm run db:studio
# Navigate to EmailLog table
```

#### 11. Next Steps

After integrating this API:

1. **Test form submission** in development
2. **Verify emails** are sent to admin
3. **Check audit logs** for compliance
4. **Move to Chat API** (`/api/chat`)
5. **Setup deployment** to Vercel

#### 12. Production Checklist

- [ ] .env.local has RESEND_API_KEY
- [ ] .env.local has DATABASE_URL
- [ ] Database migrations applied (`npm run db:push`)
- [ ] Resend email domain verified
- [ ] Form component updated
- [ ] Testing in production environment
- [ ] Email templates verified
- [ ] Audit logging verified
- [ ] Error handling tested

---

**Files Involved:**
- `app/api/book-briefing/route.ts` - API endpoint
- `lib/schemas/book-briefing.ts` - Validation schema
- `lib/hooks/useBookBriefing.ts` - Client hook
- `lib/email.ts` - Email service
- `lib/audit.ts` - Audit logging
- `prisma/schema.prisma` - Database schema

**Status:** ✅ Ready for integration
