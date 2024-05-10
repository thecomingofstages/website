import { Metadata } from "next";
import Image from "next/image";

import { ArrowRightIcon, FileTextIcon, SendHorizonalIcon } from "lucide-react";

import logoBlack from "@/app/images/logo-black.png";

const links = [
  {
    title: "รายละเอียดการรับสมัคร",
    desc: <>ศึกษารายละเอียดและขั้นตอนการรับสมัคร</>,
    href: "https://drive.google.com/drive/folders/1BoLvqOE4BLkePJdyCIdaniLptBOy5qsR?usp=sharing",
    Icon: FileTextIcon,
    className: "bg-white text-black hover:bg-zinc-200",
  },
  {
    title: "เข้าสู่ระบบการรับสมัคร",
    desc: <>โปรดศึกษารายละเอียดให้ครบถ้วนก่อนสมัคร</>,
    href: "https://docs.google.com/forms/d/e/1FAIpQLSfKaxixfhNknlVUlciXEhtPo-MB37vE173Qfu3JOK5D00758w/viewform?usp=sf_link",
    Icon: SendHorizonalIcon,
    className: "bg-red-800 hover:bg-red-700",
  },
];

export const metadata: Metadata = {
  title: "Recruitment",
  description:
    "รับสมัคร นักแสดงและนักเต้น ละครเวทีเรื่อง Hansel and Gretel: Home Sweet Home The Musical ในโครงการ The Coming of Stages (เด็กไทยติดเวที) ปีที่ 1",
};
export default function LinkPage() {
  return (
    <main className="flex bg-gradient-to-b from-zinc-800 via-black to-zinc-900 flex-col w-full h-full min-h-screen items-center justify-center p-6 gap-4">
      <div className="aspect-square w-[120px] lg:w-[150px] pt-3 rounded-full bg-white flex items-center justify-center">
        <Image
          src={logoBlack}
          alt="Logo"
          width={100}
          height={100}
          className="max-w-[70px] lg:max-w-[100px]"
        />
      </div>
      <h1 className="text-2xl lg:text-3xl font-semibold font-head text-center">
        The Coming of Stages
      </h1>
      <div className="lg:text-lg text-center flex flex-row flex-wrap gap-x-1.5 gap-y-1 items-center justify-center">
        <p>
          รับสมัคร <b>นักแสดง</b> และ <b>นักเต้น</b> ละครเวทีเรื่อง
        </p>
        <p className="font-medium">Hansel and Gretel: Home Sweet Home</p>

        <p className="font-medium">The Musical</p>
        <p>ในโครงการ The Coming of Stages</p>
        <p>(เด็กไทยติดเวที) ปีที่ 1</p>
      </div>
      <section className="lg:px-6 py-6 flex flex-col items-start justify-start w-full max-w-lg gap-4">
        {links.map((link) => (
          <a
            href={link.href}
            title={link.title}
            key={link.title}
            className={
              "rounded-lg px-6 py-5 lg:py-6 w-full transition-colors duration-500 flex flex-row gap-6 items-start " +
              link.className
            }
          >
            <div className="flex flex-col gap-1.5 flex-grow">
              <div className="flex flex-row gap-2 items-center">
                <link.Icon className="w-5 h-5 mb-1" />
                <b className="text-lg">{link.title}</b>
              </div>
              <span className="text-sm opacity-90">{link.desc}</span>
            </div>
            <ArrowRightIcon className="ml-auto mt-2 w-6 h-6 lg:w-8 lg:h-8 flex-shrink-0" />
          </a>
        ))}
      </section>
    </main>
  );
}
