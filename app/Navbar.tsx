"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { AlignJustify, XIcon } from "lucide-react";

import logoWhite from "@/app/images/logo-white.png";

type NavigationType = "single" | "multi";

type Navigation<T extends NavigationType> = {
  name: string;
  shortName?: string;
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
    <Menu
      as="nav"
      className="z-40 top-0 left-0 w-[100vw] flex items-center justify-end xl:justify-center p-6 lg:p-8 fixed"
    >
      {({ close }) => (
        <>
          <div className="backdrop-blur-lg bg-white/20 shadow-lg hidden xl:flex gap-10 px-12 py-2 items-center rounded-2xl">
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
            <div className="flex flex-row gap-10 flex-wrap items-start">
              {props.items?.map((item) => (
                <Link
                  className={`font-head ${isLinkActive(item.path) ? "opacity-100" : "opacity-80 hover:opacity-100 transition-opacity   duration-300 ease-in-out"}`}
                  key={item.name}
                  title={item.name}
                  href={item.path}
                  onClick={() => {
                    props.navigationType === "single" &&
                      setCurrentHash(item.path);
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <MenuButton className="xl:hidden bg-black hover:bg-zinc-700 border-2 border-zinc-700 p-3 rounded-lg">
            <AlignJustify className="h-6 w-6" />
          </MenuButton>
          <Transition
            as="div"
            enter="duration-200 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-300 ease-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="absolute inset-0 w-screen h-screen bg-black bg-opacity-75 backdrop-blur-md p-8"
          >
            <MenuItems
              modal
              as="div"
              className="flex flex-col gap-x-8 gap-y-3 flex-wrap items-end"
            >
              <MenuItem>
                <button
                  // className="p-2"
                  onClick={() => {
                    close();
                  }}
                >
                  <XIcon className="h-8 w-8" />
                </button>
              </MenuItem>
              <MenuItem>
                <Link
                  href={props.navigationType === "multi" ? "/" : "#top"}
                  onClick={() => {
                    props.navigationType === "single" && setCurrentHash("#top");
                    close();
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
              </MenuItem>
              {props.items?.map((item) => (
                <MenuItem key={item.name}>
                  <Link
                    className={`font-head ${isLinkActive(item.path) ? "opacity-100" : "opacity-80 hover:opacity-100 transition-opacity   duration-300 ease-in-out"}`}
                    title={item.name}
                    href={item.path}
                    onClick={() => {
                      props.navigationType === "single" &&
                        setCurrentHash(item.path);
                      close();
                    }}
                  >
                    {item.name}
                  </Link>
                </MenuItem>
              ))}
            </MenuItems>
          </Transition>
        </>
      )}
    </Menu>
  );
}
