import { SectionId } from "../sub/useCurrentSection";
import "./NavigationDrawer.scss";

interface Props {
  id: string;
  currentSection: SectionId;
  setSection: (nextSection: SectionId) => void;
}

function NavigationDrawer({ id, currentSection, setSection }: Props) {
  return (
    <div id={id} className="navigation-drawer">
      <nav className="top">
        <div
          className={`link ${
            currentSection === "home" ||
            currentSection === "engineering-principles"
              ? "selected"
              : ""
          }`}
          onClick={() => setSection("home")}
        >
          Home
        </div>
        <div
          className={`link ${currentSection === "projects" ? "selected" : ""}`}
          onClick={() => setSection("projects")}
        >
          Projects
        </div>
        <div
          className={`link ${currentSection === "contact" ? "selected" : ""}`}
          onClick={() => setSection("contact")}
        >
          Contact
        </div>
        <a href="https://timilehin-ty.medium.com/" target="_blank">
          Blog
        </a>
      </nav>
      <div className="bottom">
        <a
          className="social"
          href="https://www.linkedin.com/in/timilehin-tayo/"
          target="_blank"
        >
          <img className="badge" src="/resources/linkedin.png" alt="LinkedIn" />
          LinkedIn
        </a>
        <a className="social" href="https://github.com/timi-ty" target="_blank">
          <img className="badge" src="/resources/github.png" alt="GitHub" />
          GitHub
        </a>
        <a
          className="contact-now primary"
          href={"mailto: timilehin%2Ety%40gmail%2Ecom"}
        >
          Contact Now
          <img
            className="arrow"
            src="/resources/right_arrow.png"
            alt="Contact Now"
          />
        </a>
      </div>
    </div>
  );
}

export default NavigationDrawer;
