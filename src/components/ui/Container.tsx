import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ContainerWidth = "content" | "wide" | "reading";

const widthClassName: Record<ContainerWidth, string> = {
  content: "max-w-[var(--layout-content-width)]",
  wide: "max-w-[var(--layout-wide-content-width)]",
  reading: "max-w-[var(--layout-reading-width)]",
};

export function Container({
  children,
  className,
  width = "content",
  ...props
}: Readonly<
  {
    children: ReactNode;
    className?: string;
    width?: ContainerWidth;
  } & Omit<ComponentPropsWithoutRef<"div">, "children" | "className">
>) {
  return (
    <div
      className={[
        "mx-auto w-full px-page-gutter",
        widthClassName[width],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
