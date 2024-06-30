import { createEnv } from "@t3-oss/env-nextjs";

import { z } from "zod";

export const env = createEnv({
  server: {
    GOOGLE_PRIVATE_KEY: z.string(),
    GOOGLE_CLIENT_EMAIL: z.string(),
    GOOGLE_DONATE_SUBMIT_SHEET_ID: z.string(),
    GOOGLE_DONATE_SLIP_FOLDER_ID: z.string(),
    GOOGLE_DONATE_SUBMIT_SHEET_RANGE: z.string(),
  },
  client: {
    NEXT_PUBLIC_DONATION_ACCOUNT_NUMBER: z.string(),
    NEXT_PUBLIC_DONATION_ACCOUNT_BANK: z.string(),
    NEXT_PUBLIC_DONATION_ACCOUNT_NAME: z.string(),
    NEXT_PUBLIC_DONATION_PROMPTPAY_ID: z.string().superRefine((arg, ctx) => {
      // We can't use parseInt cause phone number can start with 0
      const isAllNumber = /^[0-9]*$/.test(arg);
      if (!isAllNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_type,
          expected: "number",
          received: "string",
          fatal: true,
        });
        return z.NEVER;
      }

      const numLength = arg.length;
      const isValidID =
        numLength === 10 || numLength === 13 || numLength === 15;
      if (!isValidID) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `PromptPay ID must be a number with 10 (Phone number), 13 (National ID number), or 15 digits (e-Wallet ID). Currently ${numLength} digits.`,
        });
      }
    }),
    NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
    NEXT_PUBLIC_LIFF_ID: z.string(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_DONATION_ACCOUNT_BANK:
      process.env.NEXT_PUBLIC_DONATION_ACCOUNT_BANK,
    NEXT_PUBLIC_DONATION_ACCOUNT_NAME:
      process.env.NEXT_PUBLIC_DONATION_ACCOUNT_NAME,
    NEXT_PUBLIC_DONATION_ACCOUNT_NUMBER:
      process.env.NEXT_PUBLIC_DONATION_ACCOUNT_NUMBER,
    NEXT_PUBLIC_DONATION_PROMPTPAY_ID:
      process.env.NEXT_PUBLIC_DONATION_PROMPTPAY_ID,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_LIFF_ID: process.env.NEXT_PUBLIC_LIFF_ID,
  },
});
