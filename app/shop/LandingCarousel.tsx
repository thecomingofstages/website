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
    src: require("./images/landing/1.jpg"),
    title: "Pre-Order Our Merchandise",
    href: "#",
  },
  {
    src: require("./images/landing/2.jpg"),
    title: "T-Shirt",
    href: "/shop/t-shirt",
  },
  {
    src: require("./images/landing/3.jpg"),
    title: "Grocery Bag",
    href: "/shop/bag",
  },
  {
    src: require("./images/landing/4.jpg"),
    title: "Keychain",
    href: "/shop/keychain",
  },
  {
    src: require("./images/landing/5.jpg"),
    title: "Blanket",
    href: "/shop/blanket",
  },
  {
    src: require("./images/landing/6.jpg"),
    title: "Sticker",
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
          >
            <Image
              src={image.src}
              alt={image.title}
              width={1000}
              height={1000}
              priority={index === 0}
              draggable={false}
            />
          </Link>
        ))}
      </Carousel>
      <div className="absolute -bottom-2 h-28 bg-gradient-to-b from-transparent to-black w-full z-10"></div>
    </div>
  );
}
