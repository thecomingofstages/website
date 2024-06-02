"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
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

import { BankSelect } from "./fields/BankSelect";
import { DonationAmountInput } from "./fields/DonationAmount";
import { DonationRecipent } from "./fields/DonationRecipent";
import { FormImageUploadPreview } from "./fields/ImageUploadPreview";
import { FormSchema, formSchema } from "./schema";

export const DonateForm = ({ className }: { className?: string }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();
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

  const onSubmit: SubmitHandler<FormSchema> = async (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "slip") {
        formData.append(key, value as File);
      } else if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (typeof value === "boolean") {
        formData.append(key, value ? "true" : "");
      } else {
        formData.append(key, value?.toString());
      }
    });
    try {
      setIsSubmit(true);
      await axios.post("/api/donate/submit", formData, {
        // onUploadProgress: (progress) => {
        //   console.log(progress);
        // },
      });

      return router.replace("/donate/success");
      // Action On Upload Success jaa
    } catch (err) {
      console.error(err);
      setIsSubmit(false);
      toast.error("เกิดข้อผิดพลาดในการส่งคำขอ", {
        dismissible: false,
        duration: Number.POSITIVE_INFINITY,
        description: "ไม่สามารถส่งคำขอได้ในขณะนี้",
      });
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-4${className ? ` ${className}` : ""}`}
        encType="multipart/form-data"
      >
        <fieldset
          disabled={isSubmit}
          className="p-6 bg-white/10 rounded-lg space-y-4"
        >
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
        <fieldset
          disabled={isSubmit}
          className="p-6 bg-white/10 rounded-lg space-y-4"
        >
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
                <FormLabel aria-required>ชื่อบัญชีผู้โอน</FormLabel>
                <FormControl>
                  <Input placeholder="ชื่อบัญชีผู้โอน" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountBank"
            render={({ field: { value, onChange, disabled } }) => (
              <FormItem>
                <FormLabel aria-required>ธนาคารบัญชีผู้โอน</FormLabel>
                <FormControl>
                  <BankSelect
                    onChange={onChange}
                    value={value}
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col lg:flex-row gap-4">
            <FormField
              control={form.control}
              name="dateTransfer"
              render={({ field: { onChange, value, disabled } }) => (
                <FormItem className="basis-3/5">
                  <FormLabel aria-required>วันที่โอน</FormLabel>
                  <FormControl>
                    <DateInput
                      value={value}
                      onChange={onChange}
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timeTransfer"
              render={({ field: { onChange, value, disabled } }) => (
                <FormItem className="basis-2/5">
                  <FormLabel aria-required>เวลาโอน</FormLabel>
                  <FormControl>
                    <TimeInput
                      value={value}
                      onChange={onChange}
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </fieldset>
        <Button type="submit" disabled={isSubmit}>
          {isSubmit && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmit ? "กำลังส่งแบบฟอร์ม..." : "ส่งแบบฟอร์มบริจาค"}
        </Button>
      </form>
    </Form>
  );
};
