# Vercel Deployment Guide

## Pre-requisites
- Vercel account (https://vercel.com)
- GitHub repository linked to Vercel
- Environment variables configured

## Deployment Steps

### Option 1: CLI Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to staging
vercel

# Deploy to production
vercel --prod
```

### Option 2: GitHub Integration
1. Push code to GitHub
2. Connect GitHub repo to Vercel project
3. Vercel auto-deploys on push to main branch

## Environment Variables

### Production (.env.production)
```
NEXT_PUBLIC_API_URL=https://api.ibusiness.com
NEXT_PUBLIC_DOMAIN=https://ibusiness.com
HIPAA_COMPLIANCE_MODE=true
```

### Development (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_DOMAIN=http://localhost:3000
HIPAA_COMPLIANCE_MODE=false
```

## Vercel Configuration (vercel.json)

```json
{
  "name": "ibusiness-doc-ai",
  "regions": ["us-east-1"],
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/robots.txt",
      "headers": {
        "Cache-Control": "public, max-age=3600"
      }
    },
    {
      "src": "/sitemap.xml",
      "headers": {
        "Cache-Control": "public, max-age=3600"
      }
    }
  ]
}
```

## Domain Configuration

### Custom Domain
1. In Vercel dashboard: Settings → Domains
2. Add custom domain: ibusiness.com
3. Update DNS records at domain registrar:
   ```
   A: 76.76.19.165
   AAAA: 2606:4700:4400::6e40:20a5
   ```
4. Verify domain ownership

### SSL/TLS
- Vercel auto-provisions SSL certificate
- Valid for both ibusiness.com and www.ibusiness.com

## Performance Optimization

### Vercel Analytics
- Automatically enabled
- Monitor Core Web Vitals
- Track performance metrics

### Caching Strategy
```
Static Files (JS, CSS, Images): max-age=31536000
HTML Pages: max-age=0 (always revalidate)
API Routes: max-age=60
```

## Monitoring & Maintenance

### Health Checks
- Monitor uptime: https://ibusiness.com
- Check API health: https://ibusiness.com/api/health
- View logs: Vercel dashboard → Deployments

### Security
- Enable DDoS protection
- Configure WAF rules
- Regular security audits

## CI/CD Pipeline

### GitHub Actions Integration
Vercel auto-deploys on:
- Push to `main` branch → Production
- Push to other branches → Preview deployments
- Pull requests → Preview environments

### Build Configuration
- Build command: `npm run build`
- Output directory: `.next`
- Install command: `npm install`

## Rollback Strategy

If deployment fails:
```bash
# Revert to previous deployment
vercel rollback
```

Or via dashboard:
Settings → Deployments → Select previous version → Promote to production

## Performance Targets

- **Lighthouse**: > 90
- **Core Web Vitals**: Good
- **Time to First Byte**: < 600ms
- **First Contentful Paint**: < 1.5s
- **Cumulative Layout Shift**: < 0.1

## Post-Deployment Checklist

- [ ] Verify homepage loads
- [ ] Test all links work
- [ ] Check mobile responsiveness
- [ ] Verify SSL certificate
- [ ] Test form submissions
- [ ] Check Analytics
- [ ] Monitor error rates
- [ ] Confirm SEO meta tags

## Support

- Vercel Docs: https://vercel.com/docs
- GitHub Issues: Report bugs
- Email: hello@ibusiness.com
