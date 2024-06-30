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

import { useConfirmOrder } from "./useConfirmOrder";

export const SubmitCart = () => {
  const confirmOrder = useConfirmOrder();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="transition-colors duration-300 bg-white disabled:bg-white/10 disabled:text-gray-500 rounded-lg text-center font-medium text-black px-4 py-2">
          ยืนยันรายการ
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>ต้องการส่งรายการสินค้าใช่หรือไม่?</AlertDialogTitle>
          <AlertDialogDescription>
            หากต้องการเพิ่มหรือแก้ไขรายการหลังจากยืนยันส่งรายการสินค้าแล้ว
            กรุณาแจ้งใน LINE หรือส่งรายการสินค้าในระบบใหม่อีกครั้ง
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction onClick={confirmOrder}>ยืนยัน</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
