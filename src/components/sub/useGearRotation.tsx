import { useRef } from "react";
import useAnimation from "./useAnimation";

const smoothingConstant = 3;
const scrollCoupleFactor = 0.5;

const emptyGears: (HTMLElement | null)[] = [];

function useGearRotation() {
  const gears = useRef(emptyGears);
  const smoothGearRotation = useRef(0);

  function updateFrame(deltaTime: number) {
    const currentScrollTop =
      window.scrollY || document.documentElement.scrollTop;
    const gearRotation = currentScrollTop * scrollCoupleFactor;

    smoothGearRotation.current = smoothValue(
      smoothGearRotation.current,
      gearRotation,
      deltaTime
    );

    for (var i = 0; i < gears.current.length; i++) {
      const gear = gears.current[i];
      const sign = i % 2 === 0 ? -1 : 1;
      if (gear) {
        gear.style.rotate = `${sign * smoothGearRotation.current}deg`;
      }
    }
  }

  useAnimation(60, updateFrame);

  return gears;
}

function smoothValue(from: number, to: number, deltaTime: number): number {
  if (Math.abs(from - to) < 0.001) return to;
  return lerp(from, to, smoothingConstant * deltaTime); //Using lerp with feedback makes it non-linear and nice.
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export default useGearRotation;
