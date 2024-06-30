import { atom } from "jotai";

import { shopItems } from "../store";

const deliveryOptions = [
  {
    id: "mail-normal",
    name: "จัดส่งไปรษณีย์ลงทะเบียน",
    description: "",
    price: 30,
  },
  {
    id: "mail-large",
    name: "จัดส่งไปรษณีย์ลงทะเบียน",
    description: "",
    price: 50,
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
  const items = get(shopItems);
  const hasBlanket = items.some((item) => item.id == "blanket");
  if (hasBlanket) {
    return deliveryOptions.filter((option) => option.id !== "mail-normal");
  } else {
    return deliveryOptions.filter((option) => option.id !== "mail-large");
  }
});
