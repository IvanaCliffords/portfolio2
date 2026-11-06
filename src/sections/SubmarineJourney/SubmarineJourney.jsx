import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import submarine from "../../assets/deepsea/submarine.svg";
import seaweed from "../../assets/deepsea/seaweed.svg";
import reef from "../../assets/deepsea/reef.svg";

// import ProjectIslands from "./ProjectIslands/ProjectIslands

import "./SubmarineJourney.css";
import ProjectIslands from "../ProjectIslands/ProjectIslands";

gsap.registerPlugin(ScrollTrigger);

const bubbles = [
  { left: "10%", top: "72%", size: 7, delay: 0.2 },
  { left: "15%", top: "58%", size: 11, delay: 1.2 },
  { left: "21%", top: "80%", size: 5, delay: 0.7 },
  { left: "28%", top: "49%", size: 8, delay: 1.8 },
  { left: "37%", top: "69%", size: 6, delay: 0.4 },
  { left: "45%", top: "38%", size: 10, delay: 1.5 },
  { left: "57%", top: "61%", size: 5, delay: 2.1 },
  { left: "67%", top: "31%", size: 7, delay: 0.9 },
  { left: "77%", top: "51%", size: 12, delay: 1.1 },
  { left: "88%", top: "27%", size: 6, delay: 2.3 },
];

