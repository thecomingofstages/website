"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

import { useInView } from "framer-motion";

import { cn } from "@/lib/utils";

type GIFProps = {
  src: ImageProps["src"][];
  secondsPerFrame?: number;
} & Omit<ImageProps, "src">;

export const GIF = ({
  src,
  width,
  height,
  secondsPerFrame = 0.5,
  className,
  ...props
}: GIFProps) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setFrame((frame) => (frame + 1) % src.length);
    }, secondsPerFrame * 1000);
    return () => clearInterval(interval);
  }, [src, secondsPerFrame, inView]);

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      style={{
        width,
        height,
      }}
    >
      {src.map((src, index) => {
        return (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image
            key={index}
            src={src}
            width={width}
            height={height}
            draggable={false}
            {...props}
            className={`absolute inset-0 ${index === frame ? "opacity-100" : "opacity-0"} pointer-events-none`}
          />
        );
      })}
    </div>
  );
};
