import type { MetadataRoute } from "next";

import { launchSiteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: launchSiteConfig.metadata.defaultTitle,
    short_name: launchSiteConfig.brand,
    description: launchSiteConfig.metadata.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#08090b",
    theme_color: "#08090b",
  };
}
