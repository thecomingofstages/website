import { useCallback } from "react";

import { useAtomCallback } from "jotai/utils";
import { toast } from "sonner";

import { liffAtom } from "../liff";
import { ShopItem, shopItems, shopTotalItems } from "../store";
import { DeliveryType, selectedDelivery } from "./delivery";

const formatMessage = ({
  name,
  items,
  delivery,
  totalPrice,
}: {
  name: string;
  items: ShopItem[];
  delivery: DeliveryType;
  totalPrice: number;
}) => {
  return `🛒 สรุปรายการสั่งซื้อ Pre-Order Merchandise ของ ${name}
เมื่อวันที่ ${new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })}

${items
  .map(
    (item) =>
      `- ${item.title}${item.size ? ` (ไซส์ ${item.size})` : ""} x${item.quantity} = ${item.total.toLocaleString()} บาท`
  )
  .join("\n")}

📦 รวมทั้งหมด ${items.length} รายการ จำนวนเงิน ${totalPrice.toLocaleString()} บาท
🚚 รูปแบบการจัดส่ง: ${delivery.name} (${delivery.price} บาท)
💴 รวมยอดที่ต้องชำระ ${(totalPrice + delivery.price).toLocaleString()} บาท

ข้อความนี้เป็นข้อความอัตโนมัติ โปรดรอการตอบกลับจากทีมงานเพื่อยืนยันรายการสั่งซื้อและดำเนินการชำระเงินต่อไป 🫡`;
};

export const useConfirmOrder = () => {
  return useAtomCallback(
    useCallback(async (get) => {
      const liff = await get(liffAtom);
      const items = get(shopItems);
      const { price } = get(shopTotalItems);
      const delivery = get(selectedDelivery);
      if (!delivery) return;
      const profile = await liff.getProfile();
      toast("กำลังส่งรายการสินค้า...", {
        dismissible: false,
        duration: Number.POSITIVE_INFINITY,
      });
      await liff.sendMessages([
        {
          type: "text",
          text: formatMessage({
            name: profile.displayName,
            items,
            delivery,
            totalPrice: price,
          }),
        },
      ]);
      liff.closeWindow();
    }, [])
  );
};
