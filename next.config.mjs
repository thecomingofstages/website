// @ts-check
import dotenv from "dotenv";
import createJiti from "jiti";
import { fileURLToPath } from "node:url";

dotenv.config();

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti(`./app/env`);

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
    };
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/recruitment",
        permanent: false,
        has: [
          {
            type: "host",
            value: "link.thecomingofstages.com",
          },
        ],
      },
      {
        source: "/",
        destination: "/home",
        // Permanent redirect on local environment may conflict with other projects working locally.
        // Only redirect permanently in production.
        permanent: process.env.NODE_ENV === "development" ? false : true,
        missing: [
          {
            type: "host",
            value: "link.thecomingofstages.com",
          },
        ],
      },
    ];
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "true" },
  //         {
  //           key: "Access-Control-Allow-Origin",
  //           value: "http://localhost:30001/",
  //         },
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "GET,DELETE,PATCH,POST,PUT",
  //         },
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value:
  //             "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  //         },
  //       ],
  //     },
  //   ];
  // },
  experimental: {
    serverActions: {
      allowedOrigins: getServerActionsOrigin(),
    },
  },
  env: {
    Google_private_key: process.env.Google_private_key,
    Google_client_email: process.env.Google_client_email,
  },
};

export default nextConfig;
