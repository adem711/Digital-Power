import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Semi_Condensed, IBM_Plex_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MobileBar } from "@/components/mobile-bar";
import { SITE } from "@/lib/content";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});
const barlowSemi = Barlow_Semi_Condensed({
  variable: "--font-barlow-semi",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Digital Power — Installation solaire en Tunisie",
    template: "%s | Digital Power",
  },
  description: SITE.description,
  applicationName: "Digital Power",
  openGraph: {
    type: "website",
    locale: "fr_TN",
    siteName: "Digital Power",
    title: "Digital Power — Installation solaire en Tunisie",
    description: SITE.description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "./" },
};

export const viewport: Viewport = {
  themeColor: "#0F1B2D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${barlow.variable} ${barlowSemi.variable} ${plexMono.variable}`}>
      <body>
        <a
          href="#contenu"
          className="fixed top-3 left-3 z-50 -translate-y-24 rounded-full bg-sun-400 px-5 py-3 font-semibold text-night focus:translate-y-0"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
