import type { Metadata } from "next";
import { Contact } from "@/components/contact/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Shreekumar B. Available for opportunities.",
};

export default function ContactPage() {
  return <Contact page />;
}
