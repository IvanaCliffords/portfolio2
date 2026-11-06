import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import shell from "../../assets/shells/shell.svg";
import "./ShellDivider.css";

gsap.registerPlugin(ScrollTrigger);

const shellConfig = [
  { rotation: -18, y: -18, scale: 1.2 },
  { rotation: 10, y: 8, scale: 1.05 },
  { rotation: -8, y: -10, scale: 1.3 },
  { rotation: 14, y: 12, scale: 1.1 },
  { rotation: -12, y: -14, scale: 1.22 },
  { rotation: 7, y: 6, scale: 1.08 },
  { rotation: -15, y: -12, scale: 1.28 },
  { rotation: 11, y: 9, scale: 1.12 },
];

function ShellDivider() {
  const dividerRef = useRef(null);
  const shellRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      shellRefs.current.forEach((element, index) => {
        const config = shellConfig[index];

        gsap.set(element, {
          rotation: config.rotation,
          y: config.y,
          scale: config.scale,
        });
      });

      gsap.from(shellRefs.current, {
        x: (index) => -180 - index * 18,
        y: (index) => (index % 2 === 0 ? -90 : 90),
        rotation: (index) => (index % 2 === 0 ? -35 : 35),
        opacity: 0,
        scale: 0.75,
        duration: 1.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: dividerRef.current,
          start: "top 92%",
          once: true,
        },
      });
    }, dividerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={dividerRef}
      className="shell-divider"
      aria-hidden="true"
    >
      {shellConfig.map((_, index) => (
        <img
          key={index}
          ref={(element) => {
            shellRefs.current[index] = element;
          }}
          src={shell}
          alt=""
          className="shell-divider__shell"
        />
      ))}
    </div>
  );
}

export default ShellDivider;