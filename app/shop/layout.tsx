import { Metadata } from "next";

import { Provider } from "jotai";

import { LIFFAuth } from "./liff/Auth";

export const metadata: Metadata = {
  title: "Merchandise Shop",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <Provider>
      <LIFFAuth>{children}</LIFFAuth>
    </Provider>
  );
}
