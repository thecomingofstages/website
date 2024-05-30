// Why don't we use Remix if we need to import their packages at the end?
import { isDate, isValid } from "date-fns";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const formSchema = z.object({
  name: zfd.text(
    z.string({
      required_error: "กรุณากรอกชื่อผู้บริจาค",
    })
  ),
  allowCredit: z.boolean().default(false),
  accountName: zfd.text(
    z.string({
      required_error: "กรุณากรอกชื่อบัญชี",
    })
  ),
  accountBank: zfd.text(
    z.string({
      required_error: "กรุณากรอกชื่อธนาคาร",
    })
  ),
  dateTransfer: z.preprocess(
    (val) => {
      if (isValid(isDate(val))) return val;
      if (typeof val === "string") {
        const date = new Date(val);
        if (isValid(date)) return date;
      }
    },
    z.date({
      required_error: "กรุณากรอกวันที่ที่โอนเงิน",
    })
  ),
  timeTransfer: zfd.text(
    z.string({ required_error: "กรุณากรอกเวลาที่โอนเงิน" })
  ),
  amount: zfd.numeric(
    z
      .number({
        required_error: "กรุณาเลือกหรือกรอกจำนวนเงินที่ต้องการบริจาค",
      })
      .refine((val) => val > 0, "จำนวนเงินเงินที่ต้องการบริจาคต้องมากกว่า 0")
  ),
  email: zfd.text(
    z
      .string({
        required_error: "กรุณากรอกอีเมล",
      })
      .email("กรุณากรอกรูปแบบอีเมลที่ถูกต้อง")
  ),
  slip: zfd.file(
    z.any().transform((val, ctx) => {
      if (val instanceof File || val instanceof Blob) {
        // allow instanceof Blob for Node environments
        return val as File;
      }
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "กรุณาอัพโหลดสลิปการโอนเงิน",
        fatal: true,
      });
      return z.NEVER;
    })
  ),
});

export const formDataSchema = zfd.formData(formSchema);

export type FormSchema = z.infer<typeof formSchema>;
