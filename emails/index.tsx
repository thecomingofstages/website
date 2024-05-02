import * as React from "react";
import {
  Body,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  // Section,
  Text,
  Button,
  Tailwind,
} from "@react-email/components";
import { Section } from "@/app/home/sections/base";
// import logo from "@/emails/static/logo-black-128.png";
type EmailProps = {
  name: string;
  amount: string;
};


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Email({ name, amount }: EmailProps) {
  const date = new Date(2020, 7, 1);

  const result = date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <Tailwind>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Img
              className="ml-7 mt-20 "
              // src={logo}
              width={80}
              height={80}
              // alt="logo"
            />
          </Section>
          <Section className="mt-10 pl-7">
            <div className="text-xl font-bold font-head ">ขอขอบพระคุณสำหรับการบริจาค</div>
          </Section>
          <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" /> 
          <Section className="mt-1 pl-7 ">
            <div className="text-md font-sans ">เรียน <b>{name}</b></div>
          </Section>    
          <Section className="mt-2 p-7">
            <div className="text-md font-sans">
            ตามที่ท่านได้มอบเงินบริจาค จำนวน <u>{amount}</u> บาท (<u>บาทไทย</u>) เมื่อวันที่ <u>{result}</u> ให้แก่โครงการ The Coming of Stages เพื่อสนับสนุนโอกาสให้นักเรียนไทยในการจัดการแสดงละครเวที
            </div>
          </Section>
          <Section className=" p-7">
            <div className="text-md font-sans">
            บัดนี้ ทางโครงการ The Coming of Stages ได้รับเงินจำนวนดังกล่าวเป็นที่เรียบร้อยแล้ว จึงขอขอบคุณในความอนุเคราะห์ของท่านเป็นอย่างยิ่ง และหวังว่าจะได้รับความอนุเคราะห์จากท่านอีกในโอกาสต่อไป            
            </div>
          </Section>
          <Section className="mt-2 p-7">
            <div className="text-md font-sans">
              <i>โครงการ The Coming of Stages ปีที่ 1</i>
            </div>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  );
}
const main = {
  backgroundColor: "#dbddde",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif,',
};
const container = {
  margin: "10px auto",
  backgroundColor: "#fff",
  borderRadius: 5,
  overflow: "hidden",
};



// Props for previewing the email
Email.PreviewProps = {
  name: "นายสมชาย รักเรียนดี",
  amount: "1000",
} satisfies EmailProps;
