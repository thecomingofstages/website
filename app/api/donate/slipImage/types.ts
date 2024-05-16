export const receiptColors = ["green", "purple", "red", "white"] as const;
export type ReceiptColor = (typeof receiptColors)[number];

export type ReceiptTheme = Record<
  ReceiptColor,
  {
    orderColor: string;
    nameColor: string;
    dateTimeColor: string;
    bgImageUrl: URL;
  }
>;
