import { useEffect } from "react";
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

function App() {
  const { section, setSection } = useCurrentSection(urlSuffixToSectionId());

  //Set the landing section from the original URL suffix only once when the page loads.
  useEffect(() => setSection(urlSuffixToSectionId()), []);

  //Update the URL suffix when the current section changes.
  useEffect(() => window.history.replaceState({}, "", `${section}`), [section]);

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
        <Hero id="home" setSection={setSection} />
        <AnimatedStrip stripItems={stripItems} className={""} />
        <MyEngineeringPrinciples id="engineering-principles" />
        <AnimatedStrip stripItems={stripItems} className={""} />
        <ProjectSpindr id="projects" />
        <ContactMe id="contact" />
      </main>
      <footer>
        <Footer id="footer" />
      </footer>
    </>
  );
}

function urlSuffixToSectionId(): SectionId {
  var urlSuffix = window.location.pathname;
  switch (urlSuffix) {
    case "/home":
      return "home";
    case "/engineering-principles":
      return "engineering-principles";
    case "/projects":
      return "projects";
    case "/contact":
      return "contact";
    default:
      return "home";
  }
}

export default App;
