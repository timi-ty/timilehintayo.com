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

function App() {
  const { section, setSection } = useCurrentSection(urlSuffixToSectionId());

  //Set the landing section from the original URL suffix only once when the page loads.
  useEffect(() => setSection(urlSuffixToSectionId()), []);

  //Update the URL suffix when the current section changes.
  useEffect(() => window.history.replaceState({}, "", `${section}`), [section]);

  return (
    <>
      <header>
        <Header id="header" currentSection={section} setSection={setSection} />
      </header>
      <main>
        <Hero id="home" setSection={setSection} />
        <MyEngineeringPrinciples id="engineering-principles" />
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
