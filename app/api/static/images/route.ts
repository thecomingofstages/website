import { NextRequest } from "next/server";

// [JPEG] Decode module
// @ts-ignore wasm import
import JPEG_DEC_WASM from "@jsquash/jpeg/codec/dec/mozjpeg_dec.wasm?module";
// [JPEG] Encode module
// @ts-ignore wasm import
import JPEG_ENC_WASM from "@jsquash/jpeg/codec/enc/mozjpeg_enc.wasm?module";
import decodeJpeg, { init as initJpegDecode } from "@jsquash/jpeg/decode";
import encodeJpeg, { init as initJpegEncode } from "@jsquash/jpeg/encode";
// [PNG] Decode module
// @ts-ignore wasm import
import PNG_DEC_WASM from "@jsquash/png/codec/pkg/squoosh_png_bg.wasm?module";
// [PNG] Encode module
// @ts-ignore wasm
import PNG_ENC_WASM from "@jsquash/png/codec/pkg/squoosh_png_bg.wasm?module";
import decodePng, { init as initPngDecode } from "@jsquash/png/decode";
import encodePng, { init as initPngEncode } from "@jsquash/png/encode";
// Resize Module
import resize, { initResize } from "@jsquash/resize";
// @ts-ignore wasm import
import RESIZE_ENC_WASM from "@jsquash/resize/lib/resize/pkg/squoosh_resize_bg.wasm?module";
// [WebP] Encode Module
// @ts-ignore wasm import
import WEBP_ENC_WASM from "@jsquash/webp/codec/enc/webp_enc_simd.wasm?module";
import encodeWebp, { init as initWebpWasm } from "@jsquash/webp/encode";

export const runtime = "edge";

const getDefaultCache = () => {
  return typeof caches !== "undefined"
    ? (caches as unknown as { default: Cache }).default
    : null;
};

const imageDecoder = async (format: string) => {
  switch (format) {
    case "jpeg":
    case "jpg":
      await initJpegDecode(JPEG_DEC_WASM);
      return decodeJpeg;
    case "png":
      await initPngDecode(PNG_DEC_WASM);
      return decodePng;
    default:
      throw new Error("Unsupported image format");
  }
};

const imageEncoder = async (format: string) => {
  switch (format) {
    case "jpeg":
    case "jpg":
      await initJpegEncode(JPEG_ENC_WASM);
      return encodeJpeg;
    case "png":
      await initPngEncode(PNG_ENC_WASM);
      return encodePng;
    default:
      throw new Error("Unsupported image format");
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
    console.log("Cache is available");
    const cached = await cache.match(cacheKey);
    if (cached) return cached;
  }
  console.log("Cache not found. Begin fetch");
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

  const resizeImage = async () => {
    const buffer = await img.clone().arrayBuffer();
    console.log("Begin decode");
    const decode = await imageDecoder(extension);
    let imageData = await decode(buffer);
    try {
      console.log("Begin resize");
      await initResize(RESIZE_ENC_WASM);
      imageData = await resize(imageData, {
        fitMethod: "contain",
        width,
        height: Math.round((width / imageData.width) * imageData.height),
      });
    } catch (err) {
      console.error(err);
    }
    if (isWebpSupported) {
      try {
        console.log("Begin encode webp");
        await initWebpWasm(WEBP_ENC_WASM);
        return {
          buffer: await encodeWebp(imageData, { quality }),
          contentType: "image/webp",
        };
      } catch (err) {
        console.error(err);
      }
    }
    console.log("Begin encode");
    const encode = await imageEncoder(extension);
    return {
      buffer: await encode(imageData, { quality }),
      contentType: `image/${extension}`,
    };
  };

  try {
    const image = await resizeImage();
    let filename = url.split("/").pop() as string;
    if (isWebpSupported) filename = filename.replace(`.${extension}`, ".webp");
    const response = new Response(image.buffer, {
      status: 200,
      headers: {
        "Content-Type": image.contentType,
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
