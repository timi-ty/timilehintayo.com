import "./Header.scss";
import useGearRotation from "../sub/useGearRotation";
import { SectionId } from "../sub/useCurrentSection";
import { useMemo } from "react";

interface Props {
  id: string;
  currentSection: SectionId;
  setSection: (nextSection: SectionId) => void;
}

function Header({ id, currentSection, setSection }: Props) {
  const gearRefs = useGearRotation();

  const email = "timilehin.ty@gmail.com";
  const encodedEmail = useMemo(
    () => encodeURIComponent(email).replace(/\./g, "%2E").replace(/@/g, "%40"),
    []
  );
  const mailtoLink = "mailto:" + encodedEmail;

  return (
    <div id={id} className="header-outer">
      <div className="header">
        <div className="left link" onClick={() => setSection("home")}>
          <img
            ref={(mRef) => (gearRefs.current = [mRef])}
            className="badge"
            src="/resources/gear_white.png"
            alt="Gear"
          />
          <div>
            <span className="primary">TIMILEHIN</span>
            <span> TAYO</span>
          </div>
        </div>
        <nav className="middle">
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
            className={`link ${
              currentSection === "projects" ? "selected" : ""
            }`}
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
        <div className="right">
          <a
            className="social"
            href="https://www.linkedin.com/in/timilehin-tayo/"
            target="_blank"
          >
            <img
              className="badge"
              src="/resources/linkedin.png"
              alt="LinkedIn"
            />
          </a>
          <a
            className="social"
            href="https://github.com/timi-ty"
            target="_blank"
          >
            <img className="badge" src="/resources/github.png" alt="GitHub" />
          </a>
          <a className="contact-now primary" href={mailtoLink}>
            Contact Now
            <img
              className="arrow"
              src="/resources/right_arrow.png"
              alt="Contact Now"
            />
          </a>
        </div>
        <div className="menu">
          <img className="icon" src="/resources/menu.png" />
        </div>
      </div>
    </div>
  );
}

export default Header;
