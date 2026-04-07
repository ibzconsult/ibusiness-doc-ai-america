'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CTAButton from './shared/CTAButton';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    if (headingRef.current) {
      tl.to(
        headingRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        0
      );
    }

    if (descriptionRef.current) {
      tl.to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        0.2
      );
    }

    if (buttonRef.current) {
      tl.to(
        buttonRef.current.querySelector('a'),
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'back.out(1.2)',
        },
        0.4
      );
    }

    // Animate background glow
    gsap.to(containerRef.current.querySelector('.glow'), {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section className="bg-white py-20 md:py-28">
      <div ref={containerRef} className="relative container text-center max-w-3xl">
        {/* Background glow */}
        <div className="absolute inset-0 opacity-0 scale-75 pointer-events-none glow">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-sage rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold text-accent-navy mb-6 opacity-0 translate-y-8"
          >
            Ready to Transform Your Practice?
          </h2>

          <p
            ref={descriptionRef}
            className="text-lg md:text-xl text-text-secondary mb-10 opacity-0 translate-y-8 leading-relaxed"
          >
            Join hundreds of medical practices that have already streamlined their operations with ibusiness. Book a personalized briefing with our team and see how we can save you time and money.
          </p>

          <div ref={buttonRef} className="opacity-0 translate-y-8">
            <CTAButton href="/book-briefing" size="lg" variant="primary">
              <span>Book Your Briefing Today</span>
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
          </div>

          {/* Sub-text */}
          <p className="text-sm text-text-secondary mt-8">
            Free consultation • No credit card required • 15 minutes
          </p>
        </div>
      </div>
    </section>
  );
}
