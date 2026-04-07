'use client';

import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import CTAButton from '@/components/shared/CTAButton';
import { useState } from 'react';
import { useBookBriefing } from '@/lib/hooks/useBookBriefing';

export default function BookBriefingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    clinic: '',
    role: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { submit, loading: isLoading } = useBookBriefing();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await submit({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        clinicName: formData.clinic,
        role: formData.role,
        message: formData.message || undefined,
      });

      if (response && response.leadId) {
        // Track analytics
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'form_submission', {
            form_name: 'book_briefing',
            lead_id: response.leadId,
            clinic_name: formData.clinic,
            role: formData.role,
          });
          
          window.gtag('event', 'conversion', {
            value: 1,
            currency: 'USD',
            transaction_id: response.leadId,
          });
        }

        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', phone: '', clinic: '', role: '', message: '' });
        }, 3000);
      } else {
        setError('Failed to submit form. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Form submission error:', err);
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-white via-primary-offWhite to-primary-white py-20 md:py-28">
          <div className="container text-center max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-accent-navy mb-6">
              Book a Briefing
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              Schedule a personalized 15-minute call with our team. We'll discuss your practice's challenges and show you how ibusiness can help.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="bg-white py-20 md:py-28">
          <div className="container max-w-2xl">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-accent-navy mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-ui-border focus:outline-none focus:border-accent-sage focus:ring-2 focus:ring-accent-sage focus:ring-opacity-20 transition-all duration-300"
                    placeholder="Dr. John Smith"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-accent-navy mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-ui-border focus:outline-none focus:border-accent-sage focus:ring-2 focus:ring-accent-sage focus:ring-opacity-20 transition-all duration-300"
                    placeholder="john@clinic.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-accent-navy mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-ui-border focus:outline-none focus:border-accent-sage focus:ring-2 focus:ring-accent-sage focus:ring-opacity-20 transition-all duration-300"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Clinic */}
                <div>
                  <label
                    htmlFor="clinic"
                    className="block text-sm font-medium text-accent-navy mb-2"
                  >
                    Clinic / Practice Name
                  </label>
                  <input
                    type="text"
                    id="clinic"
                    name="clinic"
                    value={formData.clinic}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-ui-border focus:outline-none focus:border-accent-sage focus:ring-2 focus:ring-accent-sage focus:ring-opacity-20 transition-all duration-300"
                    placeholder="Elite Medical Group"
                  />
                </div>

                {/* Role */}
                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-accent-navy mb-2"
                  >
                    Your Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-ui-border focus:outline-none focus:border-accent-sage focus:ring-2 focus:ring-accent-sage focus:ring-opacity-20 transition-all duration-300"
                  >
                    <option value="">Select your role...</option>
                    <option value="doctor">Medical Doctor / Owner</option>
                    <option value="practice-manager">Practice Manager</option>
                    <option value="office-manager">Office Manager</option>
                    <option value="administrator">Administrator</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-accent-navy mb-2"
                  >
                    Tell us about your biggest challenge (optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-ui-border focus:outline-none focus:border-accent-sage focus:ring-2 focus:ring-accent-sage focus:ring-opacity-20 transition-all duration-300 resize-none"
                    placeholder="We're struggling with... or We're interested in..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-accent-sage text-white py-3 rounded-lg font-semibold hover:bg-accent-hover transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Scheduling...' : 'Schedule Briefing'}
                </button>

                {/* Privacy Note */}
                <p className="text-xs text-text-secondary text-center">
                  We respect your privacy. Your information will only be used to schedule your briefing.
                </p>
              </form>
            ) : (
              <div className="bg-primary-offWhite rounded-xl p-12 text-center border-2 border-accent-sage">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-3xl font-bold text-accent-navy mb-4">
                  Thanks for scheduling!
                </h2>
                <p className="text-lg text-text-secondary mb-4">
                  We've received your information and will contact you shortly to confirm your briefing time.
                </p>
                <p className="text-sm text-text-secondary">
                  Expected call time: Within 24 business hours
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Info Section */}
        <section className="bg-primary-offWhite py-20 md:py-28">
          <div className="container max-w-3xl">
            <h2 className="text-3xl font-bold text-accent-navy mb-12 text-center">
              What to Expect
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">⏱️</div>
                <h3 className="text-xl font-semibold text-accent-navy mb-2">
                  15 Minutes
                </h3>
                <p className="text-text-secondary">
                  A quick, no-pressure call to understand your needs.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-accent-navy mb-2">
                  Custom Recommendations
                </h3>
                <p className="text-text-secondary">
                  We'll recommend which solutions fit your practice best.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-semibold text-accent-navy mb-2">
                  No Commitment
                </h3>
                <p className="text-text-secondary">
                  Free consultation with zero obligation.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
