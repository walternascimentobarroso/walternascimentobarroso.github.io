import type { Metadata } from "next";
import RootHtml from "../components/RootHtml";

export const metadata: Metadata = {
  title: "Walter Nascimento Barroso",
  description: "Portfolio of Walter Nascimento Barroso",
};

// Serves "/" (language redirect) and "/privacy" (Gruppy extension policy, Portuguese only)
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootHtml lang="pt-BR">{children}</RootHtml>;
}
