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
      className={`text-sm lg:text-base text-gray-300 leading-6 lg:leading-7${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
};
