import "./ProjectSpindr.scss";
import useGearRotation from "../sub/useGearRotation";
import { LegacyRef, useEffect, useRef, useState } from "react";

interface Props {
  id: string;
}

function ProjectSpindr({ id }: Props) {
  const gearRefs = useGearRotation();
  const videoRef: LegacyRef<HTMLVideoElement> = useRef(null);
  const [isVideoLoaded, setisVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    if (videoRef.current) videoRef.current.loop = true;
    isVideoPlaying ? videoRef.current?.play() : videoRef.current?.pause();
  }, [isVideoPlaying, videoRef.current]);

  useEffect(() => {
    if (!videoRef.current) return;
    function handleLoadedData() {
      setisVideoLoaded(true);
    }
    videoRef.current.addEventListener("loadeddata", handleLoadedData);
    return () => {
      if (videoRef.current)
        videoRef.current.removeEventListener("loadeddata", handleLoadedData);
    };
  }, [videoRef.current]);

  useEffect(() => {
    if (!videoRef.current) return;

    function handleIntersection(entries: IntersectionObserverEntry[]) {
      entries.forEach((entry) => {
        if (entry.intersectionRatio <= 0.1) setIsVideoPlaying(false);
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
        <img className="gear-image" src="/resources/gear_dark.webp" />
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
            <img className="icon" src="/resources/external-link.webp" />
          </div>
        </a>
      </div>
      <div className="right">
        <img className="shot" src="/resources/spindrshot1.webp" />
        <div
          className="video-container"
          onClick={() => setIsVideoPlaying((p) => !p)}
        >
          {isVideoLoaded && (
            <div className="play-button-container">
              <img
                className="play-button"
                src={`/resources/${isVideoPlaying ? "pause" : "play"}.webp`}
                style={{ opacity: `${isVideoPlaying ? "0.1" : "1.0"}` }}
              />
            </div>
          )}
          <video
            ref={videoRef}
            className="video"
            src="/resources/spindrdemo.mp4"
          />
        </div>
        <img className="shot" src="/resources/spindrshot2.webp" />
      </div>
    </div>
  );
}

export default ProjectSpindr;
