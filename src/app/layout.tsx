import type { Metadata } from "next";
import { Oxanium, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";

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
  title: "22-Automations | IndusEye RS3 Radar & Enterprise AI Training",
  description: "Flagship IndusEye RS3 24 GHz millimeter-wave radar access hardware and corporate Enterprise AI Training by 22-Automations. Engineered in Ontario for commercial auto spas, fleet bays, and high-duty entrances.",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "22-Automations",
  "url": "https://22automations.com",
  "description": "Precision 24 GHz FMCW millimeter-wave radar access hardware (IndusEye RS3) and corporate Enterprise AI Training.",
  "knowsAbout": [
    "IndusEye RS3 24 GHz FMCW Radar",
    "Enterprise AI Training",
    "Edge AI & Sensor Fusion",
    "Auto Spa & Car Wash Access Automation",
    "Industrial Entrance Sensing"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oxanium.variable} ${sourceCodePro.variable} font-sans`}>
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https://images.unsplash.com https://source.unsplash.com https://ext.same-assets.com https://ugc.same-assets.com https://api.dicebear.com; media-src 'self' https://cdn.pixabay.com https://sample-videos.com; connect-src 'self' https://formsubmit.co https://unpkg.com https://*.preview.same-app.com https://*.same-app.com; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self' https://formsubmit.co mailto:;"
        />
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased bg-background text-foreground">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
