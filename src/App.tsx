import { useCallback, useEffect } from "react";
import ContactMe from "./components/main/ContactMe";
import Footer from "./components/main/Footer";
import Header from "./components/main/Header";
import Hero from "./components/main/Hero";
import MyEngineeringPrinciples from "./components/main/MyEngineeringPrinciples";
import ProjectSpindr from "./components/main/ProjectSpindr";
import useCurrentSection, {
  SectionId,
} from "./components/sub/useCurrentSection";
import AnimatedStrip from "./components/sub/AnimatedStrip";
import withSection from "./components/sub/withSection";

function App() {
  const { section, setSection } = useCurrentSection(urlSuffixToSectionId());

  const HomeSection = useCallback(withSection(Hero, "home", setSection), []);
  const PrinciplesSection = useCallback(
    withSection(MyEngineeringPrinciples, "engineering-principles", setSection),
    []
  );
  const ProjectsSection = useCallback(
    withSection(ProjectSpindr, "projects", setSection),
    []
  );
  const ContactSection = useCallback(
    withSection(ContactMe, "contact", setSection),
    []
  );

  //Update the URL suffix when the current section changes.
  useEffect(() => {
    window.history.replaceState({}, "", `${section}`);
    return () => window.history.replaceState({}, "", "");
  }, [section]);

  const stripItems = [
    "3+ years of engineering expertise",
    "Advanced react.js proficiency",
    "Core CSS competence",
    "Performance optimization",
    "DevOps",
    "Automated UI testing",
    "API design",
    "AI augmented engineering",
    "UI engineering systems",
    "Accessibility compliance",
    "Performance optimization",
    "Automated UI testing",
  ];

  return (
    <>
      <header>
        <Header id="header" currentSection={section} setSection={setSection} />
      </header>
      <main>
        <HomeSection />
        <AnimatedStrip stripItems={stripItems} className={""} />
        <PrinciplesSection />
        <AnimatedStrip stripItems={stripItems} className={""} />
        <ProjectsSection />
        <ContactSection />
      </main>
      <footer>
        <Footer id="footer" />
      </footer>
    </>
  );
}

function urlSuffixToSectionId(): SectionId {
  return window.location.pathname.slice(1) as SectionId;
}

export default App;
