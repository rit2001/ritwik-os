import type { Metadata } from "next";

import { WorkIndex } from "@/components/work/WorkIndex";
import { Container } from "@/components/ui/Container";
import { getPublishedWorkEntries } from "@/lib/content/work";

export const metadata: Metadata = {
  title: "Work — RITWIK OS",
  description:
    "Flagship engineering systems, selected earlier work, and archived portfolio context by Ritwik Biswas.",
  alternates: {
    canonical: "/work",
  },
};

export default function WorkPage() {
  return (
    <Container className="pb-16 sm:pb-20" width="wide">
      <WorkIndex publishedEntries={getPublishedWorkEntries()} />
    </Container>
  );
}
