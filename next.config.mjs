// @ts-check
import dotenv from "dotenv";
import createJiti from "jiti";
import { fileURLToPath } from "node:url";

dotenv.config();

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti(`./app/env`);

if (process.env.NODE_ENV === "production") {
  // Check for mandatory environment variables required in build time
  // We can't do this in env.ts cause the code will be bundle in runtime too.
  const gaEnv = process.env["NEXT_PUBLIC_GA_MEASUREMENT_ID"];
  if (!gaEnv) {
    if (typeof gaEnv !== "string") {
      throw new Error(
        "❌  NEXT_PUBLIC_GA_MEASUREMENT_ID is not provided, causing Google Analytics to be disabled. \
If this is intended, define an environment variable with a blank string to bypass this error."
      );
    } else if (process.env.NEXT_PRIVATE_BUILD_WORKER !== "1") {
      console.warn(
        "⚠️  NEXT_PUBLIC_GA_MEASUREMENT_ID is not provided, disabling Google Analytics for this build."
      );
    }
  }
}

/**
 *
 * We need allowed origins for server actions to work
 * with environment with reversed proxies, like GitHub Codespaces.
 * See https://github.com/vercel/next.js/issues/58019#issuecomment-1803925492
 *
 * @type {() => string[] | undefined}
 *
 * */
const getServerActionsOrigin = () => {
  if (!process.env.CODESPACES) {
    return undefined;
  }
  const port = process.env.PORT ?? "3000";
  return [
    `${process.env.CODESPACE_NAME}-${port}.app.github.dev`,
    `localhost:${port}`,
  ];
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        {
          source: "/:slug",
          destination: "/link/:slug",
          has: [
            {
              type: "host",
              value: "link.thecomingofstages.com",
            },
          ],
        },
      ],
      fallback: [],
    };
  },
  async redirects() {
    return [
      /*{
        source: "/",
        destination: "/recruitment",
        permanent: false,
        has: [
          {
            type: "host",
            value: "link.thecomingofstages.com",
          },
        ],
      },*/
      {
        source: "/",
        destination: "/home",
        // Permanent redirect on local environment may conflict with other projects working locally.
        // Only redirect permanently in production.
        permanent: process.env.NODE_ENV === "production",
        missing: [
          {
            type: "host",
            value: "link.thecomingofstages.com",
          },
        ],
      },
    ];
  },
  images:
    process.env.NODE_ENV === "production"
      ? {
          loader: "custom",
          loaderFile: "./cf-image-loader.js",
        }
      : undefined,
  experimental: {
    serverActions: {
      allowedOrigins: getServerActionsOrigin(),
    },
  },
};

export default nextConfig;
