import Link from "next/link";

import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="py-20 sm:py-24">
      <Container width="content">
        <div className="max-w-3xl rounded-md border border-border bg-surface/55 p-6 sm:p-8">
          <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.14em] text-accent uppercase">
            System Fault
          </p>
          <h1 className="mt-5 text-[length:var(--text-heading-2-size)] leading-[var(--text-heading-2-line-height)] font-semibold text-balance text-foreground">
            The requested route does not exist.
          </h1>
          <p className="mt-5 text-[length:var(--text-body-large-size)] leading-[var(--text-body-large-line-height)] text-foreground-secondary">
            The route may have moved, or the requested system has not been
            published.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-accent/70 bg-accent-muted/45 px-4 py-2 font-mono text-[length:var(--text-technical-size)] leading-none font-semibold tracking-[0.08em] text-foreground uppercase transition-colors duration-[var(--duration-base)] hover:border-accent hover:bg-accent hover:text-background"
              href="/"
            >
              Return Home
            </Link>
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border-strong bg-surface/70 px-4 py-2 font-mono text-[length:var(--text-technical-size)] leading-none font-semibold tracking-[0.08em] text-foreground uppercase transition-colors duration-[var(--duration-base)] hover:border-accent hover:bg-accent-muted/35"
              href="/work"
            >
              View Work
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
