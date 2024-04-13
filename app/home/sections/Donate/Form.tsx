"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { submitDonate } from "./submit.action";

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  slip: z.instanceof(File),
});

export const DonateForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   console.log(JSON.stringify(values, null, 2));
  // }
  return (
    <Form {...form}>
      <form action={submitDonate} className="space-y-4">
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
          rules={{
            required: "กรุณากรอกอีเมล",
          }}
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
          rules={{
            required: "กรุณาอัพโหลดสลิปการโอนเงิน",
          }}
          render={({ field: { value, ...field } }) => (
            <FormItem>
              <FormLabel>
                สลิปการโอนเงิน<span className="text-red-700">*</span>
              </FormLabel>
              <FormDescription>
                สลิปการโอนเงินเพื่อยืนยันการบริจาคของท่าน โดยสลิปนี้จะต้องมี QR
                Code สำหรับตรวจสอบการโอน
              </FormDescription>
              <FormControl>
                <Input type="file" accept="image/*" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">บริจาค</Button>
      </form>
    </Form>
  );
};
