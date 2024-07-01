import { atom } from "jotai";

import { shopItems, shopTotalItems } from "../store";

const deliveryOptions = [
  {
    id: "mail-normal",
    name: "ไปรษณีย์ลงทะเบียน",
    description: "จัดส่งฟรีเมื่อสั่งซื้อครบ 550 บาทขึ้นไป",
    price: 30,
  },
  {
    id: "mail-large",
    name: "ไปรษณีย์ลงทะเบียน",
    description: "จัดส่งฟรีเมื่อสั่งซื้อครบ 550 บาทขึ้นไป",
    price: 50,
  },
  {
    id: "free",
    name: "ไปรษณีย์ลงทะเบียน (จัดส่งฟรี)",
    description: "เมื่อสั่งซื้อครบ 550 บาทขึ้นไป",
    price: 0,
  },
  {
    id: "pick-up",
    name: "(เฉพาะทีมงาน) รับที่สตูดิโอ",
    description: "จำเป็นต้องยืนยันสมาชิกทีมงาน",
    price: 0,
  },
] as const;

export type DeliveryType = (typeof deliveryOptions)[number];

export const selectedDelivery = atom<DeliveryType | null>(null);

export const availableOptions = atom((get) => {
  const { price } = get(shopTotalItems);
  if (price >= 550) {
    return deliveryOptions.filter((option) => !option.id.includes("mail"));
  }
  const items = get(shopItems);
  const hasBlanket = items.some((item) => item.id == "blanket");
  if (hasBlanket) {
    return deliveryOptions.filter(
      (option) => option.id !== "mail-normal" && option.id !== "free"
    );
  } else {
    return deliveryOptions.filter(
      (option) => option.id !== "mail-large" && option.id != "free"
    );
  }
});
