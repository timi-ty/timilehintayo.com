import { useEffect } from "react";
import { SectionId } from "./useCurrentSection";

function withSection(
  SectionComponent: (originalProps: any) => JSX.Element,
  id: SectionId,
  setSection: (section: SectionId) => void
) {
  return (remainigProps: any) => {
    useEffect(() => {
      if (id === urlSuffixToSectionId()) {
        setSection(id);
      }
    }, []);
    return (
      <SectionComponent id={id} setSection={setSection} {...remainigProps} />
    );
  };
}

function urlSuffixToSectionId(): SectionId {
  return window.location.pathname.slice(1) as SectionId;
}

export default withSection;
