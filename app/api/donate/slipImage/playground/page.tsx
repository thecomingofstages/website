"use client";

import Image from "next/image";
import { useState } from "react";

import { receiptColors } from "../types";

const SlipImages = () => {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className="bg-red-900 flex flex-col gap-6 items-center justify-center flex-grow h-full">
        <b className="text-4xl">Images failed to load.</b>
        <p className="text-white/80 text-center px-4">
          Playground cannot request the images successfully. Probably errors in
          your image generation code.
          <br />
          Check server logs for any hints.
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-4 gap-6 flex-1 pt-4">
      {receiptColors.map((color, i) => (
        <Image
          key={color}
          src={`/api/donate/slipImage?color=${color}`}
          width={573}
          height={1920}
          alt={"React Syntax error. Check console for any error."}
          unoptimized
          onError={() => setError(true)}
          className="max-h-[88vh] object-contain bg-zinc-800"
        />
      ))}
    </div>
  );
};
export default function SlipImagePlayground() {
  return (
    <div className="p-6 flex flex-col gap-6 h-full min-h-screen">
      <div className="flex flex-row gap-4 items-end ">
        <h1 className="font-bold text-4xl flex-grow">
          (Internal Only) Slip Image Playground
        </h1>
        <div className="text-white/90 text-xs flex flex-col items-end gap-1 text-right">
          <span>
            Enter fullscreen to view larger image, or right click image to view
            full sized image.
          </span>
          <span>
            Images are dynamically generated and may take time to load.
          </span>
        </div>
      </div>
      <SlipImages />
    </div>
  );
}
