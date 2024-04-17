// @ts-check
import createJiti from "jiti";
import { fileURLToPath } from "node:url";

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
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        // Permanent redirect on local environment may conflict with other projects working locally.
        // Only redirect permanently in production.
        permanent: process.env.NODE_ENV === "development" ? false : true,
      },
    ];
  },
  experimental: {
    serverActions: {
      allowedOrigins: getServerActionsOrigin(),
    },
  },
};

export default nextConfig;
