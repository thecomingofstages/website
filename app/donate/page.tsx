import { Metadata } from "next";
import Link from "next/link";

import { DonateForm } from "./Form";
import { GIF } from "./GIF";
import { DonateHeader } from "./Header";
import SampleGreen from "./samples/sample-green.png";
import SamplePurple from "./samples/sample-purple.png";
import SampleRed from "./samples/sample-red.png";
import SampleWhite from "./samples/sample-white.png";

export const metadata: Metadata = {
  title: "บริจาค",
};

export default function DonatePage() {
  return (
    <>
      <DonateHeader
        title={"บริจาคให้โครงการ The Coming of Stages (เด็กไทยติดเวที)"}
      >
        <p className="leading-7 py-2 text-zinc-200">
          โครงการ <b>The Coming of Stages เด็กไทยติดเวที</b>{" "}
          เป็นโครงการไม่แสวงหาผลกำไร
          เพื่อสร้างพื้นที่ให้เด็กไทยได้แสดงความสามารถและฝึกฝนศักยภาพของตนเอง
          รวมถึงส่งเสริมและขับเคลื่อนให้วงการละครเวทีไทยกลับมาเป็นที่สนใจในกลุ่มเยาวชนคนรุ่นใหม่อีกครั้ง
        </p>
        <div className="flex flex-col sm:flex-row gap-6 items-center bg-white/10 rounded-lg p-6">
          <div className="flex flex-col space-y-3 pb-4">
            <h2 className="font-bold text-2xl">สิทธิประโยชน์สำหรับผู้บริจาค</h2>
            <ul className="list-disc pl-8 text-zinc-200 space-y-1 leading-7">
              <li>
                ได้รับใบเสร็จอิเล็กโทรนิกส์ (E-Receipt) ลวดลายสวยงามจากโครงการ
                The Coming of Stages สำหรับรับรองการบริจาคผ่านเว็บไซต์
              </li>
              <li>
                ชื่อของท่านจะแสดงเป็นรายนามผู้สนับสนุนในสูจิบัตรละครเวทีเรื่อง
                &quot;Hansel & Gretel : Home Sweet Home The Musical&quot;
              </li>
            </ul>
          </div>
          <GIF
            src={[SampleWhite, SamplePurple, SampleGreen, SampleRed]}
            alt="Sample E-Receipt Image"
            width={150}
            height={215}
            className="flex-shrink-0"
          />
        </div>
        <p className="leading-6 text-sm text-zinc-300 pt-4">
          ท่านสามารถศึกษารายละเอียดเพิ่มเติมเกี่ยวกับโครงการได้จาก
          <Link
            href="/"
            className="font-medium underline"
            title="เว็บไซต์อย่างเป็นทางการของโครงการ The Coming of Stages"
          >
            เว็บไซต์อย่างเป็นทางการของโครงการ
          </Link>{" "}
          หรือติดต่อสอบถามข้อมูลเพิ่มเติมได้ที่ ฝ่ายจัดหาทุนเพื่อโครงการ The
          Coming of Stages อีเมล{" "}
          <a
            className="font-medium underline"
            title="อีเมลติดต่อโครงการ The Coming of Stages"
            href="mailto:official_account@thecomingofstages.com"
          >
            official_account@thecomingofstages.com
          </a>
        </p>
      </DonateHeader>
      <DonateForm />
    </>
  );
}
