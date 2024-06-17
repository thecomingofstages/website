import type { PhotonImage } from "@cf-wasm/photon/next";
import { getOptionalRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest } from "next/server";

export const runtime = "edge";

const getDefaultCache = () => {
  return typeof caches !== "undefined"
    ? (caches as unknown as { default: Cache }).default
    : null;
};

const encodeImage = (
  image: PhotonImage,
  isWebpSupported: boolean,
  format: string,
  quality: number
) => {
  if (isWebpSupported) {
    try {
      return [image.get_bytes_webp(), "image/webp"] as const;
    } catch (err) {
      console.error(err);
    }
  }
  switch (format) {
    case "jpeg":
      return [image.get_bytes_jpeg(quality), "image/jpeg"] as const;
    default:
      return [image.get_bytes(), "image/png"] as const;
  }
};

/**
 * [Note]
 * If image API contains breaking changes, please increment the version number,
 * located in the cf-image-loader.js file.
 */

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

  if (!url.startsWith("/_next/static")) {
    return new Response("Invalid image URL", { status: 400 });
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
    const photon = await import("@cf-wasm/photon/next");
    const input = photon.PhotonImage.new_from_byteslice(
      new Uint8Array(await img.clone().arrayBuffer())
    );
    let resized;
    if (input.get_width() > width) {
      resized = photon.resize(
        input,
        width,
        (input.get_height() / input.get_width()) * width,
        // @ts-ignore using lanczos3 for better quality
        5
      );
    }

    const [buffer, contentType] = encodeImage(
      resized ?? input,
      isWebpSupported,
      extension,
      quality
    );

    input.free();
    resized?.free();

    let filename = url.split("/").pop() as string;
    if (isWebpSupported) filename = filename.replace(`.${extension}`, ".webp");
    const newHeaders = new Headers({
      "Content-Type": contentType,
      "Cache-Control":
        img.headers.get("Cache-Control") ??
        "public, max-age=315360000, immutable",
      "Content-Disposition": `inline; filename="${encodeURIComponent(filename)}"`,
      ETag: img.headers.get("ETag") ?? "",
    });

    const response = new Response(buffer, {
      status: 200,
      headers: newHeaders,
    });

    const requestCtx = getOptionalRequestContext();
    if (requestCtx && cache) {
      requestCtx.ctx.waitUntil(cache.put(cacheKey, response.clone()));
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
