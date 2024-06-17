"use client";

import Image from "next/image";
import { useState } from "react";

import { BubbleData } from "./types";

export const Bubble = ({ bubbleFront, content, title }: BubbleData) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      data-type="flip-container"
      style={{
        perspective: "1000px",
      }}
      className={"w-[300px] h-[300px]"}
    >
      <button
        data-type="flipper"
        className="flex flex-row relative duration-500 w-[300px] h-[300px]"
        style={{
          transformStyle: "preserve-3d",
          // transform: !open ? "rotateY(0deg)" : "rotateY(180deg)",
        }}
        onClick={() => setOpen(!open)}
        title={title}
      >
        <div
          data-type="front"
          className="w-[300px] h-[300px] pb-2 z-10"
          style={{
            zIndex: 2,
            transform: "rotateY(0deg)",
            backfaceVisibility: "hidden",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <Image
            draggable={false}
            src={bubbleFront}
            alt={title}
            width={300}
            height={300}
          />
        </div>
        <div
          data-type="back"
          className={"w-[300px] h-[300px] absolute left-[60px]"}
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <div
            id="content"
            className=" flex border-white border-2 rounded-full w-full h-full items-center"
          >
            <p className="p-5 leading-normal">{content}</p>
          </div>
        </div>
      </button>
    </div>
  );
};
