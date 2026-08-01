import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope, Caveat } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { MusicProvider } from "@/components/providers/MusicProvider";
import { MusicControl } from "@/components/ui/MusicControl";
import { MouseFollower } from "@/components/animations/MouseFollower";

// Reduced font weights: previously loaded 4 + 4 + 3 weights,
// now down to the essential 3 + 3 + 2. Slimmer font payload,
// faster FCP/TTI without a visible difference.
const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

const script = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-script",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: [{ url: "/images/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${script.variable}`}>
      <body className="font-body antialiased bg-bg text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:top-4 focus:left-4 focus:bg-white focus:px-4 focus:py-2 focus:rounded-full focus:shadow-lg"
        >
          Skip to content
        </a>
        <MusicProvider>
          <SmoothScrollProvider>
            <MouseFollower />
            <main id="main-content">{children}</main>
            <MusicControl />
          </SmoothScrollProvider>
        </MusicProvider>
      </body>
    </html>
  );
}