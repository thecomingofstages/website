import { forwardRef } from "react";

type PropTargetType = "wrapper" | "content";
interface SectionProps<C extends React.ElementType> {
  children: React.ReactNode;
  className?: string | Record<PropTargetType, string>;
  as?: C;
}

export const Section = forwardRef(function SectionWithRef<
  C extends React.ElementType = "div",
>(
  {
    children,
    className,
    as,
    ...props
  }: SectionProps<C> & Omit<React.ComponentProps<C>, keyof SectionProps<C>>,
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
      className={`w-full flex items-center justify-center${getClassName("wrapper")}`}
    >
      <Component
        ref={ref}
        className={`w-full max-w-7xl px-8 md:px-16 py-8 h-screen${getClassName("content")}`}
        {...props}
      >
        {children}
      </Component>
    </section>
  );
});
