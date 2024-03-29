import "./ContactMe.scss";
import useGearRotation from "../sub/useGearRotation";

interface Props {
  id: string;
}

function ContactMe({ id }: Props) {
  const gearRefs = useGearRotation();

  return (
    <div id={id} className="contact-me">
      <div ref={(mRef) => (gearRefs.current = [mRef])} className="gear1">
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
