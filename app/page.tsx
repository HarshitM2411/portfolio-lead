import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/Hero";
import { MetricsSection } from "@/components/sections/Metrics";
import { AboutSection } from "@/components/sections/About";
import { LeadershipSection } from "@/components/sections/Leadership";
import { ExperienceSection } from "@/components/sections/Experience";
import { SkillsSection } from "@/components/sections/Skills";
import { ProjectsSection } from "@/components/sections/Projects";
import { NowEducationSection } from "@/components/sections/NowEducation";
import { GitHubSection } from "@/components/sections/GitHub";
import { ContactSection } from "@/components/sections/Contact";
import {
  getPortfolioContent,
  getVisibleSections,
} from "@/lib/content";

export default function Home() {
  const content = getPortfolioContent();
  const visible = getVisibleSections(content);

  return (
    <>
      <Header />
      <main id="main">
        {visible.hero ? <HeroSection site={content.site} /> : null}
        {visible.metrics ? (
          <MetricsSection metrics={content.metrics} />
        ) : null}
        {visible.about ? (
          <AboutSection paragraphs={content.about.paragraphs} />
        ) : null}
        {visible.leadership ? (
          <LeadershipSection leadership={content.leadership} />
        ) : null}
        {visible.experience ? (
          <ExperienceSection experience={content.experience} />
        ) : null}
        {visible.skills ? <SkillsSection skills={content.skills} /> : null}
        {visible.projects ? (
          <ProjectsSection projects={content.projects} />
        ) : null}
        {visible.now || visible.education ? (
          <NowEducationSection
            now={content.now}
            education={content.education}
            showNow={visible.now}
            showEducation={visible.education}
          />
        ) : null}
        {visible.github ? <GitHubSection github={content.github} /> : null}
        {visible.contact ? <ContactSection site={content.site} /> : null}
      </main>
      <Footer />
    </>
  );
}
