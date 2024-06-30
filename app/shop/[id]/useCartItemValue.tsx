import { useMemo } from "react";

import { useAtomValue } from "jotai";

import { ShopItem, shopItems } from "../store";

type CartItemValue = Pick<ShopItem, "quantity" | "size">;

const initialValue: CartItemValue = { quantity: 0, size: undefined };

export const useCartItemValue = (id?: string): CartItemValue => {
  const items = useAtomValue(shopItems);
  const value = useMemo(() => {
    const item = id ? items.find((item) => item.cartItemId === id) : undefined;
    if (item) {
      return { quantity: item.quantity, size: item.size };
    }
    return initialValue;
  }, [items, id]);
  return value;
};
