import { forwardRef } from "react";

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
    return className
      ? ` ${typeof className === "object" ? className[type] : className}`
      : "";
  };
  return (
    <section
      className={`h-full min-h-screen w-full flex items-center justify-center${getClassName("wrapper")}`}
    >
      <Component
        ref={ref}
        className={`w-full max-w-7xl px-8 md:px-16 py-8${getClassName("content")}`}
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
