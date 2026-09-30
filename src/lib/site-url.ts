import { launchSiteConfig } from "@/config/site";

function normalizeUrl(value: string) {
  const withProtocol = /^https?:\/\//.test(value) ? value : `https://${value}`;
  const url = new URL(withProtocol);
  url.pathname = url.pathname.replace(/\/+$/, "");

  return url;
}

function getConfiguredUrl() {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
  ];

  for (const candidate of candidates) {
    if (!candidate) {
      continue;
    }

    try {
      return normalizeUrl(candidate);
    } catch {
      continue;
    }
  }

  return undefined;
}

export function getPublicSiteUrl() {
  return getConfiguredUrl() ?? normalizeUrl(launchSiteConfig.url);
}

export function getLocalDevelopmentSiteUrl() {
  if (process.env.NODE_ENV === "development") {
    return new URL("http://localhost:3000");
  }

  return undefined;
}

export function getMetadataSiteUrl() {
  return getPublicSiteUrl();
}

export function getSitemapSiteUrl() {
  return getPublicSiteUrl();
}

export function createSiteUrl(path: string, base = getPublicSiteUrl()) {
  if (!base) {
    return undefined;
  }

  return new URL(path, base).toString();
}
