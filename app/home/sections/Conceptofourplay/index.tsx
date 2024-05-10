"use client";

import Image from "next/image";
import React from "react";

import { Section } from "../base";
import Gim from "./Gim.png";
import backgroundBottom from "./background-bottom.png";
import backgroundTop from "./background-top.png";

const Conceptofourplay = () => {
  return (
    <>
      <div id="our-play" className="relative">
        <div className="h-[200px] xl:h-[300px] relative inset-0">
          <div className="absolute left-0 top-0 w-full h-1/2 bg-gradient-to-b from-black to-transparent z-10" />
          <Image
            alt="background-top"
            src={backgroundTop}
            fill
            className="object-cover"
          />
        </div>
        <Section
          className={{ wrapper: "relative", content: "px-0 md:px-0 pt-0" }}
        >
          <div
            id="Details"
            className="z-10 h-full flex items-center w-full flex-col gap-6 lg:gap-10 py-2"
          >
            <div
              id="head"
              className="text-4xl md:text-5xl font-serif font-bold px-6 text-center"
            >
              CONCEPT OF OUR PLAY
            </div>
            <p
              id="content"
              className="text-sm sm:text-base leading-6 sm:leading-7 max-w-[800px] opacity-90 text-center w-full px-6"
            >
              หนึ่งในธีมที่ละครปีนี้จะหยิบยกมาเล่าคือเรื่องของความโลภและวัฏจักรความไม่รู้จักพอของมนุษย์
              ในมุมหนึ่งก็มีคนบางบางกลุ่มที่เชื่อว่าความโลภคือสิ่งที่ดี
              เพราะมันคือสิ่งที่ถูกมองว่าเป็นแรงผลักดันให้ผู้คนพัฒนา
              แต่ในขณะเดียวกัน หากผู้ใดที่มีความโลภมากจนเกินไป
              ก็จะนํามาซึ่งหายนะ
              เพราะความโลภทําให้ผู้คนอยากครอบครองบางอย่างจนขาดสติ
              และตัดสินใจที่จะทําทุกอย่างเพื่อที่จะนํามาซึ่งการครอบครอง
              แม้ว่าสิ่งนั้นจะเป็นสิ่งที่ผิดก็ตาม
            </p>
            <div className="relative py-4">
              <div
                id="foot"
                className="absolute inset-0 w-full flex flex-col text-center h-[150px] justify-center"
              >
                <span className="text-3xl md:text-4xl font-bold font-serif">
                  Hansel & Gretel
                </span>
                <span className="text-xl md:text-2xl italic">
                  : Home Sweet Home
                </span>
              </div>
              <div id="gimmig" className="flex items-center justify-center">
                <div className="max-w-5xl">
                  <Image
                    alt="gimmig"
                    src={Gim}
                    width={1024}
                    height={877}
                    className="object-cover min-h-[640px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </Section>
        <div className="h-[200px] xl:h-[300px] relative">
          <div className="absolute w-full left-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent z-10" />
          <Image
            alt="background-bottom"
            src={backgroundBottom}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default Conceptofourplay;