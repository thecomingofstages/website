"use client";

import React, { useRef } from "react";

import { useGSAP } from "@gsap/react";

import { gsap } from "@/lib/gsap";

import { CharacterHighlight } from "../../graphics/know";
import { Section } from "../base";
import { Desc, DetailSection } from "./components";
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
      <Section
        ref={wrapper}
        className="flex flex-col flex-grow gap-4 lg:gap-6 justify-center relative"
      >
        <div className="flex flex-col gap-4 pt-8 lg:pt-36 lg:pb-8 bg-black">
          <h2 className="text-4xl lg:text-6xl font-bold font-head">
            Getting to know us
          </h2>
        </div>
        <div className="flex w-full gap-4">
          <div className="flex flex-col lg:flex-row py-4 items-center justify-center gap-8 max-w-full">
            <div className="overflow-hidden lg:basis-2/3">
              <div ref={sectionRef} className="grid grid-cols-3 w-[300%]">
                {StaticData.map((data: StaticData_i, idx: number) => (
                  <DetailSection key={idx} title={data.title} Icon={data.Icon}>
                    {data.description.map((desc, index) => (
                      <Desc key={index}>{desc}</Desc>
                    ))}
                  </DetailSection>
                ))}
              </div>
            </div>
            <div className="hidden flex-shrink-0 flex-grow lg:flex justify-end lg:basis-1/3">
              <CharacterHighlight className="w-[300px]" />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};
