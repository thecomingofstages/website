import * as photon from "@cf-wasm/photon/next";
import { NextRequest } from "next/server";

export const runtime = "edge";

const getDefaultCache = () => {
  return typeof caches !== "undefined"
    ? (caches as unknown as { default: Cache }).default
    : null;
};

const encodeImage = (
  image: photon.PhotonImage,
  format: string,
  quality: number
) => {
  switch (format) {
    case "webp":
      return image.get_bytes_webp();
    case "jpeg":
      return image.get_bytes_jpeg(quality);
    case "png":
      return image.get_bytes();
  }
};

export const GET = async (nextRequest: NextRequest) => {
  const { nextUrl, headers } = nextRequest;
  const params = nextUrl.searchParams;
  const url = decodeURIComponent(params.get("url") ?? "");
  const width = parseInt(params.get("w") ?? "");
  const quality = parseInt(params.get("q") ?? "");
  if (!url || isNaN(width) || isNaN(quality)) {
    return new Response("Invalid parameters", { status: 400 });
  }
  const extension = url.split(".").pop() as string;
  const supportedExtensions = ["jpg", "jpeg", "png"];

  if (!supportedExtensions) {
    return new Response("Invalid image extension", { status: 400 });
  }

  const isWebpSupported =
    headers.get("accept")?.includes("image/webp") ?? false;
  const cacheKeyUrl = isWebpSupported
    ? nextUrl.toString().replace(`.${extension}`, ".webp")
    : nextUrl.toString();

  const cacheKey = new Request(cacheKeyUrl, nextRequest);

  const cache = getDefaultCache();
  if (cache) {
    const cached = await cache.match(cacheKey);
    if (cached) return cached;
  }
  const requestHeaders = new Headers({
    "Accept-Encoding": headers.get("Accept-Encoding") ?? "",
    "If-None-Match": headers.get("If-None-Match") ?? "",
  });
  const img = await fetch(new URL(url, nextUrl.origin).toString(), {
    headers: requestHeaders,
  });
  if (img.status !== 200) {
    return new Response("Image not found", { status: 404 });
  }

  try {
    const input = photon.PhotonImage.new_from_byteslice(
      new Uint8Array(await img.clone().arrayBuffer())
    );
    const resized = photon.resize(
      input,
      width,
      (input.get_height() / input.get_width()) * width,
      // @ts-ignore
      1
    );

    const buffer = encodeImage(
      resized,
      isWebpSupported ? "webp" : extension,
      quality
    );

    input.free();
    resized.free();

    const contentType = isWebpSupported
      ? "image/webp"
      : extension === "png"
        ? "image/png"
        : "image/jpeg";

    let filename = url.split("/").pop() as string;
    if (isWebpSupported) filename = filename.replace(`.${extension}`, ".webp");
    const response = new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control":
          img.headers.get("Cache-Control") ??
          "public, max-age=315360000, immutable",
        "Content-Disposition": `inline; filename="${filename}"`,
        ETag: img.headers.get("ETag") ?? "",
      },
    });
    if (cache) {
      cache.put(cacheKey, response.clone());
    }
    return response;
  } catch (err) {
    console.error(err);
    // Don't fail the request, instead return origin repsponse
    return new Response(img.body, {
      status: img.status,
      statusText: img.statusText,
      headers: img.headers,
    });
  }
};
