// Design Tokens - Paleta de Cores
export const colors = {
  primary: {
    white: '#FFFFFF',
    offWhite: '#F8F9FA',
    lightGray: '#E8EAED',
    sage: '#6B8E7F', // Sage Green
    navy: '#1A2340', // Navy Blue
  },
  text: {
    primary: '#1A2340', // Navy
    secondary: '#6B8E7F', // Sage
    light: '#F8F9FA',
  },
  background: {
    light: '#FFFFFF',
    lighter: '#F8F9FA',
  },
  accent: {
    sage: '#6B8E7F',
    navy: '#1A2340',
    hover: '#5A7B6D',
  },
  ui: {
    border: '#E8EAED',
    divider: '#E8EAED',
    disabled: '#E8EAED',
  },
};

// Tipografia
export const typography = {
  fontFamily: {
    base: "'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  sizes: {
    h1: '2.5rem', // 40px
    h2: '2rem', // 32px
    h3: '1.5rem', // 24px
    h4: '1.25rem', // 20px
    body: '1rem', // 16px
    small: '0.875rem', // 14px
    xs: '0.75rem', // 12px
  },
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// Espaçamento
export const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
  xxl: '3rem', // 48px
  xxxl: '4rem', // 64px
};

// Breakpoints (Mobile First)
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Sombras
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  premium: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
};

// Transições
export const transitions = {
  fast: '150ms ease-in-out',
  base: '250ms ease-in-out',
  slow: '350ms ease-in-out',
};

// Easing Functions (para GSAP + Anime.js)
export const easing = {
  ease: 'ease',
  easeIn: 'easeIn',
  easeOut: 'easeOut',
  easeInOut: 'easeInOut',
  easeOutQuad: [0.25, 0.46, 0.45, 0.94],
  easeOutCubic: [0.215, 0.61, 0.355, 1],
  easeInOutQuad: [0.455, 0.03, 0.515, 0.955],
  easeInOutCubic: [0.645, 0.045, 0.355, 1],
};

// Links de Social Media
export const socialLinks = {
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
  github: 'https://github.com',
  email: 'hello@ibusiness.com',
};

// Contato
export const contact = {
  phone: '+1 (XXX) XXX-XXXX',
  email: 'hello@ibusiness.com',
  address: 'United States',
};
