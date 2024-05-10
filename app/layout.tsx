import type { Metadata } from "next";
import { Prompt, STIX_Two_Text } from "next/font/google";

import "../fonts/avenir/index.css";
import "./globals.css";

const titleFont = STIX_Two_Text({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-stix-two-text",
});

const bodyFont = Prompt({
  subsets: ["latin", "thai"],
  variable: "--font-prompt",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | The Coming of Stages",
    default: "The Coming of Stages",
  },
  description:
    "Youth Power of Thai Theatre (เด็กไทยติดเวที) : พื้นที่พัฒนาศักยภาพเด็กไทยเเละส่งเสริมงานสร้างสรรค์ในวงการละครเวที",
  metadataBase:
    process.env.NODE_ENV === "production"
      ? new URL("https://link.thecomingofstages.com")
      : new URL(`http://localhost:${process.env.PORT ?? 3000}`),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${titleFont.variable} ${bodyFont.variable} bg-black text-white font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
