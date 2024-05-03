"use client";

import React, { useRef } from "react";

import { useGSAP } from "@gsap/react";

import { gsap } from "@/lib/gsap";

import { BusinessIcon, CharacterHighlight, PeopleIcon } from "../graphics/know";
import { Section } from "./base";

const DetailSection = ({
  title,
  children,
  Icon,
}: {
  title: string;
  children: React.ReactNode;
  Icon: React.FC<{ className: string }>;
}) => {
  return (
    <div className="flex flex-col gap-4 flex-grow max-w-xl min-w-fit px-2">
      <h3 className="text-4xl font-bold font-head inline-flex items-center gap-2">
        <Icon className="w-20 h-20 text-white" />
        {title}
      </h3>
      {children}
    </div>
  );
};

const Desc = ({ className, ...props }: React.ComponentPropsWithoutRef<"p">) => {
  return (
    <p
      className={`text-gray-300 leading-7${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
};

interface StaticData_i {
  title: string;
  Icon: React.FC<{ className: string }>;
  description: React.ReactNode[];
}

const StaticData: StaticData_i[] = [
  {
    title: "Who?",
    Icon: PeopleIcon,
    description: [
      <>
        พวกเราคือกลุ่มเยาวชนไทยที่เล็งเห็นถึงความเป็นไปได้ในการต่อยอด
        เเละพัฒนาความสามารถของเยาวชนรุ่นใหม่ โดยเกิดจากการร่วมมือของนักเรียน
        นักศึกษา จากหลากหลายสถาบัน
        แต่มีเป้าหมายเดียวกันคือการพัฒนาศักยภาพการทำงานอย่างไร้ขีดจํากัด
        เพื่อขับเคลื่อนวงการละครเวทีไทยเเละคงไว้ซึ่งคุณค่าสืบต่อไป
      </>,
    ],
  },
  {
    title: "What?",
    Icon: BusinessIcon,
    description: [
      <>
        พวกเราคือกลุ่มเยาวชนไทยที่เล็งเห็นถึงความเป็นไปได้ในการต่อยอด
        เเละพัฒนาความสามารถของเยาวชนรุ่นใหม่ โดยเกิดจากการร่วมมือของนักเรียน
        นักศึกษา จากหลากหลายสถาบัน
        แต่มีเป้าหมายเดียวกันคือการพัฒนาศักยภาพการทำงานอย่างไร้ขีดจํากัด
        เพื่อขับเคลื่อนวงการละครเวทีไทยเเละคงไว้ซึ่งคุณค่าสืบต่อไป
      </>,
      <>
        พวกเรามีความตั้งใจที่จะส่งเสริมศักยภาพของเด็กไทย
        และขับเคลื่อนวงการละครเวทีไทยให้ก้าวหน้ายิ่งขึ้น
        ผ่านการสร้างโปรเจคเพื่อเปิดโอกาสให้เด็กไทยได้สะสมประสบการณ์การทำงานในสถานที่จริง
        อีกทั้งยังอยากเป็นแรงบันดาลใจให้กับเด็กทุกคนที่มีความฝัน
        ให้กล้าที่จะลุกขึ้นมาทำสิ่งดีๆเพื่อตนเองเเละสังคม
      </>,
    ],
  },
  {
    title: "Why?",
    Icon: BusinessIcon,
    description: [
      <>
        ในปัจจุบันละครเวทีในประเทศไทยยังไม่ได้เป็นที่นิยม
        เมื่อเทียบกับละครเวทีในต่างประเทศ เเต่ทว่า
        ก็ยังมีเด็กไทยจำนวนมากที่มีความชอบและความสนใจในด้านนี้
        เเต่เพียงขาดโอกาสในการต่อยอดและพัฒนา
      </>,
      <>
        พวกเราจึงมีความตั้งใจอย่างมากที่จะสร้างสถานที่ ที่สามารถลงมือทําได้จริง
        รวมกับความเชื่อที่ว่า
        เด็กไทยนั้นมีความสามารถมากพอที่จะประสบความสำเร็จได้
        จากเเรงสนับสนุนและการร่วมแรงร่วมใจกัน`,
      </>,
    ],
  },
];

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
