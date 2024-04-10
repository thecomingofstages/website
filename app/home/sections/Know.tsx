"use client";

import React, { useRef } from "react";

import { Section } from "./base";

const DetailSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex w-full flex-row py-4 h-[70vh] justify-center gap-12">
      <div className="flex flex-col gap-4 flex-grow max-w-xl">
        <h3 className="text-2xl font-bold font-head">{title}</h3>
        {children}
      </div>
      <div className="flex-grow flex bg-red-100 justify-end">
        <div>Image</div>
      </div>
    </div>
  );
};

const Desc = ({ className, ...props }: React.ComponentPropsWithoutRef<"p">) => {
  return (
    <p
      className={`text-gray-300${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
};

export const GettingToKnowUsSection = () => {
  const rootRef = useRef<HTMLElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  
  return (
    <Section ref={rootRef} className="flex flex-col flex-grow h-full min-h-screen gap-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-6xl font-bold font-head">Getting to know us</h2>
        <p>Short description about what is going on earth.</p>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-scroll h-full max-h-[70vh] relative">
        <DetailSection title={"Who?"}>
          <Desc>
            พวกเราคือกลุ่มเยาวชนไทยที่เล็งเห็นถึงความเป็นไปได้ในการต่อยอด
            เเละพัฒนาความสามารถของเยาวชนรุ่นใหม่ โดยเกิดจากการร่วมมือของนักเรียน
            นักศึกษา จากหลากหลายสถาบัน
            แต่มีเป้าหมายเดียวกันคือการพัฒนาศักยภาพการทำงานอย่างไร้ขีดจํากัด
            เพื่อขับเคลื่อนวงการละครเวทีไทยเเละคงไว้ซึ่งคุณค่าสืบต่อไป
          </Desc>
        </DetailSection>
        <DetailSection title={"What?"}>
          <Desc>
            พวกเรามีความตั้งใจที่จะส่งเสริมศักยภาพของเด็กไทย
            และขับเคลื่อนวงการละครเวทีไทยให้ก้าวหน้ายิ่งขึ้น
            ผ่านการสร้างโปรเจคเพื่อเปิดโอกาสให้เด็กไทยได้สะสมประสบการณ์การทำงานในสถานที่จริง
            อีกทั้งยังอยากเป็นแรงบันดาลใจให้กับเด็กทุกคนที่มีความฝัน
            ให้กล้าที่จะลุกขึ้นมาทำสิ่งดีๆเพื่อตนเองเเละสังคม
          </Desc>
          <Desc>
            องค์กรของเรามีเป้าหมายที่จะทำการจัดการแสดงละครเวทีในทุกปี
            โดยในแต่ละปี จะมีการเปิดรับสมัครนักเรียน-นักศึกษา ในช่วงอายุ 16-20
            เพื่อเปิดโอกาสในการพัฒนาดังกล่าว
          </Desc>
        </DetailSection>
        <DetailSection title={"Why?"}>
          <Desc>
            ในปัจจุบันละครเวทีในประเทศไทยยังไม่ได้เป็นที่นิยม
            เมื่อเทียบกับละครเวทีในต่างประเทศ เเต่ทว่า
            ก็ยังมีเด็กไทยจำนวนมากที่มีความชอบและความสนใจในด้านนี้
            เเต่เพียงขาดโอกาสในการต่อยอดและพัฒนา
          </Desc>
          <Desc>
            พวกเราจึงมีความตั้งใจอย่างมากที่จะสร้างสถานที่
            ที่สามารถลงมือทําได้จริง รวมกับความเชื่อที่ว่า
            เด็กไทยนั้นมีความสามารถมากพอที่จะประสบความสำเร็จได้
            จากเเรงสนับสนุนและการร่วมแรงร่วมใจกัน
          </Desc>
        </DetailSection>
      </div>
    </Section>
  );
};
