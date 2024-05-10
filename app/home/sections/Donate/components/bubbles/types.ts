import { StaticImageData } from "next/image";

export type BubbleData = {
  title: string;
  bubbleFront: StaticImageData;
  content: JSX.Element;
};
