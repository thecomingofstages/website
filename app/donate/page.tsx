import { Metadata } from "next";
import Link from "next/link";

import { DonateForm } from "./Form";
import { DonateHeader } from "./Header";

export const metadata: Metadata = {
  title: "บริจาค",
};

export default function DonatePage() {
  return (
    <>
      <DonateHeader
        title={"บริจาคให้โครงการ The Coming of Stages (เด็กไทยติดเวที)"}
      >
        <p className="leading-6 text-sm py-2 text-zinc-300">
          โครงการ <b>The Coming of Stages เด็กไทยติดเวที</b>{" "}
          เป็นโครงการไม่แสวงหาผลกำไร
          เพื่อสร้างพื้นที่ให้เด็กไทยได้แสดงความสามารถและฝึกฝนศักยภาพของตนเอง
          รวมถึงส่งเสริมและขับเคลื่อนให้วงการละครเวทีไทยกลับมาเป็นที่สนใจในกลุ่มเยาวชนคนรุ่นใหม่อีกครั้ง
        </p>
        <p className="leading-6 text-sm text-zinc-300">
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
