import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { SiteShell } from "@/components/layout/SiteShell";
import { profile } from "@/data/profile";
import { siteConfig } from "@/data/site";

import "./globals.css";

export const metadata: Metadata = {
  title: `${profile.editorialName} — ${profile.compactTitle}`,
  description: profile.seoDescription,
  applicationName: siteConfig.name,
  authors: [{ name: profile.editorialName }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
