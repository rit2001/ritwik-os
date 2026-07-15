import type { AnchorHTMLAttributes, ReactNode } from "react";

type ActionLinkVariant = "primary" | "secondary" | "text";

const variantClassName: Record<ActionLinkVariant, string> = {
  primary:
    "border-accent/70 bg-accent-muted/45 text-foreground [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent [@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent [@media(hover:hover)_and_(pointer:fine)]:hover:text-background focus-visible:border-accent focus-visible:bg-accent focus-visible:text-background",
  secondary:
    "border-border-strong bg-surface/70 text-foreground [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent [@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent-muted/35 [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground focus-visible:border-accent focus-visible:bg-accent-muted/35",
  text: "border-transparent bg-transparent text-foreground-secondary [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground focus-visible:text-foreground",
};

export function ActionLink({
  children,
  className,
  variant = "secondary",
  ...props
}: Readonly<
  {
    children: ReactNode;
    className?: string;
    variant?: ActionLinkVariant;
  } & AnchorHTMLAttributes<HTMLAnchorElement>
>) {
  return (
    <a
      className={[
        "inline-flex min-h-11 items-center justify-center rounded-lg border px-4 py-2 font-mono text-[length:var(--text-technical-size)] leading-none font-semibold tracking-[0.08em] uppercase transition-[background-color,border-color,color,transform] duration-[var(--duration-base)] ease-[var(--ease-standard)] active:translate-y-px",
        variantClassName[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </a>
  );
}
