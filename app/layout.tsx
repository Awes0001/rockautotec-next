import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/navbar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#dc2626",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rockautotec.com"),
  title: {
    default: "RockAutoTec — Professional Auto Parts | OEM & Aftermarket",
    template: "%s | RockAutoTec",
  },
  description:
    "Shop 150,000+ OEM and aftermarket auto parts at RockAutoTec. Trusted by repair shops, fleets, and mechanics nationwide. Free shipping on orders $75+. Expert fitment guarantee.",
  keywords: [
    "auto parts",
    "car parts",
    "OEM auto parts",
    "aftermarket parts",
    "brake pads",
    "spark plugs",
    "engine parts",
    "suspension parts",
    "auto parts online",
    "discount auto parts",
    "auto parts store",
    "mechanic supplies",
    "fleet auto parts",
  ],
  authors: [{ name: "RockAutoTec LLC" }],
  creator: "RockAutoTec LLC",
  publisher: "RockAutoTec LLC",
  category: "Automotive",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.rockautotec.com",
    siteName: "RockAutoTec",
    title: "RockAutoTec — Professional Auto Parts",
    description:
      "Shop 150,000+ OEM and aftermarket auto parts. Trusted by repair shops and fleets nationwide. Free shipping on orders $75+.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RockAutoTec — Professional Auto Parts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RockAutoTec — Professional Auto Parts",
    description: "Shop 150,000+ OEM and aftermarket auto parts. Free shipping on orders $75+.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.rockautotec.com",
  },
  verification: {
    google: "rockautotec-google-site-verification",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-white min-h-screen`}
      >
        <Providers>
          <Navbar />
          <main>{children}</main>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-red-600 focus:px-4 focus:py-2 focus:text-white focus:font-semibold"
          >
            Skip to main content
          </a>
        </Providers>
      </body>
    </html>
  );
}
