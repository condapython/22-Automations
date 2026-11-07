import type { Metadata } from "next";
import { Oxanium, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import geoAssets from "./geo-assets.json"; // Import the GEO assets

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "22-Automations | Automation, Robotics & AI Systems in GTA",
  description: "Precision sensing, industrial automation, and custom AI workflows with 22-Automations. Expert IoT engineering, radar hardware, and mobile platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oxanium.variable} ${sourceCodePro.variable} font-sans`}>
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
        {/* Dynamic GEO Schema Injection */}
        {geoAssets && geoAssets.json_ld_schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(geoAssets.json_ld_schema),
            }}
          />
        )}
      </head>
      <body suppressHydrationWarning className="antialiased bg-background text-foreground">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
