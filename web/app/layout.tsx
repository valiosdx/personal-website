import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";

import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { getSiteSettings, getSiteUrl } from "@/lib/sanity/siteSettings";

import "lenis/dist/lenis.css";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

const fallbackMetadata = {
  siteName: "Ferdi Anggriawan",
  title: "Ferdi Anggriawan",
  description: "Portfolio",
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteName = settings?.siteName || fallbackMetadata.siteName;
  const title = settings?.seoTitle || fallbackMetadata.title;
  const description = settings?.seoDescription || fallbackMetadata.description;
  const metadataBase = getSiteUrl();
  const faviconUrl = settings?.favicon?.asset?.url;
  const ogImageUrl = settings?.ogImage?.asset?.url;
  const ogImageDimensions = settings?.ogImage?.asset?.metadata?.dimensions;
  const openGraphImages: NonNullable<Metadata["openGraph"]>["images"] =
    ogImageUrl
      ? [
          {
            url: ogImageUrl,
            width: ogImageDimensions?.width,
            height: ogImageDimensions?.height,
            alt: `${title} preview image`,
          },
        ]
      : undefined;

  return {
    metadataBase,

    title: {
      default: title,
      template: `%s | ${siteName}`,
    },

    description,

    alternates: metadataBase
      ? {
          canonical: "/",
        }
      : undefined,

    icons: faviconUrl
      ? {
          icon: faviconUrl,
          shortcut: faviconUrl,
          apple: faviconUrl,
        }
      : undefined,

    openGraph: {
      type: "website",
      url: metadataBase ? "/" : undefined,
      siteName,
      title,
      description,
      locale: "en_US",
      images: openGraphImages,
    },

    twitter: {
      card: ogImageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${interTight.variable}`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
