import useResizeObserver from "@react-hook/resize-observer";
import React, { CSSProperties, useLayoutEffect, useRef, useState } from "react";
import "./Marquee.scss";

export interface MarqueeProps {
  /**
   * Inline style for the container div
   */
  style?: React.CSSProperties;
  /**
   * Class name to style the container div
   */
  className?: string;
  /**
   * Whether to play or pause the marquee
   */
  play?: boolean;
  /**
   * Whether to pause the marquee when hovered
   */
  pauseOnHover?: boolean;
  /**
   * Whether to pause the marquee when clicked
   */
  pauseOnClick?: boolean;
  /**
   * The direction the marquee is sliding
   */
  direction?: "left" | "right";
  /**
   * Speed calculated as pixels/second
   */
  speed?: number;
  /**
   * Duration to delay the animation after render, in seconds
   */
  delay?: number;
  /**
   * Whether to show the gradient or not
   */
  gradient?: boolean;
  /**
   * The rgb color of the gradient as an array of 3 elements: [r, g, b]
   */
  gradientColor?: string;
  /**
   * The width of the gradient on either side
   */
  gradientWidth?: number | string;
  /**
   * The children rendered inside the marquee
   */
  children?: React.ReactNode;
}

const Marquee: React.FC<MarqueeProps> = ({
  style,
  className,
  play = true,
  pauseOnHover = false,
  pauseOnClick = false,
  direction = "left",
  speed = 20,
  delay = 0,
  gradient = true,
  gradientColor = [255, 255, 255],
  gradientWidth = 200,
  children,
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeWidth = useWidthObserver(marqueeRef);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const c = gradientColor;
  const gradientColorVar = `rgba(${c[0]}, ${c[1]}, ${c[2]}, 1), rgba(${c[0]}, ${c[1]}, ${c[2]}, 0)`;

  const gradientWidthVar =
    typeof gradientWidth === "number" ? `${gradientWidth}px` : gradientWidth;

  const directionVar = direction === "left" ? "normal" : "reverse";

  const duration = marqueeWidth / speed;

  const pausedByHover = pauseOnHover && hovering;
  const pausedByClick = pauseOnClick && clicking;
  const isRunning = play && !pausedByClick && !pausedByHover;

  const marqueeStyle: CSSProperties = {
    ["--play" as string]: isRunning ? "running" : "paused",
    ["--direction" as string]: directionVar,
    ["--duration" as string]: `${duration}s`,
    ["--delay" as string]: `${delay}s`,
  };

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseDown={() => setClicking(true)}
      onMouseUp={() => setClicking(false)}
      onTouchStart={() => setClicking(true)}
      onTouchEnd={() => setClicking(false)}
      className={"marquee-container " + className}
      style={style}
    >
      {gradient && (
        <div
          className="overlay"
          style={{
            ["--gradient-color" as string]: gradientColorVar,
            ["--gradient-width" as string]: gradientWidthVar,
          }}
        />
      )}
      <div ref={marqueeRef} style={marqueeStyle} className="marquee">
        {children}
      </div>
      <div style={marqueeStyle} className="marquee">
        {children}
      </div>
    </div>
  );
};

export default Marquee;

// Width observer hook
//--------------------------------------------------------------------
const useWidthObserver = (target: React.RefObject<HTMLDivElement>) => {
  const [width, setWidth] = React.useState(0);

  useLayoutEffect(() => {
    if (target.current) setWidth(target.current.clientWidth);
  }, [target.current]);

  useResizeObserver(target, (entry) => setWidth(entry.target.clientWidth));
  return width;
};
