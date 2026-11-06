import AboutSection from "../components/AboutSection";
import AchievementsSection from "../components/AchievementsSection";
import EmailSection from "../components/EmailSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import ProjectsSection from "../components/ProjectsSection";
import { getDictionary, type Locale } from "../dictionaries";
import profile from "../profile.json";
import { siteUrl } from "../site";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function Home({ params }: Props) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: dict.metadata.title,
    url: `${siteUrl}/${lang}`,
    sameAs: [profile.social.github, profile.social.linkedin],
  };

  return (
    <main className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD estático gerado no build
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-20 focus:rounded-sm focus:bg-white focus:px-4 focus:py-2 focus:text-zinc-900"
      >
        {dict.nav.skipToContent}
      </a>
      <Navbar lang={lang} dict={dict} />
      <div id="content" className="w-full max-w-6xl mt-16 mx-auto px-6">
        <HeroSection dict={dict.hero} />
        <AchievementsSection dict={dict.achievements} />
        <AboutSection dict={dict.about} />
        <ProjectsSection dict={dict.projects} />
        <EmailSection dict={dict.contact} />
      </div>
      <Footer dict={dict.footer} />
    </main>
  );
}
