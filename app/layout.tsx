import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Code Reviewer Pro",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: "https://code-reviewer-pro-gamma.vercel.app/",
  description:
    "AI-powered code review tool for React, Next.js, TypeScript, JavaScript, security, performance, and code quality analysis.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  }
};

export const metadata: Metadata = {
  metadataBase: new URL("https://code-reviewer-pro-gamma.vercel.app"),
  title: "Code Reviewer Pro - AI Code Review Tool for React, Next.js, TypeScript & JavaScript",
  description:
    "Code Reviewer Pro is an AI-powered code review tool that analyzes React, Next.js, TypeScript, JavaScript, GSAP, Three.js, and performance issues with structured feedback, security checks, and developer-friendly review modes.",
  keywords: [
    "AI code review",
    "code reviewer",
    "Next.js code review tool",
    "TypeScript code review",
    "JavaScript code analysis",
    "React code review",
    "security code audit",
    "performance code review",
    "GSAP review",
    "Three.js review",
    "developer tool",
    "code quality checker"
  ],
  alternates: {
    canonical: "https://code-reviewer-pro-gamma.vercel.app/",
  },
  openGraph: {
    title: "Code Reviewer Pro - AI-Powered Code Review for Modern Web Apps",
    description:
      "Paste your code, choose a review mode, and get structured AI feedback for security, performance, architecture, and best practices.",
    url: "https://code-reviewer-pro-gamma.vercel.app/",
    siteName: "Code Reviewer Pro",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Reviewer Pro - AI-Powered Code Review for Modern Web Apps",
    description:
      "Paste your code, choose a review mode, and get structured AI feedback for security, performance, architecture, and best practices.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
        <ThemeProvider>
          {children}
          <Toaster />
          <Sonner />
        </ThemeProvider>
      </body>
    </html>
  );
}
