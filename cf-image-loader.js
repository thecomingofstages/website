"use client";

/**
 * Any breaking changes to the API should be incremented in the API_VERSION.
 * This allow any CDN cache to be invalidated when the API changes.
 */
const API_VERSION = "v1";

export default function cfImageLoader({ src, width, quality }) {
  return `/api/static/images?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}&${API_VERSION}`;
}
