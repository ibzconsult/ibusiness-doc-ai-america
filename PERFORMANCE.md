// Instruções de Performance Optimization

// 1. LAZY LOAD COMPONENTS PESADOS
// ================================
// Em page.tsx, usar dynamic() para componentes que aparecem abaixo do fold:

import dynamic from 'next/dynamic';

// Carregar abaixo do fold
const ProblemSection = dynamic(() => import('@/components/ProblemSection'), {
  loading: () => <div className="h-screen bg-primary-offWhite" />,
});

const SolutionsSection = dynamic(() => import('@/components/SolutionsSection'), {
  loading: () => <div className="h-screen bg-white" />,
});

// 2. IMAGE OPTIMIZATION
// ====================
// Usar Next.js Image component:
// import Image from 'next/image';
// <Image src="/path" alt="alt" width={400} height={300} priority={false} />

// 3. SCRIPT OPTIMIZATION
// ======================
// GSAP já está lazy-loaded via dynamic imports
// Não carregar scripts no head, sempre no body ou defer

// 4. CSS OPTIMIZATION
// ===================
// Tailwind purging funciona automaticamente em production
// CSS está minificado via PostCSS

// 5. BUNDLE ANALYSIS
// ==================
// Rodar: npm run build && npm run analyze (se instalado)
// Procurar por:
// - Bibliotecas duplicadas
// - Código não utilizado
// - Chunks muito grandes

// 6. CACHEING
// ===========
// next.config.ts está configurado com:
// - Cache-Control headers
// - Immutable assets
// - Short-lived API responses

// 7. CORE WEB VITALS
// ==================
// LCP: Hero section otimizada
// FID: Event handlers rápidos
// CLS: Layout shifts minimizados

console.log('Performance optimization guide loaded');
