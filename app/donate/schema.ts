import { ZodParsedType, z } from "zod";
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
      console.log(val);
      if (val && typeof val === "string") return new Date(val);
      if (val instanceof Date) return val;
    },
    z.date({
      errorMap: (issue, ctx) => {
        if (
          issue.code === z.ZodIssueCode.invalid_type &&
          issue.received === ZodParsedType.undefined
        ) {
          return {
            message: "กรุณากรอกวันที่ที่โอนเงิน",
          };
        }
        if (issue.code === z.ZodIssueCode.invalid_date) {
          return {
            message: "กรุณากรอกวันที่ที่ถูกต้อง",
          };
        }
        return z.getErrorMap()(issue, ctx);
      },
    })
  ),
  timeTransfer: zfd.text(
    z
      .string({ required_error: "กรุณากรอกเวลาที่โอนเงิน" })
      .refine((val) => val.split(":").length === 2, "กรุณากรอกเวลาที่ถูกต้อง")
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
