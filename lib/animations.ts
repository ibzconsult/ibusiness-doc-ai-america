// Helper functions para GSAP - Scroll Trigger, Timelines e Animações
'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Timeline staggered fade in
export const staggerFadeIn = (
  targets: string | HTMLElement | HTMLElement[],
  staggerDelay = 0.1
) => {
  return gsap.to(targets, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: staggerDelay,
    ease: 'power3.out',
  });
};

// Scroll-triggered reveal
export const scrollReveal = (
  targets: string | HTMLElement | HTMLElement[],
  options: any = {}
) => {
  const scrollTriggerOptions: any = {
    trigger: targets,
    start: 'top 80%',
    toggleActions: 'play none none none',
  };

  if (options.scrollTrigger) {
    Object.assign(scrollTriggerOptions, options.scrollTrigger);
  }

  return gsap.to(targets, {
    scrollTrigger: scrollTriggerOptions,
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    ...options,
  });
};

// Parallax effect
export const parallax = (
  target: string | HTMLElement,
  intensity = 0.5
) => {
  if (typeof window === 'undefined') return;

  gsap.to(target, {
    scrollTrigger: {
      trigger: target,
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
      markers: false,
    },
    y: gsap.utils.unitize((i: number) => intensity * i),
    ease: 'none',
  });
};

// Counter animation
export const countUp = (
  target: string | HTMLElement | { value: number },
  endValue: number,
  duration = 2,
  onUpdate?: (value: number) => void
) => {
  const obj = typeof target === 'object' && !('nodeType' in target)
    ? target
    : { value: 0 };

  return gsap.to(obj, {
    value: endValue,
    duration,
    ease: 'power1.inOut',
    onUpdate() {
      if (onUpdate) {
        onUpdate(Math.floor(obj.value));
      }
    },
  });
};

// Hover effect
export const hoverEffect = (
  target: string | HTMLElement,
  scale = 1.05,
  duration = 0.3
) => {
  const element = typeof target === 'string'
    ? document.querySelector(target)
    : target;

  if (!element) return;

  element.addEventListener('mouseenter', () => {
    gsap.to(element, { scale, duration, overwrite: 'auto' });
  });

  element.addEventListener('mouseleave', () => {
    gsap.to(element, { scale: 1, duration, overwrite: 'auto' });
  });
};
