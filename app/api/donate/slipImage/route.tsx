/* eslint-disable jsx-a11y/alt-text */

/* eslint-disable @next/next/no-img-element */
import { ImageResponse, } from "next/og";
import { ImageResponseOptions, NextRequest, } from "next/server";

import { ReceiptColor, ReceiptTheme,  } from "./types";
import { FontOptions, getFonts, getLocalAsset,  } from "./utils";
import dayjs from "dayjs";
import "dayjs/locale/th";

export const runtime = "edge";

const themes: ReceiptTheme = {
  green: {
    bgImageUrl: new URL(`./graphics/receipt-green.png`, import.meta.url),
    orderColor: "#ff6700",
    nameColor: "#ff6700",
    dateTimeColor: "#ff6700",
  },
  purple: {
    bgImageUrl: new URL(`./graphics/receipt-purple.png`, import.meta.url),
    orderColor: "#ffe500",
    nameColor: "#ffe500",
    dateTimeColor: "#ffe500",
  },
  red: {
    bgImageUrl: new URL(`./graphics/receipt-red.png`, import.meta.url),
    orderColor: "#000d03",
    nameColor: "#000d03",
    dateTimeColor: "#000d03",
  },
  white: {
    bgImageUrl: new URL(`./graphics/receipt-white.png`, import.meta.url),
    orderColor: "#000d03",
    nameColor: "#000d03",
    dateTimeColor: "#000d03",
  },
};

const fonts: FontOptions[] = [
  {
    name: "Prompt-regular",
    url: new URL(`./fonts/Prompt-Regular.ttf`, import.meta.url),
    weight: 400,
  },
  {
    name: "Prompt-medium",
    url: new URL(`./fonts/Prompt-Medium.ttf`, import.meta.url),
    weight: 500,
  },
  // {
  //   name: "Source Serif Italic",
  //   url: new URL(`./fonts/SourceSerif-Italic.ttf`, import.meta.url),
  //   weight: 400, 
  // },

];

export const GET = async (request: NextRequest) => {
  const params = request.nextUrl.searchParams;
  const color = params.get("color") as ReceiptColor;
  const theme = themes[color];
  const amount = 1000;
  const amountString = amount.toLocaleString();
  const name = "สมชาย ใจดี";
  const date = new Date(2024, 5, 1, 22, 50, 0, 0);
  const day = dayjs(date).format('MM/DD/YY')
  const time = dayjs(date).format('HH:mm')
  try {
    if (!theme) {
      throw `Invalid color and theme: ${color}`;
    }
    const bgImage = await getLocalAsset(theme.bgImageUrl);
    const imageOptions: ImageResponseOptions = {
      width: 573,
      height: 1920,
      fonts: await getFonts(fonts),
    };
    return new ImageResponse(
      (
        <div tw="relative w-full h-full flex flex-col">
          <img tw="absolute inset-0 w-full h-full" src={bgImage} />
          <div tw="relative inset-0 flex flex-col w-full">
            <span
              tw="absolute top-[123px] right-[35px] text-2xl"
              style={{
                color: theme.orderColor,
              }}
            >
              00001
            </span>
            <span 
              tw="absolute top-[710px] left-[50px] text-5xl "
              style={{
                color: theme.nameColor,
              }}
              >
              {name}
            </span>
            <span 
              tw="absolute top-[808px] right-[50px] text-4xl "
              style={{
                color: theme.dateTimeColor,
              }}
              >
              {amountString}฿
            </span>
            <span 
              tw="absolute top-[868px] right-[50px] text-4xl "
              style={{
                color: theme.dateTimeColor,
              }}
              >
              {day}
            </span>
            <span 
              tw="absolute top-[928px] right-[50px] text-4xl "
              style={{
                color: theme.dateTimeColor,
              }}
              >
              {time}
            </span>
          </div>
        </div>
      ),
      imageOptions
    );
  } catch (err) {
    // console.error(err);
    // return ErrorImage(err as never, imageOptions);
  }
};