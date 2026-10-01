import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Instrument_Sans } from "next/font/google";
import { Footer } from "@/components/footer/Footer";
import { Nav } from "@/components/navigation/Nav";
import { AppShell } from "@/components/ui/AppShell";
import { site } from "@/data/site";
import { jsonLd, siteGraph } from "@/lib/seo";
import "./globals.css";

const display = Instrument_Sans({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-instrument", display: "swap" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-inter", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s | Shreekumar B" },
  description: site.description,
  applicationName: site.name,
  keywords: ["Shreekumar B", "AI engineer", "frontend developer", "product engineer", "Next.js", "computer vision", "OCR", "LLM", "Coimbatore"],
  creator: site.name,
  category: "technology",
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
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  formatDetection: { email: false, telephone: false },
};

export const viewport: Viewport = { themeColor: "#F2F0EB", width: "device-width", initialScale: 1 };

// Runs before paint: skip the preloader on repeat visits and for reduced motion.
const preloadGate = `try{if(localStorage.getItem("sk-theme")==="neon")document.documentElement.setAttribute("data-theme","neon");}catch(e){}try{if(matchMedia("(prefers-reduced-motion: reduce)").matches||sessionStorage.getItem("sk-pre"))document.documentElement.setAttribute("data-skip-preload","")}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(siteGraph) }} />
        <AppShell>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </AppShell>
      </body>
    </html>
  );
}
