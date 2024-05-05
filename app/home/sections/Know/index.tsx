"use client";

import React, { useRef } from "react";

import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

import { gsap } from "@/lib/gsap";

import { Section } from "../base";
import { Character, Desc, DetailSection } from "./components";
import { StaticData, StaticData_i } from "./data";

export const GettingToKnowUsSection = () => {
  // Ref for use in gsap!
  const wrapper = useRef<HTMLElement | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: "-66.66%",
        scrollTrigger: {
          trigger: wrapper.current,
          start: "center center",
          end: "bottom center-=125px",
          scrub: 1,
          snap: [0, 0.29, 1],
          pin: wrapper.current,
          markers: process.env.NODE_ENV === "development",
        },
      }
    );
  });

  return (
    <div id="know-us" className="max-w-[100vw]">
      <div className="pt-24 flex items-center justify-center md:hidden">
        <Character
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, ease: "easeIn", duration: 0.7 }}
          viewport={{ amount: 0.2, once: true }}
        />
      </div>
      <Section
        ref={wrapper}
        className="flex flex-col flex-grow gap-4 lg:gap-6 md:justify-center relative"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ amount: 0.7, once: true }}
          className="flex flex-col gap-4 pt-16 lg:pb-8 bg-black"
        >
          <h2 className="font-bold font-head flex flex-wrap gap-x-4 gap-y-1 leading-8">
            <span className="text-4xl lg:text-6xl">Getting to</span>
            <span className="text-5xl md:text-4xl lg:text-6xl">know us</span>
          </h2>
        </motion.div>
        <div className="flex w-full gap-4">
          <div className="flex flex-col lg:flex-row py-4 items-center justify-center gap-16 max-w-full">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ amount: 0.5, once: true }}
              className="overflow-hidden lg:basis-2/3"
            >
              <div ref={sectionRef} className="grid grid-cols-3 w-[300%]">
                {StaticData.map((data: StaticData_i, idx: number) => (
                  <DetailSection key={idx} title={data.title} Icon={data.Icon}>
                    {data.description.map((desc, index) => (
                      <Desc key={index}>{desc}</Desc>
                    ))}
                  </DetailSection>
                ))}
              </div>
            </motion.div>
            <div className="hidden md:flex basis-1/3 justify-end">
              <Character
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1, ease: "easeIn", duration: 0.7 }}
                viewport={{ amount: 0.2, once: true }}
              />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};
