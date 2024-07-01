"use client";

import Image from "next/image";
import Link from "next/link";

import Carousel from "react-multi-carousel";

const responsive = {
  mobile: {
    breakpoint: { min: 0, max: 9999 },
    items: 1,
  },
} as const;

const images = [
  {
    src: require("./images/landing/resized/00.png"),
    title: "Pre-Order Our Merchandise",
    href: "#",
  },
  {
    src: require("./images/landing/resized/01.png"),
    title: "T-Shirt",
    href: "/shop/t-shirt",
  },
  {
    src: require("./images/landing/resized/02.png"),
    title: "Grocery Bag",
    href: "/shop/bag",
  },
  {
    src: require("./images/landing/resized/03.png"),
    title: "Keychain",
    href: "/shop/keychain",
  },
  {
    src: require("./images/landing/resized/04.png"),
    title: "Blanket",
    href: "/shop/blanket",
  },
  {
    src: require("./images/landing/resized/05.png"),
    title: "Stickers",
    href: "/shop/sticker",
  },
];

export function LandingCarosuel() {
  return (
    <div className="relative">
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        containerClass="min-w-screen aspect-square"
      >
        {images.map((image, index) => (
          <Link
            key={index}
            href={image.href}
            onClick={(e) => {
              if (image.href === "#") {
                e.preventDefault();
              }
            }}
            draggable={false}
            className="relative"
          >
            <Image
              src={image.src}
              alt={image.title}
              width={640}
              height={640}
              priority={index === 0}
              draggable={false}
            />
            {index !== 0 && (
              <div className="absolute top-0 p-4 flex flex-col">
                <span className="font-head font-bold text-xl">
                  {image.title}
                </span>
                <span className="text-xs">คลิกเพื่อดูสินค้า</span>
              </div>
            )}
          </Link>
        ))}
      </Carousel>
      <div className="absolute -bottom-2 h-28 bg-gradient-to-b from-transparent to-black w-full z-10"></div>
    </div>
  );
}
