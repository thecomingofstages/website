import { useRouter } from "next/navigation";
import { startTransition, useCallback } from "react";

import { useAtomCallback } from "jotai/utils";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { shopItems } from "../store";

export const ClearCart = () => {
  const router = useRouter();
  const clearCart = useAtomCallback(
    useCallback(
      (_, set) => {
        startTransition(() => {
          router.replace("/shop");
        });
        set(shopItems, []);
      },
      [router]
    )
  );
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="bg-white/15 px-4 py-2 rounded-lg">ล้างตะกร้า</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>ต้องการล้างตะกร้าใช่หรือไม่?</AlertDialogTitle>
          <AlertDialogDescription>
            รายการสินค้าในตะกร้าทั้งหมดจะถูกลบ
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction onClick={clearCart}>ยืนยัน</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
