"use server";

import generatePayload from "promptpay-qr";
import QRCode from "react-qr-code";

import { env } from "../env";

export const generatePromptpayQR = (amount: number) => {
  return (
    <QRCode
      size={"100%"}
      value={generatePayload(env.DONATION_PROMPTPAY_ID, {
        amount,
      })}
    />
  );
};

export const getRuntimeRecipent = (previousState: any) => {
  return {
    accountNumber: env.DONATION_ACCOUNT_NUMBER,
    accountBank: env.DONATION_ACCOUNT_BANK,
    accountName: env.DONATION_ACCOUNT_NAME,
  } as const;
};
