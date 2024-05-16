import { motion } from "framer-motion";

export const CurtainLeft = (
  props: React.ComponentProps<(typeof motion)["svg"]>
) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={"-1000 0 1400 1080"}
    fill="none"
    {...props}
  >
    <path
      fill="#EF2323"
      d="M88.48 695C179.14 613.768 382.077 186.077 373.751-7L-1205.5-79v1252l1482.833-33.51c0-132.56-118.175-400.472-188.853-444.49Z"
    />
    <g
      filter="url(#curtain-left)"
      style={{
        mixBlendMode: "multiply",
      }}
    >
      <path
        fill="#841A1A"
        d="M-14.245 738.594c115.656-109.002 374.549-682.9 363.928-941.981L-1080-300v1680l1306.679-44.97c0-177.87-150.758-537.371-240.923-596.436Z"
      />
    </g>
    <defs>
      <filter
        id="curtain-left"
        width={1830}
        height={2080}
        x={-1280}
        y={-500}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_0_1"
          stdDeviation={100}
        />
      </filter>
    </defs>
  </motion.svg>
);

export const CurtainRight = (
  props: React.ComponentProps<(typeof motion)["svg"]>
) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="150 0 1000 1173"
    fill="none"
    {...props}
  >
    <path
      fill="#EF2323"
      d="M502.373 734.585C396.52 646.994 159.57 185.826 169.29-22.365L2067-100v1350l-1785.131-36.14c0-142.93 137.98-431.812 220.504-479.275Z"
    />
    <g
      filter="url(#curtain-right)"
      style={{
        mixBlendMode: "multiply",
      }}
    >
      <path
        fill="#841A1A"
        d="M609.584 781.58C479.532 664.078 188.414 45.43 200.357-233.853L1808-338v1811l-1469.328-48.48c0-191.73 169.523-579.269 270.912-642.94Z"
      />
    </g>
    <defs>
      <filter
        id="curtain-right"
        width={2008}
        height={2211}
        x={0}
        y={-538}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_0_1"
          stdDeviation={100}
        />
      </filter>
    </defs>
  </motion.svg>
);
