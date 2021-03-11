import React, { Fragment, useEffect, useState } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Marquee, { MarqueeProps } from "./Marquee";
import "./Marquee.stories.scss";

export default {
  title: "Marquee",
  component: Marquee,
  argTypes: {
    // Just reordering and overriding auto-generated Docs controls
    play: {},
    speed: {
      control: {
        type: "range",
        min: 0,
        max: 1000,
      },
    },
    delay: {},
    pauseOnHover: {},
    pauseOnClick: {},
    gradient: {},
    gradientColor: {
      control: {
        type: "array",
        options: {
          sepparator: ",",
        },
      },
    },
    gradientWidth: {},
    direction: {},
    children: { control: { disable: true } },
    style: { control: { disable: true } },
    className: { control: { disable: true } },
  },
} as Meta;

const lipsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus tellus et scelerisque facilisis. Integer laoreet tincidunt blandit. Vivamus non metus tortor. Sed sodales pulvinar lorem, a vestibulum ante dictum ut. Sed felis erat, semper non ante nec, tempus facilisis ante. Duis tempor tempor fermentum. Nulla blandit a magna et viverra. Aliquam vel enim tortor.";
const lipsumArr = lipsum.split(" ");

function DelayedImage(props: { delay: number }) {
  const [showImg, setShowImg] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setShowImg(true);
    }, props.delay || 0);

    return () => {
      clearTimeout(handler);
    };
  }, []);

  if (!showImg) return <span className="sepparatorImg">.</span>;

  return (
    <img
      src="https://i.kym-cdn.com/photos/images/original/001/206/382/b7a.gif"
      className="sepparatorImg"
    />
  );
}

export const FewElements: Story<MarqueeProps> = (args) => (
  <Marquee className="marqueeClass" {...args}>
    {lipsumArr.slice(0, 5).map((t, i) => (
      <span key={i} className="innerSpan">
        {t}
      </span>
    ))}
  </Marquee>
);

export const FewElementsWithDelayedImageSepparator: Story<MarqueeProps> = (
  args
) => (
  <Marquee className="marqueeClass" {...args}>
    {lipsumArr.slice(0, 5).map((t, i) => (
      <Fragment key={i}>
        <span className="innerSpan">{t}</span>
        <DelayedImage delay={(i + 1) * 1000} />
      </Fragment>
    ))}
  </Marquee>
);

export const LotsOfElements: Story<MarqueeProps> = (args) => (
  <Marquee className="marqueeClass" {...args}>
    {lipsumArr.map((t, i) => (
      <span key={i} className="innerSpan">
        {t}
      </span>
    ))}
  </Marquee>
);
