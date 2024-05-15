import Link from "next/link";

import { Section } from "../base";
import { DonateArtwork } from "./components/artwork";
import { Bubble } from "./components/bubbles";
import { missionBubble } from "./components/bubbles/1-mission";
import { futureBubble } from "./components/bubbles/2-future";
import { howToBubble } from "./components/bubbles/3-howto";

const bubbles = [missionBubble, futureBubble, howToBubble];

export const DonateSection = () => {
  return (
    <div id="support" className="scroll-mt-16 py-20">
      <Section className={"flex flex-col items-center justify-center gap-12"}>
        <div className="gap-2 flex flex-col items-center justify-center text-center">
          <h2 className="text-6xl font-bold font-serif italic">SUPPORT US</h2>
          <span className="text-medium text-xl">
            ทำไมถึงควรร่วมบริจาคกับเรา
          </span>
        </div>
        <div className="flex flex-col md:flex-row gap-10 justify-center items-center w-full">
          {bubbles.map((bubble) => (
            <Bubble key={bubble.title} {...bubble} />
          ))}
        </div>
        <div className="gap-6 flex flex-col items-center justify-center text-center pb-10">
          <h3 className="text-2xl sm:text-3xl font-bold">
            การบริจาคของคุณจะช่วยให้เรา
          </h3>
          <ul className="text-left list-disc space-y-1.5 sm:text-lg pl-8">
            <li>มีพื้นที่ฝึกซ้อมและสถานที่จัดแสดงที่ดี</li>
            <li>
              จ้างผู้เชี่ยวชาญในอุตสาหกรรมเพื่อให้คำแนะนำและฝึกอบรมอย่างเหมาะสม
            </li>
            <li>จัดหาอุปกรณ์และเครื่องแต่งกายที่จำเป็น</li>
            <li>เสริมสร้างโอกาสในการเข้าถึงละครเวทีสำหรับเด็กจากทุกภูมิหลัง</li>
          </ul>
        </div>
        <DonateArtwork>
          <Link
            href="/donate"
            className="bg-black px-8 py-6 rounded text-white font-bold text-3xl lg:text-4xl font-serif hover:bg-zinc-800 transition-colors duration-200"
          >
            DONATE HERE
          </Link>
        </DonateArtwork>
      </Section>
    </div>
  );
};
