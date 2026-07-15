export function StatusBadge({ children }: Readonly<{ children: string }>) {
  return (
    <span className="inline-flex min-h-8 items-center rounded-xs border border-warning/60 bg-surface-muted px-3 font-mono text-[length:var(--text-label-size)] leading-none font-semibold tracking-[0.08em] text-warning uppercase">
      {children}
    </span>
  );
}
