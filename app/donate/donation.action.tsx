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

export const getRuntimeRecipent = () => {
  return {
    API_ENDPOINT: env.API_ENDPOINT,
    GOOGLE_Private_key: env.GOOGLE_Private_key,
    GOOGLE_Client_email: env.GOOGLE_Client_email,
    GOOGLE_SpreadsheetId: env.GOOGLE_SpreadsheetId,
    GOOGLE_DriveId: env.GOOGLE_DriveId,
    GOOGLE_Spreadsheet_rangeSheet: env.GOOGLE_Spreadsheet_rangeSheet,
    accountNumber: env.DONATION_ACCOUNT_NUMBER,
    accountBank: env.DONATION_ACCOUNT_BANK,
    accountName: env.DONATION_ACCOUNT_NAME,
  } as const;
};
