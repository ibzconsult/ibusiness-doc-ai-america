'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import CTAButton from './shared/CTAButton';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Criar timeline premium
    const tl = gsap.timeline({ delay: 0.3 });

    // Animação do background (entrada subtle)
    tl.to(
      backgroundRef.current,
      {
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
      },
      0
    );

    // Animação do heading (staggered letters effect)
    if (headingRef.current) {
      const chars = headingRef.current.querySelectorAll('span');
      tl.to(
        chars,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.out',
        },
        0.2
      );
    }

    // Animação do subtitle
    if (subtitleRef.current) {
      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        0.6
      );
    }

    // Animação dos CTAs
    if (ctaContainerRef.current) {
      const buttons = ctaContainerRef.current.querySelectorAll('a, button');
      tl.to(
        buttons,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.2)',
        },
        0.9
      );
    }

    // Floating animation para background (loop)
    gsap.to(backgroundRef.current, {
      y: -20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-white via-primary-offWhite to-primary-white pt-20">
      {/* Background Elements */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 opacity-0 pointer-events-none"
      >
        {/* Decorative circles */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-accent-sage rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent-navy rounded-full mix-blend-multiply filter blur-3xl opacity-5" />
        <div className="absolute top-1/2 left-10 w-72 h-72 bg-accent-sage rounded-full mix-blend-multiply filter blur-3xl opacity-5" />
      </div>

      <div ref={containerRef} className="container relative z-10 text-center max-w-4xl px-4">
        {/* Headline com Letter Animation */}
        <h1
          ref={headingRef}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-accent-navy mb-6 leading-tight overflow-hidden"
        >
          {/* Split text por palavras e depois por caracteres */}
          {'Transform Your Medical Practice with AI'
            .split(' ')
            .map((word, wordIdx) => (
              <span key={wordIdx} className="inline-block mr-3 md:mr-4">
                {word.split('').map((char, charIdx) => (
                  <span
                    key={charIdx}
                    className="inline-block opacity-0 translate-y-12"
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl text-text-secondary mb-10 leading-relaxed opacity-0 translate-y-8 max-w-2xl mx-auto"
        >
          Empower your clinical team with intelligent patient communication, seamless integrations, and HIPAA-compliant solutions that scale.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaContainerRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <CTAButton
            href="/book-briefing"
            size="lg"
            variant="primary"
            className="opacity-0 translate-y-8"
          >
            <span>Book a Briefing</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </CTAButton>
          <CTAButton
            href="/solutions"
            size="lg"
            variant="outline"
            className="opacity-0 translate-y-8"
          >
            <span>Explore Solutions</span>
          </CTAButton>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-accent-sage"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
