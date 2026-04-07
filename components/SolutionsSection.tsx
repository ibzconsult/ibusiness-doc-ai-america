'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

interface SolutionProps {
  number: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}

const SolutionCard: React.FC<SolutionProps & { index: number }> = ({
  number,
  title,
  description,
  icon,
  href,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: index * 0.1,
      ease: 'power3.out',
    });
  }, [index]);

  return (
    <Link href={href}>
      <div
        ref={cardRef}
        className="opacity-0 translate-y-8 group h-full p-8 md:p-10 bg-white border border-ui-border rounded-xl hover:shadow-xl hover:border-accent-sage transition-all duration-300 cursor-pointer"
      >
        {/* Number Badge */}
        <div className="w-12 h-12 bg-accent-sage bg-opacity-10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent-sage group-hover:bg-opacity-100 group-hover:text-white transition-all duration-300">
          <span className="text-sm font-bold text-accent-sage group-hover:text-white">
            {number}
          </span>
        </div>

        {/* Icon */}
        <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>

        {/* Content */}
        <h3 className="text-2xl font-semibold text-accent-navy mb-3 group-hover:text-accent-sage transition-colors duration-300">
          {title}
        </h3>
        <p className="text-text-secondary leading-relaxed mb-6">
          {description}
        </p>

        {/* Arrow */}
        <div className="flex items-center text-accent-sage font-medium group-hover:translate-x-2 transition-transform duration-300">
          <span>Learn more</span>
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default function SolutionsSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }

    if (subtitleRef.current) {
      gsap.to(subtitleRef.current, {
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.15,
      });
    }
  }, []);

  const solutions = [
    {
      number: '01',
      title: 'AI-Powered Patient Agents',
      description:
        'Intelligent chatbots that handle patient inquiries 24/7 via SMS, voice, and webchat. Reduce call volume by 40% while improving satisfaction.',
      icon: '🤖',
      href: '/solutions#ai-agents',
    },
    {
      number: '02',
      title: 'Modern Medical Websites',
      description:
        'Ultra-fast, conversion-focused websites designed specifically for medical practices. Built with the latest tech for maximum SEO performance.',
      icon: '🌐',
      href: '/solutions#websites',
    },
    {
      number: '03',
      title: 'Omnichannel Communication Hubs',
      description:
        'Unified inbox for SMS, email, webchat, and voicemail. Your team manages everything from one dashboard. No app-switching, no chaos.',
      icon: '📥',
      href: '/solutions#omnichannel',
    },
    {
      number: '04',
      title: 'Seamless EHR Integrations',
      description:
        'Connect your EHR, billing system, and CRM with intelligent workflows. Eliminate double data entry. Keep patient data secure and compliant.',
      icon: '🔗',
      href: '/solutions#integrations',
    },
    {
      number: '05',
      title: 'Custom Healthcare Software',
      description:
        'Tailored solutions built for your unique workflows. From patient portals to internal apps. Faster, cheaper, and powered by AI.',
      icon: '⚙️',
      href: '/solutions#custom',
    },
  ];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-accent-navy mb-6 opacity-0 translate-y-8"
          >
            Our Five Core Services
          </h2>
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto opacity-0 translate-y-8"
          >
            Everything you need to transform your medical practice. Pick and choose what works for you.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {solutions.slice(0, 3).map((solution, idx) => (
            <SolutionCard key={idx} {...solution} index={idx} />
          ))}
        </div>

        {/* Second Row (2 cards centered) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:max-w-2xl md:mx-auto">
          {solutions.slice(3).map((solution, idx) => (
            <SolutionCard key={idx + 3} {...solution} index={idx + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
