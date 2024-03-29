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
        <img className="gear-image" src="/resources/gear_dark.png" />
      </div>
      <div className="title">
        Engineering principles for quality code and products
      </div>
      <div className="principle-cards">
        <EngineeringPrinciple />
        <EngineeringPrinciple />
        <EngineeringPrinciple />
      </div>
    </div>
  );
}

export default MyEngineeringPrinciples;
