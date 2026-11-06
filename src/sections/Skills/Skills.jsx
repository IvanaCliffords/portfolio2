import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { skillsData } from "./SkillsData";
import "./Skills.css";

gsap.registerPlugin(ScrollTrigger);

/*
 * Deterministic bubble positions.
 *
 * These are intentionally NOT generated with Math.random()
 * during render so they don't jump to different positions
 * whenever React renders again.
 */
const ambientBubbles = [
  { left: 5, top: 4, size: 4, drift: 18, duration: 11, delay: 0.2 },
  { left: 13, top: 12, size: 7, drift: -14, duration: 15, delay: 2.1 },
  { left: 22, top: 7, size: 3, drift: 10, duration: 13, delay: 1.2 },
  { left: 31, top: 18, size: 5, drift: -18, duration: 17, delay: 3.5 },
  { left: 44, top: 9, size: 8, drift: 16, duration: 18, delay: 0.8 },
  { left: 58, top: 16, size: 3, drift: -10, duration: 12, delay: 4.1 },
  { left: 69, top: 6, size: 6, drift: 20, duration: 16, delay: 1.7 },
  { left: 82, top: 13, size: 4, drift: -16, duration: 14, delay: 2.8 },
  { left: 93, top: 8, size: 7, drift: 13, duration: 19, delay: 0.4 },

  { left: 9, top: 27, size: 3, drift: -12, duration: 14, delay: 4.4 },
  { left: 18, top: 35, size: 6, drift: 15, duration: 18, delay: 1.1 },
  { left: 27, top: 24, size: 4, drift: -19, duration: 13, delay: 2.6 },
  { left: 39, top: 32, size: 9, drift: 17, duration: 20, delay: 0.6 },
  { left: 52, top: 26, size: 4, drift: -11, duration: 15, delay: 3.2 },
  { left: 63, top: 38, size: 6, drift: 21, duration: 17, delay: 1.8 },
  { left: 76, top: 29, size: 3, drift: -15, duration: 12, delay: 4.7 },
  { left: 89, top: 34, size: 5, drift: 12, duration: 16, delay: 2.2 },

  { left: 4, top: 48, size: 8, drift: 18, duration: 19, delay: 3.4 },
  { left: 16, top: 56, size: 4, drift: -13, duration: 14, delay: 0.9 },
  { left: 25, top: 44, size: 3, drift: 11, duration: 12, delay: 2.9 },
  { left: 36, top: 61, size: 6, drift: -20, duration: 18, delay: 1.5 },
  { left: 48, top: 51, size: 4, drift: 14, duration: 15, delay: 4.2 },
  { left: 61, top: 58, size: 8, drift: -17, duration: 20, delay: 0.3 },
  { left: 73, top: 46, size: 3, drift: 10, duration: 13, delay: 3.7 },
  { left: 86, top: 55, size: 6, drift: -14, duration: 17, delay: 1.4 },
  { left: 96, top: 49, size: 4, drift: 18, duration: 15, delay: 2.5 },

  { left: 8, top: 72, size: 5, drift: -16, duration: 16, delay: 0.7 },
  { left: 21, top: 82, size: 3, drift: 12, duration: 13, delay: 3.1 },
  { left: 34, top: 69, size: 7, drift: -18, duration: 19, delay: 1.9 },
  { left: 47, top: 87, size: 4, drift: 14, duration: 14, delay: 4.6 },
  { left: 59, top: 75, size: 3, drift: -10, duration: 12, delay: 0.5 },
  { left: 71, top: 84, size: 6, drift: 19, duration: 18, delay: 2.4 },
  { left: 83, top: 70, size: 4, drift: -15, duration: 15, delay: 3.9 },
  { left: 94, top: 89, size: 7, drift: 13, duration: 20, delay: 1.3 },
];

