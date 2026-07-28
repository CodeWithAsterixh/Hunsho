import type { Metadata } from "next";
import { Bodoni_Moda, Manrope, Space_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/src/shared/Header";
import { Footer } from "@/src/shared/Footer";
import { CursorFollower } from "@/src/shared/CursorFollower";
import { ScrollProgressBar } from "@/src/shared/ScrollProgressBar";

// Variable font — optical-size axis handled via CSS custom properties in
// tokens-typo.css (--font-display-settings-display / -headline).
const displayFont = Bodoni_Moda({
  variable: "--font-display-loaded",
  subsets: ["latin"],
});

const bodyFont = Manrope({
  variable: "--font-body-loaded",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Space Mono is not a variable font on Google Fonts — only 400/700 exist.
const monoFont = Space_Mono({
  variable: "--font-mono-loaded",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// PLACEHOLDER metadata — title reflects the confirmed brand name, but the
// final title/description/schema still depend on real keyword research
// once the category structure (PRD §5) is locked. Do not treat as final SEO copy.
export const metadata: Metadata = {
  title: "Hunsho — Fine Jewelry",
  description: "Site content and metadata pending PRD.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClasses = `${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`;
  return (
    // data-scroll-behavior="smooth" restores Next.js's pre-16 navigation
    // behavior (instant scroll-to-top on route change) even though
    // reset.css sets `scroll-behavior: smooth` globally for in-page anchors.
    // See: Next.js 16 upgrade guide, "Scroll Behavior Override".
    <html lang="en" data-scroll-behavior="smooth" className={`${fontClasses} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-text-primary)] font-body">
        <ScrollProgressBar />
        <CursorFollower />
        <Header />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
