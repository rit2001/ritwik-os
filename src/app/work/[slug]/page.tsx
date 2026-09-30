import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { CaseStudyHeader } from "@/components/work/CaseStudyHeader";
import { CaseStudyNavigation } from "@/components/work/CaseStudyNavigation";
import { CaseStudyToc } from "@/components/work/CaseStudyToc";
import {
  getWorkEntryBySlug,
  getWorkNavigation,
  getWorkSlugs,
} from "@/lib/content/work";
import { getWorkStructuredData } from "@/lib/structured-data";

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
    title: {
      absolute: entry.meta.seoTitle,
    },
    description: entry.meta.seoDescription,
    alternates: {
      canonical: entry.meta.caseStudyPath,
    },
    openGraph: {
      title: entry.meta.seoTitle,
      description: entry.meta.seoDescription,
      type: "article",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${entry.meta.title} case study on RITWIK OS`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.meta.seoTitle,
      description: entry.meta.seoDescription,
      images: ["/opengraph-image"],
    },
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const entry = getWorkEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  const { Content, meta } = entry;
  const navigation = getWorkNavigation(meta.slug);

  return (
    <article className="py-16 sm:py-20">
      <JsonLd data={getWorkStructuredData(meta)} />
      <div className="mx-auto w-full max-w-[72rem] px-page-gutter">
        <CaseStudyHeader meta={meta} />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,47rem)_13.75rem] lg:items-start lg:justify-between xl:gap-16">
          <aside className="lg:order-2 lg:self-stretch">
            <CaseStudyToc items={meta.toc} />
          </aside>

          <div className="min-w-0 lg:order-1">
            <Content />
            <CaseStudyNavigation {...navigation} />
          </div>
        </div>
      </div>
    </article>
  );
}
