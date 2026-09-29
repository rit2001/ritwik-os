import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { SiteShell } from "@/components/layout/SiteShell";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { launchSiteConfig } from "@/config/site";
import { getMetadataSiteUrl } from "@/lib/site-url";

import "./globals.css";

const metadataSiteUrl = getMetadataSiteUrl();

export const metadata: Metadata = {
  ...(metadataSiteUrl ? { metadataBase: metadataSiteUrl } : {}),
  title: {
    default: launchSiteConfig.metadata.defaultTitle,
    template: launchSiteConfig.metadata.titleTemplate,
  },
  description: launchSiteConfig.metadata.description,
  applicationName: launchSiteConfig.brand,
  authors: [{ name: launchSiteConfig.owner }],
  creator: launchSiteConfig.owner,
  publisher: launchSiteConfig.owner,
  category: "technology",
  keywords: [...launchSiteConfig.metadata.keywords],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  openGraph: {
    title: launchSiteConfig.metadata.defaultTitle,
    description: launchSiteConfig.metadata.description,
    siteName: launchSiteConfig.brand,
    type: "profile",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "RITWIK OS — Engineering Intelligence into Production.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: launchSiteConfig.metadata.defaultTitle,
    description: launchSiteConfig.metadata.description,
    images: ["/opengraph-image"],
  },
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <MotionProvider>
          <SiteShell>{children}</SiteShell>
        </MotionProvider>
      </body>
    </html>
  );
}
