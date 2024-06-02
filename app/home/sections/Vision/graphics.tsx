"use client";

import React from "react";

import { useGSAP } from "@gsap/react";

import { gsap } from "@/lib/gsap";

import styles from "./graphics.module.css";

export const Eye = () => {
  return (
    <div className={styles.eyes}>
      <div className={styles.eye}>
        <div className={styles.pupil}></div>
      </div>
      <div className={styles.eye}>
        <div className={styles.pupil}></div>
      </div>
    </div>
  );
};

export const Eyes = ({ minHeight }: { minHeight: number }) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState<{ cols: number; rows: number }>();
  React.useEffect(() => {
    const set = () => {
      const offset = window.matchMedia("(max-width: 768px)").matches ? 0 : 100;
      const width = window.matchMedia("(max-width: 640px)").matches ? 200 : 300;
      const height = Math.max(window.innerHeight, minHeight);
      setSize({
        cols: Math.floor((window.innerWidth - offset) / 400),
        rows: Math.floor((height - offset) / 110),
      });
    };
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, [minHeight]);

  useGSAP(
    () => {
      if (!wrapperRef.current) return;
      gsap.fromTo(
        `.${styles.eyes}`,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top center",
            end: "center center",
            scrub: 0.7,
            // once: true,
            // markers: process.env.NODE_ENV === "development",
          },
        }
      );
    },
    { scope: wrapperRef.current as HTMLDivElement, dependencies: [size] }
  );

  if (!size) return null;
  return (
    <div
      className="lg:p-8 w-full h-full grid"
      ref={wrapperRef}
      style={{
        gridTemplateColumns: `repeat(${size.cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${size.rows}, minmax(0, 1fr))`,
      }}
    >
      {new Array(size.cols * size.rows).fill(null).map((_, i) => (
        <div key={i} className="w-full h-full flex items-center justify-center">
          <Eye />
        </div>
      ))}
    </div>
  );
};
