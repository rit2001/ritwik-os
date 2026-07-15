import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteConfig } from "@/data/site";

export default function Home() {
  return (
    <Section className="flex min-h-[calc(100dvh-var(--layout-header-height))] items-center">
      <SectionHeader eyebrow={siteConfig.name} title={siteConfig.tagline}>
        <p>Foundation in progress.</p>
      </SectionHeader>
    </Section>
  );
}
