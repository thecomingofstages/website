"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DateInput, TimeInput } from "@/components/ui/date-time-input";
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
      accountName: "",
      dateTransfer: undefined,
      timeTransfer: undefined,
      accountBank: "",
      amount: "" as never,
      allowCredit: false,
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = async (values, e) => {
    const form = e?.target as HTMLFormElement;
    if (!form) return;
    const formData = new FormData(form);

    await axios
      .post("/api/donate/submit", formData, {
        onUploadProgress: (progress) => {
          console.log(progress);
        },
      })
      .then((response) => {
        toast("Thank You For Donate!");
        console.log(response);
        // Action On Upload Success jaa
      });
    console.log("test");
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-4${className ? ` ${className}` : ""}`}
        encType="multipart/form-data"
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
                <FormLabel aria-required>ชื่อผู้บริจาค</FormLabel>
                <FormControl>
                  <Input placeholder="ชื่อผู้บริจาค" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="allowCredit"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    ประสงค์ให้แสดงชื่อผู้บริจาคในรายชื่อผู้บริจาค
                  </FormLabel>
                  <FormDescription>
                    ชื่อของท่านจะถูกแสดงในรายชื่อผู้บริจาคของสูจิบัตรงานแสดง
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel aria-required>อีเมล</FormLabel>
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
                <FormLabel aria-required>สลิปการโอนเงิน</FormLabel>
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
          <FormField
            control={form.control}
            name="accountName"
            render={({ field }) => (
              <FormItem>
                <FormLabel aria-required>ชื่อบัญชี</FormLabel>
                <FormControl>
                  <Input placeholder="ชื่อบัญชี" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* todo: change accountBank to select list */}
          <FormField
            control={form.control}
            name="accountBank"
            render={({ field }) => (
              <FormItem>
                <FormLabel aria-required>บัญชีธนาคาร</FormLabel>
                <FormControl>
                  <Input placeholder="ธนาคาร" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col lg:flex-row gap-4">
            <FormField
              control={form.control}
              name="dateTransfer"
              render={({ field }) => (
                <FormItem className="basis-3/5">
                  <FormLabel aria-required>วันที่โอน</FormLabel>
                  <FormControl>
                    <DateInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timeTransfer"
              render={({ field }) => (
                <FormItem className="basis-2/5">
                  <FormLabel aria-required>เวลาโอน</FormLabel>
                  <FormControl>
                    <TimeInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </fieldset>
        <Button type="submit">บริจาค</Button>
      </form>
    </Form>
  );
};
