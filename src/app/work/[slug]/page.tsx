import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyHeader } from "@/components/work/CaseStudyHeader";
import { CaseStudyNavigation } from "@/components/work/CaseStudyNavigation";
import { getWorkEntryBySlug, getWorkSlugs } from "@/lib/content/work";

type WorkDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getWorkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWorkEntryBySlug(slug);

  if (!entry) {
    return {};
  }

  return {
    title: entry.meta.seoTitle,
    description: entry.meta.seoDescription,
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const entry = getWorkEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  const { Content, meta } = entry;

  return (
    <article className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[var(--layout-content-width)] px-page-gutter">
        <CaseStudyHeader meta={meta} />
        <div className="mx-auto mt-12 max-w-[var(--layout-reading-width)]">
          <Content />
          <CaseStudyNavigation />
        </div>
      </div>
    </article>
  );
}
