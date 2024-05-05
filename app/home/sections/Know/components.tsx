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
    <div className="flex flex-col gap-4 flex-grow max-w-xl min-w-fit px-2">
      <h3 className="text-4xl font-bold font-head inline-flex items-center gap-2">
        <Icon className="w-20 h-20 text-white" />
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
      className={`text-gray-300 leading-7${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
};
