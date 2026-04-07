import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { healthcareOrganizationSchema, localBusinessSchema } from "@/lib/seo";
import Chatbot from "@/components/Chatbot";
import Analytics from "@/components/Analytics";
import "../styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "ibusiness Doc AI - Healthcare AI Solutions",
  description:
    "Transform your medical practice with AI-powered patient communication, omnichannel hubs, and seamless EHR integrations. HIPAA compliant healthcare technology.",
  keywords: [
    "healthcare AI",
    "medical practice management",
    "patient communication",
    "EHR integration",
    "HIPAA compliant",
  ],
  robots: "index, follow",
  alternates: {
    canonical: "https://ibusiness.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ibusiness.com",
    title: "ibusiness Doc AI - Healthcare AI Solutions",
    description: "Transform your medical practice with AI-powered solutions",
    siteName: "ibusiness Doc AI",
    images: [
      {
        url: "https://ibusiness.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "ibusiness Doc AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ibusiness Doc AI",
    description: "Healthcare AI solutions for modern medical practices",
    images: ["https://ibusiness.com/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#6B8E7F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-US"
      className={`${inter.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Schema.org Structured Data */}
        <Script
          id="healthcare-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(healthcareOrganizationSchema),
          }}
        />
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-primary-white text-text-primary font-sans">
        <Analytics />
        {children}
        <Chatbot />
      </body>
    </html>
  );
}


