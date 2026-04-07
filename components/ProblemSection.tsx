'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProblemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ProblemCard: React.FC<ProblemProps> = ({ icon, title, description }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className="opacity-0 translate-y-8 p-8 md:p-10 bg-white rounded-xl border border-ui-border hover:shadow-lg transition-shadow duration-300 group"
    >
      <div className="w-16 h-16 bg-accent-sage bg-opacity-10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-opacity-20 transition-all duration-300">
        <div className="text-accent-sage text-2xl">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold text-accent-navy mb-3">{title}</h3>
      <p className="text-text-secondary leading-relaxed">{description}</p>
    </div>
  );
};

export default function ProblemSection() {
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
        delay: 0.2,
      });
    }
  }, []);

  const problems = [
    {
      icon: '📞',
      title: 'Missed Calls',
      description: 'Patients can\'t reach you outside business hours. Lost appointments and revenue.',
    },
    {
      icon: '⏰',
      title: 'Manual Scheduling',
      description: 'Receptionists spend hours on the phone. No online booking = more no-shows.',
    },
    {
      icon: '🔄',
      title: 'Data Silos',
      description: 'EHR, CRM, and billing systems don\'t communicate. Double data entry waste.',
    },
    {
      icon: '💼',
      title: 'Staff Burnout',
      description: 'Administrative overhead drains team morale and increases turnover.',
    },
  ];

  return (
    <section className="bg-primary-offWhite py-20 md:py-28">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-accent-navy mb-6 opacity-0 translate-y-8"
          >
            The Problem Every Practice Faces
          </h2>
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto opacity-0 translate-y-8"
          >
            Medical practices are drowning in administrative overhead. Your team is exhausted, patients are frustrated, and revenue is slipping away.
          </p>
        </div>

        {/* Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {problems.map((problem, idx) => (
            <ProblemCard key={idx} {...problem} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-text-secondary text-lg mb-6">
            Sound familiar? <span className="font-semibold text-accent-navy">We have the solution.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