const Skills = () => {
  const sectionRef = useRef(null);

  /*
   * Persistent for the lifetime of this Skills component.
   *
   * Once a section has animated, its id goes in here
   * and it can NEVER run its entrance again.
   */
  const animatedSectionsRef = useRef(new Set());

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const groups = gsap.utils.toArray(".skills-group");
      const ambientBubbleElements = gsap.utils.toArray(".ambient-bubble");

      /* ==========================================
         AMBIENT TINY BUBBLES
      ========================================== */

      ambientBubbleElements.forEach((bubble) => {
        const drift = Number(bubble.dataset.drift) || 15;
        const duration = Number(bubble.dataset.duration) || 15;
        const delay = Number(bubble.dataset.delay) || 0;

        /*
         * Give every bubble a slightly different
         * starting offset so the whole field never
         * looks synchronized.
         */
        gsap.set(bubble, {
          y: gsap.utils.random(20, 100),
          x: gsap.utils.random(-8, 8),
        });

        gsap.to(bubble, {
          y: "-=180",
          x: `+=${drift}`,
          duration,
          delay,
          repeat: -1,
          ease: "none",
        });

        /*
         * Separate sideways breathing motion.
         * This makes the path less mechanically straight.
         */
        gsap.to(bubble, {
          x: `+=${drift * -0.65}`,
          duration: duration * 0.48,
          delay: delay * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      /* ==========================================
         LIGHT BEAMS

         Very slow scroll parallax.
         These sit behind everything else.
      ========================================== */

      /* ==========================================
         EACH SKILLS GROUP
      ========================================== */

      groups.forEach((group) => {
        const sectionId = group.id;

        const heading = group.querySelector(".skills-heading");
        const description = group.querySelector(".skills-description");

        const skills = gsap.utils.toArray(group.querySelectorAll(".skill"));

        const floaters = gsap.utils.toArray(
          group.querySelectorAll(".skill-float")
        );

        const fish = group.querySelector(".skills-fish-swimmer");

        const isReversed = group.classList.contains("skills-group--reverse");

        /* ==========================================
           ONE-TIME ENTRANCE
        ========================================== */

        const alreadyAnimated = animatedSectionsRef.current.has(sectionId);

        if (alreadyAnimated) {
          gsap.set(heading, {
            x: 0,
            opacity: 1,
          });

          gsap.set(description, {
            x: 0,
            opacity: 1,
          });

          gsap.set(skills, {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
          });
        } else {
          gsap.set(heading, {
            x: isReversed ? 70 : -70,
            opacity: 0,
          });

          gsap.set(description, {
            x: isReversed ? 45 : -45,
            opacity: 0,
          });

          gsap.set(skills, {
            y: 50,
            scale: 0.75,
            opacity: 0,
          });

          ScrollTrigger.create({
            trigger: group,

            start: "top 72%",

            onEnter: (self) => {
              animatedSectionsRef.current.add(sectionId);

              self.kill();

              const entranceTimeline = gsap.timeline();

              entranceTimeline
                .to(heading, {
                  x: 0,
                  opacity: 1,

                  duration: 1,

                  ease: "power3.out",
                })

                .to(
                  description,
                  {
                    x: 0,
                    opacity: 1,

                    duration: 0.8,

                    ease: "power3.out",
                  },
                  "-=0.6"
                )

                .to(
                  skills,
                  {
                    y: 0,
                    scale: 1,
                    opacity: 1,

                    duration: 0.9,

                    stagger: {
                      each: 0.08,
                      from: "random",
                    },

                    ease: "back.out(1.5)",
                  },
                  "-=0.45"
                );
            },
          });
        }

        /* ==========================================
           SKILL BUBBLE FLOATING

           Independent from entrance.
           Never touches opacity.
        ========================================== */

        floaters.forEach((floater, index) => {
          const direction = index % 2 === 0 ? 1 : -1;

          gsap.to(floater, {
            x: direction * gsap.utils.random(10, 22),

            y: gsap.utils.random(-20, 20),

            rotation: gsap.utils.random(-4, 4),

            duration: gsap.utils.random(3.5, 6),

            ease: "sine.inOut",

            repeat: -1,
            yoyo: true,

            delay: gsap.utils.random(0, 1.5),
          });
        });

        /* ==========================================
           CREATURE — SCROLL DRIVEN
        ========================================== */

        if (fish) {
          const motion = fish.dataset.motion || "swim";

          const direction =
            fish.dataset.direction === "left" ? "left" : "right";

          const rotation = Number(fish.dataset.rotation) || 3;

          /* ========================================
             JELLYFISH
          ======================================== */

          if (motion === "jellyfish") {
            const horizontalTravel =
              Number(fish.dataset.horizontalTravel) || 120;

            const verticalTravel = Number(fish.dataset.verticalTravel) || 520;

            gsap.set(fish, {
              x: 0,
              y: 0,
              rotation: 0,
            });

            const jellyTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: group,

                start: "top bottom",
                end: "bottom top",

                scrub: 1.5,

                invalidateOnRefresh: true,
              },
            });

            jellyTimeline

              /*
               * Long, slow rising path.
               *
               * The creature is deliberately moving
               * through the environment rather than
               * just bobbing beside the content.
               */

              .to(fish, {
                x: horizontalTravel * 0.18,
                y: -verticalTravel * 0.22,

                rotation: 1.5,

                duration: 1.2,

                ease: "sine.inOut",
              })

              .to(fish, {
                x: horizontalTravel * 0.04,
                y: -verticalTravel * 0.4,

                rotation: -1.5,

                duration: 0.9,

                ease: "sine.inOut",
              })

              .to(fish, {
                x: horizontalTravel * 0.5,
                y: -verticalTravel * 0.62,

                rotation: 2,

                duration: 1.2,

                ease: "sine.inOut",
              })

              .to(fish, {
                x: horizontalTravel * 0.32,
                y: -verticalTravel * 0.78,

                rotation: -1,

                duration: 0.9,

                ease: "sine.inOut",
              })

              .to(fish, {
                x: horizontalTravel,
                y: -verticalTravel,

                rotation: 0.5,

                duration: 1.2,

                ease: "sine.inOut",
              });
          } else {
            /* ========================================
               NORMAL FISH / OCTOPUS / SWIMMERS
            ======================================== */

            const bob = Number(fish.dataset.bob) || 20;

            const getStartX = () => {
              const fishWidth = fish.offsetWidth || 120;

              return direction === "right"
                ? -fishWidth - 80
                : group.clientWidth + 80;
            };

            const getEndX = () => {
              const fishWidth = fish.offsetWidth || 120;

              return direction === "right"
                ? group.clientWidth + 80
                : -fishWidth - 80;
            };

            gsap.set(fish, {
              x: getStartX,
              y: 0,
            });

            const fishTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: group,

                start: "top bottom",
                end: "bottom top",

                scrub: 1.5,

                invalidateOnRefresh: true,
              },
            });

            fishTimeline
              .to(fish, {
                x: () => gsap.utils.interpolate(getStartX(), getEndX(), 0.25),

                y: -bob,

                rotation: direction === "right" ? rotation : -rotation,

                duration: 1,

                ease: "sine.inOut",
              })

              .to(fish, {
                x: () => gsap.utils.interpolate(getStartX(), getEndX(), 0.5),

                y: bob * 0.65,

                rotation: direction === "right" ? -rotation : rotation,

                duration: 1,

                ease: "sine.inOut",
              })

              .to(fish, {
                x: () => gsap.utils.interpolate(getStartX(), getEndX(), 0.75),

                y: -bob * 0.55,

                rotation:
                  direction === "right" ? rotation * 0.6 : -rotation * 0.6,

                duration: 1,

                ease: "sine.inOut",
              })

              .to(fish, {
                x: getEndX,

                y: bob * 0.25,

                rotation: 0,

                duration: 1,

                ease: "sine.inOut",
              });
          }
        }
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="skills" ref={sectionRef}>
      {/* ----------------------------------
          BACKGROUND ATMOSPHERE
      ----------------------------------- */}
      <div className="skills-atmosphere" aria-hidden="true">
        <div className="skills-bubbles">
          {ambientBubbles.map((bubble, index) => (
            <span
              key={index}
              className="ambient-bubble"
              data-drift={bubble.drift}
              data-duration={bubble.duration}
              data-delay={bubble.delay}
              style={{
                left: `${bubble.left}%`,
                top: `${bubble.top}%`,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* ----------------------------------
          SKILL SECTIONS
      ----------------------------------- */}

      {skillsData.map((group, index) => {
        const isReversed = index % 2 !== 0;

        return (
          <div
            className={`skills-group ${
              isReversed ? "skills-group--reverse" : ""
            }`}
            id={group.id}
            key={group.id}
          >
            <div className="skills-intro">
              <h2 className="skills-heading">{group.title}</h2>

              <p className="skills-description">{group.description}</p>
            </div>

            <div className="skills-field">
              {group.skills.map((skill, skillIndex) => (
                <div
                  className={`skill skill-${skillIndex + 1}`}
                  key={skill.skillName}
                >
                  <div className="skill-float">
                    <div className="skill-icon">
                      <span className="skill-icon-content">{skill.icon}</span>
                    </div>

                    <span className="skill-name">{skill.skillName}</span>
                  </div>
                </div>
              ))}
            </div>

            {group.fish && (
              <div
                className={`skills-fish-swimmer ${
                  group.fish.motion === "jellyfish"
                    ? "skills-creature--jellyfish"
                    : ""
                }`}
                data-motion={group.fish.motion || "swim"}
                data-direction={group.fish.direction}
                data-bob={group.fish.bob}
                data-rotation={group.fish.rotation ?? 3}
                data-horizontal-travel={group.fish.horizontalTravel ?? 0}
                data-vertical-travel={group.fish.verticalTravel ?? 0}
                style={{
                  top: group.fish.top,
                  left: group.fish.left ?? 0,
                  width: group.fish.width,
                }}
              >
                <div
                  aria-hidden="true"
                  className={`skills-fish ${
                    group.fish.direction === "left" ? "skills-fish--left" : ""
                  }`}
                  style={{
                    "--fish-src": `url("${group.fish.src}")`,
                    "--fish-color": group.fish.color ?? "#f4dfd8",
                    aspectRatio: group.fish.aspectRatio ?? "1",
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default Skills;