const SubmarineJourney = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    const ctx = gsap.context(() => {
      const submarineEl = section.querySelector(".journey-submarine");

      const seafloor = section.querySelector(".journey-seafloor");

      const foreground = section.querySelector(".journey-seafloor-foreground");

      const lightWater = section.querySelector(".journey-light-water");

      const surface = section.querySelector(".journey-surface");

      const surfaceGlow = section.querySelector(".journey-surface-glow");

      const bubbleTrail = section.querySelector(".journey-submarine-bubbles");

      const sky = section.querySelector(".journey-sky");

      const projectWorld = section.querySelector(".journey-projects");

      const projectTrack = section.querySelector(".journey-project-track");

      if (
        !submarineEl ||
        !seafloor ||
        !foreground ||
        !lightWater ||
        !surface ||
        !surfaceGlow ||
        !bubbleTrail ||
        !sky ||
        !projectWorld ||
        !projectTrack
      ) {
        console.error("SubmarineJourney: required DOM element missing");

        return;
      }

      const getWidth = () => section.clientWidth;

      const getHeight = () => section.clientHeight;

      const getSubmarineAnchorX = () => getWidth() * 0.42;

      const getHorizontalDistance = () =>
        Math.max(0, projectTrack.scrollWidth - section.clientWidth);

      /*
       * We now need more scroll distance because
       * the SAME pinned section handles both:
       *
       * 1. ascent
       * 2. project island journey
       */
      const getScrollDistance = () => {
        const ascentDistance = window.innerHeight * 6.3;

        const horizontalDistance = getHorizontalDistance() * 1.15;

        return ascentDistance + horizontalDistance;
      };

      /* ==================================
         INITIAL STATE
      ================================== */

      gsap.set(submarineEl, {
        x: () => -getWidth() * 0.08,
        y: () => getHeight() * 0.04,

        rotation: 0,

        transformOrigin: "50% 50%",
      });

      gsap.set(bubbleTrail, {
        x: () => -getWidth() * 0.08,
        y: () => getHeight() * 0.04,
      });

      gsap.set(lightWater, {
        opacity: 0,
      });

      gsap.set(surface, {
        yPercent: -155,
      });

      gsap.set(surfaceGlow, {
        opacity: 0,
      });

      gsap.set(sky, {
        yPercent: -100,
        opacity: 1,
      });

      /*
       * Project world exists inside this scene
       * from the beginning but remains hidden.
       */
    

      gsap.set(projectTrack, {
        x: 0,
      });

      /* ==================================
         MASTER TIMELINE
      ================================== */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,

          start: "top top",

          end: () => `+=${getScrollDistance()}`,

          scrub: 1,

          pin: true,

          anticipatePin: 1,

          invalidateOnRefresh: true,
        },
      });

      /* ==================================
         PHASE 1
         LEAVE THE SEAFLOOR
      ================================== */

      timeline.to(
        submarineEl,
        {
          x: () => getWidth() * 0.2,

          y: () => getHeight() * 0.01,

          rotation: -3,

          duration: 1,

          ease: "none",
        },
        0
      );

      timeline.to(
        bubbleTrail,
        {
          x: () => getWidth() * 0.2,

          y: () => getHeight() * 0.01,

          duration: 1,

          ease: "none",
        },
        0
      );

      /* ==================================
         PHASE 2
         BEGIN ASCENT
      ================================== */

      timeline.to(submarineEl, {
        x: () => getWidth() * 0.46,

        y: () => -getHeight() * 0.04,

        rotation: -7,

        duration: 1.1,

        ease: "none",
      });

      timeline.to(
        bubbleTrail,
        {
          x: () => getWidth() * 0.46,

          y: () => -getHeight() * 0.04,

          duration: 1.1,

          ease: "none",
        },
        "<"
      );

      /* ==================================
         PHASE 3
         STRONGER ASCENT
      ================================== */

      timeline.to(submarineEl, {
        x: () => getWidth() * 0.64,

        y: () => -getHeight() * 0.085,

        rotation: -11,

        duration: 1.15,

        ease: "none",
      });

      timeline.to(
        bubbleTrail,
        {
          x: () => getWidth() * 0.64,

          y: () => -getHeight() * 0.085,

          duration: 1.15,

          ease: "none",
        },
        "<"
      );

      /* ==================================
         SEA FLOOR FALLS AWAY
      ================================== */

      timeline.to(
        seafloor,
        {
          x: () => -getWidth() * 0.12,

          y: () => getHeight() * 0.62,

          duration: 3.2,

          ease: "none",
        },
        0.35
      );

      timeline.to(
        foreground,
        {
          x: () => -getWidth() * 0.2,

          y: () => getHeight() * 0.82,

          duration: 2.9,

          ease: "none",
        },
        0.35
      );

      /* ==================================
         WATER LIGHTENS
      ================================== */

      timeline.to(
        lightWater,
        {
          opacity: 1,

          duration: 2.9,

          ease: "none",
        },
        1.45
      );

      /* ==================================
   PHASE 4
   OPEN WATER

   The submarine has completed its
   major rightward travel.

   From here we guide it toward its
   permanent cruising anchor.
================================== */

      timeline.to(submarineEl, {
        x: getSubmarineAnchorX,

        y: () => getHeight() * 0.02,

        rotation: -6,

        duration: 1.3,

        ease: "none",
      });

      timeline.to(
        bubbleTrail,
        {
          x: getSubmarineAnchorX,

          y: () => getHeight() * 0.02,

          duration: 1.3,

          ease: "none",
        },
        "<"
      );

      /* ==================================
     PHASE 5
     SURFACE APPROACH
  
     X IS NOW LOCKED.
  
     From here on, the submarine only
     changes depth/rotation.
  ================================== */

      timeline.to(
        surfaceGlow,
        {
          opacity: 1,

          duration: 0.8,

          ease: "none",
        },
        4.15
      );

      timeline.to(
        surface,
        {
          yPercent: 0,

          duration: 1,

          ease: "none",
        },
        4.35
      );

      timeline.to(sky, {
        yPercent: 0,
        ease: "none",
      });

      timeline.to(
        submarineEl,
        {
          x: getSubmarineAnchorX,

          y: () => getHeight() * 0.08,

          rotation: -3,

          duration: 0.95,

          ease: "none",
        },
        4.45
      );

      timeline.to(
        bubbleTrail,
        {
          x: getSubmarineAnchorX,

          y: () => getHeight() * 0.08,

          duration: 0.95,

          ease: "none",
        },
        4.45
      );

      /* ==================================
     PHASE 6
     LEVEL OUT
  
     Still anchored horizontally.
  ================================== */

      timeline.to(
        submarineEl,
        {
          x: getSubmarineAnchorX,

          y: () => getHeight() * 0.15,

          rotation: 0,

          duration: 0.9,

          ease: "none",
        },
        5.2
      );

      timeline.to(
        bubbleTrail,
        {
          x: getSubmarineAnchorX,

          y: () => getHeight() * 0.15,

          duration: 0.9,

          ease: "none",
        },
        5.2
      );

      /* ==================================
   PHASE 7
   SETTLE INTO CRUISING POSITION

   Short transition only.
   The submarine is essentially done
   moving before the islands arrive.
================================== */

      timeline.to(
        submarineEl,
        {
          x: getSubmarineAnchorX,

          y: () => getHeight() * 0.15,

          rotation: 0,

          duration: 0.55,

          ease: "none",
        },
        5.85
      );

      timeline.to(
        bubbleTrail,
        {
          x: getSubmarineAnchorX,

          y: () => getHeight() * 0.15,

          duration: 0.55,

          ease: "none",
        },
        5.85
      );

      /* ==================================
     PHASE 8
     PROJECT WORLD
  
     Make the project layer available
     BEFORE the first island reaches
     the viewport.
  
     Nothing moves vertically here.
  ================================== */

    

      /* ==================================
     PHASE 9
     HORIZONTAL ISLAND JOURNEY
  
     Start BEFORE the submarine has
     completely finished settling.
  
     This creates one continuous motion:
     submarine settles while the first
     island begins approaching from right.
  ================================== */

      timeline.to(
        projectTrack,
        {
          x: () => -getHorizontalDistance(),

          duration: 5.8,

          ease: "none",
        },
        6.0
      );

      /* ==================================
     SUBMARINE CRUISE
  
     Keep submarine visually anchored.
  
     IMPORTANT:
     We do not need another submarine
     tween here. Its previous tween leaves
     it at the final transform automatically.
  ================================== */

      /* ==================================
     BUBBLE TRAIL
  
     Keep the trail with the submarine.
     Do NOT send it toward 74vw anymore.
  ================================== */

      timeline.to(
        bubbleTrail,
        {
          x: getSubmarineAnchorX,

          y: () => getHeight() * 0.15,

          duration: 5.8,

          ease: "none",
        },
        6.0
      );

      /* ==================================
     FINAL HOLD
  ================================== */

      timeline.to(
        {},
        {
          duration: 0.35,
        }
      );
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="submarine-journey"
      aria-label="Journey through skills and projects"
    >
      <div className="journey-light-water" aria-hidden="true" />

      <div className="journey-sky" aria-hidden="true" />

      <div className="journey-ambient-bubbles" aria-hidden="true">
        {bubbles.map((bubble, index) => (
          <span
            key={index}
            className="journey-bubble"
            style={{
              left: bubble.left,
              top: bubble.top,

              width: `${bubble.size}px`,
              height: `${bubble.size}px`,

              animationDelay: `${bubble.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="journey-seafloor" aria-hidden="true">
        <div className="journey-ground journey-ground--back" />

        <img
          src={seaweed}
          alt=""
          className="journey-plant journey-seaweed journey-seaweed--1"
        />

        <img
          src={reef}
          alt=""
          className="journey-plant journey-coral journey-coral--1"
        />

        <img
          src={seaweed}
          alt=""
          className="journey-plant journey-seaweed journey-seaweed--2"
        />

        <img
          src={reef}
          alt=""
          className="journey-plant journey-coral journey-coral--2"
        />
      </div>

      <div className="journey-seafloor-foreground" aria-hidden="true">
        <div className="journey-ground journey-ground--front" />

        <img
          src={seaweed}
          alt=""
          className="journey-plant journey-seaweed journey-seaweed--3"
        />

        <img
          src={reef}
          alt=""
          className="journey-plant journey-coral journey-coral--3"
        />
      </div>

      {/*
       * IMPORTANT:
       *
       * This is only the island track.
       * It does NOT create another section,
       * ocean, surface, or submarine.
       */}
      <ProjectIslands />

      <div className="journey-submarine-bubbles" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <img
        src={submarine}
        alt=""
        className="journey-submarine"
        aria-hidden="true"
      />

      <div className="journey-surface-glow" aria-hidden="true" />

      <div className="journey-surface" aria-hidden="true">
        {/* <div className="journey-surface-line journey-surface-line--back" />

        <div className="journey-surface-line journey-surface-line--front" /> */}
      </div>
    </section>
  );
};

export default SubmarineJourney;
