import type { AnchorHTMLAttributes, ReactNode } from "react";

type ActionLinkVariant = "primary" | "secondary" | "text";

const variantClassName: Record<ActionLinkVariant, string> = {
  primary:
    "border-accent bg-accent text-background hover:border-foreground hover:bg-foreground",
  secondary:
    "border-border-strong bg-surface text-foreground hover:border-accent hover:text-accent",
  text: "border-transparent bg-transparent text-foreground-secondary hover:text-foreground",
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
        "inline-flex min-h-11 items-center justify-center rounded-sm border px-4 py-2 font-mono text-[length:var(--text-technical-size)] leading-none font-semibold tracking-[0.08em] uppercase transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)]",
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
