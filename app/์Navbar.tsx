import Image from "next/image";
import Link from "next/link";

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
  const LinkComponent = props.navigationType === "multi" ? Link : "a";
  return (
    <nav className="z-10 top-0 left-0 w-full flex items-center justify-center p-6 absolute gap-8">
      <LinkComponent href={props.navigationType === "single" ? "#top" : "/"}>
        <Image
          src={logoWhite}
          className="flex-shrink-0"
          width={70}
          height={70}
          alt="logo"
        />
      </LinkComponent>
      <div className="flex flex-row gap-x-6 gap-y-3 flex-wrap items-start">
        {props.items?.map((item) => (
          <LinkComponent
            className="opacity-80 hover:opacity-100 transition-opacity duration-300 ease-in-out"
            key={item.name}
            title={item.name}
            href={item.path}
          >
            {item.name}
          </LinkComponent>
        ))}
      </div>
    </nav>
  );
}
