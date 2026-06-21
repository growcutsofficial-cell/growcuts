import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GrowCuts",
  description: "Premium video editing for creators, businesses, and brands that want every second of content to work harder.",
  metadataBase: new URL("https://growcuts.com"), // placeholder domain
  manifest: "/site.webmanifest",
  openGraph: {
    title: "GrowCuts",
    description: "Premium video editing for creators, businesses, and brands that want every second of content to work harder.",
    url: "https://growcuts.com",
    siteName: "GrowCuts",
    images: [
      {
        url: "/Logo.png",
        width: 800,
        height: 600,
        alt: "GrowCuts Brand Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GrowCuts",
    description: "Premium video editing for creators, businesses, and brands that want every second of content to work harder.",
    images: ["/Logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      {/* We add pb-20 on mobile to ensure content isn't obscured by the sticky bottom menu */}
      <body className="min-h-full flex flex-col bg-obsidian text-foreground pb-20 md:pb-0 relative overflow-x-hidden" suppressHydrationWarning>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <MobileStickyCTA />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
