"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { DonationAmountInput } from "./fields/DonationAmount";
import { DonationRecipent } from "./fields/DonationRecipent";
import { FormImageUploadPreview } from "./fields/ImageUploadPreview";
import { FormSchema, formSchema } from "./schema";

export const DonateForm = ({ className }: { className?: string }) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: "" as never,
    },
  });

  function onSubmit(values: FormSchema) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-4${className ? ` ${className}` : ""}`}
      >
        <fieldset className="p-6 bg-white/10 rounded-lg space-y-4">
          <legend className="text-xl font-bold -mb-6">
            โอนเงินผ่านบัญชีธนาคาร
          </legend>
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>จำนวนเงินที่ต้องการบริจาค</FormLabel>
                <FormDescription>
                  โปรดเลือกจำนวนเงินที่ต้องการบริจาคเข้าสู่บัญชี
                </FormDescription>
                <FormControl>
                  <DonationAmountInput {...field} />
                </FormControl>
                <FormMessage />
                <DonationRecipent value={field.value} />
              </FormItem>
            )}
          />
        </fieldset>
        <fieldset className="p-6 bg-white/10 rounded-lg space-y-4">
          <legend className="text-xl font-bold -mb-6">ข้อมูลผู้บริจาค</legend>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ชื่อผู้บริจาค</FormLabel>
                <FormDescription>
                  ชื่อของท่านจะถูกรวบรวมในสูจิบัตรของงาน หากไม่ต้องการให้รวบรวม
                  สามารถเว้นช่องนี้ได้
                </FormDescription>
                <FormControl>
                  <Input placeholder="ชื่อผู้บริจาค" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  อีเมล<span className="text-red-700">*</span>
                </FormLabel>
                <FormDescription>
                  อีเมลสำหรับส่งข้อมูลยืนยันการบริจาคของท่านแล้ว
                </FormDescription>
                <FormControl>
                  <Input placeholder="อีเมลผู้บริจาค" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slip"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>
                  สลิปการโอนเงิน<span className="text-red-700">*</span>
                </FormLabel>
                <FormDescription>
                  สลิปการโอนเงินเพื่อยืนยันการบริจาคของท่าน โดยสลิปนี้จะต้องมี
                  QR Code สำหรับตรวจสอบการโอน
                </FormDescription>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      onChange(e.target?.files?.[0] ?? undefined);
                    }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormImageUploadPreview src={value} />
              </FormItem>
            )}
          />
        </fieldset>
        <Button type="submit">บริจาค</Button>
      </form>
    </Form>
  );
};
