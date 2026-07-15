import type { ReactNode } from "react";

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
}: Readonly<{
  children: ReactNode;
  className?: string;
  width?: ContainerWidth;
}>) {
  return (
    <div
      className={[
        "mx-auto w-full px-page-gutter",
        widthClassName[width],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
