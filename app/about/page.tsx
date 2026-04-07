import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import CTAButton from '@/components/shared/CTAButton';

export const metadata = {
  title: 'About Us - ibusiness Doc AI',
  description: 'Learn about ibusiness, our mission to transform healthcare, and the team behind the solutions.',
};

export default function AboutPage() {
  const team = [
    {
      name: 'Dr. Leonardo [Name]',
      role: 'Founder & CEO',
      bio: 'Medical doctor with 15+ years of clinical experience. Built ibusiness to solve the problems he faced daily in his own practice.',
      icon: '👨‍⚕️',
    },
    {
      name: 'Team Member 2',
      role: 'Chief Technology Officer',
      bio: 'AI/ML specialist with expertise in healthcare integrations and HIPAA compliance.',
      icon: '👨‍💻',
    },
    {
      name: 'Team Member 3',
      role: 'VP of Healthcare Solutions',
      bio: 'Former practice manager with deep knowledge of operational efficiency in medical practices.',
      icon: '👩‍💼',
    },
    {
      name: 'Team Member 4',
      role: 'Head of Compliance',
      bio: 'Healthcare compliance expert ensuring all solutions meet HIPAA, HITECH, and state regulations.',
      icon: '⚖️',
    },
  ];

  return (
    <>
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-white via-primary-offWhite to-primary-white py-20 md:py-28">
          <div className="container text-center max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-accent-navy mb-6">
              About ibusiness
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              We're on a mission to transform how medical practices operate. From frustration to efficiency. From chaos to clarity.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-white py-20 md:py-28">
          <div className="container max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-accent-navy mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-text-secondary leading-relaxed mb-6">
                  Medical professionals are drowning in administrative overhead. Receptionists handle 100+ calls a day. Doctors spend more time on paperwork than patients. Revenue slips away due to missed appointments and poor communication.
                </p>
                <p className="text-lg text-text-secondary leading-relaxed">
                  We're building tools that eliminate the chaos. AI-powered solutions that free up your team to do what they do best: care for patients.
                </p>
              </div>
              <div className="bg-primary-offWhite rounded-xl p-10 border border-ui-border">
                <div className="space-y-6">
                  <div>
                    <p className="text-5xl font-bold text-accent-sage">500+</p>
                    <p className="text-text-secondary">Medical practices transformed</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-accent-sage">40%</p>
                    <p className="text-text-secondary">Average reduction in missed calls</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-accent-sage">$2.5M+</p>
                    <p className="text-text-secondary">Revenue recovered for our clients</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-primary-offWhite py-20 md:py-28">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-accent-navy mb-4">
                Meet the Team
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Led by healthcare professionals who understand the industry from the inside out.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-8 border border-ui-border hover:shadow-md transition-shadow duration-300 text-center"
                >
                  <p className="text-5xl mb-4">{member.icon}</p>
                  <h3 className="text-xl font-semibold text-accent-navy mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-accent-sage mb-4">
                    {member.role}
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-white py-20 md:py-28">
          <div className="container max-w-4xl">
            <h2 className="text-4xl font-bold text-accent-navy mb-12 text-center">
              Our Core Values
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-accent-sage mb-4">
                  Patient First
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Every decision we make is guided by one question: "Will this improve patient care?" We never compromise on data privacy or security.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-accent-sage mb-4">
                  Simplicity
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Healthcare is complex enough. Our solutions are intuitive, easy to implement, and require minimal training.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-accent-sage mb-4">
                  Compliance
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  HIPAA isn't optional—it's fundamental. Every system, every integration, every data flow is built with compliance first.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-accent-sage mb-4">
                  Innovation
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Healthcare tech is evolving fast. We stay ahead of the curve, constantly improving our solutions with latest AI and automation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary-offWhite py-20 md:py-28">
          <div className="container text-center max-w-2xl">
            <h2 className="text-4xl font-bold text-accent-navy mb-6">
              Ready to Join Us?
            </h2>
            <p className="text-lg text-text-secondary mb-10">
              Let's talk about how ibusiness can transform your practice.
            </p>
            <CTAButton href="/book-briefing" size="lg" variant="primary">
              Book a Briefing
            </CTAButton>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
