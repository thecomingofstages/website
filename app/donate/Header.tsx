import Image from "next/image";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import logoWhite from "@/app/images/logo-white.png";

export const DonateHeader = ({
  title,
  children,
}: {
  title: React.ReactNode;
  children?: React.ReactNode;
}) => {
  return (
    <header className="py-6 px-4 lg:px-6 space-y-2">
      <div className="pb-3">
        <Link
          href="/"
          title="กลับสู่เว็บไซต์"
          className="bg-white/20 hover:bg-white/30 text-white transition-colors px-6 py-3 rounded-lg text-sm"
        >
          <ArrowLeft size={16} className="inline-block -ml-1 -mt-0.5 mr-4" />
          กลับสู่เว็บไซต์
        </Link>
      </div>
      <Image
        src={logoWhite}
        className="-mx-2"
        alt="Logo"
        width={120}
        height={120}
      />

      <h1 className="text-3xl font-bold text-white">{title}</h1>
      {children}
    </header>
  );
};
