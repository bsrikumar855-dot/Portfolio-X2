import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/footer/Footer";
import { Nav } from "@/components/navigation/Nav";
import { AppShell } from "@/components/ui/AppShell";
import { site } from "@/data/site";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s | Shreekumar B" },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: site.url,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#F2F0EB", width: "device-width", initialScale: 1 };

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: "AI Builder and Frontend Developer",
  address: { "@type": "PostalAddress", addressLocality: "Coimbatore", addressCountry: "IN" },
  sameAs: [site.github, site.linkedin],
  alumniOf: { "@type": "CollegeOrUniversity", name: site.education.school },
};

// Runs before paint: skip the preloader on repeat visits and for reduced motion.
const preloadGate = `try{if(localStorage.getItem("sk-theme")==="neon")document.documentElement.setAttribute("data-theme","neon");}catch(e){}try{if(matchMedia("(prefers-reduced-motion: reduce)").matches||sessionStorage.getItem("sk-pre"))document.documentElement.setAttribute("data-skip-preload","")}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preloadGate }} />
        <noscript>
          <style>{`.preloader{display:none!important}[data-reveal]{transform:none!important;opacity:1!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a href="#main" className="skip-link meta !text-bg">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
        <AppShell>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </AppShell>
      </body>
    </html>
  );
}
