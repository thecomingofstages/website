"use client";

import Link from "next/link";

import { useAtomValue } from "jotai";
import { ShoppingCart } from "lucide-react";

import { shopItems } from "./store";

export const CartItems = () => {
  const items = useAtomValue(shopItems);
  return (
    <div className="bg-white text-black flex items-center gap-6 rounded-xl px-6 py-4">
      <div className="bg-black text-white rounded-full p-4">
        <ShoppingCart className="w-8 h-8" />
      </div>
      <div className="flex flex-col justify-center items-start">
        <b className="font-bold text-lg">สินค้าในตะกร้าของคุณ</b>
        <p className="pb-1 text-sm">{items.length} รายการ</p>
        {items.length > 0 && (
          <Link
            href="/shop/cart"
            className="bg-black/10 px-4 py-2 rounded-lg font-bold"
          >
            ดูตะกร้า
          </Link>
        )}
      </div>
    </div>
  );
};
