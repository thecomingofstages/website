import generatePayload from "promptpay-qr";
import QRCode from "react-qr-code";

import { env } from "@/app/env";

export const DonationRecipent = ({ value }: { value?: number }) => {
  if (!value) return null;
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 lg:p-6 border bg-white text-black rounded-lg">
      <div className="flex flex-col gap-1.5 text-sm flex-grow flex-shrink-0 ">
        <b className="text-lg">โอนเงินเข้าสู่บัญชีธนาคาร</b>
        <span>ธนาคาร{env.NEXT_PUBLIC_DONATION_ACCOUNT_BANK}</span>
        <span>
          หมายเลขบัญชี{" "}
          <span className="font-medium select-all text-red-600">
            {env.NEXT_PUBLIC_DONATION_ACCOUNT_NUMBER}
          </span>
        </span>
        <span>
          ชื่อบัญชี{" "}
          <span className="font-medium select-all text-red-600">
            {env.NEXT_PUBLIC_DONATION_ACCOUNT_NAME}
          </span>
        </span>
        <span>
          จำนวนเงิน{" "}
          <span className="font-medium">
            {new Intl.NumberFormat("th-TH", {
              style: "currency",
              currency: "THB",
            }).format(value)}
          </span>
        </span>
      </div>
      <div>
        <QRCode
          size={"100%"}
          value={generatePayload(env.NEXT_PUBLIC_DONATION_PROMPTPAY_ID, {
            amount: value,
          })}
          className="max-h-[min(300px,30vh)]"
        />
      </div>
    </div>
  );
};
