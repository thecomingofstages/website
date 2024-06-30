import { atom } from "jotai";

type ShopItem = {
  id: string;
  quantity: number;
  size?: string;
};

export const shopItems = atom<ShopItem[]>([]);
