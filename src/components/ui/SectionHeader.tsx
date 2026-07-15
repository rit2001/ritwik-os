import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  children,
  className,
}: Readonly<{
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  className?: string;
}>) {
  return (
    <header className={["max-w-3xl", className].filter(Boolean).join(" ")}>
      {eyebrow ? (
        <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-medium tracking-[0.14em] text-accent uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-4 text-[length:var(--text-heading-1-size)] leading-[var(--text-heading-1-line-height)] font-semibold text-balance text-foreground">
        {title}
      </h1>
      {children ? (
        <div className="mt-6 max-w-2xl text-[length:var(--text-body-large-size)] leading-[var(--text-body-large-line-height)] text-foreground-secondary">
          {children}
        </div>
      ) : null}
    </header>
  );
}
