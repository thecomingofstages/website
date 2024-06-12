import React from "react";

import { Section } from "../base";
import { Eyes } from "./graphics";

export const VisionSection = () => {
  return (
    <div id="vision">
      <Section
        className={{
          wrapper: "relative min-h-screen",
          content: "px-0",
        }}
      >
        <div className="absolute top-0 left-0 w-[99vw] h-[90vh]">
          <Eyes />
        </div>
        <div className="relative z-10 flex justify-center items-center">
          <div className="space-y-8 bg-black max-w-screen-md p-10 lg:p-16 rounded-lg bg-opacity-75 backdrop-blur-md">
            <h4 className="text-5xl font-bold font-serif text-center">
              Vision & Mission
            </h4>
            <p className="leading-7 text-center opacity-95">
              โดยเริ่มจากการสร้างสถานที่และโอกาสให้เยาวชนได้ลองทำงานจริง
              จะแสดงให้เห็นได้ว่าเด็กไทย <b>มีความสามารถมากพอ</b>{" "}
              ที่จะทำสิ่งใดก็ตาม รวมถึงการสร้างละครเวที
              ให้ออกมาสำเร็จลุล่วงด้วยดี เพียงแค่พวกเขา
              <b>ขาดโอกาสในการเรียนรู้และลงมือทำในสนามจริง</b>
              ด้วยเหตุนี้ โครงการเราจึงมีจุดประสงค์ในการ
              <b>สร้างโอกาส สภาพแวดล้อม คน และความสามารถ</b>
              เพื่อเสริมสร้างประสบการณ์ที่สามารถ<b>นำไปใช้ต่อยอดได้ในอนาคต</b>
              อีกทั้งปลูกฝังความเชื่อที่ว่าเด็กไทยนั้นมีความสามารถมากพอที่จะ
              <b>ประสบความสำเร็จได้</b>
              จากแรงสนับสนุนที่มากพอและการร่วมแรงร่วมใจกัน
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
};
