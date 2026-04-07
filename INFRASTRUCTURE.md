# Infrastructure Setup Guide - ibusiness Doc AI America

## 📋 Overview

This document covers the infrastructure setup for Phase 1, including:
- Environment variables configuration
- PostgreSQL database setup
- Prisma ORM configuration
- Email service (Resend) setup
- HIPAA compliance verification

---

## 1️⃣ Environment Variables

### Setup Steps

1. **Copy the example file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Fill in your values:**
   ```bash
   # Critical for HIPAA
   DATABASE_URL=postgresql://user:password@host:5432/ibusiness_db
   RESEND_API_KEY=re_xxxxxxxxxxxx
   OPENAI_API_KEY=sk-xxxxxxxxxxxx
   JWT_SECRET=your_secret_key_min_32_chars
   
   # Optional third-party integrations
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=xxxxxxxxxxxx
   ```

3. **Verify validation:**
   ```bash
   npm run dev
   # You should see: ✅ HIPAA compliance variables verified
   ```

### Environment Variables Reference

| Variable | Required | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `RESEND_API_KEY` | ✅ | Email service API key |
| `OPENAI_API_KEY` | ✅ | ChatGPT API key |
| `JWT_SECRET` | ✅ | JWT signing secret (min 32 chars) |
| `NEXT_PUBLIC_DOMAIN` | ❌ | Production domain (default: ibusiness.com) |
| `HIPAA_COMPLIANCE_MODE` | ✅ | Must be "true" for production |
| `LOG_CONVERSATIONS` | ❌ | Enable conversation logging (default: true) |

---

## 2️⃣ PostgreSQL Database Setup

### Option A: Local PostgreSQL (Development)

1. **Install PostgreSQL:**
   - macOS: `brew install postgresql`
   - Windows: Download from [postgresql.org](https://postgresql.org)
   - Linux: `sudo apt-get install postgresql`

2. **Start PostgreSQL:**
   ```bash
   # macOS/Linux
   brew services start postgresql
   
   # Windows
   # PostgreSQL runs as a service by default
   ```

3. **Create database:**
   ```bash
   createdb ibusiness_db
   ```

4. **Get connection string:**
   ```bash
   # Format: postgresql://username:password@localhost:5432/ibusiness_db
   psql postgresql://username:password@localhost:5432/ibusiness_db
   ```

### Option B: Cloud PostgreSQL (Production)

**Recommended options:**

1. **Vercel Postgres** (easiest for Next.js)
   - Dashboard: vercel.com → Projects → Postgres
   - Get connection string from dashboard
   - Add to `.env.local`

2. **AWS RDS**
   - [AWS Console](https://console.aws.amazon.com/rds)
   - Create PostgreSQL instance
   - Configure security groups for your IP
   - Get endpoint → `postgresql://user:pass@endpoint:5432/ibusiness_db`

3. **Supabase** (PostgreSQL + Auth)
   - [supabase.com](https://supabase.com)
   - Create new project
   - Get connection string from project settings

4. **Railway**
   - [railway.app](https://railway.app)
   - Create new project → PostgreSQL
   - Get DATABASE_URL

---

## 3️⃣ Prisma ORM Setup

### Initialize & Generate Client

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (creates tables)
npm run db:push

# Or use migrations (recommended for production)
npm run db:migrate
```

### Database Schema

The schema includes tables for:
- **BookBriefingLead** - Lead capture form data
- **Conversation** - Chat session history
- **ConversationMessage** - Individual messages with metadata
- **EmailLog** - Email delivery tracking
- **AuditLog** - HIPAA compliance audit trail
- **FeatureFlag** - Feature rollout control
- **AnalyticsEvent** - Page views and conversions

### View Database

```bash
# Open Prisma Studio (GUI for your database)
npm run db:studio
# Opens http://localhost:5555
```

---

## 4️⃣ Email Service Setup (Resend)

### Register Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up with your email
3. Verify email address
4. Create API key

### Get Your API Key

1. Dashboard → API Keys
2. Create new API key
3. Copy and add to `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxx
   ```

### Verify Domain (Production)

1. Dashboard → Domains
2. Add custom domain: `ibusiness.com`
3. Add DNS records (CNAME/MX)
4. Wait for verification

### Send Test Email

```bash
curl -X POST "https://api.resend.com/emails" \
  -H "Authorization: Bearer re_xxxxxxxxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "onboarding@resend.dev",
    "to": "your-email@example.com",
    "subject": "Test Email",
    "html": "<p>Test</p>"
  }'
```

---

## 5️⃣ HIPAA Compliance Verification

### Startup Checks

The app automatically verifies these on startup:

✅ All critical environment variables are set
✅ HIPAA_COMPLIANCE_MODE is enabled
✅ Database connection is valid
✅ Email service is configured

### Pre-Flight Checks

```bash
# Run development server
npm run dev

# Look for this in console:
# ✅ HIPAA compliance variables verified
# ✅ All startup checks passed
```

### Audit Logging

All sensitive operations are logged:

```typescript
// Examples:
- Form submissions (lead capture)
- Chat messages (especially those with PHI)
- Data access events
- Emergency detections
- Authentication events
```

View audit logs in Prisma Studio:
```bash
npm run db:studio
# Navigate to AuditLog table
```

---

## 6️⃣ Testing the Infrastructure

### Test Database Connection

```bash
node -e "
require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.$queryRaw\`SELECT 1\`
  .then(() => console.log('✅ Database connected'))
  .catch(e => console.error('❌ Error:', e.message))
  .finally(() => prisma.\$disconnect());
"
```

### Test Email Service

```bash
node -e "
require('dotenv').config({ path: '.env.local' });
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);
resend.emails.send({
  from: 'noreply@ibusiness.com',
  to: 'test@example.com',
  subject: 'Test',
  html: '<p>Test</p>'
}).then(r => console.log('✅ Email sent:', r.data?.id))
  .catch(e => console.error('❌ Error:', e));
"
```

### Test HIPAA Compliance

```bash
npm run dev
# Check console for compliance messages
```

---

## 🚀 Next Steps

After completing Phase 1 infrastructure, you're ready for:

1. **Phase 2: Backend APIs**
   - Create `/api/book-briefing` endpoint
   - Create `/api/chat` endpoint
   - Connect to AI services

2. **Phase 3: Analytics**
   - Google Analytics integration
   - Conversion tracking
   - Dashboard setup

3. **Phase 4: Content**
   - Real testimonials
   - Team photos
   - Case studies

4. **Phase 5: Deployment**
   - Domain registration
   - Vercel deployment
   - n8n orchestration

---

## 🆘 Troubleshooting

### "DATABASE_URL is missing"
```
Solution: Copy .env.example to .env.local and fill in all required values
```

### "Cannot connect to PostgreSQL"
```
Solution: 
1. Verify DATABASE_URL is correct
2. Ensure PostgreSQL is running: psql -U postgres
3. Check firewall/network rules for cloud databases
```

### "RESEND_API_KEY not found"
```
Solution:
1. Create account at resend.com
2. Get API key from dashboard
3. Add to .env.local
```

### "Prisma Client not generated"
```
Solution: npm run db:generate
```

### "HIPAA compliance check failed"
```
Solution: Set HIPAA_COMPLIANCE_MODE=true in .env.local
```

---

## 📚 Resources

- [Prisma Documentation](https://prisma.io/docs)
- [Resend Email API](https://resend.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [HIPAA Compliance Guide](https://www.hhs.gov/hipaa)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)

---

**Last Updated:** April 6, 2026
**Status:** ✅ Infrastructure Phase 1 Complete
