export function SkipLink() {
  return (
    <a
      className="fixed top-3 left-3 z-[var(--z-skip-link)] -translate-y-16 rounded-sm border border-border-strong bg-surface px-4 py-3 font-mono text-[length:var(--text-label-size)] leading-none font-semibold tracking-[0.08em] text-foreground uppercase shadow-elevation-2 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus-visible:translate-y-0"
      href="#main-content"
    >
      Skip to content
    </a>
  );
}
