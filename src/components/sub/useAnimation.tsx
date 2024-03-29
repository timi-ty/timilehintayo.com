import { useRef, useEffect, MutableRefObject } from "react";

function useAnimation(
  maxFrameRate: number,
  updateFrame: (deltaTime: number) => void
) {
  const lastTime = useRef(currentTime());
  const deltaTime = useRef(0);
  const animatorHandle: MutableRefObject<null | number> = useRef(null);
  const minFramePeriod = 1 / maxFrameRate;

  useEffect(() => {
    function animate() {
      const dt = currentTime() - lastTime.current;
      if (dt >= minFramePeriod) {
        deltaTime.current = dt;
        lastTime.current = currentTime();
        updateFrame(deltaTime.current);
      } else {
        deltaTime.current = 0;
      }
      //Lock to 60fps
      animatorHandle.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animatorHandle.current) cancelAnimationFrame(animatorHandle.current);
    };
  }, [updateFrame]);
}

function currentTime(): number {
  return Date.now() / 1000;
}

export default useAnimation;
