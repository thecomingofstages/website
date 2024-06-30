"use client";

import { useRouter } from "next/navigation";
import { startTransition, useCallback, useState } from "react";

import { useAtomCallback } from "jotai/utils";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";

import { ProductData } from "../data";
import { shopItems } from "../store";

export const PurchaseForm = ({
  id,
  price,
  size,
}: Pick<ProductData, "id" | "price" | "size">) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(0);
  const [selectedSize, setSize] = useState<string | null>(null);
  const currency = new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  });
  const total = currency.format(price * quantity);

  const addToCart = useAtomCallback(
    useCallback(
      (get, set) => {
        const items = [...get(shopItems)];
        const existingItem = items.findIndex(
          (item) => item.id === id && item.size === selectedSize
        );

        if (existingItem !== -1) {
          items[existingItem].quantity += quantity;
        } else {
          items.push({
            id,
            quantity,
            ...(selectedSize ? { size: selectedSize } : {}),
          });
        }
        set(shopItems, items);
        startTransition(() => {
          toast("เพิ่มสินค้าในตะกร้าเรียบร้อยแล้ว");
          router.replace("/shop");
        });
      },
      [selectedSize, quantity, id]
    )
  );

  return (
    <div className="bg-white/10 rounded-b-lg p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="flex-grow">
          จำนวน<span className="text-red-600">*</span>
        </span>
        <div className="flex items-center">
          <button
            onClick={() => setQuantity((q) => (q > 0 ? q - 1 : q))}
            className="bg-white rounded-full p-1 text-black"
          >
            <Minus className="w-6 h-6" />
          </button>
          <span className="px-4 w-12 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="bg-white rounded-full p-1 text-black"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>
      {size && (
        <div className="flex flex-col gap-2">
          <span className="flex-grow">
            ไซส์<span className="text-red-600">*</span>
          </span>
          <div className="flex gap-3 flex-wrap">
            {size.map((s) => (
              <button
                onClick={() => setSize(s)}
                className={`transition-colors duration-300 px-4 py-2 rounded-lg w-20 ${selectedSize === s ? "bg-white text-black" : "bg-white/10"}`}
                key={s}
                value={s}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center gap-2">
        <span className="flex-grow">จำนวนเงิน</span>
        <div className="flex items-center">
          <span className="px-4 font-bold">{total}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => {
            setQuantity(0);
            setSize(null);
          }}
          className="bg-white/10 rounded-lg text-center text-white px-4 py-2"
        >
          รีเซ็ต
        </button>
        <button
          disabled={!(quantity > 0 && (size ? selectedSize : true))}
          onClick={addToCart}
          className="transition-colors duration-300 bg-white disabled:bg-white/10 disabled:text-gray-500 rounded-lg text-center font-medium text-black px-4 py-2"
        >
          เพิ่มลงในตะกร้า
        </button>
      </div>
    </div>
  );
};
