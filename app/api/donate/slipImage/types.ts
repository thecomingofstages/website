export type RecieptColor = "green" | "purple" | "red" | "white";

export type ReceiptTheme = Record<
  RecieptColor,
  {
    orderColor: string;
    nameColor: string;
    dateTimeColor: string;
    bgImageUrl: URL;
  }
>;
