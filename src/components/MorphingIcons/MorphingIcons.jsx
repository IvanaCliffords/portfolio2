import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

import "./MorphingIcons.css";

gsap.registerPlugin(useGSAP, MorphSVGPlugin);

const morphContent = [
  {
    eyebrow: "Experience",
    type: "experience",
  },
  {
    eyebrow: "MITxPRO · Certificate in Coding",
    type: "mit",
  },
  {
    eyebrow: "University of Belgrade",
    type: "university",
  },
  {
    eyebrow: "Beyond the screen",
    type: "travel",
  },
];

export default function MorphingIcons() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const textItems = gsap.utils.toArray(".morph-text", containerRef.current);

      const morphDuration = 1.6;
      const fadeDuration = 0.55;
      const holdDuration = 2.6;

      gsap.set(textItems, {
        autoAlpha: 0,
        y: 10,
        position: "absolute",
      });

      gsap.set(textItems[0], {
        autoAlpha: 1,
        y: 0,
      });

      const steps = [
        ["#laptop", 0, 1],
        ["#graduation", 1, 2],
        ["#location", 2, 3],
        ["#five", 3, 0],
      ];

      const tl = gsap.timeline({
        repeat: -1,
      });

      steps.forEach(([target, currentIndex, nextIndex]) => {
        /*
         * Give the current state enough time
         * to breathe before transitioning.
         */
        tl.to({}, { duration: holdDuration });

        /*
         * Morph the icon.
         */
        tl.to("#morph", {
          morphSVG: target,
          duration: morphDuration,
          ease: "expo.inOut",
        });

        /*
         * Fade current typography out while
         * the icon begins morphing.
         */
        tl.to(
          textItems[currentIndex],
          {
            autoAlpha: 0,
            y: -10,
            duration: fadeDuration,
            ease: "power2.in",
          },
          "<"
        );

        /*
         * Bring the next typography in toward
         * the end of the icon morph.
         */
        tl.to(
          textItems[nextIndex],
          {
            autoAlpha: 1,
            y: 0,
            duration: fadeDuration,
            ease: "power2.out",
          },
          `<${morphDuration * 0.62}`
        );
      });

      return () => {
        tl.kill();
      };
    },
    {
      scope: containerRef,
      dependencies: [],
    }
  );

  return (
    <div ref={containerRef} className="morph-container">
      {/* ==================================
          MORPHING ICON
      ================================== */}

      <div className="morph-icon">
        <svg
          className="morph-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            {/* ==================================
                ICON GRADIENT
            ================================== */}

            <linearGradient
              id="grad"
              x1="0"
              y1="0"
              x2="100"
              y2="100"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#c8665f" />
              <stop offset="1" stopColor="#e7a184" />
            </linearGradient>

            {/* ==================================
                FIVE
            ================================== */}

            <path
              id="five"
              d="
                M33.3333 12.5
                A4.1671 4.1671 0 0 0 29.1667 16.6667
                V50
                A4.1671 4.1671 0 0 0 33.3333 54.1667
                H50
                C54.5139 54.1667 57.369 55.7094 59.3831 57.9753
                C61.3973 60.2412 62.5 63.4259 62.5 66.6667
                C62.5 69.9074 61.3973 73.0922 59.3831 75.3581
                C57.369 77.624 54.5139 79.1667 50 79.1667
                H33.3333
                A4.1667 4.1667 0 0 0 29.1667 83.3333
                A4.1667 4.1667 0 0 0 33.3333 87.5
                H50
                C56.5972 87.5 62.0755 84.876 65.6169 80.8919
                C69.1583 76.9078 70.8333 71.7593 70.8333 66.6667
                C70.8333 61.5741 69.1583 56.4255 65.6169 52.4414
                C62.0755 48.4573 56.5972 45.8333 50 45.8333
                H37.5
                V20.8333
                H66.6667
                A4.1667 4.1667 0 0 0 70.8333 16.6667
                A4.1667 4.1667 0 0 0 66.6667 12.5
                Z
              "
            />

            {/* ==================================
                LAPTOP
            ================================== */}

            <path
              id="laptop"
              d="
                M9 70.5
                H91
                C91 72.675 90.136 74.761 88.598 76.298
                C87.061 77.836 84.975 78.7 82.8 78.7
                H17.2
                C15.025 78.7 12.94 77.836 11.402 76.298
                C9.864 74.761 9 72.675 9 70.5
                Z

                M74.6 21.3
                C76.775 21.3 78.861 22.164 80.398 23.702
                C81.936 25.239 82.8 27.325 82.8 29.5
                V62.3
                H61.16
                C60.446 61.057 59.418 60.023 58.178 59.304
                C56.938 58.584 55.531 58.204 54.098 58.201
                H45.902
                C44.469 58.204 43.061 58.584 41.821 59.304
                C40.581 60.023 39.552 61.057 38.838 62.3
                H17.2
                V29.5
                C17.2 27.325 18.064 25.239 19.602 23.702
                C21.139 22.164 23.225 21.3 25.4 21.3
                Z

                M58.2 41.8
                C58.2 39.625 57.336 37.539 55.798 36.002
                C54.261 34.464 52.175 33.6 50 33.6
                C47.825 33.6 45.739 34.464 44.202 36.002
                C42.664 37.539 41.8 39.625 41.8 41.8
                C41.8 43.975 42.664 46.061 44.202 47.598
                C45.739 49.136 47.825 50 50 50
                C52.175 50 54.261 49.136 55.798 47.598
                C57.336 46.061 58.2 43.975 58.2 41.8
                Z
              "
            />

            {/* ==================================
                GRADUATION
            ================================== */}

            <path
              id="graduation"
              d="
                M77.676 48.754
                V73.063
                H22.326
                V48.754
                L47.695 58.671
                L47.696 58.671
                C49.18 59.245 50.824 59.245 52.308 58.671
                L77.676 48.754
                Z

                M22.324 76.137
                H77.674
                V79.211
                C77.672 80.026 77.347 80.807 76.771 81.383
                C76.194 81.959 75.413 82.284 74.598 82.287
                H25.399
                C24.584 82.284 23.803 81.959 23.227 81.383
                C22.651 80.807 22.326 80.026 22.324 79.211
                Z

                M94.141 33.309
                L51.18 16.522
                C50.42 16.225 49.576 16.225 48.817 16.522
                L5.858 33.309
                C5.077 33.599 4.449 34.197 4.12 34.962
                C3.792 35.728 3.792 36.595 4.12 37.361
                C4.449 38.127 5.077 38.725 5.858 39.015
                L48.817 55.801
                C49.576 56.098 50.42 56.098 51.18 55.801
                L94.141 39.015
                C94.922 38.725 95.55 38.127 95.879 37.361
                C96.207 36.595 96.207 35.728 95.879 34.962
                C95.55 34.197 94.922 33.599 94.141 33.309
                Z

                M91.512 37.193
                V48.463
                C91.512 49.312 90.824 50.001 89.974 50.001
                C89.125 50.001 88.437 49.312 88.437 48.463
                V38.408
                L91.512 37.193
                Z

                M93.84 48.988
                L90.765 47.143
                C90.278 46.851 89.67 46.851 89.183 47.143
                L86.108 48.988
                C85.645 49.266 85.361 49.766 85.361 50.307
                V56.149
                C85.291 56.897 85.522 57.642 86.003 58.219
                C86.484 58.796 87.176 59.158 87.923 59.224
                H92.024
                C92.773 59.158 93.464 58.796 93.944 58.219
                C94.425 57.642 94.656 56.897 94.587 56.149
                V50.307
                C94.586 49.766 94.303 49.266 93.84 48.988
                Z
              "
            />

            {/* ==================================
                LOCATION
            ================================== */}

            <path
              id="location"
              d="
                m 78.3672 30.5039
                c -2.7984 8.3793 -10.1479 17.2967 -12.1002 19.5723
                v 30.75
                l 24.8613 5.3199
                v -52.9062
                z

                m -28.0293 0
                -12.7609 2.7367
                -0.0008 52.9375
                24.8457 -5.3199
                v -30.75
                c -1.9363 -2.3057 -9.3475 -11.2236 -12.0842 -19.6035
                z

                m -41.5117 -2.5986
                v 52.9512
                l 24.8613 5.3199
                v -52.9512
                z

                m 55.5195 -14.5447
                c -2.9893 0 -5.8555 1.1879 -7.9689 3.3012
                -2.1141 2.1133 -3.3012 4.9797 -3.3012 7.9689
                0 6.627 7.1648 16.7436 11.2701 21.7559
                3.3211 -4.074 11.2701 -14.5752 11.2701 -21.7559
                h -0.0008
                c 0 -2.9893 -1.1871 -5.8555 -3.3004 -7.9689
                -2.1133 -2.1133 -4.9805 -3.3012 -7.9689 -3.3012
                z

                m 0 18.0504
                c -1.8036 0 -3.5324 -0.7164 -4.8072 -1.992
                -1.2749 -1.2756 -1.9898 -3.0053 -1.9891 -4.8088
                0.0015 -1.8028 0.7195 -3.5316 1.9967 -4.8057
                1.2764 -1.2733 3.0068 -1.9875 4.8096 -1.9844
                1.8036 0 3.5316 0.7217 4.8043 1.9988
                1.2726 1.2779 1.9852 3.009 1.9814 4.8119
                -0.0038 1.7998 -0.7217 3.5248 -1.9959 4.7959
                -1.2741 1.2711 -2.9998 1.9844 -4.7996 1.9844
                z

                m 0 -9.732
                c -0.7828 0 -1.5343 0.3113 -2.0875 0.8644
                -0.5539 0.5539 -0.8644 1.3046 -0.8644 2.0875
                s 0.3105 1.5343 0.8644 2.0875
                c 0.5531 0.5539 1.3046 0.8644 2.0875 0.8644
                0.7828 0 1.5335 -0.3105 2.0875 -0.8644
                0.5531 -0.5531 0.8644 -1.3046 0.8644 -2.0875
                s -0.3113 -1.5335 -0.8644 -2.0875
                c -0.5539 -0.5531 -1.3046 -0.8644 -2.0875 -0.8644
                z
              "
            />
          </defs>

          {/* ==================================
              ACTIVE MORPH PATH

              Starts as "five".
              GSAP morphs this path through
              laptop → graduation → location.
          ================================== */}

          <path
            id="morph"
            fill="url(#grad)"
            d="
              M33.3333 12.5
              A4.1671 4.1671 0 0 0 29.1667 16.6667
              V50
              A4.1671 4.1671 0 0 0 33.3333 54.1667
              H50
              C54.5139 54.1667 57.369 55.7094 59.3831 57.9753
              C61.3973 60.2412 62.5 63.4259 62.5 66.6667
              C62.5 69.9074 61.3973 73.0922 59.3831 75.3581
              C57.369 77.624 54.5139 79.1667 50 79.1667
              H33.3333
              A4.1667 4.1667 0 0 0 29.1667 83.3333
              A4.1667 4.1667 0 0 0 33.3333 87.5
              H50
              C56.5972 87.5 62.0755 84.876 65.6169 80.8919
              C69.1583 76.9078 70.8333 71.7593 70.8333 66.6667
              C70.8333 61.5741 69.1583 56.4255 65.6169 52.4414
              C62.0755 48.4573 56.5972 45.8333 50 45.8333
              H37.5
              V20.8333
              H66.6667
              A4.1667 4.1667 0 0 0 70.8333 16.6667
              A4.1667 4.1667 0 0 0 66.6667 12.5
              Z
            "
          />
        </svg>
      </div>

      {/* ==================================
          MORPHING TYPOGRAPHY
      ================================== */}

      <div className="morph-text-wrapper">
        <ul>
          {/* EXPERIENCE */}

          <li className="morph-text">
            <span className="morph-eyebrow">{morphContent[0].eyebrow}</span>

            <span className="morph-display morph-display--compact">
              years building
              <br />
              for the web.
            </span>
          </li>

          {/* MIT */}

          <li className="morph-text">
            <span className="morph-eyebrow">{morphContent[1].eyebrow}</span>

            <span className="morph-display">
              mern full-stack
              <br />
              development.
            </span>
          </li>

          {/* UNIVERSITY */}

          <li className="morph-text">
            <span className="morph-eyebrow">{morphContent[2].eyebrow}</span>

            <span className="morph-display">
              bachelors in
              <br />
              sociology.
            </span>
          </li>

          {/* TRAVEL */}

          <li className="morph-text">
            <div className="morph-stat-row">
              <span className="morph-stat">
                <span className="morph-stat-label">lived in</span>

                <span className="morph-stat-number">4</span>
              </span>

              <span className="morph-stat">
                <span className="morph-stat-label">travelled to</span>

                <span className="morph-stat-number">22</span>
              </span>
            </div>

            <span className="morph-display morph-display--compact">
              countries &
              <br />
              counting.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
