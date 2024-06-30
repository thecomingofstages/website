import { useCallback } from "react";

import { useAtomCallback } from "jotai/utils";
import { toast } from "sonner";

import { liffAtom } from "../liff";
import { ShopItem, shopItems } from "../store";

const formatMessage = (items: ShopItem[], name: string) => {
  return `🗳️ สรุปรายการสั่งซื้อ Pre-order Merchandise ของ ${name}
เมื่อวันที่ ${new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })}

${items
  .map(
    (item) =>
      `- ${item.title}${item.size ? ` ไซส์ ${item.size}` : ""} x${item.quantity} = ${item.total.toLocaleString()} บาท`
  )
  .join("\n")}

💴 รวมทั้งหมด ${items.length} รายการ จำนวนเงิน ${items.reduce((total, item) => total + item.total, 0).toLocaleString()} บาท

ข้อความนี้เป็นข้อความอัตโนมัติ โปรดรอการตอบกลับจากทีมงานเพื่อยืนยันรายการสั่งซื้อและดำเนินการชำระเงินต่อไป 🫡`;
};

export const useConfirmOrder = () => {
  return useAtomCallback(
    useCallback(async (get) => {
      const liff = await get(liffAtom);
      const items = get(shopItems);
      const profile = await liff.getProfile();
      toast("กำลังส่งรายการสินค้า...", {
        dismissible: false,
        duration: Number.POSITIVE_INFINITY,
      });
      await liff.sendMessages([
        {
          type: "text",
          text: formatMessage(items, profile.displayName),
        },
      ]);
      liff.closeWindow();
    }, [])
  );
};
