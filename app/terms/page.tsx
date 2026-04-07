import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export const metadata = {
  title: 'Terms of Service - ibusiness Doc AI',
  description: 'Terms of service for ibusiness Doc AI healthcare solutions',
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-20">
        <div className="container max-w-4xl py-20 md:py-28">
          <h1 className="text-5xl font-bold text-accent-navy mb-8">Terms of Service</h1>
          <div className="prose prose-lg max-w-none text-text-secondary space-y-6">
            <section>
              <h2 className="text-3xl font-semibold text-accent-navy mb-4">
                1. Agreement to Terms
              </h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision
                of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-accent-navy mb-4">
                2. Use License
              </h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software)
                on ibusiness.com for personal, non-commercial transitory viewing only. This is the grant of a
                license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on the website</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
                <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-accent-navy mb-4">
                3. Disclaimer
              </h2>
              <p>
                The materials on ibusiness.com are provided on an 'as is' basis. ibusiness Doc AI makes no
                warranties, expressed or implied, and hereby disclaims and negates all other warranties including,
                without limitation, implied warranties or conditions of merchantability, fitness for a particular
                purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-accent-navy mb-4">
                4. Limitations
              </h2>
              <p>
                In no event shall ibusiness Doc AI or its suppliers be liable for any damages (including, without
                limitation, damages for loss of data or profit, or due to business interruption) arising out of the
                use or inability to use the materials on ibusiness.com, even if we or an authorized representative
                has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-accent-navy mb-4">
                5. Accuracy of Materials
              </h2>
              <p>
                The materials appearing on ibusiness.com could include technical, typographical, or photographic
                errors. ibusiness Doc AI does not warrant that any of the materials on our website are accurate,
                complete, or current. ibusiness Doc AI may make changes to the materials contained on our website
                at any time without notice. However, ibusiness Doc AI does not commit to updating the materials.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-accent-navy mb-4">
                6. Links
              </h2>
              <p>
                ibusiness Doc AI has not reviewed all of the sites linked to our website and is not responsible
                for the contents of any such linked site. The inclusion of any link does not imply endorsement by
                us of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-accent-navy mb-4">
                7. Modifications
              </h2>
              <p>
                ibusiness Doc AI may revise these terms of service for our website at any time without notice. By
                using this website, you are agreeing to be bound by the then current version of these terms of
                service.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-accent-navy mb-4">
                8. Governing Law
              </h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of the
                United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that
                location.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-accent-navy mb-4">
                9. HIPAA Business Associate Agreement
              </h2>
              <p>
                For customers in the healthcare industry or those handling Protected Health Information (PHI),
                ibusiness Doc AI operates under a Business Associate Agreement (BAA) that complies with HIPAA
                requirements.
              </p>
              <p>
                Key provisions include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Safeguards for the privacy and security of PHI</li>
                <li>Limitations on use and disclosure of PHI</li>
                <li>Breach notification procedures</li>
                <li>Compliance with HIPAA Security Rule requirements</li>
                <li>Business Associate compliance certifications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-accent-navy mb-4">
                10. Data Protection Compliance
              </h2>
              <p>
                ibusiness Doc AI maintains compliance with:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>HIPAA:</strong> Health Insurance Portability and Accountability Act</li>
                <li><strong>HITECH Act:</strong> Health Information Technology for Economic and Clinical Health</li>
                <li><strong>GDPR:</strong> General Data Protection Regulation (for EU users)</li>
                <li><strong>CCPA:</strong> California Consumer Privacy Act (for CA residents)</li>
                <li><strong>SOC 2 Type II:</strong> Security and availability controls</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-accent-navy mb-4">
                11. Contact Information
              </h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-primary-offWhite p-6 rounded-lg">
                <p><strong>Email:</strong> legal@ibusiness.com</p>
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
