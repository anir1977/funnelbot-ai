"use client";

import { motion } from "framer-motion";

/**
 * Morocco, drawn as a single silhouette from Tanger down to Lagouira.
 *
 * The outline is a simplified boundary traced clockwise from the Strait of
 * Gibraltar, down the Algerian border, around the southern frontier and back up
 * the Atlantic coast. Coordinates were projected from longitude/latitude with
 * x = (lon + 17) * 17.58 and y = (35.92 - lat) * 20 — the x factor is cos of the
 * mean latitude, so the country keeps its real proportions rather than looking
 * stretched. City markers use the same projection, nudged a few units inland so
 * a coastal dot does not straddle the edge.
 */
const OUTLINE = [
  [194.8, 0], [205.7, 6.4], [218, 14.4], [230.3, 13.4], [246.1, 12.4],
  [256.7, 16], [267.4, 23.4], [272.5, 44.4], [280.2, 68.4], [276.9, 76.4],
  [263.7, 83.4], [248.8, 97.4], [234.7, 106.4], [218, 116.4], [200.4, 127.4],
  [182.8, 137.4], [165.3, 148.4], [146.4, 160.4], [146.4, 176.4], [102, 232.4],
  [87.9, 250.4], [70.3, 280.4], [68.6, 291.8], [0, 298.4], [0.9, 286.4],
  [15.8, 260.4], [19.3, 244.4], [36.9, 222.4], [44, 196.4], [63.3, 176.4],
  [72.1, 160.4], [87.9, 146.4], [98.4, 132.4], [116, 120.4], [126.6, 108.4],
  [129.2, 90.4], [135.4, 72.4], [149.4, 54.4], [165.3, 46.4], [179.3, 38.4],
  [188.1, 28.4], [191.6, 14.4],
];

const PATH =
  OUTLINE.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ") + " Z";

export type MapCity = { name: string; x: number; y: number };

export default function MoroccoMap({
  cities,
  active,
  onSelect,
}: {
  cities: MapCity[];
  active: number;
  onSelect: (i: number) => void;
}) {
  const a = cities[active];
  /* Keep the label inside the frame: flip it to the left for eastern cities. */
  const labelLeft = a && a.x > 190;

  return (
    <svg
      viewBox="-18 -14 320 330"
      className="w-full h-full max-h-[440px]"
      role="img"
      aria-label="Carte du Maroc, de Tanger à Lagouira"
    >
      <defs>
        <linearGradient id="ma-fill" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.10" />
        </linearGradient>
      </defs>

      {/* Country */}
      <motion.path
        d={PATH}
        fill="url(#ma-fill)"
        stroke="#ffffff"
        strokeOpacity="0.5"
        strokeWidth="1.6"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />

      {/* Markers */}
      {cities.map((c, i) => {
        const on = i === active;
        return (
          <g
            key={c.name}
            onClick={() => onSelect(i)}
            className="cursor-pointer"
            role="button"
            aria-label={c.name}
          >
            {/* Generous invisible hit area — the visible dots are tiny */}
            <circle cx={c.x} cy={c.y} r="11" fill="transparent" />

            {on && (
              <motion.circle
                cx={c.x}
                cy={c.y}
                r="5"
                fill="#ffffff"
                initial={{ scale: 1, opacity: 0.55 }}
                animate={{ scale: [1, 2.6], opacity: [0.55, 0] }}
                transition={{ duration: 1.9, repeat: Infinity, ease: "easeOut" }}
                style={{ transformOrigin: `${c.x}px ${c.y}px` }}
              />
            )}

            <circle
              cx={c.x}
              cy={c.y}
              r={on ? 5 : 3.2}
              fill="#ffffff"
              fillOpacity={on ? 1 : 0.55}
              className="transition-all duration-300"
            />
          </g>
        );
      })}

      {/* Active city label */}
      {a && (
        <motion.text
          key={a.name}
          x={labelLeft ? a.x - 11 : a.x + 11}
          y={a.y + 4}
          textAnchor={labelLeft ? "end" : "start"}
          fill="#ffffff"
          fontSize="12.5"
          fontWeight="700"
          initial={{ opacity: 0, x: labelLeft ? 4 : -4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {a.name}
        </motion.text>
      )}
    </svg>
  );
}
