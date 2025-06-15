import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Shopify Test App",
    template: "%s | Shopify Test App",
  },
  description:
    "A modern e-commerce application built with Next.js and Shopify integration",
  keywords: [
    "shopify",
    "ecommerce",
    "nextjs",
    "react",
    "online store",
    "shopping",
  ],
  authors: [{ name: "Hao" }],
  creator: "Hao",
  publisher: "Hao Development",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourapp.com",
    title: "Shopify Test App",
    description:
      "A modern e-commerce application built with Next.js and Shopify integration",
    siteName: "Shopify Test App",
    images: [
      {
        url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=630&fit=crop&auto=format",
        width: 1200,
        height: 630,
        alt: "Modern e-commerce shopping experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopify Test App",
    description:
      "A modern e-commerce application built with Next.js and Shopify integration",
    creator: "@hao_dev",
    images: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=630&fit=crop&auto=format",
    ],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="md:px-4 md:py-12 px-2 py-6">{children}</div>
      </body>
    </html>
  );
}
