// lib/analytics.ts - Analytics integration (Google Analytics 4 + Vercel Analytics)

import { getEnv } from './env';

/**
 * Initialize Google Analytics 4
 * Call this in your root layout
 */
export function initializeGA() {
  const gaId = getEnv().NEXT_PUBLIC_GA_ID;

  if (!gaId) {
    console.warn('⚠️  NEXT_PUBLIC_GA_ID not configured - GA4 disabled');
    return;
  }

  // This would typically be handled by next/script tag
  if (typeof window === 'undefined') return;

  // Google Analytics script is injected via next/script in layout
  console.log('✅ Google Analytics 4 initialized:', gaId);
}

/**
 * Track page view
 */
export function trackPageView(path: string, title?: string) {
  if (!window.gtag) return;

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
  });
}

/**
 * Track custom event
 */
export function trackEvent(
  eventName: string,
  eventData?: Record<string, any>
) {
  if (!window.gtag) return;

  window.gtag('event', eventName, eventData || {});
}

/**
 * Track form submission
 */
export function trackFormSubmission(
  formName: string,
  leadId?: string
) {
  trackEvent('form_submit', {
    form_name: formName,
    lead_id: leadId,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track chat message (for engagement)
 */
export function trackChatMessage(
  conversationId: string,
  isEmergency: boolean = false
) {
  trackEvent('chat_message', {
    conversation_id: conversationId,
    is_emergency: isEmergency,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track CTA click
 */
export function trackCTAClick(ctaName: string, ctaLocation: string) {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: ctaLocation,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track conversion (lead generated)
 */
export function trackConversion(
  conversionType: 'form_submission' | 'demo_scheduled' | 'contact_made',
  conversionValue?: number
) {
  trackEvent('conversion', {
    conversion_type: conversionType,
    conversion_value: conversionValue || 0,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(depth: number) {
  trackEvent('scroll_depth', {
    scroll_percentage: depth,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track time on page
 */
export function trackTimeOnPage(
  path: string,
  timeSeconds: number
) {
  trackEvent('time_on_page', {
    page_path: path,
    time_seconds: timeSeconds,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Set user properties for demographics
 */
export function setUserProperties(properties: {
  clinicSize?: 'small' | 'medium' | 'large';
  industry?: string;
  region?: string;
  isPaid?: boolean;
}) {
  if (!window.gtag) return;

  window.gtag('config', getEnv().NEXT_PUBLIC_GA_ID, {
    user_properties: {
      clinic_size: properties.clinicSize,
      industry: properties.industry,
      region: properties.region,
      is_paid: properties.isPaid,
    },
  });
}

/**
 * Global type declaration for gtag
 */
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
