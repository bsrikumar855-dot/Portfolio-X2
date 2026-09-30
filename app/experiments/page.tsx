import type { Metadata } from "next";
import { Lab } from "@/components/experiments/Lab";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Experiments and side builds by Shreekumar B, including the VAYU submission for ISRO Bharat Antariksh Hackathon 2026.",
};

export default function ExperimentsPage() {
  return (
    <>
      <PageHeader index="06" label="Lab" title={["The Lab"]} intro="Small builds and experiments. Only real ones are listed." />
      <div className="wrap pb-24 md:pb-40">
        <Lab level="h2" />
      </div>
    </>
  );
}
