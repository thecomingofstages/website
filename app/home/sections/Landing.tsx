"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import logoRed from "@/app/images/logo-red.png";

import { Section } from "./base";

export const LandingSection = () => {
  return (
    <Section
      id="top"
      className="items-center justify-center lg:justify-evenly flex flex-col lg:flex-row gap-6 xl:gap-8"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          ease: "linear",
          duration: 0.3,
        }}
        className="lg:flex-grow max-w-sm lg:max-w-[unset]"
      >
        <Image
          src={logoRed}
          width={600}
          height={600}
          alt="Logo"
          placeholder="blur"
          priority
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          ease: "linear",
          duration: 0.3,
        }}
        className="flex flex-col gap-2 lg:flex-grow items-end flex-shrink-0"
      >
        <p className="max-w-xs text-2xl md:text-3xl md:max-w-[26rem] md:leading-snug lg:text-4xl lg:max-w-[32rem] text-right lg:leading-snug">
          พื้นที่<b>พัฒนาศักยภาพ</b>เด็กไทยและส่งเสริม<b>งานสร้างสรรค์</b>
          ในวงการ<b>ละครเวที</b>
        </p>
      </motion.div>
    </Section>
  );
};
