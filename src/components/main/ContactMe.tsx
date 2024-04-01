import "./ContactMe.scss";
import useGearRotation from "../sub/useGearRotation";

interface Props {
  id: string;
}

function ContactMe({ id }: Props) {
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
    <div id={id} className="contact-me">
      <div ref={grabGearRef(0)} className="gear1">
        <img className="gear-image" src="/resources/gear_dark.png" />
      </div>
      <div ref={grabGearRef(1)} className="gear2">
        <img className="gear-image" src="/resources/gear_dark.png" />
      </div>
      <div className="title">I'm open to work!</div>
      <div className="contact-links">
        <div className="contact-link">
          <div className="title">Reach me on LinkedIn</div>
          <img className="image" src="/resources/linkedin.png" />
        </div>
        <div className="or">or</div>
        <div className="contact-link">
          <div className="title">Send me an email</div>
          <img className="image" src="/resources/linkedin.png" />
        </div>
      </div>
    </div>
  );
}

export default ContactMe;
