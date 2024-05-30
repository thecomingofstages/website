"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

import { motion } from "framer-motion";

import { gsap } from "@/lib/gsap";

import { Section } from "../base";
import { DonateArtwork } from "./components/artwork";
import { Bubble } from "./components/bubbles";
import { missionBubble } from "./components/bubbles/1-mission";
import { futureBubble } from "./components/bubbles/2-future";
import { howToBubble } from "./components/bubbles/3-howto";

const bubbles = [missionBubble, futureBubble, howToBubble];

export const DonateSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    const scroller = bubbleRef.current?.parentElement;
    if (!scroller || !bubbleRef.current) return;

    const mm = gsap.matchMedia();

    const scrollTriggerConfig: ScrollTrigger.Vars = {
      trigger: sectionRef.current,
      scrub: 1,
      // snap: [0, 0.29, 1],
      pin: true,
      // markers: true,
      snap: {
        snapTo: "labels",
      },
    };

    const bubbleScrollTimeline = (tl: gsap.core.Timeline, slide = true) => {
      const children = Array.from(bubbleRef.current!.children);
      for (let i = 0; i < children.length; i++) {
        // setup position and trigger slide animations
        if (slide) {
          gsap.set(children[i], {
            position: "absolute",
            top: "150px",
            translateY: "-50%",
          });
          tl.addLabel(`start-${i}`, i === 0 ? undefined : "+=2");
          if (i > 0) {
            tl.to(
              children[i - 1],
              {
                opacity: 0,
                translateX: "100%",
              },
              `start-${i}`
            );
          }
          tl.fromTo(
            children[i],
            {
              opacity: 0,
              translateX: "-100%",
            },
            {
              opacity: 1,
              translateX: 0,
              delay: i === 0 ? 0 : 0.5,
            },
            `start-${i}`
          );
        }
        const flipper = children[i].querySelector("[data-type=flipper]");
        tl.addLabel(`flip-${i}`, !slide && i === 0 ? undefined : "+=1");
        // console.log(i, flipper);
        tl.fromTo(
          flipper,
          {
            rotateY: 0,
          },
          {
            rotateY: 180,
            duration: 0.1,
          },
          `flip-${i}`
        );
        if (i + 1 === children.length) {
          // hack to create more time for the last flip
          tl.addLabel("end", "+=2");
          tl.to(
            children[i],
            {
              opacity: 100,
            },
            "end"
          );
        } else if (!slide) {
          // more time for scrolling!
          tl.addLabel(`scroll-${i}`, "+=3");
          tl.to(
            children[i],
            {
              opacity: 100,
            },
            `scroll-${i}`
          );
        }
      }
      return () => tl.revert();
    };

    mm.add("(max-height: 1000px) and (max-width: 1100px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          ...scrollTriggerConfig,
          start: "center bottom",
          end: "bottom center-=150px",
        },
      });

      return bubbleScrollTimeline(tl);
    });

    mm.add("(min-height: 1001px) and (max-width: 1100px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          ...scrollTriggerConfig,
          start: "center center+=150px",
          end: "bottom center-=150px",
        },
      });
      return bubbleScrollTimeline(tl);
    });

    mm.add("(min-width: 1101px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          ...scrollTriggerConfig,
          start: "center center+=425px",
          end: "bottom center",
        },
      });
      return bubbleScrollTimeline(tl, false);
    });

    return () => mm.revert();
  });
  return (
    <div id="support" ref={sectionRef} className="scroll-mt-16 py-20">
      <Section
        className={"flex flex-col items-center justify-center gap-12 md:gap-16"}
      >
        <div className="gap-2 flex flex-col items-center justify-center text-center">
          <h2 className="text-5xl md:text-6xl font-bold font-serif italic">
            SUPPORT US
          </h2>
          <span className="text-medium text-xl">
            ทำไมถึงควรร่วมบริจาคกับเรา
          </span>
        </div>
        <div className="w-full relative h-[300px]">
          <div
            ref={bubbleRef}
            className="flex flex-row gap-10 justify-center items-center"
          >
            {bubbles.map((bubble) => (
              <Bubble key={bubble.title} {...bubble} />
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ amount: 0.9, once: true }}
          className="gap-6 flex flex-col items-center justify-center text-center pb-10"
        >
          <h3 className="text-2xl sm:text-3xl font-bold">
            การบริจาคของคุณจะช่วยให้เรา
          </h3>
          <ul className="text-left list-disc space-y-1.5 sm:text-lg pl-8">
            <li>มีพื้นที่ฝึกซ้อมและสถานที่จัดแสดงที่ดี</li>
            <li>
              จ้างผู้เชี่ยวชาญในอุตสาหกรรมเพื่อให้คำแนะนำและฝึกอบรมอย่างเหมาะสม
            </li>
            <li>จัดหาอุปกรณ์และเครื่องแต่งกายที่จำเป็น</li>
            <li>เสริมสร้างโอกาสในการเข้าถึงละครเวทีสำหรับเด็กจากทุกภูมิหลัง</li>
          </ul>
        </motion.div>
        <DonateArtwork>
          <Link
            href="/donate"
            title="Donate to The Coming of Stages"
            className="bg-black px-8 py-6 rounded text-white font-bold text-3xl lg:text-4xl font-serif hover:bg-zinc-800 scale-100 hover:scale-105 transition-all duration-200"
          >
            DONATE HERE
          </Link>
        </DonateArtwork>
      </Section>
    </div>
  );
};
