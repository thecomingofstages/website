import { BusinessIcon, PeopleIcon } from "../../graphics/know";

export interface StaticData_i {
  title: string;
  Icon: React.FC<{ className: string }>;
  description: React.ReactNode[];
}

export const StaticData: StaticData_i[] = [
  {
    title: "Who?",
    Icon: PeopleIcon,
    description: [
      <>
        พวกเราคือกลุ่มเยาวชนไทยที่เล็งเห็นถึงความเป็นไปได้ในการต่อยอด
        เเละพัฒนาความสามารถของเยาวชนรุ่นใหม่ โดยเกิดจากการร่วมมือของนักเรียน
        นักศึกษา จากหลากหลายสถาบัน
        แต่มีเป้าหมายเดียวกันคือการพัฒนาศักยภาพการทำงานอย่างไร้ขีดจํากัด
        เพื่อขับเคลื่อนวงการละครเวทีไทยเเละคงไว้ซึ่งคุณค่าสืบต่อไป
      </>,
    ],
  },
  {
    title: "What?",
    Icon: BusinessIcon,
    description: [
      <>
        พวกเราคือกลุ่มเยาวชนไทยที่เล็งเห็นถึงความเป็นไปได้ในการต่อยอด
        เเละพัฒนาความสามารถของเยาวชนรุ่นใหม่ โดยเกิดจากการร่วมมือของนักเรียน
        นักศึกษา จากหลากหลายสถาบัน
        แต่มีเป้าหมายเดียวกันคือการพัฒนาศักยภาพการทำงานอย่างไร้ขีดจํากัด
        เพื่อขับเคลื่อนวงการละครเวทีไทยเเละคงไว้ซึ่งคุณค่าสืบต่อไป
      </>,
      <>
        พวกเรามีความตั้งใจที่จะส่งเสริมศักยภาพของเด็กไทย
        และขับเคลื่อนวงการละครเวทีไทยให้ก้าวหน้ายิ่งขึ้น
        ผ่านการสร้างโปรเจคเพื่อเปิดโอกาสให้เด็กไทยได้สะสมประสบการณ์การทำงานในสถานที่จริง
        อีกทั้งยังอยากเป็นแรงบันดาลใจให้กับเด็กทุกคนที่มีความฝัน
        ให้กล้าที่จะลุกขึ้นมาทำสิ่งดีๆเพื่อตนเองเเละสังคม
      </>,
    ],
  },
  {
    title: "Why?",
    Icon: BusinessIcon,
    description: [
      <>
        ในปัจจุบันละครเวทีในประเทศไทยยังไม่ได้เป็นที่นิยม
        เมื่อเทียบกับละครเวทีในต่างประเทศ เเต่ทว่า
        ก็ยังมีเด็กไทยจำนวนมากที่มีความชอบและความสนใจในด้านนี้
        เเต่เพียงขาดโอกาสในการต่อยอดและพัฒนา
      </>,
      <>
        พวกเราจึงมีความตั้งใจอย่างมากที่จะสร้างสถานที่ ที่สามารถลงมือทําได้จริง
        รวมกับความเชื่อที่ว่า
        เด็กไทยนั้นมีความสามารถมากพอที่จะประสบความสำเร็จได้
        จากเเรงสนับสนุนและการร่วมแรงร่วมใจกัน
      </>,
    ],
  },
];
