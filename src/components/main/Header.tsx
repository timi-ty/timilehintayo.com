import "./Header.scss";
import useGearRotation from "../sub/useGearRotation";
import { SectionId } from "../sub/useCurrentSection";

interface Props {
  id: string;
  currentSection: SectionId;
  setSection: (nextSection: SectionId) => void;
  onMenuClick: () => void;
}

function Header({ id, currentSection, setSection, onMenuClick }: Props) {
  const gearRefs = useGearRotation();

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
        <div className="menu" onClick={onMenuClick}>
          <img className="icon" src="/resources/menu.png" />
        </div>
      </div>
    </div>
  );
}

export default Header;
