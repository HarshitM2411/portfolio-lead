import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { Container } from "@/components/layout/Container";
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
  const currentCompany = content.experience[0]?.company;
  const engineersLed = content.metrics.find((m) => m.id === "team")?.value;
  const years = content.metrics.find((m) => m.id === "years")?.value;

  return (
    <>
      <Header />
      <main id="main" className="relative z-10 pt-16 pb-28 md:pt-28 md:pb-16">
        {visible.hero ? (
          <HeroSection
            site={content.site}
            education={visible.education ? content.education : undefined}
            engineersLed={engineersLed}
            years={years}
            currentCompany={currentCompany}
          />
        ) : null}
        {visible.metrics ? (
          <MetricsSection metrics={content.metrics} />
        ) : null}
        {visible.about || visible.leadership ? (
          <section className="scroll-mt-20 py-6 md:scroll-mt-32 md:py-10">
            <Container>
              <div className="grid grid-cols-1 items-stretch gap-2.5 lg:grid-cols-12 lg:gap-6">
                {visible.about ? (
                  <div className="lg:col-span-7">
                    <AboutSection
                      paragraphs={content.about.paragraphs}
                      embedded
                    />
                  </div>
                ) : null}
                {visible.leadership ? (
                  <div className="lg:col-span-5">
                    <LeadershipSection leadership={content.leadership} />
                  </div>
                ) : null}
              </div>
            </Container>
          </section>
        ) : null}
        {visible.experience ? (
          <ExperienceSection experience={content.experience} />
        ) : null}
        {visible.projects ? (
          <ProjectsSection projects={content.projects} />
        ) : null}
        {visible.skills ? <SkillsSection skills={content.skills} /> : null}
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
      <MobileNav />
    </>
  );
}
