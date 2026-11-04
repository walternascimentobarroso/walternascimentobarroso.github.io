import type { Metadata } from "next";
import RootHtml from "../components/RootHtml";
import { getDictionary, locales, type Locale } from "../dictionaries";

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
  return getDictionary(lang).metadata;
}

export default async function LangLayout({ children, params }: Props) {
  const lang = (await params).lang as Locale;
  return <RootHtml lang={lang === "pt" ? "pt-BR" : "en"}>{children}</RootHtml>;
}
