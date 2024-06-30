"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

import Carousel from "react-multi-carousel";

const responsive = {
  mobile: {
    breakpoint: { min: 0, max: 9999 },
    items: 1,
  },
} as const;

export function ProductCarousel({
  images,
  title,
}: {
  images: StaticImport[];
  title: string;
}) {
  return (
    <Carousel
      responsive={responsive}
      containerClass="min-w-screen aspect-square"
    >
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={title}
          width={1000}
          height={1000}
          priority={index === 0}
          draggable={false}
        />
      ))}
    </Carousel>
  );
}
