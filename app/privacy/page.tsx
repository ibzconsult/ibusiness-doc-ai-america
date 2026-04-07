import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export const metadata = {
  title: 'Privacy Policy - ibusiness Doc AI',
  description: 'Privacy policy for ibusiness Doc AI healthcare solutions',
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-20">
        <div className="container max-w-4xl py-20 md:py-28">
          <h1 className="text-5xl font-bold text-accent-navy mb-8">Privacy Policy</h1>
          <div className="prose prose-lg max-w-none text-text-secondary space-y-6">
            <section>
              <h2 className="text-3xl font-semibold text-accent-navy mb-4">
                1. Introduction
              </h2>
              <p>
                ibusiness Doc AI ("we," "us," or "our") operates the ibusiness.com website (the "Service").
                This page informs you of our policies regarding the collection, use, and disclosure of personal
                data when you use our Service and the choices you have associated with that data.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-accent-navy mb-4">
                2. Information Collection and Use
              </h2>
              <p>
                We collect several different types of information for various purposes to provide and improve our
                Service to you.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Personal Data:</strong> Name, email address, phone number, clinic name, role</li>
                <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, time and date of visits</li>
                <li><strong>Healthcare Data:</strong> Only processed when you explicitly provide it for our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-accent-navy mb-4">
                3. HIPAA Compliance
              </h2>
              <p>
                ibusiness Doc AI is committed to HIPAA (Health Insurance Portability and Accountability Act)
                compliance. When handling Protected Health Information (PHI):
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All PHI is encrypted both in transit and at rest</li>
                <li>We maintain Business Associate Agreements (BAAs) with all third-party service providers</li>
                <li>Access to PHI is restricted to authorized personnel only</li>
                <li>We maintain comprehensive audit logs of all PHI access</li>
                <li>We conduct regular security assessments and penetration testing</li>
                <li>Data breach notification procedures are in place per HIPAA requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-accent-navy mb-4">
                4. Data Security
              </h2>
              <p>
                The security of your data is important to us, but remember that no method of transmission over
                the Internet or method of electronic storage is 100% secure. While we strive to use commercially
                acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
              <p>
                <strong>Security Measures:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>TLS/SSL encryption for all data in transit</li>
                <li>AES-256 encryption for data at rest</li>
                <li>Regular security patches and updates</li>
                <li>Multi-factor authentication for account access</li>
                <li>Network firewalls and intrusion detection systems</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-accent-navy mb-4">
                5. Use of Data
              </h2>
              <p>
                ibusiness Doc AI uses the collected data for various purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information for service improvement</li>
                <li>To monitor the usage of our Service</li>
                <li>To detect, prevent, and address technical and security issues</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-accent-navy mb-4">
                6. Data Retention
              </h2>
              <p>
                We retain your personal data only for as long as necessary to provide our Service and comply
                with legal obligations. You may request deletion of your data at any time, subject to legal
                retention requirements.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-accent-navy mb-4">
                7. Your Rights
              </h2>
              <p>
                You have the following rights regarding your personal data:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Right to access your personal data</li>
                <li>Right to correct inaccurate data</li>
                <li>Right to request deletion of your data</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-accent-navy mb-4">
                8. Third-Party Service Providers
              </h2>
              <p>
                We may share your information with third-party service providers who assist us in operating our
                website and conducting our business, subject to confidentiality agreements and HIPAA BAAs when
                applicable.
              </p>
              <p>
                Our current service providers include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>AWS (Cloud hosting)</li>
                <li>Twilio (Communications)</li>
                <li>SendGrid (Email)</li>
                <li>n8n (Integration platform)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-accent-navy mb-4">
                9. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-primary-offWhite p-6 rounded-lg">
                <p><strong>Email:</strong> privacy@ibusiness.com</p>
                <p><strong>Phone:</strong> +1-XXX-XXX-XXXX</p>
                <p><strong>Mailing Address:</strong> [To be filled]</p>
              </div>
            </section>

            <section>
              <p className="text-sm text-text-secondary">
                Last updated: April 5, 2026
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
