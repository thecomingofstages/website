"use client";

import { useParams, useRouter } from "next/navigation";
import { startTransition, useCallback, useState } from "react";

import { useAtomCallback } from "jotai/utils";
import { Minus, Plus } from "lucide-react";
import { nanoid } from "nanoid";
import { toast } from "sonner";

import { ProductData } from "../data";
import { ShopItem, shopItems } from "../store";
import { useCartItemValue } from "./useCartItemValue";

export const PurchaseForm = ({
  id,
  price,
  size,
  title,
}: Pick<ProductData, "id" | "price" | "size" | "title">) => {
  const router = useRouter();
  const { cartItemId } = useParams() as { cartItemId?: string };
  const initial = useCartItemValue(cartItemId);
  const [quantity, setQuantity] = useState(initial.quantity);
  const [selectedSize, setSize] = useState(initial.size);
  const total = price * quantity;

  const addOrMergeItem = useCallback(
    (items: ShopItem[]) => {
      const existingItem = items.findIndex(
        (item) => item.id === id && item.size === selectedSize
      );
      if (existingItem !== -1) {
        items[existingItem].total += total;
        items[existingItem].quantity += quantity;
      } else {
        items.push({
          id,
          cartItemId: nanoid(),
          title,
          price,
          total,
          quantity,
          ...(selectedSize ? { size: selectedSize } : {}),
        });
      }
      return items;
    },
    [quantity, selectedSize, id, price, title, total]
  );

  const addToCart = useAtomCallback(
    useCallback(
      (get, set) => {
        const currentItems = [...get(shopItems)];
        const newItems = addOrMergeItem(currentItems);
        set(shopItems, newItems);
        startTransition(() => {
          toast("เพิ่มสินค้าในตะกร้าเรียบร้อยแล้ว");
          router.replace("/shop");
        });
      },
      [router, addOrMergeItem]
    )
  );

  const modifyCart = useAtomCallback(
    useCallback(
      (get, set) => {
        const items = [...get(shopItems)];
        const current = items.findIndex((i) => i.cartItemId === cartItemId);
        if (current === -1) {
          addOrMergeItem(items);
        } else if (items[current].size !== selectedSize) {
          // size change, remove existing one and add new item
          const newItems = addOrMergeItem(
            items.filter((_, i) => i !== current)
          );
          set(shopItems, newItems);
        } else if (quantity === 0) {
          const newItems = items.filter((_, i) => i !== current);
          set(shopItems, newItems);
        } else {
          const newItems = [...items];
          newItems[current].quantity = quantity;
          newItems[current].total = total;
          set(shopItems, newItems);
        }
        startTransition(() => {
          toast("บันทึกการแก้ไขเรียบร้อยแล้ว");
          router.replace("/shop/cart");
        });
      },
      [router, addOrMergeItem, cartItemId, selectedSize, quantity, total]
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
          <span className="px-4 font-bold">{total.toLocaleString()}฿</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => {
            setQuantity(initial.quantity);
            setSize(initial.size);
          }}
          className="bg-white/10 rounded-lg text-center text-white px-4 py-2"
        >
          รีเซ็ต
        </button>
        <button
          disabled={
            cartItemId ? false : !(quantity > 0 && (size ? selectedSize : true))
          }
          onClick={cartItemId ? modifyCart : addToCart}
          className="transition-colors duration-300 bg-white disabled:bg-white/10 disabled:text-gray-500 rounded-lg text-center font-medium text-black px-4 py-2"
        >
          {cartItemId
            ? quantity === 0
              ? "ลบออกจากตะกร้า"
              : "บันทึกในตะกร้า"
            : "เพิ่มลงในตะกร้า"}
        </button>
      </div>
    </div>
  );
};
