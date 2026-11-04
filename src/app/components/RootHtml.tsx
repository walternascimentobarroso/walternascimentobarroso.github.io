import { Inter } from "next/font/google";
import "../globals.css";
import { MotionConfig } from "motion/react";
import { ThemeProvider } from "./theme-provider";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  lang: string;
  children: React.ReactNode;
};

export default function RootHtml({ lang, children }: Props) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}
