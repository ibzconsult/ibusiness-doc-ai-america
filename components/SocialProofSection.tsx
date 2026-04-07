'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  clinic: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({
  quote,
  author,
  role,
  clinic,
}) => {
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
      className="opacity-0 translate-y-8 p-8 md:p-10 bg-white border border-ui-border rounded-xl hover:shadow-md transition-shadow duration-300"
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-lg text-text-primary mb-6 leading-relaxed">
        "{quote}"
      </blockquote>

      {/* Author */}
      <div>
        <p className="font-semibold text-accent-navy">{author}</p>
        <p className="text-sm text-text-secondary">{role}</p>
        <p className="text-sm text-text-secondary">{clinic}</p>
      </div>
    </div>
  );
};

export default function SocialProofSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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

    if (statsRef.current) {
      gsap.to(statsRef.current, {
        scrollTrigger: {
          trigger: statsRef.current,
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

  const testimonials = [
    {
      quote: 'Implementing ibusiness reduced our missed calls by 35% in the first month. Our team finally has time to focus on patient care.',
      author: 'Dr. Sarah Mitchell',
      role: 'Owner, Concierge Psychiatry',
      clinic: 'New York, NY',
    },
    {
      quote: 'The omnichannel hub is a game-changer. No more juggling between three different systems. Everything is in one place.',
      author: 'Jennifer Wong',
      role: 'Practice Manager, Elite Medical Group',
      clinic: 'San Francisco, CA',
    },
    {
      quote: 'HIPAA compliance was effortless. They handled everything, and we sleep better knowing patient data is secure.',
      author: 'Dr. Michael Chen',
      role: 'Owner, Internal Medicine Practice',
      clinic: 'Boston, MA',
    },
  ];

  const stats = [
    { number: '35%', label: 'Reduction in Missed Calls' },
    { number: '2.5h', label: 'Admin Time Saved Per Day' },
    { number: '95%', label: 'Patient Satisfaction Rate' },
  ];

  return (
    <section className="bg-primary-offWhite py-20 md:py-28">
      <div className="container">
        {/* Section Header */}
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-accent-navy text-center mb-16 opacity-0 translate-y-8"
        >
          Loved by Medical Professionals
        </h2>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 opacity-0 translate-y-8"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center p-8 bg-white rounded-xl border border-ui-border">
              <p className="text-4xl md:text-5xl font-bold text-accent-sage mb-2">
                {stat.number}
              </p>
              <p className="text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard key={idx} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
