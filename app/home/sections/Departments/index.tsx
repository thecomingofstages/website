"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";

import { DepartmentImages } from "./images";
import background from "./images/background-long.png";

export function DepartmentsSection() {
  const wrapper = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const sharedConfig: ScrollTrigger.Vars = {
      trigger: wrapper.current,
      scrub: 1,
      // markers: true,
      pin: wrapper.current,
    };
    mm.add(`(min-width: 1024px)`, () => {
      gsap.fromTo(
        sectionRef.current,
        {
          translateX: 0,
        },
        {
          translateX: "-50%",
          scrollTrigger: {
            start: "center center",
            end: "bottom top+=100px",
            ...sharedConfig,
          },
        }
      );
    });
    mm.add(`(max-width: 1023px)`, () => {
      gsap.fromTo(
        sectionRef.current,
        {
          translateX: 0,
        },
        {
          translateX: "-50%",
          scrollTrigger: {
            start: "center center+=100px",
            end: "bottom center-=175px",
            ...sharedConfig,
          },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="departments" className="scroll-mt-72 nav:scroll-mt-36" ref={wrapper}>
      <div className="overflow-hidden w-full">
        <div
          ref={sectionRef}
          className="relative z-10 h-[500px] nav:h-[700px] aspect-[1117/167]"
        >
          <div className="absolute left-[90.69px] top-[63.77px] nav:left-[126.96px] nav:top-[89.28px] z-10">
            <div className="flex h-[370px] nav:h-[520px] gap-x-[3.5px] gap-y-[3px] nav:gap-x-[4.5px] nav:gap-y-[4px] flex-col flex-wrap">
              <DepartmentImages
                width={257}
                height={257}
                className="w-[183.26px] h-[183.26px] nav:w-[257px] nav:h-[257px]"
              />
            </div>
          </div>
          <Image
            src={background}
            alt="background"
            width={2154}
            height={700}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        </div>
      </div>
    </section>
  );
}
