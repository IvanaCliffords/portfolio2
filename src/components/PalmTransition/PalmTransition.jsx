import "./PalmTransition.css";

const PalmTransition = ({
  backgroundColor = "#f4dfd8",
  palmColor = "#181e27",
}) => {
  return (
    <svg
      className="palm-transition"
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMaxYMid meet"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* HERO BACKGROUND EXTENSION */}
      <rect
        className="palm-transition__background"
        x="0"
        y="0"
        width="1320"
        height="1000"
        fill={backgroundColor}
      />

      {/* SMALL OVERLAP BEHIND PALM */}
      <path
        d="
          M1240 0
          H1390
          C1350 180 1370 340 1335 500
          C1300 650 1355 820 1310 1000
          H1240
          Z
        "
        fill={backgroundColor}
      />

      {/* PALM TREE */}
      <g
        className="palm-transition__tree"
        fill={palmColor}
        transform="translate(1120 0)"
      >
        {/* trunk */}
        <path
          d="
            M215 1000
            C245 885 265 770 270 650
            C276 530 255 420 235 315
            C220 235 214 165 230 105
            C248 155 265 220 276 300
            C293 420 305 540 297 660
            C289 786 263 898 245 1000
            Z
          "
        />

        {/* crown center */}
        <ellipse cx="245" cy="170" rx="36" ry="30" />

        {/* upper frond */}
        <path
          d="
            M246 170
            C250 95 280 32 334 0
            C304 60 288 113 282 177
            C274 148 264 141 246 170
            Z
          "
        />

        {/* upper-left frond */}
        <path
          d="
            M247 172
            C183 98 120 74 55 90
            C120 103 170 135 221 192
            C228 178 236 171 247 172
            Z
          "
        />

        {/* left frond */}
        <path
          d="
            M236 176
            C143 145 65 158 0 214
            C79 188 149 194 220 212
            C220 195 225 184 236 176
            Z
          "
        />

        {/* lower-left frond */}
        <path
          d="
            M237 184
            C161 193 107 235 75 302
            C127 250 181 223 235 214
            C228 201 229 192 237 184
            Z
          "
        />

        {/* upper-right frond */}
        <path
          d="
            M255 169
            C326 97 396 80 464 109
            C392 111 331 137 275 193
            C269 180 264 173 255 169
            Z
          "
        />

        {/* right frond */}
        <path
          d="
            M260 177
            C347 147 428 166 490 226
            C414 196 343 198 275 216
            C278 199 272 186 260 177
            Z
          "
        />

        {/* lower-right frond */}
        <path
          d="
            M257 187
            C332 199 387 243 419 315
            C367 257 317 226 261 216
            C268 203 266 194 257 187
            Z
          "
        />

        {/* small grass at base */}
        <path
          d="
            M175 1000
            C190 966 205 952 217 944
            C212 967 211 983 214 1000
            Z

            M220 1000
            C229 958 240 938 250 925
            C247 956 247 979 248 1000
            Z

            M247 1000
            C268 957 284 943 297 936
            C287 961 283 980 283 1000
            Z
          "
        />
      </g>
    </svg>
  );
};

export default PalmTransition;