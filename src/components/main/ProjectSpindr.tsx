import "./ProjectSpindr.scss";
import useGearRotation from "../sub/useGearRotation";
import { LegacyRef, useEffect, useRef, useState } from "react";

interface Props {
  id: string;
}

function ProjectSpindr({ id }: Props) {
  const gearRefs = useGearRotation();
  const videoRef: LegacyRef<HTMLVideoElement> = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (videoRef.current) videoRef.current.loop = true;
    isPlaying ? videoRef.current?.play() : videoRef.current?.pause();
  }, [isPlaying, videoRef.current]);

  useEffect(() => {
    if (!videoRef.current) return;

    function handleIntersection(entries: IntersectionObserverEntry[]) {
      entries.forEach((entry) => {
        if (entry.intersectionRatio <= 0.1) setIsPlaying(false);
        if (entry.intersectionRatio <= 0.7) {
          (entry.target as HTMLVideoElement).style.height = "95%";
        } else if (entry.intersectionRatio === 1.0) {
          (entry.target as HTMLVideoElement).style.height = "100%";
        }
      });
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0.1, 0.7, 1.0],
    });
    observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, [videoRef.current]);

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
          Spindr is my quintessential engineering project, built on top of my
          years of engineering experience.
          <br />
          <br />
          Spindr is a music discovery web app that aims to remove most of the
          thinking from the process of finding new music.
          <br />
          <br />
          Spindr helps you find music you love.
        </div>
        <a href="https://spindr.pro" target="_blank" className="link">
          <div className="launch-button">
            Launch Spindr
            <img className="icon" src="/resources/external-link.png" />
          </div>
        </a>
      </div>
      <div className="right">
        <img className="shot" src="/resources/spindrshot1.png" />
        <div
          className="video-container"
          onClick={() => setIsPlaying((p) => !p)}
        >
          <video
            ref={videoRef}
            className="video"
            src="/resources/spindrdemo.mp4"
          />
          <div className="play-button">
            {isPlaying ? "Pause" : "Play"} Video
            <img
              className="icon"
              src={`/resources/${isPlaying ? "pause" : "play"}.png`}
            />
          </div>
        </div>
        <img className="shot" src="/resources/spindrshot2.png" />
      </div>
    </div>
  );
}

export default ProjectSpindr;
