// components/Analytics.tsx - Google Analytics 4 Script Setup

import Script from 'next/script';
import { getEnv } from '@/lib/env';

/**
 * Google Analytics Component
 * Add this to your root layout.tsx
 * 
 * Usage in layout.tsx:
 * <Analytics />
 */
export function Analytics() {
  const gaId = getEnv().NEXT_PUBLIC_GA_ID;

  if (!gaId) {
    console.warn('⚠️  NEXT_PUBLIC_GA_ID not configured - GA4 disabled');
    return null;
  }

  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
            });
          `,
        }}
      />

      {/* Vercel Analytics (if enabled) */}
      {process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ENABLED === 'true' && (
        <Script
          strategy="afterInteractive"
          src="/_vercel/insights/script.js"
        />
      )}
    </>
  );
}

export default Analytics;
