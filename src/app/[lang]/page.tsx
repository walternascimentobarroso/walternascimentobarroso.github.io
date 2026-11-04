import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import EmailSection from "../components/EmailSection";
import Footer from "../components/Footer";
import AchievementsSection from "../components/AchievementsSection";
import { getDictionary, type Locale } from "../dictionaries";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function Home({ params }: Props) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);

  return (
    <main className="flex min-h-screen flex-col bg-white dark:bg-[#121212]">
      <Navbar lang={lang} dict={dict} />
      <div className="container mt-24 mx-auto px-12 py-4">
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
