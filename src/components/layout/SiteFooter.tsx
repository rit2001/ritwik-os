import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";
import { getSocialLink } from "@/data/social-links";
import { siteConfig } from "@/data/site";

export function SiteFooter() {
  const github = getSocialLink("github");
  const linkedIn = getSocialLink("linkedin");

  return (
    <footer className="border-t border-border bg-background">
      <Container
        className="flex flex-col gap-8 py-8 sm:flex-row sm:items-center sm:justify-between"
        width="wide"
      >
        <div>
          <p className="font-mono text-[length:var(--text-technical-size)] leading-[var(--text-technical-line-height)] font-semibold tracking-[0.14em] text-foreground uppercase">
            {siteConfig.name}
          </p>
          <p className="mt-2 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-muted">
            {siteConfig.tagline}
          </p>
        </div>

        <nav aria-label="Footer links">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.08em] uppercase">
            {github ? (
              <li>
                <a
                  className="text-foreground-secondary transition-colors duration-[var(--duration-base)] hover:text-foreground"
                  href={github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Ritwik Biswas on GitHub"
                >
                  {github.label}
                </a>
              </li>
            ) : null}
            {linkedIn ? (
              <li>
                <a
                  className="text-foreground-secondary transition-colors duration-[var(--duration-base)] hover:text-foreground"
                  href={linkedIn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Ritwik Biswas on LinkedIn"
                >
                  {linkedIn.label}
                </a>
              </li>
            ) : null}
            <li>
              <a
                className="text-foreground-secondary transition-colors duration-[var(--duration-base)] hover:text-foreground"
                href={`mailto:${profile.email}`}
                aria-label="Email Ritwik Biswas"
              >
                Email
              </a>
            </li>
            <li>
              <a
                className="text-foreground-secondary transition-colors duration-[var(--duration-base)] hover:text-foreground"
                href={profile.resumePath}
                aria-label="View Ritwik Biswas resume PDF"
              >
                Resume
              </a>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
