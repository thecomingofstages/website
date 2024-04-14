"use client";

import { forwardRef, useRef, useState } from "react";

import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { FormSchema } from "../schema";

const prefilledAmounts: Array<number | "custom"> = [
  20,
  50,
  100,
  200,
  500,
  1000,
  5000,
  "custom",
];

export const DonationAmountInput = forwardRef<
  HTMLInputElement,
  ControllerRenderProps<FormSchema, "amount">
>(({ onChange, ...field }, ref) => {
  const [showCustom, setShowCustom] = useState(false);
  const currency = useRef(
    new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    })
  );

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 items-center gap-1.5">
      {prefilledAmounts.map((amount) => (
        <Button
          key={amount}
          type="button"
          variant={
            (showCustom ? amount === "custom" : amount === field.value)
              ? "default"
              : "outline"
          }
          onClick={() => {
            if (amount === "custom") {
              setShowCustom(true);
            } else {
              setShowCustom(false);
              onChange(amount);
            }
          }}
        >
          {amount === "custom" ? "กำหนดเอง" : currency.current.format(amount)}
        </Button>
      ))}
      {showCustom && (
        <span className="text-sm font-medium">ระบุจำนวนเงินเอง :</span>
      )}
      <Input
        type={showCustom ? "number" : "hidden"}
        placeholder="จำนวนเงิน"
        onChange={(e) =>
          onChange(isNaN(e.target.valueAsNumber) ? "" : e.target.valueAsNumber)
        }
        {...field}
        ref={ref}
      />
    </div>
  );
});

DonationAmountInput.displayName = "DonationAmountInput";
