import type { Metadata } from "next";
import RootHtml from "../components/RootHtml";
import { getDictionary, locales, type Locale } from "../dictionaries";
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
  const image = "/images/hero-image.png";
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
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
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function LangLayout({ children, params }: Props) {
  const lang = (await params).lang as Locale;
  return <RootHtml lang={lang === "pt" ? "pt-BR" : "en"}>{children}</RootHtml>;
}
