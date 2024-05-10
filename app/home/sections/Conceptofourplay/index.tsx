"use client";

import Image from "next/image";
import React from "react";

import { Section } from "../base";
import Gim from "./Gim.png";
import background from "./background.png";
import Text from "./text.png";

const Conceptofourplay = () => {
  return (
    <>
      <div id="Concepofourplay">
        <Section className={{ wrapper: "relative", content: "px-0" }}>
          <div className="absolute w-full h-screen top-0 left-0 bg-red-50">
            <div id="background" className="w-full h-full object-contain">
              <Image
                alt="background"
                src={background}
                width={0}
                height={0}
                className="object-cover min-h-full"
              />
            </div>
            <div
              id="Details"
              className="absolute top-0 h-full flex items-center w-full flex-col gap-3 md:gap-4 lg:gap-16 pt-20 pl-2 pr-2"
            >
              <div id="head" className="text-3xl md:text-5xl">
                CONCEPT OF OUR PLAY
              </div>
              <div
                id="content"
                className="text-[15px] md:text-2xl w-[800px] opacity-75 text-center max-w-full"
              >
                หนึ่งในธีมที่ละครปีนี้จะหยิบยกมาเล่าคือเรื่องของความโลภและวัฏจักรความไม่รู้จักพอของมนุษย์
                ในมุมหนึ่งก็มีคนบางบางกลุ่มที่เชื่อว่าความโลภคือสิ่งที่ดี
                เพราะมันคือสิ่งที่ถูกมองว่าเป็นแรงผลักดันให้ผู้คนพัฒนา
                แต่ในขณะเดียวกัน หากผู้ใดที่มีความโลภมากจนเกินไป
                ก็จะนํามาซึ่งหายนะ
                เพราะความโลภทําให้ผู้คนอยากครอบครองบางอย่างจนขาดสติ
                และตัดสินใจที่จะทําทุกอย่างเพื่อที่จะนํามาซึ่งการครอบครอง
                แม้ว่าสิ่งนั้นจะเป็นสิ่งที่ผิดก็ตาม
              </div>
              <div id="foot">
                <div className="flex flex-col gap-2 text-center">
                  <span className="text-3xl md:text-4xl">Hansel & Gretel</span>
                  <span className="text-xl md:text-2xl">: Home Sweet Home</span>
                </div>
              </div>
            </div>
            <div id="gimmig" className="absolute min-h-full h-full top-0">
              <Image
                alt="gimmig"
                src={Gim}
                width={0}
                height={0}
                className="object-cover min-h-full"
              />
            </div>
          </div>
        </Section>
      </div>
    </>
  );
};

export default Conceptofourplay;
