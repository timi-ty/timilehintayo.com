import { useEffect, useState } from "react";
import { SectionId } from "../sub/useCurrentSection";
import "./NavigationDrawer.scss";

interface Props {
  id: string;
  currentSection: SectionId;
  setSection: (nextSection: SectionId) => void;
  closeSelf: () => void;
}

function NavigationDrawer({
  id,
  currentSection,
  setSection,
  closeSelf,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  function close() {
    setIsOpen(false);
    setTimeout(closeSelf, 100);
  }

  useEffect(() => {
    function handleScroll() {
      close();
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //Regular effects run after the first render which allows isOpen to be false for at least 1 frame.
  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <div
      className="navigation-drawer-container"
      style={{
        pointerEvents: `${isOpen ? "all" : "none"}`,
        top: `${window.scrollY}px`,
      }}
      onClick={close}
    >
      <div
        id={id}
        className="navigation-drawer"
        style={{ translate: `${isOpen ? "0rem" : "14rem"} 0rem` }}
        onClick={(ev) => {
          ev.stopPropagation();
        }}
      >
        <div className="close" onClick={close}>
          <img className="icon" src="/resources/close.png" />
        </div>
        <nav className="top">
          <div
            className={`link ${
              currentSection === "home" ||
              currentSection === "engineering-principles"
                ? "selected"
                : ""
            }`}
            onClick={() => {
              setSection("home");
              close();
            }}
          >
            Home
          </div>
          <div
            className={`link ${
              currentSection === "projects" ? "selected" : ""
            }`}
            onClick={() => {
              setSection("projects");
              close();
            }}
          >
            Projects
          </div>
          <div
            className={`link ${currentSection === "contact" ? "selected" : ""}`}
            onClick={() => {
              setSection("contact");
              close();
            }}
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
            <img
              className="badge"
              src="/resources/linkedin.png"
              alt="LinkedIn"
            />
            LinkedIn
          </a>
          <a
            className="social"
            href="https://github.com/timi-ty"
            target="_blank"
          >
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
    </div>
  );
}

export default NavigationDrawer;
