import Image from "next/image";

import { Disclosure, Transition } from "@headlessui/react";

import { BubbleData } from "./types";

export const Bubble = ({ bubbleFront, content, title }: BubbleData) => {
  return (
    <div>
      <div data-ref="front">
        <Image src={bubbleFront} alt={title} width={200} height={200} />
      </div>
      <div data-ref="back">{content}</div>
    </div>
  );
};
