import React from "react";

export const FormImageUploadPreview = React.forwardRef<
  HTMLImageElement,
  Omit<React.HTMLAttributes<HTMLImageElement>, "src"> & {
    src?: File;
  }
>(({ src, ...props }, ref) => {
  const [url, setUrl] = React.useState<string | null>(null);
  React.useEffect(() => {
    const newUrl = src ? URL.createObjectURL(src) : undefined;
    newUrl && setUrl(newUrl);
    return () => {
      newUrl && URL.revokeObjectURL(newUrl);
    };
  }, [src]);
  if (!url) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={`Form File Image Preview : ${src?.name}`}
      {...props}
      ref={ref}
      src={url}
      className="w-full max-h-[50vh] object-contain rounded-md border border-zinc-700 bg-zinc-800"
    />
  );
});
FormImageUploadPreview.displayName = "FormImageUploadPreview";
