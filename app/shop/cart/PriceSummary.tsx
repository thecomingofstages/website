import Link from "next/link";
import { useEffect } from "react";

import { Radio, RadioGroup } from "@headlessui/react";
import { useAtom } from "jotai";

import { shopTotalItems } from "../store";
import { SubmitCart } from "./SubmitCart";
import { DeliveryType, availableOptions, selectedDelivery } from "./delivery";

const isEqual = (a: DeliveryType | null, b: DeliveryType | null) =>
  a?.id === b?.id;

export const PriceSummary = () => {
  const [total] = useAtom(shopTotalItems);
  const [selected, setSelected] = useAtom(selectedDelivery);
  const [options] = useAtom(availableOptions);

  useEffect(() => {
    if (selected && !options.some((option) => option.id === selected.id)) {
      setSelected(null);
    }
  }, [selected, options]);

  return (
    <div className="p-6 space-y-4 bg-gradient-to-b from-white/10 to-black rounded-t-3xl">
      <div className="flex justify-between">
        <b>รวมทั้งหมด</b>
        <div className="flex flex-col items-end">
          <span className="font-medium text-lg">
            {total.price.toLocaleString()}฿
          </span>
          <span className="text-zinc-400 text-sm">
            จำนวน {total.quantity} ชิ้น
          </span>
        </div>
      </div>
      {total.price > 0 && (
        <>
          <div className="flex flex-col space-y-4">
            <b>การจัดส่ง</b>
            <RadioGroup
              by={isEqual}
              value={selected}
              onChange={setSelected}
              className="space-y-3"
            >
              {options.map((option) => (
                <Radio
                  key={option.id}
                  value={option}
                  className="group relative flex cursor-pointer rounded-lg bg-white/10 py-4 px-5 text-white shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/25"
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="flex flex-row items-center gap-2">
                      <div className="flex flex-col items-start space-y-1">
                        <p className="text-sm font-medium text-white">
                          {option.name}
                        </p>
                        {option.description && (
                          <div className="text-xs flex gap-2 text-white/70">
                            <span>{option.description}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <span>{option.price}฿</span>
                  </div>
                </Radio>
              ))}
            </RadioGroup>
          </div>
          <div className="flex justify-between py-2">
            <b className="text-lg">ยอดที่ต้องชำระ</b>
            <span className="font-bold text-lg">
              {(total.price + (selected?.price ?? 0)).toLocaleString()}฿
            </span>
          </div>
        </>
      )}
      <div className={`grid ${total.quantity > 0 ? "grid-cols-2 " : ""}gap-3`}>
        <Link
          href="/shop"
          className="bg-white/15 rounded-lg text-center text-white px-4 py-2"
        >
          เลือกรายการเพิ่ม
        </Link>

        {total.quantity > 0 && <SubmitCart disabled={selected === null} />}
      </div>
    </div>
  );
};
