import EngineeringPrinciple from "../sub/EngineeringPrinciple";
import "./MyEngineeringPrinciples.scss";
import useGearRotation from "../sub/useGearRotation";

interface Props {
  id: string;
}

function MyEngineeringPrinciples({ id }: Props) {
  const gearRefs = useGearRotation();

  return (
    <div id={id} className="my-engineering-principles">
      <div ref={(mRef) => (gearRefs.current = [null, mRef])} className="gear2">
        <img className="gear-image" src="/resources/gear_dark.webp" />
      </div>
      <div className="title">
        My engineering principles for quality code and products
      </div>
      <div className="principle-cards">
        <EngineeringPrinciple
          title={"Ensure Functionality First"}
          description={
            "Always confirming that the core functionality of a feature/product has been cemented before adding flair/style greatly reduces the risk of encountering hard bugs during development."
          }
          image={"/resources/functionality-lightbulb.webp"}
        />
        <EngineeringPrinciple
          title={"Do Optimization Later"}
          description={
            "Code written for optimized performance tends to be more contrived which makes it harder to read/modify than purely functional code. Premature optimization slows down development."
          }
          image={"/resources/optimization-tools.webp"}
        />
        <EngineeringPrinciple
          title={"Use Pyramid Testing"}
          description={
            "For a system to work reliably, it must take for granted that its subsystems work in a predictable manner. Pyramid testing is a natural extension of this general rule. Confirm that the lowest level subsystems work correctly, then bubble up."
          }
          image={"/resources/testing-pyramid.webp"}
        />
        <EngineeringPrinciple
          title={"If Double, Decouple"}
          description={
            "Tightly coupled code is hard to test and debug. On the flip side, excessively decoupled code can be overly verbose and become a pain to maintain. There is a way to strike a balance between the two - if a system is used in more than one place, it should be decoupled."
          }
          image={"/resources/decouple-split.webp"}
        />
        <EngineeringPrinciple
          title={"Debug Root Causes"}
          description={
            "Whenver possible, avoid patch fixes and debug to the root cause. Fixing problems from their original source sanitizes the codebase over time and reduces the risk of regression."
          }
          image={"/resources/debug-root.webp"}
        />
        <EngineeringPrinciple
          title={"Read the Docs!"}
          description={
            "Some (very good) technologies work in unexpected ways. Consuming as much of the original documentation of a technology is generally the best way to make the most of it."
          }
          image={"/resources/read-docs.webp"}
        />
      </div>
    </div>
  );
}

export default MyEngineeringPrinciples;
