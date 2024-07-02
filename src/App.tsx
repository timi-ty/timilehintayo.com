import { useCallback, useEffect, useState } from "react";
import ContactMe from "./components/main/ContactMe";
import Footer from "./components/main/Footer";
import Header from "./components/main/Header";
import Hero from "./components/main/Hero";
import MyEngineeringPrinciples from "./components/main/MyEngineeringPrinciples";
import ProjectSpindr from "./components/main/ProjectSpindr";
import useCurrentSection from "./components/sub/useCurrentSection";
import AnimatedStrip from "./components/sub/AnimatedStrip";
import withSection, {
  urlSuffixToSectionId,
} from "./components/sub/withSection";
import NavigationDrawer from "./components/main/NavigationDrawer";

function App() {
  const { section, setSection } = useCurrentSection(urlSuffixToSectionId());
  const [isNavOpen, setIsNavOpen] = useState(false);

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
    window.history.replaceState({}, "", `/${section}`);
    return () => window.history.replaceState({}, "", "");
  }, [section]);

  const stripItems = [
    "3+ years of engineering expertise",
    "Advanced React.js proficiency",
    "Core CSS competence",
    "Advanced Node.js proficiency",
    "Performance optimization",
    "DevOps",
    "Automated testing",
    "API design and development",
    "AI augmented engineering",
    "Engineering systems",
    "Accessibility compliance",
    "Automated testing",
    "Fluid animations",
  ];

  return (
    <>
      <header>
        <Header
          id="header"
          currentSection={section}
          setSection={setSection}
          onMenuClick={() => setIsNavOpen(true)}
        />
      </header>
      {isNavOpen && (
        <NavigationDrawer
          id="navigation-drawer"
          currentSection={section}
          setSection={setSection}
          closeSelf={() => setIsNavOpen(false)}
        />
      )}
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

export default App;
