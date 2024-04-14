"use server";

import generatePayload from "promptpay-qr";
import QRCode from "react-qr-code";

export const generatePromptpayQR = (amount: number) => {
  return (
    <QRCode
      // @ts-expect-error to make svg fill the container
      size={"100%"}
      value={generatePayload(process.env.DONATION_PROMPTPAY_ID!, {
        amount,
      })}
    />
  );
};

export const getRuntimeRecipent = (previousState: any) => {
  return {
    accountNumber: process.env.DONATION_ACCOUNT_NUMBER,
    accountBank: process.env.DONATION_ACCOUNT_BANK,
    accountName: process.env.DONATION_ACCOUNT_NAME,
  } as const;
};
