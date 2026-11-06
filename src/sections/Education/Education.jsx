import { useLayoutEffect, useRef } from "react";

import ScrollingWaves from "../../components/ScrollingWaves/ScrollingWaves";
import MorphingIcons from "../../components/MorphingIcons/MorphingIcons";

import "./Education.css";

const morphItems = [
  "years of building modern web experiences",
  "MITxPRO Certificate in Coding: Full Stack Development with MERN",
  "University of Belgrade BS in Sociology",
  "Lived in four and travelled to twenty two countries.",
];

export default function Education() {
  const educationRef = useRef(null);

  useLayoutEffect(() => {
    const education = educationRef.current;

    const oceanScene =
      education?.querySelector(".ocean-scene");

    const wavesWrap =
      education?.querySelector(".waves-wrap");

    const scrollingWaves =
      education?.querySelector(".scrolling-waves");

    const wave1 =
      education?.querySelector(".wave--1");

    const wave2 =
      education?.querySelector(".wave--2");

    const wave3 =
      education?.querySelector(".wave--3");

    const wave4 =
      education?.querySelector(".wave--4");

    console.log("🌊 EDUCATION DEBUG", {
      education,
      oceanScene,
      wavesWrap,
      scrollingWaves,
      wave1,
      wave2,
      wave3,
      wave4,
    });

    console.log("🌊 EDUCATION SIZES", {
      education:
        education?.getBoundingClientRect(),

      oceanScene:
        oceanScene?.getBoundingClientRect(),

      wavesWrap:
        wavesWrap?.getBoundingClientRect(),

      scrollingWaves:
        scrollingWaves?.getBoundingClientRect(),

      wave1:
        wave1?.getBoundingClientRect(),
    });
  }, []);

  return (
    <section
      ref={educationRef}
      className="education"
    >
      <div className="ocean-content">
        <MorphingIcons items={morphItems} />
      </div>

      <div className="ocean-scene">
        <div className="waves-wrap">
          <ScrollingWaves />
        </div>
      </div>
    </section>
  );
}