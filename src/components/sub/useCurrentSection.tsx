import { useEffect, useRef, useState } from "react";

export type SectionId = "home" | "projects" | "contact";

const homeId: SectionId = "home";
const projectsId: SectionId = "projects";
const contactId: SectionId = "contact";

function useCurrentSection(defaultSectionId: SectionId) {
  const [currentSectionId, setCurrentSectionId] = useState(defaultSectionId);
  const visibleSections = useRef(
    (function () {
      const empty: Map<Element, number> = new Map();
      return empty;
    })()
  );

  function setTargetSection(targetSectionId: SectionId) {
    const targetSection = document.getElementById(targetSectionId);
    if (targetSection) {
      var elementOffset = targetSection.offsetTop;
      window.scrollTo({
        top: elementOffset,
        behavior: "smooth",
      });
    }
    setCurrentSectionId(targetSectionId);
  }

  useEffect(() => {
    function handleIntersection(entries: IntersectionObserverEntry[]) {
      entries.forEach((entry) => {
        if (entry.isIntersecting)
          visibleSections.current.set(entry.target, entry.intersectionRatio);
        else visibleSections.current.delete(entry.target);
      });

      var maxIntersection = 0;
      visibleSections.current.forEach((intersection, section) => {
        if (intersection > maxIntersection)
          setCurrentSectionId(section.id as SectionId);
      });
    }

    const observer = new IntersectionObserver(handleIntersection);
    observer.observe(document.getElementById(homeId)!);
    observer.observe(document.getElementById(projectsId)!);
    observer.observe(document.getElementById(contactId)!);

    return () => {
      observer.unobserve(document.getElementById(homeId)!);
      observer.unobserve(document.getElementById(projectsId)!);
      observer.unobserve(document.getElementById(contactId)!);
    };
  }, []);

  return { section: currentSectionId, setSection: setTargetSection };
}

export default useCurrentSection;
