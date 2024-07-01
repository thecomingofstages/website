"use client";

import Link from "next/link";

import { useAtom } from "jotai";

import { ShopHeader } from "../Header";
import { shopItems } from "../store";
import { ClearCart } from "./ClearCart";
import { PriceSummary } from "./PriceSummary";

export default function ShopCartPage() {
  const [items] = useAtom(shopItems);
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
                    <span className="font-bold text-lg">
                      {item.title} {item.size && `(ไซส์ ${item.size})`}
                    </span>
                    <Link
                      href={`/shop/${item.id}/${item.cartItemId}`}
                      className="text-zinc-300 text-sm"
                    >
                      คลิกเพื่อแก้ไขหรือลบรายการ
                    </Link>
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

        <PriceSummary />
      </div>
    </div>
  );
}
