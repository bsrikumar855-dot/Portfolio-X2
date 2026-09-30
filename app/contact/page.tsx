import type { Metadata } from "next";
import { Contact } from "@/components/contact/Contact";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact | Shreekumar B", url: "/contact", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Shreekumar B: AI & Frontend Developer" }] },
  description: "Get in touch with Shreekumar B. Available for opportunities.",
};

export default function ContactPage() {
  return <Contact page />;
}
