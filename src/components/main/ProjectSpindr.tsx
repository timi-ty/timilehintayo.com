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
          Built in 7 weeks by drawing on my years of engineering experience,
          Spindr is my quintessential engineering project.
          <br />
          <br />
          Spindr is a music discovery web app that aims to remove most of the
          thinking from the process of finding new music.
          <br />
          <br />
          Spindr helps you find music you love.
        </div>
        <div className="launch-button">
          Launch Spindr
          <img className="icon" src="/resources/external-link.png" />
        </div>
      </div>
      <div className="right">
        <img className="shot" src="/resources/spindrshot1.png" />
        <div className="video-container">
          <video className="video" src="/resources/spindrdemo.mp4" />
          <div className="play-button">
            Play Video
            <img className="icon" src="/resources/play-button.png" />
          </div>
        </div>
        <img className="shot" src="/resources/spindrshot2.png" />
      </div>
    </div>
  );
}

export default ProjectSpindr;
