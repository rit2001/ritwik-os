import type { MDXComponents } from "mdx/types";
import type { AnchorHTMLAttributes } from "react";

function MdxLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal =
    typeof props.href === "string" && /^https?:\/\//.test(props.href);

  return (
    <a
      {...props}
      className="text-accent underline decoration-border underline-offset-4 transition-colors duration-[var(--duration-base)] hover:text-foreground hover:decoration-current"
      rel={isExternal ? "noopener noreferrer" : props.rel}
      target={isExternal ? "_blank" : props.target}
    />
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1
        className="mt-12 text-[length:var(--text-heading-2-size)] leading-[var(--text-heading-2-line-height)] font-semibold text-foreground first:mt-0"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="mt-12 border-t border-border pt-8 font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.14em] text-accent uppercase"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="mt-8 text-[length:var(--text-heading-3-size)] leading-[var(--text-heading-3-line-height)] font-semibold text-foreground"
        {...props}
      />
    ),
    p: (props) => (
      <p
        className="mt-5 text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] text-foreground-secondary"
        {...props}
      />
    ),
    ul: (props) => (
      <ul
        className="mt-5 space-y-3 pl-5 text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] text-foreground-secondary"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="mt-5 list-decimal space-y-3 pl-5 text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] text-foreground-secondary"
        {...props}
      />
    ),
    li: (props) => <li className="pl-1" {...props} />,
    a: MdxLink,
    blockquote: (props) => (
      <blockquote
        className="my-8 border-l-2 border-accent bg-surface/50 px-5 py-4 text-foreground-secondary"
        {...props}
      />
    ),
    code: (props) => (
      <code
        className="rounded-xs border border-border bg-surface-muted px-1.5 py-0.5 font-mono text-[0.92em] text-foreground"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="my-6 overflow-x-auto rounded-md border border-border bg-background-elevated p-4 text-[length:var(--text-body-small-size)] leading-relaxed text-foreground-secondary"
        {...props}
      />
    ),
    hr: (props) => <hr className="my-10 border-border" {...props} />,
    table: (props) => (
      <div className="my-8 overflow-x-auto">
        <table
          className="w-full border-collapse text-left text-[length:var(--text-body-small-size)]"
          {...props}
        />
      </div>
    ),
    th: (props) => (
      <th
        className="border-b border-border px-3 py-3 font-mono text-[length:var(--text-label-size)] tracking-[0.08em] text-foreground uppercase"
        {...props}
      />
    ),
    td: (props) => (
      <td
        className="border-b border-border px-3 py-3 text-foreground-secondary"
        {...props}
      />
    ),
    ...components,
  };
}
