import { Geist } from "next/font/google";
import "../globals.css";
import { MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";

const geist = Geist({ subsets: ["latin"] });

type Props = {
  lang: string;
  children: React.ReactNode;
};

export default function RootHtml({ lang, children }: Props) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <head />
      <body className={`${geist.className} antialiased`}>
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
