import Image from "next/image";
import { forwardRef, useId } from "react";

import { motion } from "framer-motion";

import character from "@/app/images/bigbosspromaxair.png";

import { CharacterHighlight } from "../../graphics/know";

export const DetailSection = ({
  title,
  children,
  Icon,
}: {
  title: string;
  children: React.ReactNode;
  Icon: React.FC<{ className: string }>;
}) => {
  return (
    <div className="flex flex-col gap-4 flex-grow min-w-fit pr-4">
      <h3 className="text-3xl md:text-4xl font-bold font-head inline-flex items-center gap-2">
        <Icon className="md:w-20 md:h-20 w-16 h-16 text-white" />
        {title}
      </h3>
      {children}
    </div>
  );
};

export const Desc = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"p">) => {
  return (
    <p
      className={`text-sm md:text-base text-gray-300 leading-6 md:leading-7${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
};

export const Character = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof motion.div>
>(({ className, id, ...props }, ref) => {
  const internalId = useId();
  return (
    <motion.div
      ref={ref}
      className={`flex-shrink-0 flex justify-center items-center relative max-w-xs lg:max-w-[unset]  ${className}`}
      id={id}
      {...props}
    >
      <div className="absolute inset-0 h-full w-full flex items-center justify-center scale-[1.30]">
        <Image
          src={character}
          width={600}
          height={600}
          alt="Character"
          className="-scale-x-100"
        />
      </div>
      <CharacterHighlight id={id ?? internalId} className="w-[400px]" />
    </motion.div>
  );
});

Character.displayName = "Character";
