import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import Hero from "../Hero/Hero";
import Education from "../Education/Education";

import "./IntroSequence.css";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const IntroSequence = () => {
  const sequenceRef = useRef(null);

  useLayoutEffect(() => {
    const sequence = sequenceRef.current;

    if (!sequence) return;

    const ctx = gsap.context(() => {
      const sky = sequence.querySelector(".intro-sky");

      const track = sequence.querySelector(".intro-track");
      const education = sequence.querySelector(".intro-education");
      const sand = sequence.querySelector(".intro-sand");

      const sun = sequence.querySelector(".hero-sun");
      const umbrella = sequence.querySelector(".hero-umbrella");
      const beachball = sequence.querySelector(".hero-beachball");

      const wave1 = education?.querySelector(".wave--1");
      const wave2 = education?.querySelector(".wave--2");
      const wave3 = education?.querySelector(".wave--3");
      const wave4 = education?.querySelector(".wave--4");

      if (
        !sky ||
        !track ||
        !education ||
        !sand ||
        !sun ||
        !wave1 ||
        !wave2 ||
        !wave3 ||
        !wave4
      ) {
        console.error("IntroSequence: required DOM elements are missing");

        return;
      }

      const getTrackTravel = () => education.offsetLeft;

      const getRemainingSandTravel = () => {
        const remaining = sand.offsetWidth - getTrackTravel() + 24;

        return Math.max(0, remaining);
      };

      const getScrollDistance = () => {
        const totalHorizontalTravel =
          getTrackTravel() + getRemainingSandTravel();

        return Math.max(window.innerHeight * 4, totalHorizontalTravel * 2.5);
      };

      /* ==================================
         INITIAL WORLD STATE
      ================================== */

      gsap.set(track, {
        x: 0,
      });

      gsap.set(sand, {
        x: 0,
      });

      gsap.set(wave1, {
        xPercent: -6,
      });

      gsap.set(wave2, {
        xPercent: -10,
      });

      gsap.set(wave3, {
        xPercent: -14,
      });

      gsap.set(wave4, {
        xPercent: -18,
      });

      /* ==================================
         INITIAL SKY
      ================================== */

      gsap.set(sky, {
        "--sky-top": "#353b55",
        "--sky-middle": "#655667",
        "--sky-horizon": "#a7646d",
      });

      /* ==================================
         SUNRISE

         The sun's CSS position is its final
         upper-right resting position.

         MotionPath supplies the smooth
         lower-left → upper-right arc.
      ================================== */

      const startX = () => -window.innerWidth * 0.72;
      const startY = () => window.innerHeight * 0.76;

      gsap.set(sun, {
        x: startX(),
        y: startY(),
        scale: 0.82,
        opacity: 0,
      });

      const sunrise = gsap.timeline({
        defaults: {
          ease: "sine.inOut",
        },

        onComplete: () => {
          ScrollTrigger.refresh();
        },
      });

      /* ==================================
         SUN APPEARS

         Starts concealed behind sand.
      ================================== */

      sunrise.to(
        sun,
        {
          opacity: 1,

          duration: 0.65,

          ease: "sine.out",
        },
        0.25
      );

      /* ==================================
         SMOOTH SUN ARC

         One continuous Bézier curve instead
         of multiple positional keyframes.
      ================================== */

      sunrise.to(
        sun,
        {
          motionPath: {
            path: [
              {
                x: startX(),
                y: startY(),
              },
              {
                x: -window.innerWidth * 0.65,
                y: window.innerHeight * 0.48,
              },
              {
                x: -window.innerWidth * 0.48,
                y: window.innerHeight * 0.2,
              },
              {
                x: -window.innerWidth * 0.25,
                y: window.innerHeight * 0.055,
              },
              {
                x: 0,
                y: 0,
              },
            ],

            curviness: 1.7,
          },

          scale: 1,

          duration: 5.6,

          ease: "power1.inOut",
        },
        0
      );

      /* ==================================
         SKY — FIRST LIGHT
      ================================== */

      sunrise.to(
        sky,
        {
          "--sky-top": "#44485f",
          "--sky-middle": "#745c6c",
          "--sky-horizon": "#bd7377",

          duration: 1.4,

          ease: "sine.inOut",
        },
        0
      );

      /* ==================================
         SKY — WARM SUNRISE
      ================================== */

      sunrise.to(
        sky,
        {
          "--sky-top": "#62687d",
          "--sky-middle": "#a8757f",
          "--sky-horizon": "#e88976",

          duration: 1.5,

          ease: "sine.inOut",
        },
        1.15
      );

      /* ==================================
         SKY — PEAK SUNRISE

         This is the warm explosion.
      ================================== */

      sunrise.to(
        sky,
        {
          "--sky-top": "#81879a",
          "--sky-middle": "#c68e8a",
          "--sky-horizon": "#f3aa82",

          duration: 1.5,

          ease: "sine.inOut",
        },
        2.45
      );

      /* ==================================
         SKY — CLEAR MORNING

         More alive than the previous
         gray/mauve ending.

         Still muted enough to fit the
         rest of the portfolio.
      ================================== */

      sunrise.to(
        sky,
        {
          "--sky-top": "#126CA7",

          "--sky-middle": "#b8c3c3",
          "--sky-horizon": "#8DCCD9",

          duration: 1.75,

          ease: "sine.inOut",
        },
        3.75
      );

      /* ==================================
         MAIN SCROLL TIMELINE
      ================================== */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sequence,

          start: "top top",

          end: () => `+=${getScrollDistance()}`,

          scrub: 1,

          pin: true,

          anticipatePin: 1,

          invalidateOnRefresh: true,
        },
      });

      /* ==================================
         HORIZONTAL WORLD
      ================================== */

      timeline.to(
        track,
        {
          x: () => -getTrackTravel(),

          duration: 2.7,

          ease: "none",
        },
        0
      );

      /*
       * HERO CONTENT DOES NOT ANIMATE OUT.
       *
       * It simply travels left naturally
       * with the rest of the Hero because
       * it belongs to .intro-track.
       */

      /* ==================================
         UMBRELLA
      ================================== */

      if (umbrella) {
        timeline.to(
          umbrella,
          {
            xPercent: -8,

            duration: 1.45,

            ease: "none",
          },
          0
        );
      }

      /* ==================================
         BEACH BALL
      ================================== */

      if (beachball) {
        timeline.to(
          beachball,
          {
            x: () => Math.min(sequence.clientWidth * 0.36, 460),

            rotation: 540,

            duration: 1.9,

            ease: "none",
          },
          0.15
        );
      }

      /* ==================================
         WAVES
      ================================== */

      timeline.to(
        wave1,
        {
          xPercent: 3,
          duration: 2.8,
          ease: "none",
        },
        0.45
      );

      timeline.to(
        wave2,
        {
          xPercent: 5,
          duration: 2.8,
          ease: "none",
        },
        0.45
      );

      timeline.to(
        wave3,
        {
          xPercent: 8,
          duration: 2.8,
          ease: "none",
        },
        0.45
      );

      timeline.to(
        wave4,
        {
          xPercent: 11,
          duration: 2.8,
          ease: "none",
        },
        0.45
      );

      /* ==================================
         SAND
      ================================== */

      timeline.to(
        sand,
        {
          x: () => -getRemainingSandTravel(),

          duration: 1.15,

          ease: "none",
        },
        1.85
      );

      timeline.to(
        {},
        {
          duration: 0.55,
        }
      );

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, sequence);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sequenceRef} className="intro-sequence">
      <div className="intro-sky" aria-hidden="true" />

      <div className="intro-track">
        <div className="intro-hero">
          <Hero />
        </div>

        <div className="intro-transition" aria-hidden="true" />

        <div className="intro-education">
          <Education />
        </div>

        <div className="intro-sand" aria-hidden="true">
          <svg
            viewBox="0 0 2200 600"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="sandGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D9A18F" />
                <stop offset="65%" stopColor="#E9B9A6" />
                <stop offset="100%" stopColor="#F2CDB7" />
              </linearGradient>
            </defs>
            <path
              d="
                M0 95

                C300 98 570 108 810 135
                C1040 160 1220 190 1380 230
                C1540 270 1660 325 1770 375
                C1880 425 1970 470 2050 515
                C2110 548 2165 575 2200 592

                L2200 600
                L0 600
                Z
              "
              fill="url(#sandGradient)"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default IntroSequence;
