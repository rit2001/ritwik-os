import { ImageResponse } from "next/og";

import { launchSiteConfig } from "@/config/site";

export const alt = "RITWIK OS — Engineering Intelligence into Production.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#08090b",
        color: "#f5f7fa",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        padding: "68px",
        width: "100%",
      }}
    >
      <div
        style={{
          borderTop: "1px solid #3a424e",
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "26px",
        }}
      >
        <span
          style={{
            color: "#8fb8ff",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.12em",
          }}
        >
          {launchSiteConfig.brand}
        </span>
        <span
          style={{
            color: "#8f9aa8",
            fontSize: 24,
            letterSpacing: "0.08em",
          }}
        >
          ENGINEERING CONTROL PLANE
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            color: "#f5f7fa",
            fontSize: 82,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 0.95,
            maxWidth: 980,
          }}
        >
          {launchSiteConfig.tagline}
        </div>
        <div
          style={{
            color: "#c8d0da",
            display: "flex",
            flexDirection: "column",
            fontSize: 34,
            gap: 6,
            lineHeight: 1.25,
            maxWidth: 900,
          }}
        >
          <span>{launchSiteConfig.owner}</span>
          <span>Software Engineer · AI Systems · Backend · Cloud</span>
        </div>
      </div>

      <div
        style={{
          alignItems: "center",
          borderTop: "1px solid #242a33",
          color: "#8f9aa8",
          display: "flex",
          fontSize: 24,
          justifyContent: "space-between",
          paddingTop: "24px",
        }}
      >
        <span>{launchSiteConfig.location}</span>
        <span style={{ color: "#8fb8ff" }}>
          Engineering Intelligence into Production.
        </span>
      </div>
    </div>,
    size,
  );
}
