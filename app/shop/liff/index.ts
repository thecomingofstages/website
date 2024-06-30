import type { Liff } from "@line/liff";
import { atom } from "jotai";

import { env } from "@/app/env";

const mockLiff: Pick<Liff, "sendMessages" | "getProfile" | "closeWindow"> = {
  sendMessages: async (...args) => console.log(...args),
  getProfile: async () => {
    return {
      displayName: "Test User",
      userId: "U1234567890",
    };
  },
  closeWindow: () => {},
};

export const liffAtom = atom(() => {
  if (typeof window === "undefined") return new Promise<Liff>(() => {});
  return new Promise<Liff>(async (resolve) => {
    const { default: liff } = await import("@line/liff");
    if (liff.isInClient()) {
      await liff.init({ liffId: env.NEXT_PUBLIC_LIFF_ID });
      resolve(liff);
    } else if (process.env.NODE_ENV === "development") {
      resolve(mockLiff as Liff);
    }
  });
});
