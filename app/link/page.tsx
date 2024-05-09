import Image from "next/image";

import logoWhite from "@/app/images/logo-white.png";

export default function LinkPage() {
  return (
    <main className="flex flex-col h-full min-h-screen items-center justify-center p-6 gap-4">
      <Image src={logoWhite} alt="Logo" width={180} height={180} />
      <h1 className="text-3xl font-semibold font-head">The Coming of Stages</h1>
    </main>
  );
}
