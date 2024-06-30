import { StaticRequire } from "next/dist/shared/lib/get-img-props";

export type ProductData = {
  id: string;
  title: string;
  description: JSX.Element;
  price: number;
  size?: string[];
  images: StaticRequire[];
};

export const products: ProductData[] = [
  {
    id: "t-shirt",
    title: "T-Shirt",
    description: (
      <>
        <p>
          เสื้อยืดผ้า cotton poly สีขาว ด้านหน้า :
          สกรีนลายที่ได้รับแรงบันดาลใจมาจากฉากหนึ่งในละครเวทีปีนี้ Hansel &
          Gretel ด้านหลัง : โลโก้ TCOS
        </p>
        <p className="font-bold">
          เสื้อขนาดไซส์ S, M, L, XL, XXXL สามารถดูตารางเทียบไซส์ได้ที่รูปสุดท้าย
        </p>
      </>
    ),
    price: 279,
    size: ["S", "M", "L", "XL", "XXXL"],
    images: [
      require("./images/t-shirt/1.png"),
      require("./images/t-shirt/2.png"),
      require("./images/t-shirt/3.png"),
      require("./images/t-shirt/4.png"),
      require("./images/t-shirt/5.png"),
      require("./images/t-shirt/6.png"),
    ],
  },
  {
    id: "bag",
    title: "Grocery Bag",
    description: (
      <p>
        กระเป๋าผ้าร่มพับเก็บได้ สีดำ สกรีนลายสองด้าน ( ด้านแรกสีเขียว
        ด้านที่สองสีชมพู ) ขนาด 15 x 15 นิ้ว (ไม่รวมหู) น้ำหนักเบา
        พับเก็บได้ง่าย พกพาสะดวก ลายได้รับแรงบันดาลใจมาจากละครเวทีปีนี้ Hansel &
        Gretel
      </p>
    ),
    price: 239,
    images: [
      require("./images/bag/1.png"),
      require("./images/bag/2.png"),
      require("./images/bag/3.png"),
      require("./images/bag/4.png"),
    ],
  },
  {
    id: "keychain",
    title: "Keychain",
    description: (
      <p>
        พวงกุญแจอะคริลิค สกรีนลายสองด้าน (เป็นคนละลายกัน) ขนาด 7x5.5 cm
        ได้รับแรงบันดาลใจมาจากละครเวทีในปีนี้ Hansel & Gretel
      </p>
    ),
    price: 79,
    images: [
      require("./images/keychain/1.png"),
      require("./images/keychain/2.png"),
    ],
  },
  {
    id: "blanket",
    title: "Blanket",
    description: (
      <p>
        ผ้าห่มสกรีนลายแผนที่ ผ้านาโนฟลีซ สกรีนลายสองด้าน ขนาด 1 x 1.5 m
        ได้รับแรงบันดาลใจมาจากเนื้อเรื่องของละครเวทีปีนี้ Hansel & Gretel
      </p>
    ),
    price: 529,
    images: [
      require("./images/blanket/1.png"),
      require("./images/blanket/2.png"),
      require("./images/blanket/3.png"),
    ],
  },
  {
    id: "sticker",
    title: "Stickers",
    description: (
      <p>
        สติกเกอร์ไดคัท ขนาด a5
        ซึ่งได้รับแรงบันดาลใจมาจากองค์ประกอบในละครเวทีปีนี้ นั่นก็คือเรื่อง
        Hansel & Gretel โดยมีการออกแบบลายเส้นให้เหมือนกับเด็กเป็นผู้วาด
      </p>
    ),
    price: 59,
    images: [
      require("./images/sticker/1.png"),
      require("./images/sticker/2.png"),
    ],
  },
];
