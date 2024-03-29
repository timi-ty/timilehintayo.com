import { MutableRefObject, useRef, useEffect } from "react";
import "./AnimatedStrip.scss";
import useAnimation from "./useAnimation";

interface Props {
  stripItems: string[];
  className: string;
}

const frameRate = 60;

function AnimatedStrip({ stripItems, className }: Props) {
  const stripRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const stripItemsRefs: MutableRefObject<(HTMLDivElement | null)[]> = useRef(
    []
  );

  const elapsedFrames = useRef(0);

  useEffect(() => {
    const firstItem = stripItemsRefs.current[0];
    if (!firstItem) return;

    function initializeTranslations() {
      var lastRight = 0;
      for (var i = 0; i < stripItemsRefs.current.length; i++) {
        const currentItem = stripItemsRefs.current[i];

        if (!currentItem) continue;

        currentItem.style.translate = `${lastRight}px 0px`;

        lastRight += currentItem.offsetWidth + 16; //1rem gap;
      }
    }

    const resizeObserver = new ResizeObserver(initializeTranslations);

    resizeObserver.observe(firstItem);

    return () => {
      if (stripItemsRefs.current) resizeObserver.unobserve(firstItem);
    };
  }, [stripRef.current, stripItemsRefs.current]);

  function getStripLeft() {
    return stripRef.current?.getBoundingClientRect().left || 0;
  }

  function animateStrip(deltaTime: number) {
    //TODO: Kill the allocation in these two methods
    const leftMostItem = getLeftmostElement(stripRef.current);
    const rightMostItem = getRightmostElement(stripRef.current);

    if (!leftMostItem || !rightMostItem) return;

    //If the strip item farthest to the left is outside the strip, bring it to the right
    if (leftMostItem.right < getStripLeft()) {
      const jumpTranslation = rightMostItem.right - getStripLeft() + 16; //1rem gap
      leftMostItem.element.style.translate = `${jumpTranslation}px 0px`;
    }

    const stripSpeed = -50; //px per second
    const deltaTranslation = stripSpeed * deltaTime;
    stripItemsRefs.current.forEach((item) => {
      if (!item) return;
      item.style.translate = `${
        parseFloat(item.style.translate) + deltaTranslation
      }px 0px`;
    });

    elapsedFrames.current++;
  }

  useAnimation(frameRate, animateStrip);

  return (
    <div ref={stripRef} className={`strip ${className}`}>
      {stripItems.map((item, index) => {
        return (
          <div
            key={index}
            ref={(mRef) => (stripItemsRefs.current[index] = mRef)}
            className="strip-item"
          >
            <img className="strip-badge" src="/resources/tick.png" />
            <div className="strip-text">{item}</div>
          </div>
        );
      })}
    </div>
  );
}

interface RightmostElement {
  left: number;
  right: number;
  width: number;
  element: HTMLElement;
  index: number;
}

interface LeftmostElement {
  left: number;
  right: number;
  width: number;
  element: HTMLElement;
  index: number;
}

function getRightmostElement(
  container: HTMLElement | null
): RightmostElement | null {
  if (container === null) return null;

  var maxRight = Number.NEGATIVE_INFINITY;
  //Assume the rightmost element is at the end.
  var rightMostElementIndex = container.children.length - 1;
  //Look for the rightmost element.
  for (var i = 0; i < container.children.length; i++) {
    const element = container.children.item(i);
    const right =
      element?.getBoundingClientRect().right || Number.NEGATIVE_INFINITY;
    if (right > maxRight) {
      maxRight = right;
      rightMostElementIndex = i;
    }
  }
  const result: RightmostElement = {
    left:
      container.children.item(rightMostElementIndex)?.getBoundingClientRect()
        .left || 0,
    right: maxRight,
    width:
      container.children.item(rightMostElementIndex)?.getBoundingClientRect()
        .width || 0,
    element: container.children.item(rightMostElementIndex) as HTMLElement,
    index: rightMostElementIndex,
  };
  return result;
}

function getLeftmostElement(
  container: HTMLElement | null
): LeftmostElement | null {
  if (container === null) return null;

  var minLeft = Number.POSITIVE_INFINITY;
  //Assume the leftmost element is at the beginning.
  var leftMostElementIndex = 0;
  //Look for the leftmost element.
  for (var i = 0; i < container.children.length; i++) {
    const element = container.children.item(i);
    const left =
      element?.getBoundingClientRect().left || Number.POSITIVE_INFINITY;
    if (left < minLeft) {
      minLeft = left;
      leftMostElementIndex = i;
    }
  }
  const result: LeftmostElement = {
    left: minLeft,
    right:
      container.children.item(leftMostElementIndex)?.getBoundingClientRect()
        .right || 0,
    width:
      container.children.item(leftMostElementIndex)?.getBoundingClientRect()
        .width || 0,
    element: container.children.item(leftMostElementIndex) as HTMLElement,
    index: leftMostElementIndex,
  };
  return result;
}

export default AnimatedStrip;
