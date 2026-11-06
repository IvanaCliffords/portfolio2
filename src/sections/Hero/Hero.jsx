import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import umbrella from "../../assets/beach/umbrella.svg";
import bird from "../../assets/beach/bird.svg";
import beachball from "../../assets/beach/beachball.svg";
import palm from "../../assets/beach/palm-2.svg";

import "./Hero.css";

const Hero = () => {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .from(".hero-eyebrow", {
          y: 20,
          opacity: 0,
          duration: 0.7,
        })
        .from(
          ".hero-title-line",
          {
            yPercent: 110,
            duration: 1,
            stagger: 0.12,
          },
          "-=0.35"
        )
        .from(
          ".hero-description",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.55"
        )
        .from(
          ".hero-actions",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5"
        )
        .from(
          ".hero-palm",
          {
            x: -70,
            opacity: 0,
            duration: 1.1,
          },
          0.15
        )
        .from(
          ".hero-umbrella",
          {
            x: -80,
            opacity: 0,
            rotation: -3,
            duration: 1.1,
          },
          0.2
        )
        .from(
          ".hero-beachball",
          {
            x: -50,
            rotation: -80,
            opacity: 0,
            duration: 1,
          },
          0.45
        )
        .from(
          ".hero-bird",
          {
            x: -35,
            y: 12,
            opacity: 0,
            duration: 0.8,
          },
          0.6
        );

      gsap.to(".hero-bird", {
        y: -7,
        rotation: 2,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".hero-umbrella", {
        rotation: 0.7,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "50% 100%",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero"
    >
      <div
        className="hero-scene"
        aria-hidden="true"
      >
        <img
          src={palm}
          alt=""
          className="hero-art hero-palm"
        />

        <img
          src={umbrella}
          alt=""
          className="hero-art hero-umbrella"
        />

        <img
          src={beachball}
          alt=""
          className="hero-art hero-beachball"
        />

        <div className="hero-sun">
          <div className="hero-sun-core" />
        </div>

        <img
          src={bird}
          alt=""
          className="hero-art hero-bird"
        />
      </div>

      <div className="hero-content">
        <p className="hero-eyebrow">
          Hello world, I'm Ivana.
        </p>

        <h1 className="hero-title">
          <span className="hero-title-mask">
            <span className="hero-title-line">
              Full-stack
            </span>
          </span>

          <span className="hero-title-mask">
            <span className="hero-title-line">
              web developer.
            </span>
          </span>
        </h1>

        <p className="hero-description">
          I build thoughtful digital experiences with clean code,
          playful interactions, and a healthy obsession with the
          details. I also <strong>do beach</strong>.
        </p>

        <div className="hero-actions">
          <a
            href="/resume.pdf"
            className="hero-button hero-button--primary"
          >
            Résumé
          </a>

          <a
            href="#contact"
            className="hero-button hero-button--secondary"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;