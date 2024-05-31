import { DonateHeader } from "../Header";

export default function DonatePage() {
  return (
    <>
      <DonateHeader title={"ขอบพระคุณสำหรับการบริจาค"}>
        <p>
          ทางโครงการ The Coming of Stages ปีที่ 1
          ขอขอบพระคุณสำหรับความอนุเคราะห์ของท่านเป็นอย่างสูง
        </p>
        <p className="text-sm py-2 text-zinc-300 max-w-lg leading-6">
          ฝ่ายจัดหาทุนเพื่อโครงการ The Coming of Stages
          จะตรวจสอบรายการบริจาคของท่าน
          และจะส่งอีเมลยืนยันพร้อมใบเสร็จรับเงินไปยังอีเมลที่ท่านระบุไว้
        </p>
      </DonateHeader>
    </>
  );
}
