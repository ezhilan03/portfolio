import React from "react";
function Tree({ x, y, size = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`}>
      <path fill="#183d32" d="M-4 0H4V28H-4Z" />
      <path
        fill="#295b43"
        d="M-4-44H4V-36H10V-28H16V-18H22V-8H28V2H-28V-8H-22V-18H-16V-28H-10V-36H-4Z"
      />
      <path
        fill="#467652"
        d="M-4-44H4V-32H-2V-20H-8V-10H-17V-2H-28V-8H-22V-18H-16V-28H-10V-36H-4Z"
      />
    </g>
  );
}
function Tower({ x, y, size = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`}>
      <path fill="#dac294" d="M-20-63H20V20H-20Z" />
      <path fill="#baa077" d="M7-63H20V20H7Z" />
      <path
        fill="#436252"
        d="M-28-66H28V-74H20V-82H12V-90H4V-97H-4V-90H-12V-82H-20V-74H-28Z"
      />
      <path fill="#293e34" d="M-5-45H5V-26H-5ZM-7-3H7V20H-7Z" />
      <path fill="#dfb965" d="M-1-92H2V-125H-1ZM2-125H22V-114H2Z" />
      <path
        stroke="#ab9875"
        strokeWidth="2"
        d="M-20-15H20M-20-50H20M-20 8H20"
      />
    </g>
  );
}
export function WorldScene() {
  return (
    <svg
      viewBox="0 0 960 430"
      preserveAspectRatio="xMidYMid slice"
      className="pixel-world"
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <rect width="960" height="430" fill="#b6c4a5" />
      <rect y="0" width="960" height="85" fill="#d8cdaa" />
      <path fill="#edddb1" d="M620 29h42v8h12v24h-12v8h-42v-8h-12V37h12z" />
      <path
        fill="#ebe0bd"
        d="M80 42h70v8h32v12H34V50h46ZM750 84h45v-8h52v10h42v12H725V88h25Z"
      />
      <path
        fill="#78968b"
        d="M0 159H62V143H90V123H112V101H133V130H157V145H186V166H235V139H264V116H290V135H317V157H350V175H402V134H434V113H454V80H478V104H501V135H537V150H589V172H627V150H655V123H689V110H714V132H754V152H782V120H800V97H825V133H848V165H960V430H0Z"
      />
      <path
        fill="#567d6c"
        d="M0 221H52V195H95V179H164V166H222V185H280V205H339V184H405V170H482V191H540V211H590V201H630V170H676V151H723V160H775V174H817V192H880V210H960V430H0Z"
      />
      <path
        fill="#658857"
        d="M0 275H62V246H167V236H252V263H310V280H392V264H469V245H534V232H604V244H693V260H749V251H803V231H873V248H960V430H0Z"
      />
      <path
        fill="#d4c08b"
        d="M474 430H600V400H648V366H701V337H717V309H691V290H652V271H619V254H604V243H621V250H647V262H684V279H719V297H742V321H735V348H709V376H681V410H654V430Z"
      />
      <path
        fill="#6ba9a0"
        d="M474 430H578V400H632V366H683V338H703V311H676V291H641V273H609V254H597V241H604V251H630V264H666V282H704V300H727V321H720V343H694V373H665V408H637V430Z"
      />
      <path
        fill="#b2d3b9"
        d="M560 406H622V412H560ZM643 362H679V367H643ZM691 322H713V327H691ZM647 283H669V287H647Z"
      />
      <g>
        <Tower x={790} y={182} size={0.8} />
        <Tower x={845} y={180} size={1.1} />
        <Tower x={895} y={193} size={0.65} />
        <path fill="#bca97f" d="M797 160h74v40h-74z" />
        <path fill="#365844" d="M807 176h10v24h-10ZM835 176h10v24h-10Z" />
      </g>
      <path
        fill="#3a6245"
        d="M0 347H61V327H109V306H195V319H268V337H337V354H401V367H456V384H482V430H0Z"
      />
      {[
        [84, 291, 1],
        [147, 300, 0.8],
        [224, 305, 0.7],
        [321, 330, 0.9],
        [433, 324, 0.7],
        [524, 278, 0.5],
        [911, 289, 1.1],
        [848, 324, 0.85],
        [800, 352, 0.9],
        [925, 389, 1.4],
        [733, 400, 0.7],
        [70, 400, 1.5],
      ].map(([x, y, size], i) => (
        <Tree key={i} x={x} y={y} size={size} />
      ))}
      <g fill="#abbb74">
        {Array.from({ length: 35 }, (_, i) => (
          <rect
            key={i}
            x={(i * 71) % 950}
            y={300 + ((i * 37) % 125)}
            width="4"
            height="3"
          />
        ))}
      </g>
      <g fill="#dfbc6d">
        <rect x="473" y="291" width="7" height="7" />
        <rect x="748" y="367" width="7" height="7" />
        <rect x="827" y="252" width="7" height="7" />
      </g>
      <path
        fill="#254d39"
        d="M0 425h103v-11h86v9h179v7H0ZM874 414h86v16h-121v-7h35Z"
      />
    </svg>
  );
}
const bossPixels = [
  "       333333       ",
  "    33322222333    ",
  "   3222222222223   ",
  "   322772772223   ",
  "   322442442223   ",
  "    3222222223    ",
  "    3336666333    ",
  "  33322222222333  ",
  " 322112222211223 ",
  "3221155555511223",
  "3221158888511223",
  "3221158558511223",
  "3221158888511223",
  " 32215555551223 ",
  "  332222222233  ",
  "    322222223    ",
  "    322332223    ",
  "   3223  3223   ",
  "   3223  3223   ",
  "  33333  33333  ",
];
const colors = {
  1: "#518168",
  2: "#315c4b",
  3: "#183d32",
  4: "#ffcf73",
  5: "#967550",
  6: "#d3b27f",
  7: "#162b25",
  8: "#d7684f",
};
export function BossSprite() {
  return (
    <svg
      viewBox="0 0 160 176"
      className="boss-sprite-svg"
      role="img"
      aria-label="Pixel golem built from tangled pipes and a corrupted data core"
      shapeRendering="crispEdges"
    >
      <ellipse cx="80" cy="166" rx="60" ry="7" fill="#091c17" />
      {bossPixels.flatMap((row, y) =>
        [...row].map((pixel, x) =>
          colors[pixel] ? (
            <rect
              key={`${x}-${y}`}
              x={x * 7 + 10}
              y={y * 7 + 14}
              width="7"
              height="7"
              fill={colors[pixel]}
            />
          ) : null,
        ),
      )}
      <path
        d="M31 52h-14v49h14M119 57h14v45h-14"
        fill="none"
        stroke="#c59b62"
        strokeWidth="5"
      />
      <path
        d="M45 88h18v-9h31v19h18"
        fill="none"
        stroke="#a9c2a0"
        strokeWidth="3"
      />
      <rect x="26" y="104" width="16" height="16" fill="#dbcca1" />
      <path d="M29 109h10M29 113h7" stroke="#9e7255" strokeWidth="2" />
    </svg>
  );
}
export function QuestIcon({ type = 0 }) {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true" shapeRendering="crispEdges">
      <rect width="80" height="80" fill="#183b30" />
      {type === 0 ? (
        <>
          <path fill="#b39d70" d="M12 19h20l8 5 8-5h20v44H48l-8 5-8-5H12Z" />
          <path
            fill="#e0d0a2"
            d="M16 23h14l7 5v31l-7-3H16ZM43 28l7-5h14v33H50l-7 3Z"
          />
          <path
            stroke="#788f70"
            strokeWidth="3"
            d="M20 32h10M20 40h10M20 48h10M50 32h10M50 40h10M50 48h10"
          />
        </>
      ) : type === 1 ? (
        <>
          <path fill="#d1ae64" d="M36 13h8v47h16v7H20v-7h16V28H14v-6h22Z" />
          <path fill="#91b5a2" d="M14 30h4v19H6ZM60 30h4l10 19H60Z" />
          <path
            fill="#d1ae64"
            d="M5 49h26v5H5ZM49 49h26v5H49ZM44 22h23v6H44Z"
          />
        </>
      ) : type === 2 ? (
        <>
          <path fill="#bc925c" d="M13 38h54v29H13Z" />
          <path fill="#dcbd75" d="M9 29h62v11H9Z" />
          <path
            fill="#d27354"
            d="M14 14h12v16H14ZM38 14h12v16H38ZM62 14h7v16h-7Z"
          />
          <path fill="#e3cea0" d="M26 14h12v16H26ZM50 14h12v16H50Z" />
          <rect x="23" y="48" width="12" height="19" fill="#284b3c" />
          <rect x="43" y="48" width="14" height="10" fill="#609d8f" />
        </>
      ) : (
        <>
          <path
            fill="#98b9a0"
            d="M40 10h8v8h8v8h8v8h-8v8h-8v8h-8v-8h-8v-8h-8v-8h8v-8h8Z"
          />
          <path fill="#51a99c" d="M40 18h8v24h-8Z" />
          <path fill="#c1a569" d="M19 55h42v7H19ZM13 63h54v7H13Z" />
          <rect x="36" y="48" width="12" height="8" fill="#807850" />
        </>
      )}
    </svg>
  );
}
