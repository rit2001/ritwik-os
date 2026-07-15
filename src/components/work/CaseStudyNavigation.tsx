import { ActionLink } from "@/components/ui/ActionLink";

export function CaseStudyNavigation() {
  return (
    <nav
      className="mt-12 flex flex-wrap gap-3 border-t border-border pt-8"
      aria-label="Case study navigation"
    >
      <ActionLink href="/work" variant="secondary">
        Back to Work
      </ActionLink>
      <ActionLink href="/" variant="text">
        Home
      </ActionLink>
    </nav>
  );
}
