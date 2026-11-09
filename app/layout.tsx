import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/layout/GrainOverlay";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Communication Intelligence and Executive Advisory",
    template: "%s | Goldapples Media Associates",
  },
  description:
    "Goldapples Media Associates is a communication advisory, executive education, and development communication firm helping leaders and institutions strengthen understanding, trust, alignment, and action.",
  openGraph: {
    title: "Communication Intelligence and Executive Advisory",
    description:
      "Goldapples Media Associates is a communication advisory, executive education, and development communication firm helping leaders and institutions strengthen understanding, trust, alignment, and action.",
    siteName: "Goldapples Media Associates",
    type: "website",
  },
  icons: {
    icon: "/assets/logo/goldapples-icon-512.png",
    shortcut: "/assets/logo/goldapples-icon-512.png",
    apple: "/assets/logo/goldapples-icon-512.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="text-graphite flex min-h-full flex-col bg-white font-sans" suppressHydrationWarning>
        <GrainOverlay />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
