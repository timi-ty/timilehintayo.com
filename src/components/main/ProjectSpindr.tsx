import "./ProjectSpindr.scss";
import useGearRotation from "../sub/useGearRotation";

interface Props {
  id: string;
}

function ProjectSpindr({ id }: Props) {
  const gearRefs = useGearRotation();

  return (
    <div id={id} className="project-spindr">
      <div ref={(mRef) => (gearRefs.current = [mRef])} className="gear1">
        <img className="gear-image" src="/resources/gear_dark.png" />
      </div>
      <div className="left">
        <div className="title">
          Project
          <br />
          Spindr
        </div>
        <div className="description">
          Spindr is a music discovery web app built on top of the Spotify Web
          API that aims to remove most of the thinking from the process of
          finding new music.
        </div>
        <div className="description">Spindr helps you find music you love.</div>
        <div className="launch-button">
          Launch Spindr
          <img className="launch-icon" src="/resources/external-link.png" />
        </div>
      </div>
      <div className="right">
        <img className="shot" src="/resources/spindrshot1.png" />
        <video className="video" src="/resources/spindrdemo.mp4" controls />
        <img className="shot" src="/resources/spindrshot2.png" />
      </div>
    </div>
  );
}

export default ProjectSpindr;
