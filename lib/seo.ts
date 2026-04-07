// lib/seo.ts - SEO Utilities and Structured Data

export const generateOGImage = (title: string) => {
  return {
    url: 'https://ibusiness.com/og-image.png',
    width: 1200,
    height: 630,
    alt: title,
  };
};

// Healthcare Organization Schema
export const healthcareOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'HealthCareService',
  name: 'ibusiness Doc AI',
  description:
    'AI-powered healthcare solutions for medical practices including patient communication, omnichannel hubs, and EHR integrations.',
  image: 'https://ibusiness.com/logo.png',
  url: 'https://ibusiness.com',
  telephone: '+1-XXX-XXX-XXXX',
  email: 'hello@ibusiness.com',
  areaServed: 'US',
  availableLanguage: 'en',
  serviceType: 'Healthcare IT Solutions',
  award: 'HIPAA Compliant',
};

// Local Business Schema
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'ibusiness Doc AI America',
  image: 'https://ibusiness.com/logo.png',
  description:
    'Healthcare AI solutions for medical practices',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    telephone: '+1-XXX-XXX-XXXX',
    email: 'hello@ibusiness.com',
  },
  sameAs: [
    'https://linkedin.com/company/ibusiness',
    'https://twitter.com/ibusiness',
  ],
};

// Product/Service Schema
export const serviceSchema = (serviceName: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: serviceName,
  description: description,
  provider: {
    '@type': 'HealthCareService',
    name: 'ibusiness Doc AI',
    url: 'https://ibusiness.com',
  },
});

// FAQ Schema
export const faqSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

// Breadcrumb Schema
export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
