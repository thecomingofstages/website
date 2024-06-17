import { motion } from "framer-motion";

import styles from "./stage.module.css";

export const Spotlight = ({
  className,
  ...props
}: React.ComponentProps<(typeof motion)["svg"]>) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1313 979"
    fill="none"
    className={`${styles.spotlight}${className ? ` ${className}` : ""}`}
    {...props}
  >
    <path
      fill="url(#spotlight)"
      d="M415.029-243 0 979h1313L838.681-243H415.029Z"
      opacity={0.75}
      style={{
        mixBlendMode: "lighten",
      }}
    />
    <defs>
      <linearGradient
        id="spotlight"
        x1={624.699}
        x2={655.993}
        y1={979.539}
        y2={-33.221}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFE3AC" stopOpacity={0.49} />
        <stop offset={1} stopColor="#FFE3AC" stopOpacity={0.2} />
      </linearGradient>
    </defs>
  </motion.svg>
);

export const Highlight = ({
  className,
  ...props
}: React.ComponentProps<(typeof motion)["svg"]>) => (
  <motion.svg
    viewBox="0 0 1313 169"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${styles.highlight}${className ? ` ${className}` : ""}`}
    {...props}
  >
    <g style={{ mixBlendMode: "lighten" }}>
      <ellipse cx="656.5" cy="84.5" rx="656.5" ry="84.5" fill="#FFE3AC" />
    </g>
  </motion.svg>
);

export const Stage = ({
  className,
  ...props
}: React.ComponentProps<(typeof motion)["svg"]>) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -200 2048 589"
    fill="none"
    className={`${styles.stage}${className ? ` ${className}` : ""}`}
    {...props}
  >
    <ellipse cx={950.5} cy={294.5} fill="url(#stage)" rx={1481.5} ry={294.5} />
    <defs>
      <linearGradient
        id="stage"
        x1={950.5}
        x2={950.5}
        y1={0}
        y2={408.309}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B97B41" />
        <stop offset={1} stopColor="#53371D" />
      </linearGradient>
    </defs>
  </motion.svg>
);
