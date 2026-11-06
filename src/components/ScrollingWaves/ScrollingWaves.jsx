import "./ScrollingWaves.css";

const waves = [
  {
    className: "wave--1",
  
    path: `
      M0 292
  
      C45 286 90 274 140 255
      C205 230 270 196 345 162
  
      C445 116 545 92 650 108
      C755 124 840 164 945 148
  
      C1050 132 1135 88 1240 90
      C1345 92 1425 132 1510 116
      C1550 108 1578 100 1600 94
  
      L1600 300
      L0 300
      Z
    `,
  },

  {
    className: "wave--2",
  
    path: `
      M0 235
  
      C70 232 135 224 200 210
      C270 195 330 174 400 150
  
      C490 120 575 108 675 122
      C775 136 860 158 955 146
  
      C1055 133 1140 112 1240 122
      C1340 132 1430 150 1515 138
      C1550 132 1578 126 1600 122
  
      L1600 300
      L0 300
      Z
    `,
  },

  {
    className: "wave--3",

    path: `
      M0 215

      C110 210 200 198 285 180
      C375 160 450 142 535 134

      C630 124 710 138 805 152
      C900 166 990 175 1080 158

      C1180 140 1260 128 1360 142
      C1450 154 1520 166 1600 150

      L1600 300
      L0 300
      Z
    `,
  },

  {
    className: "wave--4",

    path: `
      M0 165

      C190 115 330 115 480 155
      C630 195 770 188 930 150

      C1080 114 1230 118 1370 154
      C1460 178 1530 174 1600 150

      L1600 300
      L0 300
      Z
    `,
  },
];

const ScrollingWaves = () => {
  return (
    <div
      className="scrolling-waves"
      aria-hidden="true"
    >
      {waves.map(({ className, path }) => (
        <div
          key={className}
          className={`wave ${className}`}
        >
          <svg
            viewBox="0 0 1600 300"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={path}
              fill="currentColor"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default ScrollingWaves;