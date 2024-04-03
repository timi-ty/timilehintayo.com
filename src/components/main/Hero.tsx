import "./Hero.scss";
import useGearRotation from "../sub/useGearRotation";
import { SectionId } from "../sub/useCurrentSection";

interface Props {
  id: string;
  setSection: (nextSection: SectionId) => void;
}

function Hero({ id, setSection }: Props) {
  const gearRefs = useGearRotation();
  const grabGearRef = (gearIndex: number) =>
    function (mRef: HTMLDivElement | null) {
      // Index of the item to be overwritten
      const indexToOverwrite = gearIndex;

      // New value to overwrite the item with
      const newValue = mRef;

      // Spread the original array into a new array and overwrite the specific item
      gearRefs.current = [
        ...gearRefs.current.slice(0, indexToOverwrite),
        newValue,
        ...gearRefs.current.slice(indexToOverwrite + 1),
      ];
    };

  return (
    <div id={id} className="hero">
      <div ref={grabGearRef(0)} className="gear1">
        <img className="gear-image" src="/resources/gear_dark.webp" />
      </div>
      <div ref={grabGearRef(1)} className="gear2">
        <img className="gear-image" src="/resources/gear_dark.webp" />
      </div>
      <div className="photo-container1">
        <div className="photo-container2">
          <img className="photo" src="/resources/timitayobw.webp" />
        </div>
      </div>
      <div className="greeting">Hey, I'm Timilehin</div>
      <div className="title">
        Software Engineer in
        <br />
        Frontend - React.js
      </div>
      <div className="description long">
        Leveraging modern technologies to deliver seamless frontend experiences,
        ensuring swift deployment and optimal UX.
      </div>
      <div className="description short">
        Utilizing modern tech for seamless frontends, swift deployment, and
        optimal UX.
      </div>
      <div className="button-group">
        <div
          className="button-container"
          onClick={() => setSection("engineering-principles")}
        >
          <button>My Engineering Principles</button>
        </div>
        <div
          className="button-container"
          onClick={() => setSection("projects")}
        >
          <button>Project Spindr</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
