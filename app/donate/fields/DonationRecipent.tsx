import { useEffect, useState, useTransition } from "react";
import { useFormState } from "react-dom";

import { useDebounce } from "use-debounce";

import { generatePromptpayQR, getRuntimeRecipent } from "../donation.action";

export const DonationRecipent = ({ value }: { value?: number }) => {
  const [amount] = useDebounce(value, 500);
  const [recipent, fetchRecipent] = useFormState(getRuntimeRecipent, null);
  const [QRCode, setQRCode] = useState<JSX.Element | null>(null);
  const [isTransitionLoading, startTransition] = useTransition();

  const [isLoading] = useDebounce(isTransitionLoading, 50);
  useEffect(() => {
    startTransition(() => {
      fetchRecipent();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (amount) {
      startTransition(() => {
        setQRCode(generatePromptpayQR(amount));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  if (!recipent || !amount) return null;
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 lg:p-6 border bg-white text-black rounded-lg">
      <div className="flex flex-col gap-1.5 text-sm flex-grow flex-shrink-0 ">
        <b className="text-lg">โอนเงินเข้าสู่บัญชีธนาคาร</b>
        <span>ธนาคาร{recipent.accountBank}</span>
        <span>
          หมายเลขบัญชี{" "}
          <span className="font-medium select-all text-red-600">
            {recipent.accountNumber}
          </span>
        </span>
        <span>
          ชื่อบัญชี{" "}
          <span className="font-medium select-all text-red-600">
            {recipent.accountName}
          </span>
        </span>
        <span>
          จำนวนเงิน{" "}
          <span className="font-medium">
            {new Intl.NumberFormat("th-TH", {
              style: "currency",
              currency: "THB",
            }).format(amount)}
          </span>
        </span>
      </div>
      <div>{isLoading ? "กำลังโหลด..." : QRCode}</div>
    </div>
  );
};
