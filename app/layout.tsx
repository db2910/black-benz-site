import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/page-transition";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Black Benz - Premium Luxury Car Rental & Tourism | Rwanda",
  description:
    "Experience luxury travel in Rwanda with Black Benz. Premium Mercedes Benz and luxury car rental service plus exclusive tourism packages. We value the time and quality of travel.",
  keywords: "luxury car rental, Mercedes Benz rental, Rwanda tourism, premium vehicles, Black Benz, luxury travel",
  authors: [{ name: "Black Benz" }],
  creator: "Don Beni",
  publisher: "Black Benz",
  robots: "index, follow",
  openGraph: {
    title: "Black Benz - Premium Luxury Car Rental & Tourism",
    description: "Experience luxury travel in Rwanda with premium vehicles and exclusive tourism services.",
    url: "https://blackbenz.com",
    siteName: "Black Benz",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Black Benz - Premium Luxury Experience",
    description: "Luxury car rental and tourism services in Rwanda",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
  // ← viewport removed from here
  generator: "v0.dev",
};

// ← new viewport export
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
      </head>
      <body className={inter.className}>
        <PageTransition />
        {children}
      </body>
    </html>
  );
}
