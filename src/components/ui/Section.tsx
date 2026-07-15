import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { Container } from "@/components/ui/Container";

type SectionElement = "section" | "div";

export function Section<TElement extends SectionElement = "section">({
  as,
  children,
  className,
  containerClassName,
  width = "content",
  ...props
}: Readonly<
  {
    as?: TElement;
    children: ReactNode;
    className?: string;
    containerClassName?: string;
    width?: "content" | "wide" | "reading";
  } & Omit<ComponentPropsWithoutRef<TElement>, "as" | "children" | "className">
>) {
  const Component = (as ?? "section") as ElementType;

  return (
    <Component
      className={["py-16 sm:py-20", className].filter(Boolean).join(" ")}
      {...props}
    >
      <Container className={containerClassName} width={width}>
        {children}
      </Container>
    </Component>
  );
}
