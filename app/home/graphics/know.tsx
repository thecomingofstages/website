import { motion } from "framer-motion";

export const CharacterHighlight = (
  props: React.ComponentPropsWithoutRef<typeof motion.svg>
) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 816 816"
    fill="none"
    {...props}
  >
    <g
      filter="url(#know-highlight-a)"
      style={{
        mixBlendMode: "lighten",
      }}
    >
      <circle cx={408} cy={408} r={358} fill="url(#know-highlight-b)" />
    </g>
    <defs>
      <linearGradient
        id="know-highlight-b"
        x1={408}
        x2={408}
        y1={50}
        y2={766}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#696142" />
        <stop offset={1} stopColor="#302B16" />
      </linearGradient>
      <filter
        id="know-highlight-a"
        width={816}
        height={816}
        x={0}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_210_297"
          stdDeviation={25}
        />
      </filter>
    </defs>
  </motion.svg>
);
