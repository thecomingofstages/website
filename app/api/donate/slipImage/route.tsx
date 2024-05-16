/* eslint-disable jsx-a11y/alt-text */

/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { ImageResponseOptions, NextRequest } from "next/server";

import { ReceiptColor, ReceiptTheme } from "./types";
import { ErrorImage, getLocalAsset } from "./utils";

export const runtime = "edge";

// todo: implement themes here
const themes: ReceiptTheme = {
  green: {
    bgImageUrl: new URL(`./graphics/receipt-green.png`, import.meta.url),
    orderColor: "white",
  },
  purple: {
    bgImageUrl: new URL(`./graphics/receipt-purple.png`, import.meta.url),
  },
  red: {
    bgImageUrl: new URL(`./graphics/receipt-red.png`, import.meta.url),
  },
  white: {
    bgImageUrl: new URL(`./graphics/receipt-white.png`, import.meta.url),
  },
};

const imageOptions: ImageResponseOptions = {
  width: 573,
  height: 1920,
};

export const GET = async (request: NextRequest) => {
  const params = request.nextUrl.searchParams;
  const color = params.get("color") as ReceiptColor;
  const theme = themes[color];
  try {
    if (!theme) {
      throw `Invalid color and theme: ${color}`;
    }
    const bgImage = await getLocalAsset(theme.bgImageUrl);
    return new ImageResponse(
      (
        <div tw="relative w-full h-full flex flex-col">
          <img tw="absolute inset-0 w-full h-full" src={bgImage} />
          {/** add content here! */}
          <div tw="relative inset-0 left-[50px] flex flex-col w-full text-black">
            <span
              tw="absolute top-[600px] text-5xl"
              style={{
                color: theme.orderColor,
              }}
            >
              Example Text
            </span>
          </div>
        </div>
      ),
      imageOptions
    );
  } catch (err) {
    //console.error(err);
    return ErrorImage(err as never, imageOptions);
  }
};
