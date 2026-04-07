'use client';

import { useEffect, useRef } from 'react';

// Hook para usar GSAP ScrollTrigger
export const useScrollTrigger = (callback: () => void, deps: any[] = []) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    callback();
  }, [callback, ...deps]);

  return elementRef;
};

// Hook para usar Intersection Observer (alternativa mais leve)
export const useIntersectionObserver = (options = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        isVisible.current = true;
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible: isVisible.current };
};
