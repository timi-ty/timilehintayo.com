import { useEffect, useRef, useState } from "react";

export type SectionId =
  | "home"
  | "engineering-principles"
  | "projects"
  | "contact";

const homeId: SectionId = "home";
const principlesId: SectionId = "engineering-principles";
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
        behavior: "instant",
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
        if (intersection > maxIntersection) {
          maxIntersection = intersection;
          setCurrentSectionId(section.id as SectionId);
        }
      });
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    });
    observer.observe(document.getElementById(homeId)!);
    observer.observe(document.getElementById(principlesId)!);
    observer.observe(document.getElementById(projectsId)!);
    observer.observe(document.getElementById(contactId)!);

    return () => {
      observer.unobserve(document.getElementById(homeId)!);
      observer.unobserve(document.getElementById(principlesId)!);
      observer.unobserve(document.getElementById(projectsId)!);
      observer.unobserve(document.getElementById(contactId)!);
    };
  }, []);

  return { section: currentSectionId, setSection: setTargetSection };
}

export default useCurrentSection;
