'use client';

import Link from 'next/link';
import { contact, socialLinks } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-offWhite border-t border-ui-border mt-auto">
      <div className="container py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent-sage flex items-center justify-center">
                <span className="text-white font-bold text-lg">iB</span>
              </div>
              <span className="font-semibold text-accent-navy">ibusiness</span>
            </div>
            <p className="text-sm text-text-secondary">
              Healthcare AI solutions for modern medical practices.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold text-accent-navy mb-4">Solutions</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/solutions#ai-agents" className="text-text-secondary hover:text-accent-sage">
                  AI Agents
                </Link>
              </li>
              <li>
                <Link href="/solutions#websites" className="text-text-secondary hover:text-accent-sage">
                  Medical Websites
                </Link>
              </li>
              <li>
                <Link href="/solutions#omnichannel" className="text-text-secondary hover:text-accent-sage">
                  Omnichannel Hubs
                </Link>
              </li>
              <li>
                <Link href="/solutions#integrations" className="text-text-secondary hover:text-accent-sage">
                  EHR Integrations
                </Link>
              </li>
              <li>
                <Link href="/solutions#custom" className="text-text-secondary hover:text-accent-sage">
                  Custom Software
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-accent-navy mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-text-secondary hover:text-accent-sage">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-accent-sage">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-text-secondary hover:text-accent-sage">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-text-secondary hover:text-accent-sage">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-accent-navy mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`mailto:${contact.email}`} className="text-text-secondary hover:text-accent-sage">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${contact.phone}`} className="text-text-secondary hover:text-accent-sage">
                  {contact.phone}
                </a>
              </li>
              <li>
                <p className="text-text-secondary">{contact.address}</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-ui-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-text-secondary">
              © {currentYear} ibusiness. All rights reserved. HIPAA Compliant.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent-sage transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent-sage transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 9 0 9-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0323 3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
