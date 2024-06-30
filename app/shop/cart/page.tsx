"use client";

import Link from "next/link";

import { useAtom } from "jotai";

import { ShopHeader } from "../Header";
import { shopItems } from "../store";
import { ClearCart } from "./ClearCart";
import { SubmitCart } from "./SubmitCart";

export default function ShopCartPage() {
  const [items] = useAtom(shopItems);
  const { totalPrice, totalQuantity } = items.reduce(
    ({ totalPrice, totalQuantity }, item) => ({
      totalPrice: item.total + totalPrice,
      totalQuantity: item.quantity + totalQuantity,
    }),
    { totalPrice: 0, totalQuantity: 0 }
  );
  return (
    <div className="flex min-h-screen h-full justify-center">
      <div className="flex flex-col max-w-xl w-full flex-grow">
        <ShopHeader />
        <div className="px-6 space-y-4 flex-grow flex flex-col">
          <div className="flex gap-6">
            <h1 className="font-bold text-3xl flex-grow">ตะกร้าของคุณ</h1>
            {items.length > 0 && <ClearCart />}
          </div>
          <div className="divide-y divide-zinc-600 flex-grow">
            {items.length > 0 ? (
              items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex justify-between py-3"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-lg">{item.title}</span>
                    {item.size && (
                      <span className="text-zinc-300 text-sm">
                        ไซส์ {item.size}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-medium text-lg">
                      {item.total.toLocaleString()}฿
                    </span>
                    <span className="text-zinc-400 text-sm">
                      {item.quantity} x {item.price}฿
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <span>ยังไม่มีรายการสินค้าในตะกร้า</span>
            )}
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between py-2">
            <b>รายการสินค้ารวม</b>
            <div className="flex flex-col items-end">
              <span className="font-medium text-lg">
                {totalPrice.toLocaleString()}฿
              </span>
              <span className="text-zinc-400 text-sm">
                จำนวน {totalQuantity} รายการ
              </span>
            </div>
          </div>
          <div
            className={`grid ${totalQuantity > 0 ? "grid-cols-2 " : ""}gap-3`}
          >
            <Link
              href="/shop"
              className="bg-white/15 rounded-lg text-center text-white px-4 py-2"
            >
              เลือกรายการเพิ่ม
            </Link>
            {totalQuantity > 0 && <SubmitCart />}
          </div>
        </div>
      </div>
    </div>
  );
}
