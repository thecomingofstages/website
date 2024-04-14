import { z } from "zod";

export const formSchema = z.object({
  name: z.string().optional(),
  amount: z
    .number({
      required_error: "กรุณาเลือกหรือกรอกจำนวนเงินที่ต้องการบริจาค",
    })
    .refine((val) => val > 0, "จำนวนเงินเงินที่ต้องการบริจาคต้องมากกว่า 0"),
  email: z.string().email("กรุณากรอกรูปแบบอีเมลที่ถูกต้อง"),
  slip: z.any().transform((val, ctx) => {
    if (!(val instanceof File)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "กรุณาอัพโหลดสลิปการโอนเงิน",
        fatal: true,
      });
      return z.NEVER;
    }
    return val;
  }),
});

export type FormSchema = z.infer<typeof formSchema>;
