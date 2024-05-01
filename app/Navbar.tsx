"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import logoWhite from "@/app/images/logo-white.png";

type NavigationType = "single" | "multi";

type Navigation<T extends NavigationType> = {
  name: string;
  path: T extends "single" ? `#${string}` : `/${string}`;
};

type NavbarProps<T extends NavigationType> = {
  items: Navigation<T>[];
  navigationType: T;
};

export default function Navbar<T extends NavigationType>(
  props: NavbarProps<T>
) {
  const [hash, setHash] = useState<string>("");
  const pathname = usePathname();

  const setCurrentHash = useCallback((arg?: string | unknown) => {
    if (typeof window === "undefined") return;
    const newHash = typeof arg === "string" ? arg : window.location.hash;
    console.log(newHash);
    setHash(newHash);
  }, []);
  useEffect(() => {
    setCurrentHash();
    window.addEventListener("hashchange", setCurrentHash);
    return () => {
      window.removeEventListener("hashchange", setCurrentHash);
    };
  }, [setCurrentHash]);

  const isLinkActive = useCallback(
    (path: string) => {
      if (props.navigationType === "multi") return path === pathname;
      return path === hash;
    },
    [hash, pathname, props.navigationType]
  );
  return (
    <div className="z-40 top-0 left-0 w-[100vw] flex items-center justify-center p-6 fixed">
      <nav className="backdrop-blur-lg bg-white/20 shadow-lg flex gap-6 px-12 py-2 items-center rounded-2xl">
        <Link
          href={props.navigationType === "multi" ? "/" : "#top"}
          onClick={() => {
            props.navigationType === "single" && setCurrentHash("#top");
          }}
        >
          <Image
            src={logoWhite}
            className="flex-shrink-0"
            width={70}
            height={70}
            alt="logo"
          />
        </Link>
        <div className="flex flex-row gap-x-8 gap-y-3 flex-wrap items-start">
          {props.items?.map((item) => (
            <Link
              className={`font-head ${isLinkActive(item.path) ? "opacity-100" : "opacity-80 hover:opacity-100 transition-opacity   duration-300 ease-in-out"}`}
              key={item.name}
              title={item.name}
              href={item.path}
              onClick={() => {
                props.navigationType === "single" && setCurrentHash(item.path);
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
