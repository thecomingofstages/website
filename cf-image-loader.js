"use client";

export default function cfImageLoader({ src, width, quality }) {
  return `/api/static/images?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
}
