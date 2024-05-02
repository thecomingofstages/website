"use client";

import React, { useEffect } from "react";

import styles from "./vision.module.css";

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

export const Eyes = () => {
  const [size, setSize] = React.useState<{ cols: number; rows: number }>();
  React.useEffect(() => {
    const set = () => {
      const offset = window.matchMedia("(max-width: 768px)").matches ? 0 : 100;
      const width = window.matchMedia("(max-width: 640px)").matches ? 200 : 300;
      setSize({
        cols: Math.floor((window.innerWidth - offset) / width),
        rows: Math.floor((window.innerHeight - offset) / 110),
      });
    };
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  useEffect(() => {
    console.log(size);
  }, [size]);
  if (!size) return null;
  return (
    <div
      className="lg:p-8 w-full h-full grid"
      style={{
        gridTemplateColumns: `repeat(${size.cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${size.rows}, minmax(0, 1fr))`,
      }}
    >
      {new Array(size.cols * size.rows).fill(null).map((_, i) => (
        <Eye key={i} />
      ))}
    </div>
  );
};
