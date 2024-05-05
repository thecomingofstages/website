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
        translateX: "-210%",
        scrollTrigger: {
          trigger: wrapper.current,
          start: "center center-=125px",
          end: "bottom top+=100px",
          scrub: 0.6,
          snap: [-0.1, 0, 0.29, 0.9],
          pin: wrapper.current,
          markers: true,
        },
      }
    );
  });

  return (
    <div id="know-us" className=" max-w-[100vw]">
      <Section
        ref={wrapper}
        className="flex flex-col flex-grow gap-6 justify-center relative"
      >
        <div className="flex flex-col gap-4 pt-36 pb-8 bg-black">
          <h2 className="text-6xl font-bold font-head">Getting to know us</h2>
        </div>
        <div className="flex w-full flex-1 gap-4">
          <div className="flex flex-col md:flex-row py-4 items-center justify-center gap-8 max-w-full">
            <div className="overflow-x-auto h-full scrollbar-hidden basis-2/3">
              <div ref={sectionRef} className="flex flex-row w-full gap-8">
                {StaticData.map((data: StaticData_i, idx: number) => (
                  <DetailSection key={idx} title={data.title} Icon={data.Icon}>
                    {data.description.map((desc, index) => (
                      <Desc key={index}>{desc}</Desc>
                    ))}
                  </DetailSection>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 flex-grow flex justify-end basis-1/3">
              <CharacterHighlight className="w-[300px]" />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};
