import * as React from "react";

import {
  Body,
  Container,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { bahttext } from "bahttext";

type EmailProps = {
  name: string;
  amount: number;
  date: Date;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Email({ name, amount, date }: EmailProps) {
  // todo: format both date and time in Thai in the format "1 มกราคม 2567 เวลา 22:50 น."
  const dateString = date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  // todo: format amount in Thai using the module `bathtext`
  const amountThaiString = bahttext(amount);

  // todo: format number as a currency format (1000 -> 1,000)
  const amountString = amount;

  return (
    <Html lang="th">
      <Preview>
        ขอขอบพระคุณ {name} สำหรับการบริจาคในโครงการ The Coming of Stages
      </Preview>
      <Body>
        <Tailwind>
          <Body style={main}>
            <Container style={container}>
              <Section>
                <Img
                  className="ml-7 mt-10"
                  src={"/static/logo-black-128.png"}
                  width={80}
                  height={80}
                  alt="logo"
                />
              </Section>
              <Section className="pl-7 pr-7">
                <Text className="text-xl font-bold">
                  ขอขอบพระคุณสำหรับการบริจาค
                </Text>
              </Section>
              <Hr className="border border-solid border-[#eaeaea] my-[20px] mx-0 w-full" />
              <Section className="mt-1 pl-7">
                <Text className="text-md font-sans font-bold">
                  เรียน {name}
                </Text>
              </Section>
              <Section className="pl-7 pr-7">
                <Text className="text-md font-sans">
                  ตามที่ท่านได้มอบเงินบริจาค จำนวน {amountString} บาท (
                  {amountThaiString}) เมื่อวันที่ {dateString} ให้แก่โครงการ The
                  Coming of Stages
                  เพื่อสนับสนุนโอกาสให้นักเรียนไทยในการจัดการแสดงละครเวที
                </Text>
              </Section>
              <Section className="pl-7 pr-7">
                <Text className="text-md font-sans">
                  บัดนี้ ทางโครงการ The Coming of Stages
                  ได้รับเงินจำนวนดังกล่าวเป็นที่เรียบร้อยแล้ว
                  จึงขอขอบคุณในความอนุเคราะห์ของท่านเป็นอย่างยิ่ง
                  และหวังว่าจะได้รับความอนุเคราะห์จากท่านอีกในโอกาสต่อไป
                </Text>
              </Section>
              <Section className="mt-2 pl-7 pr-7 pb-7">
                <Text className="text-md font-sans italic">
                  โครงการ The Coming of Stages ปีที่ 1
                </Text>
              </Section>
            </Container>
          </Body>
        </Tailwind>
      </Body>
    </Html>
  );
}
const main = {
  backgroundColor: "#dbddde",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif,',
};
const container = {
  margin: "auto",
  backgroundColor: "#fff",
  borderRadius: 5,
  overflow: "hidden",
};

// Props for previewing the email
Email.PreviewProps = {
  name: "นายสมชาย รักเรียนดี",
  amount: 1000,
  date: new Date(2024, 5, 1, 22, 50, 0, 0),
} satisfies EmailProps;
