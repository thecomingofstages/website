"use client";

import Image from "next/image";
import { useRef } from "react";

import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

import logoRed from "@/app/images/logo-red.png";

/* Import only the left side, and flip it on the right cause we want both sides to be symmetric. */
import { CurtainLeft } from "../graphics/curtain";
import { Highlight, Spotlight, Stage } from "../graphics/stage";
import { Section } from "./base";

export const LandingSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["end end", "300px"],
  });
  useMotionValueEvent(scrollYProgress, "change", (c) => console.log(c));
  const curtainLeftTransform = useTransform(
    scrollYProgress,
    [0.7, 1],
    ["-75%", "0%"]
  );
  const curtainRightTransform = useTransform(
    scrollYProgress,
    [0.7, 1],
    ["75%", "0%"]
  );

  const curtainLeftTransformStr = useMotionTemplate`translateX(${curtainLeftTransform})`;
  const curtainRightTransformStr = useMotionTemplate`translateX(${curtainRightTransform})scaleX(-1)`;

  return (
    <div id="top">
      {/* Graphic ELements */}
      <div className="absolute inset-0 w-full h-full max-h-screen overflow-clip">
        <div className="relative w-full h-full hidden lg:block">
          <CurtainLeft
            className={
              "z-30 absolute top-0 left-0 max-w-auto h-screen scale-90"
            }
            style={{ transform: curtainLeftTransformStr }}
          />
          <CurtainLeft
            className={
              "z-30 absolute top-0 right-0 max-w-auto h-screen scale-90"
            }
            style={{ transform: curtainRightTransformStr }}
          />
          <div className="z-40 absolute bottom-0 h-[300px] w-full bg-gradient-to-b from-transparent to-black"></div>
        </div>
        <div className="absolute inset-0 w-full flex flex-col items-center justify-center">
          <Stage className={"absolute bottom-0"} />
          <Spotlight initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
          <Highlight
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={"absolute bottom-0"}
          />
        </div>
      </div>
      <Section
        className={
          "z-10 h-[95vh] md:pb-24 portrait:h-[75vh] flex flex-col items-center justify-center"
        }
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          viewport={{ amount: 0.9 }}
          transition={{
            ease: "easeInOut",
            duration: 0.5,
          }}
          ref={sectionRef}
          className="relative portrait:gap-6 gap-2 flex flex-col items-center justify-center"
        >
          <div className="max-w-sm landscape:max-w-xs lg:max-w-md xl:max-w-[unset]">
            <Image
              src={logoRed}
              width={600}
              height={600}
              draggable={false}
              alt="The Coming of Stages"
              placeholder="blur"
              priority
            />
          </div>
          <div className="flex flex-col gap-2 items-end flex-shrink-0">
            <div className="text-2xl max-w-2xl md:text-3xl md:leading-snug xl:text-4xl xl:leading-snug text-center flex flex-row flex-wrap items-center justify-center">
              <span>
                พื้นที่<b>พัฒนาศักยภาพ</b>เด็กไทย
              </span>
              <span>
                และส่งเสริม<b>งานสร้างสรรค์</b>
                ในวงการ<b>ละครเวที</b>
              </span>
            </div>
          </div>
        </motion.div>
      </Section>
      <div className="lg:h-[300px] w-full"></div>
    </div>
  );
};
