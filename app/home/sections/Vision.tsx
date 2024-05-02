import React from "react";

import { Eyes } from "../graphics/vision";

export const VisionSection = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <Eyes />
      <div className="absolute justify-center item-center">
        <div className="bg-black max-w-screen-md px-5  ">
          <h4 className="text-3xl font-bold font-head text-center">
            Vision & Mission
          </h4>
          <p className="text-2lg text-center mt-5 ">
            โดยเริ่มจากการสร้างสถานที่และโอกาสให้เยาวชนได้ลองทำงานจริง
            จะแสดงให้เห็นได้ว่าเด็กไทย มีความสามารถมากพอที่จะทำสิ่งใดก็ตาม
            รวมถึงการสร้างละครเวที ให้ออกมาสำเร็จลุล่วงด้วยดี
            เพียงแค่พวกเขาขาดโอกาสในการเรียนรู้และลงมือทำในสนามจริง ด้วยเหตุนี้
            โครงการเราจึงมีจุด ประสงค์ในการสร้างโอกาส สภาพแวดล้อม คน
            และความสามารถ เพื่อเสริมสร้างประสบการณ์ที่
            สามารถนำไปใช้ต่อยอดได้ในอนาคต
            อีกทั้งปลูกฝังความเชื่อที่ว่าเด็กไทยนั้นมีความสามารถมาก
            พอที่จะประสบความสำเร็จได้
            จากแรงสนับสนุนที่มากพอและการร่วมแรงร่วมใจกัน
          </p>
        </div>
      </div>
    </div>
  );
};
