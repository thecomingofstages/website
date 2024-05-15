import Image, { getImageProps } from "next/image";

import { cn } from "@/lib/utils";

import Collage from "./Collage Artwork.png";
import Arrows from "./Original Arrows.png";
import VerticalArrows from "./Vertical Arrows.png";

export const DonateArtwork = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const common = { alt: "Theme Example" };
  const {
    props: { srcSet: original, ...rest },
  } = getImageProps({ ...common, src: Arrows.src, width: 864, height: 800 });
  const {
    props: { srcSet: vertical },
  } = getImageProps({
    ...common,
    src: VerticalArrows.src,
    width: 640,
    height: 1151,
  });
  return (
    <div className={"relative"}>
      <div
        {...props}
        className={cn(
          "w-full absolute left-0 bottom-0 flex items-start justify-center z-20 h-[40%]",
          className
        )}
      >
        {children}
      </div>
      <div className="w-full absolute inset-0 flex items-center justify-center">
        <Image src={Collage} alt="Collage" width={540} height={500} />
      </div>
      <picture className="rotate-90 sm:rotate-0 transform">
        <source media="(min-width: 640px)" srcSet={original} />
        <source media="(max-width: 639px)" srcSet={vertical} />
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img {...rest} />
      </picture>
    </div>
  );
};
