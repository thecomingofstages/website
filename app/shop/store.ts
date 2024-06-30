import { atom } from "jotai";

import { ProductData } from "./data";

export type ShopItem = Pick<ProductData, "id" | "price" | "title"> & {
  cartItemId: string;
  quantity: number;
  size?: string;
  total: number;
};

export const shopItems = atom<ShopItem[]>([]);