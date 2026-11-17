import type { Metadata } from "next";
import RootHtml from "../components/RootHtml";
import { getDictionary, type Locale, locales } from "../dictionaries";
import { siteUrl } from "../site";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const { title, description } = getDictionary(lang).metadata;
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", pt: "/pt" },
    },
    openGraph: {
      type: "website",
      url: `/${lang}`,
      title,
      description,
      locale: lang === "pt" ? "pt_BR" : "en_US",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/twitter-image.png"],
    },
  };
}

export default async function LangLayout({ children, params }: Props) {
  const lang = (await params).lang as Locale;
  return <RootHtml lang={lang === "pt" ? "pt-BR" : "en"}>{children}</RootHtml>;
}
