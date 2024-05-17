import { forwardRef } from "react";

import { cn } from "@/lib/utils";

type PropTargetType = "wrapper" | "content";
interface SectionCustomProps<C extends React.ElementType> {
  children: React.ReactNode;
  className?: string | Record<PropTargetType, string>;
  as?: C;
}

type SectionProps<C extends React.ElementType> = SectionCustomProps<C> &
  Omit<React.ComponentProps<C>, keyof SectionCustomProps<C>>;

function SectionWithRef<C extends React.ElementType = "div">(
  { children, className, as, ...props }: SectionProps<C>,
  ref: React.ComponentPropsWithRef<C>["ref"]
) {
  const Component = as || "div";
  const getClassName = (type: PropTargetType) => {
    if (typeof className === "object") {
      return className[type] ? ` ${className[type]}` : "";
    }
    return className && type == "content" ? ` ${className}` : "";
  };
  return (
    <section
      className={`h-full min-h-screen w-full flex items-center justify-center${getClassName("wrapper")}`}
      // ref is assigned to the section wrapper element, to handle scroll trigger
      ref={ref}
    >
      <Component
        className={cn(
          `w-full max-w-6xl px-8 md:px-16 py-8`,
          getClassName("content")
        )}
        {...props}
      >
        {children}
      </Component>
    </section>
  );
}

export const Section = forwardRef(SectionWithRef) as <
  C extends React.ElementType,
>(
  props: SectionProps<C> & { ref?: React.ComponentPropsWithRef<C>["ref"] }
) => JSX.Element;
