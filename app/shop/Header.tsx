import Image from "next/image";

import LogoWhite from "@/app/images/logo-black.png";

export const ShopHeader = () => {
  return (
    <div className="flex flex-row px-6 py-4 gap-4">
      <div className="p-4 bg-white rounded-full">
        <Image src={LogoWhite} alt="logo" width={60} height={60} />
      </div>
      <div className="flex flex-col justify-center">
        <span className="opacity-90 text-sm">The Coming of Stages</span>
        <h1 className="font-bold text-2xl">Merchandise Shop</h1>
      </div>
    </div>
  );
};
