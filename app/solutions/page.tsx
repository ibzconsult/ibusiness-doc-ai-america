import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import CTAButton from '@/components/shared/CTAButton';

export const metadata = {
  title: 'Our Solutions - ibusiness Doc AI',
  description: 'Discover our 5 core healthcare solutions: AI Patient Agents, Medical Websites, Omnichannel Hubs, EHR Integrations, and Custom Software.',
};

interface SolutionDetail {
  id: string;
  number: string;
  title: string;
  icon: string;
  shortDescription: string;
  longDescription: string;
  benefits: string[];
  features: string[];
}

const solutions: SolutionDetail[] = [
  {
    id: 'ai-agents',
    number: '01',
    title: 'AI-Powered Patient Agents',
    icon: '🤖',
    shortDescription: 'Intelligent chatbots that handle patient inquiries 24/7.',
    longDescription:
      'Never miss another patient call. Our AI agents respond instantly via SMS, voice, and webchat. They handle appointment scheduling, answer FAQs about insurance and hours, and escalate complex issues to your team. Available 24/7, even outside business hours.',
    benefits: [
      'Reduce missed calls by up to 40%',
      '24/7 availability without hiring extra staff',
      'Improved patient satisfaction scores',
      'Seamless handoff to human team members',
    ],
    features: [
      'Natural language processing',
      'Multi-channel support (SMS, Voice, Webchat)',
      'Insurance verification',
      'Appointment scheduling integration',
      'Custom workflow automation',
      'Emergency escalation protocols',
    ],
  },
  {
    id: 'websites',
    number: '02',
    title: 'Modern Medical Websites',
    icon: '🌐',
    shortDescription: 'Ultra-fast, conversion-focused websites built for medical practices.',
    longDescription:
      'Your website is your 24/7 marketing machine. We build lightning-fast, mobile-responsive sites designed specifically for medical practices. Optimized for SEO, built for conversion, and integrated with your AI agents to capture and qualify leads automatically.',
    benefits: [
      'Lightning-fast load times (Lighthouse score > 90)',
      'Top Google rankings with SEO optimization',
      'Mobile-first design (60% of traffic)',
      'Integrated lead capture and qualification',
    ],
    features: [
      'Next.js + React (cutting-edge tech)',
      'SEO optimization (Meta tags, Schema)',
      'Mobile-responsive design',
      'Integrated AI chatbot',
      'Analytics dashboard',
      'Easy content management',
    ],
  },
  {
    id: 'omnichannel',
    number: '03',
    title: 'Omnichannel Communication Hubs',
    icon: '📥',
    shortDescription: 'Unified inbox for SMS, email, webchat, and voicemail.',
    longDescription:
      'Stop juggling multiple apps. Our unified inbox brings together SMS, email, voicemail transcripts, and webchat in one beautiful dashboard. Your reception team can manage everything from one place, reducing response times and improving patient satisfaction.',
    benefits: [
      'Single dashboard for all communications',
      'No context-switching between apps',
      'Faster response times (average 8 minutes)',
      'Better team collaboration',
    ],
    features: [
      'Multi-channel message aggregation',
      'Intelligent message routing',
      'Team collaboration tools',
      'Message templates',
      'Performance analytics',
      'Integration with EHRs',
    ],
  },
  {
    id: 'integrations',
    number: '04',
    title: 'Seamless EHR Integrations',
    icon: '🔗',
    shortDescription: 'Connect your EHR, billing, and CRM with intelligent workflows.',
    longDescription:
      'Your data lives in multiple systems. We connect them all. Our integration platform uses n8n to securely link your EHR (Tebra, Athenahealth, Epic), billing system, and CRM. Eliminate manual data entry and reduce errors by 90%.',
    benefits: [
      'Eliminate double data entry',
      'Real-time data synchronization',
      'Reduced errors by 90%+',
      'HIPAA-compliant data flows',
    ],
    features: [
      'n8n orchestration',
      'Real-time webhooks',
      'Custom workflow automation',
      'Data validation',
      'Audit logs',
      'HIPAA BAA compliant',
    ],
  },
  {
    id: 'custom',
    number: '05',
    title: 'Custom Healthcare Software',
    icon: '⚙️',
    shortDescription: 'Tailored solutions built for your unique workflows.',
    longDescription:
      'One size doesn\'t fit all. We build custom applications for your specific needs. Patient portals, internal dashboards, appointment reminders—all powered by AI to accelerate development and keep costs low.',
    benefits: [
      'Exactly what you need, nothing more',
      'Faster to market (AI-powered development)',
      'Lower costs than traditional dev',
      'Full HIPAA compliance',
    ],
    features: [
      'Custom application development',
      'AI-powered code generation',
      'Mobile and web apps',
      'Real-time updates',
      'Secure authentication',
      'Scalable infrastructure',
    ],
  },
];

export default function SolutionsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-white via-primary-offWhite to-primary-white py-20 md:py-28">
          <div className="container text-center max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-accent-navy mb-6">
              Our Five Core Services
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              Each service is designed to solve a specific problem in your practice. Pick and choose what works for you, or bundle them all for maximum impact.
            </p>
          </div>
        </section>

        {/* Detailed Solutions */}
        {solutions.map((solution, idx) => (
          <section
            key={solution.id}
            id={solution.id}
            className={`py-20 md:py-28 ${idx % 2 === 0 ? 'bg-white' : 'bg-primary-offWhite'}`}
          >
            <div className="container">
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                {/* Content */}
                <div className={idx % 2 === 1 ? 'md:col-start-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-accent-sage bg-opacity-10 rounded-lg flex items-center justify-center">
                      <span className="text-3xl">{solution.icon}</span>
                    </div>
                    <span className="text-xl font-bold text-accent-sage">
                      {solution.number}
                    </span>
                  </div>

                  <h2 className="text-4xl font-bold text-accent-navy mb-4">
                    {solution.title}
                  </h2>
                  <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                    {solution.longDescription}
                  </p>

                  {/* Benefits */}
                  <div className="mb-10">
                    <h3 className="text-xl font-semibold text-accent-navy mb-4">
                      Key Benefits
                    </h3>
                    <ul className="space-y-3">
                      {solution.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <svg
                            className="w-6 h-6 text-accent-sage flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-text-secondary">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <CTAButton href="/book-briefing" variant="primary" size="md">
                    Learn More
                  </CTAButton>
                </div>

                {/* Features */}
                <div className={idx % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                  <div className="bg-white rounded-xl p-10 border border-ui-border shadow-sm">
                    <h3 className="text-lg font-semibold text-accent-navy mb-6">
                      Features Included
                    </h3>
                    <ul className="space-y-4">
                      {solution.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-text-secondary"
                        >
                          <div className="w-2 h-2 bg-accent-sage rounded-full flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Final CTA */}
        <section className="bg-white py-20 md:py-28">
          <div className="container text-center max-w-2xl">
            <h2 className="text-4xl font-bold text-accent-navy mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-text-secondary mb-10">
              Book a personalized briefing with our team. We'll discuss your specific needs and create a custom plan.
            </p>
            <CTAButton href="/book-briefing" size="lg" variant="primary">
              Schedule Your Briefing
            </CTAButton>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
