import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";

export function SiteShell({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-[calc(100dvh-var(--layout-header-height))]"
      >
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
