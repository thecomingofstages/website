import { atom } from "jotai";

import { ProductData } from "./data";

export type ShopItem = Pick<ProductData, "id" | "price" | "title"> & {
  cartItemId: string;
  quantity: number;
  size?: string;
  total: number;
};

export const shopItems = atom<ShopItem[]>([]);

export const shopTotalItems = atom((get) => {
  const items = get(shopItems);
  return items.reduce(
    ({ price, quantity }, item) => ({
      price: item.total + price,
      quantity: item.quantity + quantity,
    }),
    { price: 0, quantity: 0 }
  );
});
