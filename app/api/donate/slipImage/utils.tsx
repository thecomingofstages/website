import { ImageResponse } from "next/og";
import { ImageResponseOptions } from "next/server";

import { FontOptions } from "./types";

export const ErrorImage = (
  error: string | Error,
  imageOptions: ImageResponseOptions
) => {
  return new ImageResponse(
    (
      <div tw="bg-white text-black flex flex-col items-center justify-center w-full h-full">
        <div tw="text-6xl font-bold">Error</div>
        <div tw="text-2xl pt-4">
          {typeof error === "string" ? error : error.toString()}
        </div>
      </div>
    ),
    imageOptions
  );
};

export const getLocalAsset = (url: URL): Promise<any> => {
  return fetch(url).then((res) => res.arrayBuffer());
};

type SatoriFontOptions = NonNullable<ImageResponseOptions["fonts"]>[number];
export type FontOptions = Omit<SatoriFontOptions, "data"> & {
  url: URL;
};

export const getFonts = (fonts: FontOptions[]) => {
  return Promise.all<SatoriFontOptions>(
    fonts.map(async ({ url, ...font }) => ({
      ...font,
      data: await getLocalAsset(url),
    }))
  );
};
