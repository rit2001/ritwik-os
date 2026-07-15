import type { ReactNode } from "react";

export function CaseStudySection({
  children,
  id,
  title,
}: Readonly<{
  children: ReactNode;
  id: string;
  title: string;
}>) {
  return (
    <section
      className="scroll-mt-32 border-t border-border pt-10 first:border-t-0 first:pt-0"
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <h2
        className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.14em] text-accent uppercase"
        id={`${id}-title`}
      >
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
